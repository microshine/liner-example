
switch (helper.BrowserInfo().name) {
    case helper.Browser.IE:
        importScripts("promise.min.js");
    case helper.Browser.Edge:
    case helper.Browser.Safari:
        importScripts("asmcrypto.js");
        importScripts("elliptic.js");
}

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

importScripts("webcrypto-liner.js");
let liner = {};
liner.crypto = new Liner.Crypto();