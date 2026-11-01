
const RJ_CODE_HEADER = 18;
const RJ_FRAME_CEILING = 4000;
const RJ_KEYSTR = ['', 'D', 'A', 'AD', 'S', 'SD', 'AS', 'ASD', 'W', 'WD', 'WA', 'WAD', 'WS', 'WSD', 'WAS', 'WASD'];
const RJ_EMPTY_DIFF = [];

function rjDigits(n) { let d = 1; while (n >= 10) { n = Math.floor(n / 10); d++; } return d; }
function rjChangeCost(frameIdx, key) { return rjDigits(frameIdx + 1) + rjDigits(key) + 2; }
function rjTotalCodeLen(codeBody, frames) { return RJ_CODE_HEADER + codeBody + rjDigits(frames); }

const RJ_TILE = 60, RJ_BUCKETS = 10, RJ_MARGIN_TILES = 3, RJ_DENSE_CAP = 1 << 24;
function rjKey(gx, gy, bucket) { return ((gx + 1048576) * 2097152 + (gy + 1048576)) * 16 + bucket; }

class RJGrid {
    constructor(res, widthPx, heightPx) {
        const m = RJ_TILE * RJ_MARGIN_TILES;
        this.ox = Math.floor(-m / res); this.oy = this.ox;
        this.nx = Math.floor((widthPx + m) / res) - this.ox + 1;
        this.ny = Math.floor((heightPx + m) / res) - this.oy + 1;
        const cells = this.nx * this.ny * RJ_BUCKETS;
        this.cells = (cells > 0 && cells <= RJ_DENSE_CAP) ? new Int32Array(cells) : null;
        this.map = new Map();
        this.nodes = [];
    }
    _idx(gx, gy, b) {
        const x = gx - this.ox, y = gy - this.oy;
        if (this.cells === null || !(x >= 0 && x < this.nx && y >= 0 && y < this.ny && b >= 0 && b < RJ_BUCKETS)) return -1;
        return (x * this.ny + y) * RJ_BUCKETS + b;
    }
    get(gx, gy, b) {
        const i = this._idx(gx, gy, b);
        if (i >= 0) { const s = this.cells[i]; return s === 0 ? undefined : this.nodes[s - 1]; }
        return this.map.get(rjKey(gx, gy, b));
    }
    add(n) {
        n.slot = this.nodes.length; this.nodes.push(n);
        const i = this._idx(n.gx, n.gy, n.bucket);
        if (i >= 0) this.cells[i] = n.slot + 1; else this.map.set(rjKey(n.gx, n.gy, n.bucket), n);
    }
    remove(n) {
        const i = this._idx(n.gx, n.gy, n.bucket);
        if (i >= 0) this.cells[i] = 0; else this.map.delete(rjKey(n.gx, n.gy, n.bucket));
        const last = this.nodes.pop();
        if (last !== n) {
            this.nodes[n.slot] = last; last.slot = n.slot;
            const j = this._idx(last.gx, last.gy, last.bucket);
            if (j >= 0) this.cells[j] = last.slot + 1;
        }
    }
}

function rjRouteInputs(seg, len, frames) {
    const out = new Uint8Array(frames);
    let pos = frames, cnt = len;
    while (seg && pos > 0) { pos -= cnt; out.set(seg.data.subarray(0, cnt), pos); cnt = seg.prevLen; seg = seg.prev; }
    return out;
}

class RandyJS {
    constructor(emit) {
        this.emit = emit;
        this.running = false;
        this.paused = false;
        this.quit = false;
        this.reason = 'finished';
    }


