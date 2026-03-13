import Image from 'next/image';
import Link from 'next/link';
import { Star, ArrowRight, Package } from 'lucide-react';
import type { Product } from '@/types';

interface ProductsShowcaseProps {
  products: Product[];
}

export default function ProductsShowcase({ products }: ProductsShowcaseProps) {
  if (!products.length) return null;

  // Show top 8 for the showcase
  const showcase = products.slice(0, 8);

  return (
    <section id="products" className="py-20 sm:py-28 bg-white dark:bg-[#020c15]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-teal">
              Catalogue
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-text-primary dark:text-white">
              Featured products
            </h2>
            <p className="mt-3 text-text-muted dark:text-slate-400 max-w-md">
              A live product catalogue — browse featured items and manage everything from the admin panel.
            </p>
          </div>
          <Link
            href="/admin/products"
            className="inline-flex items-center gap-2 text-sm font-medium text-teal hover:underline flex-shrink-0"
          >
            View all in admin <ArrowRight size={14} />
          </Link>
        </div>

        {/* Product grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {showcase.map((product) => (
            <div
              key={product.id}
              className="bg-white dark:bg-[#071828] rounded-2xl border border-border dark:border-teal-900/60 overflow-hidden hover:shadow-lg dark:hover:shadow-teal/5 transition-shadow duration-200 flex flex-col group"
            >
              {/* Image */}
              <div className="relative h-48 bg-gray-50 dark:bg-slate-700 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>

              {/* Body */}
              <div className="p-4 flex flex-col flex-1">
                <span className="text-xs font-medium uppercase tracking-wide text-text-muted dark:text-slate-400 mb-1.5">
                  {product.category}
                </span>
                <p className="text-sm font-semibold text-text-primary dark:text-white line-clamp-2 flex-1 mb-3">
                  {product.title}
                </p>

                {/* Footer: price + rating */}
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-lg font-extrabold text-text-primary dark:text-white">
                    UGX {(product.price * 3700).toLocaleString('en-UG', { maximumFractionDigits: 0 })}
                  </span>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star size={13} fill="currentColor" />
                    <span className="text-xs font-medium text-text-muted dark:text-slate-400">
                      {product.rating.rate} ({product.rating.count})
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {showcase.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400 dark:text-gray-600">
            <Package size={48} className="mb-4 opacity-40" />
            <p className="font-medium">No products available right now</p>
          </div>
        )}
      </div>
    </section>
  );
}
