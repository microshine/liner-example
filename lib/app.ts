class App {

    static keys?: CryptoKeyPair;

    static generateKey() {
        return crypto.subtle.generateKey(
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
        return crypto.subtle.sign({ name: "ECDSA", hash: "SHA-256" }, this.keys.privateKey, this.stringToBuffer(text))
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

    static start() {
        let $text = document.getElementById("text") as HTMLTextAreaElement;
        let $result = document.getElementById("result") as HTMLDivElement;
        let text = "";

        // get text from text field
        Promise.resolve()
            .then(() => {
                if (!$text)
                    throw new Error("Textarea with id #text not found");
                if (!$text.value)
                    throw new Error("Signed text cannot be empty string");
                text = $text.value;

                return this.generateKey()
            })
            .then(() => {
                return this.sign(text);
            })
            .then(sig => {
                let sigB64 = btoa(this.buffer2string(new Uint8Array(sig)));
                $result.style.color = "green";
                $result.textContent = `Signature: ${sigB64}`;
            })
            .catch(e => {
                $result.style.color = "red";
                $result.textContent = `Error: ${e.message}`;
            })

    }

}