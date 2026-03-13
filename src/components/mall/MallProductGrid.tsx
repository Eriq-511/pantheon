'use client';

import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import type { Product } from '@/types';

const FEATURED_KEY = 'pantheon_featured_products';

function toUGX(price: number) {
  return `UGX ${(price * 3700).toLocaleString('en-UG', { maximumFractionDigits: 0 })}`;
}

function MallProductCard({
  product,
  isFeatured,
}: {
  product: Product;
  isFeatured: boolean;
}) {
  return (
    <div className="group relative bg-white rounded-2xl border border-[#EDCFB8]/60 overflow-hidden hover:shadow-lg hover:shadow-[#E8A598]/20 transition-all duration-200">
      {/* Featured badge */}
      {isFeatured && (
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1 bg-gradient-to-r from-[#E8A598] to-[#D4826A] text-white text-[10px] font-semibold px-2.5 py-1 rounded-full shadow-sm">
          <Star size={9} className="fill-white" />
          Featured
        </div>
      )}

      {/* Image */}
      <div className="relative h-52 bg-[#FDF6F0] flex items-center justify-center p-4 overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Info */}
      <div className="p-4">
        <span className="text-[10px] font-semibold tracking-widest uppercase text-[#C0856A]">
          {product.category}
        </span>
        <h3 className="mt-1 text-sm font-semibold text-[#3D2B1F] line-clamp-2 leading-snug">
          {product.title}
        </h3>

        <div className="flex items-center gap-1 mt-1.5">
          <Star size={11} className="text-amber-400 fill-amber-400 shrink-0" />
          <span className="text-xs text-[#6B4A3A]">
            {product.rating.rate}
            <span className="text-[#C0856A]"> ({product.rating.count})</span>
          </span>
        </div>

        <div className="mt-3 flex items-center justify-between gap-2">
          <span className="text-sm font-bold text-[#3D2B1F]">{toUGX(product.price)}</span>
          <button className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#E8A598] to-[#D4826A] text-white text-xs font-semibold hover:from-[#D4826A] hover:to-[#BE6A52] transition-all shadow-sm">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MallProductGrid({ products }: { products: Product[] }) {
  const [featuredIds, setFeaturedIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    try {
      const raw = localStorage.getItem(FEATURED_KEY);
      setFeaturedIds(raw ? new Set(JSON.parse(raw) as number[]) : new Set());
    } catch {
      setFeaturedIds(new Set());
    }
  }, []);

  return (
    <section id="collections" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-[#C0856A] mb-1">
            Our Catalogue
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#3D2B1F]">
            Shop All Products
          </h2>
        </div>
        <p className="text-sm text-[#8A6050] hidden sm:block">
          {products.length} products
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
        {products.map((product) => (
          <MallProductCard
            key={product.id}
            product={product}
            isFeatured={featuredIds.has(product.id)}
          />
        ))}
      </div>
    </section>
  );
}
