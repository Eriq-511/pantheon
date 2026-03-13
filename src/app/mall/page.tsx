import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import type { ApiResponse, Product } from '@/types';
import MallProductGrid from '@/components/mall/MallProductGrid';

async function getProducts(): Promise<Product[]> {
  try {
    const apiBase = process.env.NEXT_INTERNAL_API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
    const res = await fetch(`${apiBase}/api/products`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const payload = (await res.json()) as ApiResponse<Product[]>;
    return payload.data ?? [];
  } catch {
    return [];
  }
}

export default async function MallHomePage() {
  const products = await getProducts();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#FDF6F0] via-[#F7E8DF] to-[#EDCFB8]">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[#E8A598]/20 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#D4826A]/10 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
          <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm border border-[#EDCFB8] rounded-full px-4 py-1.5 text-xs font-semibold text-[#C0856A] tracking-widest uppercase mb-6">
            <Sparkles size={11} />
            New Arrivals Now Live
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#3D2B1F] leading-tight tracking-tight">
            Your skin deserves
            <br />
            <span className="bg-gradient-to-r from-[#E8A598] to-[#D4826A] bg-clip-text text-transparent">
              to glow.
            </span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-[#6B4A3A] max-w-xl mx-auto leading-relaxed">
            Thoughtfully curated skincare for every complexion. Discover products that celebrate your
            natural radiance — no compromise, no confusion.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="#collections"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#E8A598] to-[#D4826A] text-white font-semibold text-sm hover:from-[#D4826A] hover:to-[#BE6A52] transition-all shadow-md shadow-[#E8A598]/30"
            >
              Shop Now
              <ArrowRight size={15} />
            </Link>
            <Link
              href="#about"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#EDCFB8] text-[#6B4A3A] font-semibold text-sm hover:bg-[#F7E8DF] transition-colors"
            >
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* Category strip */}
      <section className="bg-[#F7E8DF] border-y border-[#EDCFB8]/60 py-4 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-3 min-w-max sm:min-w-0 sm:flex-wrap sm:justify-center">
          {["women's clothing", "men's clothing", 'jewelery', 'electronics'].map((cat) => (
            <span
              key={cat}
              className="px-4 py-1.5 rounded-full border border-[#EDCFB8] bg-white text-xs font-semibold text-[#6B4A3A] capitalize whitespace-nowrap"
            >
              {cat}
            </span>
          ))}
        </div>
      </section>

      {/* Product grid — client component for localStorage overlays */}
      <div className="bg-[#FDF6F0]">
        <MallProductGrid products={products} />
      </div>

      {/* About strip */}
      <section id="about" className="bg-gradient-to-r from-[#3D2B1F] to-[#5C3D2E] text-[#F7E8DF] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Sparkles size={24} className="mx-auto text-[#E8A598] mb-4" />
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">The Amara&apos;s Glow Story</h2>
          <p className="text-sm sm:text-base text-[#C8A898] leading-relaxed max-w-2xl mx-auto">
            Amara&apos;s Glow was born out of frustration — too many products, too many promises, and
            not enough results. We set out to build a boutique that puts real skin first. Every
            product in our collection is chosen for its ingredients, its ethics, and its results.
            Because you deserve a routine that works as hard as you do.
          </p>
        </div>
      </section>
    </>
  );
}
