var liner =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var index_1 = __webpack_require__(1);
	Object.freeze(Math);
	Object.freeze(Math.random);
	Object.freeze(Math.imul);
	if (index_1.nativeCrypto)
	    Object.freeze(index_1.nativeCrypto.getRandomValues);
	exports.crypto = new index_1.Crypto();


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(2));
	__export(__webpack_require__(17));


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var error_1 = __webpack_require__(3);
	var _w;
	if (typeof self === "undefined") {
	    var crypto_1 = __webpack_require__(16);
	    _w = {
	        crypto: {
	            subtle: {},
	            getRandomValues: function (array) {
	                var buf = array.buffer;
	                var uint8buf = new Uint8Array(buf);
	                var rnd = crypto_1.randomBytes(uint8buf.length);
	                rnd.forEach(function (octet, index) { return uint8buf[index] = octet; });
	                return array;
	            }
	        }
	    };
	}
	else
	    _w = self;
	exports.nativeCrypto = _w.msCrypto || _w.crypto;
	exports.nativeSubtle = exports.nativeCrypto.subtle || exports.nativeCrypto.webkitSubtle;
	function WrapFunction(subtle, name) {
	    var fn = subtle[name];
	    subtle[name] = function () {
	        var _args = arguments;
	        return new Promise(function (resolve, reject) {
	            var op = fn.apply(subtle, _args);
	            op.oncomplete = function (e) {
	                console.log("Complited");
	                resolve(e.target.result);
	            };
	            op.onerror = function (e) {
	                console.log("Error");
	                reject("Error on running '" + name + "' function");
	            };
	        });
	    };
	}
	if (_w.msCrypto) {
	    if (!_w.Promise)
	        throw new error_1.LinerError(error_1.LinerError.MODULE_NOT_FOUND, "Promise", "https://www.promisejs.org");
	    WrapFunction(exports.nativeSubtle, "generateKey");
	    WrapFunction(exports.nativeSubtle, "digest");
	    WrapFunction(exports.nativeSubtle, "sign");
	    WrapFunction(exports.nativeSubtle, "verify");
	    WrapFunction(exports.nativeSubtle, "encrypt");
	    WrapFunction(exports.nativeSubtle, "decrypt");
	    WrapFunction(exports.nativeSubtle, "importKey");
	    WrapFunction(exports.nativeSubtle, "exportKey");
	    WrapFunction(exports.nativeSubtle, "wrapKey");
	    WrapFunction(exports.nativeSubtle, "unwrapKey");
	    WrapFunction(exports.nativeSubtle, "deriveKey");
	    WrapFunction(exports.nativeSubtle, "deriveBits");
	}
	// fix: Math.imul for IE
	if (!Math.imul)
	    Math.imul = function imul(a, b) {
	        var ah = (a >>> 16) & 0xffff;
	        var al = a & 0xffff;
	        var bh = (b >>> 16) & 0xffff;
	        var bl = b & 0xffff;
	        return ((al * bl) + (((ah * bl + al * bh) << 16) >>> 0) | 0);
	    };


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var webcrypto_core_1 = __webpack_require__(4);
	var LinerError = (function (_super) {
	    __extends(LinerError, _super);
	    function LinerError() {
	        var _this = _super.apply(this, arguments) || this;
	        _this.code = 10;
	        return _this;
	    }
	    return LinerError;
	}(webcrypto_core_1.WebCryptoError));
	LinerError.MODULE_NOT_FOUND = "Module '%1' is not found. Download it from %2";
	LinerError.UNSUPPORTED_ALGORITHM = "Unsupported algorithm '%1'";
	exports.LinerError = LinerError;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(5));
	__export(__webpack_require__(6));
	__export(__webpack_require__(7));
	__export(__webpack_require__(8));
	__export(__webpack_require__(9));
	__export(__webpack_require__(12));
	__export(__webpack_require__(11));
	__export(__webpack_require__(13));
	__export(__webpack_require__(10));


/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	function printf(text) {
	    var args = [];
	    for (var _i = 1; _i < arguments.length; _i++) {
	        args[_i - 1] = arguments[_i];
	    }
	    var msg = text;
	    var regFind = /[^%](%\d+)/g;
	    var match;
	    var matches = [];
	    while (match = regFind.exec(msg)) {
	        matches.push({ arg: match[1], index: match.index });
	    }
	    // replace matches
	    for (var i = matches.length - 1; i >= 0; i--) {
	        var item = matches[i];
	        var arg = item.arg.substring(1);
	        var index = item.index + 1;
	        msg = msg.substring(0, index) + arguments[+arg] + msg.substring(index + 1 + arg.length);
	    }
	    // convert %% -> %
	    msg = msg.replace("%%", "%");
	    return msg;
	}
	var WebCryptoError = (function (_super) {
	    __extends(WebCryptoError, _super);
	    function WebCryptoError(template) {
	        var args = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            args[_i - 1] = arguments[_i];
	        }
	        var _this = _super.call(this) || this;
	        _this.code = 0;
	        _this.message = printf.apply(void 0, [template].concat(args));
	        var error = new Error(_this.message);
	        error.name = _this["constructor"].name;
	        _this.stack = error.stack;
	        return _this;
	    }
	    return WebCryptoError;
	}(Error));
	WebCryptoError.NOT_SUPPORTED = "Method is not supported";
	exports.WebCryptoError = WebCryptoError;
	var AlgorithmError = (function (_super) {
	    __extends(AlgorithmError, _super);
	    function AlgorithmError() {
	        var _this = _super.apply(this, arguments) || this;
	        _this.code = 1;
	        return _this;
	    }
	    return AlgorithmError;
	}(WebCryptoError));
	AlgorithmError.PARAM_REQUIRED = "Algorithm hasn't got required paramter '%1'";
	AlgorithmError.PARAM_WRONG_TYPE = "Algorithm has got wrong type for paramter '%1'. Must be %2";
	AlgorithmError.PARAM_WRONG_VALUE = "Algorithm has got wrong value for paramter '%1'. Must be %2";
	AlgorithmError.WRONG_ALG_NAME = "Algorithm has got wrong name '%1'. Must be '%2'";
	AlgorithmError.UNSUPPORTED_ALGORITHM = "Algorithm '%1' is not supported";
	AlgorithmError.WRONG_USAGE = "Algorithm doesn't support key usage '%1'";
	exports.AlgorithmError = AlgorithmError;
	var CryptoKeyError = (function (_super) {
	    __extends(CryptoKeyError, _super);
	    function CryptoKeyError() {
	        var _this = _super.apply(this, arguments) || this;
	        _this.code = 3;
	        return _this;
	    }
	    return CryptoKeyError;
	}(WebCryptoError));
	CryptoKeyError.EMPTY_KEY = "CryptoKey is empty";
	CryptoKeyError.WRONG_KEY_ALG = "CryptoKey has wrong algorithm '%1'. Must be '%2'";
	CryptoKeyError.WRONG_KEY_TYPE = "CryptoKey has wrong type '%1'. Must be '%2'";
	CryptoKeyError.WRONG_KEY_USAGE = "CryptoKey has wrong key usage. Must be '%1'";
	CryptoKeyError.NOT_EXTRACTABLE = "CryptoKey is not extractable";
	CryptoKeyError.WRONG_FORMAT = "CryptoKey has '%1' type. It can be used with '%2' format";
	CryptoKeyError.UNKNOWN_FORMAT = "Uknown format in use '%1'. Must be one of 'raw', 'pkcs8', 'spki'  or 'jwk'";
	CryptoKeyError.ALLOWED_FORMAT = "Wrong format value '%1'. Must be %2";
	exports.CryptoKeyError = CryptoKeyError;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var error_1 = __webpack_require__(5);
	function PrepareAlgorithm(alg) {
	    var res;
	    if (typeof alg === "string")
	        res = { name: alg };
	    else
	        res = alg;
	    BaseCrypto.checkAlgorithm(res);
	    var hashedAlg = alg;
	    if (hashedAlg.hash) {
	        hashedAlg.hash = PrepareAlgorithm(hashedAlg.hash);
	    }
	    return res;
	}
	exports.PrepareAlgorithm = PrepareAlgorithm;
	function PrepareData(data, paramName) {
	    if (!data)
	        throw new error_1.WebCryptoError("Parameter '" + paramName + "' is required and cant be empty");
	    if (ArrayBuffer.isView(data))
	        return new Uint8Array(data.buffer);
	    if (data instanceof ArrayBuffer)
	        return new Uint8Array(data);
	    throw new error_1.WebCryptoError("Incoming parameter '" + paramName + "' has wrong data type. Must be ArrayBufferView or ArrayBuffer");
	}
	exports.PrepareData = PrepareData;
	var BaseCrypto = (function () {
	    function BaseCrypto() {
	    }
	    BaseCrypto.checkAlgorithm = function (alg) {
	        if (typeof alg !== "object")
	            throw new TypeError("Wrong algorithm data type. Must be Object");
	        if (!("name" in alg))
	            throw new error_1.AlgorithmError(error_1.AlgorithmError.PARAM_REQUIRED, "name");
	    };
	    BaseCrypto.checkAlgorithmParams = function (alg) {
	        this.checkAlgorithm(alg);
	    };
	    BaseCrypto.checkKey = function (key, alg, type, usage) {
	        if (type === void 0) { type = null; }
	        if (usage === void 0) { usage = null; }
	        // check key empty
	        if (!key)
	            throw new error_1.CryptoKeyError(error_1.CryptoKeyError.EMPTY_KEY);
	        // check alg
	        var keyAlg = key.algorithm;
	        this.checkAlgorithm(keyAlg);
	        if (alg && (keyAlg.name.toUpperCase() !== alg.toUpperCase()))
	            throw new error_1.CryptoKeyError(error_1.CryptoKeyError.WRONG_KEY_ALG, keyAlg.name, alg);
	        // check type
	        if (type && (!key.type || key.type.toUpperCase() !== type.toUpperCase()))
	            throw new error_1.CryptoKeyError(error_1.CryptoKeyError.WRONG_KEY_TYPE, key.type, type);
	        // check usage
	        if (usage) {
	            if (!key.usages.some(function (keyUsage) { return usage.toUpperCase() === keyUsage.toUpperCase(); }))
	                throw new error_1.CryptoKeyError(error_1.CryptoKeyError.WRONG_KEY_USAGE, usage);
	        }
	    };
	    BaseCrypto.checkWrappedKey = function (key) {
	        if (!key.extractable)
	            throw new error_1.CryptoKeyError(error_1.CryptoKeyError.NOT_EXTRACTABLE);
	    };
	    BaseCrypto.checkKeyUsages = function (keyUsages) {
	        if (!keyUsages || !keyUsages.length)
	            throw new error_1.WebCryptoError("Parameter 'keyUsages' cannot be empty.");
	    };
	    BaseCrypto.checkFormat = function (format, type) {
	        switch (format.toLowerCase()) {
	            case "raw":
	                if (type && type.toLowerCase() !== "secret")
	                    throw new error_1.CryptoKeyError(error_1.CryptoKeyError.WRONG_FORMAT, type, "raw");
	                break;
	            case "pkcs8":
	                if (type && type.toLowerCase() !== "private")
	                    throw new error_1.CryptoKeyError(error_1.CryptoKeyError.WRONG_FORMAT, type, "pkcs8");
	                break;
	            case "spki":
	                if (type && type.toLowerCase() !== "public")
	                    throw new error_1.CryptoKeyError(error_1.CryptoKeyError.WRONG_FORMAT, type, "spki");
	                break;
	            case "jwk":
	                break;
	            default:
	                throw new error_1.CryptoKeyError(error_1.CryptoKeyError.UNKNOWN_FORMAT, format);
	        }
	    };
	    BaseCrypto.generateKey = function (algorithm, extractable, keyUsages) {
	        return new Promise(function (resolve, reject) {
	            throw new error_1.WebCryptoError(error_1.WebCryptoError.NOT_SUPPORTED);
	        });
	    };
	    BaseCrypto.digest = function (algorithm, data) {
	        return new Promise(function (resolve, reject) {
	            throw new error_1.WebCryptoError(error_1.WebCryptoError.NOT_SUPPORTED);
	        });
	    };
	    BaseCrypto.sign = function (algorithm, key, data) {
	        return new Promise(function (resolve, reject) {
	            throw new error_1.WebCryptoError(error_1.WebCryptoError.NOT_SUPPORTED);
	        });
	    };
	    BaseCrypto.verify = function (algorithm, key, signature, data) {
	        return new Promise(function (resolve, reject) {
	            throw new error_1.WebCryptoError(error_1.WebCryptoError.NOT_SUPPORTED);
	        });
	    };
	    BaseCrypto.encrypt = function (algorithm, key, data) {
	        return new Promise(function (resolve, reject) {
	            throw new error_1.WebCryptoError(error_1.WebCryptoError.NOT_SUPPORTED);
	        });
	    };
	    BaseCrypto.decrypt = function (algorithm, key, data) {
	        return new Promise(function (resolve, reject) {
	            throw new error_1.WebCryptoError(error_1.WebCryptoError.NOT_SUPPORTED);
	        });
	    };
	    BaseCrypto.deriveBits = function (algorithm, baseKey, length) {
	        return new Promise(function (resolve, reject) {
	            throw new error_1.WebCryptoError(error_1.WebCryptoError.NOT_SUPPORTED);
	        });
	    };
	    BaseCrypto.deriveKey = function (algorithm, baseKey, derivedKeyType, extractable, keyUsages) {
	        return new Promise(function (resolve, reject) {
	            throw new error_1.WebCryptoError(error_1.WebCryptoError.NOT_SUPPORTED);
	        });
	    };
	    BaseCrypto.exportKey = function (format, key) {
	        return new Promise(function (resolve, reject) {
	            throw new error_1.WebCryptoError(error_1.WebCryptoError.NOT_SUPPORTED);
	        });
	    };
	    BaseCrypto.importKey = function (format, keyData, algorithm, extractable, keyUsages) {
	        return new Promise(function (resolve, reject) {
	            throw new error_1.WebCryptoError(error_1.WebCryptoError.NOT_SUPPORTED);
	        });
	    };
	    BaseCrypto.wrapKey = function (format, key, wrappingKey, wrapAlgorithm) {
	        return new Promise(function (resolve, reject) {
	            throw new error_1.WebCryptoError(error_1.WebCryptoError.NOT_SUPPORTED);
	        });
	    };
	    BaseCrypto.unwrapKey = function (format, wrappedKey, unwrappingKey, unwrapAlgorithm, unwrappedKeyAlgorithm, extractable, keyUsages) {
	        return new Promise(function (resolve, reject) {
	            throw new error_1.WebCryptoError(error_1.WebCryptoError.NOT_SUPPORTED);
	        });
	    };
	    return BaseCrypto;
	}());
	exports.BaseCrypto = BaseCrypto;


/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	exports.AlgorithmNames = {
	    RsaSSA: "RSASSA-PKCS1-v1_5",
	    RsaPSS: "RSA-PSS",
	    RsaOAEP: "RSA-OAEP",
	    AesCTR: "AES-CTR",
	    AesCMAC: "AES-CMAC",
	    AesGCM: "AES-GCM",
	    AesCBC: "AES-CBC",
	    AesKW: "AES-KW",
	    Sha1: "SHA-1",
	    Sha256: "SHA-256",
	    Sha384: "SHA-384",
	    Sha512: "SHA-512",
	    EcDSA: "ECDSA",
	    EcDH: "ECDH",
	    Hmac: "HMAC",
	    Pbkdf2: "PBKDF2",
	};


