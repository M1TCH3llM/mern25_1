
// // Rest operator will print out the rest of the names in an array

// function myFun(a, b, ...moreNames) {
//   console.log("a", a);
//   console.log("b", b);
//   console.log("moreNames", moreNames);
// }

// myFun("Jeff", "Jake", "Josh", "Jill", "Jasmine", "Jenny");

// we can even uses individual elements in an array to preform maths

// function multiply(multiplier, ...theArgs) {
//   return theArgs.map((element) => multiplier * element);
// }

// const arr = multiply(2, 15, 25, 42);
// console.log(arr);

// // Use to destruct an array and uses values to add together

// function sum(...theArgs) {
//   let total = 0;
//   for (const arg of theArgs) {
//     total += arg;
//   }
//   return total;
// }

// console.log(sum(1, 2, 3));
// // Expected output: 6

// console.log(sum(1, 2, 3, 4));
// // Expected output: 10



// // ============================== Spread Operator ========================

// // Assign the first and second items from numbers to variables and put the rest in an array:

// const argsOne = [1, 2, 3];
// const argsTwo = [4, 5, 6];
// const argsCombined = [...argsOne, ...argsTwo];

// console.log("Combined: " + argsCombined);

// // Same Same but different

// const args1 = [1, 2, 3];
// const args2 = [...args1, 4, 5, 6];

// console.log("args2: " + args2);

// // use with objects too

// const myVehicle = {
//   brand: 'Toyota',
//   model: 'Supra',
//   color: 'red'
// }

// const updateMyVehicle = {
//   type: 'car',
//   year: 1999,
//   color: 'yellow'
// }

// const myUpdatedVehicle = {...myVehicle, ...updateMyVehicle}

// console.log("Updated Vehicle:");
// console.log(myUpdatedVehicle);


// // ============================== Deconstruction ========================


//   const colors = ["red", "green", "blue"];
// const [firstColor, secondColor, thirdColor] = colors;

//     console.log(colors);
//     console.log(firstColor);
//     console.log(secondColor);
//     console.log(thirdColor);
    
// // Deconstruction with spread operator
    const superHero = { hero: "Thor", age: 35, power: "lighting", weapon: "hammer" };
    const { hero, age, ...powers } = superHero;

        console.log(superHero);
        console.log("Name: " + hero);
        console.log("Age: " + age);
        console.log("Abilities: " );
        console.log(powers);

