class SawTouch {
    static POLY_SRC = "40 10 47.88 17.33 51.48 12.28 55.95 22.07 61.21 18.79 61.6 29.54 67.72 28.52 63.96 38.6 70 40 62.67 47.88 67.72 51.48 57.93 55.95 61.21 61.21 50.46 61.6 51.48 67.72 41.4 63.96 40 70 32.13 62.67 28.52 67.72 24.05 57.93 18.79 61.21 18.4 50.46 12.28 51.48 16.04 41.4 10 40 17.33 32.13 12.28 28.52 22.07 24.05 18.79 18.79 29.54 18.4 28.52 12.28 38.6 16.04 40";
    static STROKE_R = 2;
    static RC = 40;

    static poly = null;
    static innerR = 0;
    static outerR = 0;
    static masks = null;
    static _loading = null;

    static _init() {
        if (SawTouch.poly) return;
        const n = SawTouch.POLY_SRC.split(' ').map(Number);
        const pts = [];
        for (let i = 0; i + 1 < n.length; i += 2) pts.push(n[i] - SawTouch.RC, n[i + 1] - SawTouch.RC);
        if (pts.length > 2 && pts[0] === pts[pts.length - 2] && pts[1] === pts[pts.length - 1]) pts.length -= 2;
        SawTouch.poly = Float64Array.from(pts);
        let inner = Infinity, outer = 0;
        const m = pts.length / 2;
        for (let i = 0; i < m; i++) {
            const j = (i + 1) % m;
            inner = Math.min(inner, SawTouch._segDist(0, 0, pts[2 * i], pts[2 * i + 1], pts[2 * j], pts[2 * j + 1]));
            outer = Math.max(outer, Math.hypot(pts[2 * i], pts[2 * i + 1]));
        }
        SawTouch.innerR = inner + SawTouch.STROKE_R;
        SawTouch.outerR = outer + SawTouch.STROKE_R;
    }

    static _segDist(px, py, ax, ay, bx, by) {
        const vx = bx - ax, vy = by - ay;
        const l2 = vx * vx + vy * vy;
        let t = l2 > 0 ? ((px - ax) * vx + (py - ay) * vy) / l2 : 0;
        t = t < 0 ? 0 : t > 1 ? 1 : t;
        return Math.hypot(px - (ax + t * vx), py - (ay + t * vy));
    }

    static _inSaw(x, y) {
        const r = Math.hypot(x, y);
        if (r < SawTouch.innerR) return true;
        if (r > SawTouch.outerR) return false;
        const p = SawTouch.poly, m = p.length / 2;
        let inside = false, minD = Infinity;
        for (let i = 0, j = m - 1; i < m; j = i++) {
            const xi = p[2 * i], yi = p[2 * i + 1], xj = p[2 * j], yj = p[2 * j + 1];
            if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) inside = !inside;
            const d = SawTouch._segDist(x, y, xi, yi, xj, yj);
            if (d < minD) minD = d;
        }
        return inside || minD <= SawTouch.STROKE_R;
    }

    static async load(base = 'assets/player/') {
        SawTouch._init();
        if (SawTouch.masks) return SawTouch.masks;
        if (SawTouch._loading) return SawTouch._loading;
        if (typeof document === 'undefined' || typeof Image === 'undefined') return null;
        const grab = (name) => new Promise((resolve, reject) => {
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
            img.onerror = () => reject(new Error('could not load ' + name));
            img.src = base + name;
        });
        SawTouch._loading = Promise.all([grab('stand.png'), grab('crouch.png')])
            .then(([stand, crouch]) => (SawTouch.masks = { stand, crouch }))
            .catch(e => { console.warn('SawTouch: player silhouettes unavailable, using PSZ box', e); SawTouch._loading = null; return null; });
        return SawTouch._loading;
    }

    static setMasks(masks) { SawTouch._init(); SawTouch.masks = masks; }

    static _wrapDir(d) { return d - Math.floor((d + 179) / 360) * 360; }

    static touching(saw, size, spr, psz, cam) {
        SawTouch._init();
        if (!spr) return false;
        const s = size / 100;
        const reach = SawTouch.outerR * s + 30;
        if (Math.abs(spr.x - saw.x) > reach || Math.abs(spr.y - saw.y) > reach) return false;
        if (SawTouch.sil && SawTouch.sil.saw) return SawTouch._sawSil(saw, size, spr, cam);

        const a = (saw.direction - 90) * Math.PI / 180, ca = Math.cos(a), sa = Math.sin(a);
        const masks = SawTouch.masks;
        const b = (spr.direction - 90) * Math.PI / 180, cb = Math.cos(b), sb = Math.sin(b);
        const mirror = spr.dir === -1 ? -1 : 1;

        const R = SawTouch.outerR * s;
        const x0 = Math.floor(saw.x - R), x1 = Math.ceil(saw.x + R);
        const y0 = Math.floor(saw.y - R), y1 = Math.ceil(saw.y + R);

        let mask, yOff;
        if (masks) {
            mask = spr.crouch ? masks.crouch : masks.stand;
            yOff = spr.crouch ? (spr.wall ? -16 : -6) : -16;
        }
        for (let py = y0; py <= y1; py++) {
            for (let px = x0; px <= x1; px++) {
                if (mask) {
                    const ox = px - spr.x, oy = -(py - spr.y);
                    let lx = ox * cb + oy * sb;
                    const ly = -ox * sb + oy * cb;
                    lx *= mirror;
                    const ix = Math.floor((lx + 12) * 2), iy = Math.floor((ly - yOff) * 2);
                    if (ix < 0 || iy < 0 || ix >= mask.w || iy >= mask.h || mask.a[iy * mask.w + ix] === 0) continue;
                } else {
                    if (px < spr.x - psz[4] || px > spr.x + psz[2] || py < spr.y - psz[3] || py > spr.y + psz[1]) continue;
                }
                const dx = px - saw.x, dy = -(py - saw.y);
                const lx = (dx * ca + dy * sa) / s;
                const ly = (-dx * sa + dy * ca) / s;
                if (SawTouch._inSaw(lx, ly)) return true;
            }
        }
        return false;
    }
}

