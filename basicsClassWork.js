// console.log("Hello, World!");
// //node.js is a runtime environment that allows you to run JavaScript on the server side.
// // chrome v8 engine is used by node.js to execute JavaScript code.


// //1. Variable Declaration ~ Case Sensitivity

// var name = "John Doe"; // String
// var Nmae = "Jane Doe"; // String with different case
// console.log("Name:", name);
// console.log("Nmae:", Nmae);

// 2. var is the oldest way to declare variables in JavaScript.

// 3. Code is complied as well as partially interpreted in Node.js.

// 5. semicolon is optional in JavaScript, but it's a good practice to use it to avoid errors.

//6. All predefined loops like for, while, do-while, etc. are available in Node.js.

//7. functions are used to build behavior that we need our node js code to perform

//8. operators like +, -, *, /, % are used to perform arithmetic operations.

// autocasting is the process of converting one data type to another automatically.
// Example of a function in Node.js
// This function takes two numbers and returns their sum.
// Uncomment the following lines to see the function in action








// function sum(a, b) {
//     return a + b;
// }

// console.log("Sum of 5 and 3 is:", sum(5, 3));

// ====================================== CLASS WORK ====================================

// Implement all data types including symbol and bigInt
console.log("========= Data Types in JavaScript =========");

var num = 42; // Number

console.log("Value of num is: " + num, "Data type is: " + typeof num);


var str = "Hello, World!"; // String
console.log("Value of str is: " + str, "Data type is: " + typeof str);

var float = 3.14159; // Float
console.log("Value of float is: " + float, "Data type is: " + typeof float);

var bool = 1==1; // Boolean
console.log("Value of bool is: " + bool, "Data type is: " + typeof bool);
var bool = 1==3; // Boolean
console.log("Value of bool is: " + bool, "Data type is: " + typeof bool);

var undif = undefined; // Undefined
console.log("Value of undif is: " + undif, "Data type is: " + typeof undif);

var bigIntNum = BigInt(1234567890123456789012345678901234567890); // BigInt
console.log("Value of bigIntNum is: " + bigIntNum, "Data type is: " + typeof bigIntNum);

var Obj = { name: "John", age: 30 }; // Object
console.log("Value of Obj is: " + JSON.stringify(Obj), "Data type is: " + typeof Obj);

var symbol = Symbol("uniqueIdentifier"); // Symbol
    console.log("Value of symbol is: " + symbol.toString(), "Data type is: " + typeof symbol);  



// Types of Functions 

console.log("======== Types of Functions in JavaScript =========");

// 1. Function Declaration
function greet(name) {
    return "Hello, " + name + "!";
}
console.log(greet("Alice")); 
console.log(greet("Bob")); 

function multiply(a, b) {
    return a * b;
}
console.log("Multiplication of 5 and 3 is:", multiply(5, 3));

// 2. Anonymous Function
var add = function(a, b) {
    return a + b;
}
console.log("Addition of 5 and 3 is:", add(5, 3));

// 3. Immediately Invoked Function Expression (IIFE)

(function(counter) {
    console.log("This is an IIFE!" + counter);
})(1001);

//4. Constructor Function

function Person(name, age) {
    this.name = name;
    this.age = age;

    this.getInfo = function() {
        return `${this.name} + " is " + ${this.age} + " years old."`;
    };
}

var initialVal = 10
// This is an example of a nested function where the inner function can access variables from the outer function's scope
// This is called closure in JavaScript, where the inner function retains access to the outer function
// Currying is a technique in functional programming where a function with multiple arguments is transformed into a sequence of functions, each taking a single argument.
// This allows for partial application of functions, making it easier to create specialized functions from a general
function A(a) {
    console.log(initialVal)
    //console.log(d) //can't be accessed in parent - scope accessibility becomes zero when we move up to the parent function

    return function B(b) {
        console.log(a + " Function B")
        return function C(c) {
            console.log(b + " Function C")
            return function D(d) {
                console.log(c + " Function D")
                //
                return a+b+c+d+initialVal //ultimate outcome of nested functions
            }
        }
    }   
}

var objB = A(5); // Call the outer function with argument 5
var objC = objB(10); // Call the next inner function with argument 10  
var objD = objC(15); // Call the next inner function with argument 15
var result = objD(20); // Call the innermost function with argument 20
console.log(result);