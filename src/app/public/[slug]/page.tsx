import { notFound } from 'next/navigation';
import type { Page } from '@/types';

type Props = {
  params: { slug: string }
};

export default async function PublicPage({ params }: Props) {
  const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
  const res = await fetch(`${apiBase}/api/pages/${params.slug}`, { cache: 'no-store' });

  if (!res.ok) notFound();

  const data = await res.json();
  const page: Page | null = data?.data ?? null;

  if (!page) return notFound();

  return (
    <main>
      <h1>{page.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.content }} />
    </main>
  );
}
