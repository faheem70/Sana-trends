import React, { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout.jsx';
import api from '../../api/api.js';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, orders: 0, pending: 0, revenue: 0 });

  useEffect(() => {
    Promise.all([api.get('/products'), api.get('/orders')]).then(([prodRes, orderRes]) => {
      const orders = orderRes.data;
      const revenue = orders
        .filter((o) => o.status !== 'cancelled')
        .reduce((sum, o) => sum + o.totalAmount, 0);
      const pending = orders.filter((o) => o.status === 'pending').length;
      setStats({
        products: prodRes.data.length,
        orders: orders.length,
        pending,
        revenue,
      });
    });
  }, []);

  const cards = [
    { label: 'Total Products', value: stats.products },
    { label: 'Total Orders', value: stats.orders },
    { label: 'Pending Orders', value: stats.pending },
    { label: 'Total Revenue', value: `₹${stats.revenue}` },
  ];

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map((c) => (
          <div key={c.label} className="bg-white rounded-lg shadow p-5">
            <p className="text-sm text-gray-500">{c.label}</p>
            <p className="text-2xl font-bold mt-1">{c.value}</p>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
