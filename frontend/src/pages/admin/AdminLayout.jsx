import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function AdminLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const username = localStorage.getItem('sana_admin_username');

  function handleLogout() {
    localStorage.removeItem('sana_admin_token');
    localStorage.removeItem('sana_admin_username');
    navigate('/admin/login');
  }

  const linkClass = (path) =>
    `block px-4 py-2 text-sm rounded ${location.pathname.startsWith(path) ? 'bg-berry text-white' : 'text-ink/70 hover:bg-ink/5'}`;

  return (
    <div className="min-h-screen bg-paper flex">
      <aside className="w-56 bg-white border-r border-ink/10 p-5 hidden md:block">
        <h2 className="font-display italic text-xl text-teal mb-8">Sana Trends</h2>
        <nav className="space-y-1">
          <Link to="/admin/dashboard" className={linkClass('/admin/dashboard')}>Dashboard</Link>
          <Link to="/admin/products" className={linkClass('/admin/products')}>Products</Link>
          <Link to="/admin/orders" className={linkClass('/admin/orders')}>Orders</Link>
        </nav>
        <div className="mt-10 text-xs text-ink/40">
          Logged in as <strong className="text-ink/60">{username}</strong>
        </div>
        <button onClick={handleLogout} className="mt-2 text-xs text-berry hover:underline">
          Log out
        </button>
      </aside>
      <main className="flex-1 p-6 md:p-8">{children}</main>
    </div>
  );
}
