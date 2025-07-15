// Iterators are pointers to the iterable collection which allows us to run through each object and extracted, update/mutate data from the subset.
// with iterators we are allowed to have preservation of immutability principles alive,

// Filter, Map, Some and Reduce - methodes/iteratores added to each array of objects or an array of data


let personList = [
    {id: 1, name: "john", savedBy : "Capitan America"},
    {id: 2, name: "jane", savedBy : "Spiders"},
    {id: 3, name: "jack", savedBy : "Thor"},
    {id: 4, name: "jill", savedBy : "Spiders"},
    {id: 5, name: "james", savedBy : "Iron"},
    {id: 6, name: "joseph", savedBy : "Black Panther"},
    {id: 7, name: "jose", savedBy : "Doctor Strange"},
    {id: 8, name: "josephine", savedBy : "Spiders"}
]

//1. Give me list of the Person savedby Spiders
let savedBySpiders = personList.filter(person => person.savedBy === "Spiders");
console.log("People saved by Spiders:", savedBySpiders);

//2. Give me list of the Person savedby Spiders and map to their names
let personNameSavedBySpiders = personList.map((personObj)=> personObj.savedBy == "Spiders" ? personObj.name : null).filter(name => name !== null);

console.log("Names of people saved by Spiders:", personNameSavedBySpiders);

let newPersonNameSavedBySpiders = personList.map((personObj)=> {
    if(personObj.savedBy == "Spiders") 
        return {"Saved Person" : "Mr/Mrs" + personObj.name};
}).filter(p => p !== undefined);

console.log("New Names of people saved by Spiders:", newPersonNameSavedBySpiders);



let anyOneSavedByHulk = personList.some((personObj)=> personObj.savedBy == "Hulk")

let anyOneSavedByThor = personList.some((personObj)=> personObj.savedBy == "Thor")
// 3. Person saved by hulk ?

console.log("Is there anyone saved by Hulk?", anyOneSavedByHulk ? "Yes" : "No");
console.log("Is there anyone saved by Thor?", anyOneSavedByThor ? "Yes" : "No");


// 4. list the unique set of persons saved by each super hero

let uniqueSuperHeroes = personList.reduce((preVal, curVal, index, list) => {
    console.log("current", curVal, "Index:", index);
    co
    return curVal
})