SawTouch.sil = null;
SawTouch.setSilhouettes = function (data) {
    SawTouch.sil = null;
    if (typeof ScratchTouch === 'undefined' || !data || !data.dynamic || !data.player) return;
    const names = ['Stand', 'Crouch', 'Wall Crouch'];
    if (!names.every(n => data.player[n])) return;
    const player = names.map(n => new ScratchTouch.CoreSkin(data.player[n], 'bitmap'));
    const sil = { player, pD: ScratchTouch.makeDrawable(player[0], 90, 0, 0, 100) };
    if (data.dynamic.burtha3) {
        sil.burtha3 = new ScratchTouch.CoreSkin(data.dynamic.burtha3, 'svg');
        sil.bD = ScratchTouch.makeDrawable(sil.burtha3, 90, 0, 0, 100);
    }
    if (data.dynamic.saw) {
        sil.saw = new ScratchTouch.CoreSkin(data.dynamic.saw, 'svg');
        sil.sD = ScratchTouch.makeDrawable(sil.saw, 90, 0, 0, 100);
    }
    SawTouch.sil = (sil.burtha3 || sil.saw) ? sil : null;
};

SawTouch._playerDrawable = function (spr) {
    const S = SawTouch.sil;
    S.pD.skin = S.player[spr.crouch ? (spr.wall ? 2 : 1) : 0];
    S.pD.updateProperties({ position: [spr.x, spr.y], direction: spr.direction, scale: [100, 100] });
    return S.pD;
};

SawTouch._burthaSil = function (b, spr, cam) {
    const S = SawTouch.sil;
    S.bD.updateProperties({ position: [b.x, b.y], direction: b.direction, scale: [100, 100] });
    return cam ? ScratchTouch.touching(S.bD, SawTouch._playerDrawable(spr), -cam[0], -cam[1]) : ScratchTouch.touching(S.bD, SawTouch._playerDrawable(spr));
};

SawTouch._sawSil = function (saw, size, spr, cam) {
    const S = SawTouch.sil;
    S.sD.updateProperties({ position: [saw.x, saw.y], direction: saw.direction, scale: [size, size] });
    return cam ? ScratchTouch.touching(S.sD, SawTouch._playerDrawable(spr), -cam[0], -cam[1]) : ScratchTouch.touching(S.sD, SawTouch._playerDrawable(spr));
};

SawTouch.touchingBurtha = function (b, spr, psz, cam) {
    if (!spr) return false;
    const R = 175;
    if (Math.abs(spr.x - b.x) > R + 30 || Math.abs(spr.y - b.y) > R + 30) return false;
    if (!(SawTouch.sil && SawTouch.sil.burtha3)) return false;
    return SawTouch._burthaSil(b, spr, cam);
};
if (typeof module !== 'undefined' && module.exports) module.exports = SawTouch;
