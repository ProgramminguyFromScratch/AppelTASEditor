
const RANDY_HEAT_BUCKETS = 24;

const randyState = {
    running: false,
    paused: false,
    stopping: false,
    controller: null,
    stopTimer: null,
    gridRes: 5,
    cap: 125,
    codeLen: false,
    startPos: null,
    usedCustomState: false,
    gotDone: false,
    js: null,
    fullStart: null,
};

function randyUseJs() {
    const el = document.getElementById('r_engine');
    return (!el || el.value === 'js' || el.value === 'jsmain') && typeof RandyJS !== 'undefined';
}


const $r = (id) => document.getElementById(id);

function randyNum(id, def) {
    const el = $r(id);
    if (!el || el.value === '' || !Number.isFinite(Number(el.value))) return def;
    return Number(el.value);
}

function randyHasNum(id) {
    const el = $r(id);
    return !!el && el.value !== '' && Number.isFinite(Number(el.value));
}

function randySetStatus(text, cls) {
    const el = $r('r_statusText');
    el.textContent = text;
    el.className = cls || '';
}

function randyLog(text) {
    $r('r_log').textContent = text || '';
}

function randyCopy(inputId, btnId) {
    const el = $r(inputId);
    if (!el || !el.value) return;
    navigator.clipboard.writeText(el.value).then(() => {
        const btn = $r(btnId);
        btn.textContent = 'Copied!';
        btn.classList.add('copied');
        setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 1200);
    });
}

async function randySendCmd(cmd) {
    if (randyState.js) { randyState.js.cmd(cmd); return true; }
    try {
        const r = await fetch('/randy/cmd', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cmd }),
        });
        return r.ok;
    } catch (_) {
        return false;
    }
}


