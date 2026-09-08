import { Calendar, Building2, CheckCircle2, Shield, MapPin, Award } from 'lucide-react';
import { experiencesData } from '../data/cvData';

export default function Experience() {
  return (
    <section className="py-24 relative" id="experience">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-sky-400 font-semibold tracking-wider text-xs uppercase mb-2">
            <span className="w-6 h-0.5 bg-sky-500"></span>
            Proven Track Record
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Work Experience</h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Documented career positions within leading security service organizations in the United Arab Emirates.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="relative border-l-2 border-sky-600/40 ml-4 sm:ml-8 space-y-12">
          {experiencesData.map((exp) => (
            <div key={exp.id} className="relative pl-8 sm:pl-12 group">
              {/* Timeline Node */}
              <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-slate-950 border-2 border-sky-500 flex items-center justify-center text-sky-400 shadow-md shadow-sky-500/30 group-hover:scale-110 transition-transform">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-400"></span>
              </div>

              {/* Card Container */}
              <div className="bg-slate-900 border border-slate-800/90 rounded-2xl p-6 sm:p-8 hover:border-sky-500/40 transition-all duration-300 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                  <div>
                    {exp.isCurrent && (
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20 mb-2">
                        Current Position
                      </span>
                    )}
                    <h3 className="text-2xl font-bold text-white tracking-tight">{exp.company}</h3>
                    <p className="text-sky-400 font-medium text-base mt-0.5 flex items-center gap-1.5">
                      <Shield className="w-4 h-4 text-sky-400 inline" />
                      {exp.role}
                    </p>

                    {/* Locations served if present */}
                    {exp.locationsServed && exp.locationsServed.length > 0 && (
                      <div className="text-xs sm:text-sm text-slate-400 mt-2 flex items-center flex-wrap gap-2">
                        <Building2 className="w-4 h-4 text-sky-400 flex-shrink-0" />
                        <span>Served in:</span>
                        <span className="text-slate-200 font-medium">
                          {exp.locationsServed.join(', ')}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Period badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-slate-800 text-slate-200 text-sm font-semibold self-start sm:self-center font-mono border border-slate-700/50">
                    <Calendar className="w-4 h-4 text-sky-400" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                {/* Core Responsibilities verbatim */}
                <div className="mt-6 pt-6 border-t border-slate-800">
                  <h4 className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-4 flex items-center gap-2">
                    <span>Core Scope &amp; Responsibilities</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-[11px] text-sky-400/80 font-normal">Standardized UAE Protocols</span>
                  </h4>

                  {exp.id === 'exp-berkeley' ? (
                    /* Berkeley 2-column grid format */
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-slate-300">
                      {exp.responsibilities.map((resp, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/60 hover:border-slate-700 transition-colors"
                        >
                          <CheckCircle2 className="w-5 h-5 text-sky-400 flex-shrink-0 mt-0.5" />
                          <span className="font-medium text-slate-200">{resp}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    /* Citizen Security 1-column list format */
                    <ul className="space-y-3 text-sm text-slate-300">
                      {exp.responsibilities.map((resp, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/60 hover:border-slate-700 transition-colors"
                        >
                          <CheckCircle2 className="w-5 h-5 text-sky-400 flex-shrink-0 mt-0.5" />
                          <span className="font-medium text-slate-200">{resp}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Tactical Achievements / Highlights */}
                {exp.highlights && exp.highlights.length > 0 && (
                  <div className="mt-5 pt-4 border-t border-slate-800/50 flex flex-wrap gap-2 items-center">
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1 mr-1">
                      <Award className="w-3.5 h-3.5 text-cyan-400" /> Operational Highlights:
                    </span>
                    {exp.highlights.map((item, i) => (
                      <span
                        key={i}
                        className="text-xs bg-slate-800/60 text-slate-300 px-3 py-1 rounded-md border border-slate-700/60"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
