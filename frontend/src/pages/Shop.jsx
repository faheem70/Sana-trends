import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../api/api.js';
import ProductCard from '../components/ProductCard.jsx';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const category = searchParams.get('category') || '';
  const search = searchParams.get('search') || '';
  const size = searchParams.get('size') || '';
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    setLoading(true);
    const params = {};
    if (category) params.category = category;
    if (search) params.search = search;
    if (size) params.size = size;
    if (minPrice) params.minPrice = minPrice;
    if (maxPrice) params.maxPrice = maxPrice;

    api
      .get('/products', { params })
      .then((res) => setProducts(res.data))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [category, search, size, minPrice, maxPrice]);

  function setCategory(cat) {
    const next = new URLSearchParams(searchParams);
    if (cat) next.set('category', cat);
    else next.delete('category');
    setSearchParams(next);
  }

  function clearSize() {
    const next = new URLSearchParams(searchParams);
    next.delete('size');
    setSearchParams(next);
  }

  const title = useMemo(() => {
    if (search) return `Results for "${search}"`;
    if (category === 'men') return "Men's collection";
    if (category === 'kids') return "Kids' collection";
    return 'Everything';
  }, [category, search]);

  return (
    <div className="max-w-7xl mx-auto px-5 md:px-8 py-10">
      <h1 className="font-display text-3xl mb-1">{title}</h1>
      <p className="text-sm text-ink/50 mb-8">
        {loading ? 'Loading…' : `${products.length} piece${products.length === 1 ? '' : 's'}`}
        {size && (
          <>
            {' '}· size <strong className="text-ink/80">{size}</strong>{' '}
            <button onClick={clearSize} className="underline hover:text-berry">clear</button>
          </>
        )}
      </p>

      <div className="flex flex-col md:flex-row gap-10">
        <aside className="w-full md:w-52 shrink-0 space-y-8">
          <div>
            <h3 className="text-sm font-semibold text-ink mb-3">Category</h3>
            <div className="space-y-2 text-sm">
              <button onClick={() => setCategory('')} className={`block ${!category ? 'text-berry font-semibold' : 'text-ink/60 hover:text-ink'}`}>All</button>
              <button onClick={() => setCategory('men')} className={`block ${category === 'men' ? 'text-berry font-semibold' : 'text-ink/60 hover:text-ink'}`}>Men</button>
              <button onClick={() => setCategory('kids')} className={`block ${category === 'kids' ? 'text-berry font-semibold' : 'text-ink/60 hover:text-ink'}`}>Kids</button>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-ink mb-3">Price (₹)</h3>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-1/2 border border-ink/15 rounded px-2 py-1.5 text-sm focus:outline-none focus:border-berry"
              />
              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-1/2 border border-ink/15 rounded px-2 py-1.5 text-sm focus:outline-none focus:border-berry"
              />
            </div>
          </div>
        </aside>

        <div className="flex-1">
          {loading ? (
            <p className="text-ink/50 text-sm">Loading products…</p>
          ) : products.length === 0 ? (
            <p className="text-ink/50 text-sm">No products match these filters yet.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-8">
              {products.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
