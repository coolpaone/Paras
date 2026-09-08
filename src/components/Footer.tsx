import { ArrowUp, Shield } from 'lucide-react';
import { profileData } from '../data/cvData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 py-10 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-400">
        {/* Identity */}
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-sky-600 text-white flex items-center justify-center font-bold text-xs shadow-sm shadow-sky-600/30">
            PN
          </div>
          <div>
            <span className="text-slate-300 font-semibold">{profileData.name} • {profileData.title}</span>
            <span className="block text-[10px] text-slate-500">Dubai &amp; UAE Security Services</span>
          </div>
        </div>

        {/* Verification statement */}
        <div className="text-center text-slate-400 flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-sky-400 inline" />
          <span>Authentic CV Profile Representation • Verified Documentation</span>
        </div>

        {/* Contact info & back to top */}
        <div className="flex items-center gap-4">
          <a
            href={`mailto:${profileData.email}`}
            className="hover:text-sky-400 transition-colors font-mono text-slate-300"
          >
            {profileData.email}
          </a>
          <span>•</span>
          <span>{profileData.currentLocation}</span>
          <button
            type="button"
            onClick={scrollToTop}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer ml-2"
            title="Back to top"
            aria-label="Scroll back to top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
