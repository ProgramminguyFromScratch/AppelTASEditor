class Touching {
    static shared = null;
    constructor() {
        if (Touching.shared) return Touching.shared;
        this._corr = null;
        this._corrReady = false;
        this.ready = false;

        this._plat = null;
        this._platSil = null;

        this.loadPromise = this.loadCorrelationTable()
            .then(() => this.loadPlatformTable())
            .then(() => (typeof SawTouch !== 'undefined' ? SawTouch.load() : null))
            .then(() => (typeof WalkerTouch !== 'undefined' ? WalkerTouch.loadAll() : null))
            .then(() => (typeof WormTouch !== 'undefined' ? WormTouch.load() : null))
            .then(() => (typeof EyeLauncherTouch !== 'undefined' ? EyeLauncherTouch.load() : null))
            .then(() => { this.ready = true; })
            .catch(error => console.error('Error loading or decoding spikes:', error));
    }

    static SB_NUM_PDIR = 48;
    static SB_NUM_SDIR = 4;
    static SB_SHAPES   = [7, 9, 74, 77, 78, 83];
    static PLAT_VARIANTS = [2, 4, 5];
    static PLAT_W = 255;
    static PLAT_H = 255;
    static PLAT_XO = 127;
    static PLAT_YO = 127;
    static SB_W = 130;
    static SB_H = 129;

    static _pdirToIndex(deg) {
        let idx = Math.round((deg + 172.5) / 7.5);
        if (idx < 0) idx = 0;
        if (idx >= Touching.SB_NUM_PDIR) idx = Touching.SB_NUM_PDIR - 1;
        return idx;
    }

    static _wrapDir(deg) {
        return deg - Math.floor((deg + 179) / 360) * 360;
    }

    static _maprotToDirection(rot) {
        const r = Number(rot);
        if (!Number.isFinite(r)) return NaN;
        const d = Touching._wrapDir(90 * r);
        return Number.isFinite(d) ? d : NaN;
    }

    static _shapeToIndex(tileId) {
        return Touching.SB_SHAPES.indexOf(tileId);
    }

    static _costumeIndex(playerState) {
        if (playerState.player_state !== 2) return 0;
        return playerState.player_wall !== null ? 2 : 1;
    }

    static _pdirKey(deg) { return Math.round(deg * 1e4) / 1e4; }

    static preloaded = null;
    async loadSilhouettes(jsonPath = 'spike_silhouettes.json', preloaded = Touching.preloaded) {
        if (typeof ScratchTouch === 'undefined') return null;
        let data = preloaded;
        if (!data) try {
            const resp = await fetch(jsonPath);
            if (!resp.ok) return null;
            data = await resp.json();
        } catch (e) { return null; }
        const spikes = Touching.SB_SHAPES.map(id => {
            const spec = data.spike['spike ' + id];
            if (!spec) throw new Error('spike_silhouettes.json is missing "spike ' + id + '"');
            return new ScratchTouch.CoreSkin(spec, 'svg');
        });
        const players = ['Stand', 'Crouch', 'Wall Crouch'].map(n => {
            const spec = data.player[n];
            if (!spec) throw new Error('spike_silhouettes.json is missing player costume "' + n + '"');
            return new ScratchTouch.CoreSkin(spec, 'bitmap');
        });
        const spikeD = spikes.map(sk => ScratchTouch.makeDrawable(sk, 0, 0, 0, 100));
        const playerD = ScratchTouch.makeDrawable(players[0], 90, 0, 0, 100);
        const corr = {
            W: 200, H: 200, dxOrigin: 100, dyOrigin: 100, exact: true, env: data.env || null,
            table: {
                test: (key, dx, dy, ox, oy) => {
                    const [pd, si, shi, ci] = key.split('|');
                    const sp = spikeD[+shi];
                    sp.updateProperties({ direction: parseFloat(si) });
                    playerD.skin = players[+ci];
                    playerD.updateProperties({ position: [dx, dy], direction: parseFloat(pd) });
                    return ScratchTouch.touching(playerD, sp, ox, oy);
                }
            }
        };
        this._corr = corr;
        this._corrReady = true;
        if (typeof WalkerTouch !== 'undefined') WalkerTouch.setSilhouettes(data);
        if (typeof SawTouch !== 'undefined' && SawTouch.setSilhouettes) SawTouch.setSilhouettes(data);
        if (typeof WormTouch !== 'undefined') WormTouch.setSilhouettes(data);
        if (typeof EyeLauncherTouch !== 'undefined') EyeLauncherTouch.setSilhouettes(data);

        this._platSil = null;
        if (data.platform && Touching.PLAT_VARIANTS.every(v => data.platform['platform ' + v])) {
            const pskins = {};
            for (const v of Touching.PLAT_VARIANTS) pskins[v] = new ScratchTouch.CoreSkin(data.platform['platform ' + v], 'svg');
            const platD = {};
            for (const v of Touching.PLAT_VARIANTS) platD[v] = ScratchTouch.makeDrawable(pskins[v], 0, 0, 0, 100);
            const platPlayerD = ScratchTouch.makeDrawable(players[0], 90, 0, 0, 100);
            this._platSil = {
                W: Touching.PLAT_W, H: Touching.PLAT_H, dxOrigin: Touching.PLAT_XO, dyOrigin: Touching.PLAT_YO, exact: true,
                table: {
                    test: (key, dx, dy, ox, oy) => {
                        const [pd, si, variant, ci] = key.split('|');
                        const pl = platD[+variant];
                        pl.updateProperties({ direction: parseFloat(si) });
                        platPlayerD.skin = players[+ci];
                        platPlayerD.updateProperties({ position: [dx, dy], direction: parseFloat(pd) });
                        return ScratchTouch.touching(platPlayerD, pl, ox, oy);
                    }
                }
            };
        }
        return corr;
    }

    async loadCorrelationTable() {
        const sil = await this.loadSilhouettes();
        if (sil) return sil;
        console.warn('Spike silhouettes unavailable (scratch_touch_core.js / capture missing): spikes will not be lethal');
        this._corr = null;
        return null;
    }

    async loadPlatformTable() {
        this._plat = null;
        if (this._platSil) { this._plat = this._platSil; return this._plat; }
        console.warn('No platform silhouettes in the capture: spiked platforms will not be lethal');
        return null;
    }

    static platformVariant(v) {
        const n = Number(v);
        if (v === null || v === undefined || v === '' || Number.isNaN(n) || n < 2) return null;
        return n === 4 ? 4 : 2;
    }

    static platformSdirIdx(rot, v) {
        const r = Number(rot);
        return Touching._maprotToDirection(Number(v) === 3 ? r + 2 : r);
    }

    is_player_touching_platform(playerState, obj) {
        if (!this._plat || !obj.teeth) return false;

        const px = Math.round(playerState.PLAYER_X);
        const py = Math.round(playerState.PLAYER_Y);

        const si = Touching._platformSdir(obj);
        if (!Number.isFinite(si)) return false;
        const pi = this._plat.exact ? Touching._pdirKey(playerState.direction) : Touching._pdirToIndex(playerState.direction);
        const ci = Touching._costumeIndex(playerState);

        const dx = px - Math.round(obj.x), dy = py - Math.round(obj.y);
        const col = dx + this._plat.dxOrigin;
        const row = dy + this._plat.dyOrigin;
        if (col < 0 || col >= this._plat.W || row < 0 || row >= this._plat.H) return false;
        const cam = Touching._cam(playerState);
        return this._plat.table.test(`${pi}|${si}|${obj.teeth}|${ci}`, dx, dy,
            cam ? Math.round(obj.x) - cam[0] : undefined, cam ? Math.round(obj.y) - cam[1] : undefined);
    }

    static _cam(ps) {
        const x = ps._camXAtPos ?? ps.CAM_X, y = ps._camYAtPos ?? ps.CAM_Y;
        return (Number.isFinite(x) && Number.isFinite(y)) ? [x, y] : null;
    }

    static _platformSdir(obj) {
        return Touching.platformSdirIdx(obj.rot, obj.variation);
    }

    unloadCorrelationTable() {
        this._corr = null;
        this._corrReady = false;
        this.ready = false;
    }

    _checkTile(playerState, physics, tx, ty, px, py) {
        const rowsCount = physics.MAP.length / physics.LSX;
        if (tx < 0 || tx >= physics.LSX || ty < 0 || ty >= rowsCount) return false;

        const idx  = tx + ty * physics.LSX;
        const tile = Math.ceil(physics.MAP[idx]);
        if (tile == null || !physics.MASK[tile] || !physics.MASK[tile].includes(2)) return false;

        const shi = Touching._shapeToIndex(tile);
        if (shi < 0) return false;

        const si = Touching._maprotToDirection(physics.MAP_R[idx]);
        if (!Number.isFinite(si)) return false;

        const pi = this._corr.exact ? Touching._pdirKey(playerState.direction) : Touching._pdirToIndex(playerState.direction);
        const ci = Touching._costumeIndex(playerState);


        const centerX = tx * 60 + 30;
        const centerY = ty * 60 + 30;
        const dx = px - centerX;
        const dy = py - centerY;

        const col = dx + this._corr.dxOrigin;
        const row = dy + this._corr.dyOrigin;
        if (col < 0 || col >= this._corr.W || row < 0 || row >= this._corr.H) return false;

        const cam = Touching._cam(playerState);
        return this._corr.table.test(`${pi}|${si}|${shi}|${ci}`, dx, dy,
            cam ? centerX - cam[0] : undefined, cam ? centerY - cam[1] : undefined);
    }

    is_player_touching_spike_at(px, py, playerState, physics) {
        if (!this._corrReady) return false;

        px = Math.round(px);
        py = Math.round(py);

        const psz = playerState.PSZ;
        const padX = this._corr.dxOrigin;
        const padY = this._corr.dyOrigin;
        const pLeft   = (psz ? px - psz[4] : px) - padX;
        const pRight  = (psz ? px + psz[2] : px) + padX;
        const pTop    = (psz ? py - psz[3] : py) - padY;
        const pBottom = (psz ? py + psz[1] : py) + padY;

        const txMin = Math.floor(Math.min(pLeft, pRight) / 60);
        const txMax = Math.floor(Math.max(pLeft, pRight) / 60);
        const tyMin = Math.floor(Math.min(pTop, pBottom) / 60);
        const tyMax = Math.floor(Math.max(pTop, pBottom) / 60);

        for (let ty = tyMin; ty <= tyMax; ty++) {
            for (let tx = txMin; tx <= txMax; tx++) {
                if (this._checkTile(playerState, physics, tx, ty, px, py)) return true;
            }
        }
        return false;
    }

    is_player_touching_spike(playerState, physics) {
        return this.is_player_touching_spike_at(
            playerState.PLAYER_X, playerState.PLAYER_Y, playerState, physics
        );
    }
}
