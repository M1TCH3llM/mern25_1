for (let index = 0; index < 6; index++) {
    console.log(`Index is: ${index}`);
}

let person = {
    Fname: 'John',
    Lname: 'Doe',
    age: 30,
    address: {
        street: '123 Main St',
        city: 'New York',
        state: 'NY'
    },
    sesion: '2023-2024',

}

for (const key in person) {
    const elements = person[key];
    console.log(`Key: ${key}, Value: ${elements}`);
}

let arr = [1, 2, 3, 4, 5];

arr.push("Ashish")

arr["name"] = "Ryan"

for (const index in arr) {
    const element = arr[index];
    console.log(`Index: ${index}, Element: ${element}`);
}
