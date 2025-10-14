// server/controllers/reviewsController.js
// (Same export style as productController.js)

const Review = require('../datamodel/Reviews'); 
const User   = require('../datamodel/userDataModel');

// === utils ===
const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, Number(n) || 0));
const normalize = (body = {}) => ({
  userId: String(body.userId || ""),
  orderId: String(body.orderId || ""),
  order: {
    rating: clamp(body?.order?.rating, 0, 5),
    comment: (body?.order?.comment || "").trim(),
  },
  products: Array.isArray(body?.products)
    ? body.products
        .filter(p => p && p.productId != null)
        .map(p => ({
          productId: String(p.productId),
          name: (p.name || p.productName || "").trim(),
          rating: clamp(p.rating, 0, 5),
          comment: (p.comment || "").trim(),
        }))
    : [],
});

// POST /reviews
// Upsert a review bundle for an order 
exports.createOrUpdate = async (req, res) => {
  try {
    const payload = normalize(req.body);
    if (!payload.userId || !payload.orderId) {
      return res.status(400).json({ message: 'userId and orderId are required' });
    }

    const doc = await Review.findOneAndUpdate(
      { userId: payload.userId, orderId: payload.orderId },
      { $set: { order: payload.order, products: payload.products, createdAt: new Date() } },
      { new: true, upsert: true }
    );

    console.log('Saved review:', { userId: payload.userId, orderId: payload.orderId });
    res.status(200).json(doc);
  } catch (e) {
    res.status(500).json({ message: 'Failed to save review', error: e.message });
  }
};

// GET /reviews/by-order/:userId/:orderId
exports.getByOrder = async (req, res) => {
  try {
    const { userId, orderId } = req.params;
    if (!userId || !orderId) {
      return res.status(400).json({ message: 'userId and orderId are required' });
    }
    const doc = await Review.findOne({ userId, orderId });
    console.log('Fetched review by order:', { userId, orderId, found: !!doc });
    res.json(doc || null);
  } catch (e) {
    res.status(500).json({ message: 'Failed to load review', error: e.message });
  }
};

// GET /reviews/my/:userId
exports.getMine = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ message: 'userId is required' });

    const list = await Review.find({ userId }).sort({ createdAt: -1 });
    console.log('Fetched my reviews:', { userId, count: list.length });
    res.json({ reviews: list });
  } catch (e) {
    res.status(500).json({ message: 'Failed to load user reviews', error: e.message });
  }
};

// GET /reviews/product/:productId
exports.getByProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    if (!productId) return res.status(400).json({ message: 'productId is required' });

    const rows = await Review.aggregate([
      { $match: { "products.productId": String(productId) } },
      { $unwind: "$products" },
      { $match: { "products.productId": String(productId) } },
      {
        $project: {
          _id: 0,
          userId: 1,
          orderId: 1,
          rating: "$products.rating",
          comment: "$products.comment",
          createdAt: 1,
        },
      },
      { $sort: { createdAt: -1 } },
    ]);

    console.log('Fetched product reviews:', { productId, count: rows.length });
    res.json({ productId: String(productId), reviews: rows });
  } catch (e) {
    res.status(500).json({ message: 'Failed to load product reviews', error: e.message });
  }
};

exports.getAllPublic = async (req, res) => {
  try {
    // Optional: allow a soft cap via query ?limit=...
    const limit = Math.min(Number(req.query.limit) || 500, 2000);

    // Load reviews (you can add filters later)
    const docs = await Review.find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    // Collect unique userIds to resolve names in one shot
    const userIds = Array.from(
      new Set(
        docs
          .map(d => String(d.userId || d.user || ''))
          .filter(Boolean)
      )
    );

    let usersById = {};
    if (userIds.length) {
      const users = await User.find({ _id: { $in: userIds } })
        .select({ userName: 1 })
        .lean();
      usersById = users.reduce((acc, u) => {
        acc[String(u._id)] = u.userName || 'Unknown';
        return acc;
      }, {});
    }

    // Attach author info to each review
    const withAuthors = docs.map(d => ({
      ...d,
      author: {
        userId: String(d.userId || d.user || ''),
        userName: usersById[String(d.userId || d.user || '')] || 'Unknown',
      },
    }));

    return res.json({ reviews: withAuthors });
  } catch (e) {
    console.error('getAllPublic error:', e);
    return res.status(500).json({ message: 'Failed to load reviews', error: e.message });
  }
};