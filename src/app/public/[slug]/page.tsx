import { notFound } from 'next/navigation';
import type { Page } from '@/types';
import { pagesService } from '@/services/pagesService';

export default async function PublicPage({ params }: { params: { slug: string } }) {
  let page: Page | null = null;
  try {
    page = await pagesService.getBySlug(params.slug);
  } catch {
    notFound();
  }

  if (!page) return notFound();

  return (
    <main>
      <h1>{page.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.content }} />
    </main>
  );
}