const randyView = {
    base: null, overlay: null, wrap: null,
    renderer: null, assetsReady: false, assetsLoading: false,
    levelCode: null, levelData: null,
    cam: { x: 300, y: 300, zoom: 0.5 },
    userMoved: false,
    heatCells: null,
    heatBuckets: null,
    heatBounds: null,
    path: null,
    startPos: null,
    drag: null,
    raf: 0,

    init() {
        this.base = $r('r_base');
        this.overlay = $r('r_overlay');
        this.wrap = $r('r_mapWrap');
        if (!this.base) return;

        new ResizeObserver(() => this.resize()).observe(this.wrap);

        const ov = this.overlay;
        ov.addEventListener('pointerdown', (e) => {
            ov.setPointerCapture(e.pointerId);
            if ($r('r_pickMode').value === 'killdraw' && !randyKz.confirm) {
                const rect = ov.getBoundingClientRect();
                const w = this.screenToWorld(e.clientX - rect.left, e.clientY - rect.top);
                if (randyNum('r_kzR', 0) > 0) { randyKz.pending = w; randyKz.confirm = true; $r('r_kzConfirm').style.display = 'flex'; return; }
                randyKz.drawing = true;
                $r('r_kzX').value = Math.round(w.x * 10) / 10; $r('r_kzY').value = Math.round(w.y * 10) / 10; $r('r_kzR').value = 0;
                return;
            }
            this.drag = { x: e.clientX, y: e.clientY, moved: false };
        });
        ov.addEventListener('pointermove', (e) => {
            const rect = ov.getBoundingClientRect();
            const w = this.screenToWorld(e.clientX - rect.left, e.clientY - rect.top);
            this.showCoords(w);
            if (randyKz.drawing) {
                $r('r_kzR').value = Math.round(Math.hypot(w.x - randyNum('r_kzX', 0), w.y - randyNum('r_kzY', 0)) * 10) / 10;
                this.schedule();
                return;
            }
            if (!this.drag) return;
            const dx = e.clientX - this.drag.x, dy = e.clientY - this.drag.y;
            if (!this.drag.moved && Math.hypot(dx, dy) < 4) return;
            this.drag.moved = true;
            this.userMoved = true;
            ov.classList.add('dragging');
            this.cam.x -= dx / this.cam.zoom;
            this.cam.y += dy / this.cam.zoom;
            this.drag.x = e.clientX; this.drag.y = e.clientY;
            this.schedule();
        });
        ov.addEventListener('pointerup', (e) => {
            if (randyKz.drawing) {
                randyKz.drawing = false;
                if (randyNum('r_kzR', 0) > 1) { $r('r_kzOn').checked = true; randyApplyLive('killzone'); }
                else randyClearKillZone();
                randyToggleDrawKill(false);
                return;
            }
            const d = this.drag;
            this.drag = null;
            ov.classList.remove('dragging');
            if (d && !d.moved) {
                const rect = ov.getBoundingClientRect();
                this.onPick(this.screenToWorld(e.clientX - rect.left, e.clientY - rect.top));
            }
        });
        ov.addEventListener('pointerleave', () => { $r('r_mapCoords').textContent = ''; });
        ov.addEventListener('wheel', (e) => {
            e.preventDefault();
            const rect = ov.getBoundingClientRect();
            this.zoomAt(e.clientX - rect.left, e.clientY - rect.top, e.deltaY < 0 ? 1.2 : 1 / 1.2);
        }, { passive: false });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.wrap.classList.contains('fullscreen')) this.toggleFullscreen();
        });

        $r('r_pickMode').addEventListener('change', () => {
            ov.classList.toggle('picking', $r('r_pickMode').value !== 'pan');
        });
        ov.classList.add('picking');
        $r('r_heatMode').addEventListener('change', () => this.schedule());

        this.resize();
    },

    clampCam() {
        const c = this.cam, w = this.base.width, h = this.base.height;
        c.zoom = Math.min(8, Math.max(0.02, c.zoom));
        c.x = Math.max(c.x, w / c.zoom / 2);
        c.y = Math.max(c.y, h / c.zoom / 2);
    },

    screenToWorld(sx, sy) {
        const c = this.cam;
        return { x: c.x + (sx - this.base.width / 2) / c.zoom, y: c.y - (sy - this.base.height / 2) / c.zoom };
    },

    worldToScreen(wx, wy) {
        const c = this.cam;
        return { x: this.base.width / 2 + (wx - c.x) * c.zoom, y: this.base.height / 2 + (c.y - wy) * c.zoom };
    },

    showCoords(w) {
        const col = Math.floor(w.x / 60), row = Math.floor(w.y / 60);
        let tile = '';
        if (this.levelData && col >= 0 && row >= 0 && col < this.levelData.size_x) {
            const v = this.levelData.map[row * this.levelData.size_x + col];
            if (v !== undefined) tile = `  tile ${col},${row} = ${v}`;
        }
        $r('r_mapCoords').textContent = `x ${w.x.toFixed(1)}  y ${w.y.toFixed(1)}${tile}`;
    },

    resize() {
        if (!this.wrap) return;
        const w = Math.floor(this.wrap.clientWidth), h = Math.floor(this.wrap.clientHeight);
        if (w < 2 || h < 2) return;
        if (this.base.width !== w || this.base.height !== h) {
            this.base.width = this.overlay.width = w;
            this.base.height = this.overlay.height = h;
        }
        this.schedule();
    },

    schedule() {
        if (this.raf) return;
        this.raf = requestAnimationFrame(() => { this.raf = 0; this.render(); });
    },

    zoomAt(sx, sy, factor) {
        const before = this.screenToWorld(sx, sy);
        this.cam.zoom = Math.min(8, Math.max(0.02, this.cam.zoom * factor));
        this.cam.x = before.x - (sx - this.base.width / 2) / this.cam.zoom;
        this.cam.y = before.y + (sy - this.base.height / 2) / this.cam.zoom;
        this.userMoved = true;
        this.schedule();
    },

    zoomBy(f) { this.zoomAt(this.base.width / 2, this.base.height / 2, f); },

    toggleFullscreen() {
        const fs = this.wrap.classList.toggle('fullscreen');
        $r('r_fsBtn').innerHTML = fs ? '&#x2715;' : '&#x26F6;';
    },

    fit() {
        let b = this.heatBounds;
        const pts = [];
        if (this.startPos) pts.push(this.startPos);
        const gx = randyHasNum('r_goalX') ? randyNum('r_goalX', 0) : null;
        const gy = randyHasNum('r_goalY') ? randyNum('r_goalY', 0) : null;
        if (gx !== null && gy !== null) pts.push([gx, gy]);
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        if (b) { minX = b.minX; minY = b.minY; maxX = b.maxX; maxY = b.maxY; }
        for (const p of pts) {
            minX = Math.min(minX, p[0]); maxX = Math.max(maxX, p[0]);
            minY = Math.min(minY, p[1]); maxY = Math.max(maxY, p[1]);
        }
        if (!isFinite(minX)) return;
        const pad = 60;
        const bw = Math.max(maxX - minX, 1) + pad * 2, bh = Math.max(maxY - minY, 1) + pad * 2;
        this.cam.zoom = Math.min(4, Math.max(0.02, Math.min(this.base.width / bw, this.base.height / bh)));
        this.cam.x = (minX + maxX) / 2;
        this.cam.y = (minY + maxY) / 2;
        this.schedule();
    },

    onShow() {
        this.resize();
        const code = $r('levelCode').value.trim();
        if (code) this.ensureLevel(code);
        this.schedule();
    },

    ensureLevel(code) {
        if (code === this.levelCode && this.levelData) return;
        this.levelCode = code;
        const data = (typeof LevelRenderer !== 'undefined') ? LevelRenderer.getDataFromCode(code) : null;
        this.levelData = data && data.map && data.map.length ? data : null;
        if (!this.levelData) {
            $r('r_mapMsg').textContent = 'Could not decode the level code';
            this.schedule();
            return;
        }
        if (!this.renderer) this.renderer = new LevelRenderer(this.base);
        if (!this.assetsReady && !this.assetsLoading) {
            this.assetsLoading = true;
            $r('r_mapMsg').textContent = 'Loading tiles...';
            this.renderer.loadAssets(() => {}).then(() => {
                this.assetsReady = true;
                this.assetsLoading = false;
                $r('r_mapMsg').textContent = '';
                this.schedule();
            });
        }
        this.schedule();
    },


    setStart(pos) {
        this.startPos = pos;
        if (!this.userMoved && pos) { this.cam.x = pos[0]; this.cam.y = pos[1]; this.cam.zoom = 0.6; }
        this.schedule();
    },

    setHeat(cells, cap, codeLen) {
        const arr = Int32Array.from(cells);
        const buckets = Array.from({ length: RANDY_HEAT_BUCKETS }, () => []);
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        const gr = randyState.gridRes;
        const top = Math.max(1, cap);
        for (let i = 0; i < arr.length; i += 3) {
            const t = Math.min(1, Math.max(0, arr[i + 2] / top));
            buckets[Math.min(RANDY_HEAT_BUCKETS - 1, Math.floor(t * RANDY_HEAT_BUCKETS))].push(i);
            if (arr[i] < minX) minX = arr[i];
            if (arr[i] > maxX) maxX = arr[i];
            if (arr[i + 1] < minY) minY = arr[i + 1];
            if (arr[i + 1] > maxY) maxY = arr[i + 1];
        }
        this.heatCells = arr;
        this.heatBuckets = buckets;
        this.heatBounds = arr.length ? { minX: minX * gr, maxX: (maxX + 1) * gr, minY: minY * gr, maxY: (maxY + 1) * gr } : null;
        $r('r_legendHi').textContent = `${cap} ${codeLen ? 'chars' : 'frames'}`;
        if (!this.userMoved && this.heatBounds) this.fit();
        this.schedule();
    },

    setPath(path) {
        this.path = path && path.length >= 4 ? path : null;
        this.schedule();
    },

    clearRun() {
        this.heatCells = null; this.heatBuckets = null; this.heatBounds = null;
        this.path = null;
        this.schedule();
    },


    onPick(w) {
        const mode = $r('r_pickMode').value;
        const x = Math.round(w.x * 10) / 10, y = Math.round(w.y * 10) / 10;
        if (mode === 'goal') {
            $r('r_goalX').value = x; $r('r_goalY').value = y;
            randyApplyLive('goal');
        } else if (mode === 'kill') {
            $r('r_kzX').value = x; $r('r_kzY').value = y;
            if (!(randyNum('r_kzR', 0) > 0)) $r('r_kzR').value = 200;
            randyApplyLive('killzone');
        }
        this.schedule();
    },


    render() {
        randyUpdateKzButton();
        if (!this.base || this.base.width < 2) return;
        this.clampCam();
        const bctx = this.base.getContext('2d');
        if (this.levelData && this.assetsReady) {
            const cam = { x: this.cam.x, y: this.cam.y, zoom: this.cam.zoom };
            this.renderer.render(this.levelData, cam);
        } else {
            bctx.fillStyle = '#05080f';
            bctx.fillRect(0, 0, this.base.width, this.base.height);
        }
        this.drawOverlay();
    },

    drawOverlay() {
        const ctx = this.overlay.getContext('2d');
        const W = this.overlay.width, H = this.overlay.height, z = this.cam.zoom;
        ctx.clearRect(0, 0, W, H);

        if (this.heatCells && $r('r_heatMode').value !== 'off') {
            const gr = randyState.gridRes, size = Math.max(1, gr * z);
            const cells = this.heatCells;
            const c = this.cam, hx = W / 2, hy = H / 2;
            for (let b = 0; b < RANDY_HEAT_BUCKETS; b++) {
                const list = this.heatBuckets[b];
                if (!list.length) continue;
                const hue = 240 * (1 - (b + 0.5) / RANDY_HEAT_BUCKETS);
                ctx.fillStyle = `hsla(${hue.toFixed(0)},100%,50%,0.55)`;
                ctx.beginPath();
                for (let k = 0; k < list.length; k++) {
                    const i = list[k];
                    const sx = hx + (cells[i] * gr - c.x) * z;
                    const sy = hy + (c.y - (cells[i + 1] + 1) * gr) * z;
                    if (sx + size < 0 || sy + size < 0 || sx > W || sy > H) continue;
                    ctx.rect(sx, sy, size, size);
                }
                ctx.fill();
            }
        }

        if (this.path) {
            ctx.strokeStyle = '#ff00ff';
            ctx.lineWidth = 2;
            ctx.lineJoin = 'round';
            ctx.beginPath();
            for (let i = 0; i < this.path.length; i += 2) {
                const p = this.worldToScreen(this.path[i], this.path[i + 1]);
                if (i === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y);
            }
            ctx.stroke();
            const e = this.worldToScreen(this.path[this.path.length - 2], this.path[this.path.length - 1]);
            ctx.fillStyle = '#ff00ff';
            ctx.beginPath(); ctx.arc(e.x, e.y, 4, 0, Math.PI * 2); ctx.fill();
        }

        const kr = randyNum('r_kzR', 0);
        if (kr > 0 && randyHasNum('r_kzX') && randyHasNum('r_kzY')) {
            const p = this.worldToScreen(randyNum('r_kzX', 0), randyNum('r_kzY', 0));
            const kzOn = $r('r_kzOn').checked;
            ctx.fillStyle = kzOn ? 'rgba(60,200,220,0.25)' : 'rgba(150,150,150,0.2)';
            ctx.strokeStyle = kzOn ? '#50dcf0' : '#aaaaaa';
            ctx.lineWidth = 2;
            ctx.setLineDash([6, 5]);
            ctx.beginPath(); ctx.arc(p.x, p.y, kr * z, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
            ctx.setLineDash([]);
        }

        if (randyHasNum('r_goalX') && randyHasNum('r_goalY')) {
            const gx = randyNum('r_goalX', 0), gy = randyNum('r_goalY', 0);
            ctx.strokeStyle = '#ffff00';
            ctx.fillStyle = 'rgba(255,255,0,0.18)';
            ctx.lineWidth = 2;
            if ($r('r_goalTile').checked) {
                const size = Math.max(1, randyNum('r_tileSize', 60));
                const x0 = Math.floor(gx / size) * size, y1 = (Math.floor(gy / size) + 1) * size;
                const p = this.worldToScreen(x0, y1);
                ctx.fillRect(p.x, p.y, size * z, size * z);
                ctx.strokeRect(p.x, p.y, size * z, size * z);
            } else {
                const p = this.worldToScreen(gx, gy);
                ctx.beginPath(); ctx.arc(p.x, p.y, 7, 0, Math.PI * 2); ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(p.x - 11, p.y); ctx.lineTo(p.x + 11, p.y);
                ctx.moveTo(p.x, p.y - 11); ctx.lineTo(p.x, p.y + 11);
                ctx.stroke();
            }
        }

        if (this.startPos) {
            const p = this.worldToScreen(this.startPos[0], this.startPos[1]);
            ctx.fillStyle = '#00ff55';
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 1.5;
            ctx.beginPath(); ctx.arc(p.x, p.y, 5, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        }
    },
};


function randyApplyLive(kind) {
    randyView.schedule();
    if (!randyState.running) return;

    switch (kind) {
        case 'goal':
            if (randyHasNum('r_goalX') && randyHasNum('r_goalY')) randySendCmd(`goal ${randyNum('r_goalX', 0)} ${randyNum('r_goalY', 0)}`);
            break;
        case 'tile':
            randySendCmd(`tile ${$r('r_goalTile').checked ? 1 : 0}`);
            break;
        case 'weights':
            randySendCmd(`set weights ${['r_wW', 'r_wA', 'r_wS', 'r_wD'].map(id => Math.max(0, randyNum(id, 0))).join(' ')}`);
            break;
        case 'killzone': {
            const r = randyNum('r_kzR', 0);
            if ($r('r_kzOn').checked && r > 0 && randyHasNum('r_kzX') && randyHasNum('r_kzY')) randySendCmd(`killzone ${randyNum('r_kzX', 0)} ${randyNum('r_kzY', 0)} ${r}`);
            else randySendCmd('killzone off');
            break;
        }
        default: {
            const idByKind = {
                mutate: 'r_mutate', step: 'r_step', killradius: 'r_killRadius', spawnwindow: 'r_spawnWindow',
                simsteps: 'r_simSteps', maxframes: 'r_maxFrames', maxcodelen: 'r_maxCodeLen',
            };
            const id = idByKind[kind];
            if (id && randyHasNum(id)) randySendCmd(`set ${kind} ${randyNum(id, 0)}`);
        }
    }
}

const randyKz = { drawing: false, confirm: false, pending: null };

function randyToggleTile() {
    const c = $r('r_goalTile');
    c.checked = !c.checked;
    $r('r_tileBtn').textContent = c.checked ? 'TILE: ON' : 'TILE: OFF';
    randyApplyLive('tile');
}

function randyToggleDrawKill(force) {
    const on = typeof force === 'boolean' ? force : $r('r_pickMode').value !== 'killdraw';
    $r('r_pickMode').value = on ? 'killdraw' : 'goal';
    $r('r_drawKzBtn').textContent = on ? 'CLICK MAP TO SET ZONE...' : 'DRAW KILL ZONE';
    randyKz.confirm = false; randyKz.drawing = false;
    $r('r_kzConfirm').style.display = 'none';
}

function randyKzReplace(yes) {
    $r('r_kzConfirm').style.display = 'none';
    randyKz.confirm = false;
    if (!yes) { randyToggleDrawKill(false); return; }
    const w = randyKz.pending;
    $r('r_kzX').value = Math.round(w.x * 10) / 10; $r('r_kzY').value = Math.round(w.y * 10) / 10; $r('r_kzR').value = 0;
    randyKz.drawing = true;
}

function randyToggleCodeMode() {
    const m = $r('r_mode');
    m.value = m.value === 'code' ? 'frames' : 'code';
    m.dispatchEvent(new Event('change'));
}

function randyPlusOne() {
    const code = $r('r_mode').value === 'code';
    const el = $r(code ? 'r_maxCodeLen' : 'r_maxFrames');
    el.value = randyNum(el.id, 0) + 1;
    el.dispatchEvent(new Event('change'));
}

function randyHasKillZone() {
    return randyNum('r_kzR', 0) > 0 && randyHasNum('r_kzX') && randyHasNum('r_kzY');
}

function randyUpdateKzButton() {
    const b = $r('r_clearKzBtn'), d = $r('r_drawKzBtn');
    const has = randyHasKillZone();
    const drawing = $r('r_pickMode').value === 'killdraw';
    if (d) d.style.display = (has && !drawing) ? 'none' : '';
    if (b) b.style.display = (has && !drawing) ? '' : 'none';
}

function randyClearKillZone() {
    $r('r_kzX').value = ''; $r('r_kzY').value = ''; $r('r_kzR').value = '';
    randyKz.drawing = false;
    randyApplyLive('killzone');
    randyUpdateKzButton();
    randyView.schedule();
}

async function randySeedNow() {
    const code = $r('r_seedCode').value.trim();
    const msg = $r('r_seedMsg');
    if (!code) { msg.textContent = 'Paste a replay code first.'; return; }
    if (!randyState.running) { msg.textContent = 'Not running - the code will be used as the seed when you press START SEARCH.'; return; }
    if (randyState.js) {
        const n = randyState.js.seed(code);
        msg.textContent = n < 0 ? 'Seeding failed (could not decode the replay code).' : 'Seed sent to the running search.';
        return;
    }
    try {
        const r = await fetch('/randy/seed', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code }),
        });
        msg.textContent = r.ok ? 'Seed sent to the running search.' : 'Seeding failed (' + (await r.text()) + ').';
    } catch (_) {
        msg.textContent = 'Could not reach local server.';
    }
}


