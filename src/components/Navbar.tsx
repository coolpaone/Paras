import { useState, useEffect } from 'react';
import { Mail, Camera, Menu, X, Shield, ArrowUpRight } from 'lucide-react';
import { profileData } from '../data/cvData';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['hero', 'about', 'gallery', 'experience', 'expertise', 'languages', 'contact'];
      const scrollPosition = window.scrollY + 120;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Profile', href: '#about', id: 'about' },
    { label: 'Photos', href: '#gallery', id: 'gallery' },
    { label: 'Experience', href: '#experience', id: 'experience' },
    { label: 'Expertise', href: '#expertise', id: 'expertise' },
    { label: 'Languages', href: '#languages', id: 'languages' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'glass-nav border-b border-slate-800/90 py-3 shadow-lg shadow-black/20'
          : 'bg-slate-950/70 backdrop-blur-md border-b border-slate-800/50 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Identity / Brand */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#hero');
          }}
          className="flex items-center gap-3 group"
          id="nav-brand-link"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-700 via-sky-600 to-cyan-400 flex items-center justify-center font-bold text-white shadow-md shadow-sky-600/30 group-hover:scale-105 transition-transform duration-200 ring-1 ring-sky-400/30">
            <span className="text-sm tracking-wider font-extrabold">PN</span>
          </div>
          <div className="text-left">
            <span className="block font-bold tracking-tight text-white group-hover:text-sky-400 transition-colors text-sm sm:text-base">
              PARAS NEPALI
            </span>
            <span className="block text-[11px] uppercase tracking-widest text-slate-400 font-medium flex items-center gap-1.5">
              <Shield className="w-3 h-3 text-sky-400 inline" /> Security Professional
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className={`transition-colors py-1 relative ${
                  isActive ? 'text-sky-400 font-semibold' : 'text-slate-300 hover:text-white'
                }`}
                id={`nav-link-${link.id}`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-400 rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="#gallery"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#gallery');
            }}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white text-xs font-semibold border border-slate-800 hover:border-slate-700 transition-all cursor-pointer"
            id="view-gallery-btn"
          >
            <Camera className="w-3.5 h-3.5 text-sky-400" />
            <span>Profile Gallery</span>
          </a>

          <a
            href={`mailto:${profileData.email}?subject=Security%20Role%20Inquiry%20for%20Paras%20Nepali`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs sm:text-sm font-semibold transition-all duration-200 shadow-sm shadow-sky-600/40 hover:shadow-md hover:shadow-sky-500/50"
            id="nav-email-btn"
          >
            <Mail className="w-4 h-4" />
            <span>Email Paras</span>
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          <a
            href="#gallery"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#gallery');
            }}
            className="p-2 rounded-lg bg-slate-900 text-slate-300 border border-slate-800 hover:text-white"
            title="View Photos"
          >
            <Camera className="w-4 h-4 text-sky-400" />
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white focus:outline-none"
            id="mobile-menu-toggle"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-3 pb-6 bg-slate-950 border-b border-slate-800 space-y-3">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className={`px-3 py-2 rounded-lg text-sm font-medium ${
                  activeSection === link.id
                    ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
                    : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800/80 flex flex-col gap-2">
            <a
              href="#gallery"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#gallery');
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-900 border border-slate-800 text-sm font-semibold text-slate-200"
            >
              <Camera className="w-4 h-4 text-sky-400" />
              <span>Browse Profile Photos</span>
            </a>
            <a
              href={`mailto:${profileData.email}`}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-sm font-semibold text-white shadow-md shadow-sky-600/30"
            >
              <Mail className="w-4 h-4" />
              <span>Email Paras ({profileData.email})</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
