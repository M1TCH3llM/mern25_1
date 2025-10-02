//ResentOrderModle
const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderItemSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    qty: { type: Number, required: true, min: 1, default: 1 },
   
  },
  { _id: false }
);

const RecentOrderSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },

    // snapshot of the cart at time of payment
    items: { type: [OrderItemSchema], required: true, validate: v => v.length > 0 },

    // money math captured at order time
    subtotal: { type: Number, required: true, min: 0 },
    discount: { type: Number, required: true, min: 0, default: 0 },
    grandTotal: { type: Number, required: true, min: 0 },

    // coupon applied, if any
    coupon: { type: String, default: null },

    // order lifecycle
    status: {
      type: String,
      enum: ["PLACED", "CANCELLED", "DELIVERED"],
      default: "PLACED",
      index: true
    },

    // cancellation window (computed on creation = createdAt + 2 days)
    cancelBy: { type: Date, required: true, index: true },
  },
  { timestamps: true } // adds createdAt, updatedAt
);

// Compute cancelBy 
RecentOrderSchema.pre("validate", function (next) {
  if (!this.cancelBy) {
    const TWO_DAYS_MS = 2 * 24 * 60 * 60 * 1000; // 2 days in milliseconds
    const base = this.createdAt ? this.createdAt.getTime() : Date.now();
    this.cancelBy = new Date(base + TWO_DAYS_MS);
  }
  next();
});

// Helpful virtual: can this order still be cancelled?
RecentOrderSchema.virtual("isCancellable").get(function () {
  return this.status === "PLACED" && Date.now() < new Date(this.cancelBy).getTime();
});

// Optional: compound index for user history queries
RecentOrderSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model("RecentOrder", RecentOrderSchema);
