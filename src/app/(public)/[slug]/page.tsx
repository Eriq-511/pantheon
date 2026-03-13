import { notFound } from 'next/navigation';
import type { Metadata } from 'next/types';
import type { Page } from '@/types';

interface Props {
  params: Promise<{ slug: string }>;
}

async function getPage(slug: string): Promise<Page | null> {
  try {
    const baseUrl = process.env.NEXT_INTERNAL_API_URL ?? process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${baseUrl}/api/pages/${slug}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPage(slug);
  if (!page || page.status !== 'published') {
    return { title: 'Page Not Found' };
  }
  return {
    title: page.title,
    description: `Read more about ${page.title} on Pantheon.`,
  };
}

export default async function CmsPage({ params }: Props) {
  const { slug } = await params;
  const page = await getPage(slug);

  // Treat draft pages as 404 for the public
  if (!page || page.status !== 'published') {
    notFound();
  }

  const formattedDate = new Date(page.updatedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      {/* Header */}
      <header className="mb-10 pb-8 border-b border-border">
        <p className="text-sm font-medium text-teal mb-3 uppercase tracking-widest">
          {page.slug}
        </p>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-primary leading-tight mb-4">
          {page.title}
        </h1>
        <p className="text-sm text-text-muted">
          Last updated {formattedDate}
        </p>
      </header>

      {/* Content rendered from TipTap HTML */}
      <article
        className="tiptap-content prose prose-slate dark:prose-invert prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: page.content ?? '' }}
      />
    </div>
  );
}