const RANDY_STATE_FIELDS = [
    'PLAYER_X', 'PLAYER_Y', 'PLAYER_SX', 'PLAYER_SY', 'PLAYER_DEATH', 'PLAYER_WON', 'is_jumping', 'is_falling',
    'flipped', 'player_state', 'player_wall', 'direction', 'PSZ', 'KEY_LEFT', 'KEY_RIGHT', 'KEY_DOWN', 'KEY_UP',
];

function randyCurrentEditorState() {
    if (typeof tasEditor === 'undefined' || !tasEditor || !tasEditor.game || !tasEditor.game.playerState) {
        alert('TAS editor not ready. Load a level and let it initialise first.');
        return null;
    }
    return tasEditor.game.playerState;
}

function randyGetCurrentState() {
    const st = randyCurrentEditorState();
    if (!st) return;
    const out = {};
    for (const k of RANDY_STATE_FIELDS) if (k in st) out[k] = st[k];
    $r('r_playerState').value = JSON.stringify(out, null, 2);
    randyView.setStart([st.PLAYER_X, st.PLAYER_Y]);
    randyState.fullStart = null;
    try {
        const g = tasEditor.game, fs = tasEditor.frameStates && tasEditor.frameStates[g.tick];
        randyState.fullStart = {
            state: JSON.stringify(fs ? fs.playerState : st),
            map: Array.from(fs && fs.physicsMap ? fs.physicsMap : g.physics.MAP),
        };
    } catch (_) {}
}

