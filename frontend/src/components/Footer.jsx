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

        <div className="md:col-span-4">
          <h4 className="text-sm font-semibold text-marigold mb-3">Visit us</h4>
          <a
            href="https://maps.app.goo.gl/b1xH5C8VqQHvJ6yh6?g_st=aw"
            target="_blank"
            rel="noreferrer"
            className="flex items-start gap-2 text-sm text-paper/80 hover:text-white leading-relaxed"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="w-5 h-5 shrink-0 mt-0.5 fill-current">
              <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z" />
            </svg>
            <span>Shanichar Bazaar, Phoolpur, Azamgarh</span>
          </a>

          <div className="flex items-center gap-4 mt-5">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Sana Trends on Instagram"
              className="text-paper/80 hover:text-marigold transition-colors"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.25-3.25a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z" />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Sana Trends on Facebook"
              className="text-paper/80 hover:text-marigold transition-colors"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M13.5 21v-8h2.75l.5-3H13.5V8.1c0-.87.29-1.6 1.7-1.6h1.7V3.82c-.3-.04-1.32-.12-2.52-.12-2.5 0-4.22 1.53-4.22 4.34V10H7.25v3h2.91v8h3.34Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="text-center text-xs text-paper/50 py-5 border-t border-paper/10">
        © {new Date().getFullYear()} Sana Trends. All rights reserved.
      </div>
    </footer>
  );
}
