var ScratchTouchBundle = (() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };

  var require_twgl_full = __commonJS({
    "node_modules/twgl.js/dist/4.x/twgl-full.js"(exports, module) {
      (function webpackUniversalModuleDefinition(root, factory) {
        if (typeof exports === "object" && typeof module === "object")
          module.exports = factory();
        else if (typeof define === "function" && define.amd)
          define([], factory);
        else if (typeof exports === "object")
          exports["twgl"] = factory();
        else
          root["twgl"] = factory();
      })(typeof self !== "undefined" ? self : exports, function() {
        return (
          (function(modules) {
            var installedModules = {};
            function __webpack_require__(moduleId) {
              if (installedModules[moduleId]) {
                return installedModules[moduleId].exports;
              }
              var module2 = installedModules[moduleId] = {
                i: moduleId,
                l: false,
                exports: {}
              };
              modules[moduleId].call(module2.exports, module2, module2.exports, __webpack_require__);
              module2.l = true;
              return module2.exports;
            }
            __webpack_require__.m = modules;
            __webpack_require__.c = installedModules;
            __webpack_require__.d = function(exports2, name, getter) {
              if (!__webpack_require__.o(exports2, name)) {
                Object.defineProperty(exports2, name, {
                  configurable: false,
                  enumerable: true,
                  get: getter
                });
              }
            };
            __webpack_require__.n = function(module2) {
              var getter = module2 && module2.__esModule ? (
                function getDefault() {
                  return module2["default"];
                }
              ) : (
                function getModuleExports() {
                  return module2;
                }
              );
              __webpack_require__.d(getter, "a", getter);
              return getter;
            };
            __webpack_require__.o = function(object, property) {
              return Object.prototype.hasOwnProperty.call(object, property);
            };
            __webpack_require__.p = "";
            return __webpack_require__(__webpack_require__.s = 9);
          })([
            (function(module2, exports2, __webpack_require__) {
              "use strict";
              exports2.__esModule = true;
              exports2.copyExistingProperties = copyExistingProperties;
              exports2.copyNamedProperties = copyNamedProperties;
              exports2.isBuffer = isBuffer;
              exports2.isRenderbuffer = isRenderbuffer;
              exports2.isShader = isShader;
              exports2.isTexture = isTexture;
              exports2.isSampler = isSampler;
              exports2.warn = exports2.error = void 0;
              var _globalObject = _interopRequireDefault(__webpack_require__(2));
              function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : { default: obj };
              }
              function copyNamedProperties(names, src, dst) {
                names.forEach(function(name) {
                  var value = src[name];
                  if (value !== void 0) {
                    dst[name] = value;
                  }
                });
              }
              function copyExistingProperties(src, dst) {
                Object.keys(dst).forEach(function(key) {
                  if (dst.hasOwnProperty(key) && src.hasOwnProperty(key)) {
                    dst[key] = src[key];
                  }
                });
              }
              var error = _globalObject.default.console && _globalObject.default.console.error && typeof _globalObject.default.console.error === "function" ? _globalObject.default.console.error.bind(_globalObject.default.console) : function() {
              };
              exports2.error = error;
              var warn = _globalObject.default.console && _globalObject.default.console.warn && typeof _globalObject.default.console.warn === "function" ? _globalObject.default.console.warn.bind(_globalObject.default.console) : function() {
              };
              exports2.warn = warn;
              var repBuffer;
              function isBuffer(gl, t) {
                if (!repBuffer) {
                  repBuffer = gl.createBuffer();
                }
                return t instanceof repBuffer.constructor;
              }
              var repRenderbuffer;
              function isRenderbuffer(gl, t) {
                if (!repRenderbuffer) {
                  repRenderbuffer = gl.createRenderbuffer();
                }
                return t instanceof repRenderbuffer.constructor;
              }
              var repShader;
              function isShader(gl, t) {
                if (!repShader) {
                  repShader = gl.createShader(gl.VERTEX_SHADER);
                }
                return t instanceof repShader.constructor;
              }
              var repTexture;
              function isTexture(gl, t) {
                if (!repTexture) {
                  repTexture = gl.createTexture();
                }
                return t instanceof repTexture.constructor;
              }
              var repSampler;
              function isSampler(gl, t) {
                if (!repSampler) {
                  if (gl.createSampler) {
                    repSampler = gl.createSampler();
                  } else {
                    return false;
                  }
                }
                return t instanceof repSampler.constructor;
              }
            }),
            (function(module2, exports2, __webpack_require__) {
              "use strict";
              exports2.__esModule = true;
              exports2.getGLTypeForTypedArray = getGLTypeForTypedArray;
              exports2.getGLTypeForTypedArrayType = getGLTypeForTypedArrayType;
              exports2.getTypedArrayTypeForGLType = getTypedArrayTypeForGLType;
              exports2.isArrayBuffer = void 0;
              var _globalObject = _interopRequireDefault(__webpack_require__(2));
              function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : { default: obj };
              }
              var gl = void 0;
              var BYTE = 5120;
              var UNSIGNED_BYTE = 5121;
              var SHORT = 5122;
              var UNSIGNED_SHORT = 5123;
              var INT = 5124;
              var UNSIGNED_INT = 5125;
              var FLOAT = 5126;
              var UNSIGNED_SHORT_4_4_4_4 = 32819;
              var UNSIGNED_SHORT_5_5_5_1 = 32820;
              var UNSIGNED_SHORT_5_6_5 = 33635;
              var HALF_FLOAT = 5131;
              var UNSIGNED_INT_2_10_10_10_REV = 33640;
              var UNSIGNED_INT_10F_11F_11F_REV = 35899;
              var UNSIGNED_INT_5_9_9_9_REV = 35902;
              var FLOAT_32_UNSIGNED_INT_24_8_REV = 36269;
              var UNSIGNED_INT_24_8 = 34042;
              var glTypeToTypedArray = {};
              {
                var tt = glTypeToTypedArray;
                tt[BYTE] = Int8Array;
                tt[UNSIGNED_BYTE] = Uint8Array;
                tt[SHORT] = Int16Array;
                tt[UNSIGNED_SHORT] = Uint16Array;
                tt[INT] = Int32Array;
                tt[UNSIGNED_INT] = Uint32Array;
                tt[FLOAT] = Float32Array;
                tt[UNSIGNED_SHORT_4_4_4_4] = Uint16Array;
                tt[UNSIGNED_SHORT_5_5_5_1] = Uint16Array;
                tt[UNSIGNED_SHORT_5_6_5] = Uint16Array;
                tt[HALF_FLOAT] = Uint16Array;
                tt[UNSIGNED_INT_2_10_10_10_REV] = Uint32Array;
                tt[UNSIGNED_INT_10F_11F_11F_REV] = Uint32Array;
                tt[UNSIGNED_INT_5_9_9_9_REV] = Uint32Array;
                tt[FLOAT_32_UNSIGNED_INT_24_8_REV] = Uint32Array;
                tt[UNSIGNED_INT_24_8] = Uint32Array;
              }
              function getGLTypeForTypedArray(typedArray) {
                if (typedArray instanceof Int8Array) {
                  return BYTE;
                }
                if (typedArray instanceof Uint8Array) {
                  return UNSIGNED_BYTE;
                }
                if (typedArray instanceof Uint8ClampedArray) {
                  return UNSIGNED_BYTE;
                }
                if (typedArray instanceof Int16Array) {
                  return SHORT;
                }
                if (typedArray instanceof Uint16Array) {
                  return UNSIGNED_SHORT;
                }
                if (typedArray instanceof Int32Array) {
                  return INT;
                }
                if (typedArray instanceof Uint32Array) {
                  return UNSIGNED_INT;
                }
                if (typedArray instanceof Float32Array) {
                  return FLOAT;
                }
                throw "unsupported typed array type";
              }
              function getGLTypeForTypedArrayType(typedArrayType) {
                if (typedArrayType === Int8Array) {
                  return BYTE;
                }
                if (typedArrayType === Uint8Array) {
                  return UNSIGNED_BYTE;
                }
                if (typedArrayType === Uint8ClampedArray) {
                  return UNSIGNED_BYTE;
                }
                if (typedArrayType === Int16Array) {
                  return SHORT;
                }
                if (typedArrayType === Uint16Array) {
                  return UNSIGNED_SHORT;
                }
                if (typedArrayType === Int32Array) {
                  return INT;
                }
                if (typedArrayType === Uint32Array) {
                  return UNSIGNED_INT;
                }
                if (typedArrayType === Float32Array) {
                  return FLOAT;
                }
                throw "unsupported typed array type";
              }
              function getTypedArrayTypeForGLType(type) {
                var CTOR = glTypeToTypedArray[type];
                if (!CTOR) {
                  throw "unknown gl type";
                }
                return CTOR;
              }
              var isArrayBuffer = _globalObject.default.SharedArrayBuffer ? function isArrayBufferOrSharedArrayBuffer(a) {
                return a && a.buffer && (a.buffer instanceof ArrayBuffer || a.buffer instanceof _globalObject.default.SharedArrayBuffer);
              } : function isArrayBuffer2(a) {
                return a && a.buffer && a.buffer instanceof ArrayBuffer;
              };
              exports2.isArrayBuffer = isArrayBuffer;
            }),
            (function(module2, exports2, __webpack_require__) {
              "use strict";
              exports2.__esModule = true;
              exports2.default = void 0;
              var global = typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};
              exports2.default = global;
            }),
            (function(module2, exports2, __webpack_require__) {
              "use strict";
              exports2.__esModule = true;
              exports2.add = add;
              exports2.copy = copy;
              exports2.create = create;
              exports2.cross = cross;
              exports2.distance = distance;
              exports2.distanceSq = distanceSq;
              exports2.divide = divide;
              exports2.divScalar = divScalar;
              exports2.dot = dot;
              exports2.lerp = lerp;
              exports2.length = length2;
              exports2.lengthSq = lengthSq;
              exports2.mulScalar = mulScalar;
              exports2.multiply = multiply;
              exports2.negate = negate;
              exports2.normalize = normalize;
              exports2.setDefaultType = setDefaultType;
              exports2.subtract = subtract;
              var VecType = Float32Array;
              function setDefaultType(ctor) {
                var oldType = VecType;
                VecType = ctor;
                return oldType;
              }
              function create(x, y, z) {
                var dst = new VecType(3);
                if (x) {
                  dst[0] = x;
                }
                if (y) {
                  dst[1] = y;
                }
                if (z) {
                  dst[2] = z;
                }
                return dst;
              }
              function add(a, b, dst) {
                dst = dst || new VecType(3);
                dst[0] = a[0] + b[0];
                dst[1] = a[1] + b[1];
                dst[2] = a[2] + b[2];
                return dst;
              }
              function subtract(a, b, dst) {
                dst = dst || new VecType(3);
                dst[0] = a[0] - b[0];
                dst[1] = a[1] - b[1];
                dst[2] = a[2] - b[2];
                return dst;
              }
              function lerp(a, b, t, dst) {
                dst = dst || new VecType(3);
                dst[0] = (1 - t) * a[0] + t * b[0];
                dst[1] = (1 - t) * a[1] + t * b[1];
                dst[2] = (1 - t) * a[2] + t * b[2];
                return dst;
              }
              function mulScalar(v, k, dst) {
                dst = dst || new VecType(3);
                dst[0] = v[0] * k;
                dst[1] = v[1] * k;
                dst[2] = v[2] * k;
                return dst;
              }
              function divScalar(v, k, dst) {
                dst = dst || new VecType(3);
                dst[0] = v[0] / k;
                dst[1] = v[1] / k;
                dst[2] = v[2] / k;
                return dst;
              }
              function cross(a, b, dst) {
                dst = dst || new VecType(3);
                var t1 = a[2] * b[0] - a[0] * b[2];
                var t2 = a[0] * b[1] - a[1] * b[0];
                dst[0] = a[1] * b[2] - a[2] * b[1];
                dst[1] = t1;
                dst[2] = t2;
                return dst;
              }
              function dot(a, b) {
                return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
              }
              function length2(v) {
                return Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
              }
              function lengthSq(v) {
                return v[0] * v[0] + v[1] * v[1] + v[2] * v[2];
              }
              function distance(a, b) {
                var dx = a[0] - b[0];
                var dy = a[1] - b[1];
                var dz = a[2] - b[2];
                return Math.sqrt(dx * dx + dy * dy + dz * dz);
              }
              function distanceSq(a, b) {
                var dx = a[0] - b[0];
                var dy = a[1] - b[1];
                var dz = a[2] - b[2];
                return dx * dx + dy * dy + dz * dz;
              }
              function normalize(a, dst) {
                dst = dst || new VecType(3);
                var lenSq = a[0] * a[0] + a[1] * a[1] + a[2] * a[2];
                var len = Math.sqrt(lenSq);
                if (len > 1e-5) {
                  dst[0] = a[0] / len;
                  dst[1] = a[1] / len;
                  dst[2] = a[2] / len;
                } else {
                  dst[0] = 0;
                  dst[1] = 0;
                  dst[2] = 0;
                }
                return dst;
              }
              function negate(v, dst) {
                dst = dst || new VecType(3);
                dst[0] = -v[0];
                dst[1] = -v[1];
                dst[2] = -v[2];
                return dst;
              }
              function copy(v, dst) {
                dst = dst || new VecType(3);
                dst[0] = v[0];
                dst[1] = v[1];
                dst[2] = v[2];
                return dst;
              }
              function multiply(a, b, dst) {
                dst = dst || new VecType(3);
                dst[0] = a[0] * b[0];
                dst[1] = a[1] * b[1];
                dst[2] = a[2] * b[2];
                return dst;
              }
              function divide(a, b, dst) {
                dst = dst || new VecType(3);
                dst[0] = a[0] / b[0];
                dst[1] = a[1] / b[1];
                dst[2] = a[2] / b[2];
                return dst;
              }
            }),
            (function(module2, exports2, __webpack_require__) {
              "use strict";
              exports2.__esModule = true;
              exports2.isWebGL1 = isWebGL1;
              exports2.isWebGL2 = isWebGL2;
              exports2.glEnumToString = void 0;
              function isWebGL2(gl) {
                return !!gl.texStorage2D;
              }
              function isWebGL1(gl) {
                return !gl.texStorage2D;
              }
              var glEnumToString =  (function() {
                var haveEnumsForType = {};
                var enums = {};
                function addEnums(gl) {
                  var type = gl.constructor.name;
                  if (!haveEnumsForType[type]) {
                    for (var key in gl) {
                      if (typeof gl[key] === "number") {
                        var existing = enums[gl[key]];
                        enums[gl[key]] = existing ? "".concat(existing, " | ").concat(key) : key;
                      }
                    }
                    haveEnumsForType[type] = true;
                  }
                }
                return function glEnumToString2(gl, value) {
                  addEnums(gl);
                  return enums[value] || "0x" + value.toString(16);
                };
              })();
              exports2.glEnumToString = glEnumToString;
            }),
            (function(module2, exports2, __webpack_require__) {
              "use strict";
              exports2.__esModule = true;
              exports2.createAttributeSetters = createAttributeSetters;
              exports2.createProgram = createProgram;
              exports2.createProgramFromScripts = createProgramFromScripts;
              exports2.createProgramFromSources = createProgramFromSources;
              exports2.createProgramInfo = createProgramInfo;
              exports2.createProgramInfoFromProgram = createProgramInfoFromProgram;
              exports2.createUniformSetters = createUniformSetters;
              exports2.createUniformBlockSpecFromProgram = createUniformBlockSpecFromProgram;
              exports2.createUniformBlockInfoFromProgram = createUniformBlockInfoFromProgram;
              exports2.createUniformBlockInfo = createUniformBlockInfo;
              exports2.createTransformFeedback = createTransformFeedback;
              exports2.createTransformFeedbackInfo = createTransformFeedbackInfo;
              exports2.bindTransformFeedbackInfo = bindTransformFeedbackInfo;
              exports2.setAttributes = setAttributes;
              exports2.setBuffersAndAttributes = setBuffersAndAttributes;
              exports2.setUniforms = setUniforms;
              exports2.setUniformBlock = setUniformBlock;
              exports2.setBlockUniforms = setBlockUniforms;
              exports2.bindUniformBlock = bindUniformBlock;
              var utils = _interopRequireWildcard(__webpack_require__(4));
              var helper = _interopRequireWildcard(__webpack_require__(0));
              var _globalObject = _interopRequireDefault(__webpack_require__(2));
              function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : { default: obj };
              }
              function _interopRequireWildcard(obj) {
                if (obj && obj.__esModule) {
                  return obj;
                } else {
                  var newObj = {};
                  if (obj != null) {
                    for (var key in obj) {
                      if (Object.prototype.hasOwnProperty.call(obj, key)) {
                        var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};
                        if (desc.get || desc.set) {
                          Object.defineProperty(newObj, key, desc);
                        } else {
                          newObj[key] = obj[key];
                        }
                      }
                    }
                  }
                  newObj.default = obj;
                  return newObj;
                }
              }
              var error = helper.error;
              var warn = helper.warn;
              var getElementById = _globalObject.default && _globalObject.default.document && _globalObject.default.document.getElementById ? _globalObject.default.document.getElementById.bind(_globalObject.default.document) : function() {
                return null;
              };
              var FLOAT = 5126;
              var FLOAT_VEC2 = 35664;
              var FLOAT_VEC3 = 35665;
              var FLOAT_VEC4 = 35666;
              var INT = 5124;
              var INT_VEC2 = 35667;
              var INT_VEC3 = 35668;
              var INT_VEC4 = 35669;
              var BOOL = 35670;
              var BOOL_VEC2 = 35671;
              var BOOL_VEC3 = 35672;
              var BOOL_VEC4 = 35673;
              var FLOAT_MAT2 = 35674;
              var FLOAT_MAT3 = 35675;
              var FLOAT_MAT4 = 35676;
              var SAMPLER_2D = 35678;
              var SAMPLER_CUBE = 35680;
              var SAMPLER_3D = 35679;
              var SAMPLER_2D_SHADOW = 35682;
              var FLOAT_MAT2x3 = 35685;
              var FLOAT_MAT2x4 = 35686;
              var FLOAT_MAT3x2 = 35687;
              var FLOAT_MAT3x4 = 35688;
              var FLOAT_MAT4x2 = 35689;
              var FLOAT_MAT4x3 = 35690;
              var SAMPLER_2D_ARRAY = 36289;
              var SAMPLER_2D_ARRAY_SHADOW = 36292;
              var SAMPLER_CUBE_SHADOW = 36293;
              var UNSIGNED_INT = 5125;
              var UNSIGNED_INT_VEC2 = 36294;
              var UNSIGNED_INT_VEC3 = 36295;
              var UNSIGNED_INT_VEC4 = 36296;
              var INT_SAMPLER_2D = 36298;
              var INT_SAMPLER_3D = 36299;
              var INT_SAMPLER_CUBE = 36300;
              var INT_SAMPLER_2D_ARRAY = 36303;
              var UNSIGNED_INT_SAMPLER_2D = 36306;
              var UNSIGNED_INT_SAMPLER_3D = 36307;
              var UNSIGNED_INT_SAMPLER_CUBE = 36308;
              var UNSIGNED_INT_SAMPLER_2D_ARRAY = 36311;
              var TEXTURE_2D = 3553;
              var TEXTURE_CUBE_MAP = 34067;
              var TEXTURE_3D = 32879;
              var TEXTURE_2D_ARRAY = 35866;
              var typeMap = {};
              function getBindPointForSamplerType(gl2, type) {
                return typeMap[type].bindPoint;
              }
              function floatSetter(gl2, location) {
                return function(v) {
                  gl2.uniform1f(location, v);
                };
              }
              function floatArraySetter(gl2, location) {
                return function(v) {
                  gl2.uniform1fv(location, v);
                };
              }
              function floatVec2Setter(gl2, location) {
                return function(v) {
                  gl2.uniform2fv(location, v);
                };
              }
              function floatVec3Setter(gl2, location) {
                return function(v) {
                  gl2.uniform3fv(location, v);
                };
              }
              function floatVec4Setter(gl2, location) {
                return function(v) {
                  gl2.uniform4fv(location, v);
                };
              }
              function intSetter(gl2, location) {
                return function(v) {
                  gl2.uniform1i(location, v);
                };
              }
              function intArraySetter(gl2, location) {
                return function(v) {
                  gl2.uniform1iv(location, v);
                };
              }
              function intVec2Setter(gl2, location) {
                return function(v) {
                  gl2.uniform2iv(location, v);
                };
              }
              function intVec3Setter(gl2, location) {
                return function(v) {
                  gl2.uniform3iv(location, v);
                };
              }
              function intVec4Setter(gl2, location) {
                return function(v) {
                  gl2.uniform4iv(location, v);
                };
              }
              function uintSetter(gl2, location) {
                return function(v) {
                  gl2.uniform1ui(location, v);
                };
              }
              function uintArraySetter(gl2, location) {
                return function(v) {
                  gl2.uniform1uiv(location, v);
                };
              }
              function uintVec2Setter(gl2, location) {
                return function(v) {
                  gl2.uniform2uiv(location, v);
                };
              }
              function uintVec3Setter(gl2, location) {
                return function(v) {
                  gl2.uniform3uiv(location, v);
                };
              }
              function uintVec4Setter(gl2, location) {
                return function(v) {
                  gl2.uniform4uiv(location, v);
                };
              }
              function floatMat2Setter(gl2, location) {
                return function(v) {
                  gl2.uniformMatrix2fv(location, false, v);
                };
              }
              function floatMat3Setter(gl2, location) {
                return function(v) {
                  gl2.uniformMatrix3fv(location, false, v);
                };
              }
              function floatMat4Setter(gl2, location) {
                return function(v) {
                  gl2.uniformMatrix4fv(location, false, v);
                };
              }
              function floatMat23Setter(gl2, location) {
                return function(v) {
                  gl2.uniformMatrix2x3fv(location, false, v);
                };
              }
              function floatMat32Setter(gl2, location) {
                return function(v) {
                  gl2.uniformMatrix3x2fv(location, false, v);
                };
              }
              function floatMat24Setter(gl2, location) {
                return function(v) {
                  gl2.uniformMatrix2x4fv(location, false, v);
                };
              }
              function floatMat42Setter(gl2, location) {
                return function(v) {
                  gl2.uniformMatrix4x2fv(location, false, v);
                };
              }
              function floatMat34Setter(gl2, location) {
                return function(v) {
                  gl2.uniformMatrix3x4fv(location, false, v);
                };
              }
              function floatMat43Setter(gl2, location) {
                return function(v) {
                  gl2.uniformMatrix4x3fv(location, false, v);
                };
              }
              function samplerSetter(gl2, type, unit, location) {
                var bindPoint = getBindPointForSamplerType(gl2, type);
                return utils.isWebGL2(gl2) ? function(textureOrPair) {
                  var texture;
                  var sampler;
                  if (helper.isTexture(gl2, textureOrPair)) {
                    texture = textureOrPair;
                    sampler = null;
                  } else {
                    texture = textureOrPair.texture;
                    sampler = textureOrPair.sampler;
                  }
                  gl2.uniform1i(location, unit);
                  gl2.activeTexture(gl2.TEXTURE0 + unit);
                  gl2.bindTexture(bindPoint, texture);
                  gl2.bindSampler(unit, sampler);
                } : function(texture) {
                  gl2.uniform1i(location, unit);
                  gl2.activeTexture(gl2.TEXTURE0 + unit);
                  gl2.bindTexture(bindPoint, texture);
                };
              }
              function samplerArraySetter(gl2, type, unit, location, size) {
                var bindPoint = getBindPointForSamplerType(gl2, type);
                var units = new Int32Array(size);
                for (var ii2 = 0; ii2 < size; ++ii2) {
                  units[ii2] = unit + ii2;
                }
                return utils.isWebGL2(gl2) ? function(textures) {
                  gl2.uniform1iv(location, units);
                  textures.forEach(function(textureOrPair, index) {
                    gl2.activeTexture(gl2.TEXTURE0 + units[index]);
                    var texture;
                    var sampler;
                    if (helper.isTexture(gl2, textureOrPair)) {
                      texture = textureOrPair;
                      sampler = null;
                    } else {
                      texture = textureOrPair.texture;
                      sampler = textureOrPair.sampler;
                    }
                    gl2.bindSampler(unit, sampler);
                    gl2.bindTexture(bindPoint, texture);
                  });
                } : function(textures) {
                  gl2.uniform1iv(location, units);
                  textures.forEach(function(texture, index) {
                    gl2.activeTexture(gl2.TEXTURE0 + units[index]);
                    gl2.bindTexture(bindPoint, texture);
                  });
                };
              }
              typeMap[FLOAT] = {
                Type: Float32Array,
                size: 4,
                setter: floatSetter,
                arraySetter: floatArraySetter
              };
              typeMap[FLOAT_VEC2] = {
                Type: Float32Array,
                size: 8,
                setter: floatVec2Setter
              };
              typeMap[FLOAT_VEC3] = {
                Type: Float32Array,
                size: 12,
                setter: floatVec3Setter
              };
              typeMap[FLOAT_VEC4] = {
                Type: Float32Array,
                size: 16,
                setter: floatVec4Setter
              };
              typeMap[INT] = {
                Type: Int32Array,
                size: 4,
                setter: intSetter,
                arraySetter: intArraySetter
              };
              typeMap[INT_VEC2] = {
                Type: Int32Array,
                size: 8,
                setter: intVec2Setter
              };
              typeMap[INT_VEC3] = {
                Type: Int32Array,
                size: 12,
                setter: intVec3Setter
              };
              typeMap[INT_VEC4] = {
                Type: Int32Array,
                size: 16,
                setter: intVec4Setter
              };
              typeMap[UNSIGNED_INT] = {
                Type: Uint32Array,
                size: 4,
                setter: uintSetter,
                arraySetter: uintArraySetter
              };
              typeMap[UNSIGNED_INT_VEC2] = {
                Type: Uint32Array,
                size: 8,
                setter: uintVec2Setter
              };
              typeMap[UNSIGNED_INT_VEC3] = {
                Type: Uint32Array,
                size: 12,
                setter: uintVec3Setter
              };
              typeMap[UNSIGNED_INT_VEC4] = {
                Type: Uint32Array,
                size: 16,
                setter: uintVec4Setter
              };
              typeMap[BOOL] = {
                Type: Uint32Array,
                size: 4,
                setter: intSetter,
                arraySetter: intArraySetter
              };
              typeMap[BOOL_VEC2] = {
                Type: Uint32Array,
                size: 8,
                setter: intVec2Setter
              };
              typeMap[BOOL_VEC3] = {
                Type: Uint32Array,
                size: 12,
                setter: intVec3Setter
              };
              typeMap[BOOL_VEC4] = {
                Type: Uint32Array,
                size: 16,
                setter: intVec4Setter
              };
              typeMap[FLOAT_MAT2] = {
                Type: Float32Array,
                size: 16,
                setter: floatMat2Setter
              };
              typeMap[FLOAT_MAT3] = {
                Type: Float32Array,
                size: 36,
                setter: floatMat3Setter
              };
              typeMap[FLOAT_MAT4] = {
                Type: Float32Array,
                size: 64,
                setter: floatMat4Setter
              };
              typeMap[FLOAT_MAT2x3] = {
                Type: Float32Array,
                size: 24,
                setter: floatMat23Setter
              };
              typeMap[FLOAT_MAT2x4] = {
                Type: Float32Array,
                size: 32,
                setter: floatMat24Setter
              };
              typeMap[FLOAT_MAT3x2] = {
                Type: Float32Array,
                size: 24,
                setter: floatMat32Setter
              };
              typeMap[FLOAT_MAT3x4] = {
                Type: Float32Array,
                size: 48,
                setter: floatMat34Setter
              };
              typeMap[FLOAT_MAT4x2] = {
                Type: Float32Array,
                size: 32,
                setter: floatMat42Setter
              };
              typeMap[FLOAT_MAT4x3] = {
                Type: Float32Array,
                size: 48,
                setter: floatMat43Setter
              };
              typeMap[SAMPLER_2D] = {
                Type: null,
                size: 0,
                setter: samplerSetter,
                arraySetter: samplerArraySetter,
                bindPoint: TEXTURE_2D
              };
              typeMap[SAMPLER_CUBE] = {
                Type: null,
                size: 0,
                setter: samplerSetter,
                arraySetter: samplerArraySetter,
                bindPoint: TEXTURE_CUBE_MAP
              };
              typeMap[SAMPLER_3D] = {
                Type: null,
                size: 0,
                setter: samplerSetter,
                arraySetter: samplerArraySetter,
                bindPoint: TEXTURE_3D
              };
              typeMap[SAMPLER_2D_SHADOW] = {
                Type: null,
                size: 0,
                setter: samplerSetter,
                arraySetter: samplerArraySetter,
                bindPoint: TEXTURE_2D
              };
              typeMap[SAMPLER_2D_ARRAY] = {
                Type: null,
                size: 0,
                setter: samplerSetter,
                arraySetter: samplerArraySetter,
                bindPoint: TEXTURE_2D_ARRAY
              };
              typeMap[SAMPLER_2D_ARRAY_SHADOW] = {
                Type: null,
                size: 0,
                setter: samplerSetter,
                arraySetter: samplerArraySetter,
                bindPoint: TEXTURE_2D_ARRAY
              };
              typeMap[SAMPLER_CUBE_SHADOW] = {
                Type: null,
                size: 0,
                setter: samplerSetter,
                arraySetter: samplerArraySetter,
                bindPoint: TEXTURE_CUBE_MAP
              };
              typeMap[INT_SAMPLER_2D] = {
                Type: null,
                size: 0,
                setter: samplerSetter,
                arraySetter: samplerArraySetter,
                bindPoint: TEXTURE_2D
              };
              typeMap[INT_SAMPLER_3D] = {
                Type: null,
                size: 0,
                setter: samplerSetter,
                arraySetter: samplerArraySetter,
                bindPoint: TEXTURE_3D
              };
              typeMap[INT_SAMPLER_CUBE] = {
                Type: null,
                size: 0,
                setter: samplerSetter,
                arraySetter: samplerArraySetter,
                bindPoint: TEXTURE_CUBE_MAP
              };
              typeMap[INT_SAMPLER_2D_ARRAY] = {
                Type: null,
                size: 0,
                setter: samplerSetter,
                arraySetter: samplerArraySetter,
                bindPoint: TEXTURE_2D_ARRAY
              };
              typeMap[UNSIGNED_INT_SAMPLER_2D] = {
                Type: null,
                size: 0,
                setter: samplerSetter,
                arraySetter: samplerArraySetter,
                bindPoint: TEXTURE_2D
              };
              typeMap[UNSIGNED_INT_SAMPLER_3D] = {
                Type: null,
                size: 0,
                setter: samplerSetter,
                arraySetter: samplerArraySetter,
                bindPoint: TEXTURE_3D
              };
              typeMap[UNSIGNED_INT_SAMPLER_CUBE] = {
                Type: null,
                size: 0,
                setter: samplerSetter,
                arraySetter: samplerArraySetter,
                bindPoint: TEXTURE_CUBE_MAP
              };
              typeMap[UNSIGNED_INT_SAMPLER_2D_ARRAY] = {
                Type: null,
                size: 0,
                setter: samplerSetter,
                arraySetter: samplerArraySetter,
                bindPoint: TEXTURE_2D_ARRAY
              };
              function floatAttribSetter(gl2, index) {
                return function(b) {
                  gl2.bindBuffer(gl2.ARRAY_BUFFER, b.buffer);
                  gl2.enableVertexAttribArray(index);
                  gl2.vertexAttribPointer(index, b.numComponents || b.size, b.type || gl2.FLOAT, b.normalize || false, b.stride || 0, b.offset || 0);
                  if (b.divisor !== void 0) {
                    gl2.vertexAttribDivisor(index, b.divisor);
                  }
                };
              }
              function intAttribSetter(gl2, index) {
                return function(b) {
                  gl2.bindBuffer(gl2.ARRAY_BUFFER, b.buffer);
                  gl2.enableVertexAttribArray(index);
                  gl2.vertexAttribIPointer(index, b.numComponents || b.size, b.type || gl2.INT, b.stride || 0, b.offset || 0);
                  if (b.divisor !== void 0) {
                    gl2.vertexAttribDivisor(index, b.divisor);
                  }
                };
              }
              function matAttribSetter(gl2, index, typeInfo) {
                var defaultSize = typeInfo.size;
                var count = typeInfo.count;
                return function(b) {
                  gl2.bindBuffer(gl2.ARRAY_BUFFER, b.buffer);
                  var numComponents = b.size || b.numComponents || defaultSize;
                  var size = numComponents / count;
                  var type = b.type || gl2.FLOAT;
                  var typeInfo2 = typeMap[type];
                  var stride = typeInfo2.size * numComponents;
                  var normalize = b.normalize || false;
                  var offset = b.offset || 0;
                  var rowOffset = stride / count;
                  for (var i = 0; i < count; ++i) {
                    gl2.enableVertexAttribArray(index + i);
                    gl2.vertexAttribPointer(index + i, size, type, normalize, stride, offset + rowOffset * i);
                    if (b.divisor !== void 0) {
                      gl2.vertexAttribDivisor(index + i, b.divisor);
                    }
                  }
                };
              }
              var attrTypeMap = {};
              attrTypeMap[FLOAT] = {
                size: 4,
                setter: floatAttribSetter
              };
              attrTypeMap[FLOAT_VEC2] = {
                size: 8,
                setter: floatAttribSetter
              };
              attrTypeMap[FLOAT_VEC3] = {
                size: 12,
                setter: floatAttribSetter
              };
              attrTypeMap[FLOAT_VEC4] = {
                size: 16,
                setter: floatAttribSetter
              };
              attrTypeMap[INT] = {
                size: 4,
                setter: intAttribSetter
              };
              attrTypeMap[INT_VEC2] = {
                size: 8,
                setter: intAttribSetter
              };
              attrTypeMap[INT_VEC3] = {
                size: 12,
                setter: intAttribSetter
              };
              attrTypeMap[INT_VEC4] = {
                size: 16,
                setter: intAttribSetter
              };
              attrTypeMap[UNSIGNED_INT] = {
                size: 4,
                setter: intAttribSetter
              };
              attrTypeMap[UNSIGNED_INT_VEC2] = {
                size: 8,
                setter: intAttribSetter
              };
              attrTypeMap[UNSIGNED_INT_VEC3] = {
                size: 12,
                setter: intAttribSetter
              };
              attrTypeMap[UNSIGNED_INT_VEC4] = {
                size: 16,
                setter: intAttribSetter
              };
              attrTypeMap[BOOL] = {
                size: 4,
                setter: intAttribSetter
              };
              attrTypeMap[BOOL_VEC2] = {
                size: 8,
                setter: intAttribSetter
              };
              attrTypeMap[BOOL_VEC3] = {
                size: 12,
                setter: intAttribSetter
              };
              attrTypeMap[BOOL_VEC4] = {
                size: 16,
                setter: intAttribSetter
              };
              attrTypeMap[FLOAT_MAT2] = {
                size: 4,
                setter: matAttribSetter,
                count: 2
              };
              attrTypeMap[FLOAT_MAT3] = {
                size: 9,
                setter: matAttribSetter,
                count: 3
              };
              attrTypeMap[FLOAT_MAT4] = {
                size: 16,
                setter: matAttribSetter,
                count: 4
              };
              var gl = void 0;
              function addLineNumbers(src, lineOffset) {
                lineOffset = lineOffset || 0;
                ++lineOffset;
                return src.split("\n").map(function(line, ndx) {
                  return ndx + lineOffset + ": " + line;
                }).join("\n");
              }
              var spaceRE = /^[ \t]*\n/;
              function loadShader(gl2, shaderSource, shaderType, opt_errorCallback) {
                var errFn = opt_errorCallback || error;
                var shader = gl2.createShader(shaderType);
                var lineOffset = 0;
                if (spaceRE.test(shaderSource)) {
                  lineOffset = 1;
                  shaderSource = shaderSource.replace(spaceRE, "");
                }
                gl2.shaderSource(shader, shaderSource);
                gl2.compileShader(shader);
                var compiled = gl2.getShaderParameter(shader, gl2.COMPILE_STATUS);
                if (!compiled) {
                  var lastError = gl2.getShaderInfoLog(shader);
                  errFn(addLineNumbers(shaderSource, lineOffset) + "\n*** Error compiling shader: " + lastError);
                  gl2.deleteShader(shader);
                  return null;
                }
                return shader;
              }
              function getProgramOptions(opt_attribs, opt_locations, opt_errorCallback) {
                var transformFeedbackVaryings;
                if (typeof opt_locations === "function") {
                  opt_errorCallback = opt_locations;
                  opt_locations = void 0;
                }
                if (typeof opt_attribs === "function") {
                  opt_errorCallback = opt_attribs;
                  opt_attribs = void 0;
                } else if (opt_attribs && !Array.isArray(opt_attribs)) {
                  if (opt_attribs.errorCallback) {
                    return opt_attribs;
                  }
                  var opt = opt_attribs;
                  opt_errorCallback = opt.errorCallback;
                  opt_attribs = opt.attribLocations;
                  transformFeedbackVaryings = opt.transformFeedbackVaryings;
                }
                var options = {
                  errorCallback: opt_errorCallback || error,
                  transformFeedbackVaryings
                };
                if (opt_attribs) {
                  var attribLocations = {};
                  if (Array.isArray(opt_attribs)) {
                    opt_attribs.forEach(function(attrib, ndx) {
                      attribLocations[attrib] = opt_locations ? opt_locations[ndx] : ndx;
                    });
                  } else {
                    attribLocations = opt_attribs;
                  }
                  options.attribLocations = attribLocations;
                }
                return options;
              }
              var defaultShaderType = ["VERTEX_SHADER", "FRAGMENT_SHADER"];
              function getShaderTypeFromScriptType(scriptType) {
                if (scriptType.indexOf("frag") >= 0) {
                  return gl.FRAGMENT_SHADER;
                } else if (scriptType.indexOf("vert") >= 0) {
                  return gl.VERTEX_SHADER;
                }
                return void 0;
              }
              function deleteShaders(gl2, shaders) {
                shaders.forEach(function(shader) {
                  gl2.deleteShader(shader);
                });
              }
              function createProgram(gl2, shaders, opt_attribs, opt_locations, opt_errorCallback) {
                var progOptions = getProgramOptions(opt_attribs, opt_locations, opt_errorCallback);
                var realShaders = [];
                var newShaders = [];
                for (var ndx = 0; ndx < shaders.length; ++ndx) {
                  var shader = shaders[ndx];
                  if (typeof shader === "string") {
                    var elem = getElementById(shader);
                    var src = elem ? elem.text : shader;
                    var type = gl2[defaultShaderType[ndx]];
                    if (elem && elem.type) {
                      type = getShaderTypeFromScriptType(elem.type) || type;
                    }
                    shader = loadShader(gl2, src, type, progOptions.errorCallback);
                    newShaders.push(shader);
                  }
                  if (helper.isShader(gl2, shader)) {
                    realShaders.push(shader);
                  }
                }
                if (realShaders.length !== shaders.length) {
                  progOptions.errorCallback("not enough shaders for program");
                  deleteShaders(gl2, newShaders);
                  return null;
                }
                var program = gl2.createProgram();
                realShaders.forEach(function(shader2) {
                  gl2.attachShader(program, shader2);
                });
                if (progOptions.attribLocations) {
                  Object.keys(progOptions.attribLocations).forEach(function(attrib) {
                    gl2.bindAttribLocation(program, progOptions.attribLocations[attrib], attrib);
                  });
                }
                var varyings = progOptions.transformFeedbackVaryings;
                if (varyings) {
                  if (varyings.attribs) {
                    varyings = varyings.attribs;
                  }
                  if (!Array.isArray(varyings)) {
                    varyings = Object.keys(varyings);
                  }
                  gl2.transformFeedbackVaryings(program, varyings, progOptions.transformFeedbackMode || gl2.SEPARATE_ATTRIBS);
                }
                gl2.linkProgram(program);
                var linked = gl2.getProgramParameter(program, gl2.LINK_STATUS);
                if (!linked) {
                  var lastError = gl2.getProgramInfoLog(program);
                  progOptions.errorCallback("Error in program linking:" + lastError);
                  gl2.deleteProgram(program);
                  deleteShaders(gl2, newShaders);
                  return null;
                }
                return program;
              }
              function createShaderFromScript(gl2, scriptId, opt_shaderType, opt_errorCallback) {
                var shaderSource = "";
                var shaderScript = getElementById(scriptId);
                if (!shaderScript) {
                  throw "*** Error: unknown script element" + scriptId;
                }
                shaderSource = shaderScript.text;
                var shaderType = opt_shaderType || getShaderTypeFromScriptType(shaderScript.type);
                if (!shaderType) {
                  throw "*** Error: unknown shader type";
                }
                return loadShader(gl2, shaderSource, shaderType, opt_errorCallback);
              }
              function createProgramFromScripts(gl2, shaderScriptIds, opt_attribs, opt_locations, opt_errorCallback) {
                var progOptions = getProgramOptions(opt_attribs, opt_locations, opt_errorCallback);
                var shaders = [];
                for (var ii2 = 0; ii2 < shaderScriptIds.length; ++ii2) {
                  var shader = createShaderFromScript(gl2, shaderScriptIds[ii2], gl2[defaultShaderType[ii2]], progOptions.errorCallback);
                  if (!shader) {
                    return null;
                  }
                  shaders.push(shader);
                }
                return createProgram(gl2, shaders, progOptions);
              }
              function createProgramFromSources(gl2, shaderSources, opt_attribs, opt_locations, opt_errorCallback) {
                var progOptions = getProgramOptions(opt_attribs, opt_locations, opt_errorCallback);
                var shaders = [];
                for (var ii2 = 0; ii2 < shaderSources.length; ++ii2) {
                  var shader = loadShader(gl2, shaderSources[ii2], gl2[defaultShaderType[ii2]], progOptions.errorCallback);
                  if (!shader) {
                    return null;
                  }
                  shaders.push(shader);
                }
                return createProgram(gl2, shaders, progOptions);
              }
              function isBuiltIn(info) {
                var name = info.name;
                return name.startsWith("gl_") || name.startsWith("webgl_");
              }
              function createUniformSetters(gl2, program) {
                var textureUnit = 0;
                function createUniformSetter(program2, uniformInfo2) {
                  var location = gl2.getUniformLocation(program2, uniformInfo2.name);
                  var isArray = uniformInfo2.size > 1 && uniformInfo2.name.substr(-3) === "[0]";
                  var type = uniformInfo2.type;
                  var typeInfo = typeMap[type];
                  if (!typeInfo) {
                    throw "unknown type: 0x" + type.toString(16);
                  }
                  var setter2;
                  if (typeInfo.bindPoint) {
                    var unit = textureUnit;
                    textureUnit += uniformInfo2.size;
                    if (isArray) {
                      setter2 = typeInfo.arraySetter(gl2, type, unit, location, uniformInfo2.size);
                    } else {
                      setter2 = typeInfo.setter(gl2, type, unit, location, uniformInfo2.size);
                    }
                  } else {
                    if (typeInfo.arraySetter && isArray) {
                      setter2 = typeInfo.arraySetter(gl2, location);
                    } else {
                      setter2 = typeInfo.setter(gl2, location);
                    }
                  }
                  setter2.location = location;
                  return setter2;
                }
                var uniformSetters = {};
                var numUniforms = gl2.getProgramParameter(program, gl2.ACTIVE_UNIFORMS);
                for (var ii2 = 0; ii2 < numUniforms; ++ii2) {
                  var uniformInfo = gl2.getActiveUniform(program, ii2);
                  if (isBuiltIn(uniformInfo)) {
                    continue;
                  }
                  var name = uniformInfo.name;
                  if (name.substr(-3) === "[0]") {
                    name = name.substr(0, name.length - 3);
                  }
                  var setter = createUniformSetter(program, uniformInfo);
                  uniformSetters[name] = setter;
                }
                return uniformSetters;
              }
              function createTransformFeedbackInfo(gl2, program) {
                var info = {};
                var numVaryings = gl2.getProgramParameter(program, gl2.TRANSFORM_FEEDBACK_VARYINGS);
                for (var ii2 = 0; ii2 < numVaryings; ++ii2) {
                  var varying = gl2.getTransformFeedbackVarying(program, ii2);
                  info[varying.name] = {
                    index: ii2,
                    type: varying.type,
                    size: varying.size
                  };
                }
                return info;
              }
              function bindTransformFeedbackInfo(gl2, transformFeedbackInfo, bufferInfo) {
                if (transformFeedbackInfo.transformFeedbackInfo) {
                  transformFeedbackInfo = transformFeedbackInfo.transformFeedbackInfo;
                }
                if (bufferInfo.attribs) {
                  bufferInfo = bufferInfo.attribs;
                }
                for (var name in bufferInfo) {
                  var varying = transformFeedbackInfo[name];
                  if (varying) {
                    var buf = bufferInfo[name];
                    if (buf.offset) {
                      gl2.bindBufferRange(gl2.TRANSFORM_FEEDBACK_BUFFER, varying.index, buf.buffer, buf.offset, buf.size);
                    } else {
                      gl2.bindBufferBase(gl2.TRANSFORM_FEEDBACK_BUFFER, varying.index, buf.buffer);
                    }
                  }
                }
              }
              function unbindTransformFeedbackInfo(gl2, transformFeedbackInfo, bufferInfo) {
                if (transformFeedbackInfo.transformFeedbackInfo) {
                  transformFeedbackInfo = transformFeedbackInfo.transformFeedbackInfo;
                }
                if (bufferInfo.attribs) {
                  bufferInfo = bufferInfo.attribs;
                }
                for (var name in bufferInfo) {
                  var varying = transformFeedbackInfo[name];
                  if (varying) {
                    gl2.bindBufferBase(gl2.TRANSFORM_FEEDBACK_BUFFER, varying.index, null);
                  }
                }
              }
              function createTransformFeedback(gl2, programInfo, bufferInfo) {
                var tf = gl2.createTransformFeedback();
                gl2.bindTransformFeedback(gl2.TRANSFORM_FEEDBACK, tf);
                gl2.useProgram(programInfo.program);
                bindTransformFeedbackInfo(gl2, programInfo, bufferInfo);
                gl2.bindTransformFeedback(gl2.TRANSFORM_FEEDBACK, null);
                unbindTransformFeedbackInfo(gl2, programInfo, bufferInfo);
                return tf;
              }
              function createUniformBlockSpecFromProgram(gl2, program) {
                var numUniforms = gl2.getProgramParameter(program, gl2.ACTIVE_UNIFORMS);
                var uniformData = [];
                var uniformIndices = [];
                for (var ii2 = 0; ii2 < numUniforms; ++ii2) {
                  uniformIndices.push(ii2);
                  uniformData.push({});
                  var uniformInfo = gl2.getActiveUniform(program, ii2);
                  if (isBuiltIn(uniformInfo)) {
                    break;
                  }
                  uniformData[ii2].name = uniformInfo.name;
                }
                [
                  ["UNIFORM_TYPE", "type"],
                  ["UNIFORM_SIZE", "size"],
                  ["UNIFORM_BLOCK_INDEX", "blockNdx"],
                  ["UNIFORM_OFFSET", "offset"]
                ].forEach(function(pair) {
                  var pname = pair[0];
                  var key = pair[1];
                  gl2.getActiveUniforms(program, uniformIndices, gl2[pname]).forEach(function(value, ndx) {
                    uniformData[ndx][key] = value;
                  });
                });
                var blockSpecs = {};
                var numUniformBlocks = gl2.getProgramParameter(program, gl2.ACTIVE_UNIFORM_BLOCKS);
                for (var _ii = 0; _ii < numUniformBlocks; ++_ii) {
                  var name = gl2.getActiveUniformBlockName(program, _ii);
                  var blockSpec = {
                    index: _ii,
                    usedByVertexShader: gl2.getActiveUniformBlockParameter(program, _ii, gl2.UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER),
                    usedByFragmentShader: gl2.getActiveUniformBlockParameter(program, _ii, gl2.UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER),
                    size: gl2.getActiveUniformBlockParameter(program, _ii, gl2.UNIFORM_BLOCK_DATA_SIZE),
                    uniformIndices: gl2.getActiveUniformBlockParameter(program, _ii, gl2.UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES)
                  };
                  blockSpec.used = blockSpec.usedByVertexSahder || blockSpec.usedByFragmentShader;
                  blockSpecs[name] = blockSpec;
                }
                return {
                  blockSpecs,
                  uniformData
                };
              }
              var arraySuffixRE = /\[\d+\]\.$/;
              function createUniformBlockInfoFromProgram(gl2, program, uniformBlockSpec, blockName) {
                var blockSpecs = uniformBlockSpec.blockSpecs;
                var uniformData = uniformBlockSpec.uniformData;
                var blockSpec = blockSpecs[blockName];
                if (!blockSpec) {
                  warn("no uniform block object named:", blockName);
                  return {
                    name: blockName,
                    uniforms: {}
                  };
                }
                var array = new ArrayBuffer(blockSpec.size);
                var buffer = gl2.createBuffer();
                var uniformBufferIndex = blockSpec.index;
                gl2.bindBuffer(gl2.UNIFORM_BUFFER, buffer);
                gl2.uniformBlockBinding(program, blockSpec.index, uniformBufferIndex);
                var prefix = blockName + ".";
                if (arraySuffixRE.test(prefix)) {
                  prefix = prefix.replace(arraySuffixRE, ".");
                }
                var uniforms = {};
                blockSpec.uniformIndices.forEach(function(uniformNdx) {
                  var data = uniformData[uniformNdx];
                  var typeInfo = typeMap[data.type];
                  var Type = typeInfo.Type;
                  var length2 = data.size * typeInfo.size;
                  var name = data.name;
                  if (name.substr(0, prefix.length) === prefix) {
                    name = name.substr(prefix.length);
                  }
                  uniforms[name] = new Type(array, data.offset, length2 / Type.BYTES_PER_ELEMENT);
                });
                return {
                  name: blockName,
                  array,
                  asFloat: new Float32Array(array),
                  buffer,
                  uniforms
                };
              }
              function createUniformBlockInfo(gl2, programInfo, blockName) {
                return createUniformBlockInfoFromProgram(gl2, programInfo.program, programInfo.uniformBlockSpec, blockName);
              }
              function bindUniformBlock(gl2, programInfo, uniformBlockInfo) {
                var uniformBlockSpec = programInfo.uniformBlockSpec || programInfo;
                var blockSpec = uniformBlockSpec.blockSpecs[uniformBlockInfo.name];
                if (blockSpec) {
                  var bufferBindIndex = blockSpec.index;
                  gl2.bindBufferRange(gl2.UNIFORM_BUFFER, bufferBindIndex, uniformBlockInfo.buffer, uniformBlockInfo.offset || 0, uniformBlockInfo.array.byteLength);
                  return true;
                }
                return false;
              }
              function setUniformBlock(gl2, programInfo, uniformBlockInfo) {
                if (bindUniformBlock(gl2, programInfo, uniformBlockInfo)) {
                  gl2.bufferData(gl2.UNIFORM_BUFFER, uniformBlockInfo.array, gl2.DYNAMIC_DRAW);
                }
              }
              function setBlockUniforms(uniformBlockInfo, values) {
                var uniforms = uniformBlockInfo.uniforms;
                for (var name in values) {
                  var array = uniforms[name];
                  if (array) {
                    var value = values[name];
                    if (value.length) {
                      array.set(value);
                    } else {
                      array[0] = value;
                    }
                  }
                }
              }
              function setUniforms(setters, values) {
                var actualSetters = setters.uniformSetters || setters;
                var numArgs = arguments.length;
                for (var andx = 1; andx < numArgs; ++andx) {
                  var vals = arguments[andx];
                  if (Array.isArray(vals)) {
                    var numValues = vals.length;
                    for (var ii2 = 0; ii2 < numValues; ++ii2) {
                      setUniforms(actualSetters, vals[ii2]);
                    }
                  } else {
                    for (var name in vals) {
                      var setter = actualSetters[name];
                      if (setter) {
                        setter(vals[name]);
                      }
                    }
                  }
                }
              }
              function createAttributeSetters(gl2, program) {
                var attribSetters = {};
                var numAttribs = gl2.getProgramParameter(program, gl2.ACTIVE_ATTRIBUTES);
                for (var ii2 = 0; ii2 < numAttribs; ++ii2) {
                  var attribInfo = gl2.getActiveAttrib(program, ii2);
                  if (isBuiltIn(attribInfo)) {
                    continue;
                  }
                  var index = gl2.getAttribLocation(program, attribInfo.name);
                  var typeInfo = attrTypeMap[attribInfo.type];
                  var setter = typeInfo.setter(gl2, index, typeInfo);
                  setter.location = index;
                  attribSetters[attribInfo.name] = setter;
                }
                return attribSetters;
              }
              function setAttributes(setters, buffers) {
                for (var name in buffers) {
                  var setter = setters[name];
                  if (setter) {
                    setter(buffers[name]);
                  }
                }
              }
              function setBuffersAndAttributes(gl2, programInfo, buffers) {
                if (buffers.vertexArrayObject) {
                  gl2.bindVertexArray(buffers.vertexArrayObject);
                } else {
                  setAttributes(programInfo.attribSetters || programInfo, buffers.attribs);
                  if (buffers.indices) {
                    gl2.bindBuffer(gl2.ELEMENT_ARRAY_BUFFER, buffers.indices);
                  }
                }
              }
              function createProgramInfoFromProgram(gl2, program) {
                var uniformSetters = createUniformSetters(gl2, program);
                var attribSetters = createAttributeSetters(gl2, program);
                var programInfo = {
                  program,
                  uniformSetters,
                  attribSetters
                };
                if (utils.isWebGL2(gl2)) {
                  programInfo.uniformBlockSpec = createUniformBlockSpecFromProgram(gl2, program);
                  programInfo.transformFeedbackInfo = createTransformFeedbackInfo(gl2, program);
                }
                return programInfo;
              }
              function createProgramInfo(gl2, shaderSources, opt_attribs, opt_locations, opt_errorCallback) {
                var progOptions = getProgramOptions(opt_attribs, opt_locations, opt_errorCallback);
                var good = true;
                shaderSources = shaderSources.map(function(source) {
                  if (source.indexOf("\n") < 0) {
                    var script = getElementById(source);
                    if (!script) {
                      progOptions.errorCallback("no element with id: " + source);
                      good = false;
                    } else {
                      source = script.text;
                    }
                  }
                  return source;
                });
                if (!good) {
                  return null;
                }
                var program = createProgramFromSources(gl2, shaderSources, progOptions);
                if (!program) {
                  return null;
                }
                return createProgramInfoFromProgram(gl2, program);
              }
            }),
            (function(module2, exports2, __webpack_require__) {
              "use strict";
              exports2.__esModule = true;
              exports2.axisRotate = axisRotate;
              exports2.axisRotation = axisRotation;
              exports2.copy = copy;
              exports2.frustum = frustum;
              exports2.getAxis = getAxis;
              exports2.getTranslation = getTranslation;
              exports2.identity = identity;
              exports2.inverse = inverse;
              exports2.lookAt = lookAt;
              exports2.multiply = multiply;
              exports2.negate = negate;
              exports2.ortho = ortho;
              exports2.perspective = perspective;
              exports2.rotateX = rotateX;
              exports2.rotateY = rotateY;
              exports2.rotateZ = rotateZ;
              exports2.rotationX = rotationX;
              exports2.rotationY = rotationY;
              exports2.rotationZ = rotationZ;
              exports2.scale = scale;
              exports2.scaling = scaling;
              exports2.setAxis = setAxis;
              exports2.setDefaultType = setDefaultType;
              exports2.setTranslation = setTranslation;
              exports2.transformDirection = transformDirection;
              exports2.transformNormal = transformNormal;
              exports2.transformPoint = transformPoint;
              exports2.translate = translate;
              exports2.translation = translation;
              exports2.transpose = transpose;
              var v3 = _interopRequireWildcard(__webpack_require__(3));
              function _interopRequireWildcard(obj) {
                if (obj && obj.__esModule) {
                  return obj;
                } else {
                  var newObj = {};
                  if (obj != null) {
                    for (var key in obj) {
                      if (Object.prototype.hasOwnProperty.call(obj, key)) {
                        var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};
                        if (desc.get || desc.set) {
                          Object.defineProperty(newObj, key, desc);
                        } else {
                          newObj[key] = obj[key];
                        }
                      }
                    }
                  }
                  newObj.default = obj;
                  return newObj;
                }
              }
              var MatType = Float32Array;
              var tempV3a = v3.create();
              var tempV3b = v3.create();
              var tempV3c = v3.create();
              function setDefaultType(ctor) {
                var oldType = MatType;
                MatType = ctor;
                return oldType;
              }
              function negate(m, dst) {
                dst = dst || new MatType(16);
                dst[0] = -m[0];
                dst[1] = -m[1];
                dst[2] = -m[2];
                dst[3] = -m[3];
                dst[4] = -m[4];
                dst[5] = -m[5];
                dst[6] = -m[6];
                dst[7] = -m[7];
                dst[8] = -m[8];
                dst[9] = -m[9];
                dst[10] = -m[10];
                dst[11] = -m[11];
                dst[12] = -m[12];
                dst[13] = -m[13];
                dst[14] = -m[14];
                dst[15] = -m[15];
                return dst;
              }
              function copy(m, dst) {
                dst = dst || new MatType(16);
                dst[0] = m[0];
                dst[1] = m[1];
                dst[2] = m[2];
                dst[3] = m[3];
                dst[4] = m[4];
                dst[5] = m[5];
                dst[6] = m[6];
                dst[7] = m[7];
                dst[8] = m[8];
                dst[9] = m[9];
                dst[10] = m[10];
                dst[11] = m[11];
                dst[12] = m[12];
                dst[13] = m[13];
                dst[14] = m[14];
                dst[15] = m[15];
                return dst;
              }
              function identity(dst) {
                dst = dst || new MatType(16);
                dst[0] = 1;
                dst[1] = 0;
                dst[2] = 0;
                dst[3] = 0;
                dst[4] = 0;
                dst[5] = 1;
                dst[6] = 0;
                dst[7] = 0;
                dst[8] = 0;
                dst[9] = 0;
                dst[10] = 1;
                dst[11] = 0;
                dst[12] = 0;
                dst[13] = 0;
                dst[14] = 0;
                dst[15] = 1;
                return dst;
              }
              function transpose(m, dst) {
                dst = dst || new MatType(16);
                if (dst === m) {
                  var t;
                  t = m[1];
                  m[1] = m[4];
                  m[4] = t;
                  t = m[2];
                  m[2] = m[8];
                  m[8] = t;
                  t = m[3];
                  m[3] = m[12];
                  m[12] = t;
                  t = m[6];
                  m[6] = m[9];
                  m[9] = t;
                  t = m[7];
                  m[7] = m[13];
                  m[13] = t;
                  t = m[11];
                  m[11] = m[14];
                  m[14] = t;
                  return dst;
                }
                var m00 = m[0 * 4 + 0];
                var m01 = m[0 * 4 + 1];
                var m02 = m[0 * 4 + 2];
                var m03 = m[0 * 4 + 3];
                var m10 = m[1 * 4 + 0];
                var m11 = m[1 * 4 + 1];
                var m12 = m[1 * 4 + 2];
                var m13 = m[1 * 4 + 3];
                var m20 = m[2 * 4 + 0];
                var m21 = m[2 * 4 + 1];
                var m22 = m[2 * 4 + 2];
                var m23 = m[2 * 4 + 3];
                var m30 = m[3 * 4 + 0];
                var m31 = m[3 * 4 + 1];
                var m32 = m[3 * 4 + 2];
                var m33 = m[3 * 4 + 3];
                dst[0] = m00;
                dst[1] = m10;
                dst[2] = m20;
                dst[3] = m30;
                dst[4] = m01;
                dst[5] = m11;
                dst[6] = m21;
                dst[7] = m31;
                dst[8] = m02;
                dst[9] = m12;
                dst[10] = m22;
                dst[11] = m32;
                dst[12] = m03;
                dst[13] = m13;
                dst[14] = m23;
                dst[15] = m33;
                return dst;
              }
              function inverse(m, dst) {
                dst = dst || new MatType(16);
                var m00 = m[0 * 4 + 0];
                var m01 = m[0 * 4 + 1];
                var m02 = m[0 * 4 + 2];
                var m03 = m[0 * 4 + 3];
                var m10 = m[1 * 4 + 0];
                var m11 = m[1 * 4 + 1];
                var m12 = m[1 * 4 + 2];
                var m13 = m[1 * 4 + 3];
                var m20 = m[2 * 4 + 0];
                var m21 = m[2 * 4 + 1];
                var m22 = m[2 * 4 + 2];
                var m23 = m[2 * 4 + 3];
                var m30 = m[3 * 4 + 0];
                var m31 = m[3 * 4 + 1];
                var m32 = m[3 * 4 + 2];
                var m33 = m[3 * 4 + 3];
                var tmp_0 = m22 * m33;
                var tmp_1 = m32 * m23;
                var tmp_2 = m12 * m33;
                var tmp_3 = m32 * m13;
                var tmp_4 = m12 * m23;
                var tmp_5 = m22 * m13;
                var tmp_6 = m02 * m33;
                var tmp_7 = m32 * m03;
                var tmp_8 = m02 * m23;
                var tmp_9 = m22 * m03;
                var tmp_10 = m02 * m13;
                var tmp_11 = m12 * m03;
                var tmp_12 = m20 * m31;
                var tmp_13 = m30 * m21;
                var tmp_14 = m10 * m31;
                var tmp_15 = m30 * m11;
                var tmp_16 = m10 * m21;
                var tmp_17 = m20 * m11;
                var tmp_18 = m00 * m31;
                var tmp_19 = m30 * m01;
                var tmp_20 = m00 * m21;
                var tmp_21 = m20 * m01;
                var tmp_22 = m00 * m11;
                var tmp_23 = m10 * m01;
                var t0 = tmp_0 * m11 + tmp_3 * m21 + tmp_4 * m31 - (tmp_1 * m11 + tmp_2 * m21 + tmp_5 * m31);
                var t1 = tmp_1 * m01 + tmp_6 * m21 + tmp_9 * m31 - (tmp_0 * m01 + tmp_7 * m21 + tmp_8 * m31);
                var t2 = tmp_2 * m01 + tmp_7 * m11 + tmp_10 * m31 - (tmp_3 * m01 + tmp_6 * m11 + tmp_11 * m31);
                var t3 = tmp_5 * m01 + tmp_8 * m11 + tmp_11 * m21 - (tmp_4 * m01 + tmp_9 * m11 + tmp_10 * m21);
                var d = 1 / (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3);
                dst[0] = d * t0;
                dst[1] = d * t1;
                dst[2] = d * t2;
                dst[3] = d * t3;
                dst[4] = d * (tmp_1 * m10 + tmp_2 * m20 + tmp_5 * m30 - (tmp_0 * m10 + tmp_3 * m20 + tmp_4 * m30));
                dst[5] = d * (tmp_0 * m00 + tmp_7 * m20 + tmp_8 * m30 - (tmp_1 * m00 + tmp_6 * m20 + tmp_9 * m30));
                dst[6] = d * (tmp_3 * m00 + tmp_6 * m10 + tmp_11 * m30 - (tmp_2 * m00 + tmp_7 * m10 + tmp_10 * m30));
                dst[7] = d * (tmp_4 * m00 + tmp_9 * m10 + tmp_10 * m20 - (tmp_5 * m00 + tmp_8 * m10 + tmp_11 * m20));
                dst[8] = d * (tmp_12 * m13 + tmp_15 * m23 + tmp_16 * m33 - (tmp_13 * m13 + tmp_14 * m23 + tmp_17 * m33));
                dst[9] = d * (tmp_13 * m03 + tmp_18 * m23 + tmp_21 * m33 - (tmp_12 * m03 + tmp_19 * m23 + tmp_20 * m33));
                dst[10] = d * (tmp_14 * m03 + tmp_19 * m13 + tmp_22 * m33 - (tmp_15 * m03 + tmp_18 * m13 + tmp_23 * m33));
                dst[11] = d * (tmp_17 * m03 + tmp_20 * m13 + tmp_23 * m23 - (tmp_16 * m03 + tmp_21 * m13 + tmp_22 * m23));
                dst[12] = d * (tmp_14 * m22 + tmp_17 * m32 + tmp_13 * m12 - (tmp_16 * m32 + tmp_12 * m12 + tmp_15 * m22));
                dst[13] = d * (tmp_20 * m32 + tmp_12 * m02 + tmp_19 * m22 - (tmp_18 * m22 + tmp_21 * m32 + tmp_13 * m02));
                dst[14] = d * (tmp_18 * m12 + tmp_23 * m32 + tmp_15 * m02 - (tmp_22 * m32 + tmp_14 * m02 + tmp_19 * m12));
                dst[15] = d * (tmp_22 * m22 + tmp_16 * m02 + tmp_21 * m12 - (tmp_20 * m12 + tmp_23 * m22 + tmp_17 * m02));
                return dst;
              }
              function multiply(a, b, dst) {
                dst = dst || new MatType(16);
                var a00 = a[0];
                var a01 = a[1];
                var a02 = a[2];
                var a03 = a[3];
                var a10 = a[4 + 0];
                var a11 = a[4 + 1];
                var a12 = a[4 + 2];
                var a13 = a[4 + 3];
                var a20 = a[8 + 0];
                var a21 = a[8 + 1];
                var a22 = a[8 + 2];
                var a23 = a[8 + 3];
                var a30 = a[12 + 0];
                var a31 = a[12 + 1];
                var a32 = a[12 + 2];
                var a33 = a[12 + 3];
                var b00 = b[0];
                var b01 = b[1];
                var b02 = b[2];
                var b03 = b[3];
                var b10 = b[4 + 0];
                var b11 = b[4 + 1];
                var b12 = b[4 + 2];
                var b13 = b[4 + 3];
                var b20 = b[8 + 0];
                var b21 = b[8 + 1];
                var b22 = b[8 + 2];
                var b23 = b[8 + 3];
                var b30 = b[12 + 0];
                var b31 = b[12 + 1];
                var b32 = b[12 + 2];
                var b33 = b[12 + 3];
                dst[0] = a00 * b00 + a10 * b01 + a20 * b02 + a30 * b03;
                dst[1] = a01 * b00 + a11 * b01 + a21 * b02 + a31 * b03;
                dst[2] = a02 * b00 + a12 * b01 + a22 * b02 + a32 * b03;
                dst[3] = a03 * b00 + a13 * b01 + a23 * b02 + a33 * b03;
                dst[4] = a00 * b10 + a10 * b11 + a20 * b12 + a30 * b13;
                dst[5] = a01 * b10 + a11 * b11 + a21 * b12 + a31 * b13;
                dst[6] = a02 * b10 + a12 * b11 + a22 * b12 + a32 * b13;
                dst[7] = a03 * b10 + a13 * b11 + a23 * b12 + a33 * b13;
                dst[8] = a00 * b20 + a10 * b21 + a20 * b22 + a30 * b23;
                dst[9] = a01 * b20 + a11 * b21 + a21 * b22 + a31 * b23;
                dst[10] = a02 * b20 + a12 * b21 + a22 * b22 + a32 * b23;
                dst[11] = a03 * b20 + a13 * b21 + a23 * b22 + a33 * b23;
                dst[12] = a00 * b30 + a10 * b31 + a20 * b32 + a30 * b33;
                dst[13] = a01 * b30 + a11 * b31 + a21 * b32 + a31 * b33;
                dst[14] = a02 * b30 + a12 * b31 + a22 * b32 + a32 * b33;
                dst[15] = a03 * b30 + a13 * b31 + a23 * b32 + a33 * b33;
                return dst;
              }
              function setTranslation(a, v, dst) {
                dst = dst || identity();
                if (a !== dst) {
                  dst[0] = a[0];
                  dst[1] = a[1];
                  dst[2] = a[2];
                  dst[3] = a[3];
                  dst[4] = a[4];
                  dst[5] = a[5];
                  dst[6] = a[6];
                  dst[7] = a[7];
                  dst[8] = a[8];
                  dst[9] = a[9];
                  dst[10] = a[10];
                  dst[11] = a[11];
                }
                dst[12] = v[0];
                dst[13] = v[1];
                dst[14] = v[2];
                dst[15] = 1;
                return dst;
              }
              function getTranslation(m, dst) {
                dst = dst || v3.create();
                dst[0] = m[12];
                dst[1] = m[13];
                dst[2] = m[14];
                return dst;
              }
              function getAxis(m, axis, dst) {
                dst = dst || v3.create();
                var off = axis * 4;
                dst[0] = m[off + 0];
                dst[1] = m[off + 1];
                dst[2] = m[off + 2];
                return dst;
              }
              function setAxis(a, v, axis, dst) {
                if (dst !== a) {
                  dst = copy(a, dst);
                }
                var off = axis * 4;
                dst[off + 0] = v[0];
                dst[off + 1] = v[1];
                dst[off + 2] = v[2];
                return dst;
              }
              function perspective(fieldOfViewYInRadians, aspect, zNear, zFar, dst) {
                dst = dst || new MatType(16);
                var f = Math.tan(Math.PI * 0.5 - 0.5 * fieldOfViewYInRadians);
                var rangeInv = 1 / (zNear - zFar);
                dst[0] = f / aspect;
                dst[1] = 0;
                dst[2] = 0;
                dst[3] = 0;
                dst[4] = 0;
                dst[5] = f;
                dst[6] = 0;
                dst[7] = 0;
                dst[8] = 0;
                dst[9] = 0;
                dst[10] = (zNear + zFar) * rangeInv;
                dst[11] = -1;
                dst[12] = 0;
                dst[13] = 0;
                dst[14] = zNear * zFar * rangeInv * 2;
                dst[15] = 0;
                return dst;
              }
              function ortho(left, right, bottom, top, near, far, dst) {
                dst = dst || new MatType(16);
                dst[0] = 2 / (right - left);
                dst[1] = 0;
                dst[2] = 0;
                dst[3] = 0;
                dst[4] = 0;
                dst[5] = 2 / (top - bottom);
                dst[6] = 0;
                dst[7] = 0;
                dst[8] = 0;
                dst[9] = 0;
                dst[10] = 2 / (near - far);
                dst[11] = 0;
                dst[12] = (right + left) / (left - right);
                dst[13] = (top + bottom) / (bottom - top);
                dst[14] = (far + near) / (near - far);
                dst[15] = 1;
                return dst;
              }
              function frustum(left, right, bottom, top, near, far, dst) {
                dst = dst || new MatType(16);
                var dx = right - left;
                var dy = top - bottom;
                var dz = near - far;
                dst[0] = 2 * near / dx;
                dst[1] = 0;
                dst[2] = 0;
                dst[3] = 0;
                dst[4] = 0;
                dst[5] = 2 * near / dy;
                dst[6] = 0;
                dst[7] = 0;
                dst[8] = (left + right) / dx;
                dst[9] = (top + bottom) / dy;
                dst[10] = far / dz;
                dst[11] = -1;
                dst[12] = 0;
                dst[13] = 0;
                dst[14] = near * far / dz;
                dst[15] = 0;
                return dst;
              }
              function lookAt(eye, target, up, dst) {
                dst = dst || new MatType(16);
                var xAxis = tempV3a;
                var yAxis = tempV3b;
                var zAxis = tempV3c;
                v3.normalize(v3.subtract(eye, target, zAxis), zAxis);
                v3.normalize(v3.cross(up, zAxis, xAxis), xAxis);
                v3.normalize(v3.cross(zAxis, xAxis, yAxis), yAxis);
                dst[0] = xAxis[0];
                dst[1] = xAxis[1];
                dst[2] = xAxis[2];
                dst[3] = 0;
                dst[4] = yAxis[0];
                dst[5] = yAxis[1];
                dst[6] = yAxis[2];
                dst[7] = 0;
                dst[8] = zAxis[0];
                dst[9] = zAxis[1];
                dst[10] = zAxis[2];
                dst[11] = 0;
                dst[12] = eye[0];
                dst[13] = eye[1];
                dst[14] = eye[2];
                dst[15] = 1;
                return dst;
              }
              function translation(v, dst) {
                dst = dst || new MatType(16);
                dst[0] = 1;
                dst[1] = 0;
                dst[2] = 0;
                dst[3] = 0;
                dst[4] = 0;
                dst[5] = 1;
                dst[6] = 0;
                dst[7] = 0;
                dst[8] = 0;
                dst[9] = 0;
                dst[10] = 1;
                dst[11] = 0;
                dst[12] = v[0];
                dst[13] = v[1];
                dst[14] = v[2];
                dst[15] = 1;
                return dst;
              }
              function translate(m, v, dst) {
                dst = dst || new MatType(16);
                var v0 = v[0];
                var v1 = v[1];
                var v2 = v[2];
                var m00 = m[0];
                var m01 = m[1];
                var m02 = m[2];
                var m03 = m[3];
                var m10 = m[1 * 4 + 0];
                var m11 = m[1 * 4 + 1];
                var m12 = m[1 * 4 + 2];
                var m13 = m[1 * 4 + 3];
                var m20 = m[2 * 4 + 0];
                var m21 = m[2 * 4 + 1];
                var m22 = m[2 * 4 + 2];
                var m23 = m[2 * 4 + 3];
                var m30 = m[3 * 4 + 0];
                var m31 = m[3 * 4 + 1];
                var m32 = m[3 * 4 + 2];
                var m33 = m[3 * 4 + 3];
                if (m !== dst) {
                  dst[0] = m00;
                  dst[1] = m01;
                  dst[2] = m02;
                  dst[3] = m03;
                  dst[4] = m10;
                  dst[5] = m11;
                  dst[6] = m12;
                  dst[7] = m13;
                  dst[8] = m20;
                  dst[9] = m21;
                  dst[10] = m22;
                  dst[11] = m23;
                }
                dst[12] = m00 * v0 + m10 * v1 + m20 * v2 + m30;
                dst[13] = m01 * v0 + m11 * v1 + m21 * v2 + m31;
                dst[14] = m02 * v0 + m12 * v1 + m22 * v2 + m32;
                dst[15] = m03 * v0 + m13 * v1 + m23 * v2 + m33;
                return dst;
              }
              function rotationX(angleInRadians, dst) {
                dst = dst || new MatType(16);
                var c = Math.cos(angleInRadians);
                var s = Math.sin(angleInRadians);
                dst[0] = 1;
                dst[1] = 0;
                dst[2] = 0;
                dst[3] = 0;
                dst[4] = 0;
                dst[5] = c;
                dst[6] = s;
                dst[7] = 0;
                dst[8] = 0;
                dst[9] = -s;
                dst[10] = c;
                dst[11] = 0;
                dst[12] = 0;
                dst[13] = 0;
                dst[14] = 0;
                dst[15] = 1;
                return dst;
              }
              function rotateX(m, angleInRadians, dst) {
                dst = dst || new MatType(16);
                var m10 = m[4];
                var m11 = m[5];
                var m12 = m[6];
                var m13 = m[7];
                var m20 = m[8];
                var m21 = m[9];
                var m22 = m[10];
                var m23 = m[11];
                var c = Math.cos(angleInRadians);
                var s = Math.sin(angleInRadians);
                dst[4] = c * m10 + s * m20;
                dst[5] = c * m11 + s * m21;
                dst[6] = c * m12 + s * m22;
                dst[7] = c * m13 + s * m23;
                dst[8] = c * m20 - s * m10;
                dst[9] = c * m21 - s * m11;
                dst[10] = c * m22 - s * m12;
                dst[11] = c * m23 - s * m13;
                if (m !== dst) {
                  dst[0] = m[0];
                  dst[1] = m[1];
                  dst[2] = m[2];
                  dst[3] = m[3];
                  dst[12] = m[12];
                  dst[13] = m[13];
                  dst[14] = m[14];
                  dst[15] = m[15];
                }
                return dst;
              }
              function rotationY(angleInRadians, dst) {
                dst = dst || new MatType(16);
                var c = Math.cos(angleInRadians);
                var s = Math.sin(angleInRadians);
                dst[0] = c;
                dst[1] = 0;
                dst[2] = -s;
                dst[3] = 0;
                dst[4] = 0;
                dst[5] = 1;
                dst[6] = 0;
                dst[7] = 0;
                dst[8] = s;
                dst[9] = 0;
                dst[10] = c;
                dst[11] = 0;
                dst[12] = 0;
                dst[13] = 0;
                dst[14] = 0;
                dst[15] = 1;
                return dst;
              }
              function rotateY(m, angleInRadians, dst) {
                dst = dst || new MatType(16);
                var m00 = m[0 * 4 + 0];
                var m01 = m[0 * 4 + 1];
                var m02 = m[0 * 4 + 2];
                var m03 = m[0 * 4 + 3];
                var m20 = m[2 * 4 + 0];
                var m21 = m[2 * 4 + 1];
                var m22 = m[2 * 4 + 2];
                var m23 = m[2 * 4 + 3];
                var c = Math.cos(angleInRadians);
                var s = Math.sin(angleInRadians);
                dst[0] = c * m00 - s * m20;
                dst[1] = c * m01 - s * m21;
                dst[2] = c * m02 - s * m22;
                dst[3] = c * m03 - s * m23;
                dst[8] = c * m20 + s * m00;
                dst[9] = c * m21 + s * m01;
                dst[10] = c * m22 + s * m02;
                dst[11] = c * m23 + s * m03;
                if (m !== dst) {
                  dst[4] = m[4];
                  dst[5] = m[5];
                  dst[6] = m[6];
                  dst[7] = m[7];
                  dst[12] = m[12];
                  dst[13] = m[13];
                  dst[14] = m[14];
                  dst[15] = m[15];
                }
                return dst;
              }
              function rotationZ(angleInRadians, dst) {
                dst = dst || new MatType(16);
                var c = Math.cos(angleInRadians);
                var s = Math.sin(angleInRadians);
                dst[0] = c;
                dst[1] = s;
                dst[2] = 0;
                dst[3] = 0;
                dst[4] = -s;
                dst[5] = c;
                dst[6] = 0;
                dst[7] = 0;
                dst[8] = 0;
                dst[9] = 0;
                dst[10] = 1;
                dst[11] = 0;
                dst[12] = 0;
                dst[13] = 0;
                dst[14] = 0;
                dst[15] = 1;
                return dst;
              }
              function rotateZ(m, angleInRadians, dst) {
                dst = dst || new MatType(16);
                var m00 = m[0 * 4 + 0];
                var m01 = m[0 * 4 + 1];
                var m02 = m[0 * 4 + 2];
                var m03 = m[0 * 4 + 3];
                var m10 = m[1 * 4 + 0];
                var m11 = m[1 * 4 + 1];
                var m12 = m[1 * 4 + 2];
                var m13 = m[1 * 4 + 3];
                var c = Math.cos(angleInRadians);
                var s = Math.sin(angleInRadians);
                dst[0] = c * m00 + s * m10;
                dst[1] = c * m01 + s * m11;
                dst[2] = c * m02 + s * m12;
                dst[3] = c * m03 + s * m13;
                dst[4] = c * m10 - s * m00;
                dst[5] = c * m11 - s * m01;
                dst[6] = c * m12 - s * m02;
                dst[7] = c * m13 - s * m03;
                if (m !== dst) {
                  dst[8] = m[8];
                  dst[9] = m[9];
                  dst[10] = m[10];
                  dst[11] = m[11];
                  dst[12] = m[12];
                  dst[13] = m[13];
                  dst[14] = m[14];
                  dst[15] = m[15];
                }
                return dst;
              }
              function axisRotation(axis, angleInRadians, dst) {
                dst = dst || new MatType(16);
                var x = axis[0];
                var y = axis[1];
                var z = axis[2];
                var n = Math.sqrt(x * x + y * y + z * z);
                x /= n;
                y /= n;
                z /= n;
                var xx = x * x;
                var yy = y * y;
                var zz = z * z;
                var c = Math.cos(angleInRadians);
                var s = Math.sin(angleInRadians);
                var oneMinusCosine = 1 - c;
                dst[0] = xx + (1 - xx) * c;
                dst[1] = x * y * oneMinusCosine + z * s;
                dst[2] = x * z * oneMinusCosine - y * s;
                dst[3] = 0;
                dst[4] = x * y * oneMinusCosine - z * s;
                dst[5] = yy + (1 - yy) * c;
                dst[6] = y * z * oneMinusCosine + x * s;
                dst[7] = 0;
                dst[8] = x * z * oneMinusCosine + y * s;
                dst[9] = y * z * oneMinusCosine - x * s;
                dst[10] = zz + (1 - zz) * c;
                dst[11] = 0;
                dst[12] = 0;
                dst[13] = 0;
                dst[14] = 0;
                dst[15] = 1;
                return dst;
              }
              function axisRotate(m, axis, angleInRadians, dst) {
                dst = dst || new MatType(16);
                var x = axis[0];
                var y = axis[1];
                var z = axis[2];
                var n = Math.sqrt(x * x + y * y + z * z);
                x /= n;
                y /= n;
                z /= n;
                var xx = x * x;
                var yy = y * y;
                var zz = z * z;
                var c = Math.cos(angleInRadians);
                var s = Math.sin(angleInRadians);
                var oneMinusCosine = 1 - c;
                var r00 = xx + (1 - xx) * c;
                var r01 = x * y * oneMinusCosine + z * s;
                var r02 = x * z * oneMinusCosine - y * s;
                var r10 = x * y * oneMinusCosine - z * s;
                var r11 = yy + (1 - yy) * c;
                var r12 = y * z * oneMinusCosine + x * s;
                var r20 = x * z * oneMinusCosine + y * s;
                var r21 = y * z * oneMinusCosine - x * s;
                var r22 = zz + (1 - zz) * c;
                var m00 = m[0];
                var m01 = m[1];
                var m02 = m[2];
                var m03 = m[3];
                var m10 = m[4];
                var m11 = m[5];
                var m12 = m[6];
                var m13 = m[7];
                var m20 = m[8];
                var m21 = m[9];
                var m22 = m[10];
                var m23 = m[11];
                dst[0] = r00 * m00 + r01 * m10 + r02 * m20;
                dst[1] = r00 * m01 + r01 * m11 + r02 * m21;
                dst[2] = r00 * m02 + r01 * m12 + r02 * m22;
                dst[3] = r00 * m03 + r01 * m13 + r02 * m23;
                dst[4] = r10 * m00 + r11 * m10 + r12 * m20;
                dst[5] = r10 * m01 + r11 * m11 + r12 * m21;
                dst[6] = r10 * m02 + r11 * m12 + r12 * m22;
                dst[7] = r10 * m03 + r11 * m13 + r12 * m23;
                dst[8] = r20 * m00 + r21 * m10 + r22 * m20;
                dst[9] = r20 * m01 + r21 * m11 + r22 * m21;
                dst[10] = r20 * m02 + r21 * m12 + r22 * m22;
                dst[11] = r20 * m03 + r21 * m13 + r22 * m23;
                if (m !== dst) {
                  dst[12] = m[12];
                  dst[13] = m[13];
                  dst[14] = m[14];
                  dst[15] = m[15];
                }
                return dst;
              }
              function scaling(v, dst) {
                dst = dst || new MatType(16);
                dst[0] = v[0];
                dst[1] = 0;
                dst[2] = 0;
                dst[3] = 0;
                dst[4] = 0;
                dst[5] = v[1];
                dst[6] = 0;
                dst[7] = 0;
                dst[8] = 0;
                dst[9] = 0;
                dst[10] = v[2];
                dst[11] = 0;
                dst[12] = 0;
                dst[13] = 0;
                dst[14] = 0;
                dst[15] = 1;
                return dst;
              }
              function scale(m, v, dst) {
                dst = dst || new MatType(16);
                var v0 = v[0];
                var v1 = v[1];
                var v2 = v[2];
                dst[0] = v0 * m[0 * 4 + 0];
                dst[1] = v0 * m[0 * 4 + 1];
                dst[2] = v0 * m[0 * 4 + 2];
                dst[3] = v0 * m[0 * 4 + 3];
                dst[4] = v1 * m[1 * 4 + 0];
                dst[5] = v1 * m[1 * 4 + 1];
                dst[6] = v1 * m[1 * 4 + 2];
                dst[7] = v1 * m[1 * 4 + 3];
                dst[8] = v2 * m[2 * 4 + 0];
                dst[9] = v2 * m[2 * 4 + 1];
                dst[10] = v2 * m[2 * 4 + 2];
                dst[11] = v2 * m[2 * 4 + 3];
                if (m !== dst) {
                  dst[12] = m[12];
                  dst[13] = m[13];
                  dst[14] = m[14];
                  dst[15] = m[15];
                }
                return dst;
              }
              function transformPoint(m, v, dst) {
                dst = dst || v3.create();
                var v0 = v[0];
                var v1 = v[1];
                var v2 = v[2];
                var d = v0 * m[0 * 4 + 3] + v1 * m[1 * 4 + 3] + v2 * m[2 * 4 + 3] + m[3 * 4 + 3];
                dst[0] = (v0 * m[0 * 4 + 0] + v1 * m[1 * 4 + 0] + v2 * m[2 * 4 + 0] + m[3 * 4 + 0]) / d;
                dst[1] = (v0 * m[0 * 4 + 1] + v1 * m[1 * 4 + 1] + v2 * m[2 * 4 + 1] + m[3 * 4 + 1]) / d;
                dst[2] = (v0 * m[0 * 4 + 2] + v1 * m[1 * 4 + 2] + v2 * m[2 * 4 + 2] + m[3 * 4 + 2]) / d;
                return dst;
              }
              function transformDirection(m, v, dst) {
                dst = dst || v3.create();
                var v0 = v[0];
                var v1 = v[1];
                var v2 = v[2];
                dst[0] = v0 * m[0 * 4 + 0] + v1 * m[1 * 4 + 0] + v2 * m[2 * 4 + 0];
                dst[1] = v0 * m[0 * 4 + 1] + v1 * m[1 * 4 + 1] + v2 * m[2 * 4 + 1];
                dst[2] = v0 * m[0 * 4 + 2] + v1 * m[1 * 4 + 2] + v2 * m[2 * 4 + 2];
                return dst;
              }
              function transformNormal(m, v, dst) {
                dst = dst || v3.create();
                var mi = inverse(m);
                var v0 = v[0];
                var v1 = v[1];
                var v2 = v[2];
                dst[0] = v0 * mi[0 * 4 + 0] + v1 * mi[0 * 4 + 1] + v2 * mi[0 * 4 + 2];
                dst[1] = v0 * mi[1 * 4 + 0] + v1 * mi[1 * 4 + 1] + v2 * mi[1 * 4 + 2];
                dst[2] = v0 * mi[2 * 4 + 0] + v1 * mi[2 * 4 + 1] + v2 * mi[2 * 4 + 2];
                return dst;
              }
            }),
            (function(module2, exports2, __webpack_require__) {
              "use strict";
              exports2.__esModule = true;
              exports2.createAttribsFromArrays = createAttribsFromArrays;
              exports2.createBuffersFromArrays = createBuffersFromArrays;
              exports2.createBufferFromArray = createBufferFromArray;
              exports2.createBufferFromTypedArray = createBufferFromTypedArray;
              exports2.createBufferInfoFromArrays = createBufferInfoFromArrays;
              exports2.setAttribInfoBufferFromArray = setAttribInfoBufferFromArray;
              exports2.setAttributePrefix = setAttributePrefix;
              exports2.setAttributeDefaults_ = setDefaults;
              exports2.getNumComponents_ = getNumComponents;
              exports2.getArray_ = getArray;
              var typedArrays = _interopRequireWildcard(__webpack_require__(1));
              var helper = _interopRequireWildcard(__webpack_require__(0));
              function _interopRequireWildcard(obj) {
                if (obj && obj.__esModule) {
                  return obj;
                } else {
                  var newObj = {};
                  if (obj != null) {
                    for (var key in obj) {
                      if (Object.prototype.hasOwnProperty.call(obj, key)) {
                        var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};
                        if (desc.get || desc.set) {
                          Object.defineProperty(newObj, key, desc);
                        } else {
                          newObj[key] = obj[key];
                        }
                      }
                    }
                  }
                  newObj.default = obj;
                  return newObj;
                }
              }
              var gl = void 0;
              var defaults = {
                attribPrefix: ""
              };
              function setAttributePrefix(prefix) {
                defaults.attribPrefix = prefix;
              }
              function setDefaults(newDefaults) {
                helper.copyExistingProperties(newDefaults, defaults);
              }
              function setBufferFromTypedArray(gl2, type, buffer, array, drawType) {
                gl2.bindBuffer(type, buffer);
                gl2.bufferData(type, array, drawType || gl2.STATIC_DRAW);
              }
              function createBufferFromTypedArray(gl2, typedArray, type, drawType) {
                if (helper.isBuffer(gl2, typedArray)) {
                  return typedArray;
                }
                type = type || gl2.ARRAY_BUFFER;
                var buffer = gl2.createBuffer();
                setBufferFromTypedArray(gl2, type, buffer, typedArray, drawType);
                return buffer;
              }
              function isIndices(name) {
                return name === "indices";
              }
              function getNormalizationForTypedArray(typedArray) {
                if (typedArray instanceof Int8Array) {
                  return true;
                }
                if (typedArray instanceof Uint8Array) {
                  return true;
                }
                return false;
              }
              function getNormalizationForTypedArrayType(typedArrayType) {
                if (typedArrayType === Int8Array) {
                  return true;
                }
                if (typedArrayType === Uint8Array) {
                  return true;
                }
                return false;
              }
              function getArray(array) {
                return array.length ? array : array.data;
              }
              var texcoordRE = /coord|texture/i;
              var colorRE = /color|colour/i;
              function guessNumComponentsFromName(name, length2) {
                var numComponents;
                if (texcoordRE.test(name)) {
                  numComponents = 2;
                } else if (colorRE.test(name)) {
                  numComponents = 4;
                } else {
                  numComponents = 3;
                }
                if (length2 % numComponents > 0) {
                  throw "Can not guess numComponents for attribute '" + name + "'. Tried " + numComponents + " but " + length2 + " values is not evenly divisible by " + numComponents + ". You should specify it.";
                }
                return numComponents;
              }
              function getNumComponents(array, arrayName) {
                return array.numComponents || array.size || guessNumComponentsFromName(arrayName, getArray(array).length);
              }
              function makeTypedArray(array, name) {
                if (typedArrays.isArrayBuffer(array)) {
                  return array;
                }
                if (typedArrays.isArrayBuffer(array.data)) {
                  return array.data;
                }
                if (Array.isArray(array)) {
                  array = {
                    data: array
                  };
                }
                var Type = array.type;
                if (!Type) {
                  if (isIndices(name)) {
                    Type = Uint16Array;
                  } else {
                    Type = Float32Array;
                  }
                }
                return new Type(array.data);
              }
              function createAttribsFromArrays(gl2, arrays) {
                var attribs = {};
                Object.keys(arrays).forEach(function(arrayName) {
                  if (!isIndices(arrayName)) {
                    var array = arrays[arrayName];
                    var attribName = array.attrib || array.name || array.attribName || defaults.attribPrefix + arrayName;
                    var buffer;
                    var type;
                    var normalization;
                    var numComponents;
                    var numValues;
                    if (typeof array === "number" || typeof array.data === "number") {
                      numValues = array.data || array;
                      var arrayType = array.type || Float32Array;
                      var numBytes = numValues * arrayType.BYTES_PER_ELEMENT;
                      type = typedArrays.getGLTypeForTypedArrayType(arrayType);
                      normalization = array.normalize !== void 0 ? array.normalize : getNormalizationForTypedArrayType(arrayType);
                      numComponents = array.numComponents || array.size || guessNumComponentsFromName(arrayName, numValues);
                      buffer = gl2.createBuffer();
                      gl2.bindBuffer(gl2.ARRAY_BUFFER, buffer);
                      gl2.bufferData(gl2.ARRAY_BUFFER, numBytes, array.drawType || gl2.STATIC_DRAW);
                    } else {
                      var typedArray = makeTypedArray(array, arrayName);
                      buffer = createBufferFromTypedArray(gl2, typedArray, void 0, array.drawType);
                      type = typedArrays.getGLTypeForTypedArray(typedArray);
                      normalization = array.normalize !== void 0 ? array.normalize : getNormalizationForTypedArray(typedArray);
                      numComponents = getNumComponents(array, arrayName);
                      numValues = typedArray.length;
                    }
                    attribs[attribName] = {
                      buffer,
                      numComponents,
                      type,
                      normalize: normalization,
                      stride: array.stride || 0,
                      offset: array.offset || 0,
                      divisor: array.divisor === void 0 ? void 0 : array.divisor,
                      drawType: array.drawType
                    };
                  }
                });
                gl2.bindBuffer(gl2.ARRAY_BUFFER, null);
                return attribs;
              }
              function setAttribInfoBufferFromArray(gl2, attribInfo, array, offset) {
                array = makeTypedArray(array);
                if (offset !== void 0) {
                  gl2.bindBuffer(gl2.ARRAY_BUFFER, attribInfo.buffer);
                  gl2.bufferSubData(gl2.ARRAY_BUFFER, offset, array);
                } else {
                  setBufferFromTypedArray(gl2, gl2.ARRAY_BUFFER, attribInfo.buffer, array, attribInfo.drawType);
                }
              }
              function getBytesPerValueForGLType(gl2, type) {
                if (type === gl2.BYTE) return 1;
                if (type === gl2.UNSIGNED_BYTE) return 1;
                if (type === gl2.SHORT) return 2;
                if (type === gl2.UNSIGNED_SHORT) return 2;
                if (type === gl2.INT) return 4;
                if (type === gl2.UNSIGNED_INT) return 4;
                if (type === gl2.FLOAT) return 4;
                return 0;
              }
              var positionKeys = ["position", "positions", "a_position"];
              function getNumElementsFromNonIndexedArrays(arrays) {
                var key;
                for (var _ii = 0; _ii < positionKeys.length; ++_ii) {
                  key = positionKeys[_ii];
                  if (key in arrays) {
                    break;
                  }
                }
                if (ii === positionKeys.length) {
                  key = Object.keys(arrays)[0];
                }
                var array = arrays[key];
                var length2 = getArray(array).length;
                var numComponents = getNumComponents(array, key);
                var numElements = length2 / numComponents;
                if (length2 % numComponents > 0) {
                  throw "numComponents " + numComponents + " not correct for length " + length2;
                }
                return numElements;
              }
              function getNumElementsFromAttributes(gl2, attribs) {
                var key;
                var ii2;
                for (ii2 = 0; ii2 < positionKeys.length; ++ii2) {
                  key = positionKeys[ii2];
                  if (key in attribs) {
                    break;
                  }
                  key = defaults.attribPrefix + key;
                  if (key in attribs) {
                    break;
                  }
                }
                if (ii2 === positionKeys.length) {
                  key = Object.keys(attribs)[0];
                }
                var attrib = attribs[key];
                gl2.bindBuffer(gl2.ARRAY_BUFFER, attrib.buffer);
                var numBytes = gl2.getBufferParameter(gl2.ARRAY_BUFFER, gl2.BUFFER_SIZE);
                gl2.bindBuffer(gl2.ARRAY_BUFFER, null);
                var bytesPerValue = getBytesPerValueForGLType(gl2, attrib.type);
                var totalElements = numBytes / bytesPerValue;
                var numComponents = attrib.numComponents || attrib.size;
                var numElements = totalElements / numComponents;
                if (numElements % 1 !== 0) {
                  throw "numComponents " + numComponents + " not correct for length " + length;
                }
                return numElements;
              }
              function createBufferInfoFromArrays(gl2, arrays) {
                var bufferInfo = {
                  attribs: createAttribsFromArrays(gl2, arrays)
                };
                var indices = arrays.indices;
                if (indices) {
                  var newIndices = makeTypedArray(indices, "indices");
                  bufferInfo.indices = createBufferFromTypedArray(gl2, newIndices, gl2.ELEMENT_ARRAY_BUFFER);
                  bufferInfo.numElements = newIndices.length;
                  bufferInfo.elementType = typedArrays.getGLTypeForTypedArray(newIndices);
                } else {
                  bufferInfo.numElements = getNumElementsFromAttributes(gl2, bufferInfo.attribs);
                }
                return bufferInfo;
              }
              function createBufferFromArray(gl2, array, arrayName) {
                var type = arrayName === "indices" ? gl2.ELEMENT_ARRAY_BUFFER : gl2.ARRAY_BUFFER;
                var typedArray = makeTypedArray(array, arrayName);
                return createBufferFromTypedArray(gl2, typedArray, type);
              }
              function createBuffersFromArrays(gl2, arrays) {
                var buffers = {};
                Object.keys(arrays).forEach(function(key) {
                  buffers[key] = createBufferFromArray(gl2, arrays[key], key);
                });
                if (arrays.indices) {
                  buffers.numElements = arrays.indices.length;
                  buffers.elementType = typedArrays.getGLTypeForTypedArray(makeTypedArray(arrays.indices), "indices");
                } else {
                  buffers.numElements = getNumElementsFromNonIndexedArrays(arrays);
                }
                return buffers;
              }
            }),
            (function(module2, exports2, __webpack_require__) {
              "use strict";
              exports2.__esModule = true;
              exports2.setTextureDefaults_ = setDefaults;
              exports2.createSampler = createSampler;
              exports2.createSamplers = createSamplers;
              exports2.setSamplerParameters = setSamplerParameters;
              exports2.createTexture = createTexture;
              exports2.setEmptyTexture = setEmptyTexture;
              exports2.setTextureFromArray = setTextureFromArray;
              exports2.loadTextureFromUrl = loadTextureFromUrl;
              exports2.setTextureFromElement = setTextureFromElement;
              exports2.setTextureFilteringForSize = setTextureFilteringForSize;
              exports2.setTextureParameters = setTextureParameters;
              exports2.setDefaultTextureColor = setDefaultTextureColor;
              exports2.createTextures = createTextures;
              exports2.resizeTexture = resizeTexture;
              exports2.getNumComponentsForFormat = getNumComponentsForFormat;
              exports2.getBytesPerElementForInternalFormat = getBytesPerElementForInternalFormat;
              var utils = _interopRequireWildcard(__webpack_require__(4));
              var typedArrays = _interopRequireWildcard(__webpack_require__(1));
              var helper = _interopRequireWildcard(__webpack_require__(0));
              var _globalObject = _interopRequireDefault(__webpack_require__(2));
              function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : { default: obj };
              }
              function _interopRequireWildcard(obj) {
                if (obj && obj.__esModule) {
                  return obj;
                } else {
                  var newObj = {};
                  if (obj != null) {
                    for (var key in obj) {
                      if (Object.prototype.hasOwnProperty.call(obj, key)) {
                        var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};
                        if (desc.get || desc.set) {
                          Object.defineProperty(newObj, key, desc);
                        } else {
                          newObj[key] = obj[key];
                        }
                      }
                    }
                  }
                  newObj.default = obj;
                  return newObj;
                }
              }
              var gl = void 0;
              var defaults = {
                textureColor: new Uint8Array([128, 192, 255, 255]),
                textureOptions: {},
                crossOrigin: void 0
              };
              var isArrayBuffer = typedArrays.isArrayBuffer;
              var ctx = _globalObject.default.document && _globalObject.default.document.createElement ? _globalObject.default.document.createElement("canvas").getContext("2d") : null;
              var ALPHA = 6406;
              var RGB = 6407;
              var RGBA = 6408;
              var LUMINANCE = 6409;
              var LUMINANCE_ALPHA = 6410;
              var DEPTH_COMPONENT = 6402;
              var DEPTH_STENCIL = 34041;
              var REPEAT = 10497;
              var MIRRORED_REPEAT = 33648;
              var NEAREST = 9728;
              var NEAREST_MIPMAP_NEAREST = 9984;
              var LINEAR_MIPMAP_NEAREST = 9985;
              var NEAREST_MIPMAP_LINEAR = 9986;
              var LINEAR_MIPMAP_LINEAR = 9987;
              var R8 = 33321;
              var R8_SNORM = 36756;
              var R16F = 33325;
              var R32F = 33326;
              var R8UI = 33330;
              var R8I = 33329;
              var RG16UI = 33338;
              var RG16I = 33337;
              var RG32UI = 33340;
              var RG32I = 33339;
              var RG8 = 33323;
              var RG8_SNORM = 36757;
              var RG16F = 33327;
              var RG32F = 33328;
              var RG8UI = 33336;
              var RG8I = 33335;
              var R16UI = 33332;
              var R16I = 33331;
              var R32UI = 33334;
              var R32I = 33333;
              var RGB8 = 32849;
              var SRGB8 = 35905;
              var RGB565 = 36194;
              var RGB8_SNORM = 36758;
              var R11F_G11F_B10F = 35898;
              var RGB9_E5 = 35901;
              var RGB16F = 34843;
              var RGB32F = 34837;
              var RGB8UI = 36221;
              var RGB8I = 36239;
              var RGB16UI = 36215;
              var RGB16I = 36233;
              var RGB32UI = 36209;
              var RGB32I = 36227;
              var RGBA8 = 32856;
              var SRGB8_ALPHA8 = 35907;
              var RGBA8_SNORM = 36759;
              var RGB5_A1 = 32855;
              var RGBA4 = 32854;
              var RGB10_A2 = 32857;
              var RGBA16F = 34842;
              var RGBA32F = 34836;
              var RGBA8UI = 36220;
              var RGBA8I = 36238;
              var RGB10_A2UI = 36975;
              var RGBA16UI = 36214;
              var RGBA16I = 36232;
              var RGBA32I = 36226;
              var RGBA32UI = 36208;
              var DEPTH_COMPONENT16 = 33189;
              var DEPTH_COMPONENT24 = 33190;
              var DEPTH_COMPONENT32F = 36012;
              var DEPTH32F_STENCIL8 = 36013;
              var DEPTH24_STENCIL8 = 35056;
              var BYTE = 5120;
              var UNSIGNED_BYTE = 5121;
              var SHORT = 5122;
              var UNSIGNED_SHORT = 5123;
              var INT = 5124;
              var UNSIGNED_INT = 5125;
              var FLOAT = 5126;
              var UNSIGNED_SHORT_4_4_4_4 = 32819;
              var UNSIGNED_SHORT_5_5_5_1 = 32820;
              var UNSIGNED_SHORT_5_6_5 = 33635;
              var HALF_FLOAT = 5131;
              var HALF_FLOAT_OES = 36193;
              var UNSIGNED_INT_2_10_10_10_REV = 33640;
              var UNSIGNED_INT_10F_11F_11F_REV = 35899;
              var UNSIGNED_INT_5_9_9_9_REV = 35902;
              var FLOAT_32_UNSIGNED_INT_24_8_REV = 36269;
              var UNSIGNED_INT_24_8 = 34042;
              var RG = 33319;
              var RG_INTEGER = 33320;
              var RED = 6403;
              var RED_INTEGER = 36244;
              var RGB_INTEGER = 36248;
              var RGBA_INTEGER = 36249;
              var formatInfo = {};
              {
                var f = formatInfo;
                f[ALPHA] = {
                  numColorComponents: 1
                };
                f[LUMINANCE] = {
                  numColorComponents: 1
                };
                f[LUMINANCE_ALPHA] = {
                  numColorComponents: 2
                };
                f[RGB] = {
                  numColorComponents: 3
                };
                f[RGBA] = {
                  numColorComponents: 4
                };
                f[RED] = {
                  numColorComponents: 1
                };
                f[RED_INTEGER] = {
                  numColorComponents: 1
                };
                f[RG] = {
                  numColorComponents: 2
                };
                f[RG_INTEGER] = {
                  numColorComponents: 2
                };
                f[RGB] = {
                  numColorComponents: 3
                };
                f[RGB_INTEGER] = {
                  numColorComponents: 3
                };
                f[RGBA] = {
                  numColorComponents: 4
                };
                f[RGBA_INTEGER] = {
                  numColorComponents: 4
                };
                f[DEPTH_COMPONENT] = {
                  numColorComponents: 1
                };
                f[DEPTH_STENCIL] = {
                  numColorComponents: 2
                };
              }
              var textureInternalFormatInfo = {};
              {
                var t = textureInternalFormatInfo;
                t[ALPHA] = {
                  textureFormat: ALPHA,
                  colorRenderable: true,
                  textureFilterable: true,
                  bytesPerElement: [1, 2, 2, 4],
                  type: [UNSIGNED_BYTE, HALF_FLOAT, HALF_FLOAT_OES, FLOAT]
                };
                t[LUMINANCE] = {
                  textureFormat: LUMINANCE,
                  colorRenderable: true,
                  textureFilterable: true,
                  bytesPerElement: [1, 2, 2, 4],
                  type: [UNSIGNED_BYTE, HALF_FLOAT, HALF_FLOAT_OES, FLOAT]
                };
                t[LUMINANCE_ALPHA] = {
                  textureFormat: LUMINANCE_ALPHA,
                  colorRenderable: true,
                  textureFilterable: true,
                  bytesPerElement: [2, 4, 4, 8],
                  type: [UNSIGNED_BYTE, HALF_FLOAT, HALF_FLOAT_OES, FLOAT]
                };
                t[RGB] = {
                  textureFormat: RGB,
                  colorRenderable: true,
                  textureFilterable: true,
                  bytesPerElement: [3, 6, 6, 12, 2],
                  type: [UNSIGNED_BYTE, HALF_FLOAT, HALF_FLOAT_OES, FLOAT, UNSIGNED_SHORT_5_6_5]
                };
                t[RGBA] = {
                  textureFormat: RGBA,
                  colorRenderable: true,
                  textureFilterable: true,
                  bytesPerElement: [4, 8, 8, 16, 2, 2],
                  type: [UNSIGNED_BYTE, HALF_FLOAT, HALF_FLOAT_OES, FLOAT, UNSIGNED_SHORT_4_4_4_4, UNSIGNED_SHORT_5_5_5_1]
                };
                t[R8] = {
                  textureFormat: RED,
                  colorRenderable: true,
                  textureFilterable: true,
                  bytesPerElement: 1,
                  type: UNSIGNED_BYTE
                };
                t[R8_SNORM] = {
                  textureFormat: RED,
                  colorRenderable: false,
                  textureFilterable: true,
                  bytesPerElement: 1,
                  type: BYTE
                };
                t[R16F] = {
                  textureFormat: RED,
                  colorRenderable: false,
                  textureFilterable: true,
                  bytesPerElement: [4, 2],
                  type: [FLOAT, HALF_FLOAT]
                };
                t[R32F] = {
                  textureFormat: RED,
                  colorRenderable: false,
                  textureFilterable: false,
                  bytesPerElement: 4,
                  type: FLOAT
                };
                t[R8UI] = {
                  textureFormat: RED_INTEGER,
                  colorRenderable: true,
                  textureFilterable: false,
                  bytesPerElement: 1,
                  type: UNSIGNED_BYTE
                };
                t[R8I] = {
                  textureFormat: RED_INTEGER,
                  colorRenderable: true,
                  textureFilterable: false,
                  bytesPerElement: 1,
                  type: BYTE
                };
                t[R16UI] = {
                  textureFormat: RED_INTEGER,
                  colorRenderable: true,
                  textureFilterable: false,
                  bytesPerElement: 2,
                  type: UNSIGNED_SHORT
                };
                t[R16I] = {
                  textureFormat: RED_INTEGER,
                  colorRenderable: true,
                  textureFilterable: false,
                  bytesPerElement: 2,
                  type: SHORT
                };
                t[R32UI] = {
                  textureFormat: RED_INTEGER,
                  colorRenderable: true,
                  textureFilterable: false,
                  bytesPerElement: 4,
                  type: UNSIGNED_INT
                };
                t[R32I] = {
                  textureFormat: RED_INTEGER,
                  colorRenderable: true,
                  textureFilterable: false,
                  bytesPerElement: 4,
                  type: INT
                };
                t[RG8] = {
                  textureFormat: RG,
                  colorRenderable: true,
                  textureFilterable: true,
                  bytesPerElement: 2,
                  type: UNSIGNED_BYTE
                };
                t[RG8_SNORM] = {
                  textureFormat: RG,
                  colorRenderable: false,
                  textureFilterable: true,
                  bytesPerElement: 2,
                  type: BYTE
                };
                t[RG16F] = {
                  textureFormat: RG,
                  colorRenderable: false,
                  textureFilterable: true,
                  bytesPerElement: [8, 4],
                  type: [FLOAT, HALF_FLOAT]
                };
                t[RG32F] = {
                  textureFormat: RG,
                  colorRenderable: false,
                  textureFilterable: false,
                  bytesPerElement: 8,
                  type: FLOAT
                };
                t[RG8UI] = {
                  textureFormat: RG_INTEGER,
                  colorRenderable: true,
                  textureFilterable: false,
                  bytesPerElement: 2,
                  type: UNSIGNED_BYTE
                };
                t[RG8I] = {
                  textureFormat: RG_INTEGER,
                  colorRenderable: true,
                  textureFilterable: false,
                  bytesPerElement: 2,
                  type: BYTE
                };
                t[RG16UI] = {
                  textureFormat: RG_INTEGER,
                  colorRenderable: true,
                  textureFilterable: false,
                  bytesPerElement: 4,
                  type: UNSIGNED_SHORT
                };
                t[RG16I] = {
                  textureFormat: RG_INTEGER,
                  colorRenderable: true,
                  textureFilterable: false,
                  bytesPerElement: 4,
                  type: SHORT
                };
                t[RG32UI] = {
                  textureFormat: RG_INTEGER,
                  colorRenderable: true,
                  textureFilterable: false,
                  bytesPerElement: 8,
                  type: UNSIGNED_INT
                };
                t[RG32I] = {
                  textureFormat: RG_INTEGER,
                  colorRenderable: true,
                  textureFilterable: false,
                  bytesPerElement: 8,
                  type: INT
                };
                t[RGB8] = {
                  textureFormat: RGB,
                  colorRenderable: true,
                  textureFilterable: true,
                  bytesPerElement: 3,
                  type: UNSIGNED_BYTE
                };
                t[SRGB8] = {
                  textureFormat: RGB,
                  colorRenderable: false,
                  textureFilterable: true,
                  bytesPerElement: 3,
                  type: UNSIGNED_BYTE
                };
                t[RGB565] = {
                  textureFormat: RGB,
                  colorRenderable: true,
                  textureFilterable: true,
                  bytesPerElement: [3, 2],
                  type: [UNSIGNED_BYTE, UNSIGNED_SHORT_5_6_5]
                };
                t[RGB8_SNORM] = {
                  textureFormat: RGB,
                  colorRenderable: false,
                  textureFilterable: true,
                  bytesPerElement: 3,
                  type: BYTE
                };
                t[R11F_G11F_B10F] = {
                  textureFormat: RGB,
                  colorRenderable: false,
                  textureFilterable: true,
                  bytesPerElement: [12, 6, 4],
                  type: [FLOAT, HALF_FLOAT, UNSIGNED_INT_10F_11F_11F_REV]
                };
                t[RGB9_E5] = {
                  textureFormat: RGB,
                  colorRenderable: false,
                  textureFilterable: true,
                  bytesPerElement: [12, 6, 4],
                  type: [FLOAT, HALF_FLOAT, UNSIGNED_INT_5_9_9_9_REV]
                };
                t[RGB16F] = {
                  textureFormat: RGB,
                  colorRenderable: false,
                  textureFilterable: true,
                  bytesPerElement: [12, 6],
                  type: [FLOAT, HALF_FLOAT]
                };
                t[RGB32F] = {
                  textureFormat: RGB,
                  colorRenderable: false,
                  textureFilterable: false,
                  bytesPerElement: 12,
                  type: FLOAT
                };
                t[RGB8UI] = {
                  textureFormat: RGB_INTEGER,
                  colorRenderable: false,
                  textureFilterable: false,
                  bytesPerElement: 3,
                  type: UNSIGNED_BYTE
                };
                t[RGB8I] = {
                  textureFormat: RGB_INTEGER,
                  colorRenderable: false,
                  textureFilterable: false,
                  bytesPerElement: 3,
                  type: BYTE
                };
                t[RGB16UI] = {
                  textureFormat: RGB_INTEGER,
                  colorRenderable: false,
                  textureFilterable: false,
                  bytesPerElement: 6,
                  type: UNSIGNED_SHORT
                };
                t[RGB16I] = {
                  textureFormat: RGB_INTEGER,
                  colorRenderable: false,
                  textureFilterable: false,
                  bytesPerElement: 6,
                  type: SHORT
                };
                t[RGB32UI] = {
                  textureFormat: RGB_INTEGER,
                  colorRenderable: false,
                  textureFilterable: false,
                  bytesPerElement: 12,
                  type: UNSIGNED_INT
                };
                t[RGB32I] = {
                  textureFormat: RGB_INTEGER,
                  colorRenderable: false,
                  textureFilterable: false,
                  bytesPerElement: 12,
                  type: INT
                };
                t[RGBA8] = {
                  textureFormat: RGBA,
                  colorRenderable: true,
                  textureFilterable: true,
                  bytesPerElement: 4,
                  type: UNSIGNED_BYTE
                };
                t[SRGB8_ALPHA8] = {
                  textureFormat: RGBA,
                  colorRenderable: true,
                  textureFilterable: true,
                  bytesPerElement: 4,
                  type: UNSIGNED_BYTE
                };
                t[RGBA8_SNORM] = {
                  textureFormat: RGBA,
                  colorRenderable: false,
                  textureFilterable: true,
                  bytesPerElement: 4,
                  type: BYTE
                };
                t[RGB5_A1] = {
                  textureFormat: RGBA,
                  colorRenderable: true,
                  textureFilterable: true,
                  bytesPerElement: [4, 2, 4],
                  type: [UNSIGNED_BYTE, UNSIGNED_SHORT_5_5_5_1, UNSIGNED_INT_2_10_10_10_REV]
                };
                t[RGBA4] = {
                  textureFormat: RGBA,
                  colorRenderable: true,
                  textureFilterable: true,
                  bytesPerElement: [4, 2],
                  type: [UNSIGNED_BYTE, UNSIGNED_SHORT_4_4_4_4]
                };
                t[RGB10_A2] = {
                  textureFormat: RGBA,
                  colorRenderable: true,
                  textureFilterable: true,
                  bytesPerElement: 4,
                  type: UNSIGNED_INT_2_10_10_10_REV
                };
                t[RGBA16F] = {
                  textureFormat: RGBA,
                  colorRenderable: false,
                  textureFilterable: true,
                  bytesPerElement: [16, 8],
                  type: [FLOAT, HALF_FLOAT]
                };
                t[RGBA32F] = {
                  textureFormat: RGBA,
                  colorRenderable: false,
                  textureFilterable: false,
                  bytesPerElement: 16,
                  type: FLOAT
                };
                t[RGBA8UI] = {
                  textureFormat: RGBA_INTEGER,
                  colorRenderable: true,
                  textureFilterable: false,
                  bytesPerElement: 4,
                  type: UNSIGNED_BYTE
                };
                t[RGBA8I] = {
                  textureFormat: RGBA_INTEGER,
                  colorRenderable: true,
                  textureFilterable: false,
                  bytesPerElement: 4,
                  type: BYTE
                };
                t[RGB10_A2UI] = {
                  textureFormat: RGBA_INTEGER,
                  colorRenderable: true,
                  textureFilterable: false,
                  bytesPerElement: 4,
                  type: UNSIGNED_INT_2_10_10_10_REV
                };
                t[RGBA16UI] = {
                  textureFormat: RGBA_INTEGER,
                  colorRenderable: true,
                  textureFilterable: false,
                  bytesPerElement: 8,
                  type: UNSIGNED_SHORT
                };
                t[RGBA16I] = {
                  textureFormat: RGBA_INTEGER,
                  colorRenderable: true,
                  textureFilterable: false,
                  bytesPerElement: 8,
                  type: SHORT
                };
                t[RGBA32I] = {
                  textureFormat: RGBA_INTEGER,
                  colorRenderable: true,
                  textureFilterable: false,
                  bytesPerElement: 16,
                  type: INT
                };
                t[RGBA32UI] = {
                  textureFormat: RGBA_INTEGER,
                  colorRenderable: true,
                  textureFilterable: false,
                  bytesPerElement: 16,
                  type: UNSIGNED_INT
                };
                t[DEPTH_COMPONENT16] = {
                  textureFormat: DEPTH_COMPONENT,
                  colorRenderable: true,
                  textureFilterable: false,
                  bytesPerElement: [2, 4],
                  type: [UNSIGNED_SHORT, UNSIGNED_INT]
                };
                t[DEPTH_COMPONENT24] = {
                  textureFormat: DEPTH_COMPONENT,
                  colorRenderable: true,
                  textureFilterable: false,
                  bytesPerElement: 4,
                  type: UNSIGNED_INT
                };
                t[DEPTH_COMPONENT32F] = {
                  textureFormat: DEPTH_COMPONENT,
                  colorRenderable: true,
                  textureFilterable: false,
                  bytesPerElement: 4,
                  type: FLOAT
                };
                t[DEPTH24_STENCIL8] = {
                  textureFormat: DEPTH_STENCIL,
                  colorRenderable: true,
                  textureFilterable: false,
                  bytesPerElement: 4,
                  type: UNSIGNED_INT_24_8
                };
                t[DEPTH32F_STENCIL8] = {
                  textureFormat: DEPTH_STENCIL,
                  colorRenderable: true,
                  textureFilterable: false,
                  bytesPerElement: 4,
                  type: FLOAT_32_UNSIGNED_INT_24_8_REV
                };
                Object.keys(t).forEach(function(internalFormat) {
                  var info = t[internalFormat];
                  info.bytesPerElementMap = {};
                  if (Array.isArray(info.bytesPerElement)) {
                    info.bytesPerElement.forEach(function(bytesPerElement, ndx) {
                      var type2 = info.type[ndx];
                      info.bytesPerElementMap[type2] = bytesPerElement;
                    });
                  } else {
                    var type = info.type;
                    info.bytesPerElementMap[type] = info.bytesPerElement;
                  }
                });
              }
              function getBytesPerElementForInternalFormat(internalFormat, type) {
                var info = textureInternalFormatInfo[internalFormat];
                if (!info) {
                  throw "unknown internal format";
                }
                var bytesPerElement = info.bytesPerElementMap[type];
                if (bytesPerElement === void 0) {
                  throw "unknown internal format";
                }
                return bytesPerElement;
              }
              function getFormatAndTypeForInternalFormat(internalFormat) {
                var info = textureInternalFormatInfo[internalFormat];
                if (!info) {
                  throw "unknown internal format";
                }
                return {
                  format: info.textureFormat,
                  type: Array.isArray(info.type) ? info.type[0] : info.type
                };
              }
              function isPowerOf2(value) {
                return (value & value - 1) === 0;
              }
              function canGenerateMipmap(gl2, width, height, internalFormat) {
                if (!utils.isWebGL2(gl2)) {
                  return isPowerOf2(width) && isPowerOf2(height);
                }
                var info = textureInternalFormatInfo[internalFormat];
                if (!info) {
                  throw "unknown internal format";
                }
                return info.colorRenderable && info.textureFilterable;
              }
              function canFilter(internalFormat) {
                var info = textureInternalFormatInfo[internalFormat];
                if (!info) {
                  throw "unknown internal format";
                }
                return info.textureFilterable;
              }
              function getNumComponentsForFormat(format) {
                var info = formatInfo[format];
                if (!info) {
                  throw "unknown format: " + format;
                }
                return info.numColorComponents;
              }
              function getTextureTypeForArrayType(gl2, src, defaultType) {
                if (isArrayBuffer(src)) {
                  return typedArrays.getGLTypeForTypedArray(src);
                }
                return defaultType || gl2.UNSIGNED_BYTE;
              }
              function guessDimensions(gl2, target, width, height, numElements) {
                if (numElements % 1 !== 0) {
                  throw "can't guess dimensions";
                }
                if (!width && !height) {
                  var size = Math.sqrt(numElements / (target === gl2.TEXTURE_CUBE_MAP ? 6 : 1));
                  if (size % 1 === 0) {
                    width = size;
                    height = size;
                  } else {
                    width = numElements;
                    height = 1;
                  }
                } else if (!height) {
                  height = numElements / width;
                  if (height % 1) {
                    throw "can't guess dimensions";
                  }
                } else if (!width) {
                  width = numElements / height;
                  if (width % 1) {
                    throw "can't guess dimensions";
                  }
                }
                return {
                  width,
                  height
                };
              }
              function setDefaultTextureColor(color) {
                defaults.textureColor = new Uint8Array([color[0] * 255, color[1] * 255, color[2] * 255, color[3] * 255]);
              }
              function setDefaults(newDefaults) {
                helper.copyExistingProperties(newDefaults, defaults);
                if (newDefaults.textureColor) {
                  setDefaultTextureColor(newDefaults.textureColor);
                }
              }
              var lastPackState = {};
              function savePackState(gl2, options) {
                if (options.colorspaceConversion !== void 0) {
                  lastPackState.colorspaceConversion = gl2.getParameter(gl2.UNPACK_COLORSPACE_CONVERSION_WEBGL);
                  gl2.pixelStorei(gl2.UNPACK_COLORSPACE_CONVERSION_WEBGL, options.colorspaceConversion);
                }
                if (options.premultiplyAlpha !== void 0) {
                  lastPackState.premultiplyAlpha = gl2.getParameter(gl2.UNPACK_PREMULTIPLY_ALPHA_WEBGL);
                  gl2.pixelStorei(gl2.UNPACK_PREMULTIPLY_ALPHA_WEBGL, options.premultiplyAlpha);
                }
                if (options.flipY !== void 0) {
                  lastPackState.flipY = gl2.getParameter(gl2.UNPACK_FLIP_Y_WEBGL);
                  gl2.pixelStorei(gl2.UNPACK_FLIP_Y_WEBGL, options.flipY);
                }
              }
              function restorePackState(gl2, options) {
                if (options.colorspaceConversion !== void 0) {
                  gl2.pixelStorei(gl2.UNPACK_COLORSPACE_CONVERSION_WEBGL, lastPackState.colorspaceConversion);
                }
                if (options.premultiplyAlpha !== void 0) {
                  gl2.pixelStorei(gl2.UNPACK_PREMULTIPLY_ALPHA_WEBGL, lastPackState.premultiplyAlpha);
                }
                if (options.flipY !== void 0) {
                  gl2.pixelStorei(gl2.UNPACK_FLIP_Y_WEBGL, lastPackState.flipY);
                }
              }
              function saveSkipState(gl2) {
                lastPackState.unpackAlignment = gl2.getParameter(gl2.UNPACK_ALIGNMENT);
                if (utils.isWebGL2(gl2)) {
                  lastPackState.unpackRowLength = gl2.getParameter(gl2.UNPACK_ROW_LENGTH);
                  lastPackState.unpackImageHeight = gl2.getParameter(gl2.UNPACK_IMAGE_HEIGHT);
                  lastPackState.unpackSkipPixels = gl2.getParameter(gl2.UNPACK_SKIP_PIXELS);
                  lastPackState.unpackSkipRows = gl2.getParameter(gl2.UNPACK_SKIP_ROWS);
                  lastPackState.unpackSkipImages = gl2.getParameter(gl2.UNPACK_SKIP_IMAGES);
                }
              }
              function restoreSkipState(gl2) {
                gl2.pixelStorei(gl2.UNPACK_ALIGNMENT, lastPackState.unpackAlignment);
                if (utils.isWebGL2(gl2)) {
                  gl2.pixelStorei(gl2.UNPACK_ROW_LENGTH, lastPackState.unpackRowLength);
                  gl2.pixelStorei(gl2.UNPACK_IMAGE_HEIGHT, lastPackState.unpackImageHeight);
                  gl2.pixelStorei(gl2.UNPACK_SKIP_PIXELS, lastPackState.unpackSkipPixels);
                  gl2.pixelStorei(gl2.UNPACK_SKIP_ROWS, lastPackState.unpackSkipRows);
                  gl2.pixelStorei(gl2.UNPACK_SKIP_IMAGES, lastPackState.unpackSkipImages);
                }
              }
              function setTextureSamplerParameters(gl2, target, parameteriFn, options) {
                if (options.minMag) {
                  parameteriFn.call(gl2, target, gl2.TEXTURE_MIN_FILTER, options.minMag);
                  parameteriFn.call(gl2, target, gl2.TEXTURE_MAG_FILTER, options.minMag);
                }
                if (options.min) {
                  parameteriFn.call(gl2, target, gl2.TEXTURE_MIN_FILTER, options.min);
                }
                if (options.mag) {
                  parameteriFn.call(gl2, target, gl2.TEXTURE_MAG_FILTER, options.mag);
                }
                if (options.wrap) {
                  parameteriFn.call(gl2, target, gl2.TEXTURE_WRAP_S, options.wrap);
                  parameteriFn.call(gl2, target, gl2.TEXTURE_WRAP_T, options.wrap);
                  if (target === gl2.TEXTURE_3D || helper.isSampler(gl2, target)) {
                    parameteriFn.call(gl2, target, gl2.TEXTURE_WRAP_R, options.wrap);
                  }
                }
                if (options.wrapR) {
                  parameteriFn.call(gl2, target, gl2.TEXTURE_WRAP_R, options.wrapR);
                }
                if (options.wrapS) {
                  parameteriFn.call(gl2, target, gl2.TEXTURE_WRAP_S, options.wrapS);
                }
                if (options.wrapT) {
                  parameteriFn.call(gl2, target, gl2.TEXTURE_WRAP_T, options.wrapT);
                }
                if (options.minLod) {
                  parameteriFn.call(gl2, target, gl2.TEXTURE_MIN_LOD, options.minLod);
                }
                if (options.maxLod) {
                  parameteriFn.call(gl2, target, gl2.TEXTURE_MAX_LOD, options.maxLod);
                }
                if (options.baseLevel) {
                  parameteriFn.call(gl2, target, gl2.TEXTURE_BASE_LEVEL, options.baseLevel);
                }
                if (options.maxLevel) {
                  parameteriFn.call(gl2, target, gl2.TEXTURE_MAX_LEVEL, options.maxLevel);
                }
              }
              function setTextureParameters(gl2, tex, options) {
                var target = options.target || gl2.TEXTURE_2D;
                gl2.bindTexture(target, tex);
                setTextureSamplerParameters(gl2, target, gl2.texParameteri, options);
              }
              function setSamplerParameters(gl2, sampler, options) {
                setTextureSamplerParameters(gl2, sampler, gl2.samplerParameteri, options);
              }
              function createSampler(gl2, options) {
                var sampler = gl2.createSampler();
                setSamplerParameters(gl2, sampler, options);
                return sampler;
              }
              function createSamplers(gl2, samplerOptions) {
                var samplers = {};
                Object.keys(samplerOptions).forEach(function(name) {
                  samplers[name] = createSampler(gl2, samplerOptions[name]);
                });
                return samplers;
              }
              function make1Pixel(color) {
                color = color || defaults.textureColor;
                if (isArrayBuffer(color)) {
                  return color;
                }
                return new Uint8Array([color[0] * 255, color[1] * 255, color[2] * 255, color[3] * 255]);
              }
              function setTextureFilteringForSize(gl2, tex, options, width, height, internalFormat, type) {
                options = options || defaults.textureOptions;
                internalFormat = internalFormat || gl2.RGBA;
                type = type || gl2.UNSIGNED_BYTE;
                var target = options.target || gl2.TEXTURE_2D;
                width = width || options.width;
                height = height || options.height;
                gl2.bindTexture(target, tex);
                if (canGenerateMipmap(gl2, width, height, internalFormat, type)) {
                  gl2.generateMipmap(target);
                } else {
                  var filtering = canFilter(internalFormat, type) ? gl2.LINEAR : gl2.NEAREST;
                  gl2.texParameteri(target, gl2.TEXTURE_MIN_FILTER, filtering);
                  gl2.texParameteri(target, gl2.TEXTURE_MAG_FILTER, filtering);
                  gl2.texParameteri(target, gl2.TEXTURE_WRAP_S, gl2.CLAMP_TO_EDGE);
                  gl2.texParameteri(target, gl2.TEXTURE_WRAP_T, gl2.CLAMP_TO_EDGE);
                }
              }
              function shouldAutomaticallySetTextureFilteringForSize(options) {
                return options.auto === true || options.auto === void 0 && options.level === void 0;
              }
              function getCubeFaceOrder(gl2, options) {
                options = options || {};
                return options.cubeFaceOrder || [gl2.TEXTURE_CUBE_MAP_POSITIVE_X, gl2.TEXTURE_CUBE_MAP_NEGATIVE_X, gl2.TEXTURE_CUBE_MAP_POSITIVE_Y, gl2.TEXTURE_CUBE_MAP_NEGATIVE_Y, gl2.TEXTURE_CUBE_MAP_POSITIVE_Z, gl2.TEXTURE_CUBE_MAP_NEGATIVE_Z];
              }
              function getCubeFacesWithNdx(gl2, options) {
                var faces = getCubeFaceOrder(gl2, options);
                var facesWithNdx = faces.map(function(face, ndx) {
                  return {
                    face,
                    ndx
                  };
                });
                facesWithNdx.sort(function(a, b) {
                  return a.face - b.face;
                });
                return facesWithNdx;
              }
              function setTextureFromElement(gl2, tex, element, options) {
                options = options || defaults.textureOptions;
                var target = options.target || gl2.TEXTURE_2D;
                var level = options.level || 0;
                var width = element.width;
                var height = element.height;
                var internalFormat = options.internalFormat || options.format || gl2.RGBA;
                var formatType = getFormatAndTypeForInternalFormat(internalFormat);
                var format = options.format || formatType.format;
                var type = options.type || formatType.type;
                savePackState(gl2, options);
                gl2.bindTexture(target, tex);
                if (target === gl2.TEXTURE_CUBE_MAP) {
                  var imgWidth = element.width;
                  var imgHeight = element.height;
                  var size;
                  var slices;
                  if (imgWidth / 6 === imgHeight) {
                    size = imgHeight;
                    slices = [0, 0, 1, 0, 2, 0, 3, 0, 4, 0, 5, 0];
                  } else if (imgHeight / 6 === imgWidth) {
                    size = imgWidth;
                    slices = [0, 0, 0, 1, 0, 2, 0, 3, 0, 4, 0, 5];
                  } else if (imgWidth / 3 === imgHeight / 2) {
                    size = imgWidth / 3;
                    slices = [0, 0, 1, 0, 2, 0, 0, 1, 1, 1, 2, 1];
                  } else if (imgWidth / 2 === imgHeight / 3) {
                    size = imgWidth / 2;
                    slices = [0, 0, 1, 0, 0, 1, 1, 1, 0, 2, 1, 2];
                  } else {
                    throw "can't figure out cube map from element: " + (element.src ? element.src : element.nodeName);
                  }
                  if (ctx) {
                    ctx.canvas.width = size;
                    ctx.canvas.height = size;
                    width = size;
                    height = size;
                    getCubeFacesWithNdx(gl2, options).forEach(function(f2) {
                      var xOffset = slices[f2.ndx * 2 + 0] * size;
                      var yOffset = slices[f2.ndx * 2 + 1] * size;
                      ctx.drawImage(element, xOffset, yOffset, size, size, 0, 0, size, size);
                      gl2.texImage2D(f2.face, level, internalFormat, format, type, ctx.canvas);
                    });
                    ctx.canvas.width = 1;
                    ctx.canvas.height = 1;
                  } else if (_globalObject.default.createImageBitmap) {
                    width = size;
                    height = size;
                    getCubeFacesWithNdx(gl2, options).forEach(function(f2) {
                      var xOffset = slices[f2.ndx * 2 + 0] * size;
                      var yOffset = slices[f2.ndx * 2 + 1] * size;
                      gl2.texImage2D(f2.face, level, internalFormat, size, size, 0, format, type, null);
                      _globalObject.default.createImageBitmap(element, xOffset, yOffset, size, size, {
                        premultiplyAlpha: "none",
                        colorSpaceConversion: "none"
                      }).then(function(imageBitmap) {
                        savePackState(gl2, options);
                        gl2.bindTexture(target, tex);
                        gl2.texImage2D(f2.face, level, internalFormat, format, type, imageBitmap);
                        restorePackState(gl2, options);
                        if (shouldAutomaticallySetTextureFilteringForSize(options)) {
                          setTextureFilteringForSize(gl2, tex, options, width, height, internalFormat, type);
                        }
                      });
                    });
                  }
                } else if (target === gl2.TEXTURE_3D || target === gl2.TEXTURE_2D_ARRAY) {
                  var smallest = Math.min(element.width, element.height);
                  var largest = Math.max(element.width, element.height);
                  var depth = largest / smallest;
                  if (depth % 1 !== 0) {
                    throw "can not compute 3D dimensions of element";
                  }
                  var xMult = element.width === largest ? 1 : 0;
                  var yMult = element.height === largest ? 1 : 0;
                  saveSkipState(gl2);
                  gl2.pixelStorei(gl2.UNPACK_ALIGNMENT, 1);
                  gl2.pixelStorei(gl2.UNPACK_ROW_LENGTH, element.width);
                  gl2.pixelStorei(gl2.UNPACK_IMAGE_HEIGHT, 0);
                  gl2.pixelStorei(gl2.UNPACK_SKIP_IMAGES, 0);
                  gl2.texImage3D(target, level, internalFormat, smallest, smallest, smallest, 0, format, type, null);
                  for (var d = 0; d < depth; ++d) {
                    var srcX = d * smallest * xMult;
                    var srcY = d * smallest * yMult;
                    gl2.pixelStorei(gl2.UNPACK_SKIP_PIXELS, srcX);
                    gl2.pixelStorei(gl2.UNPACK_SKIP_ROWS, srcY);
                    gl2.texSubImage3D(target, level, 0, 0, d, smallest, smallest, 1, format, type, element);
                  }
                  restoreSkipState(gl2);
                } else {
                  gl2.texImage2D(target, level, internalFormat, format, type, element);
                }
                restorePackState(gl2, options);
                if (shouldAutomaticallySetTextureFilteringForSize(options)) {
                  setTextureFilteringForSize(gl2, tex, options, width, height, internalFormat, type);
                }
                setTextureParameters(gl2, tex, options);
              }
              function noop() {
              }
              function loadImage(url, crossOrigin, callback) {
                callback = callback || noop;
                var img;
                if (_globalObject.default.Image) {
                  img = new _globalObject.default.Image();
                  crossOrigin = crossOrigin !== void 0 ? crossOrigin : defaults.crossOrigin;
                  if (crossOrigin !== void 0) {
                    img.crossOrigin = crossOrigin;
                  }
                  var clearEventHandlers = function clearEventHandlers2() {
                    img.removeEventListener("error", onError);
                    img.removeEventListener("load", onLoad);
                    img = null;
                  };
                  var onError = function onError2() {
                    var msg = "couldn't load image: " + url;
                    helper.error(msg);
                    callback(msg, img);
                    clearEventHandlers();
                  };
                  var onLoad = function onLoad2() {
                    callback(null, img);
                    clearEventHandlers();
                  };
                  img.addEventListener("error", onError);
                  img.addEventListener("load", onLoad);
                  img.src = url;
                  return img;
                } else if (_globalObject.default.ImageBitmap) {
                  var err;
                  var bm;
                  var cb = function cb2() {
                    callback(err, bm);
                  };
                  var options = {};
                  if (crossOrigin) {
                    options.mode = "cors";
                  }
                  fetch(url, options).then(function(response) {
                    if (!response.ok) {
                      throw response;
                    }
                    return response.blob();
                  }).then(function(blob) {
                    return _globalObject.default.createImageBitmap(blob, {
                      premultiplyAlpha: "none",
                      colorSpaceConversion: "none"
                    });
                  }).then(function(bitmap) {
                    bm = bitmap;
                    setTimeout(cb);
                  }).catch(function(e) {
                    err = e;
                    setTimeout(cb);
                  });
                  img = null;
                }
                return img;
              }
              function isTexImageSource(obj) {
                return _globalObject.default.ImageBitmap && obj instanceof _globalObject.default.ImageBitmap || _globalObject.default.ImageData && obj instanceof _globalObject.default.ImageData || _globalObject.default.HTMLElement && obj instanceof _globalObject.default.HTMLElement;
              }
              function loadAndUseImage(obj, crossOrigin, callback) {
                if (isTexImageSource(obj)) {
                  setTimeout(function() {
                    callback(null, obj);
                  });
                  return obj;
                }
                return loadImage(obj, crossOrigin, callback);
              }
              function setTextureTo1PixelColor(gl2, tex, options) {
                options = options || defaults.textureOptions;
                var target = options.target || gl2.TEXTURE_2D;
                gl2.bindTexture(target, tex);
                if (options.color === false) {
                  return;
                }
                var color = make1Pixel(options.color);
                if (target === gl2.TEXTURE_CUBE_MAP) {
                  for (var ii2 = 0; ii2 < 6; ++ii2) {
                    gl2.texImage2D(gl2.TEXTURE_CUBE_MAP_POSITIVE_X + ii2, 0, gl2.RGBA, 1, 1, 0, gl2.RGBA, gl2.UNSIGNED_BYTE, color);
                  }
                } else if (target === gl2.TEXTURE_3D || target === gl2.TEXTURE_2D_ARRAY) {
                  gl2.texImage3D(target, 0, gl2.RGBA, 1, 1, 1, 0, gl2.RGBA, gl2.UNSIGNED_BYTE, color);
                } else {
                  gl2.texImage2D(target, 0, gl2.RGBA, 1, 1, 0, gl2.RGBA, gl2.UNSIGNED_BYTE, color);
                }
              }
              function loadTextureFromUrl(gl2, tex, options, callback) {
                callback = callback || noop;
                options = options || defaults.textureOptions;
                setTextureTo1PixelColor(gl2, tex, options);
                options = Object.assign({}, options);
                var img = loadAndUseImage(options.src, options.crossOrigin, function(err, img2) {
                  if (err) {
                    callback(err, tex, img2);
                  } else {
                    setTextureFromElement(gl2, tex, img2, options);
                    callback(null, tex, img2);
                  }
                });
                return img;
              }
              function loadCubemapFromUrls(gl2, tex, options, callback) {
                callback = callback || noop;
                var urls = options.src;
                if (urls.length !== 6) {
                  throw "there must be 6 urls for a cubemap";
                }
                var level = options.level || 0;
                var internalFormat = options.internalFormat || options.format || gl2.RGBA;
                var formatType = getFormatAndTypeForInternalFormat(internalFormat);
                var format = options.format || formatType.format;
                var type = options.type || gl2.UNSIGNED_BYTE;
                var target = options.target || gl2.TEXTURE_2D;
                if (target !== gl2.TEXTURE_CUBE_MAP) {
                  throw "target must be TEXTURE_CUBE_MAP";
                }
                setTextureTo1PixelColor(gl2, tex, options);
                options = Object.assign({}, options);
                var numToLoad = 6;
                var errors = [];
                var faces = getCubeFaceOrder(gl2, options);
                var imgs;
                function uploadImg(faceTarget) {
                  return function(err, img) {
                    --numToLoad;
                    if (err) {
                      errors.push(err);
                    } else {
                      if (img.width !== img.height) {
                        errors.push("cubemap face img is not a square: " + img.src);
                      } else {
                        savePackState(gl2, options);
                        gl2.bindTexture(target, tex);
                        if (numToLoad === 5) {
                          getCubeFaceOrder(gl2).forEach(function(otherTarget) {
                            gl2.texImage2D(otherTarget, level, internalFormat, format, type, img);
                          });
                        } else {
                          gl2.texImage2D(faceTarget, level, internalFormat, format, type, img);
                        }
                        restorePackState(gl2, options);
                        if (shouldAutomaticallySetTextureFilteringForSize(options)) {
                          gl2.generateMipmap(target);
                        }
                      }
                    }
                    if (numToLoad === 0) {
                      callback(errors.length ? errors : void 0, tex, imgs);
                    }
                  };
                }
                imgs = urls.map(function(url, ndx) {
                  return loadAndUseImage(url, options.crossOrigin, uploadImg(faces[ndx]));
                });
              }
              function loadSlicesFromUrls(gl2, tex, options, callback) {
                callback = callback || noop;
                var urls = options.src;
                var internalFormat = options.internalFormat || options.format || gl2.RGBA;
                var formatType = getFormatAndTypeForInternalFormat(internalFormat);
                var format = options.format || formatType.format;
                var type = options.type || gl2.UNSIGNED_BYTE;
                var target = options.target || gl2.TEXTURE_2D_ARRAY;
                if (target !== gl2.TEXTURE_3D && target !== gl2.TEXTURE_2D_ARRAY) {
                  throw "target must be TEXTURE_3D or TEXTURE_2D_ARRAY";
                }
                setTextureTo1PixelColor(gl2, tex, options);
                options = Object.assign({}, options);
                var numToLoad = urls.length;
                var errors = [];
                var imgs;
                var level = options.level || 0;
                var width = options.width;
                var height = options.height;
                var depth = urls.length;
                var firstImage = true;
                function uploadImg(slice) {
                  return function(err, img) {
                    --numToLoad;
                    if (err) {
                      errors.push(err);
                    } else {
                      savePackState(gl2, options);
                      gl2.bindTexture(target, tex);
                      if (firstImage) {
                        firstImage = false;
                        width = options.width || img.width;
                        height = options.height || img.height;
                        gl2.texImage3D(target, level, internalFormat, width, height, depth, 0, format, type, null);
                        for (var s = 0; s < depth; ++s) {
                          gl2.texSubImage3D(target, level, 0, 0, s, width, height, 1, format, type, img);
                        }
                      } else {
                        var src = img;
                        if (img.width !== width || img.height !== height) {
                          src = ctx.canvas;
                          ctx.canvas.width = width;
                          ctx.canvas.height = height;
                          ctx.drawImage(img, 0, 0, width, height);
                        }
                        gl2.texSubImage3D(target, level, 0, 0, slice, width, height, 1, format, type, src);
                        if (src === ctx.canvas) {
                          ctx.canvas.width = 0;
                          ctx.canvas.height = 0;
                        }
                      }
                      restorePackState(gl2, options);
                      if (shouldAutomaticallySetTextureFilteringForSize(options)) {
                        gl2.generateMipmap(target);
                      }
                    }
                    if (numToLoad === 0) {
                      callback(errors.length ? errors : void 0, tex, imgs);
                    }
                  };
                }
                imgs = urls.map(function(url, ndx) {
                  return loadAndUseImage(url, options.crossOrigin, uploadImg(ndx));
                });
              }
              function setTextureFromArray(gl2, tex, src, options) {
                options = options || defaults.textureOptions;
                var target = options.target || gl2.TEXTURE_2D;
                gl2.bindTexture(target, tex);
                var width = options.width;
                var height = options.height;
                var depth = options.depth;
                var level = options.level || 0;
                var internalFormat = options.internalFormat || options.format || gl2.RGBA;
                var formatType = getFormatAndTypeForInternalFormat(internalFormat);
                var format = options.format || formatType.format;
                var type = options.type || getTextureTypeForArrayType(gl2, src, formatType.type);
                if (!isArrayBuffer(src)) {
                  var Type = typedArrays.getTypedArrayTypeForGLType(type);
                  src = new Type(src);
                } else if (src instanceof Uint8ClampedArray) {
                  src = new Uint8Array(src.buffer);
                }
                var bytesPerElement = getBytesPerElementForInternalFormat(internalFormat, type);
                var numElements = src.byteLength / bytesPerElement;
                if (numElements % 1) {
                  throw "length wrong size for format: " + utils.glEnumToString(gl2, format);
                }
                var dimensions;
                if (target === gl2.TEXTURE_3D) {
                  if (!width && !height && !depth) {
                    var size = Math.cbrt(numElements);
                    if (size % 1 !== 0) {
                      throw "can't guess cube size of array of numElements: " + numElements;
                    }
                    width = size;
                    height = size;
                    depth = size;
                  } else if (width && (!height || !depth)) {
                    dimensions = guessDimensions(gl2, target, height, depth, numElements / width);
                    height = dimensions.width;
                    depth = dimensions.height;
                  } else if (height && (!width || !depth)) {
                    dimensions = guessDimensions(gl2, target, width, depth, numElements / height);
                    width = dimensions.width;
                    depth = dimensions.height;
                  } else {
                    dimensions = guessDimensions(gl2, target, width, height, numElements / depth);
                    width = dimensions.width;
                    height = dimensions.height;
                  }
                } else {
                  dimensions = guessDimensions(gl2, target, width, height, numElements);
                  width = dimensions.width;
                  height = dimensions.height;
                }
                saveSkipState(gl2);
                gl2.pixelStorei(gl2.UNPACK_ALIGNMENT, options.unpackAlignment || 1);
                savePackState(gl2, options);
                if (target === gl2.TEXTURE_CUBE_MAP) {
                  var elementsPerElement = bytesPerElement / src.BYTES_PER_ELEMENT;
                  var faceSize = numElements / 6 * elementsPerElement;
                  getCubeFacesWithNdx(gl2, options).forEach(function(f2) {
                    var offset = faceSize * f2.ndx;
                    var data = src.subarray(offset, offset + faceSize);
                    gl2.texImage2D(f2.face, level, internalFormat, width, height, 0, format, type, data);
                  });
                } else if (target === gl2.TEXTURE_3D) {
                  gl2.texImage3D(target, level, internalFormat, width, height, depth, 0, format, type, src);
                } else {
                  gl2.texImage2D(target, level, internalFormat, width, height, 0, format, type, src);
                }
                restorePackState(gl2, options);
                restoreSkipState(gl2);
                return {
                  width,
                  height,
                  depth,
                  type
                };
              }
              function setEmptyTexture(gl2, tex, options) {
                var target = options.target || gl2.TEXTURE_2D;
                gl2.bindTexture(target, tex);
                var level = options.level || 0;
                var internalFormat = options.internalFormat || options.format || gl2.RGBA;
                var formatType = getFormatAndTypeForInternalFormat(internalFormat);
                var format = options.format || formatType.format;
                var type = options.type || formatType.type;
                savePackState(gl2, options);
                if (target === gl2.TEXTURE_CUBE_MAP) {
                  for (var ii2 = 0; ii2 < 6; ++ii2) {
                    gl2.texImage2D(gl2.TEXTURE_CUBE_MAP_POSITIVE_X + ii2, level, internalFormat, options.width, options.height, 0, format, type, null);
                  }
                } else if (target === gl2.TEXTURE_3D) {
                  gl2.texImage3D(target, level, internalFormat, options.width, options.height, options.depth, 0, format, type, null);
                } else {
                  gl2.texImage2D(target, level, internalFormat, options.width, options.height, 0, format, type, null);
                }
                restorePackState(gl2, options);
              }
              function createTexture(gl2, options, callback) {
                callback = callback || noop;
                options = options || defaults.textureOptions;
                var tex = gl2.createTexture();
                var target = options.target || gl2.TEXTURE_2D;
                var width = options.width || 1;
                var height = options.height || 1;
                var internalFormat = options.internalFormat || gl2.RGBA;
                var formatType = getFormatAndTypeForInternalFormat(internalFormat);
                var type = options.type || formatType.type;
                gl2.bindTexture(target, tex);
                if (target === gl2.TEXTURE_CUBE_MAP) {
                  gl2.texParameteri(target, gl2.TEXTURE_WRAP_S, gl2.CLAMP_TO_EDGE);
                  gl2.texParameteri(target, gl2.TEXTURE_WRAP_T, gl2.CLAMP_TO_EDGE);
                }
                var src = options.src;
                if (src) {
                  if (typeof src === "function") {
                    src = src(gl2, options);
                  }
                  if (typeof src === "string") {
                    loadTextureFromUrl(gl2, tex, options, callback);
                  } else if (isArrayBuffer(src) || Array.isArray(src) && (typeof src[0] === "number" || Array.isArray(src[0]) || isArrayBuffer(src[0]))) {
                    var dimensions = setTextureFromArray(gl2, tex, src, options);
                    width = dimensions.width;
                    height = dimensions.height;
                    type = dimensions.type;
                  } else if (Array.isArray(src) && (typeof src[0] === "string" || isTexImageSource(src[0]))) {
                    if (target === gl2.TEXTURE_CUBE_MAP) {
                      loadCubemapFromUrls(gl2, tex, options, callback);
                    } else {
                      loadSlicesFromUrls(gl2, tex, options, callback);
                    }
                  } else if (isTexImageSource(src)) {
                    setTextureFromElement(gl2, tex, src, options);
                    width = src.width;
                    height = src.height;
                  } else {
                    throw "unsupported src type";
                  }
                } else {
                  setEmptyTexture(gl2, tex, options);
                }
                if (shouldAutomaticallySetTextureFilteringForSize(options)) {
                  setTextureFilteringForSize(gl2, tex, options, width, height, internalFormat, type);
                }
                setTextureParameters(gl2, tex, options);
                return tex;
              }
              function resizeTexture(gl2, tex, options, width, height) {
                width = width || options.width;
                height = height || options.height;
                var target = options.target || gl2.TEXTURE_2D;
                gl2.bindTexture(target, tex);
                var level = options.level || 0;
                var internalFormat = options.internalFormat || options.format || gl2.RGBA;
                var formatType = getFormatAndTypeForInternalFormat(internalFormat);
                var format = options.format || formatType.format;
                var type;
                var src = options.src;
                if (!src) {
                  type = options.type || formatType.type;
                } else if (isArrayBuffer(src) || Array.isArray(src) && typeof src[0] === "number") {
                  type = options.type || getTextureTypeForArrayType(gl2, src, formatType.type);
                } else {
                  type = options.type || formatType.type;
                }
                if (target === gl2.TEXTURE_CUBE_MAP) {
                  for (var ii2 = 0; ii2 < 6; ++ii2) {
                    gl2.texImage2D(gl2.TEXTURE_CUBE_MAP_POSITIVE_X + ii2, level, internalFormat, width, height, 0, format, type, null);
                  }
                } else {
                  gl2.texImage2D(target, level, internalFormat, width, height, 0, format, type, null);
                }
              }
              function isAsyncSrc(src) {
                return typeof src === "string" || Array.isArray(src) && typeof src[0] === "string";
              }
              function createTextures(gl2, textureOptions, callback) {
                callback = callback || noop;
                var numDownloading = 0;
                var errors = [];
                var textures = {};
                var images = {};
                function callCallbackIfReady() {
                  if (numDownloading === 0) {
                    setTimeout(function() {
                      callback(errors.length ? errors : void 0, textures, images);
                    }, 0);
                  }
                }
                Object.keys(textureOptions).forEach(function(name) {
                  var options = textureOptions[name];
                  var onLoadFn;
                  if (isAsyncSrc(options.src)) {
                    onLoadFn = function onLoadFn2(err, tex, img) {
                      images[name] = img;
                      --numDownloading;
                      if (err) {
                        errors.push(err);
                      }
                      callCallbackIfReady();
                    };
                    ++numDownloading;
                  }
                  textures[name] = createTexture(gl2, options, onLoadFn);
                });
                callCallbackIfReady();
                return textures;
              }
            }),
            (function(module2, exports2, __webpack_require__) {
              "use strict";
              exports2.__esModule = true;
              var _exportNames = {
                m4: true,
                v3: true,
                primitives: true
              };
              exports2.primitives = exports2.v3 = exports2.m4 = void 0;
              var m4 = _interopRequireWildcard(__webpack_require__(6));
              exports2.m4 = m4;
              var v3 = _interopRequireWildcard(__webpack_require__(3));
              exports2.v3 = v3;
              var primitives = _interopRequireWildcard(__webpack_require__(10));
              exports2.primitives = primitives;
              var _twgl = __webpack_require__(11);
              Object.keys(_twgl).forEach(function(key) {
                if (key === "default" || key === "__esModule") return;
                if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
                exports2[key] = _twgl[key];
              });
              function _interopRequireWildcard(obj) {
                if (obj && obj.__esModule) {
                  return obj;
                } else {
                  var newObj = {};
                  if (obj != null) {
                    for (var key in obj) {
                      if (Object.prototype.hasOwnProperty.call(obj, key)) {
                        var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};
                        if (desc.get || desc.set) {
                          Object.defineProperty(newObj, key, desc);
                        } else {
                          newObj[key] = obj[key];
                        }
                      }
                    }
                  }
                  newObj.default = obj;
                  return newObj;
                }
              }
            }),
            (function(module2, exports2, __webpack_require__) {
              "use strict";
              exports2.__esModule = true;
              exports2.create3DFVertices = create3DFVertices;
              exports2.createAugmentedTypedArray = createAugmentedTypedArray;
              exports2.createCubeVertices = createCubeVertices;
              exports2.createPlaneVertices = createPlaneVertices;
              exports2.createSphereVertices = createSphereVertices;
              exports2.createTruncatedConeVertices = createTruncatedConeVertices;
              exports2.createXYQuadVertices = createXYQuadVertices;
              exports2.createCresentVertices = createCresentVertices;
              exports2.createCylinderVertices = createCylinderVertices;
              exports2.createTorusVertices = createTorusVertices;
              exports2.createDiscVertices = createDiscVertices;
              exports2.deindexVertices = deindexVertices;
              exports2.flattenNormals = flattenNormals;
              exports2.makeRandomVertexColors = makeRandomVertexColors;
              exports2.reorientDirections = reorientDirections;
              exports2.reorientNormals = reorientNormals;
              exports2.reorientPositions = reorientPositions;
              exports2.reorientVertices = reorientVertices;
              exports2.concatVertices = concatVertices;
              exports2.duplicateVertices = duplicateVertices;
              exports2.createDiscBuffers = exports2.createDiscBufferInfo = exports2.createTorusBuffers = exports2.createTorusBufferInfo = exports2.createCylinderBuffers = exports2.createCylinderBufferInfo = exports2.createCresentBuffers = exports2.createCresentBufferInfo = exports2.createXYQuadBuffers = exports2.createXYQuadBufferInfo = exports2.createTruncatedConeBuffers = exports2.createTruncatedConeBufferInfo = exports2.createSphereBuffers = exports2.createSphereBufferInfo = exports2.createPlaneBuffers = exports2.createPlaneBufferInfo = exports2.createCubeBuffers = exports2.createCubeBufferInfo = exports2.create3DFBuffers = exports2.create3DFBufferInfo = void 0;
              var attributes = _interopRequireWildcard(__webpack_require__(7));
              var helper = _interopRequireWildcard(__webpack_require__(0));
              var typedArrays = _interopRequireWildcard(__webpack_require__(1));
              var m4 = _interopRequireWildcard(__webpack_require__(6));
              var v3 = _interopRequireWildcard(__webpack_require__(3));
              function _interopRequireWildcard(obj) {
                if (obj && obj.__esModule) {
                  return obj;
                } else {
                  var newObj = {};
                  if (obj != null) {
                    for (var key in obj) {
                      if (Object.prototype.hasOwnProperty.call(obj, key)) {
                        var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};
                        if (desc.get || desc.set) {
                          Object.defineProperty(newObj, key, desc);
                        } else {
                          newObj[key] = obj[key];
                        }
                      }
                    }
                  }
                  newObj.default = obj;
                  return newObj;
                }
              }
              var getArray = attributes.getArray_;
              var getNumComponents = attributes.getNumComponents_;
              function augmentTypedArray(typedArray, numComponents) {
                var cursor = 0;
                typedArray.push = function() {
                  for (var ii2 = 0; ii2 < arguments.length; ++ii2) {
                    var value = arguments[ii2];
                    if (value instanceof Array || typedArrays.isArrayBuffer(value)) {
                      for (var jj = 0; jj < value.length; ++jj) {
                        typedArray[cursor++] = value[jj];
                      }
                    } else {
                      typedArray[cursor++] = value;
                    }
                  }
                };
                typedArray.reset = function(opt_index) {
                  cursor = opt_index || 0;
                };
                typedArray.numComponents = numComponents;
                Object.defineProperty(typedArray, "numElements", {
                  get: function get() {
                    return this.length / this.numComponents | 0;
                  }
                });
                return typedArray;
              }
              function createAugmentedTypedArray(numComponents, numElements, opt_type) {
                var Type = opt_type || Float32Array;
                return augmentTypedArray(new Type(numComponents * numElements), numComponents);
              }
              function allButIndices(name) {
                return name !== "indices";
              }
              function deindexVertices(vertices) {
                var indices = vertices.indices;
                var newVertices = {};
                var numElements = indices.length;
                function expandToUnindexed(channel) {
                  var srcBuffer = vertices[channel];
                  var numComponents = srcBuffer.numComponents;
                  var dstBuffer = createAugmentedTypedArray(numComponents, numElements, srcBuffer.constructor);
                  for (var ii2 = 0; ii2 < numElements; ++ii2) {
                    var ndx = indices[ii2];
                    var offset = ndx * numComponents;
                    for (var jj = 0; jj < numComponents; ++jj) {
                      dstBuffer.push(srcBuffer[offset + jj]);
                    }
                  }
                  newVertices[channel] = dstBuffer;
                }
                Object.keys(vertices).filter(allButIndices).forEach(expandToUnindexed);
                return newVertices;
              }
              function flattenNormals(vertices) {
                if (vertices.indices) {
                  throw "can't flatten normals of indexed vertices. deindex them first";
                }
                var normals = vertices.normal;
                var numNormals = normals.length;
                for (var ii2 = 0; ii2 < numNormals; ii2 += 9) {
                  var nax = normals[ii2 + 0];
                  var nay = normals[ii2 + 1];
                  var naz = normals[ii2 + 2];
                  var nbx = normals[ii2 + 3];
                  var nby = normals[ii2 + 4];
                  var nbz = normals[ii2 + 5];
                  var ncx = normals[ii2 + 6];
                  var ncy = normals[ii2 + 7];
                  var ncz = normals[ii2 + 8];
                  var nx = nax + nbx + ncx;
                  var ny = nay + nby + ncy;
                  var nz = naz + nbz + ncz;
                  var length2 = Math.sqrt(nx * nx + ny * ny + nz * nz);
                  nx /= length2;
                  ny /= length2;
                  nz /= length2;
                  normals[ii2 + 0] = nx;
                  normals[ii2 + 1] = ny;
                  normals[ii2 + 2] = nz;
                  normals[ii2 + 3] = nx;
                  normals[ii2 + 4] = ny;
                  normals[ii2 + 5] = nz;
                  normals[ii2 + 6] = nx;
                  normals[ii2 + 7] = ny;
                  normals[ii2 + 8] = nz;
                }
                return vertices;
              }
              function applyFuncToV3Array(array, matrix, fn) {
                var len = array.length;
                var tmp = new Float32Array(3);
                for (var ii2 = 0; ii2 < len; ii2 += 3) {
                  fn(matrix, [array[ii2], array[ii2 + 1], array[ii2 + 2]], tmp);
                  array[ii2] = tmp[0];
                  array[ii2 + 1] = tmp[1];
                  array[ii2 + 2] = tmp[2];
                }
              }
              function transformNormal(mi, v, dst) {
                dst = dst || v3.create();
                var v0 = v[0];
                var v1 = v[1];
                var v2 = v[2];
                dst[0] = v0 * mi[0 * 4 + 0] + v1 * mi[0 * 4 + 1] + v2 * mi[0 * 4 + 2];
                dst[1] = v0 * mi[1 * 4 + 0] + v1 * mi[1 * 4 + 1] + v2 * mi[1 * 4 + 2];
                dst[2] = v0 * mi[2 * 4 + 0] + v1 * mi[2 * 4 + 1] + v2 * mi[2 * 4 + 2];
                return dst;
              }
              function reorientDirections(array, matrix) {
                applyFuncToV3Array(array, matrix, m4.transformDirection);
                return array;
              }
              function reorientNormals(array, matrix) {
                applyFuncToV3Array(array, m4.inverse(matrix), transformNormal);
                return array;
              }
              function reorientPositions(array, matrix) {
                applyFuncToV3Array(array, matrix, m4.transformPoint);
                return array;
              }
              function reorientVertices(arrays, matrix) {
                Object.keys(arrays).forEach(function(name) {
                  var array = arrays[name];
                  if (name.indexOf("pos") >= 0) {
                    reorientPositions(array, matrix);
                  } else if (name.indexOf("tan") >= 0 || name.indexOf("binorm") >= 0) {
                    reorientDirections(array, matrix);
                  } else if (name.indexOf("norm") >= 0) {
                    reorientNormals(array, matrix);
                  }
                });
                return arrays;
              }
              function createXYQuadVertices(size, xOffset, yOffset) {
                size = size || 2;
                xOffset = xOffset || 0;
                yOffset = yOffset || 0;
                size *= 0.5;
                return {
                  position: {
                    numComponents: 2,
                    data: [xOffset + -1 * size, yOffset + -1 * size, xOffset + 1 * size, yOffset + -1 * size, xOffset + -1 * size, yOffset + 1 * size, xOffset + 1 * size, yOffset + 1 * size]
                  },
                  normal: [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
                  texcoord: [0, 0, 1, 0, 0, 1, 1, 1],
                  indices: [0, 1, 2, 2, 1, 3]
                };
              }
              function createPlaneVertices(width, depth, subdivisionsWidth, subdivisionsDepth, matrix) {
                width = width || 1;
                depth = depth || 1;
                subdivisionsWidth = subdivisionsWidth || 1;
                subdivisionsDepth = subdivisionsDepth || 1;
                matrix = matrix || m4.identity();
                var numVertices = (subdivisionsWidth + 1) * (subdivisionsDepth + 1);
                var positions = createAugmentedTypedArray(3, numVertices);
                var normals = createAugmentedTypedArray(3, numVertices);
                var texcoords = createAugmentedTypedArray(2, numVertices);
                for (var z = 0; z <= subdivisionsDepth; z++) {
                  for (var x = 0; x <= subdivisionsWidth; x++) {
                    var u = x / subdivisionsWidth;
                    var v = z / subdivisionsDepth;
                    positions.push(width * u - width * 0.5, 0, depth * v - depth * 0.5);
                    normals.push(0, 1, 0);
                    texcoords.push(u, v);
                  }
                }
                var numVertsAcross = subdivisionsWidth + 1;
                var indices = createAugmentedTypedArray(3, subdivisionsWidth * subdivisionsDepth * 2, Uint16Array);
                for (var _z = 0; _z < subdivisionsDepth; _z++) {
                  for (var _x = 0; _x < subdivisionsWidth; _x++) {
                    indices.push((_z + 0) * numVertsAcross + _x, (_z + 1) * numVertsAcross + _x, (_z + 0) * numVertsAcross + _x + 1);
                    indices.push((_z + 1) * numVertsAcross + _x, (_z + 1) * numVertsAcross + _x + 1, (_z + 0) * numVertsAcross + _x + 1);
                  }
                }
                var arrays = reorientVertices({
                  position: positions,
                  normal: normals,
                  texcoord: texcoords,
                  indices
                }, matrix);
                return arrays;
              }
              function createSphereVertices(radius, subdivisionsAxis, subdivisionsHeight, opt_startLatitudeInRadians, opt_endLatitudeInRadians, opt_startLongitudeInRadians, opt_endLongitudeInRadians) {
                if (subdivisionsAxis <= 0 || subdivisionsHeight <= 0) {
                  throw Error("subdivisionAxis and subdivisionHeight must be > 0");
                }
                opt_startLatitudeInRadians = opt_startLatitudeInRadians || 0;
                opt_endLatitudeInRadians = opt_endLatitudeInRadians || Math.PI;
                opt_startLongitudeInRadians = opt_startLongitudeInRadians || 0;
                opt_endLongitudeInRadians = opt_endLongitudeInRadians || Math.PI * 2;
                var latRange = opt_endLatitudeInRadians - opt_startLatitudeInRadians;
                var longRange = opt_endLongitudeInRadians - opt_startLongitudeInRadians;
                var numVertices = (subdivisionsAxis + 1) * (subdivisionsHeight + 1);
                var positions = createAugmentedTypedArray(3, numVertices);
                var normals = createAugmentedTypedArray(3, numVertices);
                var texcoords = createAugmentedTypedArray(2, numVertices);
                for (var y = 0; y <= subdivisionsHeight; y++) {
                  for (var x = 0; x <= subdivisionsAxis; x++) {
                    var u = x / subdivisionsAxis;
                    var v = y / subdivisionsHeight;
                    var theta = longRange * u;
                    var phi = latRange * v;
                    var sinTheta = Math.sin(theta);
                    var cosTheta = Math.cos(theta);
                    var sinPhi = Math.sin(phi);
                    var cosPhi = Math.cos(phi);
                    var ux = cosTheta * sinPhi;
                    var uy = cosPhi;
                    var uz = sinTheta * sinPhi;
                    positions.push(radius * ux, radius * uy, radius * uz);
                    normals.push(ux, uy, uz);
                    texcoords.push(1 - u, v);
                  }
                }
                var numVertsAround = subdivisionsAxis + 1;
                var indices = createAugmentedTypedArray(3, subdivisionsAxis * subdivisionsHeight * 2, Uint16Array);
                for (var _x2 = 0; _x2 < subdivisionsAxis; _x2++) {
                  for (var _y = 0; _y < subdivisionsHeight; _y++) {
                    indices.push((_y + 0) * numVertsAround + _x2, (_y + 0) * numVertsAround + _x2 + 1, (_y + 1) * numVertsAround + _x2);
                    indices.push((_y + 1) * numVertsAround + _x2, (_y + 0) * numVertsAround + _x2 + 1, (_y + 1) * numVertsAround + _x2 + 1);
                  }
                }
                return {
                  position: positions,
                  normal: normals,
                  texcoord: texcoords,
                  indices
                };
              }
              var CUBE_FACE_INDICES = [
                [3, 7, 5, 1],
                [6, 2, 0, 4],
                [6, 7, 3, 2],
                [0, 1, 5, 4],
                [7, 6, 4, 5],
                [2, 3, 1, 0]
              ];
              function createCubeVertices(size) {
                size = size || 1;
                var k = size / 2;
                var cornerVertices = [[-k, -k, -k], [+k, -k, -k], [-k, +k, -k], [+k, +k, -k], [-k, -k, +k], [+k, -k, +k], [-k, +k, +k], [+k, +k, +k]];
                var faceNormals = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]];
                var uvCoords = [[1, 0], [0, 0], [0, 1], [1, 1]];
                var numVertices = 6 * 4;
                var positions = createAugmentedTypedArray(3, numVertices);
                var normals = createAugmentedTypedArray(3, numVertices);
                var texcoords = createAugmentedTypedArray(2, numVertices);
                var indices = createAugmentedTypedArray(3, 6 * 2, Uint16Array);
                for (var f = 0; f < 6; ++f) {
                  var faceIndices = CUBE_FACE_INDICES[f];
                  for (var v = 0; v < 4; ++v) {
                    var position = cornerVertices[faceIndices[v]];
                    var normal = faceNormals[f];
                    var uv = uvCoords[v];
                    positions.push(position);
                    normals.push(normal);
                    texcoords.push(uv);
                  }
                  var offset = 4 * f;
                  indices.push(offset + 0, offset + 1, offset + 2);
                  indices.push(offset + 0, offset + 2, offset + 3);
                }
                return {
                  position: positions,
                  normal: normals,
                  texcoord: texcoords,
                  indices
                };
              }
              function createTruncatedConeVertices(bottomRadius, topRadius, height, radialSubdivisions, verticalSubdivisions, opt_topCap, opt_bottomCap) {
                if (radialSubdivisions < 3) {
                  throw Error("radialSubdivisions must be 3 or greater");
                }
                if (verticalSubdivisions < 1) {
                  throw Error("verticalSubdivisions must be 1 or greater");
                }
                var topCap = opt_topCap === void 0 ? true : opt_topCap;
                var bottomCap = opt_bottomCap === void 0 ? true : opt_bottomCap;
                var extra = (topCap ? 2 : 0) + (bottomCap ? 2 : 0);
                var numVertices = (radialSubdivisions + 1) * (verticalSubdivisions + 1 + extra);
                var positions = createAugmentedTypedArray(3, numVertices);
                var normals = createAugmentedTypedArray(3, numVertices);
                var texcoords = createAugmentedTypedArray(2, numVertices);
                var indices = createAugmentedTypedArray(3, radialSubdivisions * (verticalSubdivisions + extra) * 2, Uint16Array);
                var vertsAroundEdge = radialSubdivisions + 1;
                var slant = Math.atan2(bottomRadius - topRadius, height);
                var cosSlant = Math.cos(slant);
                var sinSlant = Math.sin(slant);
                var start = topCap ? -2 : 0;
                var end = verticalSubdivisions + (bottomCap ? 2 : 0);
                for (var yy = start; yy <= end; ++yy) {
                  var v = yy / verticalSubdivisions;
                  var y = height * v;
                  var ringRadius = void 0;
                  if (yy < 0) {
                    y = 0;
                    v = 1;
                    ringRadius = bottomRadius;
                  } else if (yy > verticalSubdivisions) {
                    y = height;
                    v = 1;
                    ringRadius = topRadius;
                  } else {
                    ringRadius = bottomRadius + (topRadius - bottomRadius) * (yy / verticalSubdivisions);
                  }
                  if (yy === -2 || yy === verticalSubdivisions + 2) {
                    ringRadius = 0;
                    v = 0;
                  }
                  y -= height / 2;
                  for (var ii2 = 0; ii2 < vertsAroundEdge; ++ii2) {
                    var sin = Math.sin(ii2 * Math.PI * 2 / radialSubdivisions);
                    var cos = Math.cos(ii2 * Math.PI * 2 / radialSubdivisions);
                    positions.push(sin * ringRadius, y, cos * ringRadius);
                    normals.push(yy < 0 || yy > verticalSubdivisions ? 0 : sin * cosSlant, yy < 0 ? -1 : yy > verticalSubdivisions ? 1 : sinSlant, yy < 0 || yy > verticalSubdivisions ? 0 : cos * cosSlant);
                    texcoords.push(ii2 / radialSubdivisions, 1 - v);
                  }
                }
                for (var _yy = 0; _yy < verticalSubdivisions + extra; ++_yy) {
                  for (var _ii = 0; _ii < radialSubdivisions; ++_ii) {
                    indices.push(vertsAroundEdge * (_yy + 0) + 0 + _ii, vertsAroundEdge * (_yy + 0) + 1 + _ii, vertsAroundEdge * (_yy + 1) + 1 + _ii);
                    indices.push(vertsAroundEdge * (_yy + 0) + 0 + _ii, vertsAroundEdge * (_yy + 1) + 1 + _ii, vertsAroundEdge * (_yy + 1) + 0 + _ii);
                  }
                }
                return {
                  position: positions,
                  normal: normals,
                  texcoord: texcoords,
                  indices
                };
              }
              function expandRLEData(rleData, padding) {
                padding = padding || [];
                var data = [];
                for (var ii2 = 0; ii2 < rleData.length; ii2 += 4) {
                  var runLength = rleData[ii2];
                  var element = rleData.slice(ii2 + 1, ii2 + 4);
                  element.push.apply(element, padding);
                  for (var jj = 0; jj < runLength; ++jj) {
                    data.push.apply(data, element);
                  }
                }
                return data;
              }
              function create3DFVertices() {
                var positions = [
                  0,
                  0,
                  0,
                  0,
                  150,
                  0,
                  30,
                  0,
                  0,
                  0,
                  150,
                  0,
                  30,
                  150,
                  0,
                  30,
                  0,
                  0,
                  30,
                  0,
                  0,
                  30,
                  30,
                  0,
                  100,
                  0,
                  0,
                  30,
                  30,
                  0,
                  100,
                  30,
                  0,
                  100,
                  0,
                  0,
                  30,
                  60,
                  0,
                  30,
                  90,
                  0,
                  67,
                  60,
                  0,
                  30,
                  90,
                  0,
                  67,
                  90,
                  0,
                  67,
                  60,
                  0,
                  0,
                  0,
                  30,
                  30,
                  0,
                  30,
                  0,
                  150,
                  30,
                  0,
                  150,
                  30,
                  30,
                  0,
                  30,
                  30,
                  150,
                  30,
                  30,
                  0,
                  30,
                  100,
                  0,
                  30,
                  30,
                  30,
                  30,
                  30,
                  30,
                  30,
                  100,
                  0,
                  30,
                  100,
                  30,
                  30,
                  30,
                  60,
                  30,
                  67,
                  60,
                  30,
                  30,
                  90,
                  30,
                  30,
                  90,
                  30,
                  67,
                  60,
                  30,
                  67,
                  90,
                  30,
                  0,
                  0,
                  0,
                  100,
                  0,
                  0,
                  100,
                  0,
                  30,
                  0,
                  0,
                  0,
                  100,
                  0,
                  30,
                  0,
                  0,
                  30,
                  100,
                  0,
                  0,
                  100,
                  30,
                  0,
                  100,
                  30,
                  30,
                  100,
                  0,
                  0,
                  100,
                  30,
                  30,
                  100,
                  0,
                  30,
                  30,
                  30,
                  0,
                  30,
                  30,
                  30,
                  100,
                  30,
                  30,
                  30,
                  30,
                  0,
                  100,
                  30,
                  30,
                  100,
                  30,
                  0,
                  30,
                  30,
                  0,
                  30,
                  60,
                  30,
                  30,
                  30,
                  30,
                  30,
                  30,
                  0,
                  30,
                  60,
                  0,
                  30,
                  60,
                  30,
                  30,
                  60,
                  0,
                  67,
                  60,
                  30,
                  30,
                  60,
                  30,
                  30,
                  60,
                  0,
                  67,
                  60,
                  0,
                  67,
                  60,
                  30,
                  67,
                  60,
                  0,
                  67,
                  90,
                  30,
                  67,
                  60,
                  30,
                  67,
                  60,
                  0,
                  67,
                  90,
                  0,
                  67,
                  90,
                  30,
                  30,
                  90,
                  0,
                  30,
                  90,
                  30,
                  67,
                  90,
                  30,
                  30,
                  90,
                  0,
                  67,
                  90,
                  30,
                  67,
                  90,
                  0,
                  30,
                  90,
                  0,
                  30,
                  150,
                  30,
                  30,
                  90,
                  30,
                  30,
                  90,
                  0,
                  30,
                  150,
                  0,
                  30,
                  150,
                  30,
                  0,
                  150,
                  0,
                  0,
                  150,
                  30,
                  30,
                  150,
                  30,
                  0,
                  150,
                  0,
                  30,
                  150,
                  30,
                  30,
                  150,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  30,
                  0,
                  150,
                  30,
                  0,
                  0,
                  0,
                  0,
                  150,
                  30,
                  0,
                  150,
                  0
                ];
                var texcoords = [
                  0.22,
                  0.19,
                  0.22,
                  0.79,
                  0.34,
                  0.19,
                  0.22,
                  0.79,
                  0.34,
                  0.79,
                  0.34,
                  0.19,
                  0.34,
                  0.19,
                  0.34,
                  0.31,
                  0.62,
                  0.19,
                  0.34,
                  0.31,
                  0.62,
                  0.31,
                  0.62,
                  0.19,
                  0.34,
                  0.43,
                  0.34,
                  0.55,
                  0.49,
                  0.43,
                  0.34,
                  0.55,
                  0.49,
                  0.55,
                  0.49,
                  0.43,
                  0,
                  0,
                  1,
                  0,
                  0,
                  1,
                  0,
                  1,
                  1,
                  0,
                  1,
                  1,
                  0,
                  0,
                  1,
                  0,
                  0,
                  1,
                  0,
                  1,
                  1,
                  0,
                  1,
                  1,
                  0,
                  0,
                  1,
                  0,
                  0,
                  1,
                  0,
                  1,
                  1,
                  0,
                  1,
                  1,
                  0,
                  0,
                  1,
                  0,
                  1,
                  1,
                  0,
                  0,
                  1,
                  1,
                  0,
                  1,
                  0,
                  0,
                  1,
                  0,
                  1,
                  1,
                  0,
                  0,
                  1,
                  1,
                  0,
                  1,
                  0,
                  0,
                  0,
                  1,
                  1,
                  1,
                  0,
                  0,
                  1,
                  1,
                  1,
                  0,
                  0,
                  0,
                  1,
                  1,
                  0,
                  1,
                  0,
                  0,
                  1,
                  0,
                  1,
                  1,
                  0,
                  0,
                  1,
                  1,
                  0,
                  1,
                  0,
                  0,
                  1,
                  0,
                  1,
                  1,
                  0,
                  0,
                  1,
                  1,
                  0,
                  1,
                  0,
                  0,
                  1,
                  0,
                  1,
                  1,
                  0,
                  0,
                  0,
                  1,
                  1,
                  1,
                  0,
                  0,
                  1,
                  1,
                  1,
                  0,
                  0,
                  0,
                  1,
                  1,
                  0,
                  1,
                  0,
                  0,
                  1,
                  0,
                  1,
                  1,
                  0,
                  0,
                  0,
                  1,
                  1,
                  1,
                  0,
                  0,
                  1,
                  1,
                  1,
                  0,
                  0,
                  0,
                  0,
                  1,
                  1,
                  1,
                  0,
                  0,
                  1,
                  1,
                  1,
                  0
                ];
                var normals = expandRLEData([
                  18,
                  0,
                  0,
                  1,
                  18,
                  0,
                  0,
                  -1,
                  6,
                  0,
                  1,
                  0,
                  6,
                  1,
                  0,
                  0,
                  6,
                  0,
                  -1,
                  0,
                  6,
                  1,
                  0,
                  0,
                  6,
                  0,
                  1,
                  0,
                  6,
                  1,
                  0,
                  0,
                  6,
                  0,
                  -1,
                  0,
                  6,
                  1,
                  0,
                  0,
                  6,
                  0,
                  -1,
                  0,
                  6,
                  -1,
                  0,
                  0
                ]);
                var colors = expandRLEData([
                  18,
                  200,
                  70,
                  120,
                  18,
                  80,
                  70,
                  200,
                  6,
                  70,
                  200,
                  210,
                  6,
                  200,
                  200,
                  70,
                  6,
                  210,
                  100,
                  70,
                  6,
                  210,
                  160,
                  70,
                  6,
                  70,
                  180,
                  210,
                  6,
                  100,
                  70,
                  210,
                  6,
                  76,
                  210,
                  100,
                  6,
                  140,
                  210,
                  80,
                  6,
                  90,
                  130,
                  110,
                  6,
                  160,
                  160,
                  220
                ], [255]);
                var numVerts = positions.length / 3;
                var arrays = {
                  position: createAugmentedTypedArray(3, numVerts),
                  texcoord: createAugmentedTypedArray(2, numVerts),
                  normal: createAugmentedTypedArray(3, numVerts),
                  color: createAugmentedTypedArray(4, numVerts, Uint8Array),
                  indices: createAugmentedTypedArray(3, numVerts / 3, Uint16Array)
                };
                arrays.position.push(positions);
                arrays.texcoord.push(texcoords);
                arrays.normal.push(normals);
                arrays.color.push(colors);
                for (var ii2 = 0; ii2 < numVerts; ++ii2) {
                  arrays.indices.push(ii2);
                }
                return arrays;
              }
              function createCresentVertices(verticalRadius, outerRadius, innerRadius, thickness, subdivisionsDown, startOffset, endOffset) {
                if (subdivisionsDown <= 0) {
                  throw Error("subdivisionDown must be > 0");
                }
                startOffset = startOffset || 0;
                endOffset = endOffset || 1;
                var subdivisionsThick = 2;
                var offsetRange = endOffset - startOffset;
                var numVertices = (subdivisionsDown + 1) * 2 * (2 + subdivisionsThick);
                var positions = createAugmentedTypedArray(3, numVertices);
                var normals = createAugmentedTypedArray(3, numVertices);
                var texcoords = createAugmentedTypedArray(2, numVertices);
                function lerp(a, b, s) {
                  return a + (b - a) * s;
                }
                function createArc(arcRadius, x2, normalMult, normalAdd, uMult, uAdd) {
                  for (var z = 0; z <= subdivisionsDown; z++) {
                    var uBack2 = x2 / (subdivisionsThick - 1);
                    var v = z / subdivisionsDown;
                    var xBack = (uBack2 - 0.5) * 2;
                    var angle = (startOffset + v * offsetRange) * Math.PI;
                    var s = Math.sin(angle);
                    var c = Math.cos(angle);
                    var radius = lerp(verticalRadius, arcRadius, s);
                    var px = xBack * thickness;
                    var py = c * verticalRadius;
                    var pz = s * radius;
                    positions.push(px, py, pz);
                    var n = v3.add(v3.multiply([0, s, c], normalMult), normalAdd);
                    normals.push(n);
                    texcoords.push(uBack2 * uMult + uAdd, v);
                  }
                }
                for (var x = 0; x < subdivisionsThick; x++) {
                  var uBack = (x / (subdivisionsThick - 1) - 0.5) * 2;
                  createArc(outerRadius, x, [1, 1, 1], [0, 0, 0], 1, 0);
                  createArc(outerRadius, x, [0, 0, 0], [uBack, 0, 0], 0, 0);
                  createArc(innerRadius, x, [1, 1, 1], [0, 0, 0], 1, 0);
                  createArc(innerRadius, x, [0, 0, 0], [uBack, 0, 0], 0, 1);
                }
                var indices = createAugmentedTypedArray(3, subdivisionsDown * 2 * (2 + subdivisionsThick), Uint16Array);
                function createSurface(leftArcOffset, rightArcOffset) {
                  for (var z = 0; z < subdivisionsDown; ++z) {
                    indices.push(leftArcOffset + z + 0, leftArcOffset + z + 1, rightArcOffset + z + 0);
                    indices.push(leftArcOffset + z + 1, rightArcOffset + z + 1, rightArcOffset + z + 0);
                  }
                }
                var numVerticesDown = subdivisionsDown + 1;
                createSurface(numVerticesDown * 0, numVerticesDown * 4);
                createSurface(numVerticesDown * 5, numVerticesDown * 7);
                createSurface(numVerticesDown * 6, numVerticesDown * 2);
                createSurface(numVerticesDown * 3, numVerticesDown * 1);
                return {
                  position: positions,
                  normal: normals,
                  texcoord: texcoords,
                  indices
                };
              }
              function createCylinderVertices(radius, height, radialSubdivisions, verticalSubdivisions, topCap, bottomCap) {
                return createTruncatedConeVertices(radius, radius, height, radialSubdivisions, verticalSubdivisions, topCap, bottomCap);
              }
              function createTorusVertices(radius, thickness, radialSubdivisions, bodySubdivisions, startAngle, endAngle) {
                if (radialSubdivisions < 3) {
                  throw Error("radialSubdivisions must be 3 or greater");
                }
                if (bodySubdivisions < 3) {
                  throw Error("verticalSubdivisions must be 3 or greater");
                }
                startAngle = startAngle || 0;
                endAngle = endAngle || Math.PI * 2;
                var range = endAngle - startAngle;
                var radialParts = radialSubdivisions + 1;
                var bodyParts = bodySubdivisions + 1;
                var numVertices = radialParts * bodyParts;
                var positions = createAugmentedTypedArray(3, numVertices);
                var normals = createAugmentedTypedArray(3, numVertices);
                var texcoords = createAugmentedTypedArray(2, numVertices);
                var indices = createAugmentedTypedArray(3, radialSubdivisions * bodySubdivisions * 2, Uint16Array);
                for (var slice = 0; slice < bodyParts; ++slice) {
                  var v = slice / bodySubdivisions;
                  var sliceAngle = v * Math.PI * 2;
                  var sliceSin = Math.sin(sliceAngle);
                  var ringRadius = radius + sliceSin * thickness;
                  var ny = Math.cos(sliceAngle);
                  var y = ny * thickness;
                  for (var ring = 0; ring < radialParts; ++ring) {
                    var u = ring / radialSubdivisions;
                    var ringAngle = startAngle + u * range;
                    var xSin = Math.sin(ringAngle);
                    var zCos = Math.cos(ringAngle);
                    var x = xSin * ringRadius;
                    var z = zCos * ringRadius;
                    var nx = xSin * sliceSin;
                    var nz = zCos * sliceSin;
                    positions.push(x, y, z);
                    normals.push(nx, ny, nz);
                    texcoords.push(u, 1 - v);
                  }
                }
                for (var _slice = 0; _slice < bodySubdivisions; ++_slice) {
                  for (var _ring = 0; _ring < radialSubdivisions; ++_ring) {
                    var nextRingIndex = 1 + _ring;
                    var nextSliceIndex = 1 + _slice;
                    indices.push(radialParts * _slice + _ring, radialParts * nextSliceIndex + _ring, radialParts * _slice + nextRingIndex);
                    indices.push(radialParts * nextSliceIndex + _ring, radialParts * nextSliceIndex + nextRingIndex, radialParts * _slice + nextRingIndex);
                  }
                }
                return {
                  position: positions,
                  normal: normals,
                  texcoord: texcoords,
                  indices
                };
              }
              function createDiscVertices(radius, divisions, stacks, innerRadius, stackPower) {
                if (divisions < 3) {
                  throw Error("divisions must be at least 3");
                }
                stacks = stacks ? stacks : 1;
                stackPower = stackPower ? stackPower : 1;
                innerRadius = innerRadius ? innerRadius : 0;
                var numVertices = (divisions + 1) * (stacks + 1);
                var positions = createAugmentedTypedArray(3, numVertices);
                var normals = createAugmentedTypedArray(3, numVertices);
                var texcoords = createAugmentedTypedArray(2, numVertices);
                var indices = createAugmentedTypedArray(3, stacks * divisions * 2, Uint16Array);
                var firstIndex = 0;
                var radiusSpan = radius - innerRadius;
                var pointsPerStack = divisions + 1;
                for (var stack = 0; stack <= stacks; ++stack) {
                  var stackRadius = innerRadius + radiusSpan * Math.pow(stack / stacks, stackPower);
                  for (var i = 0; i <= divisions; ++i) {
                    var theta = 2 * Math.PI * i / divisions;
                    var x = stackRadius * Math.cos(theta);
                    var z = stackRadius * Math.sin(theta);
                    positions.push(x, 0, z);
                    normals.push(0, 1, 0);
                    texcoords.push(1 - i / divisions, stack / stacks);
                    if (stack > 0 && i !== divisions) {
                      var a = firstIndex + (i + 1);
                      var b = firstIndex + i;
                      var c = firstIndex + i - pointsPerStack;
                      var d = firstIndex + (i + 1) - pointsPerStack;
                      indices.push(a, b, c);
                      indices.push(a, c, d);
                    }
                  }
                  firstIndex += divisions + 1;
                }
                return {
                  position: positions,
                  normal: normals,
                  texcoord: texcoords,
                  indices
                };
              }
              function randInt(range) {
                return Math.random() * range | 0;
              }
              function makeRandomVertexColors(vertices, options) {
                options = options || {};
                var numElements = vertices.position.numElements;
                var vcolors = createAugmentedTypedArray(4, numElements, Uint8Array);
                var rand = options.rand || function(ndx, channel) {
                  return channel < 3 ? randInt(256) : 255;
                };
                vertices.color = vcolors;
                if (vertices.indices) {
                  for (var ii2 = 0; ii2 < numElements; ++ii2) {
                    vcolors.push(rand(ii2, 0), rand(ii2, 1), rand(ii2, 2), rand(ii2, 3));
                  }
                } else {
                  var numVertsPerColor = options.vertsPerColor || 3;
                  var numSets = numElements / numVertsPerColor;
                  for (var _ii2 = 0; _ii2 < numSets; ++_ii2) {
                    var color = [rand(_ii2, 0), rand(_ii2, 1), rand(_ii2, 2), rand(_ii2, 3)];
                    for (var jj = 0; jj < numVertsPerColor; ++jj) {
                      vcolors.push(color);
                    }
                  }
                }
                return vertices;
              }
              function createBufferFunc(fn) {
                return function(gl) {
                  var arrays = fn.apply(this, Array.prototype.slice.call(arguments, 1));
                  return attributes.createBuffersFromArrays(gl, arrays);
                };
              }
              function createBufferInfoFunc(fn) {
                return function(gl) {
                  var arrays = fn.apply(null, Array.prototype.slice.call(arguments, 1));
                  return attributes.createBufferInfoFromArrays(gl, arrays);
                };
              }
              var arraySpecPropertyNames = ["numComponents", "size", "type", "normalize", "stride", "offset", "attrib", "name", "attribName"];
              function copyElements(src, dst, dstNdx, offset) {
                offset = offset || 0;
                var length2 = src.length;
                for (var ii2 = 0; ii2 < length2; ++ii2) {
                  dst[dstNdx + ii2] = src[ii2] + offset;
                }
              }
              function createArrayOfSameType(srcArray, length2) {
                var arraySrc = getArray(srcArray);
                var newArray = new arraySrc.constructor(length2);
                var newArraySpec = newArray;
                if (arraySrc.numComponents && arraySrc.numElements) {
                  augmentTypedArray(newArray, arraySrc.numComponents);
                }
                if (srcArray.data) {
                  newArraySpec = {
                    data: newArray
                  };
                  helper.copyNamedProperties(arraySpecPropertyNames, srcArray, newArraySpec);
                }
                return newArraySpec;
              }
              function concatVertices(arrayOfArrays) {
                var names = {};
                var baseName;
                var _loop = function _loop2(ii3) {
                  var arrays = arrayOfArrays[ii3];
                  Object.keys(arrays).forEach(function(name) {
                    if (!names[name]) {
                      names[name] = [];
                    }
                    if (!baseName && name !== "indices") {
                      baseName = name;
                    }
                    var arrayInfo = arrays[name];
                    var numComponents = getNumComponents(arrayInfo, name);
                    var array = getArray(arrayInfo);
                    var numElements = array.length / numComponents;
                    names[name].push(numElements);
                  });
                };
                for (var ii2 = 0; ii2 < arrayOfArrays.length; ++ii2) {
                  _loop(ii2);
                }
                function getLengthOfCombinedArrays(name) {
                  var length2 = 0;
                  var arraySpec;
                  for (var ii3 = 0; ii3 < arrayOfArrays.length; ++ii3) {
                    var arrays = arrayOfArrays[ii3];
                    var arrayInfo = arrays[name];
                    var array = getArray(arrayInfo);
                    length2 += array.length;
                    if (!arraySpec || arrayInfo.data) {
                      arraySpec = arrayInfo;
                    }
                  }
                  return {
                    length: length2,
                    spec: arraySpec
                  };
                }
                function copyArraysToNewArray(name, base2, newArray) {
                  var baseIndex = 0;
                  var offset = 0;
                  for (var ii3 = 0; ii3 < arrayOfArrays.length; ++ii3) {
                    var arrays = arrayOfArrays[ii3];
                    var arrayInfo = arrays[name];
                    var array = getArray(arrayInfo);
                    if (name === "indices") {
                      copyElements(array, newArray, offset, baseIndex);
                      baseIndex += base2[ii3];
                    } else {
                      copyElements(array, newArray, offset);
                    }
                    offset += array.length;
                  }
                }
                var base = names[baseName];
                var newArrays = {};
                Object.keys(names).forEach(function(name) {
                  var info = getLengthOfCombinedArrays(name);
                  var newArraySpec = createArrayOfSameType(info.spec, info.length);
                  copyArraysToNewArray(name, base, getArray(newArraySpec));
                  newArrays[name] = newArraySpec;
                });
                return newArrays;
              }
              function duplicateVertices(arrays) {
                var newArrays = {};
                Object.keys(arrays).forEach(function(name) {
                  var arraySpec = arrays[name];
                  var srcArray = getArray(arraySpec);
                  var newArraySpec = createArrayOfSameType(arraySpec, srcArray.length);
                  copyElements(srcArray, getArray(newArraySpec), 0);
                  newArrays[name] = newArraySpec;
                });
                return newArrays;
              }
              var create3DFBufferInfo = createBufferInfoFunc(create3DFVertices);
              exports2.create3DFBufferInfo = create3DFBufferInfo;
              var create3DFBuffers = createBufferFunc(create3DFVertices);
              exports2.create3DFBuffers = create3DFBuffers;
              var createCubeBufferInfo = createBufferInfoFunc(createCubeVertices);
              exports2.createCubeBufferInfo = createCubeBufferInfo;
              var createCubeBuffers = createBufferFunc(createCubeVertices);
              exports2.createCubeBuffers = createCubeBuffers;
              var createPlaneBufferInfo = createBufferInfoFunc(createPlaneVertices);
              exports2.createPlaneBufferInfo = createPlaneBufferInfo;
              var createPlaneBuffers = createBufferFunc(createPlaneVertices);
              exports2.createPlaneBuffers = createPlaneBuffers;
              var createSphereBufferInfo = createBufferInfoFunc(createSphereVertices);
              exports2.createSphereBufferInfo = createSphereBufferInfo;
              var createSphereBuffers = createBufferFunc(createSphereVertices);
              exports2.createSphereBuffers = createSphereBuffers;
              var createTruncatedConeBufferInfo = createBufferInfoFunc(createTruncatedConeVertices);
              exports2.createTruncatedConeBufferInfo = createTruncatedConeBufferInfo;
              var createTruncatedConeBuffers = createBufferFunc(createTruncatedConeVertices);
              exports2.createTruncatedConeBuffers = createTruncatedConeBuffers;
              var createXYQuadBufferInfo = createBufferInfoFunc(createXYQuadVertices);
              exports2.createXYQuadBufferInfo = createXYQuadBufferInfo;
              var createXYQuadBuffers = createBufferFunc(createXYQuadVertices);
              exports2.createXYQuadBuffers = createXYQuadBuffers;
              var createCresentBufferInfo = createBufferInfoFunc(createCresentVertices);
              exports2.createCresentBufferInfo = createCresentBufferInfo;
              var createCresentBuffers = createBufferFunc(createCresentVertices);
              exports2.createCresentBuffers = createCresentBuffers;
              var createCylinderBufferInfo = createBufferInfoFunc(createCylinderVertices);
              exports2.createCylinderBufferInfo = createCylinderBufferInfo;
              var createCylinderBuffers = createBufferFunc(createCylinderVertices);
              exports2.createCylinderBuffers = createCylinderBuffers;
              var createTorusBufferInfo = createBufferInfoFunc(createTorusVertices);
              exports2.createTorusBufferInfo = createTorusBufferInfo;
              var createTorusBuffers = createBufferFunc(createTorusVertices);
              exports2.createTorusBuffers = createTorusBuffers;
              var createDiscBufferInfo = createBufferInfoFunc(createDiscVertices);
              exports2.createDiscBufferInfo = createDiscBufferInfo;
              var createDiscBuffers = createBufferFunc(createDiscVertices);
              exports2.createDiscBuffers = createDiscBuffers;
            }),
            (function(module2, exports2, __webpack_require__) {
              "use strict";
              exports2.__esModule = true;
              var _exportNames = {
                addExtensionsToContext: true,
                getContext: true,
                getWebGLContext: true,
                resizeCanvasToDisplaySize: true,
                setDefaults: true
              };
              exports2.addExtensionsToContext = addExtensionsToContext;
              exports2.getContext = getContext;
              exports2.getWebGLContext = getWebGLContext;
              exports2.resizeCanvasToDisplaySize = resizeCanvasToDisplaySize;
              exports2.setDefaults = setDefaults;
              var attributes = _interopRequireWildcard(__webpack_require__(7));
              Object.keys(attributes).forEach(function(key) {
                if (key === "default" || key === "__esModule") return;
                if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
                exports2[key] = attributes[key];
              });
              var textures = _interopRequireWildcard(__webpack_require__(8));
              Object.keys(textures).forEach(function(key) {
                if (key === "default" || key === "__esModule") return;
                if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
                exports2[key] = textures[key];
              });
              var helper = _interopRequireWildcard(__webpack_require__(0));
              var utils = _interopRequireWildcard(__webpack_require__(4));
              Object.keys(utils).forEach(function(key) {
                if (key === "default" || key === "__esModule") return;
                if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
                exports2[key] = utils[key];
              });
              var _draw = __webpack_require__(12);
              Object.keys(_draw).forEach(function(key) {
                if (key === "default" || key === "__esModule") return;
                if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
                exports2[key] = _draw[key];
              });
              var _framebuffers = __webpack_require__(13);
              Object.keys(_framebuffers).forEach(function(key) {
                if (key === "default" || key === "__esModule") return;
                if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
                exports2[key] = _framebuffers[key];
              });
              var _programs = __webpack_require__(5);
              Object.keys(_programs).forEach(function(key) {
                if (key === "default" || key === "__esModule") return;
                if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
                exports2[key] = _programs[key];
              });
              var _typedarrays = __webpack_require__(1);
              Object.keys(_typedarrays).forEach(function(key) {
                if (key === "default" || key === "__esModule") return;
                if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
                exports2[key] = _typedarrays[key];
              });
              var _vertexArrays = __webpack_require__(14);
              Object.keys(_vertexArrays).forEach(function(key) {
                if (key === "default" || key === "__esModule") return;
                if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
                exports2[key] = _vertexArrays[key];
              });
              function _interopRequireWildcard(obj) {
                if (obj && obj.__esModule) {
                  return obj;
                } else {
                  var newObj = {};
                  if (obj != null) {
                    for (var key in obj) {
                      if (Object.prototype.hasOwnProperty.call(obj, key)) {
                        var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};
                        if (desc.get || desc.set) {
                          Object.defineProperty(newObj, key, desc);
                        } else {
                          newObj[key] = obj[key];
                        }
                      }
                    }
                  }
                  newObj.default = obj;
                  return newObj;
                }
              }
              var gl = void 0;
              var defaults = {
                addExtensionsToContext: true
              };
              function setDefaults(newDefaults) {
                helper.copyExistingProperties(newDefaults, defaults);
                attributes.setAttributeDefaults_(newDefaults);
                textures.setTextureDefaults_(newDefaults);
              }
              var prefixRE = /^(.*?)_/;
              function addExtensionToContext(gl2, extensionName) {
                utils.glEnumToString(gl2, 0);
                var ext = gl2.getExtension(extensionName);
                if (ext) {
                  var enums = {};
                  var fnSuffix = prefixRE.exec(extensionName)[1];
                  var enumSuffix = "_" + fnSuffix;
                  for (var key in ext) {
                    var value = ext[key];
                    var isFunc = typeof value === "function";
                    var suffix = isFunc ? fnSuffix : enumSuffix;
                    var name = key;
                    if (key.endsWith(suffix)) {
                      name = key.substring(0, key.length - suffix.length);
                    }
                    if (gl2[name] !== void 0) {
                      if (!isFunc && gl2[name] !== value) {
                        helper.warn(name, gl2[name], value, key);
                      }
                    } else {
                      if (isFunc) {
                        gl2[name] =  (function(origFn) {
                          return function() {
                            return origFn.apply(ext, arguments);
                          };
                        })(value);
                      } else {
                        gl2[name] = value;
                        enums[name] = value;
                      }
                    }
                  }
                  enums.constructor = {
                    name: ext.constructor.name
                  };
                  utils.glEnumToString(enums, 0);
                }
                return ext;
              }
              var supportedExtensions = ["ANGLE_instanced_arrays", "EXT_blend_minmax", "EXT_color_buffer_float", "EXT_color_buffer_half_float", "EXT_disjoint_timer_query", "EXT_disjoint_timer_query_webgl2", "EXT_frag_depth", "EXT_sRGB", "EXT_shader_texture_lod", "EXT_texture_filter_anisotropic", "OES_element_index_uint", "OES_standard_derivatives", "OES_texture_float", "OES_texture_float_linear", "OES_texture_half_float", "OES_texture_half_float_linear", "OES_vertex_array_object", "WEBGL_color_buffer_float", "WEBGL_compressed_texture_atc", "WEBGL_compressed_texture_etc1", "WEBGL_compressed_texture_pvrtc", "WEBGL_compressed_texture_s3tc", "WEBGL_compressed_texture_s3tc_srgb", "WEBGL_depth_texture", "WEBGL_draw_buffers"];
              function addExtensionsToContext(gl2) {
                for (var ii2 = 0; ii2 < supportedExtensions.length; ++ii2) {
                  addExtensionToContext(gl2, supportedExtensions[ii2]);
                }
              }
              function create3DContext(canvas, opt_attribs) {
                var names = ["webgl", "experimental-webgl"];
                var context = null;
                for (var ii2 = 0; ii2 < names.length; ++ii2) {
                  context = canvas.getContext(names[ii2], opt_attribs);
                  if (context) {
                    if (defaults.addExtensionsToContext) {
                      addExtensionsToContext(context);
                    }
                    break;
                  }
                }
                return context;
              }
              function getWebGLContext(canvas, opt_attribs) {
                var gl2 = create3DContext(canvas, opt_attribs);
                return gl2;
              }
              function createContext(canvas, opt_attribs) {
                var names = ["webgl2", "webgl", "experimental-webgl"];
                var context = null;
                for (var ii2 = 0; ii2 < names.length; ++ii2) {
                  context = canvas.getContext(names[ii2], opt_attribs);
                  if (context) {
                    if (defaults.addExtensionsToContext) {
                      addExtensionsToContext(context);
                    }
                    break;
                  }
                }
                return context;
              }
              function getContext(canvas, opt_attribs) {
                var gl2 = createContext(canvas, opt_attribs);
                return gl2;
              }
              function resizeCanvasToDisplaySize(canvas, multiplier) {
                multiplier = multiplier || 1;
                multiplier = Math.max(0, multiplier);
                var width = canvas.clientWidth * multiplier | 0;
                var height = canvas.clientHeight * multiplier | 0;
                if (canvas.width !== width || canvas.height !== height) {
                  canvas.width = width;
                  canvas.height = height;
                  return true;
                }
                return false;
              }
            }),
            (function(module2, exports2, __webpack_require__) {
              "use strict";
              exports2.__esModule = true;
              exports2.drawBufferInfo = drawBufferInfo;
              exports2.drawObjectList = drawObjectList;
              var programs = _interopRequireWildcard(__webpack_require__(5));
              function _interopRequireWildcard(obj) {
                if (obj && obj.__esModule) {
                  return obj;
                } else {
                  var newObj = {};
                  if (obj != null) {
                    for (var key in obj) {
                      if (Object.prototype.hasOwnProperty.call(obj, key)) {
                        var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};
                        if (desc.get || desc.set) {
                          Object.defineProperty(newObj, key, desc);
                        } else {
                          newObj[key] = obj[key];
                        }
                      }
                    }
                  }
                  newObj.default = obj;
                  return newObj;
                }
              }
              function drawBufferInfo(gl, bufferInfo, type, count, offset, instanceCount) {
                type = type === void 0 ? gl.TRIANGLES : type;
                var indices = bufferInfo.indices;
                var elementType = bufferInfo.elementType;
                var numElements = count === void 0 ? bufferInfo.numElements : count;
                offset = offset === void 0 ? 0 : offset;
                if (elementType || indices) {
                  if (instanceCount !== void 0) {
                    gl.drawElementsInstanced(type, numElements, elementType === void 0 ? gl.UNSIGNED_SHORT : bufferInfo.elementType, offset, instanceCount);
                  } else {
                    gl.drawElements(type, numElements, elementType === void 0 ? gl.UNSIGNED_SHORT : bufferInfo.elementType, offset);
                  }
                } else {
                  if (instanceCount !== void 0) {
                    gl.drawArraysInstanced(type, offset, numElements, instanceCount);
                  } else {
                    gl.drawArrays(type, offset, numElements);
                  }
                }
              }
              function drawObjectList(gl, objectsToDraw) {
                var lastUsedProgramInfo = null;
                var lastUsedBufferInfo = null;
                objectsToDraw.forEach(function(object) {
                  if (object.active === false) {
                    return;
                  }
                  var programInfo = object.programInfo;
                  var bufferInfo = object.vertexArrayInfo || object.bufferInfo;
                  var bindBuffers = false;
                  var type = object.type === void 0 ? gl.TRIANGLES : object.type;
                  if (programInfo !== lastUsedProgramInfo) {
                    lastUsedProgramInfo = programInfo;
                    gl.useProgram(programInfo.program);
                    bindBuffers = true;
                  }
                  if (bindBuffers || bufferInfo !== lastUsedBufferInfo) {
                    if (lastUsedBufferInfo && lastUsedBufferInfo.vertexArrayObject && !bufferInfo.vertexArrayObject) {
                      gl.bindVertexArray(null);
                    }
                    lastUsedBufferInfo = bufferInfo;
                    programs.setBuffersAndAttributes(gl, programInfo, bufferInfo);
                  }
                  programs.setUniforms(programInfo, object.uniforms);
                  drawBufferInfo(gl, bufferInfo, type, object.count, object.offset, object.instanceCount);
                });
                if (lastUsedBufferInfo.vertexArrayObject) {
                  gl.bindVertexArray(null);
                }
              }
            }),
            (function(module2, exports2, __webpack_require__) {
              "use strict";
              exports2.__esModule = true;
              exports2.bindFramebufferInfo = bindFramebufferInfo;
              exports2.createFramebufferInfo = createFramebufferInfo;
              exports2.resizeFramebufferInfo = resizeFramebufferInfo;
              var textures = _interopRequireWildcard(__webpack_require__(8));
              var helper = _interopRequireWildcard(__webpack_require__(0));
              function _interopRequireWildcard(obj) {
                if (obj && obj.__esModule) {
                  return obj;
                } else {
                  var newObj = {};
                  if (obj != null) {
                    for (var key in obj) {
                      if (Object.prototype.hasOwnProperty.call(obj, key)) {
                        var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};
                        if (desc.get || desc.set) {
                          Object.defineProperty(newObj, key, desc);
                        } else {
                          newObj[key] = obj[key];
                        }
                      }
                    }
                  }
                  newObj.default = obj;
                  return newObj;
                }
              }
              var gl = void 0;
              var UNSIGNED_BYTE = 5121;
              var DEPTH_COMPONENT = 6402;
              var RGBA = 6408;
              var RGBA4 = 32854;
              var RGB5_A1 = 32855;
              var RGB565 = 36194;
              var DEPTH_COMPONENT16 = 33189;
              var STENCIL_INDEX = 6401;
              var STENCIL_INDEX8 = 36168;
              var DEPTH_STENCIL = 34041;
              var COLOR_ATTACHMENT0 = 36064;
              var DEPTH_ATTACHMENT = 36096;
              var STENCIL_ATTACHMENT = 36128;
              var DEPTH_STENCIL_ATTACHMENT = 33306;
              var REPEAT = 10497;
              var CLAMP_TO_EDGE = 33071;
              var MIRRORED_REPEAT = 33648;
              var NEAREST = 9728;
              var LINEAR = 9729;
              var NEAREST_MIPMAP_NEAREST = 9984;
              var LINEAR_MIPMAP_NEAREST = 9985;
              var NEAREST_MIPMAP_LINEAR = 9986;
              var LINEAR_MIPMAP_LINEAR = 9987;
              var defaultAttachments = [{
                format: RGBA,
                type: UNSIGNED_BYTE,
                min: LINEAR,
                wrap: CLAMP_TO_EDGE
              }, {
                format: DEPTH_STENCIL
              }];
              var attachmentsByFormat = {};
              attachmentsByFormat[DEPTH_STENCIL] = DEPTH_STENCIL_ATTACHMENT;
              attachmentsByFormat[STENCIL_INDEX] = STENCIL_ATTACHMENT;
              attachmentsByFormat[STENCIL_INDEX8] = STENCIL_ATTACHMENT;
              attachmentsByFormat[DEPTH_COMPONENT] = DEPTH_ATTACHMENT;
              attachmentsByFormat[DEPTH_COMPONENT16] = DEPTH_ATTACHMENT;
              function getAttachmentPointForFormat(format) {
                return attachmentsByFormat[format];
              }
              var renderbufferFormats = {};
              renderbufferFormats[RGBA4] = true;
              renderbufferFormats[RGB5_A1] = true;
              renderbufferFormats[RGB565] = true;
              renderbufferFormats[DEPTH_STENCIL] = true;
              renderbufferFormats[DEPTH_COMPONENT16] = true;
              renderbufferFormats[STENCIL_INDEX] = true;
              renderbufferFormats[STENCIL_INDEX8] = true;
              function isRenderbufferFormat(format) {
                return renderbufferFormats[format];
              }
              function createFramebufferInfo(gl2, attachments, width, height) {
                var target = gl2.FRAMEBUFFER;
                var fb = gl2.createFramebuffer();
                gl2.bindFramebuffer(target, fb);
                width = width || gl2.drawingBufferWidth;
                height = height || gl2.drawingBufferHeight;
                attachments = attachments || defaultAttachments;
                var colorAttachmentCount = 0;
                var framebufferInfo = {
                  framebuffer: fb,
                  attachments: [],
                  width,
                  height
                };
                attachments.forEach(function(attachmentOptions) {
                  var attachment = attachmentOptions.attachment;
                  var format = attachmentOptions.format;
                  var attachmentPoint = getAttachmentPointForFormat(format);
                  if (!attachmentPoint) {
                    attachmentPoint = COLOR_ATTACHMENT0 + colorAttachmentCount++;
                  }
                  if (!attachment) {
                    if (isRenderbufferFormat(format)) {
                      attachment = gl2.createRenderbuffer();
                      gl2.bindRenderbuffer(gl2.RENDERBUFFER, attachment);
                      gl2.renderbufferStorage(gl2.RENDERBUFFER, format, width, height);
                    } else {
                      var textureOptions = Object.assign({}, attachmentOptions);
                      textureOptions.width = width;
                      textureOptions.height = height;
                      if (textureOptions.auto === void 0) {
                        textureOptions.auto = false;
                        textureOptions.min = textureOptions.min || textureOptions.minMag || gl2.LINEAR;
                        textureOptions.mag = textureOptions.mag || textureOptions.minMag || gl2.LINEAR;
                        textureOptions.wrapS = textureOptions.wrapS || textureOptions.wrap || gl2.CLAMP_TO_EDGE;
                        textureOptions.wrapT = textureOptions.wrapT || textureOptions.wrap || gl2.CLAMP_TO_EDGE;
                      }
                      attachment = textures.createTexture(gl2, textureOptions);
                    }
                  }
                  if (helper.isRenderbuffer(gl2, attachment)) {
                    gl2.framebufferRenderbuffer(target, attachmentPoint, gl2.RENDERBUFFER, attachment);
                  } else if (helper.isTexture(gl2, attachment)) {
                    gl2.framebufferTexture2D(target, attachmentPoint, attachmentOptions.texTarget || gl2.TEXTURE_2D, attachment, attachmentOptions.level || 0);
                  } else {
                    throw "unknown attachment type";
                  }
                  framebufferInfo.attachments.push(attachment);
                });
                return framebufferInfo;
              }
              function resizeFramebufferInfo(gl2, framebufferInfo, attachments, width, height) {
                width = width || gl2.drawingBufferWidth;
                height = height || gl2.drawingBufferHeight;
                framebufferInfo.width = width;
                framebufferInfo.height = height;
                attachments = attachments || defaultAttachments;
                attachments.forEach(function(attachmentOptions, ndx) {
                  var attachment = framebufferInfo.attachments[ndx];
                  var format = attachmentOptions.format;
                  if (helper.isRenderbuffer(gl2, attachment)) {
                    gl2.bindRenderbuffer(gl2.RENDERBUFFER, attachment);
                    gl2.renderbufferStorage(gl2.RENDERBUFFER, format, width, height);
                  } else if (helper.isTexture(gl2, attachment)) {
                    textures.resizeTexture(gl2, attachment, attachmentOptions, width, height);
                  } else {
                    throw "unknown attachment type";
                  }
                });
              }
              function bindFramebufferInfo(gl2, framebufferInfo, target) {
                target = target || gl2.FRAMEBUFFER;
                if (framebufferInfo) {
                  gl2.bindFramebuffer(target, framebufferInfo.framebuffer);
                  gl2.viewport(0, 0, framebufferInfo.width, framebufferInfo.height);
                } else {
                  gl2.bindFramebuffer(target, null);
                  gl2.viewport(0, 0, gl2.drawingBufferWidth, gl2.drawingBufferHeight);
                }
              }
            }),
            (function(module2, exports2, __webpack_require__) {
              "use strict";
              exports2.__esModule = true;
              exports2.createVertexArrayInfo = createVertexArrayInfo;
              exports2.createVAOAndSetAttributes = createVAOAndSetAttributes;
              exports2.createVAOFromBufferInfo = createVAOFromBufferInfo;
              var programs = _interopRequireWildcard(__webpack_require__(5));
              function _interopRequireWildcard(obj) {
                if (obj && obj.__esModule) {
                  return obj;
                } else {
                  var newObj = {};
                  if (obj != null) {
                    for (var key in obj) {
                      if (Object.prototype.hasOwnProperty.call(obj, key)) {
                        var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};
                        if (desc.get || desc.set) {
                          Object.defineProperty(newObj, key, desc);
                        } else {
                          newObj[key] = obj[key];
                        }
                      }
                    }
                  }
                  newObj.default = obj;
                  return newObj;
                }
              }
              function createVertexArrayInfo(gl, programInfos, bufferInfo) {
                var vao = gl.createVertexArray();
                gl.bindVertexArray(vao);
                if (!programInfos.length) {
                  programInfos = [programInfos];
                }
                programInfos.forEach(function(programInfo) {
                  programs.setBuffersAndAttributes(gl, programInfo, bufferInfo);
                });
                gl.bindVertexArray(null);
                return {
                  numElements: bufferInfo.numElements,
                  elementType: bufferInfo.elementType,
                  vertexArrayObject: vao
                };
              }
              function createVAOAndSetAttributes(gl, setters, attribs, indices) {
                var vao = gl.createVertexArray();
                gl.bindVertexArray(vao);
                programs.setAttributes(setters, attribs);
                if (indices) {
                  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indices);
                }
                gl.bindVertexArray(null);
                return vao;
              }
              function createVAOFromBufferInfo(gl, programInfo, bufferInfo) {
                return createVAOAndSetAttributes(gl, programInfo.attribSetters || programInfo, bufferInfo.attribs, bufferInfo.indices);
              }
            })
          ])
        );
      });
    }
  });

  var require_RenderConstants = __commonJS({
    "src/RenderConstants.js"(exports, module) {
      module.exports = {
        ID_NONE: -1,
        Events: {
          UseHighQualityRenderChanged: "UseHighQualityRenderChanged",
          AllowPrivateSkinAccessChanged: "AllowPrivateSkinAccessChanged",
          NativeSizeChanged: "NativeSizeChanged",
          ContextLost: "ContextLost"
        }
      };
    }
  });

  var require_Silhouette = __commonJS({
    "src/Silhouette.js"(exports, module) {
      var __SilhouetteUpdateCanvas;
      var intMin = (i, j) => j ^ (i ^ j) & i - j >> 31;
      var intMax = (i, j) => i ^ (i ^ j) & i - j >> 31;
      var getPoint = ({ _width: width, _height: height, _colorData: data }, x, y) => {
        if (x >= width || y >= height || x < 0 || y < 0) {
          return 0;
        }
        return data[(y * width + x) * 4 + 3];
      };
      var __cornerWork = [
        new Uint8ClampedArray(4),
        new Uint8ClampedArray(4),
        new Uint8ClampedArray(4),
        new Uint8ClampedArray(4)
      ];
      var getColor4b = ({ _width: width, _height: height, _colorData: data }, x, y, dst) => {
        x = intMax(0, intMin(x, width - 1));
        y = intMax(0, intMin(y, height - 1));
        if (x >= width || y >= height || x < 0 || y < 0) {
          return dst.fill(0);
        }
        const offset = (y * width + x) * 4;
        const alpha = data[offset + 3] / 255;
        dst[0] = data[offset] * alpha;
        dst[1] = data[offset + 1] * alpha;
        dst[2] = data[offset + 2] * alpha;
        dst[3] = data[offset + 3];
        return dst;
      };
      var getPremultipliedColor4b = ({ _width: width, _height: height, _colorData: data }, x, y, dst) => {
        x = intMax(0, intMin(x, width - 1));
        y = intMax(0, intMin(y, height - 1));
        const offset = (y * width + x) * 4;
        dst[0] = data[offset];
        dst[1] = data[offset + 1];
        dst[2] = data[offset + 2];
        dst[3] = data[offset + 3];
        return dst;
      };
      var Silhouette = class _Silhouette {
        constructor() {
          this._width = 0;
          this._height = 0;
          this._lazyData = null;
          this._colorData = null;
          this._getColor = getColor4b;
          this.colorAtNearest = this.colorAtLinear = (_, dst) => dst.fill(0);
        }
        update(bitmapData, isPremultiplied = false) {
          let imageData;
          if (bitmapData instanceof ImageData) {
            imageData = bitmapData;
            this._width = bitmapData.width;
            this._height = bitmapData.height;
            this._lazyData = null;
            this._colorData = imageData.data;
          } else {
            this._width = bitmapData.width;
            this._height = bitmapData.height;
            if (!(this._width && this._height)) {
              return;
            }
            this._lazyData = bitmapData;
            this._colorData = null;
          }
          if (isPremultiplied) {
            this._getColor = getPremultipliedColor4b;
          } else {
            this._getColor = getColor4b;
          }
          delete this.colorAtNearest;
          delete this.colorAtLinear;
        }
        unlazy() {
          if (!this._lazyData) {
            return;
          }
          const width = this._lazyData.width;
          const height = this._lazyData.height;
          if (width && height) {
            const canvas = _Silhouette._updateCanvas();
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, width, height);
            ctx.drawImage(this._lazyData, 0, 0, width, height);
            const textureData = ctx.getImageData(0, 0, width, height);
            this._colorData = textureData.data;
          }
          this._lazyData = null;
        }
        colorAtNearest(vec, dst) {
          return this._getColor(
            this,
            Math.floor(vec[0] * (this._width - 1)),
            Math.floor(vec[1] * (this._height - 1)),
            dst
          );
        }
        colorAtLinear(vec, dst) {
          const x = vec[0] * (this._width - 1);
          const y = vec[1] * (this._height - 1);
          const x1D = x % 1;
          const y1D = y % 1;
          const x0D = 1 - x1D;
          const y0D = 1 - y1D;
          const xFloor = Math.floor(x);
          const yFloor = Math.floor(y);
          const x0y0 = this._getColor(this, xFloor, yFloor, __cornerWork[0]);
          const x1y0 = this._getColor(this, xFloor + 1, yFloor, __cornerWork[1]);
          const x0y1 = this._getColor(this, xFloor, yFloor + 1, __cornerWork[2]);
          const x1y1 = this._getColor(this, xFloor + 1, yFloor + 1, __cornerWork[3]);
          dst[0] = x0y0[0] * x0D * y0D + x0y1[0] * x0D * y1D + x1y0[0] * x1D * y0D + x1y1[0] * x1D * y1D;
          dst[1] = x0y0[1] * x0D * y0D + x0y1[1] * x0D * y1D + x1y0[1] * x1D * y0D + x1y1[1] * x1D * y1D;
          dst[2] = x0y0[2] * x0D * y0D + x0y1[2] * x0D * y1D + x1y0[2] * x1D * y0D + x1y1[2] * x1D * y1D;
          dst[3] = x0y0[3] * x0D * y0D + x0y1[3] * x0D * y1D + x1y0[3] * x1D * y0D + x1y1[3] * x1D * y1D;
          return dst;
        }
        isTouchingNearest(vec) {
          if (!this._colorData) return;
          return getPoint(
            this,
            Math.floor(vec[0] * (this._width - 1)),
            Math.floor(vec[1] * (this._height - 1))
          ) > 0;
        }
        isTouchingLinear(vec) {
          if (!this._colorData) return;
          const x = Math.floor(vec[0] * (this._width - 1));
          const y = Math.floor(vec[1] * (this._height - 1));
          return getPoint(this, x, y) > 0 || getPoint(this, x + 1, y) > 0 || getPoint(this, x, y + 1) > 0 || getPoint(this, x + 1, y + 1) > 0;
        }
        static _updateCanvas() {
          if (typeof __SilhouetteUpdateCanvas === "undefined") {
            __SilhouetteUpdateCanvas = document.createElement("canvas");
          }
          return __SilhouetteUpdateCanvas;
        }
      };
      module.exports = Silhouette;
    }
  });

  var require_Skin = __commonJS({
    "src/Skin.js"(exports, module) {
      var twgl = require_twgl_full();
      var RenderConstants = require_RenderConstants();
      var Silhouette = require_Silhouette();
      var Skin = class {
        constructor(id, renderer) {
          this._renderer = renderer;
          this._id = id;
          this._rotationCenter = twgl.v3.create(0, 0);
          this._texture = null;
          this._uniforms = {
            u_skinSize: [0, 0],
            u_skin: null
          };
          this._silhouette = new Silhouette();
          this.private = false;
        }
        dispose() {
          if (this._emptyImageTexture) {
            this._renderer.gl.deleteTexture(this._emptyImageTexture);
            this._emptyImageTexture = null;
          }
          this._id = RenderConstants.ID_NONE;
        }
        get id() {
          return this._id;
        }
        get rotationCenter() {
          return this._rotationCenter;
        }
        get size() {
          return [0, 0];
        }
        useNearest(scale, drawable) {
          return true;
        }
        calculateRotationCenter() {
          return [this.size[0] / 2, this.size[1] / 2];
        }
        getTexture(scale) {
          return this._emptyImageTexture;
        }
        isMetricsReady() {
          return !!this.getTexture([100, 100]);
        }
        getFenceBounds(drawable, result) {
          return drawable.getAABB(result);
        }
        getUniforms(scale) {
          this._uniforms.u_skin = this.getTexture(scale);
          this._uniforms.u_skinSize = this.size;
          return this._uniforms;
        }
        emitWasAltered() {
          this._renderer.skinWasAltered(this);
        }
        updateSilhouette() {
          this._silhouette.unlazy();
        }
        _setTexture(textureData) {
          const gl = this._renderer.gl;
          gl.bindTexture(gl.TEXTURE_2D, this._texture);
          gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textureData);
          gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
          this._silhouette.update(textureData);
        }
        setEmptyImageData() {
          this._texture = null;
          if (!this._emptyImageData) {
            this._emptyImageData = new ImageData(1, 1);
            const gl = this._renderer.gl;
            const textureOptions = {
              auto: true,
              wrap: gl.CLAMP_TO_EDGE,
              src: this._emptyImageData
            };
            this._emptyImageTexture = twgl.createTexture(gl, textureOptions);
          }
          this._rotationCenter[0] = 0;
          this._rotationCenter[1] = 0;
          this._silhouette.update(this._emptyImageData);
          this.emitWasAltered();
        }
        isTouchingNearest(vec) {
          return this._silhouette.isTouchingNearest(vec);
        }
        isTouchingLinear(vec) {
          return this._silhouette.isTouchingLinear(vec);
        }
      };
      module.exports = Skin;
    }
  });

  var require_Rectangle = __commonJS({
    "src/Rectangle.js"(exports, module) {
      var Rectangle = class _Rectangle {
        constructor() {
          this.left = -Infinity;
          this.right = Infinity;
          this.bottom = -Infinity;
          this.top = Infinity;
        }
        initFromBounds(left, right, bottom, top) {
          this.left = left;
          this.right = right;
          this.bottom = bottom;
          this.top = top;
        }
        initFromPointsAABB(points) {
          this.left = Infinity;
          this.right = -Infinity;
          this.top = -Infinity;
          this.bottom = Infinity;
          for (let i = 0; i < points.length; i++) {
            const x = points[i][0];
            const y = points[i][1];
            if (x < this.left) {
              this.left = x;
            }
            if (x > this.right) {
              this.right = x;
            }
            if (y > this.top) {
              this.top = y;
            }
            if (y < this.bottom) {
              this.bottom = y;
            }
          }
        }
        initFromModelMatrix(m) {
          const m30 = m[3 * 4 + 0];
          const m31 = m[3 * 4 + 1];
          const x = Math.abs(0.5 * m[0 * 4 + 0]) + Math.abs(0.5 * m[1 * 4 + 0]);
          const y = Math.abs(0.5 * m[0 * 4 + 1]) + Math.abs(0.5 * m[1 * 4 + 1]);
          this.left = -x + m30;
          this.right = x + m30;
          this.top = y + m31;
          this.bottom = -y + m31;
        }
        intersects(other) {
          return this.left <= other.right && other.left <= this.right && this.top >= other.bottom && other.top >= this.bottom;
        }
        contains(other) {
          return other.left > this.left && other.right < this.right && other.top < this.top && other.bottom > this.bottom;
        }
        clamp(left, right, bottom, top) {
          this.left = Math.max(this.left, left);
          this.right = Math.min(this.right, right);
          this.bottom = Math.max(this.bottom, bottom);
          this.top = Math.min(this.top, top);
          this.left = Math.min(this.left, right);
          this.right = Math.max(this.right, left);
          this.bottom = Math.min(this.bottom, top);
          this.top = Math.max(this.top, bottom);
        }
        snapToInt() {
          this.left = Math.floor(this.left);
          this.right = Math.ceil(this.right);
          this.bottom = Math.floor(this.bottom);
          this.top = Math.ceil(this.top);
        }
        static intersect(a, b, result = new _Rectangle()) {
          result.left = Math.max(a.left, b.left);
          result.right = Math.min(a.right, b.right);
          result.top = Math.min(a.top, b.top);
          result.bottom = Math.max(a.bottom, b.bottom);
          return result;
        }
        static union(a, b, result = new _Rectangle()) {
          result.left = Math.min(a.left, b.left);
          result.right = Math.max(a.right, b.right);
          result.top = Math.max(a.top, b.top);
          result.bottom = Math.min(a.bottom, b.bottom);
          return result;
        }
        get width() {
          return Math.abs(this.left - this.right);
        }
        get height() {
          return Math.abs(this.top - this.bottom);
        }
      };
      module.exports = Rectangle;
    }
  });

  var require_sprite = __commonJS({
    "stub:raw-loader!./shaders/sprite.vert"(exports, module) {
      module.exports = "";
    }
  });

  var require_sprite2 = __commonJS({
    "stub:raw-loader!./shaders/sprite.frag"(exports, module) {
      module.exports = "";
    }
  });

  var require_ShaderManager = __commonJS({
    "src/ShaderManager.js"(exports, module) {
      var twgl = require_twgl_full();
      var ShaderManager = class _ShaderManager {
        constructor(gl) {
          this._gl = gl;
          this._shaderCache = {};
          for (const modeName in _ShaderManager.DRAW_MODE) {
            if (Object.prototype.hasOwnProperty.call(_ShaderManager.DRAW_MODE, modeName)) {
              this._shaderCache[modeName] = [];
            }
          }
        }
        getShader(drawMode, effectBits) {
          const cache = this._shaderCache[drawMode];
          if (drawMode === _ShaderManager.DRAW_MODE.silhouette) {
            effectBits &= ~(_ShaderManager.EFFECT_INFO.color.mask | _ShaderManager.EFFECT_INFO.brightness.mask);
          }
          let shader = cache[effectBits];
          if (!shader) {
            shader = cache[effectBits] = this._buildShader(drawMode, effectBits);
          }
          return shader;
        }
        _buildShader(drawMode, effectBits) {
          const numEffects = _ShaderManager.EFFECTS.length;
          const defines = [
            `#define DRAW_MODE_${drawMode}`
          ];
          for (let index = 0; index < numEffects; ++index) {
            if ((effectBits & 1 << index) !== 0) {
              defines.push(`#define ENABLE_${_ShaderManager.EFFECTS[index]}`);
            }
          }
          const definesText = `${defines.join("\n")}
`;
          const vsFullText = definesText + require_sprite();
          const fsFullText = definesText + require_sprite2();
          let errorMessage = null;
          const onError = (newError) => {
            console.error(newError);
            const match = newError.match(/\*\*\* Error compiling shader: ([\s\S]+)/);
            errorMessage = match ? match[1].trim() : newError;
          };
          const program = twgl.createProgramInfo(this._gl, [vsFullText, fsFullText], null, null, onError);
          if (!program) {
            throw new Error(`Failed to compile shader (mode ${drawMode}, effects ${effectBits}): ${errorMessage}`);
          }
          return program;
        }
      };
      ShaderManager.EFFECT_INFO = {
        color: {
          uniformName: "u_color",
          mask: 1 << 0,
          converter: (x) => x / 200 % 1,
          shapeChanges: false
        },
        fisheye: {
          uniformName: "u_fisheye",
          mask: 1 << 1,
          converter: (x) => Math.max(0, (x + 100) / 100),
          shapeChanges: true
        },
        whirl: {
          uniformName: "u_whirl",
          mask: 1 << 2,
          converter: (x) => -x * Math.PI / 180,
          shapeChanges: true
        },
        pixelate: {
          uniformName: "u_pixelate",
          mask: 1 << 3,
          converter: (x) => Math.abs(x) / 10,
          shapeChanges: true
        },
        mosaic: {
          uniformName: "u_mosaic",
          mask: 1 << 4,
          converter: (x) => {
            x = Math.round((Math.abs(x) + 10) / 10);
            return Math.max(1, Math.min(x, 512));
          },
          shapeChanges: true
        },
        brightness: {
          uniformName: "u_brightness",
          mask: 1 << 5,
          converter: (x) => Math.max(-100, Math.min(x, 100)) / 100,
          shapeChanges: false
        },
        ghost: {
          uniformName: "u_ghost",
          mask: 1 << 6,
          converter: (x) => 1 - Math.max(0, Math.min(x, 100)) / 100,
          shapeChanges: false
        }
      };
      ShaderManager.EFFECTS = Object.keys(ShaderManager.EFFECT_INFO);
      ShaderManager.DRAW_MODE = {
        default: "default",
        straightAlpha: "straightAlpha",
        silhouette: "silhouette",
        colorMask: "colorMask",
        line: "line",
        background: "background"
      };
      module.exports = ShaderManager;
    }
  });

  var require_color_conversions = __commonJS({
    "src/util/color-conversions.js"(exports, module) {
      var rgbToHsv = ([r, g, b], dst) => {
        let K = 0;
        r /= 255;
        g /= 255;
        b /= 255;
        let tmp = 0;
        if (g < b) {
          tmp = g;
          g = b;
          b = tmp;
          K = -1;
        }
        if (r < g) {
          tmp = r;
          r = g;
          g = tmp;
          K = -2 / 6 - K;
        }
        const chroma = r - Math.min(g, b);
        const h = Math.abs(K + (g - b) / (6 * chroma + Number.EPSILON));
        const s = chroma / (r + Number.EPSILON);
        const v = r;
        dst[0] = h;
        dst[1] = s;
        dst[2] = v;
        return dst;
      };
      var hsvToRgb = ([h, s, v], dst) => {
        if (s === 0) {
          dst[0] = dst[1] = dst[2] = v * 255 + 0.5;
          return dst;
        }
        h %= 1;
        const i = h * 6 | 0;
        const f = h * 6 - i;
        const p = v * (1 - s);
        const q = v * (1 - s * f);
        const t = v * (1 - s * (1 - f));
        let r = 0;
        let g = 0;
        let b = 0;
        switch (i) {
          case 0:
            r = v;
            g = t;
            b = p;
            break;
          case 1:
            r = q;
            g = v;
            b = p;
            break;
          case 2:
            r = p;
            g = v;
            b = t;
            break;
          case 3:
            r = p;
            g = q;
            b = v;
            break;
          case 4:
            r = t;
            g = p;
            b = v;
            break;
          case 5:
            r = v;
            g = p;
            b = q;
            break;
        }
        dst[0] = r * 255 + 0.5;
        dst[1] = g * 255 + 0.5;
        dst[2] = b * 255 + 0.5;
        return dst;
      };
      module.exports = { rgbToHsv, hsvToRgb };
    }
  });

  var require_EffectTransform = __commonJS({
    "src/EffectTransform.js"(exports, module) {
      var twgl = require_twgl_full();
      var { rgbToHsv, hsvToRgb } = require_color_conversions();
      var ShaderManager = require_ShaderManager();
      var CENTER_X = 0.5;
      var CENTER_Y = 0.5;
      var __hsv = [0, 0, 0];
      var EffectTransform = class {
        static transformColor(drawable, inOutColor, effectMask) {
          if (inOutColor[3] === 0) {
            return inOutColor;
          }
          let effects = drawable.enabledEffects;
          if (typeof effectMask === "number") effects &= effectMask;
          const uniforms = drawable.getUniforms();
          const enableColor = (effects & ShaderManager.EFFECT_INFO.color.mask) !== 0;
          const enableBrightness = (effects & ShaderManager.EFFECT_INFO.brightness.mask) !== 0;
          if (enableColor || enableBrightness) {
            const alpha = inOutColor[3] / 255;
            inOutColor[0] /= alpha;
            inOutColor[1] /= alpha;
            inOutColor[2] /= alpha;
            if (enableColor) {
              const hsv = rgbToHsv(inOutColor, __hsv);
              const minV = 0.11 / 2;
              const minS = 0.09;
              if (hsv[2] < minV) {
                hsv[0] = 0;
                hsv[1] = 1;
                hsv[2] = minV;
              } else if (hsv[1] < minS) {
                hsv[0] = 0;
                hsv[1] = minS;
              }
              hsv[0] = uniforms.u_color + hsv[0] + 1;
              hsvToRgb(hsv, inOutColor);
            }
            if (enableBrightness) {
              const brightness = uniforms.u_brightness * 255;
              inOutColor[0] += brightness;
              inOutColor[1] += brightness;
              inOutColor[2] += brightness;
            }
            inOutColor[0] *= alpha;
            inOutColor[1] *= alpha;
            inOutColor[2] *= alpha;
          }
          if ((effects & ShaderManager.EFFECT_INFO.ghost.mask) !== 0) {
            inOutColor[0] *= uniforms.u_ghost;
            inOutColor[1] *= uniforms.u_ghost;
            inOutColor[2] *= uniforms.u_ghost;
            inOutColor[3] *= uniforms.u_ghost;
          }
          return inOutColor;
        }
        static transformPoint(drawable, vec, dst) {
          twgl.v3.copy(vec, dst);
          const effects = drawable.enabledEffects;
          const uniforms = drawable.getUniforms();
          if ((effects & ShaderManager.EFFECT_INFO.mosaic.mask) !== 0) {
            dst[0] = uniforms.u_mosaic * dst[0] % 1;
            dst[1] = uniforms.u_mosaic * dst[1] % 1;
          }
          if ((effects & ShaderManager.EFFECT_INFO.pixelate.mask) !== 0) {
            const skinUniforms = drawable.skin.getUniforms();
            const texelX = skinUniforms.u_skinSize[0] / uniforms.u_pixelate;
            const texelY = skinUniforms.u_skinSize[1] / uniforms.u_pixelate;
            dst[0] = (Math.floor(dst[0] * texelX) + CENTER_X) / texelX;
            dst[1] = (Math.floor(dst[1] * texelY) + CENTER_Y) / texelY;
          }
          if ((effects & ShaderManager.EFFECT_INFO.whirl.mask) !== 0) {
            const RADIUS = 0.5;
            const offsetX = dst[0] - CENTER_X;
            const offsetY = dst[1] - CENTER_Y;
            const offsetMagnitude = Math.sqrt(Math.pow(offsetX, 2) + Math.pow(offsetY, 2));
            const whirlFactor = Math.max(1 - offsetMagnitude / RADIUS, 0);
            const whirlActual = uniforms.u_whirl * whirlFactor * whirlFactor;
            const sinWhirl = Math.sin(whirlActual);
            const cosWhirl = Math.cos(whirlActual);
            const rot1 = cosWhirl;
            const rot2 = -sinWhirl;
            const rot3 = sinWhirl;
            const rot4 = cosWhirl;
            dst[0] = rot1 * offsetX + rot3 * offsetY + CENTER_X;
            dst[1] = rot2 * offsetX + rot4 * offsetY + CENTER_Y;
          }
          if ((effects & ShaderManager.EFFECT_INFO.fisheye.mask) !== 0) {
            const vX = (dst[0] - CENTER_X) / CENTER_X;
            const vY = (dst[1] - CENTER_Y) / CENTER_Y;
            const vLength = Math.sqrt(vX * vX + vY * vY);
            const r = Math.pow(Math.min(vLength, 1), uniforms.u_fisheye) * Math.max(1, vLength);
            const unitX = vX / vLength;
            const unitY = vY / vLength;
            dst[0] = CENTER_X + r * unitX * CENTER_X;
            dst[1] = CENTER_Y + r * unitY * CENTER_Y;
          }
          return dst;
        }
      };
      module.exports = EffectTransform;
    }
  });

  var require_nanolog = __commonJS({
    "node_modules/@turbowarp/nanolog/index.js"(exports, module) {
      var addColors = typeof document === "undefined";
      var RESET = addColors ? "\x1B[0m" : "";
      var GRAY = addColors ? "\x1B[90m" : "";
      var BLUE = addColors ? "\x1B[34m" : "";
      var CYAN = addColors ? "\x1B[36m" : "";
      var YELLOW = addColors ? "\x1B[33m" : "";
      var RED = addColors ? "\x1B[31m" : "";
      var DEBUG = `${BLUE}debug${RESET}`;
      var INFO = `${CYAN}info${RESET}`;
      var WARN = `${YELLOW}warn${RESET}`;
      var ERROR = `${RED}error${RESET}`;
      var createLog = (namespace = "") => {
        const log = (childNamespace) => createLog(namespace ? `${namespace} ${childNamespace}` : childNamespace);
        const formattedNamespace = namespace ? [`${GRAY}${namespace}${RESET}`] : [];
        log.debug = log.log = console.debug.bind(console, ...formattedNamespace, DEBUG);
        log.info = console.log.bind(console, ...formattedNamespace, INFO);
        log.warn = log.warning = console.warn.bind(console, ...formattedNamespace, WARN);
        log.error = console.error.bind(console, ...formattedNamespace, ERROR);
        return log;
      };
      createLog.enable = createLog.disable = () => {
      };
      module.exports = createLog;
    }
  });

  var require_log = __commonJS({
    "src/util/log.js"(exports, module) {
      var nanolog = require_nanolog();
      nanolog.enable();
      module.exports = nanolog("scratch-render");
    }
  });

  var require_Drawable = __commonJS({
    "src/Drawable.js"(exports, module) {
      var twgl = require_twgl_full();
      var Rectangle = require_Rectangle();
      var RenderConstants = require_RenderConstants();
      var ShaderManager = require_ShaderManager();
      var EffectTransform = require_EffectTransform();
      var log = require_log();
      var __isTouchingPosition = twgl.v3.create();
      var FLOATING_POINT_ERROR_ALLOWANCE = 1e-6;
      var getLocalPosition = (drawable, vec) => {
        const localPosition = __isTouchingPosition;
        const v0 = vec[0];
        const v1 = vec[1];
        const m = drawable._inverseMatrix;
        const d = v0 * m[3] + v1 * m[7] + m[15];
        localPosition[0] = 0.5 - (v0 * m[0] + v1 * m[4] + m[12]) / d;
        localPosition[1] = (v0 * m[1] + v1 * m[5] + m[13]) / d + 0.5;
        if (Math.abs(localPosition[0]) < FLOATING_POINT_ERROR_ALLOWANCE) localPosition[0] = 0;
        if (Math.abs(localPosition[1]) < FLOATING_POINT_ERROR_ALLOWANCE) localPosition[1] = 0;
        if (drawable.enabledEffects !== 0 && (localPosition[0] >= 0 && localPosition[0] < 1) && (localPosition[1] >= 0 && localPosition[1] < 1)) {
          EffectTransform.transformPoint(drawable, localPosition, localPosition);
        }
        return localPosition;
      };
      var Drawable = class _Drawable {
        constructor(id, renderer) {
          this._id = id;
          this._renderer = renderer;
          this._uniforms = {
            u_modelMatrix: twgl.m4.identity(),
            u_silhouetteColor: _Drawable.color4fFromID(this._id)
          };
          const numEffects = ShaderManager.EFFECTS.length;
          for (let index = 0; index < numEffects; ++index) {
            const effectName = ShaderManager.EFFECTS[index];
            const effectInfo = ShaderManager.EFFECT_INFO[effectName];
            const converter = effectInfo.converter;
            this._uniforms[effectInfo.uniformName] = converter(0);
          }
          this._position = twgl.v3.create(0, 0);
          this._scale = twgl.v3.create(100, 100);
          this._direction = 90;
          this._transformDirty = true;
          this._rotationMatrix = twgl.m4.identity();
          this._rotationTransformDirty = true;
          this._rotationAdjusted = twgl.v3.create();
          this._rotationCenterDirty = true;
          this._skinScale = twgl.v3.create(0, 0, 0);
          this._skinScaleDirty = true;
          this._inverseMatrix = twgl.m4.identity();
          this._inverseTransformDirty = true;
          this._visible = true;
          this.enabledEffects = 0;
          this._convexHullPoints = null;
          this._convexHullDirty = true;
          this._transformedHullPoints = null;
          this._transformedHullDirty = true;
          this._skinWasAltered = this._skinWasAltered.bind(this);
          this.isTouching = this._isTouchingNever;
          this._highQuality = false;
          this.interactive = true;
        }
        setHighQuality(highQuality) {
          this._highQuality = highQuality;
        }
        dispose() {
          this.skin = null;
        }
        setTransformDirty() {
          this._transformDirty = true;
          this._inverseTransformDirty = true;
          this._transformedHullDirty = true;
        }
        get id() {
          return this._id;
        }
        get skin() {
          return this._skin;
        }
        set skin(newSkin) {
          if (this._skin !== newSkin) {
            this._skin = newSkin;
            this._skinWasAltered();
          }
        }
        get scale() {
          return [this._scale[0], this._scale[1]];
        }
        getUniforms() {
          if (this._transformDirty) {
            this._calculateTransform();
          }
          return this._uniforms;
        }
        getVisible() {
          return this._visible;
        }
        updatePosition(position) {
          if (this._position[0] !== position[0] || this._position[1] !== position[1]) {
            if (this._highQuality) {
              this._position[0] = position[0];
              this._position[1] = position[1];
            } else {
              this._position[0] = Math.round(position[0]);
              this._position[1] = Math.round(position[1]);
            }
            this._renderer.dirty = true;
            this.setTransformDirty();
          }
        }
        updateDirection(direction) {
          if (this._direction !== direction) {
            this._direction = direction;
            this._renderer.dirty = true;
            this._rotationTransformDirty = true;
            this.setTransformDirty();
          }
        }
        updateScale(scale) {
          if (this._scale[0] !== scale[0] || this._scale[1] !== scale[1]) {
            this._scale[0] = scale[0];
            this._scale[1] = scale[1];
            this._renderer.dirty = true;
            this._rotationCenterDirty = true;
            this._skinScaleDirty = true;
            this.setTransformDirty();
          }
        }
        updateVisible(visible) {
          if (this._visible !== visible) {
            this._visible = visible;
            this._renderer.dirty = true;
            this.setConvexHullDirty();
          }
        }
        updateEffect(effectName, rawValue) {
          this._renderer.dirty = true;
          const effectInfo = ShaderManager.EFFECT_INFO[effectName];
          if (rawValue) {
            this.enabledEffects |= effectInfo.mask;
          } else {
            this.enabledEffects &= ~effectInfo.mask;
          }
          const converter = effectInfo.converter;
          this._uniforms[effectInfo.uniformName] = converter(rawValue);
          if (effectInfo.shapeChanges) {
            this.setConvexHullDirty();
          }
        }
        updateProperties(properties) {
          if ("position" in properties) {
            this.updatePosition(properties.position);
          }
          if ("direction" in properties) {
            this.updateDirection(properties.direction);
          }
          if ("scale" in properties) {
            this.updateScale(properties.scale);
          }
          if ("visible" in properties) {
            this.updateVisible(properties.visible);
          }
          const numEffects = ShaderManager.EFFECTS.length;
          for (let index = 0; index < numEffects; ++index) {
            const effectName = ShaderManager.EFFECTS[index];
            if (effectName in properties) {
              this.updateEffect(effectName, properties[effectName]);
            }
          }
        }
        _calculateTransform() {
          if (this._rotationTransformDirty) {
            const rotation = (270 - this._direction) * Math.PI / 180;
            const c = Math.cos(rotation);
            const s = Math.sin(rotation);
            this._rotationMatrix[0] = c;
            this._rotationMatrix[1] = s;
            this._rotationMatrix[4] = -s;
            this._rotationMatrix[5] = c;
            this._rotationTransformDirty = false;
          }
          if (this._rotationCenterDirty && this.skin !== null) {
            const rotationCenter = this.skin.rotationCenter;
            const skinSize = this.skin.size;
            const center0 = rotationCenter[0];
            const center1 = rotationCenter[1];
            const skinSize0 = skinSize[0];
            const skinSize1 = skinSize[1];
            const scale02 = this._scale[0];
            const scale12 = this._scale[1];
            const rotationAdjusted = this._rotationAdjusted;
            rotationAdjusted[0] = (center0 - skinSize0 / 2) * scale02 / 100;
            rotationAdjusted[1] = (center1 - skinSize1 / 2) * scale12 / 100 * -1;
            this._rotationCenterDirty = false;
          }
          if (this._skinScaleDirty && this.skin !== null) {
            const skinSize = this.skin.size;
            const scaledSize = this._skinScale;
            scaledSize[0] = skinSize[0] * this._scale[0] / 100;
            scaledSize[1] = skinSize[1] * this._scale[1] / 100;
            this._skinScaleDirty = false;
          }
          const modelMatrix = this._uniforms.u_modelMatrix;
          const scale0 = this._skinScale[0];
          const scale1 = this._skinScale[1];
          const rotation00 = this._rotationMatrix[0];
          const rotation01 = this._rotationMatrix[1];
          const rotation10 = this._rotationMatrix[4];
          const rotation11 = this._rotationMatrix[5];
          const adjusted0 = this._rotationAdjusted[0];
          const adjusted1 = this._rotationAdjusted[1];
          const position0 = this._position[0];
          const position1 = this._position[1];
          modelMatrix[0] = scale0 * rotation00;
          modelMatrix[1] = scale0 * rotation01;
          modelMatrix[4] = scale1 * rotation10;
          modelMatrix[5] = scale1 * rotation11;
          modelMatrix[12] = rotation00 * adjusted0 + rotation10 * adjusted1 + position0;
          modelMatrix[13] = rotation01 * adjusted0 + rotation11 * adjusted1 + position1;
          this._transformDirty = false;
        }
        needsConvexHullPoints() {
          return !this._convexHullPoints || this._convexHullDirty || this._convexHullPoints.length === 0;
        }
        setConvexHullDirty() {
          this._convexHullDirty = true;
        }
        setConvexHullPoints(points) {
          this._convexHullPoints = points;
          this._convexHullDirty = false;
          this._transformedHullPoints = [];
          for (let i = 0; i < points.length; i++) {
            this._transformedHullPoints.push(twgl.v3.create());
          }
          this._transformedHullDirty = true;
        }
        _isTouchingNever(vec) {
          return false;
        }
        _isTouchingNearest(vec) {
          return this.skin.isTouchingNearest(getLocalPosition(this, vec));
        }
        _isTouchingLinear(vec) {
          return this.skin.isTouchingLinear(getLocalPosition(this, vec));
        }
        getBounds(result) {
          if (this.needsConvexHullPoints()) {
            throw new Error("Needs updated convex hull points before bounds calculation.");
          }
          if (this._transformDirty) {
            this._calculateTransform();
          }
          const transformedHullPoints = this._getTransformedHullPoints();
          result = result || new Rectangle();
          result.initFromPointsAABB(transformedHullPoints);
          return result;
        }
        getBoundsForBubble(result) {
          if (this.needsConvexHullPoints()) {
            throw new Error("Needs updated convex hull points before bubble bounds calculation.");
          }
          if (this._transformDirty) {
            this._calculateTransform();
          }
          const slice = 8;
          const transformedHullPoints = this._getTransformedHullPoints();
          const maxY = Math.max.apply(null, transformedHullPoints.map((p) => p[1]));
          const filteredHullPoints = transformedHullPoints.filter((p) => p[1] > maxY - slice);
          result = result || new Rectangle();
          result.initFromPointsAABB(filteredHullPoints);
          return result;
        }
        getAABB(result) {
          if (this._transformDirty) {
            this._calculateTransform();
          }
          const tm = this._uniforms.u_modelMatrix;
          result = result || new Rectangle();
          result.initFromModelMatrix(tm);
          return result;
        }
        getFastBounds(result) {
          if (!this.needsConvexHullPoints()) {
            return this.getBounds(result);
          }
          return this.getAABB(result);
        }
        _getTransformedHullPoints() {
          if (!this._transformedHullDirty) {
            return this._transformedHullPoints;
          }
          const projection = twgl.m4.ortho(-1, 1, -1, 1, -1, 1);
          const skinSize = this.skin.size;
          const halfXPixel = 1 / skinSize[0] / 2;
          const halfYPixel = 1 / skinSize[1] / 2;
          const tm = twgl.m4.multiply(this._uniforms.u_modelMatrix, projection);
          for (let i = 0; i < this._convexHullPoints.length; i++) {
            const point = this._convexHullPoints[i];
            const dstPoint = this._transformedHullPoints[i];
            dstPoint[0] = 0.5 + -point[0] / skinSize[0] - halfXPixel;
            dstPoint[1] = point[1] / skinSize[1] - 0.5 + halfYPixel;
            twgl.m4.transformPoint(tm, dstPoint, dstPoint);
          }
          this._transformedHullDirty = false;
          return this._transformedHullPoints;
        }
        updateMatrix() {
          if (this._transformDirty) {
            this._calculateTransform();
          }
          if (this._inverseTransformDirty) {
            const inverse = this._inverseMatrix;
            twgl.m4.copy(this._uniforms.u_modelMatrix, inverse);
            inverse[10] = 1;
            twgl.m4.inverse(inverse, inverse);
            this._inverseTransformDirty = false;
          }
        }
        updateCPURenderAttributes() {
          this.updateMatrix();
          if (this.skin) {
            this.skin.updateSilhouette(this._scale);
            if (this.skin.useNearest(this._scale, this)) {
              this.isTouching = this._isTouchingNearest;
            } else {
              this.isTouching = this._isTouchingLinear;
            }
          } else {
            log.warn(`Could not find skin for drawable with id: ${this._id}`);
            this.isTouching = this._isTouchingNever;
          }
        }
        _skinWasAltered() {
          this._renderer.dirty = true;
          this._rotationCenterDirty = true;
          this._skinScaleDirty = true;
          this.setConvexHullDirty();
          this.setTransformDirty();
        }
        static color4fFromID(id) {
          id -= RenderConstants.ID_NONE;
          const r = (id >> 0 & 255) / 255;
          const g = (id >> 8 & 255) / 255;
          const b = (id >> 16 & 255) / 255;
          return [r, g, b, 1];
        }
        static color3bToID(r, g, b) {
          let id;
          id = (r & 255) << 0;
          id |= (g & 255) << 8;
          id |= (b & 255) << 16;
          return id + RenderConstants.ID_NONE;
        }
        static sampleColor4b(vec, drawable, dst, effectMask) {
          const localPosition = getLocalPosition(drawable, vec);
          if (localPosition[0] < 0 || localPosition[1] < 0 || localPosition[0] > 1 || localPosition[1] > 1) {
            dst[0] = 0;
            dst[1] = 0;
            dst[2] = 0;
            dst[3] = 0;
            return dst;
          }
          const textColor = (
            drawable.skin._silhouette.colorAtNearest(localPosition, dst)
          );
          if (drawable.enabledEffects === 0) return textColor;
          return EffectTransform.transformColor(drawable, textColor, effectMask);
        }
      };
      module.exports = Drawable;
    }
  });

  var require_core = __commonJS({
    "hx/core.js"(exports, module) {
      if (typeof ImageData === "undefined") {
        globalThis.ImageData = class ImageData {
          constructor(d, w, h) {
            this.data = d;
            this.width = w;
            this.height = h;
          }
        };
      }
      var twgl = require_twgl_full();
      var Skin = require_Skin();
      var Drawable = require_Drawable();
      var Rectangle = require_Rectangle();
      var stubRenderer = { skinWasAltered() {
      }, gl: null, dirty: false };
      function b64ToU8(b64) {
        if (typeof Buffer !== "undefined") return new Uint8Array(Buffer.from(b64, "base64"));
        const s = atob(b64), u = new Uint8Array(s.length);
        for (let i = 0; i < s.length; i++) u[i] = s.charCodeAt(i);
        return u;
      }
      var CoreSkin = class extends Skin {
        constructor(spec, kind) {
          super(0, stubRenderer);
          this.kind = kind;
          this._size = [spec.size[0], spec.size[1]];
          this._rotationCenter[0] = spec.rc[0];
          this._rotationCenter[1] = spec.rc[1];
          const a = spec.alpha || b64ToU8(spec.alpha_b64);
          const rgba = new Uint8ClampedArray(spec.w * spec.h * 4);
          for (let i = 0; i < a.length; i++) rgba[i * 4 + 3] = a[i];
          this._silhouette.update(new ImageData(rgba, spec.w, spec.h));
        }
        get size() {
          return [this._size[0], this._size[1]];
        }
        getTexture() {
          return {};
        }
        updateSilhouette() {
        }
        useNearest(scale, drawable) {
          if (this.kind !== "svg") return true;
          if (drawable._direction % 90 !== 0) return false;
          return Math.abs(scale[0]) > 99 && Math.abs(scale[0]) < 101 && Math.abs(scale[1]) > 99 && Math.abs(scale[1]) < 101;
        }
      };
      function makeDrawable(skin, dir, x, y, size) {
        const d = new Drawable(0, stubRenderer);
        d.skin = skin;
        d.updateProperties({ position: [x, y], direction: dir, scale: [size, size] });
        return d;
      }
      var _pt = [0, 0];
      function touching(a, b, ox, oy) {
        a.updateCPURenderAttributes();
        b.updateCPURenderAttributes();
        const b1 = a.getFastBounds(), b2 = b.getFastBounds();
        b1.snapToInt();
        b2.snapToInt();
        if (!b1.intersects(b2)) return false;
        const r = Rectangle.intersect(b1, b2);
        let left = r.left, right = r.right, bottom = r.bottom, top = r.top;
        if (api.clip && ox !== undefined && oy !== undefined) {
          left = Math.max(left, -240 - ox);   right = Math.min(right, 240 - ox);
          bottom = Math.max(bottom, -180 - oy); top = Math.min(top, 180 - oy);
          if (left > right || bottom > top) return false;
        }
        for (let x = left; x <= right; x++) {
          _pt[0] = x;
          for (let y = bottom; y <= top; y++) {
            _pt[1] = y;
            if (a.isTouching(_pt) && b.isTouching(_pt)) return true;
          }
        }
        return false;
      }
      function grid(spikeSkin, spikeDir, playerSkin, playerDir, opt) {
        opt = opt || {};
        const W = opt.W || 130, H = opt.H || 129;
        const xo = opt.xo !== undefined ? opt.xo : 65, yo = opt.yo !== undefined ? opt.yo : 64;
        const sp = makeDrawable(spikeSkin, spikeDir, 0, 0, opt.spikeSize || 100);
        const pl = makeDrawable(playerSkin, playerDir, 0, 0, opt.playerSize || 100);
        const out = new Uint8Array(W * H);
        for (let r = 0; r < H; r++) for (let c = 0; c < W; c++) {
          pl.updateProperties({ position: [c - xo, r - yo] });
          out[r * W + c] = touching(pl, sp) ? 1 : 0;
        }
        return out;
      }
      var api = { CoreSkin, makeDrawable, touching, grid, b64ToU8, clip: true };
      if (typeof window !== "undefined") window.ScratchTouch = api;
      if (typeof globalThis !== "undefined") globalThis.ScratchTouch = api;
      module.exports = api;
    }
  });
  return require_core();
})();