function randyClearState() {
    $r('r_playerState').value = '';
    randyState.fullStart = null;
}

function randyGoalFromCurrentFrame() {
    const st = randyCurrentEditorState();
    if (!st) return;
    $r('r_goalX').value = Math.round(st.PLAYER_X * 10) / 10;
    $r('r_goalY').value = Math.round(st.PLAYER_Y * 10) / 10;
    randyApplyLive('goal');
}


function randySetRunningUI(running) {
    randyState.running = running;
    $r('r_startBtn').disabled = running;
    $r('r_pauseBtn').disabled = !running;
    if (!running) $r('r_pauseBtn').textContent = 'PAUSE';
    for (const id of ['r_mode', 'r_gridRes', 'r_tileSize', 'r_playerState']) $r(id).disabled = running;
}

async function randyStart() {
    const levelCode = $r('levelCode').value.trim();
    if (!levelCode) return alert('Paste a level code first.');

    const stateStr = $r('r_playerState').value.trim();
    if (stateStr) {
        try { JSON.parse(stateStr); } catch (e) { return alert('Start state is not valid JSON: ' + e.message); }
    }

    if (randyState.controller) randyState.controller.abort();
    clearTimeout(randyState.stopTimer);
    const controller = new AbortController();
    randyState.controller = controller;
    randyState.stopping = false;
    randyState.gotDone = false;
    randyState.usedCustomState = !!stateStr;
    randyState.gridRes = Math.max(1, Math.floor(randyNum('r_gridRes', 5)));
    randyState.codeLen = $r('r_mode').value === 'code';

    randyView.ensureLevel(levelCode);
    randyView.clearRun();
    randyView.userMoved = false;
    if (stateStr) {
        try { const s = JSON.parse(stateStr); randyView.startPos = [s.PLAYER_X || 0, s.PLAYER_Y || 0]; } catch (_) {}
    }

    for (const id of ['r_steps', 'r_ips', 'r_nodes']) $r(id).textContent = '0';
    for (const id of ['r_bestDist', 'r_bestFrames', 'r_bestCodeLen']) $r(id).textContent = '-';
    $r('r_time').textContent = '0.00s';
    $r('r_tasOutput').value = '';
    $r('r_replayOutput').value = '';
    randyLog('');
    randySetStatus('Starting Randy...', 'running');
    randySetRunningUI(true);

    const kzR = randyNum('r_kzR', 0);
    const body = {
        levelCode,
        stateJson: stateStr,
        codeLen: randyState.codeLen,
        maxFrames: randyNum('r_maxFrames', 125),
        maxCodeLen: randyNum('r_maxCodeLen', 200),
        mutate: randyNum('r_mutate', 0.2),
        step: randyNum('r_step', 30),
        gridRes: randyState.gridRes,
        killRadius: randyNum('r_killRadius', 0),
        spawnWindow: randyNum('r_spawnWindow', 0),
        simSteps: randyNum('r_simSteps', 0),
        maxSeconds: randyNum('r_maxSeconds', 0),
        workers: randyNum('r_workers', 0),
        weights: ['r_wW', 'r_wA', 'r_wS', 'r_wD'].map(id => randyNum(id, 0)),
        goalX: randyHasNum('r_goalX') ? randyNum('r_goalX', 0) : null,
        goalY: randyHasNum('r_goalY') ? randyNum('r_goalY', 0) : null,
        goalTile: $r('r_goalTile').checked,
        tileSize: randyNum('r_tileSize', 60),
        seedReplay: $r('r_seedCode').value.trim(),
        killZone: (kzR > 0 && $r('r_kzOn').checked) ? { x: randyNum('r_kzX', 0), y: randyNum('r_kzY', 0), r: kzR } : null,
    };

    if (randyUseJs()) {
        randyState.controller = null;
        const eng = (($r('r_engine') || {}).value !== 'jsmain' && typeof RandyJSPool !== 'undefined' && RandyJSPool.supported())
            ? new RandyJSPool(randyHandle) : new RandyJS(randyHandle);
        randyState.js = eng;
        body.fullStart = stateStr ? randyState.fullStart : null;
        try { await eng.start(body); }
        catch (e) { console.error(e); randySetStatus('Randy (JS) failed: ' + e.message, 'error'); randyState.js = null; randySetRunningUI(false); }
        return;
    }

    let resp;
    try {
        resp = await fetch('/randy/start', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
            signal: controller.signal,
        });
    } catch (e) {
        if (e.name !== 'AbortError') {
            randySetStatus('Could not reach local server (run "node webui/server.js")', 'error');
            randySetRunningUI(false);
        }
        return;
    }

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let buf = '';
    try {
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            buf += decoder.decode(value, { stream: true });
            const lines = buf.split('\n');
            buf = lines.pop();
            for (const line of lines) {
                if (!line) continue;
                let msg;
                try { msg = JSON.parse(line); } catch (_) { continue; }
                randyHandle(msg);
            }
        }
    } catch (e) {
        if (e.name !== 'AbortError') randySetStatus('Connection lost', 'error');
    }

    if (randyState.controller === controller) {
        randyState.controller = null;
        randySetRunningUI(false);
        if (!randyState.gotDone && $r('r_statusText').className !== 'error') {
            randySetStatus(randyState.stopping ? 'Stopped' : 'Disconnected', randyState.stopping ? 'done' : 'error');
        }
    }
}

