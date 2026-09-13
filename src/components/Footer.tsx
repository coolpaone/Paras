import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 py-8 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <p className="text-slate-400 text-xs sm:text-sm">
          © 2026 Paras Nepali. All rights reserved.
        </p>

        <button
          type="button"
          onClick={scrollToTop}
          className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center gap-2 group"
          title="Back to top"
          aria-label="Scroll back to top"
        >
          <span className="hidden sm:inline text-xs group-hover:text-white">Back to top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
}
