import { useState, FormEvent } from 'react';
import { Mail, MapPin, Home, Send, Check, Copy, CheckCircle2, Globe, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { profileData } from '../data/cvData';
import { ContactFormData } from '../types';

export default function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    company: '',
    subject: '',
    roleType: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [copiedWebsite, setCopiedWebsite] = useState(false);
  const [copiedDraft, setCopiedDraft] = useState(false);

  const handleCopyWebsite = () => {
    navigator.clipboard.writeText('www.parasnepali.com.np');
    setCopiedWebsite(true);
    setTimeout(() => setCopiedWebsite(false), 2000);
  };

  const handleCopyDraft = () => {
    const draftText = `From: ${formData.name}${formData.company ? ` (${formData.company})` : ''}\nSubject: ${formData.subject || 'Inquiry for Paras Nepali'}\n\n${formData.message}`;
    navigator.clipboard.writeText(draftText);
    setCopiedDraft(true);
    setTimeout(() => setCopiedDraft(false), 2000);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.message.trim()) {
      return;
    }

    // Build mailto URI
    const fullBody = `Hello Paras,\n\nMy name is ${formData.name}${
      formData.company ? ` from ${formData.company}` : ''
    }.\n\n${formData.message}\n\nBest regards,\n${formData.name}`;

    const mailtoUrl = `mailto:${profileData.email}?subject=${encodeURIComponent(
      formData.subject || 'Inquiry for Paras Nepali'
    )}&body=${encodeURIComponent(fullBody)}`;

    // Open user's default email client
    window.location.href = mailtoUrl;

    setSubmitted(true);
  };

  return (
    <section className="py-24 bg-slate-900 border-t border-slate-800 relative" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Aligned across full width */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
          className="max-w-3xl mb-12"
        >
          <div className="flex items-center gap-2 text-sky-400 font-semibold tracking-wider text-xs uppercase mb-2">
            <span className="w-6 h-0.5 bg-sky-500"></span>
            Get In Touch
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Direct Inquiries</h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 leading-relaxed">
            Connect through official online channels or submit your opportunity details below.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Unified Contact Card inspired by reference design */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
            className="lg:col-span-5 flex flex-col"
          >
            <div className="bg-slate-950 border border-slate-800 rounded-2xl sm:rounded-3xl p-6 sm:p-7 shadow-xl flex-1 flex flex-col justify-between">
              {/* Card Header: Headings only (no profile photo) */}
              <div className="mb-6">
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Paras Nepali
                </h3>
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  <span className="text-sky-400 font-medium text-sm sm:text-base">
                    Security Professional
                  </span>
                </div>
              </div>

              {/* 4 Sleek Nested Rows */}
              <div className="space-y-3.5 flex-1 flex flex-col justify-between">
                {/* Row 1: Direct Email */}
                <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-sky-500/40 transition-colors flex items-center justify-between gap-3 group">
                  <div className="flex items-center gap-3.5 min-w-0 flex-1">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-slate-800/70 border border-slate-700/50 text-sky-400 flex items-center justify-center flex-shrink-0 group-hover:bg-sky-500/20 group-hover:border-sky-500/40 transition-colors">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[11px] font-mono uppercase font-semibold text-slate-400 flex items-center gap-1.5">
                        <span>DIRECT EMAIL</span>
                        <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-sky-400 transition-colors" />
                      </div>
                      <a
                        href={`mailto:${profileData.email}`}
                        className="text-white font-mono text-sm sm:text-base font-medium hover:text-sky-300 transition-colors truncate block mt-0.5"
                        id="contact-direct-email-link"
                      >
                        Send Email
                      </a>
                    </div>
                  </div>
                  <a
                    href={`mailto:${profileData.email}`}
                    className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-md shadow-blue-600/30 hover:shadow-blue-600/50 transition-all cursor-pointer flex-shrink-0"
                    id="contact-direct-send-btn"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Send</span>
                  </a>
                </div>

                {/* Row 2: Personal Portal */}
                <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-sky-500/40 transition-colors flex items-center justify-between gap-3 group">
                  <div className="flex items-center gap-3.5 min-w-0 flex-1">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-slate-800/70 border border-slate-700/50 text-sky-400 flex items-center justify-center flex-shrink-0 group-hover:bg-sky-500/20 group-hover:border-sky-500/40 transition-colors">
                      <Globe className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[11px] font-mono uppercase font-semibold text-slate-400">
                        PERSONAL PORTAL
                      </div>
                      <a
                        href="https://www.parasnepali.com.np"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white font-mono text-sm sm:text-base font-medium hover:text-sky-300 transition-colors truncate block mt-0.5"
                        id="contact-personal-portal-link"
                      >
                        www.parasnepali.com.np
                      </a>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyWebsite}
                    className="p-2.5 rounded-xl bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer flex-shrink-0"
                    title="Copy portal URL"
                    aria-label="Copy portal URL"
                  >
                    {copiedWebsite ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Row 3: Home Address */}
                <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-colors flex items-center gap-3.5">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-slate-800/70 border border-slate-700/50 text-sky-400 flex items-center justify-center flex-shrink-0">
                    <Home className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] font-mono uppercase font-semibold text-slate-400">
                      HOME ADDRESS
                    </div>
                    <div className="text-white font-mono text-sm sm:text-base font-medium mt-0.5">
                      {profileData.permanentLocation}
                    </div>
                  </div>
                </div>

                {/* Row 4: Current Address */}
                <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-colors flex items-center gap-3.5">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-slate-800/70 border border-slate-700/50 text-sky-400 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] font-mono uppercase font-semibold text-slate-400">
                      CURRENT ADDRESS
                    </div>
                    <div className="text-white font-mono text-sm sm:text-base font-medium mt-0.5">
                      {profileData.currentLocation}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Inquiry Form Card - Perfectly aligned */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.2, 0.8, 0.2, 1] }}
            className="lg:col-span-7 flex flex-col"
          >
            <div className="bg-slate-950 border border-slate-800 rounded-2xl sm:rounded-3xl p-6 sm:p-7 shadow-xl flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Send an Inquiry</h3>
                <p className="text-slate-400 text-xs sm:text-sm mb-6">
                  Prepare message details to connect directly with me.
                </p>

                {submitted && (
                  <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-semibold text-emerald-200">Email Draft Prepared &amp; Launched!</p>
                      <p className="text-xs text-emerald-400/90 mt-1">
                        Your mail client was triggered. If your email app didn't open automatically, you can copy your prepared inquiry text below:
                      </p>
                      <div className="mt-3 flex items-center gap-3">
                        <button
                          type="button"
                          onClick={handleCopyDraft}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-900/60 hover:bg-emerald-900 text-xs font-semibold text-white border border-emerald-500/40 cursor-pointer"
                        >
                          {copiedDraft ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedDraft ? 'Copied to Clipboard' : 'Copy Message Text'}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setSubmitted(false)}
                          className="text-xs text-slate-400 hover:text-slate-200 underline cursor-pointer"
                        >
                          Edit / Send Another
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1.5" htmlFor="name">
                        YOUR NAME <span className="text-rose-400">*</span>
                      </label>
                      <input
                        className="w-full rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-sm px-4 py-3 outline-none transition-colors"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. John Doe"
                        required
                        type="text"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1.5" htmlFor="company">
                        COMPANY / FACILITY / EMAIL ADDRESS <span className="text-rose-400">*</span>
                      </label>
                      <input
                        className="w-full rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-sm px-4 py-3 outline-none transition-colors"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="e.g. Facility Management LLC"
                        type="text"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1.5" htmlFor="subject">
                      SUBJECT
                    </label>
                    <input
                      className="w-full rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-sm px-4 py-3 outline-none transition-colors"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Subject......"
                      type="text"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1.5" htmlFor="body">
                      MESSAGE / OPPORTUNITY DETAILS <span className="text-rose-400">*</span>
                    </label>
                    <textarea
                      className="w-full rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-sm px-4 py-3 outline-none transition-colors resize-none"
                      id="body"
                      name="body"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Message........"
                      required
                      rows={4}
                    />
                  </div>

                  <button
                    className="w-full py-3.5 px-6 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-sm transition-all shadow-md shadow-sky-600/30 flex items-center justify-center gap-2 cursor-pointer hover:shadow-lg hover:shadow-sky-500/40"
                    type="submit"
                    id="submit-inquiry-btn"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message to Paras</span>
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
