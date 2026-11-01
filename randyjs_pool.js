
const RJP_WORKER_SCRIPTS = ['scratch_touch_core.js', 'touching.js', 'saws.js', 'walkers.js', 'worms.js', 'eyeLaunchers.js', 'physics.js', 'randyjs.js'];
const RJP_MAX_AUTO_WORKERS = 8;
const RJP_SETUP_TIMEOUT_MS = 20000;

class RandyJSPool {
    static supported() { return typeof Worker !== 'undefined' && typeof AppelPhysics !== 'undefined'; }

    static autoWorkers() {
        const hc = (typeof navigator !== 'undefined' && navigator.hardwareConcurrency) || 4;
        return Math.max(1, Math.min(RJP_MAX_AUTO_WORKERS, hc - 1));
    }

    constructor(emit) {
        this.emit = emit;
        this.running = false;
        this.paused = false;
        this.workers = [];
        this.fallback = null;
    }


    static _scriptUrls() {
        const have = [...document.scripts].map(s => s.getAttribute('src')).filter(Boolean);
        return RJP_WORKER_SCRIPTS.map(n => new URL(have.find(s => s.split('?')[0] === n) || n, document.baseURI).href);
    }

    static async _touchingSnapshot() {
        const t = new Touching();
        try { if (t.loadPromise) await t.loadPromise; } catch (_) {}
        const g = (c, k) => (typeof c !== 'undefined' && c[k]) ? c[k] : null;
        return {
            preloaded: Touching.preloaded || null,
            walkerMasks: g(typeof WalkerTouch !== 'undefined' ? WalkerTouch : undefined, 'masks'),
            walkerStencil: g(typeof WalkerTouch !== 'undefined' ? WalkerTouch : undefined, 'stencil'),
            sawMasks: g(typeof SawTouch !== 'undefined' ? SawTouch : undefined, 'masks'),
            wormMasks: g(typeof WormTouch !== 'undefined' ? WormTouch : undefined, 'masks'),
            eyeMask: g(typeof EyeLauncherTouch !== 'undefined' ? EyeLauncherTouch : undefined, 'mask'),
        };
    }

    static _staticsSnapshot() {
        const out = {};
        for (const k of Object.getOwnPropertyNames(AppelPhysics)) {
            if (k === 'length' || k === 'name' || k === 'prototype') continue;
            const d = Object.getOwnPropertyDescriptor(AppelPhysics, k);
            if (!d || !('value' in d) || typeof d.value === 'function') continue;
            try { out[k] = structuredClone(d.value); } catch (_) {}
        }
        return out;
    }


    async start(p) {
        this.running = true; this.paused = false; this.quit = false; this.reason = 'finished';
        this.fallback = null;

        const L = LevelRenderer.getDataFromCode(p.levelCode);
        if (!L || !L.map || !L.map.length) { this.emit({ type: 'error', message: 'bad level code' }); this.running = false; return; }

        let n = Math.floor(p.workers || 0);
        if (!(n >= 1)) n = RandyJSPool.autoWorkers();
        n = Math.min(n, 32);

        let ready = [];
        let setupData = null;
        try {
            setupData = { touching: await RandyJSPool._touchingSnapshot(), statics: RandyJSPool._staticsSnapshot(), scripts: RandyJSPool._scriptUrls() };
            if (this.quit) return this._finishEarly();
            ready = await this._spawn(n, setupData);
        } catch (e) { console.warn('RandyJSPool: workers unavailable, using the main thread', e); ready = []; }
        if (this.quit) { for (const w of ready) w.w.terminate(); return this._finishEarly(); }

        if (!ready.length) {
            this.fallback = new RandyJS(m => {
                if (m.type === 'done' || m.type === 'error') this.running = false;
                this.emit(m);
            });
            try { await this.fallback.start(p); } catch (e) { this.running = false; throw e; }
            return;
        }

        this.workers = ready;
        this._beginRun(p, L);
    }

    _finishEarly() {
        this.running = false;
        this.emit({ type: 'done', reason: 'cancelled', t: 0, steps: 0 });
    }

