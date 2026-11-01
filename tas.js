const PIP_SEARCH_BEAMS = [1500, 20000, 250000, 2000000, Infinity];
const ANALYSIS_CANCELLED = { cancelled: true };
const ANALYSIS_SLICE_MS = 24;
const ANALYSIS_EXACT_WEIGHT = 10;
const yieldUI = () => new Promise(r => setTimeout(r, 0));

class TASSaveState {
    constructor(tick) {
        this.tick = tick;
    }
}

class TAEditor {
    constructor(game) {
        this.game        = game;
        this.paused      = false;
        this.frameStepMode  = false;
        this.stepNextFrame  = false;
        this.currentFPS     = 30;
        this.baseFrameDuration = 1000 / this.currentFPS;
        this.gameLoopInterval  = null;

        this.inputFrames      = [];
        this._prevInputFrames = [];
        this.breakFrames  = new Set();
        this.frameTokenMap = {};

        this.savestates = { 1: null, 2: null, 3: null };

        this.frameStates = [];

        this.pxPerFrame = 4;

        this.cameraOffset = { x: 0, y: 0 };
        this.zoomMul      = 1;
        this.freeCam      = null;
        this._isPanning   = false;
        this._panLast     = { x: 0, y: 0 };

        this.handplayMode      = false;
        this._handplayHeldKeys = new Set();

        this.setupEventListeners();
        this.setupCameraPan();
        this.setupTimelineEvents();
        this.updateInputDisplay();
        this.updateReplayCode();
    }

    _mapSnapshot(map, prev) {
        if (prev && prev.length === map.length) {
            let same = true;
            for (let i = 0; i < map.length; i++) {
                if (prev[i] !== map[i]) { same = false; break; }
            }
            if (same) return prev;
        }
        return map.slice();
    }

    resimulate(forceFullResim = false) {
        if (!this.game.physics || !this.game.levelData) return;

        if (this._particles) this._particles.reset();
        const physics     = this.game.physics;
        const levelData   = this.levelData = LevelRenderer.getDataFromCode(levelCode);
        const totalFrames = this.inputFrames.length;

        let startFrame = 0;
        if (!forceFullResim && this._prevInputFrames && this.frameStates.length > 0) {
            const prevLen = this._prevInputFrames.length;
            const cmpLen  = Math.min(prevLen, totalFrames);
            startFrame    = cmpLen;
            for (let i = 0; i < cmpLen; i++) {
                if (this._prevInputFrames[i] !== this.inputFrames[i]) {
                    startFrame = i;
                    break;
                }
            }
        }

        if (startFrame === 0 || !this.frameStates[startFrame]) {
            physics.MAP = levelData.map;

            let state  = physics.createDefaultGameState(physics.spawnOBJ(levelData));
            physics.drainSounds();
            physics.drainParticles();
            let camera = { x: state.PLAYER_X, y: state.PLAYER_Y, zoom: 1.25 };

            this.frameStates = [];
            this.frameStates[0] = {
                playerState: JSON.parse(JSON.stringify(state)),
                camera:      { ...camera },
                physicsMap:  physics.MAP.slice()
            };
            let lastMap = this.frameStates[0].physicsMap;

            for (let i = 0; i < totalFrames; i++) {
                state = physics.tick(state, this.inputFrames[i] || '');

                camera.x += (state.PLAYER_X - camera.x) * 0.2;
                camera.y += ((state.PLAYER_Y - camera.y) + 8) * 0.2;

                if (state.PLAYER_DEATH) {
                    state = physics.beginExplosion(state);
                }

                this.frameStates[i + 1] = {
                    playerState: JSON.parse(JSON.stringify(state)),
                    camera:      { ...camera },
                    physicsMap:  (lastMap = this._mapSnapshot(physics.MAP, lastMap)),
                    sounds:      this._takeSounds(physics),
                    particles:   this._takeParticles(physics)
                };
            }
        } else {
            const saved    = this.frameStates[startFrame];
            const savedMap = saved.physicsMap;
            for (let i = 0; i < savedMap.length; i++) physics.MAP[i] = savedMap[i];

            physics.drainSounds();
            physics.drainParticles();
            let state  = JSON.parse(JSON.stringify(saved.playerState));
            let camera = { ...saved.camera };

            this.frameStates.length = startFrame + 1;
            let lastMap = savedMap;

            for (let i = startFrame; i < totalFrames; i++) {
                state = physics.tick(state, this.inputFrames[i] || '');

                camera.x += (state.PLAYER_X - camera.x) * 0.2;
                camera.y += ((state.PLAYER_Y - camera.y) + 8) * 0.2;

                if (state.PLAYER_DEATH) {
                    state = physics.beginExplosion(state);
                }

                this.frameStates[i + 1] = {
                    playerState: JSON.parse(JSON.stringify(state)),
                    camera:      { ...camera },
                    physicsMap:  (lastMap = this._mapSnapshot(physics.MAP, lastMap)),
                    sounds:      this._takeSounds(physics),
                    particles:   this._takeParticles(physics)
                };
            }

            if (this.frameStates.length > totalFrames + 1) {
                this.frameStates.length = totalFrames + 1;
            }
        }

        this._prevInputFrames = this.inputFrames.slice();

        const maxTick = this.frameStates.length - 1;
        if (this.game.tick > maxTick) {
            this.game.tick = maxTick;
        }

        const curFrame = this.frameStates[this.game.tick];
        if (curFrame) {
            this.game.playerState = Object.assign({}, curFrame.playerState);
            this.game.camera      = { ...curFrame.camera };
        }

        this.drawTimeline();
        this.updateTimelinePlayhead();
        this.updatePlayerStateDisplay();
        this.updateStatus();
        this._scheduleEyeAnalysis();
    }

    _takeParticles(physics) {
        const list = physics.drainParticles();
        return list.length ? list : undefined;
    }

    _takeSounds(physics) {
        const list = physics.drainSounds();
        return list.length ? list : undefined;
    }

    _playFrameSounds(tick) {
        const f = this.frameStates && this.frameStates[tick];
        if (f && f.sounds && this.game && this.game.sounds) for (const n of f.sounds) this.game.sounds.play(n);
    }

    seekToFrame(tick) {
        if (!this.frameStates || this.frameStates.length === 0) return;

        tick = Math.max(0, Math.min(tick, this.frameStates.length - 1));
        this.game.tick = tick;

        const frame = this.frameStates[tick];
        if (frame) {
            this.game.playerState = Object.assign({}, frame.playerState);
            this.game.camera      = { ...frame.camera };
            if (frame.physicsMap && this.game.physics) {
                const saved = frame.physicsMap;

                const physMap = this.game.physics.MAP;
                for (let i = 0; i < saved.length; i++) physMap[i] = saved[i];

                const ldMap = this.game.levelData && this.game.levelData.map;
                if (ldMap && ldMap !== physMap) {
                    for (let i = 0; i < saved.length; i++) ldMap[i] = saved[i];
                }
            }
        }

        this.updateTimelinePlayhead();
        this.updatePlayerStateDisplay();
        this.updateStatus();
    }

    applyFPS(fps) {
        this.currentFPS        = fps;
        this.baseFrameDuration = 1000 / fps;
        document.getElementById('fpsInput').value = fps;

        if (this.gameLoopInterval) clearInterval(this.gameLoopInterval);

        this.gameLoopInterval = window.setInterval(() => {
            if (this.game && typeof this.game.gameLoop === 'function') {
                this.game.gameLoop();
            }
        }, this.baseFrameDuration);
    }

    update() {
        if (!this.frameStates || this.frameStates.length === 0) return;

        if (this.frameStepMode) {
            if (this.stepNextFrame) {
                this.seekToFrame(this.game.tick + 1);
                this._playFrameSounds(this.game.tick);
                this.stepNextFrame = false;
            }
            return;
        }

        if (!this.paused) {
            const next = this.game.tick + 1;

            if (next >= this.frameStates.length) {
                this.paused        = true;
                this.frameStepMode = true;
                this.updateStatus();
                return;
            }

            this.seekToFrame(next);
            this._playFrameSounds(this.game.tick);

            if (this.breakFrames.has(this.game.tick)) {
                this.paused        = true;
                this.frameStepMode = true;
            }
        }
    }

    modifyGameLoop(gameInstance) {
        gameInstance.gameLoop = () => {
            gameInstance.profiler.start('Total Frame');
            gameInstance.profiler.tick();

            gameInstance.profiler.start('Physics');
            this.update();
            gameInstance.profiler.end('Physics');

            const simCam = gameInstance.camera;
            const renderCam = this._computeCam(simCam);

            gameInstance.renderer.particleHook = ctx => {
                if (typeof ParticleSystem === 'undefined') return;
                (this._particles || (this._particles = new ParticleSystem(this))).drawWorld(ctx, gameInstance.tick);
            };
            if (gameInstance.levelData) {
                gameInstance.profiler.start('Render: Level');
                gameInstance.renderer.render(gameInstance.levelData, renderCam);
                gameInstance.profiler.end('Render: Level');
            }

            const savedCam = gameInstance.camera;
            gameInstance.camera = renderCam;
            gameInstance.profiler.start('Render: Player');
            gameInstance.drawEntities();
            gameInstance.profiler.end('Render: Player');
            gameInstance.camera = savedCam;
            this.drawEyeOverlay(renderCam);
            this.drawPlayerPath(renderCam);

            gameInstance.profiler.draw(gameInstance.ctx);
            gameInstance.profiler.end('Total Frame');
        };
    }

    _computeCam(simCam) {
        const canvas = this.game.canvas;
        const zoom = simCam.zoom * this.zoomMul;
        let x, y;
        if (this.freeCam) { x = this.freeCam.x; y = this.freeCam.y; }
        else { x = simCam.x + this.cameraOffset.x; y = simCam.y + this.cameraOffset.y; }
        const minX = canvas.width / zoom / 2, minY = canvas.height / zoom / 2;
        if (x < minX) x = minX;
        if (y < minY) y = minY;
        if (this.freeCam) { this.freeCam.x = x; this.freeCam.y = y; }
        return { x, y, zoom };
    }

