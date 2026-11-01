(() => {
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
              function isBuffer(gl2, t) {
                if (!repBuffer) {
                  repBuffer = gl2.createBuffer();
                }
                return t instanceof repBuffer.constructor;
              }
              var repRenderbuffer;
              function isRenderbuffer(gl2, t) {
                if (!repRenderbuffer) {
                  repRenderbuffer = gl2.createRenderbuffer();
                }
                return t instanceof repRenderbuffer.constructor;
              }
              var repShader;
              function isShader(gl2, t) {
                if (!repShader) {
                  repShader = gl2.createShader(gl2.VERTEX_SHADER);
                }
                return t instanceof repShader.constructor;
              }
              var repTexture;
              function isTexture(gl2, t) {
                if (!repTexture) {
                  repTexture = gl2.createTexture();
                }
                return t instanceof repTexture.constructor;
              }
              var repSampler;
              function isSampler(gl2, t) {
                if (!repSampler) {
                  if (gl2.createSampler) {
                    repSampler = gl2.createSampler();
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
              var gl2 = void 0;
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
              function isWebGL2(gl2) {
                return !!gl2.texStorage2D;
              }
              function isWebGL1(gl2) {
                return !gl2.texStorage2D;
              }
              var glEnumToString =  (function() {
                var haveEnumsForType = {};
                var enums = {};
                function addEnums(gl2) {
                  var type = gl2.constructor.name;
                  if (!haveEnumsForType[type]) {
                    for (var key in gl2) {
                      if (typeof gl2[key] === "number") {
                        var existing = enums[gl2[key]];
                        enums[gl2[key]] = existing ? "".concat(existing, " | ").concat(key) : key;
                      }
                    }
                    haveEnumsForType[type] = true;
                  }
                }
                return function glEnumToString2(gl2, value) {
                  addEnums(gl2);
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
              function getBindPointForSamplerType(gl3, type) {
                return typeMap[type].bindPoint;
              }
              function floatSetter(gl3, location) {
                return function(v) {
                  gl3.uniform1f(location, v);
                };
              }
              function floatArraySetter(gl3, location) {
                return function(v) {
                  gl3.uniform1fv(location, v);
                };
              }
              function floatVec2Setter(gl3, location) {
                return function(v) {
                  gl3.uniform2fv(location, v);
                };
              }
              function floatVec3Setter(gl3, location) {
                return function(v) {
                  gl3.uniform3fv(location, v);
                };
              }
              function floatVec4Setter(gl3, location) {
                return function(v) {
                  gl3.uniform4fv(location, v);
                };
              }
              function intSetter(gl3, location) {
                return function(v) {
                  gl3.uniform1i(location, v);
                };
              }
              function intArraySetter(gl3, location) {
                return function(v) {
                  gl3.uniform1iv(location, v);
                };
              }
              function intVec2Setter(gl3, location) {
                return function(v) {
                  gl3.uniform2iv(location, v);
                };
              }
              function intVec3Setter(gl3, location) {
                return function(v) {
                  gl3.uniform3iv(location, v);
                };
              }
              function intVec4Setter(gl3, location) {
                return function(v) {
                  gl3.uniform4iv(location, v);
                };
              }
              function uintSetter(gl3, location) {
                return function(v) {
                  gl3.uniform1ui(location, v);
                };
              }
              function uintArraySetter(gl3, location) {
                return function(v) {
                  gl3.uniform1uiv(location, v);
                };
              }
              function uintVec2Setter(gl3, location) {
                return function(v) {
                  gl3.uniform2uiv(location, v);
                };
              }
              function uintVec3Setter(gl3, location) {
                return function(v) {
                  gl3.uniform3uiv(location, v);
                };
              }
              function uintVec4Setter(gl3, location) {
                return function(v) {
                  gl3.uniform4uiv(location, v);
                };
              }
              function floatMat2Setter(gl3, location) {
                return function(v) {
                  gl3.uniformMatrix2fv(location, false, v);
                };
              }
              function floatMat3Setter(gl3, location) {
                return function(v) {
                  gl3.uniformMatrix3fv(location, false, v);
                };
              }
              function floatMat4Setter(gl3, location) {
                return function(v) {
                  gl3.uniformMatrix4fv(location, false, v);
                };
              }
              function floatMat23Setter(gl3, location) {
                return function(v) {
                  gl3.uniformMatrix2x3fv(location, false, v);
                };
              }
              function floatMat32Setter(gl3, location) {
                return function(v) {
                  gl3.uniformMatrix3x2fv(location, false, v);
                };
              }
              function floatMat24Setter(gl3, location) {
                return function(v) {
                  gl3.uniformMatrix2x4fv(location, false, v);
                };
              }
              function floatMat42Setter(gl3, location) {
                return function(v) {
                  gl3.uniformMatrix4x2fv(location, false, v);
                };
              }
              function floatMat34Setter(gl3, location) {
                return function(v) {
                  gl3.uniformMatrix3x4fv(location, false, v);
                };
              }
              function floatMat43Setter(gl3, location) {
                return function(v) {
                  gl3.uniformMatrix4x3fv(location, false, v);
                };
              }
              function samplerSetter(gl3, type, unit, location) {
                var bindPoint = getBindPointForSamplerType(gl3, type);
                return utils.isWebGL2(gl3) ? function(textureOrPair) {
                  var texture;
                  var sampler;
                  if (helper.isTexture(gl3, textureOrPair)) {
                    texture = textureOrPair;
                    sampler = null;
                  } else {
                    texture = textureOrPair.texture;
                    sampler = textureOrPair.sampler;
                  }
                  gl3.uniform1i(location, unit);
                  gl3.activeTexture(gl3.TEXTURE0 + unit);
                  gl3.bindTexture(bindPoint, texture);
                  gl3.bindSampler(unit, sampler);
                } : function(texture) {
                  gl3.uniform1i(location, unit);
                  gl3.activeTexture(gl3.TEXTURE0 + unit);
                  gl3.bindTexture(bindPoint, texture);
                };
              }
              function samplerArraySetter(gl3, type, unit, location, size) {
                var bindPoint = getBindPointForSamplerType(gl3, type);
                var units = new Int32Array(size);
                for (var ii2 = 0; ii2 < size; ++ii2) {
                  units[ii2] = unit + ii2;
                }
                return utils.isWebGL2(gl3) ? function(textures) {
                  gl3.uniform1iv(location, units);
                  textures.forEach(function(textureOrPair, index) {
                    gl3.activeTexture(gl3.TEXTURE0 + units[index]);
                    var texture;
                    var sampler;
                    if (helper.isTexture(gl3, textureOrPair)) {
                      texture = textureOrPair;
                      sampler = null;
                    } else {
                      texture = textureOrPair.texture;
                      sampler = textureOrPair.sampler;
                    }
                    gl3.bindSampler(unit, sampler);
                    gl3.bindTexture(bindPoint, texture);
                  });
                } : function(textures) {
                  gl3.uniform1iv(location, units);
                  textures.forEach(function(texture, index) {
                    gl3.activeTexture(gl3.TEXTURE0 + units[index]);
                    gl3.bindTexture(bindPoint, texture);
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
              function floatAttribSetter(gl3, index) {
                return function(b) {
                  gl3.bindBuffer(gl3.ARRAY_BUFFER, b.buffer);
                  gl3.enableVertexAttribArray(index);
                  gl3.vertexAttribPointer(index, b.numComponents || b.size, b.type || gl3.FLOAT, b.normalize || false, b.stride || 0, b.offset || 0);
                  if (b.divisor !== void 0) {
                    gl3.vertexAttribDivisor(index, b.divisor);
                  }
                };
              }
              function intAttribSetter(gl3, index) {
                return function(b) {
                  gl3.bindBuffer(gl3.ARRAY_BUFFER, b.buffer);
                  gl3.enableVertexAttribArray(index);
                  gl3.vertexAttribIPointer(index, b.numComponents || b.size, b.type || gl3.INT, b.stride || 0, b.offset || 0);
                  if (b.divisor !== void 0) {
                    gl3.vertexAttribDivisor(index, b.divisor);
                  }
                };
              }
              function matAttribSetter(gl3, index, typeInfo) {
                var defaultSize = typeInfo.size;
                var count = typeInfo.count;
                return function(b) {
                  gl3.bindBuffer(gl3.ARRAY_BUFFER, b.buffer);
                  var numComponents = b.size || b.numComponents || defaultSize;
                  var size = numComponents / count;
                  var type = b.type || gl3.FLOAT;
                  var typeInfo2 = typeMap[type];
                  var stride = typeInfo2.size * numComponents;
                  var normalize = b.normalize || false;
                  var offset = b.offset || 0;
                  var rowOffset = stride / count;
                  for (var i = 0; i < count; ++i) {
                    gl3.enableVertexAttribArray(index + i);
                    gl3.vertexAttribPointer(index + i, size, type, normalize, stride, offset + rowOffset * i);
                    if (b.divisor !== void 0) {
                      gl3.vertexAttribDivisor(index + i, b.divisor);
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
              var gl2 = void 0;
              function addLineNumbers(src, lineOffset) {
                lineOffset = lineOffset || 0;
                ++lineOffset;
                return src.split("\n").map(function(line, ndx) {
                  return ndx + lineOffset + ": " + line;
                }).join("\n");
              }
              var spaceRE = /^[ \t]*\n/;
              function loadShader(gl3, shaderSource, shaderType, opt_errorCallback) {
                var errFn = opt_errorCallback || error;
                var shader = gl3.createShader(shaderType);
                var lineOffset = 0;
                if (spaceRE.test(shaderSource)) {
                  lineOffset = 1;
                  shaderSource = shaderSource.replace(spaceRE, "");
                }
                gl3.shaderSource(shader, shaderSource);
                gl3.compileShader(shader);
                var compiled = gl3.getShaderParameter(shader, gl3.COMPILE_STATUS);
                if (!compiled) {
                  var lastError = gl3.getShaderInfoLog(shader);
                  errFn(addLineNumbers(shaderSource, lineOffset) + "\n*** Error compiling shader: " + lastError);
                  gl3.deleteShader(shader);
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
                  return gl2.FRAGMENT_SHADER;
                } else if (scriptType.indexOf("vert") >= 0) {
                  return gl2.VERTEX_SHADER;
                }
                return void 0;
              }
              function deleteShaders(gl3, shaders) {
                shaders.forEach(function(shader) {
                  gl3.deleteShader(shader);
                });
              }
              function createProgram(gl3, shaders, opt_attribs, opt_locations, opt_errorCallback) {
                var progOptions = getProgramOptions(opt_attribs, opt_locations, opt_errorCallback);
                var realShaders = [];
                var newShaders = [];
                for (var ndx = 0; ndx < shaders.length; ++ndx) {
                  var shader = shaders[ndx];
                  if (typeof shader === "string") {
                    var elem = getElementById(shader);
                    var src = elem ? elem.text : shader;
                    var type = gl3[defaultShaderType[ndx]];
                    if (elem && elem.type) {
                      type = getShaderTypeFromScriptType(elem.type) || type;
                    }
                    shader = loadShader(gl3, src, type, progOptions.errorCallback);
                    newShaders.push(shader);
                  }
                  if (helper.isShader(gl3, shader)) {
                    realShaders.push(shader);
                  }
                }
                if (realShaders.length !== shaders.length) {
                  progOptions.errorCallback("not enough shaders for program");
                  deleteShaders(gl3, newShaders);
                  return null;
                }
                var program = gl3.createProgram();
                realShaders.forEach(function(shader2) {
                  gl3.attachShader(program, shader2);
                });
                if (progOptions.attribLocations) {
                  Object.keys(progOptions.attribLocations).forEach(function(attrib) {
                    gl3.bindAttribLocation(program, progOptions.attribLocations[attrib], attrib);
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
                  gl3.transformFeedbackVaryings(program, varyings, progOptions.transformFeedbackMode || gl3.SEPARATE_ATTRIBS);
                }
                gl3.linkProgram(program);
                var linked = gl3.getProgramParameter(program, gl3.LINK_STATUS);
                if (!linked) {
                  var lastError = gl3.getProgramInfoLog(program);
                  progOptions.errorCallback("Error in program linking:" + lastError);
                  gl3.deleteProgram(program);
                  deleteShaders(gl3, newShaders);
                  return null;
                }
                return program;
              }
              function createShaderFromScript(gl3, scriptId, opt_shaderType, opt_errorCallback) {
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
                return loadShader(gl3, shaderSource, shaderType, opt_errorCallback);
              }
              function createProgramFromScripts(gl3, shaderScriptIds, opt_attribs, opt_locations, opt_errorCallback) {
                var progOptions = getProgramOptions(opt_attribs, opt_locations, opt_errorCallback);
                var shaders = [];
                for (var ii2 = 0; ii2 < shaderScriptIds.length; ++ii2) {
                  var shader = createShaderFromScript(gl3, shaderScriptIds[ii2], gl3[defaultShaderType[ii2]], progOptions.errorCallback);
                  if (!shader) {
                    return null;
                  }
                  shaders.push(shader);
                }
                return createProgram(gl3, shaders, progOptions);
              }
              function createProgramFromSources(gl3, shaderSources, opt_attribs, opt_locations, opt_errorCallback) {
                var progOptions = getProgramOptions(opt_attribs, opt_locations, opt_errorCallback);
                var shaders = [];
                for (var ii2 = 0; ii2 < shaderSources.length; ++ii2) {
                  var shader = loadShader(gl3, shaderSources[ii2], gl3[defaultShaderType[ii2]], progOptions.errorCallback);
                  if (!shader) {
                    return null;
                  }
                  shaders.push(shader);
                }
                return createProgram(gl3, shaders, progOptions);
              }
              function isBuiltIn(info) {
                var name = info.name;
                return name.startsWith("gl_") || name.startsWith("webgl_");
              }
              function createUniformSetters(gl3, program) {
                var textureUnit = 0;
                function createUniformSetter(program2, uniformInfo2) {
                  var location = gl3.getUniformLocation(program2, uniformInfo2.name);
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
                      setter2 = typeInfo.arraySetter(gl3, type, unit, location, uniformInfo2.size);
                    } else {
                      setter2 = typeInfo.setter(gl3, type, unit, location, uniformInfo2.size);
                    }
                  } else {
                    if (typeInfo.arraySetter && isArray) {
                      setter2 = typeInfo.arraySetter(gl3, location);
                    } else {
                      setter2 = typeInfo.setter(gl3, location);
                    }
                  }
                  setter2.location = location;
                  return setter2;
                }
                var uniformSetters = {};
                var numUniforms = gl3.getProgramParameter(program, gl3.ACTIVE_UNIFORMS);
                for (var ii2 = 0; ii2 < numUniforms; ++ii2) {
                  var uniformInfo = gl3.getActiveUniform(program, ii2);
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
              function createTransformFeedbackInfo(gl3, program) {
                var info = {};
                var numVaryings = gl3.getProgramParameter(program, gl3.TRANSFORM_FEEDBACK_VARYINGS);
                for (var ii2 = 0; ii2 < numVaryings; ++ii2) {
                  var varying = gl3.getTransformFeedbackVarying(program, ii2);
                  info[varying.name] = {
                    index: ii2,
                    type: varying.type,
                    size: varying.size
                  };
                }
                return info;
              }
              function bindTransformFeedbackInfo(gl3, transformFeedbackInfo, bufferInfo) {
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
                      gl3.bindBufferRange(gl3.TRANSFORM_FEEDBACK_BUFFER, varying.index, buf.buffer, buf.offset, buf.size);
                    } else {
                      gl3.bindBufferBase(gl3.TRANSFORM_FEEDBACK_BUFFER, varying.index, buf.buffer);
                    }
                  }
                }
              }
              function unbindTransformFeedbackInfo(gl3, transformFeedbackInfo, bufferInfo) {
                if (transformFeedbackInfo.transformFeedbackInfo) {
                  transformFeedbackInfo = transformFeedbackInfo.transformFeedbackInfo;
                }
                if (bufferInfo.attribs) {
                  bufferInfo = bufferInfo.attribs;
                }
                for (var name in bufferInfo) {
                  var varying = transformFeedbackInfo[name];
                  if (varying) {
                    gl3.bindBufferBase(gl3.TRANSFORM_FEEDBACK_BUFFER, varying.index, null);
                  }
                }
              }
              function createTransformFeedback(gl3, programInfo, bufferInfo) {
                var tf = gl3.createTransformFeedback();
                gl3.bindTransformFeedback(gl3.TRANSFORM_FEEDBACK, tf);
                gl3.useProgram(programInfo.program);
                bindTransformFeedbackInfo(gl3, programInfo, bufferInfo);
                gl3.bindTransformFeedback(gl3.TRANSFORM_FEEDBACK, null);
                unbindTransformFeedbackInfo(gl3, programInfo, bufferInfo);
                return tf;
              }
              function createUniformBlockSpecFromProgram(gl3, program) {
                var numUniforms = gl3.getProgramParameter(program, gl3.ACTIVE_UNIFORMS);
                var uniformData = [];
                var uniformIndices = [];
                for (var ii2 = 0; ii2 < numUniforms; ++ii2) {
                  uniformIndices.push(ii2);
                  uniformData.push({});
                  var uniformInfo = gl3.getActiveUniform(program, ii2);
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
                  gl3.getActiveUniforms(program, uniformIndices, gl3[pname]).forEach(function(value, ndx) {
                    uniformData[ndx][key] = value;
                  });
                });
                var blockSpecs = {};
                var numUniformBlocks = gl3.getProgramParameter(program, gl3.ACTIVE_UNIFORM_BLOCKS);
                for (var _ii = 0; _ii < numUniformBlocks; ++_ii) {
                  var name = gl3.getActiveUniformBlockName(program, _ii);
                  var blockSpec = {
                    index: _ii,
                    usedByVertexShader: gl3.getActiveUniformBlockParameter(program, _ii, gl3.UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER),
                    usedByFragmentShader: gl3.getActiveUniformBlockParameter(program, _ii, gl3.UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER),
                    size: gl3.getActiveUniformBlockParameter(program, _ii, gl3.UNIFORM_BLOCK_DATA_SIZE),
                    uniformIndices: gl3.getActiveUniformBlockParameter(program, _ii, gl3.UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES)
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
              function createUniformBlockInfoFromProgram(gl3, program, uniformBlockSpec, blockName) {
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
                var buffer = gl3.createBuffer();
                var uniformBufferIndex = blockSpec.index;
                gl3.bindBuffer(gl3.UNIFORM_BUFFER, buffer);
                gl3.uniformBlockBinding(program, blockSpec.index, uniformBufferIndex);
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
              function createUniformBlockInfo(gl3, programInfo, blockName) {
                return createUniformBlockInfoFromProgram(gl3, programInfo.program, programInfo.uniformBlockSpec, blockName);
              }
              function bindUniformBlock(gl3, programInfo, uniformBlockInfo) {
                var uniformBlockSpec = programInfo.uniformBlockSpec || programInfo;
                var blockSpec = uniformBlockSpec.blockSpecs[uniformBlockInfo.name];
                if (blockSpec) {
                  var bufferBindIndex = blockSpec.index;
                  gl3.bindBufferRange(gl3.UNIFORM_BUFFER, bufferBindIndex, uniformBlockInfo.buffer, uniformBlockInfo.offset || 0, uniformBlockInfo.array.byteLength);
                  return true;
                }
                return false;
              }
              function setUniformBlock(gl3, programInfo, uniformBlockInfo) {
                if (bindUniformBlock(gl3, programInfo, uniformBlockInfo)) {
                  gl3.bufferData(gl3.UNIFORM_BUFFER, uniformBlockInfo.array, gl3.DYNAMIC_DRAW);
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
              function createAttributeSetters(gl3, program) {
                var attribSetters = {};
                var numAttribs = gl3.getProgramParameter(program, gl3.ACTIVE_ATTRIBUTES);
                for (var ii2 = 0; ii2 < numAttribs; ++ii2) {
                  var attribInfo = gl3.getActiveAttrib(program, ii2);
                  if (isBuiltIn(attribInfo)) {
                    continue;
                  }
                  var index = gl3.getAttribLocation(program, attribInfo.name);
                  var typeInfo = attrTypeMap[attribInfo.type];
                  var setter = typeInfo.setter(gl3, index, typeInfo);
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
              function setBuffersAndAttributes(gl3, programInfo, buffers) {
                if (buffers.vertexArrayObject) {
                  gl3.bindVertexArray(buffers.vertexArrayObject);
                } else {
                  setAttributes(programInfo.attribSetters || programInfo, buffers.attribs);
                  if (buffers.indices) {
                    gl3.bindBuffer(gl3.ELEMENT_ARRAY_BUFFER, buffers.indices);
                  }
                }
              }
              function createProgramInfoFromProgram(gl3, program) {
                var uniformSetters = createUniformSetters(gl3, program);
                var attribSetters = createAttributeSetters(gl3, program);
                var programInfo = {
                  program,
                  uniformSetters,
                  attribSetters
                };
                if (utils.isWebGL2(gl3)) {
                  programInfo.uniformBlockSpec = createUniformBlockSpecFromProgram(gl3, program);
                  programInfo.transformFeedbackInfo = createTransformFeedbackInfo(gl3, program);
                }
                return programInfo;
              }
              function createProgramInfo(gl3, shaderSources, opt_attribs, opt_locations, opt_errorCallback) {
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
                var program = createProgramFromSources(gl3, shaderSources, progOptions);
                if (!program) {
                  return null;
                }
                return createProgramInfoFromProgram(gl3, program);
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
              var gl2 = void 0;
              var defaults = {
                attribPrefix: ""
              };
              function setAttributePrefix(prefix) {
                defaults.attribPrefix = prefix;
              }
              function setDefaults(newDefaults) {
                helper.copyExistingProperties(newDefaults, defaults);
              }
              function setBufferFromTypedArray(gl3, type, buffer, array, drawType) {
                gl3.bindBuffer(type, buffer);
                gl3.bufferData(type, array, drawType || gl3.STATIC_DRAW);
              }
              function createBufferFromTypedArray(gl3, typedArray, type, drawType) {
                if (helper.isBuffer(gl3, typedArray)) {
                  return typedArray;
                }
                type = type || gl3.ARRAY_BUFFER;
                var buffer = gl3.createBuffer();
                setBufferFromTypedArray(gl3, type, buffer, typedArray, drawType);
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
              function createAttribsFromArrays(gl3, arrays) {
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
                      buffer = gl3.createBuffer();
                      gl3.bindBuffer(gl3.ARRAY_BUFFER, buffer);
                      gl3.bufferData(gl3.ARRAY_BUFFER, numBytes, array.drawType || gl3.STATIC_DRAW);
                    } else {
                      var typedArray = makeTypedArray(array, arrayName);
                      buffer = createBufferFromTypedArray(gl3, typedArray, void 0, array.drawType);
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
                gl3.bindBuffer(gl3.ARRAY_BUFFER, null);
                return attribs;
              }
              function setAttribInfoBufferFromArray(gl3, attribInfo, array, offset) {
                array = makeTypedArray(array);
                if (offset !== void 0) {
                  gl3.bindBuffer(gl3.ARRAY_BUFFER, attribInfo.buffer);
                  gl3.bufferSubData(gl3.ARRAY_BUFFER, offset, array);
                } else {
                  setBufferFromTypedArray(gl3, gl3.ARRAY_BUFFER, attribInfo.buffer, array, attribInfo.drawType);
                }
              }
              function getBytesPerValueForGLType(gl3, type) {
                if (type === gl3.BYTE) return 1;
                if (type === gl3.UNSIGNED_BYTE) return 1;
                if (type === gl3.SHORT) return 2;
                if (type === gl3.UNSIGNED_SHORT) return 2;
                if (type === gl3.INT) return 4;
                if (type === gl3.UNSIGNED_INT) return 4;
                if (type === gl3.FLOAT) return 4;
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
              function getNumElementsFromAttributes(gl3, attribs) {
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
                gl3.bindBuffer(gl3.ARRAY_BUFFER, attrib.buffer);
                var numBytes = gl3.getBufferParameter(gl3.ARRAY_BUFFER, gl3.BUFFER_SIZE);
                gl3.bindBuffer(gl3.ARRAY_BUFFER, null);
                var bytesPerValue = getBytesPerValueForGLType(gl3, attrib.type);
                var totalElements = numBytes / bytesPerValue;
                var numComponents = attrib.numComponents || attrib.size;
                var numElements = totalElements / numComponents;
                if (numElements % 1 !== 0) {
                  throw "numComponents " + numComponents + " not correct for length " + length;
                }
                return numElements;
              }
              function createBufferInfoFromArrays(gl3, arrays) {
                var bufferInfo = {
                  attribs: createAttribsFromArrays(gl3, arrays)
                };
                var indices = arrays.indices;
                if (indices) {
                  var newIndices = makeTypedArray(indices, "indices");
                  bufferInfo.indices = createBufferFromTypedArray(gl3, newIndices, gl3.ELEMENT_ARRAY_BUFFER);
                  bufferInfo.numElements = newIndices.length;
                  bufferInfo.elementType = typedArrays.getGLTypeForTypedArray(newIndices);
                } else {
                  bufferInfo.numElements = getNumElementsFromAttributes(gl3, bufferInfo.attribs);
                }
                return bufferInfo;
              }
              function createBufferFromArray(gl3, array, arrayName) {
                var type = arrayName === "indices" ? gl3.ELEMENT_ARRAY_BUFFER : gl3.ARRAY_BUFFER;
                var typedArray = makeTypedArray(array, arrayName);
                return createBufferFromTypedArray(gl3, typedArray, type);
              }
              function createBuffersFromArrays(gl3, arrays) {
                var buffers = {};
                Object.keys(arrays).forEach(function(key) {
                  buffers[key] = createBufferFromArray(gl3, arrays[key], key);
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
              var gl2 = void 0;
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
              function canGenerateMipmap(gl3, width, height, internalFormat) {
                if (!utils.isWebGL2(gl3)) {
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
              function getTextureTypeForArrayType(gl3, src, defaultType) {
                if (isArrayBuffer(src)) {
                  return typedArrays.getGLTypeForTypedArray(src);
                }
                return defaultType || gl3.UNSIGNED_BYTE;
              }
              function guessDimensions(gl3, target, width, height, numElements) {
                if (numElements % 1 !== 0) {
                  throw "can't guess dimensions";
                }
                if (!width && !height) {
                  var size = Math.sqrt(numElements / (target === gl3.TEXTURE_CUBE_MAP ? 6 : 1));
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
              function savePackState(gl3, options) {
                if (options.colorspaceConversion !== void 0) {
                  lastPackState.colorspaceConversion = gl3.getParameter(gl3.UNPACK_COLORSPACE_CONVERSION_WEBGL);
                  gl3.pixelStorei(gl3.UNPACK_COLORSPACE_CONVERSION_WEBGL, options.colorspaceConversion);
                }
                if (options.premultiplyAlpha !== void 0) {
                  lastPackState.premultiplyAlpha = gl3.getParameter(gl3.UNPACK_PREMULTIPLY_ALPHA_WEBGL);
                  gl3.pixelStorei(gl3.UNPACK_PREMULTIPLY_ALPHA_WEBGL, options.premultiplyAlpha);
                }
                if (options.flipY !== void 0) {
                  lastPackState.flipY = gl3.getParameter(gl3.UNPACK_FLIP_Y_WEBGL);
                  gl3.pixelStorei(gl3.UNPACK_FLIP_Y_WEBGL, options.flipY);
                }
              }
              function restorePackState(gl3, options) {
                if (options.colorspaceConversion !== void 0) {
                  gl3.pixelStorei(gl3.UNPACK_COLORSPACE_CONVERSION_WEBGL, lastPackState.colorspaceConversion);
                }
                if (options.premultiplyAlpha !== void 0) {
                  gl3.pixelStorei(gl3.UNPACK_PREMULTIPLY_ALPHA_WEBGL, lastPackState.premultiplyAlpha);
                }
                if (options.flipY !== void 0) {
                  gl3.pixelStorei(gl3.UNPACK_FLIP_Y_WEBGL, lastPackState.flipY);
                }
              }
              function saveSkipState(gl3) {
                lastPackState.unpackAlignment = gl3.getParameter(gl3.UNPACK_ALIGNMENT);
                if (utils.isWebGL2(gl3)) {
                  lastPackState.unpackRowLength = gl3.getParameter(gl3.UNPACK_ROW_LENGTH);
                  lastPackState.unpackImageHeight = gl3.getParameter(gl3.UNPACK_IMAGE_HEIGHT);
                  lastPackState.unpackSkipPixels = gl3.getParameter(gl3.UNPACK_SKIP_PIXELS);
                  lastPackState.unpackSkipRows = gl3.getParameter(gl3.UNPACK_SKIP_ROWS);
                  lastPackState.unpackSkipImages = gl3.getParameter(gl3.UNPACK_SKIP_IMAGES);
                }
              }
              function restoreSkipState(gl3) {
                gl3.pixelStorei(gl3.UNPACK_ALIGNMENT, lastPackState.unpackAlignment);
                if (utils.isWebGL2(gl3)) {
                  gl3.pixelStorei(gl3.UNPACK_ROW_LENGTH, lastPackState.unpackRowLength);
                  gl3.pixelStorei(gl3.UNPACK_IMAGE_HEIGHT, lastPackState.unpackImageHeight);
                  gl3.pixelStorei(gl3.UNPACK_SKIP_PIXELS, lastPackState.unpackSkipPixels);
                  gl3.pixelStorei(gl3.UNPACK_SKIP_ROWS, lastPackState.unpackSkipRows);
                  gl3.pixelStorei(gl3.UNPACK_SKIP_IMAGES, lastPackState.unpackSkipImages);
                }
              }
              function setTextureSamplerParameters(gl3, target, parameteriFn, options) {
                if (options.minMag) {
                  parameteriFn.call(gl3, target, gl3.TEXTURE_MIN_FILTER, options.minMag);
                  parameteriFn.call(gl3, target, gl3.TEXTURE_MAG_FILTER, options.minMag);
                }
                if (options.min) {
                  parameteriFn.call(gl3, target, gl3.TEXTURE_MIN_FILTER, options.min);
                }
                if (options.mag) {
                  parameteriFn.call(gl3, target, gl3.TEXTURE_MAG_FILTER, options.mag);
                }
                if (options.wrap) {
                  parameteriFn.call(gl3, target, gl3.TEXTURE_WRAP_S, options.wrap);
                  parameteriFn.call(gl3, target, gl3.TEXTURE_WRAP_T, options.wrap);
                  if (target === gl3.TEXTURE_3D || helper.isSampler(gl3, target)) {
                    parameteriFn.call(gl3, target, gl3.TEXTURE_WRAP_R, options.wrap);
                  }
                }
                if (options.wrapR) {
                  parameteriFn.call(gl3, target, gl3.TEXTURE_WRAP_R, options.wrapR);
                }
                if (options.wrapS) {
                  parameteriFn.call(gl3, target, gl3.TEXTURE_WRAP_S, options.wrapS);
                }
                if (options.wrapT) {
                  parameteriFn.call(gl3, target, gl3.TEXTURE_WRAP_T, options.wrapT);
                }
                if (options.minLod) {
                  parameteriFn.call(gl3, target, gl3.TEXTURE_MIN_LOD, options.minLod);
                }
                if (options.maxLod) {
                  parameteriFn.call(gl3, target, gl3.TEXTURE_MAX_LOD, options.maxLod);
                }
                if (options.baseLevel) {
                  parameteriFn.call(gl3, target, gl3.TEXTURE_BASE_LEVEL, options.baseLevel);
                }
                if (options.maxLevel) {
                  parameteriFn.call(gl3, target, gl3.TEXTURE_MAX_LEVEL, options.maxLevel);
                }
              }
              function setTextureParameters(gl3, tex, options) {
                var target = options.target || gl3.TEXTURE_2D;
                gl3.bindTexture(target, tex);
                setTextureSamplerParameters(gl3, target, gl3.texParameteri, options);
              }
              function setSamplerParameters(gl3, sampler, options) {
                setTextureSamplerParameters(gl3, sampler, gl3.samplerParameteri, options);
              }
              function createSampler(gl3, options) {
                var sampler = gl3.createSampler();
                setSamplerParameters(gl3, sampler, options);
                return sampler;
              }
              function createSamplers(gl3, samplerOptions) {
                var samplers = {};
                Object.keys(samplerOptions).forEach(function(name) {
                  samplers[name] = createSampler(gl3, samplerOptions[name]);
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
              function setTextureFilteringForSize(gl3, tex, options, width, height, internalFormat, type) {
                options = options || defaults.textureOptions;
                internalFormat = internalFormat || gl3.RGBA;
                type = type || gl3.UNSIGNED_BYTE;
                var target = options.target || gl3.TEXTURE_2D;
                width = width || options.width;
                height = height || options.height;
                gl3.bindTexture(target, tex);
                if (canGenerateMipmap(gl3, width, height, internalFormat, type)) {
                  gl3.generateMipmap(target);
                } else {
                  var filtering = canFilter(internalFormat, type) ? gl3.LINEAR : gl3.NEAREST;
                  gl3.texParameteri(target, gl3.TEXTURE_MIN_FILTER, filtering);
                  gl3.texParameteri(target, gl3.TEXTURE_MAG_FILTER, filtering);
                  gl3.texParameteri(target, gl3.TEXTURE_WRAP_S, gl3.CLAMP_TO_EDGE);
                  gl3.texParameteri(target, gl3.TEXTURE_WRAP_T, gl3.CLAMP_TO_EDGE);
                }
              }
              function shouldAutomaticallySetTextureFilteringForSize(options) {
                return options.auto === true || options.auto === void 0 && options.level === void 0;
              }
              function getCubeFaceOrder(gl3, options) {
                options = options || {};
                return options.cubeFaceOrder || [gl3.TEXTURE_CUBE_MAP_POSITIVE_X, gl3.TEXTURE_CUBE_MAP_NEGATIVE_X, gl3.TEXTURE_CUBE_MAP_POSITIVE_Y, gl3.TEXTURE_CUBE_MAP_NEGATIVE_Y, gl3.TEXTURE_CUBE_MAP_POSITIVE_Z, gl3.TEXTURE_CUBE_MAP_NEGATIVE_Z];
              }
              function getCubeFacesWithNdx(gl3, options) {
                var faces = getCubeFaceOrder(gl3, options);
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
              function setTextureFromElement(gl3, tex, element, options) {
                options = options || defaults.textureOptions;
                var target = options.target || gl3.TEXTURE_2D;
                var level = options.level || 0;
                var width = element.width;
                var height = element.height;
                var internalFormat = options.internalFormat || options.format || gl3.RGBA;
                var formatType = getFormatAndTypeForInternalFormat(internalFormat);
                var format = options.format || formatType.format;
                var type = options.type || formatType.type;
                savePackState(gl3, options);
                gl3.bindTexture(target, tex);
                if (target === gl3.TEXTURE_CUBE_MAP) {
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
                    getCubeFacesWithNdx(gl3, options).forEach(function(f2) {
                      var xOffset = slices[f2.ndx * 2 + 0] * size;
                      var yOffset = slices[f2.ndx * 2 + 1] * size;
                      ctx.drawImage(element, xOffset, yOffset, size, size, 0, 0, size, size);
                      gl3.texImage2D(f2.face, level, internalFormat, format, type, ctx.canvas);
                    });
                    ctx.canvas.width = 1;
                    ctx.canvas.height = 1;
                  } else if (_globalObject.default.createImageBitmap) {
                    width = size;
                    height = size;
                    getCubeFacesWithNdx(gl3, options).forEach(function(f2) {
                      var xOffset = slices[f2.ndx * 2 + 0] * size;
                      var yOffset = slices[f2.ndx * 2 + 1] * size;
                      gl3.texImage2D(f2.face, level, internalFormat, size, size, 0, format, type, null);
                      _globalObject.default.createImageBitmap(element, xOffset, yOffset, size, size, {
                        premultiplyAlpha: "none",
                        colorSpaceConversion: "none"
                      }).then(function(imageBitmap) {
                        savePackState(gl3, options);
                        gl3.bindTexture(target, tex);
                        gl3.texImage2D(f2.face, level, internalFormat, format, type, imageBitmap);
                        restorePackState(gl3, options);
                        if (shouldAutomaticallySetTextureFilteringForSize(options)) {
                          setTextureFilteringForSize(gl3, tex, options, width, height, internalFormat, type);
                        }
                      });
                    });
                  }
                } else if (target === gl3.TEXTURE_3D || target === gl3.TEXTURE_2D_ARRAY) {
                  var smallest = Math.min(element.width, element.height);
                  var largest = Math.max(element.width, element.height);
                  var depth = largest / smallest;
                  if (depth % 1 !== 0) {
                    throw "can not compute 3D dimensions of element";
                  }
                  var xMult = element.width === largest ? 1 : 0;
                  var yMult = element.height === largest ? 1 : 0;
                  saveSkipState(gl3);
                  gl3.pixelStorei(gl3.UNPACK_ALIGNMENT, 1);
                  gl3.pixelStorei(gl3.UNPACK_ROW_LENGTH, element.width);
                  gl3.pixelStorei(gl3.UNPACK_IMAGE_HEIGHT, 0);
                  gl3.pixelStorei(gl3.UNPACK_SKIP_IMAGES, 0);
                  gl3.texImage3D(target, level, internalFormat, smallest, smallest, smallest, 0, format, type, null);
                  for (var d = 0; d < depth; ++d) {
                    var srcX = d * smallest * xMult;
                    var srcY = d * smallest * yMult;
                    gl3.pixelStorei(gl3.UNPACK_SKIP_PIXELS, srcX);
                    gl3.pixelStorei(gl3.UNPACK_SKIP_ROWS, srcY);
                    gl3.texSubImage3D(target, level, 0, 0, d, smallest, smallest, 1, format, type, element);
                  }
                  restoreSkipState(gl3);
                } else {
                  gl3.texImage2D(target, level, internalFormat, format, type, element);
                }
                restorePackState(gl3, options);
                if (shouldAutomaticallySetTextureFilteringForSize(options)) {
                  setTextureFilteringForSize(gl3, tex, options, width, height, internalFormat, type);
                }
                setTextureParameters(gl3, tex, options);
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
              function setTextureTo1PixelColor(gl3, tex, options) {
                options = options || defaults.textureOptions;
                var target = options.target || gl3.TEXTURE_2D;
                gl3.bindTexture(target, tex);
                if (options.color === false) {
                  return;
                }
                var color = make1Pixel(options.color);
                if (target === gl3.TEXTURE_CUBE_MAP) {
                  for (var ii2 = 0; ii2 < 6; ++ii2) {
                    gl3.texImage2D(gl3.TEXTURE_CUBE_MAP_POSITIVE_X + ii2, 0, gl3.RGBA, 1, 1, 0, gl3.RGBA, gl3.UNSIGNED_BYTE, color);
                  }
                } else if (target === gl3.TEXTURE_3D || target === gl3.TEXTURE_2D_ARRAY) {
                  gl3.texImage3D(target, 0, gl3.RGBA, 1, 1, 1, 0, gl3.RGBA, gl3.UNSIGNED_BYTE, color);
                } else {
                  gl3.texImage2D(target, 0, gl3.RGBA, 1, 1, 0, gl3.RGBA, gl3.UNSIGNED_BYTE, color);
                }
              }
              function loadTextureFromUrl(gl3, tex, options, callback) {
                callback = callback || noop;
                options = options || defaults.textureOptions;
                setTextureTo1PixelColor(gl3, tex, options);
                options = Object.assign({}, options);
                var img = loadAndUseImage(options.src, options.crossOrigin, function(err, img2) {
                  if (err) {
                    callback(err, tex, img2);
                  } else {
                    setTextureFromElement(gl3, tex, img2, options);
                    callback(null, tex, img2);
                  }
                });
                return img;
              }
              function loadCubemapFromUrls(gl3, tex, options, callback) {
                callback = callback || noop;
                var urls = options.src;
                if (urls.length !== 6) {
                  throw "there must be 6 urls for a cubemap";
                }
                var level = options.level || 0;
                var internalFormat = options.internalFormat || options.format || gl3.RGBA;
                var formatType = getFormatAndTypeForInternalFormat(internalFormat);
                var format = options.format || formatType.format;
                var type = options.type || gl3.UNSIGNED_BYTE;
                var target = options.target || gl3.TEXTURE_2D;
                if (target !== gl3.TEXTURE_CUBE_MAP) {
                  throw "target must be TEXTURE_CUBE_MAP";
                }
                setTextureTo1PixelColor(gl3, tex, options);
                options = Object.assign({}, options);
                var numToLoad = 6;
                var errors = [];
                var faces = getCubeFaceOrder(gl3, options);
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
                        savePackState(gl3, options);
                        gl3.bindTexture(target, tex);
                        if (numToLoad === 5) {
                          getCubeFaceOrder(gl3).forEach(function(otherTarget) {
                            gl3.texImage2D(otherTarget, level, internalFormat, format, type, img);
                          });
                        } else {
                          gl3.texImage2D(faceTarget, level, internalFormat, format, type, img);
                        }
                        restorePackState(gl3, options);
                        if (shouldAutomaticallySetTextureFilteringForSize(options)) {
                          gl3.generateMipmap(target);
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
              function loadSlicesFromUrls(gl3, tex, options, callback) {
                callback = callback || noop;
                var urls = options.src;
                var internalFormat = options.internalFormat || options.format || gl3.RGBA;
                var formatType = getFormatAndTypeForInternalFormat(internalFormat);
                var format = options.format || formatType.format;
                var type = options.type || gl3.UNSIGNED_BYTE;
                var target = options.target || gl3.TEXTURE_2D_ARRAY;
                if (target !== gl3.TEXTURE_3D && target !== gl3.TEXTURE_2D_ARRAY) {
                  throw "target must be TEXTURE_3D or TEXTURE_2D_ARRAY";
                }
                setTextureTo1PixelColor(gl3, tex, options);
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
                      savePackState(gl3, options);
                      gl3.bindTexture(target, tex);
                      if (firstImage) {
                        firstImage = false;
                        width = options.width || img.width;
                        height = options.height || img.height;
                        gl3.texImage3D(target, level, internalFormat, width, height, depth, 0, format, type, null);
                        for (var s = 0; s < depth; ++s) {
                          gl3.texSubImage3D(target, level, 0, 0, s, width, height, 1, format, type, img);
                        }
                      } else {
                        var src = img;
                        if (img.width !== width || img.height !== height) {
                          src = ctx.canvas;
                          ctx.canvas.width = width;
                          ctx.canvas.height = height;
                          ctx.drawImage(img, 0, 0, width, height);
                        }
                        gl3.texSubImage3D(target, level, 0, 0, slice, width, height, 1, format, type, src);
                        if (src === ctx.canvas) {
                          ctx.canvas.width = 0;
                          ctx.canvas.height = 0;
                        }
                      }
                      restorePackState(gl3, options);
                      if (shouldAutomaticallySetTextureFilteringForSize(options)) {
                        gl3.generateMipmap(target);
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
              function setTextureFromArray(gl3, tex, src, options) {
                options = options || defaults.textureOptions;
                var target = options.target || gl3.TEXTURE_2D;
                gl3.bindTexture(target, tex);
                var width = options.width;
                var height = options.height;
                var depth = options.depth;
                var level = options.level || 0;
                var internalFormat = options.internalFormat || options.format || gl3.RGBA;
                var formatType = getFormatAndTypeForInternalFormat(internalFormat);
                var format = options.format || formatType.format;
                var type = options.type || getTextureTypeForArrayType(gl3, src, formatType.type);
                if (!isArrayBuffer(src)) {
                  var Type = typedArrays.getTypedArrayTypeForGLType(type);
                  src = new Type(src);
                } else if (src instanceof Uint8ClampedArray) {
                  src = new Uint8Array(src.buffer);
                }
                var bytesPerElement = getBytesPerElementForInternalFormat(internalFormat, type);
                var numElements = src.byteLength / bytesPerElement;
                if (numElements % 1) {
                  throw "length wrong size for format: " + utils.glEnumToString(gl3, format);
                }
                var dimensions;
                if (target === gl3.TEXTURE_3D) {
                  if (!width && !height && !depth) {
                    var size = Math.cbrt(numElements);
                    if (size % 1 !== 0) {
                      throw "can't guess cube size of array of numElements: " + numElements;
                    }
                    width = size;
                    height = size;
                    depth = size;
                  } else if (width && (!height || !depth)) {
                    dimensions = guessDimensions(gl3, target, height, depth, numElements / width);
                    height = dimensions.width;
                    depth = dimensions.height;
                  } else if (height && (!width || !depth)) {
                    dimensions = guessDimensions(gl3, target, width, depth, numElements / height);
                    width = dimensions.width;
                    depth = dimensions.height;
                  } else {
                    dimensions = guessDimensions(gl3, target, width, height, numElements / depth);
                    width = dimensions.width;
                    height = dimensions.height;
                  }
                } else {
                  dimensions = guessDimensions(gl3, target, width, height, numElements);
                  width = dimensions.width;
                  height = dimensions.height;
                }
                saveSkipState(gl3);
                gl3.pixelStorei(gl3.UNPACK_ALIGNMENT, options.unpackAlignment || 1);
                savePackState(gl3, options);
                if (target === gl3.TEXTURE_CUBE_MAP) {
                  var elementsPerElement = bytesPerElement / src.BYTES_PER_ELEMENT;
                  var faceSize = numElements / 6 * elementsPerElement;
                  getCubeFacesWithNdx(gl3, options).forEach(function(f2) {
                    var offset = faceSize * f2.ndx;
                    var data = src.subarray(offset, offset + faceSize);
                    gl3.texImage2D(f2.face, level, internalFormat, width, height, 0, format, type, data);
                  });
                } else if (target === gl3.TEXTURE_3D) {
                  gl3.texImage3D(target, level, internalFormat, width, height, depth, 0, format, type, src);
                } else {
                  gl3.texImage2D(target, level, internalFormat, width, height, 0, format, type, src);
                }
                restorePackState(gl3, options);
                restoreSkipState(gl3);
                return {
                  width,
                  height,
                  depth,
                  type
                };
              }
              function setEmptyTexture(gl3, tex, options) {
                var target = options.target || gl3.TEXTURE_2D;
                gl3.bindTexture(target, tex);
                var level = options.level || 0;
                var internalFormat = options.internalFormat || options.format || gl3.RGBA;
                var formatType = getFormatAndTypeForInternalFormat(internalFormat);
                var format = options.format || formatType.format;
                var type = options.type || formatType.type;
                savePackState(gl3, options);
                if (target === gl3.TEXTURE_CUBE_MAP) {
                  for (var ii2 = 0; ii2 < 6; ++ii2) {
                    gl3.texImage2D(gl3.TEXTURE_CUBE_MAP_POSITIVE_X + ii2, level, internalFormat, options.width, options.height, 0, format, type, null);
                  }
                } else if (target === gl3.TEXTURE_3D) {
                  gl3.texImage3D(target, level, internalFormat, options.width, options.height, options.depth, 0, format, type, null);
                } else {
                  gl3.texImage2D(target, level, internalFormat, options.width, options.height, 0, format, type, null);
                }
                restorePackState(gl3, options);
              }
              function createTexture(gl3, options, callback) {
                callback = callback || noop;
                options = options || defaults.textureOptions;
                var tex = gl3.createTexture();
                var target = options.target || gl3.TEXTURE_2D;
                var width = options.width || 1;
                var height = options.height || 1;
                var internalFormat = options.internalFormat || gl3.RGBA;
                var formatType = getFormatAndTypeForInternalFormat(internalFormat);
                var type = options.type || formatType.type;
                gl3.bindTexture(target, tex);
                if (target === gl3.TEXTURE_CUBE_MAP) {
                  gl3.texParameteri(target, gl3.TEXTURE_WRAP_S, gl3.CLAMP_TO_EDGE);
                  gl3.texParameteri(target, gl3.TEXTURE_WRAP_T, gl3.CLAMP_TO_EDGE);
                }
                var src = options.src;
                if (src) {
                  if (typeof src === "function") {
                    src = src(gl3, options);
                  }
                  if (typeof src === "string") {
                    loadTextureFromUrl(gl3, tex, options, callback);
                  } else if (isArrayBuffer(src) || Array.isArray(src) && (typeof src[0] === "number" || Array.isArray(src[0]) || isArrayBuffer(src[0]))) {
                    var dimensions = setTextureFromArray(gl3, tex, src, options);
                    width = dimensions.width;
                    height = dimensions.height;
                    type = dimensions.type;
                  } else if (Array.isArray(src) && (typeof src[0] === "string" || isTexImageSource(src[0]))) {
                    if (target === gl3.TEXTURE_CUBE_MAP) {
                      loadCubemapFromUrls(gl3, tex, options, callback);
                    } else {
                      loadSlicesFromUrls(gl3, tex, options, callback);
                    }
                  } else if (isTexImageSource(src)) {
                    setTextureFromElement(gl3, tex, src, options);
                    width = src.width;
                    height = src.height;
                  } else {
                    throw "unsupported src type";
                  }
                } else {
                  setEmptyTexture(gl3, tex, options);
                }
                if (shouldAutomaticallySetTextureFilteringForSize(options)) {
                  setTextureFilteringForSize(gl3, tex, options, width, height, internalFormat, type);
                }
                setTextureParameters(gl3, tex, options);
                return tex;
              }
              function resizeTexture(gl3, tex, options, width, height) {
                width = width || options.width;
                height = height || options.height;
                var target = options.target || gl3.TEXTURE_2D;
                gl3.bindTexture(target, tex);
                var level = options.level || 0;
                var internalFormat = options.internalFormat || options.format || gl3.RGBA;
                var formatType = getFormatAndTypeForInternalFormat(internalFormat);
                var format = options.format || formatType.format;
                var type;
                var src = options.src;
                if (!src) {
                  type = options.type || formatType.type;
                } else if (isArrayBuffer(src) || Array.isArray(src) && typeof src[0] === "number") {
                  type = options.type || getTextureTypeForArrayType(gl3, src, formatType.type);
                } else {
                  type = options.type || formatType.type;
                }
                if (target === gl3.TEXTURE_CUBE_MAP) {
                  for (var ii2 = 0; ii2 < 6; ++ii2) {
                    gl3.texImage2D(gl3.TEXTURE_CUBE_MAP_POSITIVE_X + ii2, level, internalFormat, width, height, 0, format, type, null);
                  }
                } else {
                  gl3.texImage2D(target, level, internalFormat, width, height, 0, format, type, null);
                }
              }
              function isAsyncSrc(src) {
                return typeof src === "string" || Array.isArray(src) && typeof src[0] === "string";
              }
              function createTextures(gl3, textureOptions, callback) {
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
                  textures[name] = createTexture(gl3, options, onLoadFn);
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
                return function(gl2) {
                  var arrays = fn.apply(this, Array.prototype.slice.call(arguments, 1));
                  return attributes.createBuffersFromArrays(gl2, arrays);
                };
              }
              function createBufferInfoFunc(fn) {
                return function(gl2) {
                  var arrays = fn.apply(null, Array.prototype.slice.call(arguments, 1));
                  return attributes.createBufferInfoFromArrays(gl2, arrays);
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
              var gl2 = void 0;
              var defaults = {
                addExtensionsToContext: true
              };
              function setDefaults(newDefaults) {
                helper.copyExistingProperties(newDefaults, defaults);
                attributes.setAttributeDefaults_(newDefaults);
                textures.setTextureDefaults_(newDefaults);
              }
              var prefixRE = /^(.*?)_/;
              function addExtensionToContext(gl3, extensionName) {
                utils.glEnumToString(gl3, 0);
                var ext = gl3.getExtension(extensionName);
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
                    if (gl3[name] !== void 0) {
                      if (!isFunc && gl3[name] !== value) {
                        helper.warn(name, gl3[name], value, key);
                      }
                    } else {
                      if (isFunc) {
                        gl3[name] =  (function(origFn) {
                          return function() {
                            return origFn.apply(ext, arguments);
                          };
                        })(value);
                      } else {
                        gl3[name] = value;
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
              function addExtensionsToContext(gl3) {
                for (var ii2 = 0; ii2 < supportedExtensions.length; ++ii2) {
                  addExtensionToContext(gl3, supportedExtensions[ii2]);
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
                var gl3 = create3DContext(canvas, opt_attribs);
                return gl3;
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
                var gl3 = createContext(canvas, opt_attribs);
                return gl3;
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
              function drawBufferInfo(gl2, bufferInfo, type, count, offset, instanceCount) {
                type = type === void 0 ? gl2.TRIANGLES : type;
                var indices = bufferInfo.indices;
                var elementType = bufferInfo.elementType;
                var numElements = count === void 0 ? bufferInfo.numElements : count;
                offset = offset === void 0 ? 0 : offset;
                if (elementType || indices) {
                  if (instanceCount !== void 0) {
                    gl2.drawElementsInstanced(type, numElements, elementType === void 0 ? gl2.UNSIGNED_SHORT : bufferInfo.elementType, offset, instanceCount);
                  } else {
                    gl2.drawElements(type, numElements, elementType === void 0 ? gl2.UNSIGNED_SHORT : bufferInfo.elementType, offset);
                  }
                } else {
                  if (instanceCount !== void 0) {
                    gl2.drawArraysInstanced(type, offset, numElements, instanceCount);
                  } else {
                    gl2.drawArrays(type, offset, numElements);
                  }
                }
              }
              function drawObjectList(gl2, objectsToDraw) {
                var lastUsedProgramInfo = null;
                var lastUsedBufferInfo = null;
                objectsToDraw.forEach(function(object) {
                  if (object.active === false) {
                    return;
                  }
                  var programInfo = object.programInfo;
                  var bufferInfo = object.vertexArrayInfo || object.bufferInfo;
                  var bindBuffers = false;
                  var type = object.type === void 0 ? gl2.TRIANGLES : object.type;
                  if (programInfo !== lastUsedProgramInfo) {
                    lastUsedProgramInfo = programInfo;
                    gl2.useProgram(programInfo.program);
                    bindBuffers = true;
                  }
                  if (bindBuffers || bufferInfo !== lastUsedBufferInfo) {
                    if (lastUsedBufferInfo && lastUsedBufferInfo.vertexArrayObject && !bufferInfo.vertexArrayObject) {
                      gl2.bindVertexArray(null);
                    }
                    lastUsedBufferInfo = bufferInfo;
                    programs.setBuffersAndAttributes(gl2, programInfo, bufferInfo);
                  }
                  programs.setUniforms(programInfo, object.uniforms);
                  drawBufferInfo(gl2, bufferInfo, type, object.count, object.offset, object.instanceCount);
                });
                if (lastUsedBufferInfo.vertexArrayObject) {
                  gl2.bindVertexArray(null);
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
              var gl2 = void 0;
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
              function createFramebufferInfo(gl3, attachments, width, height) {
                var target = gl3.FRAMEBUFFER;
                var fb = gl3.createFramebuffer();
                gl3.bindFramebuffer(target, fb);
                width = width || gl3.drawingBufferWidth;
                height = height || gl3.drawingBufferHeight;
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
                      attachment = gl3.createRenderbuffer();
                      gl3.bindRenderbuffer(gl3.RENDERBUFFER, attachment);
                      gl3.renderbufferStorage(gl3.RENDERBUFFER, format, width, height);
                    } else {
                      var textureOptions = Object.assign({}, attachmentOptions);
                      textureOptions.width = width;
                      textureOptions.height = height;
                      if (textureOptions.auto === void 0) {
                        textureOptions.auto = false;
                        textureOptions.min = textureOptions.min || textureOptions.minMag || gl3.LINEAR;
                        textureOptions.mag = textureOptions.mag || textureOptions.minMag || gl3.LINEAR;
                        textureOptions.wrapS = textureOptions.wrapS || textureOptions.wrap || gl3.CLAMP_TO_EDGE;
                        textureOptions.wrapT = textureOptions.wrapT || textureOptions.wrap || gl3.CLAMP_TO_EDGE;
                      }
                      attachment = textures.createTexture(gl3, textureOptions);
                    }
                  }
                  if (helper.isRenderbuffer(gl3, attachment)) {
                    gl3.framebufferRenderbuffer(target, attachmentPoint, gl3.RENDERBUFFER, attachment);
                  } else if (helper.isTexture(gl3, attachment)) {
                    gl3.framebufferTexture2D(target, attachmentPoint, attachmentOptions.texTarget || gl3.TEXTURE_2D, attachment, attachmentOptions.level || 0);
                  } else {
                    throw "unknown attachment type";
                  }
                  framebufferInfo.attachments.push(attachment);
                });
                return framebufferInfo;
              }
              function resizeFramebufferInfo(gl3, framebufferInfo, attachments, width, height) {
                width = width || gl3.drawingBufferWidth;
                height = height || gl3.drawingBufferHeight;
                framebufferInfo.width = width;
                framebufferInfo.height = height;
                attachments = attachments || defaultAttachments;
                attachments.forEach(function(attachmentOptions, ndx) {
                  var attachment = framebufferInfo.attachments[ndx];
                  var format = attachmentOptions.format;
                  if (helper.isRenderbuffer(gl3, attachment)) {
                    gl3.bindRenderbuffer(gl3.RENDERBUFFER, attachment);
                    gl3.renderbufferStorage(gl3.RENDERBUFFER, format, width, height);
                  } else if (helper.isTexture(gl3, attachment)) {
                    textures.resizeTexture(gl3, attachment, attachmentOptions, width, height);
                  } else {
                    throw "unknown attachment type";
                  }
                });
              }
              function bindFramebufferInfo(gl3, framebufferInfo, target) {
                target = target || gl3.FRAMEBUFFER;
                if (framebufferInfo) {
                  gl3.bindFramebuffer(target, framebufferInfo.framebuffer);
                  gl3.viewport(0, 0, framebufferInfo.width, framebufferInfo.height);
                } else {
                  gl3.bindFramebuffer(target, null);
                  gl3.viewport(0, 0, gl3.drawingBufferWidth, gl3.drawingBufferHeight);
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
              function createVertexArrayInfo(gl2, programInfos, bufferInfo) {
                var vao = gl2.createVertexArray();
                gl2.bindVertexArray(vao);
                if (!programInfos.length) {
                  programInfos = [programInfos];
                }
                programInfos.forEach(function(programInfo) {
                  programs.setBuffersAndAttributes(gl2, programInfo, bufferInfo);
                });
                gl2.bindVertexArray(null);
                return {
                  numElements: bufferInfo.numElements,
                  elementType: bufferInfo.elementType,
                  vertexArrayObject: vao
                };
              }
              function createVAOAndSetAttributes(gl2, setters, attribs, indices) {
                var vao = gl2.createVertexArray();
                gl2.bindVertexArray(vao);
                programs.setAttributes(setters, attribs);
                if (indices) {
                  gl2.bindBuffer(gl2.ELEMENT_ARRAY_BUFFER, indices);
                }
                gl2.bindVertexArray(null);
                return vao;
              }
              function createVAOFromBufferInfo(gl2, programInfo, bufferInfo) {
                return createVAOAndSetAttributes(gl2, programInfo.attribSetters || programInfo, bufferInfo.attribs, bufferInfo.indices);
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
      var twgl2 = require_twgl_full();
      var RenderConstants = require_RenderConstants();
      var Silhouette = require_Silhouette();
      var Skin = class {
        constructor(id, renderer) {
          this._renderer = renderer;
          this._id = id;
          this._rotationCenter = twgl2.v3.create(0, 0);
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
          const gl2 = this._renderer.gl;
          gl2.bindTexture(gl2.TEXTURE_2D, this._texture);
          gl2.pixelStorei(gl2.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
          gl2.texImage2D(gl2.TEXTURE_2D, 0, gl2.RGBA, gl2.RGBA, gl2.UNSIGNED_BYTE, textureData);
          gl2.pixelStorei(gl2.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
          this._silhouette.update(textureData);
        }
        setEmptyImageData() {
          this._texture = null;
          if (!this._emptyImageData) {
            this._emptyImageData = new ImageData(1, 1);
            const gl2 = this._renderer.gl;
            const textureOptions = {
              auto: true,
              wrap: gl2.CLAMP_TO_EDGE,
              src: this._emptyImageData
            };
            this._emptyImageTexture = twgl2.createTexture(gl2, textureOptions);
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

  var require_purify_cjs = __commonJS({
    "node_modules/dompurify/dist/purify.cjs.js"(exports, module) {
      "use strict";
      function _OverloadYield(e, d) {
        this.v = e, this.k = d;
      }
      function _arrayLikeToArray(r, a) {
        (null == a || a > r.length) && (a = r.length);
        for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
        return n;
      }
      function _arrayWithHoles(r) {
        if (Array.isArray(r)) return r;
      }
      function _iterableToArrayLimit(r, l) {
        var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
        if (null != t) {
          var e, n, i, u, a = [], f = true, o = false;
          try {
            if (i = (t = t.call(r)).next, 0 === l) {
              if (Object(t) !== t) return;
              f = false;
            } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true) ;
          } catch (r2) {
            o = true, n = r2;
          } finally {
            try {
              if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
            } finally {
              if (o) throw n;
            }
          }
          return a;
        }
      }
      function _nonIterableRest() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      function _slicedToArray(r, e) {
        return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
      }
      function _unsupportedIterableToArray(r, a) {
        if (r) {
          if ("string" == typeof r) return _arrayLikeToArray(r, a);
          var t = {}.toString.call(r).slice(8, -1);
          return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
        }
      }
      function AsyncGenerator(e) {
        var t, n;
        function resume(t2, n2) {
          try {
            var r = e[t2](n2), o = r.value, u = o instanceof _OverloadYield;
            Promise.resolve(u ? o.v : o).then(function(n3) {
              if (u) {
                var i = "return" === t2 && o.k ? t2 : "next";
                if (!o.k || n3.done) return resume(i, n3);
                n3 = e[i](n3).value;
              }
              settle(!!r.done, n3);
            }, function(e2) {
              resume("throw", e2);
            });
          } catch (e2) {
            settle(2, e2);
          }
        }
        function settle(e2, r) {
          2 === e2 ? t.reject(r) : t.resolve({
            value: r,
            done: e2
          }), (t = t.next) ? resume(t.key, t.arg) : n = null;
        }
        this._invoke = function(e2, r) {
          return new Promise(function(o, u) {
            var i = {
              key: e2,
              arg: r,
              resolve: o,
              reject: u,
              next: null
            };
            n ? n = n.next = i : (t = n = i, resume(e2, r));
          });
        }, "function" != typeof e.return && (this.return = void 0);
      }
      AsyncGenerator.prototype["function" == typeof Symbol && Symbol.asyncIterator || "@@asyncIterator"] = function() {
        return this;
      }, AsyncGenerator.prototype.next = function(e) {
        return this._invoke("next", e);
      }, AsyncGenerator.prototype.throw = function(e) {
        return this._invoke("throw", e);
      }, AsyncGenerator.prototype.return = function(e) {
        return this._invoke("return", e);
      };
      var entries = Object.entries;
      var setPrototypeOf = Object.setPrototypeOf;
      var isFrozen = Object.isFrozen;
      var getPrototypeOf = Object.getPrototypeOf;
      var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
      var freeze = Object.freeze;
      var seal = Object.seal;
      var create = Object.create;
      var _ref = typeof Reflect !== "undefined" && Reflect;
      var apply = _ref.apply;
      var construct = _ref.construct;
      if (!freeze) freeze = function freeze2(x) {
        return x;
      };
      if (!seal) seal = function seal2(x) {
        return x;
      };
      if (!apply) apply = function apply2(func, thisArg) {
        for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) args[_key - 2] = arguments[_key];
        return func.apply(thisArg, args);
      };
      if (!construct) construct = function construct2(Func) {
        for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) args[_key2 - 1] = arguments[_key2];
        return new Func(...args);
      };
      var arrayForEach = unapply(Array.prototype.forEach);
      Array.prototype.indexOf;
      var arrayLastIndexOf = unapply(Array.prototype.lastIndexOf);
      var arrayPop = unapply(Array.prototype.pop);
      var arrayPush = unapply(Array.prototype.push);
      var arraySlice = unapply(Array.prototype.slice);
      var arraySplice = unapply(Array.prototype.splice);
      var arrayIsArray = Array.isArray;
      var setCreate = unconstruct(Set);
      var setAdd = unapply(Set.prototype.add);
      var setHas = unapply(Set.prototype.has);
      var stringToLowerCase = unapply(String.prototype.toLowerCase);
      var stringToString = unapply(String.prototype.toString);
      var stringMatch = unapply(String.prototype.match);
      var stringReplace = unapply(String.prototype.replace);
      var stringIndexOf = unapply(String.prototype.indexOf);
      var stringTrim = unapply(String.prototype.trim);
      var numberToString = unapply(Number.prototype.toString);
      var booleanToString = unapply(Boolean.prototype.toString);
      var bigintToString = typeof BigInt === "undefined" ? null : unapply(BigInt.prototype.toString);
      var symbolToString = typeof Symbol === "undefined" ? null : unapply(Symbol.prototype.toString);
      var objectHasOwnProperty = unapply(Object.prototype.hasOwnProperty);
      var objectToString = unapply(Object.prototype.toString);
      var regExpTest = unapply(RegExp.prototype.test);
      var typeErrorCreate = unconstruct(TypeError);
      function unapply(func) {
        return function(thisArg) {
          if (thisArg instanceof RegExp) thisArg.lastIndex = 0;
          for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) args[_key3 - 1] = arguments[_key3];
          return apply(func, thisArg, args);
        };
      }
      function unconstruct(Func) {
        return function() {
          for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) args[_key4] = arguments[_key4];
          return construct(Func, args);
        };
      }
      function addToSet(set, array) {
        let transformCaseFunc = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : stringToLowerCase;
        if (setPrototypeOf) setPrototypeOf(set, null);
        if (!arrayIsArray(array)) return set;
        let l = array.length;
        while (l--) {
          let element = array[l];
          if (typeof element === "string") {
            const lcElement = transformCaseFunc(element);
            if (lcElement !== element) {
              if (!isFrozen(array)) array[l] = lcElement;
              element = lcElement;
            }
          }
          set[element] = true;
        }
        return set;
      }
      function cleanArray(array) {
        for (let index = 0; index < array.length; index++) if (!objectHasOwnProperty(array, index)) array[index] = null;
        return array;
      }
      function clone(object) {
        const newObject = create(null);
        for (const _ref2 of entries(object)) {
          var _ref3 = _slicedToArray(_ref2, 2);
          const property = _ref3[0];
          const value = _ref3[1];
          if (objectHasOwnProperty(object, property)) {
            if (arrayIsArray(value)) newObject[property] = cleanArray(value);
            else if (value && typeof value === "object" && value.constructor === Object) newObject[property] = clone(value);
            else newObject[property] = value;
          }
        }
        return newObject;
      }
      function stringifyValue(value) {
        switch (typeof value) {
          case "string":
            return value;
          case "number":
            return numberToString(value);
          case "boolean":
            return booleanToString(value);
          case "bigint":
            return bigintToString ? bigintToString(value) : "0";
          case "symbol":
            return symbolToString ? symbolToString(value) : "Symbol()";
          case "undefined":
            return objectToString(value);
          case "function":
          case "object": {
            if (value === null) return objectToString(value);
            const valueAsRecord = value;
            const valueToString = lookupGetter(valueAsRecord, "toString");
            if (typeof valueToString === "function") {
              const stringified = valueToString(valueAsRecord);
              return typeof stringified === "string" ? stringified : objectToString(stringified);
            }
            return objectToString(value);
          }
          default:
            return objectToString(value);
        }
      }
      function lookupGetter(object, prop) {
        while (object !== null) {
          const desc = getOwnPropertyDescriptor(object, prop);
          if (desc) {
            if (desc.get) return unapply(desc.get);
            if (typeof desc.value === "function") return unapply(desc.value);
          }
          object = getPrototypeOf(object);
        }
        function fallbackValue() {
          return null;
        }
        return fallbackValue;
      }
      function lookupAccessor(object, prop) {
        while (object !== null) {
          const desc = getOwnPropertyDescriptor(object, prop);
          if (desc) return desc.get ? unapply(desc.get) : null;
          object = getPrototypeOf(object);
        }
        return null;
      }
      function isRegex(value) {
        try {
          regExpTest(value, "");
          return true;
        } catch (_unused) {
          return false;
        }
      }
      var html$1 = freeze([
        "a",
        "abbr",
        "acronym",
        "address",
        "area",
        "article",
        "aside",
        "audio",
        "b",
        "bdi",
        "bdo",
        "big",
        "blink",
        "blockquote",
        "body",
        "br",
        "button",
        "canvas",
        "caption",
        "center",
        "cite",
        "code",
        "col",
        "colgroup",
        "content",
        "data",
        "datalist",
        "dd",
        "decorator",
        "del",
        "details",
        "dfn",
        "dialog",
        "dir",
        "div",
        "dl",
        "dt",
        "element",
        "em",
        "fieldset",
        "figcaption",
        "figure",
        "font",
        "footer",
        "form",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "head",
        "header",
        "hgroup",
        "hr",
        "html",
        "i",
        "img",
        "input",
        "ins",
        "kbd",
        "label",
        "legend",
        "li",
        "main",
        "map",
        "mark",
        "marquee",
        "menu",
        "menuitem",
        "meter",
        "nav",
        "nobr",
        "ol",
        "optgroup",
        "option",
        "output",
        "p",
        "picture",
        "pre",
        "progress",
        "q",
        "rp",
        "rt",
        "ruby",
        "s",
        "samp",
        "search",
        "section",
        "select",
        "shadow",
        "slot",
        "small",
        "source",
        "spacer",
        "span",
        "strike",
        "strong",
        "style",
        "sub",
        "summary",
        "sup",
        "table",
        "tbody",
        "td",
        "template",
        "textarea",
        "tfoot",
        "th",
        "thead",
        "time",
        "tr",
        "track",
        "tt",
        "u",
        "ul",
        "var",
        "video",
        "wbr"
      ]);
      var svg$1 = freeze([
        "svg",
        "a",
        "altglyph",
        "altglyphdef",
        "altglyphitem",
        "animatecolor",
        "animatemotion",
        "animatetransform",
        "circle",
        "clippath",
        "defs",
        "desc",
        "ellipse",
        "enterkeyhint",
        "exportparts",
        "filter",
        "font",
        "g",
        "glyph",
        "glyphref",
        "hkern",
        "image",
        "inputmode",
        "line",
        "lineargradient",
        "marker",
        "mask",
        "metadata",
        "mpath",
        "part",
        "path",
        "pattern",
        "polygon",
        "polyline",
        "radialgradient",
        "rect",
        "stop",
        "style",
        "switch",
        "symbol",
        "text",
        "textpath",
        "title",
        "tref",
        "tspan",
        "view",
        "vkern"
      ]);
      var svgFilters = freeze([
        "feBlend",
        "feColorMatrix",
        "feComponentTransfer",
        "feComposite",
        "feConvolveMatrix",
        "feDiffuseLighting",
        "feDisplacementMap",
        "feDistantLight",
        "feDropShadow",
        "feFlood",
        "feFuncA",
        "feFuncB",
        "feFuncG",
        "feFuncR",
        "feGaussianBlur",
        "feImage",
        "feMerge",
        "feMergeNode",
        "feMorphology",
        "feOffset",
        "fePointLight",
        "feSpecularLighting",
        "feSpotLight",
        "feTile",
        "feTurbulence"
      ]);
      var svgDisallowed = freeze([
        "animate",
        "color-profile",
        "cursor",
        "discard",
        "font-face",
        "font-face-format",
        "font-face-name",
        "font-face-src",
        "font-face-uri",
        "foreignobject",
        "hatch",
        "hatchpath",
        "mesh",
        "meshgradient",
        "meshpatch",
        "meshrow",
        "missing-glyph",
        "script",
        "set",
        "solidcolor",
        "unknown",
        "use"
      ]);
      var mathMl$1 = freeze([
        "math",
        "menclose",
        "merror",
        "mfenced",
        "mfrac",
        "mglyph",
        "mi",
        "mlabeledtr",
        "mmultiscripts",
        "mn",
        "mo",
        "mover",
        "mpadded",
        "mphantom",
        "mroot",
        "mrow",
        "ms",
        "mspace",
        "msqrt",
        "mstyle",
        "msub",
        "msup",
        "msubsup",
        "mtable",
        "mtd",
        "mtext",
        "mtr",
        "munder",
        "munderover",
        "mprescripts"
      ]);
      var mathMlDisallowed = freeze([
        "maction",
        "maligngroup",
        "malignmark",
        "mlongdiv",
        "mscarries",
        "mscarry",
        "msgroup",
        "mstack",
        "msline",
        "msrow",
        "semantics",
        "annotation",
        "annotation-xml",
        "mprescripts",
        "none"
      ]);
      var text = freeze(["#text"]);
      var html = freeze([
        "accept",
        "action",
        "align",
        "alt",
        "autocapitalize",
        "autocomplete",
        "autopictureinpicture",
        "autoplay",
        "background",
        "bgcolor",
        "border",
        "capture",
        "cellpadding",
        "cellspacing",
        "checked",
        "cite",
        "class",
        "clear",
        "color",
        "cols",
        "colspan",
        "command",
        "commandfor",
        "controls",
        "controlslist",
        "coords",
        "crossorigin",
        "datetime",
        "decoding",
        "default",
        "dir",
        "disabled",
        "disablepictureinpicture",
        "disableremoteplayback",
        "download",
        "draggable",
        "enctype",
        "enterkeyhint",
        "exportparts",
        "face",
        "for",
        "headers",
        "height",
        "hidden",
        "high",
        "href",
        "hreflang",
        "id",
        "inert",
        "inputmode",
        "integrity",
        "ismap",
        "kind",
        "label",
        "lang",
        "list",
        "loading",
        "loop",
        "low",
        "max",
        "maxlength",
        "media",
        "method",
        "min",
        "minlength",
        "multiple",
        "muted",
        "name",
        "nonce",
        "noshade",
        "novalidate",
        "nowrap",
        "open",
        "optimum",
        "part",
        "pattern",
        "placeholder",
        "playsinline",
        "popover",
        "popovertarget",
        "popovertargetaction",
        "poster",
        "preload",
        "pubdate",
        "radiogroup",
        "readonly",
        "rel",
        "required",
        "rev",
        "reversed",
        "role",
        "rows",
        "rowspan",
        "spellcheck",
        "scope",
        "selected",
        "shape",
        "size",
        "sizes",
        "slot",
        "span",
        "srclang",
        "start",
        "src",
        "srcset",
        "step",
        "style",
        "summary",
        "tabindex",
        "title",
        "translate",
        "type",
        "usemap",
        "valign",
        "value",
        "width",
        "wrap",
        "xmlns"
      ]);
      var svg = freeze([
        "accent-height",
        "accumulate",
        "additive",
        "alignment-baseline",
        "amplitude",
        "ascent",
        "attributename",
        "attributetype",
        "azimuth",
        "basefrequency",
        "baseline-shift",
        "begin",
        "bias",
        "by",
        "class",
        "clip",
        "clippathunits",
        "clip-path",
        "clip-rule",
        "color",
        "color-interpolation",
        "color-interpolation-filters",
        "color-profile",
        "color-rendering",
        "cx",
        "cy",
        "d",
        "dx",
        "dy",
        "diffuseconstant",
        "direction",
        "display",
        "divisor",
        "dominant-baseline",
        "dur",
        "edgemode",
        "elevation",
        "end",
        "exponent",
        "fill",
        "fill-opacity",
        "fill-rule",
        "filter",
        "filterunits",
        "flood-color",
        "flood-opacity",
        "font-family",
        "font-size",
        "font-size-adjust",
        "font-stretch",
        "font-style",
        "font-variant",
        "font-weight",
        "fx",
        "fy",
        "g1",
        "g2",
        "glyph-name",
        "glyphref",
        "gradientunits",
        "gradienttransform",
        "height",
        "href",
        "id",
        "image-rendering",
        "in",
        "in2",
        "intercept",
        "k",
        "k1",
        "k2",
        "k3",
        "k4",
        "kerning",
        "keypoints",
        "keysplines",
        "keytimes",
        "lang",
        "lengthadjust",
        "letter-spacing",
        "kernelmatrix",
        "kernelunitlength",
        "lighting-color",
        "local",
        "marker-end",
        "marker-mid",
        "marker-start",
        "markerheight",
        "markerunits",
        "markerwidth",
        "maskcontentunits",
        "maskunits",
        "max",
        "mask",
        "mask-type",
        "media",
        "method",
        "mode",
        "min",
        "name",
        "numoctaves",
        "offset",
        "operator",
        "opacity",
        "order",
        "orient",
        "orientation",
        "origin",
        "overflow",
        "paint-order",
        "path",
        "pathlength",
        "patterncontentunits",
        "patterntransform",
        "patternunits",
        "pointer-events",
        "points",
        "preservealpha",
        "preserveaspectratio",
        "primitiveunits",
        "r",
        "rx",
        "ry",
        "radius",
        "refx",
        "refy",
        "repeatcount",
        "repeatdur",
        "restart",
        "result",
        "rotate",
        "scale",
        "seed",
        "shape-rendering",
        "slope",
        "specularconstant",
        "specularexponent",
        "spreadmethod",
        "startoffset",
        "stddeviation",
        "stitchtiles",
        "stop-color",
        "stop-opacity",
        "stroke-dasharray",
        "stroke-dashoffset",
        "stroke-linecap",
        "stroke-linejoin",
        "stroke-miterlimit",
        "stroke-opacity",
        "stroke",
        "stroke-width",
        "style",
        "surfacescale",
        "systemlanguage",
        "tabindex",
        "tablevalues",
        "targetx",
        "targety",
        "transform",
        "transform-origin",
        "text-anchor",
        "text-decoration",
        "text-orientation",
        "text-rendering",
        "textlength",
        "type",
        "u1",
        "u2",
        "unicode",
        "values",
        "vector-effect",
        "viewbox",
        "visibility",
        "version",
        "vert-adv-y",
        "vert-origin-x",
        "vert-origin-y",
        "width",
        "word-spacing",
        "wrap",
        "writing-mode",
        "xchannelselector",
        "ychannelselector",
        "x",
        "x1",
        "x2",
        "xmlns",
        "y",
        "y1",
        "y2",
        "z",
        "zoomandpan"
      ]);
      var mathMl = freeze([
        "accent",
        "accentunder",
        "align",
        "bevelled",
        "close",
        "columnalign",
        "columnlines",
        "columnspacing",
        "columnspan",
        "denomalign",
        "depth",
        "dir",
        "display",
        "displaystyle",
        "encoding",
        "fence",
        "frame",
        "height",
        "href",
        "id",
        "largeop",
        "length",
        "linethickness",
        "lquote",
        "lspace",
        "mathbackground",
        "mathcolor",
        "mathsize",
        "mathvariant",
        "maxsize",
        "minsize",
        "movablelimits",
        "notation",
        "numalign",
        "open",
        "rowalign",
        "rowlines",
        "rowspacing",
        "rowspan",
        "rspace",
        "rquote",
        "scriptlevel",
        "scriptminsize",
        "scriptsizemultiplier",
        "selection",
        "separator",
        "separators",
        "stretchy",
        "subscriptshift",
        "supscriptshift",
        "symmetric",
        "voffset",
        "width",
        "xmlns"
      ]);
      var xml = freeze([
        "xlink:href",
        "xml:id",
        "xlink:title",
        "xml:space",
        "xmlns:xlink"
      ]);
      var MUSTACHE_EXPR = seal(/{{[\w\W]*|^[\w\W]*}}/g);
      var ERB_EXPR = seal(/<%[\w\W]*|^[\w\W]*%>/g);
      var TMPLIT_EXPR = seal(/\${[\w\W]*/g);
      var DATA_ATTR = seal(/^data-[\-\w.\u00B7-\uFFFF]+$/);
      var ARIA_ATTR = seal(/^aria-[\-\w]+$/);
      var IS_ALLOWED_URI = seal(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i);
      var IS_SCRIPT_OR_DATA = seal(/^(?:\w+script|data):/i);
      var ATTR_WHITESPACE = seal(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g);
      var DOCTYPE_NAME = seal(/^html$/i);
      var CUSTOM_ELEMENT = seal(/^[a-z][.\w]*(-[.\w]+)+$/i);
      var ELEMENT_MARKUP_PROBE = seal(/<[/\w!]/g);
      var COMMENT_MARKUP_PROBE = seal(/<[/\w]/g);
      var FALLBACK_TAG_CLOSE = seal(/<\/no(script|embed|frames)/i);
      var SELF_CLOSING_TAG = seal(/\/>/i);
      var NODE_TYPE = {
        element: 1,
        attribute: 2,
        text: 3,
        cdataSection: 4,
        entityReference: 5,
        entityNode: 6,
        processingInstruction: 7,
        comment: 8,
        document: 9,
        documentType: 10,
        documentFragment: 11,
        notation: 12
      };
      var LITERAL_TEXT_ELEMENTS = freeze(addToSet({}, [
        "style",
        "script",
        "xmp",
        "iframe",
        "noembed",
        "noframes",
        "plaintext",
        "noscript"
      ]));
      var getGlobal = function getGlobal2() {
        return typeof window === "undefined" ? null : window;
      };
      var _createTrustedTypesPolicy = function _createTrustedTypesPolicy2(trustedTypes, purifyHostElement) {
        if (typeof trustedTypes !== "object" || typeof trustedTypes.createPolicy !== "function") return null;
        let suffix = null;
        const ATTR_NAME = "data-tt-policy-suffix";
        if (purifyHostElement && purifyHostElement.hasAttribute(ATTR_NAME)) suffix = purifyHostElement.getAttribute(ATTR_NAME);
        const policyName = "dompurify" + (suffix ? "#" + suffix : "");
        try {
          return trustedTypes.createPolicy(policyName, {
            createHTML(html2) {
              return html2;
            },
            createScriptURL(scriptUrl) {
              return scriptUrl;
            }
          });
        } catch (_) {
          console.warn("TrustedTypes policy " + policyName + " could not be created.");
          return null;
        }
      };
      var _createHooksMap = function _createHooksMap2() {
        return {
          afterSanitizeAttributes: [],
          afterSanitizeElements: [],
          afterSanitizeShadowDOM: [],
          beforeSanitizeAttributes: [],
          beforeSanitizeElements: [],
          beforeSanitizeShadowDOM: [],
          uponSanitizeAttribute: [],
          uponSanitizeElement: [],
          uponSanitizeShadowNode: []
        };
      };
      var _resolveSetOption = function _resolveSetOption2(cfg, key, fallback, options) {
        return objectHasOwnProperty(cfg, key) && arrayIsArray(cfg[key]) ? addToSet(options.base ? clone(options.base) : {}, cfg[key], options.transform) : fallback;
      };
      var _resolveObjectOption = function _resolveObjectOption2(cfg, key, makeFallback) {
        const value = objectHasOwnProperty(cfg, key) ? cfg[key] : void 0;
        return value && typeof value === "object" ? clone(value) : makeFallback();
      };
      function createDOMPurify() {
        let window2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : getGlobal();
        const DOMPurify = (root) => createDOMPurify(root);
        DOMPurify.version = "3.4.17";
        DOMPurify.removed = [];
        if (!window2 || !window2.document || window2.document.nodeType !== NODE_TYPE.document || !window2.Element) {
          DOMPurify.isSupported = false;
          return DOMPurify;
        }
        let document2 = window2.document;
        const originalDocument = document2;
        const currentScript = originalDocument.currentScript;
        window2.DocumentFragment;
        const HTMLTemplateElement = window2.HTMLTemplateElement, Node = window2.Node, Element = window2.Element, NodeFilter = window2.NodeFilter;
        window2.NamedNodeMap === void 0 && (window2.NamedNodeMap || window2.MozNamedAttrMap);
        window2.HTMLFormElement;
        const DOMParser2 = window2.DOMParser, trustedTypes = window2.trustedTypes;
        const ElementPrototype = Element.prototype;
        const cloneNode = lookupGetter(ElementPrototype, "cloneNode");
        const remove = lookupGetter(ElementPrototype, "remove");
        const removeAttributeNode = lookupGetter(ElementPrototype, "removeAttributeNode");
        const getNextSibling = lookupGetter(ElementPrototype, "nextSibling");
        const getChildNodes = lookupGetter(ElementPrototype, "childNodes");
        const getParentNode = lookupGetter(ElementPrototype, "parentNode");
        const getShadowRoot = lookupGetter(ElementPrototype, "shadowRoot");
        const getAttributes = lookupGetter(ElementPrototype, "attributes");
        const getNodeType = Node && Node.prototype ? lookupGetter(Node.prototype, "nodeType") : null;
        const getNodeName = Node && Node.prototype ? lookupGetter(Node.prototype, "nodeName") : null;
        const getOwnerDocument = Node && Node.prototype ? lookupGetter(Node.prototype, "ownerDocument") : null;
        const _readNodeType = function _readNodeType2(node) {
          return getNodeType ? getNodeType(node) : node.nodeType;
        };
        const _readNodeName = function _readNodeName2(node) {
          return getNodeName ? getNodeName(node) : node.nodeName;
        };
        const getNamespaceURI = lookupAccessor(ElementPrototype, "namespaceURI");
        const _readNamespaceURI = function _readNamespaceURI2(element) {
          return getNamespaceURI ? getNamespaceURI(element) : element.namespaceURI;
        };
        if (typeof HTMLTemplateElement === "function") {
          const template = document2.createElement("template");
          if (template.content && template.content.ownerDocument) document2 = template.content.ownerDocument;
        }
        let trustedTypesPolicy;
        let emptyHTML = "";
        let defaultTrustedTypesPolicy;
        let defaultTrustedTypesPolicyResolved = false;
        let IN_TRUSTED_TYPES_POLICY = 0;
        const _assertNotInTrustedTypesPolicy = function _assertNotInTrustedTypesPolicy2() {
          if (IN_TRUSTED_TYPES_POLICY > 0) throw typeErrorCreate('A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the "DOMPurify and Trusted Types" section of the README.');
        };
        const _createTrustedHTML = function _createTrustedHTML2(html2) {
          _assertNotInTrustedTypesPolicy();
          IN_TRUSTED_TYPES_POLICY++;
          try {
            return trustedTypesPolicy.createHTML(html2);
          } finally {
            IN_TRUSTED_TYPES_POLICY--;
          }
        };
        const _createTrustedScriptURL = function _createTrustedScriptURL2(scriptUrl) {
          _assertNotInTrustedTypesPolicy();
          IN_TRUSTED_TYPES_POLICY++;
          try {
            return trustedTypesPolicy.createScriptURL(scriptUrl);
          } finally {
            IN_TRUSTED_TYPES_POLICY--;
          }
        };
        const _getDefaultTrustedTypesPolicy = function _getDefaultTrustedTypesPolicy2() {
          if (!defaultTrustedTypesPolicyResolved) {
            defaultTrustedTypesPolicy = _createTrustedTypesPolicy(trustedTypes, currentScript);
            defaultTrustedTypesPolicyResolved = true;
          }
          return defaultTrustedTypesPolicy;
        };
        const _document = document2, implementation = _document.implementation, createNodeIterator = _document.createNodeIterator, createDocumentFragment = _document.createDocumentFragment, getElementsByTagName = _document.getElementsByTagName;
        const importNode = originalDocument.importNode;
        let hooks = _createHooksMap();
        DOMPurify.isSupported = typeof entries === "function" && typeof getParentNode === "function" && implementation && implementation.createHTMLDocument !== void 0;
        const MUSTACHE_EXPR$1 = MUSTACHE_EXPR, ERB_EXPR$1 = ERB_EXPR, TMPLIT_EXPR$1 = TMPLIT_EXPR, DATA_ATTR$1 = DATA_ATTR, ARIA_ATTR$1 = ARIA_ATTR, IS_SCRIPT_OR_DATA$1 = IS_SCRIPT_OR_DATA, ATTR_WHITESPACE$1 = ATTR_WHITESPACE, CUSTOM_ELEMENT$1 = CUSTOM_ELEMENT;
        let IS_ALLOWED_URI$1 = IS_ALLOWED_URI;
        let ALLOWED_TAGS = null;
        const DEFAULT_ALLOWED_TAGS = addToSet({}, [
          ...html$1,
          ...svg$1,
          ...svgFilters,
          ...mathMl$1,
          ...text
        ]);
        let ALLOWED_ATTR = null;
        const DEFAULT_ALLOWED_ATTR = addToSet({}, [
          ...html,
          ...svg,
          ...mathMl,
          ...xml
        ]);
        let CUSTOM_ELEMENT_HANDLING = Object.seal(create(null, {
          tagNameCheck: {
            writable: true,
            configurable: false,
            enumerable: true,
            value: null
          },
          attributeNameCheck: {
            writable: true,
            configurable: false,
            enumerable: true,
            value: null
          },
          allowCustomizedBuiltInElements: {
            writable: true,
            configurable: false,
            enumerable: true,
            value: false
          }
        }));
        let FORBID_TAGS = null;
        let FORBID_ATTR = null;
        const EXTRA_ELEMENT_HANDLING = Object.seal(create(null, {
          tagCheck: {
            writable: true,
            configurable: false,
            enumerable: true,
            value: null
          },
          attributeCheck: {
            writable: true,
            configurable: false,
            enumerable: true,
            value: null
          }
        }));
        let ALLOW_ARIA_ATTR = true;
        let ALLOW_DATA_ATTR = true;
        let ALLOW_UNKNOWN_PROTOCOLS = false;
        let ALLOW_SELF_CLOSE_IN_ATTR = true;
        let SAFE_FOR_TEMPLATES = false;
        let SAFE_FOR_XML = true;
        let WHOLE_DOCUMENT = false;
        let SET_CONFIG = false;
        let SET_CONFIG_ALLOWED_TAGS = null;
        let SET_CONFIG_ALLOWED_ATTR = null;
        let FORCE_BODY = false;
        let RETURN_DOM = false;
        let RETURN_DOM_FRAGMENT = false;
        let RETURN_TRUSTED_TYPE = false;
        let SANITIZE_DOM = true;
        let SANITIZE_NAMED_PROPS = false;
        const SANITIZE_NAMED_PROPS_PREFIX = "user-content-";
        let KEEP_CONTENT = true;
        let IN_PLACE = false;
        let IN_PLACE_VISITED = null;
        let USE_PROFILES = {};
        let FORBID_CONTENTS = null;
        const DEFAULT_FORBID_CONTENTS = addToSet({}, [
          "annotation-xml",
          "audio",
          "colgroup",
          "desc",
          "foreignobject",
          "head",
          "iframe",
          "math",
          "mi",
          "mn",
          "mo",
          "ms",
          "mtext",
          "noembed",
          "noframes",
          "noscript",
          "plaintext",
          "script",
          "selectedcontent",
          "style",
          "svg",
          "template",
          "thead",
          "title",
          "video",
          "xmp"
        ]);
        let DATA_URI_TAGS = null;
        const DEFAULT_DATA_URI_TAGS = addToSet({}, [
          "audio",
          "video",
          "img",
          "source",
          "image",
          "track"
        ]);
        let URI_SAFE_ATTRIBUTES = null;
        const DEFAULT_URI_SAFE_ATTRIBUTES = addToSet({}, [
          "alt",
          "class",
          "for",
          "id",
          "label",
          "name",
          "pattern",
          "placeholder",
          "role",
          "summary",
          "title",
          "value",
          "style",
          "xmlns"
        ]);
        const MATHML_NAMESPACE = "http://www.w3.org/1998/Math/MathML";
        const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
        const HTML_NAMESPACE = "http://www.w3.org/1999/xhtml";
        let NAMESPACE = HTML_NAMESPACE;
        let IS_EMPTY_INPUT = false;
        let ALLOWED_NAMESPACES = null;
        const DEFAULT_ALLOWED_NAMESPACES = addToSet({}, [
          MATHML_NAMESPACE,
          SVG_NAMESPACE,
          HTML_NAMESPACE
        ], stringToString);
        const DEFAULT_MATHML_TEXT_INTEGRATION_POINTS = freeze([
          "mi",
          "mo",
          "mn",
          "ms",
          "mtext"
        ]);
        let MATHML_TEXT_INTEGRATION_POINTS = addToSet({}, DEFAULT_MATHML_TEXT_INTEGRATION_POINTS);
        const DEFAULT_HTML_INTEGRATION_POINTS = freeze(["annotation-xml"]);
        let HTML_INTEGRATION_POINTS = addToSet({}, DEFAULT_HTML_INTEGRATION_POINTS);
        const COMMON_SVG_AND_HTML_ELEMENTS = addToSet({}, [
          "title",
          "style",
          "font",
          "a",
          "script"
        ]);
        let PARSER_MEDIA_TYPE = null;
        const SUPPORTED_PARSER_MEDIA_TYPES = ["application/xhtml+xml", "text/html"];
        const DEFAULT_PARSER_MEDIA_TYPE = "text/html";
        let transformCaseFunc = null;
        let CONFIG = null;
        const formElement = document2.createElement("form");
        const isRegexOrFunction = function isRegexOrFunction2(testValue) {
          return testValue instanceof RegExp || testValue instanceof Function;
        };
        const _parseConfig = function _parseConfig2() {
          let cfg = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
          if (CONFIG && CONFIG === cfg) return;
          if (!cfg || typeof cfg !== "object") cfg = {};
          cfg = clone(cfg);
          PARSER_MEDIA_TYPE = SUPPORTED_PARSER_MEDIA_TYPES.indexOf(cfg.PARSER_MEDIA_TYPE) === -1 ? DEFAULT_PARSER_MEDIA_TYPE : cfg.PARSER_MEDIA_TYPE;
          transformCaseFunc = PARSER_MEDIA_TYPE === "application/xhtml+xml" ? stringToString : stringToLowerCase;
          ALLOWED_TAGS = _resolveSetOption(cfg, "ALLOWED_TAGS", DEFAULT_ALLOWED_TAGS, { transform: transformCaseFunc });
          ALLOWED_ATTR = _resolveSetOption(cfg, "ALLOWED_ATTR", DEFAULT_ALLOWED_ATTR, { transform: transformCaseFunc });
          ALLOWED_NAMESPACES = _resolveSetOption(cfg, "ALLOWED_NAMESPACES", DEFAULT_ALLOWED_NAMESPACES, { transform: stringToString });
          URI_SAFE_ATTRIBUTES = _resolveSetOption(cfg, "ADD_URI_SAFE_ATTR", DEFAULT_URI_SAFE_ATTRIBUTES, {
            transform: transformCaseFunc,
            base: DEFAULT_URI_SAFE_ATTRIBUTES
          });
          DATA_URI_TAGS = _resolveSetOption(cfg, "ADD_DATA_URI_TAGS", DEFAULT_DATA_URI_TAGS, {
            transform: transformCaseFunc,
            base: DEFAULT_DATA_URI_TAGS
          });
          FORBID_CONTENTS = _resolveSetOption(cfg, "FORBID_CONTENTS", DEFAULT_FORBID_CONTENTS, { transform: transformCaseFunc });
          FORBID_TAGS = _resolveSetOption(cfg, "FORBID_TAGS", clone({}), { transform: transformCaseFunc });
          FORBID_ATTR = _resolveSetOption(cfg, "FORBID_ATTR", clone({}), { transform: transformCaseFunc });
          USE_PROFILES = objectHasOwnProperty(cfg, "USE_PROFILES") ? cfg.USE_PROFILES && typeof cfg.USE_PROFILES === "object" ? clone(cfg.USE_PROFILES) : cfg.USE_PROFILES : false;
          ALLOW_ARIA_ATTR = cfg.ALLOW_ARIA_ATTR !== false;
          ALLOW_DATA_ATTR = cfg.ALLOW_DATA_ATTR !== false;
          ALLOW_UNKNOWN_PROTOCOLS = cfg.ALLOW_UNKNOWN_PROTOCOLS || false;
          ALLOW_SELF_CLOSE_IN_ATTR = cfg.ALLOW_SELF_CLOSE_IN_ATTR !== false;
          SAFE_FOR_TEMPLATES = cfg.SAFE_FOR_TEMPLATES || false;
          SAFE_FOR_XML = cfg.SAFE_FOR_XML !== false;
          WHOLE_DOCUMENT = cfg.WHOLE_DOCUMENT || false;
          RETURN_DOM = cfg.RETURN_DOM || false;
          RETURN_DOM_FRAGMENT = cfg.RETURN_DOM_FRAGMENT || false;
          RETURN_TRUSTED_TYPE = cfg.RETURN_TRUSTED_TYPE || false;
          FORCE_BODY = cfg.FORCE_BODY || false;
          SANITIZE_DOM = cfg.SANITIZE_DOM !== false;
          SANITIZE_NAMED_PROPS = cfg.SANITIZE_NAMED_PROPS || false;
          KEEP_CONTENT = cfg.KEEP_CONTENT !== false;
          IN_PLACE = cfg.IN_PLACE || false;
          IS_ALLOWED_URI$1 = isRegex(cfg.ALLOWED_URI_REGEXP) ? cfg.ALLOWED_URI_REGEXP : IS_ALLOWED_URI;
          NAMESPACE = typeof cfg.NAMESPACE === "string" ? cfg.NAMESPACE : HTML_NAMESPACE;
          MATHML_TEXT_INTEGRATION_POINTS = _resolveObjectOption(cfg, "MATHML_TEXT_INTEGRATION_POINTS", () => addToSet({}, DEFAULT_MATHML_TEXT_INTEGRATION_POINTS));
          HTML_INTEGRATION_POINTS = _resolveObjectOption(cfg, "HTML_INTEGRATION_POINTS", () => addToSet({}, DEFAULT_HTML_INTEGRATION_POINTS));
          const customElementHandling = _resolveObjectOption(cfg, "CUSTOM_ELEMENT_HANDLING", () => create(null));
          CUSTOM_ELEMENT_HANDLING = create(null);
          if (objectHasOwnProperty(customElementHandling, "tagNameCheck") && isRegexOrFunction(customElementHandling.tagNameCheck)) CUSTOM_ELEMENT_HANDLING.tagNameCheck = customElementHandling.tagNameCheck;
          if (objectHasOwnProperty(customElementHandling, "attributeNameCheck") && isRegexOrFunction(customElementHandling.attributeNameCheck)) CUSTOM_ELEMENT_HANDLING.attributeNameCheck = customElementHandling.attributeNameCheck;
          if (objectHasOwnProperty(customElementHandling, "allowCustomizedBuiltInElements") && typeof customElementHandling.allowCustomizedBuiltInElements === "boolean") CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements = customElementHandling.allowCustomizedBuiltInElements;
          seal(CUSTOM_ELEMENT_HANDLING);
          if (SAFE_FOR_TEMPLATES) ALLOW_DATA_ATTR = false;
          if (RETURN_DOM_FRAGMENT) RETURN_DOM = true;
          if (USE_PROFILES) {
            ALLOWED_TAGS = addToSet({}, text);
            ALLOWED_ATTR = create(null);
            if (USE_PROFILES.html === true) {
              addToSet(ALLOWED_TAGS, html$1);
              addToSet(ALLOWED_ATTR, html);
            }
            if (USE_PROFILES.svg === true) {
              addToSet(ALLOWED_TAGS, svg$1);
              addToSet(ALLOWED_ATTR, svg);
              addToSet(ALLOWED_ATTR, xml);
            }
            if (USE_PROFILES.svgFilters === true) {
              addToSet(ALLOWED_TAGS, svgFilters);
              addToSet(ALLOWED_ATTR, svg);
              addToSet(ALLOWED_ATTR, xml);
            }
            if (USE_PROFILES.mathMl === true) {
              addToSet(ALLOWED_TAGS, mathMl$1);
              addToSet(ALLOWED_ATTR, mathMl);
              addToSet(ALLOWED_ATTR, xml);
            }
          }
          EXTRA_ELEMENT_HANDLING.tagCheck = null;
          EXTRA_ELEMENT_HANDLING.attributeCheck = null;
          if (objectHasOwnProperty(cfg, "ADD_TAGS")) {
            if (typeof cfg.ADD_TAGS === "function") EXTRA_ELEMENT_HANDLING.tagCheck = cfg.ADD_TAGS;
            else if (arrayIsArray(cfg.ADD_TAGS)) {
              if (ALLOWED_TAGS === DEFAULT_ALLOWED_TAGS) ALLOWED_TAGS = clone(ALLOWED_TAGS);
              addToSet(ALLOWED_TAGS, cfg.ADD_TAGS, transformCaseFunc);
            }
          }
          if (objectHasOwnProperty(cfg, "ADD_ATTR")) {
            if (typeof cfg.ADD_ATTR === "function") EXTRA_ELEMENT_HANDLING.attributeCheck = cfg.ADD_ATTR;
            else if (arrayIsArray(cfg.ADD_ATTR)) {
              if (ALLOWED_ATTR === DEFAULT_ALLOWED_ATTR) ALLOWED_ATTR = clone(ALLOWED_ATTR);
              addToSet(ALLOWED_ATTR, cfg.ADD_ATTR, transformCaseFunc);
            }
          }
          if (objectHasOwnProperty(cfg, "ADD_FORBID_CONTENTS") && arrayIsArray(cfg.ADD_FORBID_CONTENTS)) {
            if (FORBID_CONTENTS === DEFAULT_FORBID_CONTENTS) FORBID_CONTENTS = clone(FORBID_CONTENTS);
            addToSet(FORBID_CONTENTS, cfg.ADD_FORBID_CONTENTS, transformCaseFunc);
          }
          if (KEEP_CONTENT) ALLOWED_TAGS["#text"] = true;
          if (WHOLE_DOCUMENT) addToSet(ALLOWED_TAGS, [
            "html",
            "head",
            "body"
          ]);
          if (ALLOWED_TAGS.table) {
            addToSet(ALLOWED_TAGS, ["tbody"]);
            delete FORBID_TAGS.tbody;
          }
          if (cfg.TRUSTED_TYPES_POLICY) {
            if (typeof cfg.TRUSTED_TYPES_POLICY.createHTML !== "function") throw typeErrorCreate('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
            if (typeof cfg.TRUSTED_TYPES_POLICY.createScriptURL !== "function") throw typeErrorCreate('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
            const previousTrustedTypesPolicy = trustedTypesPolicy;
            trustedTypesPolicy = cfg.TRUSTED_TYPES_POLICY;
            try {
              emptyHTML = _createTrustedHTML("");
            } catch (error) {
              trustedTypesPolicy = previousTrustedTypesPolicy;
              throw error;
            }
          } else if (cfg.TRUSTED_TYPES_POLICY === null) {
            trustedTypesPolicy = void 0;
            emptyHTML = "";
          } else {
            if (trustedTypesPolicy === void 0) trustedTypesPolicy = _getDefaultTrustedTypesPolicy();
            if (trustedTypesPolicy && typeof emptyHTML === "string") emptyHTML = _createTrustedHTML("");
          }
          if (freeze) freeze(cfg);
          CONFIG = cfg;
        };
        const ALL_SVG_TAGS = addToSet({}, [
          ...svg$1,
          ...svgFilters,
          ...svgDisallowed
        ]);
        const ALL_MATHML_TAGS = addToSet({}, [...mathMl$1, ...mathMlDisallowed]);
        const _checkSvgNamespace = function _checkSvgNamespace2(tagName, parent, parentTagName) {
          if (parent.namespaceURI === HTML_NAMESPACE) return tagName === "svg";
          if (parent.namespaceURI === MATHML_NAMESPACE) return tagName === "svg" && (parentTagName === "annotation-xml" || MATHML_TEXT_INTEGRATION_POINTS[parentTagName]);
          return Boolean(ALL_SVG_TAGS[tagName]);
        };
        const _checkMathMlNamespace = function _checkMathMlNamespace2(tagName, parent, parentTagName) {
          if (parent.namespaceURI === HTML_NAMESPACE) return tagName === "math";
          if (parent.namespaceURI === SVG_NAMESPACE) return tagName === "math" && HTML_INTEGRATION_POINTS[parentTagName];
          return Boolean(ALL_MATHML_TAGS[tagName]);
        };
        const _checkHtmlNamespace = function _checkHtmlNamespace2(tagName, parent, parentTagName) {
          if (parent.namespaceURI === SVG_NAMESPACE && !HTML_INTEGRATION_POINTS[parentTagName]) return false;
          if (parent.namespaceURI === MATHML_NAMESPACE && !MATHML_TEXT_INTEGRATION_POINTS[parentTagName]) return false;
          return !ALL_MATHML_TAGS[tagName] && (COMMON_SVG_AND_HTML_ELEMENTS[tagName] || !ALL_SVG_TAGS[tagName]);
        };
        const _checkValidNamespace = function _checkValidNamespace2(element) {
          const elementNamespace = _readNamespaceURI(element);
          const tagName = stringToLowerCase(_readNodeName(element));
          const parentNode = getParentNode(element);
          let parent;
          let parentTagName;
          if (parentNode && _readNodeType(parentNode) === NODE_TYPE.element) {
            parent = { namespaceURI: _readNamespaceURI(parentNode) };
            parentTagName = stringToLowerCase(_readNodeName(parentNode));
          } else {
            parent = { namespaceURI: NAMESPACE };
            parentTagName = "template";
          }
          if (!ALLOWED_NAMESPACES[elementNamespace]) return false;
          if (elementNamespace === SVG_NAMESPACE) return _checkSvgNamespace(tagName, parent, parentTagName);
          if (elementNamespace === MATHML_NAMESPACE) return _checkMathMlNamespace(tagName, parent, parentTagName);
          if (elementNamespace === HTML_NAMESPACE) return _checkHtmlNamespace(tagName, parent, parentTagName);
          if (PARSER_MEDIA_TYPE === "application/xhtml+xml" && ALLOWED_NAMESPACES[elementNamespace]) return true;
          return false;
        };
        const _forceRemove = function _forceRemove2(node) {
          arrayPush(DOMPurify.removed, { element: node });
          try {
            getParentNode(node).removeChild(node);
          } catch (_) {
            remove(node);
            if (!getParentNode(node)) throw typeErrorCreate("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place");
          }
        };
        const _stripAttributeNode = function _stripAttributeNode2(element, attribute, name) {
          try {
            removeAttributeNode(element, attribute);
          } catch (_) {
            try {
              element.removeAttribute(name);
            } catch (_2) {
            }
          }
        };
        const _neutralizeRoot = function _neutralizeRoot2(root) {
          _neutralizeSubtree(root);
          const childNodes = getChildNodes(root);
          if (childNodes) arrayForEach(arraySlice(childNodes), (child) => {
            try {
              remove(child);
            } catch (_) {
            }
          });
          const attributes = _readNodeType(root) === NODE_TYPE.element ? getAttributes(root) : null;
          if (attributes) for (let i = attributes.length - 1; i >= 0; --i) {
            const attribute = attributes[i];
            const name = attribute && attribute.name;
            if (typeof name === "string") _stripAttributeNode(root, attribute, name);
          }
        };
        const _removeAttribute = function _removeAttribute2(name, element, attr) {
          if (!attr) try {
            attr = element.getAttributeNode(name);
          } catch (_) {
            attr = null;
          }
          arrayPush(DOMPurify.removed, {
            attribute: attr || null,
            from: element
          });
          try {
            if (attr) removeAttributeNode(element, attr);
            else element.removeAttribute(name);
          } catch (_) {
            try {
              element.removeAttribute(name);
            } catch (_2) {
            }
          }
          if (name === "is") {
            if (RETURN_DOM || RETURN_DOM_FRAGMENT) try {
              _forceRemove(element);
            } catch (_) {
            }
            else try {
              element.setAttribute(name, "");
            } catch (_) {
            }
          }
        };
        const _stripDisallowedAttributes = function _stripDisallowedAttributes2(element) {
          const attributes = getAttributes(element);
          if (!attributes) return;
          for (let i = attributes.length - 1; i >= 0; --i) {
            const attribute = attributes[i];
            const name = attribute && attribute.name;
            if (typeof name !== "string" || ALLOWED_ATTR[transformCaseFunc(name)]) continue;
            _stripAttributeNode(element, attribute, name);
          }
        };
        const _walkTree = function _walkTree2(root, visit) {
          let intoShadow = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
          const stack = [root];
          while (stack.length > 0) {
            const node = stack.pop();
            if (visit(node) === false) continue;
            if (intoShadow && _readNodeType(node) === NODE_TYPE.element) {
              const shadowRoot = getShadowRoot(node);
              if (_isDocumentFragment(shadowRoot)) stack.push(shadowRoot);
            }
            const childNodes = getChildNodes(node);
            if (childNodes) for (let i = childNodes.length - 1; i >= 0; --i) stack.push(childNodes[i]);
          }
        };
        const _neutralizeSubtree = function _neutralizeSubtree2(root) {
          _walkTree(root, (node) => {
            if (_readNodeType(node) === NODE_TYPE.element) _stripDisallowedAttributes(node);
          });
        };
        const _collectLiveNodes = function _collectLiveNodes2(root) {
          const nodes = [];
          _walkTree(root, (node) => {
            nodes.push(node);
          }, true);
          return nodes;
        };
        const _neutralizeEscapedElements = function _neutralizeEscapedElements2(root, before) {
          const reachable = setCreate();
          arrayForEach(_collectLiveNodes(root), (node) => {
            if (_readNodeType(node) === NODE_TYPE.element) setAdd(reachable, node);
          });
          arrayForEach(before, (node) => {
            if (_readNodeType(node) === NODE_TYPE.element && !setHas(reachable, node)) _stripDisallowedAttributes(node);
          });
        };
        const _neutralizeDiscarded = function _neutralizeDiscarded2(root, before) {
          let rootRemoved = false;
          arrayForEach(DOMPurify.removed, (entry) => {
            if (entry.element) {
              rootRemoved = rootRemoved || entry.element === root;
              _neutralizeSubtree(entry.element);
            }
          });
          _neutralizeEscapedElements(root, before);
          return rootRemoved;
        };
        const MAX_UNVISITED_ROUNDS = 8;
        const _sanitizeUnvisitedNodes = function _sanitizeUnvisitedNodes2(root, before) {
          const visited = IN_PLACE_VISITED;
          let original = null;
          const getOriginal = () => {
            if (!original) {
              original = setCreate();
              arrayForEach(before, (beforeNode) => {
                setAdd(original, beforeNode);
              });
            }
            return original;
          };
          for (let round = 0; ; round++) {
            const live = _collectLiveNodes(root);
            const containers = [root];
            let pending = false;
            arrayForEach(live, (node) => {
              if (_readNodeType(node) === NODE_TYPE.documentFragment) arrayPush(containers, node);
              else if (!pending && !setHas(visited, node)) pending = setHas(getOriginal(), node);
            });
            if (!pending) return;
            if (round >= MAX_UNVISITED_ROUNDS) throw typeErrorCreate("the tree kept changing during in-place sanitization; refusing to return it");
            arrayForEach(containers, (container, index) => {
              _sanitizeUnvisitedIn(container, index > 0, root, getOriginal());
            });
          }
        };
        const _sanitizeUnvisitedIn = function _sanitizeUnvisitedIn2(container, inShadow, root, original) {
          const iterator = _createNodeIterator(container);
          let node;
          while (node = iterator.nextNode()) {
            if (!setHas(original, node) || setHas(IN_PLACE_VISITED, node)) continue;
            if (inShadow) _executeHooks(hooks.uponSanitizeShadowNode, node, null);
            _sanitizeElements(node, root);
            _sanitizeAttributes(node, root);
            if (_isDocumentFragment(node.content)) _sanitizeShadowDOM2(node.content);
          }
        };
        const _markVisited = function _markVisited2(node) {
          if (IN_PLACE_VISITED) setAdd(IN_PLACE_VISITED, node);
        };
        const _isPatchLinkageAttribute = function _isPatchLinkageAttribute2(lcName, lcTag) {
          if (!SAFE_FOR_XML) return false;
          if (lcName === "patchsrc") return true;
          return lcName === "for" && lcTag !== "label" && lcTag !== "output";
        };
        const _neutralizePatchLinkage = function _neutralizePatchLinkage2(root) {
          if (!SAFE_FOR_XML) return;
          _walkTree(root, (node) => {
            const nodeType = _readNodeType(node);
            if (nodeType === NODE_TYPE.processingInstruction || nodeType === NODE_TYPE.comment && regExpTest(COMMENT_MARKUP_PROBE, node.data)) {
              try {
                remove(node);
              } catch (_) {
              }
              return false;
            }
            if (nodeType === NODE_TYPE.element) {
              const element = node;
              const lcTag = transformCaseFunc(_readNodeName(node));
              try {
                if (element.hasAttribute && element.hasAttribute("patchsrc")) element.removeAttribute("patchsrc");
                if (element.hasAttribute && element.hasAttribute("for") && _isPatchLinkageAttribute("for", lcTag)) element.removeAttribute("for");
              } catch (_) {
              }
            }
            return true;
          });
        };
        const _initDocument = function _initDocument2(dirty) {
          let doc = null;
          let leadingWhitespace = null;
          if (FORCE_BODY) dirty = "<remove></remove>" + dirty;
          else {
            const matches = stringMatch(dirty, /^[\r\n\t ]+/);
            leadingWhitespace = matches && matches[0];
          }
          if (PARSER_MEDIA_TYPE === "application/xhtml+xml" && NAMESPACE === HTML_NAMESPACE) dirty = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + dirty + "</body></html>";
          const dirtyPayload = trustedTypesPolicy ? _createTrustedHTML(dirty) : dirty;
          if (NAMESPACE === HTML_NAMESPACE) try {
            doc = new DOMParser2().parseFromString(dirtyPayload, PARSER_MEDIA_TYPE);
          } catch (_) {
          }
          if (!doc || !doc.documentElement) {
            doc = implementation.createDocument(NAMESPACE, "template", null);
            try {
              doc.documentElement.innerHTML = IS_EMPTY_INPUT ? emptyHTML : dirtyPayload;
            } catch (_) {
            }
          }
          const body = doc.body || doc.documentElement;
          if (dirty && leadingWhitespace) body.insertBefore(document2.createTextNode(leadingWhitespace), body.childNodes[0] || null);
          if (NAMESPACE === HTML_NAMESPACE) return getElementsByTagName.call(doc, WHOLE_DOCUMENT ? "html" : "body")[0];
          return WHOLE_DOCUMENT ? doc.documentElement : body;
        };
        const _createNodeIterator = function _createNodeIterator2(root) {
          const doc = getOwnerDocument ? getOwnerDocument(root) : root.ownerDocument;
          return createNodeIterator.call(doc || root, root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_TEXT | NodeFilter.SHOW_PROCESSING_INSTRUCTION | NodeFilter.SHOW_CDATA_SECTION, null);
        };
        const _stripTemplateExpressions = function _stripTemplateExpressions2(value) {
          value = stringReplace(value, MUSTACHE_EXPR$1, " ");
          value = stringReplace(value, ERB_EXPR$1, " ");
          value = stringReplace(value, TMPLIT_EXPR$1, " ");
          return value;
        };
        const _scrubTemplateExpressions2 = function _scrubTemplateExpressions(node) {
          var _node$querySelectorAl;
          _scrubOwnCharacterData(node);
          const templates = (_node$querySelectorAl = node.querySelectorAll) === null || _node$querySelectorAl === void 0 ? void 0 : _node$querySelectorAl.call(node, "template");
          if (templates) arrayForEach(templates, (tmpl) => {
            if (_isDocumentFragment(tmpl.content)) _scrubTemplateExpressions2(tmpl.content);
          });
        };
        const _scrubOwnCharacterData = function _scrubOwnCharacterData2(node) {
          node.normalize();
          const doc = getOwnerDocument ? getOwnerDocument(node) : node.ownerDocument;
          const walker = createNodeIterator.call(doc || node, node, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_CDATA_SECTION | NodeFilter.SHOW_PROCESSING_INSTRUCTION, null);
          let currentNode = walker.nextNode();
          while (currentNode) {
            currentNode.data = _stripTemplateExpressions(currentNode.data);
            currentNode = walker.nextNode();
          }
        };
        const _isClobbered = function _isClobbered2(element) {
          const realTagName = getNodeName ? getNodeName(element) : null;
          if (typeof realTagName !== "string") return false;
          if (transformCaseFunc(realTagName) !== "form") return false;
          return typeof element.nodeName !== "string" || typeof element.textContent !== "string" || typeof element.removeChild !== "function" || element.attributes !== getAttributes(element) || typeof element.removeAttribute !== "function" || typeof element.removeAttributeNode !== "function" || typeof element.getAttributeNode !== "function" || typeof element.setAttribute !== "function" || typeof element.namespaceURI !== "string" || typeof element.insertBefore !== "function" || typeof element.hasChildNodes !== "function" || element.nodeType !== getNodeType(element) || element.childNodes !== getChildNodes(element);
        };
        const _isDocumentFragment = function _isDocumentFragment2(value) {
          if (!getNodeType || typeof value !== "object" || value === null) return false;
          try {
            return getNodeType(value) === NODE_TYPE.documentFragment;
          } catch (_) {
            return false;
          }
        };
        const _isNode = function _isNode2(value) {
          if (!getNodeType || typeof value !== "object" || value === null) return false;
          try {
            return typeof getNodeType(value) === "number";
          } catch (_) {
            return false;
          }
        };
        function _executeHooks(hooks2, currentNode, data) {
          if (hooks2.length === 0) return;
          arrayForEach(hooks2, (hook) => {
            hook.call(DOMPurify, currentNode, data, CONFIG);
          });
        }
        const _isUnsafeNode = function _isUnsafeNode2(currentNode, tagName) {
          if (SAFE_FOR_XML && currentNode.hasChildNodes() && !_isNode(currentNode.firstElementChild) && regExpTest(ELEMENT_MARKUP_PROBE, currentNode.textContent) && regExpTest(ELEMENT_MARKUP_PROBE, currentNode.innerHTML)) return true;
          if (SAFE_FOR_XML && LITERAL_TEXT_ELEMENTS[tagName] && _readNodeType(currentNode) === NODE_TYPE.element && _readNamespaceURI(currentNode) === HTML_NAMESPACE && (_isNode(currentNode.firstElementChild) || typeof currentNode.textContent === "string" && regExpTest(ELEMENT_MARKUP_PROBE, currentNode.textContent))) return true;
          if (currentNode.nodeType === NODE_TYPE.processingInstruction) return true;
          if (SAFE_FOR_XML && currentNode.nodeType === NODE_TYPE.comment && regExpTest(COMMENT_MARKUP_PROBE, currentNode.data)) return true;
          return false;
        };
        const _matchesNameCheck = function _matchesNameCheck2(check, name) {
          if (check instanceof RegExp) return regExpTest(check, name);
          if (check instanceof Function) {
            for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) args[_key - 2] = arguments[_key];
            return Boolean(check(name, ...args));
          }
          return false;
        };
        const _sanitizeDisallowedNode = function _sanitizeDisallowedNode2(currentNode, tagName, root) {
          if (!FORBID_TAGS[tagName] && _isBasicCustomElement(tagName) && _matchesNameCheck(CUSTOM_ELEMENT_HANDLING.tagNameCheck, tagName)) return false;
          if (KEEP_CONTENT && !FORBID_CONTENTS[tagName] && !FORBID_CONTENTS[stringToLowerCase(tagName)]) {
            const parentNode = getParentNode(currentNode);
            const childNodes = getChildNodes(currentNode);
            if (childNodes && parentNode) {
              const childCount = childNodes.length;
              for (let i = childCount - 1; i >= 0; --i) {
                const hoisted = currentNode === root ? cloneNode(childNodes[i], true) : childNodes[i];
                parentNode.insertBefore(hoisted, getNextSibling(currentNode));
              }
            }
          }
          _forceRemove(currentNode);
          return true;
        };
        const _forkSharedAllowlist = function _forkSharedAllowlist2(hookList, set, defaultSet, setConfigSet) {
          if (hookList.length === 0) return set;
          return set === defaultSet || set === setConfigSet ? clone(set) : set;
        };
        const _handleHookDetachedNode = function _handleHookDetachedNode2(currentNode, root) {
          if (currentNode === root || getParentNode(currentNode) !== null) return false;
          if (IN_PLACE) _neutralizeSubtree(currentNode);
          return true;
        };
        const _sanitizeElements = function _sanitizeElements2(currentNode, root) {
          _markVisited(currentNode);
          _executeHooks(hooks.beforeSanitizeElements, currentNode, null);
          if (_handleHookDetachedNode(currentNode, root)) return true;
          if (_isClobbered(currentNode)) {
            _forceRemove(currentNode);
            return true;
          }
          const tagName = transformCaseFunc(_readNodeName(currentNode));
          ALLOWED_TAGS = _forkSharedAllowlist(hooks.uponSanitizeElement, ALLOWED_TAGS, DEFAULT_ALLOWED_TAGS, SET_CONFIG_ALLOWED_TAGS);
          _executeHooks(hooks.uponSanitizeElement, currentNode, {
            tagName,
            allowedTags: ALLOWED_TAGS
          });
          if (_handleHookDetachedNode(currentNode, root)) return true;
          if (_isUnsafeNode(currentNode, tagName)) {
            _forceRemove(currentNode);
            return true;
          }
          if (FORBID_TAGS[tagName] || !(EXTRA_ELEMENT_HANDLING.tagCheck instanceof Function && EXTRA_ELEMENT_HANDLING.tagCheck(tagName)) && !ALLOWED_TAGS[tagName]) {
            const removed = _sanitizeDisallowedNode(currentNode, tagName, root);
            if (removed === false) {
              _executeHooks(hooks.afterSanitizeElements, currentNode, null);
              if (_handleHookDetachedNode(currentNode, root)) return true;
            }
            return removed;
          }
          if (_readNodeType(currentNode) === NODE_TYPE.element && !_checkValidNamespace(currentNode)) {
            _forceRemove(currentNode);
            return true;
          }
          if ((tagName === "noscript" || tagName === "noembed" || tagName === "noframes") && regExpTest(FALLBACK_TAG_CLOSE, currentNode.innerHTML)) {
            _forceRemove(currentNode);
            return true;
          }
          if (SAFE_FOR_TEMPLATES && currentNode.nodeType === NODE_TYPE.text) {
            const content = _stripTemplateExpressions(currentNode.textContent);
            if (currentNode.textContent !== content) {
              arrayPush(DOMPurify.removed, { element: currentNode.cloneNode() });
              currentNode.textContent = content;
            }
          }
          _executeHooks(hooks.afterSanitizeElements, currentNode, null);
          return _handleHookDetachedNode(currentNode, root);
        };
        const _isValidAttribute = function _isValidAttribute2(lcTag, lcName, value) {
          if (FORBID_ATTR[lcName]) return false;
          if (_isPatchLinkageAttribute(lcName, lcTag)) return false;
          if (SANITIZE_DOM && (lcName === "id" || lcName === "name") && (value in document2 || value in formElement)) return false;
          const nameIsPermitted = ALLOWED_ATTR[lcName] || EXTRA_ELEMENT_HANDLING.attributeCheck instanceof Function && EXTRA_ELEMENT_HANDLING.attributeCheck(lcName, lcTag);
          if (ALLOW_DATA_ATTR && regExpTest(DATA_ATTR$1, lcName)) return true;
          if (ALLOW_ARIA_ATTR && regExpTest(ARIA_ATTR$1, lcName)) return true;
          if (!nameIsPermitted) return _isBasicCustomElement(lcTag) && _matchesNameCheck(CUSTOM_ELEMENT_HANDLING.tagNameCheck, lcTag) && _matchesNameCheck(CUSTOM_ELEMENT_HANDLING.attributeNameCheck, lcName, lcTag) || lcName === "is" && CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements && _matchesNameCheck(CUSTOM_ELEMENT_HANDLING.tagNameCheck, value);
          if (URI_SAFE_ATTRIBUTES[lcName]) return true;
          if (regExpTest(IS_ALLOWED_URI$1, stringReplace(value, ATTR_WHITESPACE$1, ""))) return true;
          if ((lcName === "src" || lcName === "xlink:href" || lcName === "href") && lcTag !== "script" && stringIndexOf(value, "data:") === 0 && DATA_URI_TAGS[lcTag]) return true;
          if (ALLOW_UNKNOWN_PROTOCOLS && !regExpTest(IS_SCRIPT_OR_DATA$1, stringReplace(value, ATTR_WHITESPACE$1, ""))) return true;
          return !value;
        };
        const RESERVED_CUSTOM_ELEMENT_NAMES = addToSet({}, [
          "annotation-xml",
          "color-profile",
          "font-face",
          "font-face-format",
          "font-face-name",
          "font-face-src",
          "font-face-uri",
          "missing-glyph"
        ]);
        const _isBasicCustomElement = function _isBasicCustomElement2(tagName) {
          return !RESERVED_CUSTOM_ELEMENT_NAMES[stringToLowerCase(tagName)] && regExpTest(CUSTOM_ELEMENT$1, tagName);
        };
        const _applyTrustedTypesToAttribute = function _applyTrustedTypesToAttribute2(lcTag, lcName, namespaceURI, value) {
          if (trustedTypesPolicy && typeof trustedTypes === "object" && typeof trustedTypes.getAttributeType === "function" && !namespaceURI) switch (trustedTypes.getAttributeType(lcTag, lcName)) {
            case "TrustedHTML":
              return _createTrustedHTML(value);
            case "TrustedScriptURL":
              return _createTrustedScriptURL(value);
          }
          return value;
        };
        const _setAttributeValue = function _setAttributeValue2(currentNode, name, namespaceURI, value) {
          try {
            if (namespaceURI) currentNode.setAttributeNS(namespaceURI, name, value);
            else currentNode.setAttribute(name, value);
            if (_isClobbered(currentNode)) {
              _forceRemove(currentNode);
              return false;
            }
            return true;
          } catch (_) {
            _removeAttribute(name, currentNode);
            return false;
          }
        };
        const _isUnsafeAttributeValue = function _isUnsafeAttributeValue2(name, value) {
          if (SAFE_FOR_XML && regExpTest(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i, value)) return true;
          return stringToLowerCase(name) === "attributename" && stringMatch(value, "href") !== null;
        };
        const _sanitizeAttributes = function _sanitizeAttributes2(currentNode, root) {
          _executeHooks(hooks.beforeSanitizeAttributes, currentNode, null);
          if (_handleHookDetachedNode(currentNode, root)) return;
          const attributes = currentNode.attributes;
          if (!attributes || _isClobbered(currentNode)) return;
          ALLOWED_ATTR = _forkSharedAllowlist(hooks.uponSanitizeAttribute, ALLOWED_ATTR, DEFAULT_ALLOWED_ATTR, SET_CONFIG_ALLOWED_ATTR);
          const hookEvent = {
            attrName: "",
            attrValue: "",
            keepAttr: true,
            allowedAttributes: ALLOWED_ATTR,
            forceKeepAttr: void 0
          };
          let l = attributes.length;
          const lcTag = transformCaseFunc(currentNode.nodeName);
          while (l--) {
            const attr = attributes[l];
            const name = attr.name, namespaceURI = attr.namespaceURI, attrValue = attr.value;
            const lcName = transformCaseFunc(name);
            const initValue = attrValue;
            let value = name === "value" ? initValue : stringTrim(initValue);
            let recreatedNamedProp = false;
            hookEvent.attrName = lcName;
            hookEvent.attrValue = value;
            hookEvent.keepAttr = true;
            hookEvent.forceKeepAttr = void 0;
            _executeHooks(hooks.uponSanitizeAttribute, currentNode, hookEvent);
            value = hookEvent.attrValue;
            if (SANITIZE_NAMED_PROPS && (lcName === "id" || lcName === "name") && stringIndexOf(value, SANITIZE_NAMED_PROPS_PREFIX) !== 0) {
              _removeAttribute(name, currentNode, attr);
              value = SANITIZE_NAMED_PROPS_PREFIX + value;
              recreatedNamedProp = true;
            }
            if (_isUnsafeAttributeValue(name, value)) {
              _removeAttribute(name, currentNode, attr);
              continue;
            }
            if (hookEvent.forceKeepAttr) continue;
            if (!hookEvent.keepAttr) {
              _removeAttribute(name, currentNode, attr);
              continue;
            }
            if (!ALLOW_SELF_CLOSE_IN_ATTR && regExpTest(SELF_CLOSING_TAG, value)) {
              _removeAttribute(name, currentNode, attr);
              continue;
            }
            if (SAFE_FOR_TEMPLATES) value = _stripTemplateExpressions(value);
            if (!_isValidAttribute(lcTag, lcName, value)) {
              _removeAttribute(name, currentNode, attr);
              continue;
            }
            value = _applyTrustedTypesToAttribute(lcTag, lcName, namespaceURI, value);
            if (value !== initValue) {
              if (_setAttributeValue(currentNode, name, namespaceURI, value) && recreatedNamedProp) arrayPop(DOMPurify.removed);
            }
          }
          _executeHooks(hooks.afterSanitizeAttributes, currentNode, null);
          _handleHookDetachedNode(currentNode, root);
        };
        const _sanitizeShadowDOM2 = function _sanitizeShadowDOM(fragment) {
          let shadowNode = null;
          const shadowIterator = _createNodeIterator(fragment);
          _executeHooks(hooks.beforeSanitizeShadowDOM, fragment, null);
          while (shadowNode = shadowIterator.nextNode()) {
            _executeHooks(hooks.uponSanitizeShadowNode, shadowNode, null);
            _sanitizeElements(shadowNode, fragment);
            _sanitizeAttributes(shadowNode, fragment);
            if (_isDocumentFragment(shadowNode.content)) _sanitizeShadowDOM2(shadowNode.content);
            if (_readNodeType(shadowNode) === NODE_TYPE.element) {
              const innerSr = getShadowRoot(shadowNode);
              if (_isDocumentFragment(innerSr)) {
                _sanitizeAttachedShadowRoots(innerSr);
                _sanitizeShadowDOM2(innerSr);
              }
            }
          }
          if (SAFE_FOR_TEMPLATES) _scrubOwnCharacterData(fragment);
          _executeHooks(hooks.afterSanitizeShadowDOM, fragment, null);
        };
        const _sanitizeAttachedShadowRoots = function _sanitizeAttachedShadowRoots2(root) {
          const stack = [{
            node: root,
            shadow: null
          }];
          while (stack.length > 0) {
            const item = stack.pop();
            if (item.shadow) {
              _sanitizeShadowDOM2(item.shadow);
              continue;
            }
            const node = item.node;
            const isElement = _readNodeType(node) === NODE_TYPE.element;
            const childNodes = getChildNodes(node);
            if (childNodes) for (let i = childNodes.length - 1; i >= 0; --i) stack.push({
              node: childNodes[i],
              shadow: null
            });
            if (isElement) {
              const rootName = getNodeName ? getNodeName(node) : null;
              if (typeof rootName === "string" && transformCaseFunc(rootName) === "template") {
                const content = node.content;
                if (_isDocumentFragment(content)) stack.push({
                  node: content,
                  shadow: null
                });
              }
            }
            if (isElement) {
              const sr = getShadowRoot(node);
              if (_isDocumentFragment(sr)) stack.push({
                node: null,
                shadow: sr
              }, {
                node: sr,
                shadow: null
              });
            }
          }
        };
        DOMPurify.sanitize = function(dirty) {
          let cfg = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
          let body = null;
          let importedNode = null;
          let currentNode = null;
          let returnNode = null;
          IS_EMPTY_INPUT = !dirty;
          if (IS_EMPTY_INPUT) dirty = "<!-->";
          if (typeof dirty !== "string" && !_isNode(dirty)) {
            dirty = stringifyValue(dirty);
            if (typeof dirty !== "string") throw typeErrorCreate("dirty is not a string, aborting");
          }
          if (!DOMPurify.isSupported) return dirty;
          if (SET_CONFIG) {
            ALLOWED_TAGS = SET_CONFIG_ALLOWED_TAGS;
            ALLOWED_ATTR = SET_CONFIG_ALLOWED_ATTR;
          } else _parseConfig(cfg);
          if (hooks.uponSanitizeElement.length > 0 || hooks.uponSanitizeAttribute.length > 0) ALLOWED_TAGS = clone(ALLOWED_TAGS);
          if (hooks.uponSanitizeAttribute.length > 0) ALLOWED_ATTR = clone(ALLOWED_ATTR);
          DOMPurify.removed = [];
          const inPlace = IN_PLACE && typeof dirty !== "string" && _isNode(dirty);
          let inPlaceNodes = [];
          const outerVisited = IN_PLACE_VISITED;
          if (inPlace) {
            _neutralizePatchLinkage(dirty);
            const nn = _readNodeName(dirty);
            if (typeof nn === "string") {
              const tagName = transformCaseFunc(nn);
              if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
                _neutralizeRoot(dirty);
                throw typeErrorCreate("root node is forbidden and cannot be sanitized in-place");
              }
            }
            if (_isClobbered(dirty)) {
              _neutralizeRoot(dirty);
              throw typeErrorCreate("root node is clobbered and cannot be sanitized in-place");
            }
            inPlaceNodes = _collectLiveNodes(dirty);
            IN_PLACE_VISITED = setCreate();
          } else if (_isNode(dirty)) {
            body = _initDocument("<!---->");
            importedNode = body.ownerDocument.importNode(dirty, true);
            if (importedNode.nodeType === NODE_TYPE.element && importedNode.nodeName === "BODY") body = importedNode;
            else if (importedNode.nodeName === "HTML") body = importedNode;
            else body.appendChild(importedNode);
            _sanitizeAttachedShadowRoots(body);
          } else {
            if (!RETURN_DOM && !SAFE_FOR_TEMPLATES && !WHOLE_DOCUMENT && dirty.indexOf("<") === -1) return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? _createTrustedHTML(dirty) : dirty;
            body = _initDocument(dirty);
            if (!body) return RETURN_DOM ? null : RETURN_TRUSTED_TYPE ? emptyHTML : "";
          }
          if (body && FORCE_BODY) _forceRemove(body.firstChild);
          const walkRoot = inPlace ? dirty : body;
          try {
            if (inPlace) _sanitizeAttachedShadowRoots(dirty);
            const nodeIterator = _createNodeIterator(walkRoot);
            while (currentNode = nodeIterator.nextNode()) {
              _sanitizeElements(currentNode, walkRoot);
              _sanitizeAttributes(currentNode, walkRoot);
              if (_isDocumentFragment(currentNode.content)) _sanitizeShadowDOM2(currentNode.content);
            }
            if (inPlace) _sanitizeUnvisitedNodes(dirty, inPlaceNodes);
          } catch (error) {
            if (inPlace) {
              _neutralizeRoot(dirty);
              _neutralizeDiscarded(dirty, inPlaceNodes);
            }
            throw error;
          } finally {
            IN_PLACE_VISITED = outerVisited;
          }
          if (inPlace) {
            if (_neutralizeDiscarded(dirty, inPlaceNodes)) throw typeErrorCreate("a node selected for removal could not be safely returned; refusing to sanitize in place");
            if (SAFE_FOR_TEMPLATES) _scrubTemplateExpressions2(dirty);
            return dirty;
          }
          if (RETURN_DOM) {
            if (SAFE_FOR_TEMPLATES) _scrubTemplateExpressions2(body);
            if (RETURN_DOM_FRAGMENT) {
              returnNode = createDocumentFragment.call(body.ownerDocument);
              while (body.firstChild) returnNode.appendChild(body.firstChild);
            } else returnNode = body;
            if (ALLOWED_ATTR.shadowroot || ALLOWED_ATTR.shadowrootmode) returnNode = importNode.call(originalDocument, returnNode, true);
            return returnNode;
          }
          let serializedHTML = WHOLE_DOCUMENT ? body.outerHTML : body.innerHTML;
          if (WHOLE_DOCUMENT && ALLOWED_TAGS["!doctype"] && body.ownerDocument && body.ownerDocument.doctype && body.ownerDocument.doctype.name && regExpTest(DOCTYPE_NAME, body.ownerDocument.doctype.name)) serializedHTML = "<!DOCTYPE " + body.ownerDocument.doctype.name + ">\n" + serializedHTML;
          if (SAFE_FOR_TEMPLATES) serializedHTML = _stripTemplateExpressions(serializedHTML);
          return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? _createTrustedHTML(serializedHTML) : serializedHTML;
        };
        DOMPurify.setConfig = function() {
          let cfg = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
          _parseConfig(cfg);
          SET_CONFIG = true;
          SET_CONFIG_ALLOWED_TAGS = ALLOWED_TAGS;
          SET_CONFIG_ALLOWED_ATTR = ALLOWED_ATTR;
        };
        DOMPurify.clearConfig = function() {
          CONFIG = null;
          SET_CONFIG = false;
          SET_CONFIG_ALLOWED_TAGS = null;
          SET_CONFIG_ALLOWED_ATTR = null;
          trustedTypesPolicy = defaultTrustedTypesPolicy;
          emptyHTML = "";
        };
        DOMPurify.isValidAttribute = function(tag, attr, value) {
          if (!CONFIG) _parseConfig({});
          const lcTag = transformCaseFunc(tag);
          const lcName = transformCaseFunc(attr);
          if (typeof value === "string" && (_isUnsafeAttributeValue(attr, value) || !ALLOW_SELF_CLOSE_IN_ATTR && regExpTest(SELF_CLOSING_TAG, value))) return false;
          return _isValidAttribute(lcTag, lcName, value);
        };
        DOMPurify.addHook = function(entryPoint, hookFunction) {
          if (typeof hookFunction !== "function") return;
          if (!objectHasOwnProperty(hooks, entryPoint)) return;
          arrayPush(hooks[entryPoint], hookFunction);
        };
        DOMPurify.removeHook = function(entryPoint, hookFunction) {
          if (!objectHasOwnProperty(hooks, entryPoint)) return;
          if (hookFunction !== void 0) {
            const index = arrayLastIndexOf(hooks[entryPoint], hookFunction);
            return index === -1 ? void 0 : arraySplice(hooks[entryPoint], index, 1)[0];
          }
          return arrayPop(hooks[entryPoint]);
        };
        DOMPurify.removeHooks = function(entryPoint) {
          if (!objectHasOwnProperty(hooks, entryPoint)) return;
          hooks[entryPoint] = [];
        };
        DOMPurify.removeAllHooks = function() {
          hooks = _createHooksMap();
        };
        return DOMPurify;
      }
      var purify_default = createDOMPurify();
      module.exports = purify_default;
    }
  });

  var require_svg_element = __commonJS({
    "node_modules/@turbowarp/scratch-svg-renderer/src/svg-element.js"(exports, module) {
      var SvgElement = class _SvgElement {
        static get svg() {
          return "http://www.w3.org/2000/svg";
        }
        static get xmlns() {
          return "http://www.w3.org/2000/xmlns";
        }
        static get xlink() {
          return "http://www.w3.org/1999/xlink";
        }
        static attributeNamespace() {
          return {
            "href": _SvgElement.xlink,
            "xlink": _SvgElement.xmlns,
            "xmlns": `${_SvgElement.xmlns}/`,
            "xmlns:xlink": `${_SvgElement.xmlns}/`
          };
        }
        static create(tag, attributes, formatter) {
          return _SvgElement.set(document.createElementNS(_SvgElement.svg, tag), attributes, formatter);
        }
        static get(node, name) {
          const namespace = _SvgElement.attributeNamespace[name];
          const value = namespace ? node.getAttributeNS(namespace, name) : node.getAttribute(name);
          return value === "null" ? null : value;
        }
        static set(node, attributes, formatter) {
          for (const name in attributes) {
            let value = attributes[name];
            const namespace = _SvgElement.attributeNamespace[name];
            if (typeof value === "number" && formatter) {
              value = formatter.number(value);
            }
            if (namespace) {
              node.setAttributeNS(namespace, name, value);
            } else {
              node.setAttribute(name, value);
            }
          }
          return node;
        }
      };
      module.exports = SvgElement;
    }
  });

  var require_font_converter = __commonJS({
    "node_modules/@turbowarp/scratch-svg-renderer/src/font-converter.js"(exports, module) {
      var convertFonts = function(svgTag) {
        const textElements = [];
        const collectText = (domElement) => {
          if (domElement.localName === "text") {
            textElements.push(domElement);
          }
          for (let i = 0; i < domElement.childNodes.length; i++) {
            collectText(domElement.childNodes[i]);
          }
        };
        collectText(svgTag);
        for (const textElement of textElements) {
          if (!textElement.getAttribute("font-family") || textElement.getAttribute("font-family") === "Helvetica") {
            textElement.setAttribute("font-family", "Sans Serif");
          } else if (textElement.getAttribute("font-family") === "Mystery") {
            textElement.setAttribute("font-family", "Curly");
          } else if (textElement.getAttribute("font-family") === "Gloria") {
            textElement.setAttribute("font-family", "Handwriting");
          } else if (textElement.getAttribute("font-family") === "Donegal") {
            textElement.setAttribute("font-family", "Serif");
          }
        }
      };
      module.exports = convertFonts;
    }
  });

  var require_fixup_svg_string = __commonJS({
    "node_modules/@turbowarp/scratch-svg-renderer/src/fixup-svg-string.js"(exports, module) {
      module.exports = function(svgString) {
        const svgAttrs = svgString.match(/<svg [^>]*>/);
        if (svgAttrs && svgAttrs[0].indexOf("xmlns=") === -1) {
          svgString = svgString.replace("<svg ", '<svg xmlns="http://www.w3.org/2000/svg" ');
        }
        if (svgAttrs && svgAttrs[0].indexOf("&ns_") !== -1 && svgString.indexOf("<!DOCTYPE") === -1) {
          svgString = svgString.replace(
            svgAttrs[0],
            svgAttrs[0].replace(/&ns_[^;]+;/g, "http://ns.adobe.com/Extensibility/1.0/")
          );
        }
        if (svgString.includes("data:img/png")) {
          svgString = svgString.replace(
            /(<image[^>]+?xlink:href=["'])data:img\/png/g,
            ($0, $1) => `${$1}data:image/png`
          );
        }
        const xmlnsRegex = /(<[^>]+?xmlns:(?!xml=)[^ ]+=)"http:\/\/www.w3.org\/XML\/1998\/namespace"/g;
        if (svgString.match(xmlnsRegex) !== null) {
          svgString = svgString.replace(
            xmlnsRegex,
            ($0, $1) => `${$1}"http://dummy.namespace"`
          );
        }
        svgString = svgString.replace(/<(\/?)\s*svg:/g, "<$1");
        svgString = svgString.replace(/<metadata>[\s\S]*<\/metadata>/, "<metadata></metadata>");
        svgString = svgString.replace(/<script[\s\S]*>[\s\S]*<\/script>/, "<script><\/script>");
        return svgString;
      };
    }
  });

  var require_transformation_matrix_min = __commonJS({
    "node_modules/transformation-matrix/build-umd/transformation-matrix.min.js"(exports, module) {
      !(function(r, n) {
        "object" == typeof exports && "object" == typeof module ? module.exports = n() : "function" == typeof define && define.amd ? define([], n) : "object" == typeof exports ? exports.TransformationMatrix = n() : r.TransformationMatrix = n();
      })(window, function() {
        return (function(r) {
          var n = {};
          function t(e) {
            if (n[e]) return n[e].exports;
            var o = n[e] = { i: e, l: false, exports: {} };
            return r[e].call(o.exports, o, o.exports, t), o.l = true, o.exports;
          }
          return t.m = r, t.c = n, t.d = function(r2, n2, e) {
            t.o(r2, n2) || Object.defineProperty(r2, n2, { enumerable: true, get: e });
          }, t.r = function(r2) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(r2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(r2, "__esModule", { value: true });
          }, t.t = function(r2, n2) {
            if (1 & n2 && (r2 = t(r2)), 8 & n2) return r2;
            if (4 & n2 && "object" == typeof r2 && r2 && r2.__esModule) return r2;
            var e =  Object.create(null);
            if (t.r(e), Object.defineProperty(e, "default", { enumerable: true, value: r2 }), 2 & n2 && "string" != typeof r2) for (var o in r2) t.d(e, o, function(n3) {
              return r2[n3];
            }.bind(null, o));
            return e;
          }, t.n = function(r2) {
            var n2 = r2 && r2.__esModule ? function() {
              return r2.default;
            } : function() {
              return r2;
            };
            return t.d(n2, "a", n2), n2;
          }, t.o = function(r2, n2) {
            return Object.prototype.hasOwnProperty.call(r2, n2);
          }, t.p = "", t(t.s = 0);
        })([function(r, n, t) {
          "use strict";
          function e(r2, n2) {
            return Array.isArray(n2) ? [r2.a * n2[0] + r2.c * n2[1] + r2.e, r2.b * n2[0] + r2.d * n2[1] + r2.f] : { x: r2.a * n2.x + r2.c * n2.y + r2.e, y: r2.b * n2.x + r2.d * n2.y + r2.f };
          }
          function o(r2, n2) {
            return n2.map(function(n3) {
              return e(r2, n3);
            });
          }
          function u(r2) {
            return { a: parseFloat(r2.a), b: parseFloat(r2.b), c: parseFloat(r2.c), d: parseFloat(r2.d), e: parseFloat(r2.e), f: parseFloat(r2.f) };
          }
          t.r(n);
          var a = /^matrix\(\s*([0-9_+-.e]+)\s*,\s*([0-9_+-.e]+)\s*,\s*([0-9_+-.e]+)\s*,\s*([0-9_+-.e]+)\s*,\s*([0-9_+-.e]+)\s*,\s*([0-9_+-.e]+)\s*\)$/i;
          function i(r2) {
            var n2 = r2.match(a);
            if (null === n2 || n2.length < 7) throw new Error("'" + r2 + "' is not a matrix");
            return { a: parseFloat(n2[1]), b: parseFloat(n2[2]), c: parseFloat(n2[3]), d: parseFloat(n2[4]), e: parseFloat(n2[5]), f: parseFloat(n2[6]) };
          }
          function f() {
            return { a: 1, c: 0, e: 0, b: 0, d: 1, f: 0 };
          }
          function c(r2) {
            var n2 = r2.a, t2 = r2.b, e2 = r2.c, o2 = r2.d, u2 = r2.e, a2 = r2.f, i2 = n2 * o2 - t2 * e2;
            return { a: o2 / i2, b: t2 / -i2, c: e2 / -i2, d: n2 / i2, e: (o2 * u2 - e2 * a2) / -i2, f: (t2 * u2 - n2 * a2) / i2 };
          }
          var d = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(r2) {
            return typeof r2;
          } : function(r2) {
            return r2 && "function" == typeof Symbol && r2.constructor === Symbol && r2 !== Symbol.prototype ? "symbol" : typeof r2;
          }, s = function(r2) {
            return "number" == typeof r2 && !isNaN(r2) && isFinite(r2);
          }, l = function(r2) {
            return null != r2 && "object" === (void 0 === r2 ? "undefined" : d(r2));
          };
          function p(r2) {
            return l(r2) && r2.hasOwnProperty("a") && s(r2.a) && r2.hasOwnProperty("b") && s(r2.b) && r2.hasOwnProperty("c") && s(r2.c) && r2.hasOwnProperty("d") && s(r2.d) && r2.hasOwnProperty("e") && s(r2.e) && r2.hasOwnProperty("f") && s(r2.f);
          }
          function y(r2) {
            return void 0 === r2;
          }
          function b(r2) {
            return { a: 1, c: 0, e: r2, b: 0, d: 1, f: arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0 };
          }
          function v() {
            for (var r2 = arguments.length, n2 = Array(r2), t2 = 0; t2 < r2; t2++) n2[t2] = arguments[t2];
            var e2 = function(r3, n3) {
              return { a: r3.a * n3.a + r3.c * n3.b, c: r3.a * n3.c + r3.c * n3.d, e: r3.a * n3.e + r3.c * n3.f + r3.e, b: r3.b * n3.a + r3.d * n3.b, d: r3.b * n3.c + r3.d * n3.d, f: r3.b * n3.e + r3.d * n3.f + r3.f };
            };
            switch ((n2 = Array.isArray(n2[0]) ? n2[0] : n2).length) {
              case 0:
                throw new Error("no matrices provided");
              case 1:
                return n2[0];
              case 2:
                return e2(n2[0], n2[1]);
              default:
                var o2 = (function(r3) {
                  return Array.isArray(r3) ? r3 : Array.from(r3);
                })(n2), u2 = o2[0], a2 = o2[1], i2 = o2.slice(2), f2 = e2(u2, a2);
                return v.apply(void 0, [f2].concat((function(r3) {
                  if (Array.isArray(r3)) {
                    for (var n3 = 0, t3 = Array(r3.length); n3 < r3.length; n3++) t3[n3] = r3[n3];
                    return t3;
                  }
                  return Array.from(r3);
                })(i2)));
            }
          }
          function m() {
            return v.apply(void 0, arguments);
          }
          var h = Math.cos, x = Math.sin, g = Math.PI;
          function w(r2, n2, t2) {
            var e2 = h(r2), o2 = x(r2), u2 = { a: e2, c: -o2, e: 0, b: o2, d: e2, f: 0 };
            return y(n2) || y(t2) ? u2 : v([b(n2, t2), u2, b(-n2, -t2)]);
          }
          function P(r2) {
            var n2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : void 0, t2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : void 0;
            return w(r2 * g / 180, n2, t2);
          }
          function S(r2) {
            var n2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : void 0;
            return y(n2) && (n2 = r2), { a: r2, c: 0, e: 0, b: 0, d: n2, f: 0 };
          }
          function O(r2, n2) {
            return { a: 1, c: r2, e: 0, b: n2, d: 1, f: 0 };
          }
          var A = Math.tan;
          function F(r2, n2) {
            return { a: 1, c: A(r2), e: 0, b: A(n2), d: 1, f: 0 };
          }
          function M(r2, n2) {
            return F(r2 * Math.PI / 180, n2 * Math.PI / 180);
          }
          function j(r2) {
            return T(r2);
          }
          function _(r2) {
            return T(r2);
          }
          function T(r2) {
            return "matrix(" + r2.a + "," + r2.b + "," + r2.c + "," + r2.d + "," + r2.e + "," + r2.f + ")";
          }
          t.d(n, "applyToPoint", function() {
            return e;
          }), t.d(n, "applyToPoints", function() {
            return o;
          }), t.d(n, "fromObject", function() {
            return u;
          }), t.d(n, "fromString", function() {
            return i;
          }), t.d(n, "identity", function() {
            return f;
          }), t.d(n, "inverse", function() {
            return c;
          }), t.d(n, "isAffineMatrix", function() {
            return p;
          }), t.d(n, "rotate", function() {
            return w;
          }), t.d(n, "rotateDEG", function() {
            return P;
          }), t.d(n, "scale", function() {
            return S;
          }), t.d(n, "shear", function() {
            return O;
          }), t.d(n, "skew", function() {
            return F;
          }), t.d(n, "skewDEG", function() {
            return M;
          }), t.d(n, "toCSS", function() {
            return j;
          }), t.d(n, "toSVG", function() {
            return _;
          }), t.d(n, "toString", function() {
            return T;
          }), t.d(n, "transform", function() {
            return v;
          }), t.d(n, "compose", function() {
            return m;
          }), t.d(n, "translate", function() {
            return b;
          });
        }]);
      });
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
    "node_modules/@turbowarp/scratch-svg-renderer/src/util/log.js"(exports, module) {
      var nanolog = require_nanolog();
      nanolog.enable();
      module.exports = nanolog("scratch-svg-render");
    }
  });

  var require_transform_applier = __commonJS({
    "node_modules/@turbowarp/scratch-svg-renderer/src/transform-applier.js"(exports, module) {
      var Matrix = require_transformation_matrix_min();
      var SvgElement = require_svg_element();
      var log = require_log();
      var roundTo4Places = function(num) {
        return Math.round(num * 1e4) / 1e4;
      };
      var _parseTransform = function(domElement) {
        let matrix = Matrix.identity();
        const string = domElement.attributes && domElement.attributes.transform && domElement.attributes.transform.value;
        if (!string) return matrix;
        const transforms = string.split(/\)\s*/g);
        for (const transform of transforms) {
          if (!transform) break;
          const parts = transform.split(/\(\s*/);
          const command = parts[0].trim();
          const v = parts[1].split(/[\s,]+/g);
          for (let j = 0; j < v.length; j++) {
            v[j] = parseFloat(v[j]);
          }
          switch (command) {
            case "matrix":
              matrix = Matrix.compose(matrix, { a: v[0], b: v[1], c: v[2], d: v[3], e: v[4], f: v[5] });
              break;
            case "rotate":
              matrix = Matrix.compose(matrix, Matrix.rotateDEG(v[0], v[1] || 0, v[2] || 0));
              break;
            case "translate":
              matrix = Matrix.compose(matrix, Matrix.translate(v[0], v[1] || 0));
              break;
            case "scale":
              matrix = Matrix.compose(matrix, Matrix.scale(v[0], v[1] || v[0]));
              break;
            case "skewX":
              matrix = Matrix.compose(matrix, Matrix.skewDEG(v[0], 0));
              break;
            case "skewY":
              matrix = Matrix.compose(matrix, Matrix.skewDEG(0, v[0]));
              break;
            default:
              log.error(`Couldn't parse: ${command}`);
          }
        }
        return matrix;
      };
      var _getScaleFactor = function(matrix) {
        const a = matrix.a;
        const b = matrix.b;
        const c = matrix.c;
        const d = matrix.d;
        const det = a * d - b * c;
        if (a !== 0 || b !== 0) {
          const r = Math.sqrt(a * a + b * b);
          return { x: r, y: det / r };
        }
        if (c !== 0 || d !== 0) {
          const s = Math.sqrt(c * c + d * d);
          return { x: det / s, y: s };
        }
        return { x: 0, y: 0 };
      };
      var _calculateTransformedEllipse = function(radiusX, radiusY, theta, transform) {
        theta = -theta * Math.PI / 180;
        const a = transform.a;
        const b = -transform.c;
        const c = -transform.b;
        const d = transform.d;
        const det = a * d - b * c;
        if (det === 0) return null;
        const sinT = Math.sin(theta);
        const cosT = Math.cos(theta);
        const sin2T = Math.sin(2 * theta);
        const rotA = cosT * cosT / radiusX / radiusX + sinT * sinT / radiusY / radiusY;
        const rotB = sin2T / radiusX / radiusX - sin2T / radiusY / radiusY;
        const rotC = sinT * sinT / radiusX / radiusX + cosT * cosT / radiusY / radiusY;
        const A = rotA * d * d - rotB * d * c + rotC * c * c;
        const B = -2 * rotA * b * d + rotB * a * d + rotB * b * c - 2 * rotC * a * c;
        const C = rotA * b * b - rotB * a * b + rotC * a * a;
        const newRadiusXOverDet = Math.sqrt(2) * Math.sqrt(
          (A + C - Math.sqrt(A * A + B * B - 2 * A * C + C * C)) / (-B * B + 4 * A * C)
        );
        const newRadiusYOverDet = 1 / Math.sqrt(A + C - 1 / newRadiusXOverDet / newRadiusXOverDet);
        let temp = (A - 1 / newRadiusXOverDet / newRadiusXOverDet) / (1 / newRadiusYOverDet / newRadiusYOverDet - 1 / newRadiusXOverDet / newRadiusXOverDet);
        if (temp < 0 && Math.abs(temp) < 1e-8) temp = 0;
        temp = Math.sqrt(temp);
        if (Math.abs(1 - temp) < 1e-8) temp = 1;
        let newTheta = Math.asin(temp);
        temp = B / (1 / newRadiusXOverDet / newRadiusXOverDet - 1 / newRadiusYOverDet / newRadiusYOverDet);
        const newTheta2 = -newTheta;
        if (Math.abs(Math.sin(2 * newTheta2) - temp) < Math.abs(Math.sin(2 * newTheta) - temp)) {
          newTheta = newTheta2;
        }
        return {
          radiusX: newRadiusXOverDet * det,
          radiusY: newRadiusYOverDet * det,
          rotation: -newTheta * 180 / Math.PI
        };
      };
      var _transformPath = function(pathString, transform) {
        if (!transform || Matrix.toString(transform) === Matrix.toString(Matrix.identity())) return pathString;
        const parts = pathString && pathString.match(/[mlhvcsqtaz][^mlhvcsqtaz]*/ig);
        let coords;
        let relative = false;
        let previous;
        let control;
        let current = { x: 0, y: 0 };
        let start = { x: 0, y: 0 };
        let result = "";
        const getCoord = function(index, coord) {
          let val = +coords[index];
          if (relative) {
            val += current[coord];
          }
          return val;
        };
        const getPoint = function(index) {
          return { x: getCoord(index, "x"), y: getCoord(index + 1, "y") };
        };
        const getString = function(point) {
          const transformed = Matrix.applyToPoint(transform, point);
          return `${roundTo4Places(transformed.x)} ${roundTo4Places(transformed.y)} `;
        };
        for (let i = 0, l = parts && parts.length; i < l; i++) {
          const part = parts[i];
          const command = part[0];
          const lower = command.toLowerCase();
          coords = part.match(/[+-]?(?:\d*\.\d+|\d+\.?)(?:[eE][+-]?\d+)?/g);
          const length2 = coords && coords.length;
          relative = command === lower;
          if (previous === "z" && !/[mz]/.test(lower)) {
            result += `M ${current.x} ${current.y} `;
          }
          switch (lower) {
            case "m":
            case "l": {
              let move = lower === "m";
              for (let j = 0; j < length2; j += 2) {
                result += move ? "M " : "L ";
                current = getPoint(j);
                result += getString(current);
                if (move) {
                  start = current;
                  move = false;
                }
              }
              control = current;
              break;
            }
            case "h":
            case "v": {
              const coord = lower === "h" ? "x" : "y";
              current = { x: current.x, y: current.y };
              for (let j = 0; j < length2; j++) {
                current[coord] = getCoord(j, coord);
                result += `L ${getString(current)}`;
              }
              control = current;
              break;
            }
            case "c":
              for (let j = 0; j < length2; j += 6) {
                const handle1 = getPoint(j);
                control = getPoint(j + 2);
                current = getPoint(j + 4);
                result += `C ${getString(handle1)}${getString(control)}${getString(current)}`;
              }
              break;
            case "s":
              for (let j = 0; j < length2; j += 4) {
                const handle1 = /[cs]/.test(previous) ? { x: current.x * 2 - control.x, y: current.y * 2 - control.y } : current;
                control = getPoint(j);
                current = getPoint(j + 2);
                result += `C ${getString(handle1)}${getString(control)}${getString(current)}`;
                previous = lower;
              }
              break;
            case "q":
              for (let j = 0; j < length2; j += 4) {
                control = getPoint(j);
                current = getPoint(j + 2);
                result += `Q ${getString(control)}${getString(current)}`;
              }
              break;
            case "t":
              for (let j = 0; j < length2; j += 2) {
                control = /[qt]/.test(previous) ? { x: current.x * 2 - control.x, y: current.y * 2 - control.y } : current;
                current = getPoint(j);
                result += `Q ${getString(control)}${getString(current)}`;
                previous = lower;
              }
              break;
            case "a":
              for (let j = 0; j < length2; j += 7) {
                current = getPoint(j + 5);
                const rx = +coords[j];
                const ry = +coords[j + 1];
                const rotation = +coords[j + 2];
                const largeArcFlag = +coords[j + 3];
                let clockwiseFlag = +coords[j + 4];
                const newEllipse = _calculateTransformedEllipse(rx, ry, rotation, transform);
                const matrixScale = _getScaleFactor(transform);
                if (newEllipse) {
                  if (matrixScale.x > 0 && matrixScale.y < 0 || matrixScale.x < 0 && matrixScale.y > 0) {
                    clockwiseFlag = clockwiseFlag ^ 1;
                  }
                  result += `A ${roundTo4Places(Math.abs(newEllipse.radiusX))} ${roundTo4Places(Math.abs(newEllipse.radiusY))} ${roundTo4Places(newEllipse.rotation)} ${largeArcFlag} ${clockwiseFlag} ${getString(current)}`;
                } else {
                  result += `L ${getString(current)}`;
                }
              }
              break;
            case "z":
              result += `Z `;
              current = start;
              break;
          }
          previous = lower;
        }
        return result;
      };
      var GRAPHICS_ELEMENTS = ["circle", "ellipse", "image", "line", "path", "polygon", "polyline", "rect", "text", "use"];
      var CONTAINER_ELEMENTS = ["a", "defs", "g", "marker", "glyph", "missing-glyph", "pattern", "svg", "switch", "symbol"];
      var _isContainerElement = function(element) {
        return element.tagName && CONTAINER_ELEMENTS.includes(element.tagName.toLowerCase());
      };
      var _isGraphicsElement = function(element) {
        return element.tagName && GRAPHICS_ELEMENTS.includes(element.tagName.toLowerCase());
      };
      var _isPathWithTransformAndStroke = function(element, strokeWidth) {
        if (!element.attributes) return false;
        strokeWidth = element.attributes["stroke-width"] ? Number(element.attributes["stroke-width"].value) : Number(strokeWidth);
        return strokeWidth && element.tagName && element.tagName.toLowerCase() === "path" && element.attributes.d && element.attributes.d.value;
      };
      var _quadraticMean = function(a, b) {
        return Math.sqrt((a * a + b * b) / 2);
      };
      var _createGradient = function(gradientId, svgTag, bbox, matrix) {
        const getValue = function(node, name, isString, allowNull, allowPercent, defaultValue) {
          let value = SvgElement.get(node, name);
          let res;
          if (value === null) {
            if (defaultValue) {
              res = defaultValue;
              if (/%\s*$/.test(res)) {
                value = defaultValue;
                res = parseFloat(value);
              }
            } else if (allowNull) {
              res = null;
            } else if (isString) {
              res = "";
            } else {
              res = 0;
            }
          } else if (isString) {
            res = value;
          } else {
            res = parseFloat(value);
          }
          if (/%\s*$/.test(value)) {
            const size = allowPercent ? 1 : bbox[/x|^width/.test(name) ? "width" : "height"];
            return res / 100 * size;
          }
          return res;
        };
        const getPoint = function(node, x, y, allowNull, allowPercent, defaultX, defaultY) {
          x = getValue(node, x || "x", false, allowNull, allowPercent, defaultX);
          y = getValue(node, y || "y", false, allowNull, allowPercent, defaultY);
          return allowNull && (x === null || y === null) ? null : { x, y };
        };
        let defs = svgTag.getElementsByTagName("defs");
        if (defs.length === 0) {
          defs = SvgElement.create("defs");
          svgTag.appendChild(defs);
        } else {
          defs = defs[0];
        }
        const oldGradient = svgTag.getElementById(gradientId);
        if (!oldGradient) return;
        const radial = oldGradient.tagName.toLowerCase() === "radialgradient";
        const newGradient = svgTag.getElementById(gradientId).cloneNode(
          true
        );
        let matrixString = Matrix.toString(matrix);
        matrixString = matrixString.substring(8, matrixString.length - 1);
        const newGradientId = `${gradientId}-${matrixString}`;
        newGradient.setAttribute("id", newGradientId);
        if (svgTag.getElementById(newGradientId)) {
          return `url(#${newGradientId})`;
        }
        const scaleToBounds = getValue(newGradient, "gradientUnits", true) !== "userSpaceOnUse";
        let origin;
        let destination;
        let radius;
        let focal;
        if (radial) {
          origin = getPoint(newGradient, "cx", "cy", false, scaleToBounds, "50%", "50%");
          radius = getValue(newGradient, "r", false, false, scaleToBounds, "50%");
          focal = getPoint(newGradient, "fx", "fy", true, scaleToBounds);
        } else {
          origin = getPoint(newGradient, "x1", "y1", false, scaleToBounds);
          destination = getPoint(newGradient, "x2", "y2", false, scaleToBounds, "1");
          if (origin.x === destination.x && origin.y === destination.y) {
            const stops = newGradient.getElementsByTagName("stop");
            if (!stops.length || !stops[stops.length - 1].attributes || !stops[stops.length - 1].attributes["stop-color"]) {
              return null;
            }
            return stops[stops.length - 1].attributes["stop-color"].value;
          }
        }
        if (scaleToBounds) {
          const boundsMatrix = Matrix.compose(Matrix.translate(bbox.x, bbox.y), Matrix.scale(bbox.width, bbox.height));
          origin = Matrix.applyToPoint(boundsMatrix, origin);
          if (destination) destination = Matrix.applyToPoint(boundsMatrix, destination);
          if (radius) {
            radius = _quadraticMean(bbox.width, bbox.height) * radius;
          }
          if (focal) focal = Matrix.applyToPoint(boundsMatrix, focal);
        }
        if (radial) {
          origin = Matrix.applyToPoint(matrix, origin);
          const matrixScale = _getScaleFactor(matrix);
          radius = _quadraticMean(matrixScale.x, matrixScale.y) * radius;
          if (focal) focal = Matrix.applyToPoint(matrix, focal);
        } else {
          const dot = (a, b) => a.x * b.x + a.y * b.y;
          const multiply = (coefficient, v) => ({ x: coefficient * v.x, y: coefficient * v.y });
          const add = (a, b) => ({ x: a.x + b.x, y: a.y + b.y });
          const subtract = (a, b) => ({ x: a.x - b.x, y: a.y - b.y });
          let gradientPerpendicular = Math.abs(origin.x - destination.x) < 1e-8 ? add(origin, { x: 1, y: (origin.x - destination.x) / (destination.y - origin.y) }) : add(origin, { x: (destination.y - origin.y) / (origin.x - destination.x), y: 1 });
          gradientPerpendicular = Matrix.applyToPoint(matrix, gradientPerpendicular);
          origin = Matrix.applyToPoint(matrix, origin);
          destination = Matrix.applyToPoint(matrix, destination);
          const originToPerpendicular = subtract(gradientPerpendicular, origin);
          const originToDestination = subtract(destination, origin);
          const gradientDirection = Math.abs(originToPerpendicular.x) < 1e-8 ? { x: 1, y: -originToPerpendicular.x / originToPerpendicular.y } : { x: -originToPerpendicular.y / originToPerpendicular.x, y: 1 };
          const projectionCoeff = dot(originToDestination, gradientDirection) / dot(gradientDirection, gradientDirection);
          const projection = multiply(projectionCoeff, gradientDirection);
          destination = { x: origin.x + projection.x, y: origin.y + projection.y };
        }
        if (radial) {
          newGradient.setAttribute("cx", roundTo4Places(origin.x));
          newGradient.setAttribute("cy", roundTo4Places(origin.y));
          newGradient.setAttribute("r", roundTo4Places(radius));
          if (focal) {
            newGradient.setAttribute("fx", roundTo4Places(focal.x));
            newGradient.setAttribute("fy", roundTo4Places(focal.y));
          }
        } else {
          newGradient.setAttribute("x1", roundTo4Places(origin.x));
          newGradient.setAttribute("y1", roundTo4Places(origin.y));
          newGradient.setAttribute("x2", roundTo4Places(destination.x));
          newGradient.setAttribute("y2", roundTo4Places(destination.y));
        }
        newGradient.setAttribute("gradientUnits", "userSpaceOnUse");
        defs.appendChild(newGradient);
        return `url(#${newGradientId})`;
      };
      var _parseUrl = (value, windowRef) => {
        const match = value && value.match(/\((?:["'#]*)([^"')]+)/);
        const name = match && match[1];
        const res = name && windowRef ? (
          name.replace(`${windowRef.location.href.split("#")[0]}#`, "")
        ) : name;
        return res;
      };
      var pathBBoxCache =  Object.create(null);
      var svgSpotOuter = null;
      var svgSpotSVG = null;
      var svgSpotPath = null;
      var getPathBBox = (element, windowRef) => {
        const d = element.attributes.d.value;
        if (Object.prototype.hasOwnProperty.call(pathBBoxCache, d)) {
          return pathBBoxCache[d];
        }
        if (!svgSpotOuter) {
          const doc = windowRef.document;
          svgSpotOuter = doc.createElement("span");
          svgSpotSVG = doc.createElementNS(SvgElement.svg, "svg");
          svgSpotPath = doc.createElementNS(SvgElement.svg, "path");
          svgSpotOuter.className = "scratch-svg-renderer-bbox";
          svgSpotOuter.style.visibility = "hidden";
          svgSpotOuter.style.position = "absolute";
          svgSpotOuter.style.top = "-10000px";
          svgSpotOuter.style.left = "-10000px";
          svgSpotOuter.ariaHidden = true;
          svgSpotSVG.appendChild(svgSpotPath);
          svgSpotOuter.appendChild(svgSpotSVG);
          document.body.appendChild(svgSpotOuter);
        }
        svgSpotPath.setAttribute("d", d);
        const bbox = svgSpotSVG.getBBox();
        pathBBoxCache[d] = bbox;
        return bbox;
      };
      var transformStrokeWidths = function(svgTag, windowRef, bboxForTesting) {
        const inherited = Matrix.identity();
        const applyTransforms = (element, matrix, strokeWidth, fill, stroke) => {
          if (_isContainerElement(element)) {
            if (element.attributes["stroke-width"]) {
              strokeWidth = element.attributes["stroke-width"].value;
            }
            if (element.attributes) {
              if (element.attributes.fill) fill = element.attributes.fill.value;
              if (element.attributes.stroke) stroke = element.attributes.stroke.value;
            }
            for (let i = 0; i < element.childNodes.length; i++) {
              applyTransforms(
                element.childNodes[i],
                Matrix.compose(matrix, _parseTransform(element)),
                strokeWidth,
                fill,
                stroke
              );
            }
            element.removeAttribute("transform");
            element.removeAttribute("stroke-width");
            element.removeAttribute("fill");
            element.removeAttribute("stroke");
          } else if (_isPathWithTransformAndStroke(element, strokeWidth)) {
            if (element.attributes["stroke-width"]) {
              strokeWidth = element.attributes["stroke-width"].value;
            }
            if (element.attributes.fill) fill = element.attributes.fill.value;
            if (element.attributes.stroke) stroke = element.attributes.stroke.value;
            matrix = Matrix.compose(matrix, _parseTransform(element));
            if (Matrix.toString(matrix) === Matrix.toString(Matrix.identity())) {
              element.removeAttribute("transform");
              element.setAttribute("stroke-width", strokeWidth);
              if (fill) element.setAttribute("fill", fill);
              if (stroke) element.setAttribute("stroke", stroke);
              return;
            }
            const fillGradientId = _parseUrl(fill, windowRef);
            const strokeGradientId = _parseUrl(stroke, windowRef);
            if (fillGradientId || strokeGradientId) {
              const bbox = bboxForTesting || getPathBBox(element, windowRef);
              if (fillGradientId) {
                const newFillRef = _createGradient(fillGradientId, svgTag, bbox, matrix);
                if (newFillRef) fill = newFillRef;
              }
              if (strokeGradientId) {
                const newStrokeRef = _createGradient(strokeGradientId, svgTag, bbox, matrix);
                if (newStrokeRef) stroke = newStrokeRef;
              }
            }
            element.setAttribute("d", _transformPath(element.attributes.d.value, matrix));
            element.removeAttribute("transform");
            const matrixScale = _getScaleFactor(matrix);
            element.setAttribute("stroke-width", _quadraticMean(matrixScale.x, matrixScale.y) * strokeWidth);
            if (fill) element.setAttribute("fill", fill);
            if (stroke) element.setAttribute("stroke", stroke);
          } else if (_isGraphicsElement(element)) {
            if (strokeWidth && !element.attributes["stroke-width"]) {
              element.setAttribute("stroke-width", strokeWidth);
            }
            if (fill && !element.attributes.fill) {
              element.setAttribute("fill", fill);
            }
            if (stroke && !element.attributes.stroke) {
              element.setAttribute("stroke", stroke);
            }
            matrix = Matrix.compose(matrix, _parseTransform(element));
            if (Matrix.toString(matrix) === Matrix.toString(Matrix.identity())) {
              element.removeAttribute("transform");
            } else {
              element.setAttribute("transform", Matrix.toString(matrix));
            }
          }
        };
        applyTransforms(
          svgTag,
          inherited,
          1
        );
      };
      module.exports = transformStrokeWidths;
    }
  });

  var require_tw_svg_sandbox = __commonJS({
    "node_modules/@turbowarp/scratch-svg-renderer/src/tw-svg-sandbox.js"(exports, module) {
      var iframe = null;
      var getSandbox = () => {
        if (!iframe) {
          iframe = document.createElement("iframe");
          iframe.className = "scratch-svg-renderer-sandbox";
          iframe.sandbox = "allow-same-origin";
          iframe.style.position = "absolute";
          iframe.style.top = "-10000px";
          iframe.style.left = "-10000px";
          iframe.style.width = "0";
          iframe.style.height = "0";
          iframe.style.opacity = "0";
          iframe.style.visibility = "hidden";
          iframe.style.pointerEvents = "none";
          iframe.tabIndex = -1;
          iframe.ariaHidden = true;
          document.body.appendChild(iframe);
          iframe.contentDocument.open();
          iframe.contentDocument.write(`
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8">
                <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline' data:; font-src data:; img-src data:">
            </head>
            <body></body>
        </html>
        `);
          iframe.contentDocument.close();
        }
        return iframe.contentDocument.body;
      };
      module.exports = getSandbox;
    }
  });

  var require_load_svg_string = __commonJS({
    "node_modules/@turbowarp/scratch-svg-renderer/src/load-svg-string.js"(exports, module) {
      var DOMPurify = require_purify_cjs();
      var SvgElement = require_svg_element();
      var convertFonts = require_font_converter();
      var fixupSvgString = require_fixup_svg_string();
      var transformStrokeWidths = require_transform_applier();
      var getSandbox = require_tw_svg_sandbox();
      var collectElements = (svgTag, tagName) => {
        const elts = [];
        const collectElementsInner = (domElement) => {
          if ((domElement.localName === tagName || typeof tagName === "undefined") && domElement.getAttribute) {
            elts.push(domElement);
          }
          for (let i = 0; i < domElement.childNodes.length; i++) {
            collectElementsInner(domElement.childNodes[i]);
          }
        };
        collectElementsInner(svgTag);
        return elts;
      };
      var transformGradients = (svgTag) => {
        const linearGradientElements = collectElements(svgTag, "linearGradient");
        for (const gradientElement of linearGradientElements) {
          if (!gradientElement.getAttribute("x2")) {
            gradientElement.setAttribute("x2", "0");
          }
        }
      };
      var transformImages = (svgTag) => {
        const imageElements = collectElements(svgTag, "image");
        const pixelatedImages = "image-rendering: optimizespeed; image-rendering: pixelated;";
        for (const elt of imageElements) {
          if (elt.getAttribute("style")) {
            elt.setAttribute(
              "style",
              `${pixelatedImages} ${elt.getAttribute("style")}`
            );
          } else {
            elt.setAttribute("style", pixelatedImages);
          }
        }
      };
      var transformText = (svgTag) => {
        const textElements = [];
        const collectText = (domElement) => {
          if (domElement.localName === "text") {
            textElements.push(domElement);
          }
          for (let i = 0; i < domElement.childNodes.length; i++) {
            collectText(domElement.childNodes[i]);
          }
        };
        collectText(svgTag);
        convertFonts(svgTag);
        for (const textElement of textElements) {
          textElement.removeAttribute("x");
          textElement.removeAttribute("y");
          textElement.setAttribute("alignment-baseline", "text-before-edge");
          textElement.setAttribute("xml:space", "preserve");
          if (!textElement.getAttribute("font-size")) {
            textElement.setAttribute("font-size", "18");
          }
          let text = textElement.textContent;
          const fontSize = parseFloat(textElement.getAttribute("font-size"));
          const tx = 2;
          let ty = 0;
          let spacing = 1.2;
          if (textElement.getAttribute("font-family") === "Handwriting") {
            spacing = 2;
            ty = -11 * fontSize / 22;
          } else if (textElement.getAttribute("font-family") === "Scratch") {
            spacing = 0.89;
            ty = -3 * fontSize / 22;
          } else if (textElement.getAttribute("font-family") === "Curly") {
            spacing = 1.38;
            ty = -6 * fontSize / 22;
          } else if (textElement.getAttribute("font-family") === "Marker") {
            spacing = 1.45;
            ty = -6 * fontSize / 22;
          } else if (textElement.getAttribute("font-family") === "Sans Serif") {
            spacing = 1.13;
            ty = -3 * fontSize / 22;
          } else if (textElement.getAttribute("font-family") === "Serif") {
            spacing = 1.25;
            ty = -4 * fontSize / 22;
          }
          if (textElement.transform.baseVal.numberOfItems === 0) {
            const transform = svgTag.createSVGTransform();
            textElement.transform.baseVal.appendItem(transform);
          }
          const mtx = textElement.transform.baseVal.getItem(0).matrix;
          mtx.e += mtx.a * tx + mtx.c * ty;
          mtx.f += mtx.b * tx + mtx.d * ty;
          if (text && textElement.childElementCount === 0) {
            textElement.textContent = "";
            const lines = text.split("\n");
            text = "";
            for (const line of lines) {
              const tspanNode = SvgElement.create("tspan");
              tspanNode.setAttribute("x", "0");
              tspanNode.setAttribute("style", "white-space: pre");
              tspanNode.setAttribute("dy", `${spacing}em`);
              tspanNode.textContent = line ? line : " ";
              textElement.appendChild(tspanNode);
            }
          }
        }
      };
      var findLargestStrokeWidth = (rootNode) => {
        let largestStrokeWidth = 0;
        const collectStrokeWidths = (domElement) => {
          if (domElement.getAttribute) {
            if (domElement.getAttribute("stroke")) {
              largestStrokeWidth = Math.max(largestStrokeWidth, 1);
            }
            if (domElement.getAttribute("stroke-width")) {
              largestStrokeWidth = Math.max(
                largestStrokeWidth,
                Number(domElement.getAttribute("stroke-width")) || 0
              );
            }
          }
          for (let i = 0; i < domElement.childNodes.length; i++) {
            collectStrokeWidths(domElement.childNodes[i]);
          }
        };
        collectStrokeWidths(rootNode);
        return largestStrokeWidth;
      };
      var transformMeasurements = (svgTag) => {
        const sandbox = getSandbox();
        const svgSpot = document.createElement("span");
        const rawValue = svgTag.outerHTML;
        const sanitizedValue = DOMPurify.sanitize(rawValue, {
          USE_PROFILES: { svg: true },
          FORBID_TAGS: ["a", "audio", "canvas", "video"],
          ADD_DATA_URI_TAGS: ["image"]
        });
        let bbox;
        try {
          svgSpot.innerHTML = sanitizedValue;
          sandbox.appendChild(svgSpot);
          bbox = svgSpot.children[0].getBBox();
        } finally {
          sandbox.removeChild(svgSpot);
        }
        let halfStrokeWidth;
        if (bbox.width === 0 || bbox.height === 0) {
          halfStrokeWidth = 0;
        } else {
          halfStrokeWidth = findLargestStrokeWidth(svgTag) / 2;
        }
        const width = bbox.width + halfStrokeWidth * 2;
        const height = bbox.height + halfStrokeWidth * 2;
        const x = bbox.x - halfStrokeWidth;
        const y = bbox.y - halfStrokeWidth;
        svgTag.setAttribute("width", width);
        svgTag.setAttribute("height", height);
        svgTag.setAttribute(
          "viewBox",
          `${x} ${y} ${width} ${height}`
        );
      };
      var setGradientStrokeRoundedness = (svgTag) => {
        const elements = collectElements(svgTag);
        for (const elt of elements) {
          if (!elt.style) continue;
          const stroke = elt.style.stroke || elt.getAttribute("stroke");
          if (stroke && stroke.match(/^url\(#.*\)$/)) {
            elt.style["stroke-linejoin"] = "round";
            elt.style["stroke-linecap"] = "round";
          }
        }
      };
      var normalizeSvg = (svgTag, fromVersion2) => {
        if (fromVersion2) {
          transformGradients(svgTag);
        }
        transformStrokeWidths(svgTag, window);
        transformImages(svgTag);
        if (fromVersion2) {
          transformText(svgTag);
          transformMeasurements(svgTag);
          setGradientStrokeRoundedness(svgTag);
        } else if (!svgTag.getAttribute("viewBox")) {
          transformMeasurements(svgTag);
        } else if (!svgTag.getAttribute("width") || !svgTag.getAttribute("height")) {
          svgTag.setAttribute("width", svgTag.viewBox.baseVal.width);
          svgTag.setAttribute("height", svgTag.viewBox.baseVal.height);
        }
      };
      var loadSvgString = (svgString, fromVersion2) => {
        const parser = new DOMParser();
        svgString = fixupSvgString(svgString);
        const svgDom = parser.parseFromString(svgString, "text/xml");
        if (svgDom.childNodes.length < 1 || svgDom.documentElement.localName !== "svg") {
          throw new Error("Document does not appear to be SVG.");
        }
        const svgTag = svgDom.documentElement;
        normalizeSvg(svgTag, fromVersion2);
        return svgTag;
      };
      module.exports = loadSvgString;
    }
  });

  var require_empty = __commonJS({
    "hx/empty.js"(exports, module) {
      module.exports = {};
    }
  });

  var require_font_inliner = __commonJS({
    "node_modules/@turbowarp/scratch-svg-renderer/src/font-inliner.js"(exports, module) {
      var getFonts = require_empty();
      var xmlEscape = (str) => str.replace(/[<>&'"]/g, (c) => {
        switch (c) {
          case "<":
            return "&lt;";
          case ">":
            return "&gt;";
          case "&":
            return "&amp;";
          case "'":
            return "&apos;";
          case '"':
            return "&quot;";
        }
      });
      var inlineSvgFonts = function(svgString, customFontFaces = {}) {
        if (typeof svgString !== "string") {
          throw new Error("SVG to be inlined is not a string");
        }
        const FONTS = {};
        if (customFontFaces && typeof customFontFaces === "object") {
          for (const [families, style] of Object.entries(customFontFaces)) {
            FONTS[xmlEscape(families)] = style;
          }
        }
        try {
          Object.assign(FONTS, getFonts());
        } catch (e) {
        }
        const fontsNeeded =  new Set();
        const fontRegex = /font-family="([^"]*)"/g;
        let matches = fontRegex.exec(svgString);
        while (matches) {
          fontsNeeded.add(matches[1]);
          matches = fontRegex.exec(svgString);
        }
        if (fontsNeeded.size > 0) {
          let str = "<defs><style>";
          for (const font of fontsNeeded) {
            if (Object.prototype.hasOwnProperty.call(FONTS, font)) {
              str += `${FONTS[font]}`;
            }
          }
          str += "</style></defs>";
          svgString = svgString.replace(/<svg[^>]*>/, `$&${str}`);
          return svgString;
        }
        return svgString;
      };
      module.exports = inlineSvgFonts;
    }
  });

  var require_serialize_svg_to_string = __commonJS({
    "node_modules/@turbowarp/scratch-svg-renderer/src/serialize-svg-to-string.js"(exports, module) {
      var inlineSvgFonts = require_font_inliner();
      var serializeSvgToString = (svgTag, injectFonts) => {
        const serializer = new XMLSerializer();
        let string = serializer.serializeToString(svgTag);
        if (injectFonts) {
          string = inlineSvgFonts(string, injectFonts);
        }
        return string;
      };
      module.exports = serializeSvgToString;
    }
  });

  var require_svg_renderer = __commonJS({
    "node_modules/@turbowarp/scratch-svg-renderer/src/svg-renderer.js"(exports, module) {
      var loadSvgString = require_load_svg_string();
      var serializeSvgToString = require_serialize_svg_to_string();
      var SvgRenderer = class {
        constructor(canvas) {
          this._canvas = canvas || document.createElement("canvas");
          this._context = this._canvas.getContext("2d");
          this._measurements = { x: 0, y: 0, width: 0, height: 0 };
          this._cachedImage = null;
          this.loaded = false;
        }
        get canvas() {
          return this._canvas;
        }
        get size() {
          return [this._measurements.width, this._measurements.height];
        }
        get viewOffset() {
          return [this._measurements.x, this._measurements.y];
        }
        loadString(svgString, fromVersion2) {
          this._cachedImage = null;
          const svgTag = loadSvgString(svgString, fromVersion2);
          this._svgTag = svgTag;
          this._measurements = {
            width: svgTag.viewBox.baseVal.width,
            height: svgTag.viewBox.baseVal.height,
            x: svgTag.viewBox.baseVal.x,
            y: svgTag.viewBox.baseVal.y
          };
        }
        loadSVG(svgString, fromVersion2, onFinish) {
          this.loadString(svgString, fromVersion2);
          this._createSVGImage(onFinish);
        }
        _createSVGImage(onFinish) {
          if (this._cachedImage === null) this._cachedImage = new Image();
          const img = this._cachedImage;
          img.onload = () => {
            this.loaded = true;
            if (onFinish) onFinish();
          };
          const svgText = this.toString(
            true
          );
          img.src = `data:image/svg+xml;utf8,${encodeURIComponent(svgText)}`;
          this.loaded = false;
        }
        toString(shouldInjectFonts) {
          return serializeSvgToString(this._svgTag, shouldInjectFonts);
        }
        draw(scale) {
          if (!this.loaded) throw new Error("SVG image has not finished loading");
          this._drawFromImage(scale);
        }
        _drawFromImage(scale) {
          if (this._cachedImage === null) return;
          const ratio = Number.isFinite(scale) ? scale : 1;
          const bbox = this._measurements;
          this._canvas.width = bbox.width * ratio;
          this._canvas.height = bbox.height * ratio;
          if (this._canvas.width <= 0 || this._canvas.height <= 0 || this._cachedImage.naturalWidth <= 0 || this._cachedImage.naturalHeight <= 0) return;
          this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
          this._context.setTransform(ratio, 0, 0, ratio, 0, 0);
          this._context.drawImage(this._cachedImage, 0, 0);
        }
      };
      module.exports = SvgRenderer;
    }
  });

  var require_base64_js = __commonJS({
    "node_modules/@turbowarp/scratch-svg-renderer/node_modules/base64-js/index.js"(exports) {
      "use strict";
      exports.byteLength = byteLength;
      exports.toByteArray = toByteArray;
      exports.fromByteArray = fromByteArray;
      var lookup = [];
      var revLookup = [];
      var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
      var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      for (i = 0, len = code.length; i < len; ++i) {
        lookup[i] = code[i];
        revLookup[code.charCodeAt(i)] = i;
      }
      var i;
      var len;
      revLookup["-".charCodeAt(0)] = 62;
      revLookup["_".charCodeAt(0)] = 63;
      function placeHoldersCount(b64) {
        var len2 = b64.length;
        if (len2 % 4 > 0) {
          throw new Error("Invalid string. Length must be a multiple of 4");
        }
        return b64[len2 - 2] === "=" ? 2 : b64[len2 - 1] === "=" ? 1 : 0;
      }
      function byteLength(b64) {
        return b64.length * 3 / 4 - placeHoldersCount(b64);
      }
      function toByteArray(b64) {
        var i2, l, tmp, placeHolders, arr;
        var len2 = b64.length;
        placeHolders = placeHoldersCount(b64);
        arr = new Arr(len2 * 3 / 4 - placeHolders);
        l = placeHolders > 0 ? len2 - 4 : len2;
        var L = 0;
        for (i2 = 0; i2 < l; i2 += 4) {
          tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
          arr[L++] = tmp >> 16 & 255;
          arr[L++] = tmp >> 8 & 255;
          arr[L++] = tmp & 255;
        }
        if (placeHolders === 2) {
          tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
          arr[L++] = tmp & 255;
        } else if (placeHolders === 1) {
          tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
          arr[L++] = tmp >> 8 & 255;
          arr[L++] = tmp & 255;
        }
        return arr;
      }
      function tripletToBase64(num) {
        return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
      }
      function encodeChunk(uint8, start, end) {
        var tmp;
        var output = [];
        for (var i2 = start; i2 < end; i2 += 3) {
          tmp = (uint8[i2] << 16) + (uint8[i2 + 1] << 8) + uint8[i2 + 2];
          output.push(tripletToBase64(tmp));
        }
        return output.join("");
      }
      function fromByteArray(uint8) {
        var tmp;
        var len2 = uint8.length;
        var extraBytes = len2 % 3;
        var output = "";
        var parts = [];
        var maxChunkLength = 16383;
        for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) {
          parts.push(encodeChunk(uint8, i2, i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength));
        }
        if (extraBytes === 1) {
          tmp = uint8[len2 - 1];
          output += lookup[tmp >> 2];
          output += lookup[tmp << 4 & 63];
          output += "==";
        } else if (extraBytes === 2) {
          tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
          output += lookup[tmp >> 10];
          output += lookup[tmp >> 4 & 63];
          output += lookup[tmp << 2 & 63];
          output += "=";
        }
        parts.push(output);
        return parts.join("");
      }
    }
  });

  var require_bitmap_adapter = __commonJS({
    "node_modules/@turbowarp/scratch-svg-renderer/src/bitmap-adapter.js"(exports, module) {
      var base64js = require_base64_js();
      var BitmapAdapter = class {
        constructor(makeImage, makeCanvas) {
          this._makeImage = makeImage ? makeImage : () => new Image();
          this._makeCanvas = makeCanvas ? makeCanvas : () => document.createElement("canvas");
          this.stageWidth = 480;
          this.stageHeight = 360;
        }
        setStageSize(width, height) {
          this.stageWidth = width;
          this.stageHeight = height;
        }
        resize(image, newWidth, newHeight) {
          const stretchWidthCanvas = this._makeCanvas();
          stretchWidthCanvas.width = newWidth;
          stretchWidthCanvas.height = image.height;
          let context = stretchWidthCanvas.getContext("2d");
          context.imageSmoothingEnabled = false;
          context.drawImage(image, 0, 0, stretchWidthCanvas.width, stretchWidthCanvas.height);
          const stretchHeightCanvas = this._makeCanvas();
          stretchHeightCanvas.width = newWidth;
          stretchHeightCanvas.height = newHeight;
          context = stretchHeightCanvas.getContext("2d");
          context.imageSmoothingEnabled = false;
          context.drawImage(stretchWidthCanvas, 0, 0, stretchHeightCanvas.width, stretchHeightCanvas.height);
          return stretchHeightCanvas;
        }
        convertResolution1Bitmap(dataURI, callback) {
          const image = this._makeImage();
          image.src = dataURI;
          image.onload = () => {
            callback(null, this.resize(image, image.width * 2, image.height * 2).toDataURL());
          };
          image.onerror = () => {
            callback("Image load failed");
          };
        }
        getResizedWidthHeight(oldWidth, oldHeight) {
          const STAGE_WIDTH = this.stageWidth;
          const STAGE_HEIGHT = this.stageHeight;
          const STAGE_RATIO = STAGE_WIDTH / STAGE_HEIGHT;
          if (oldWidth <= STAGE_WIDTH && oldHeight <= STAGE_HEIGHT) {
            return { width: oldWidth * 2, height: oldHeight * 2 };
          }
          if (oldWidth <= STAGE_WIDTH * 2 && oldHeight <= STAGE_HEIGHT * 2) {
            return { width: oldWidth, height: oldHeight };
          }
          const imageRatio = oldWidth / oldHeight;
          if (imageRatio >= STAGE_RATIO) {
            return { width: STAGE_WIDTH * 2, height: STAGE_WIDTH * 2 / imageRatio };
          }
          return { width: STAGE_HEIGHT * 2 * imageRatio, height: STAGE_HEIGHT * 2 };
        }
        importBitmap(fileData, fileType) {
          let dataURI = fileData;
          if (fileData instanceof ArrayBuffer) {
            dataURI = this.convertBinaryToDataURI(fileData, fileType);
          }
          return new Promise((resolve, reject) => {
            const image = this._makeImage();
            image.src = dataURI;
            image.onload = () => {
              const newSize = this.getResizedWidthHeight(image.width, image.height);
              const resizedDataURI = this.resize(image, newSize.width, newSize.height).toDataURL();
              resolve(this.convertDataURIToBinary(resizedDataURI));
            };
            image.onerror = () => {
              reject("Image load failed");
            };
          });
        }
        convertDataURIToBinary(dataURI) {
          const BASE64_MARKER = ";base64,";
          const base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
          const base64 = dataURI.substring(base64Index);
          const raw = window.atob(base64);
          const rawLength = raw.length;
          const array = new Uint8Array(new ArrayBuffer(rawLength));
          for (let i = 0; i < rawLength; i++) {
            array[i] = raw.charCodeAt(i);
          }
          return array;
        }
        convertBinaryToDataURI(arrayBuffer, contentType) {
          return `data:${contentType};base64,${base64js.fromByteArray(new Uint8Array(arrayBuffer))}`;
        }
      };
      module.exports = BitmapAdapter;
    }
  });

  var require_sanitize_svg = __commonJS({
    "node_modules/@turbowarp/scratch-svg-renderer/src/sanitize-svg.js"(exports, module) {
      var fixupSvgString = require_fixup_svg_string();
      var DOMPurify = require_purify_cjs();
      var sanitizeSvg = {};
      sanitizeSvg.sanitizeByteStream = function(rawData) {
        const decoder = new TextDecoder();
        const encoder = new TextEncoder();
        const sanitizedText = sanitizeSvg.sanitizeSvgText(decoder.decode(rawData));
        return encoder.encode(sanitizedText);
      };
      var HTML_COMMENT_START = `<!${"-".repeat(2)}`;
      var HTML_COMMENT_END = `${"-".repeat(2)}>`;
      var extraMetadataRegex = new RegExp(
        `${HTML_COMMENT_START}rotationCenter:(-?[\\d\\.]+):(-?[\\d\\.]+)${HTML_COMMENT_END}$`
      );
      sanitizeSvg.sanitizeSvgText = function(rawSvgText) {
        let sanitizedText = DOMPurify.sanitize(rawSvgText, {
          USE_PROFILES: { svg: true }
        });
        const badTag = sanitizedText.indexOf("]&gt;");
        if (badTag >= 0) {
          sanitizedText = sanitizedText.substring(5, sanitizedText.length);
        }
        sanitizedText = fixupSvgString(sanitizedText);
        const extraMetadataMatch = rawSvgText.match(extraMetadataRegex);
        if (extraMetadataMatch) {
          sanitizedText += extraMetadataMatch[0];
        }
        return sanitizedText;
      };
      module.exports = sanitizeSvg;
    }
  });

  var require_tw_fix_for_vanilla = __commonJS({
    "node_modules/@turbowarp/scratch-svg-renderer/src/tw-fix-for-vanilla.js"(exports, module) {
      var removeWidthAndHeight100Percent = (svgTag) => {
        if (svgTag.getAttribute("width") === "100%" && svgTag.getAttribute("height") === "100%") {
          svgTag.removeAttribute("width");
          svgTag.removeAttribute("height");
          return true;
        }
        return false;
      };
      var workaroundPaperRoundedRectangleBug = (svgTag) => {
        let changed = false;
        const recurse = (element) => {
          if (element.tagName === "rect") {
            if (element.hasAttribute("rx") && !element.hasAttribute("ry")) {
              changed = true;
              element.setAttribute("ry", element.getAttribute("rx"));
            } else if (element.hasAttribute("ry") && !element.hasAttribute("rx")) {
              changed = true;
              element.setAttribute("rx", element.getAttribute("ry"));
            }
          }
          const childNodes = element.childNodes;
          if (childNodes) {
            for (let i = 0; i < childNodes.length; i++) {
              recurse(childNodes[i]);
            }
          }
        };
        recurse(svgTag);
        return changed;
      };
      var fixForVanilla = (rawData) => {
        const decoded = new TextDecoder().decode(rawData);
        const svgDom = new DOMParser().parseFromString(decoded, "image/svg+xml");
        const svgTag = svgDom.documentElement;
        let changed = false;
        changed = removeWidthAndHeight100Percent(svgTag) || changed;
        changed = workaroundPaperRoundedRectangleBug(svgTag) || changed;
        if (changed) {
          const svgText = new XMLSerializer().serializeToString(svgDom);
          return new TextEncoder().encode(svgText);
        }
        return rawData;
      };
      module.exports = fixForVanilla;
    }
  });

  var require_src = __commonJS({
    "node_modules/@turbowarp/scratch-svg-renderer/src/index.js"(exports, module) {
      var SVGRenderer = require_svg_renderer();
      var BitmapAdapter = require_bitmap_adapter();
      var inlineSvgFonts = require_font_inliner();
      var loadSvgString = require_load_svg_string();
      var sanitizeSvg = require_sanitize_svg();
      var serializeSvgToString = require_serialize_svg_to_string();
      var SvgElement = require_svg_element();
      var convertFonts = require_font_converter();
      var fixForVanilla = require_tw_fix_for_vanilla();
      var DOMPurify = require_purify_cjs();
      module.exports = {
        BitmapAdapter,
        convertFonts,
        inlineSvgFonts,
        loadSvgString,
        sanitizeSvg,
        serializeSvgToString,
        SvgElement,
        SVGRenderer,
        fixForVanilla,
        DOMPurify
      };
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
      var twgl2 = require_twgl_full();
      var ShaderManager = class _ShaderManager {
        constructor(gl2) {
          this._gl = gl2;
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
          const program = twgl2.createProgramInfo(this._gl, [vsFullText, fsFullText], null, null, onError);
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

  var require_SVGSkin = __commonJS({
    "src/SVGSkin.js"(exports, module) {
      var twgl2 = require_twgl_full();
      var Skin = require_Skin();
      var { loadSvgString, serializeSvgToString } = require_src();
      var ShaderManager = require_ShaderManager();
      var INDEX_OFFSET = 8;
      var SVGSkin2 = class extends Skin {
        constructor(id, renderer) {
          super(id, renderer);
          this._svgImage = document.createElement("img");
          this._svgImageLoaded = false;
          this._size = [0, 0];
          this._canvas = document.createElement("canvas");
          this._context = this._canvas.getContext("2d");
          this._scaledMIPs = [];
          this._largestMIPScale = 0;
          this._maxTextureScale = 1;
        }
        dispose() {
          this.resetMIPs();
          this._svgImage.onload = null;
          super.dispose();
        }
        get size() {
          return [this._size[0], this._size[1]];
        }
        useNearest(scale, drawable) {
          if ((drawable.enabledEffects & (ShaderManager.EFFECT_INFO.fisheye.mask | ShaderManager.EFFECT_INFO.whirl.mask | ShaderManager.EFFECT_INFO.pixelate.mask | ShaderManager.EFFECT_INFO.mosaic.mask)) !== 0) {
            return false;
          }
          if (drawable._direction % 90 !== 0) {
            return false;
          }
          if (Math.abs(scale[0]) > 99 && Math.abs(scale[0]) < 101 && Math.abs(scale[1]) > 99 && Math.abs(scale[1]) < 101) {
            return true;
          }
          return false;
        }
        createMIP(scale) {
          const isLargestMIP = this._largestMIPScale < scale;
          if (!isLargestMIP) {
            this._silhouette.unlazy();
          }
          const [width, height] = this._size;
          this._canvas.width = width * scale;
          this._canvas.height = height * scale;
          if (this._canvas.width <= 0 || this._canvas.height <= 0 ||
          this._svgImage.naturalWidth <= 0 || this._svgImage.naturalHeight <= 0) return super.getTexture();
          this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
          this._context.setTransform(scale, 0, 0, scale, 0, 0);
          this._context.drawImage(this._svgImage, 0, 0);
          const textureData = this._canvas;
          const textureOptions = {
            auto: false,
            wrap: this._renderer.gl.CLAMP_TO_EDGE,
            src: textureData,
            premultiplyAlpha: true
          };
          const mip = twgl2.createTexture(this._renderer.gl, textureOptions);
          if (isLargestMIP) {
            this._silhouette.update(textureData);
            this._largestMIPScale = scale;
          }
          return mip;
        }
        updateSilhouette(scale = [100, 100]) {
          this.getTexture(scale);
          this._silhouette.unlazy();
        }
        getTexture(scale) {
          const scaleMax = scale ? Math.max(Math.abs(scale[0]), Math.abs(scale[1])) : 100;
          const requestedScale = Math.min(scaleMax / 100, this._maxTextureScale);
          const mipLevel = Math.max(Math.ceil(Math.log2(requestedScale)) + INDEX_OFFSET, 0);
          const mipScale = Math.pow(2, mipLevel - INDEX_OFFSET);
          if (this._svgImageLoaded && !this._scaledMIPs[mipLevel]) {
            this._scaledMIPs[mipLevel] = this.createMIP(mipScale);
          }
          return this._scaledMIPs[mipLevel] || super.getTexture();
        }
        resetMIPs() {
          this._scaledMIPs.forEach((oldMIP) => this._renderer.gl.deleteTexture(oldMIP));
          this._scaledMIPs.length = 0;
          this._largestMIPScale = 0;
        }
        setSVG(svgData, rotationCenter) {
          const svgTag = loadSvgString(svgData);
          const svgText = serializeSvgToString(svgTag, this._renderer.customFonts);
          this._svgImageLoaded = false;
          const { x, y, width, height } = svgTag.viewBox.baseVal;
          this._size[0] = width;
          this._size[1] = height;
          this._svgImage.onload = () => {
            if (width === 0 || height === 0) {
              super.setEmptyImageData();
              return;
            }
            const maxDimension = Math.ceil(Math.max(width, height));
            const rendererMax = this._renderer.maxTextureDimension;
            let testScale = 2;
            for (testScale; maxDimension * testScale <= rendererMax; testScale *= 2) {
              this._maxTextureScale = testScale;
            }
            this.resetMIPs();
            if (typeof rotationCenter === "undefined") rotationCenter = this.calculateRotationCenter();
            this._rotationCenter[0] = rotationCenter[0] - x;
            this._rotationCenter[1] = rotationCenter[1] - y;
            this._svgImageLoaded = true;
            this.emitWasAltered();
          };
          this._svgImage.src = `data:image/svg+xml;utf8,${encodeURIComponent(svgText)}`;
        }
      };
      module.exports = SVGSkin2;
    }
  });

  var require_BitmapSkin = __commonJS({
    "src/BitmapSkin.js"(exports, module) {
      var twgl2 = require_twgl_full();
      var Skin = require_Skin();
      var BitmapSkin2 = class _BitmapSkin extends Skin {
        constructor(id, renderer) {
          super(id, renderer);
          this._costumeResolution = 1;
          this._textureSize = [0, 0];
        }
        dispose() {
          if (this._texture) {
            this._renderer.gl.deleteTexture(this._texture);
            this._texture = null;
          }
          super.dispose();
        }
        get size() {
          return [this._textureSize[0] / this._costumeResolution, this._textureSize[1] / this._costumeResolution];
        }
        getTexture(scale) {
          return this._texture || super.getTexture();
        }
        setBitmap(bitmapData, costumeResolution, rotationCenter) {
          if (!bitmapData.width || !bitmapData.height) {
            super.setEmptyImageData();
            return;
          }
          const gl2 = this._renderer.gl;
          let textureData = bitmapData;
          if (bitmapData instanceof HTMLCanvasElement && bitmapData.reusable !== false) {
            const context = bitmapData.getContext("2d");
            textureData = context.getImageData(0, 0, bitmapData.width, bitmapData.height);
          }
          if (this._texture === null) {
            const textureOptions = {
              auto: false,
              wrap: gl2.CLAMP_TO_EDGE
            };
            this._texture = twgl2.createTexture(gl2, textureOptions);
          }
          this._setTexture(textureData);
          this._costumeResolution = costumeResolution || 2;
          this._textureSize = _BitmapSkin._getBitmapSize(bitmapData);
          if (typeof rotationCenter === "undefined") rotationCenter = this.calculateRotationCenter();
          this._rotationCenter[0] = rotationCenter[0];
          this._rotationCenter[1] = rotationCenter[1];
          this.emitWasAltered();
        }
        static _getBitmapSize(bitmapData) {
          if (bitmapData instanceof HTMLImageElement) {
            return [bitmapData.naturalWidth || bitmapData.width, bitmapData.naturalHeight || bitmapData.height];
          }
          if (bitmapData instanceof HTMLVideoElement) {
            return [bitmapData.videoWidth || bitmapData.width, bitmapData.videoHeight || bitmapData.height];
          }
          return [bitmapData.width, bitmapData.height];
        }
      };
      module.exports = BitmapSkin2;
    }
  });

  var require_Rectangle = __commonJS({
    "src/Rectangle.js"(exports, module) {
      var Rectangle2 = class _Rectangle {
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
      module.exports = Rectangle2;
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
      var twgl2 = require_twgl_full();
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
          twgl2.v3.copy(vec, dst);
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

  var require_log2 = __commonJS({
    "src/util/log.js"(exports, module) {
      var nanolog = require_nanolog();
      nanolog.enable();
      module.exports = nanolog("scratch-render");
    }
  });

  var require_Drawable = __commonJS({
    "src/Drawable.js"(exports, module) {
      var twgl2 = require_twgl_full();
      var Rectangle2 = require_Rectangle();
      var RenderConstants = require_RenderConstants();
      var ShaderManager = require_ShaderManager();
      var EffectTransform = require_EffectTransform();
      var log = require_log2();
      var __isTouchingPosition = twgl2.v3.create();
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
      var Drawable2 = class _Drawable {
        constructor(id, renderer) {
          this._id = id;
          this._renderer = renderer;
          this._uniforms = {
            u_modelMatrix: twgl2.m4.identity(),
            u_silhouetteColor: _Drawable.color4fFromID(this._id)
          };
          const numEffects = ShaderManager.EFFECTS.length;
          for (let index = 0; index < numEffects; ++index) {
            const effectName = ShaderManager.EFFECTS[index];
            const effectInfo = ShaderManager.EFFECT_INFO[effectName];
            const converter = effectInfo.converter;
            this._uniforms[effectInfo.uniformName] = converter(0);
          }
          this._position = twgl2.v3.create(0, 0);
          this._scale = twgl2.v3.create(100, 100);
          this._direction = 90;
          this._transformDirty = true;
          this._rotationMatrix = twgl2.m4.identity();
          this._rotationTransformDirty = true;
          this._rotationAdjusted = twgl2.v3.create();
          this._rotationCenterDirty = true;
          this._skinScale = twgl2.v3.create(0, 0, 0);
          this._skinScaleDirty = true;
          this._inverseMatrix = twgl2.m4.identity();
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
            this._transformedHullPoints.push(twgl2.v3.create());
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
          result = result || new Rectangle2();
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
          result = result || new Rectangle2();
          result.initFromPointsAABB(filteredHullPoints);
          return result;
        }
        getAABB(result) {
          if (this._transformDirty) {
            this._calculateTransform();
          }
          const tm = this._uniforms.u_modelMatrix;
          result = result || new Rectangle2();
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
          const projection = twgl2.m4.ortho(-1, 1, -1, 1, -1, 1);
          const skinSize = this.skin.size;
          const halfXPixel = 1 / skinSize[0] / 2;
          const halfYPixel = 1 / skinSize[1] / 2;
          const tm = twgl2.m4.multiply(this._uniforms.u_modelMatrix, projection);
          for (let i = 0; i < this._convexHullPoints.length; i++) {
            const point = this._convexHullPoints[i];
            const dstPoint = this._transformedHullPoints[i];
            dstPoint[0] = 0.5 + -point[0] / skinSize[0] - halfXPixel;
            dstPoint[1] = point[1] / skinSize[1] - 0.5 + halfYPixel;
            twgl2.m4.transformPoint(tm, dstPoint, dstPoint);
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
            twgl2.m4.copy(this._uniforms.u_modelMatrix, inverse);
            inverse[10] = 1;
            twgl2.m4.inverse(inverse, inverse);
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
      module.exports = Drawable2;
    }
  });

  var twgl = require_twgl_full();
  twgl.createTexture = () => ({});
  twgl.resizeTexture = () => {
  };
  var SVGSkin = require_SVGSkin();
  var BitmapSkin = require_BitmapSkin();
  var Drawable = require_Drawable();
  var Rectangle = require_Rectangle();
  var gl = new Proxy({}, { get: (t, p) => typeof p === "string" && /^[A-Z0-9_]+$/.test(p) ? 1 : () => ({}) });
  window.H = { twgl, SVGSkin, BitmapSkin, Drawable, Rectangle, gl };
})();

(() => {
const DATA = {"spikes": {"spike 7": {"svg": "<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"66\" height=\"61\" viewBox=\"0,0,66,61\"><g transform=\"translate(-207,-152)\"><g data-paper-data=\"{&quot;isPaintingLayer&quot;:true}\" fill-rule=\"nonzero\" stroke-linecap=\"butt\" stroke-miterlimit=\"10\" stroke-dasharray=\"\" stroke-dashoffset=\"0\" style=\"mix-blend-mode: normal\"><path d=\"M209,211v-32h62v32z\" fill=\"#39b54a\" stroke=\"#000000\" stroke-width=\"4\" stroke-linejoin=\"round\"/><g><path d=\"M235,177h-20l10,-23z\" fill=\"none\" stroke=\"#000000\" stroke-width=\"4\" stroke-linejoin=\"round\"/><path d=\"M235,177h-20l10,-23z\" fill=\"#b3b3b3\" stroke=\"none\" stroke-width=\"1\" stroke-linejoin=\"miter\"/></g><g><path d=\"M265,177h-20l10,-23z\" fill=\"none\" stroke=\"#000000\" stroke-width=\"4\" stroke-linejoin=\"round\"/><path d=\"M265,177h-20l10,-23z\" fill=\"#b3b3b3\" stroke=\"none\" stroke-width=\"1\" stroke-linejoin=\"miter\"/></g></g></g></svg>", "cx": 33, "cy": 28}, "spike 9": {"svg": "<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"54\" height=\"27\" viewBox=\"0,0,54,27\"><g transform=\"translate(-213,-182)\"><g data-paper-data=\"{&quot;isPaintingLayer&quot;:true}\" fill-rule=\"nonzero\" stroke-linecap=\"butt\" stroke-miterlimit=\"10\" stroke-dasharray=\"\" stroke-dashoffset=\"0\" style=\"mix-blend-mode: normal\"><g><path d=\"M235,207h-20l10,-23z\" fill=\"none\" stroke=\"#000000\" stroke-width=\"4\" stroke-linejoin=\"round\"></path><path d=\"M235,207h-20l10,-23z\" fill=\"#b3b3b3\" stroke=\"none\" stroke-width=\"1\" stroke-linejoin=\"miter\"></path></g><g><path d=\"M265,207h-20l10,-23z\" fill=\"none\" stroke=\"#000000\" stroke-width=\"4\" stroke-linejoin=\"round\"></path><path d=\"M265,207h-20l10,-23z\" fill=\"#b3b3b3\" stroke=\"none\" stroke-width=\"1\" stroke-linejoin=\"miter\"></path></g></g></g></svg><!--rotationCenter:27:-2-->", "cx": 27, "cy": -2}, "spike 74": {"svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"80\" height=\"80\" viewBox=\"0 0 80 80\">\n  <g>\n    <polygon points=\"45.44 55 55 55 50.22 66 45.44 55\" style=\"fill: none;stroke: #000;stroke-linejoin: round;stroke-width: 4px\"/>\n    <polygon points=\"45.44 55 55 55 50.22 66 45.44 55\" style=\"fill: #b3b3b3\"/>\n  </g>\n  <g>\n    <polygon points=\"35.44 55 45 55 40.22 66 35.44 55\" style=\"fill: none;stroke: #000;stroke-linejoin: round;stroke-width: 4px\"/>\n    <polygon points=\"35.44 55 45 55 40.22 66 35.44 55\" style=\"fill: #b3b3b3\"/>\n  </g>\n  <g>\n    <polygon points=\"25.43 55 35 55 30.22 66 25.43 55\" style=\"fill: none;stroke: #000;stroke-linejoin: round;stroke-width: 4px\"/>\n    <polygon points=\"25.43 55 35 55 30.22 66 25.43 55\" style=\"fill: #b3b3b3\"/>\n  </g>\n  <g>\n    <polygon points=\"34.56 23 25 23 29.78 12 34.56 23\" style=\"fill: none;stroke: #000;stroke-linejoin: round;stroke-width: 4px\"/>\n    <polygon points=\"34.56 23 25 23 29.78 12 34.56 23\" style=\"fill: #b3b3b3\"/>\n  </g>\n  <g>\n    <polygon points=\"44.56 23 35 23 39.78 12 44.56 23\" style=\"fill: none;stroke: #000;stroke-linejoin: round;stroke-width: 4px\"/>\n    <polygon points=\"44.56 23 35 23 39.78 12 44.56 23\" style=\"fill: #b3b3b3\"/>\n  </g>\n  <g>\n    <polygon points=\"54.56 23 45 23 49.78 12 54.56 23\" style=\"fill: none;stroke: #000;stroke-linejoin: round;stroke-width: 4px\"/>\n    <polygon points=\"54.56 23 45 23 49.78 12 54.56 23\" style=\"fill: #b3b3b3\"/>\n  </g>\n  <g>\n    <polygon points=\"24 44.44 24 54 13 49.22 24 44.44\" style=\"fill: none;stroke: #000;stroke-linejoin: round;stroke-width: 4px\"/>\n    <polygon points=\"24 44.44 24 54 13 49.22 24 44.44\" style=\"fill: #b3b3b3\"/>\n  </g>\n  <g>\n    <polygon points=\"24 34.44 24 44 13 39.22 24 34.44\" style=\"fill: none;stroke: #000;stroke-linejoin: round;stroke-width: 4px\"/>\n    <polygon points=\"24 34.44 24 44 13 39.22 24 34.44\" style=\"fill: #b3b3b3\"/>\n  </g>\n  <g>\n    <polygon points=\"24 24.43 24 34 13 29.22 24 24.43\" style=\"fill: none;stroke: #000;stroke-linejoin: round;stroke-width: 4px\"/>\n    <polygon points=\"24 24.43 24 34 13 29.22 24 24.43\" style=\"fill: #b3b3b3\"/>\n  </g>\n  <g>\n    <polygon points=\"56 33.56 56 24 67 28.78 56 33.56\" style=\"fill: none;stroke: #000;stroke-linejoin: round;stroke-width: 4px\"/>\n    <polygon points=\"56 33.56 56 24 67 28.78 56 33.56\" style=\"fill: #b3b3b3\"/>\n  </g>\n  <g>\n    <polygon points=\"56 43.56 56 34 67 38.78 56 43.56\" style=\"fill: none;stroke: #000;stroke-linejoin: round;stroke-width: 4px\"/>\n    <polygon points=\"56 43.56 56 34 67 38.78 56 43.56\" style=\"fill: #b3b3b3\"/>\n  </g>\n  <g>\n    <polygon points=\"56 53.56 56 44 67 48.78 56 53.56\" style=\"fill: none;stroke: #000;stroke-linejoin: round;stroke-width: 4px\"/>\n    <polygon points=\"56 53.56 56 44 67 48.78 56 53.56\" style=\"fill: #b3b3b3\"/>\n  </g>\n  <g>\n    <rect x=\"24\" y=\"23\" width=\"32\" height=\"32\" style=\"fill: none;stroke: #000;stroke-linejoin: round;stroke-width: 4px\"/>\n    <rect x=\"24\" y=\"23\" width=\"32\" height=\"32\" style=\"fill: #39b54a\"/>\n  </g>\n  <rect x=\"33\" y=\"32\" width=\"14\" height=\"14\" style=\"fill: #3ac54d\"/>\n</svg>\n", "cx": 40, "cy": 40}, "spike 77": {"svg": "<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"24\" height=\"27\" viewBox=\"0,0,24,27\"><g transform=\"translate(-213,-182)\"><g data-paper-data=\"{&quot;isPaintingLayer&quot;:true}\" fill-rule=\"nonzero\" stroke-linecap=\"butt\" stroke-miterlimit=\"10\" stroke-dasharray=\"\" stroke-dashoffset=\"0\" style=\"mix-blend-mode: normal\"><g><path d=\"M235,207h-20l10,-23z\" fill=\"none\" stroke=\"#000000\" stroke-width=\"4\" stroke-linejoin=\"round\"/><path d=\"M235,207h-20l10,-23z\" fill=\"#b3b3b3\" stroke=\"none\" stroke-width=\"1\" stroke-linejoin=\"miter\"/></g></g></g></svg>", "cx": 27, "cy": -2}, "spike 78": {"svg": "<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"24\" height=\"27\" viewBox=\"0,0,24,27\"><g transform=\"translate(-243,-182)\"><g data-paper-data=\"{&quot;isPaintingLayer&quot;:true}\" fill-rule=\"nonzero\" stroke-linecap=\"butt\" stroke-miterlimit=\"10\" stroke-dasharray=\"\" stroke-dashoffset=\"0\" style=\"mix-blend-mode: normal\"><g><path d=\"M265,207h-20l10,-23z\" fill=\"none\" stroke=\"#000000\" stroke-width=\"4\" stroke-linejoin=\"round\"/><path d=\"M265,207h-20l10,-23z\" fill=\"#b3b3b3\" stroke=\"none\" stroke-width=\"1\" stroke-linejoin=\"miter\"/></g></g></g></svg>", "cx": -3, "cy": -2}, "spike 83": {"svg": "<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"66\" height=\"37.85714\" viewBox=\"0,0,66,37.85714\"><g transform=\"translate(-207,-175.14286)\"><g data-paper-data=\"{&quot;isPaintingLayer&quot;:true}\" fill-rule=\"nonzero\" stroke-linecap=\"butt\" stroke-miterlimit=\"10\" stroke-dasharray=\"\" stroke-dashoffset=\"0\" style=\"mix-blend-mode: normal\"><g><path d=\"M235,200.14286h-20l10,-23z\" fill=\"none\" stroke=\"#000000\" stroke-width=\"4\" stroke-linejoin=\"round\"/><path d=\"M235,200.14286h-20l10,-23z\" fill=\"#b3b3b3\" stroke=\"none\" stroke-width=\"1\" stroke-linejoin=\"miter\"/></g><g><path d=\"M265,200.14286h-20l10,-23z\" fill=\"none\" stroke=\"#000000\" stroke-width=\"4\" stroke-linejoin=\"round\"/><path d=\"M265,200.14286h-20l10,-23z\" fill=\"#b3b3b3\" stroke=\"none\" stroke-width=\"1\" stroke-linejoin=\"miter\"/></g><path d=\"M209,211v-10h62v10z\" fill=\"#39b54a\" stroke=\"#000000\" stroke-width=\"4\" stroke-linejoin=\"round\"/></g></g></svg>", "cx": 33, "cy": 4.857142857142861}}, "players": {"Stand": {"uri": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAABACAYAAABcIPRGAAAAAXNSR0IArs4c6QAAAVZJREFUaEPtmWsKwyAQhFd6hF6oZyj0lIWeoefqy1JQSrRlXTNilMmfEJiM7ny+QpyIeBn4ciygM70JCfhT50yV5t15IcgJsIDGAEmgccCqPQmoETUWkEDjgFX7+QmoEWxLMOFZaFsBq72ZgoBaZSJo/QX3CbX4MomDKwvQTvzF8YsICVjSKtSaQjWJtzoHWk/KwuDrZFPsAyRQBx/zVjaEfMbDCkhbF9b5ucSeBeQDgQSSTJaBwIbQ4bhs53qJz3UESv1YQMy5NLF8jvxehUr9SOD7Sy0d668Q9k7ZobrvA7EDwxUQE36GhG/hHp8f4XmvELgnpLRVC7aMDlsA5tCFcqlYhVBNY3xYACbHehcSqM8O8+ZqAqkBplv/XdIvRBZAAsYxBx9Cxvbh8tVzAN4joyELMAYGl5MAPFKjIQkYA4PLSQAeqdFQJWD06y7nP7LeCIYn8AYQ3dIH3AWMGQAAAABJRU5ErkJggg==", "cx": 24, "cy": 32, "res": 2}, "Crouch": {"uri": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAsCAYAAAAjFjtnAAABBUlEQVRoQ+2ZawrDIBCElR6hZ+spe8O+LAVNyVoYs93FB5M/IbCZOPPpxpAYQkhh4iPSQGd6CxJIl86ZgsfH666gJkADzgBJwDlgKE8CMCLnAhJwDhjKr08ARjBWwYJ7obEChqNZggB0KQq8v+A+oTYfh4qz6nAGvAfUnKamcIk1QAIa9Fb3VFMoVTyOAkJ94T+9KORpoJ4KJCAy2QdiNoWiUErb4tERaNWjgcK3NbF6jfzuQq16JPD9nSDn+iuHfQLvqO7vgTKA6QyUhJ854Vs+l+tHvj4DAndBCnUtszY6rQGrbZeNjqIL2TzYSoUGrJLU6kACWuFe9/GbuFfy255s9j/1b/7fngMVH8SVAAAAAElFTkSuQmCC", "cx": 24, "cy": 12, "res": 2}, "Wall Crouch": {"uri": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAsCAYAAAAjFjtnAAABBUlEQVRoQ+2ZawrDIBCElR6hZ+spe8O+LAVNyVoYs93FB5M/IbCZOPPpxpAYQkhh4iPSQGd6CxJIl86ZgsfH666gJkADzgBJwDlgKE8CMCLnAhJwDhjKr08ARjBWwYJ7obEChqNZggB0KQq8v+A+oTYfh4qz6nAGvAfUnKamcIk1QAIa9Fb3VFMoVTyOAkJ94T+9KORpoJ4KJCAy2QdiNoWiUErb4tERaNWjgcK3NbF6jfzuQq16JPD9nSDn+iuHfQLvqO7vgTKA6QyUhJ854Vs+l+tHvj4DAndBCnUtszY6rQGrbZeNjqIL2TzYSoUGrJLU6kACWuFe9/GbuFfy255s9j/1b/7fngMVH8SVAAAAAElFTkSuQmCC", "cx": 24, "cy": 32, "res": 2}}, "platforms": {"platform 2": {"svg": "<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"57.2\" height=\"11.8\" viewBox=\"0,0,57.2,11.8\"><g transform=\"translate(-211.3,-150.4)\"><g data-paper-data=\"{&quot;isPaintingLayer&quot;:true}\" fill=\"#9966ff\" fill-rule=\"nonzero\" stroke=\"none\" stroke-width=\"0\" stroke-linecap=\"butt\" stroke-linejoin=\"miter\" stroke-miterlimit=\"10\" stroke-dasharray=\"\" stroke-dashoffset=\"0\" style=\"mix-blend-mode: normal\"><path d=\"M211.3,162.2l7.4,-11.8h42l7.8,11.6z\"/></g></g></svg>", "cx": 28.700000000000017, "cy": 29.599999999999994}, "platform 4": {"svg": "<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"57.4\" height=\"59.2\" viewBox=\"0,0,57.4,59.2\"><g transform=\"translate(-211.3,-150.4)\"><g data-paper-data=\"{&quot;isPaintingLayer&quot;:true}\" fill=\"#9966ff\" fill-rule=\"nonzero\" stroke=\"none\" stroke-width=\"0\" stroke-linecap=\"butt\" stroke-linejoin=\"miter\" stroke-miterlimit=\"10\" stroke-dasharray=\"\" stroke-dashoffset=\"0\" style=\"mix-blend-mode: normal\"><path d=\"M268.7,197.8l-7.4,11.8h-42l-7.8,-11.6z\"/><path d=\"M211.3,162.2l7.4,-11.8h42l7.8,11.6z\"/></g></g></svg>", "cx": 28.69999999999999, "cy": 29.599999999999994}, "platform 5": {"svg": "<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"45.25\" height=\"12\" viewBox=\"0,0,45.25,12\"><g transform=\"translate(-217.75,-212.70833)\"><g data-paper-data=\"{&quot;isPaintingLayer&quot;:true}\" fill=\"#9966ff\" fill-rule=\"nonzero\" stroke=\"none\" stroke-width=\"none\" stroke-linecap=\"butt\" stroke-linejoin=\"miter\" stroke-miterlimit=\"10\" stroke-dasharray=\"\" stroke-dashoffset=\"0\" style=\"mix-blend-mode: normal\"><path d=\"M217.75,224.70833v-12h45.25v12z\"/></g></g></svg>", "cx": 22.25, "cy": -32.70833206176758}}};
const { SVGSkin, BitmapSkin, gl } = window.H;
const renderer = { skinWasAltered() {}, gl, maxTextureDimension: 16384, customFonts: {}, dirty: false };
function mkSvg(c) { const sk = new SVGSkin(Math.random() * 1e6 | 0, renderer); return new Promise(res => { sk.emitWasAltered = () => res(sk); sk.setSVG(c.svg, [c.cx, c.cy]); }); }
async function mkPng(c) {
    const img = new Image(); img.src = c.uri; await img.decode();
    const cv = document.createElement('canvas'); cv.width = img.width; cv.height = img.height; cv.getContext('2d').drawImage(img, 0, 0); cv.reusable = false;
    const sk = new BitmapSkin(Math.random() * 1e6 | 0, renderer); sk.setBitmap(cv, c.res, [c.cx / c.res, c.cy / c.res]); return sk;
}
function b64(u8) { let s = ''; for (let i = 0; i < u8.length; i += 32768) s += String.fromCharCode.apply(null, u8.subarray(i, i + 32768)); return btoa(s); }
function spec(sk) {
    const s = sk._silhouette; s.unlazy && s.unlazy();
    const n = s._width * s._height, a = new Uint8Array(n);
    for (let i = 0; i < n; i++) a[i] = s._colorData[i * 4 + 3];
    return { w: s._width, h: s._height, size: sk.size, rc: [sk._rotationCenter[0], sk._rotationCenter[1]], alpha_b64: b64(a) };
}
window.captureSilhouettes = async function (W) {
    const mult = W / 480;
    const env = { ua: navigator.userAgent, dpr: devicePixelRatio, canvasWidth: W, mipScale: Math.pow(2, Math.ceil(Math.log2(mult))) };
    const res = { env, spike: {}, player: {}, platform: {} };
    for (const n in DATA.spikes) { const s = await mkSvg(DATA.spikes[n]); s.getTexture([100 * mult, 100 * mult]); res.spike[n] = spec(s); }
    for (const n in DATA.platforms) { const s = await mkSvg(DATA.platforms[n]); s.getTexture([100, 100]); res.platform[n] = spec(s); }
    for (const n in DATA.players) { const p = await mkPng(DATA.players[n]); res.player[n] = spec(p); }

    res.mob = {}; res.stencil = {};
    try {
        const MOBS = { 'Mob A1': ['Mob_A1', 11.5, 23.0524], 'Mob A4': ['Mob_A4', 13.111, 31.0787], 'Mob A2': ['Mob_A2', 12.3783, 28.0516], 'Mob A3': ['Mob_A3', 15.7579, 16.0524],
            'Enemy-big-purple': ['Enemy-big-purple', 22, 44], 'Enemy-b3': ['Enemy-b3', 27.1366, 58.0252], 'Enemy-b2': ['Enemy-b2', 24.5048, 53.0572], 'Mob P squish': ['Mob_P_squish', 22, 39.6],
            'pip': ['pip', 8.5, 25.9545], 'pip2': ['pip2', 8.5, 25.9545] };
        for (const n in MOBS) {
            const [f, cx, cy] = MOBS[n];
            const svg = await (await fetch('assets/mobs/' + f + '.svg')).text();
            const s = await mkSvg({ svg, cx, cy }); s.getTexture([100 * mult, 100 * mult]); res.mob[n] = spec(s);
        }
        const toUri = async f => { const b = await (await fetch('assets/stencil/' + f)).blob(); return await new Promise(r => { const fr = new FileReader(); fr.onload = () => r(fr.result); fr.readAsDataURL(b); }); };
        const STENCILS = { 'Stand': ['stand.png', 24, 32], 'Stand Left': ['stand.png', 24, 32], 'Crouch': ['crouch.png', 24, 12], 'Crouch Left': ['crouch_left.png', 24, 12],
            'Wall Crouch': ['wall_crouch.png', 24, 32], 'Wall Crouch Left': ['wall_crouch_left.png', 24, 32] };
        for (const n in STENCILS) {
            const [f, cx, cy] = STENCILS[n];
            res.stencil[n] = spec(await mkPng({ uri: await toUri(f), cx, cy, res: 2 }));
        }
        const bsvg = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="112.2" height="112.2" viewBox="0,0,112.2,112.2"><rect width="112.2" height="112.2" fill="#000"/></svg>';
        const big = await mkSvg({ svg: bsvg, cx: 56.1, cy: 56.1 }); big.getTexture([100 * mult, 100 * mult]); res.stencil['BIG'] = spec(big);
    } catch (e) { console.warn('capture: mob / Stencil silhouettes unavailable', e); res.mob = {}; res.stencil = {}; }

    res.worm = {};
    try {
        const WORMS = { 'worm-cw5': [25, 42], 'worm-cw6': [35, 32], 'worm-cw7': [45, 25], 'worm-cw1': [51, 25], 'worm-cw4': [45, 25], 'worm-cw3': [35, 25],
            'worm-cw11': [25, 25], 'worm-cw8': [25, 2], 'worm-cw9': [35, 2], 'worm-cw10': [45, 2], 'worm-ccw1': [51, 2], 'worm-cw12': [45, 13],
            'worm-cw13': [35, 23], 'worm-cw14': [25, 33] };
        for (const n in WORMS) {
            const svg = await (await fetch('assets/mobs/' + n + '.svg')).text();
            const s = await mkSvg({ svg, cx: WORMS[n][0], cy: WORMS[n][1] }); s.getTexture([100 * mult, 100 * mult]); res.worm[n] = spec(s);
        }
    } catch (e) { console.warn('capture: worm silhouettes unavailable', e); res.worm = {}; }

    res.launcher = {};
    try {
        const svg = await (await fetch('assets/mobs/eye-launcher.svg')).text();
        const s = await mkSvg({ svg, cx: 20.000000000000057, cy: 19.99999999999997 }); s.getTexture([100 * mult, 100 * mult]); res.launcher['eye-launcher'] = spec(s);
    } catch (e) { console.warn('capture: eye launcher silhouette unavailable', e); res.launcher = {}; }

    res.dynamic = {};
    try {
        const svg = await (await fetch('assets/dynamic/9.svg')).text();
        const b3 = await mkSvg({ svg, cx: 3, cy: 123 }); b3.getTexture([100 * mult, 100 * mult]); res.dynamic.burtha3 = spec(b3);
        const ssvg = await (await fetch('assets/dynamic/6.svg')).text();
        const sw = await mkSvg({ svg: ssvg, cx: 40, cy: 40 }); sw.getTexture([100 * mult, 100 * mult]); res.dynamic.saw = spec(sw);
    } catch (e) { console.warn('capture: burtha3 / saw silhouettes unavailable', e); res.dynamic = {}; }
    return res;
};
})();