/***/ },
/* 8 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";
	// Fix btoa and atob for NodeJS
	if (typeof self === "undefined") {
	    var _global = global;
	    _global.btoa = function (data) { return new Buffer(data, "binary").toString("base64"); };
	    _global.atob = function (data) { return new Buffer(data, "base64").toString("binary"); };
	}
	var Base64Url = (function () {
	    function Base64Url() {
	    }
	    Base64Url.buffer2string = function (buffer) {
	        var res = "";
	        for (var i = 0; i < buffer.length; i++)
	            res += String.fromCharCode(buffer[i]);
	        return res;
	    };
	    Base64Url.string2buffer = function (binaryString) {
	        var res = new Uint8Array(binaryString.length);
	        for (var i = 0; i < binaryString.length; i++)
	            res[i] = binaryString.charCodeAt(i);
	        return res;
	    };
	    Base64Url.encode = function (value) {
	        var str = this.buffer2string(value);
	        var res = btoa(str)
	            .replace(/=/g, "")
	            .replace(/\+/g, "-")
	            .replace(/\//g, "_");
	        return res;
	    };
	    Base64Url.decode = function (base64url) {
	        while (base64url.length % 4) {
	            base64url += "=";
	        }
	        var base64 = base64url
	            .replace(/\-/g, "+")
	            .replace(/_/g, "/");
	        return this.string2buffer(atob(base64));
	    };
	    return Base64Url;
	}());
	exports.Base64Url = Base64Url;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var error_1 = __webpack_require__(5);
	var base_1 = __webpack_require__(6);
	var alg_1 = __webpack_require__(7);
	var crypto_1 = __webpack_require__(10);
	var crypto_2 = __webpack_require__(11);
	var crypto_3 = __webpack_require__(12);
	var crypto_4 = __webpack_require__(13);
	var crypto_5 = __webpack_require__(14);
	var crypto_6 = __webpack_require__(15);
	var SubtleCrypto = (function () {
	    function SubtleCrypto() {
	    }
	    SubtleCrypto.prototype.generateKey = function (algorithm, extractable, keyUsages) {
	        return new Promise(function (resolve, reject) {
	            var alg = base_1.PrepareAlgorithm(algorithm);
	            var Class = base_1.BaseCrypto;
	            switch (alg.name.toUpperCase()) {
	                case alg_1.AlgorithmNames.RsaSSA.toUpperCase():
	                    Class = crypto_2.RsaSSA;
	                    break;
	                case alg_1.AlgorithmNames.RsaOAEP.toUpperCase():
	                    Class = crypto_2.RsaOAEP;
	                    break;
	                case alg_1.AlgorithmNames.RsaPSS.toUpperCase():
	                    Class = crypto_2.RsaPSS;
	                    break;
	                case alg_1.AlgorithmNames.AesCBC.toUpperCase():
	                    Class = crypto_3.AesCBC;
	                    break;
	                case alg_1.AlgorithmNames.AesCTR.toUpperCase():
	                    Class = crypto_3.AesCTR;
	                    break;
	                case alg_1.AlgorithmNames.AesGCM.toUpperCase():
	                    Class = crypto_3.AesGCM;
	                    break;
	                case alg_1.AlgorithmNames.AesKW.toUpperCase():
	                    Class = crypto_3.AesKW;
	                    break;
	                case alg_1.AlgorithmNames.EcDSA.toUpperCase():
	                    Class = crypto_4.EcDSA;
	                    break;
	                case alg_1.AlgorithmNames.EcDH.toUpperCase():
	                    Class = crypto_4.EcDH;
	                    break;
	                case alg_1.AlgorithmNames.Hmac.toUpperCase():
	                    Class = crypto_5.Hmac;
	                    break;
	                default:
	                    throw new error_1.AlgorithmError(error_1.AlgorithmError.UNSUPPORTED_ALGORITHM, alg.name);
	            }
	            Class.generateKey(alg, extractable, keyUsages).then(resolve, reject);
	        });
	    };
	    SubtleCrypto.prototype.digest = function (algorithm, data) {
	        return new Promise(function (resolve, reject) {
	            var alg = base_1.PrepareAlgorithm(algorithm);
	            var buf = base_1.PrepareData(data, "data");
	            var Class = base_1.BaseCrypto;
	            switch (alg.name.toUpperCase()) {
	                case alg_1.AlgorithmNames.Sha1.toUpperCase():
	                case alg_1.AlgorithmNames.Sha256.toUpperCase():
	                case alg_1.AlgorithmNames.Sha384.toUpperCase():
	                case alg_1.AlgorithmNames.Sha512.toUpperCase():
	                    Class = crypto_1.Sha;
	                    break;
	                default:
	                    throw new error_1.AlgorithmError(error_1.AlgorithmError.UNSUPPORTED_ALGORITHM, alg.name);
	            }
	            Class.digest(alg, buf).then(resolve, reject);
	        });
	    };
	    SubtleCrypto.prototype.sign = function (algorithm, key, data) {
	        return new Promise(function (resolve, reject) {
	            var alg = base_1.PrepareAlgorithm(algorithm);
	            var buf = base_1.PrepareData(data, "data");
	            var Class = base_1.BaseCrypto;
	            switch (alg.name.toUpperCase()) {
	                case alg_1.AlgorithmNames.RsaSSA.toUpperCase():
	                    Class = crypto_2.RsaSSA;
	                    break;
	                case alg_1.AlgorithmNames.RsaPSS.toUpperCase():
	                    Class = crypto_2.RsaPSS;
	                    break;
	                case alg_1.AlgorithmNames.EcDSA.toUpperCase():
	                    Class = crypto_4.EcDSA;
	                    break;
	                case alg_1.AlgorithmNames.Hmac.toUpperCase():
	                    Class = crypto_5.Hmac;
	                    break;
	                default:
	                    throw new error_1.AlgorithmError(error_1.AlgorithmError.UNSUPPORTED_ALGORITHM, alg.name);
	            }
	            Class.sign(alg, key, buf).then(resolve, reject);
	        });
	    };
	    SubtleCrypto.prototype.verify = function (algorithm, key, signature, data) {
	        return new Promise(function (resolve, reject) {
	            var alg = base_1.PrepareAlgorithm(algorithm);
	            var sigBuf = base_1.PrepareData(data, "signature");
	            var buf = base_1.PrepareData(data, "data");
	            var Class = base_1.BaseCrypto;
	            switch (alg.name.toUpperCase()) {
	                case alg_1.AlgorithmNames.RsaSSA.toUpperCase():
	                    Class = crypto_2.RsaSSA;
	                    break;
	                case alg_1.AlgorithmNames.RsaPSS.toUpperCase():
	                    Class = crypto_2.RsaPSS;
	                    break;
	                case alg_1.AlgorithmNames.EcDSA.toUpperCase():
	                    Class = crypto_4.EcDSA;
	                    break;
	                case alg_1.AlgorithmNames.Hmac.toUpperCase():
	                    Class = crypto_5.Hmac;
	                    break;
	                default:
	                    throw new error_1.AlgorithmError(error_1.AlgorithmError.UNSUPPORTED_ALGORITHM, alg.name);
	            }
	            Class.verify(alg, key, sigBuf, buf).then(resolve, reject);
	        });
	    };
	    SubtleCrypto.prototype.encrypt = function (algorithm, key, data) {
	        return new Promise(function (resolve, reject) {
	            var alg = base_1.PrepareAlgorithm(algorithm);
	            var buf = base_1.PrepareData(data, "data");
	            var Class = base_1.BaseCrypto;
	            switch (alg.name.toUpperCase()) {
	                case alg_1.AlgorithmNames.RsaOAEP.toUpperCase():
	                    Class = crypto_2.RsaOAEP;
	                    break;
	                case alg_1.AlgorithmNames.AesCBC.toUpperCase():
	                    Class = crypto_3.AesCBC;
	                    break;
	                case alg_1.AlgorithmNames.AesCTR.toUpperCase():
	                    Class = crypto_3.AesCTR;
	                    break;
	                case alg_1.AlgorithmNames.AesGCM.toUpperCase():
	                    Class = crypto_3.AesGCM;
	                    break;
	                default:
	                    throw new error_1.AlgorithmError(error_1.AlgorithmError.UNSUPPORTED_ALGORITHM, alg.name);
	            }
	            Class.encrypt(alg, key, buf).then(resolve, reject);
	        });
	    };
	    SubtleCrypto.prototype.decrypt = function (algorithm, key, data) {
	        return new Promise(function (resolve, reject) {
	            var alg = base_1.PrepareAlgorithm(algorithm);
	            var buf = base_1.PrepareData(data, "data");
	            var Class = base_1.BaseCrypto;
	            switch (alg.name.toUpperCase()) {
	                case alg_1.AlgorithmNames.RsaOAEP.toUpperCase():
	                    Class = crypto_2.RsaOAEP;
	                    break;
	                case alg_1.AlgorithmNames.AesCBC.toUpperCase():
	                    Class = crypto_3.AesCBC;
	                    break;
	                case alg_1.AlgorithmNames.AesCTR.toUpperCase():
	                    Class = crypto_3.AesCTR;
	                    break;
	                case alg_1.AlgorithmNames.AesGCM.toUpperCase():
	                    Class = crypto_3.AesGCM;
	                    break;
	                default:
	                    throw new error_1.AlgorithmError(error_1.AlgorithmError.UNSUPPORTED_ALGORITHM, alg.name);
	            }
	            Class.decrypt(alg, key, buf).then(resolve, reject);
	        });
	    };
	    SubtleCrypto.prototype.deriveBits = function (algorithm, baseKey, length) {
	        return new Promise(function (resolve, reject) {
	            var alg = base_1.PrepareAlgorithm(algorithm);
	            var Class = base_1.BaseCrypto;
	            switch (alg.name.toUpperCase()) {
	                case alg_1.AlgorithmNames.EcDH.toUpperCase():
	                    Class = crypto_4.EcDH;
	                    break;
	                case alg_1.AlgorithmNames.Pbkdf2.toUpperCase():
	                    Class = crypto_6.Pbkdf2;
	                    break;
	                default:
	                    throw new error_1.AlgorithmError(error_1.AlgorithmError.UNSUPPORTED_ALGORITHM, alg.name);
	            }
	            Class.deriveBits(alg, baseKey, length).then(resolve, reject);
	        });
	    };
	    SubtleCrypto.prototype.deriveKey = function (algorithm, baseKey, derivedKeyType, extractable, keyUsages) {
	        return new Promise(function (resolve, reject) {
	            var alg = base_1.PrepareAlgorithm(algorithm);
	            var derivedAlg = base_1.PrepareAlgorithm(derivedKeyType);
	            var Class = base_1.BaseCrypto;
	            switch (alg.name.toUpperCase()) {
	                case alg_1.AlgorithmNames.EcDH.toUpperCase():
	                    Class = crypto_4.EcDH;
	                    break;
	                case alg_1.AlgorithmNames.Pbkdf2.toUpperCase():
	                    Class = crypto_6.Pbkdf2;
	                    break;
	                default:
	                    throw new error_1.AlgorithmError(error_1.AlgorithmError.UNSUPPORTED_ALGORITHM, alg.name);
	            }
	            Class.deriveKey(alg, baseKey, derivedAlg, extractable, keyUsages).then(resolve, reject);
	        });
	    };
	    SubtleCrypto.prototype.exportKey = function (format, key) {
	        return new Promise(function (resolve, reject) {
	            base_1.BaseCrypto.checkKey(key);
	            if (!key.extractable)
	                throw new error_1.CryptoKeyError(error_1.CryptoKeyError.NOT_EXTRACTABLE);
	            var Class = base_1.BaseCrypto;
	            switch (key.algorithm.name.toUpperCase()) {
	                case alg_1.AlgorithmNames.RsaSSA.toUpperCase():
	                    Class = crypto_2.RsaSSA;
	                    break;
	                case alg_1.AlgorithmNames.RsaPSS.toUpperCase():
	                    Class = crypto_2.RsaPSS;
	                    break;
	                case alg_1.AlgorithmNames.RsaOAEP.toUpperCase():
	                    Class = crypto_2.RsaOAEP;
	                    break;
	                case alg_1.AlgorithmNames.AesCBC.toUpperCase():
	                    Class = crypto_3.AesCBC;
	                    break;
	                case alg_1.AlgorithmNames.AesCTR.toUpperCase():
	                    Class = crypto_3.AesCTR;
	                    break;
	                case alg_1.AlgorithmNames.AesGCM.toUpperCase():
	                    Class = crypto_3.AesGCM;
	                    break;
	                case alg_1.AlgorithmNames.AesKW.toUpperCase():
	                    Class = crypto_3.AesKW;
	                    break;
	                case alg_1.AlgorithmNames.EcDSA.toUpperCase():
	                    Class = crypto_4.EcDSA;
	                    break;
	                case alg_1.AlgorithmNames.EcDH.toUpperCase():
	                    Class = crypto_4.EcDH;
	                    break;
	                case alg_1.AlgorithmNames.Hmac.toUpperCase():
	                    Class = crypto_5.Hmac;
	                    break;
	                default:
	                    throw new error_1.AlgorithmError(error_1.AlgorithmError.UNSUPPORTED_ALGORITHM, key.algorithm.name);
	            }
	            Class.exportKey(format, key).then(resolve, reject);
	        });
	    };
	    SubtleCrypto.prototype.importKey = function (format, keyData, algorithm, extractable, keyUsages) {
	        return new Promise(function (resolve, reject) {
	            var alg = base_1.PrepareAlgorithm(algorithm);
	            var Class = base_1.BaseCrypto;
	            // TODO prepare keyData
	            switch (alg.name.toUpperCase()) {
	                case alg_1.AlgorithmNames.RsaSSA.toUpperCase():
	                    Class = crypto_2.RsaSSA;
	                    break;
	                case alg_1.AlgorithmNames.RsaPSS.toUpperCase():
	                    Class = crypto_2.RsaPSS;
	                    break;
	                case alg_1.AlgorithmNames.RsaOAEP.toUpperCase():
	                    Class = crypto_2.RsaOAEP;
	                    break;
	                case alg_1.AlgorithmNames.AesCBC.toUpperCase():
	                    Class = crypto_3.AesCBC;
	                    break;
	                case alg_1.AlgorithmNames.AesCTR.toUpperCase():
	                    Class = crypto_3.AesCTR;
	                    break;
	                case alg_1.AlgorithmNames.AesGCM.toUpperCase():
	                    Class = crypto_3.AesGCM;
	                    break;
	                case alg_1.AlgorithmNames.AesKW.toUpperCase():
	                    Class = crypto_3.AesKW;
	                    break;
	                case alg_1.AlgorithmNames.EcDSA.toUpperCase():
	                    Class = crypto_4.EcDSA;
	                    break;
	                case alg_1.AlgorithmNames.EcDH.toUpperCase():
	                    Class = crypto_4.EcDH;
	                    break;
	                case alg_1.AlgorithmNames.Hmac.toUpperCase():
	                    Class = crypto_5.Hmac;
	                    break;
	                case alg_1.AlgorithmNames.Pbkdf2.toUpperCase():
	                    Class = crypto_6.Pbkdf2;
	                    break;
	                default:
	                    throw new error_1.AlgorithmError(error_1.AlgorithmError.UNSUPPORTED_ALGORITHM, alg.name);
	            }
	            Class.importKey(format, keyData, alg, extractable, keyUsages).then(resolve, reject);
	        });
	    };
	    SubtleCrypto.prototype.wrapKey = function (format, key, wrappingKey, wrapAlgorithm) {
	        return new Promise(function (resolve, reject) {
	            var alg = base_1.PrepareAlgorithm(wrapAlgorithm);
	            var Class = base_1.BaseCrypto;
	            switch (alg.name.toUpperCase()) {
	                case alg_1.AlgorithmNames.RsaOAEP.toUpperCase():
	                    Class = crypto_2.RsaOAEP;
	                    break;
	                case alg_1.AlgorithmNames.AesCBC.toUpperCase():
	                    Class = crypto_3.AesCBC;
	                    break;
	                case alg_1.AlgorithmNames.AesCTR.toUpperCase():
	                    Class = crypto_3.AesCTR;
	                    break;
	                case alg_1.AlgorithmNames.AesGCM.toUpperCase():
	                    Class = crypto_3.AesGCM;
	                    break;
	                case alg_1.AlgorithmNames.AesKW.toUpperCase():
	                    Class = crypto_3.AesKW;
	                    break;
	                default:
	                    throw new error_1.AlgorithmError(error_1.AlgorithmError.UNSUPPORTED_ALGORITHM, alg.name);
	            }
	            Class.wrapKey(format, key, wrappingKey, alg).then(resolve, reject);
	        });
	    };
	    SubtleCrypto.prototype.unwrapKey = function (format, wrappedKey, unwrappingKey, unwrapAlgorithm, unwrappedKeyAlgorithm, extractable, keyUsages) {
	        return new Promise(function (resolve, reject) {
	            var unwrapAlg = base_1.PrepareAlgorithm(unwrapAlgorithm);
	            var unwrappedAlg = base_1.PrepareAlgorithm(unwrappedKeyAlgorithm);
	            var buf = base_1.PrepareData(wrappedKey, "wrappedKey");
	            var Class = base_1.BaseCrypto;
	            switch (unwrapAlg.name.toUpperCase()) {
	                case alg_1.AlgorithmNames.RsaOAEP.toUpperCase():
	                    Class = crypto_2.RsaOAEP;
	                    break;
	                case alg_1.AlgorithmNames.AesCBC.toUpperCase():
	                    Class = crypto_3.AesCBC;
	                    break;
	                case alg_1.AlgorithmNames.AesCTR.toUpperCase():
	                    Class = crypto_3.AesCTR;
	                    break;
	                case alg_1.AlgorithmNames.AesGCM.toUpperCase():
	                    Class = crypto_3.AesGCM;
	                    break;
	                case alg_1.AlgorithmNames.AesKW.toUpperCase():
	                    Class = crypto_3.AesKW;
	                    break;
	                default:
	                    throw new error_1.AlgorithmError(error_1.AlgorithmError.UNSUPPORTED_ALGORITHM, unwrapAlg.name);
	            }
	            Class.unwrapKey(format, buf, unwrappingKey, unwrapAlg, unwrappedAlg, extractable, keyUsages).then(resolve, reject);
	        });
	    };
	    return SubtleCrypto;
	}());
	exports.SubtleCrypto = SubtleCrypto;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var alg_1 = __webpack_require__(7);
	var base_1 = __webpack_require__(6);
	var error_1 = __webpack_require__(5);
	exports.ShaAlgorithms = [alg_1.AlgorithmNames.Sha1, alg_1.AlgorithmNames.Sha256, alg_1.AlgorithmNames.Sha384, alg_1.AlgorithmNames.Sha512].join(" | ");
	var Sha = (function (_super) {
	    __extends(Sha, _super);
	    function Sha() {
	        return _super.apply(this, arguments) || this;
	    }
	    Sha.checkAlgorithm = function (alg) {
	        var _alg;
	        if (typeof alg === "string")
	            _alg = { name: alg };
	        else
	            _alg = alg;
	        _super.checkAlgorithm.call(this, _alg);
	        switch (_alg.name.toUpperCase()) {
	            case alg_1.AlgorithmNames.Sha1:
	            case alg_1.AlgorithmNames.Sha256:
	            case alg_1.AlgorithmNames.Sha384:
	            case alg_1.AlgorithmNames.Sha512:
	                break;
	            default:
	                throw new error_1.AlgorithmError(error_1.AlgorithmError.WRONG_ALG_NAME, _alg.name, exports.ShaAlgorithms);
	        }
	    };
	    Sha.digest = function (algorithm, data) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            _this.checkAlgorithm(algorithm);
	            resolve(undefined);
	        });
	    };
	    return Sha;
	}(base_1.BaseCrypto));
	exports.Sha = Sha;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var error_1 = __webpack_require__(5);
	var base_1 = __webpack_require__(6);
	var alg_1 = __webpack_require__(7);
	var crypto_1 = __webpack_require__(10);
	var RsaKeyGenParamsError = (function (_super) {
	    __extends(RsaKeyGenParamsError, _super);
	    function RsaKeyGenParamsError() {
	        var _this = _super.apply(this, arguments) || this;
	        _this.code = 2;
	        return _this;
	    }
	    return RsaKeyGenParamsError;
	}(error_1.AlgorithmError));
	exports.RsaKeyGenParamsError = RsaKeyGenParamsError;
	var RsaHashedImportParamsError = (function (_super) {
	    __extends(RsaHashedImportParamsError, _super);
	    function RsaHashedImportParamsError() {
	        var _this = _super.apply(this, arguments) || this;
	        _this.code = 6;
	        return _this;
	    }
	    return RsaHashedImportParamsError;
	}(error_1.AlgorithmError));
	exports.RsaHashedImportParamsError = RsaHashedImportParamsError;
	var Rsa = (function (_super) {
	    __extends(Rsa, _super);
	    function Rsa() {
	        return _super.apply(this, arguments) || this;
	    }
	    Rsa.checkAlgorithm = function (alg) {
	        if (alg.name.toUpperCase() !== this.ALG_NAME.toUpperCase())
	            throw new error_1.AlgorithmError(error_1.AlgorithmError.WRONG_ALG_NAME, alg.name, this.ALG_NAME);
	    };
	    Rsa.checkImportAlgorithm = function (alg) {
	        /**
	         * Check alg name. Use the same way as Chrome uses.
	         * It throws error if algorithm doesn't have a `name` paramter
	         * But it's not a equal to W3 specification
	         * https://www.w3.org/TR/WebCryptoAPI/#dfn-RsaHashedImportParams
	         *
	         */
	        this.checkAlgorithm(alg);
	        if (!alg.hash)
	            throw new RsaHashedImportParamsError(RsaHashedImportParamsError.PARAM_REQUIRED, "hash");
	        crypto_1.Sha.checkAlgorithm(alg.hash);
	    };
	    Rsa.checkKeyGenParams = function (alg) {
	        // modulusLength
	        switch (alg.modulusLength) {
	            case 1024:
	            case 2048:
	            case 4096:
	                break;
	            default:
	                throw new RsaKeyGenParamsError(RsaKeyGenParamsError.PARAM_WRONG_VALUE, "modulusLength", "1024, 2048 or 4096");
	        }
	        // publicExponent
	        var pubExp = alg.publicExponent;
	        if (!pubExp)
	            throw new RsaKeyGenParamsError(RsaKeyGenParamsError.PARAM_REQUIRED, "publicExponent");
	        if (!ArrayBuffer.isView(pubExp))
	            throw new RsaKeyGenParamsError(RsaKeyGenParamsError.PARAM_WRONG_TYPE, "publicExponent", "ArrayBufferView");
	        if (!(pubExp[0] === 3 || (pubExp[0] === 1 && pubExp[1] === 0 && pubExp[2] === 1)))
	            throw new RsaKeyGenParamsError(RsaKeyGenParamsError.PARAM_WRONG_VALUE, "publicExponent", "Uint8Array([3]) | Uint8Array([1, 0, 1])");
	        // hash
	        if (!alg.hash)
	            throw new RsaKeyGenParamsError(RsaKeyGenParamsError.PARAM_REQUIRED, "hash", crypto_1.ShaAlgorithms);
	        crypto_1.Sha.checkAlgorithm(alg.hash);
	    };
	    Rsa.checkKeyGenUsages = function (keyUsages) {
	        var _this = this;
	        this.checkKeyUsages(keyUsages);
	        keyUsages.forEach(function (usage) {
	            var i = 0;
	            for (i; i < _this.KEY_USAGES.length; i++)
	                if (_this.KEY_USAGES[i].toLowerCase() === usage.toLowerCase()) {
	                    break;
	                }
	            if (i === _this.KEY_USAGES.length)
	                throw new error_1.WebCryptoError("Unsuported key usage '" + usage + "'. Should be one of [" + _this.KEY_USAGES.join(", ") + "]");
	        });
	    };
	    Rsa.generateKey = function (algorithm, extractable, keyUsages) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            _this.checkAlgorithm(algorithm);
	            _this.checkKeyGenParams(algorithm);
	            _this.checkKeyGenUsages(keyUsages);
	            resolve(undefined);
	        });
	    };
	    Rsa.exportKey = function (format, key) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            _this.checkKey(key, _this.ALG_NAME);
	            _this.checkFormat(format, key.type);
	            resolve(undefined);
	        });
	    };
	    Rsa.importKey = function (format, keyData, algorithm, extractable, keyUsages) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            _this.checkImportAlgorithm(algorithm);
	            _this.checkFormat(format);
	            if (format.toLowerCase() === "raw")
	                throw new error_1.CryptoKeyError(error_1.CryptoKeyError.ALLOWED_FORMAT, format, "'JsonWebKey', 'pkcs8' or 'spki'");
	            _this.checkKeyGenUsages(keyUsages);
	            resolve(undefined);
	        });
	    };
	    return Rsa;
	}(base_1.BaseCrypto));
	Rsa.ALG_NAME = "";
	Rsa.KEY_USAGES = [];
	exports.Rsa = Rsa;
	var RsaSSA = (function (_super) {
	    __extends(RsaSSA, _super);
	    function RsaSSA() {
	        return _super.apply(this, arguments) || this;
	    }
	    RsaSSA.sign = function (algorithm, key, data) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            _this.checkAlgorithmParams(algorithm);
	            _this.checkKey(key, _this.ALG_NAME, "private", "sign");
	            resolve(undefined);
	        });
	    };
	    RsaSSA.verify = function (algorithm, key, signature, data) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            _this.checkAlgorithmParams(algorithm);
	            _this.checkKey(key, _this.ALG_NAME, "public", "verify");
	            resolve(undefined);
	        });
	    };
	    return RsaSSA;
	}(Rsa));
	RsaSSA.ALG_NAME = alg_1.AlgorithmNames.RsaSSA;
	RsaSSA.KEY_USAGES = ["sign", "verify"];
	exports.RsaSSA = RsaSSA;
	var RsaPSSParamsError = (function (_super) {
	    __extends(RsaPSSParamsError, _super);
	    function RsaPSSParamsError() {
	        var _this = _super.apply(this, arguments) || this;
	        _this.code = 4;
	        return _this;
	    }
	    return RsaPSSParamsError;
	}(error_1.AlgorithmError));
	exports.RsaPSSParamsError = RsaPSSParamsError;
	var RsaPSS = (function (_super) {
	    __extends(RsaPSS, _super);
	    function RsaPSS() {
	        return _super.apply(this, arguments) || this;
	    }
	    RsaPSS.checkRsaPssParams = function (alg) {
	        /**
	         * TODO: Check alg verification in browser
	         */
	        _super.checkAlgorithmParams.call(this, alg);
	        if (!alg.saltLength)
	            return new RsaPSSParamsError(RsaPSSParamsError.PARAM_REQUIRED, "saltLength");
	        if (alg.saltLength % 8)
	            return new RsaPSSParamsError("Parameter 'saltLength' should be a multiple of 8");
	    };
	    return RsaPSS;
	}(RsaSSA));
	RsaPSS.ALG_NAME = alg_1.AlgorithmNames.RsaPSS;
	RsaPSS.KEY_USAGES = ["sign", "verify"];
	exports.RsaPSS = RsaPSS;
	var RsaOAEPParamsError = (function (_super) {
	    __extends(RsaOAEPParamsError, _super);
	    function RsaOAEPParamsError() {
	        var _this = _super.apply(this, arguments) || this;
	        _this.code = 5;
	        return _this;
	    }
	    return RsaOAEPParamsError;
	}(error_1.AlgorithmError));
	exports.RsaOAEPParamsError = RsaOAEPParamsError;
	var RsaOAEP = (function (_super) {
	    __extends(RsaOAEP, _super);
	    function RsaOAEP() {
	        return _super.apply(this, arguments) || this;
	    }
	    RsaOAEP.checkAlgorithmParams = function (alg) {
	        if (alg.label) {
	            if (!ArrayBuffer.isView(alg.label))
	                return new RsaOAEPParamsError(RsaOAEPParamsError.PARAM_WRONG_TYPE, "label", "ArrayBufferView");
	        }
	    };
	    RsaOAEP.encrypt = function (algorithm, key, data) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            _this.checkAlgorithmParams(algorithm);
	            _this.checkKey(key, _this.ALG_NAME, "public", "encrypt");
	            resolve(undefined);
	        });
	    };
	    RsaOAEP.decrypt = function (algorithm, key, data) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            _this.checkAlgorithmParams(algorithm);
	            _this.checkKey(key, _this.ALG_NAME, "private", "decrypt");
	            resolve(undefined);
	        });
	    };
	    RsaOAEP.wrapKey = function (format, key, wrappingKey, wrapAlgorithm) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            _this.checkAlgorithmParams(wrapAlgorithm);
	            _this.checkKey(wrappingKey, _this.ALG_NAME, "public", "wrapKey");
	            _this.checkWrappedKey(key);
	            _this.checkFormat(format, key.type);
	            resolve(undefined);
	        });
	    };
	    RsaOAEP.unwrapKey = function (format, wrappedKey, unwrappingKey, unwrapAlgorithm, unwrappedKeyAlgorithm, extractable, keyUsages) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            _this.checkAlgorithmParams(unwrapAlgorithm);
	            _this.checkKey(unwrappingKey, _this.ALG_NAME, "private", "unwrapKey");
	            _this.checkFormat(format);
	            // TODO check unwrappedKeyAlgorithm
	            // TODO check keyUSages
	            resolve(undefined);
	        });
	    };
	    return RsaOAEP;
	}(Rsa));
	RsaOAEP.ALG_NAME = alg_1.AlgorithmNames.RsaOAEP;
	RsaOAEP.KEY_USAGES = ["encrypt", "decrypt", "wrapKey", "unwrapKey"];
	exports.RsaOAEP = RsaOAEP;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var error_1 = __webpack_require__(5);
	var base_1 = __webpack_require__(6);
	var alg_1 = __webpack_require__(7);
	var AesKeyGenParamsError = (function (_super) {
	    __extends(AesKeyGenParamsError, _super);
	    function AesKeyGenParamsError() {
	        var _this = _super.apply(this, arguments) || this;
	        _this.code = 7;
	        return _this;
	    }
	    return AesKeyGenParamsError;
	}(error_1.AlgorithmError));
	var Aes = (function (_super) {
	    __extends(Aes, _super);
	    function Aes() {
	        return _super.apply(this, arguments) || this;
	    }
	    Aes.checkKeyUsages = function (keyUsages) {
	        var _this = this;
	        _super.checkKeyUsages.call(this, keyUsages);
	        var wron_usage = keyUsages.filter(function (usage) { return _this.KEY_USAGES.indexOf(usage) === -1; });
	        if (wron_usage.length)
	            throw new error_1.AlgorithmError(error_1.AlgorithmError.WRONG_USAGE, wron_usage.join(", "));
	    };
	    Aes.checkAlgorithm = function (alg) {
	        if (alg.name.toUpperCase() !== this.ALG_NAME.toUpperCase())
	            throw new error_1.AlgorithmError(error_1.AlgorithmError.WRONG_ALG_NAME, alg.name, this.ALG_NAME);
	    };
	    Aes.checkKeyGenParams = function (alg) {
	        switch (alg.length) {
	            case 128:
	            case 192:
	            case 256:
	                break;
	            default:
	                throw new AesKeyGenParamsError(AesKeyGenParamsError.PARAM_WRONG_VALUE, "length", "128, 192 or 256");
	        }
	    };
	    Aes.checkKeyGenUsages = function (keyUsages) {
	        var _this = this;
	        this.checkKeyUsages(keyUsages);
	        keyUsages.forEach(function (usage) {
	            var i = 0;
	            for (i; i < _this.KEY_USAGES.length; i++)
	                if (_this.KEY_USAGES[i].toLowerCase() === usage.toLowerCase()) {
	                    break;
	                }
	            if (i === _this.KEY_USAGES.length)
	                throw new error_1.WebCryptoError("Unsuported key usage '" + usage + "'. Should be one of [" + _this.KEY_USAGES.join(", ") + "]");
	        });
	    };
	    Aes.generateKey = function (algorithm, extractable, keyUsages) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            _this.checkAlgorithm(algorithm);
	            _this.checkKeyGenParams(algorithm);
	            _this.checkKeyGenUsages(keyUsages);
	            resolve(undefined);
	        });
	    };
	    Aes.exportKey = function (format, key) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            _this.checkKey(key, _this.ALG_NAME);
	            _this.checkFormat(format, key.type);
	            resolve(undefined);
	        });
	    };
	    Aes.importKey = function (format, keyData, algorithm, extractable, keyUsages) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            _this.checkAlgorithm(algorithm);
	            _this.checkFormat(format);
	            if (!(format.toLowerCase() === "raw" || format.toLowerCase() === "jwk"))
	                throw new error_1.CryptoKeyError(error_1.CryptoKeyError.ALLOWED_FORMAT, format, "'jwk' or 'raw'");
	            _this.checkKeyGenUsages(keyUsages);
	            resolve(undefined);
	        });
	    };
	    return Aes;
	}(base_1.BaseCrypto));
	Aes.ALG_NAME = "";
	Aes.KEY_USAGES = [];
	exports.Aes = Aes;
	var AesAlgorithmError = (function (_super) {
	    __extends(AesAlgorithmError, _super);
	    function AesAlgorithmError() {
	        var _this = _super.apply(this, arguments) || this;
	        _this.code = 8;
	        return _this;
	    }
	    return AesAlgorithmError;
	}(error_1.AlgorithmError));
	exports.AesAlgorithmError = AesAlgorithmError;
	var AesWrapKey = (function (_super) {
	    __extends(AesWrapKey, _super);
	    function AesWrapKey() {
	        return _super.apply(this, arguments) || this;
	    }
	    AesWrapKey.wrapKey = function (format, key, wrappingKey, wrapAlgorithm) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            _this.checkAlgorithmParams(wrapAlgorithm);
	            _this.checkKey(wrappingKey, _this.ALG_NAME, "secret", "wrapKey");
	            _this.checkWrappedKey(key);
	            _this.checkFormat(format, key.type);
	            resolve(undefined);
	        });
	    };
	    AesWrapKey.unwrapKey = function (format, wrappedKey, unwrappingKey, unwrapAlgorithm, unwrappedKeyAlgorithm, extractable, keyUsages) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            _this.checkAlgorithmParams(unwrapAlgorithm);
	            _this.checkKey(unwrappingKey, _this.ALG_NAME, "secret", "unwrapKey");
	            _this.checkFormat(format);
	            // TODO check unwrappedKeyAlgorithm
	            // TODO check keyUSages
	            resolve(undefined);
	        });
	    };
	    return AesWrapKey;
	}(Aes));
	exports.AesWrapKey = AesWrapKey;
	var AesEncrypt = (function (_super) {
	    __extends(AesEncrypt, _super);
	    function AesEncrypt() {
	        return _super.apply(this, arguments) || this;
	    }
	    AesEncrypt.encrypt = function (algorithm, key, data) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            _this.checkAlgorithmParams(algorithm);
	            _this.checkKey(key, _this.ALG_NAME, "secret", "encrypt");
	            resolve(undefined);
	        });
	    };
	    AesEncrypt.decrypt = function (algorithm, key, data) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            _this.checkAlgorithmParams(algorithm);
	            _this.checkKey(key, _this.ALG_NAME, "secret", "decrypt");
	            resolve(undefined);
	        });
	    };
	    return AesEncrypt;
	}(AesWrapKey));
	AesEncrypt.KEY_USAGES = ["encrypt", "decrypt", "wrapKey", "unwrapKey"];
	exports.AesEncrypt = AesEncrypt;
	var AesCBC = (function (_super) {
	    __extends(AesCBC, _super);
	    function AesCBC() {
	        return _super.apply(this, arguments) || this;
	    }
	    AesCBC.checkAlgorithmParams = function (alg) {
	        this.checkAlgorithm(alg);
	        if (!alg.iv)
	            throw new AesAlgorithmError(AesAlgorithmError.PARAM_REQUIRED, "iv");
	        if (!ArrayBuffer.isView(alg.iv))
	            throw new AesAlgorithmError(AesAlgorithmError.PARAM_WRONG_TYPE, "iv", "ArrayBufferView");
	        if (alg.iv.byteLength !== 16)
	            throw new AesAlgorithmError(AesAlgorithmError.PARAM_WRONG_VALUE, "iv", "ArrayBufferView with size 16");
	    };
	    return AesCBC;
	}(AesEncrypt));
	AesCBC.ALG_NAME = alg_1.AlgorithmNames.AesCBC;
	exports.AesCBC = AesCBC;
	var AesCTR = (function (_super) {
	    __extends(AesCTR, _super);
	    function AesCTR() {
	        return _super.apply(this, arguments) || this;
	    }
	    AesCTR.checkAlgorithmParams = function (alg) {
	        this.checkAlgorithm(alg);
	        if (!(alg.counter && ArrayBuffer.isView(alg.counter)))
	            throw new AesAlgorithmError(AesAlgorithmError.PARAM_WRONG_TYPE, "counter", "ArrayBufferView");
	        if (alg.counter.byteLength !== 16)
	            throw new AesAlgorithmError(AesAlgorithmError.PARAM_WRONG_VALUE, "counter", "ArrayBufferView with size 16");
	        if (!(alg.length > 0 && alg.length <= 128))
	            throw new AesAlgorithmError(AesAlgorithmError.PARAM_WRONG_VALUE, "length", "number [1-128]");
	    };
	    return AesCTR;
	}(AesEncrypt));
	AesCTR.ALG_NAME = alg_1.AlgorithmNames.AesCTR;
	exports.AesCTR = AesCTR;
	var AesGCM = (function (_super) {
	    __extends(AesGCM, _super);
	    function AesGCM() {
	        return _super.apply(this, arguments) || this;
	    }
	    AesGCM.checkAlgorithmParams = function (alg) {
	        this.checkAlgorithm(alg);
	        if (alg.additionalData)
	            if (!ArrayBuffer.isView(alg.additionalData))
	                throw new AesAlgorithmError(AesAlgorithmError.PARAM_WRONG_TYPE, "additionalData", "ArrayBufferView");
	        if (!alg.iv)
	            throw new AesAlgorithmError(AesAlgorithmError.PARAM_REQUIRED, "iv");
	        if (!ArrayBuffer.isView(alg.iv))
	            throw new AesAlgorithmError(AesAlgorithmError.PARAM_WRONG_TYPE, "iv", "ArrayBufferView");
	        if (alg.tagLength)
	            if (!(alg.tagLength >= 0 && alg.tagLength <= 128))
	                throw new AesAlgorithmError(AesAlgorithmError.PARAM_WRONG_VALUE, "tagLength", "number [0-128]");
	    };
	    return AesGCM;
	}(AesEncrypt));
	AesGCM.ALG_NAME = alg_1.AlgorithmNames.AesGCM;
	exports.AesGCM = AesGCM;
	var AesKW = (function (_super) {
	    __extends(AesKW, _super);
	    function AesKW() {
	        return _super.apply(this, arguments) || this;
	    }
	    AesKW.checkAlgorithmParams = function (alg) {
	        this.checkAlgorithm(alg);
	    };
	    return AesKW;
	}(AesWrapKey));
	AesKW.ALG_NAME = alg_1.AlgorithmNames.AesKW;
	AesKW.KEY_USAGES = ["wrapKey", "unwrapKey"];
	exports.AesKW = AesKW;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var crypto_1 = __webpack_require__(12);
	var crypto_2 = __webpack_require__(10);
	var error_1 = __webpack_require__(5);
	var base_1 = __webpack_require__(6);
	var alg_1 = __webpack_require__(7);
	var EcKeyGenParamsError = (function (_super) {
	    __extends(EcKeyGenParamsError, _super);
	    function EcKeyGenParamsError() {
	        var _this = _super.apply(this, arguments) || this;
	        _this.code = 9;
	        return _this;
	    }
	    return EcKeyGenParamsError;
	}(error_1.AlgorithmError));
	exports.EcKeyGenParamsError = EcKeyGenParamsError;
	var Ec = (function (_super) {
	    __extends(Ec, _super);
	    function Ec() {
	        return _super.apply(this, arguments) || this;
	    }
	    Ec.checkAlgorithm = function (alg) {
	        if (alg.name.toUpperCase() !== this.ALG_NAME.toUpperCase())
	            throw new error_1.AlgorithmError(error_1.AlgorithmError.WRONG_ALG_NAME, alg.name, this.ALG_NAME);
	    };
	    Ec.checkKeyGenParams = function (alg) {
	        var param_namedCurve = "namedCurve";
	        if (!alg.namedCurve)
	            throw new EcKeyGenParamsError(EcKeyGenParamsError.PARAM_REQUIRED, param_namedCurve);
	        if (!(typeof alg.namedCurve === "string"))
	            throw new EcKeyGenParamsError(EcKeyGenParamsError.PARAM_WRONG_TYPE, param_namedCurve, "string");
	        switch (alg.namedCurve.toUpperCase()) {
	            case "P-256":
	            case "P-384":
	            case "P-521":
	                break;
	            default:
	                throw new EcKeyGenParamsError(EcKeyGenParamsError.PARAM_WRONG_VALUE, param_namedCurve, "P-256, P-384 or P-521");
	        }
	    };
	    Ec.checkKeyGenUsages = function (keyUsages) {
	        var _this = this;
	        keyUsages.forEach(function (usage) {
	            var i = 0;
	            for (i; i < _this.KEY_USAGES.length; i++)
	                if (_this.KEY_USAGES[i].toLowerCase() === usage.toLowerCase()) {
	                    break;
	                }
	            if (i === _this.KEY_USAGES.length)
	                throw new error_1.WebCryptoError("Unsuported key usage '" + usage + "'. Should be one of [" + _this.KEY_USAGES.join(", ") + "]");
	        });
	    };
	    Ec.generateKey = function (algorithm, extractable, keyUsages) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            _this.checkAlgorithm(algorithm);
	            _this.checkKeyGenParams(algorithm);
	            _this.checkKeyGenUsages(keyUsages);
	            resolve(undefined);
	        });
	    };
	    Ec.exportKey = function (format, key) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            _this.checkKey(key, _this.ALG_NAME);
	            _this.checkFormat(format, key.type);
	            resolve(undefined);
	        });
	    };
	    Ec.importKey = function (format, keyData, algorithm, extractable, keyUsages) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            _this.checkKeyGenParams(algorithm);
	            _this.checkFormat(format);
	            if (format.toLowerCase() === "raw")
	                throw new error_1.CryptoKeyError(error_1.CryptoKeyError.ALLOWED_FORMAT, format, "'JsonWebKey', 'pkcs8' or 'spki'");
	            _this.checkKeyGenUsages(keyUsages);
	            resolve(undefined);
	        });
	    };
	    return Ec;
	}(base_1.BaseCrypto));
	Ec.ALG_NAME = "";
	Ec.KEY_USAGES = [];
	exports.Ec = Ec;
	var EcAlgorithmError = (function (_super) {
	    __extends(EcAlgorithmError, _super);
	    function EcAlgorithmError() {
	        var _this = _super.apply(this, arguments) || this;
	        _this.code = 10;
	        return _this;
	    }
	    return EcAlgorithmError;
	}(error_1.AlgorithmError));
	exports.EcAlgorithmError = EcAlgorithmError;
	var EcDSA = (function (_super) {
	    __extends(EcDSA, _super);
	    function EcDSA() {
	        return _super.apply(this, arguments) || this;
	    }
	    EcDSA.checkAlgorithmParams = function (alg) {
	        this.checkAlgorithm(alg);
	        crypto_2.Sha.checkAlgorithm(alg.hash);
	    };
	    EcDSA.sign = function (algorithm, key, data) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            _this.checkAlgorithmParams(algorithm);
	            _this.checkKey(key, _this.ALG_NAME, "private", "sign");
	            resolve(undefined);
	        });
	    };
	    EcDSA.verify = function (algorithm, key, signature, data) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            _this.checkAlgorithmParams(algorithm);
	            _this.checkKey(key, _this.ALG_NAME, "public", "verify");
	            resolve(undefined);
	        });
	    };
	    return EcDSA;
	}(Ec));
	EcDSA.ALG_NAME = alg_1.AlgorithmNames.EcDSA;
	EcDSA.KEY_USAGES = ["sign", "verify", "deriveKey", "deriveBits"];
	exports.EcDSA = EcDSA;
	var EcDH = (function (_super) {
	    __extends(EcDH, _super);
	    function EcDH() {
	        return _super.apply(this, arguments) || this;
	    }
	    EcDH.checkDeriveParams = function (algorithm) {
	        var param_public = "public";
	        this.checkAlgorithm(algorithm);
	        if (!algorithm.public)
	            throw new EcAlgorithmError(EcAlgorithmError.PARAM_REQUIRED, param_public);
	        this.checkKey(algorithm.public, this.ALG_NAME, "public");
	    };
	    EcDH.deriveBits = function (algorithm, baseKey, length) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            _this.checkDeriveParams(algorithm);
	            _this.checkKey(baseKey, _this.ALG_NAME, "private", "deriveBits");
	            resolve(undefined);
	        });
	    };
	    EcDH.deriveKey = function (algorithm, baseKey, derivedKeyType, extractable, keyUsages) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            _this.checkDeriveParams(algorithm);
	            _this.checkKey(baseKey, _this.ALG_NAME, "private", "deriveKey");
	            base_1.BaseCrypto.checkAlgorithm(derivedKeyType);
	            switch (derivedKeyType.name.toUpperCase()) {
	                case alg_1.AlgorithmNames.AesCBC:
	                    crypto_1.AesCBC.checkKeyGenParams(derivedKeyType);
	                    break;
	                case alg_1.AlgorithmNames.AesCTR:
	                    crypto_1.AesCTR.checkKeyGenParams(derivedKeyType);
	                    break;
	                case alg_1.AlgorithmNames.AesGCM:
	                    crypto_1.AesGCM.checkKeyGenParams(derivedKeyType);
	                    break;
	                case alg_1.AlgorithmNames.AesKW:
	                    crypto_1.AesKW.checkKeyGenParams(derivedKeyType);
	                    break;
	                default:
	                    throw new EcAlgorithmError("Unsupported name '" + derivedKeyType.name + "' for algorithm in param 'derivedKeyType'");
	            }
	            resolve(undefined);
	        });
	    };
	    return EcDH;
	}(Ec));
	EcDH.ALG_NAME = alg_1.AlgorithmNames.EcDH;
	EcDH.KEY_USAGES = ["deriveKey", "deriveBits"];
	exports.EcDH = EcDH;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var error_1 = __webpack_require__(5);
	var base_1 = __webpack_require__(6);
	var alg_1 = __webpack_require__(7);
	var Hmac = (function (_super) {
	    __extends(Hmac, _super);
	    function Hmac() {
	        return _super.apply(this, arguments) || this;
	    }
	    Hmac.checkAlgorithm = function (alg) {
	        if (alg.name.toUpperCase() !== this.ALG_NAME.toUpperCase())
	            throw new error_1.AlgorithmError(error_1.AlgorithmError.WRONG_ALG_NAME, alg.name, this.ALG_NAME);
	    };
	    Hmac.checkKeyGenParams = function (alg) {
	        // length is optional
	        if ("length" in alg && !(alg.length > 0 && alg.length <= 512)) {
	            throw new error_1.AlgorithmError(error_1.AlgorithmError.PARAM_WRONG_VALUE, "length", "more 0 and less than 512");
	        }
	    };
	    Hmac.checkKeyGenUsages = function (keyUsages) {
	        var _this = this;
	        this.checkKeyUsages(keyUsages);
	        keyUsages.forEach(function (usage) {
	            var i = 0;
	            for (i; i < _this.KEY_USAGES.length; i++)
	                if (_this.KEY_USAGES[i].toLowerCase() === usage.toLowerCase()) {
	                    break;
	                }
	            if (i === _this.KEY_USAGES.length)
	                throw new error_1.WebCryptoError("Unsuported key usage '" + usage + "'. Should be one of [" + _this.KEY_USAGES.join(", ") + "]");
	        });
	    };
	    Hmac.generateKey = function (algorithm, extractable, keyUsages) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            _this.checkAlgorithm(algorithm);
	            _this.checkKeyGenParams(algorithm);
	            _this.checkKeyGenUsages(keyUsages);
	            resolve(undefined);
	        });
	    };
	    Hmac.exportKey = function (format, key) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            _this.checkKey(key, _this.ALG_NAME);
	            _this.checkFormat(format, key.type);
	            resolve(undefined);
	        });
	    };
	    Hmac.importKey = function (format, keyData, algorithm, extractable, keyUsages) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            _this.checkAlgorithm(algorithm);
	            _this.checkFormat(format);
	            if (!(format.toLowerCase() === "raw" || format.toLowerCase() === "jwk"))
	                throw new error_1.CryptoKeyError(error_1.CryptoKeyError.ALLOWED_FORMAT, format, "'jwk' or 'raw'");
	            _this.checkKeyGenUsages(keyUsages);
	            resolve(undefined);
	        });
	    };
	    Hmac.sign = function (algorithm, key, data) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            _this.checkAlgorithmParams(algorithm);
	            _this.checkKey(key, _this.ALG_NAME, "secret", "sign");
	            resolve(undefined);
	        });
	    };
	    Hmac.verify = function (algorithm, key, signature, data) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            _this.checkAlgorithmParams(algorithm);
	            _this.checkKey(key, _this.ALG_NAME, "secret", "verify");
	            resolve(undefined);
	        });
	    };
	    return Hmac;
	}(base_1.BaseCrypto));
	Hmac.ALG_NAME = alg_1.AlgorithmNames.Hmac;
	Hmac.KEY_USAGES = ["sign", "verify"];
	exports.Hmac = Hmac;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var error_1 = __webpack_require__(5);
	var base_1 = __webpack_require__(6);
	var base_2 = __webpack_require__(6);
	var alg_1 = __webpack_require__(7);
	var crypto_1 = __webpack_require__(10);
	var Aes = __webpack_require__(12);
	var crypto_2 = __webpack_require__(14);
	var Pbkdf2 = (function (_super) {
	    __extends(Pbkdf2, _super);
	    function Pbkdf2() {
	        return _super.apply(this, arguments) || this;
	    }
	    Pbkdf2.checkAlgorithm = function (alg) {
	        if (alg.name.toUpperCase() !== this.ALG_NAME.toUpperCase())
	            throw new error_1.AlgorithmError(error_1.AlgorithmError.WRONG_ALG_NAME, alg.name, this.ALG_NAME);
	    };
	    Pbkdf2.checkDeriveParams = function (alg) {
	        this.checkAlgorithm(alg);
	        // salt
	        if (alg.salt) {
	            if (!(ArrayBuffer.isView(alg.salt) || alg.salt instanceof ArrayBuffer))
	                throw new error_1.AlgorithmError(error_1.AlgorithmError.PARAM_WRONG_TYPE, "salt", "ArrayBuffer or ArrayBufferView");
	        }
	        else
	            throw new error_1.AlgorithmError(error_1.AlgorithmError.PARAM_REQUIRED, "salt");
	        // iterations
	        if (!alg.iterations)
	            throw new error_1.AlgorithmError(error_1.AlgorithmError.PARAM_REQUIRED, "iterations");
	        // hash
	        if (!alg.hash)
	            throw new error_1.AlgorithmError(error_1.AlgorithmError.PARAM_REQUIRED, "hash");
	        var hash = base_1.PrepareAlgorithm(alg.hash);
	        crypto_1.Sha.checkAlgorithm(hash);
	    };
	    Pbkdf2.importKey = function (format, keyData, algorithm, extractable, keyUsages) {
	        var _this = this;
	        return Promise.resolve()
	            .then(function () {
	            if (extractable)
	                throw new error_1.WebCryptoError("KDF keys must set extractable=false");
	            _this.checkAlgorithm(algorithm);
	            _this.checkFormat(format);
	            if (format.toLowerCase() !== "raw")
	                throw new error_1.CryptoKeyError(error_1.CryptoKeyError.ALLOWED_FORMAT, format, "'raw'");
	            _this.checkKeyUsages(keyUsages);
	        });
	    };
	    Pbkdf2.deriveKey = function (algorithm, baseKey, derivedKeyType, extractable, keyUsages) {
	        var _this = this;
	        return Promise.resolve()
	            .then(function () {
	            _this.checkDeriveParams(algorithm);
	            _this.checkKey(baseKey, _this.ALG_NAME, "secret", "deriveKey");
	            base_2.BaseCrypto.checkAlgorithm(derivedKeyType);
	            // AES-CTR, AES-CBC, AES-CMAC, AES-GCM, AES-CFB, AES-KW, ECDH, DH, or HMAC
	            switch (derivedKeyType.name.toUpperCase()) {
	                case alg_1.AlgorithmNames.AesCBC:
	                    Aes.AesCBC.checkKeyGenParams(derivedKeyType);
	                    Aes.AesCBC.checkKeyUsages(keyUsages);
	                    break;
	                case alg_1.AlgorithmNames.AesCTR:
	                    Aes.AesCTR.checkKeyGenParams(derivedKeyType);
	                    Aes.AesCTR.checkKeyUsages(keyUsages);
	                    break;
	                case alg_1.AlgorithmNames.AesGCM:
	                    Aes.AesGCM.checkKeyGenParams(derivedKeyType);
	                    Aes.AesGCM.checkKeyUsages(keyUsages);
	                    break;
	                case alg_1.AlgorithmNames.AesKW:
	                    Aes.AesKW.checkKeyGenParams(derivedKeyType);
	                    Aes.AesKW.checkKeyUsages(keyUsages);
	                    break;
	                case alg_1.AlgorithmNames.Hmac:
	                    crypto_2.Hmac.checkKeyGenParams(derivedKeyType);
	                    crypto_2.Hmac.checkKeyUsages(keyUsages);
	                    break;
	                default:
	                    throw new error_1.AlgorithmError(error_1.AlgorithmError.UNSUPPORTED_ALGORITHM, derivedKeyType);
	            }
	        });
	    };
	    Pbkdf2.deriveBits = function (algorithm, baseKey, length) {
	        var _this = this;
	        return Promise.resolve()
	            .then(function () {
	            _this.checkDeriveParams(algorithm);
	            _this.checkKey(baseKey, _this.ALG_NAME, "secret", "deriveBits");
	            if (!(length && typeof length === "number"))
	                throw new error_1.WebCryptoError("Parameter 'length' must be Number and more than 0");
	        });
	    };
	    return Pbkdf2;
	}(base_2.BaseCrypto));
	Pbkdf2.ALG_NAME = alg_1.AlgorithmNames.Pbkdf2;
	Pbkdf2.KEY_USAGES = ["deriveKey", "deriveBits"];
	exports.Pbkdf2 = Pbkdf2;


