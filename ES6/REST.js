// REST - Representational State Transfer protocol

// REST is an architectural style for designing networked applications.
// It relies on a stateless, client-server, cacheable communications protocol -- typically HTTP.

// These are the API's or Services to do data transactions over HTTP
// These are also called as Endpoints, Microservices, or Web Services

// This becomes a service orientated architecture (SOA) where each service is responsible for a specific functionality.
// Data format is typically JSON or XML, but JSON is more common in modern applications.

// HTTP/s => Hypertext Transfer Protocol (Secure)

// HTTP methods are used to perform CRUD operations on resources.

// HTML - Hypertext Markup Language

// Specifications of RESTful APIs:
// 1. Use HTTP methods explicitly. - GET, POST, PUT, DELETE, PATCH
//    - GET: Retrieve data from the server.
//    - POST: Create a new resource on the server.
//    - PUT: Update an existing resource on the server.
//    - PATCH: Partially update an existing resource on the server.
//    - DELETE: Remove a resource from the server.
// 2. Use URIs to identify resources.
// 3. Use standard HTTP status codes to indicate the outcome of operations.
// 4. Use JSON or XML for data exchange.
// 5. Stateless communication - each request from client to server must contain all the information needed to understand and process the request.


// We'll build our application backend using express server with nodejs

// Create a npm setup to install express and other dependencies

// We can use YARN or NPM to create a package.json file
// Initialize a new Node.js project in a specific directory:
// Open terminal and navigate to your project directory
// npm init -y  

// Install express framework
// npm install express

// create server.js file in the same directory
// add npm start command and run as below

// npm start

// start - is the defult command to run the application
// build - is used to build the application for production and to run build scripts
// we need to use
// npm run build


// To detect changes in the code and restart the server automatically, we can use nodemon.
// Install nodemon as a development dependency:
// Dev Dependencies for development, it will not be included in production build
// npm i nodemon -D

// Normal dependencies for production
// npm i express cors body-parser


// node_modules is the folder where all the dependencies are installed locally
// .gitignore file to ignore node_modules folder and other files, to avoid pushing them to the repository

// package-lock.json is the file that contains the exact versions of the dependencies installed and resolves the dependencies tree.

// if we already have a package.json file, we can install the dependencies using
// npm install or npm i

// this will install all the dependencies listed in the package.json file


//get - fetch data from the server just needs the resource URL
//post - send data to the server, needs the resource URL and the data to be sent in the body
// req.body - json format data sent in the request body

// req.query - query parameters sent in the URL
// localhost:9000/first?name=John&age=30
// req.params - route parameters sent in the URL
// localhost:9000/first/John/30