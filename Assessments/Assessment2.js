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
console.log("=========== Question 1 / a ===========");

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

setTimeout(() => { // I Wrapped this to ensure the solution printed out uninterrupted by the following questions

console.log("=========== Question 7 ===========");

console.log('Synchronous Start');

setTimeout(() => {
  console.log('setTimeout Callback'); 
}, 0);

Promise.resolve().then(() => {
  console.log('Promise.then Callback'); 
});

console.log('Synchronous End');
}, 3000);



//8. create an example showing usage of short hand and default param.
console.log("=========== Question 8 ===========");

function createHero(name = "Super Man", power = "Laser Vision", town = "New York") {
    return {
        name,
        power,
        town
    }
}

const hero1 = createHero();
console.log(hero1);

const hero2 = createHero("The Flash", "Super Speed", "Detroit")
console.log(hero2);



//9. Create two objects with some properties and merge them using Object method and ES6 way
console.log("=========== Question 9 ===========");

const obj = {car: "Honda", mpg: 27, condition: "new"}
const obj2 = {engine: "2.4L", driveTrain: "FWD", hasSunRoof: "Yes"}

const merged = Object.assign({}, obj, obj2);
console.log(merged);

const merged1 = { ...obj, ...obj2 };
console.log(merged1);


//10. Give me an example of map and set collection each with at least four properties implemented - like get, set, clear, etc
// Map example
console.log("=========== Question 10 ===========");

const myMap = new Map();
myMap.set('name', 'Spider Man');
myMap.set('age', 16);
myMap.set('Power', 'Spider Powers');
console.log(myMap.get('name')); 
console.log(myMap.has('age')); 
myMap.delete('power');
console.log(myMap.size); 
myMap.clear();
console.log(myMap.size);

// Set example
const mySet = new Set();
mySet.add('Bat Man');
mySet.add('Cat Woman');
mySet.add('Joker');
console.log(mySet.has('Bat Man'));
mySet.delete('Joker');
console.log(mySet.size);
mySet.clear();
console.log(mySet.size);

//11. Create a promise object that get resolved after two seconds and rejected after three. Also it returns five ES6 features on resolved

    

console.log("=========== Question 11 ===========");

const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve([
            'Arrow Functions',
            'Template Literals',
            'Destructuring',
            'Let & Const',
            'Default Parameters'
        ]);
    }, 2000);

    setTimeout(() => {
        reject('Promise rejected after 3 seconds');
    }, 3000);
});

promise
    .then(features => {
        console.log("Resolved with ES6 features:", features);
    })
    .catch(err => {
        console.log("Error:", err);
    });



//12. Use the spread and rest operator to create a function which can multiple numbers from 1...n (n is the number of choice)
console.log("=========== Question 12 ===========");

function multiplyAll(...numbers) {
    return numbers.reduce((acc, num) => acc * num, 1);
}

const nums = [1, 2, 3, 4, 5];
console.log(multiplyAll(...nums));

//13. Use the question #11 to build promises using async and await - with multithread
console.log("=========== Question 13 ===========");

async function handlePromise() {
    try {
        const features = await promise;
        console.log("Async/Await Result:", features);
    } catch (err) {
        console.log("Caught Error:", err);
    }
}

handlePromise();

//14. Create an example of generator function of your choice
console.log("=========== Question 14 ===========");

function* numberGenerator(limit) {
    let count = 1;
    while (count <= limit) {
        yield count++;
    }
}

const gen = numberGenerator(5);
for (let num of gen) {
    console.log(num);
}

//15. Explain your knowledge on function and object protoype what is the purpose of the same - example

// Every function in JS has a prototype object used when the function is used as a constructor.
console.log("=========== Question 14 ===========");

function SuperHero(name) {
    this.name = name;
}

SuperHero.prototype.greet = function() {
    return `Hello, I'm ${this.name}`;
};

const batman = new SuperHero("Batman");
console.log(batman.greet());


// All objects inherit from Object.prototype. You can add custom methods via prototype chaining.

const animal = {
    speak() {
        return "I make a sound.";
    }
};

const dog = Object.create(animal);
dog.bark = function() {
    return "Woof!";
};

console.log(dog.speak());
console.log(dog.bark());