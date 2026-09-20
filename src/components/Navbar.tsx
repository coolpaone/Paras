import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Mail, Menu, X, Shield, ArrowUpRight } from 'lucide-react';
import { profileData } from '../data/cvData';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const isClickScrollingRef = useRef(false);
  const clickTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Skip scroll-spy update while programmatic smooth scrolling from a click is underway
      if (isClickScrollingRef.current) {
        return;
      }

      // If reached near bottom of page, activate last section (Contact)
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60) {
        setActiveSection('contact');
        return;
      }

      const sectionIds = ['about', 'gallery', 'experience', 'expertise', 'languages', 'contact'];
      const navOffset = 120;
      let currentSection = 'about';

      for (const sectionId of sectionIds) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= navOffset) {
            currentSection = sectionId;
          }
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on mount to establish initial active section
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
    };
  }, []);

  const navLinks = [
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Assets', href: '#gallery', id: 'gallery' },
    { label: 'Experience', href: '#experience', id: 'experience' },
    { label: 'Expertise', href: '#expertise', id: 'expertise' },
    { label: 'Languages', href: '#languages', id: 'languages' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (href: string, id: string) => {
    setMobileMenuOpen(false);
    setActiveSection(id);
    isClickScrollingRef.current = true;

    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }
    // Lock scroll-spy briefly so smooth scrolling doesn't flicker intermediate links
    clickTimeoutRef.current = window.setTimeout(() => {
      isClickScrollingRef.current = false;
    }, 850);

    const target = document.querySelector(href);
    if (target) {
      const navHeight = 72;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - navHeight;
      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth',
      });
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
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#about', 'about');
          }}
          className="flex items-center gap-3 group"
          id="nav-brand-link"
        >
          <div className="w-10 h-10 rounded-xl overflow-hidden shadow-md shadow-sky-600/30 group-hover:scale-105 transition-transform duration-200 ring-2 ring-sky-400/40 bg-slate-800 flex-shrink-0">
            <img
              src="/Paras Profile Pic.jpg"
              alt="Paras Nepali"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top"
            />
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
                  handleNavClick(link.href, link.id);
                }}
                className={`transition-colors py-1 relative ${
                  isActive ? 'text-sky-400 font-semibold' : 'text-slate-300 hover:text-white'
                }`}
                id={`nav-link-${link.id}`}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="activeNavUnderline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-400 rounded-full"
                    transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              window.location.href = `mailto:${profileData.email}`;
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs sm:text-sm font-semibold transition-all duration-200 shadow-sm shadow-sky-600/40 hover:shadow-md hover:shadow-sky-500/50 cursor-pointer"
            id="nav-email-btn"
          >
            <Mail className="w-4 h-4" />
            <span>Email Paras</span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
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
                  handleNavClick(link.href, link.id);
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
            <button
              type="button"
              onClick={() => {
                window.location.href = `mailto:${profileData.email}`;
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-sm font-semibold text-white shadow-md shadow-sky-600/30 cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>Email Paras</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
