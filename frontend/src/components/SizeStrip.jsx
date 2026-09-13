import React from 'react';
import { useNavigate } from 'react-router-dom';

const KIDS_SIZES = ['5-6Y', '7-8Y', '9-10Y', '11-12Y', '13-14Y'];
const MEN_SIZES = ['S', 'M', 'L', 'XL', 'XXL'];

export default function SizeStrip() {
  const navigate = useNavigate();

  function goToSize(size) {
    navigate(`/shop?size=${encodeURIComponent(size)}`);
  }

  return (
    <section className="border-y border-ink/10 bg-paper">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-4 flex items-center gap-5 overflow-x-auto no-scrollbar">
        <span className="text-sm text-ink/50 shrink-0">Shop by size</span>
        <div className="flex gap-2 shrink-0">
          {KIDS_SIZES.map((s) => (
            <button
              key={s}
              onClick={() => goToSize(s)}
              className="px-3.5 py-1.5 text-sm rounded-full border border-ink/15 text-ink/75 hover:border-berry hover:text-berry transition-colors shrink-0"
            >
              {s}
            </button>
          ))}
        </div>
        <span className="w-px h-5 bg-ink/15 shrink-0" />
        <div className="flex gap-2 shrink-0">
          {MEN_SIZES.map((s) => (
            <button
              key={s}
              onClick={() => goToSize(s)}
              className="px-3.5 py-1.5 text-sm rounded-full border border-ink/15 text-ink/75 hover:border-berry hover:text-berry transition-colors shrink-0"
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
