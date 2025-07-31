// 31st July - 2025 : ES6, eventloop and core JS questions

// All questions are mandatory - 14 out of 15 needs to be done, 1st question is equal to two question so can't be left
// 7th requires proper elaboration and example

// 1. How to preserve the immutability on my heroes list? Solve below problems using the same
console.log("=========== Question 1 ===========");

const heroes = [
  { name: 'Wolverine',      family: 'Marvel',    isEvil: false },
  { name: 'Deadpool',       family: 'Marvel',    isEvil: false },
  { name: 'Magneto',        family: 'Marvel',    isEvil: true  },
  { name: 'Charles Xavier', family: 'Marvel',    isEvil: false },
  { name: 'Batman',         family: 'DC Comics', isEvil: false },
  { name: 'Harley Quinn',   family: 'DC Comics', isEvil: true  },
  { name: 'Legolas',        family: 'Tolkien',   isEvil: false },
  { name: 'Gandalf',        family: 'Tolkien',   isEvil: false },
  { name: 'Saruman',        family: 'Tolkien',   isEvil: true  }
]

// a. Get heroes who are not evils
let goodHeroes = heroes.filter(hero => hero.isEvil === false);
console.log("Good Heroes: " + goodHeroes.map(hero => hero.name));

// b. Print Unique family names
let families = [...new Set(heroes.map(hero => hero.family))];
console.log("Families: " + families);

// c. Print Hero Names from given objects, and append sir in each of them before printing
let sirHeroes = heroes.map(hero => "Sir " + hero.name);
console.log(sirHeroes);

// d. Do we have any hero in Marvel Family who is not evil
let notEvilMarvel = heroes.some((hero) => hero.isEvil === false);
console.log("Not Evil Marvel Heroes? ", notEvilMarvel ? "Yes" : "No");






//2. Use the spread and rest operator to create a function which can multiply numbers from 1...n (n is the number of choice), 
//   using apply keyword we need to implement this one



//3. Print the last name through destructuring and add a contact number:9119119110 as well
console.log("=========== Question 3 ===========");

const person = {
    userDetails :{
        first: "FirstName",
        last: "LastName"
    }
}

let {userDetails: {first: firstName, last: lastName, number = 9119119110}} = person

console.log(lastName, number);


//4. Give me an example of const data manipulation
console.log("=========== Question 4 ===========");

const hero = {
    name: "Batman",
    city: "Gotham"
}
console.log(hero);

hero.city = "Chicago";
hero.Cape = true;

console.log(hero);


//5. What is the difference between for-of and for-in show with examples
console.log("=========== Question 5 ===========");

const antiHeroes = ["Harley Quin", "Mega Mind", "Deadpool", "Venom"];

// ======= For Of used to iterate over values of iterable objects like arrays, strings, sets, maps.
console.log("Anti Heroes: ");
for (let heroes of antiHeroes) {
    console.log(heroes);
}



const Deadpool = {
    name: "Deadpool",
    power: "Immortal",
    hobby: "Comedian",
    Universe: "Marvel"
}

console.log(" ");
console.log("Details about Deadpool:");
// ======= For In used to iterate over the keys (property names) of an object or array indices.
for (let key in Deadpool) {
  console.log(`${key}: ${Deadpool[key]}`);
}


//6. Give me an example of bind and write its usage, comparison with arrow function
// Bind retains .this when passing a method as a callback
// Arrow function Arrow functions do not have their own this they inherit it from their scope — the place where they were defined.
const villain = {
  name: "Thanos",
  greet: function() {
    setTimeout(function() {
        console.log("=========== Question 6 ===========");
      console.log("The most evil villain is " + this.name);
    }.bind(this), 1000);  
  }
};

villain.greet();

//7. Create an example showing usage of event loop in concurrent execution cycle
console.log("=========== Question 6 ===========");


//8. create an example showing usage of short hand and default param.

//9. Create two objects with some properties and merge them using Object method and ES6 way

//10. Give me an example of map and set collection each with at least four properties implemented - like get, set, clear, etc

//11. Create a promise object that get resloved after two seconds and rejected after three. Also it returns five ES6 features on resolved

//12. Use the spread and rest operator to create a function which can multiple numbers from 1...n (n is the number of choice)

//13. Use the question #11 to build promises using async and await - with multithread

//14. Create an example of generator function of your choice

//15. Explain your knowledge on function and object protoype what is the purpose of the same - example