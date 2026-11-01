class AppelPhysics {
    static EXTRA_START_OBJ_TICK = true;
    static RESPAWN_PLAYER_STEP = true;
    static EYE_RANDOM = false;
    static EYE_SPIN = { all: { speed: null, dir: null }, per: {} };
    static EYE_SPIN_DEFAULT_SPEED = 15;
    static EYE_SPIN_DEFAULT_DIR = 1;
    static EYE_TRIAL = null;
    static EYE_SPIN_MIN = 8;
    static EYE_SPIN_MAX = 20;
    static PIP_TRIAL = null;
    static PIP_DRAW_CODEC = 151;
    static pipDefaultDraw(a, b) { return a === 1 && b === 15 ? 2 : a; }
    static pipScript(idx, k) {
        const p = AppelPhysics.EYE_SPIN && AppelPhysics.EYE_SPIN.pip, t = p && p.script && p.script[idx];
        return t ? t[k] : undefined;
    }
    static pipScriptSize(idx, cfg) {
        const p = (cfg || AppelPhysics.EYE_SPIN || {}).pip, sc = p && p.script;
        if (!sc) return 0;
        let n = 0;
        for (const t of (idx == null ? Object.values(sc) : [sc[idx]])) if (t) for (const b of Object.values(t)) n += Object.keys(b).length;
        return n;
    }

    static B64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
    static _readSlotNumbers(text) {
        const S = AppelPhysics, out = [];
        let v = 0, shift = 0;
        for (const ch of text) {
            const d = S.B64.indexOf(ch);
            if (d < 0) break;
            v += (d & 31) * Math.pow(32, shift / 5);
            shift += 5;
            if (d & 32) continue;
            out.push(v);
            v = 0; shift = 0;
        }
        return out;
    }
    static _writeSlotNumber(v) {
        const S = AppelPhysics;
        let out = '';
        do {
            const d = v % 32;
            v = Math.floor(v / 32);
            out += S.B64[d | (v > 0 ? 32 : 0)];
        } while (v > 0);
        return out;
    }
    static _parsePipScript(text) {
        const S = AppelPhysics, nums = S._readSlotNumbers(text), script = {};
        let prevTile = 0, any = false;
        for (let i = 0; i + 1 < nums.length;) {
            const head = nums[i++], count = nums[i++];
            prevTile += Math.floor(head / 6);
            const k = head % 6, body = {};
            let draw = 0, n = 0;
            for (; n < count && i < nums.length; n++) {
                const v = nums[i++];
                draw += Math.floor(v / S.PIP_DRAW_CODEC);
                body[draw] = v % S.PIP_DRAW_CODEC;
            }
            if (n < count) break;
            if (!Object.keys(body).length) continue;
            ((script[prevTile] || (script[prevTile] = {}))[k] = body);
            any = true;
        }
        return any ? script : null;
    }
    static _formatPipScript(script) {
        const S = AppelPhysics;
        if (!script) return '';
        let out = '', prevTile = 0;
        for (const t of Object.keys(script).map(Number).sort((a, b) => a - b)) {
            for (const k of Object.keys(script[t]).map(Number).sort((a, b) => a - b)) {
                const body = script[t][k], draws = Object.keys(body).map(Number).sort((a, b) => a - b);
                if (!draws.length || k < 0 || k > 5) continue;
                out += S._writeSlotNumber((t - prevTile) * 6 + k) + S._writeSlotNumber(draws.length);
                prevTile = t;
                let prev = 0;
                for (const d of draws) {
                    out += S._writeSlotNumber((d - prev) * S.PIP_DRAW_CODEC + Math.max(0, Math.min(150, Math.floor(body[d]))));
                    prev = d;
                }
            }
        }
        return out;
    }
    static parseEyeSpin(text) {
        const S = AppelPhysics, cfg = { all: { speed: null, dir: null }, per: {} };
        text = String(text || '');
        const cut = text.search(/[.~]/), tilde = text.indexOf('~');
        if (tilde >= 0) {
            const script = S._parsePipScript(text.slice(tilde + 1));
            if (script) cfg.pip = { script };
        }
        if (cut >= 0) text = text.slice(0, cut);
        if (text.includes(',') || text.includes(':')) {
            for (const entry of text.split(';')) {
                const [key, sp, dr] = entry.split(',').map(t => (t || '').trim());
                if (!key) continue;
                let speed = parseInt(sp, 10);
                speed = Number.isFinite(speed) ? Math.min(S.EYE_SPIN_MAX, Math.max(S.EYE_SPIN_MIN, speed)) : null;
                const dir = dr === 'cw' ? 1 : dr === 'ccw' ? -1 : null;
                if (key === '*') cfg.all = { speed, dir };
                else if (/^\d+$/.test(key) && (speed !== null || dir !== null)) cfg.per[parseInt(key, 10)] = { speed, dir };
            }
            return cfg;
        }
        let prev = 0, v = 0, shift = 0;
        for (const ch of text) {
            const d = S.B64.indexOf(ch);
            if (d < 0) break;
            v += (d & 31) * Math.pow(32, shift / 5);
            shift += 5;
            if (d & 32) continue;
            prev += Math.floor(v / 26);
            const spec = v % 26;
            cfg.per[prev] = { speed: S.EYE_SPIN_MIN + (spec >> 1), dir: (spec & 1) ? -1 : 1 };
            v = 0; shift = 0;
        }
        return cfg;
    }
    static formatEyeSpin(cfg) {
        const S = AppelPhysics;
        let out = '', prev = 0;
        for (const k of Object.keys(cfg.per).map(Number).sort((a, b) => a - b)) {
            const c = cfg.per[k];
            const speed = c.speed !== null ? c.speed : (cfg.all.speed !== null ? cfg.all.speed : S.EYE_SPIN_DEFAULT_SPEED);
            const dir = c.dir !== null ? c.dir : (cfg.all.dir !== null ? cfg.all.dir : S.EYE_SPIN_DEFAULT_DIR);
            if (speed === S.EYE_SPIN_DEFAULT_SPEED && dir === S.EYE_SPIN_DEFAULT_DIR) continue;
            let v = (k - prev) * 26 + (speed - S.EYE_SPIN_MIN) * 2 + (dir === -1 ? 1 : 0);
            prev = k;
            do {
                const d = v % 32;
                v = Math.floor(v / 32);
                out += S.B64[d | (v > 0 ? 32 : 0)];
            } while (v > 0);
        }
        const pout = S._formatPipScript(cfg.pip && cfg.pip.script);
        if (pout) out += '~' + pout;
        return out;
    }
    static setEyeSpin(cfg) { AppelPhysics.EYE_SPIN = cfg || { all: { speed: null, dir: null }, per: {} }; }

    static CRUMBLE = ['crumble2', '2', '2', 'crumble2', '0', '2', 'crumble1', '3', '2', 'crumble1', '1', '2', 'crumble2', '1', '3', 'crumble2', '3', '3', 'crumble1', '0', '3', 'crumble1', '2', '3', '', 'crumble2', '0', '2', 'crumble1', '1', '2', 'crumble1', '0', '3', 'crumble2', '1', '3'];
    static rnd(a, b) { if (a > b) [a, b] = [b, a]; return a + Math.floor(Math.random() * (b - a + 1)); }
    static mod(n, m) {
        const r = n % m;
        return r / m < 0 ? r + m : r;
    }

    constructor(mapData, mapRotations, MAP_DATA, LSX) {
        this.MAP = Array.isArray(mapData) ? mapData : Array.from(mapData);
        this.MAP_R = Array.isArray(mapRotations) ? mapRotations : Array.from(mapRotations);
        this.MAP_DATA = MAP_DATA;

        this.touching = (typeof Touching !== 'undefined') ? new Touching() : null;

        let maskStrings = [
            '          ', '          ', '5555   1h', '5555   1h',
            '5005   1h', '5000   1h', '5050   xh', '5..5   3h',
            '       2 ', '.00.   3 ', '5555   1h', '    02 4 ',
            '111100 2 ', '5055   1h', '5000   1 ', '****   5 ',
            '100100 2 ', '5555   1h', '5555   1h', '    04 4 ',
            '5555   1h', '5555   1h', '    00 2 ', '    80 6 ',
            '    81 6 ', '       5 ', '       5 ', '          ',
            '          ', '          ', '          ', '    06 4 ',
            '    82 4h', '5555   1h', '0660   6 ', '0660     ',
            '0660     ', '0660     ', '0660     ', '0660     ',
            '          ', '          ', '5665   6h', '5555    h',
            '5555   6h', '    08 4 ', '0600   6 ', '0600     ',
            '0600     ', '0600     ', '5775   6h', '5775   6h',
            '         ', '         ', '         ', '         ',
            '         ', '         ', '    09 4 ', '    84 4 ',
            '    60 7 ', '    10 4 ', '    11 4 ', '       5 ',
            '         ', '         ', '         ', '         ',
            '5555   1h', '    12 5 ', '    00 5 ', '    00 2 ',
            '6600   6 ', '100181 6 ', '....   3h', '    13 4 ',
            '    00 5 ', '.      3h', '   .   3h', '1111   2h',
            '1111   5h', '5115   2h', '5111   2h', '.00.   3h',
            '111100 2 ', '****00 5 ', '5555   1h'
        ];

        maskStrings = maskStrings.map(item => {
        return item.replaceAll(".", "2");
        });

        this.MASK = maskStrings.map(mask =>
            [...mask.slice(0, 4)].map(c =>
                c >= '0' && c <= '9' ? parseInt(c) : 0
            )
        );

        this.PSZ = [0, 17, 13, 17, 13];
        this.LSX = LSX;
        this.toverlap = 0;
        this.mask_char = 0;
        this.overlap = -1;
        this.collide = false;
        this.RESOLVE = [0, 0, 1, 0, -1, -1, 0, 1, 0, -1, -1, 1, -1, -1, 1, 1, 1];
        this._temp_coords = [0, 0];
        this.key_index = this.MAP.indexOf(70);
        this.mega_index = this.MAP.indexOf(85);
    }

    sfx(name) { (this.sounds || (this.sounds = [])).push(name); }
    drainSounds() { const s = this.sounds || []; this.sounds = []; return s; }

    particle(...entry) { (this.particleEvents || (this.particleEvents = [])).push(entry); }
    drainParticles() { const e = this.particleEvents || []; this.particleEvents = []; return e; }
    particleXY(typ, x, y, dx, dy, dir) {
        if (dir < 2) this.particle(typ, dir === 0 ? x - dy : x + dx, dir === 0 ? y + dx : y + dy);
        else this.particle(typ, dir === 2 ? x + dy : x - dx, dir === 2 ? y - dx : y - dy);
    }
    pressDust(ps, dir) {
        if (ps.is_falling < 1 && Math.abs(ps.PLAYER_SX) > 12 && (ps.PLAYER_SX > 0) === (dir > 0))
            this.particle('dust', ps.PLAYER_X, ps.PLAYER_Y + 2 - ps.PSZ[3], ps.TICK || 0);
    }

    get_block_at(x, y) {
        if (y < 0) return 0;

        const sx = Math.floor(x / 60);
        const sy = (y / 60) | 0;

        const mapHeight = this.MAP.length / this.LSX;
        if (sy >= mapHeight) return 0;

        const idx = sx + sy * this.LSX;

        const tile = this.MAP[idx];
        const mask = this.MASK[Math.floor(tile)] ?? this.MASK[0];

        const rx = x - sx * 60;
        const ry = y - sy * 60;

        const mid = (rx < 30)
            ? (ry < 30 ? 1 : 2)
            : (ry < 30 ? 0 : 3);

        const rot = Math.floor(mid - this.MAP_R[idx]) & 3;
        return mask[rot] ?? 0;
    }

    isSolidAt(x, y, dir, playerState) {
        this.mask_char = this.get_block_at(x, y);

        if (this.mask_char > 4) {
            let temp;

            if (dir === 1) {
                temp = AppelPhysics.mod(x, 30);
            } else if (dir > 0) {
                temp = 30 - AppelPhysics.mod(y, 30);
            } else if (dir === -1) {
                temp = 30 - AppelPhysics.mod(x, 30);
            } else {
                temp = AppelPhysics.mod(y, 30);
            }

            if (temp > this.overlap) {
                this.overlap = temp;
            }
        }

        const OBJ = playerState.OBJ;
        for (let oi = 0, on = OBJ.length; oi < on; oi++) {
            const object = OBJ[oi];
            if (!(Math.abs(x - object.x) < object.width)) continue;
            if (!(Math.abs(y - object.y) < object.height)) continue;
            if (object.typ === 'saw' || object.typ === 'walker' || object.typ === 'worm' || object.typ === 'eyelauncher' || object.typ === 'pip') continue;
            if (object.nosolid) continue;
            {
                {
                    let temp;
                    if (dir > 0) {
                        if (dir === 1) {
                            temp = x - (object.x - object.width);
                        } else {
                            temp = (object.y + object.height) - y;
                            playerState.friction_dx = object.frictionx;
                            playerState.friction_dy = object.frictiony;
                        }
                    } else {
                        if (dir === -1) {
                            temp = (object.x + object.width) - x;
                        } else {
                            temp = y - (object.y - object.height);
                            playerState.friction_dx = object.frictionx;
                            playerState.friction_dy = object.frictiony;
                        }
                    }
                    if (temp > this.overlap) {
                        this.overlap = temp;
                    }
                }
            }
        }
    }


    touching_wall_dx(playerState, dir) {
        if (playerState.player_state === 1 || playerState.is_falling < 3) {
            return;
        }

        this.overlap = -1;
        this.isSolidAt(playerState.PLAYER_X + dir * -30, playerState.PLAYER_Y + 8, dir, playerState);
        this.isSolidAt(playerState.PLAYER_X + dir * -30, playerState.PLAYER_Y - 8, dir, playerState);

        if (this.overlap < 0) {
            this.isSolidAt(playerState.PLAYER_X + dir * 4, playerState.PLAYER_Y + 4, dir, playerState);
            if (this.overlap > 0) {

                this.overlap = -1;
                this.isSolidAt(playerState.PLAYER_X + dir * 4, playerState.PLAYER_Y - 4, dir, playerState);

                if (this.overlap > 0 && Math.abs(playerState.PLAYER_SX) > 3) {

                    if ((dir !== playerState.flipped) || playerState.player_state === 3) {
                        playerState.player_state = 1;
                        this.set_flipped(playerState, dir);
                    }

                    playerState.player_wall = dir;
                }
            }
        }
    }

    full_overlap(x, y, dir, dxy2, playerState) {
        let tx = x;
        let ty = y;
        this.toverlap = 0;

        for (let i = 0; i < 4; i++) {
            this.overlap = -1;

            this.isSolidAt(tx, ty, dir, playerState);
            if (dir & 1) {
                this.isSolidAt(tx, ty + dxy2, dir, playerState);
            } else {
                this.isSolidAt(tx + dxy2, ty, dir, playerState);
            }

            if (this.overlap < 0) {
                return;
            }

            this.overlap += 0.01;
            this.toverlap += this.overlap;

            if (dir > 0) {
                if (dir === 1) {
                    tx -= this.overlap;
                } else {
                    ty += this.overlap;
                }
            } else {
                if (dir === -1) {
                    tx += this.overlap;
                } else {
                    ty -= this.overlap;
                }
            }
        }
    }

    set_flipped_safe(playerState, dir) {
        this.set_flipped(playerState, dir);

        let safe = null;
        let safed = 64;

        this.full_overlap(playerState.PLAYER_X - playerState.PSZ[4], playerState.PLAYER_Y + playerState.PSZ[1], 0, playerState.PSZ[4] + playerState.PSZ[2], playerState);

        if (this.toverlap > 0 && this.toverlap < safed) {
            safe = 0;
            safed = this.toverlap;
        }

        this.full_overlap(playerState.PLAYER_X - playerState.PSZ[4], playerState.PLAYER_Y - playerState.PSZ[3], 2, playerState.PSZ[4] + playerState.PSZ[2], playerState);

        if (this.toverlap > 0 && this.toverlap < safed) {
            safe = 2;
            safed = this.toverlap;
        }

        this.full_overlap(playerState.PLAYER_X - playerState.PSZ[4], playerState.PLAYER_Y - playerState.PSZ[3], -1, playerState.PSZ[1] + playerState.PSZ[3], playerState);

        if (this.toverlap > 0 && this.toverlap < safed) {
            safe = -1;
            safed = this.toverlap;
        }

        this.full_overlap(playerState.PLAYER_X + playerState.PSZ[2], playerState.PLAYER_Y - playerState.PSZ[3], 1, playerState.PSZ[1] + playerState.PSZ[3], playerState);

        if (this.toverlap > 0 && this.toverlap < safed) {
            safe = 1;
            safed = this.toverlap;
        }

        if (safe !== null) {
            if (safe > 0) {
                if (safe > 1) {
                    playerState.PLAYER_Y += safed;
                } else {
                    playerState.PLAYER_X -= safed;
                }
            } else {
                if (safe > -1) {
                    playerState.PLAYER_Y -= safed;
                } else {
                    playerState.PLAYER_X += safed;
                }
            }

            this.resolve_collisions(true, playerState);
        }
    }


    make_upright(playerState) {
        if (playerState.flipped === 0) {
            return;
        }

        playerState.player_state = 1;
        this.set_flipped_safe(playerState, 0);
        this.overlap = -1;
    }


    check_square(x, y, playerState) {
        const left_x = x - playerState.PSZ[4];
        const right_x = x + playerState.PSZ[2];
        const top_y = y - playerState.PSZ[3];
        const bottom_y = y + playerState.PSZ[1];

        this.mask_char = 9;

        if (this.get_block_at(left_x, top_y) >= 5 ||
            this.get_block_at(right_x, top_y) >= 5) return;

        this.overlap = -1;
        this.isSolidAt(left_x, bottom_y, 0, playerState);
        if (this.overlap >= 0) { if (this.mask_char < 5) this.mask_char = 9; return; }

        this.isSolidAt(right_x, bottom_y, 0, playerState);
        if (this.overlap >= 0) { if (this.mask_char < 5) this.mask_char = 9; return; }

        if (this.get_block_at(left_x, y) >= 5 || this.get_block_at(right_x, y) >= 5) return;

        this.mask_char = -1;
    }


    resolve(x, y, deep, playerState) {
        const resolve = this.RESOLVE;

        for (let i2 = 1; i2 <= deep; i2++) {
            for (let i3 = 1; i3 < 16; i3 += 2) {
                playerState.PLAYER_X = x + resolve[i3] * i2;
                playerState.PLAYER_Y = y + resolve[i3 + 1] * i2;

                this.check_square(playerState.PLAYER_X, playerState.PLAYER_Y, playerState);
                if (this.mask_char < 5) {
                    return;
                }
            }
        }

        playerState.PLAYER_X = x;
        playerState.PLAYER_Y = y;
        playerState.PLAYER_DEATH = true;
    }

    resolve_collisions(deep, playerState) {
        this.check_square(playerState.PLAYER_X, playerState.PLAYER_Y, playerState);
        if (this.mask_char < 5) {
            return;
        }

        this.resolve(
            playerState.PLAYER_X,
            playerState.PLAYER_Y,
            deep ? 10 : 4,
            playerState
        );
    }

    movePlayerX(playerState) {
        const rem_x = playerState.PLAYER_X;

        const dir = playerState.PLAYER_SX > 0 ? 1 : -1;

        if (playerState.PLAYER_SX > 0) {
            playerState.PLAYER_X += playerState.PLAYER_SX + playerState.PSZ[2];
        } else {
            playerState.PLAYER_X += playerState.PLAYER_SX - playerState.PSZ[4];
        }

        this.overlap = -1;
        this.isSolidAt(playerState.PLAYER_X, playerState.PLAYER_Y + playerState.PSZ[1], dir, playerState);
        this.activeBlock(dir, playerState.PLAYER_X, playerState.PLAYER_Y + playerState.PSZ[1], playerState);
        this.isSolidAt(playerState.PLAYER_X, playerState.PLAYER_Y, dir, playerState);
        this.isSolidAt(playerState.PLAYER_X, playerState.PLAYER_Y - playerState.PSZ[3], dir, playerState);
        this.activeBlock(dir, playerState.PLAYER_X, playerState.PLAYER_Y - playerState.PSZ[3], playerState);

        if (this.overlap > 0) {
            if (this.overlap > Math.abs(playerState.PLAYER_SX) + 4) {
                const temp = playerState.PLAYER_X;
                playerState.PLAYER_X = rem_x + playerState.PLAYER_SX;
                this.resolve_collisions(false, playerState);

                if (playerState.PLAYER_DEATH) {
                    playerState.PLAYER_X = temp;
                } else {
                    return;
                }
            }

            if (playerState.PLAYER_SX > 0) {
                playerState.PLAYER_X -= 0.01 + this.overlap;
                this.touching_wall_dx(playerState, 1);
            } else {
                playerState.PLAYER_X += 0.01 + this.overlap;
                this.touching_wall_dx(playerState, -1);
            }

            this.overlap = -1;
            this.isSolidAt(playerState.PLAYER_X, playerState.PLAYER_Y + playerState.PSZ[1], dir, playerState);
            this.isSolidAt(playerState.PLAYER_X, playerState.PLAYER_Y, dir, playerState);
            this.isSolidAt(playerState.PLAYER_X, playerState.PLAYER_Y - playerState.PSZ[3], dir, playerState);


            if (this.overlap > 0) {
                playerState.PLAYER_DEATH = true;
            }

            playerState.PLAYER_SX *= 0.5;
        }

        playerState.PLAYER_X += playerState.PLAYER_SX > 0 ? -playerState.PSZ[2] : playerState.PSZ[4];

        if (playerState.PLAYER_X < 14) {
            playerState.PLAYER_X = 14;
            playerState.PLAYER_SX = 0;
        }

        if (playerState.PLAYER_DEATH) {
            playerState.PLAYER_X = rem_x;
        }
    }

    touching_wall_dy(playerState, dy) {
        playerState.PLAYER_SY = 0;

        if (dy === 1 && playerState.KEY_UP > 0) {
            playerState.PLAYER_SY = 4;
            if (playerState.friction_dy > 0) {
                playerState.PLAYER_SY += playerState.friction_dy;
            }
            playerState.is_falling = 0;
            playerState.player_wall = 0;
            this.set_flipped(playerState, 0);
        } else {
            if (dy === -1 && playerState.friction_dy < 0) {
                playerState.PLAYER_SY += playerState.friction_dy;
            }
        }
    }

    movePlayerY(playerState) {
        const saved_dy = playerState.PLAYER_SY;
        const dir = playerState.PLAYER_SY > 0 ? 0 : 2;

        if (playerState.PLAYER_SY > 0) {
            playerState.PLAYER_Y += playerState.PLAYER_SY + playerState.PSZ[1];
        } else {
            playerState.PLAYER_Y += playerState.PLAYER_SY - playerState.PSZ[3];
        }

        this.overlap = -1;
        playerState.friction = 0;
        playerState.friction_dx = 0;
        playerState.friction_dy = 0;
        this.isSolidAt(playerState.PLAYER_X + playerState.PSZ[2], playerState.PLAYER_Y, dir, playerState);
        this.activeBlock(dir, playerState.PLAYER_X + playerState.PSZ[2], playerState.PLAYER_Y, playerState);
        this.isSolidAt(playerState.PLAYER_X - playerState.PSZ[4], playerState.PLAYER_Y, dir, playerState);
        this.activeBlock(dir, playerState.PLAYER_X - playerState.PSZ[4], playerState.PLAYER_Y, playerState);

        if (this.overlap > 0) {
            if (Math.abs(saved_dy) > 6 && playerState.player_wall === null && playerState.is_falling > 4) this.sfx('hit');
            if (saved_dy > 0) {
                playerState.PLAYER_Y -= 0.01 + this.overlap;
                this.touching_wall_dy(playerState, 1);

                if (playerState.player_state === 1 || playerState.player_state === 3) {
                    playerState.player_state = 0;
                }
            } else {
                playerState.PLAYER_Y += 0.01 + this.overlap;
                this.touching_wall_dy(playerState, -1);

                playerState.is_falling = 0;
                playerState.is_jumping = 0;

                playerState.player_wall = null;

                if (playerState.player_state === 3) {
                    playerState.player_state = 0;
                }
            }
        }

        playerState.PLAYER_Y += saved_dy > 0 ? -playerState.PSZ[1] : playerState.PSZ[3];
    }


    set_flipped(playerState, flipped) {
        let temp = (flipped & 3) + 1;

        const isCrouch = playerState.player_state === 2;
        const isOnWall = playerState.player_wall !== null;

        playerState.PSZ[temp] = (playerState.player_wall === null && isCrouch) ? 7 : 17;
        temp = (temp & 3) + 1;
        playerState.PSZ[temp] = 13;
        temp = (temp & 3) + 1;
        playerState.PSZ[temp] = (isOnWall && isCrouch) ? 7 : 17;
        temp = (temp & 3) + 1;
        playerState.PSZ[temp] = 13;

        playerState.flipped = flipped;
    }

    can_get_up(playerState) {
        this.overlap = -1;
        const px = playerState.PLAYER_X;
        const py = playerState.PLAYER_Y;

        if (playerState.flipped === 0) {
            if (playerState.player_wall === 0) {
                let checkY = (py - playerState.PSZ[3]) - 8;
                this.isSolidAt(px - playerState.PSZ[4], checkY, 0, playerState);
                this.isSolidAt(px + playerState.PSZ[2], checkY, 0, playerState);
            } else {
                let checkY = py + playerState.PSZ[1] + 8;
                this.isSolidAt(px - playerState.PSZ[4], checkY, 0, playerState);
                this.isSolidAt(px + playerState.PSZ[2], checkY, 0, playerState);
            }
        } else if (playerState.flipped === 1) {
            let checkX = px - playerState.PSZ[4] - 8;
            this.isSolidAt(checkX, py + playerState.PSZ[1], 1, playerState);
            this.isSolidAt(checkX, py - playerState.PSZ[3], 1, playerState);
        } else if (playerState.flipped === -1) {
            let checkX = px + playerState.PSZ[2] + 8;
            this.isSolidAt(checkX, py + playerState.PSZ[1], -1, playerState);
            this.isSolidAt(checkX, py - playerState.PSZ[3], -1, playerState);
        }
    }


    positionNow(playerState) {
        if (playerState.player_state === 3) {
            playerState.direction += 22.5 * playerState.flipped;
            playerState.direction = ((playerState.direction % 360) + 360) % 360;
            if (playerState.direction > 180) playerState.direction -= 360;
            return;
        }

        if (playerState.player_state === 1) {
            let temp = (((((playerState.flipped + 1) * 90 - playerState.direction) + 180) % 360) - 180);

            if (Math.abs(temp) < 22.5) {
                playerState.direction = playerState.flipped * 90;
                playerState.player_state = 0;
            } else {
                if ((temp < 0) && !((temp === -180) && playerState.direction === 0)) {
                    playerState.direction -= 30;
                } else {
                    playerState.direction += 30;
                }
                return;
            }
        }

        playerState.direction = (playerState.flipped + 1) * 90;
        if (playerState.direction > 180) playerState.direction -= 360;

        if (playerState.PLAYER_INV > 0) playerState.PLAYER_INV -= 1;
    }


    confirm_still_touching_wall(playerState) {
        const px = playerState.PLAYER_X;
        const py = playerState.PLAYER_Y;
        const wall = playerState.player_wall;

        this.overlap = -1;

        if (wall === 0) {
            this.isSolidAt(px, py + playerState.PSZ[1] + 1, 0, playerState);
        } else if (wall === 1) {
            const checkX = px + playerState.PSZ[2] + 1;
            this.isSolidAt(checkX, py, 0, playerState);
            this.activeBlock(wall, checkX, py, playerState);
            this.isSolidAt(checkX, py - playerState.PSZ[3], 0, playerState);
            this.activeBlock(wall, checkX, py - playerState.PSZ[3], playerState);
        } else if (wall === -1) {
            this.isSolidAt(px - playerState.PSZ[4] - 1, py, 0, playerState);
            this.activeBlock(wall, px - playerState.PSZ[4] - 1, py, playerState);
        }

        if (this.overlap < 0) {
            if (playerState.player_state === 2) {
                if (wall === 1) {
                    playerState.PLAYER_X += 10;
                } else if (wall === -1) {
                    playerState.PLAYER_X -= 10;
                } else if (wall === 0) {
                    playerState.PLAYER_Y += 10;
                }
            }
            playerState.player_wall = null;
            this.set_flipped(playerState, playerState.flipped);
        }

    }

    handle_player_left_right(playerState) {
        let maxSpeed = playerState.player_state === 2 ? 1.2 : 2.5;

        if (playerState.PLAYER_NO_SLOW > 0) {
            playerState.PLAYER_NO_SLOW -= 1;
            if (playerState.is_falling < 1) {
                playerState.PLAYER_SX *= 0.95;
            }
        } else {
            if (!(playerState.player_state === 3 && playerState.is_falling < 25)) {

                if (playerState.player_state === 3 && playerState.is_falling < 35) {
                    maxSpeed *= (playerState.is_falling - 25) / 10;
                }

                const playerWall = playerState.player_wall;
                if (playerWall !== null) {
                    if (playerWall !== 0) {
                        if (playerState.KEY_LEFT === 1) {
                            playerState.PLAYER_SX -= maxSpeed;
                            playerState.PLAYER_DIR = -1;
                            this.pressDust(playerState, -1);
                            playerState.KEY_LEFT = 2;
                        }
                        if (playerState.KEY_RIGHT === 1) {
                            playerState.PLAYER_SX += maxSpeed;
                            playerState.PLAYER_DIR = 1;
                            this.pressDust(playerState, 1);
                            playerState.KEY_RIGHT = 2;
                        }
                    }
                } else {
                    if (playerState.KEY_LEFT > 0) {
                        playerState.PLAYER_SX -= maxSpeed;
                        playerState.PLAYER_DIR = -1;
                        this.pressDust(playerState, -1);
                        playerState.KEY_LEFT = 2;
                    }
                    if (playerState.KEY_RIGHT > 0) {
                        playerState.PLAYER_SX += maxSpeed;
                        playerState.PLAYER_DIR = 1;
                        this.pressDust(playerState, 1);
                        playerState.KEY_RIGHT = 2;
                    }
                }

                if (playerState.player_state === 3 && playerState.is_falling < 30) {
                    playerState.PLAYER_SX += (playerState.friction_dx - playerState.PLAYER_SX) * (0.2 * ((playerState.is_falling - 20) / 10));
                } else {
                    const absSx = Math.abs(playerState.friction_dx - playerState.PLAYER_SX);
                    if (absSx < 1) {
                        playerState.PLAYER_SX = playerState.friction_dx;
                    } else {
                        if (absSx > 2 || playerState.KEY_RIGHT > 0 || playerState.KEY_LEFT > 0) {
                            playerState.PLAYER_SX += (playerState.friction_dx - playerState.PLAYER_SX) * 0.2
                        } else {
                            playerState.PLAYER_SX = playerState.friction_dx
                        }
                    }
                }
            }
        }

        this.movePlayerX(playerState);
    }

    start_wall_jump(playerState) {
        this.sfx('wall jump');
        playerState.is_jumping = 101;
        playerState.player_state = 3;

        const playerWall = playerState.player_wall;

        this.set_flipped(playerState, -playerWall);

        playerState.PLAYER_SY = 20;
        playerState.PLAYER_SX = -10 * playerWall;
        playerState.player_wall = null;
        playerState.is_falling = 10;
        playerState.KEY_UP = 2;
    }


    process_jump(playerState) {
        const KEY_UP = playerState.KEY_UP;

        if (KEY_UP === 1) {
            const playerWall = playerState.player_wall;

            if (playerWall !== null && (playerWall === 1 || playerWall === -1)) {
                this.start_wall_jump(playerState);
            } else {
                let is_jumping = playerState.is_jumping;
                if (is_jumping !== 100) {
                    const is_falling = playerState.is_falling;
                    const flipped = playerState.flipped;

                    if (is_falling < 3 || (flipped === 1 && is_falling < 5)) {
                        this.overlap = -1;
                        const px = playerState.PLAYER_X;
                        const py = playerState.PLAYER_Y;
                        const check_y = py + 15;

                        this.isSolidAt(px - playerState.PSZ[4], check_y, -99, playerState);
                        this.isSolidAt(px + playerState.PSZ[2], check_y, -99, playerState);

                        if (this.overlap < 0 && playerState.PLAYER_SY < 16) {
                            playerState.KEY_UP = 2;
                            playerState.is_jumping = is_jumping + 1;
                            playerState.PLAYER_SY = 16;
                            this.sfx('jump');
                        }
                    }
                }
            }
        }

        let is_jumping = playerState.is_jumping;
        if (is_jumping > 0 && is_jumping < 5) {
            if (playerState.PLAYER_SY < 16) {
                playerState.PLAYER_SY = 16;
            }
            if ((playerState.extra_bounce || 0) < 1) playerState.is_jumping = is_jumping + 1;
            playerState.KEY_UP = 2;
        }
    }



    handle_player_up_down(playerState) {
        playerState.PLAYER_SY -= 1.7;
        if (playerState.PLAYER_SY < -30) {
            playerState.PLAYER_SY = -30;
        }

        const playerWall = playerState.player_wall;
        if ((playerWall === 1 || playerWall === -1) && (playerState.PLAYER_SY < 0 || playerState.friction != 0)) {
            if (playerState.friction != 0) {
                playerState.PLAYER_SY += 1.7
            }
            playerState.PLAYER_SY += (playerState.friction_dy - playerState.PLAYER_SY) * 0.3;
        }

        const extraBounce = playerState.extra_bounce || 0;
        if (playerState.KEY_UP > 0 || extraBounce > 2) {
            this.process_jump(playerState);
        } else if (extraBounce < 1) {
            const is_jumping = playerState.is_jumping;
            if (is_jumping > 0 && is_jumping < 100) {
                playerState.is_jumping = 100;
            }
            if (playerState.PLAYER_SY > 0 ) {
                if (playerState.is_falling > 1 && playerState.player_state === 0) {
                    playerState.PLAYER_SY = playerState.PLAYER_SY - 1;
                }
            } else {
                if (playerState.player_state === 4) {
                    playerState.player_state = 0;
                }
            }
        }
        playerState.extra_bounce = extraBounce - 1;

        const playerStateVal = playerState.player_state;
        if (playerState.KEY_DOWN > 0) {
            if (playerStateVal !== 1 && playerStateVal !== 3) {
                playerState.player_state = 2;
                this.set_flipped(playerState, playerState.flipped);
                this.resolve_collisions(false, playerState);
            }
        } else if (playerStateVal === 2) {
            this.can_get_up(playerState);
            if (this.overlap < 0) {
                playerState.player_state = 0;
                this.set_flipped(playerState, playerState.flipped);
                this.resolve_collisions(false, playerState);
            }
        }

        playerState.is_falling += 1;
        this.movePlayerY(playerState);
    }

    check_dangers(playerState) {
        if (!this.touching){console.error("spikes not loaded")}

        const isInSpikeTile =
        this.get_block_at(playerState.PLAYER_X + playerState.PSZ[2] - 1, playerState.PLAYER_Y) === 2
        || this.get_block_at(playerState.PLAYER_X - (playerState.PSZ[4] - 1), playerState.PLAYER_Y) === 2
        || this.get_block_at(playerState.PLAYER_X, playerState.PLAYER_Y + playerState.PSZ[1] - 1) === 2
        || this.get_block_at(playerState.PLAYER_X, playerState.PLAYER_Y - (playerState.PSZ[3] - 1)) === 2;

        if (playerState.wasInSpikeTileLastFrame) {
            const spr = playerState.SPR;
            const hit = spr
                ? this.touching.is_player_touching_spike_at(spr.x, spr.y, playerState, this)
                : this.touching.is_player_touching_spike(playerState, this);
            if (hit) {
                const sprX = Math.round((spr ? spr.x : playerState.PLAYER_X) - (playerState._camXAtPos ?? playerState.CAM_X));
                if (Math.abs(sprX) < 240 && !(playerState.PLAYER_INV >= 1)) {
                    playerState.PLAYER_DEATH = true;
                }
            }
        }
        playerState.wasInSpikeTileLastFrame = isInSpikeTile;

        if (playerState.PLAYER_Y >= 0) {
            const tIdx = Math.floor(playerState.PLAYER_X / 60) + Math.floor(playerState.PLAYER_Y / 60) * this.LSX;
            const tTile = this.MAP[tIdx];
            if ((tTile === 71 || tTile === 84) && !playerState.activeIdxSpawn.includes(tIdx)) {
                playerState.activeIdxSpawn.push(tIdx);
            }
            if (tTile === 15) {
                this.sfx('coin 2'); this.sfx('crunch');
                this.MAP[tIdx] = 1; if (this._md) this._md.add(tIdx);
                this.particle(15, 60 * Math.floor(playerState.PLAYER_X / 60) + 30, 60 * Math.floor(playerState.PLAYER_Y / 60) + 30);
            }
            if (tTile === 63 && !playerState._won) {
                playerState._won = true;
                this.sfx('Complete');
                this.particle(25, 60 * Math.floor(playerState.PLAYER_X / 60) + 30, 60 * Math.floor(playerState.PLAYER_Y / 60) + 30);
            }
            if (tTile === 25) {
                this.sfx('Flag');
                playerState.SPAWN_IDX = tIdx;
                this.MAP[tIdx] = 26; if (this._md) this._md.add(tIdx);
                this.particle(25, 60 * Math.floor(playerState.PLAYER_X / 60) + 30, 60 * Math.floor(playerState.PLAYER_Y / 60) + 30);
            }
        }
    }

    activeBlock(dir, tileX, tileY, playerState) {
        const tileIdx = Math.floor(tileX / 60) + Math.floor(tileY / 60) * this.LSX;
        if (this.mask_char === 6 && !playerState.activeIdxSpawn.includes(tileIdx)) {
            playerState.activeIdxSpawn.push(tileIdx);
        }
        if (this.mask_char === 7) {
            if ((((this.MAP_R[tileIdx] + 1) % 4) + 4) % 4 === ((dir % 4) + 4) % 4) {
                let temp;
                if (this.MAP[tileIdx] === 50) {
                    temp = 5;
                } else {
                    temp = -5;
                }
                if (dir === 2) {
                    playerState.friction_dx = temp;
                    return
                }
                if (dir === 1) {
                    playerState.friction_dy = temp;
                    playerState.friction = 1;
                    return
                }
                if (dir === 0) {
                    playerState.friction_dx = -temp;
                    return
                }
                if (dir === -1) {
                    playerState.friction_dy = -temp;
                    playerState.friction = 1;
                    return
                }
            }
        }
    }

    tickActive(playerState) {
        for (const activeTile of playerState.activeIdxSpawn) {
            const tile = this.MAP[activeTile];
            if ((tile === 42 || tile === 34 || tile === 46) && playerState.activeIdx.includes(activeTile)) {
                continue;
            }
            if (tile === 42){
                this.sfx('spring');
                playerState.activeIdx.push(activeTile);
                playerState.activeTyp.push("spring");
                playerState.activeFrame.push(0);
            } else if (tile === 34){
                this.sfx('crumble 2');
                playerState.activeIdx.push(activeTile);
                playerState.activeTyp.push("crumble");
                playerState.activeFrame.push(0.5);
            } else if (tile === 46){
                this.sfx('crumble 2');
                playerState.activeIdx.push(activeTile);
                playerState.activeTyp.push("crumble2");
                playerState.activeFrame.push(0.5);
            } else if (tile === 72){
                this.touchingDoor(playerState, activeTile);
            } else if (tile === 71 || tile === 84) {
                this.triggerAction(playerState, activeTile);
            }
        }
        playerState.activeIdxSpawn.length = 0;
        for (let i = 0; i < playerState.activeIdx.length; i++) {
            const lenBefore = playerState.activeIdx.length;
            if (playerState.activeTyp[i] === "spring") {
                this.tick_spring(playerState, playerState.activeIdx[i], playerState.activeFrame[i], this.MAP_R[playerState.activeIdx[i]], i);
            } else if (playerState.activeTyp[i] === "crumble") {
                this.tickCrumble(playerState, playerState.activeIdx[i], i, 8, 34, 0.5);
            }   else if (playerState.activeTyp[i] === "crumble2") {
                this.tickCrumble(playerState, playerState.activeIdx[i], i, 4, 46, 0.25);
            }
            if (playerState.activeIdx.length < lenBefore) i--;
        }
    }

    getGroupCmd(idx) {
        const commandsIdx = this.MAP_DATA.indexOf("+" + String(idx + 1));
        if (commandsIdx === -1) return 0;
        const cmds = this.parseCommands(this.MAP_DATA[commandsIdx + 1]).map(c => String(c).toLowerCase());
        const gi = cmds.indexOf("g");
        if (gi === -1) return 0;
        const g = parseFloat(cmds[gi + 1]);
        return Number.isNaN(g) ? 0 : g;
    }

    initGroups() {
        const GROUP = [];
        for (let idx = 0; idx < this.MAP.length; idx++) {
            const tile = Math.floor(this.MAP[idx]);
            if (tile !== 71 && tile !== 84) continue;
            const g = this.getGroupCmd(idx);
            if (g > 0) {
                while (GROUP.length < g) GROUP.push("");
                GROUP[g - 1] = "hold";
            }
        }
        return GROUP;
    }

    triggerAction(playerState, idx) {
        const g = this.getGroupCmd(idx);
        if (g >= 1 && g <= playerState.GROUP.length) {
            playerState.GROUP[g - 1] = 0;
        }
    }

    touchingDoor(playerState, idx) {
        if (!playerState.has_key) return;
        this.sfx('Door Open');
        this.MAP[idx] = 1; if (this._md) this._md.add(idx);
        playerState.PLAYER_SX = 0;
        playerState.SHAKE = 12;
        const dnx = (idx % this.LSX) * 60 + 30, dny = Math.floor(idx / this.LSX) * 60 + 30;
        this.particle('collect', dnx, dny, 'Lock-02');
        this.particle('burst', dnx - 15, dny, 'key1');
    }

    tickCrumble(playerState, idx, a, max, costume, inc){
        playerState.activeFrame[a] += inc;
        if (playerState.activeFrame[a] <= max) {
            if (playerState.activeFrame[a] % 1 < inc) {
                if (playerState.activeFrame[a] < max) {
                    this.MAP[idx] = costume + playerState.activeFrame[a]; if (this._md) this._md.add(idx);
                } else {
                    this.MAP[idx] = 1; if (this._md) this._md.add(idx);
                }
                const ic = Math.floor(playerState.activeFrame[a] * 3 + (max === 8 ? 0 : 25));
                const cx = (idx % this.LSX) * 60 + 30, cy = Math.floor(idx / this.LSX) * 60 + 30;
                const cr = AppelPhysics.CRUMBLE;
                this.particleXY(cr[ic - 3], cx, cy - 7.5, (cr[ic - 2] - 1.5) * 15, (cr[ic - 1] - 1.5) * 15, Math.floor(this.MAP_R[idx]));
            }
        } else {
            playerState.activeFrame[a] += 0.5 - inc;
            if (playerState.activeFrame[a] > 80) {
                if (Math.round(playerState.activeFrame[a] * 100) === 8050) {
                    const nx = ((idx % this.LSX + this.LSX) % this.LSX) * 60 + 30
                    const ny = Math.floor(idx / this.LSX) * 60 + 30
                    if (Math.abs(playerState.PLAYER_X - nx) < 45 && Math.abs(playerState.PLAYER_Y - ny) < 45) {
                        playerState.activeFrame[a] -= 0.5;
                        return;
                    }
                }
                if (playerState.activeFrame[a] > 80 + max) {
                    this.MAP[idx] = costume; if (this._md) this._md.add(idx);
                    playerState.activeIdx.splice(a, 1);
                    playerState.activeTyp.splice(a, 1);
                    playerState.activeFrame.splice(a, 1);
                    return;
                } else {
                    if (playerState.activeFrame[a] % 1 === 0) {
                    this.MAP[idx] = (costume + max) + (80 - playerState.activeFrame[a]); if (this._md) this._md.add(idx);
                    }
                }
            }
        }
    }

    tick_spring(playerState, idx, frame, dir, a){
        if (frame === 0) {
            const nx = ((idx % this.LSX + this.LSX) % this.LSX) * 60 + 30
            const ny = Math.floor(idx / this.LSX) * 60 + 30

            if (((dir % 2) + 2) % 2 === 1) {
                if (Math.abs(playerState.PLAYER_X - nx) > 30) {
                    playerState.activeIdx.splice(a, 1);
                    playerState.activeTyp.splice(a, 1);
                    playerState.activeFrame.splice(a, 1);
                    return;
                }
            } else {
                if (Math.abs(playerState.PLAYER_Y - ny) > 30) {
                    playerState.activeIdx.splice(a, 1);
                    playerState.activeTyp.splice(a, 1);
                    playerState.activeFrame.splice(a, 1);
                    return;
                }
                playerState.PLAYER_NO_SLOW = 15;
            }
            this.MAP[idx] = 43; if (this._md) this._md.add(idx);
            this.particle('spring', ((idx % this.LSX + this.LSX) % this.LSX) * 60 + 30, Math.floor(idx / this.LSX) * 60 + 30, dir);

            let [ux, uy] = this.getUXY((((dir % 4) + 4) % 4) - 1, 30);
            if (ux === 0) {
                playerState.PLAYER_SY = uy;
            } else {
                playerState.PLAYER_SX = ux;
            }
            const commandsIdx = this.MAP_DATA.indexOf("+" + String(idx + 1));

            if (commandsIdx != -1) {
                const cmds = this.parseCommands(this.MAP_DATA[commandsIdx + 1]);

                const dx = cmds.map(c => String(c).toLowerCase()).indexOf("x");
                if (dx != -1) {
                    playerState.PLAYER_SX = parseFloat(cmds[dx + 1]);
                    playerState.PLAYER_NO_SLOW = 15;
                    ux = playerState.PLAYER_SX;
                    uy = 0;
                }

                const dy = cmds.map(c => String(c).toLowerCase()).indexOf("y");
                if (dy != -1) {
                    playerState.PLAYER_SY = parseFloat(cmds[dy + 1]);
                }
            }
            playerState.player_state = 4;
            if (uy === 0) {
                playerState.PLAYER_DIR = ux / Math.abs(ux);
            }
        }
        playerState.activeFrame[a] += 1;
        if (frame + 1 === 25) {
            this.MAP[idx] = 42; if (this._md) this._md.add(idx);
            playerState.activeIdx.splice(a, 1);
            playerState.activeTyp.splice(a, 1);
            playerState.activeFrame.splice(a, 1);
        }
    }

    getUXY(dir, mul) {
        switch (dir) {
            case 1:  return [mul, 0];
            case -1: return [-mul, 0];
            case 2:  return [0, -mul];
            case 0: return [0, mul];
        }
    }

    spawnOBJ(levelData){
        let OBJ = [];
        let leakDir = 0;
        for (let idx = 0; idx <= levelData.map.length; idx++) {
            if (Math.floor(levelData.map[idx]) === 23 || Math.floor(levelData.map[idx]) === 24 || Math.floor(levelData.map[idx]) === 73) {

                const rotV = levelData.rotations[idx];
                const odd = AppelPhysics.mod(rotV, 2) === 1;
                const x = (idx % levelData.size_x) * 60 + 30 + (odd ? 0 : (rotV === 0 ? -15 : 15));
                const y = Math.floor(idx / levelData.size_x) * 60 + 30 + (odd ? (rotV === 1 ? 15 : -15) : 0);

                let dir = odd ? -1 : 0;
                if (Math.floor(levelData.map[idx]) === 24 || Math.floor(levelData.map[idx]) === 73) {
                    dir = (dir + 2) % 4 - 1;
                }

                const commandsIdx = this.MAP_DATA.indexOf("+" + String(idx + 1));
                const cmds = commandsIdx === -1 ? [] :
                    this.parseCommands(this.MAP_DATA[commandsIdx + 1]).map(c => String(c).toLowerCase());

                const getVal = (arr, char, defaultVal) => {
                    let index = arr.indexOf(char);
                    if (index === -1) return defaultVal;
                    let val = parseFloat(arr[index + 1]);
                    return Number.isNaN(val) ? 0 : val;
                };
                const gIdx = cmds.indexOf("g");
                const gVal = gIdx === -1 ? NaN : parseFloat(cmds[gIdx + 1]);

                OBJ.push(
                    {
                        typ: "lift",
                        x: x,
                        y: y,
                        height: odd ? 15 : 30,
                        width: odd ? 30 : 15,
                        acc: getVal(cmds, "a", 15) / 100,
                        frame: getVal(cmds, "h", 0),
                        dir: dir,
                        direction: levelData.rotations[idx] * 90,
                        speed: getVal(cmds, "s", 4),
                        reach: 0,
                        dx: 0,
                        dy: 0,
                        nx: x,
                        ny: y,
                        frictionx: 0,
                        frictiony: 0,
                        delay: getVal(cmds, "d", 5),
                        group: Number.isNaN(gVal) ? null : gVal,
                        rot: levelData.rotations[idx],
                        variation: getVal(cmds, "v", 0),
                        teeth: (typeof Touching !== 'undefined') ? Touching.platformVariant(getVal(cmds, "v", 0)) : null
                    }
                )
                leakDir = dir;
            } else if (Math.floor(levelData.map[idx]) === 32) {
                OBJ.push(this.spawnCrusher(levelData, idx));
                leakDir = OBJ[OBJ.length - 1].dir;
            } else if (Math.floor(levelData.map[idx]) === 19) {
                OBJ.push(this.spawnSaw(levelData, idx));
            } else if (Math.floor(levelData.map[idx]) === 11) {
                OBJ.push(this.spawnWalker(levelData, idx, 2));
            } else if (Math.floor(levelData.map[idx]) === 75) {
                OBJ.push(this.spawnWalker(levelData, idx, 13));
            } else if (Math.floor(levelData.map[idx]) === 59) {
                OBJ.push(this.spawnBurtha(levelData, idx, leakDir));
            } else if (Math.floor(levelData.map[idx]) === 61) {
                OBJ.push(this.spawnWorm(levelData, idx, 10));
            } else if (Math.floor(levelData.map[idx]) === 62) {
                OBJ.push(this.spawnWorm(levelData, idx, 11));
            } else if (Math.floor(levelData.map[idx]) === 45) {
                OBJ.push(this.spawnEyeLauncher(levelData, idx));
            } else if (Math.floor(levelData.map[idx]) === 58) {
                for (const o of this.spawnPip(levelData, idx)) OBJ.push(o);
            }
        }
        return OBJ;
    }

    spawnCrusher(levelData, idx) {
        const x = (idx % levelData.size_x) * 60 + 30;
        const y = Math.floor(idx / levelData.size_x) * 60 + 30;
        const rot = levelData.rotations[idx];
        const dir = ((rot + 2) % 4) - 1;

        const commandsIdx = this.MAP_DATA.indexOf("+" + String(idx + 1));
        const cmds = commandsIdx === -1 ? [] :
            this.parseCommands(this.MAP_DATA[commandsIdx + 1]).map(c => String(c).toLowerCase());
        const getVal = (c, def) => {
            const i = cmds.indexOf(c);
            if (i === -1) return def;
            const v = parseFloat(cmds[i + 1]);
            if (Number.isNaN(v)) return c === "g" ? def : 0;
            return v;
        };

        let dx = 0, dy = 0;
        if (dir === 1) dx = 1;
        else if (dir === 2) dy = -1;
        else if (dir === 0) dy = 1;
        else dx = -1;

        return {
            typ: "lift",
            crusher: true,
            x: x, y: y, nx: x, ny: y,
            rootX: x, rootY: y,
            width: 30, height: 30,
            dx: dx, dy: dy,
            dir: dir,
            speed: 0,
            state: 0,
            frame: getVal("h", 30),
            delay: getVal("d", 30),
            reach: getVal("m", 0) * 30,
            frictionx: 0, frictiony: 0,
            group: getVal("g", null),
            rot: rot,
            direction: rot * 90,
            variation: 0,
            teeth: 5
        };
    }

    dropObj(object, ps) {
        this.overlap = null;
        const distX = Math.max(1, Math.floor(Math.abs(object.x - ps.CAM_X) / 80));
        const audible = distX < 4 && Math.abs(object.y - ps.CAM_Y) < 180;
        if (!object.state) {
            if (object.frame === 0 && audible) this.sfx('woosh' + distX);
            object.speed += 2;
            if (object.speed > 30) object.speed = 30;
            object.nx += Math.round(object.dx * object.speed);
            object.ny += Math.round(object.dy * object.speed);
            this.isSolidAtOBJ(object.nx + object.dx * object.width, object.ny + object.dy * object.height,
                object.dir, 0, true);
            if (object.reach > 0) {
                const t = Math.abs(object.ny - object.rootY) - object.reach;
                if (t > 0 || (object.dir === 0 && t === 0)) {
                    this.overlap = Math.abs(object.ny - object.rootY) - object.reach;
                }
            }
            if (this.overlap != null) {
                object.nx += 0 - object.dx * this.overlap;
                object.ny += 0 - object.dy * this.overlap;
                object.state = 1;
                object.speed = 0;
                object.frame = 15;
                if (audible) {
                    ps.SHAKE = Math.round((4 - distX) * 3.4);
                    this.sfx('stomp' + distX);
                }
            }
            return;
        }
        object.speed += (-4 - object.speed) * 0.05;
        object.nx += Math.round(object.dx * object.speed);
        object.ny += Math.round(object.dy * object.speed);
        this.isSolidAtOBJ(object.nx - object.dx * object.width, object.ny - object.dy * object.height,
            (((object.dir + 3) % 4 + 4) % 4) - 1, 0, true);
        if (this.overlap != null) {
            object.nx += object.dx * this.overlap;
            object.ny += object.dy * this.overlap;
            object.state = 0;
            object.speed = 0;
            object.frame = object.delay;
        }
        if (object.dir === 2 && AppelPhysics.rnd(Math.round(object.frame / 2), 2) === -2 &&
            Math.abs(object.x - ps.CAM_X) < 240 && Math.abs(object.y - ps.CAM_Y) < 200)
            this.particle('dirt drop', object.nx + AppelPhysics.rnd(-25, 25), object.ny - 34);
    }

    tickObj(playerState) {
        for (let object of playerState.OBJ) {
            if (object.typ === 'saw' || object.typ === 'walker' || object.typ === 'worm' || object.typ === 'eyelauncher' || object.typ === 'pip') continue;
            if (object.burtha) { this.tickBurtha(playerState, object); continue; }
            if ((playerState.PLAYER_X + playerState.PSZ[2] > object.nx - object.width) && (playerState.PLAYER_X - playerState.PSZ[4] < object.nx + object.width)) {
                if ((playerState.PLAYER_Y + playerState.PSZ[1] > object.ny - object.height) && (playerState.PLAYER_Y - playerState.PSZ[3] < object.ny + object.height)) {
                    playerState.PLAYER_X += object.nx - object.x;
                    playerState.PLAYER_Y += object.ny - object.y;
                }
            }

            object.frictionx = object.nx - object.x;
            object.frictiony = object.ny - object.y;

            object.x = object.nx;
            object.y = object.ny;

            if (object.group != null && playerState.GROUP[object.group - 1] === "hold") continue;

            object.frame -= 1;
            if (object.frame > 0) continue;

            if (object.crusher) { this.dropObj(object, playerState); continue; }

            this.overlap = null;
            this.collide = false;
            if (object.dir < 2) {
                if (object.dir === 0) {
                    this.accelerateDy(object, 1);
                } else {
                    this.accelerateDx(object, 1);
                }
            } else {
                if (object.dir === 2) {
                    this.accelerateDy(object, -1);
                } else {
                    this.accelerateDx(object, -1);
                }
            }
            object.nx += Math.round(object.dx);
            object.ny += Math.round(object.dy);

            if (this.overlap != null) {
                if (this.collide) {
                    object.dx = 0;
                    object.dy = 0;
                    object.frame = object.delay;

                    object.nx = Math.round(object.nx / 15) * 15
                    object.ny = Math.round(object.ny / 15) * 15
                } else {
                    object.dir = (object.dir + 2) % 4
                }
            }
        }
    }

    accelerateDx(object, mul) {
        if ((object.dx * mul) < object.speed) {
            object.dx += object.acc * mul;
            if (object.dx * mul > object.speed) {
                object.dx = object.speed * mul;
            }
            object.reach = mul * ((object.acc === 0 ? 0 : (object.dx * object.dx) / (2 * object.acc)) + object.width)
        }
        if (mul * object.dx < 0) {
            this.overlap = null;
            this.isSolidAtOBJ((object.x - (mul * object.width)) + object.dx, object.y, -mul, 0, true);
            if (this.overlap != null) {
                object.dx += mul * this.overlap;
            }
            this.collide = true;
        } else {
            this.isSolidAtOBJ(object.x + object.reach, object.y, 0, 0, true);
        }
    }

    accelerateDy(object, mul) {
        if ((object.dy * mul) < object.speed) {
            object.dy += object.acc * mul;
            if (object.dy * mul > object.speed) {
                object.dy = object.speed * mul;
            }
            object.reach = mul * ((object.acc === 0 ? 0 : (object.dy * object.dy) / (2 * object.acc)) + object.height)
        }
        if (mul * object.dy < 0) {
            this.overlap = null;
            this.isSolidAtOBJ(object.x, (object.y - (mul * object.height)) + object.dy, mul + 1, 0, true);
            if (this.overlap != null) {
                object.dy += mul * this.overlap;
            }
            this.collide = true;
        } else {
            this.isSolidAtOBJ(object.x, object.y + object.reach, 0, 0, true);
        }
    }

    isSolidAtOBJ(x, y, dir, schk, spikeIsSolid) {
        let c = this.get_block_at(x, y, dir)

        if (spikeIsSolid && c === 2) {c = 9;} else { if (!spikeIsSolid && c === 2) c = 0;};

        if (c > schk) {
            let temp;
            if (dir > 0) {
                if (dir === 1) {
                    temp = AppelPhysics.mod(x, 30);
                } else {
                    temp = 30 - AppelPhysics.mod(y, 30);
                }
            } else {
                if (dir === -1) {
                    temp = 30 - AppelPhysics.mod(x, 30);
                } else {
                    temp = AppelPhysics.mod(y, 30);
                }
            }
            if (temp >= 0) {
                this.overlap = temp;
            }
        }
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
                cmds.push(c);
            }
        }
        if (dy != "") {
            cmds.push(dy);
        }
        return cmds;
    }

    spawnSaw(levelData, idx) {
        const rot = levelData.rotations[idx];
        let rx = (idx % levelData.size_x) * 60 + 30;
        let ry = Math.floor(idx / levelData.size_x) * 60 + 30;
        let sawTyp = 4, dir, dx = 0, dy = 0;
        if (rot > 1) {
            if (rot > 2) { dir = 0; rx -= 26; dy = 4; }
            else         { dir = 1; ry -= 26; dx = 4; }
        } else {
            sawTyp = 5;
            if (rot > 0) { dir = 0; rx += 26; dy = 4; }
            else         { dir = 1; ry += 26; dx = 4; }
        }
        const commandsIdx = this.MAP_DATA.indexOf("+" + String(idx + 1));
        const cmds = commandsIdx >= 0
            ? this.parseCommands(this.MAP_DATA[commandsIdx + 1]).map(c => (typeof c === 'string' ? c.toLowerCase() : c))
            : [];
        const gi = cmds.indexOf('g');
        const group = gi >= 0 && !Number.isNaN(parseFloat(cmds[gi + 1])) ? parseFloat(cmds[gi + 1]) : null;
        return {
            typ: 'saw',
            sawTyp,
            x: rx, y: ry,
            rootX: rx, rootY: ry,
            dx, dy, dir,
            direction: -90,
            state: 'spawn',
            group,
            cmds
        };
    }


    static scIsWS(v) { return v === null || (typeof v === 'string' && v.trim().length === 0); }
    static scNum(v) { const n = Number(v); return Number.isNaN(n) ? 0 : n; }
    static scSin(deg) { return Math.round(Math.sin(Math.PI * deg / 180) * 1e10) / 1e10; }
    static scCos(deg) { return Math.round(Math.cos(Math.PI * deg / 180) * 1e10) / 1e10; }
    static wrapDir(d) { return d - Math.floor((d + 179) / 360) * 360; }
    static scCompare(a, b) {
        let n1 = Number(a), n2 = Number(b);
        if (n1 === 0 && AppelPhysics.scIsWS(a)) n1 = NaN;
        else if (n2 === 0 && AppelPhysics.scIsWS(b)) n2 = NaN;
        if (Number.isNaN(n1) || Number.isNaN(n2)) {
            const s1 = String(a).toLowerCase(), s2 = String(b).toLowerCase();
            return s1 < s2 ? -1 : (s1 > s2 ? 1 : 0);
        }
        if ((n1 === Infinity && n2 === Infinity) || (n1 === -Infinity && n2 === -Infinity)) return 0;
        return n1 - n2;
    }

    static scratchCmds(txt) {
        const out = [];
        let acc = "";
        const str = txt === undefined || txt === null ? "" : String(txt);
        for (const c of str) {
            if ("0123456789.-".includes(c)) acc += c;
            else { if (acc !== "") { out.push(acc); acc = ""; } out.push(c); }
        }
        if (acc !== "") out.push(acc);
        return out;
    }

    static scIndexOf(list, v) {
        const t = String(v).toLowerCase();
        for (let i = 0; i < list.length; i++) if (String(list[i]).toLowerCase() === t) return i + 1;
        return 0;
    }

    static burthaCostume(frame) {
        const S = AppelPhysics;
        if (S.scCompare(frame, 1) < 0) return 0;
        if (S.scCompare(frame, 50) < 0) return S.mod(S.scNum(frame), 10) < 5 ? 0 : 1;
        return 2;
    }

    spawnBurtha(levelData, idx, leakDir) {
        const S = AppelPhysics;
        const rx = (idx % levelData.size_x) * 60 + 30 + 30;
        const ry = Math.floor(idx / levelData.size_x) * 60 + 30 + 30;
        const commandsIdx = this.MAP_DATA.indexOf("+" + String(idx + 1));
        const cmds = commandsIdx > -1 ? S.scratchCmds(this.MAP_DATA[commandsIdx + 1]) : [];
        const item = (c) => {
            const k = S.scIndexOf(cmds, c);
            if (k === 0) return null;
            return k < cmds.length ? cmds[k] : "";
        };
        const raw = (v) => (v !== "" && !S.scIsWS(v) && Number.isFinite(Number(v))) ? Number(v) : v;
        const g = item("g");
        const h = item("h");
        return {
            typ: "lift",
            burtha: true,
            x: rx, y: ry, nx: rx, ny: ry,
            mx: rx, my: ry,
            rootX: rx, rootY: ry,
            width: 60, height: 60,
            dx: 0, dy: 0,
            dir: leakDir,
            direction: 90 * levelData.rotations[idx],
            speed: 0, acc: 0, reach: 0, delay: 0,
            frictionx: 0, frictiony: 0,
            frame: h === null ? 0 : raw(h),
            state: 0,
            group: g === null ? "" : g,
            hasR: S.scIndexOf(cmds, "r") > 0,
            hued: true,
            rot: levelData.rotations[idx],
            variation: 0,
            nosolid: false
        };
    }

    burthaProbe(points) {
        let best = null;
        for (const [px, py] of points) {
            this.overlap = null;
            this.isSolidAtOBJ(px, py, 2, 4, false);
            if (this.overlap !== null && (best === null || this.overlap > best)) best = this.overlap;
        }
        this.overlap = null;
        return best;
    }

    tickBurtha(ps, o) {
        const S = AppelPhysics;
        if ((ps.PLAYER_X + ps.PSZ[2] > o.nx - 60) && (ps.PLAYER_X - ps.PSZ[4] < o.nx + 60) &&
            (ps.PLAYER_Y + ps.PSZ[1] > o.ny - 60) && (ps.PLAYER_Y - ps.PSZ[3] < o.ny + 60)) {
            ps.PLAYER_X += o.nx - o.mx;
            ps.PLAYER_Y += o.ny - o.my;
        }
        o.frictionx = o.nx - o.mx;
        o.frictiony = o.ny - o.my;
        o.mx = o.nx; o.my = o.ny;
        o.x = o.nx; o.y = o.ny;
        o.nosolid = false;

        const gv = ps.GROUP[Math.floor(S.scNum(o.group)) - 1];
        if (S.scCompare(gv === undefined ? "" : gv, "hold") === 0) return;

        if (S.scCompare(o.frame, 1) < 0) {
            if (S.scCompare(o.frame, 0) < 0) {
                if (S.scCompare(o.frame, -999) === 0) {
                    o.dy += -1.5;
                    if (o.dy < -30) o.dy = -30;
                    o.ny += o.dy;
                    const ov = this.burthaProbe([[o.nx - 15, o.ny - 60], [o.nx - 45, o.ny - 60],
                                                 [o.nx + 45, o.ny - 60], [o.nx + 15, o.ny - 60]]);
                    if (ov === null) { o.my = o.ny; return; }
                    o.ny = Math.round(o.ny + (ov + 0.01));
                    o.my = o.ny;
                    o.frame = -60;
                    ps.SHAKE = 20;
                    this.sfx('Boom');
                }
                o.frame = S.scNum(o.frame) + 1;
                return;
            }
            if (Math.abs(ps.PLAYER_X - o.mx) > 160) return;
            if (Math.abs((ps.PLAYER_Y + 30) - o.my) > 75) return;
            o.dir = ps.PLAYER_X < o.mx ? -1 : 1;
            const pts = [];
            for (let i = 0, y = o.ny - 45; i < 4; i++, y += 30) {
                for (let j = 0, x = o.nx + o.dir * 85; j < 4; j++, x += o.dir * 30) pts.push([x, y]);
            }
            o.dy = o.ny - 45 + 4 * 30;
            const ov = this.burthaProbe(pts);
            if (ov !== null && ov > 0) { o.frame = -15; return; }
        }
        o.frame = S.scNum(o.frame) + 1;
        if (o.frame < 50) return;
        if (o.frame === 50) {
            this.sfx('woosh1');
            o.direction = 45 - 45 * o.dir;
            o.nx += 60 * o.dir;
            o.ny += -60;
            o.mx = o.nx; o.my = o.ny;
        }
        o.nosolid = true;
        if (o.frame < 60) {
            o.direction += 9 * o.dir;
            return;
        }
        o.direction = 0;
        o.frame = -999;
        o.nx += 60 * o.dir;
        o.ny += 60;
        o.mx = o.nx; o.my = o.ny;
        o.dy = 0;
    }

    checkBurthaDeaths(ps) {
        for (const o of ps.OBJ) {
            if (!o.burtha) continue;
            const c = AppelPhysics.burthaCostume(o.frame);
            if (c === 0) o.hued = true;
            else if (c === 1) o.hued = false;
            if (c === 1 && AppelPhysics.scNum(o.frame) >= 1 && AppelPhysics.scNum(o.frame) < 50 && AppelPhysics.mod(o.frame, 10) === 5) this.sfx('grunt');
            else if (c === 2 && !ps.PLAYER_DEATH && typeof SawTouch !== 'undefined') {
                const spr = {
                    x: Math.round(ps.PLAYER_X), y: Math.round(ps.PLAYER_Y),
                    dir: ps.PLAYER_DIR, direction: ps.direction,
                    crouch: ps.player_state === 2, wall: ps.player_wall !== null
                };
                if (SawTouch.touchingBurtha({ x: o.mx, y: o.my, direction: o.direction }, spr, ps.PSZ, this.stageCam(ps))) {
                    ps.PLAYER_DEATH = true;
                }
            }
        }
    }

    resetBurthas(OBJ) {
        if (!OBJ) return;
        for (const o of OBJ) {
            if (o.burtha && o.hasR) { o.mx = o.rootX; o.my = o.rootY; }
        }
    }

    resetSaws(OBJ) {
        if (!OBJ) return;
        for (const s of OBJ) {
            if (s.typ !== 'saw') continue;
            s.x = s.rootX;
            s.y = s.rootY;
            s.state = 'spawn';
        }
    }

    static groupBelowOne(v) {
        if (v === undefined || v === null || v === "") return true;
        if (typeof v === 'number') return v < 1;
        return false;
    }

    sawOrientate(ps, s) {
        if (Math.abs(s.dx) === 0) {
            if (ps.PLAYER_Y < s.y) {
                s.dir = 2;
                s.dy = 0 - s.dy;
            }
        } else {
            const xi = s.cmds.indexOf('x');
            if (xi >= 0) {
                let d = parseFloat(s.cmds[xi + 1]);
                d = d / Math.abs(d);
                s.dir = Number.isNaN(d) ? 0 : d;
            } else {
                s.dir = ps.PLAYER_X < s.x ? -1 : 1;
            }
            s.dx = s.dir * Math.abs(s.dx);
            s.direction = s.dir * 90;
        }
    }

    tickSaws(ps) {
        if (ps.CAM_X === undefined) this.scrollCamera(ps);
        if (!ps.SPR) this.snapshotPlayerSprite(ps);
        for (const s of ps.OBJ) {
            if (s.typ === 'saw') this.tickSaw(ps, s);
            else if (s.typ === 'walker') this.tickWalker(ps, s);
            else if (s.typ === 'worm') this.tickWorm(ps, s);
            else if (s.typ === 'eyelauncher') this.tickEyeLauncher(ps, s);
            else if (s.typ === 'pip') this.tickPip(ps, s);
        }
    }

    tickSaw(ps, s) {
        if (s.state === 'spawn') {
            const gv = s.group != null ? ps.GROUP[s.group - 1] : "";
            if (AppelPhysics.groupBelowOne(gv)) {
                if (Math.abs(s.x - ps.CAM_X) > 320) return;
                if (Math.abs(s.y - ps.CAM_Y) > 260) return;
                if (Math.abs(s.x - ps.PLAYER_X) > 340) return;
                if (Math.abs(s.y - ps.PLAYER_Y) > 360) return;
            }
            s.state = '';
            this.sawOrientate(ps, s);
            const gi = s.cmds.indexOf('g');
            if (gi >= 0) {
                const g = parseFloat(s.cmds[gi + 1]);
                if (ps.GROUP[g - 1] === "hold") {
                    s.state = 'hold';
                } else if (s.group > 0 && AppelPhysics.groupBelowOne(ps.GROUP[s.group - 1])) {
                    while (ps.GROUP.length < s.group) ps.GROUP.push("");
                    ps.GROUP[s.group - 1] = 1;
                }
            }
        }
        if (s.state === 'hold') {
            const gi = s.cmds.indexOf('g');
            if (gi >= 0 && ps.GROUP[parseFloat(s.cmds[gi + 1]) - 1] !== "hold") s.state = '';
        }

        const spin = ((s.sawTyp === 4) === ((s.dx - s.dy) > 0)) ? -7 : -5;
        s.direction = SawTouch._wrapDir(s.direction + spin);
        if (Math.abs(ps.PLAYER_X - s.x) < 128 && Math.abs(ps.PLAYER_Y - s.y) < 128) {
            const size = ps.player_state === 2 ? 95 : 100;
            if (SawTouch.touching(s, size, ps.SPR, ps.PSZ, this.stageCam(ps))) ps.PLAYER_DEATH = true;
        }
        if (s.state === 'hold') return;

        this.overlap = null;
        const m = AppelPhysics.mod(s.dir, 4);
        if (m < 2) {
            if (s.dir === 0) {
                s.dy += (4 - s.dy) * 0.05;
                this.isSolidAtOBJ(s.x, s.y + 57, 0, 0, true);
            } else {
                s.dx += (4 - s.dx) * 0.05;
                this.isSolidAtOBJ(s.x + 57, s.y, 0, 0, true);
            }
        } else if (s.dir === 2) {
            s.dy += (-4 - s.dy) * 0.05;
            this.isSolidAtOBJ(s.x, s.y - 57, 0, 0, true);
        } else {
            s.dx += (-4 - s.dx) * 0.05;
            this.isSolidAtOBJ(s.x - 57, s.y, 0, 0, true);
        }
        s.x += s.dx;
        s.y += s.dy;
        if (this.overlap !== null && this.overlap > 0) s.dir = AppelPhysics.mod(s.dir + 2, 4);
    }

    static WALKER_BOX = { 2: { sx: 11.5, sy: 23 }, 13: { sx: 22, sy: 43 } };

    spawnWalker(levelData, idx, typ) {
        const rx = (idx % levelData.size_x) * 60 + 30;
        const ry = Math.floor(idx / levelData.size_x) * 60 + 30;
        const commandsIdx = this.MAP_DATA.indexOf("+" + String(idx + 1));
        const cmds = commandsIdx >= 0
            ? this.parseCommands(this.MAP_DATA[commandsIdx + 1]).map(c => (typeof c === 'string' ? c.toLowerCase() : c))
            : [];
        const gi = cmds.indexOf('g');
        const group = gi >= 0 && !Number.isNaN(parseFloat(cmds[gi + 1])) ? parseFloat(cmds[gi + 1]) : null;
        const box = AppelPhysics.WALKER_BOX[typ];
        return {
            typ: 'walker',
            wTyp: typ,
            x: rx, y: ry,
            rootX: rx, rootY: ry,
            dx: 0, dy: 0, dir: 1,
            direction: -90,
            frame: 0,
            speed: typ === 13 ? 3 : 2,
            sx: box.sx, sy: box.sy,
            state: 'spawn',
            group,
            cmds,
            dead: false
        };
    }

    mobSolid(x, y, dir, schk, spikeIsSolid) {
        let c = this.get_block_at(x, y);
        if (c === 2) c = spikeIsSolid ? 9 : 0;
        if (c > schk) {
            let temp;
            if (dir > 0) temp = dir === 1 ? AppelPhysics.mod(x, 30) : 30 - AppelPhysics.mod(y, 30);
            else temp = dir === -1 ? 30 - AppelPhysics.mod(x, 30) : AppelPhysics.mod(y, 30);
            if (this.mobOv === null || temp > this.mobOv) this.mobOv = temp;
        }
    }

    walkerTouching(ps, w) {
        if (!ps.SPR) this.snapshotPlayerSprite(ps);
        const spr = ps.SPR;
        if (typeof WalkerTouch !== 'undefined') return WalkerTouch.touching(w, spr, ps.PSZ, this.stageCam(ps));
        const px0 = spr.x - ps.PSZ[4], px1 = spr.x + ps.PSZ[2];
        const py0 = spr.y - ps.PSZ[3], py1 = spr.y + ps.PSZ[1];
        return px0 < w.x + w.sx && px1 > w.x - w.sx && py0 < w.y + w.sy && py1 > w.y;
    }

    tickWalker(ps, w) {
        if (w.dead) return;
        if (w.state === 'spawn') {
            const gv = w.group != null ? ps.GROUP[w.group - 1] : "";
            if (AppelPhysics.groupBelowOne(gv)) {
                if (Math.abs(w.x - ps.CAM_X) > 320) return;
                if (Math.abs(w.y - ps.CAM_Y) > 260) return;
                if (Math.abs(w.x - ps.PLAYER_X) > 340) return;
                if (Math.abs(w.y - ps.PLAYER_Y) > 360) return;
            }
            w.state = '';
            const xi = w.cmds.indexOf('x');
            if (w.wTyp === 2 || xi >= 0) {
                if (xi >= 0) {
                    const d = parseFloat(w.cmds[xi + 1]);
                    w.dir = Number.isNaN(d) || d === 0 ? 0 : d / Math.abs(d);
                } else {
                    w.dir = ps.PLAYER_X < w.x ? -1 : 1;
                }
                w.dx = w.dir * Math.abs(w.dx);
                w.direction = w.dir * 90;
            }
            const hi = w.cmds.indexOf('h');
            if (hi >= 0) w.frame = parseFloat(w.cmds[hi + 1]);
            const gi = w.cmds.indexOf('g');
            if (gi >= 0) {
                const g = parseFloat(w.cmds[gi + 1]);
                if (ps.GROUP[g - 1] === "hold") {
                    w.state = 'hold';
                } else if (w.group > 0 && AppelPhysics.groupBelowOne(ps.GROUP[w.group - 1])) {
                    while (ps.GROUP.length < w.group) ps.GROUP.push("");
                    ps.GROUP[w.group - 1] = 1;
                }
            }
        }
        if (w.state === 'hold') {
            const gi = w.cmds.indexOf('g');
            if (gi >= 0 && ps.GROUP[parseFloat(w.cmds[gi + 1]) - 1] !== "hold") w.state = '';
        }

        w.dir = w.direction === 0 ? 0 : w.direction / Math.abs(w.direction);
        let schk;
        if (w.state === '') {
            if (!ps.PLAYER_DEATH && !ps.EXPLODE && ps.STENCIL_ON &&
                Math.abs(ps.PLAYER_X - w.x) < 80 && Math.abs(ps.PLAYER_Y - w.y) < 80 &&
                this.walkerTouching(ps, w)) {
                const lsy = ps.PLAYER_LSY !== undefined ? ps.PLAYER_LSY : ps.PLAYER_Y;
                if (ps.PLAYER_Y < lsy && (lsy - 6) > (w.y + w.sy)) {
                    ps.PLAYER_SY = 16;
                    this.sfx('boing');
                    ps._pendingBounce = true;
                    w.state = 'squish';
                    w.dx = 0; w.dy = 0; w.frame = 0;
                    return;
                }
                ps.PLAYER_DEATH = true;
            }
            let temp = w.speed;
            if (Math.abs(ps.PLAYER_X - (w.x + w.dir * 180)) < 180 && Math.abs(ps.PLAYER_Y - (w.y + 22)) < 50) {
                temp = w.speed * 2;
            }
            if (AppelPhysics.mod(w.frame - 20, 36) + temp > 35.99 &&
                Math.abs(w.x - ps.CAM_X) < 240 && Math.abs(w.y - ps.CAM_Y) < 180) this.sfx('blip2');
            w.frame += temp;
            w.dx += ((w.dir * temp) - w.dx) * 0.05;
            schk = 0;
        } else {
            schk = 4;
            if (w.state === 'squish') {
                w.dx += (0 - w.dx) * 0.2;
                w.frame += 1;
                if (w.frame > 10) {
                    if (w.wTyp === 2) {
                        this.sfx('squish'); w.dead = true;
                        this.particle('pop1', 'pop orange', w.x, w.y + 10); this.particle('pop1', 'pop orange', w.x, w.y + 10); this.particle('pop1', 'pop eye', w.x, w.y + 10);
                        return;
                    }
                    w.state = '';
                }
            }
        }
        w.dy += -1;
        w.y += w.dy;
        this.mobOv = null;
        this.mobSolid(w.x + w.dir * 11, w.y - 1, 2, 4, false);
        this.mobSolid(w.x + w.dir * -11, w.y - 1, 2, 4, false);
        if (this.mobOv !== null) {
            w.y += this.mobOv + 0.01;
            w.dy = 0;
        }
        this.mobOv = null;
        this.mobSolid(w.x + (w.dx + w.dir * 11), w.y - 1, w.dir, 0, true);
        if (this.mobOv === null) {
            w.x += w.dx;
        } else {
            w.direction = w.dir * -90;
            w.dx = 0;
        }
        this.mobOv = null;
    }

    spawnWorm(levelData, idx, typ) {
        const S = AppelPhysics;
        const cw = typ === 11;
        let rx = (idx % levelData.size_x) * 60 + 30;
        let ry = Math.floor(idx / levelData.size_x) * 60 + 30;
        const commandsIdx = this.MAP_DATA.indexOf("+" + String(idx + 1));
        const cmds = commandsIdx >= 0
            ? this.parseCommands(this.MAP_DATA[commandsIdx + 1]).map(c => (typeof c === 'string' ? c.toLowerCase() : c))
            : [];
        const gi = cmds.indexOf('g');
        const group = gi >= 0 && !Number.isNaN(parseFloat(cmds[gi + 1])) ? parseFloat(cmds[gi + 1]) : null;

        let direction = S.wrapDir(S.scNum(this.MAP_R[idx]) * 90);
        let ux;
        if (cw) {
            ux = 90;
        } else {
            direction = S.wrapDir(direction + 180);
            ux = -90;
        }
        const dir = S.mod(((direction + ux) / 90) + 1, 4) - 1;
        const dx = S.scSin(dir * 90), dy = S.scCos(dir * 90);
        for (let i = 0; i < 20; i++) {
            rx += dx * 30;
            ry += dy * 30;
            this.mobOv = null;
            this.mobSolid(rx, ry, dir, 4, false);
            if (this.mobOv !== null) {
                const ov = -3 - this.mobOv;
                rx += dx * ov;
                ry += dy * ov;
                this.mobOv = null;
                break;
            }
        }
        this.mobOv = null;
        return {
            typ: 'worm',
            wTyp: typ,
            x: rx, y: ry,
            rootX: rx, rootY: ry,
            dx, dy, dir,
            direction,
            ux, uy: 0,
            frame: 0,
            state: 'spawn',
            init: { direction, dx, dy, dir, ux, uy: 0 },
            drawn: false,
            group,
            cmds
        };
    }

    wormSolid(x, y, dir) {
        this.mobOv = null;
        this.mobSolid(x, y, dir, 4, false);
        const r = this.mobOv;
        this.mobOv = null;
        return r;
    }

    wormTouching(ps, w) {
        if (!ps.SPR) this.snapshotPlayerSprite(ps);
        if (typeof WormTouch === 'undefined') return false;
        return WormTouch.touching(w, ps.SPR, ps.PSZ, this.stageCam(ps));
    }

    tickWorm(ps, w) {
        const S = AppelPhysics;
        if (w.state === 'spawn') {
            const gv = w.group != null ? ps.GROUP[w.group - 1] : "";
            if (S.groupBelowOne(gv)) {
                if (Math.abs(w.x - ps.CAM_X) > 320) return;
                if (Math.abs(w.y - ps.CAM_Y) > 260) return;
                if (Math.abs(w.x - ps.PLAYER_X) > 340) return;
                if (Math.abs(w.y - ps.PLAYER_Y) > 360) return;
            }
            w.state = '';
            const hi = w.cmds.indexOf('h');
            if (hi >= 0) w.frame = parseFloat(w.cmds[hi + 1]);
            const gi = w.cmds.indexOf('g');
            if (gi >= 0) {
                const g = parseFloat(w.cmds[gi + 1]);
                if (ps.GROUP[g - 1] === "hold") {
                    w.state = 'hold';
                } else if (w.group > 0 && S.groupBelowOne(ps.GROUP[w.group - 1])) {
                    while (ps.GROUP.length < w.group) ps.GROUP.push("");
                    ps.GROUP[w.group - 1] = 1;
                }
            }
        }
        if (w.state === 'hold') {
            const gi = w.cmds.indexOf('g');
            if (gi >= 0 && ps.GROUP[parseFloat(w.cmds[gi + 1]) - 1] !== "hold") w.state = '';
        }

        if (!ps.PLAYER_DEATH && w.drawn &&
            Math.abs(ps.PLAYER_X - w.x) < 128 && Math.abs(ps.PLAYER_Y - w.y) < 128 &&
            this.wormTouching(ps, w)) {
            ps.PLAYER_DEATH = true;
        }
        this._wormStep(w);
        w.drawn = true;
    }

    _wormStep(w) {
        const S = AppelPhysics, sin = S.scSin, cos = S.scCos;
        w.frame = S.scNum(w.frame) + 1;
        if (w.frame < 1) return;
        w.frame = 0;
        if (w.state === 'curl') {
            w.state = '';
            w.uy = 3;
            w.direction = S.wrapDir(w.direction + w.ux);
            w.dx = sin(w.direction + w.ux);
            w.dy = cos(w.direction + w.ux);
            w.dir = Math.round(S.mod(((w.direction + w.ux) / 90) + 1, 4) - 1);
            w.x += 10 * sin(w.direction);
            w.y += 10 * cos(w.direction);
            w.x += 24 * w.dx;
            w.y += 24 * w.dy;
            const ov = this.wormSolid(w.x, w.y, w.dir);
            if (ov !== null) {
                const o = -3 - ov;
                w.x += o * w.dx;
                w.y += o * w.dy;
            }
            return;
        }
        if (w.uy > 0) w.uy -= 1;
        else if (w.uy < 0) w.uy += 1;
        if (this.wormSolid(w.x + 4 * w.dx, w.y + 4 * w.dy, w.dir) === null) w.state = 'curl';
        w.x += 10 * sin(w.direction);
        w.y += 10 * cos(w.direction);
        const ov = this.wormSolid(w.x, w.y, w.direction / 90);
        if (ov !== null) {
            const o = -3 - ov;
            w.x += o * sin(w.direction);
            w.y += o * cos(w.direction);
            w.direction = S.wrapDir(w.direction - w.ux);
            w.dx = sin(w.direction + w.ux);
            w.dy = cos(w.direction + w.ux);
            w.dir = Math.round(S.mod(((w.direction + w.ux) / 90) + 1, 4) - 1);
            w.uy = -3;
            w.x += 23 * sin(w.direction);
            w.y += 23 * cos(w.direction);
        }
    }

    resetWorms(OBJ) {
        if (!OBJ) return;
        for (const w of OBJ) {
            if (w.typ !== 'worm') continue;
            w.x = w.rootX;
            w.y = w.rootY;
            w.state = 'spawn';
            w.drawn = false;
            if (w.init) {
                w.direction = w.init.direction;
                w.dx = w.init.dx;
                w.dy = w.init.dy;
                w.dir = w.init.dir;
                w.ux = w.init.ux;
                w.uy = w.init.uy;
            }
        }
    }

    static eyeUXY(dir, mul) {
        if (dir > 0) return dir === 1 ? [mul, 0] : [0, 0 - mul];
        return dir === -1 ? [0 - mul, 0] : [0, mul];
    }

    spawnEyeLauncher(levelData, idx) {
        const S = AppelPhysics;
        let rx = (idx % levelData.size_x) * 60 + 30;
        let ry = Math.floor(idx / levelData.size_x) * 60 + 30;
        const commandsIdx = this.MAP_DATA.indexOf("+" + String(idx + 1));
        const cmds = commandsIdx >= 0
            ? this.parseCommands(this.MAP_DATA[commandsIdx + 1]).map(c => (typeof c === 'string' ? c.toLowerCase() : c))
            : [];
        const gi = cmds.indexOf('g');
        const group = gi >= 0 && !Number.isNaN(parseFloat(cmds[gi + 1])) ? parseFloat(cmds[gi + 1]) : null;

        const dir = S.mod(S.scNum(this.MAP_R[idx]) + 2, 4) - 1;
        let [ux, uy] = S.eyeUXY(dir, 60);
        let speed = 0;
        for (let i = 0; i < 8; i++) {
            rx += ux;
            ry += uy;
            speed += 60;
            if (this.wormSolid(rx, ry, dir) !== null) {
                speed = Math.sqrt(speed * (2 * 0.5));
                [ux, uy] = S.eyeUXY(dir, 0 - speed);
                break;
            }
        }
        return {
            typ: 'eyelauncher',
            x: rx, y: ry,
            rootX: rx, rootY: ry,
            ux, uy,
            dx: 0, dy: 0,
            dir,
            speed,
            direction: -90,
            frame: 0,
            state: 'spawn',
            drawn: false,
            group,
            cmds,
            idx: idx + 1,
            seed: 2654435761
        };
    }

    _eyeRnd(w, a, b) {
        if (AppelPhysics.EYE_RANDOM) return AppelPhysics.rnd(a, b);
        w.seed = (Math.imul(w.seed >>> 0, 1664525) + 1013904223) >>> 0;
        return a + Math.floor((w.seed / 4294967296) * (b - a + 1));
    }

    eyeLauncherTouching(ps, w) {
        if (!ps.SPR) this.snapshotPlayerSprite(ps);
        if (typeof EyeLauncherTouch === 'undefined') return false;
        return EyeLauncherTouch.touching(w, ps.SPR, ps.PSZ, this.stageCam(ps));
    }

    tickEyeLauncher(ps, w) {
        const S = AppelPhysics;
        if (w.state === 'spawn') {
            const gv = w.group != null ? ps.GROUP[w.group - 1] : "";
            if (S.groupBelowOne(gv)) {
                if (Math.abs(w.x - ps.CAM_X) > 320) return;
                if (Math.abs(w.y - ps.CAM_Y) > 260) return;
                if (Math.abs(w.x - ps.PLAYER_X) > 340) return;
                if (Math.abs(w.y - ps.PLAYER_Y) > 360) return;
            }
            w.state = '';
            const hi = w.cmds.indexOf('h');
            if (hi >= 0) w.frame = 58 - S.scNum(w.cmds[hi + 1]);
            const gi = w.cmds.indexOf('g');
            if (gi >= 0) {
                const g = parseFloat(w.cmds[gi + 1]);
                if (ps.GROUP[g - 1] === "hold") {
                    w.state = 'hold';
                } else if (w.group > 0 && S.groupBelowOne(ps.GROUP[w.group - 1])) {
                    while (ps.GROUP.length < w.group) ps.GROUP.push("");
                    ps.GROUP[w.group - 1] = 1;
                }
            }
        }
        if (w.state === 'hold') {
            const gi = w.cmds.indexOf('g');
            if (gi >= 0 && ps.GROUP[parseFloat(w.cmds[gi + 1]) - 1] !== "hold") w.state = '';
        }
        this._eyeStep(ps, w);
        w.drawn = true;
    }

    _eyeStep(ps, w) {
        const S = AppelPhysics;
        if (w.state === 'hold') return;

        if (!ps.PLAYER_DEATH && w.drawn &&
            Math.abs(ps.PLAYER_X - w.x) < 128 && Math.abs(ps.PLAYER_Y - w.y) < 128 &&
            this.eyeLauncherTouching(ps, w)) {
            const T = AppelPhysics.EYE_TRIAL;
            if (T) T.hits.push({ idx: w.idx, launch: w.launchNo || 0, flying: w.frame >= 60, tick: T.cur });
            else ps.PLAYER_DEATH = true;
        }

        const onStage = () => Math.abs(w.x - ps.CAM_X) < 270 && Math.abs(w.y - ps.CAM_Y) < 200;
        if (w.frame < 60) {
            w.frame = S.scNum(w.frame) + 1;
            if (w.frame < 60) {
                if (w.frame > 30) w.direction = S.wrapDir(w.direction + 15);
                return;
            }
            w.dx = w.ux;
            w.dy = w.uy;
            w.launchNo = (w.launchNo || 0) + 1;
            const spin = S.EYE_SPIN, own = spin.per[w.idx] || {};
            const speed = own.speed != null ? own.speed : (spin.all.speed != null ? spin.all.speed : S.EYE_SPIN_DEFAULT_SPEED);
            const dir = own.dir != null ? own.dir : (spin.all.dir != null ? spin.all.dir : S.EYE_SPIN_DEFAULT_DIR);
            w.speed = dir * speed;
            if (onStage()) this.sfx('launcher');
        }
        if (w.dir > 0) {
            if (w.dir === 1) { w.x += w.dx; w.dx += 0.5; }
            else { w.y += w.dy; w.dy += -0.5; }
        } else {
            if (w.dir === -1) { w.x += w.dx; w.dx += -0.5; }
            else { w.y += w.dy; w.dy += 0.5; }
        }
        w.direction = S.wrapDir(w.direction + w.speed);
        if (Math.abs(w.dx + w.dy) > Math.abs(w.ux + w.uy)) {
            const ci = w.cmds.indexOf('d');
            w.frame = 0;
            if (ci >= 0) {
                w.frame = 56 - S.scNum(w.cmds[ci + 1]);
                if (w.frame < 1) w.frame = 1;
            }
            w.x = w.rootX;
            w.y = w.rootY;
            w.direction = 90;
            if (onStage()) this.sfx('launcher2');
        }
    }

    resetEyeLaunchers(OBJ) {
        if (!OBJ) return;
        for (const w of OBJ) {
            if (w.typ !== 'eyelauncher') continue;
            w.x = w.rootX;
            w.y = w.rootY;
            w.state = 'spawn';
            w.drawn = false;
        }
    }

    resetWalkers(OBJ) {
        if (!OBJ) return;
        for (const w of OBJ) {
            if (w.typ !== 'walker' || w.dead) continue;
            w.x = w.rootX;
            w.y = w.rootY;
            w.state = 'spawn';
        }
    }

    static PIP_RANDOM = false;
    static PIP_EXACT = null;
    static PIP_EXACT_EPS = 1e-14;
    static PIP_EXACT_MAX_STATES = Infinity;

    spawnPip(levelData, idx) {
        const rx = (idx % levelData.size_x) * 60 + 30;
        const ry = Math.floor(idx / levelData.size_x) * 60 + 30;
        const commandsIdx = this.MAP_DATA.indexOf("+" + String(idx + 1));
        const cmds = commandsIdx >= 0
            ? this.parseCommands(this.MAP_DATA[commandsIdx + 1]).map(c => (typeof c === 'string' ? c.toLowerCase() : c))
            : [];
        const gi = cmds.indexOf('g');
        const group = gi >= 0 && !Number.isNaN(parseFloat(cmds[gi + 1])) ? parseFloat(cmds[gi + 1]) : null;
        const mk = (k) => ({
            typ: 'pip',
            wTyp: 9,
            k,
            idx: idx + 1,
            x: rx, y: ry,
            rootX: rx, rootY: ry,
            dx: 0, dy: 0, dir: 1,
            direction: -90,
            frame: 0,
            speed: 8, count: 2, delay: 0,
            sx: 11.5, sy: 23,
            costume: 'pip',
            state: 'spawn',
            alive: k === 0,
            draws: 0,
            group,
            cmds
        });
        const out = [];
        for (let k = 1; k <= 5; k++) out.push(mk(k));
        out.push(mk(0));
        return out;
    }

    _pipChoose(X, a, b) {
        if (X.defs) X.defs[X.pos] = AppelPhysics.pipDefaultDraw(a, b);
        if (X.pos < X.script.length) return X.script[X.pos++];
        if (!X.pending) {
            if (a === 1 && b === 15) X.pending = [[1, 1 / 15], [2, 14 / 15]];
            else { X.pending = []; for (let v = a; v <= b; v++) X.pending.push([v, 1 / (b - a + 1)]); }
        }
        X.pos++;
        return a;
    }

    _pipRnd(w, a, b) {
        if (AppelPhysics.PIP_EXACT) return this._pipChoose(AppelPhysics.PIP_EXACT, a, b);
        if (AppelPhysics.PIP_RANDOM) return AppelPhysics.rnd(a, b);
        const S = AppelPhysics, n = w.draws || 0, sc = S.pipScript(w.idx, w.k);
        w.draws = n + 1;
        const v = sc ? sc[n] : undefined;
        if (v === undefined) return S.pipDefaultDraw(a, b);
        return Math.max(a, Math.min(b, v));
    }

    _pipOnStage(ps, w) { return !(Math.abs(w.x - ps.CAM_X) > 340 || Math.abs(w.y - ps.CAM_Y) > 280); }

    _pipProcess(ps, w) {
        if (w.state === 'spawn') return;
        if (!this._pipOnStage(ps, w)) return;
        w.costume = 'pip';
        const f = AppelPhysics.scNum(w.frame);
        if (f > 270) {
            w.costume = 'pip2';
            if (f > 290) w.frame = this._pipRnd(w, 0, 150);
        }
    }

    tickPip(ps, w) {
        if (AppelPhysics.PIP_EXACT) return this._tickPipExact(ps, w);
        if (!w.alive) return;
        if (w.state === 'spawn') {
            if (!this._pipWake(ps, w)) return;
        } else {
            this._pipProcess(ps, w);
        }
        this._pipStep(ps, w);
    }

    _pipWake(ps, w) {
        const S = AppelPhysics;
        {
            const gv = w.group != null ? ps.GROUP[w.group - 1] : "";
            if (S.groupBelowOne(gv)) {
                if (Math.abs(w.x - ps.CAM_X) > 320) return false;
                if (Math.abs(w.y - ps.CAM_Y) > 260) return false;
                if (Math.abs(w.x - ps.PLAYER_X) > 340) return false;
                if (Math.abs(w.y - ps.PLAYER_Y) > 360) return false;
            }
            w.state = '';
            const xi = w.cmds.indexOf('x');
            if (xi >= 0) {
                const d = parseFloat(w.cmds[xi + 1]);
                w.dir = Number.isNaN(d) || d === 0 ? 0 : d / Math.abs(d);
            } else {
                w.dir = ps.PLAYER_X < w.x ? -1 : 1;
            }
            w.dx = w.dir * Math.abs(w.dx);
            w.direction = w.dir * 90;
            w.draws = 0;
            w.delay = 0;
            for (let k = 1; k <= 5; k++) {
                const c = ps.OBJ.find(o => o.typ === 'pip' && o.idx === w.idx && o.k === k);
                if (c) {
                    c.x = w.x; c.y = w.y; c.dx = w.dx; c.dy = w.dy; c.dir = w.dir; c.direction = w.direction;
                    c.frame = w.frame; c.count = w.count; c.speed = w.speed; c.costume = w.costume;
                    c.delay = w.delay; c.state = ''; c.alive = true; c.draws = 0;
                }
                w.delay += 10;
            }
            const hi = w.cmds.indexOf('h');
            if (hi >= 0) w.frame = parseFloat(w.cmds[hi + 1]);
            const gi = w.cmds.indexOf('g');
            if (gi >= 0) {
                const g = parseFloat(w.cmds[gi + 1]);
                if (ps.GROUP[g - 1] === "hold") {
                    w.state = 'hold';
                } else if (w.group > 0 && S.groupBelowOne(ps.GROUP[w.group - 1])) {
                    while (ps.GROUP.length < w.group) ps.GROUP.push("");
                    ps.GROUP[w.group - 1] = 1;
                }
            }
        }
        return true;
    }

    _pipStep(ps, w) {
        const S = AppelPhysics, X = S.PIP_EXACT;
        if (w.state === 'hold') {
            const gi = w.cmds.indexOf('g');
            if (gi >= 0 && ps.GROUP[parseFloat(w.cmds[gi + 1]) - 1] !== "hold") w.state = '';
        }

        w.dir = w.direction === 0 ? 0 : w.direction / Math.abs(w.direction);
        if (w.state === '') {
            if (X) {
                X.inc = w.speed;
                if (!X.touchKnown) X.touch = this._pipExactTouch(ps, w);
            } else if (!ps.PLAYER_DEATH && !ps.EXPLODE && ps.STENCIL_ON &&
                Math.abs(ps.PLAYER_X - w.x) < 80 && Math.abs(ps.PLAYER_Y - w.y) < 80 &&
                this.walkerTouching(ps, w)) {
                const T = AppelPhysics.PIP_TRIAL;
                if (T) T.pipHits.push({ idx: w.idx, k: w.k, tick: T.cur });
                else ps.PLAYER_DEATH = true;
            }
            const temp = w.speed;
            if (!X && S.mod(w.frame - 20, 36) + temp > 35.99 &&
                Math.abs(w.x - ps.CAM_X) < 240 && Math.abs(w.y - ps.CAM_Y) < 180) this.sfx('blip2');
            w.frame += temp;
            w.dx += ((w.dir * temp) - w.dx) * 0.05;
        }
        w.dy += -1;
        w.y += w.dy;
        this.mobOv = null;
        this.mobSolid(w.x + w.dir * 11, w.y - 1, 2, 4, false);
        this.mobSolid(w.x + w.dir * -11, w.y - 1, 2, 4, false);
        if (this.mobOv !== null) {
            w.y += this.mobOv + 0.01;
            w.dy = 0;
            if (this._pipRnd(w, 1, 15) === 1) w.dy = this._pipRnd(w, 5, 8);
        }
        if (w.delay > 0) { w.delay -= 1; return; }
        this.mobOv = null;
        this.mobSolid(w.x + (w.dx + w.dir * 11), w.y - 1, w.dir, 0, false);
        if (this.mobOv === null) {
            w.x += w.dx;
        } else {
            if (w.dy === 0) {
                this.mobOv = null;
                this.mobSolid(w.x + (w.dx + w.dir * 11), w.y + 30, w.dir, 0, false);
                if (this.mobOv !== null) {
                    w.count -= 1;
                    if (w.count > 0 && (w.direction > 0) === (ps.PLAYER_X < w.x)) {
                        w.direction = w.dir * -90;
                    } else {
                        if (Math.abs((w.x + (w.dx + w.dir * 11)) - ps.CAM_X) < 239) {
                            this.particle('pop purple', w.x, w.y + 10);
                            this.particle('pop dot', w.x, w.y + 10);
                        }
                        if (w.k > 0) { w.alive = false; this.mobOv = null; return; }
                    }
                }
                w.dy = 10;
            }
            w.dx = 0;
        }
        this.mobOv = null;
    }

    _tickPipExact(ps, w) {
        const X = AppelPhysics.PIP_EXACT;
        if (X.aborted) return;
        const key = w.idx * 8 + w.k;
        let skipProcess = false;
        if (w.k === 0 && w.state === 'spawn') {
            if (!this._pipWake(ps, w)) return;
            for (let k = 1; k <= 5; k++) {
                const c = ps.OBJ.find(o => o.typ === 'pip' && o.idx === w.idx && o.k === k);
                if (c && (!X.only || X.only.has(w.idx * 8 + k))) X.dist.set(w.idx * 8 + k, this._pipExactReg(c));
            }
            if (!X.only || X.only.has(key)) X.dist.set(key, this._pipExactReg(w));
            skipProcess = true;
        } else if (!X.dist.has(key) && w.alive && w.state !== 'spawn' && (!X.only || X.only.has(key))) {
            X.dist.set(key, this._pipExactReg(w));
        }
        const D = X.dist.get(key);
        if (D) this._pipAdvance(ps, D, skipProcess, X);
    }

    _pipExactReg(o) {
        const m = Object.assign({}, o), c = m.costume === 'pip2' ? 1 : 0, f = m.frame, X = AppelPhysics.PIP_EXACT;
        m.frame = 0; m.costume = 'pip'; m.alive = true;
        const ent = { s: m, F: new Map([[f + c * 1e6, 1]]) };
        if (X && X.track) ent.P = new Map([[f + c * 1e6, { n: o.draws || 0, cost: 0, e: null }]]);
        return { m: new Map([[this._pipKey(m), ent]]), kill: 0, first: -1, idx: o.idx, k: o.k, done: null, dropped: false };
    }

    _pipKey(m) { return m.x + ',' + m.y + ',' + m.dx + ',' + m.dy + ',' + m.direction + ',' + m.count + ',' + m.delay + ',' + m.state; }

    _pipExactTouch(ps, w) {
        if (ps.PLAYER_DEATH || ps.EXPLODE || !ps.STENCIL_ON || !(Math.abs(ps.PLAYER_X - w.x) < 80 && Math.abs(ps.PLAYER_Y - w.y) < 80)) return null;
        const saved = w.costume, r = [false, false];
        w.costume = 'pip'; r[0] = !!this.walkerTouching(ps, w);
        w.costume = 'pip2'; r[1] = !!this.walkerTouching(ps, w);
        w.costume = saved;
        return r;
    }

    _pipAdvance(ps, D, skipProcess, X) {
        if (X.deadline && Date.now() > X.deadline) { X.aborted = true; return; }
        const track = !!X.track;
        const add = (M, k, v) => M.set(k, (M.get(k) || 0) + v);
        const keep = (M, k, path) => { const o = M.get(k); if (!o || path.cost < o.cost) M.set(k, path); };
        const out = new Map();
        this.sfx = this.particle = () => {};
        try {
            for (const ent of D.m.values()) {
                const m = ent.s;
                let F = ent.F, P = ent.P;
                if (!skipProcess && this._pipOnStage(ps, m)) {
                    const G = new Map(), GP = track ? new Map() : null;
                    for (const [key, p] of F) {
                        const f = key >= 5e5 ? key - 1e6 : key, pa = track ? P.get(key) : null;
                        if (f > 270) {
                            if (f > 290) {
                                const q = p / 151;
                                for (let r = 0; r <= 150; r++) {
                                    add(G, r + 1e6, q);
                                    if (track) {
                                        const cost = pa.cost + (r ? 1 : 0), old = GP.get(r + 1e6);
                                        if (!old || cost < old.cost) GP.set(r + 1e6, { n: pa.n + 1, cost, e: r ? { prev: pa.e, i: pa.n, v: r } : pa.e });
                                    }
                                }
                            } else { add(G, f + 1e6, p); if (track) keep(GP, f + 1e6, pa); }
                        } else { add(G, f, p); if (track) keep(GP, f, pa); }
                    }
                    F = G; P = GP;
                }
                X.touchKnown = false; X.touch = null; X.inc = 0;
                let Fnext = null, FnextP = null;
                const stack = [[[], 1]];
                while (stack.length) {
                    const [script, pr] = stack.pop();
                    const c = Object.assign({}, m);
                    X.script = script; X.pos = 0; X.pending = null;
                    if (track) X.defs.length = 0;
                    this._pipStep(ps, c);
                    if (!Fnext) {
                        X.touchKnown = true;
                        Fnext = new Map(); FnextP = track ? new Map() : null;
                        for (const [key, p] of F) {
                            if (X.touch && X.touch[key >= 5e5 ? 1 : 0]) {
                                D.kill += p;
                                if (D.first < 0) D.first = X.T ? X.T.cur : 0;
                            } else { add(Fnext, key + X.inc, p); if (track) FnextP.set(key + X.inc, P.get(key)); }
                        }
                        if (!Fnext.size) break;
                    }
                    if (X.pending) { for (const [v, q] of X.pending) stack.push([script.concat([v]), pr * q]); continue; }
                    let evs = null;
                    if (track) for (let j = 0; j < script.length; j++) if (script[j] !== X.defs[j]) (evs || (evs = [])).push(j, script[j]);
                    const gone = !c.alive;
                    if (gone && !track) continue;
                    let e2 = null;
                    if (!gone) { c.frame = 0; c.costume = 'pip'; }
                    for (const [key, p] of Fnext) {
                        if (track) {
                            const pa = FnextP.get(key), cost = pa.cost + (evs ? evs.length / 2 : 0);
                            if (D.done && cost >= D.done.cost) continue;
                            let e = pa.e;
                            if (evs) for (let q = 0; q < evs.length; q += 2) e = { prev: e, i: pa.n + evs[q], v: evs[q + 1] };
                            const path = { n: pa.n + script.length, cost, e };
                            if (gone) { D.done = path; continue; }
                            if (!e2) {
                                const mk = this._pipKey(c);
                                e2 = out.get(mk);
                                if (!e2) { e2 = { s: c, F: new Map(), P: new Map() }; out.set(mk, e2); }
                            }
                            keep(e2.P, key, path);
                            add(e2.F, key, p * pr);
                        } else {
                            if (!e2) {
                                const mk = this._pipKey(c);
                                e2 = out.get(mk);
                                if (!e2) { e2 = { s: c, F: new Map() }; out.set(mk, e2); }
                            }
                            add(e2.F, key, p * pr);
                        }
                    }
                }
            }
        } finally { delete this.sfx; delete this.particle; }
        if (track) {
            let count = 0;
            for (const e of out.values()) count += e.F.size;
            if (X.beam && count > X.beam) { this._pipBeam(out, X.beam); D.dropped = true; }
            D.m = out;
            return;
        }
        const eps = AppelPhysics.PIP_EXACT_EPS, masses = [];
        for (const [mk, e] of out) {
            let mass = 0;
            for (const [key, p] of e.F) { if (p < eps * 1e-3) e.F.delete(key); else mass += p; }
            if (mass < eps) { X.pruned += mass; out.delete(mk); } else masses.push([mass, mk]);
        }
        if (masses.length > AppelPhysics.PIP_EXACT_MAX_STATES) {
            masses.sort((a, b) => b[0] - a[0]);
            for (let i = AppelPhysics.PIP_EXACT_MAX_STATES; i < masses.length; i++) { X.pruned += masses[i][0]; out.delete(masses[i][1]); }
        }
        D.m = out;
    }

    _pipBeam(out, cap) {
        const all = [], keepN = Math.max(1, Math.floor(cap * 0.8));
        for (const [mk, e] of out) for (const [key, path] of e.P) all.push([path.cost, -e.F.get(key), mk, key]);
        all.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
        for (let i = keepN; i < all.length; i++) {
            const e = out.get(all[i][2]);
            e.F.delete(all[i][3]); e.P.delete(all[i][3]);
            if (!e.F.size) out.delete(all[i][2]);
        }
    }

    static pipTrackSummary(X) {
        const bodies = {};
        for (const D of X.dist.values()) {
            let best = D.done;
            for (const e of D.m.values()) for (const path of e.P.values()) if (!best || path.cost < best.cost) best = path;
            let events = null;
            if (best) { events = []; for (let q = best.e; q; q = q.prev) events.push([q.i, q.v]); events.reverse(); }
            bodies[D.idx * 8 + D.k] = { idx: D.idx, k: D.k, events, cost: best ? best.cost : null, dropped: D.dropped };
        }
        return bodies;
    }

    static pipExactSummary(X) {
        const tiles = {};
        for (const D of X.dist.values()) {
            const t = tiles[D.idx] || (tiles[D.idx] = { survive: 1, bodies: [], first: -1 });
            const kill = D.kill > 1 - 1e-12 ? 1 : Math.min(1, D.kill);
            t.survive *= 1 - kill;
            t.bodies.push({ k: D.k, kill });
            if (D.first >= 0 && (t.first < 0 || D.first < t.first)) t.first = D.first;
        }
        return { tiles, pruned: X.pruned, aborted: !!X.aborted };
    }

    resetPips(OBJ) {
        if (!OBJ) return;
        for (const w of OBJ) {
            if (w.typ !== 'pip') continue;
            if (w.k > 0) w.alive = false;
            w.x = w.rootX;
            w.y = w.rootY;
            w.state = 'spawn';
        }
    }

    scrollCamera(ps) {
        if (ps.CAM_X === undefined || ps.CAM_Y === undefined) { ps.CAM_X = ps.PLAYER_X; ps.CAM_Y = ps.PLAYER_Y; }
        if (this._maxCamX === undefined || this._maxCamXMap !== this.MAP) {
            const flag = this.MAP.indexOf(63) + 1;
            this._maxCamX = flag > 0 ? ((flag % this.LSX) - 1.5) * 60 : 9999999;
            this._maxCamXMap = this.MAP;
        }
        if (!ps.PLAYER_DEATH) {
            ps.CAM_X += Math.round((ps.PLAYER_X - ps.CAM_X) * 0.2);
            ps.CAM_Y += Math.round((ps.PLAYER_Y - (ps.CAM_Y - 8)) * 0.2);
            if (ps.CAM_X > this._maxCamX) ps.CAM_X = this._maxCamX;
        }
        if (Math.abs(ps.SHAKE || 0) > 0.5 && ((ps.TICK || 0) % 2) === 0) {
            ps.CAM_Y += Math.round(ps.SHAKE);
            ps.SHAKE = ps.SHAKE * -0.6;
        }
        if (ps.CAM_Y < 180) ps.CAM_Y = 180;
        if (ps.CAM_X < 240) ps.CAM_X = 240;
        if (ps.CAM_X > this.LSX * 60 - 240) ps.CAM_X = this.LSX * 60 - 240;
    }

    stageCam(ps) {
        return (Number.isFinite(ps.CAM_X) && Number.isFinite(ps.CAM_Y)) ? [ps.CAM_X, ps.CAM_Y] : undefined;
    }

    snapshotPlayerSprite(ps) {
        ps.SPR = {
            x: Math.round(ps.PLAYER_X),
            y: Math.round(ps.PLAYER_Y),
            dir: ps.PLAYER_DIR,
            direction: ps.direction,
            crouch: ps.player_state === 2,
            wall: ps.player_wall !== null,
            costume: (typeof WalkerTouch !== 'undefined') ? WalkerTouch.playerCostume(ps) : undefined
        };
    }

    checkPlatformDeaths(playerState) {
        if (!this.touching || playerState.PLAYER_DEATH) return;
        for (const object of playerState.OBJ) {
            if (!object.teeth) continue;
            if (Math.abs(playerState.PLAYER_X - object.x) < 128 && Math.abs(playerState.PLAYER_Y - object.y) < 128) {
                if (this.touching.is_player_touching_platform(playerState, object)) {
                    playerState.PLAYER_DEATH = true;
                    return;
                }
            }
        }
    }

    isFlagAt(x, y) {
        const ix = Math.floor(x);
        const iy = Math.floor(y);

        const tx = Math.floor(ix / 60);
        const ty = Math.floor(iy / 60);

        const idx = tx + ty * this.LSX;
        return this.MAP[idx] === 63;
    }

    handleKey(playerState) {
        if (this.key_index > 0) {
            const y = Math.floor(this.key_index / this.LSX) * 60 + 30;
            const x = (this.key_index % this.LSX) * 60 + 30;
            if (Math.abs(x - playerState.PLAYER_X) < 26 && Math.abs(y - playerState.PLAYER_Y) < 26) {
                if (!playerState.has_key) this.sfx('Key');
                playerState.has_key = true;
                this.MAP[this.key_index] = 1; if (this._md) this._md.add(this.key_index);
            }
        }
        if (this.mega_index > 0 && this.MAP[this.mega_index] === 85) {
            const y = Math.floor(this.mega_index / this.LSX) * 60 + 30;
            const x = (this.mega_index % this.LSX) * 60 + 30;
            if (Math.abs(x - playerState.PLAYER_X) < 26 && Math.abs(y - playerState.PLAYER_Y) < 26) {
                this.sfx('Key');
                this.MAP[this.mega_index] = 1; if (this._md) this._md.add(this.mega_index);
                this.particle('burst', x, y, 'mega apple');
                playerState.SHAKE = 12;
            }
        }
    }

    handleApples(ps) {
        if (!this._appleIdx || this._appleLen !== this.MAP.length) {
            this._appleIdx = [];
            for (let i = 0; i < this.MAP.length; i++) if (Math.floor(this.MAP[i]) === 69) this._appleIdx.push(i);
            this._appleLen = this.MAP.length;
        }
        if (!this._appleIdx.length) return;
        if (!ps.applesGot) ps.applesGot = [];
        if (ps.PLAYER_DEATH) return;
        const tick = ps.TICK || 0;
        for (const idx of this._appleIdx) {
            if (ps.applesGot.includes(idx)) continue;
            const rx = (idx % this.LSX) * 60 + 30, ry = Math.floor(idx / this.LSX) * 60 + 30;
            const my = ry + 6 * AppelPhysics.scSin((rx + ry + tick) * 5);
            if (Math.abs(ps.PLAYER_X - rx) < 30 && Math.abs(ps.PLAYER_Y - my) < 30) {
                ps.applesGot.push(idx);
                ps.APPLES = (ps.APPLES || 0) + 1;
                this.sfx('coin 2'); this.sfx('crunch');
            }
        }
    }

    applyKeys(playerState, inputKeys) {
        const keys = keyCode(inputKeys)

        if (keys & 8) {
            if (playerState.KEY_UP < 1){
                playerState.KEY_UP = 1;
            }
        } else {
            playerState.KEY_UP = 0;
        }

        playerState.KEY_DOWN = (keys & 4) ? 1 : 0;

        if (keys & 2) {
            if (playerState.KEY_LEFT < 1){
                playerState.KEY_LEFT = 1;
            }
        } else {
            playerState.KEY_LEFT = 0;
        }

        if (keys & 1) {
            if (playerState.KEY_RIGHT < 1){
                playerState.KEY_RIGHT = 1;
            }
        } else {
            playerState.KEY_RIGHT = 0;
        }
    }

    beginExplosion(ps) {
        this.sfx('boom 2'); this.sfx('squishy');
        this.particle('explode', ps.PLAYER_X, ps.PLAYER_Y);
        ps.PLAYER_DEATH = false;
        ps.PLAYER_INV = 0;
        ps.SHAKE = 30;
        ps.CAM_Y -= 20;
        ps.EXPLODE = { n: 0, prevKeys: ps._lastInput || '' };
        return ps;
    }

    explodeFrame(ps, inputKeys) {
        const ex = ps.EXPLODE;
        ex.n++;
        const readKeys = ex.prevKeys;
        this.applyKeys(ps, readKeys);
        if (ex.n === 1 && ps.KEY_UP === 1) ps.KEY_UP = 2;
        this.applyKeys(ps, readKeys);
        if (ps.KEY_UP === 1) {
            ps.KEY_UP = 2;
            if (ex.n > 13) {
                const fin = this.finishExplosion(ps, readKeys);
                return fin.PLAYER_DEATH ? fin : this.tick(fin, inputKeys);
            }
        }
        ps.TICK = (ps.TICK || 0) + 1;
        ps.PLAYER_DEATH = true;
        this.scrollCamera(ps);
        ps.PLAYER_DEATH = false;
        this.tickActive(ps);
        this.tickObj(ps);
        this.tickSaws(ps);
        ps.PLAYER_DEATH = false;
        ex.prevKeys = inputKeys;
        if (ex.n >= 70) return this.finishExplosion(ps, inputKeys);
        return ps;
    }

    finishExplosion(ps, keys) {
        const carry = {
            KEY_UP: ps.KEY_UP, KEY_DOWN: ps.KEY_DOWN, KEY_LEFT: ps.KEY_LEFT, KEY_RIGHT: ps.KEY_RIGHT,
            TICK: ps.TICK, SHAKE: ps.SHAKE, CAM_X: ps.CAM_X, CAM_Y: ps.CAM_Y, PLAYER_LSY: ps.PLAYER_LSY,
            has_key: ps.has_key,
            activeIdxSpawn: ps.activeIdxSpawn, activeIdx: ps.activeIdx,
            activeTyp: ps.activeTyp, activeFrame: ps.activeFrame,
            _respawnKeys: keys || ''
        };
        return this.createDefaultGameState(ps.OBJ, undefined, undefined, ps.GROUP, ps.SPAWN_IDX, true, carry);
    }

    playerStep(playerState) {
        playerState.PLAYER_LSY = playerState.PLAYER_Y;

        this.resolve_collisions(false, playerState);

        this.check_dangers(playerState);

        this.handle_player_up_down(playerState);
        this.handle_player_left_right(playerState);

        const playerWall = playerState.player_wall;
        if (playerWall !== null) {
            if (playerWall === 0) {
                playerState.is_falling = 10;
            } else {
                playerState.is_falling = 0;
            }
            this.confirm_still_touching_wall(playerState);
        }

        if (playerState.player_state !== 1 && playerState.player_state !== 3) {
            if (playerState.flipped !== 0 && playerState.player_wall === null) {
                this.make_upright(playerState);
            }
        }

        this.scrollCamera(playerState);
        playerState._camXAtPos = playerState.CAM_X;
        playerState._camYAtPos = playerState.CAM_Y;
        this.positionNow(playerState);

        this.handleKey(playerState);
        this.handleApples(playerState);

        this.checkPlatformDeaths(playerState);
        this.checkBurthaDeaths(playerState);

        this.snapshotPlayerSprite(playerState);
        playerState.STENCIL_ON = !playerState.PLAYER_DEATH && (playerState.TICK || 0) > 0;

        if (playerState._pendingBounce) {
            playerState._pendingBounce = false;
            playerState.is_falling = 0;
            playerState.is_jumping = 1;
            playerState.extra_bounce = 3;
        }
    }

    settleDeath(playerState) {
        if (playerState.PLAYER_DEATH) {
            const sprX = Math.round(playerState.PLAYER_X - playerState._camXAtPos);
            if (!(Math.abs(sprX) < 240 && !(playerState.PLAYER_INV >= 1))) {
                playerState.PLAYER_DEATH = false;
            }
        }
    }

    tick(playerState, inputKeys) {

        if (playerState.EXPLODE) return this.explodeFrame(playerState, inputKeys);

        playerState.TICK = (playerState.TICK || 0) + 1;
        playerState._lastInput = inputKeys;

        this.applyKeys(playerState, inputKeys);

        this.tickActive(playerState);

        this.tickObj(playerState);

        this.tickSaws(playerState);

        this.playerStep(playerState);

        this.settleDeath(playerState);

        return playerState;
    }

    createDefaultGameState(obj, x = 128.0, y = 280.0, group = null, spawnIdx = null, respawn = false, carry = null) {
        this.sfx('Start');
        const startIdx = this.MAP.indexOf(76);
        const spawnIDX = (spawnIdx !== null && spawnIdx !== undefined) ? spawnIdx : startIdx;
        let newX, newY
        if (spawnIDX > 0) {
            newX = (((spawnIDX) % this.LSX) * 60) + 30;
            newY = Math.floor((spawnIDX) / this.LSX) * 60 + 17;
        } else {
            newY = y;
            newX = x
            while (this.get_block_at(x, newY - 30) > 4) {
                newY += 30;
            }
        }

        const state = {
            PLAYER_X: newX,
            PLAYER_Y: newY,
            PLAYER_SX: 0.0,
            PLAYER_SY: 0.0,
            PLAYER_DEATH: false,
            PSZ: [0, 17, 13, 17, 13],
            is_jumping: 0,
            is_falling: 999,
            flipped: 0,
            player_state: 0,
            player_wall: null,
            direction: 90,
            PLAYER_DIR: 1,
            wasInSpikeTileLastFrame: false,
            friction_dx: 0,
            friction_dy: 0,
            friction: 0,
            PLAYER_NO_SLOW: 0,
            KEY_LEFT: 0,
            KEY_RIGHT: 0,
            KEY_DOWN: 0,
            KEY_UP: 0,
            activeIdxSpawn: [],
            activeIdx: [],
            activeTyp: [],
            activeFrame: [],
            has_key: false,
            GROUP: group ? group : this.initGroups(),
            OBJ: obj,
            SPAWN_IDX: (spawnIDX > 0) ? spawnIDX : null,
            PLAYER_INV: 2,
            STENCIL_ON: false,
            TICK: 0,
            SHAKE: 0,
            extra_bounce: 0
        };
        if (carry) Object.assign(state, carry);
        for (let guard = 0; guard < 1000; guard++) {
            this.check_square(state.PLAYER_X, state.PLAYER_Y, state);
            if (this.mask_char < 5) break;
            state.PLAYER_Y += 30;
        }
        if (respawn) {
            let inv = 30;
            if (spawnIDX >= 0) {
                const k = this.MAP_DATA.indexOf("+" + String(spawnIDX + 1));
                if (k !== -1) {
                    const v = Number(this.MAP_DATA[k + 1]);
                    inv = Number.isFinite(v) ? v : 0;
                }
            }
            state.PLAYER_INV = inv;
        }
        this.resetSaws(state.OBJ);
        this.resetBurthas(state.OBJ);
        this.resetWalkers(state.OBJ);
        this.resetWorms(state.OBJ);
        this.resetEyeLaunchers(state.OBJ);
        this.resetPips(state.OBJ);
        if (!carry) {
            state.CAM_X = state.PLAYER_X;
            state.CAM_Y = state.PLAYER_Y;
            this.scrollCamera(state);
        }
        this.snapshotPlayerSprite(state);
        let respawnDeath = false;
        if (respawn && carry && AppelPhysics.RESPAWN_PLAYER_STEP) {
            this.applyKeys(state, carry._respawnKeys || '');
            this.playerStep(state);
            this.settleDeath(state);
            respawnDeath = !!state.PLAYER_DEATH;
        }
        delete state._respawnKeys;
        if (AppelPhysics.EXTRA_START_OBJ_TICK && state.OBJ) {
            this.tickObj(state);
            this.tickSaws(state);
            state.PLAYER_DEATH = respawnDeath;
        }
        return state;

    }

}

