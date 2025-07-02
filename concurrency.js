// Javascript is a single-threaded language, but it can handle concurrency through asynchronous programming.
// This is achieved using the event loop, which allows JavaScript to perform non-blocking operations.
// The event loop is a mechanism that allows JavaScript to execute code, collect and process events, and execute queued sub-tasks.
// The event loop works with the call stack and the message queue to handle asynchronous operations.
// The event loop works with registered callbacks or APIs, which are functions that are executed when a certain event occurs or when a certain condition is met.

console.log("Execution started"); // 1

setTimeout(function() {
    console.log("Callback 1"); // 3
    
    setTimeout(function() {
        console.log("Callback 1.1"); // 4
    }, 0); 

}, 1000); // This is an asynchronous operation that will be executed after 1000 milliseconds


setTimeout(function() {
    console.log("Callback 2"); // 5
}, 1000); 


setTimeout(function() {
    console.log("Callback 3"); // 6
}, 1000); 

console.log("Execution finished"); // 2



console.log("Execution start" );


setTimeout(() => {
    console.log("CallBack 2")
}, 1000);

setTimeout(() => {
    console.log("callback 1");

    setTimeout(() => {
        console.log("CallBack 1.1")
    }, 0);
    
}, 1000);
    
setTimeout(() => {
            console.log("CallBack 3")
        }, 1000);

        console.log("Execution finish" );



// The above code demonstrates how JavaScript can handle asynchronous operations using the event loop.