    _spawn(n, setupData) {
        const url = new URL('randyjs_worker.js', document.baseURI).href;
        const list = [];
        for (let i = 0; i < n; i++) {
            let w;
            try { w = new Worker(url); } catch (e) { break; }
            list.push({ id: i, w, alive: true, ready: false, done: false, best: null, progress: null, heat: null, heatNew: false, init: false });
        }
        if (!list.length) return Promise.resolve([]);

        return new Promise((resolve) => {
            let pending = list.length, finished = false;
            const settle = () => {
                if (finished) return;
                finished = true; clearTimeout(timer);
                const ok = list.filter(e => e.ready);
                for (const e of list) if (!e.ready) { e.alive = false; try { e.w.terminate(); } catch (_) {} }
                resolve(ok);
            };
            const timer = setTimeout(settle, RJP_SETUP_TIMEOUT_MS);
            for (const e of list) {
                e.w.onmessage = (ev) => {
                    const m = ev.data;
                    if (!e.ready) {
                        if (m.kind === 'ready') { e.ready = true; if (--pending === 0) settle(); }
                        else if (m.kind === 'fatal') { console.warn('RandyJSPool: ' + m.message); if (--pending === 0) settle(); }
                        return;
                    }
                    this._onWorkerMessage(e, m);
                };
                e.w.onerror = (ev) => {
                    if (!e.ready) { console.warn('RandyJSPool: worker failed to load', ev && ev.message); if (--pending === 0) settle(); return; }
                    this._onWorkerCrash(e, ev && ev.message);
                };
                try { e.w.postMessage({ kind: 'setup', wid: e.id, scripts: setupData.scripts, touching: setupData.touching, statics: setupData.statics }); }
                catch (err) { console.warn('RandyJSPool: could not message worker', err); e.w.terminate(); if (--pending === 0) settle(); }
            }
        });
    }

    _beginRun(p, L) {
        this.t0 = performance.now();
        this.maxSeconds = p.maxSeconds || 0;
        this.goalTile = !!p.goalTile;
        this.goalVer = 0;
        this.gBest = null;
        this.migrated = null;
        this.bestPending = false;
        this.lastBestEmit = 0; this.lastHeatEmit = 0; this.lastProgEmit = 0;
        this.gotInit = false;
        this.doneCount = 0;
        this.finalising = false;

        const params = Object.assign({}, p, { levelData: L, levelCode: undefined, maxSeconds: 0 });
        for (const e of this.workers) e.w.postMessage({ kind: 'start', params });
        this.emit({ type: 'log', message: `Randy JS: ${this.workers.length} worker${this.workers.length > 1 ? 's' : ''} (each one a full search; the best route is shared between them)` });

        const loop = () => { this._tick(); if (this.running && !this.finalising) this.timer = setTimeout(loop, 100); };
        this.timer = setTimeout(loop, 100);
    }


    _alive() { return this.workers.filter(e => e.alive); }

    _onWorkerMessage(e, data) {
        if (data.kind === 'fatal') { this._onWorkerCrash(e, data.message); return; }
        if (data.kind !== 'msg') return;
        const m = data.m;
        switch (m.type) {
            case 'init':
                if (!this.gotInit) { this.gotInit = true; this.emit(m); }
                break;
            case 'log':
                if (e.id === this.workers[0].id || !this.workers[0].alive) this.emit(m);
                break;
            case 'error':
                this._abort(m.message);
                break;
            case 'progress':
                e.progress = m;
                break;
            case 'heat':
                e.heat = m; e.heatNew = true;
                break;
            case 'best':
                e.best = m;
                this._considerBest(e, m);
                break;
            case 'done':
                e.done = true; e.finalSteps = m.steps;
                if (++this.doneCount >= this._alive().length) this._finalise();
                break;
        }
    }

    _onWorkerCrash(e, message) {
        if (!e.alive) return;
        e.alive = false;
        try { e.w.terminate(); } catch (_) {}
        console.error('RandyJSPool: worker ' + e.id + ' stopped: ' + message);
        if (!this._alive().length) { this._abort('Randy (JS workers) stopped: ' + message); return; }
        if (e.done) this.doneCount--;
        this.emit({ type: 'log', message: `Worker ${e.id} stopped (${message}); continuing with ${this._alive().length}.` });
        if (this.doneCount >= this._alive().length && this.quit) this._finalise();
    }

