// Scope in JavaScript - refers to the visibility and accessibility of variables and functions in different parts of the code.
// Scope can be categorized into global scope and local scope.
// Global scope: Variables and functions declared outside of any function or block are in the global scope.
// Local scope: Variables and functions declared inside a function or block are in the local scope. 
// this keyword: Refers to the current context in which a function is executed. It can refer to different objects depending on how the function is called.


var Employee = {
    name: "John Doe",
    age: 30,
    position: "Software Engineer",
    
    displayDetails: function() {
        console.log(`Name: ${this.name}, Age: ${this.age}, Position: ${this.position}`);

        setTimeout(function(){
            console.log(` Context of 'this' inside setTimeout:`, this);
            // 'this' inside setTimeout refers to the global object or undefined in strict mode
            console.log(`Inside setTimeout: Name: ${this.name}, Age: ${this.age}, Position: ${this.position}`);
        }.bind(this), 3000);
    }
}

Employee.displayDetails(); // Output: Name: John Doe, Age: 30, Position: Software Engineer

//Employee.displayDetails.call({name:"Himavan", age : 22, position : "Technical Architect"});  // Output: Name: Himavan, Age: 22, Position: Technical Architect