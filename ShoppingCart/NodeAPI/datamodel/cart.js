const mongoose = require("mongoose");

const CartItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  name:       { type: String,  required: true },
  price:      { type: Number,  required: true, min: 0 },
  qty:        { type: Number,  required: true, min: 1, default: 1 },
}, { _id: false });

const CartSchema = new mongoose.Schema({
  userId:   { type: mongoose.Schema.Types.ObjectId, ref: "User" }, 
  items:    { type: [CartItemSchema], required: true, default: [] },
  subtotal: { type: Number, required: true, min: 0 },

  // optional fields
  status:   { type: String, enum: ["OPEN", "SAVED", "CHECKED_OUT"], default: "SAVED" },
  meta:     { type: Object }, // room for coupon, tax, shipping if you add later
}, { timestamps: true });

module.exports = mongoose.model("Cart", CartSchema);