/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = require("crypto");;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var subtle_1 = __webpack_require__(18);
	var init_1 = __webpack_require__(2);
	var Crypto = (function () {
	    function Crypto() {
	        this.subtle = new subtle_1.SubtleCrypto();
	    }
	    Crypto.prototype.getRandomValues = function (array) {
	        return init_1.nativeCrypto.getRandomValues(array);
	    };
	    return Crypto;
	}());
	exports.Crypto = Crypto;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	// Core
	var webcrypto_core_1 = __webpack_require__(4);
	var core = __webpack_require__(4);
	var webcrypto_core_2 = __webpack_require__(4);
	// Base
	var init_1 = __webpack_require__(2);
	var error_1 = __webpack_require__(3);
	var crypto_1 = __webpack_require__(17);
	var helper_1 = __webpack_require__(19);
	// Crypto
	var crypto_2 = __webpack_require__(20);
	var crypto_3 = __webpack_require__(22);
	var crypto_4 = __webpack_require__(23);
	var crypto_5 = __webpack_require__(24);
	var keys = [];
	function PrepareKey(key, subtle) {
	    return Promise.resolve()
	        .then(function () {
	        if (!key.key) {
	            if (!key.extractable) {
	                throw new error_1.LinerError("'key' is Native CryptoKey. It can't be converted to JS CryptoKey");
	            }
	            else {
	                var crypto_6 = new crypto_1.Crypto();
	                return crypto_6.subtle.exportKey("jwk", key)
	                    .then(function (jwk) {
	                    return subtle.importKey("jwk", jwk, key.algorithm, true, key.usages);
	                });
	            }
	        }
	        else
	            return key;
	    });
	}
	var SubtleCrypto = (function (_super) {
	    __extends(SubtleCrypto, _super);
	    function SubtleCrypto() {
	        return _super.apply(this, arguments) || this;
	    }
	    SubtleCrypto.prototype.generateKey = function (algorithm, extractable, keyUsages) {
	        var args = arguments;
	        var _alg;
	        return _super.prototype.generateKey.apply(this, args)
	            .then(function (d) {
	            _alg = webcrypto_core_2.PrepareAlgorithm(algorithm);
	            try {
	                return init_1.nativeSubtle.generateKey.apply(init_1.nativeSubtle, args)
	                    .catch(function (e) {
	                    console.warn("WebCrypto: native generateKey for " + _alg.name + " doesn't work.", e.message || "");
	                });
	            }
	            catch (e) {
	                console.warn("WebCrypto: native generateKey for " + _alg.name + " doesn't work.", e.message || "");
	            }
	        })
	            .then(function (keys) {
	            if (keys) {
	                FixCryptoKeyUsages(keys, keyUsages);
	                SetHashAlgorithm(_alg, keys);
	                return keys;
	            }
	            var Class;
	            switch (_alg.name.toLowerCase()) {
	                case webcrypto_core_1.AlgorithmNames.AesCBC.toLowerCase():
	                case webcrypto_core_1.AlgorithmNames.AesGCM.toLowerCase():
	                    Class = crypto_2.AesCrypto;
	                    break;
	                case webcrypto_core_1.AlgorithmNames.EcDSA.toLowerCase():
	                case webcrypto_core_1.AlgorithmNames.EcDH.toLowerCase():
	                    Class = crypto_5.EcCrypto;
	                    break;
	                case webcrypto_core_1.AlgorithmNames.RsaOAEP.toLowerCase():
	                case webcrypto_core_1.AlgorithmNames.RsaPSS.toLowerCase():
	                    Class = crypto_4.RsaCrypto;
	                    break;
	                default:
	                    throw new error_1.LinerError(error_1.LinerError.NOT_SUPPORTED, "generateKey");
	            }
	            return Class.generateKey(_alg, extractable, keyUsages);
	        });
	    };
	    SubtleCrypto.prototype.digest = function (algorithm, data) {
	        var args = arguments;
	        var _alg;
	        var _data;
	        return _super.prototype.digest.apply(this, args)
	            .then(function (d) {
	            _alg = webcrypto_core_2.PrepareAlgorithm(algorithm);
	            _data = webcrypto_core_2.PrepareData(data, "data");
	            try {
	                return init_1.nativeSubtle.digest.apply(init_1.nativeSubtle, args)
	                    .catch(function (e) {
	                    console.warn("WebCrypto: native digest for " + _alg.name + " doesn't work.", e.message || "");
	                });
	            }
	            catch (e) {
	                console.warn("WebCrypto: native digest for " + _alg.name + " doesn't work.", e.message || "");
	            }
	        })
	            .then(function (digest) {
	            if (digest)
	                return digest;
	            return crypto_3.ShaCrypto.digest(_alg, _data);
	        });
	    };
	    SubtleCrypto.prototype.sign = function (algorithm, key, data) {
	        var args = arguments;
	        var _alg;
	        var _data;
	        return _super.prototype.sign.apply(this, args)
	            .then(function (d) {
	            _alg = webcrypto_core_2.PrepareAlgorithm(algorithm);
	            _data = webcrypto_core_2.PrepareData(data, "data");
	            var _alg2 = GetHashAlgorithm(key);
	            if (_alg2) {
	                args[0] = helper_1.assign(_alg, _alg2);
	            }
	            try {
	                return init_1.nativeSubtle.sign.apply(init_1.nativeSubtle, args)
	                    .catch(function (e) {
	                    console.warn("WebCrypto: native sign for " + _alg.name + " doesn't work.", e.message || "");
	                });
	            }
	            catch (e) {
	                console.warn("WebCrypto: native sign for " + _alg.name + " doesn't work.", e.message || "");
	            }
	        })
	            .then(function (signature) {
	            if (signature)
	                return signature;
	            var Class;
	            switch (_alg.name.toLowerCase()) {
	                case webcrypto_core_1.AlgorithmNames.EcDSA.toLowerCase():
	                    Class = crypto_5.EcCrypto;
	                    break;
	                case webcrypto_core_1.AlgorithmNames.RsaPSS.toLowerCase():
	                    Class = crypto_4.RsaCrypto;
	                    break;
	                default:
	                    throw new error_1.LinerError(error_1.LinerError.NOT_SUPPORTED, "sign");
	            }
	            return PrepareKey(key, Class)
	                .then(function (key) { return Class.sign(_alg, key, _data); });
	        });
	    };
	    SubtleCrypto.prototype.verify = function (algorithm, key, signature, data) {
	        var args = arguments;
	        var _alg;
	        var _signature;
	        var _data;
	        return _super.prototype.verify.apply(this, args)
	            .then(function (d) {
	            _alg = webcrypto_core_2.PrepareAlgorithm(algorithm);
	            _signature = webcrypto_core_2.PrepareData(signature, "data");
	            _data = webcrypto_core_2.PrepareData(data, "data");
	            var _alg2 = GetHashAlgorithm(key);
	            if (_alg2) {
	                args[0] = helper_1.assign(_alg, _alg2);
	            }
	            try {
	                return init_1.nativeSubtle.verify.apply(init_1.nativeSubtle, args)
	                    .catch(function (e) {
	                    console.warn("WebCrypto: native verify for " + _alg.name + " doesn't work.", e.message || "");
	                });
	            }
	            catch (e) {
	                console.warn("WebCrypto: native verify for " + _alg.name + " doesn't work.", e.message || "");
	            }
	        })
	            .then(function (result) {
	            if (typeof result === "boolean")
	                return result;
	            var Class;
	            switch (_alg.name.toLowerCase()) {
	                case webcrypto_core_1.AlgorithmNames.EcDSA.toLowerCase():
	                    Class = crypto_5.EcCrypto;
	                    break;
	                case webcrypto_core_1.AlgorithmNames.RsaPSS.toLowerCase():
	                    Class = crypto_4.RsaCrypto;
	                    break;
	                default:
	                    throw new error_1.LinerError(error_1.LinerError.NOT_SUPPORTED, "sign");
	            }
	            return PrepareKey(key, Class)
	                .then(function (key) { return Class.verify(_alg, key, _signature, _data); });
	        });
	    };
	    SubtleCrypto.prototype.deriveBits = function (algorithm, baseKey, length) {
	        var args = arguments;
	        var _alg;
	        return _super.prototype.deriveBits.apply(this, args)
	            .then(function (bits) {
	            _alg = webcrypto_core_2.PrepareAlgorithm(algorithm);
	            try {
	                return init_1.nativeSubtle.deriveBits.apply(init_1.nativeSubtle, args)
	                    .catch(function (e) {
	                    console.warn("WebCrypto: native deriveBits for " + _alg.name + " doesn't work.", e.message || "");
	                });
	            }
	            catch (e) {
	                // Edge throws error. Don't know Why.
	                console.warn("WebCrypto: native deriveBits for " + _alg.name + " doesn't work.", e.message || "");
	            }
	        })
	            .then(function (bits) {
	            if (bits)
	                return bits;
	            var Class;
	            switch (_alg.name.toLowerCase()) {
	                case webcrypto_core_1.AlgorithmNames.EcDH.toLowerCase():
	                    Class = crypto_5.EcCrypto;
	                    break;
	                default:
	                    throw new error_1.LinerError(error_1.LinerError.NOT_SUPPORTED, "deriveBits");
	            }
	            return Class.deriveBits(_alg, baseKey, length);
	        });
	    };
	    SubtleCrypto.prototype.deriveKey = function (algorithm, baseKey, derivedKeyType, extractable, keyUsages) {
	        var args = arguments;
	        var _alg;
	        var _algDerivedKey;
	        return _super.prototype.deriveKey.apply(this, args)
	            .then(function (bits) {
	            _alg = webcrypto_core_2.PrepareAlgorithm(algorithm);
	            _algDerivedKey = webcrypto_core_2.PrepareAlgorithm(derivedKeyType);
	            try {
	                return init_1.nativeSubtle.deriveKey.apply(init_1.nativeSubtle, args)
	                    .catch(function (e) {
	                    console.warn("WebCrypto: native deriveKey for " + _alg.name + " doesn't work.", e.message || "");
	                });
	            }
	            catch (e) {
	                // Edge doesn't go to catch of Promise
	                console.warn("WebCrypto: native deriveKey for " + _alg.name + " doesn't work.", e.message || "");
	            }
	        })
	            .then(function (key) {
	            if (key) {
	                FixCryptoKeyUsages(key, keyUsages);
	                return key;
	            }
	            var Class;
	            switch (_alg.name.toLowerCase()) {
	                case webcrypto_core_1.AlgorithmNames.EcDH.toLowerCase():
	                    Class = crypto_5.EcCrypto;
	                    break;
	                default:
	                    throw new error_1.LinerError(error_1.LinerError.NOT_SUPPORTED, "deriveBits");
	            }
	            return Class.deriveKey(_alg, baseKey, _algDerivedKey, extractable, keyUsages);
	        });
	    };
	    SubtleCrypto.prototype.encrypt = function (algorithm, key, data) {
	        var args = arguments;
	        var _alg;
	        var _data;
	        return _super.prototype.encrypt.apply(this, args)
	            .then(function (bits) {
	            _alg = webcrypto_core_2.PrepareAlgorithm(algorithm);
	            _data = webcrypto_core_2.PrepareData(data, "data");
	            try {
	                return init_1.nativeSubtle.encrypt.apply(init_1.nativeSubtle, args)
	                    .catch(function (e) {
	                    console.warn("WebCrypto: native 'encrypt' for " + _alg.name + " doesn't work.", e.message || "");
	                });
	            }
	            catch (e) {
	                console.warn("WebCrypto: native 'encrypt' for " + _alg.name + " doesn't work.", e.message || "");
	            }
	        })
	            .then(function (msg) {
	            if (msg) {
	                if (helper_1.BrowserInfo().name === helper_1.Browser.IE &&
	                    _alg.name.toUpperCase() === webcrypto_core_1.AlgorithmNames.AesGCM &&
	                    msg.ciphertext) {
	                    // Concatinate values in IE
	                    var buf_1 = new Uint8Array(msg.ciphertext.byteLength + msg.tag.byteLength);
	                    var count_1 = 0;
	                    new Uint8Array(msg.ciphertext).forEach(function (v) { return buf_1[count_1++] = v; });
	                    new Uint8Array(msg.tag).forEach(function (v) { return buf_1[count_1++] = v; });
	                    msg = buf_1.buffer;
	                }
	                return Promise.resolve(msg);
	            }
	            var Class;
	            switch (_alg.name.toLowerCase()) {
	                case webcrypto_core_1.AlgorithmNames.AesCBC.toLowerCase():
	                case webcrypto_core_1.AlgorithmNames.AesGCM.toLowerCase():
	                    Class = crypto_2.AesCrypto;
	                    break;
	                case webcrypto_core_1.AlgorithmNames.RsaOAEP.toLowerCase():
	                    Class = crypto_4.RsaCrypto;
	                    break;
	                default:
	                    throw new error_1.LinerError(error_1.LinerError.NOT_SUPPORTED, "encrypt");
	            }
	            return PrepareKey(key, Class)
	                .then(function (key) { return Class.encrypt(_alg, key, _data); });
	        });
	    };
	    SubtleCrypto.prototype.decrypt = function (algorithm, key, data) {
	        var args = arguments;
	        var _alg;
	        var _data;
	        return _super.prototype.decrypt.apply(this, args)
	            .then(function (bits) {
	            _alg = webcrypto_core_2.PrepareAlgorithm(algorithm);
	            _data = webcrypto_core_2.PrepareData(data, "data");
	            var _data2 = _data;
	            if (helper_1.BrowserInfo().name === helper_1.Browser.IE &&
	                _alg.name.toUpperCase() === webcrypto_core_1.AlgorithmNames.AesGCM) {
	                // Split buffer
	                var len = _data.byteLength - (_alg.tagLength / 8);
	                _data2 = {
	                    ciphertext: _data.buffer.slice(0, len),
	                    tag: _data.buffer.slice(len, _data.byteLength)
	                };
	            }
	            try {
	                return init_1.nativeSubtle.decrypt.call(init_1.nativeSubtle, _alg, key, _data2)
	                    .catch(function (e) {
	                    console.warn("WebCrypto: native 'decrypt' for " + _alg.name + " doesn't work.", e.message || "");
	                });
	            }
	            catch (e) {
	                console.warn("WebCrypto: native 'decrypt' for " + _alg.name + " doesn't work.", e.message || "");
	            }
	        })
	            .then(function (msg) {
	            if (msg)
	                return msg;
	            var Class;
	            switch (_alg.name.toLowerCase()) {
	                case webcrypto_core_1.AlgorithmNames.AesCBC.toLowerCase():
	                case webcrypto_core_1.AlgorithmNames.AesGCM.toLowerCase():
	                    Class = crypto_2.AesCrypto;
	                    break;
	                case webcrypto_core_1.AlgorithmNames.RsaOAEP.toLowerCase():
	                    Class = crypto_4.RsaCrypto;
	                    break;
	                default:
	                    throw new error_1.LinerError(error_1.LinerError.NOT_SUPPORTED, "encrypt");
	            }
	            return PrepareKey(key, Class)
	                .then(function (key) { return Class.decrypt(_alg, key, _data); });
	        });
	    };
	    SubtleCrypto.prototype.wrapKey = function (format, key, wrappingKey, wrapAlgorithm) {
	        var args = arguments;
	        var _alg;
	        return _super.prototype.wrapKey.apply(this, args)
	            .then(function (bits) {
	            _alg = webcrypto_core_2.PrepareAlgorithm(wrapAlgorithm);
	            try {
	                return init_1.nativeSubtle.wrapKey.apply(init_1.nativeSubtle, args)
	                    .catch(function (e) {
	                    console.warn("WebCrypto: native 'wrapKey' for " + _alg.name + " doesn't work.", e.message || "");
	                });
	            }
	            catch (e) {
	                console.warn("WebCrypto: native 'wrapKey' for " + _alg.name + " doesn't work.", e.message || "");
	            }
	        })
	            .then(function (msg) {
	            if (msg)
	                return msg;
	            var Class;
	            switch (_alg.name.toLowerCase()) {
	                case webcrypto_core_1.AlgorithmNames.AesCBC.toLowerCase():
	                case webcrypto_core_1.AlgorithmNames.AesGCM.toLowerCase():
	                    Class = crypto_2.AesCrypto;
	                    break;
	                case webcrypto_core_1.AlgorithmNames.RsaOAEP.toLowerCase():
	                    Class = crypto_4.RsaCrypto;
	                    break;
	                default:
	                    throw new error_1.LinerError(error_1.LinerError.NOT_SUPPORTED, "wrapKey");
	            }
	            return Class.wrapKey(format, key, wrappingKey, _alg);
	        });
	    };
	    SubtleCrypto.prototype.unwrapKey = function (format, wrappedKey, unwrappingKey, unwrapAlgorithm, unwrappedKeyAlgorithm, extractable, keyUsages) {
	        var args = arguments;
	        var _alg;
	        var _algKey;
	        var _data;
	        return _super.prototype.unwrapKey.apply(this, args)
	            .then(function (bits) {
	            _alg = webcrypto_core_2.PrepareAlgorithm(unwrapAlgorithm);
	            _algKey = webcrypto_core_2.PrepareAlgorithm(unwrappedKeyAlgorithm);
	            _data = webcrypto_core_2.PrepareData(wrappedKey, "wrappedKey");
	            try {
	                return init_1.nativeSubtle.unwrapKey.apply(init_1.nativeSubtle, args)
	                    .catch(function (e) {
	                    console.warn("WebCrypto: native 'unwrapKey' for " + _alg.name + " doesn't work.", e.message || "");
	                });
	            }
	            catch (e) {
	                console.warn("WebCrypto: native 'unwrapKey' for " + _alg.name + " doesn't work.", e.message || "");
	            }
	        })
	            .then(function (k) {
	            if (k) {
	                FixCryptoKeyUsages(k, keyUsages);
	                return k;
	            }
	            var Class;
	            switch (_alg.name.toLowerCase()) {
	                case webcrypto_core_1.AlgorithmNames.AesCBC.toLowerCase():
	                case webcrypto_core_1.AlgorithmNames.AesGCM.toLowerCase():
	                    Class = crypto_2.AesCrypto;
	                    break;
	                case webcrypto_core_1.AlgorithmNames.RsaOAEP.toLowerCase():
	                    Class = crypto_4.RsaCrypto;
	                    break;
	                default:
	                    throw new error_1.LinerError(error_1.LinerError.NOT_SUPPORTED, "unwrapKey");
	            }
	            return Class.unwrapKey(format, _data, unwrappingKey, _alg, _algKey, extractable, keyUsages);
	        });
	    };
	    SubtleCrypto.prototype.exportKey = function (format, key) {
	        var args = arguments;
	        return _super.prototype.exportKey.apply(this, args)
	            .then(function () {
	            try {
	                return init_1.nativeSubtle.exportKey.apply(init_1.nativeSubtle, args)
	                    .catch(function (e) {
	                    console.warn("WebCrypto: native 'exportKey' for " + key.algorithm.name + " doesn't work.", e.message || "");
	                });
	            }
	            catch (e) {
	                console.warn("WebCrypto: native 'exportKey' for " + key.algorithm.name + " doesn't work.", e.message || "");
	            }
	        })
	            .then(function (msg) {
	            if (msg) {
	                if (format === "jwk" && msg instanceof ArrayBuffer) {
	                    msg = helper_1.buffer2string(new Uint8Array(msg));
	                    msg = JSON.parse(msg);
	                }
	                var alg = GetHashAlgorithm(key);
	                if (!alg)
	                    alg = helper_1.assign({}, key.algorithm);
	                FixExportJwk(msg, alg, key.usages);
	                return Promise.resolve(msg);
	            }
	            if (!key.key)
	                throw new error_1.LinerError("Cannot export native CryptoKey from JS implementation");
	            var Class;
	            switch (key.algorithm.name.toLowerCase()) {
	                case webcrypto_core_1.AlgorithmNames.AesCBC.toLowerCase():
	                case webcrypto_core_1.AlgorithmNames.AesGCM.toLowerCase():
	                    Class = crypto_2.AesCrypto;
	                    break;
	                case webcrypto_core_1.AlgorithmNames.EcDH.toLowerCase():
	                case webcrypto_core_1.AlgorithmNames.EcDSA.toLowerCase():
	                    Class = crypto_5.EcCrypto;
	                    break;
	                case webcrypto_core_1.AlgorithmNames.RsaPSS.toLowerCase():
	                case webcrypto_core_1.AlgorithmNames.RsaOAEP.toLowerCase():
	                    Class = crypto_4.RsaCrypto;
	                    break;
	                default:
	                    throw new error_1.LinerError(error_1.LinerError.NOT_SUPPORTED, "exportKey");
	            }
	            return Class.exportKey(format, key);
	        });
	    };
	    SubtleCrypto.prototype.importKey = function (format, keyData, algorithm, extractable, keyUsages) {
	        var args = arguments;
	        var _alg;
	        var _data;
	        return _super.prototype.importKey.apply(this, args)
	            .then(function (bits) {
	            _alg = webcrypto_core_2.PrepareAlgorithm(algorithm);
	            _data = keyData;
	            // Fix: Safari
	            if (helper_1.BrowserInfo().name === helper_1.Browser.Safari || helper_1.BrowserInfo().name === helper_1.Browser.IE) {
	                // Converts JWK to ArrayBuffer
	                if (helper_1.BrowserInfo().name === helper_1.Browser.IE) {
	                    keyData = helper_1.assign({}, keyData);
	                    FixImportJwk(keyData);
	                }
	                args[1] = helper_1.string2buffer(JSON.stringify(keyData)).buffer;
	            }
	            // End: Fix
	            if (ArrayBuffer.isView(keyData)) {
	                _data = webcrypto_core_2.PrepareData(keyData, "keyData");
	            }
	            try {
	                return init_1.nativeSubtle.importKey.apply(init_1.nativeSubtle, args)
	                    .catch(function (e) {
	                    console.warn("WebCrypto: native 'importKey' for " + _alg.name + " doesn't work.", e.message || "");
	                });
	            }
	            catch (e) {
	                console.warn("WebCrypto: native 'importKey' for " + _alg.name + " doesn't work.", e.message || "");
	            }
	        })
	            .then(function (k) {
	            if (k) {
	                SetHashAlgorithm(_alg, k);
	                FixCryptoKeyUsages(k, keyUsages);
	                return Promise.resolve(k);
	            }
	            var Class;
	            switch (_alg.name.toLowerCase()) {
	                case webcrypto_core_1.AlgorithmNames.AesCBC.toLowerCase():
	                case webcrypto_core_1.AlgorithmNames.AesGCM.toLowerCase():
	                    Class = crypto_2.AesCrypto;
	                    break;
	                case webcrypto_core_1.AlgorithmNames.EcDH.toLowerCase():
	                case webcrypto_core_1.AlgorithmNames.EcDSA.toLowerCase():
	                    Class = crypto_5.EcCrypto;
	                    break;
	                case webcrypto_core_1.AlgorithmNames.RsaPSS.toLowerCase():
	                case webcrypto_core_1.AlgorithmNames.RsaOAEP.toLowerCase():
	                    Class = crypto_4.RsaCrypto;
	                    break;
	                default:
	                    throw new error_1.LinerError(error_1.LinerError.NOT_SUPPORTED, "importKey");
	            }
	            return Class.importKey(format, _data, _alg, extractable, keyUsages);
	        });
	    };
	    return SubtleCrypto;
	}(core.SubtleCrypto));
	exports.SubtleCrypto = SubtleCrypto;
	// save hash alg for RSA keys
	function SetHashAlgorithm(alg, key) {
	    if ((helper_1.BrowserInfo().name === helper_1.Browser.IE || helper_1.BrowserInfo().name === helper_1.Browser.Edge || helper_1.BrowserInfo().name === helper_1.Browser.Safari) && /^rsa/i.test(alg.name)) {
	        if (key.privateKey) {
	            keys.push({ hash: alg.hash, key: key.privateKey });
	            keys.push({ hash: alg.hash, key: key.publicKey });
	        }
	        else
	            keys.push({ hash: alg.hash, key: key });
	    }
	}
	// fix hash alg for rsa key
	function GetHashAlgorithm(key) {
	    var alg = null;
	    keys.some(function (item) {
	        if (item.key === key) {
	            alg = helper_1.assign({}, key.algorithm, { hash: item.hash });
	            return true;
	        }
	        return false;
	    });
	    return alg;
	}
	// Extend Uint8Array for IE
	if (!Uint8Array.prototype.forEach) {
	    Uint8Array.prototype.forEach = function (cb) {
	        for (var i = 0; i < this.length; i++) {
	            cb(this[i], i, this);
	        }
	    };
	}
	if (!Uint8Array.prototype.slice) {
	    Uint8Array.prototype.slice = function (start, end) {
	        return new Uint8Array(this.buffer.slice(start, end));
	    };
	}
	if (!Uint8Array.prototype.filter) {
	    Uint8Array.prototype.filter = function (cb) {
	        var buf = [];
	        for (var i = 0; i < this.length; i++) {
	            if (cb(this[i], i, this))
	                buf.push(this[i]);
	        }
	        return new Uint8Array(buf);
	    };
	}
	function FixCryptoKeyUsages(key, keyUsages) {
	    var keys = [];
	    if (key.privateKey) {
	        keys.push(key.privateKey);
	        keys.push(key.publicKey);
	    }
	    else {
	        keys.push(key);
	    }
	    keys.forEach(function (k) {
	        if ("keyUsage" in k) {
	            k.usages = k.keyUsage || [];
	            // add usages
	            if (!k.usages.length) {
	                ["verify", "encrypt", "wrapKey"]
	                    .forEach(function (usage) {
	                    if (keyUsages.indexOf(usage) > -1 && (k.type === "public" || k.type === "secret"))
	                        k.usages.push(usage);
	                });
	                ["sign", "decrypt", "unwrapKey", "deriveKey", "deriveBits"]
	                    .forEach(function (usage) {
	                    if (keyUsages.indexOf(usage) > -1 && (k.type === "private" || k.type === "secret"))
	                        k.usages.push(usage);
	                });
	            }
	        }
	    });
	}
	function FixExportJwk(jwk, alg, keyUsages) {
	    if (alg && helper_1.BrowserInfo().name === helper_1.Browser.IE) {
	        // ext
	        if ("extractable" in jwk) {
	            jwk.ext = jwk.extractable;
	            delete jwk.extractable;
	        }
	        // add alg
	        var CryptoClass = null;
	        switch (alg.name.toUpperCase()) {
	            case webcrypto_core_1.AlgorithmNames.RsaOAEP.toUpperCase():
	            case webcrypto_core_1.AlgorithmNames.RsaPSS.toUpperCase():
	            case webcrypto_core_1.AlgorithmNames.RsaSSA.toUpperCase():
	                CryptoClass = crypto_4.RsaCrypto;
	                break;
	            case webcrypto_core_1.AlgorithmNames.AesCBC.toUpperCase():
	            case webcrypto_core_1.AlgorithmNames.AesGCM.toUpperCase():
	                CryptoClass = crypto_2.AesCrypto;
	                break;
	        }
	        if (CryptoClass && !jwk.alg) {
	            jwk.alg = CryptoClass.alg2jwk(alg);
	        }
	        // add key_ops
	        if (!("key_ops" in jwk))
	            jwk.key_ops = keyUsages;
	    }
	}
	function FixImportJwk(jwk) {
	    if (helper_1.BrowserInfo().name === helper_1.Browser.IE) {
	        // ext
	        if ("ext" in jwk) {
	            jwk.extractable = jwk.ext;
	            delete jwk.ext;
	        }
	        delete jwk.key_ops;
	        delete jwk.alg;
	    }
	}


