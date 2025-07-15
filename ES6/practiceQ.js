// 1. List the person with javascript tag
const people = [
  { name: "Alice", tags: ["spring", "html", "css"] },
  { name: "Bob", tags: ["java", "javaScript"] },
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
// 7. create an example of const where we can update on property of the object, where it says const is mutable
// 8. create a for loop using var and let, print each value in timeout after 2 second and try to 
//   demonstrate functional scope of var and lexical of let 
// 9. Create an example of object destructuring using student with details 
// 10. Demonstrate all aspects of array destructuring - including -> rest,  swap and other points