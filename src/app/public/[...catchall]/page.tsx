export const dynamic = "force-dynamic";

export default function PublicCatchallPage({ params }: any) {
  return (
    <main style={{ padding: 32 }}>
      <h1>Debug: Catch-all Route</h1>
      <pre style={{ background: '#eee', padding: 16, borderRadius: 8 }}>
        {JSON.stringify(params, null, 2)}
      </pre>
      <p style={{ color: '#888', marginTop: 24 }}>
        If you see this page, your dynamic [slug] route is not matching. Check your file structure and slugs.
      </p>
    </main>
  );
}
