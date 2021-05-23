# Using inline web workers to improve UI performance

I'll demonstrate how you can use inline web workers to perform intensive tasks without blocking the main thread.

According to the Mozilla Developers Network (MDN) documentation

> Web Workers makes it possible to run a script operation in a background thread separate from the main execution thread of a web application. The advantage of this is that laborious processing can be performed in a separate thread, allowing the main (usually the UI) thread to run without being blocked/slowed down.

In other words, Web workers enable you to run JavaScript in a separate thread.

*Worth mention that this is not a comprehensive post about web workers, my aim here just to show how you can use inline web workers easily.*

## Creating Web Worker

There are two kinds of Web Workers, Dedicated Workers, and Shared Workers, the difference is Shared Workers can be accessed by any script that comes from the same domain whilst Dedicated Workers can only be accessed from the same script that created it.

Inline web worker comes under Dedicated Workers kind.

the difference between inline web worker and web worker is that inline web worker could be created using `Blob` object different that web worker that need standalone file.

we'll use the [compute](https://gist.github.com/ezzabuzaid/c8c14b2ccddca6a7e16a2cbbc3bac556) helper function to spawn thread.

## Compute Helper

[compute](https://gist.github.com/ezzabuzaid/c8c14b2ccddca6a7e16a2cbbc3bac556) is generic function that has two parameter, `computation` and `message`

it spawns an inline web worker, executes the `computation` argument passing it the `message` argument, and returns a promise with either rejection in case of error or resolve when finish.

```javascript
function fibonacci(num) {
    if (num <= 1) return 1;
    return fibonacci(num - 1) + fibonacci(num - 2);
}

// fibonacci(10) will be running in inline web worker.
const result = await compute(fibonacci, 10);
```

don't worry about worker termination, it will be terminated immediately after resolving the result.

Let's see the example for better understanding.

* For clarity about what I’m going to talk about, the full project is available to browse through [Github](https://github.com/ezzabuzaid/inline-worker-dev-to).

## Running without web worker

Here's an image explaining what will happen to the main thread when running CPU intensive tasks. 

![Alt Text](./without_worker.gif)

you should see the battery hanging for at least two seconds.

## Running with web worker

Executing the same code but in inline web worker

![Alt Text](./with_worker.gif)

## Additional Resources

[MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)
[Codepen-UI](https://codepen.io/see8ch/pen/ZYwvGJ)
[html5rocks-The Basics of Web Workers](https://www.html5rocks.com/en/tutorials/workers/basics/#toc-inlineworkers)
[Twilio-Optimizing JavaScript Application Performance with Web Workers](https://www.twilio.com/blog/optimize-javascript-application-performance-web-workers)
