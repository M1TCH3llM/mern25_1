// Create a Person object with properties and methods
// Extend/ Inherit the person as a student

var Person = {
    name: "Chef Ramsy",
    age: 50,
    position: "Chef",
    skills: ["Cooking", "Yelling", "Being Awesome"],

   displayDetails: function() {
        console.log(`Name: ${this.name}, Age: ${this.age}, Position: ${this.position}, Skills: ${this.skills.join(", ")}`);
        
    }
}

Person.displayDetails();


var Student = Object.create(Person);
Student.class =[ "Culinary 101", "Yelling & Sous Chefs 203"];
Student.school = "Hells Kitchen";
Student.gpa = 3.4;
Student.address = "739 North North South Street, Kanses City, MO, 90234";

     Student.displayDetails = function() {
        console.log(`Name: ${this.name}, Age: ${this.age}, Position: ${this.position}, Skills: ${this.skills.join(", ")}, Classes: ${this.class.join(" , ")}, School: ${this.school}, GPA: ${this.gpa}`);
        
    }

     Student.displayDetails();


// Create an account object with amount details and ask for credit or debit card to be delivered at new address
// Merge the student, and account objects into a new object called UserAccount

var Account = {
    balance: 145028,
    accountNumber: "982367105373",

   requestCard: function(type, newAddress) {
        console.log(`${type} card will be delivered to: ${newAddress}`);
            }

    }


var UserAccount = Object.assign({}, Person, Student, Account);

UserAccount.displayDetails = function() {
    console.log(`Name: ${this.name}, Age: ${this.age}, Position: ${this.position}, School: ${this.school}, GPA: ${this.gpa}, Account: ${this.accountNumber}, Balance: $ ${this.balance}`);
};

UserAccount.displayDetails();
Account.requestCard("Debit", UserAccount.address);