export default function ImageManagementDoc() {
  return (
    <section className="relative overflow-hidden bg-white dark:bg-[#020c15] py-20 sm:py-28 lg:py-32 min-h-[60vh] flex flex-col items-center">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-32 w-[600px] h-[600px] rounded-full bg-teal-light/60 dark:bg-teal-400/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-32 w-[500px] h-[500px] rounded-full bg-teal-light/30 dark:bg-indigo-500/20 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] rounded-full hidden dark:block bg-cyan-500/5 blur-[140px]" />
      </div>
      <div className="relative w-full flex flex-col items-center px-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-teal-deep dark:text-white mb-6 mt-2 text-center drop-shadow-lg">Image Management</h1>
        <section className="max-w-2xl text-base text-text-muted dark:text-slate-300 bg-white/90 dark:bg-slate-900/80 rounded-xl shadow-lg p-8">
          <p>
            With Pantheon CMS, you can easily upload and manage images for your website. Images help make your pages more engaging and visually appealing.
          </p>
          <h2 className="text-xl font-semibold mt-6 mb-2 text-teal dark:text-teal-light">How to Upload Images</h2>
          <ol className="list-decimal pl-6">
            <li>Go to the <strong>Images</strong> section in the admin panel.</li>
            <li>Click <strong>Upload Image</strong> and select one or more files from your device.</li>
            <li>Once uploaded, your images will appear in the gallery and can be used anywhere on your site.</li>
          </ol>
          <h2 className="text-xl font-semibold mt-6 mb-2 text-teal dark:text-teal-light">Managing Your Images</h2>
          <ul className="list-disc pl-6">
            <li>Rename images to keep your gallery organized.</li>
            <li>Delete images you no longer need.</li>
            <li>Preview images before adding them to a page.</li>
          </ul>
          <h2 className="text-xl font-semibold mt-6 mb-2 text-teal dark:text-teal-light">Tips</h2>
          <ul className="list-disc pl-6">
            <li>Use descriptive file names for easy searching.</li>
            <li>Optimize images for faster loading times.</li>
          </ul>
        </section>
      </div>
    </section>
  );
}