// Run with: npm run seed
// Creates the admin account (from .env) and, on first run, some sample products.
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const connectDB = require('./config/db');
const Admin = require('./models/Admin');
const Product = require('./models/Product');

const sampleProducts = [
  {
    name: "Men's Classic Cotton Shirt",
    description: 'Breathable full-sleeve cotton shirt, perfect for daily wear.',
    price: 999,
    discountPrice: 799,
    category: 'men',
    subCategory: 'Shirts',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: ['https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600'],
    stock: 50,
    featured: true,
  },
  {
    name: "Men's Slim Fit Jeans",
    description: 'Comfortable stretchable denim jeans.',
    price: 1499,
    category: 'men',
    subCategory: 'Jeans',
    sizes: ['30', '32', '34', '36', '38'],
    images: ['https://images.unsplash.com/photo-1542272604-787c3835535d?w=600'],
    stock: 40,
    featured: true,
  },
  {
    name: "Kids' Printed T-Shirt",
    description: 'Soft cotton printed t-shirt for everyday play.',
    price: 399,
    category: 'kids',
    subCategory: 'T-Shirts',
    sizes: ['5-6Y', '7-8Y', '9-10Y', '11-12Y'],
    images: ['https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600'],
    stock: 60,
    featured: true,
  },
  {
    name: "Kids' Denim Dungaree",
    description: 'Cute and durable denim dungaree set for kids.',
    price: 799,
    category: 'kids',
    subCategory: 'Dungarees',
    sizes: ['3-4Y', '5-6Y', '7-8Y'],
    images: ['https://images.unsplash.com/photo-1519457851415-6ba2fdcc8ea4?w=600'],
    stock: 30,
    featured: false,
  },
];

async function seed() {
  await connectDB();

  // Create admin if not exists
  const existingAdmin = await Admin.findOne({ username: process.env.ADMIN_USERNAME });
  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
    await Admin.create({ username: process.env.ADMIN_USERNAME, passwordHash });
    console.log(`Admin account created: ${process.env.ADMIN_USERNAME}`);
  } else {
    console.log('Admin account already exists, skipping.');
  }

  // Seed sample products only if none exist yet
  const productCount = await Product.countDocuments();
  if (productCount === 0) {
    await Product.insertMany(sampleProducts);
    console.log(`Inserted ${sampleProducts.length} sample products.`);
  } else {
    console.log('Products already exist, skipping sample product seed.');
  }

  mongoose.connection.close();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
