// Arrow Functions are a more concise syntax for writing function expressions in JavaScript.
// They allow you to write functions without the need for the `function` keyword, and they also have some differences in behavior compared to traditional function expressions.
//// 1. Syntax
// Arrow functions use the `=>` syntax, which makes them more consise.
// solves problems with `this` binding in JavaScript, especially in callbacks and methods.


//1. Writing Arrow Functions using the `=>` syntax

function Sum(p1, p2) {
    return p1 + p2;
}

console.log(Sum(1, 2)); // 3

let sumArrow = (a, b) =>  a + b ;
console.log(sumArrow(1, 2)); 

// 2 Solving problem of scope binding without using bind

let User = {
    firstName: "Ryan",
    address: "New York",
    getUserDetails : function() {
        console.log(`${this.firstName} + " lives in " + ${this.address}`);

        setTimeout(function() {
              console.log(`${this.firstName} + " lives in " + ${this.address}`);``
        }, 1000); 

        setTimeout(() => {
           console.log(`${this.firstName} + " lives in " + ${this.address}`);
        }, 2000);

 }
}

User.getUserDetails(); // Ryan lives in New York

