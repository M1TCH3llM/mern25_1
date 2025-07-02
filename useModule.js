// We can import the module directly using `require` in another file like this:

var myModule = require('./module.js'); // assuming module.js is in the same directory


console.log(myModule.greet('World')); // Output: Hello, World!
console.log(myModule.add(5, 10)); // Output: 15


// Practice Exercise: Create a module that exports a function to calculate the factorial of a number and import it in another file to use it.
// factorial.js

// Create an Example of event loop in JavaScript using concurrency with setTimeout 
// Break call stack

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



    let i = 0 


// function overFlow() {
//     overFlow();
// }

// overFlow();