    _ensureFreeCam() {
        if (this.freeCam || !this.game.camera) return;
        const c = this._computeCam(this.game.camera);
        this.freeCam = { x: c.x, y: c.y };
        this._updateRecenterBtn();
    }

    recenterCamera() {
        this.freeCam = null;
        this.cameraOffset = { x: 0, y: 0 };
        this.zoomMul = 1;
        this._updateRecenterBtn();
    }

    _updateRecenterBtn() {
        const b = this._recenterBtn;
        if (!b) return;
        const moved = !!this.freeCam || this.zoomMul !== 1;
        b.style.opacity = moved ? '1' : '0.5';
        b.style.borderColor = moved ? '#ffff00' : '#555';
    }

    setupCameraPan() {

        const init = () => {
            const canvas = document.getElementById('gameCanvas');
            if (!canvas) { setTimeout(init, 100); return; }

            canvas.style.cursor = 'grab';

            canvas.addEventListener('mousemove', (e) => {
                if (this._isPanning) return;
                const eye = this._eyeAt(e, canvas);
                this._hoverEye = eye ? eye.idx : null;
                canvas.style.cursor = eye ? 'pointer' : 'grab';
            });
            canvas.addEventListener('mouseleave', () => { this._hoverEye = null; });

            canvas.addEventListener('mousedown', (e) => {
                if (e.button !== 0) return;
                const eye = this._eyeAt(e, canvas);
                if (eye) { (eye.pip ? this._openPipPopup(eye, e) : this._openEyePopup(eye, e)); e.preventDefault(); return; }
                this._closeEyePopup();
                document.getElementById('inputEditor').blur();
                this._isPanning = true;
                this._panLast   = { x: e.clientX, y: e.clientY };
                canvas.style.cursor = 'grabbing';
                e.preventDefault();
            });

            window.addEventListener('mousemove', (e) => {
                if (!this._isPanning) return;
                const dx = e.clientX - this._panLast.x;
                const dy = e.clientY - this._panLast.y;
                this._panLast = { x: e.clientX, y: e.clientY };

                this._ensureFreeCam();
                if (!this.freeCam) return;
                const r = canvas.getBoundingClientRect();
                const z = this.game.camera.zoom * this.zoomMul;
                this.freeCam.x -= dx * (canvas.width / r.width) / z;
                this.freeCam.y += dy * (canvas.height / r.height) / z;
                this._computeCam(this.game.camera);
            });

            window.addEventListener('mouseup', () => {
                if (this._isPanning) {
                    this._isPanning = false;
                    canvas.style.cursor = 'grab';
                }
            });

            canvas.addEventListener('dblclick', () => this.recenterCamera());

            const host = canvas.parentElement;
            if (host) {
                if (getComputedStyle(host).position === 'static') host.style.position = 'relative';
                const btn = document.createElement('button');
                btn.id = 'recenterCamBtn';
                btn.textContent = 'Recenter';
                btn.title = 'Follow the player again and reset zoom (also: double-click the canvas)';
                btn.style.cssText = 'position:absolute;top:8px;right:8px;z-index:5;padding:3px 9px;font:bold 12px monospace;' +
                    'background:#000;color:#ffff00;border:1px solid #555;border-radius:3px;cursor:pointer;';
                btn.addEventListener('mousedown', (e) => e.stopPropagation());
                btn.addEventListener('click', () => this.recenterCamera());
                host.appendChild(btn);
                this._recenterBtn = btn;
                this._updateRecenterBtn();
            }

            canvas.addEventListener('wheel', (e) => {
                e.preventDefault();
                const simCam = this.game.camera;
                if (!simCam) return;
                this._ensureFreeCam();
                if (!this.freeCam) return;
                const MIN_ZOOM = 0.2, MAX_ZOOM = 8;
                const oldMul = this.zoomMul;
                const newMul = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, oldMul * Math.exp(-e.deltaY * 0.0015)));
                if (newMul === oldMul) return;
                const r  = canvas.getBoundingClientRect();
                const sx = (e.clientX - r.left) * canvas.width / r.width;
                const sy = (e.clientY - r.top)  * canvas.height / r.height;
                const oldZ = simCam.zoom * oldMul, newZ = simCam.zoom * newMul;
                const camX = this.freeCam.x, camY = this.freeCam.y;
                const wx = (sx - canvas.width / 2) / oldZ + camX;
                const wy = camY - (sy - canvas.height / 2) / oldZ;
                this.freeCam.x = wx - (sx - canvas.width / 2) / newZ;
                this.freeCam.y = wy + (sy - canvas.height / 2) / newZ;
                this.zoomMul = newMul;
                this._computeCam(simCam);
                this._updateRecenterBtn();
            }, { passive: false });
        };

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
        } else {
            init();
        }
    }

    overrideGetInputKeys() {
        this.game.getInputKeys = () => {
            if (this.game.gameState === 'WIN') return '';
            return this.inputFrames[this.game.tick] || '';
        };
    }

    wrapGameInit() {
        const tasEditor = this;
        const originalInit = this.game.init.bind(this.game);
        let isWrapped = false;

        const originalCheckLoadStatus = this.game.checkLoadStatus.bind(this.game);
        this.game.checkLoadStatus = function () {
            const wasLoading = this.gameState !== 'PLAY';
            originalCheckLoadStatus();
            if (wasLoading && this.gameState === 'PLAY') {
                tasEditor.resimulate(true);
                tasEditor.seekToFrame(0);
            }
        };

        this.game.init = function (levelCode) {
            tasEditor.frameStates = [];
            tasEditor.recenterCamera();

            if (tasEditor.gameLoopInterval) {
                clearInterval(tasEditor.gameLoopInterval);
                tasEditor.gameLoopInterval = null;
            }

            if (!isWrapped) {
                const originalSetInterval = window.setInterval;
                window.setInterval = function (...args) {
                    const id = originalSetInterval.apply(window, args);
                    tasEditor.gameLoopInterval = id;
                    return id;
                };
                isWrapped = true;
            }

            originalInit(levelCode);
            tasEditor.renderEyeSpinUI();
        };
    }

    _eyeSpinChanged() {
        this.updateReplayCode();
        this.resimulate(true);
        this.highlightCurrentInput();
        if (this._eyePopup && this._eyePopup.refresh) this._eyePopup.refresh();
    }

    renderEyeSpinUI() {
        this._eyeRoots = [];
        this._pipRoots = [];
        this._cancelAnalysis();
        this._eyeStats = null; this._rngNote = null;
        this._closeEyePopup();
        const ld = this.game && this.game.levelData, ph = this.game && this.game.physics;
        if (ld && ph) {
            try {
                for (const o of ph.spawnOBJ(ld)) {
                    if (o.typ === 'eyelauncher') this._eyeRoots.push({ idx: o.idx, x: o.rootX, y: o.rootY });
                    else if (o.typ === 'pip' && o.k === 0) this._pipRoots.push({ idx: o.idx, x: o.rootX, y: o.rootY, pip: true });
                }
            } catch (e) { console.warn('eye launcher scan failed', e); }
        }
        this._refreshCalcUI();
    }

    _eyeAt(e, canvas) {
        const g = this.game, cam = this._renderCam;
        if (!cam || !((this._eyeRoots && this._eyeRoots.length) || (this._pipRoots && this._pipRoots.length))) return null;
        const r = canvas.getBoundingClientRect();
        const sx = (e.clientX - r.left) * canvas.width / r.width, sy = (e.clientY - r.top) * canvas.height / r.height;
        const wx = (sx - canvas.width / 2) / cam.zoom + cam.x;
        const wy = cam.y - (sy - canvas.height / 2) / cam.zoom;
        for (const eye of (this._eyeRoots || [])) if (Math.abs(wx - eye.x) <= 24 && Math.abs(wy - eye.y) <= 24) return eye;
        for (const pip of (this._pipRoots || [])) if (Math.abs(wx - pip.x) <= 26 && Math.abs(wy - pip.y) <= 26) return pip;
        return null;
    }

    drawPlayerPath(cam) {
        const chk = document.getElementById('showPathChk');
        if (chk && !chk.checked) return;
        const fs = this.frameStates;
        if (!fs || fs.length < 2) return;
        const ctx = this.game.ctx, canvas = this.game.canvas, cur = Math.min(this.game.tick, fs.length - 1);
        const z = cam.zoom;
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.scale(z, z);
        ctx.translate(-cam.x, cam.y);
        ctx.lineWidth = 2 / z; ctx.lineJoin = 'round'; ctx.setLineDash([]);
        let color = null, pen = false;
        const flush = () => { if (pen) ctx.stroke(); pen = false; };
        for (let i = 1; i < fs.length; i++) {
            const p = fs[i].playerState, prev = fs[i - 1].playerState;
            const cut = p.EXPLODE || prev.EXPLODE || Math.abs(p.PLAYER_X - prev.PLAYER_X) > 150 || Math.abs(p.PLAYER_Y - prev.PLAYER_Y) > 150;
            if (cut) { flush(); continue; }
            const c = i <= cur ? this.getInputColor(this.inputFrames[i - 1] || '') : '#000000';
            if (c !== color) { flush(); color = c; }
            if (!pen) { ctx.strokeStyle = c; ctx.beginPath(); ctx.moveTo(prev.PLAYER_X, -prev.PLAYER_Y); pen = true; }
            ctx.lineTo(p.PLAYER_X, -p.PLAYER_Y);
        }
        flush();
        const p = fs[cur].playerState;
        ctx.fillStyle = '#ffff00';
        ctx.beginPath(); ctx.arc(p.PLAYER_X, -p.PLAYER_Y, 3 / z, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
    }

    drawEyeOverlay(cam) {
        this._renderCam = cam;
        const ctx = this.game.ctx, canvas = this.game.canvas;
        if (!(this._eyeRoots && this._eyeRoots.length) && !(this._pipRoots && this._pipRoots.length)) return;
        const per = AppelPhysics.EYE_SPIN.per;
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.scale(cam.zoom, cam.zoom);
        ctx.translate(-cam.x, cam.y);
        for (const pip of (this._pipRoots || [])) {
            const hot = this._hoverEye === pip.idx || (this._eyePopup && this._eyePopup.idx === pip.idx);
            const hops = AppelPhysics.pipScriptSize(pip.idx), variant = hops > 0;
            ctx.save();
            ctx.translate(pip.x, -pip.y);
            if (hot) { ctx.fillStyle = 'rgba(255,255,0,0.28)'; ctx.fillRect(-26, -26, 52, 52); }
            ctx.lineWidth = hot ? 3 : 1.5;
            ctx.strokeStyle = hot ? '#ffff00' : (variant ? 'rgba(0,255,85,0.9)' : 'rgba(255,255,255,0.35)');
            ctx.setLineDash(hot ? [] : [5, 4]);
            ctx.strokeRect(-26, -26, 52, 52);
            if (variant) {
                ctx.setLineDash([]);
                ctx.fillStyle = '#00ff55';
                ctx.font = 'bold 13px monospace';
                ctx.textAlign = 'center';
                ctx.fillText('hops ' + hops, 0, -31);
            }
            ctx.restore();
        }
        for (const eye of (this._eyeRoots || [])) {
            const hot = this._hoverEye === eye.idx || (this._eyePopup && this._eyePopup.idx === eye.idx);
            const c = per[eye.idx];
            const set = !!c && ((c.speed !== null && c.speed !== 15) || c.dir === -1);
            ctx.save();
            ctx.translate(eye.x, -eye.y);
            if (hot) { ctx.fillStyle = 'rgba(255,255,0,0.28)'; ctx.fillRect(-24, -24, 48, 48); }
            ctx.lineWidth = hot ? 3 : 1.5;
            ctx.strokeStyle = hot ? '#ffff00' : (set ? 'rgba(0,255,85,0.9)' : 'rgba(255,255,255,0.35)');
            ctx.setLineDash(hot ? [] : [5, 4]);
            ctx.strokeRect(-24, -24, 48, 48);
            if (set) {
                ctx.setLineDash([]);
                ctx.fillStyle = '#00ff55';
                ctx.font = 'bold 13px monospace';
                ctx.textAlign = 'center';
                ctx.fillText((c.speed === null ? 15 : c.speed) + (c.dir === -1 ? '↺' : '↻'), 0, -29);
            }
            ctx.restore();
        }
        ctx.restore();
    }

    _analysisKey() {
        const S = AppelPhysics;
        return levelCode + '|' + this.inputFrames.join(',') + '|' + S.formatEyeSpin(S.EYE_SPIN);
    }

    _newJob() {
        const job = { cancelled: false, userCancelled: false, inputs: this.inputFrames.slice(), from: this.frameStates[0], t0: performance.now(), lastYield: performance.now() };
        job.report = (frac, text, opts) => this._showProgress(job, frac, text, opts);
        job.pause = async () => {
            if (job.cancelled) throw ANALYSIS_CANCELLED;
            if (performance.now() - job.lastYield >= ANALYSIS_SLICE_MS) {
                await yieldUI();
                job.lastYield = performance.now();
                if (job.cancelled) throw ANALYSIS_CANCELLED;
            }
        };
        return job;
    }

    _cancelAnalysis() {
        if (this._analysisJob) { this._analysisJob.cancelled = true; this._analysisJob = null; }
    }

    _showProgress(job, frac, text, opts = {}) {
        const box = document.getElementById('survivalProgress');
        if (!box) return;
        const fill = document.getElementById('survivalProgressFill'), label = document.getElementById('survivalProgressText'), btn = document.getElementById('survivalProgressBtn');
        const f = Math.max(0, Math.min(1, frac || 0));
        box.style.display = '';
        if (fill) { fill.style.width = (f * 100).toFixed(1) + '%'; fill.style.background = opts.color || '#00ff55'; }
        if (label) label.textContent = text + (opts.plain ? '' : ' \u00B7 ' + Math.round(f * 100) + '% \u00B7 ' + ((performance.now() - job.t0) / 1000).toFixed(1) + 's');
        if (btn) {
            const b = opts.button === undefined ? 'Cancel' : opts.button;
            btn.style.display = b ? '' : 'none';
            btn.textContent = b || '';
            btn.onclick = opts.onClick || (() => { job.userCancelled = true; job.cancelled = true; });
        }
    }

    _hideProgress() {
        const box = document.getElementById('survivalProgress');
        if (box) box.style.display = 'none';
    }

    async _trial(job, cfg, { exact = false, track = null, stop = null, onFrac = null } = {}) {
        const S = AppelPhysics, physics = this.game.physics, inputs = job.inputs, n = inputs.length;
        const hits = [], T = { hits, pipHits: [], cur: 0 };
        const X = exact || track ? { dist: new Map(), script: [], pos: 0, pending: null, touch: null, touchKnown: false, inc: 0, pruned: 0, aborted: false, T } : null;
        if (track) Object.assign(X, { track: true, only: track.only, beam: track.beam, defs: [] });
        let trialMap = job.from.physicsMap.slice();
        let state = JSON.parse(JSON.stringify(job.from.playerState)), otherDeath = null, i = 0, stopped = false;
        const otherDeaths = [];
        while (i < n && !stopped) {
            if (job.cancelled) throw ANALYSIS_CANCELLED;
            const realMap = physics.MAP.slice(), realSpin = S.EYE_SPIN;
            for (let m = 0; m < trialMap.length; m++) physics.MAP[m] = trialMap[m];
            S.EYE_SPIN = cfg; S.EYE_TRIAL = T; S.PIP_TRIAL = T; S.PIP_EXACT = X;
            try {
                do {
                    T.cur = i;
                    state = physics.tick(state, inputs[i] || '');
                    i++;
                    if (state.PLAYER_DEATH) { otherDeaths.push(i - 1); state = physics.beginExplosion(state); }
                    if (stop && stop(T)) { stopped = true; break; }
                } while (i < n && performance.now() - job.lastYield < ANALYSIS_SLICE_MS);
            } finally {
                trialMap = physics.MAP.slice();
                for (let m = 0; m < realMap.length; m++) physics.MAP[m] = realMap[m];
                S.EYE_SPIN = realSpin; S.EYE_TRIAL = null; S.PIP_TRIAL = null; S.PIP_EXACT = null;
                physics.drainSounds(); physics.drainParticles();
            }
            if (onFrac) onFrac(i / n);
            if (i < n && !stopped) { await yieldUI(); job.lastYield = performance.now(); }
        }
        if (onFrac) onFrac(1);
        const launches = {};
        for (const o of (state.OBJ || [])) if (o.typ === 'eyelauncher') launches[o.idx] = o.launchNo || 0;
        return { hits, pipHits: T.pipHits, otherDeath: otherDeaths.length ? otherDeaths[0] : null, otherDeaths, launches, exact: X && !track ? S.pipExactSummary(X) : null, tracks: track ? S.pipTrackSummary(X) : null, aborted: !!(X && X.aborted) };
    }

    _allPipsHit(idxs) {
        const seen = new Set(); let len = 0;
        return T => { for (; len < T.pipHits.length; len++) seen.add(T.pipHits[len].idx); return idxs.every(i => seen.has(i)); };
    }

    _cloneSpin(c) {
        return { all: { ...c.all }, per: JSON.parse(JSON.stringify(c.per)), pip: c.pip ? { script: JSON.parse(JSON.stringify(c.pip.script || {})) } : undefined };
    }

    async _analyze(job, key) {
        const S = AppelPhysics, clone = c => this._cloneSpin(c);
        const eyes = (this._eyeRoots || []).map(e => e.idx), pips = (this._pipRoots || []).map(e => e.idx);
        const nSpins = 2 * (S.EYE_SPIN_MAX - S.EYE_SPIN_MIN + 1);
        const plan = [['user', 1]];
        if (eyes.length) plan.push(['eyes', nSpins]);
        if (pips.length) plan.push(['exact', ANALYSIS_EXACT_WEIGHT]);
        const weight = {}, start = {}; let total = 0;
        for (const [id, w] of plan) { start[id] = total; weight[id] = w; total += w; }
        const report = (id, frac, text) => job.report((start[id] + weight[id] * frac) / total, text);

        const user = await this._trial(job, clone(S.EYE_SPIN), { onFrac: f => report('user', f, 'Simulating the TAS') });
        const stats = { key, user, byEye: {}, total: 1, otherDeath: user.otherDeath };
        if (eyes.length) {
            const perSpin = [];
            let r = 0;
            for (const dir of [1, -1]) for (let speed = S.EYE_SPIN_MIN; speed <= S.EYE_SPIN_MAX; speed++) {
                const k = r++;
                perSpin.push({ speed, dir, run: await this._trial(job, { all: { speed, dir }, per: {}, pip: S.EYE_SPIN.pip }, { onFrac: f => report('eyes', (k + f) / nSpins, 'Eye launchers: spin ' + (k + 1) + '/' + nSpins) }) });
                await job.pause();
            }
            const N = perSpin.length;
            for (const idx of eyes) {
                const tally = {};
                const cells = [];
                for (const sp of perSpin) {
                    const mine = sp.run.hits.filter(h => h.idx === idx);
                    cells.push({ speed: sp.speed, dir: sp.dir, hit: mine[0] || null });
                    const seen = new Set();
                    for (const h of mine) {
                        const k = h.flying ? h.launch : 'w' + h.launch;
                        if (!h.flying) { tally[k] = N; continue; }
                        if (!seen.has(k)) { seen.add(k); tally[k] = (tally[k] || 0) + 1; }
                    }
                }
                let survive = 1;
                const kills = [];
                for (const k of Object.keys(tally)) {
                    const n = Math.min(N, tally[k]);
                    survive *= 1 - n / N;
                    kills.push({ launch: k, n });
                }
                stats.byEye[idx] = { launches: perSpin[0].run.launches[idx] || 0, survive, kills, cells, total: N };
                stats.total *= survive;
            }
        }
        stats.byPip = {}; stats.pipTotal = 1; stats.pipExact = null;
        if (pips.length) {
            const ex = await this._trial(job, clone(S.EYE_SPIN), { exact: true, onFrac: f => report('exact', f, 'Pips: following every random outcome') });
            const exact = ex.exact;
            if (!exact || exact.aborted) throw new Error('the exact pip analysis did not finish');
            stats.pipExact = { pruned: exact.pruned };
            for (const idx of pips) {
                const t = exact.tiles[idx] || { survive: 1, bodies: [], first: -1 };
                stats.byPip[idx] = { survive: t.survive, exact: true, first: t.first, bodies: t.bodies };
                stats.pipTotal *= t.survive;
            }
            stats.total *= stats.pipTotal;
        }
        return stats;
    }

    analyzeEyes() {
        const st = this._eyeStats;
        return st && st.key === this._analysisKey() ? st : null;
    }

    _startAnalysis() {
        clearTimeout(this._eyeTimer);
        if (!this.frameStates || !this.frameStates[0] || !this.game.physics) return Promise.resolve(null);
        const cached = this.analyzeEyes();
        if (cached) { this._hideProgress(); this.updateSurvivalLabel(cached); return Promise.resolve(cached); }
        this._cancelAnalysis();
        const key = this._analysisKey(), job = this._newJob();
        this._analysisJob = job;
        const el = document.getElementById('survivalChance');
        if (el) { el.textContent = '\u2014 calculating survival\u2026'; el.style.color = '#aaaaaa'; }
        this._setCalcButton(false);
        job.report(0, 'Starting');
        return (async () => {
            let st = null;
            try {
                st = await this._analyze(job, key);
            } catch (e) {
                if (this._analysisJob === job) this._analysisJob = null;
                if (e === ANALYSIS_CANCELLED) {
                    if (job.userCancelled) {
                        this._showProgress(job, 0, 'Survival analysis cancelled', { plain: true, button: 'Run again', onClick: () => this._startAnalysis() });
                        if (el) { el.textContent = '\u2014 survival not calculated'; el.style.color = '#aaaaaa'; }
                        this._setCalcButton(true);
                    }
                    return null;
                }
                console.warn('survival analysis failed', e);
                this._showProgress(job, 0, 'Survival analysis failed: ' + (e && e.message || e), { plain: true, color: '#ff3333', button: 'Retry', onClick: () => this._startAnalysis() });
                if (el) { el.textContent = '\u2014 survival analysis failed'; el.style.color = '#ff3333'; }
                this._setCalcButton(true);
                return null;
            }
            if (job.cancelled || this._analysisJob !== job || key !== this._analysisKey()) return null;
            this._analysisJob = null;
            this._eyeStats = st;
            this._hideProgress();
            this.updateSurvivalLabel(st);
            if (this._eyePopup && this._eyePopup.refresh) this._eyePopup.refresh();
            return st;
        })();
    }

    _hasRandom() { return !!((this._eyeRoots && this._eyeRoots.length) || (this._pipRoots && this._pipRoots.length)); }

    _setCalcButton(show) {
        const b = document.getElementById('survivalCalcBtn');
        if (!b) return;
        b.style.display = show ? '' : 'none';
        b.onclick = () => this._startAnalysis();
    }

    _refreshCalcUI() {
        const st = this._hasRandom() ? this.analyzeEyes() : null;
        this._setCalcButton(this._hasRandom() && !st);
        if (!this._hasRandom()) return;
        if (st) { this.updateSurvivalLabel(st); return; }
        const el = document.getElementById('survivalChance');
        if (el) {
            const note = this._rngNote && this._rngNote.key === this._analysisKey() ? this._rngNote.text : '';
            el.textContent = note ? '\u2014 ' + note : '';
            el.style.color = '#aaaaaa';
        }
    }

    _scheduleEyeAnalysis() {
        clearTimeout(this._eyeTimer);
        this._cancelAnalysis();
        this._hideProgress();
        this._setCalcButton(false);
        if (this._hasRandom()) { this._refreshCalcUI(); return; }
        this._eyeTimer = setTimeout(() => { this._startAnalysis(); }, 250);
    }

    async findSurvivingRng(onlyIdx = null) {
        if (this._searching || !this._pipRoots || !this._pipRoots.length) return;
        this._searching = true;
        try { await this._findSurvivingRng(onlyIdx); } catch (e) { console.warn('pip hop search failed', e); } finally { this._searching = false; }
    }

    async _findSurvivingRng(onlyIdx) {
        const S = AppelPhysics, fmt = n => Math.round(n).toLocaleString('en-US');
        clearTimeout(this._eyeTimer);
        let st = this.analyzeEyes();
        if (!st) st = await this._startAnalysis();
        if (!st) return;
        const key = st.key, tag = i => '#' + i;
        const pipIdx = (this._pipRoots || []).map(p => p.idx);
        const deadBodies = new Map();
        for (const h of (st.user.pipHits || [])) if (onlyIdx == null || h.idx === onlyIdx) deadBodies.set(h.idx * 8 + h.k, { idx: h.idx, k: h.k });
        const fine = [], want = new Map();
        for (const idx of (onlyIdx != null ? [onlyIdx] : pipIdx)) {
            const e = st.byPip[idx];
            if (!e) continue;
            const mine = [...deadBodies.values()].filter(d => d.idx === idx);
            if (!mine.length) { fine.push(idx); continue; }
            for (const d of mine) want.set(d.idx * 8 + d.k, d);
        }
        const job = this._newJob();
        this._cancelAnalysis();
        this._analysisJob = job;
        const found = new Map(), hopeless = new Set(), mismatch = new Set(), pending = new Set(want.keys());
        let stoppedByUser = false;
        try {
            for (let bi = 0; bi < PIP_SEARCH_BEAMS.length && pending.size; bi++) {
                const beam = PIP_SEARCH_BEAMS[bi], n = pending.size;
                const run = await this._trial(job, this._cloneSpin(S.EYE_SPIN), { track: { only: new Set(pending), beam },
                    onFrac: f => job.report((bi + f) / PIP_SEARCH_BEAMS.length, 'Searching pip hops for ' + n + ' pip' + (n === 1 ? '' : 's') + ' \u00B7 attempt ' + (bi + 1) + '/' + PIP_SEARCH_BEAMS.length +
                        (beam === Infinity ? ' (every state)' : ' (up to ' + fmt(beam) + ' states each)')) });
                if (run.aborted) throw new Error('the pip search did not finish');
                for (const k of [...pending]) {
                    const r = run.tracks && run.tracks[k];
                    if (r && r.events) { found.set(k, r.events); pending.delete(k); }
                    else if (!r || !r.dropped) { hopeless.add(k); pending.delete(k); }
                }
            }
            if (found.size) {
                const cand = this._cloneSpin(S.EYE_SPIN);
                this._applyPipEvents(cand, found);
                const run = await this._trial(job, cand);
                for (const h of run.pipHits) if (found.has(h.idx * 8 + h.k)) { console.warn('pip ' + h.idx + '/' + h.k + ': the search and the full run disagree'); mismatch.add(h.idx * 8 + h.k); found.delete(h.idx * 8 + h.k); }
            }
        } catch (e) {
            if (this._analysisJob === job) this._analysisJob = null;
            if (e !== ANALYSIS_CANCELLED) throw e;
            if (!job.userCancelled) return;
            if (!found.size) { this._showProgress(job, 0, 'Pip hop search cancelled, nothing changed', { plain: true, button: null }); return; }
            stoppedByUser = true;
        }
        if (this._analysisJob === job) this._analysisJob = null;
        if (key !== this._analysisKey()) return;
        this._hideProgress();
        const perTile = {};
        for (const [k, ev] of found) { const idx = k >> 3; perTile[idx] = (perTile[idx] || 0) + ev.length; }
        const tiles = Object.keys(perTile).map(Number).sort((a, b) => a - b);
        const parts = [];
        if (tiles.length) parts.push('hops set for ' + tiles.map(i => tag(i) + (perTile[i] ? ' (' + perTile[i] + ' outcome' + (perTile[i] === 1 ? '' : 's') + ')' : ' (they just walk)')).join(', '));
        const ids = set => [...new Set([...set].map(k => k >> 3))].sort((a, b) => a - b);
        if (hopeless.size) parts.push('no way through for ' + ids(hopeless).map(tag).join(', ') + ' (a pip there touches you whatever it does)');
        if (mismatch.size) parts.push('could not confirm a way through for ' + ids(mismatch).map(tag).join(', '));
        if (pending.size) parts.push('search cancelled, nothing yet for ' + [...new Set([...pending].map(k => k >> 3))].map(tag).join(', '));
        if (!parts.length) parts.push(fine.length ? 'every pip already gets past with the current hops' : 'nothing to do');
        this._rngNote = { text: parts.join('; ') + (stoppedByUser ? ' (stopped early)' : ''), key };
        if (found.size) {
            this._applyPipEvents(S.EYE_SPIN, found);
            this._eyeSpinChanged();
            this._rngNote.key = this._analysisKey();
        } else {
            this.updateSurvivalLabel(st);
        }
    }

    _applyPipEvents(cfg, found) {
        if (!cfg.pip) cfg.pip = { script: {} };
        if (!cfg.pip.script) cfg.pip.script = {};
        const sc = cfg.pip.script;
        for (const [k, ev] of found) {
            const idx = k >> 3, body = k & 7;
            if (ev.length) { (sc[idx] || (sc[idx] = {}))[body] = Object.fromEntries(ev); }
            else if (sc[idx]) { delete sc[idx][body]; if (!Object.keys(sc[idx]).length) delete sc[idx]; }
        }
        if (!Object.keys(sc).length) delete cfg.pip;
    }

    updateSurvivalLabel(st) {
        const el = document.getElementById('survivalChance');
        if (!el) return;
        if (!st) { el.textContent = ''; return; }
        this._setCalcButton(false);
        const pct = v => v === 0 || v >= 0.01 ? (Math.round(v * 10000) / 100) + '%' : v < 1e-4 ? '1 in ' + Math.round(1 / v).toLocaleString('en-US') : (v * 100).toPrecision(3) + '%';
        const eyeHit = st.user.hits[0], pipHit = st.user.pipHits && st.user.pipHits[0];
        const first = eyeHit && (!pipHit || eyeHit.tick <= pipHit.tick) ? eyeHit : null;
        let mine = 'your spins: survive';
        if (first) mine = 'your spins: dies at frame ' + (first.tick + 1) + ' (eye #' + first.idx + ')';
        else if (pipHit) mine = 'your rng: dies at frame ' + (pipHit.tick + 1) + ' (pip #' + pipHit.idx + ')';
        const rnd = [(this._eyeRoots && this._eyeRoots.length) ? 'spins' : '', (this._pipRoots && this._pipRoots.length) ? 'pips' : ''].filter(Boolean).join(' / ');
        const note = this._rngNote && this._rngNote.key === st.key ? ' \u00B7 ' + this._rngNote.text : '';
        const pr = st.pipExact && st.pipExact.pruned >= 1e-12 ? ', \u2264' + st.pipExact.pruned.toExponential(1) + ' ignored' : '';
        if (st.total >= 1 - 1e-12) { el.textContent = note ? '\u2014 ' + note.slice(3) : ''; el.style.color = '#aaaaaa'; return; }
        el.textContent = '\u2014 survival ' + pct(st.total) + (rnd ? ' with random ' + rnd : '') + (st.pipExact ? ' (pips: every combo tried' + pr + ')' : '') + ' \u00B7 ' + mine + note;
        el.style.color = st.total >= 0.999 ? '#00ff55' : st.total === 0 ? '#ff3333' : '#ffaa00';
    }

    _closeEyePopup() {
        if (this._eyePopup && this._eyePopup.el) this._eyePopup.el.remove();
        this._eyePopup = null;
    }

    _openEyePopup(eye, ev) {
        this._closeEyePopup();
        const S = AppelPhysics, per = S.EYE_SPIN.per;
        const cur = per[eye.idx] || { speed: null, dir: null };
        const el = document.createElement('div');
        el.style.cssText = 'position:fixed;z-index:9999;background:#111;border:1px solid #ffff00;color:#00ff55;font:12px monospace;padding:8px;display:flex;flex-direction:column;gap:6px;';
        el.style.left = Math.min(ev.clientX + 8, window.innerWidth - 190) + 'px';
        el.style.top = Math.min(ev.clientY + 8, window.innerHeight - 150) + 'px';
        const title = document.createElement('div');
        title.textContent = 'Eye launcher #' + eye.idx;
        title.style.color = '#ffff00';
        const style = 'background:#111;color:#00ff55;border:1px solid #ffff00;font:12px monospace;padding:3px 6px;';
        const natural = { speed: S.EYE_SPIN_DEFAULT_SPEED, dir: S.EYE_SPIN_DEFAULT_DIR };
        const sp = document.createElement('select'); sp.style.cssText = style;
        for (let v = S.EYE_SPIN_MIN; v <= S.EYE_SPIN_MAX; v++) sp.add(new Option(v + '\u00B0/tick', v));
        sp.value = String(cur.speed !== null ? cur.speed : natural.speed);
        const dr = document.createElement('select'); dr.style.cssText = style;
        dr.add(new Option('Clockwise \u21BB', '1'));
        dr.add(new Option('Counter-clockwise \u21BA', '-1'));
        dr.value = String(cur.dir !== null ? cur.dir : natural.dir);
        const reset = document.createElement('button'); reset.textContent = 'Reset to default'; reset.style.cssText = style + 'cursor:pointer;';
        const apply = () => {
            const speed = parseInt(sp.value, 10), dir = parseInt(dr.value, 10);
            const per = AppelPhysics.EYE_SPIN.per;
            if (speed === S.EYE_SPIN_DEFAULT_SPEED && dir === S.EYE_SPIN_DEFAULT_DIR) delete per[eye.idx]; else per[eye.idx] = { speed, dir };
            this._eyeSpinChanged();
        };
        sp.onchange = dr.onchange = apply;
        reset.onclick = () => { delete per[eye.idx]; this._eyeSpinChanged(); this._closeEyePopup(); };
        const info = document.createElement('div');
        info.style.cssText = 'max-width:330px;line-height:1.5;';
        const grid = document.createElement('div');
        const refresh = () => {
            info.textContent = ''; grid.textContent = '';
            let st = null;
            try { st = this.analyzeEyes(); } catch (err) { console.warn(err); }
            const e = st && st.byEye[eye.idx];
            if (!e) { info.textContent = !st ? (this._analysisJob ? 'Calculating\u2026 (progress bar under Replay Code)' : 'Not calculated yet: press Calculate survival under Replay Code') : 'No data yet.'; return; }
            const pct = v => (Math.round(v * 1000) / 10) + '%';
            const killed = e.cells.filter(c => c.hit).length;
            info.textContent = 'Over the whole TAS this eye launches ' + e.launches + ' time' + (e.launches === 1 ? '' : 's') + ' and kills you ' +
                pct(1 - e.survive) + ' of the time if its spin were random each launch' +
                (e.kills.length ? ' (' + e.kills.map(k => (String(k.launch).startsWith('w') ? 'waiting' : 'launch ' + k.launch) + ': ' + k.n + '/' + e.total).join(', ') + ')' : '') +
                '. Grid: using one spin for every launch — red kills you, green is safe.';
            grid.style.cssText = 'display:grid;grid-template-columns:auto repeat(13,22px);gap:2px;align-items:center;';
            const add = (txt, bg, tip, click) => {
                const c = document.createElement('div');
                c.textContent = txt; c.title = tip || '';
                c.style.cssText = 'text-align:center;font-size:10px;height:18px;line-height:18px;' + (bg ? 'background:' + bg + ';color:#000;cursor:pointer;' : 'color:#ffff00;');
                if (click) c.onclick = click;
                grid.appendChild(c);
            };
            add('', null);
            for (let v = S.EYE_SPIN_MIN; v <= S.EYE_SPIN_MAX; v++) add(v, null);
            for (const dir of [1, -1]) {
                add(dir === 1 ? '↻' : '↺', null);
                for (const c of e.cells.filter(c => c.dir === dir)) {
                    const tip = c.speed + '°/tick ' + (dir === 1 ? 'clockwise' : 'counter-clockwise') + ': ' + (c.hit ? 'kills you at frame ' + (c.hit.tick + 1) : 'safe');
                    add('', c.hit ? '#ff3333' : '#00cc44', tip, () => { sp.value = String(c.speed); dr.value = String(c.dir); apply(); });
                }
            }
        };
        el.append(title, sp, dr, reset, info, grid);
        document.body.appendChild(el);
        this._eyePopup = { idx: eye.idx, el, refresh };
        refresh();
    }

    _openPipPopup(pip, ev) {
        this._closeEyePopup();
        const S = AppelPhysics;
        const el = document.createElement('div');
        el.style.cssText = 'position:fixed;z-index:9999;background:#111;border:1px solid #ffff00;color:#00ff55;font:12px monospace;padding:8px;display:flex;flex-direction:column;gap:6px;';
        el.style.left = Math.min(ev.clientX + 8, window.innerWidth - 190) + 'px';
        el.style.top = Math.min(ev.clientY + 8, window.innerHeight - 150) + 'px';
        const title = document.createElement('div');
        title.textContent = 'Pip #' + pip.idx + ' (6 pips)';
        title.style.color = '#ffff00';
        const style = 'background:#111;color:#00ff55;border:1px solid #ffff00;font:12px monospace;padding:3px 6px;';
        const reset = document.createElement('button'); reset.textContent = 'Reset to default'; reset.style.cssText = style + 'cursor:pointer;';
        reset.title = 'Forget the saved hops of this tile: its pips just walk';
        const find = document.createElement('button'); find.textContent = 'Find surviving pip RNG'; find.style.cssText = style + 'cursor:pointer;';
        find.title = 'Search for hops that get the TAS past this tile and save them in the replay code';
        reset.onclick = () => {
            const sc = S.EYE_SPIN.pip && S.EYE_SPIN.pip.script;
            if (sc) { delete sc[pip.idx]; if (!Object.keys(sc).length) delete S.EYE_SPIN.pip; }
            this._eyeSpinChanged();
            this._closeEyePopup();
        };
        find.onclick = () => this.findSurvivingRng(pip.idx);
        const info = document.createElement('div');
        info.style.cssText = 'max-width:330px;line-height:1.5;';
        const refresh = () => {
            info.textContent = '';
            let st = null;
            try { st = this.analyzeEyes(); } catch (err) { console.warn(err); }
            const e = st && st.byPip && st.byPip[pip.idx];
            if (!e) { info.textContent = !st ? (this._analysisJob ? 'Calculating\u2026 (progress bar under Replay Code)' : 'Not calculated yet: press Calculate survival under Replay Code') : 'No data yet.'; return; }
            const pct = v => v === 0 || v >= 0.001 ? (Math.round(v * 1000) / 10) + '%' : v < 1e-4 ? '1 in ' + Math.round(1 / v).toLocaleString('en-US') : (v * 100).toPrecision(3) + '%';
            const n = S.pipScriptSize(pip.idx), mine = (st.user.pipHits || []).filter(h => h.idx === pip.idx);
            info.textContent = 'These pips hop at random. Trying every combination of hops and blinks, you get past this tile ' + pct(e.survive) +
                ' of the time' + (e.first >= 0 ? ' (the first touch can happen at frame ' + (e.first + 1) + ')' : '') + '. ' +
                (n ? 'The replay code saves ' + n + ' chosen hop / blink outcome' + (n === 1 ? '' : 's') + ' for this tile' : 'No hops are saved for this tile: its pips just walk') +
                (mine.length ? ', and with that it touches you at frame ' + (mine[0].tick + 1) + '.' : ', and with that it gets past you.');
        };
        el.append(title, find, reset, info);
        document.body.appendChild(el);
        this._eyePopup = { idx: pip.idx, el, refresh };
        refresh();
    }

    getInputColor(input) {
        const w = input.includes('W');
        const a = input.includes('A');
        const s = input.includes('S');
        const d = input.includes('D');

        if (!w && !a && !s && !d) return '#141414';

        let r = 0, g = 0, b = 0, cnt = 0;
        if (d) { r +=  0; g += 255; b += 0; cnt++; }
        if (a) { r += 255; g += 0; b +=   0; cnt++; }
        if (w) { r +=   0; g += 0; b +=  255; cnt++; }
        if (s) { r += 255; g +=   255; b +=  255; cnt++; }

        return `rgb(${Math.round(r / cnt)},${Math.round(g / cnt)},${Math.round(b / cnt)})`;
    }

    drawTimeline() {
        const canvas = document.getElementById('timelineCanvas');
        const track  = document.getElementById('timeline-track');
        if (!canvas || !track) return;

        const total = this.frameStates.length;
        if (total === 0) return;

        const px     = this.pxPerFrame;
        const trackH = track.clientHeight || 58;
        const totalW = Math.max(total * px, track.clientWidth);

        canvas.width  = totalW;
        canvas.height = trackH;

        const ctx = canvas.getContext('2d');

        ctx.fillStyle = '#0a0a0a';
        ctx.fillRect(0, 0, totalW, trackH);

        const barH     = Math.floor(trackH * 0.60);
        const tickTop  = barH + 2;
        const labelY   = trackH - 2;

        for (let i = 0; i < total; i++) {
            ctx.fillStyle = this.getInputColor(this.inputFrames[i] || '');
            const w = px > 2 ? px - 1 : px;
            ctx.fillRect(i * px, 0, w, barH);
        }

        ctx.fillStyle = '#2a2a2a';
        ctx.fillRect(0, barH, totalW, 1);

        ctx.font      = '9px monospace';
        ctx.textAlign = 'left';

        for (let i = 0; i < total; i++) {
            const x = i * px;

            if (i % 30 === 0) {
                ctx.fillStyle = '#555';
                ctx.fillRect(x, tickTop, 1, 10);
                ctx.fillStyle = '#888';
                ctx.fillText(`${(i / 30).toFixed(1)}s`, x + 2, labelY);
            } else if (i % 5 === 0 && px >= 3) {
                ctx.fillStyle = '#2c2c2c';
                ctx.fillRect(x, tickTop, 1, 5);
            }
        }

        this.updateTimelinePlayhead();
    }

    updateTimelinePlayhead() {
        const playhead = document.getElementById('timeline-playhead');
        const track    = document.getElementById('timeline-track');
        const timeEl   = document.getElementById('timeline-time');

        const tick = this.game ? this.game.tick - 1 : 0;
        const x    = Math.max(0, tick) * this.pxPerFrame;

        if (playhead) {
            playhead.style.transform = `translateX(${x}px)`;
        }

        if (timeEl) {
            timeEl.textContent = `${(tick / 30).toFixed(3)}s  |  Frame ${tick}`;
        }

        if (track) {
            const tw = track.clientWidth;
            const sl = track.scrollLeft;
            const margin = 60;
            if (x < sl + margin || x > sl + tw - margin) {
                track.scrollLeft = x - tw / 2;
            }
        }
    }

    setupTimelineEvents() {
        const init = () => {
            const track    = document.getElementById('timeline-track');
            const canvas   = document.getElementById('timelineCanvas');
            const zoomCtrl = document.getElementById('timelineZoom');

            if (!track || !canvas) { setTimeout(init, 100); return; }

            let dragging = false;

            const frameFromPointer = (e) => {
                const rect = canvas.getBoundingClientRect();
                const x = e.clientX - rect.left;
                return Math.floor(x / this.pxPerFrame);
            };

            canvas.addEventListener('mousedown', (e) => {
                e.preventDefault();
                dragging = true;
                this.seekToFrame(frameFromPointer(e));
            });

            window.addEventListener('mousemove', (e) => {
                if (!dragging) return;
                this.seekToFrame(frameFromPointer(e));
            });

            window.addEventListener('mouseup', () => { dragging = false; });

            if (zoomCtrl) {
                zoomCtrl.addEventListener('input', (e) => {
                    this.pxPerFrame = parseInt(e.target.value, 10);
                    this.drawTimeline();
                });
            }
        };

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
        } else {
            init();
        }
    }

    compressReplayArray(frames) {
        if (!frames || frames.length === 0) return '';
        let result = '';
        let cur   = frames[0] === '' ? '_' : frames[0];
        let count = 0;

        for (let i = 0; i < frames.length; i++) {
            const inp = frames[i] === '' ? '_' : frames[i];
            if (inp === cur) {
                count++;
            } else {
                result += cur + count + '\n';
                cur   = inp;
                count = 1;
            }
        }
        if (count > 0) result += cur + count + '\n';
        return result;
    }

    static get DEFAULT_MAX_FRAMES() { return 5000; }
    static get HARD_MAX_FRAMES()    { return 200000; }

    getMaxFrames() {
        const el = document.getElementById('maxFramesInput');
        let v = el ? parseInt(el.value, 10) : NaN;
        if (!Number.isFinite(v) || v < 1) v = TAEditor.DEFAULT_MAX_FRAMES;
        return Math.min(v, TAEditor.HARD_MAX_FRAMES);
    }

    setMaxFrames(v) {
        v = Math.max(1, Math.min(Math.floor(v), TAEditor.HARD_MAX_FRAMES));
        const el = document.getElementById('maxFramesInput');
        if (el) el.value = v;
        return v;
    }

    fitMaxFramesToEditor() {
        const before = this.getMaxFrames();
        this.parseInputs(TAEditor.HARD_MAX_FRAMES);
        const needed = this.inputFrames.length;
        let raised = false;
        if (needed > before) {
            if (needed > 30000 &&
                !confirm('This route is ' + needed + ' frames long. Very long TAS files use a lot of memory ' +
                         'and can freeze or crash the page.\n\nOK = raise Max frames to ' + needed +
                         ' and load it all.\nCancel = keep Max frames at ' + before + ' (the rest is cut off).')) {
                this.parseInputs();
                return false;
            }
            this.setMaxFrames(needed); raised = true;
        }
        this.parseInputs();
        return raised;
    }

    parseInputs(maxOverride) {
        const MAX_FRAMES = maxOverride || this.getMaxFrames();
        let truncated = false;

        this.inputFrames   = [];
        this.breakFrames.clear();
        this.frameTokenMap = {};

        const text = document.getElementById('inputEditor').value;
        let currentFrame = 0;

        const parseRange = (startPos, endPos) => {
            let pos = startPos;

            while (pos < endPos) {
                if (currentFrame >= MAX_FRAMES) { truncated = true; return; }
                const c = text[pos];

                if (/\s/.test(c)) { pos++; continue; }

                if (c === '/' && pos + 1 < endPos && text[pos + 1] === '/') {
                    while (pos < endPos && text[pos] !== '\n') pos++;
                    continue;
                }

                if (text.slice(pos, pos + 5).toLowerCase() === 'break' &&
                    (pos + 5 >= endPos || /\W/.test(text[pos + 5]))) {
                    this.breakFrames.add(currentFrame);
                    while (pos < endPos && text[pos] !== '\n') pos++;
                    continue;
                }

                if (c === '(') {
                    const innerStart = pos + 1;
                    pos++;
                    let depth = 1;
                    while (pos < endPos && depth > 0) {
                        if      (text[pos] === '(') depth++;
                        else if (text[pos] === ')') depth--;
                        pos++;
                    }
                    const innerEnd = pos - 1;

                    const countMatch = /^\d+/.exec(text.slice(pos));
                    let repeatCount = 1;
                    if (countMatch) {
                        repeatCount = parseInt(countMatch[0], 10);
                        pos += countMatch[0].length;
                    }

                    for (let r = 0; r < repeatCount; r++) {
                        if (currentFrame >= MAX_FRAMES) { truncated = true; return; }
                        const before = currentFrame;
                        parseRange(innerStart, innerEnd);
                        if (currentFrame === before) break;
                    }
                    continue;
                }

                const tokenMatch = /^([wsad_\-]*?)(\d+)/i.exec(text.slice(pos));
                if (tokenMatch) {
                    const absStart = pos;
                    const absEnd   = pos + tokenMatch[0].length;

                    const inputs = tokenMatch[1]
                        .toUpperCase()
                        .replace(/[_\-\s]/g, '')
                        .split('')
                        .filter((v, i, a) => a.indexOf(v) === i)
                        .join('');

                    let duration = parseInt(tokenMatch[2], 10);
                    if (!Number.isFinite(duration)) duration = 0;
                    if (currentFrame + duration > MAX_FRAMES) {
                        duration = MAX_FRAMES - currentFrame;
                        truncated = true;
                    }
                    const tokenStartFrame = currentFrame;

                    for (let i = 0; i < duration; i++) {
                        this.inputFrames[currentFrame + i] = inputs;
                        this.frameTokenMap[currentFrame + i] = {
                            absStart,
                            absEnd,
                            tokenStartFrame,
                            tokenDuration: duration
                        };
                    }
                    currentFrame += duration;
                    pos = absEnd;
                    continue;
                }

                pos++;
            }
        };

        parseRange(0, text.length);

        for (let i = 0; i < this.inputFrames.length; i++) {
            if (this.inputFrames[i] === undefined) this.inputFrames[i] = '';
        }

        const editor = document.getElementById('inputEditor');
        if (editor) {
            const looksLikeReplay = text.includes('\u01C7');
            if (truncated || looksLikeReplay) {
                editor.title = looksLikeReplay
                    ? 'This looks like a replay code. Use "Import Replay Code" instead of pasting it here.'
                    : 'Inputs exceed ' + MAX_FRAMES + ' frames and were truncated.';
                console.warn('[TAS] ' + editor.title);
            } else {
                editor.title = '';
            }
        }
    }

    encodeReplayCode() {
        const username = this.getReplayUsername();
        const level    = '12';
        const keyMap   = { D: 1, A: 2, S: 4, W: 8 };
        const parts    = [];

        let lastCode = -1;
        for (let f = 0; f < this.inputFrames.length; f++) {
            let code = 0;
            for (const ch of (this.inputFrames[f] || '')) {
                if (keyMap[ch]) code += keyMap[ch];
            }
            if (code !== lastCode) {
                parts.push((f + 1).toString(), code.toString());
                lastCode = code;
            }
        }
        parts.push(this.inputFrames.length.toString());

        const slot = AppelPhysics.formatEyeSpin(AppelPhysics.EYE_SPIN);
        const data = username + 'Ǉ' + slot + 'Ǉ' + level + 'Ǉ0Ǉ' + parts.join('Ǉ');
        return (12345678 + data.length).toString() + data;
    }

    getReplayUsername() {
        const el = document.getElementById('replayUsername');
        const name = el ? el.value.replace(/Ǉ/g, '').replace(/[\u0000-\u001f]/g, '').trim() : '';
        return name || 'TAS';
    }

    updateReplayCode() {
        document.getElementById('replayCode').value = this.encodeReplayCode();
    }

    updateInputDisplay() {}

    highlightCurrentInput() {
        const overlay  = document.getElementById('inputHighlightOverlay');
        const textarea = document.getElementById('inputEditor');
        if (!overlay || !textarea) return;

        const text        = textarea.value;
        const displayText = text.endsWith('\n') ? text + ' ' : text;
        const len         = displayText.length;

        const tick      = this.game ? this.game.tick : 0;
        const tokenInfo = this.frameTokenMap && this.frameTokenMap[tick - 1];
        const absStart  = tokenInfo ? tokenInfo.absStart : -1;
        const absEnd    = tokenInfo ? tokenInfo.absEnd   : -1;

        const charType = new Uint8Array(len);

        let pos = 0;
        while (pos < text.length) {
            if (text[pos] === '(') {
                charType[pos] = 2; pos++;
            } else if (text[pos] === ')') {
                charType[pos] = 2; pos++;
                const m = /^\d+/.exec(text.slice(pos));
                if (m) {
                    for (let i = 0; i < m[0].length; i++) charType[pos + i] = 2;
                    pos += m[0].length;
                }
            } else { pos++; }
        }

        if (tokenInfo) {
            for (let i = absStart; i < absEnd && i < len; i++) charType[i] = 1;
        }

        const esc = (ch) => {
            if (ch === '&') return '&amp;';
            if (ch === '<') return '&lt;';
            if (ch === '>') return '&gt;';
            return ch;
        };

        const spanOpen = ['', '<span class="current-token">', '<span class="paren-syntax">'];
        let html = '', curType = -1;
        for (let i = 0; i < len; i++) {
            const t = charType[i];
            if (t !== curType) {
                if (curType > 0) html += '</span>';
                if (t > 0)       html += spanOpen[t];
                curType = t;
            }
            html += esc(displayText[i]);
        }
        if (curType > 0) html += '</span>';

        overlay.innerHTML = html;

        if (tokenInfo && document.activeElement !== textarea) {
            const lineNum   = (text.substring(0, absStart).match(/\n/g) || []).length;
            const lineH     = 20;
            const target    = lineNum * lineH - textarea.clientHeight / 2 + lineH;
            textarea.scrollTop = Math.max(0, target);
        }

        overlay.scrollTop  = textarea.scrollTop;
        overlay.scrollLeft = textarea.scrollLeft;
    }

    setupEventListeners() {
        const inputEditor = document.getElementById('inputEditor');
        const levelCodeBox   = document.getElementById('levelCode');
        const fpsInput    = document.getElementById('fpsInput');
        const importBtn   = document.getElementById('importReplayBtn');

        levelCodeBox.addEventListener('change', () => {
            levelCode = levelCodeBox.value.trim();
            if (levelCode) {
                this.game.init(levelCode);
                this.resimulate(true);
                setTimeout(() => this.applyFPS(this.currentFPS), 50);
            }
        });

        inputEditor.addEventListener('input', () => {
            this.parseInputs();
            this.resimulate();
            this.updateReplayCode();
            this.highlightCurrentInput();
        });

        inputEditor.addEventListener('scroll', () => {
            const overlay = document.getElementById('inputHighlightOverlay');
            if (overlay) {
                overlay.scrollTop  = inputEditor.scrollTop;
                overlay.scrollLeft = inputEditor.scrollLeft;
            }
        });

        const maxFramesInput = document.getElementById('maxFramesInput');
        if (maxFramesInput) {
            maxFramesInput.addEventListener('change', () => {
                const v = parseInt(maxFramesInput.value, 10);
                this.setMaxFrames(Number.isFinite(v) && v > 0 ? v : TAEditor.DEFAULT_MAX_FRAMES);
                this.parseInputs();
                this.resimulate(true);
                this.updateReplayCode();
                this.highlightCurrentInput();
            });
        }

        fpsInput.addEventListener('change', (e) => {
            const val = parseInt(e.target.value, 10);
            if (!isNaN(val) && val > 0) {
                this.applyFPS(val);
            } else {
                e.target.value = this.currentFPS;
            }
        });

        const nameBox = document.getElementById('replayUsername');
        if (nameBox) {
            try { const saved = localStorage.getItem('replayUsername'); if (saved) nameBox.value = saved; } catch (e) {  }
            nameBox.addEventListener('input', () => {
                try { localStorage.setItem('replayUsername', nameBox.value); } catch (e) {  }
                this.updateReplayCode();
            });
        }

        importBtn.addEventListener('click', () => {
            if (!confirm('WARNING: Importing a replay will OVERWRITE your current frame inputs. Continue?')) return;
            const code = prompt('Paste your replay code here:');
            if (!code) return;
            try {
                const frames = decodeReplayCode(code);
                if (!Array.isArray(frames)) { alert('Invalid replay code structure.'); return; }
                document.getElementById('inputEditor').value = this.compressReplayArray(frames);
                AppelPhysics.setEyeSpin(AppelPhysics.parseEyeSpin(decodeReplaySlot(code.trim())));
                this.renderEyeSpinUI();
                const raised = this.fitMaxFramesToEditor();
                const importedName = code.trim().slice(8).split('Ǉ')[0];
                if (nameBox && importedName) nameBox.value = importedName.slice(0, 30);
                this.resimulate(true);
                this.updateReplayCode();
                alert('Replay imported successfully!' +
                      (raised ? '\nMax TAS length raised to ' + this.getMaxFrames() + ' frames to fit it.' : ''));
            } catch (err) {
                alert('Failed to decode replay code: ' + err.message);
                console.error(err);
            }
        });

        const HANDPLAY_KEYS = { KeyW: 'W', KeyA: 'A', KeyS: 'S', KeyD: 'D' };
        const updateHandplayDisplay = () => {
            const el = document.getElementById('handplayKeysDisplay');
            if (!el) return;
            const KEY_ORDER = ['W', 'A', 'S', 'D'];
            const held = KEY_ORDER.filter(k => this._handplayHeldKeys.has(k)).join('');
            el.textContent = held || '·';
        };
        window.addEventListener('keydown', (e) => {
            if (HANDPLAY_KEYS[e.code]) {
                this._handplayHeldKeys.add(HANDPLAY_KEYS[e.code]);
                if (this.handplayMode) updateHandplayDisplay();
            }
        });
        window.addEventListener('keyup', (e) => {
            if (HANDPLAY_KEYS[e.code]) {
                this._handplayHeldKeys.delete(HANDPLAY_KEYS[e.code]);
                if (this.handplayMode) updateHandplayDisplay();
            }
        });

        window.addEventListener('keydown', (e) => {
            const el = document.activeElement;
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') return;
            if (e.ctrlKey || e.metaKey) return;

            switch (e.code) {
                case 'Space':
                    e.preventDefault();
                    if (this.frameStepMode) {
                        this.paused        = false;
                        this.frameStepMode = false;
                        this.stepNextFrame = false;
                        this.updateStatus();
                    } else {
                        this.paused        = true;
                        this.frameStepMode = true;
                        this.updateStatus();
                    }
                    break;
                case 'KeyQ':    e.preventDefault(); this.restartTAS();  break;
                case 'KeyV':
                    e.preventDefault();
                    if (this.handplayMode) this.handplayCommitFrame();
                    else                   this.togglePause();
                    break;
                case 'KeyH':    e.preventDefault(); this.toggleHandplayMode(); break;
                case 'KeyB':    e.preventDefault(); this.resetFPS();    break;
                case 'KeyC':    e.preventDefault(); this.stepBack();    break;
                case 'Digit1': case 'Numpad1': e.preventDefault(); this.saveState(1); break;
                case 'Digit2': case 'Numpad2': e.preventDefault(); this.saveState(2); break;
                case 'Digit3': case 'Numpad3': e.preventDefault(); this.saveState(3); break;
                case 'Digit4': case 'Numpad4': e.preventDefault(); this.loadState(1); break;
                case 'Digit5': case 'Numpad5': e.preventDefault(); this.loadState(2); break;
                case 'Digit6': case 'Numpad6': e.preventDefault(); this.loadState(3); break;
            }
        });
    }

    toggleHandplayMode() {
        this.handplayMode = !this.handplayMode;
        if (this.handplayMode) {
            this._handplayHeldKeys.clear();
        }
        const row = document.getElementById('handplayStatusRow');
        if (row) row.style.display = this.handplayMode ? '' : 'none';
        this.updateStatus();
    }

    handplayCommitFrame() {
        const KEY_ORDER   = ['W', 'A', 'S', 'D'];
        const currentKeys = KEY_ORDER.filter(k => this._handplayHeldKeys.has(k)).join('');

        const textarea = document.getElementById('inputEditor');
        let text = textarea.value;
        const tick = this.game.tick;

        const tokenInfo = this.frameTokenMap && this.frameTokenMap[tick];

        if (tokenInfo) {
            const { absStart, absEnd, tokenStartFrame, tokenDuration } = tokenInfo;
            const tokenText  = text.slice(absStart, absEnd);
            const tokenMatch = /^([wsad_\-]*)(\d+)/i.exec(tokenText);

            if (tokenMatch) {
                const rawPrev  = tokenMatch[1].toUpperCase().replace(/[_\-]/g, '');
                const prevKeys = KEY_ORDER.filter(k => rawPrev.includes(k)).join('');
                const off      = tick - tokenStartFrame;
                const tail     = tokenDuration - off;

                if (currentKeys === prevKeys) {
                    const replacement = (prevKeys || '_') + (tokenDuration + 1);
                    text = text.slice(0, absStart) + replacement + text.slice(absEnd);

                } else if (off === 0 && tick > 0) {
                    const prevTokInfo = this.frameTokenMap[tick - 1];
                    if (prevTokInfo) {
                        const prevTokText  = text.slice(prevTokInfo.absStart, prevTokInfo.absEnd);
                        const prevTokMatch = /^([wsad_\-]*)(\d+)/i.exec(prevTokText);
                        if (prevTokMatch) {
                            const prevTokRaw  = prevTokMatch[1].toUpperCase().replace(/[_\-]/g, '');
                            const prevTokKeys = KEY_ORDER.filter(k => prevTokRaw.includes(k)).join('');

                            if (currentKeys === prevTokKeys) {
                                const newCount    = parseInt(prevTokMatch[2], 10) + 1;
                                const replacement = (prevTokKeys || '_') + newCount;
                                text = text.slice(0, prevTokInfo.absStart)
                                     + replacement
                                     + text.slice(prevTokInfo.absEnd);
                            } else {
                                text = text.slice(0, absStart)
                                     + (currentKeys || '_') + '1 '
                                     + text.slice(absStart);
                            }
                        } else {
                            text = text.slice(0, absStart)
                                 + (currentKeys || '_') + '1 '
                                 + text.slice(absStart);
                        }
                    } else {
                        text = text.slice(0, absStart)
                             + (currentKeys || '_') + '1 '
                             + text.slice(absStart);
                    }

                } else {
                    const prefix      = off  > 0 ? (prevKeys || '_') + off  + ' ' : '';
                    const inserted    = (currentKeys || '_') + '1';
                    const suffix      = tail > 0 ? ' ' + (prevKeys || '_') + tail  : '';
                    text = text.slice(0, absStart) + prefix + inserted + suffix + text.slice(absEnd);
                }
            } else {
                text = text.trimEnd() + ' ' + (currentKeys || '_') + '1';
            }

        } else {
            const TOKEN_RE = /([wsad_\-]*)(\d+)/gi;
            let lastMatch = null, m;
            while ((m = TOKEN_RE.exec(text)) !== null) lastMatch = m;

            if (lastMatch) {
                const rawPrev   = lastMatch[1].toUpperCase().replace(/[_\-]/g, '');
                const prevKeys  = KEY_ORDER.filter(k => rawPrev.includes(k)).join('');
                const prevCount = parseInt(lastMatch[2], 10);

                if (currentKeys === prevKeys) {
                    const newToken = (currentKeys || '_') + (prevCount + 1);
                    text = text.slice(0, lastMatch.index)
                         + newToken
                         + text.slice(lastMatch.index + lastMatch[0].length);
                } else {
                    text = text.trimEnd() + ' ' + (currentKeys || '_') + '1';
                }
            } else {
                text = (currentKeys || '_') + '1';
            }
        }

        textarea.value = text;
        this.parseInputs();
        this.resimulate();
        this.updateReplayCode();
        this.highlightCurrentInput();

        const nextTick = this.game.tick + 1;
        if (nextTick < this.frameStates.length) {
            this.seekToFrame(nextTick);
        }
    }

    togglePause() {
        if (!this.frameStepMode) {
            this.paused        = true;
            this.frameStepMode = true;
        } else {
            this.stepNextFrame = true;
        }
        this.updateStatus();
    }

    stepBack() {
        if (!this.frameStepMode) {
            this.paused        = true;
            this.frameStepMode = true;
        }
        this.seekToFrame(this.game.tick - 1);
    }

    resetFPS() {
        const fpsInput = document.getElementById('fpsInput');
        let fps = parseInt(fpsInput.value, 10);
        if (isNaN(fps) || fps <= 0) fps = 30;

        this.applyFPS(fps);
        this.paused        = false;
        this.frameStepMode = false;
        this.stepNextFrame = false;
        this.updateStatus();
        this.cameraOffset = { x: 0, y: 0 };
    }

    restartTAS() {
        this.paused        = false;
        this.frameStepMode = false;
        this.stepNextFrame = false;
        this.cameraOffset  = { x: 0, y: 0 };

        this.seekToFrame(0);
        this.applyFPS(this.currentFPS);

        this.updatePlayerStateDisplay();
        this.updateStatus();
    }

    saveState(slot) {
        if (!this.frameStates || this.frameStates.length === 0) {
            alert('Game not loaded yet — nothing to save.');
            return;
        }
        this.savestates[slot] = this.game.tick;
        console.log(`[TAS] State ${slot} saved at frame ${this.game.tick}`);
    }

    loadState(slot) {
        const tick = this.savestates[slot];
        if (tick === null || tick === undefined) {
            alert('No savestate in slot ' + slot);
            return;
        }
        this.seekToFrame(tick);
    }

    updatePlayerStateDisplay() {
        const state = this.game.playerState;
        if (!state) {
            document.getElementById('playerState').innerHTML =
                '<div class="state-section">Waiting for game to load...</div>';
            return;
        }

        const mainStates = {
            PLAYER_X: state.PLAYER_X,
            PLAYER_Y: state.PLAYER_Y,
            PLAYER_SX: state.PLAYER_SX,
            PLAYER_SY: state.PLAYER_SY,
            is_falling: state.is_falling
        };

        const otherStates = {
            PLAYER_DEATH: state.PLAYER_DEATH,
            PSZ: JSON.stringify(state.PSZ),
            is_jumping: state.is_jumping,
            flipped: state.flipped,
            player_state: state.player_state,
            player_wall: state.player_wall,
            direction: state.direction,
            PLAYER_DIR: state.PLAYER_DIR,
            wasInSpikeTileLastFrame: state.wasInSpikeTileLastFrame,
            friction_dx: state.friction_dx,
            friction_dy: state.friction_dy,
            friction: state.friction,
            PLAYER_NO_SLOW: state.PLAYER_NO_SLOW,
            KEY_LEFT: state.KEY_LEFT,
            KEY_RIGHT: state.KEY_RIGHT,
            KEY_DOWN: state.KEY_DOWN,
            KEY_UP: state.KEY_UP,
            has_key: state.has_key
        };

        let html = '<div class="state-section"><strong style="color:#ffff00">Primary States</strong><br>';
        for (const [k, v] of Object.entries(mainStates)) {
            html += `<span class="state-key">${k}:</span> <span class="state-value">${v}</span><br>`;
        }
        html += '</div><div class="state-section"><strong style="color:#ffff00">Other States</strong><br>';
        for (const [k, v] of Object.entries(otherStates)) {
            html += `<span class="state-key">${k}:</span> <span class="state-value">${v}</span><br>`;
        }
        html += '</div>';

        document.getElementById('playerState').innerHTML = html;
    }


    updateStatus() {
        let status;
        if (this.handplayMode) {
            status = 'Handplay';
        } else if (this.frameStepMode) {
            status = 'Frame Step';
        } else {
            status = this.paused ? 'Paused' : 'Playing';
        }

        const statusEl = document.getElementById('statusDisplay');
        if (statusEl) {
            statusEl.textContent = status;
            statusEl.style.color = this.handplayMode ? '#ff9900' : '';
        }
        document.getElementById('frameCounter').textContent  = this.game.tick;

        const tokenInfo = this.frameTokenMap && this.frameTokenMap[this.game.tick - 1];
        const progressEl = document.getElementById('inputProgress');

        if (tokenInfo) {
            const inToken = (this.game.tick - 1) - tokenInfo.tokenStartFrame + 1;
            progressEl.textContent = `${inToken}/${tokenInfo.tokenDuration}`;
        } else {
            progressEl.textContent = '- / -';
        }

        this.highlightCurrentInput();
    }
}

const params = new URLSearchParams(window.location.search);
let levelCode = params.get('level');
if (!levelCode) {
    levelCode = '1234606196Z2Z588Z1Z37828ZZ1Z38416ZZZZ67Z1e6767';
}

const game = new Game('gameCanvas');
const tasEditor = new TAEditor(game);

document.getElementById('levelCode').value = levelCode;

tasEditor.wrapGameInit();
tasEditor.overrideGetInputKeys();
tasEditor.modifyGameLoop(game);

game.init(levelCode);