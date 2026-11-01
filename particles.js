class ParticleSystem {
    static COSTUMES = {
        'Yellow': ['Yellow.png', 2, 12, 12], 'Eye': ['Eye.png', 2, 12, 12], 'Eye2': ['Eye2.png', 2, 12, 12], 'Green': ['Green.png', 2, 12, 12],
        'Circle': ['Circle.svg', 1, 75.5, 75.5], 'pop orange': ['pop_orange.png', 2, 12, 24], 'pop eye2': ['pop_eye2.png', 2, 12, 24],
        'Apple': ['Apple.svg', 1, 40, 40], 'yellow': ['yellow.png', 2, 12, 12], 'checkpoint-4': ['checkpoint-4.svg', 1, 8.5, 13.26],
        'dots': ['dots.png', 2, 6, 6], 'dots2': ['dots2.png', 2, 4, 4], 'crumble1': ['crumble1.svg', 1, 8.5, 16.5], 'crumble2': ['crumble2.svg', 1, 8.5, 16.5],
        'cloud': ['cloud.png', 2, 12, 12], 'cloud4': ['cloud4.png', 2, 12, 12], 'cloud2': ['cloud2.png', 2, 12, 12], 'cloud3': ['cloud3.png', 2, 8, 8],
        'spring': ['spring.svg', 1, 29, 33], 'pop horn': ['pop_horn.svg', 1, 5.925, 7.45], 'pop purple': ['pop_purple.png', 2, 12, 12],
        'pop eye': ['pop_eye.png', 2, 12, 12], 'pop dot': ['pop_dot.png', 2, 6, 6], 'pop red': ['pop_red.png', 2, 12, 12],
        'Lock-02': ['Lock-02.svg', 1, 40, 40], 'key1': ['key1.svg', 1, 8, 15], 'typ 80': ['typ_80.svg', 1, 10, 12.125],
        'mega apple': ['mega_apple.svg', 1, 19.65, 22.03]
    };
    static LIFE = 75;

    constructor(editor, base = 'assets/particles/') {
        this.ed = editor;
        this.base = base;
        this.imgs = {};
        this.cache = null;
    }

    reset() { this.cache = null; }

    _img(name) {
        let im = this.imgs[name];
        if (!im) {
            const c = ParticleSystem.COSTUMES[name];
            im = this.imgs[name] = new Image();
            if (c) im.src = this.base + c[0];
        }
        return im;
    }

    static _rng(seed) {
        let a = (seed * 2654435761) >>> 0;
        return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
    }

    _solid(x, y, dir) {
        const ph = this.ed.game && this.ed.game.physics;
        if (!ph || !ph.get_block_at) return 0;
        if (!(ph.get_block_at(x, y) > 4)) return 0;
        const m = (v, n) => ((v % n) + n) % n;
        let t;
        if (dir > 0) t = dir === 1 ? m(x, 30) : 30 - m(y, 30);
        else t = dir === -1 ? 30 - m(x, 30) : m(y, 30);
        return t > 0 ? t : 0;
    }

    _fly(p, dirt, rnd) {
        p.dx *= 0.95;
        if (dirt) { p.dy = (p.dy - 0.9) * 0.99; if (p.dy < -30) p.dy = -30; }
        else p.dy = (p.dy - 0.7) * 0.95;
        p.x += p.dx;
        if (!p.collided) {
            if (p.dx > 0) { const o = this._solid(p.x, p.y - p.size, 1); if (o) { p.x += -0.01 - o; p.dx = -0.8 * Math.abs(p.dx); } }
            else { const o = this._solid(p.x, p.y - p.size, -1); if (o) { p.x += 0.01 + o; p.dx = Math.abs(p.dx); } }
        }
        p.y += p.dy;
        if (!p.collided) {
            if (p.dy > 0) { const o = this._solid(p.x, p.y - p.size, 0); if (o) { p.y += -0.01 - o; p.dy = -0.5 * Math.abs(p.dy); } }
            else {
                const o = this._solid(p.x, p.y - p.size, 2);
                if (o) {
                    p.y += 0.01 + o; p.dy = 0.5 * Math.abs(p.dy); p.dx *= 0.75;
                    if (p.dy > 1) p.dx += Math.abs(p.dy) * rnd(-0.5, 0.5);
                }
            }
        }
        p.frame++;
        if (p.frame > 60) p.ghost += 10;
        if (p.frame > 70) p.dead = true;
    }

    _step(p, rnd) {
        switch (p.type) {
            case 'yellow': this._fly(p, false, rnd); break;
            case 'dirt': this._fly(p, true, rnd); break;
            case 'circle':
                p.scale += (130 - p.scale) * 0.15; p.ghost += 7; p.frame++;
                if (p.frame > 15) p.dead = true;
                break;
            case 'spring': {
                p.frame++;
                if (p.frame < 3) { p.x += p.dx; p.y += p.dy; }
                else if (p.frame < 5) { p.dx = 0; p.dy = 0; }
                else if (p.frame < 30) {
                    const d = (p.dir - 90) * Math.PI / 180;
                    if (((p.dir % 180) + 180) % 180 === 0) { p.dx += -0.7 * Math.sin(d); p.x += p.dx; if (Math.abs(p.x - p.rootX) < 6) p.dead = true; }
                    else { p.dy += -0.5 * Math.cos(d); p.y += p.dy; if (Math.abs(p.y - p.rootY) < 6) p.dead = true; }
                } else if (p.frame > 120) p.dead = true;
                break;
            }
            default:
                p.dy += (0.5 - p.dy) * 0.1; p.y += p.dy;
                p.dx += (0 - p.dx) * 0.1; p.x += p.dx;
                p.frame++; p.ghost += 5;
                if (p.frame > 20) p.dead = true;
        }
    }

    _spawn(ev, list, rnd) {
        const mk = (o) => list.push(Object.assign({ type: 'yellow', costume: 'Yellow', x: 0, y: 0, dx: 0, dy: 0, frame: 0, size: 7, ghost: 0, dir: 90, scale: 100, collided: false, dead: false }, o));
        let typ = ev[0];
        if (typ === 'explode') {
            const px = ev[1], py = ev[2];
            const spark = (costume) => { const dx = rnd(-12, 12), dy = rnd(-4, 20); mk({ costume, frame: Math.floor(rnd(0, 21)), dx, dy, x: px + dx, y: py + dy }); };
            for (let i = 0; i < 15; i++) spark('Yellow');
            for (const c of ['Eye', 'Eye2', 'Green']) spark(c);
            mk({ type: 'circle', costume: 'Circle', x: px, y: py, scale: 10 });
            return;
        }
        let a = ev.slice(1);
        if (typ === 'pop1') { typ = a[0]; a = a.slice(1); mk({ costume: typ, x: a[0], y: a[1], frame: 45, dx: rnd(-6, 6), dy: rnd(5, 9) }); return; }
        if (typ === 'popn') {
            const [costume, x, y, count, frame, dx, dy1, dy2] = a;
            for (let i = 0; i < count; i++) mk({ costume, x, y, frame, dx: dx * rnd(-1, 1), dy: rnd(dy1, dy2) });
            return;
        }
        if (typ === 'dust') {
            if ((a[2] || 0) % Math.max(1, Math.round(rnd(1, 2))) !== 0) return;
            mk({ type: 'collect', costume: 'cloud', x: a[0] + rnd(-6, 6), y: a[1], dx: rnd(-1, 1), dy: rnd(0, 1.5), collided: true });
            return;
        }
        const x = a[0], y = a[1], extra = a[2];
        if (typ === 15 || typ === 'collect') { mk({ type: 'collect', costume: typ === 'collect' ? extra : 'Apple', x, y, dx: 0, dy: 10 }); return; }
        if (typ === 25 || typ === 'burst') {
            const costume = typ === 'burst' ? extra : 'checkpoint-4';
            let temp = -10, dx = 14 * Math.sin((temp - 10) * Math.PI / 180), dy = 4 + 14 * Math.cos((temp - 10) * Math.PI / 180);
            for (let i = 0; i < 7; i++) {
                mk({ type: 'collect', costume, x, y, dx, dy });
                const r = () => (temp + rnd(-10, 10)) * Math.PI / 180;
                dx = 14 * Math.sin(r()); dy = 4 + 14 * Math.cos(r()); temp += 45;
            }
            mk({ type: 'collect', costume, x, y, dx, dy });
            return;
        }
        if (typ === 6) { mk({ type: 'collect', costume: 'pop orange', x, y, dx: rnd(-6, 6), dy: rnd(5, 9) }); return; }
        if (typeof typ !== 'string') return;
        if (typ.includes('pop')) { for (let i = 0; i < 4; i++) mk({ costume: typ, x, y, frame: 45, dx: rnd(-6, 6), dy: rnd(5, 9) }); return; }
        if (typ === 'dots') { for (let i = 0; i < 4; i++) mk({ costume: 'dots', x, y, frame: 45, dx: rnd(-6, 6), dy: rnd(5, 9), size: 4 }); return; }
        if (typ === 'dirt drop') { const c = rnd(0, 1) >= 0.5 ? 'dots2' : 'dots'; mk({ type: 'dirt', costume: c, x, y, frame: 40, dx: rnd(-0.2, 0.2), dy: 0, size: c === 'dots' ? 4 : 3 }); return; }
        if (typ.includes('crumble')) { mk({ type: 'dirt', costume: typ, x, y, frame: 55, dx: rnd(-1, 1), dy: rnd(-1, 0), collided: true }); return; }
        if (typ.includes('cloud')) { mk({ type: 'collect', costume: typ, x, y, dx: rnd(-1, 1), dy: rnd(0, 1.5), collided: true }); return; }
        if (typ.includes('spring')) { mk({ type: 'spring', costume: 'spring', x, y, rootX: x, rootY: y, dir: 90 * extra, dx: 15 * Math.sin((90 * extra - 90) * Math.PI / 180), dy: 15 * Math.cos((90 * extra - 90) * Math.PI / 180) }); }
    }

    _advance(list, t) {
        const rng = ParticleSystem._rng(t + 1);
        const rnd = (a, b) => a + (b - a) * rng();
        const rndI = (a, b) => Number.isInteger(a) && Number.isInteger(b) ? Math.floor(a + (b - a + 1) * rng()) : rnd(a, b);
        for (const p of list) this._step(p, rndI);
        const alive = list.filter(p => !p.dead && p.ghost < 100);
        const f = this.ed.frameStates && this.ed.frameStates[t + 1];
        if (f && f.particles) for (const ev of f.particles) this._spawn(ev, alive, rndI);
        return alive;
    }

    at(f) {
        const fs = this.ed.frameStates;
        if (!fs || !fs.length) return [];
        f = Math.max(0, Math.min(f, fs.length - 1));
        const c = this.cache;
        if (c && c.frame === f) return c.list;
        if (c && c.frame === f - 1) { this.cache = { frame: f, list: this._advance(c.list, f - 1) }; return this.cache.list; }
        let list = [];
        for (let t = Math.max(0, f - ParticleSystem.LIFE); t < f; t++) list = this._advance(list, t);
        this.cache = { frame: f, list };
        return list;
    }

    drawWorld(ctx, frame) {
        const list = this.at(frame);
        for (const p of list) {
            const c = ParticleSystem.COSTUMES[p.costume];
            const im = this._img(p.costume);
            if (!c || !im.complete || !im.naturalWidth) continue;
            const res = c[1], s = p.scale / 100;
            ctx.save();
            ctx.globalAlpha = Math.max(0, 1 - p.ghost / 100);
            ctx.translate(p.x, -p.y);
            if (p.dir !== 90) ctx.rotate((p.dir - 90) * Math.PI / 180);
            ctx.scale(s, s);
            ctx.drawImage(im, -c[2] / res, -c[3] / res, im.naturalWidth / res, im.naturalHeight / res);
            ctx.restore();
        }
    }
}
