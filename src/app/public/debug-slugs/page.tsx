// Temporary debug page to list all available slugs from the backend
import Link from 'next/link';

export default async function DebugSlugsPage() {
  const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
  const res = await fetch(`${apiBase}/api/pages`, { cache: 'no-store' });
  let slugs: string[] = [];
  if (res.ok) {
    const data = await res.json();
    slugs = (data?.data ?? []).map((p: any) => p.slug);
  }

  return (
    <main style={{ padding: 32 }}>
      <h1>Available Page Slugs</h1>
      {slugs.length === 0 ? (
        <p>No slugs found or API error.</p>
      ) : (
        <ul>
          {slugs.map((slug) => (
            <li key={slug}>
              <Link href={`/public/${slug}`}>{slug}</Link>
            </li>
          ))}
        </ul>
      )}
      <p style={{ marginTop: 32, color: '#888' }}>
        Remove this page after debugging for security.
      </p>
    </main>
  );
}
