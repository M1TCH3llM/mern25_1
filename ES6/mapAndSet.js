// Map - is the data structure that allows you to store key-value pairs.
// It is similar to an object, but it allows for any type of key (not just strings),
// and it maintains the order of the elements.

let myMap = new Map();

// Adding key-value pairs to the map

let myString = "key is String", objectKey = {}, functionKey = function() {}, numberKey = 42;

myMap.set(myString, "value is String");
myMap.set(objectKey, "value is Object");
myMap.set(functionKey, "value is Function");
myMap.set(numberKey, "value is Number");

console.log(myMap.entries());
 // Map(4) { 'key is String' => 'value is String', {} => 'value is Object', [Function: functionKey] => 'value is Function', 42 => 'value is Number' }

 console.log(myMap.get(myString)); // value is String

 //console.log(myMao.get({})) //
 
 
 console.log(myMap.get(2025))


 console.log(myMap.entries())

 console.log(myMap.delete(numberKey)); // true, deletes the key-value pair with key 42


 console.log(myMap.entries())


 let mySet = new Set();

 mySet.add("Kalani");
 mySet.add("Bob");
 mySet.add("Lenny");
 mySet.add("Grayham");

    console.log(mySet.entries()); // SetIterator { 'Kalani', 'Bob', 'Lenny', 'Grayham' }

    console.log(mySet.size); // true, checks if "Kalani" is in the set


