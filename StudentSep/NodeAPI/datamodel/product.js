const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true, trim: true },

    productPrice: { type: Number, required: true, min: 0, default: 0},

    productDesc: { type: String, required: true},

    rating: { type: Number, min: 0, max: 5, default: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', ProductSchema);


// name, price, desc, rating