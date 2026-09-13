import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api.js';
import { useCart } from '../context/CartContext.jsx';

export default function Checkout() {
  const { cart, totalAmount, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    for (const key of ['name', 'phone', 'address', 'city', 'state', 'pincode']) {
      if (!form[key]) {
        setError('Please fill in all required fields.');
        return;
      }
    }

    setSubmitting(true);
    try {
      const items = cart.map((i) => ({
        product: i.productId,
        name: i.name,
        price: i.price,
        qty: i.qty,
        size: i.size,
      }));

      const res = await api.post('/orders', { customer: form, items });
      clearCart();
      navigate('/order-success', { state: { order: res.data } });
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong placing your order.');
    } finally {
      setSubmitting(false);
    }
  }

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  const inputClass =
    'w-full border border-ink/15 px-3 py-2.5 text-sm focus:outline-none focus:border-berry bg-white';

  return (
    <div className="max-w-4xl mx-auto px-5 md:px-8 py-12 grid grid-cols-1 md:grid-cols-2 gap-12">
      <div>
        <h1 className="font-display text-3xl mb-7">Shipping details</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" placeholder="Full name *" value={form.name} onChange={handleChange} className={inputClass} />
          <input name="phone" placeholder="Phone number *" value={form.phone} onChange={handleChange} className={inputClass} />
          <input name="email" placeholder="Email (optional)" value={form.email} onChange={handleChange} className={inputClass} />
          <textarea name="address" placeholder="Full address *" value={form.address} onChange={handleChange} className={inputClass} rows={3} />
          <div className="grid grid-cols-2 gap-3">
            <input name="city" placeholder="City *" value={form.city} onChange={handleChange} className={inputClass} />
            <input name="state" placeholder="State *" value={form.state} onChange={handleChange} className={inputClass} />
          </div>
          <input name="pincode" placeholder="Pincode *" value={form.pincode} onChange={handleChange} className={inputClass} />

          <div className="bg-marigold/15 border border-marigold/40 text-ink/80 text-sm px-4 py-3">
            Payment method: <strong>Cash on delivery</strong> — pay when your order arrives.
          </div>

          {error && <p className="text-berry text-sm">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-berry hover:bg-berry-dark text-white font-medium py-3.5 text-sm transition-colors disabled:opacity-50"
          >
            {submitting ? 'Placing order…' : `Place order — ₹${totalAmount}`}
          </button>
        </form>
      </div>

      <div>
        <h2 className="font-display text-2xl mb-5">Order summary</h2>
        <div className="divide-y divide-ink/10 border-y border-ink/10">
          {cart.map((item) => (
            <div key={`${item.productId}-${item.size}`} className="flex items-center gap-3 py-3">
              <img src={item.image} alt={item.name} className="w-14 h-16 object-cover bg-paper-deep" />
              <div className="flex-1">
                <p className="text-sm font-medium text-ink">{item.name}</p>
                <p className="text-xs text-ink/50">Size {item.size} · Qty {item.qty}</p>
              </div>
              <p className="font-semibold text-sm">₹{item.qty * item.price}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-between font-semibold text-lg mt-4">
          <span>Total</span>
          <span>₹{totalAmount}</span>
        </div>
      </div>
    </div>
  );
}
