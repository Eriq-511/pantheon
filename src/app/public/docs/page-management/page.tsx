export default function PageManagementDoc() {
  return (
    <main className="min-h-[60vh] flex flex-col items-center bg-white dark:bg-slate-950 py-12 px-4">
      <h1 className="text-2xl font-bold mb-4">Page Management</h1>
      <section className="max-w-2xl text-base text-slate-800 dark:text-slate-200">
        <p>
          Pantheon CMS makes it easy for you to create, edit, and organize the pages on your website—no technical skills required. Pages are the main building blocks of your site, such as your Home, About, or Contact pages.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">How to Create a Page</h2>
        <ol className="list-decimal pl-6">
          <li>Go to the <strong>Pages</strong> section in the admin panel.</li>
          <li>Click <strong>Add New Page</strong>.</li>
          <li>Enter a title and your content. You can use the editor to format text, add images, and more.</li>
          <li>Click <strong>Save</strong> to publish your page.</li>
        </ol>
        <h2 className="text-xl font-semibold mt-6 mb-2">Editing or Deleting a Page</h2>
        <ul className="list-disc pl-6">
          <li>To edit, click on a page in the list, make your changes, and save.</li>
          <li>To delete, select the page and click the <strong>Delete</strong> button.</li>
        </ul>
        <h2 className="text-xl font-semibold mt-6 mb-2">Tips</h2>
        <ul className="list-disc pl-6">
          <li>Use clear titles so visitors know what each page is about.</li>
          <li>Keep your content up to date for the best experience.</li>
        </ul>
      </section>
    </main>
  );
}