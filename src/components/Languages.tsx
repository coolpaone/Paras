import { CheckCircle2, Globe2 } from 'lucide-react';
import { languagesData } from '../data/cvData';

export default function Languages() {
  return (
    <section className="py-20 relative" id="languages">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-sky-400 font-semibold tracking-wider text-xs uppercase mb-2">
            <span className="w-6 h-0.5 bg-sky-500"></span>
            Multilingual Communication
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Languages</h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Fluent multi-language proficiency enabling seamless communication with multicultural teams and multinational guests in the UAE.
          </p>
        </div>

        {/* Languages Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {languagesData.map((lang) => (
            <div
              key={lang.code}
              className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between hover:border-slate-700 transition-colors shadow-sm"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700/60 flex items-center justify-center font-bold text-sky-400 text-lg font-mono">
                    {lang.code}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight">{lang.name}</h3>
                    <p className="text-xs text-slate-400 font-medium">{lang.level}</p>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {lang.proficiencyTag}
                </span>
              </div>

              {lang.notes && (
                <p className="mt-4 pt-4 border-t border-slate-800/80 text-xs text-slate-400 leading-relaxed">
                  {lang.notes}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Tactical communication note */}
        <div className="mt-6 p-4 rounded-xl bg-slate-900/50 border border-slate-800/60 flex items-center gap-3 text-xs text-slate-400">
          <Globe2 className="w-4 h-4 text-sky-400 flex-shrink-0" />
          <span>
            Trilingual capability in English, Hindi, and Nepali covers over 85% of day-to-day guest, contractor, and workforce communication in commercial UAE venues.
          </span>
        </div>
      </div>
    </section>
  );
}