    async start(p) {
        this.running = true; this.quit = false; this.paused = false; this.reason = 'finished';

        const L = p.levelData || LevelRenderer.getDataFromCode(p.levelCode);
        if (!L || !L.map || !L.map.length) { this.emit({ type: 'error', message: 'bad level code' }); this.running = false; return; }
        this.levelData = L;

        const ph = new AppelPhysics(L.map.slice(), L.rotations, L.MAP_DATA, L.size_x);
        ph.sfx = () => {};
        ph.particle = () => {};
        if (ph.touching && ph.touching.loadPromise) { try { await ph.touching.loadPromise; } catch (_) {} }
        this.ph = ph;
        ph._md = new Set();

        let state, startMap;
        const full = p.fullStart;
        if (full && full.state) {
            state = JSON.parse(full.state);
            startMap = Array.from(full.map);
            if (p.stateJson) {
                try { Object.assign(state, JSON.parse(p.stateJson)); } catch (_) {}
            }
        } else {
            startMap = Array.from(L.map);
            ph.MAP = startMap.slice();
            state = ph.createDefaultGameState(ph.spawnOBJ(L));
            if (p.stateJson) {
                try {
                    Object.assign(state, JSON.parse(p.stateJson));
                    this.emit({ type: 'log', message: 'Start state has no mob data (only the player fields): mobs start from their level positions. Use SET START STATE (CURRENT FRAME) to capture the whole frame.' });
                } catch (_) {}
            }
        }
        ph.MAP = startMap.slice();
        this.M0 = startMap;
        this.startMap = startMap;
        this.startJson = JSON.stringify(state);

        this.gridRes = Math.max(1, Math.floor(p.gridRes || 5));
        this.mutateRate = p.mutate != null ? p.mutate : 0.2;
        this.mutateSpread = 4.0;
        this.stepFrames = Math.max(1, Math.floor(p.step || 30));
        this.codeLen = !!p.codeLen;
        this.maxFrames = p.maxFrames > 0 ? Math.floor(p.maxFrames) : 125;
        this.maxCodeLen = p.maxCodeLen > 0 ? Math.floor(p.maxCodeLen) : 200;
        this.killRadius = Math.max(0, p.killRadius || 0);
        this.spawnWindow = Math.max(0, Math.floor(p.spawnWindow || 0));
        this.w = (p.weights && p.weights.length === 4) ? p.weights.slice() : [30, 30, 20, 50];
        this.goalX = p.goalX != null ? p.goalX : 500;
        this.goalY = p.goalY != null ? p.goalY : 500;
        this.goalTile = !!p.goalTile;
        this.tileSize = p.tileSize > 0 ? p.tileSize : 60;
        this.kz = (p.killZone && p.killZone.r > 0) ? { x: p.killZone.x, y: p.killZone.y, r: p.killZone.r } : null;
        this.maxSeconds = p.maxSeconds || 0;
        this.fixedBatch = Math.floor(p.simSteps || 0);

        this.grid = new RJGrid(this.gridRes, L.size_x * RJ_TILE, Math.ceil(L.map.length / L.size_x) * RJ_TILE);
        this.eligible = [];
        this.radius = [];
        this.pathX = []; this.pathY = [];
        this.bestDist2 = 1e18; this.bestFrames = 0; this.bestCost = 0; this.bestSeg = null; this.bestSegLen = 0; this._bestInputsCache = null; this.bestScore = -999999;
        this.totalSteps = 0;
        this.pathDirty = true;
        this.lastPathTime = 0;

        this._seedStart(state);

        this.emit({
            type: 'init', gridRes: this.gridRes, lsx: L.size_x, maxFrames: this.maxFrames, codeLen: this.codeLen ? 1 : 0,
            maxCodeLen: this.maxCodeLen, start: [state.PLAYER_X, state.PLAYER_Y], goal: [this.goalX, this.goalY],
            tile: this.goalTile ? 1 : 0, tileSize: this.tileSize, spikes: 1,
        });

        if (p.seedReplay) this.seed(p.seedReplay);

        this._loop();
    }


    _snapMap() {
        const md = this.ph._md;
        if (!md.size) return RJ_EMPTY_DIFF;
        const MAP = this.ph.MAP, out = [];
        for (const i of md) out.push(i, MAP[i]);
        return out;
    }

    _loadMap(diff) {
        const ph = this.ph, MAP = ph.MAP, M0 = this.M0, md = ph._md;
        if (md.size) { for (const i of md) MAP[i] = M0[i]; md.clear(); }
        for (let k = 0; k < diff.length; k += 2) { MAP[diff[k]] = diff[k + 1]; md.add(diff[k]); }
    }


    _makeCost(codeBody, frames) {
        if (!this.codeLen) return frames;
        return rjTotalCodeLen(codeBody, frames) * 4096 + Math.min(frames, 4095);
    }
    _frameLimit() { return this.codeLen ? RJ_FRAME_CEILING : this.maxFrames; }
    _nodeCodeLen(n) { return rjTotalCodeLen(n.codeBody, n.frames); }
    _spawnMetric(n) { return this.codeLen ? this._nodeCodeLen(n) : n.frames; }

    static bucketOf(s) {
        if (s.player_wall !== null && s.player_wall !== undefined) return 4;
        const sx = s.PLAYER_SX;
        const sb = sx < -7 ? 0 : sx < 0 ? 1 : sx < 7 ? 2 : 3;
        if (s.is_jumping > 100 && s.is_falling < 3) return 9;
        if (s.is_jumping > 100) return 5 + sb;
        return sb;
    }

