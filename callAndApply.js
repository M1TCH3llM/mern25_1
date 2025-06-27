var user1 =  {
    name: "Bob",
    age: 40
}

var user2 =  {
    name: "Becky",
    age: 30
}

function printInfo(greeting, number) {
    console.log(`name is: ${this.name}, age: ${this.age}`);
    console.log(`${greeting}, the number is ${number}. This is called with 'this' context`, this);
    
}


printInfo.call(user1, "Hello", 72);
printInfo.call(user2, "Whats up", 62);


function Sum(p1, p2, p3, p4, p5, p6) {
    console.log(`Sum of ${p1}, ${p2}, ${p3}, ${p4}, ${p5} is:`, p1 + p2 + p3 + p4 + p5 + p6);
}

var numbers = [1, 2, 3, 4, 5, 6];
Sum.apply(null, numbers); // apply with null context and an array of arguments

function VehicleSpecifications(name, type, year, color, legspace, groundClearance, price) {
    console.log(`This is ${this.segment}, ${this.vehicleType} having space for ${this.capacity} with the following specifications:`);
    
    console.log(`Vehicle Specifications:
        Name: ${name}
        Type: ${type}
        Year: ${year}
        Color: ${color}
        Legspace: ${legspace}
        Ground Clearance: ${groundClearance}
        Price: ${price}`);    
}

var Car = {
    segment: "C Segment",
    vehicleType: "Car",
    capacity: 5 // capacity in terms of number of passengers
}

var Traveller = {
    segment: "B Segment",
    vehicleType: "Van",   
    capacity: 12 // capacity in terms of number of passengers
}


VehicleSpecifications.apply(Car, ["Toyota", "Sedan", 2022, "Red", "1.5m", "0.2m", "$20,000"]); // apply with Car context and an array of arguments

VehicleSpecifications.apply(Traveller, ["Mercedes", "Van", 2023, "White", "2.0m", "0.3m", "$50,000"]);
