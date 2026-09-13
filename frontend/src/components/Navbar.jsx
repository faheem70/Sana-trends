import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

export default function Navbar() {
  const { totalItems } = useCart();
  const [query, setQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();

  function handleSearch(e) {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/shop?search=${encodeURIComponent(query)}`);
    setSearchOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 bg-paper/95 backdrop-blur border-b border-ink/10">
      <div className="max-w-7xl mx-auto px-5 md:px-8 h-16 flex items-center gap-6">
        <Link to="/" className="font-display italic text-2xl tracking-tight text-teal shrink-0">
          Sana Trends
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-[15px] font-medium text-ink/80">
          <Link to="/shop?category=men" className="hover:text-berry transition-colors">
            Men
          </Link>
          <Link to="/shop?category=kids" className="hover:text-berry transition-colors">
            Kids
          </Link>
          <Link to="/shop" className="hover:text-berry transition-colors">
            Everything
          </Link>
          <Link to="/track-order" className="hover:text-berry transition-colors">
            Track order
          </Link>
        </nav>

        <div className="flex-1" />

        <div className="relative flex items-center">
          {searchOpen ? (
            <form onSubmit={handleSearch} className="flex items-center">
              <input
                autoFocus
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onBlur={() => !query && setSearchOpen(false)}
                placeholder="Search products"
                className="w-40 md:w-56 border-b border-ink/30 bg-transparent px-1 py-1 text-sm focus:outline-none focus:border-berry"
              />
            </form>
          ) : (
            <button
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
              className="text-ink/70 hover:text-berry transition-colors p-1"
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          )}
        </div>

        <Link to="/cart" className="relative flex items-center text-ink/80 hover:text-berry transition-colors">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M6 6h15l-1.5 9h-12z" />
            <path d="M6 6l-1-3H2" />
            <circle cx="9" cy="20" r="1.4" fill="currentColor" stroke="none" />
            <circle cx="17" cy="20" r="1.4" fill="currentColor" stroke="none" />
          </svg>
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-berry text-white text-[10px] font-semibold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