    get bestInputs() {
        if (!this._bestInputsCache || this._bestInputsCache.length !== this.bestFrames)
            this._bestInputsCache = rjRouteInputs(this.bestSeg, this.bestSegLen, this.bestFrames);
        return this._bestInputsCache;
    }
    _setBest(n) {
        this.bestFrames = n.frames; this.bestCost = n.cost; this.bestSeg = n.seg; this.bestSegLen = n.segLen; this._bestInputsCache = null;
    }


    _dist2(x, y) {
        if (this.goalTile) {
            const size = this.tileSize > 0 ? this.tileSize : this.gridRes;
            const minX = Math.floor(this.goalX / size) * size, minY = Math.floor(this.goalY / size) * size;
            const cx = x < minX ? minX : x > minX + size ? minX + size : x;
            const cy = y < minY ? minY : y > minY + size ? minY + size : y;
            const dx = x - cx, dy = y - cy;
            return dx * dx + dy * dy;
        }
        const dx = x - this.goalX, dy = y - this.goalY;
        return dx * dx + dy * dy;
    }

    _isNewBest(d2, cost) {
        if (!this.goalTile) return d2 < this.bestDist2;
        const EPS = 1e-9, inside = d2 <= EPS, cur = this.bestDist2 <= EPS;
        if (inside !== cur) return inside;
        if (inside && cur) return cost < this.bestCost;
        return d2 < this.bestDist2;
    }

    _zonesActive() { return this.killRadius > 0 || !!this.kz; }

    _inSpawnZone(x, y) {
        const kz = this.kz;
        if (kz) { const dx = x - kz.x, dy = y - kz.y; if (dx * dx + dy * dy > kz.r * kz.r) return false; }
        const r = this.killRadius;
        if (r > 0 && this.pathX.length) {
            const r2 = r * r, px = this.pathX, py = this.pathY;
            for (let i = 0; i < px.length; i++) {
                const dx = x - px[i], dy = y - py[i];
                if (dx * dx + dy * dy <= r2) return true;
            }
            return false;
        }
        return true;
    }


    _seedStart(state) {
        const gx = Math.floor(state.PLAYER_X / this.gridRes), gy = Math.floor(state.PLAYER_Y / this.gridRes);
        const bucket = RandyJS.bucketOf(state);
        const n = { gx, gy, bucket, frames: 0, cost: 0, codeBody: 0, state: JSON.stringify(state), x: state.PLAYER_X, y: state.PLAYER_Y,
                    seg: null, segLen: 0, md: RJ_EMPTY_DIFF, active: true, slot: 0 };
        this.grid.add(n);
        this.eligible.push(n);
        this.radius.push(n);
    }

    _place(gx, gy, bucket, state, frames, cost, codeBody, seg, segLen) {
        let n = this.grid.get(gx, gy, bucket);
        if (n && n.active && cost >= n.cost) return;
        const was = !!(n && n.active);
        if (!n) { n = { gx, gy, bucket, active: false, slot: 0 }; this.grid.add(n); }
        n.active = true; n.frames = frames; n.cost = cost; n.codeBody = codeBody;
        n.state = JSON.stringify(state);
        n.x = state.PLAYER_X; n.y = state.PLAYER_Y;
        n.seg = seg; n.segLen = segLen;
        n.md = this._snapMap();

        const d2 = this._dist2(state.PLAYER_X, state.PLAYER_Y);
        if (this._isNewBest(d2, cost)) {
            this.bestDist2 = d2; this.bestScore = -Math.sqrt(d2);
            this._setBest(n);
            this.pathDirty = true;
        }
        if (!was) {
            this.eligible.push(n);
            if (this._zonesActive() && this._inSpawnZone(state.PLAYER_X, state.PLAYER_Y)) this.radius.push(n);
        }
    }

    _rebuildBest() {
        this.bestScore = -999999; this.bestDist2 = 1e18; this.bestFrames = 0; this.bestCost = 0; this.bestSeg = null; this.bestSegLen = 0; this._bestInputsCache = null;
        for (const n of this.grid.nodes) {
            if (!n.active) continue;
            const d2 = this._dist2(n.x, n.y);
            if (this._isNewBest(d2, n.cost)) {
                this.bestDist2 = d2; this.bestScore = -Math.sqrt(d2);
                this._setBest(n);
            }
        }
        this.pathDirty = true;
    }

