// a special memory created out side the v8 heap which can be utilized for moderate set of data

let buf = Buffer.alloc(256);

let len = buf.write("We are learning node implementation, by using buffer data without using any file.");

// console.log("Output from a buffer " + len) //octet length

// console.log(buf.toString("utf8"))
// console.log(buf.toString("base64"))

//printing 26 alphabets of english
let buf26 = Buffer.alloc(26); 
for (let i = 0 ; i < 26 ; i++) 
{ 
    buf26[i] = i + 97; 
}

//console.log(buf26)

console.log(buf26.toString('ascii')); // outputs: abcdefghijklmnopqrstuvwxyz 
console.log( buf26.toString('ascii',0,5)); // outputs: abcde 
console.log( buf26.toString('utf8',0,5)); // outputs: abcde 
console.log( buf26.toString('base64',0,5)); // outputs: YWJjZGU= 
console.log( buf26.toString('base64')); // outputs: YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXo= 
console.log( buf26.toString(undefined,0,5)); // encoding defaults to 'utf8', outputs abcde