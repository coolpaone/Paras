import { useState, MouseEvent } from 'react';
import { Mail, ChevronDown, CheckCircle2, MapPin, Home, Copy, Check, Globe, ExternalLink } from 'lucide-react';
import { profileData } from '../data/cvData';

export default function Hero() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedWebsite, setCopiedWebsite] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState(profileData.avatarCropUrl);

  const handleCopyEmail = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(profileData.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleCopyWebsite = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText('www.parasnepali.com.np');
    setCopiedWebsite(true);
    setTimeout(() => setCopiedWebsite(false), 2200);
  };

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden hero-pattern" id="hero">
      {/* Ambient glowing backdrops */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Bio & Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              {profileData.name}
              <span className="block text-2xl sm:text-3xl lg:text-4xl font-semibold text-sky-400 mt-2">
                {profileData.title}
              </span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {profileData.bio}
            </p>

            {/* Highlights Grid */}
            <div className="grid grid-cols-3 gap-3 pt-2 max-w-lg mx-auto lg:mx-0 text-left">
              {profileData.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-slate-900/90 border border-slate-800 p-3.5 rounded-xl hover:border-slate-700 transition-colors shadow-sm"
                >
                  <div className="text-lg sm:text-xl font-bold text-white tracking-tight">{stat.label}</div>
                  <div className="text-xs text-slate-400 mt-0.5 leading-snug">{stat.sublabel}</div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-3">
              <button
                type="button"
                onClick={() => handleScrollTo('contact')}
                className="px-7 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-sm transition-all shadow-lg shadow-sky-600/30 flex items-center gap-2 cursor-pointer hover:translate-y-[-1px]"
                id="hero-inquiry-btn"
              >
                <Mail className="w-4 h-4" />
                <span>Direct Inquiry</span>
              </button>

              <button
                type="button"
                onClick={() => handleScrollTo('experience')}
                className="px-6 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 font-semibold text-sm border border-slate-800 hover:border-slate-700 transition-all flex items-center gap-2 cursor-pointer"
                id="hero-history-btn"
              >
                <span>Career History</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>

          {/* Right Column: Profile Picture & Professional Identity */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Decorative border glow */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-sky-600 to-cyan-500 rounded-3xl blur-xl opacity-25"></div>

              <div className="relative bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 text-center cv-card-shadow">
                {/* Official Profile Picture */}
                <div className="relative w-44 h-44 mx-auto rounded-full p-1.5 bg-gradient-to-tr from-sky-600 via-cyan-400 to-slate-700 shadow-2xl overflow-hidden mb-5">
                  <div className="w-full h-full rounded-full overflow-hidden bg-slate-800 relative shadow-inner">
                    <img
                      alt="Paras Nepali - Professional Security Guard"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top"
                      src={avatarSrc}
                      onError={() => {
                        if (avatarSrc !== '/paras-original-avatar.jpg') {
                          setAvatarSrc('/paras-original-avatar.jpg');
                        } else {
                          setAvatarSrc('/images/paras-original-avatar.jpg');
                        }
                      }}
                    />
                  </div>
                </div>

                {/* Profile Details */}
                <h2 className="text-2xl font-bold text-white tracking-tight">Paras Nepali</h2>
                <p className="text-sky-400 font-medium text-sm mt-1">Professional Security Guard</p>

                {/* Verified Contact Items */}
                <div className="mt-6 pt-6 border-t border-slate-800/80 space-y-3 text-left text-sm">
                  {/* Official Website */}
                  <div className="flex items-center justify-between gap-3 text-slate-300 bg-slate-950/50 p-2.5 rounded-xl border border-slate-800/60 group/item">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-sky-500/10 flex items-center justify-center text-sky-400 flex-shrink-0">
                        <Globe className="w-4 h-4" />
                      </div>
                      <a
                        href="https://www.parasnepali.com.np"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-sky-400 transition-colors truncate font-mono text-xs sm:text-sm font-semibold text-sky-300 flex items-center gap-1"
                      >
                        <span>www.parasnepali.com.np</span>
                        <ExternalLink className="w-3 h-3 text-sky-400 opacity-70" />
                      </a>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyWebsite}
                      className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                      title="Copy website address"
                    >
                      {copiedWebsite ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Email with copy button */}
                  <div className="flex items-center justify-between gap-3 text-slate-300 bg-slate-950/50 p-2.5 rounded-xl border border-slate-800/60 group/item">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-sky-400 flex-shrink-0">
                        <Mail className="w-4 h-4" />
                      </div>
                      <a
                        href={`mailto:${profileData.email}`}
                        className="hover:text-sky-400 transition-colors truncate font-mono text-xs sm:text-sm font-medium"
                      >
                        {profileData.email}
                      </a>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                      title="Copy email to clipboard"
                    >
                      {copiedEmail ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Present Location */}
                  <div className="flex items-center gap-3 text-slate-300 bg-slate-950/50 p-2.5 rounded-xl border border-slate-800/60">
                    <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-sky-400 flex-shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                        Current Residence / Hub
                      </span>
                      <span className="font-medium text-slate-200">{profileData.currentLocation}</span>
                    </div>
                  </div>

                  {/* Permanent Location */}
                  <div className="flex items-center gap-3 text-slate-300 bg-slate-950/50 p-2.5 rounded-xl border border-slate-800/60">
                    <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-sky-400 flex-shrink-0">
                      <Home className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                        Permanent Address
                      </span>
                      <span className="font-medium text-slate-200">{profileData.permanentLocation}</span>
                    </div>
                  </div>
                </div>

                {/* Verification badge */}
                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-center text-xs font-medium text-slate-400">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Verified Professional Profile</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
