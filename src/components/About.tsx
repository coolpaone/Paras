import { Eye, ThumbsUp, ShieldCheck, Quote } from 'lucide-react';
import { profileData } from '../data/cvData';

export default function About() {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Eye':
        return <Eye className="w-5 h-5" />;
      case 'ThumbsUp':
        return <ThumbsUp className="w-5 h-5" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5" />;
      default:
        return <Eye className="w-5 h-5" />;
    }
  };

  return (
    <section className="py-20 bg-slate-900 border-y border-slate-800/80" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-sky-400 font-semibold tracking-wider text-xs uppercase mb-2">
            <span className="w-6 h-0.5 bg-sky-500"></span>
            Summary Statement
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Personal Profile</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Statement Card verbatim from CV */}
          <div className="lg:col-span-8 bg-slate-950/90 border border-slate-800 p-8 sm:p-10 rounded-2xl relative shadow-md">
            {/* Watermark quote icon */}
            <Quote className="absolute top-6 right-6 w-12 h-12 text-slate-800/60 rotate-180 pointer-events-none" />

            <p className="text-slate-200 text-base sm:text-lg leading-relaxed relative z-10 font-normal">
              {profileData.bio}
            </p>

            <div className="mt-8 pt-6 border-t border-slate-800/90 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-sm">
                  5+
                </div>
                <span className="text-sm text-slate-300 font-medium">Years of Dedicated Field Vigilance</span>
              </div>
              <div className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
                PARAS NEPALI • SECURITY GUARD
              </div>
            </div>
          </div>

          {/* Strategic Profile Highlights */}
          <div className="lg:col-span-4 space-y-4">
            {profileData.strategicPillars.map((pillar) => (
              <div
                key={pillar.title}
                className="p-5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-colors flex items-start gap-4 shadow-sm"
              >
                <div className="w-10 h-10 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                  {getIcon(pillar.iconName)}
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">{pillar.title}</h3>
                  <p className="text-slate-400 text-xs mt-1 leading-relaxed">{pillar.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
