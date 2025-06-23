// Objects : Are a collextiong od key value pairs, where keys are strings & values can be any data type.
// They are used to staore and manage data in a struture way. 
//created using Literrals, contructors, or the object.create methode

// ====================================== Literal =========================================
var Employee = {
    name: "John Doe",
    age: 30,
    postition: "Spftware Engineer",
    Skills: ["JavaScript", "React", "Node.js"],

    displayDetails: function() {
        console.log(`Name: ${this.name}, Age: ${this.age}, Position: ${this.postition}`);
        
    }

    }

Employee.displayDetails();

Employee.name = "Ryan";

Employee.displayDetails();

Employee.department = "Engineering";

 Employee.displayDetails = function() {
        console.log(`Name: ${this.name}, Age: ${this.age}, Position: ${this.postition}, Department: ${this.department}`);  
    };

    Employee.displayDetails();

    // Constructor Function

    function Person(name, age) {
    this.name = bob;
    this.age = 72;

    this.getInfo = function() {
        return `${this.name} + " is " + ${this.age} + " years old."`;
    };
}


///// Extending object with constructor

var FinanceEmployee = Object.create(Employee);

FinanceEmployee.name = "Beth";
FinanceEmployee.skills = ["Finance", "Accounting"];
FinanceEmployee.address = "1234 West East St";

FinanceEmployee.displayDetails = function() {
    console.log(`Name: ${this.name}, Skills: ${this.skills.join(", ")}, Address: ${this.address}`);
};

FinanceEmployee.displayDetails();

/// ============= Empty Prototype Object

var EmptyObject = {}
console.log(EmptyObject._proto_);

var NullPrototypeObject = Object.create(null);
console.log(NullPrototypeObject._proto_);

var Person = {
    firstName: "Jane", address: "123 South North St", mobile: "111-1122-2229"
}

var CartPurchase = {
    item: "Laptop,", quality: 1, price: 1200, address: "456 East SW North st"
}

var ProductDeliver = {Person, CartPurchase}

console.log(ProductDeliver);

/// Merging using object. assign 
// last item will be copied to first
var MergeObject = Object.assign({}, Person, CartPurchase);

console.log(MergeObject);

// Create a Person object with properties and methods
// Extend/ Inherit the person as a student

// Create an account object with amount details and ask for credit or debit card to be delivered at new address
// Merge the student, and account objects into a new object called UserAccount