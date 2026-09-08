import { useState, FormEvent } from 'react';
import { Mail, MapPin, Home, Send, Check, Copy, CheckCircle2, AlertCircle, Globe, ExternalLink } from 'lucide-react';
import { profileData } from '../data/cvData';
import { ContactFormData } from '../types';

export default function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    company: '',
    subject: 'Security Role Inquiry for Paras Nepali',
    roleType: 'Full-time UAE Security Role',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedWebsite, setCopiedWebsite] = useState(false);
  const [copiedDraft, setCopiedDraft] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyWebsite = () => {
    navigator.clipboard.writeText('www.parasnepali.com.np');
    setCopiedWebsite(true);
    setTimeout(() => setCopiedWebsite(false), 2000);
  };

  const handleCopyDraft = () => {
    const draftText = `From: ${formData.name} (${formData.company})\nSubject: ${formData.subject}\nRole Category: ${formData.roleType}\n\n${formData.message}`;
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
    }.\nRole Type: ${formData.roleType}\n\n${formData.message}\n\nBest regards,\n${formData.name}`;

    const mailtoUrl = `mailto:${profileData.email}?subject=${encodeURIComponent(
      formData.subject || 'Security Role Inquiry'
    )}&body=${encodeURIComponent(fullBody)}`;

    // Open user's default email client
    window.location.href = mailtoUrl;
    setSubmitted(true);
  };

  return (
    <section className="py-24 bg-slate-900 border-t border-slate-800" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Contact Details */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="flex items-center gap-2 text-sky-400 font-semibold tracking-wider text-xs uppercase mb-2">
                <span className="w-6 h-0.5 bg-sky-500"></span>
                Get In Touch
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Contact Paras Nepali</h2>
              <p className="text-slate-400 text-sm mt-3 leading-relaxed">
                Seeking reliable, experienced, and vigilant security personnel in Dubai or across the United Arab Emirates? Reach out directly via email.
              </p>
            </div>

            <div className="space-y-4">
              {/* Email Card */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-sky-500 transition-colors group flex items-center justify-between">
                <a
                  href={`mailto:${profileData.email}`}
                  className="flex items-center gap-4 flex-1 min-w-0"
                  id="contact-email-link"
                >
                  <div className="w-12 h-12 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center flex-shrink-0 group-hover:bg-sky-500 group-hover:text-white transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs uppercase font-semibold text-slate-400">Email Address</div>
                    <div className="text-white font-mono text-sm sm:text-base font-semibold group-hover:text-sky-300 transition-colors truncate">
                      {profileData.email}
                    </div>
                  </div>
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-2"
                  title="Copy email"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Official Website Card */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-sky-500 transition-colors group flex items-center justify-between">
                <a
                  href="https://www.parasnepali.com.np"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 flex-1 min-w-0"
                  id="contact-website-link"
                >
                  <div className="w-12 h-12 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center flex-shrink-0 group-hover:bg-sky-500 group-hover:text-white transition-colors">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs uppercase font-semibold text-slate-400 flex items-center gap-1.5">
                      Official Website
                      <ExternalLink className="w-3 h-3 text-sky-400" />
                    </div>
                    <div className="text-white font-mono text-sm sm:text-base font-semibold group-hover:text-sky-300 transition-colors truncate">
                      www.parasnepali.com.np
                    </div>
                  </div>
                </a>
                <button
                  type="button"
                  onClick={handleCopyWebsite}
                  className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-2"
                  title="Copy website URL"
                >
                  {copiedWebsite ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Current Location Card */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-slate-800 text-sky-400 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs uppercase font-semibold text-slate-400">Current Residence / Hub</div>
                  <div className="text-white font-medium text-sm sm:text-base">{profileData.currentLocation}</div>
                </div>
              </div>

              {/* Permanent Location Card */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-slate-800 text-sky-400 flex items-center justify-center flex-shrink-0">
                  <Home className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs uppercase font-semibold text-slate-400">Permanent Address</div>
                  <div className="text-white font-medium text-sm sm:text-base">{profileData.permanentLocation}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm">
              <h3 className="text-xl font-bold text-white mb-2">Send an Inquiry or Job Opportunity</h3>
              <p className="text-slate-400 text-xs sm:text-sm mb-6">
                Directly initiates an email to <span className="font-mono text-sky-400">{profileData.email}</span> with your message details.
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
                      Your Name / Recruiter <span className="text-rose-400">*</span>
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
                      Company / Facility
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1.5" htmlFor="subject">
                      Subject
                    </label>
                    <input
                      className="w-full rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-sm px-4 py-3 outline-none transition-colors"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      type="text"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1.5" htmlFor="roleType">
                      Opportunity Type
                    </label>
                    <select
                      id="roleType"
                      value={formData.roleType}
                      onChange={(e) => setFormData({ ...formData, roleType: e.target.value })}
                      className="w-full rounded-xl bg-slate-900 border border-slate-800 text-white focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-sm px-4 py-3 outline-none transition-colors"
                    >
                      <option value="Full-time UAE Security Role">Full-time Security Guard (UAE)</option>
                      <option value="Hospitality & Concierge Security">Hospitality &amp; Concierge Security</option>
                      <option value="Retail & Mall Security">Retail &amp; Mall Security</option>
                      <option value="Corporate / Event Deployment">Corporate Facility / Event Security</option>
                      <option value="General Inquiry / Interview Schedule">General Inquiry / Interview</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1.5" htmlFor="body">
                    Message / Opportunity Details <span className="text-rose-400">*</span>
                  </label>
                  <textarea
                    className="w-full rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-sm px-4 py-3 outline-none transition-colors resize-none"
                    id="body"
                    name="body"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe the role location, shifts, requirements, or meeting schedule..."
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
        </div>
      </div>
    </section>
  );
}