function randyHandle(m) {
    switch (m.type) {
        case 'init': {
            randyState.gridRes = m.gridRes;
            randyState.cap = m.codeLen ? m.maxCodeLen : m.maxFrames;
            randyState.codeLen = !!m.codeLen;
            randyState.startPos = m.start;
            randyView.setStart(m.start);
            if (!randyHasNum('r_goalX')) $r('r_goalX').value = m.goal[0];
            if (!randyHasNum('r_goalY')) $r('r_goalY').value = m.goal[1];
            $r('r_legendLo').textContent = '0';
            $r('r_legendHi').textContent = `${randyState.cap} ${m.codeLen ? 'chars' : 'frames'}`;
            if (!m.spikes) randyLog('Warning: spike table not loaded - spikes are disabled in this run.');
            randySetStatus('Running', 'running');
            randyView.schedule();
            break;
        }
        case 'progress': {
            randyState.paused = !!m.paused;
            randySetStatus(m.paused ? 'Paused' : 'Running', m.paused ? 'paused' : 'running');
            $r('r_pauseBtn').textContent = m.paused ? 'RESUME' : 'PAUSE';
            $r('r_time').textContent = m.t.toFixed(2) + 's';
            $r('r_steps').textContent = m.steps.toLocaleString();
            $r('r_ips').textContent = Math.round(m.ips).toLocaleString();
            $r('r_nodes').textContent = m.nodes.toLocaleString();
            break;
        }
        case 'best': {
            $r('r_bestDist').textContent = m.dist >= 0 ? m.dist.toFixed(2) : '-';
            $r('r_bestFrames').textContent = m.frames > 0 ? m.frames : '-';
            if (m.codeLen !== undefined) $r('r_bestCodeLen').textContent = m.codeLen;
            if (m.path) randyView.setPath(m.path);
            if (m.inputs && m.inputs.length) {
                $r('r_tasOutput').value = (typeof inputsToTASFormat === 'function') ? inputsToTASFormat(m.inputs) : m.inputs.join(' ');
                $r('r_replayOutput').value = m.code || '';
            }
            break;
        }
        case 'heat':
            randyView.setHeat(m.cells, m.cap, !!m.codeLen);
            break;
        case 'done':
            randyState.gotDone = true;
            $r('r_time').textContent = m.t.toFixed(2) + 's';
            $r('r_steps').textContent = m.steps.toLocaleString();
            randySetStatus(`Finished (${m.reason})`, 'done');
            if (randyState.js) { randyState.js = null; randySetRunningUI(false); }
            break;
        case 'log':
            randyLog(m.message);
            break;
        case 'error':
            randySetStatus(m.message, 'error');
            if (randyState.js) { randyState.js = null; randySetRunningUI(false); }
            break;
    }
}

