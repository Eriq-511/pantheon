export default function ImageManagementDoc() {
  return (
    <main className="min-h-[60vh] flex flex-col items-center bg-white dark:bg-slate-950 py-12 px-4">
      <h1 className="text-2xl font-bold mb-4">Image Management</h1>
      <section className="max-w-2xl text-base text-slate-800 dark:text-slate-200">
        <p>
          With Pantheon CMS, you can easily upload and manage images for your website. Images help make your pages more engaging and visually appealing.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">How to Upload Images</h2>
        <ol className="list-decimal pl-6">
          <li>Go to the <strong>Images</strong> section in the admin panel.</li>
          <li>Click <strong>Upload Image</strong> and select one or more files from your device.</li>
          <li>Once uploaded, your images will appear in the gallery and can be used anywhere on your site.</li>
        </ol>
        <h2 className="text-xl font-semibold mt-6 mb-2">Managing Your Images</h2>
        <ul className="list-disc pl-6">
          <li>Rename images to keep your gallery organized.</li>
          <li>Delete images you no longer need.</li>
          <li>Preview images before adding them to a page.</li>
        </ul>
        <h2 className="text-xl font-semibold mt-6 mb-2">Tips</h2>
        <ul className="list-disc pl-6">
          <li>Use descriptive file names for easy searching.</li>
          <li>Optimize images for faster loading times.</li>
        </ul>
      </section>
    </main>
  );
}