    _updatePath() {
        this._loadMap([]);
        const s = JSON.parse(this.startJson), bi = this.bestInputs;
        this.pathX = []; this.pathY = [];
        for (let i = 0; i < this.bestFrames; i++) {
            this.ph.tick(s, RJ_KEYSTR[bi[i]]);
            this.pathX.push(s.PLAYER_X); this.pathY.push(s.PLAYER_Y);
        }
        if (!this._zonesActive()) { this.radius = []; return; }

        this.radius = [];
        let pruned = false;
        for (let i = this.eligible.length - 1; i >= 0; i--) {
            const n = this.eligible[i];
            if (this._inSpawnZone(n.x, n.y)) { this.radius.push(n); continue; }
            this.eligible[i] = this.eligible[this.eligible.length - 1];
            this.eligible.pop();
            this.grid.remove(n);
            n.active = false;
            pruned = true;
        }
        return pruned;
    }


    _step() {
        const ph = this.ph;
        const zones = this._zonesActive();
        const pool = (zones && this.radius.length > 0) ? this.radius : this.eligible;
        const pc = pool.length;
        if (pc === 0) return false;

        let parent = null;
        if (this.spawnWindow > 0) {
            const minF = Math.max(0, (this.codeLen ? this.maxCodeLen : this.maxFrames) - this.spawnWindow);
            for (let t = 0; t < 32; t++) {
                const c = pool[(Math.random() * pc) | 0];
                if (this._spawnMetric(c) >= minF) { parent = c; break; }
            }
            if (!parent) for (let i = 0; i < pc; i++) if (this._spawnMetric(pool[i]) >= minF) { parent = pool[i]; break; }
        }
        if (!parent) parent = pool[(Math.random() * pc) | 0];

        this._loadMap(parent.md);
        const state = JSON.parse(parent.state);
        const startFrames = parent.frames;
        let frames = startFrames;
        const maxFrames = this._frameLimit(), codeMode = this.codeLen, maxCode = this.maxCodeLen;
        const seg = { prev: parent.seg, prevLen: parent.segLen, data: new Uint8Array(Math.max(1, Math.min(this.stepFrames, maxFrames - startFrames))) };
        const data = seg.data;
        let keys = frames > 0 ? parent.seg.data[parent.segLen - 1] : 0;
        let last = frames > 0 ? keys : -1;
        let codeBody = parent.codeBody;

        const wD = this.w[3] / 100, wA = this.w[1] / 100, wS = this.w[2] / 100, wW = this.w[0] / 100;
        let rate = this.mutateRate;
        if (this.mutateSpread > 1) { rate *= Math.exp((2 * Math.random() - 1) * Math.log(this.mutateSpread)); if (rate > 1) rate = 1; }
        const gridRes = this.gridRes;
        let pgx = NaN, pgy = NaN, pb = -1;

        for (let f = 0; f < this.stepFrames; f++) {
            if (state.PLAYER_DEATH) break;
            if (frames >= maxFrames) break;

            if (Math.random() < rate) {
                keys &= ~15;
                if (Math.random() < wD) keys |= 1;
                if (Math.random() < wA) keys |= 2;
                if (Math.random() < wS) keys |= 4;
                if (Math.random() < wW) keys |= 8;
                if ((keys & 3) === 3) keys &= ~(Math.random() < 0.5 ? 1 : 2);
            }

            const addCost = (keys !== last) ? rjChangeCost(frames, keys) : 0;
            if (codeMode && rjTotalCodeLen(codeBody + addCost, frames + 1) > maxCode) break;
            codeBody += addCost;

            ph.tick(state, RJ_KEYSTR[keys]);
            if (state.PLAYER_DEATH) break;
            data[frames - startFrames] = keys;
            last = keys;
            frames++;

            const gx = Math.floor(state.PLAYER_X / gridRes), gy = Math.floor(state.PLAYER_Y / gridRes);
            const bucket = RandyJS.bucketOf(state);
            if (gx !== pgx || gy !== pgy || bucket !== pb) {
                pgx = gx; pgy = gy; pb = bucket;
                if (!(codeMode && rjTotalCodeLen(codeBody, frames) > maxCode)) {
                    this._place(gx, gy, bucket, state, frames, this._makeCost(codeBody, frames), codeBody, seg, frames - startFrames);
                }
            }

            if (frames >= maxFrames) break;
            if (zones && !this._inSpawnZone(state.PLAYER_X, state.PLAYER_Y)) break;
        }
        this.totalSteps++;
        return true;
    }


