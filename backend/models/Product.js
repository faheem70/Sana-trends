const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    price: { type: Number, required: true },
    discountPrice: { type: Number, default: null },
    category: { type: String, required: true, enum: ['men', 'kids'] },
    subCategory: { type: String, default: '' }, // e.g. T-Shirts, Jeans, Shirts, Ethnic
    sizes: { type: [String], required: true, default: [] }, // e.g. ["5-6Y","7-8Y"] or ["S","M","L","XL"]
    images: { type: [String], required: true, default: [] }, // image URLs
    stock: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
