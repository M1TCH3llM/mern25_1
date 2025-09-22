// server/routes/cartRoutes.js
const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

// POST /api/carts  -> save a new cart
router.post("/", cartController.createCart);

// GET /api/carts/:id  -> get cart by ID
router.get("/:id", cartController.getCartById);

// Get all carts (for testing purposes)
router.get("/", cartController.getAllCarts);

module.exports = router;
