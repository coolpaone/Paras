import { PieChart, Users, UserCheck, Clock, Sparkles, MessageSquare, Lightbulb } from 'lucide-react';
import { skillsData } from '../data/cvData';

export default function Expertise() {
  const getSkillIcon = (iconName: string) => {
    switch (iconName) {
      case 'PieChart':
        return <PieChart className="w-6 h-6" />;
      case 'Users':
        return <Users className="w-6 h-6" />;
      case 'UserCheck':
        return <UserCheck className="w-6 h-6" />;
      case 'Clock':
        return <Clock className="w-6 h-6" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6" />;
      case 'MessageSquare':
        return <MessageSquare className="w-6 h-6" />;
      case 'Lightbulb':
        return <Lightbulb className="w-6 h-6" />;
      default:
        return <Sparkles className="w-6 h-6" />;
    }
  };

  return (
    <section className="py-20 bg-slate-900 border-y border-slate-800/80 relative" id="expertise">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center gap-2 text-sky-400 font-semibold tracking-wider text-xs uppercase mb-2">
            <span className="w-6 h-0.5 bg-sky-500"></span>
            Key Competencies
            <span className="w-6 h-0.5 bg-sky-500"></span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Expertise &amp; Skills</h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Specialized strengths and operational disciplines demonstrated throughout professional security tenures.
          </p>
        </div>

        {/* Skills Cards Grid matching CV Expertise list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillsData.map((skill) => {
            const isWide = skill.id === 'skill-critical-thinking';
            return (
              <div
                key={skill.id}
                className={`bg-slate-950 border border-slate-800/90 hover:border-sky-500/50 p-6 sm:p-7 rounded-2xl transition-all duration-200 group shadow-sm flex flex-col justify-between ${
                  isWide ? 'sm:col-span-2 lg:col-span-2' : ''
                }`}
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-sky-500/20 transition-all duration-200">
                    {getSkillIcon(skill.iconName)}
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors">
                    {skill.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
                    {skill.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500 uppercase tracking-wider font-mono">
                  <span>Standard UAE Field Metric</span>
                  <span className="text-sky-400/80 font-semibold">Verified</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
