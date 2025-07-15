// Spread Operator - is Used to spread there data present in array or object and also allows us to have a shallow copy

let nameList = ["Ryan", "Himavan", "Mitchell", "Oscar", "Jason"]

console.log(nameList[0])
console.log(...nameList)

var Person = {
    fName: "jane",
    Mobile: "123-345-6789"
}
var purchase = {
    item: "eggs",
    quantity: "12",
    price: "13"
}

var productOrder ={...Person, ...purchase}
console.log(productOrder);

purchase.mobile ="3216540987"
console.log(purchase);
