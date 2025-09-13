let express = require('express'); // express server framework starting point
let cors = require('cors'); // to allow cross origin requests
const mongoose = require('mongoose'); //  add mongoose

const app = express(); // initialize express application
const defaultRouter = require('./routes/defaultRoutes'); // import the default routes

app.use(cors()); // use cors to allow cross origin requests
// child applications can also be created and used as mounted apps
// json middle-ware for setting request content type to json in body
app.use(express.json({ limit: '2mb', extended: false })); // note: `extended` is ignored by express.json, it's fine

const defaultApp = express(); // create a new express application instance

const studentRouter = require('./routes/studentRoutes'); // import the student routes
const studentApp = express(); // create a new express application instance for student routes

const userRouter = require('./routes/userRoutes'); // import the user routes
const userApp = express(); // create a new express application instance for user routes

globalThis.__dirname = __dirname; // set the global __dirname variable to the current directory

// MONGODB CONNECTION
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/nodeapi';
async function connectMongoOnce() {
    const state = mongoose.connection.readyState;
  if (state === 1) {
    console.log('MongoDB already connected');
    return;
  }
  if (state === 2) {
    console.log(' MongoDB connection already in progress');
    return;
  }

  await mongoose.connect(MONGO_URI);
  console.log('MongoDB connected:', MONGO_URI);
}

connectMongoOnce().catch(err => {
  console.error('MongoDB connection error:', err.message);
  process.exit(1);
});


// we can use static middleware to serve static files
// setting up the middleware static to handle all the static files we need to serve to client
// serve static files like images css using static middleware
app.use('/static', express.static('public')); // localhost:9000/static/loadUserInfo.js

// application mounting for student routes
app.use('/student', studentApp); // base path: /student
studentApp.use('/', studentRouter); // routes live at: GET /student/, POST /student/, etc.

// application mounting for user routes
app.use('/user', userApp); // base path: /user (e.g., /user/api/signinup per your comment)
userApp.use('/', userRouter);

// application mounting for default routes
app.use('/', defaultApp);
defaultApp.use('/', defaultRouter);

app.listen(9000);
console.log('Server is running on http://localhost:9000');
