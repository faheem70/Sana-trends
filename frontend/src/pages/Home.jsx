import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api.js';
import ProductCard from '../components/ProductCard.jsx';
import SizeStrip from '../components/SizeStrip.jsx';

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    api
      .get('/products', { params: { featured: true } })
      .then((res) => setFeatured(res.data))
      .catch(() => setFeatured([]))
      .finally(() => setLoading(false));

    // one deliberate load-in for the hero, triggers the staged reveal below
    const t = setTimeout(() => setLoaded(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="bg-teal text-paper overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-6 py-14 md:py-0 md:min-h-[560px] items-center">
          <div className="max-w-md">
            <h1 className="font-display text-[2.6rem] md:text-[3.4rem] leading-[1.05] font-medium">
              <span
                className={`block transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              >
                Clothes the whole
              </span>
              <span
                className={`block italic text-marigold transition-all duration-700 delay-150 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              >
                family actually
              </span>
              <span
                className={`block transition-all duration-700 delay-300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              >
                wants to wear.
              </span>
            </h1>
            <p
              className={`mt-6 text-paper/75 text-[15px] leading-relaxed transition-all duration-700 delay-500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              Men's fits and kids' sizes from five years to fully grown, picked for
              Sana Trends regulars. Pay when it arrives at your door.
            </p>
            <div
              className={`mt-8 flex items-center gap-6 transition-all duration-700 delay-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <Link
                to="/shop"
                className="bg-berry hover:bg-berry-dark text-white font-medium px-6 py-3 rounded-full text-sm transition-colors"
              >
                Shop new arrivals
              </Link>
              <Link
                to="/shop?category=kids"
                className="text-sm font-medium border-b border-paper/40 hover:border-marigold hover:text-marigold pb-0.5 transition-colors"
              >
                See what's in for kids
              </Link>
            </div>
          </div>

          {/* Image collage */}
          <div className="relative h-72 md:h-[440px]">
            <div className="absolute w-8 h-8 rounded-full bg-marigold/70 top-6 right-10 hidden md:block" />
            <img
              src="https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=700"
              alt="Men's fashion"
              className="absolute w-[62%] aspect-[3/4] object-cover rounded-sm shadow-xl top-0 left-0 rotate-[-3deg]"
            />
            <img
              src="https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=700"
              alt="Kids' fashion"
              className="absolute w-[46%] aspect-[3/4] object-cover rounded-sm shadow-xl bottom-0 right-0 rotate-[4deg] border-4 border-teal"
            />
          </div>
        </div>
      </section>

      <SizeStrip />

      {/* Category tiles */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-16 grid grid-cols-1 md:grid-cols-2 gap-5">
        <Link to="/shop?category=men" className="relative rounded-sm overflow-hidden h-64 group">
          <img
            src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=900"
            alt="Men's collection"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
          <div className="absolute bottom-6 left-6">
            <p className="font-display italic text-3xl text-white">Men</p>
            <span className="text-white/80 text-sm border-b border-white/50 group-hover:border-marigold group-hover:text-marigold transition-colors">
              Shop the collection
            </span>
          </div>
        </Link>
        <Link to="/shop?category=kids" className="relative rounded-sm overflow-hidden h-64 group">
          <img
            src="https://www.inayahfashion.com/cdn/shop/files/INB5.png?v=1781162183&width=1100"
            alt="Kids' collection"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
          <div className="absolute bottom-6 left-6">
            <p className="font-display italic text-3xl text-white">Kids</p>
            <span className="text-white/80 text-sm border-b border-white/50 group-hover:border-marigold group-hover:text-marigold transition-colors">
              Shop the collection
            </span>
          </div>
        </Link>
      </section>

      {/* Featured products */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 pb-20">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="font-display text-2xl">New in this week</h2>
          <Link to="/shop" className="text-sm text-ink/60 hover:text-berry border-b border-transparent hover:border-berry transition-colors">
            View all
          </Link>
        </div>
        {loading ? (
          <p className="text-ink/50 text-sm">Loading products…</p>
        ) : featured.length === 0 ? (
          <p className="text-ink/50 text-sm">No featured products yet — check back soon.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-8">
            {featured.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
