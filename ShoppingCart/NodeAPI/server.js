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

const productRouter = require('./routes/productRoutes');
const productApp = express();

const userRouter = require('./routes/userRoutes'); // import the user routes
const userApp = express(); // create a new express application instance for user routes

const cartRouter = require('./routes/cartRoutes'); // import the cart routes
const cartApp = express.Router(); // create a new express application instance for cart routes

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

//Product
app.use("/product", productApp);
productApp.use('/', productRouter);

app.use("/cart",
  (req, res, next) => { console.log("[cart-subapp]", req.method, req.originalUrl); next(); },
  cartApp);
cartApp.get("/ping", (req, res) => res.send("cart ok"));
cartApp.use('/', cartRouter);



// application mounting for default routes
app.use('/', defaultApp);
defaultApp.use('/', defaultRouter);

app.listen(9000);
console.log('Server is running on http://localhost:9000');


// Coupon Page 
// Create a component with Name - CouponComponent (Functional Component and Use Hooks)
// On the page add a Button - GenerateCoupon
// Upon Click Generate a random coupon of - 6 digits (basically a numeric random value)
// Dispatch this generated coupon using useDispatch
// Create a Coupon Reducer to have Coupon Value, Use Reducer to update the coupon value (useSelector coupon)
// Create action to pass coupon to reducer, with type and payload


// Part 2 : 
// Hide all the links except : Home, User and About for a user not logged-in
// In Product Component show Save to product section only to a user with name "admin" so that not all users 
// can insert the products to database
// what is a JWT token?

// DONE 

// 22- Sept-2025 - Checkout Component
// Checkout Component
// Create A functional component and use react hook or using container to read data from store
// Show - User Details (Name, address) //We will deliver products to below address kind of message as well
// Show Table of cart put up for purchase (you need to re-use the cartlist and cartitem components)
// Show the purchase Summary (total qty and total amount)
// Show a Button to Proceed to Payment
// Integrate this page on CartComponent Button (Go to checkout) -(Go To Checkout From Cart Component)


// Second Task :
// Create a state using useState to show hide (Make Payment Message)
// Upon Clicking on MakePayment button, hide everything and just show the message - "Thankyou for the payment, your items under process!"
// Change the header from Checkout Page to Payment Page