function randyTogglePause() {
    if (!randyState.running) return;
    randySendCmd(randyState.paused ? 'resume' : 'pause');
}

function randyStop() {
    if (randyState.js) { randyState.stopping = true; randySetStatus('Stopping...', 'paused'); randyState.js.cmd('cancel'); return; }
    if (!randyState.running || !randyState.controller) return;
    randyState.stopping = true;
    randySetStatus('Stopping...', 'paused');
    randySendCmd('cancel');
    const c = randyState.controller;
    randyState.stopTimer = setTimeout(() => { if (randyState.controller === c) c.abort(); }, 4000);
}


function randyLoadIntoEditor() {
    const tas = $r('r_tasOutput').value.trim();
    if (!tas) return alert('No route yet - run Randy first.');
    if (typeof tasEditor === 'undefined' || !tasEditor) return alert('TAS editor not ready.');
    let msg = 'This will OVERWRITE your current frame inputs with Randy\'s best route. Continue?';
    if (randyState.usedCustomState) {
        msg = 'Randy\'s route starts from the captured player state, not from frame 0, so it only makes sense here if that state was frame 0.\n\n' + msg;
    }
    if (!confirm(msg)) return;
    $r('inputEditor').value = tas;
    tasEditor.fitMaxFramesToEditor();
    tasEditor.resimulate();
    tasEditor.updateReplayCode();
    switchRightTab('inputs');
}


