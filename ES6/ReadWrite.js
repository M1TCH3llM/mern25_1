//ReadWrite and IO access can be done via async and sync way as per the needs using FS module

const { log } = require("console")
let fs = require("fs") //File System module helps us read and write in files via blocking or non-blocking code

//sync or blocking way of execution
console.log("Reading/Writing IO operations with file")

// let fileData = fsObj.readFileSync("class.js", "utf-8") // this is going to be a waiting call 
// console.log("Data from class file ", fileData)

//async or non-blocking way of execution
let fileData = "Base Data"

// fsObj.readFile("class.js","utf-8", (err, data)=>{
//     log("Error ", err)
//     //log("Data ", data)
//     fileData = data;
// }) //async way to read data

//console.log("Reading/Writing IO operations with file - end")

//console.log(fileData) // "" - 

// setTimeout(() => {
//     console.log(fileData)
// }, 2000);


//writing into the file

// fsObj.writeFile("WriteData.js", "This is a file where we need to add information", (err, data)=>{
//     // console.log(data)
//     // console.log(err)

//         fsObj.readFile("WriteData.js","utf-8", (err, data)=>{
//             log("Error ", err)
//             log("Data ", data)
//         })
// })



let userDetails = {
    name : "Mitchell",
    age : 19,
    city : "Somewhere on earth ",
    session : "MernStack"
}

//using the async write operation

fs.readFile('Text.json','utf-8',(err, fileData)=>{
    console.log("information" + fileData)
    console.log("errr", err)
    let writerStream = fs.createWriteStream("Text.json","utf8");
    console.log(fileData)
    if (fileData) {           
        let oldData = JSON.parse(fileData)    
        console.log(oldData)
        writerStream.write(JSON.stringify([...oldData, userDetails]));
        writerStream.end();
    }else{
        writerStream.write(JSON.stringify([
            { name : "Eric Phegly",
            age : 22,
            city : "California ",
            session : "MernStack"
        }]));
        writerStream.end();
    }
})

console.log('The a-synchronous operation ends here!!!')



//console.log("Reading/Writing IO operations with file - end")

// Write all the topics of Node JS we discussed this week and try to read it in async way
// Do a practice writing all the data using fs.write (sync async both)