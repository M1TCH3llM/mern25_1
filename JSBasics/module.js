//Module - in javascript, a module is a file that contains code that can be reused in other files.
// Modules help to organize code and make it more maintainable.
// In JavaScript, modules can be created using the `export` and `import` keywords
// or by using the `module.exports` and `require` keywords in Node.js.

// a single file or a collection of files that can be imported and used in other files. is a module.
// Modules can be used to encapsulate functionality, making it easier to manage dependencies and avoid naming conflicts.

// In Node.js, modules are created using the CommonJS module system, which uses `module.exports` to export functionality and `require` to import it.

// a sample module in Node.js:  

var myModule = {
    greet: function(name) {
        return `Hello, ${name}!`;
    },
    add: function(a, b) {
        return a + b;
    }
};

module.exports = myModule; // this means we are exporting the myModule object so it can be used in other files.