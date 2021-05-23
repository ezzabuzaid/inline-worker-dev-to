function compute(computation, ...message) {
    const delegate = () => {
        onmessage = ({ data: { computation, message } }) => {
            const wrapper = (fn) => Function('"use strict"; return (' + fn.toString() + ')')();
            const result = wrapper(computation)(...message);
            postMessage(result);
        };
    }
    const functionBody = delegate.toString().replace(/^[^{]*{\s*/, '').replace(/\s*}[^}]*$/, '');
    return new Promise((resolve, reject) => {
        const worker = new Worker(URL.createObjectURL(
            new Blob([functionBody], { type: 'text/javascript' })
        ));
        worker.onmessage = ({ data }) => {
            resolve(data);
            worker.terminate();
        };
        worker.onerror = worker.onmessageerror = reject;
        worker.postMessage({ computation: computation.toString(), message });
        return worker;
    });
}

function fibonacci(num) {
    if (num <= 1) return 1;
    return fibonacci(num - 1) + fibonacci(num - 2);
}

function startWithWebWorker() {
    compute(fibonacci, 42).then(console.log);
}

function startWithOutWebWorker() {
    console.log(fibonacci(42))
}
