var helper;
(function (helper) {
    helper.Browser = {
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
            res.name = helper.Browser.Edge;
            res.version = reg[1];
        }
        else if (/msie/i.test(userAgent)) {
            res.name = helper.Browser.IE;
            res.version = /msie ([\d\.]+)/i.exec(userAgent)[1];
        }
        else if (/Trident/i.test(userAgent)) {
            res.name = helper.Browser.IE;
            res.version = /rv:([\d\.]+)/i.exec(userAgent)[1];
        }
        else if (/chrome/i.test(userAgent)) {
            res.name = helper.Browser.Chrome;
            res.version = /chrome\/([\d\.]+)/i.exec(userAgent)[1];
        }
        else if (/safari/i.test(userAgent)) {
            res.name = helper.Browser.Safari;
            res.version = /([\d\.]+) safari/i.exec(userAgent)[1];
        }
        else if (/firefox/i.test(userAgent)) {
            res.name = helper.Browser.Firefox;
            res.version = /firefox\/([\d\.]+)/i.exec(userAgent)[1];
        }
        return res;
    }
    helper.BrowserInfo = BrowserInfo;
})(helper || (helper = {}));
// const alg = { name: "RSA-PSS", hash: "SHA-256", publicExponent: new Uint8Array([1, 0, 1]), modulusLength: 1024, saltLength: 32 };
var alg = { name: "ECDSA", namedCurve: "P-256", hash: "SHA-256" };
var App = (function () {
    function App() {
    }
    App.generateKey = function () {
        var _this = this;
        return liner.crypto.subtle.generateKey(alg, true, ["sign", "verify"])
            .then(function (keys) {
            _this.keys = keys;
            return keys;
        });
    };
    App.sign = function (text) {
        if (!this.keys)
            throw new Error("You must generate CryptoKey first");
        return liner.crypto.subtle.sign(alg, this.keys.privateKey, this.stringToBuffer(text));
    };
    App.stringToBuffer = function (text) {
        text = atob(btoa(text)); // utf8 -> binary
        var res = new Uint8Array(text.length);
        for (var i = 0; i < text.length; i++)
            res[i] = text.charCodeAt(i);
        return res;
    };
    App.buffer2string = function (buffer) {
        var res = "";
        for (var i = 0; i < buffer.length; i++)
            res += String.fromCharCode(buffer[i]);
        return res;
    };
    return App;
}());
onmessage = function (e) {
    var command = e.data[0];
    var params = e.data.slice(1);
    if (!command)
        throw TypeError("Worker's command cannot be empty");
    switch (command) {
        case "seed":
            Math.seedrandom(params[0]);
            break;
        case "sign":
            Promise.resolve()
                .then(function () { return App.generateKey(); })
                .then(function () { return App.sign.apply(App, params); })
                .then(function (sig) { return postMessage(["sign", App.buffer2string(new Uint8Array(sig))]); })
                .catch(function (e) {
                console.log(e);
                console.log(e.stack);
                throw e;
            });
            break;
        default:
            throw Error("Unknown worker's command '" + command + "'");
    }
};
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
function getRandomValues(buffer) {
    var buf = new Uint8Array(buffer);
    var i = 0;
    while (i < buf.length) {
        buf[i++] = getRandomArbitrary(0, 255);
    }
    return buf;
}
var _self = self;
if (!(_self.crypto || _self.msCrypto)) {
    console.log("WebCrypto: !WARNING! Webcrypto unable to get crypto || msCrypto getRandomValues, rallying o supplied seed.)");
    postMessage(["seed"]);
    _self.crypto = { getRandomValues: getRandomValues };
    Object.freeze(_self.crypto);
}
importScripts("seedrandom.js");
importScripts("webcrypto-liner.js");
switch (helper.BrowserInfo().name) {
    case helper.Browser.IE:
        importScripts("promise.min.js");
    case helper.Browser.Edge:
    case helper.Browser.Safari:
        importScripts("asmcrypto.js");
        importScripts("elliptic.js");
}
