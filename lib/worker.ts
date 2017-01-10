onmessage = e => {

    let command = e.data[0];
    let params = e.data.slice(1);

    if (!command)
        throw TypeError("Worker's command cannot be empty");

    switch (command) {
        case "sign":
            Promise.resolve()
                .then(() => App.generateKey())
                .then(() => App.sign.apply(App, params))
                .then(sig => postMessage(["sign", App.buffer2string(new Uint8Array(sig))]))
                .catch(e => {
                    console.log(e);
                    console.log(e.stack);
                    throw e;
                });
            break;
        default:
            throw Error(`Unknown worker's command '${command}'`);
    }

}

function getRandomArbitrary(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

function getRandomValues(buffer: ArrayBufferView): ArrayBufferView {
    let buf = new Uint8Array(buffer as Uint8Array);
    let i = 0;
    while (i < buf.length) {
        buf[i++] = getRandomArbitrary(0, 255);
    }
    return buf;
}

let _self = self as any;
if (!(_self.crypto || _self.msCrypto)) {
    _self.crypto = { getRandomValues: getRandomValues };
    Object.freeze(_self.crypto);
}

importScripts("webcrypto-liner.js");

switch (helper.BrowserInfo().name) {
    case helper.Browser.IE:
        importScripts("promise.min.js");
    case helper.Browser.Edge:
    case helper.Browser.Safari:
        importScripts("asmcrypto.js");
        importScripts("elliptic.js");
}