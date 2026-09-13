import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return;
    api.get('/orders/mine').then((res) => setOrders(res.data)).catch((err) => setError(err.response?.data?.message || 'Unable to load orders'));
  }, [user]);

  if (!user) return <div className="max-w-xl mx-auto px-5 py-16"><h1 className="font-display text-3xl mb-3">Your orders</h1><p className="text-ink/60">Please <Link to="/account?redirect=/orders" className="text-berry underline">log in</Link> to see your orders.</p></div>;

  return (
    <div className="max-w-3xl mx-auto px-5 md:px-8 py-14">
      <h1 className="font-display text-3xl mb-8">Your orders</h1>
      {error && <p className="text-berry text-sm">{error}</p>}
      {!error && orders.length === 0 && <p className="text-ink/55">You have not placed any orders yet.</p>}
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order._id} className="border border-ink/10 p-5 flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[180px]"><p className="font-semibold">{order.orderNumber}</p><p className="text-sm text-ink/50">{new Date(order.createdAt).toLocaleDateString()} · {order.items.length} item(s)</p></div>
            <p className="capitalize text-sm text-berry font-medium">{order.status}</p>
            <p className="font-semibold">₹{order.totalAmount}</p>
            <Link to={`/track-order?order=${order.orderNumber}`} className="text-sm underline text-ink/70">Track</Link>
          </div>
        ))}
      </div>
    </div>
  );
}