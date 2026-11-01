'use strict';

let eng = null;
let wid = 0;
let goalVer = 0;

const post = (m, transfer) => self.postMessage(m, transfer || []);

function emit(m) {
    if (m.type === 'best') m.gv = goalVer;
    if (m.type === 'heat') {
        const a = Int32Array.from(m.cells);
        m.cells = a;
        post({ kind: 'msg', wid, m }, [a.buffer]);
        return;
    }
    post({ kind: 'msg', wid, m });
}

function installTouching(t) {
    if (!t) return;
    if (t.preloaded) Touching.preloaded = t.preloaded;
    if (typeof WalkerTouch !== 'undefined') {
        if (t.walkerMasks) WalkerTouch.masks = t.walkerMasks;
        if (t.walkerStencil) WalkerTouch.stencil = t.walkerStencil;
    }
    if (typeof SawTouch !== 'undefined' && t.sawMasks) SawTouch.masks = t.sawMasks;
    if (typeof WormTouch !== 'undefined' && t.wormMasks) WormTouch.masks = t.wormMasks;
    if (typeof EyeLauncherTouch !== 'undefined' && t.eyeMask) EyeLauncherTouch.mask = t.eyeMask;
}

function installStatics(st) {
    if (!st) return;
    for (const k of Object.keys(st)) { try { AppelPhysics[k] = st[k]; } catch (_) {} }
}

async function handle(m) {
    switch (m.kind) {
        case 'setup': {
            wid = m.wid | 0;
            try {
                importScripts(...m.scripts);
                installStatics(m.statics);
                installTouching(m.touching);
                post({ kind: 'ready', wid });
            } catch (e) {
                post({ kind: 'fatal', wid, message: 'worker setup failed: ' + (e && e.message || e) });
            }
            break;
        }
        case 'start': {
            eng = new RandyJS(emit);
            try { await eng.start(m.params); }
            catch (e) { post({ kind: 'fatal', wid, message: 'worker start failed: ' + (e && e.message || e) }); }
            break;
        }
        case 'cmd':
            if (m.ver !== undefined) goalVer = m.ver;
            if (eng) eng.cmd(m.text);
            break;
        case 'seedInputs':
            if (eng && eng.running) eng.seedInputs(m.inputs, true);
            break;
        case 'seedCode':
            if (eng && eng.running) eng.seed(m.code);
            break;
        case 'stop':
            if (eng) { eng.reason = m.reason || 'finished'; eng.quit = true; }
            break;
    }
}

function simulate(m) {
    const KEYSTR = ['', 'D', 'A', 'AD', 'S', 'SD', 'AS', 'ASD', 'W', 'WD', 'WA', 'WAD', 'WS', 'WSD', 'WAS', 'WASD'];
    const L = m.levelData;
    const ph = new AppelPhysics(L.map.slice(), L.rotations, L.MAP_DATA, L.size_x);
    ph.sfx = () => {}; ph.particle = () => {};
    return ph.touching.loadPromise.then(() => {
        ph.MAP = (m.startMap ? Array.from(m.startMap) : L.map.slice());
        const s = m.state ? JSON.parse(m.state) : ph.createDefaultGameState(ph.spawnOBJ(L));
        const xs = [], ys = []; let death = -1;
        for (let i = 0; i < m.inputs.length; i++) {
            ph.tick(s, KEYSTR[m.inputs[i] & 15]);
            xs.push(s.PLAYER_X); ys.push(s.PLAYER_Y);
            if (s.PLAYER_DEATH) { death = i; break; }
        }
        return { xs, ys, death, spikesReady: ph.touching._corrReady };
    });
}

let chain = Promise.resolve();
self.onmessage = (ev) => {
    const m = ev.data;
    chain = chain.then(async () => {
        if (m.kind === 'simulate') {
            const result = await simulate(m);
            post({ kind: 'simulated', id: m.id, result });
        } else await handle(m);
    }).catch(e => post({ kind: 'fatal', wid, message: String(e && e.message || e) }));
};
