(function () {
    let screenW = 1920;
    try { const sv = JSON.parse(localStorage.getItem('appel.screen')); if (sv && sv.w >= 120) screenW = Math.round(sv.w); } catch (_) {}

    const mipFor = w => Math.pow(2, Math.ceil(Math.log2(w / 480)));
    const cache = new Map();
    let lib = null;
    function ensureCapture() {
        if (typeof window.captureSilhouettes === 'function') return Promise.resolve();
        return lib || (lib = new Promise((res, rej) => {
            const s = document.createElement('script'); s.src = 'scratch_capture.js';
            s.onload = () => res();
            s.onerror = () => { lib = null; rej(new Error('could not load scratch_capture.js')); };
            document.head.appendChild(s);
        }));
    }
    async function getSil(w) {
        const key = mipFor(w);
        if (!cache.has(key)) { await ensureCapture(); cache.set(key, await window.captureSilhouettes(w)); }
        return cache.get(key);
    }

    let ready = null;
    function use(w) {
        ready = getSil(w).then(d => { Touching.preloaded = d; })
            .catch(e => { console.error('Hitbox capture failed:', e); alert('Could not build hitboxes for screen width ' + w + ': ' + (e && e.message || e)); });
        return ready;
    }

    const origLoad = Touching.prototype.loadCorrelationTable;
    Touching.prototype.loadCorrelationTable = async function (...a) { await ready; return origLoad.apply(this, a); };


    use(screenW);

    window.Hitboxes = {
        get screenW() { return screenW; },
        mip: () => mipFor(screenW),
        async setScreenWidth(w) {
            w = Math.round(+w);
            if (!(w >= 120 && w <= 16000)) return false;
            screenW = w;
            try { localStorage.setItem('appel.screen', JSON.stringify({ w })); } catch (_) {}
            await use(w);
            return true;
        }
    };

    window.addEventListener('DOMContentLoaded', () => {
        const inp = document.getElementById('screenWidthInput'), info = document.getElementById('screenMipInfo');
        if (!inp) return;
        const show = () => { if (info) info.textContent = '→ ' + mipFor(screenW) + 'x'; };
        inp.value = screenW; show();
        inp.addEventListener('change', async () => {
            if (!(await window.Hitboxes.setScreenWidth(inp.value))) { inp.value = screenW; return; }
            show();
            const box = document.getElementById('levelCode');
            if (box && box.value.trim()) box.dispatchEvent(new Event('change'));
        });
    });
})();
