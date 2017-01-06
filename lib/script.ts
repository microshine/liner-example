namespace helper {
    export function ImportScript(src: string) {
        let script = document.createElement("script");
        script.type = "text/javascript";
        script.src = src;

        document.head.appendChild(script);
    }
}