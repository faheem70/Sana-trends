import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-teal text-paper mt-24">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-14 grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <h3 className="font-display italic text-3xl mb-3">Sana Trends</h3>
          <p className="text-sm text-paper/70 leading-relaxed max-w-xs">
            One wardrobe for the whole house. Men's fits and kids' sizes from five years
            to fully grown, delivered to your door with cash on delivery.
          </p>
        </div>

        <div className="md:col-span-3">
          <h4 className="text-sm font-semibold text-marigold mb-3">Shop</h4>
          <ul className="text-sm space-y-2 text-paper/80">
            <li><Link to="/shop?category=men" className="hover:text-white">Men's collection</Link></li>
            <li><Link to="/shop?category=kids" className="hover:text-white">Kids' collection</Link></li>
            <li><Link to="/shop" className="hover:text-white">Everything</Link></li>
            <li><Link to="/track-order" className="hover:text-white">Track an order</Link></li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <h4 className="text-sm font-semibold text-marigold mb-3">Good to know</h4>
          <ul className="text-sm space-y-2 text-paper/80">
            <li>Cash on delivery on every order</li>
            <li>Sizes from 5 years to 3XL</li>
            <li><Link to="/admin/login" className="hover:text-white">Store admin</Link></li>
          </ul>
        </div>
      </div>
      <div className="text-center text-xs text-paper/50 py-5 border-t border-paper/10">
        © {new Date().getFullYear()} Sana Trends. All rights reserved.
      </div>
    </footer>
  );
}