    _abort(message) {
        if (!this.running) return;
        this._teardown();
        this.emit({ type: 'error', message });
    }

    _teardown() {
        clearTimeout(this.timer); clearTimeout(this.cancelTimer);
        for (const e of this.workers) { e.alive = false; try { e.w.terminate(); } catch (_) {} }
        this.running = false;
    }

    _better(a, b) {
        if (!b || !(b.frames > 0)) return !!a && a.frames > 0 && a.dist >= 0;
        if (!a || !(a.frames > 0) || a.dist < 0) return false;
        if (this.goalTile) {
            const EPS = 1e-9, ia = a.dist * a.dist <= EPS, ib = b.dist * b.dist <= EPS;
            if (ia !== ib) return ia;
            if (ia && ib) return a.cost < b.cost;
        }
        return a.dist < b.dist;
    }

    _considerBest(e, m) {
        if (m.gv !== this.goalVer || !(m.frames > 0)) return;
        if (!this.gBest || this._better(m, this.gBest.m)) {
            this.gBest = { wid: e.id, m };
            this.bestPending = true;
        }
    }


    _tick() {
        if (!this.running || this.finalising) return;
        const now = performance.now(), t = (now - this.t0) / 1000;
        if (!this.quit && this.maxSeconds > 0 && t >= this.maxSeconds) this._stopAll('time limit');

        if (this.bestPending && !this.gBest) this.bestPending = false;
        if (this.bestPending && now - this.lastBestEmit >= 250) {
            this.bestPending = false; this.lastBestEmit = now;
            this.emit(this._bestForUi(this.gBest.m));
            this._shareBest();
        }
        if (now - this.lastHeatEmit >= 2000) { this.lastHeatEmit = now; this._emitHeat(); }
        if (now - this.lastProgEmit >= 500) { this.lastProgEmit = now; this._emitProgress(t); }
    }

    _bestForUi(m) { const o = Object.assign({}, m); delete o.gv; return o; }

    _shareBest() {
        const g = this.gBest;
        if (!g || g.m === this.migrated || !g.m.inputs || !g.m.inputs.length) return;
        this.migrated = g.m;
        for (const e of this.workers) {
            if (!e.alive || e.id === g.wid || e.done) continue;
            e.w.postMessage({ kind: 'seedInputs', inputs: Uint8Array.from(g.m.inputs) });
        }
    }

    _emitProgress(t) {
        let steps = 0, ips = 0, nodes = 0;
        for (const e of this._alive()) if (e.progress) { steps += e.progress.steps; ips += e.progress.ips; nodes += e.progress.nodes; }
        const b = this.gBest ? this.gBest.m : null;
        this.emit({ type: 'progress', t, steps, ips, nodes, paused: this.paused ? 1 : 0,
                    bestFrames: b ? b.frames : 0, bestDist: b && b.dist >= 0 ? b.dist : -1 });
    }

    _emitHeat(force) {
        const parts = this.workers.filter(e => e.heat && (e.alive || force));
        if (!parts.length || (!force && !parts.some(e => e.heatNew))) return;
        for (const e of parts) e.heatNew = false;
        const first = parts[0].heat;
        const cells = parts.length === 1 ? first.cells : RandyJSPool._mergeHeat(parts);
        this.emit({ type: 'heat', gridRes: first.gridRes, codeLen: first.codeLen, cap: first.cap, cells, n: cells.length / 3 });
    }

