import React, { useState } from 'react';
import api from '../api/api.js';

const statusSteps = ['pending', 'confirmed', 'shipped', 'delivered'];

export default function TrackOrder() {
  const [orderNumber, setOrderNumber] = useState('');
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleTrack(e) {
    e.preventDefault();
    setError('');
    setOrder(null);
    if (!orderNumber) return;
    setLoading(true);
    try {
      const res = await api.get(`/orders/track/${orderNumber.trim()}`);
      setOrder(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Order not found');
    } finally {
      setLoading(false);
    }
  }

  const stepIndex = order ? statusSteps.indexOf(order.status) : -1;

  return (
    <div className="max-w-xl mx-auto px-5 md:px-8 py-14">
      <h1 className="font-display text-3xl mb-7">Track your order</h1>
      <form onSubmit={handleTrack} className="flex gap-2 mb-8">
        <input
          value={orderNumber}
          onChange={(e) => setOrderNumber(e.target.value)}
          placeholder="Order number, e.g. ST123456789"
          className="flex-1 border border-ink/15 px-3 py-2.5 text-sm focus:outline-none focus:border-berry"
        />
        <button type="submit" className="bg-ink text-white px-6 text-sm font-medium">
          {loading ? '…' : 'Track'}
        </button>
      </form>

      {error && <p className="text-berry text-sm mb-4">{error}</p>}

      {order && (
        <div className="border border-ink/10 p-6">
          <p className="font-semibold mb-1">{order.orderNumber}</p>
          <p className="text-sm text-ink/50 mb-6">
            Placed on {new Date(order.createdAt).toLocaleDateString()}
          </p>

          {order.status === 'cancelled' ? (
            <p className="text-berry font-medium mb-6">This order has been cancelled.</p>
          ) : (
            <div className="flex justify-between mb-8">
              {statusSteps.map((step, idx) => (
                <div key={step} className="flex-1 text-center">
                  <div
                    className={`w-6 h-6 mx-auto rounded-full flex items-center justify-center text-xs text-white ${
                      idx <= stepIndex ? 'bg-berry' : 'bg-ink/15'
                    }`}
                  >
                    {idx + 1}
                  </div>
                  <p className={`text-xs mt-1.5 capitalize ${idx <= stepIndex ? 'text-berry font-medium' : 'text-ink/40'}`}>
                    {step}
                  </p>
                </div>
              ))}
            </div>
          )}

          <div className="divide-y divide-ink/10">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex justify-between py-2 text-sm">
                <span>{item.name} ({item.size}) x{item.qty}</span>
                <span>₹{item.price * item.qty}</span>
              </div>
            ))}
          </div>
          <p className="text-right font-semibold mt-3">Total: ₹{order.totalAmount}</p>
        </div>
      )}
    </div>
  );
}
