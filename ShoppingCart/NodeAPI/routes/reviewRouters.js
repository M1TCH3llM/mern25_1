const express = require('express');
const router = express.Router();

const reviewsCtrl = require('../controllers/reviewController');

// POST /reviews  
router.post('/', reviewsCtrl.createOrUpdate);

// GET /reviews/by-order/:userId/:orderId 
router.get('/by-order/:userId/:orderId', reviewsCtrl.getByOrder);

// GET /reviews/my/:userId 
router.get('/my/:userId', reviewsCtrl.getMine);

// GET /reviews/product/:productId 
router.get('/product/:productId', reviewsCtrl.getByProduct);

router.get('/all', reviewsCtrl.getAllPublic);

module.exports = router;
