//Mitchell
//1. rest spread

    // ============================================ SPREAD ============================================ 

    // Spread is represented by three dots, allows us to access all elements in an object with out the need for index

    // let nameList = ["John", "Jacob", "Jill", "Jeff", "Jason"]

    // console.log(...nameList);

    //  var nissanGTR = {Year: "2020", Engine: "VR38DETT", Color: "Silver", Price: 120000}

    //  var car = {...nissanGTR}
    // console.log(car);
    

//         // ============================================ Rest ============================================ 

//       //  While Spread expands elements, Rest collects remaining elements into an array (or object) for easier handling.
//       //  It’s commonly used in function parameters or destructuring.

//         function showNames(first, second, ...others) {
//   console.log("First:", first);
//   console.log("Second:", second);
//   console.log("Others:", others); 
// }

// showNames("John", "Jacob", "Jill", "Jeff", "Jason");

// // ============================================ Arrow function ============================================
//2. Arrow functions

// simpler way to write a function, fixes bind by copying the scope of immediate parent

// Normal function

// function greet(name) {
//   return "Hello " + name;
// }

// const greetArrow = (name) => "Hello " + name;

// console.log(greet("Jill"));     
// console.log(greetArrow("James")); 

// let add = (a, b) => setTimeout(() => {
    
//    console.log(a + b)

// }, 2000);
// ;

// add(4, 5)



// //3. map and reduce\
//         // ============================================ Map ============================================ 

// Creates a new array by applying a function to each element of an existing array.

// It does NOT change the original array.

let numbers = [1, 2, 3, 4];
// let doubled = numbers.map(num => num * 2); // map applies changes to each element in array

// console.log(numbers);
// console.log(doubled);  // will double each number 
// console.log(numbers);


//         // ============================================ Reduce ============================================ 

// Reduce takes an array and reduces it to a single value by applying a function repeatedly.

let product = numbers.reduce((acc, curr) => acc * curr);
let sum = numbers.reduce((acc, curr) => acc + curr, 0);
// let product = numbers.reduce((acc, curr) => acc * curr);

console.log(product); 
console.log(sum); 
console.log(numbers);



//         // ============================================ Application ============================================ 
