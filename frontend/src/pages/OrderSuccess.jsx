import React from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';

export default function OrderSuccess() {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="max-w-xl mx-auto px-5 py-20 text-center">
      <p className="font-display italic text-4xl text-teal mb-4">Thank you.</p>
      <p className="text-ink/70 mb-1">
        Your order has been placed, <strong>{order.customer.name}</strong>.
      </p>
      <p className="text-ink/50 mb-8">
        Order number <span className="font-mono font-semibold text-berry">{order.orderNumber}</span>
      </p>
      <div className="border border-ink/10 text-left p-6 mb-8">
        <p className="text-sm font-semibold text-ink mb-2">Delivery address</p>
        <p className="text-sm text-ink/60 leading-relaxed">
          {order.customer.address}, {order.customer.city}, {order.customer.state} - {order.customer.pincode}
        </p>
        <p className="text-sm text-ink/60 mt-1">Phone: {order.customer.phone}</p>
        <p className="font-semibold mt-4 text-ink">Total: ₹{order.totalAmount} · Cash on delivery</p>
      </div>
      <p className="text-sm text-ink/50 mb-8">
        Save your order number — you can use it to track your order anytime.
      </p>
      <Link to="/shop" className="bg-ink text-white px-6 py-3 text-sm font-medium">
        Continue shopping
      </Link>
    </div>
  );
}
