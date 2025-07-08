// Shorthand: Removes the need to write the same name for keys and values in an object
// when they are the same, making the code more concise and readable.

let lion = 'roar', bird = 'tweet', dog = 'bark';

let animalSounds = {
    lion: lion,
    bird: bird,
    dog: dog
};

// in case of redundancy we can use only the varible anme and it will act as a key in ES6

let animalSoundsShorthand = {
    lion,
    bird,
    dog
};

// log method converts JSON object to string json by itself when pass json object in parameter
console.log("js way", animalSounds); // { lion: 'roar', bird: 'tweet', dog: 'bark' }

console.log("ES6 way", animalSoundsShorthand); // { lion: 'roar', bird: 'tweet', dog: 'bark' }

console.log("ES6 way with JSON.stringify", JSON.stringify(animalSoundsShorthand)); // {"lion":"roar","bird":"tweet","dog":"bark"}

modules.exports = {
    animalSounds,
    animalSoundsShorthand
};