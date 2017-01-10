# WebCrypto-liner WebWorker example
At this time, Safari, Edge and of course IE, do not support using WebCrypto from a WebWorker. This example shows how to use webcrypto-liner from a webworker, conditionally loading it's dependencies.

## Install

```
git clone https://github.com/microshine/liner-example.git
npm i
```

## Run

Open index.html in Browser

> JS downloads `asmcrypto`, `elliptic` for IE, Edge and Safari