/***/ },
/* 19 */
/***/ function(module, exports) {

	"use strict";
	exports.Browser = {
	    IE: "Internet Explorer",
	    Safari: "Safari",
	    Edge: "Edge",
	    Chrome: "Chrome",
	    Firefox: "Firefox Mozilla",
	};
	/**
	 * Returns info about browser
	 */
	function BrowserInfo() {
	    var res = {
	        name: "",
	        version: ""
	    };
	    var userAgent = self.navigator.userAgent;
	    var reg;
	    if (reg = /edge\/([\d\.]+)/i.exec(userAgent)) {
	        res.name = exports.Browser.Edge;
	        res.version = reg[1];
	    }
	    else if (/msie/i.test(userAgent)) {
	        res.name = exports.Browser.IE;
	        res.version = /msie ([\d\.]+)/i.exec(userAgent)[1];
	    }
	    else if (/Trident/i.test(userAgent)) {
	        res.name = exports.Browser.IE;
	        res.version = /rv:([\d\.]+)/i.exec(userAgent)[1];
	    }
	    else if (/chrome/i.test(userAgent)) {
	        res.name = exports.Browser.Chrome;
	        res.version = /chrome\/([\d\.]+)/i.exec(userAgent)[1];
	    }
	    else if (/safari/i.test(userAgent)) {
	        res.name = exports.Browser.Safari;
	        res.version = /([\d\.]+) safari/i.exec(userAgent)[1];
	    }
	    else if (/firefox/i.test(userAgent)) {
	        res.name = exports.Browser.Firefox;
	        res.version = /firefox\/([\d\.]+)/i.exec(userAgent)[1];
	    }
	    return res;
	}
	exports.BrowserInfo = BrowserInfo;
	function string2buffer(binaryString) {
	    var res = new Uint8Array(binaryString.length);
	    for (var i = 0; i < binaryString.length; i++)
	        res[i] = binaryString.charCodeAt(i);
	    return res;
	}
	exports.string2buffer = string2buffer;
	function buffer2string(buffer) {
	    var res = "";
	    for (var i = 0; i < buffer.length; i++)
	        res += String.fromCharCode(buffer[i]);
	    return res;
	}
	exports.buffer2string = buffer2string;
	function concat() {
	    var buf = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        buf[_i] = arguments[_i];
	    }
	    var res = new Uint8Array(buf.map(function (item) { return item.length; }).reduce(function (prev, cur) { return prev + cur; }));
	    var offset = 0;
	    buf.forEach(function (item, index) {
	        for (var i = 0; i < item.length; i++)
	            res[offset + i] = item[i];
	        offset += item.length;
	    });
	    return res;
	}
	exports.concat = concat;
	function assign(target) {
	    var sources = [];
	    for (var _i = 1; _i < arguments.length; _i++) {
	        sources[_i - 1] = arguments[_i];
	    }
	    var res = arguments[0];
	    for (var i = 1; i < arguments.length; i++) {
	        var obj = arguments[i];
	        for (var prop in obj) {
	            res[prop] = obj[prop];
	        }
	    }
	    return res;
	}
	exports.assign = assign;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var webcrypto_core_1 = __webpack_require__(4);
	var error_1 = __webpack_require__(3);
	var key_1 = __webpack_require__(21);
	var helper_1 = __webpack_require__(19);
	var init_1 = __webpack_require__(2);
	var AesCrypto = (function (_super) {
	    __extends(AesCrypto, _super);
	    function AesCrypto() {
	        return _super.apply(this, arguments) || this;
	    }
	    AesCrypto.checkModule = function () {
	        if (typeof asmCrypto === "undefined")
	            throw new error_1.LinerError(error_1.LinerError.MODULE_NOT_FOUND, "asmCrypto", "https://github.com/vibornoff/asmcrypto.js");
	    };
	    AesCrypto.generateKey = function (alg, extractable, keyUsage) {
	        var _this = this;
	        return Promise.resolve()
	            .then(function () {
	            _this.checkModule();
	            // gat random bytes for key
	            var key = init_1.nativeCrypto.getRandomValues(new Uint8Array(alg.length / 8));
	            // set key params
	            var aesKey = new key_1.CryptoKey();
	            aesKey.key = key;
	            aesKey.algorithm = alg;
	            aesKey.extractable = extractable;
	            aesKey.type = "secret";
	            aesKey.usages = keyUsage;
	            return aesKey;
	        });
	    };
	    AesCrypto.encrypt = function (algorithm, key, data) {
	        return Promise.resolve()
	            .then(function () {
	            var res;
	            switch (algorithm.name.toUpperCase()) {
	                case webcrypto_core_1.AlgorithmNames.AesCBC:
	                    var algCBC = algorithm;
	                    res = asmCrypto.AES_CBC.encrypt(data, key.key, undefined, algCBC.iv);
	                    break;
	                case webcrypto_core_1.AlgorithmNames.AesGCM:
	                    var algGCM = algorithm;
	                    algGCM.tagLength = algGCM.tagLength || 128;
	                    res = asmCrypto.AES_GCM.encrypt(data, key.key, algGCM.iv, algGCM.additionalData, algGCM.tagLength / 8);
	                    break;
	                default:
	                    throw new error_1.LinerError(webcrypto_core_1.AlgorithmError.UNSUPPORTED_ALGORITHM, algorithm.name);
	            }
	            return res.buffer;
	        });
	    };
	    AesCrypto.decrypt = function (algorithm, key, data) {
	        return Promise.resolve()
	            .then(function () {
	            var res;
	            switch (algorithm.name.toUpperCase()) {
	                case webcrypto_core_1.AlgorithmNames.AesCBC:
	                    var algCBC = algorithm;
	                    res = asmCrypto.AES_CBC.decrypt(data, key.key, undefined, algCBC.iv);
	                    break;
	                case webcrypto_core_1.AlgorithmNames.AesGCM:
	                    var algGCM = algorithm;
	                    algGCM.tagLength = algGCM.tagLength || 128;
	                    res = asmCrypto.AES_GCM.decrypt(data, key.key, algGCM.iv, algGCM.additionalData, algGCM.tagLength / 8);
	                    break;
	                default:
	                    throw new error_1.LinerError(webcrypto_core_1.AlgorithmError.UNSUPPORTED_ALGORITHM, algorithm.name);
	            }
	            return res.buffer;
	        });
	    };
	    AesCrypto.wrapKey = function (format, key, wrappingKey, wrapAlgorithm) {
	        var crypto;
	        return Promise.resolve()
	            .then(function () {
	            crypto = new crypto_1.Crypto();
	            return crypto.subtle.exportKey(format, key);
	        })
	            .then(function (data) {
	            var raw;
	            if (!(data instanceof ArrayBuffer)) {
	                // JWK
	                raw = helper_1.string2buffer(JSON.stringify(data));
	            }
	            else {
	                // ArrayBuffer
	                raw = new Uint8Array(data);
	            }
	            return crypto.subtle.encrypt(wrapAlgorithm, wrappingKey, raw);
	        });
	    };
	    AesCrypto.unwrapKey = function (format, wrappedKey, unwrappingKey, unwrapAlgorithm, unwrappedKeyAlgorithm, extractable, keyUsages) {
	        var crypto;
	        return Promise.resolve()
	            .then(function () {
	            crypto = new crypto_1.Crypto();
	            return crypto.subtle.decrypt(unwrapAlgorithm, unwrappingKey, wrappedKey);
	        })
	            .then(function (data) {
	            var _data;
	            if (format.toLowerCase() === "jwk")
	                _data = JSON.parse(helper_1.buffer2string(new Uint8Array(data)));
	            else
	                _data = new Uint8Array(data);
	            return crypto.subtle.importKey(format, _data, unwrappedKeyAlgorithm, extractable, keyUsages);
	        });
	    };
	    AesCrypto.alg2jwk = function (alg) {
	        return "A" + alg.length + /-(\w+)/i.exec(alg.name.toUpperCase())[1];
	    };
	    AesCrypto.jwk2alg = function (alg) {
	        throw new Error("Not implemented");
	    };
	    AesCrypto.exportKey = function (format, key) {
	        var _this = this;
	        return Promise.resolve()
	            .then(function () {
	            var raw = key.key;
	            if (format.toLowerCase() === "jwk") {
	                var jwk = {
	                    alg: _this.alg2jwk(key.algorithm),
	                    ext: key.extractable,
	                    k: webcrypto_core_1.Base64Url.encode(raw),
	                    key_ops: key.usages,
	                    kty: "oct"
	                };
	                return jwk;
	            }
	            else {
	                return raw.buffer;
	            }
	        });
	    };
	    AesCrypto.importKey = function (format, keyData, algorithm, extractable, keyUsages) {
	        return Promise.resolve()
	            .then(function () {
	            var raw;
	            if (format.toLowerCase() === "jwk") {
	                var jwk = keyData;
	                raw = webcrypto_core_1.Base64Url.decode(jwk.k);
	            }
	            else
	                raw = new Uint8Array(keyData);
	            var key = new key_1.CryptoKey();
	            key.algorithm = algorithm;
	            key.type = "secret";
	            key.usages = keyUsages;
	            key.key = raw;
	            return key;
	        });
	    };
	    return AesCrypto;
	}(webcrypto_core_1.BaseCrypto));
	exports.AesCrypto = AesCrypto;
	var crypto_1 = __webpack_require__(17);


