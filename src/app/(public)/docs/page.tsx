export default function DocsIndexPage() {
  return (
    <section className="relative overflow-hidden bg-white dark:bg-[#020c15] py-20 sm:py-28 lg:py-32 min-h-[60vh] flex flex-col items-center">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-32 w-[600px] h-[600px] rounded-full bg-teal-light/60 dark:bg-teal-400/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-32 w-[500px] h-[500px] rounded-full bg-teal-light/30 dark:bg-indigo-500/20 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] rounded-full hidden dark:block bg-cyan-500/5 blur-[140px]" />
      </div>
      <div className="relative w-full flex flex-col items-center px-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-teal-deep dark:text-white mb-6 mt-2 text-center drop-shadow-lg">Documentation</h1>
        <ul className="list-disc pl-6 space-y-2 max-w-xl bg-white/90 dark:bg-slate-900/80 rounded-xl shadow-lg p-8 text-base text-text-muted dark:text-slate-300">
          <li>
            <a href="/docs/page-management" className="text-teal hover:underline">Page Management</a>
          </li>
          <li>
            <a href="/docs/image-management" className="text-teal hover:underline">Image Management</a>
          </li>
          <li>
            <a href="/docs/navigation-menu" className="text-teal hover:underline">Navigation Menu</a>
          </li>
        </ul>
      </div>
    </section>
  );
}