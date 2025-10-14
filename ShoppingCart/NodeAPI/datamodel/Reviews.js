const mongoose = require("mongoose");

const ProductReviewSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true, index: true },
    name: { type: String },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    comment: { type: String, default: "" },
  },
  { _id: false }
);

const ReviewSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: true },
    orderId: { type: String, required: true, index: true },

    // Overall order review
    order: {
      rating: { type: Number, min: 0, max: 5, default: 0 },
      comment: { type: String, default: "" },
    },

    // Per-product reviews
    products: { type: [ProductReviewSchema], default: [] },

    createdAt: { type: Date, default: Date.now },
  },
  {
    collection: "reviews",
  }
);

// A user can submit at most one review bundle per order
ReviewSchema.index({ userId: 1, orderId: 1 }, { unique: true });

module.exports = mongoose.models.Review || mongoose.model("Review", ReviewSchema);
