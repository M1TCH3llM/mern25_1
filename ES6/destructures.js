// Destructuring assignments in ES6 allow unpacking values from arrays or properties from objects into distinct variables.
// it provides a more concise and readable way to extract values from complex data structures.

//1. Array Destructuring
const arr = [1, 2, 3, 4, 5];


// Asigning values from the array to variables without destructuring 
// const first = arr[0];
// const second = arr[1];
// const third = arr[2];

// Using destructuring to extract values from the array
// const [first, second, third] = arr;

// console.log(first, second, third); // 1 2 3

// Skip Values 
const [first, , third] = arr; // Skip the second value
console.log(first, third); // 1 3

// rest operator
const [firstValue, ...rest] = arr; // firstValue is 1, rest
console.log(firstValue, rest); // 1 [2, 3, 4, 5]

// nested arrays
const nestedArr = [1, [2, 3], 4];
const [one, [two, three], four] = nestedArr; // one is
console.log(one, two, three, four); // 1 2 3 4

// Swapping values
let a = 1;
let b = 2;
console.log(a, b); // 1 2
[a, b] = [b, a]; // Swap values using destructuring
console.log(a, b); // 2 1

// Object Destructuring
let User = {
    firstName: 'John',
    lastName: 'Doe',
    webCertification: "first year 8.0",
    javaCertification: "final year 9.0",
    cPlusPlusCertification: "second year 7.0"
}

let {firstName, webCertification}= User;

console.log(firstName, webCertification); // John first year 8.0

let Student = {
    firstName: 'Jane',
    lastName: 'Smith',
    age: 20,
    marks : {
        math: 90,
        science: 85,
        english: 88
    }
}
// nested destructuring
let {firstName: studentName, marks: {math, science, art = 93}} = Student;

console.log(studentName, math, science); // Jane 90 85
console.log(art); // 93 (default value since art is not defined in Student)

//Questions for practice

//Create an object with studentInfo, print firstname, total marks and Individual Subject Marks, using object and nested destructuring 
//along with that also create a lastname and Ecology as (marks) "95", without making any change in Student

const studentInfo = {
    firstName: 'Chef',
    lastName: 'Gordon',
    age: 45,
    marks: {
        math: 95,
        science: 90,
        english: 85,
    }
}

let {firstName: chefName, lastName, age, marks: {math: chefMath, science: chefScience, english: chefEnglish, ecology = 95}} = studentInfo;

console.log(firstName);
console.log(lastName);
console.log(age);
console.log("ecology:", ecology); // Chef Gordon

//create an array of your aspirations, print first three to achieve in 2025,26,27 and keep others in ...rest operator, using array destructuring 

const aspirations = ['Learn AI', 'Build an App that makes money', 'Travel More', 'Start a business', 'Master a new language']; 
const [aspiration1, aspiration2, aspiration3, ...restAspirations] = aspirations;

console.log("2025:", aspiration1, ", 2026:", aspiration2, ", 2027:", aspiration3); // 

// a rest operator collects the remaining elements into an array
console.log(restAspirations); // [ 'Start a business', 'Master a new language

//create an example of swapping, default value and other explained features of array destructuring


let x = "love";
let y = "peace";
console.log("Before swapping:", x, "&", y); // Before swapping: love peace

[x, y] = [y, x]; // Swapping values using destructuring
console.log("After swapping:", x,"&", y); // After swapping: peace love
