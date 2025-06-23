// // Hoisting in JavaScript - gives us a feature where varible and function declarations are moved to the top 
// // of their containing scope durring compiloe phase

console.log(name); //undifined

var name = "The Name";

console.log(name); // The Name


// contained scope above lines dont count
function Print() {
    console.log(name); //undifined

    // if we uncoment line below it hoists to line 6

// var name = "Print Function";

// console.log(name);
}

Print()

/// ======================== Anonomys function (var with value as function) =====================

// PrintMyName() => will not get called because var is not yet defined


var PrintMyName = function() {
    console.log("PrintMyName Function Exicuted");
}

PrintMyName();