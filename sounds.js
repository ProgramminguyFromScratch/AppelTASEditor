class SoundPlayer {
    static FILES = {
        'Start': 'start.wav', 'jump': 'jump.wav', 'wall jump': 'wall_jump.wav', 'hit': 'hit.wav', 'Flag': 'flag.wav',
        'Complete': 'complete.wav', 'boom 2': 'boom2.wav', 'squishy': 'squishy.wav', 'coin 2': 'coin2.wav', 'crunch': 'crunch.wav',
        'Key': 'key.wav', 'Door Open': 'door_open.mp3', 'spring': 'spring.wav', 'crumble 2': 'crumble2.wav', 'boing': 'boing.wav',
        'squish': 'squish.wav', 'blip2': 'blip2.wav', 'Boom': 'boom.wav', 'woosh1': 'woosh1.wav', 'woosh2': 'woosh2.wav',
        'woosh3': 'woosh3.wav', 'stomp1': 'stomp1.wav', 'stomp2': 'stomp2.wav', 'stomp3': 'stomp3.wav', 'grunt': 'grunt.wav',
        'tinkle1': 'tinkle1.wav', 'tinkle2': 'tinkle2.wav', 'tinkle3': 'tinkle3.wav', 'tinkle4': 'tinkle4.wav',
        'tinkle5': 'tinkle5.wav', 'tinkle6': 'tinkle6.wav',
        'launcher': 'launcher.wav', 'launcher2': 'launcher2.wav'
    };

    constructor(base = 'assets/sounds/') {
        this.base = base;
        this.enabled = true;
        this.ctx = null;
        this.buffers = {};
        this._loading = false;
        const unlock = () => this._unlock();
        window.addEventListener('keydown', unlock);
        window.addEventListener('pointerdown', unlock);
    }

    _unlock() {
        if (!this.ctx) {
            const AC = window.AudioContext || window.webkitAudioContext;
            if (!AC) return;
            this.ctx = new AC();
        }
        if (this.ctx.state === 'suspended') this.ctx.resume();
        if (!this._loading) { this._loading = true; this._loadAll(); }
    }

    async _load(name) {
        try {
            const r = await fetch(this.base + SoundPlayer.FILES[name]);
            if (r.ok) this.buffers[name] = await this.ctx.decodeAudioData(await r.arrayBuffer());
        } catch (e) {  }
    }

    _loadAll() { return Promise.all(Object.keys(SoundPlayer.FILES).map(n => this._load(n))); }

    play(name) {
        const b = this.buffers[name];
        if (!this.enabled || !this.ctx || !b) return;
        const src = this.ctx.createBufferSource();
        src.buffer = b;
        src.connect(this.ctx.destination);
        src.start();
    }

    flush(physics) {
        const list = physics.drainSounds();
        for (const n of list) this.play(n);
    }
}
