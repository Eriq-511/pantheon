import Link from 'next/link';
import { ArrowRight, Zap, Play } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white dark:bg-[#020c15] py-20 sm:py-28 lg:py-36">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-32 w-[600px] h-[600px] rounded-full bg-teal-light/60 dark:bg-teal-400/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-32 w-[500px] h-[500px] rounded-full bg-teal-light/30 dark:bg-indigo-500/20 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] rounded-full hidden dark:block bg-cyan-500/5 blur-[140px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-light/40 dark:bg-teal/20 border border-teal-light dark:border-teal text-teal-deep dark:text-teal-light text-sm font-medium mb-8">
          <Zap size={14} />
          <span>The digital command center for product owners</span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-text-primary dark:text-white leading-[1.08] mb-6">
          Your website.{' '}
          <span className="bg-gradient-to-r from-teal to-teal-deep bg-clip-text text-transparent">
            Your control.
          </span>
        </h1>

        {/* Sub-heading */}
        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-text-muted dark:text-slate-300 leading-relaxed mb-10">
          Pantheon is a lightweight WebOps platform for non-technical content owners. Manage pages,
          upload images, configure navigation, and sync live product catalogues — all from one
          admin dashboard, without touching a line of code.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-teal hover:bg-teal-dark text-white font-semibold text-sm shadow-lg shadow-teal/20 hover:shadow-teal/30 transition-all duration-200"
          >
            Open dashboard
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/#features"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-border dark:border-slate-600 text-text-muted dark:text-slate-300 font-semibold text-sm hover:bg-surface-muted dark:hover:bg-slate-800 transition-all duration-200"
          >
            <Play size={14} />
            See features
          </Link>
        </div>


      </div>
    </section>
  );
}
