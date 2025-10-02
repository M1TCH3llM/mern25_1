const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/recentOrderController");

// Create an order 
router.post("/", ctrl.createOrder);

// Get recent orders for a user
router.get("/user/:userId", ctrl.listOrdersByUser);

// Cancel an order 
router.post("/:orderId/cancel", ctrl.cancelOrder);

// (Optional) Mark delivered (e.g., by ops or a job)
router.post("/:orderId/deliver", ctrl.markDelivered);

module.exports = router;
