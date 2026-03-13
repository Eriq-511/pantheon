export const dynamic = "force-dynamic";
import { notFound } from 'next/navigation';
import type { Page } from '@/types';

export default async function PublicPage({ params }: any) {
  const apiBase = process.env.NEXT_PUBLIC_API_URL;
  const url = `${apiBase}/api/pages/${params.slug}`;
  const res = await fetch(url, { cache: 'no-store' });

  if (!res.ok) {
    // This will show up in Vercel's function logs
    console.error('API not ok', res.status, url, await res.text());
    notFound();
  }

  const data = await res.json();
  console.log('API data', data);

  const page: Page | null = data?.data ?? null;

  if (!page) {
    console.error('No page found for slug', params.slug, 'API data:', data);
    notFound();
  }

  return (
    <main>
      <h1>{page.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.content }} />
    </main>
  );
}
