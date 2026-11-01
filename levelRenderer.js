class LevelRenderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');

        this.tilesetCache = new Map();
        this.wallCache = new Map();
        this.backgroundVariants = new Map();

        this.tiles = [];
        this.wallTiles = [];
        this.background = null;
        this.assetsLoaded = false;
        this.tileSize = 60;

        this.objectTiles = new Set([11, 12, 16, 19, 22, 23, 24, 31, 32, 45, 58, 59, 60, 61, 62, 69, 70, 71, 73, 75, 76, 84, 85]);
        this.hideObjectTiles = false;
        this.currentHue = 0;
        this.huedDynamic = new Map();

        this.needsHue = [..."01111110010010001101100000000001100000000111000001100000001000000001000001001111111001"]
            .flatMap((c, i) => c === "1" ? [i] : []);
    }

    static getDataFromCode(code) {
        try {
            const tokens = code.substring(7).replaceAll("C", "-").replaceAll("B", "+").split("Z");
            const size_x = parseInt(tokens[0], 10);

            let cursor = 1;
            const readSegment = () => {
                const end = tokens.indexOf("", cursor);
                if (end === -1) {
                    const seg = tokens.slice(cursor);
                    cursor = tokens.length;
                    return seg;
                }
                const seg = tokens.slice(cursor, end);
                cursor = end + 1;
                return seg;
            };

            const MAP_data = readSegment();
            const MAP_R_data = readSegment();
            const MAP_DATA = readSegment();
            const WALL_DATA = readSegment();
            const remaining = tokens.slice(cursor);

            const MAP = [];
            for (let i = 0; i < MAP_data.length; i += 2) {
                const fv = parseFloat(MAP_data[i]);
                const value = (Number.isFinite(fv) && !Number.isInteger(fv)) ? fv : parseInt(fv);
                const count = parseInt(parseFloat(MAP_data[i + 1]));
                for (let j = 0; j < count; j++) MAP.push(value);
            }

            const MAP_R = [];
            for (let i = 0; i < MAP_R_data.length; i += 2) {
                let value = MAP_R_data[i];
                const count = parseInt(parseFloat(MAP_R_data[i + 1]));
                value = (value === 'Infinity' || (typeof value === 'string' && value.includes('e'))) ? 1 : parseFloat(value);
                for (let j = 0; j < count; j++) MAP_R.push(value);
            }

            const hue = remaining[remaining.length - 2];
            const hue2 = remaining[remaining.length - 1];

            return {
                map: MAP,
                rotations: MAP_R,
                size_x,
                MAP_DATA,
                hue,
                hue2,
                wall: WALL_DATA
            };
        } catch (e) {
            console.error("[getDataFromCode] Error:", e);
            return null;
        }
    }

    async loadAssets(onProgress) {
        const loadImage = (src) => {
            return new Promise(resolve => {
                const img = new Image();
                img.onload = () => {
                    if (onProgress) onProgress();
                    resolve(img);
                };
                img.onerror = () => {
                    console.warn(`Failed to load: ${src}`);
                    if (onProgress) onProgress();
                    resolve(null);
                };
                img.src = src;
            });
        };

        const tilePromises = [];
        for (let i = 1; i <= 172; i++) {
            tilePromises.push(loadImage(`assets/tiles/${i}.svg`));
        }
        this.tiles = await Promise.all(tilePromises);

        const wallPromises = [];
        for (let i = 1; i <= 24; i++) {
            wallPromises.push(loadImage(`assets/wall/${i}.svg`));
        }
        this.wallTiles = await Promise.all(wallPromises);

        const dynamicPromises = [];
        for (let i = 1; i <= 9; i++) {
            dynamicPromises.push(loadImage(`assets/dynamic/${i}.svg`));
        }
        this.dynamicImages = await Promise.all(dynamicPromises);

        const mobSpecs = {
            'Mob A1': ['Mob_A1', 11.5, 23.0524], 'Mob A4': ['Mob_A4', 13.111, 31.0787],
            'Mob A2': ['Mob_A2', 12.3783, 28.0516], 'Mob A3': ['Mob_A3', 15.7579, 16.0524],
            'Enemy-big-purple': ['Enemy-big-purple', 22, 44], 'Enemy-b3': ['Enemy-b3', 27.1366, 58.0252],
            'Enemy-b2': ['Enemy-b2', 24.5048, 53.0572], 'Mob P squish': ['Mob_P_squish', 22, 39.6],
            'pip': ['pip', 8.5, 25.9545], 'pip2': ['pip2', 8.5, 25.9545]
        };
        this.mobCostumes = {};
        await Promise.all(Object.entries(mobSpecs).map(async ([name, [file, cx, cy]]) => {
            const img = await loadImage(`assets/mobs/${file}.svg`);
            this.mobCostumes[name] = { img, cx, cy };
        }));

        this.wormCostumes = {};
        if (typeof WormTouch !== 'undefined') {
            await Promise.all(Object.values(WormTouch.COSTUMES).map(async ([name, cx, cy]) => {
                try { this.wormCostumes[name] = { img: await loadImage(`assets/mobs/${name}.svg`), cx, cy }; } catch (e) {  }
            }));
        }

        this.eyeLauncher = null;
        if (typeof EyeLauncherTouch !== 'undefined') {
            const [name, cx, cy] = EyeLauncherTouch.COSTUME;
            try { this.eyeLauncher = { img: await loadImage(`assets/mobs/${name}.svg`), cx, cy }; } catch (e) {  }
        }

        this.playerNormal = await loadImage('assets/player/stand.png');
        this.playerCrouch = await loadImage('assets/player/crouch.png');

        await new Promise(resolve => {
            const img = new Image();
            img.onload = () => {
                this.background = img;
                if (onProgress) onProgress();
                resolve();
            };
            img.onerror = () => {
                const fallback = document.createElement('canvas');
                fallback.width = 480; fallback.height = 360;
                const fctx = fallback.getContext('2d');
                fctx.fillStyle = '#4A90E2';
                fctx.fillRect(0, 0, 480, 360);
                this.background = fallback;
                if (onProgress) onProgress();
                resolve();
            };
            img.src = 'assets/bg.svg';
        });

        this.collectImgs = {};
        for (const [tile, name, cx, cy] of LevelRenderer.COLLECTIBLES) {
            this.collectImgs[tile] = { img: await loadImage(`assets/mobs/${name}.svg`), cx, cy };
        }

        this.assetsLoaded = true;
    }

    initializeHuedAssets(levelData) {
        const hue = this.fixHue(levelData.hue);
        const hue2 = this.fixHue(levelData.hue2);

        this.getHuedTileset(hue);
        this.getHuedWalls(hue2);
    }

    renderPlayer(playerPos, camera) {
        if (!this.playerNormal || !this.playerCrouch) return;

        this.ctx.save();

        this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
        this.ctx.scale(camera.zoom, camera.zoom);
        this.ctx.translate(-camera.x, camera.y);

        this.ctx.translate(playerPos.x, -playerPos.y);

        const angle = (playerPos.angle - 90) || 0;
        this.ctx.rotate(angle * Math.PI / 180);

        if (playerPos.dir === -1) {
            this.ctx.scale(-1, 1);
        }

        if (playerPos.crouched) {
            const yOffset = playerPos.onWall ? -16 : -6;
            this.ctx.drawImage(this.playerCrouch, -12, yOffset, 24, 22);
        } else {
            this.ctx.drawImage(this.playerNormal, -12, -16, 24, 32);
        }

        this.ctx.restore();
    }

    static COLLECTIBLES = [
        [69, 'apple-typ69', 10, 12],
        [70, 'key1', 8, 15],
        [85, 'mega-apple', 19.65268984026153, 22.033440096018182]
    ];

    renderCollectibles(levelData, camera, ps) {
        if (!this.collectImgs) return;
        const map = levelData.map, sx = levelData.size_x;
        if (levelData._collectIdx === undefined || levelData._collectLen !== map.length) {
            const list = [];
            for (let i = 0; i < map.length; i++) {
                const t = Math.floor(map[i]);
                if (t === 69 || t === 70 || t === 85) list.push([i, t]);
            }
            levelData._collectIdx = list;
            levelData._collectLen = map.length;
            levelData._firstKey = (list.find(e => e[1] === 70) || [-1])[0];
            levelData._firstMega = (list.find(e => e[1] === 85) || [-1])[0];
        }
        const tick = (ps && ps.TICK) || 0;
        const got = (ps && ps.applesGot) || [];
        const rad = Math.PI / 180;
        const viewW = this.canvas.width / 2 / camera.zoom + 80, viewH = this.canvas.height / 2 / camera.zoom + 80;
        const ctx = this.ctx;
        for (const [idx, tile] of levelData._collectIdx) {
            const cur = Math.floor(map[idx]);
            if (cur !== tile) continue;
            if (tile === 70 && (idx !== levelData._firstKey || (ps && ps.has_key))) continue;
            if (tile === 85 && idx !== levelData._firstMega) continue;
            if (tile === 69 && got.includes(idx)) continue;
            const rx = (idx % sx) * 60 + 30, ry = Math.floor(idx / sx) * 60 + 30;
            if (Math.abs(rx - camera.x) > viewW || Math.abs(ry - camera.y) > viewH) continue;
            const c = this.collectImgs[tile];
            if (!c || !c.img) continue;
            let y = ry, scale = 1;
            if (tile === 69) {
                y += 6 * Math.sin((rx + ry + tick) * 5 * rad);
            } else {
                const k = tile === 70 ? 5 : 3;
                y += 6 * Math.sin(tick * k * rad);
                if (tile === 85) scale = 1 + 0.04 * Math.sin(tick * 25 * rad);
            }
            ctx.save();
            ctx.translate(rx, -y);
            if (scale !== 1) ctx.scale(scale, scale);
            ctx.drawImage(c.img, -c.cx, -c.cy);
            ctx.restore();
        }
    }

    renderDynamic(OBJ, camera, inWorld = false) {
        if (!this.dynamicImages || !OBJ) return;

        this.ctx.save();

        if (!inWorld) {
            this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
            this.ctx.scale(camera.zoom, camera.zoom);
            this.ctx.translate(-camera.x, camera.y);
        }

        for (let item of OBJ) {

            if (item.typ === 'saw') {
                const img = this.dynamicImages[5];
                if (img && item.state !== 'spawn') {
                    this.ctx.save();
                    this.ctx.translate(item.x, -item.y);
                    this.ctx.rotate(((item.direction || 0) - 90) * Math.PI / 180);
                    this.ctx.drawImage(img, -40, -40);
                    this.ctx.restore();
                }
                continue;
            }

            if (item.typ === 'worm') {
                if (item.state === 'spawn' || !this.wormCostumes || typeof WormTouch === 'undefined') continue;
                const cos = this.wormCostumes[WormTouch.costumeName(item)];
                if (!cos || !cos.img) continue;
                this.ctx.save();
                this.ctx.translate(item.x, -item.y);
                this.ctx.rotate(((item.direction || 0) - 90) * Math.PI / 180);
                this.ctx.drawImage(cos.img, -cos.cx, -cos.cy);
                this.ctx.restore();
                continue;
            }

            if (item.typ === 'eyelauncher') {
                if (item.state === 'spawn' || !this.eyeLauncher || !this.eyeLauncher.img) continue;
                this.ctx.save();
                this.ctx.translate(item.x, -item.y);
                this.ctx.rotate(((item.direction || 0) - 90) * Math.PI / 180);
                this.ctx.drawImage(this.eyeLauncher.img, -this.eyeLauncher.cx, -this.eyeLauncher.cy);
                this.ctx.restore();
                continue;
            }

            if (item.typ === 'pip') {
                if (!item.alive || item.state === 'spawn' || !this.mobCostumes) continue;
                const cos = this.mobCostumes[(Number(item.frame) || 0) > 270 ? 'pip2' : 'pip'];
                if (!cos || !cos.img) continue;
                this.ctx.save();
                this.ctx.translate(item.x, -item.y);
                if ((item.direction || 0) < 0) this.ctx.scale(-1, 1);
                this.ctx.drawImage(cos.img, -cos.cx, -cos.cy);
                this.ctx.restore();
                continue;
            }

            if (item.typ === 'walker') {
                if (item.dead || item.state === 'spawn' || !this.mobCostumes) continue;
                const purple = item.wTyp === 13;
                let name;
                if (item.state === 'squish') name = purple ? 'Mob P squish' : 'Mob A3';
                else {
                    const t = AppelPhysics.mod(Math.floor((Number(item.frame) || 0) / 4), 9);
                    const set = purple ? ['Enemy-big-purple', 'Enemy-b3', 'Enemy-b2'] : ['Mob A1', 'Mob A4', 'Mob A2'];
                    name = t < 5 ? ((t === 0 || t === 4) ? set[2] : set[1]) : set[0];
                }
                const cos = this.mobCostumes[name];
                if (!cos || !cos.img) continue;
                this.ctx.save();
                this.ctx.translate(item.x, -item.y);
                if ((item.direction || 0) < 0) this.ctx.scale(-1, 1);
                this.ctx.drawImage(cos.img, -cos.cx, -cos.cy);
                this.ctx.restore();
                continue;
            }

            if (item.burtha) {
                const cs = (typeof AppelPhysics !== 'undefined') ? AppelPhysics.burthaCostume(item.frame) : 0;
                const bi = 6 + cs;
                const bcx = cs === 2 ? 3 : 63, bcy = cs === 2 ? 123 : 63;
                let bimg = this.dynamicImages[bi];
                if (bimg) {
                    if (item.hued !== false && this.currentHue) {
                        const key = bi + '|' + this.currentHue;
                        if (!this.huedDynamic.has(key)) this.huedDynamic.set(key, this.applyColorEffect(bimg, this.currentHue));
                        bimg = this.huedDynamic.get(key);
                    }
                    this.ctx.save();
                    this.ctx.translate(item.mx !== undefined ? item.mx : item.x, -(item.my !== undefined ? item.my : item.y));
                    this.ctx.rotate(((item.direction || 0) - 90) * Math.PI / 180);
                    this.ctx.drawImage(bimg, -bcx, -bcy);
                    this.ctx.restore();
                }
                continue;
            }

            this.ctx.save();

            this.ctx.translate(item.x, -item.y);

            let imgIdx = 0, cx = 33, cy = 18, angle = (item.direction || 0) + 90;
            if (item.teeth) {
                imgIdx = item.teeth === 4 ? 2 : 1;
                cy = 30;
                angle = (item.direction || 0) - 90 + (Number(item.variation) === 3 ? 180 : 0);
            }
            if (item.crusher) {
                imgIdx = (item.state === 1 && item.frame > 0) ? 4 : 3;
                cy = 152.4166;
                angle = (item.direction || 0) - 90;
            }
            this.ctx.rotate(angle * Math.PI / 180);

            let image = this.dynamicImages[imgIdx] || this.dynamicImages[0];
            if (item.crusher && image && this.currentHue) {
                const key = imgIdx + '|' + this.currentHue;
                if (!this.huedDynamic.has(key)) this.huedDynamic.set(key, this.applyColorEffect(image, this.currentHue));
                image = this.huedDynamic.get(key);
            }
            if (image) this.ctx.drawImage(image, -cx, -cy);

            this.ctx.restore();
        }

        this.ctx.restore();
    }

    parseCommands(txt) {
        let cmds = [];
        let dy = "";
        const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "." , "-"]
        for (let dx = 0; dx < txt.length; dx++) {
            const c = txt[dx];
            if (DIGITS.includes(c)) {
                dy += c;
            } else {
                if (dy != "") {
                    cmds.push(parseFloat(dy));
                    dy = "";
                }
                cmds.push(c.toLowerCase());
            }
        }
        if (dy != "") {
            cmds.push(parseFloat(dy));
        }
        return cmds;
    }

    getGroup(txt) {
        let num = "";
        const DIGITS = ["0","1","2","3","4","5","6","7","8","9",".","-"];

        for (let i = 0; i < txt.length; i++) {
            const c = txt[i];

            if (c === "g" || c === "G") {
                i++;

                while (i < txt.length && DIGITS.includes(txt[i])) {
                    num += txt[i];
                    i++;
                }

                return parseFloat(num);
            }
        }

        return null;
    }

    getHuedTileset(hue) {
        if (hue === 0) return this.tiles;
        if (this.tilesetCache.has(hue)) return this.tilesetCache.get(hue);

        const huedSet = this.tiles.map((tile, i) => {
            if (!tile) return null;
            return this.needsHue.includes(i % 86)
                ? this.applyColorEffect(tile, hue)
                : tile;
        });

        this.tilesetCache.set(hue, huedSet);
        return huedSet;
    }

    getHuedWalls(hue) {
        if (hue === 0) return this.wallTiles;
        if (this.wallCache.has(hue)) return this.wallCache.get(hue);

        const huedWalls = this.wallTiles.map(tile =>
            tile ? this.applyColorEffect(tile, hue) : null
        );

        this.wallCache.set(hue, huedWalls);
        return huedWalls;
    }

	rgbToHsv(r, g, b) {
		r /= 255;
		g /= 255;
		b /= 255;
		const max = Math.max(r, g, b),
			min = Math.min(r, g, b),
			d = max - min;
		let h = 0;
		if (d !== 0) {
			if (max === r) h = ((g - b) / d) % 6;
			else if (max === g) h = (b - r) / d + 2;
			else h = (r - g) / d + 4;
		}
		h = ((h * 60) + 360) % 360;
		const s = max === 0 ? 0 : d / max;
		return [h, s, max];
	}

	hsvToRgb(h, s, v) {
		h /= 60;
		const c = v * s;
		const x = c * (1 - Math.abs(h % 2 - 1));
		const m = v - c;
		const [r, g, b] =
		h < 1 ? [c, x, 0] :
			h < 2 ? [x, c, 0] :
			h < 3 ? [0, c, x] :
			h < 4 ? [0, x, c] :
			h < 5 ? [x, 0, c] : [c, 0, x];
		return [(r + m) * 255, (g + m) * 255, (b + m) * 255];
	}

    applyColorEffect(source, hueShift) {
        const canvas = document.createElement('canvas');
        canvas.width = source.width || 60;
        canvas.height = source.height || 60;

        const ctx = canvas.getContext('2d');

        ctx.imageSmoothingEnabled = false;

        ctx.drawImage(source, 0, 0, canvas.width, canvas.height);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            if (data[i + 3] === 0) continue;

            if (hueShift >= 1000) {
                const gray = data[i];
                data[i] = gray;
                data[i + 1] = gray;
                data[i + 2] = gray;
            } else {
                const [h, s, v] = this.rgbToHsv(data[i], data[i+1], data[i+2]);
                let hNorm = (h / 360 + (hueShift % 200) / 200) % 1.0;
                const [r, g, b] = this.hsvToRgb(hNorm * 360, s, v);
                data[i] = r;
                data[i+1] = g;
                data[i+2] = b;
            }
        }

        ctx.putImageData(imageData, 0, 0);
        return canvas;
    }

    fixHue(hueShift) {
        let realhue;
        const hueShiftStr = String(hueShift);
        if (hueShift === 'Infinity' || hueShiftStr.includes("e") || hueShiftStr.includes("E")) realhue = 1000;
        else if (hueShiftStr === "" || hueShiftStr === " ") realhue = 0;
        else if (hueShiftStr.includes("c") || hueShiftStr.includes("C")) realhue = parseInt(hueShiftStr.replace(/c/gi, "-"));
        else realhue = parseInt(hueShiftStr) % 200;
        return realhue;
    }

    betterModBcJsIsWeird(n, m) {
        return ((n % m) + m) % m;
    }

    render(levelData, camera) {
        if (!this.assetsLoaded) return;

        const { width, height } = this.canvas;
        const ctx = this.ctx;

        const hue = this.fixHue(levelData.hue);
        const hue2 = this.fixHue(levelData.hue2);
        this.currentHue = hue;

        const activeTileset = this.getHuedTileset(hue);
        const activeWalls = this.getHuedWalls(hue2 + 15);

        ctx.clearRect(0, 0, width, height);

        const minCamX = this.canvas.width/camera.zoom/2;
        if (camera.x < minCamX) camera.x = minCamX;
        const minCamY = this.canvas.height/camera.zoom/2;
        if (camera.y < minCamY) camera.y = minCamY;

        const bgKey = `bg_${hue2}`;
        if (!this.backgroundVariants.has(bgKey)) {
            this.backgroundVariants.set(bgKey, this.applyColorEffect(this.background, hue2));
        }
        const bg = this.backgroundVariants.get(bgKey);

        const bgW = 560 * camera.zoom;
        const bgH = 440 * camera.zoom;
        const bgOffsetX = this.betterModBcJsIsWeird(-camera.x * 0.5 * camera.zoom, bgW) - bgW;
        const bgOffsetY = this.betterModBcJsIsWeird(camera.y * 0.5 * camera.zoom, bgH) - bgH;

        for (let tx = bgOffsetX; tx < width; tx += bgW) {
            for (let ty = bgOffsetY; ty < height; ty += bgH) {
                ctx.drawImage(bg, tx, ty, bgW + 2, bgH + 2);
            }
        }

        ctx.save();
        ctx.translate(width / 2, height / 2);
        ctx.scale(camera.zoom, camera.zoom);
        ctx.translate(-camera.x, camera.y);

        const viewHalfW = (width / 2) / camera.zoom;
        const viewHalfH = (height / 2) / camera.zoom;

        const wallStartX = Math.max(0, Math.floor((camera.x/2 - viewHalfW) / 60)) - 1;
        const wallEndX = Math.min(levelData.wall.length / 2, Math.ceil((camera.x + viewHalfW) / 60)) - 1;

        for (let x = wallStartX; x < wallEndX; x++) {
            const wallIdx = this.betterModBcJsIsWeird(parseInt(levelData.wall[x * 2 + 1]) + 20, 24);
            const tile = activeWalls[wallIdx];
            if (!tile) continue;

            const wallX = (x - 1) * 60 + camera.x * 0.25 - 30;
            let wallY = -(levelData.wall[x * 2]) * 30 - 151 - camera.y * 0.25 - 20;

            const tileHeight = tile.height/2;

            for (let y = wallY; y < camera.y + this.canvas.height; y += tileHeight) {
                ctx.drawImage(tile, wallX, y);
            }
        }

        const startCol = Math.floor((camera.x - viewHalfW) / 60);
        const endCol = Math.ceil((camera.x + viewHalfW) / 60);
        const startRow = Math.floor((camera.y - viewHalfH) / 60);
        const endRow = Math.ceil((camera.y + viewHalfH) / 60);

        const animState = this.collectProvider ? this.collectProvider() : null;
        const animTick = (animState && Number(animState.TICK)) || 0;
        const rad = Math.PI / 180;

        for (let isForeground = 0; isForeground <= 1; isForeground++) {
            if (isForeground === 1 && this.objsProvider) this.renderDynamic(this.objsProvider(), camera, true);
            if (isForeground === 1 && this.particleHook) this.particleHook(ctx);
            const offset = isForeground * 86;
            for (let row = startRow; row <= endRow; row++) {
                const rowBase = row * levelData.size_x;
                for (let col = startCol; col <= endCol; col++) {
                    const idx = rowBase + col;
                    if (idx < 0 || idx >= levelData.map.length) continue;

                    const fullTileVal = levelData.map[idx];
                    const rawTileVal = Math.floor(fullTileVal);
                    const lookTileVal = Math.ceil(fullTileVal);
                    if (rawTileVal === 0) continue;
                    if (this.hideObjectTiles && this.objectTiles.has(rawTileVal)) continue;
                    if (this.hideCrushers && (rawTileVal === 32 || rawTileVal === 19 || rawTileVal === 59 || rawTileVal === 11 || rawTileVal === 75 || rawTileVal === 61 || rawTileVal === 62 || rawTileVal === 45 || rawTileVal === 58)) continue;

                    let animTile = lookTileVal, bobY = 0;
                    if (isForeground === 0) {
                        if (fullTileVal === 15) {
                            bobY = 6 * Math.sin((col * 60 + row * 60 + animTick) * 5 * rad);
                        } else if (fullTileVal === 26 || fullTileVal === 63) {
                            animTile += Math.abs(this.betterModBcJsIsWeird(Math.floor(animTick / 3), 8) - 3);
                        }
                    } else if (fullTileVal === 50) {
                        animTile = 50 + this.betterModBcJsIsWeird(Math.floor(animTick), 6) + 2;
                    } else if (fullTileVal === 51) {
                        animTile = 51 + this.betterModBcJsIsWeird(Math.floor(-animTick), 6) + 1;
                    }

                    const tileIndex = animTile - 1 + offset;
                    let tile = activeTileset[tileIndex];
                    if (tile && animTile !== lookTileVal && hue !== 0 && this.needsHue.includes(lookTileVal - 1)) {
                        const key = 'anim|' + tileIndex + '|' + hue;
                        if (!this.huedDynamic.has(key)) this.huedDynamic.set(key, this.applyColorEffect(this.tiles[tileIndex], hue));
                        tile = this.huedDynamic.get(key);
                    }
                    if (!tile) continue;

                    const rotation = levelData.rotations[idx] % 4;
                    const tileX = col * 60 + 30;
                    const tileY = -row * 60 - 30 - bobY;

                    ctx.save();
                    ctx.translate(tileX, tileY);
                    if (rotation !== 1) {
                        ctx.rotate((rotation - 1) * Math.PI / 2);
                    }

                    const drawW = tile.width;
                    const drawH = tile.height;

                    ctx.drawImage(
                        tile,
                        -drawW / 2,
                        -drawH / 2,
                        drawW,
                        drawH
                    );

                    ctx.restore();
                }
            }
        }
        if (this.hideObjectTiles) this.renderCollectibles(levelData, camera, this.collectProvider ? this.collectProvider() : null);
        ctx.restore();
    }
}