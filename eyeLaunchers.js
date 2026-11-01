class EyeLauncherTouch {
    static COSTUME = ['eye-launcher', 20, 20];
    static SCALE = 2;

    static sil = null;
    static setSilhouettes(data) {
        EyeLauncherTouch.sil = null;
        if (typeof ScratchTouch === 'undefined' || !data || !data.launcher || !data.player) return;
        const spec = data.launcher[EyeLauncherTouch.COSTUME[0]];
        if (!spec || !['Stand', 'Crouch', 'Wall Crouch'].every(n => data.player[n])) return;
        const mob = new ScratchTouch.CoreSkin(spec, 'svg');
        const player = ['Stand', 'Crouch', 'Wall Crouch'].map(n => new ScratchTouch.CoreSkin(data.player[n], 'bitmap'));
        EyeLauncherTouch.sil = { mob, player,
            mD: ScratchTouch.makeDrawable(mob, 90, 0, 0, 100),
            pD: ScratchTouch.makeDrawable(player[0], 90, 0, 0, 100) };
    }

    static _touchingSil(w, spr, cam) {
        const S = EyeLauncherTouch.sil;
        S.mD.updateProperties({ position: [w.x, w.y], direction: w.direction, scale: [100, 100] });
        S.pD.skin = S.player[spr.crouch ? (spr.wall ? 2 : 1) : 0];
        S.pD.updateProperties({ position: [spr.x, spr.y], direction: spr.direction, scale: [100, 100] });
        return cam ? ScratchTouch.touching(S.mD, S.pD, -cam[0], -cam[1]) : ScratchTouch.touching(S.mD, S.pD);
    }

    static mask = null;
    static _loading = null;

    static async load(base = 'assets/mobs/') {
        if (EyeLauncherTouch.mask) return EyeLauncherTouch.mask;
        if (EyeLauncherTouch._loading) return EyeLauncherTouch._loading;
        if (typeof document === 'undefined' || typeof Image === 'undefined') return null;
        const S = EyeLauncherTouch.SCALE;
        const [name, cx, cy] = EyeLauncherTouch.COSTUME;
        EyeLauncherTouch._loading = new Promise((resolve, reject) => {
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
        }).then(m => (EyeLauncherTouch.mask = m))
          .catch(e => { console.warn('EyeLauncherTouch: silhouette unavailable, using boxes', e); EyeLauncherTouch._loading = null; return null; });
        return EyeLauncherTouch._loading;
    }

    static setMask(m) { EyeLauncherTouch.mask = m; }

    static _touchingMask(w, spr, psz) {
        const cos = EyeLauncherTouch.mask;
        const S = EyeLauncherTouch.SCALE;
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
        if (EyeLauncherTouch.sil) return EyeLauncherTouch._touchingSil(w, spr, cam);
        return EyeLauncherTouch._touchingMask(w, spr, psz);
    }
}
if (typeof module !== 'undefined' && module.exports) module.exports = EyeLauncherTouch;
