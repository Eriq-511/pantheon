export default function DocsIndexPage() {
  return (
    <main className="min-h-[60vh] flex flex-col items-center bg-white dark:bg-slate-950 py-12 px-4">
      <h1 className="text-3xl font-bold mb-4">Documentation</h1>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <a href="/public/docs/page-management" className="text-teal hover:underline">Page Management</a>
        </li>
        <li>
          <a href="/public/docs/image-management" className="text-teal hover:underline">Image Management</a>
        </li>
        <li>
          <a href="/public/docs/navigation-menu" className="text-teal hover:underline">Navigation Menu</a>
        </li>
      </ul>
    </main>
  );
}