    seed(code) {
        let list;
        try { list = decodeReplayCode(code.trim()); } catch (_) { list = null; }
        if (!Array.isArray(list) || !list.length) { this.emit({ type: 'log', message: 'seed: could not read or decode replay code' }); return -1; }
        const codes = new Uint8Array(list.length);
        for (let i = 0; i < codes.length; i++) codes[i] = keyCode(list[i] || '');
        this.seedInputs(codes, false);
        return list.length;
    }

    seedInputs(src, quiet) {
        const ph = this.ph;
        this._loadMap([]);
        const state = JSON.parse(this.startJson);
        const inputs = new Uint8Array(Math.min(src.length, this._frameLimit()));
        const seedSeg = { prev: null, prevLen: 0, data: inputs };
        for (let i = 0; i < inputs.length; i++) inputs[i] = src[i] & 15;
        let frames = 0, codeBody = 0;
        for (let i = 0; i < inputs.length; i++) {
            if (state.PLAYER_DEATH) break;
            if (i === 0 || inputs[i] !== inputs[i - 1]) codeBody += rjChangeCost(i, inputs[i]);
            if (this.codeLen && rjTotalCodeLen(codeBody, frames + 1) > this.maxCodeLen) break;
            ph.tick(state, RJ_KEYSTR[inputs[i]]);
            if (state.PLAYER_DEATH) break;
            frames++;
            const gx = Math.floor(state.PLAYER_X / this.gridRes), gy = Math.floor(state.PLAYER_Y / this.gridRes);
            const bucket = RandyJS.bucketOf(state);
            if (frames > this._frameLimit()) break;
            if (this.codeLen && rjTotalCodeLen(codeBody, frames) > this.maxCodeLen) continue;
            this._place(gx, gy, bucket, state, frames, this._makeCost(codeBody, frames), codeBody, seedSeg, frames);
        }
        if (!quiet) this.emit({ type: 'log', message: `seed: seeded from replay (${src.length} frames)` });
        this.bestDirty = true;
        return src.length;
    }


    cmd(text) {
        const t = String(text).trim();
        let m;
        if (t === 'pause') this.paused = true;
        else if (t === 'resume') this.paused = false;
        else if (t === 'cancel') { this.quit = true; this.reason = 'cancelled'; }
        else if (t === 'snapshot') { this._emitHeat(); this._emitBest(); }
        else if ((m = /^goal\s+(\S+)\s+(\S+)$/.exec(t))) { this.goalX = +m[1]; this.goalY = +m[2]; this._rebuildBest(); this._updatePath(); this.bestDirty = true; }
        else if ((m = /^tile\s+(\S+)$/.exec(t))) { this.goalTile = +m[1] !== 0; this._rebuildBest(); this._updatePath(); this.bestDirty = true; }
        else if ((m = /^killzone\s+(\S+)\s+(\S+)\s+(\S+)$/.exec(t))) { const r = +m[3]; this.kz = r > 0 ? { x: +m[1], y: +m[2], r } : null; this.pathDirty = true; }
        else if (t === 'killzone off') { this.kz = null; this.pathDirty = true; }
        else if ((m = /^set weights\s+(\S+)\s+(\S+)\s+(\S+)\s+(\S+)$/.exec(t))) { this.w = [+m[1], +m[2], +m[3], +m[4]]; }
        else if ((m = /^set (\w+)\s+(\S+)$/.exec(t))) {
            const k = m[1], a = +m[2];
            if (k === 'mutate') this.mutateRate = a;
            else if (k === 'step') this.stepFrames = a < 1 ? 1 : Math.floor(a);
            else if (k === 'killradius') { this.killRadius = a < 0 ? 0 : a; this.pathDirty = true; }
            else if (k === 'spawnwindow') this.spawnWindow = a < 0 ? 0 : Math.floor(a);
            else if (k === 'simsteps') this.fixedBatch = Math.floor(a);
            else if (k === 'maxframes' && !this.codeLen && a > this.maxFrames) this.maxFrames = Math.floor(a);
            else if (k === 'maxcodelen' && a > 0) this.maxCodeLen = Math.floor(a);
        }
    }


    _emitHeat() {
        const cells = [];
        const useCode = this.codeLen;
        for (const n of this.grid.nodes) {
            if (!n.active) continue;
            cells.push(n.gx, n.gy, useCode ? this._nodeCodeLen(n) : n.frames);
            if (cells.length >= 1800000) break;
        }
        this.emit({ type: 'heat', gridRes: this.gridRes, codeLen: useCode ? 1 : 0, cap: useCode ? this.maxCodeLen : this.maxFrames, cells, n: cells.length / 3 });
    }

