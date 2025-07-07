// Default Param id used to set a default value for a parameter if no value or undefined is passed


// name is a parameter with a default value of 'World'
function greet(name = 'Human') {
    console.log(`Hello, ${name}!`);
}

console.log(greet()); // Hello, undefined!

function sum(p1 = 0, p2 = 0, p3 = 0) {
    // If p3 is not provided, it will be undefined
    return p1 + p2 + p3;
}

console.log(sum(1, 2, 3)); // 6
console.log(sum(1, 2)); // NaN (p3 is undefined)
console.log(sum(1)); // NaN (p2 and p3 are undefined)
console.log(sum()); // 0 (all parameters are undefined, defaults to 0)

// create a function that takes an object with defult values
// create a multiplication function that takes an object with default values


// function operation with default values
const object = {
    a: 1,
    b: 2,
    c: 3
}

const object2 = {
    a: 1,
    b: 2,
    d: 4
}

const object3 = {
    a: 1,
    c: 3,
    d: 4
}

function multiply({ a = 1, b = 1, c = 1, d =1 } = {}) {
    return a * b * c * d;
}

// without default values for d, it will be undefined
console.log(multiply(object)); // 6 (1 * 2 * 3 * 1)
console.log(multiply(object2)); // 8 (1 * 2 * 1 * 4)
console.log(multiply(object3)); // 12 (1 * 1 * 3 * 4)


// // function operation with default values
// const object2 = {
//     a: 1,
//     b: 2,
//     c: 3
// }

// function multiply({ a = 1, b = 1, c = 1} = {}) {
//     return a * b * c * d;
// }

// console.log(multiply(object2)); // 6 (1 * 2 * 3 * 1)
