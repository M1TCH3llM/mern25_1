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

const reviewRouter = require('./routes/reviewRouters');
const reviewApp = express();


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

app.use('/review', reviewApp);
reviewApp.use('/', reviewRouter);

app.use('/orders', require('./routes/resentOrderRoutes'));

app.use('/cart',
  (req, res, next) => { console.log('[cart-subapp]', req.method, req.originalUrl); next(); },
  cartApp
);

app.use((req, _res, next) => {
  console.log('[req]', req.method, req.originalUrl);
  next();
});

cartApp.get('/ping', (req, res) => res.send('cart ok'));
cartApp.use('/', cartRouter);

app.use('/', defaultApp);
defaultApp.use('/', defaultRouter);

// --- Start server ---
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


// 7th-Oct-2025 - Reorder Page 
// Reorder
// User to reorder from recent orders or from cancelled orders
// A Simple process just add the order to your cart and replace or merge whatever is present in cart