    static replayCode(inputs, count) {
        if (count <= 0) return 'NO_PATH_GENERATED';
        const parts = [];
        let last = -1;
        for (let i = 0; i < count; i++) if (inputs[i] !== last) { parts.push(String(i + 1), String(inputs[i])); last = inputs[i]; }
        parts.push(String(count));
        const slot = (typeof AppelPhysics.formatEyeSpin === 'function') ? AppelPhysics.formatEyeSpin(AppelPhysics.EYE_SPIN) : '';
        const body = 'TASǇ' + slot + 'Ǉ12Ǉ0Ǉ' + parts.join('Ǉ');
        return String(12345678 + body.length) + body;
    }

    _emitBest() {
        const frames = this.bestFrames;
        const msg = { type: 'best', frames, dist: this.bestDist2 < 1e17 ? Math.sqrt(this.bestDist2) : -1, score: this.bestScore, cost: this.bestCost };
        if (frames > 0) {
            this._loadMap([]);
            const s = JSON.parse(this.startJson), bi = this.bestInputs;
            const path = [s.PLAYER_X, s.PLAYER_Y];
            for (let i = 0; i < frames; i++) { this.ph.tick(s, RJ_KEYSTR[bi[i]]); path.push(s.PLAYER_X, s.PLAYER_Y); }
            msg.path = path.map(v => Math.round(v * 10) / 10);
            msg.code = RandyJS.replayCode(bi, frames);
            msg.codeLen = msg.code.length;
            msg.inputs = Array.from(bi.subarray(0, frames));
        }
        this.emit(msg);
    }


    _loop() {
        const t0 = performance.now();
        let lastProg = 0, lastHeat = 0, lastBest = 0, lastIpsT = t0, lastIpsSteps = 0, ips = 0;
        let seenBest = [this.bestScore, this.bestFrames, this.bestCost];
        this.bestDirty = true;

        const tick = () => {
            if (this.quit) return finish();
            const now = performance.now();
            const t = (now - t0) / 1000;
            if (this.maxSeconds > 0 && t >= this.maxSeconds) { this.reason = 'time limit'; return finish(); }

            if (!this.paused) {
                if (this._zonesActive() && (now - this.lastPathTime > (this.pathDirty ? 80 : 400))) {
                    this._updatePath(); this.pathDirty = false; this.lastPathTime = now;
                }
                const sliceEnd = now + 25;
                if (this.fixedBatch > 0) { for (let i = 0; i < this.fixedBatch && performance.now() < sliceEnd + 200; i++) if (!this._step()) break; }
                else { while (performance.now() < sliceEnd) if (!this._step()) break; }
            }

            const n2 = performance.now(), t2 = (n2 - t0) / 1000;
            if (this.bestScore !== seenBest[0] || this.bestFrames !== seenBest[1] || this.bestCost !== seenBest[2]) {
                seenBest = [this.bestScore, this.bestFrames, this.bestCost]; this.bestDirty = true;
            }
            if (this.bestDirty && t2 - lastBest >= 0.25) { this._emitBest(); lastBest = t2; this.bestDirty = false; }
            if (n2 - lastIpsT >= 250) { ips = (this.totalSteps - lastIpsSteps) / ((n2 - lastIpsT) / 1000); lastIpsSteps = this.totalSteps; lastIpsT = n2; }
            if ((t2 - lastProg) * 1000 >= 500) {
                lastProg = t2;
                this.emit({ type: 'progress', t: t2, steps: this.totalSteps, ips, nodes: this.eligible.length, paused: this.paused ? 1 : 0, bestFrames: this.bestFrames, bestDist: this.bestDist2 < 1e17 ? Math.sqrt(this.bestDist2) : -1 });
            }
            if (t2 - lastHeat >= 2) { lastHeat = t2; this._emitHeat(); }

            setTimeout(tick, this.paused ? 20 : 0);
        };

        const finish = () => {
            this._emitHeat();
            this._emitBest();
            this.emit({ type: 'done', reason: this.reason, t: (performance.now() - t0) / 1000, steps: this.totalSteps });
            this.running = false;
        };

        setTimeout(tick, 0);
    }
}

if (typeof window !== 'undefined') window.RandyJS = RandyJS;
else if (typeof self !== 'undefined') self.RandyJS = RandyJS;
