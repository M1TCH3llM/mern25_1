for (let index = 0; index < 6; index++) {
    console.log(`Index is: ${index}`);
}

// let person = {
//     Fname: 'John',
//     Lname: 'Doe',
//     age: 30,
//     address: {
//         street: '123 Main St',
//         city: 'New York',
//         state: 'NY'
//     },
//     sesion: '2023-2024',

// }

// for (const key in person) {
//     const elements = person[key];
//     console.log(`Key: ${key}, Value: ${elements}`);
// }

// let arr = [1, 2, 3, 4, 5];

// arr.push("Ashish")

// arr["name"] = "Ryan"

// for (const index in arr) {
//     const element = arr[index];
//     console.log(`Index: ${index}, Element: ${element}`);
// }



//Create an example of your own for -
// 1. ForOF Loop
// 2. ForIn loop

const favoriteFoods = ["Sushi", "Tacos", "Pasta", "Ramen"];

console.log("My favorite foods are:");
for (let food of favoriteFoods) {
  console.log(food);  // Outputs each food item
}

const person = {
  name: "Mitchell",
  age: 31,
  hobby: "Traveling"
};

console.log("Details about the person:");
for (let key in person) {
  console.log(`${key}: ${person[key]}`);
}