// controllers/studentController.js
const Product = require('../datamodel/product');

// GET /api/products
exports.getAll = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    console.log("Fetched products:", products);
    
    res.json(products);
  } catch (e) {
    res.status(500).json({ message: 'Failed to fetch products', error: e.message });
  }
};

// GET /api/products/:id
exports.getOne = async (req, res) => {
  try {
    const p = await Product.findById(req.params.id);
    console.log("Fetched product:", p );
    if (!p) return res.status(404).json({ message: 'Product not found' });
    res.json(p);
  } catch (e) {
    res.status(400).json({ message: 'Invalid ID', error: e.message });
  }
};

// POST /api/products
exports.create = async (req, res) => {
  try {
    const { productName, productPrice = 0.00,  productDesc, rating } = req.body;
    const p = await Product.create({ productName, productPrice, productDesc, rating });
        console.log("Create product:", p );

    res.status(201).json(p);
  } catch (e) {
    res.status(400).json({ message: 'Create failed', error: e.message });
  }
};

// PUT /api/products/:id
exports.update = async (req, res) => {
  try {
    const p = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!p) return res.status(404).json({ message: 'Product not found' });
    res.json(p);
  } catch (e) {
    res.status(400).json({ message: 'Update failed', error: e.message });
  }
};

// DELETE /api/products/:id
exports.remove = async (req, res) => {
  try {
    const p = await Product.findByIdAndDelete(req.params.id);
    if (!p) return res.status(404).json({ message: 'Product not found' });
    res.json({ ok: true });
  } catch (e) {
    res.status(400).json({ message: 'Delete failed', error: e.message });
  }
};
