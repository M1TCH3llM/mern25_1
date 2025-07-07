// The new variables have been designed in ES6 to be Block-scoped, only accessible in block they are defined in.
// This is different fro,m the var keyword, which is function- scoped or globally scoped. 

//1. Let & Const are block scoped 

{
var x = 1;
let y = 2;
const z = 3;
}

console.log(x);
// console.log(y); // can not be accessed 
// console.log(z); // can not be accessed 

// var can be declared, let & const cannot

//2. var can be redeclared( let and const can not)

var x = 1;
let y = 2;
const z = 3;
console.log(x);

var x = 4;
console.log(x);

//var can be updated let can be updated but const can not

for (var i = 0; i < 5; i++) {
    setTimeout((() => {
    console.log(i);  // logs 5 every iteration
    }), 1000);
}

for (let i = 0; i < 5; i++) {
    setTimeout((() => {
    console.log(i); // log increments from 0 - 4
    }), 1000);
}

var n = 1;
let n = 2;

console.log(n);



// try making it work by using iife 

// no more let