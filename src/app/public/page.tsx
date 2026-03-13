export const dynamic = "force-dynamic";
import type { Metadata } from 'next/types';
import Hero from '@/components/public/Hero';
import Features from '@/components/public/Features';
import About from '@/components/public/About';
import ProductsShowcase from '@/components/public/ProductsShowcase';
import type { ApiResponse, Product } from '@/types';

export const metadata: Metadata = {
  title: 'Pantheon — Your Digital Command Center',
  description:
    'What if managing your website felt as easy as rearranging a shop window? Pantheon gives product owners instant control over their content, images, menus, and products — no developer required.',
};

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

export default async function HomePage() {
  const products = await getProducts();

  return (
    <>
      <Hero />
      <Features />
      <About />
      <ProductsShowcase products={products} />
    </>
  );
}
