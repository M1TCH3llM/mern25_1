// Class - are a template for creating objects
// Class - is a type of function

class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
  }
}

let userObj = new User("John", 30);
userObj.greet(); // Output: Hello, my name is John and I am 30 years old.



class Area { //scope of the class { < --- --- >}
    
    // constructor is used to initialized the properties
    constructor(length = 0, breadth = 0){
        this.length = length //properties
        this.breadth = breadth
    }

    Square = ()=> this.length*this.length

    SquareB = ()=> this.breadth*this.breadth

    Rectangle = ()=> this.length*this.breadth

    Circle = (radius,constantPie)=> constantPie*radius*radius

}

let areaObj = new Area(5,6)

console.log(areaObj.Square())
console.log(areaObj.SquareB())
console.log(areaObj.Rectangle())

console.log(areaObj.Circle(10, 3.1412))







class Account {
    constructor(name, acct, type, balance) {
        this.name = name;
        this.acct = acct;
        this.type = type;
        this.balance = balance;
    }

    //  Method to show balance
    showBalance() {
        return `Current balance: $${this.balance}`;
    }

    //  Method to show user details
    showUserDetails() {
        return `Name: ${this.name}, Account No: ${this.acct}, Type: ${this.type}`;
    }

    // Method to show account offers
    showAccountOffers() {
        if (this.type === "Savings") {
            return "You are eligible for 5% cashback on online purchases.";
        } else if (this.type === "Current") {
            return "You get free business banking features.";
        } else {
            return "No special offers available.";
        }
    }
}

// Create an account object
let acctObj = new Account("John", 123456, "Savings", 1267);

//Call the methods
console.log(acctObj.showBalance());
console.log(acctObj.showUserDetails());
console.log(acctObj.showAccountOffers());

