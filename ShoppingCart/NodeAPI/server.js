let express = require('express'); // express server framework starting point
let cors = require('cors');       // to allow cross origin requests
const cookieParser = require('cookie-parser'); // <-- add this
const mongoose = require('mongoose'); //  add mongoose
require('dotenv').config();

const app = express(); // initialize express application

// --- Core middleware  ---
app.use(express.json({ limit: '2mb' }));  // parse JSON once
app.use(cookieParser());                  // parse cookies BEFORE using them

// CORS: allow your React app to send/receive cookies
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:9090',
    credentials: true,
  })
);

// --- Routers & sub-apps ---
const defaultRouter = require('./routes/defaultRoutes');

const defaultApp = express();

const studentRouter = require('./routes/studentRoutes');
const studentApp = express();

const productRouter = require('./routes/productRoutes');
const productApp = express();

const userRouter = require('./routes/userRoutes');
const userApp = express();

const cartRouter = require('./routes/cartRoutes');
// You can use a Router() here (that was fine), but an express() sub-app works too:
const cartApp = express();

// Global __dirname (if you really need it)
globalThis.__dirname = __dirname;

// --- MongoDB connection ---
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/nodeapi';

async function connectMongoOnce() {
  const state = mongoose.connection.readyState; // 0=disconnected,1=connected,2=connecting,3=disconnecting
  if (state === 1) {
    console.log('MongoDB already connected');
    return;
  }
  if (state === 2) {
    console.log('MongoDB connection already in progress');
    return;
  }

  await mongoose.connect(MONGO_URI);
  console.log('MongoDB connected:', MONGO_URI);
}

connectMongoOnce().catch(err => {
  console.error('MongoDB connection error:', err.message);
  process.exit(1);
});

// --- Static files ---
app.use('/static', express.static('public')); // localhost:9000/static/<file>

// --- Mount sub-apps / routers ---
app.use('/student', studentApp);
studentApp.use('/', studentRouter);

app.use('/user', userApp);
userApp.use('/', userRouter);

app.use('/product', productApp);
productApp.use('/', productRouter);

app.use('/orders', require('./routes/resentOrderRoutes'));

app.use('/cart',
  (req, res, next) => { console.log('[cart-subapp]', req.method, req.originalUrl); next(); },
  cartApp
);
cartApp.get('/ping', (req, res) => res.send('cart ok'));
cartApp.use('/', cartRouter);

app.use('/', defaultApp);
defaultApp.use('/', defaultRouter);

// --- Start server ---
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


// 10-Oct-2025 - Notifications
// Show notification on top of header (Right Corner)
// Design Should show a circular or any small icon, to show number of notifications
// Upon click it should expand in rectangular box and show all the notification messages 
// All notification messages should be clickable
// Upon click of any of them it should reduce the count in notification icon
// It should have two types of notifications - static and dynamic
// Static Notifications To Assist User
// 1. To Add Products from Product Screen
// 2. To Add Items from Cart Page
// 3. To review cart from Checkout Page
// 4. To Make Payment from Payment Page
// 5. To Assist Them for cancel/reorder
// Dynamic Notifications To Assist User
// 1. To Check the number of items added in the Cart
// 2. If user cancels an order it should it should add one notification that an order has been cancelled and add it to notification row

// 7th-Oct-2025 - Review Page
// This should get its reviews from recent orders page
// User should be allowed to give ratings and his comments to each products as well as the order
// Upon successful submission each product should have a link to show its review -
// When user expands product detail we should also see the button to which will take us to review or review list
// on recent order page we can show a popup to submit rating or a new page its up to you //can use -> react bootstrap
// user should only be able to give rating once cancel button is gone


// 7th-Oct-2025 - Reorder Page 
// Reorder
// User to reorder from recent orders or from cancelled orders
// A Simple process just add the order to your cart and replace or merge whatever is present in cart