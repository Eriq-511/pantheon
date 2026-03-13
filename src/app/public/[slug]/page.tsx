
export const dynamic = "force-dynamic";
import { notFound } from 'next/navigation';
import type { Page } from '@/types';
import type { Metadata } from 'next/types';

// Generate dynamic metadata for SEO and sharing
export async function generateMetadata({ params }: any): Promise<Metadata> {
  const apiBase = process.env.NEXT_PUBLIC_API_URL;
  const safeSlug = params.slug?.trim().toLowerCase();
  const url = `${apiBase}/api/pages/${safeSlug}`;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) return {};
  const data = await res.json();
  const page: Page | null = data?.data ?? null;
  if (!page) return {};
  return {
    title: page.metaTitle || page.title,
    description: page.metaDescription || undefined,
    openGraph: {
      title: page.metaTitle || page.title,
      description: page.metaDescription || undefined,
      images: page.ogImageUrl ? [page.ogImageUrl] : [],
    },
  };
}

export default async function PublicPage({ params }: any) {
  const apiBase = process.env.NEXT_PUBLIC_API_URL;
  const safeSlug = params.slug?.trim().toLowerCase();
  const url = `${apiBase}/api/pages/${safeSlug}`;
  const res = await fetch(url, { cache: 'no-store' });

  if (!res.ok) {
    console.error('API not ok', res.status, url, await res.text());
    notFound();
  }

  const data = await res.json();
  const page: Page | null = data?.data ?? null;

  if (!page) {
    console.error('No page found for slug', params.slug, 'API data:', data);
    notFound();
  }

  return (
    <main className="min-h-[60vh] flex flex-col items-center bg-white dark:bg-slate-950 py-12 px-4">
      {/* Hero Section */}
      <section className="w-full max-w-3xl text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-teal-deep dark:text-white mb-4">
          {page.title}
        </h1>
        {page.metaDescription && (
          <p className="text-lg text-text-muted dark:text-slate-300 mb-2">
            {page.metaDescription}
          </p>
        )}
        <div className="text-xs text-text-muted dark:text-slate-400 mt-2">
          Last updated: {new Date(page.updatedAt).toLocaleDateString()}
        </div>
      </section>

      {/* Content Section */}
      <article
        className="prose prose-lg dark:prose-invert max-w-3xl w-full bg-white/90 dark:bg-slate-900/80 rounded-xl shadow-lg p-8"
        dangerouslySetInnerHTML={{ __html: page.content }}
      />
    </main>
  );
}
