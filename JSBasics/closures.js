// Inheritance - JS is achieved throught prototypes. Every object has a prototype, which is another object from which it can inharet a property from
// Polymorphism - Overloading is not supported as parameter types are not check in JS
                // 

function outerFunction(accountName, accountType) {
    accountName = accountName || "Default Account";
    accountType = accountType || "Default Type";
    var balance = 1000;
    var password = "secret";

    function innerFunction(passcode) {
        if (passcode === password) {
            return {
                accountName: accountName,
                accountType: accountType,
                balance: balance 
            };
        } else {
            return {
                error: "Access Denied: Incorrect Passcode"
            };
        }
    }
    return innerFunction;
}

var myAccount = outerFunction("John Doe", "Savings");

console.log(myAccount("secret")); // ✅ Correct passcode
console.log(myAccount("1234"));   // ❌ Incorrect passcode
