let express = require('express') // express server framework starting point

const app = express() //initialize express application
const defaultRouter = require('./routes/defaultRoutes') // import the default routes

//child applications can also be created and used as mounted apps
const defaultApp = express() // create a new express application instance

const studentRouter = require('./routes/studentRoutes') // import the student routes
const studentApp = express() // create a new express application instance for student routes

globalThis.__dirname = __dirname // set the global __dirname variable to the current directory

// we can use static middleware to serve static files
//setting up the middleware static to handle all the static files we need to serve to client
// serve static files like images css using static middleware 
app.use('/static', express.static('public')) //localhost:9000/static/loadUserInfo.js

//application mounting for student routes
app.use("/student",studentApp) // use the default router for all routes
studentApp.use('/', studentRouter) // use the default router for all routes


//application mounting
app.use("/",defaultApp) // use the default router for all routes
defaultApp.use('/', defaultRouter) // use the default router for all routes


app.listen(9000)
console.log('Server is running on http://localhost:9000')