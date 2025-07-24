// // Framework to do the job of I/O Operations using the in built 'fs' module
// const fs = require('fs'); //already installed with our node.js installation 99000+
// const log = console.log; //alias for console.log

// Read the file synchronously
// console.log("Reading file asynchronously...");

// const data = fs.readFileSync('shorthand.js', 'utf8'); // utf8 is the encoding format
// console.log(data);

// // Read the file asynchronously
// fs.readFile('shorthand.js', 'utf8', (err, data) => {
//     if (err) {  
//         console.error("Error reading file:", err);
//         return;
//     }   
//     console.log(data);
// });

// console.log("Reading file asynchronously... end");

// Using http module to create a simple web server - to built RESTful APIs
// const http = require('http');
// // Create a server that listens on port 3000
// const server = http.createServer((req, res) => {
//     res.writeHead(200, { 'Content-Type': 'text/plain' });
//     res.end('Hello, World! MERNStack\n');
// });
// // Start the server and listen on port 3000
// server.listen(3000, () => {
//     console.log('Server is running at http://localhost:3000/');
// });

//http.get()
//http.put()
//http.post()
//http.patch()
//http.delete()

//stop anything that run in node js we use ctrl + c

// REPL - Read Eval Print Loop
// // Node.js provides a REPL environment for interactive programming

// const path = require('path'); //path module to handle file paths

// //two constants present
// console.log("Current Directory:", __dirname); // Current directory of the script
// console.log("Current File:", __filename); // Full path of the current file


// we can write code to read input from the user
//callback with data inserted
// process.stdin.on('data', data =>{
//     process.stdout.write(`\n\n ${data.toString().trim()} \n\n`)
//     dataFromTerminal = data.toString();
//     //process.exit();
// })
// process.stdin.on('exit', data =>{
//     log("we are exiting")
//     process.stdout.write(`\n\n ${data.toString().trim()} \n\n`)
// })

// setTimeout(()=>{
//     console.log(dataFromTerminal)
// },10000)

// EvenEmitter class is used to handle events in Node.js
// const EventEmitter = require('events');
// // Create an instance of EventEmitter
// const eventEmitter = new EventEmitter();
// // Register an event listener for the 'greet' event
// eventEmitter.on('greet', (name) => {
//     console.log(`Hello, ${name}!`);
// });
// // Emit the 'greet' event with a name 
// eventEmitter.emit('greet', 'World');

//Working with the 'os' module to get system information
// const os = require('os');

// // os.cpus().forEach((cpu, index) => {
// //     console.log(`CPU ${index + 1}:`);
// //     console.log(`Model: ${cpu.model}`);
// //     console.log(`Speed: ${cpu.speed} MHz`);
// //     console.log(`Times:`, cpu.times);
// // });

// // console.log(`Total Memory: ${os.totalmem() / (1024 * 1024)} MB`);
// // console.log(`Free Memory: ${os.freemem() / (1024 * 1024)} MB`);
// // console.log(`Operating System: ${os.type()} ${os.release()}`);
// // console.log(`Platform: ${os.platform()}`);
// // console.log(`Architecture: ${os.arch()}`);

// // console.log(`Home Directory: ${os.homedir()}`);
// // console.log(`Temporary Directory: ${os.tmpdir()}`);

// // log(os.cpus())
// // log(os.hostname())
// // log(os.machine())
// // log(os.version())
// // log(os)

// let user = require("./shortHand"); // Importing the shorthand module

// //reading from global object
// console.log("User Information from global object => ", globalThis.userInfo)


// //utility module
// const util = require('util')
// // util.log(path.basename(__filename))
// // util.log(path.basename(__dirname))
// //log(util.debuglog())


// const v8 = require('v8');

// // log(v8)

// // log(v8.getHeapSnapshot())
// // log(v8.getHeapStatistics())

// process.nextTick(()=>{log("Next Tick Called!!")})



// //path
// console.log(`The file name is - ${path.basename(__filename)}`);
// console.log(`The file name is abosolute - ${path.isAbsolute(__dirname)}`);
// console.log(`The resolved file name is - ${path.resolve(__filename)}`);