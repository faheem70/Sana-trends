import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false);
  const hasDiscount = product.discountPrice && product.discountPrice < product.price;
  const secondImage = product.images?.[1];

  return (
    <Link
      to={`/product/${product._id}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group block"
    >
      <div className="aspect-[4/5] bg-paper-deep overflow-hidden relative">
        <img
          src={product.images?.[0]}
          alt={product.name}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            hovered && secondImage ? 'opacity-0' : 'opacity-100'
          }`}
        />
        {secondImage && (
          <img
            src={secondImage}
            alt=""
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              hovered ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}
        {product.stock <= 0 && (
          <div className="absolute bottom-0 left-0 right-0 bg-ink/85 text-paper text-xs text-center py-1.5">
            Out of stock
          </div>
        )}
      </div>

      <div className="pt-3">
        <h3 className="text-[15px] text-ink leading-snug border-b border-transparent group-hover:border-ink/40 inline-block transition-colors">
          {product.name}
        </h3>
        <div className="mt-1 flex items-center gap-2 text-sm">
          {hasDiscount ? (
            <>
              <span className="text-berry font-semibold">₹{product.discountPrice}</span>
              <span className="text-ink/40 line-through">₹{product.price}</span>
            </>
          ) : (
            <span className="text-ink/80 font-semibold">₹{product.price}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
