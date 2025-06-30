// 30th June-2025 : Practice Assessment 1 - JavaScript Basics

//Q1. Create a file with name basics and show all the features that you know about javascript? (minimum 5 and maximum 8 topics)
// Try explaining in 1-2 lines : example - Prototype : An object which behaves as a link between two functions and provides inheritance

// 1. Node.js 
    // A run time environment that allows you to run JavaScrips on the server side. 
    // this is powered by a v8 engine that is used to execute JavaScript
// 2. Hoisting
    // Hoisting is a mechanism in JavaScript where a variable and function decoration are moved to the top of their containing scope 
    // During the compilation phase before the code is executed.
// 3. Objects
    // Objects are a collection of key value pairs, keys are Strings and the pair can be any data type . 
    // objects are used to store & manage data in a structured way.
// 4. Callback
    // a callback is a function that is passed as an argument to another function and can be executed after the completion of the main function
// 5. Scope 
    // Scope refers to the accessibility of variables and functions with in a code.
    // there are two types of scope, Global and Local


//Q2. As javascript is not a type safe and has auto cast feature - try showing below values from the same variable
// and its type as well :values are - "Robert ", .0266, false, {myname : "Test Me"}, 25166665, undefined, true, "Robert Jr.", null, {}, -32767

var name = "Robert "
console.log(typeof name); // String

var dec = .0266
console.log(typeof dec); // number

var bool = false
console.log(typeof bool); // Boolean

var obj = {myname : "Test Me"}
console.log(typeof obj); // Object

var num =  25166665
console.log(typeof num); // number

var un =  undefined
console.log(typeof un); // undefined

var bool =  true
console.log(typeof bool); //boolean

var str =  "Robert Jr."
console.log(typeof str); //String

var not =  null
console.log(typeof not); // Object

var obj  =  {}
console.log(typeof obj ); // Object

var num  =  -32767
console.log(typeof num ); // Number


//Q3. Create a function with name showUserInfo, this function expects three params, firstname, lastname and age
//  print all the details in the given function

var User = {
    nameF: "Bob",
    nameL: "Boberson",
    age: 27,
    
    printUser: function() {
        console.log(`First Name: ${this.nameF}, Last Name: ${this.nameL}, Age: ${this.age}`);
    }
};

User.printUser();


//Q4. Create a function with name doaddition, pass three parameters and return the sum of all the three numbers
// below output needs to be monitored - doaddition(2,3,4), doaddition(2), doaddition(2.3,3), doaddition("first", 2, "three")
// analyse the outputs we get and try explaining the reasons behind!!

function add(a, b, c) {
    sum = a + b + c
    return sum
}

console.log(add(2,3,4)) // 9 
console.log(add(2)) // NaN Because b & c are undefined
console.log(add(2.3, 3)) //NaN because c is undefined
console.log(add("first", 2, "three")) //first2three Reason = added two strings to a number 

//Q5. Give me an example of your choice for each of the below concepts
// a. closure, 


function outerFunction() {
    let outerVar = "I'm from outer";

    function innerFunction() {
        console.log(outerVar); // inner "closes over" outerVar
    }

    return innerFunction;
}

const closure = outerFunction();
closure();  // Output: I'm from outer


// b. hoisting, 

console.log(hoistedVar); // Output: undefined (not an error!)
var hoistedVar = 14;

hoistedFunction(); // Output: "I am hoisted!"

function hoistedFunction() {
    console.log("Hoisted!");
}

// c. constructor function

function Student(name, age, gpa) {
    this.name = name;
    this.age = age;
    this.gpa = gpa;
    this.greet = function () {
        console.log(`${this.name}, your age is: ${age}, your gpa is: ${gpa}`);
    }
}

const student1 = new Student("Ben", 22, 3.5);
student1.greet();
const student2 = new Student("Jill", 21, 3.7);
student2.greet();

//Q6. What is the purpose of call, apply and bind ? and why they are used ? whats the difference between bind and apply ?
// Call = Passes arg manually or dynamically, reuse a function with different objects, invokes function immediately
// Apply = Invokes function Immediately, passes array as argument
// Bind = Does not invoke function immediately, returns new function with .this set 

// Bind vs Apply 
// Bind returns new function / Apply call function
// bind Passes later or individually / Apply passes array

//Q7. Create an example of bind using Student object, where a function returns data with SetTimeOut and we fix it by bind.

var Student = {
    FName: "Kalani",
    Location: "Denver",
    Age: "30",
    Major: "Computer Science",

    printInfo: function () {
        console.log("Immediately:", this.FName, this.Major); // "Kalani"

        // This will NOT work correctly due to lost context
        setTimeout(function () {
            console.log("Without bind:", this.FName, this.Major); // undefined or window.FName in browser
        }, 2000);

        // This WILL work correctly because we're binding `this` to the Student object
        setTimeout(function () {
            console.log("With bind:", this.FName, this.Major); // "Mitch"
        }.bind(this), 4000);

        // Change value to see effect
        this.FName = "Mitch";
        this.Major = "Fine Arts"
    }
};

Student.printInfo();

//Q8. Create an example of creating object with null prototype. What would be the purpose of the same?

var Auto = {
    type : null,

}

//Q9. How do we merge different objects properties using Object class function

// Object.assign merges objects 

//Ex..

var emp = {name: "John"}
var age = {age: 32}
var dep = {department: "Human Recurses"}

const emp1 = Object.assign({}, emp, age, dep);

console.log(emp1)


//Q10. Create an example of arithmatic operations using BigInt and show the output of the same

var bigInt1 = 1232502876505234897562130746423595415n;
var bigInt2 = 948326503487562348957234058974243563456n;

const sum1 = bigInt1 + bigInt2;
const dif = bigInt1 - bigInt2;
const product = bigInt1 * bigInt2;
const quotient = bigInt1 / bigInt2;
const remainder = bigInt1 % bigInt2;

console.log("Sum:", sum1);
console.log("Difference:", dif);
console.log("Product:", product);
console.log("Quotient:", quotient);
console.log("Remainder:", remainder);

// Once done please share the link of git hub repoitory with the code and the answers to the questions above