const _KEY_LOOKUP = {'D': 1, 'A': 2, 'S': 4, 'W': 8};

function keyCode(keys) {
    if (typeof keys === 'string') {
        let sum = 0;
        for (const k of keys) {
            sum += _KEY_LOOKUP[k] || 0;
        }
        return sum;
    } else {
        return keys;
    }
}

function decodeReplaySlot(replayCode) {
    try { return replayCode.slice(8).split('Ǉ')[1] || ''; } catch (e) { return ''; }
}

function decodeReplayCode(replayCode) {
    try {
        const data = replayCode.slice(8).split('Ǉ').slice(4);

        let maxIndex = 0;
        for (let i = 0; i < data.length; i += 2) {
            const val = parseInt(data[i]);
            if (!isNaN(val)) maxIndex = Math.max(maxIndex, val);
        }
        if (data.length % 2 !== 0) {
            const finalVal = parseInt(data[data.length - 1]);
            if (!isNaN(finalVal)) maxIndex = Math.max(maxIndex, finalVal);
        }

        const inputs = new Array(maxIndex).fill("");

        const keyCombos = {};
        const keyMap = [
            ["D", 1], ["A", 2], ["S", 4], ["W", 8]
        ];

        for (let i = 0; i < 16; i++) {
            let keys = "";
            for (const [char, bit] of keyMap) {
                if (i & bit) keys += char;
            }
            keyCombos[i] = keys;
        }

        let cursor = 0;
        for (let i = 0; i < data.length - 1; i += 2) {
            const start = parseInt(data[i]) - 1;
            const keyValue = parseInt(data[i + 1]);

            if (isNaN(start) || isNaN(keyValue)) continue;

            const keys = keyCombos[keyValue] || "";

            let nextStart = NaN;
            if (i + 3 < data.length) {
                nextStart = parseInt(data[i + 2]) - 1;
            }

            const effStart = Math.max(start, cursor);

            let end = isNaN(nextStart)
                ? inputs.length
                : Math.max(nextStart, effStart + 1);
            end = Math.min(end, inputs.length);

            for (let j = effStart; j < end; j++) {
                inputs[j] = keys;
            }
            cursor = end;
        }

        return inputs;
    } catch (error) {
        return "Error decoding replay";
    }
}