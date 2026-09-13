const express = require('express');
const Order = require('../models/Order');
const Product = require('../models/Product');
const adminAuth = require('../middleware/adminAuth');

const router = express.Router();

function generateOrderNumber() {
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `ST${Date.now().toString().slice(-6)}${rand}`;
}

// POST /api/orders  -> place a new order (guest checkout, Cash on Delivery)
router.post('/', async (req, res) => {
  try {
    const { customer, items } = req.body;

    if (!customer || !items || items.length === 0) {
      return res.status(400).json({ message: 'Customer details and items are required' });
    }

    const required = ['name', 'phone', 'address', 'city', 'state', 'pincode'];
    for (const field of required) {
      if (!customer[field]) {
        return res.status(400).json({ message: `Customer ${field} is required` });
      }
    }

    // Recalculate total on the server from live product prices (never trust client total)
    let totalAmount = 0;
    const verifiedItems = [];

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(400).json({ message: `Product not found: ${item.name || item.product}` });
      }
      const unitPrice = product.discountPrice || product.price;
      const qty = Number(item.qty) || 1;
      totalAmount += unitPrice * qty;
      verifiedItems.push({
        product: product._id,
        name: product.name,
        price: unitPrice,
        qty,
        size: item.size || '',
        image: product.images[0] || '',
      });
    }

    const order = new Order({
      orderNumber: generateOrderNumber(),
      customer,
      items: verifiedItems,
      totalAmount,
      paymentMethod: 'COD',
    });

    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET /api/orders  (admin only) -> list all orders, newest first
router.get('/', adminAuth, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET /api/orders/track/:orderNumber -> customer can check their own order status
router.get('/track/:orderNumber', async (req, res) => {
  try {
    const order = await Order.findOne({ orderNumber: req.params.orderNumber });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// PUT /api/orders/:id/status  (admin only) -> update order status
router.put('/:id/status', adminAuth, async (req, res) => {
  try {
    const { status } = req.body;
    const allowed = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];
    if (!allowed.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
