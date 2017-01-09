class App {

    static keys?: CryptoKeyPair;

    static generateKey() {

        return liner.crypto.subtle.generateKey(
            { name: "ECDSA", namedCurve: "P-256" },
            true,
            ["sign", "verify"]
        )
            .then(keys => {
                this.keys = keys;
                return keys;
            })
    }

    static sign(text: string) {
        if (!this.keys)
            throw new Error("You must generate CryptoKey first");
        return liner.crypto.subtle.sign({ name: "ECDSA", hash: "SHA-256" }, this.keys.privateKey, this.stringToBuffer(text))
    }

    static stringToBuffer(text: string) {
        text = atob(btoa(text)); // utf8 -> binary
        let res = new Uint8Array(text.length);
        for (let i = 0; i < text.length; i++)
            res[i] = text.charCodeAt(i);
        return res;
    }

    static buffer2string(buffer: Uint8Array) {
        let res = "";
        for (let i = 0; i < buffer.length; i++)
            res += String.fromCharCode(buffer[i]);
        return res;
    }

}