import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

export default function Cart() {
  const { cart, updateQty, removeFromCart, totalAmount } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto px-5 py-24 text-center">
        <h1 className="font-display text-2xl mb-2">Your cart is empty</h1>
        <p className="text-ink/50 text-sm mb-8">Nothing here yet — go find something to like.</p>
        <Link to="/shop" className="bg-ink text-white px-6 py-3 text-sm font-medium">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-5 md:px-8 py-12">
      <h1 className="font-display text-3xl mb-8">Your cart</h1>

      <div className="divide-y divide-ink/10 border-y border-ink/10">
        {cart.map((item) => (
          <div key={`${item.productId}-${item.size}`} className="flex items-center gap-4 py-4">
            <img src={item.image} alt={item.name} className="w-20 h-24 object-cover bg-paper-deep" />
            <div className="flex-1">
              <p className="font-medium text-ink">{item.name}</p>
              <p className="text-sm text-ink/50">Size {item.size}</p>
              <p className="text-berry font-semibold text-sm mt-1">₹{item.price}</p>
            </div>
            <div className="flex items-center border border-ink/20">
              <button onClick={() => updateQty(item.productId, item.size, item.qty - 1)} className="px-3 py-1 text-ink/70">−</button>
              <span className="px-3 text-sm">{item.qty}</span>
              <button onClick={() => updateQty(item.productId, item.size, item.qty + 1)} className="px-3 py-1 text-ink/70">+</button>
            </div>
            <p className="w-20 text-right font-semibold text-sm">₹{item.qty * item.price}</p>
            <button onClick={() => removeFromCart(item.productId, item.size)} className="text-ink/30 hover:text-berry ml-2 text-lg leading-none">
              ×
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-end">
        <div className="w-full md:w-80">
          <div className="flex justify-between mb-2 text-sm text-ink/60">
            <span>Subtotal</span>
            <span>₹{totalAmount}</span>
          </div>
          <div className="flex justify-between mb-4 text-sm text-ink/60">
            <span>Delivery</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between font-semibold text-lg border-t border-ink/10 pt-3">
            <span>Total</span>
            <span>₹{totalAmount}</span>
          </div>
          <button
            onClick={() => navigate('/checkout')}
            className="w-full mt-5 bg-berry hover:bg-berry-dark text-white font-medium py-3 text-sm transition-colors"
          >
            Proceed to checkout
          </button>
        </div>
      </div>
    </div>
  );
}
