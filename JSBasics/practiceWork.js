// 1. OutPut of the following

function sum(x, y) {
  if (y !== undefined) {
    return x + y;
  } else {
    return function(y) { return x + y; };
  }
}

console.log(sum(2,3));   // Outputs - ANSWER is 5
console.log(sum(2)(3));  // Outputs - ANSWER is 5


// 2. Create a function to populate user details. 
  //  func - populateDetail prints Address and accepts a callBackFunction which prints Name, Age and Topic

var Person = {
    name: "Bob",
    age: 27,
    topic: "Physics",
    address: "432 N. North St"
}

function address(p, callback) {
    console.log(`The address is ${p.address}`);
    callback(p);

}

function info(p) {
    console.log(`Name: ${p.name}, Topic: ${p.topic}, Age: ${p.age}`);
}

address(Person, info)
    
// 3.  Javascript currying is achieved by returning functions from functions. Here, the outer function (print) supplies the printing to be used while the returned function allows the caller to supply the name of the printer.

// 4. output of the following
console.log(typeof typeof 1); // ANSWER is String
console.log(typeof 1); // ANSWER is Number


// 4.1 Example of bind function on browser, we must be able to change the object on click


// 4.2 Create object without protoype and the inherit it futher
 var Person = {
    name: "Guy Furry",
    age: 55,
 
 
 displayDetails: function() {
     console.log(`Chef: ${this.name}, Age: ${55}`);

    }
 }

 Person.displayDetails();

var Chef = Object.create(Person);
 Chef.special = "American Food";
 Chef.restaurant = "T.G.I.F's";
 Chef.lives = "California";

  Chef.displayDetails = function() {
     console.log(`Name: ${this.name}, Age: ${this.age}, Special: ${this.special}, Restaurant: ${this.restaurant}, Lives: ${this.lives}`);
        
  }

  Chef.displayDetails();

// set - 1 
//1. What would be answer to this
    console.log("Before: ", a); // ANSWER = Undefined
    var a = 10;
    console.log("After: ", a); //ANSWER = 10
    
    
//2. Global Scope
    // a doesn't exist in global scope
    var a;

    function hoistExample() {
      a = 11;
    }

    hoistExample();
    console.log(a); // ReferenceError: a is not defined
    
//3. Function expression not hoisted

    testFunc();
    var testFunc = function funcHoist() {
      console.log("I am being hoisted.");
    }    
    
    testFunc();

//4. SetTimeouts

    setTimeout(function(){
        console.log("first timeout");
        setTimeout(function(){
            console.log("inner timeout");            
        },0);    
        
        setTimeout(function(){
            console.log("second timeout");
        },100);
        
        setTimeout(function(){
            console.log("third timeout");
        },100);
    },100);
    
//5. Function Hoisting
    console.log(funcs);
    var funcs;
    function funcs(){
        funcs = 3;
    }
    funcs();
    console.log(funcs);

//6. Function Hoisting
    console.log(funcs);
    var funcs;
    var funcs = function (){
        funcs = 5;
    }
    funcs();
    console.log(funcs);
    
//7. Create an object without prototype chain or i do not want it to be inherited further
    var x = Object.create(null)
    var y = Object.create({})
    
    console.log(x);
    console.log(y);
    // Called as a constructor
    new Object([value])
    
//8. What will be the output
    // let k = "kk";
    // k = "yy";
    
    // const k;
    // const k = "kk";
    
    // const k = "ky";
    // let k = "kz";
    
//9. Output of the following
    var x;
    console.log(typeof x);
    
    x = 5;
    console.log(typeof x);
    
    x = "MEAN";
    console.log(typeof x);
//10. Output of the following    
    var array=[1,2,3,4,5];
    console.log(array.slice(2));
