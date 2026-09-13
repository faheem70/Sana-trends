import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/api.js';
import { useCart } from '../context/CartContext.jsx';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    api.get(`/products/${id}`).then((res) => {
      setProduct(res.data);
      if (res.data.sizes?.length) setSelectedSize(res.data.sizes[0]);
    });
  }, [id]);

  if (!product) {
    return <div className="max-w-5xl mx-auto px-5 md:px-8 py-16 text-ink/50 text-sm">Loading product…</div>;
  }

  const price = product.discountPrice || product.price;

  function handleAddToCart() {
    if (!selectedSize) {
      setMessage('Please select a size.');
      return;
    }
    addToCart({
      productId: product._id,
      name: product.name,
      price,
      image: product.images[0],
      size: selectedSize,
      qty,
    });
    setMessage('Added to cart.');
  }

  function handleBuyNow() {
    handleAddToCart();
    navigate('/cart');
  }

  return (
    <div className="max-w-5xl mx-auto px-5 md:px-8 py-12 grid grid-cols-1 md:grid-cols-2 gap-12">
      <div>
        <div className="aspect-[4/5] bg-paper-deep overflow-hidden mb-3">
          <img src={product.images[activeImage]} alt={product.name} className="w-full h-full object-cover" />
        </div>
        {product.images.length > 1 && (
          <div className="flex gap-2">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`w-16 h-16 overflow-hidden border ${idx === activeImage ? 'border-berry' : 'border-transparent'}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div>
        <p className="text-xs text-ink/40">
          {product.category === 'men' ? 'Men' : 'Kids'}{product.subCategory && ` · ${product.subCategory}`}
        </p>
        <h1 className="font-display text-3xl text-ink mt-1">{product.name}</h1>

        <div className="mt-3 flex items-center gap-3">
          <span className="text-2xl font-semibold text-berry">₹{price}</span>
          {product.discountPrice && (
            <span className="text-ink/40 line-through">₹{product.price}</span>
          )}
        </div>

        <p className="text-ink/65 mt-5 leading-relaxed text-[15px] max-w-md">{product.description}</p>

        <div className="mt-7">
          <p className="text-sm font-semibold text-ink mb-2">Size</p>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-1.5 text-sm border transition-colors ${
                  selectedSize === size ? 'bg-ink text-white border-ink' : 'border-ink/20 text-ink/70 hover:border-ink'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <p className="text-sm font-semibold text-ink">Quantity</p>
          <div className="flex items-center border border-ink/20">
            <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-3 py-1 text-ink/70 hover:text-ink">−</button>
            <span className="px-4 text-sm">{qty}</span>
            <button onClick={() => setQty((q) => q + 1)} className="px-3 py-1 text-ink/70 hover:text-ink">+</button>
          </div>
        </div>

        {message && <p className="text-sm text-teal mt-4">{message}</p>}

        <div className="mt-7 flex gap-3">
          <button
            onClick={handleAddToCart}
            className="flex-1 border border-ink text-ink font-medium py-3 text-sm hover:bg-ink hover:text-white transition-colors"
          >
            Add to cart
          </button>
          <button
            onClick={handleBuyNow}
            className="flex-1 bg-berry hover:bg-berry-dark text-white font-medium py-3 text-sm transition-colors"
          >
            Buy now
          </button>
        </div>

        {product.stock <= 0 && (
          <p className="text-berry text-sm mt-4">Currently out of stock</p>
        )}
        <p className="text-xs text-ink/40 mt-5">Cash on delivery — pay when it arrives, no online payment needed.</p>
      </div>
    </div>
  );
}
