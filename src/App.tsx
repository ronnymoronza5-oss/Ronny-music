import React, { useState, useEffect } from 'react';
import { DEFAULT_PROFILE } from './data/portfolioData';
import { ProfileData } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { FreeGuideSection } from './components/FreeGuideSection';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { DeploymentGuideModal } from './components/DeploymentGuideModal';
import { ProfileEditModal } from './components/ProfileEditModal';
import { ResumeModal } from './components/ResumeModal';
import { RonnyMusicApp } from './music/components/RonnyMusicApp';
import { Radio, User, ExternalLink } from 'lucide-react';

export default function App() {
  // App view mode: 'music' (Ronny Music) or 'portfolio' (My Personal Website)
  const [activeApp, setActiveApp] = useState<'music' | 'portfolio'>(() => {
    try {
      const saved = localStorage.getItem('active_app_view');
      if (saved === 'music' || saved === 'portfolio') return saved;
    } catch (e) {}
    return 'music'; // Default to Ronny Music as requested
  });

  const [profile, setProfile] = useState<ProfileData>(() => {
    try {
      const saved = localStorage.getItem('personal_website_profile');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {}
    return {
      ...DEFAULT_PROFILE,
      name: "Ronny",
      title: "Creator of Ronny Music & Full-Stack Software Engineer"
    };
  });

  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isProfileEditOpen, setIsProfileEditOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const handleSwitchApp = (mode: 'music' | 'portfolio') => {
    setActiveApp(mode);
    try {
      localStorage.setItem('active_app_view', mode);
    } catch (e) {}
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveProfile = (updated: ProfileData) => {
    setProfile(updated);
    try {
      localStorage.setItem('personal_website_profile', JSON.stringify(updated));
    } catch (e) {
      console.error('Could not save to localStorage', e);
    }
  };

  // Listen for Escape key to close modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsGuideOpen(false);
        setIsProfileEditOpen(false);
        setIsResumeOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased">
      {/* Top Application Switcher Bar */}
      <div className="bg-[#04060a] border-b border-purple-900/30 px-3 py-1.5 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2 max-w-7xl mx-auto w-full justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
            <span className="text-[11px] font-mono text-slate-300">
              Active Project: <strong className="text-white">{activeApp === 'music' ? 'Ronny Music (Streaming App)' : 'My Personal Website (Portfolio)'}</strong>
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => handleSwitchApp('music')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all flex items-center gap-1 ${
                activeApp === 'music'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Radio className="w-3 h-3 text-emerald-400" />
              <span>Ronny Music</span>
            </button>

            <button
              onClick={() => handleSwitchApp('portfolio')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all flex items-center gap-1 ${
                activeApp === 'portfolio'
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <User className="w-3 h-3 text-teal-300" />
              <span>Personal Website</span>
            </button>
          </div>
        </div>
      </div>

      {/* Conditional App View */}
      {activeApp === 'music' ? (
        <RonnyMusicApp onSwitchToPortfolio={() => handleSwitchApp('portfolio')} />
      ) : (
        <div className="flex-1 flex flex-col">
          {/* Top Bar Navigation */}
          <Navbar
            profile={profile}
            onOpenGuide={() => setIsGuideOpen(true)}
            onOpenProfileEdit={() => setIsProfileEditOpen(true)}
            onSwitchToMusic={() => handleSwitchApp('music')}
          />

          {/* Main Content Flow */}
          <main className="flex-1">
            <Hero
              profile={profile}
              onOpenGuide={() => setIsGuideOpen(true)}
              onOpenResume={() => setIsResumeOpen(true)}
            />
            <About profile={profile} />
            <Projects />
            <Skills />
            <FreeGuideSection onOpenModal={() => setIsGuideOpen(true)} />
            <Contact profile={profile} />
          </main>

          {/* Professional Footer & Mobile Bottom Dock */}
          <Footer
            profile={profile}
            onOpenGuide={() => setIsGuideOpen(true)}
            onOpenProfileEdit={() => setIsProfileEditOpen(true)}
          />

          {/* Interactive Modals */}
          <DeploymentGuideModal
            isOpen={isGuideOpen}
            onClose={() => setIsGuideOpen(false)}
          />

          <ProfileEditModal
            isOpen={isProfileEditOpen}
            onClose={() => setIsProfileEditOpen(false)}
            profile={profile}
            onSave={handleSaveProfile}
          />

          <ResumeModal
            isOpen={isResumeOpen}
            onClose={() => setIsResumeOpen(false)}
            profile={profile}
          />
        </div>
      )}
    </div>
  );
}
