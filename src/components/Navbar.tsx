import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, BookOpen, User, Sun, Moon } from 'lucide-react';
import { ProfileData } from '../types';

interface NavbarProps {
  profile: ProfileData;
  onOpenGuide: () => void;
  onOpenProfileEdit: () => void;
  onSwitchToMusic?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ profile, onOpenGuide, onOpenProfileEdit, onSwitchToMusic }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        isScrolled
          ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 py-3 shadow-lg shadow-black/20'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar Contract: 3 zones separated by gap-8 */}
        <div className="flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="text-lg sm:text-xl font-bold tracking-tight text-white hover:text-teal-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
          >
            <span className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 font-mono text-sm font-semibold">
              {profile.name.charAt(0)}
            </span>
            <span>{profile.name}</span>
          </a>

          {/* Zone 2: 4-5 single-line clean text navigation links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="hover:text-teal-400 transition-colors whitespace-nowrap shrink-0"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary action + interactive utility actions */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Free Hosting & Deployment Guide button */}
            <button
              onClick={onOpenGuide}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800/80 hover:bg-slate-700 hover:text-white border border-slate-700/80 rounded-lg transition-colors whitespace-nowrap shrink-0"
              title="Learn how to preview on Android & host for free"
            >
              <BookOpen className="w-3.5 h-3.5 text-teal-400" />
              <span>Free Hosting Guide</span>
            </button>

            {/* Edit Profile / Personalize Button */}
            <button
              onClick={onOpenProfileEdit}
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors whitespace-nowrap shrink-0"
              title="Personalize website details"
            >
              <User className="w-3.5 h-3.5" />
              <span>Customize Site</span>
            </button>

            {/* Switch to Ronny Music Web App */}
            {onSwitchToMusic && (
              <button
                onClick={onSwitchToMusic}
                className="px-3 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-emerald-600 hover:from-purple-500 hover:to-emerald-500 rounded-lg transition-all shadow-md shadow-purple-600/30 whitespace-nowrap shrink-0 flex items-center gap-1.5"
                title="Launch Ronny Music Web App"
              >
                <span>🎵 Ronny Music</span>
              </button>
            )}

            {/* Primary Action Button */}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="px-4 py-2 text-xs sm:text-sm font-medium text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-lg transition-colors font-semibold shadow-sm whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Menu Hamburger Button (Min 44px touch target) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-11 h-11 flex items-center justify-center rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (Responsive touch friendly) */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[65px] bg-slate-950/98 border-b border-slate-800 px-5 py-6 shadow-2xl transition-all">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="py-2.5 px-3 text-base font-medium text-slate-200 hover:text-teal-400 hover:bg-slate-900/60 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}

            <div className="pt-3 mt-2 border-t border-slate-800 flex flex-col gap-2.5">
              {onSwitchToMusic && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onSwitchToMusic();
                  }}
                  className="w-full py-2.5 px-3 text-sm font-bold text-left text-white bg-gradient-to-r from-purple-700 to-emerald-700 rounded-lg flex items-center justify-between shadow-md"
                >
                  <span className="flex items-center gap-2">
                    <span>🎵 Launch Ronny Music</span>
                  </span>
                  <span className="text-xs text-emerald-300 font-mono">Stream & Upload</span>
                </button>
              )}

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenGuide();
                }}
                className="w-full py-2.5 px-3 text-sm font-medium text-left text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700/60 rounded-lg flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-teal-400" />
                  <span>Free Hosting & Android Preview Guide</span>
                </span>
                <span className="text-xs text-teal-400 font-mono">100% Free</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenProfileEdit();
                }}
                className="w-full py-2.5 px-3 text-sm font-medium text-left text-slate-300 hover:text-white bg-slate-900/50 hover:bg-slate-800 rounded-lg flex items-center gap-2"
              >
                <User className="w-4 h-4 text-slate-400" />
                <span>Customize Name, Bio & Social Links</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
