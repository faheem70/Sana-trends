import React, { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout.jsx';
import api from '../../api/api.js';

const statusOptions = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];
const statusColors = {
  pending: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-blue-100 text-blue-700',
  shipped: 'bg-purple-100 text-purple-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
};

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);

  function loadOrders() {
    setLoading(true);
    api.get('/orders').then((res) => setOrders(res.data)).finally(() => setLoading(false));
  }

  useEffect(() => {
    loadOrders();
  }, []);

  async function handleStatusChange(id, status) {
    await api.put(`/orders/${id}/status`, { status });
    loadOrders();
  }

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Orders</h1>

      {loading ? (
        <p>Loading...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-500">No orders yet.</p>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-lg shadow">
              <div
                className="flex flex-wrap items-center justify-between gap-3 p-4 cursor-pointer"
                onClick={() => setExpanded(expanded === order._id ? null : order._id)}
              >
                <div>
                  <p className="font-semibold">{order.orderNumber}</p>
                  <p className="text-sm text-gray-500">{order.customer.name} · {order.customer.phone}</p>
                </div>
                <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleString()}</p>
                <p className="font-semibold">₹{order.totalAmount}</p>
                <span className={`text-xs px-3 py-1 rounded-full capitalize ${statusColors[order.status]}`}>
                  {order.status}
                </span>
                <select
                  value={order.status}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  className="border rounded px-2 py-1 text-sm"
                >
                  {statusOptions.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              {expanded === order._id && (
                <div className="border-t p-4 text-sm">
                  <p className="mb-2 text-gray-600">
                    {order.customer.address}, {order.customer.city}, {order.customer.state} - {order.customer.pincode}
                  </p>
                  <div className="divide-y">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between py-1.5">
                        <span>{item.name} ({item.size}) x{item.qty}</span>
                        <span>₹{item.price * item.qty}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
