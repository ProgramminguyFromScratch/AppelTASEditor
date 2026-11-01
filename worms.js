class WormTouch {
    static COSTUMES = {
        20: ['worm-cw5', 25, 42], 21: ['worm-cw6', 35, 32], 22: ['worm-cw7', 45, 25], 23: ['worm-cw1', 51, 25],
        24: ['worm-cw4', 45, 25], 25: ['worm-cw3', 35, 25], 26: ['worm-cw11', 25, 25],
        27: ['worm-cw8', 25, 2], 28: ['worm-cw9', 35, 2], 29: ['worm-cw10', 45, 2], 30: ['worm-ccw1', 51, 2],
        31: ['worm-cw12', 45, 13], 32: ['worm-cw13', 35, 23], 33: ['worm-cw14', 25, 33]
    };
    static SCALE = 2;

    static costumeName(w) {
        const base = w.ux === 90 ? 23 : 30;
        const n = base + (Number(w.uy) || 0);
        const c = WormTouch.COSTUMES[n] || WormTouch.COSTUMES[base];
        return c[0];
    }

    static costumeSpec(name) {
        for (const k in WormTouch.COSTUMES) if (WormTouch.COSTUMES[k][0] === name) return WormTouch.COSTUMES[k];
        return null;
    }

    static sil = null;
    static setSilhouettes(data) {
        WormTouch.sil = null;
        if (typeof ScratchTouch === 'undefined' || !data || !data.worm || !data.player) return;
        const names = Object.keys(data.worm);
        if (!names.length || !['Stand', 'Crouch', 'Wall Crouch'].every(n => data.player[n])) return;
        const mob = {};
        for (const n of names) mob[n] = new ScratchTouch.CoreSkin(data.worm[n], 'svg');
        const player = ['Stand', 'Crouch', 'Wall Crouch'].map(n => new ScratchTouch.CoreSkin(data.player[n], 'bitmap'));
        WormTouch.sil = { mob, player,
            mD: ScratchTouch.makeDrawable(mob[names[0]], 90, 0, 0, 100),
            pD: ScratchTouch.makeDrawable(player[0], 90, 0, 0, 100) };
    }

    static _touchingSil(w, spr, cam) {
        const S = WormTouch.sil;
        const skin = S.mob[WormTouch.costumeName(w)];
        if (!skin) return false;
        S.mD.skin = skin;
        S.mD.updateProperties({ position: [w.x, w.y], direction: w.direction, scale: [100, 100] });
        S.pD.skin = S.player[spr.crouch ? (spr.wall ? 2 : 1) : 0];
        S.pD.updateProperties({ position: [spr.x, spr.y], direction: spr.direction, scale: [100, 100] });
        return cam ? ScratchTouch.touching(S.mD, S.pD, -cam[0], -cam[1]) : ScratchTouch.touching(S.mD, S.pD);
    }

    static masks = null;
    static _loading = null;

    static async load(base = 'assets/mobs/') {
        if (WormTouch.masks) return WormTouch.masks;
        if (WormTouch._loading) return WormTouch._loading;
        if (typeof document === 'undefined' || typeof Image === 'undefined') return null;
        const S = WormTouch.SCALE;
        const grab = ([name, cx, cy]) => new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                const lw = img.naturalWidth || img.width, lh = img.naturalHeight || img.height;
                const c = document.createElement('canvas');
                c.width = Math.ceil(lw * S); c.height = Math.ceil(lh * S);
                const g = c.getContext('2d', { willReadFrequently: true });
                g.drawImage(img, 0, 0, lw * S, lh * S);
                const d = g.getImageData(0, 0, c.width, c.height).data;
                const a = new Uint8Array(c.width * c.height);
                for (let i = 0; i < a.length; i++) a[i] = d[i * 4 + 3];
                resolve({ w: c.width, h: c.height, a, cx, cy });
            };
            img.onerror = () => reject(new Error('could not load ' + name));
            img.src = base + name + '.svg';
        });
        const list = Object.values(WormTouch.COSTUMES);
        WormTouch._loading = Promise.all(list.map(grab))
            .then(r => { const m = {}; list.forEach((c, i) => { m[c[0]] = r[i]; }); return (WormTouch.masks = m); })
            .catch(e => { console.warn('WormTouch: worm silhouettes unavailable, using boxes', e); WormTouch._loading = null; return null; });
        return WormTouch._loading;
    }

    static setMasks(m) { WormTouch.masks = m; }

    static _touchingMask(w, spr, psz) {
        const cos = WormTouch.masks && WormTouch.masks[WormTouch.costumeName(w)];
        const S = WormTouch.SCALE;
        const a = (w.direction - 90) * Math.PI / 180, ca = Math.cos(a), sa = Math.sin(a);
        const px0 = Math.floor(spr.x - psz[4]), px1 = Math.ceil(spr.x + psz[2]);
        const py0 = Math.floor(spr.y - psz[3]), py1 = Math.ceil(spr.y + psz[1]);
        for (let py = py0; py <= py1; py++) {
            for (let px = px0; px <= px1; px++) {
                if (!cos) return true;
                const ox = px - w.x, oy = -(py - w.y);
                const lx = ox * ca + oy * sa, ly = -ox * sa + oy * ca;
                const mi = Math.floor((lx + cos.cx) * S), mj = Math.floor((ly + cos.cy) * S);
                if (mi < 0 || mj < 0 || mi >= cos.w || mj >= cos.h || cos.a[mj * cos.w + mi] === 0) continue;
                return true;
            }
        }
        return false;
    }

    static touching(w, spr, psz, cam) {
        if (!spr) return false;
        if (WormTouch.sil) return WormTouch._touchingSil(w, spr, cam);
        return WormTouch._touchingMask(w, spr, psz);
    }
}
if (typeof module !== 'undefined' && module.exports) module.exports = WormTouch;
