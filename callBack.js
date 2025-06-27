// Callback - A functions that is passed as an argument to another function and is executed after the completion of that function.

// function PrintData(p1, p2, p3) {
//     console.log("Data is : " + p1 + ", " + p2 + ", " + p3 + ", ");
    
// }

// function Sum(p1, p2, callbackFunc) {
//     callbackFunc("For Summation", (p1 + p2), "is");
// }

// Sum(10, 20 , PrintData);

//Question :
//1. create a callback function example for account
//2. PrintAccount details should accept this call back and the account information
//3. Upon executing PrintAccntDetails it should show the account details with a message
//4. Use the same call back to print multiple sessions planned for the day

var Account = {
    name: "John Seema",
    number: 345986246,
    balance: 12000,
    type: "Checking"
}

function printAccountMessage(account) {
    console.log(`Hi ${account.name}, Your ${account.type} balance is ${account.balance}`);
    
}


// 3. Function that accepts account and callback
function PrintAccountDetails(account, callback) {
    callback(account);
}

// 4. Use the callback to print account details
PrintAccountDetails(Account, printAccountMessage);

let sessions = [
    { name: "Jane Doe", number: 783246875, balance: 8500, type: "Savings" },
    { name: "Alex King", number: 124578965, balance: 4300, type: "Business" }
];

console.log("\nMultiple Sessions:");
sessions.forEach(acc => PrintAccountDetails(acc, printAccountMessage));


var voterInfo = {
    age: 18,
    registered: true
}

function printVoteElegibility(voterInfo) {
    if (voterInfo.age >= 18 && registered === true) {
        console.log("You are eligible to vote");
    }
    console.log("You are not eligible to vote");
}
function PrintVoteDetails(voteInfo, callback) {
    callback(voteInfo)
}