export default function NavigationMenuDoc() {
  return (
    <main className="min-h-[60vh] flex flex-col items-center bg-white dark:bg-slate-950 py-12 px-4">
      <h1 className="text-2xl font-bold mb-4">Navigation Menu</h1>
      <section className="max-w-2xl text-base text-slate-800 dark:text-slate-200">
        <p>
          The navigation menu helps visitors find their way around your website. With Pantheon CMS, you can easily customize your menu to match your site’s needs.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">How to Edit the Menu</h2>
        <ol className="list-decimal pl-6">
          <li>Go to the <strong>Navigation Menu</strong> section in the admin panel.</li>
          <li>Add new menu items, remove old ones, or drag to reorder them.</li>
          <li>Link menu items to pages, products, or external websites.</li>
        </ol>
        <h2 className="text-xl font-semibold mt-6 mb-2">Tips</h2>
        <ul className="list-disc pl-6">
          <li>Keep your menu simple so visitors can find what they need quickly.</li>
          <li>Group similar pages together for better organization.</li>
        </ul>
      </section>
    </main>
  );
}