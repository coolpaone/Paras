import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const [showMobileScrollTop, setShowMobileScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowMobileScrollTop(true);
      } else {
        setShowMobileScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 py-8 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative flex items-center justify-center text-xs text-slate-400">
        <p className="text-slate-400 text-xs sm:text-sm text-center">
          © 2026 Paras Nepali. All rights reserved.
        </p>

        {/* Scroll-to-top button:
            - Mobile (< sm): Floats at bottom-right when scrolled down with glow effect
            - Tablet (sm:): Static footer button in bottom-right corner (unchanged)
            - PC (md:): Hidden (unchanged)
        */}
        <button
          type="button"
          onClick={scrollToTop}
          className={`cursor-pointer items-center justify-center transition-all duration-300 group fixed bottom-6 right-5 z-40 p-3 rounded-full bg-slate-900/95 border border-sky-400 text-sky-400 animate-glow-pulse shadow-[0_0_18px_rgba(56,189,248,0.7)] ${
            showMobileScrollTop
              ? 'flex opacity-100 translate-y-0 active:scale-95'
              : 'hidden opacity-0 translate-y-6 pointer-events-none'
          } sm:flex sm:absolute sm:bottom-auto sm:right-6 sm:z-auto sm:p-2.5 sm:rounded-lg sm:bg-slate-900 sm:border sm:border-slate-800 sm:hover:border-slate-700 sm:text-slate-400 sm:hover:text-white sm:opacity-100 sm:translate-y-0 sm:pointer-events-auto sm:shadow-none sm:animate-none md:hidden`}
          title="Back to top"
          aria-label="Scroll back to top"
        >
          <ArrowUp className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
        </button>
      </div>
    </footer>
  );
}