/***/ },
/* 21 */
/***/ function(module, exports) {

	"use strict";
	var CryptoKey = (function () {
	    function CryptoKey() {
	    }
	    return CryptoKey;
	}());
	exports.CryptoKey = CryptoKey;


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var webcrypto_core_1 = __webpack_require__(4);
	var error_1 = __webpack_require__(3);
	var ShaCrypto = (function (_super) {
	    __extends(ShaCrypto, _super);
	    function ShaCrypto() {
	        return _super.apply(this, arguments) || this;
	    }
	    ShaCrypto.digest = function (alg, message) {
	        return Promise.resolve()
	            .then(function () {
	            if (typeof asmCrypto === "undefined")
	                throw new error_1.LinerError(error_1.LinerError.MODULE_NOT_FOUND, "asmCrypto", "https://github.com/vibornoff/asmcrypto.js");
	            switch (alg.name.toUpperCase()) {
	                case webcrypto_core_1.AlgorithmNames.Sha1:
	                    return asmCrypto.SHA1.bytes(message).buffer;
	                case webcrypto_core_1.AlgorithmNames.Sha256:
	                    return asmCrypto.SHA256.bytes(message).buffer;
	                default:
	                    throw new error_1.LinerError("Not supported algorithm '" + alg.name + "'");
	            }
	        });
	    };
	    return ShaCrypto;
	}(webcrypto_core_1.BaseCrypto));
	exports.ShaCrypto = ShaCrypto;


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var webcrypto_core_1 = __webpack_require__(4);
	var error_1 = __webpack_require__(3);
	var key_1 = __webpack_require__(21);
	var helper_1 = __webpack_require__(19);
	function removeLeadingZero(buf) {
	    var first = true;
	    return buf.filter(function (v) {
	        if (first && v === 0)
	            return false;
	        else {
	            first = false;
	            return true;
	        }
	    });
	}
	var RsaCrypto = (function (_super) {
	    __extends(RsaCrypto, _super);
	    function RsaCrypto() {
	        return _super.apply(this, arguments) || this;
	    }
	    RsaCrypto.checkModule = function () {
	        if (typeof asmCrypto === "undefined")
	            throw new error_1.LinerError(error_1.LinerError.MODULE_NOT_FOUND, "asmCrypto", "https://github.com/vibornoff/asmcrypto.js");
	    };
	    RsaCrypto.filterUsages = function (supported, given) {
	        return supported.filter(function (item1) { return !!given.filter(function (item2) { return item1 === item2; }).length; });
	    };
	    RsaCrypto.generateKey = function (alg, extractable, keyUsage) {
	        var _this = this;
	        return Promise.resolve()
	            .then(function () {
	            _this.checkModule();
	            var pubExp = alg.publicExponent[0] === 3 ? 3 : 65537;
	            var rsaKey = asmCrypto.RSA.generateKey(alg.modulusLength, pubExp);
	            var privateKey = new key_1.CryptoKey();
	            var publicKey = new key_1.CryptoKey();
	            privateKey.key = publicKey.key = rsaKey;
	            privateKey.algorithm = publicKey.algorithm = alg;
	            privateKey.extractable = extractable;
	            publicKey.extractable = true;
	            privateKey.type = "private";
	            publicKey.type = "public";
	            switch (alg.name.toLowerCase()) {
	                case webcrypto_core_1.AlgorithmNames.RsaOAEP.toLowerCase():
	                    privateKey.usages = _this.filterUsages(["decrypt", "unwrapKey"], keyUsage);
	                    publicKey.usages = _this.filterUsages(["encrypt", "wrapKey"], keyUsage);
	                    break;
	                case webcrypto_core_1.AlgorithmNames.RsaPSS.toLowerCase():
	                    privateKey.usages = _this.filterUsages(["sign"], keyUsage);
	                    publicKey.usages = _this.filterUsages(["verify"], keyUsage);
	                    break;
	                default:
	                    throw new error_1.LinerError(error_1.LinerError.UNSUPPORTED_ALGORITHM, alg.name);
	            }
	            return { privateKey: privateKey, publicKey: publicKey };
	        });
	    };
	    RsaCrypto.sign = function (algorithm, key, data) {
	        return Promise.resolve()
	            .then(function () {
	            switch (algorithm.name.toLowerCase()) {
	                case webcrypto_core_1.AlgorithmNames.RsaPSS.toLowerCase():
	                    var keyAlg = key.algorithm;
	                    var _alg = algorithm;
	                    var sign = void 0;
	                    switch (keyAlg.hash.name.toUpperCase()) {
	                        case webcrypto_core_1.AlgorithmNames.Sha1:
	                            sign = asmCrypto.RSA_PSS_SHA1.sign;
	                            break;
	                        case webcrypto_core_1.AlgorithmNames.Sha256:
	                            sign = asmCrypto.RSA_PSS_SHA256.sign;
	                            break;
	                        default:
	                            throw new error_1.LinerError(error_1.LinerError.UNSUPPORTED_ALGORITHM, key.algorithm.name);
	                    }
	                    return sign(data, key.key, _alg.saltLength).buffer;
	                default:
	                    throw new error_1.LinerError(error_1.LinerError.UNSUPPORTED_ALGORITHM, algorithm.name);
	            }
	        });
	    };
	    RsaCrypto.verify = function (algorithm, key, signature, data) {
	        return Promise.resolve()
	            .then(function () {
	            switch (algorithm.name.toLowerCase()) {
	                case webcrypto_core_1.AlgorithmNames.RsaPSS.toLowerCase():
	                    var keyAlg = key.algorithm;
	                    var _alg = algorithm;
	                    var verify = void 0;
	                    switch (keyAlg.hash.name.toUpperCase()) {
	                        case webcrypto_core_1.AlgorithmNames.Sha1:
	                            verify = asmCrypto.RSA_PSS_SHA1.verify;
	                            break;
	                        case webcrypto_core_1.AlgorithmNames.Sha256:
	                            verify = asmCrypto.RSA_PSS_SHA256.verify;
	                            break;
	                        default:
	                            throw new error_1.LinerError(error_1.LinerError.UNSUPPORTED_ALGORITHM, key.algorithm.name);
	                    }
	                    return verify(signature, data, key.key, _alg.saltLength);
	                default:
	                    throw new error_1.LinerError(error_1.LinerError.UNSUPPORTED_ALGORITHM, algorithm.name);
	            }
	        });
	    };
	    RsaCrypto.encrypt = function (algorithm, key, data) {
	        return Promise.resolve()
	            .then(function () {
	            switch (algorithm.name.toLowerCase()) {
	                case webcrypto_core_1.AlgorithmNames.RsaOAEP.toLowerCase():
	                    var keyAlg = key.algorithm;
	                    var _alg = algorithm;
	                    var encrypt = void 0;
	                    switch (keyAlg.hash.name.toUpperCase()) {
	                        case webcrypto_core_1.AlgorithmNames.Sha1:
	                            encrypt = asmCrypto.RSA_OAEP_SHA1.encrypt;
	                            break;
	                        case webcrypto_core_1.AlgorithmNames.Sha256:
	                            encrypt = asmCrypto.RSA_OAEP_SHA256.encrypt;
	                            break;
	                        default:
	                            throw new error_1.LinerError(error_1.LinerError.UNSUPPORTED_ALGORITHM, keyAlg.name + " " + keyAlg.hash.name);
	                    }
	                    return encrypt(data, key.key, _alg.label);
	                default:
	                    throw new error_1.LinerError(error_1.LinerError.UNSUPPORTED_ALGORITHM, algorithm.name);
	            }
	        });
	    };
	    RsaCrypto.decrypt = function (algorithm, key, data) {
	        return Promise.resolve()
	            .then(function () {
	            switch (algorithm.name.toLowerCase()) {
	                case webcrypto_core_1.AlgorithmNames.RsaOAEP.toLowerCase():
	                    var keyAlg = key.algorithm;
	                    var _alg = algorithm;
	                    var decrypt = void 0;
	                    switch (keyAlg.hash.name.toUpperCase()) {
	                        case webcrypto_core_1.AlgorithmNames.Sha1:
	                            decrypt = asmCrypto.RSA_OAEP_SHA1.decrypt;
	                            break;
	                        case webcrypto_core_1.AlgorithmNames.Sha256:
	                            decrypt = asmCrypto.RSA_OAEP_SHA256.decrypt;
	                            break;
	                        default:
	                            throw new error_1.LinerError(error_1.LinerError.UNSUPPORTED_ALGORITHM, keyAlg.name + " " + keyAlg.hash.name);
	                    }
	                    return decrypt(data, key.key, _alg.label);
	                default:
	                    throw new error_1.LinerError(error_1.LinerError.UNSUPPORTED_ALGORITHM, algorithm.name);
	            }
	        });
	    };
	    RsaCrypto.wrapKey = function (format, key, wrappingKey, wrapAlgorithm) {
	        var crypto;
	        return Promise.resolve()
	            .then(function () {
	            crypto = new crypto_1.Crypto();
	            return crypto.subtle.exportKey(format, key);
	        })
	            .then(function (data) {
	            var raw;
	            if (!(data instanceof ArrayBuffer)) {
	                // JWK
	                raw = helper_1.string2buffer(JSON.stringify(data));
	            }
	            else {
	                // ArrayBuffer
	                raw = new Uint8Array(data);
	            }
	            return crypto.subtle.encrypt(wrapAlgorithm, wrappingKey, raw);
	        });
	    };
	    RsaCrypto.unwrapKey = function (format, wrappedKey, unwrappingKey, unwrapAlgorithm, unwrappedKeyAlgorithm, extractable, keyUsages) {
	        var crypto;
	        return Promise.resolve()
	            .then(function () {
	            crypto = new crypto_1.Crypto();
	            return crypto.subtle.decrypt(unwrapAlgorithm, unwrappingKey, wrappedKey);
	        })
	            .then(function (data) {
	            var _data;
	            if (format.toLowerCase() === "jwk")
	                _data = JSON.parse(helper_1.buffer2string(new Uint8Array(data)));
	            else
	                _data = new Uint8Array(data);
	            return crypto.subtle.importKey(format, _data, unwrappedKeyAlgorithm, extractable, keyUsages);
	        });
	    };
	    RsaCrypto.alg2jwk = function (alg) {
	        var hash = alg.hash;
	        var hashSize = /(\d+)/.exec(hash.name)[1];
	        switch (alg.name.toUpperCase()) {
	            case webcrypto_core_1.AlgorithmNames.RsaOAEP.toUpperCase():
	                return "RSA-OAEP" + (hashSize === "1" ? "" : "-" + hashSize);
	            case webcrypto_core_1.AlgorithmNames.RsaPSS.toUpperCase():
	                return "PS" + hashSize;
	            case webcrypto_core_1.AlgorithmNames.RsaSSA.toUpperCase():
	                return "RS" + hashSize;
	            default:
	                throw new webcrypto_core_1.AlgorithmError(webcrypto_core_1.AlgorithmError.UNSUPPORTED_ALGORITHM, alg.name);
	        }
	    };
	    RsaCrypto.jwk2alg = function (alg) {
	        throw new Error("Not implemented");
	    };
	    RsaCrypto.exportKey = function (format, key) {
	        var _this = this;
	        return Promise.resolve()
	            .then(function () {
	            if (format.toLowerCase() === "jwk") {
	                var jwk = {
	                    kty: "RSA",
	                    ext: true,
	                    key_ops: key.usages
	                };
	                jwk.alg = _this.alg2jwk(key.algorithm);
	                jwk.n = webcrypto_core_1.Base64Url.encode(removeLeadingZero(key.key[0]));
	                jwk.e = webcrypto_core_1.Base64Url.encode(removeLeadingZero(key.key[1]));
	                if (key.type === "private") {
	                    jwk.d = webcrypto_core_1.Base64Url.encode(removeLeadingZero(key.key[2]));
	                    jwk.p = webcrypto_core_1.Base64Url.encode(removeLeadingZero(key.key[3]));
	                    jwk.q = webcrypto_core_1.Base64Url.encode(removeLeadingZero(key.key[4]));
	                    jwk.dp = webcrypto_core_1.Base64Url.encode(removeLeadingZero(key.key[5]));
	                    jwk.dq = webcrypto_core_1.Base64Url.encode(removeLeadingZero(key.key[6]));
	                    jwk.qi = webcrypto_core_1.Base64Url.encode(removeLeadingZero(key.key[7]));
	                }
	                return jwk;
	            }
	            else {
	                throw new error_1.LinerError(error_1.LinerError.NOT_SUPPORTED);
	            }
	        });
	    };
	    RsaCrypto.importKey = function (format, keyData, algorithm, extractable, keyUsages) {
	        return Promise.resolve()
	            .then(function () {
	            var raw;
	            var jwk;
	            var key = new key_1.CryptoKey();
	            key.algorithm = algorithm;
	            key.usages = keyUsages;
	            key.key = [];
	            if (format.toLowerCase() === "jwk") {
	                jwk = keyData;
	                key.key[0] = webcrypto_core_1.Base64Url.decode(jwk.n);
	                key.key[1] = webcrypto_core_1.Base64Url.decode(jwk.e)[0] === 3 ? new Uint8Array([0, 0, 0, 3]) : new Uint8Array([0, 1, 0, 1]);
	                if (jwk.d) {
	                    key.type = "private";
	                    key.key[2] = webcrypto_core_1.Base64Url.decode(jwk.d);
	                    key.key[3] = webcrypto_core_1.Base64Url.decode(jwk.p);
	                    key.key[4] = webcrypto_core_1.Base64Url.decode(jwk.q);
	                    key.key[5] = webcrypto_core_1.Base64Url.decode(jwk.dp);
	                    key.key[6] = webcrypto_core_1.Base64Url.decode(jwk.dq);
	                    key.key[7] = webcrypto_core_1.Base64Url.decode(jwk.qi);
	                }
	                else
	                    key.type = "public";
	                return key;
	            }
	            else
	                throw new error_1.LinerError(error_1.LinerError.NOT_SUPPORTED);
	        });
	    };
	    return RsaCrypto;
	}(webcrypto_core_1.BaseCrypto));
	exports.RsaCrypto = RsaCrypto;
	var crypto_1 = __webpack_require__(17);


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var webcrypto_core_1 = __webpack_require__(4);
	var error_1 = __webpack_require__(3);
	var key_1 = __webpack_require__(21);
	var helper_1 = __webpack_require__(19);
	// Helper
	function b2a(buffer) {
	    var buf = new Uint8Array(buffer);
	    var res = [];
	    for (var i = 0; i < buf.length; i++)
	        res.push(buf[i]);
	    return res;
	}
	function hex2buffer(hexString, padded) {
	    if (hexString.length % 2) {
	        hexString = "0" + hexString;
	    }
	    var res = new Uint8Array(hexString.length / 2);
	    for (var i = 0; i < hexString.length; i++) {
	        var c = hexString.slice(i, ++i + 1);
	        res[(i - 1) / 2] = parseInt(c, 16);
	    }
	    // BN padding
	    if (padded) {
	        var len = res.length;
	        len = len > 32 ? len > 48 ? 66 : 48 : 32;
	        if (res.length < len)
	            res = helper_1.concat(new Uint8Array(len - res.length), res);
	    }
	    return res;
	}
	function buffer2hex(buffer, padded) {
	    var res = "";
	    for (var i = 0; i < buffer.length; i++) {
	        var char = buffer[i].toString(16);
	        res += char.length % 2 ? "0" + char : char;
	    }
	    // BN padding
	    if (padded) {
	        var len = buffer.length;
	        len = len > 32 ? len > 48 ? 66 : 48 : 32;
	        if ((res.length / 2) < len)
	            res = new Array(len * 2 - res.length + 1).join("0") + res;
	    }
	    return res;
	}
	var EcCrypto = (function (_super) {
	    __extends(EcCrypto, _super);
	    function EcCrypto() {
	        return _super.apply(this, arguments) || this;
	    }
	    EcCrypto.checkModule = function () {
	        if (typeof elliptic === "undefined")
	            throw new error_1.LinerError(error_1.LinerError.MODULE_NOT_FOUND, "elliptic", "https://github.com/indutny/elliptic");
	    };
	    EcCrypto.generateKey = function (alg, extractable, keyUsage) {
	        var _this = this;
	        return Promise.resolve()
	            .then(function () {
	            _this.checkModule();
	            var _alg = alg;
	            var key = new elliptic.ec(_alg.namedCurve.replace("-", "").toLowerCase()); // converts name to 'p192', ...
	            // set key params
	            var prvKey = new key_1.CryptoKey();
	            var pubKey = new key_1.CryptoKey();
	            prvKey.key = pubKey.key = key.genKeyPair();
	            prvKey.algorithm = pubKey.algorithm = _alg;
	            prvKey.extractable = extractable;
	            pubKey.extractable = true;
	            prvKey.type = "private";
	            pubKey.type = "public";
	            if (alg.name === webcrypto_core_1.AlgorithmNames.EcDSA) {
	                prvKey.usages = ["sign"];
	                pubKey.usages = ["verify"];
	            }
	            else if (alg.name === webcrypto_core_1.AlgorithmNames.EcDH) {
	                prvKey.usages = pubKey.usages = ["deriveKey", "deriveBits"];
	            }
	            return {
	                privateKey: prvKey,
	                publicKey: pubKey
	            };
	        });
	    };
	    EcCrypto.sign = function (algorithm, key, data) {
	        return Promise.resolve()
	            .then(function () {
	            var _alg = algorithm;
	            // get digest
	            var crypto = new crypto_1.Crypto();
	            return crypto.subtle.digest(_alg.hash, data);
	        })
	            .then(function (hash) {
	            var array = b2a(hash);
	            var signature = key.key.sign(array);
	            var hexSignature = buffer2hex(signature.r.toArray(), true) + buffer2hex(signature.s.toArray(), true);
	            return hex2buffer(hexSignature).buffer;
	        });
	    };
	    EcCrypto.verify = function (algorithm, key, signature, data) {
	        var sig;
	        return Promise.resolve()
	            .then(function () {
	            var _alg = algorithm;
	            sig = {
	                r: signature.slice(0, signature.byteLength / 2),
	                s: signature.slice(signature.byteLength / 2)
	            };
	            // get digest
	            var crypto = new crypto_1.Crypto();
	            return crypto.subtle.digest(_alg.hash, data);
	        })
	            .then(function (hash) {
	            var array = b2a(hash);
	            return (key.key.verify(array, sig));
	        });
	    };
	    EcCrypto.deriveKey = function (algorithm, baseKey, derivedKeyType, extractable, keyUsages) {
	        var _this = this;
	        return Promise.resolve()
	            .then(function () {
	            return _this.deriveBits(algorithm, baseKey, derivedKeyType.length);
	        })
	            .then(function (bits) {
	            var crypto = new crypto_1.Crypto();
	            return crypto.subtle.importKey("raw", new Uint8Array(bits), derivedKeyType, extractable, keyUsages);
	        });
	    };
	    EcCrypto.deriveBits = function (algorithm, baseKey, length) {
	        return Promise.resolve()
	            .then(function () {
	            var promise = Promise.resolve(null);
	            var shared = baseKey.key.derive(algorithm.public.key.getPublic());
	            var array = new Uint8Array(shared.toArray());
	            // Padding
	            var len = array.length;
	            len = (len > 32 ? (len > 48 ? 66 : 48) : 32);
	            if (array.length < len)
	                array = helper_1.concat(new Uint8Array(len - array.length), array);
	            var buf = array.slice(0, length / 8).buffer;
	            return buf;
	        });
	    };
	    EcCrypto.exportKey = function (format, key) {
	        return Promise.resolve()
	            .then(function () {
	            var ecKey = key.key;
	            if (format.toLowerCase() === "jwk") {
	                var hexPub = ecKey.getPublic("hex").slice(2); // ignore first '04'
	                var hexX = hexPub.slice(0, hexPub.length / 2);
	                var hexY = hexPub.slice(hexPub.length / 2, hexPub.length);
	                if (key.type === "public") {
	                    // public
	                    var jwk = {
	                        crv: key.algorithm.namedCurve,
	                        ext: key.extractable,
	                        x: webcrypto_core_1.Base64Url.encode(hex2buffer(hexX, true)),
	                        y: webcrypto_core_1.Base64Url.encode(hex2buffer(hexY, true)),
	                        key_ops: [],
	                        kty: "EC"
	                    };
	                    return jwk;
	                }
	                else {
	                    // private
	                    var jwk = {
	                        crv: key.algorithm.namedCurve,
	                        ext: key.extractable,
	                        d: webcrypto_core_1.Base64Url.encode(hex2buffer(ecKey.getPrivate("hex"), true)),
	                        x: webcrypto_core_1.Base64Url.encode(hex2buffer(hexX, true)),
	                        y: webcrypto_core_1.Base64Url.encode(hex2buffer(hexY, true)),
	                        key_ops: key.usages,
	                        kty: "EC"
	                    };
	                    return jwk;
	                }
	            }
	            else {
	                throw new error_1.LinerError("Format '" + format + "' is not implemented");
	            }
	        });
	    };
	    EcCrypto.importKey = function (format, keyData, algorithm, extractable, keyUsages) {
	        return Promise.resolve()
	            .then(function () {
	            var key = new key_1.CryptoKey();
	            key.algorithm = algorithm;
	            if (format.toLowerCase() === "jwk") {
	                var ecKey = new elliptic.ec(keyData.crv.replace("-", "").toLowerCase());
	                if (keyData.d) {
	                    // Private key
	                    key.key = ecKey.keyFromPrivate(webcrypto_core_1.Base64Url.decode(keyData.d));
	                    key.type = "private";
	                }
	                else {
	                    // Public key
	                    var bufferPubKey = helper_1.concat(new Uint8Array([4]), webcrypto_core_1.Base64Url.decode(keyData.x), webcrypto_core_1.Base64Url.decode(keyData.y));
	                    var hexPubKey = buffer2hex(bufferPubKey);
	                    key.key = ecKey.keyFromPublic(hexPubKey, "hex");
	                    key.type = "public";
	                }
	            }
	            else
	                throw new error_1.LinerError("Format '" + format + "' is not implemented");
	            key.extractable = extractable;
	            key.usages = keyUsages;
	            return key;
	        });
	    };
	    return EcCrypto;
	}(webcrypto_core_1.BaseCrypto));
	exports.EcCrypto = EcCrypto;
	var crypto_1 = __webpack_require__(17);


/***/ }
/******/ ]);