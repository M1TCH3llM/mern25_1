const Cart = require("../datamodel/cart");

function normalizeItems(items = []) {
  if (!Array.isArray(items)) return [];
  return items
    .map((i) => ({
      productId: i.productId || i.id,   
      name: String(i.name || "").trim(),
      price: Number(i.price) || 0,
      qty: Math.max(1, Number(i.qty) || 1),
    }))
    .filter((i) => i.productId && i.name && i.price >= 0 && i.qty >= 1);
}

// GET /cart  -> list all carts (for testing)
exports.getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.find().sort({ createdAt: -1 });
    return res.json(carts);
  } catch (err) {
    console.error("getAllCarts error:", err);
    return res.status(500).json({ message: "Failed to fetch carts." });
  }
};

// GET /cart/:id -> fetch single cart by id
exports.getCartById = async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await Cart.findById(id);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found." });
    }
    return res.json(cart);
  } catch (err) {
    console.error("getCartById error:", err);
    return res.status(500).json({ message: "Failed to fetch cart." });
  }
};


exports.createCart = async (req, res) => {
  try {
    const { items: rawItems, userId } = req.body || {};
    const items = normalizeItems(rawItems);

    if (!items.length) {
      return res.status(400).json({ message: "Cart must contain at least one valid item." });
    }

    // Server-side subtotal (do not trust client)
    const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);

    const cart = await Cart.create({
      userId: userId || undefined,
      items,
      subtotal,
      status: "SAVED",
      meta: {},
    });

    return res.status(201).json(cart);
  } catch (err) {
    console.error("createCart error:", err);
    return res.status(500).json({ message: "Failed to save cart." });
  }
};
