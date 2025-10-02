const RecentOrder = require("../datamodel/RecentOrder");

// helpers
const asNumber = (n) => Number(n) || 0;
const calcTotals = (items) => {
  const subtotal = items.reduce((sum, it) => sum + asNumber(it.price) * asNumber(it.qty || 1), 0);
  return { subtotal };
};
const nowMs = () => Date.now();

//  POST /orders 
exports.createOrder = async (req, res) => {
  try {
    const { userId, items = [], coupon = null } = req.body || {};
    if (!userId) return res.status(400).json({ message: "userId is required" });
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "items[] is required" });
    }

   
    const { subtotal } = calcTotals(items);
    const discount = coupon ? subtotal * 0.10 : 0; 
    const grandTotal = Math.max(0, subtotal - discount);

    const orderDoc = await RecentOrder.create({
      userId,
      items: items.map((i) => ({
        productId: i.productId || i.id, 
        name: i.name,
        price: asNumber(i.price),
        qty: Math.max(1, asNumber(i.qty || 1)),
        image: i.image,
        desc: i.desc,
      })),
      subtotal,
      discount,
      grandTotal,
      coupon: coupon || null, 
    });

    res.status(201).json(orderDoc);
  } catch (err) {
    console.error("createOrder error:", err);
    res.status(500).json({ message: "Failed to create order" });
  }
};

//  GET /orders/user/:userId 
exports.listOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ message: "userId is required" });

    await RecentOrder.updateMany(
             { userId, status: "PLACED", cancelBy: { $lte: new Date() } },
             { $set: { status: "DELIVERED" } }
  );
    const orders = await RecentOrder
      .find({ userId })
      .sort({ createdAt: -1 })
      .lean();

    res.json(orders);
  } catch (err) {
    console.error("listOrdersByUser error:", err);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

//  POST /orders/:orderId/cancel 
exports.cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await RecentOrder.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

 if (order.status !== "PLACED") {
     return res.status(400).json({ message: `Order status is ${order.status}` });
   }
   if (nowMs() >= new Date(order.cancelBy).getTime()) {
     order.status = "DELIVERED";         
     await order.save();
     return res.status(400).json({ message: "Cancellation window has expired" });
   }

   order.status = "CANCELLED";
    await order.save();

    res.json({ message: "Order cancelled", order });
  } catch (err) {
    console.error("cancel order error:", err);
    res.status(500).json({ message: "Failed to cancel order" });
  }
};

// POST /orders/:orderId/deliver
exports.markDelivered = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await RecentOrder.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = "DELIVERED";
    await order.save();

    res.json({ message: "Order marked delivered", order });
  } catch (err) {
    console.error("markDelivered error:", err);
    res.status(500).json({ message: "Failed to mark delivered" });
  }
};
