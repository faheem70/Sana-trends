import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import AdminRoute from './components/AdminRoute.jsx';

import Home from './pages/Home.jsx';
import Shop from './pages/Shop.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import OrderSuccess from './pages/OrderSuccess.jsx';
import TrackOrder from './pages/TrackOrder.jsx';
import Account from './pages/Account.jsx';
import Orders from './pages/Orders.jsx';

import AdminLogin from './pages/admin/AdminLogin.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import AdminProducts from './pages/admin/AdminProducts.jsx';
import AdminProductForm from './pages/admin/AdminProductForm.jsx';
import AdminOrders from './pages/admin/AdminOrders.jsx';

export default function App() {
  return (
    <Routes>
      {/* Admin routes render their own layout, no public Navbar/Footer */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      <Route path="/admin/products" element={<AdminRoute><AdminProducts /></AdminRoute>} />
      <Route path="/admin/products/new" element={<AdminRoute><AdminProductForm /></AdminRoute>} />
      <Route path="/admin/products/:id/edit" element={<AdminRoute><AdminProductForm /></AdminRoute>} />
      <Route path="/admin/orders" element={<AdminRoute><AdminOrders /></AdminRoute>} />

      {/* Public storefront */}
      <Route
        path="*"
        element={
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order-success" element={<OrderSuccess />} />
                <Route path="/track-order" element={<TrackOrder />} />
                <Route path="/account" element={<Account />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="*" element={<Home />} />
              </Routes>
            </div>
            <Footer />
          </div>
        }
      />
    </Routes>
  );
}
