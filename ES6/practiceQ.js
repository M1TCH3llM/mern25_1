// 1. List the person with javascript tag
const people = [
  { name: "Kalani", tags: ["spring", "html", "css"] },
  { name: "Jack", tags: ["java", "javaScript"] },
  { name: "Charlie", tags: ["python", "django"] },
  { name: "Bob", tags: ["html", "django"] },
  { name: "Steph", tags: ["python", "java"] },
  { name: "Leo", tags: ["javaScript", "css"] },   
];

const jsPeople = people.filter(person => person.tags.includes("javaScript"));
console.log("JavaScript Users:", jsPeople);


// 2. List the name of person using java and put programmer after their name, change the name key to Developer
const javaUsers = people
  .filter(person => person.tags.includes("java"))
  .map(person => ({ Developer: person.name + " programmer" }));

console.log("Java Developers:", javaUsers);

// 3. If we have anyone with tag python

const pythonUser = people.some(person => person.tags.includes("python"));
console.log("Any Python Developer?", pythonUser);

// 4. Find the number of unique tags and their count present in list

const tagCount = {};

people.forEach(person => {
  person.tags.forEach(tag => {
    tagCount[tag] = (tagCount[tag] || 0) + 1;
  });
});

console.log("Tag Count:", tagCount);

// 5. create a funtion with name multiply which accepts three parameters, and returns multiplication of all
//   but if we dont pass any parameter it returns 0

function multiply(a = 0, b = 0, c = 0) {
  
  return a * b * c;
}

console.log(multiply());
console.log(multiply(2, 3));
console.log(multiply(2, 3, 4)); 

// 6. create an array of 1 - 5 and add arr[newval] = at 6th place, print the output using for of and for in loop
const arr = [1, 2, 3, 4, 5];
arr[5] = 6;

console.log("Using forOf:");
for (const val of arr) {
  console.log(val);
}

console.log("Using forIn:");
for (const index in arr) {
  console.log(`${index}: ${arr[index]}`);
}
// 7. create an example of const where we can update on property of the object, where it says const is mutable

const person = { name: "Jeff", age: 25 };
console.log("Original:", person);
person.age = 26; 
console.log("Updated:", person); // age updated to 26

// 8. create a for loop using var and let, print each value in timeout after 2 second and try to 
//   demonstrate functional scope of var and lexical of let 

console.log("Using var:");
for (var i = 0; i < 5; i++) {
  setTimeout(() => console.log("var i:", i), 2000);
}

console.log("Using let:");
for (let j = 0; j < 5; j++) {
  setTimeout(() => console.log("let j:", j), 2000);
}


// 9. Create an example of object destructuring using student with details 

const student = {
  name: "Beth",
  age: 20,
  grade: "B+",
  contact: { email: "Beth@gmail.com", phone: "1234567890" },
};

const { name, age, contact: { email } } = student;
console.log(name, age, email); 

// 10. Demonstrate all aspects of array destructuring - including -> rest,  swap and other points

// Basic
const arr1 = [1, 2, 3];
const [x, y, z] = arr1;
console.log(x, y, z);

// Rest
const [first, ...rest] = [10, 20, 30, 40];
console.log(first); 
console.log(rest);  

// Swap
let a = 1, b = 2;
[a, b] = [b, a];
console.log("Swapped:", a, b); 

// Skipping
const [,, third] = [100, 200, 300];
console.log("Third:", third); 

// Default values
const [m = 5, n = 10] = [undefined];
console.log("Defaults:", m, n); 