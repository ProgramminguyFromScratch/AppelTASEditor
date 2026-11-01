class WalkerTouch {
    static COSTUMES = {
        'Mob A1': ['Mob_A1', 11.5, 23.0524], 'Mob A4': ['Mob_A4', 13.111, 31.0787],
        'Mob A2': ['Mob_A2', 12.3783, 28.0516], 'Mob A3': ['Mob_A3', 15.7579, 16.0524],
        'Enemy-big-purple': ['Enemy-big-purple', 22, 44], 'Enemy-b3': ['Enemy-b3', 27.1366, 58.0252],
        'Enemy-b2': ['Enemy-b2', 24.5048, 53.0572], 'Mob P squish': ['Mob_P_squish', 22, 39.6],
        'pip': ['pip', 8.5, 25.9545], 'pip2': ['pip2', 8.5, 25.9545]
    };
    static SCALE = 2;
    static masks = null;
    static _loading = null;

    static STENCIL_FILES = {
        'Stand': ['stand.png', 24, 32], 'Stand Left': ['stand.png', 24, 32],
        'Crouch': ['crouch.png', 24, 12], 'Crouch Left': ['crouch_left.png', 24, 12],
        'Wall Crouch': ['wall_crouch.png', 24, 32], 'Wall Crouch Left': ['wall_crouch_left.png', 24, 32]
    };
    static BIG_HALF = 56.1;
    static stencil = null;
    static _loadingStencil = null;

    static playerCostume(ps) {
        const left = !(ps.PLAYER_DIR > 0);
        let base = 'Stand';
        if (ps.player_state === 1) base = ps.flipped === 2 ? 'Flipped' : 'Stand';
        else if (ps.player_state === 2) base = ps.player_wall === null ? 'Crouch' : 'Wall Crouch';
        return left ? base + ' Left' : base;
    }

    static costumeName(w) {
        if (w.wTyp === 9) return w.costume === 'pip2' ? 'pip2' : 'pip';
        const purple = w.wTyp === 13;
        if (w.state === 'squish') return purple ? 'Mob P squish' : 'Mob A3';
        const f = Number(w.frame) || 0;
        const t = (((Math.floor(f / 4) % 9) + 9) % 9);
        const set = purple ? ['Enemy-big-purple', 'Enemy-b3', 'Enemy-b2'] : ['Mob A1', 'Mob A4', 'Mob A2'];
        return t < 5 ? ((t === 0 || t === 4) ? set[2] : set[1]) : set[0];
    }

    static async load(base = 'assets/mobs/') {
        if (WalkerTouch.masks) return WalkerTouch.masks;
        if (WalkerTouch._loading) return WalkerTouch._loading;
        if (typeof document === 'undefined' || typeof Image === 'undefined') return null;
        const S = WalkerTouch.SCALE;
        const grab = ([file, cx, cy]) => new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                const lw = img.naturalWidth || img.width, lh = img.naturalHeight || img.height;
                const c = document.createElement('canvas');
                c.width = Math.ceil(lw * S); c.height = Math.ceil(lh * S);
                const cx2 = c.getContext('2d', { willReadFrequently: true });
                cx2.drawImage(img, 0, 0, lw * S, lh * S);
                const d = cx2.getImageData(0, 0, c.width, c.height).data;
                const a = new Uint8Array(c.width * c.height);
                for (let i = 0; i < a.length; i++) a[i] = d[i * 4 + 3];
                resolve({ w: c.width, h: c.height, a, cx, cy });
            };
            img.onerror = () => reject(new Error('could not load ' + file));
            img.src = base + file + '.svg';
        });
        const names = Object.keys(WalkerTouch.COSTUMES);
        WalkerTouch._loading = Promise.all(names.map(n => grab(WalkerTouch.COSTUMES[n])))
            .then(list => {
                const m = {};
                names.forEach((n, i) => { m[n] = list[i]; });
                return (WalkerTouch.masks = m);
            })
            .catch(e => { console.warn('WalkerTouch: mob silhouettes unavailable, using boxes', e); WalkerTouch._loading = null; return null; });
        return WalkerTouch._loading;
    }

    static async loadStencil(base = 'assets/stencil/') {
        if (WalkerTouch.stencil) return WalkerTouch.stencil;
        if (WalkerTouch._loadingStencil) return WalkerTouch._loadingStencil;
        if (typeof document === 'undefined' || typeof Image === 'undefined') return null;
        const files = [...new Set(Object.values(WalkerTouch.STENCIL_FILES).map(v => v[0]))];
        const grab = (file) => new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                const c = document.createElement('canvas');
                c.width = img.naturalWidth; c.height = img.naturalHeight;
                const cx = c.getContext('2d', { willReadFrequently: true });
                cx.drawImage(img, 0, 0);
                const d = cx.getImageData(0, 0, c.width, c.height).data;
                const a = new Uint8Array(c.width * c.height);
                for (let i = 0; i < a.length; i++) a[i] = d[i * 4 + 3];
                resolve({ w: c.width, h: c.height, a });
            };
            img.onerror = () => reject(new Error('could not load ' + file));
            img.src = base + file;
        });
        WalkerTouch._loadingStencil = Promise.all(files.map(grab))
            .then(list => {
                const byFile = {}; files.forEach((f, i) => { byFile[f] = list[i]; });
                const m = {};
                for (const [name, [f, cx, cy]] of Object.entries(WalkerTouch.STENCIL_FILES)) m[name] = { ...byFile[f], cx, cy };
                return (WalkerTouch.stencil = m);
            })
            .catch(e => { console.warn('WalkerTouch: Stencil costumes unavailable, using boxes', e); WalkerTouch._loadingStencil = null; return null; });
        return WalkerTouch._loadingStencil;
    }

    static loadAll() { return Promise.all([WalkerTouch.load(), WalkerTouch.loadStencil()]); }

    static setStencil(m) { WalkerTouch.stencil = m; }

    static setMasks(masks) { WalkerTouch.masks = masks; }

    static sil = null;
    static setSilhouettes(data) {
        WalkerTouch.sil = null;
        if (typeof ScratchTouch === 'undefined' || !data || !data.mob || !data.stencil) return;
        const mobNames = Object.keys(WalkerTouch.COSTUMES);
        if (!mobNames.every(n => data.mob[n]) || !data.stencil.BIG) return;
        const mob = {}, stencil = {};
        for (const n of mobNames) mob[n] = new ScratchTouch.CoreSkin(data.mob[n], 'svg');
        for (const n in data.stencil) stencil[n] = new ScratchTouch.CoreSkin(data.stencil[n], n === 'BIG' ? 'svg' : 'bitmap');
        if (!stencil['Stand Left'] && stencil.Stand) stencil['Stand Left'] = stencil.Stand;
        for (const n of Object.keys(WalkerTouch.STENCIL_FILES)) if (!stencil[n]) { console.warn('WalkerTouch: capture lacks Stencil costume ' + n + ', using old masks'); return; }
        const first = mob[mobNames[0]];
        WalkerTouch.sil = { mob, stencil,
            mobD: ScratchTouch.makeDrawable(first, 90, 0, 0, 100),
            stD: ScratchTouch.makeDrawable(stencil.BIG, 90, 0, 0, 100) };
    }

    static _touchingSil(w, spr, cam) {
        const S = WalkerTouch.sil;
        const mobSkin = S.mob[WalkerTouch.costumeName(w)];
        const stSkin = S.stencil[spr.costume || 'Stand'] || S.stencil.BIG;
        const flip = (w.direction || 0) < 0 ? -1 : 1;
        S.mobD.skin = mobSkin;
        S.mobD.updateProperties({ position: [w.x, w.y], direction: 90, scale: [100 * flip, 100] });
        S.stD.skin = stSkin;
        S.stD.updateProperties({ position: [spr.x, spr.y], direction: spr.direction, scale: [100, 100] });
        return cam ? ScratchTouch.touching(S.mobD, S.stD, -cam[0], -cam[1]) : ScratchTouch.touching(S.mobD, S.stD);
    }

    static touching(w, spr, psz, cam) {
        if (!spr) return false;
        if (WalkerTouch.sil) return WalkerTouch._touchingSil(w, spr, cam);
        const mobs = WalkerTouch.masks, st = WalkerTouch.stencil;
        const cos = mobs && mobs[WalkerTouch.costumeName(w)];
        if (!cos || !st) return WalkerTouch._box(w, spr, psz);

        const S = WalkerTouch.SCALE;
        const mirrorMob = (w.direction || 0) < 0 ? -1 : 1;
        const sc = st[spr.costume || 'Stand'] || null;
        const big = !sc;
        const reach = big ? WalkerTouch.BIG_HALF + 2 : 30;

        const left = cos.cx, right = cos.w / S - cos.cx, up = cos.cy, down = cos.h / S - cos.cy;
        const xMin = mirrorMob < 0 ? -right : -left, xMax = mirrorMob < 0 ? left : right;
        const ax0 = Math.max(Math.floor(w.x + xMin), Math.floor(spr.x - reach));
        const ax1 = Math.min(Math.ceil(w.x + xMax), Math.ceil(spr.x + reach));
        const ay0 = Math.max(Math.floor(w.y - down), Math.floor(spr.y - reach));
        const ay1 = Math.min(Math.ceil(w.y + up), Math.ceil(spr.y + reach));

        const b = (spr.direction - 90) * Math.PI / 180, cb = Math.cos(b), sb = Math.sin(b);
        for (let py = ay0; py <= ay1; py++) {
            for (let px = ax0; px <= ax1; px++) {
                const mx = (px - w.x) * mirrorMob + cos.cx, my = cos.cy - (py - w.y);
                const mi = Math.floor(mx * S), mj = Math.floor(my * S);
                if (mi < 0 || mj < 0 || mi >= cos.w || mj >= cos.h || cos.a[mj * cos.w + mi] === 0) continue;
                const ox = px - spr.x, oy = -(py - spr.y);
                const lx = ox * cb + oy * sb;
                const ly = -ox * sb + oy * cb;
                if (big) {
                    if (Math.abs(lx) <= WalkerTouch.BIG_HALF && Math.abs(ly) <= WalkerTouch.BIG_HALF) return true;
                    continue;
                }
                const ix = Math.floor(lx * 2 + sc.cx), iy = Math.floor(ly * 2 + sc.cy);
                if (ix < 0 || iy < 0 || ix >= sc.w || iy >= sc.h || sc.a[iy * sc.w + ix] === 0) continue;
                return true;
            }
        }
        return false;
    }

    static _box(w, spr, psz) {
        const px0 = spr.x - psz[4], px1 = spr.x + psz[2];
        const py0 = spr.y - psz[3], py1 = spr.y + psz[1];
        return px0 < w.x + w.sx && px1 > w.x - w.sx && py0 < w.y + w.sy && py1 > w.y;
    }
}
if (typeof module !== 'undefined' && module.exports) module.exports = WalkerTouch;