    static _mergeHeat(parts) {
        let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity, total = 0;
        for (const e of parts) {
            const c = e.heat.cells; total += c.length;
            for (let i = 0; i < c.length; i += 3) {
                if (c[i] < x0) x0 = c[i]; if (c[i] > x1) x1 = c[i];
                if (c[i + 1] < y0) y0 = c[i + 1]; if (c[i + 1] > y1) y1 = c[i + 1];
            }
        }
        if (!(x1 >= x0)) return new Int32Array(0);
        const w = x1 - x0 + 1, h = y1 - y0 + 1;
        if (w * h <= (1 << 25)) {
            const t = new Int32Array(w * h).fill(0x7fffffff);
            for (const e of parts) {
                const c = e.heat.cells;
                for (let i = 0; i < c.length; i += 3) { const k = (c[i] - x0) * h + (c[i + 1] - y0); if (c[i + 2] < t[k]) t[k] = c[i + 2]; }
            }
            let n = 0;
            for (let k = 0; k < t.length; k++) if (t[k] !== 0x7fffffff) n++;
            const out = new Int32Array(n * 3);
            let o = 0;
            for (let k = 0; k < t.length; k++) if (t[k] !== 0x7fffffff) { out[o++] = x0 + Math.floor(k / h); out[o++] = y0 + k % h; out[o++] = t[k]; }
            return out;
        }
        const at = new Map(), out = [];
        for (const e of parts) {
            const c = e.heat.cells;
            for (let i = 0; i < c.length; i += 3) {
                const key = (c[i] + 1048576) * 2097152 + (c[i + 1] + 1048576);
                const j = at.get(key);
                if (j === undefined) { at.set(key, out.length); out.push(c[i], c[i + 1], c[i + 2]); }
                else if (c[i + 2] < out[j + 2]) out[j + 2] = c[i + 2];
            }
        }
        return Int32Array.from(out);
    }


    _stopAll(reason) {
        this.quit = true; this.reason = reason;
        for (const e of this._alive()) e.w.postMessage({ kind: 'stop', reason });
        clearTimeout(this.cancelTimer);
        this.cancelTimer = setTimeout(() => { if (this.running) this._finalise(); }, 5000);
    }

    _finalise() {
        if (this.finalising) return;
        this.finalising = true;
        this._emitHeat(true);
        let finalBest = this.gBest ? this.gBest.m : null;
        for (const e of this.workers) if (e.best && e.best.gv === this.goalVer && this._better(e.best, finalBest)) finalBest = e.best;
        if (finalBest) this.emit(this._bestForUi(finalBest));
        let steps = 0;
        for (const e of this.workers) steps += e.finalSteps !== undefined ? e.finalSteps : (e.progress ? e.progress.steps : 0);
        const t = (performance.now() - this.t0) / 1000;
        this._teardown();
        this.emit({ type: 'done', reason: this.reason, t, steps });
    }


    cmd(text) {
        if (this.fallback) return this.fallback.cmd(text);
        if (!this.running) return;
        const t = String(text).trim();
        if (t === 'pause') this.paused = true;
        else if (t === 'resume') this.paused = false;
        else if (t === 'cancel') {
            this.quit = true; this.reason = 'cancelled';
            if (this.workers.length) {
                clearTimeout(this.cancelTimer);
                this.cancelTimer = setTimeout(() => { if (this.running && !this.finalising) this._finalise(); }, 5000);
            }
        }
        else if (t === 'snapshot') { this.lastHeatEmit = 0; this.lastBestEmit = 0; this.bestPending = !!this.gBest; }

        let ver;
        if (/^goal\s/.test(t) || /^tile\s/.test(t)) {
            ver = ++this.goalVer;
            const m = /^tile\s+(\S+)$/.exec(t); if (m) this.goalTile = +m[1] !== 0;
            this.gBest = null; this.migrated = null; this.bestPending = false;
            for (const e of this.workers) { e.best = null; }
        }
        if (!this.workers.length) return;
        for (const e of this._alive()) e.w.postMessage({ kind: 'cmd', text: t, ver });
    }

    seed(code) {
        if (this.fallback) return this.fallback.seed(code);
        let list;
        try { list = decodeReplayCode(String(code).trim()); } catch (_) { list = null; }
        if (!Array.isArray(list) || !list.length) { this.emit({ type: 'log', message: 'seed: could not read or decode replay code' }); return -1; }
        for (const e of this._alive()) e.w.postMessage({ kind: 'seedCode', code });
        this.emit({ type: 'log', message: `seed: seeded from replay (${list.length} frames)` });
        return list.length;
    }
}

if (typeof window !== 'undefined') window.RandyJSPool = RandyJSPool;