function randyInit() {
    randyView.init();

    if (randyView.overlay) {
        randyView.overlay.addEventListener('contextmenu', (e) => {
            if (!randyHasKillZone()) return;
            const rect = randyView.overlay.getBoundingClientRect();
            const w = randyView.screenToWorld(e.clientX - rect.left, e.clientY - rect.top);
            const d = Math.hypot(w.x - randyNum('r_kzX', 0), w.y - randyNum('r_kzY', 0));
            if (d <= randyNum('r_kzR', 0)) { e.preventDefault(); randyClearKillZone(); }
        });
    }

    document.querySelectorAll('#tab-content-randy [data-live]').forEach((el) => {
        el.addEventListener('change', () => randyApplyLive(el.dataset.live));
    });

    ['r_goalX', 'r_goalY', 'r_kzX', 'r_kzY', 'r_kzR', 'r_kzOn', 'r_tileSize', 'r_goalTile'].forEach((id) => {
        $r(id).addEventListener('input', () => randyView.schedule());
        $r(id).addEventListener('change', () => randyView.schedule());
    });

    $r('r_mode').addEventListener('change', () => {
        const code = $r('r_mode').value === 'code';
        $r('r_framesWrap').style.display = code ? 'none' : '';
        $r('r_codeWrap').style.display = code ? '' : 'none';
        $r('r_capLabel').textContent = code ? 'MAX CODE LEN' : 'MAX FRAMES';
        $r('r_codeModeBtn').textContent = code ? 'MIN CODE LEN: ON (cap in chars)' : 'MIN CODE LEN: OFF (fewest frames)';
        $r('r_codeModeBtn').style.background = code ? '#96641e' : '';
    });

    $r('levelCode').addEventListener('change', () => {
        const code = $r('levelCode').value.trim();
        if (code && !$r('tab-content-randy').classList.contains('hidden')) randyView.ensureLevel(code);
    });

    window.addEventListener('beforeunload', () => { if (randyState.js) randyState.js.cmd('cancel'); if (randyState.controller) randyState.controller.abort(); });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', randyInit);
} else {
    randyInit();
}
