import React from 'react';
import { ArrowUp, Github, Linkedin, Twitter, BookOpen, User, FolderGit2, Mail } from 'lucide-react';
import { ProfileData } from '../types';

interface FooterProps {
  profile: ProfileData;
  onOpenGuide: () => void;
  onOpenProfileEdit: () => void;
}

export const Footer: React.FC<FooterProps> = ({ profile, onOpenGuide, onOpenProfileEdit }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="bg-slate-950 border-t border-slate-800/80 py-12 pb-24 md:pb-12 text-slate-400 text-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-800/80">
            {/* Wordmark and brief note */}
            <div>
              <a href="#home" className="text-base font-bold text-white hover:text-teal-400 transition-colors">
                {profile.name}
              </a>
              <p className="text-slate-400 mt-1 max-w-sm">
                {profile.title}. Built with modern, free, open-source web technologies.
              </p>
            </div>

            {/* Quick Section Links */}
            <div className="flex flex-wrap gap-5 text-slate-300">
              <a href="#about" className="hover:text-teal-400 transition-colors">About</a>
              <a href="#projects" className="hover:text-teal-400 transition-colors">Projects</a>
              <a href="#skills" className="hover:text-teal-400 transition-colors">Skills</a>
              <a href="#experience" className="hover:text-teal-400 transition-colors">Experience</a>
              <a href="#contact" className="hover:text-teal-400 transition-colors">Contact</a>
              <button
                onClick={onOpenGuide}
                className="hover:text-teal-400 transition-colors flex items-center gap-1"
              >
                <span>Free Hosting Guide</span>
              </button>
            </div>

            {/* Back to top */}
            <button
              onClick={scrollToTop}
              className="px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 flex items-center gap-1.5 transition-colors self-start md:self-auto"
            >
              <ArrowUp className="w-3.5 h-3.5 text-teal-400" />
              <span>Back to Top</span>
            </button>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
            <p>
              © {currentYear} {profile.name}. All rights reserved. Zero paid subscriptions required.
            </p>

            <div className="flex items-center gap-4">
              <button
                onClick={onOpenProfileEdit}
                className="text-slate-400 hover:text-teal-400 transition-colors"
              >
                Customize Content
              </button>
              <span>·</span>
              <a
                href={profile.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                GitHub
              </a>
              <span>·</span>
              <a
                href={profile.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Thumb Quick Navigation Dock (Strictly < 15% viewport height, ~52px) */}
      <aside aria-label="Quick mobile navigation" className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-slate-950/95 backdrop-blur-md border-t border-slate-800/80 px-4 py-2">
        <div className="flex items-center justify-around max-w-md mx-auto">
          <a
            href="#home"
            className="flex flex-col items-center justify-center p-1.5 text-slate-400 hover:text-teal-400 transition-colors"
          >
            <User className="w-4 h-4" />
            <span className="text-[10px] mt-0.5">Home</span>
          </a>

          <a
            href="#about"
            className="flex flex-col items-center justify-center p-1.5 text-slate-400 hover:text-teal-400 transition-colors"
          >
            <User className="w-4 h-4" />
            <span className="text-[10px] mt-0.5">About</span>
          </a>

          <a
            href="#projects"
            className="flex flex-col items-center justify-center p-1.5 text-slate-400 hover:text-teal-400 transition-colors"
          >
            <FolderGit2 className="w-4 h-4" />
            <span className="text-[10px] mt-0.5">Projects</span>
          </a>

          <a
            href="#contact"
            className="flex flex-col items-center justify-center p-1.5 text-slate-400 hover:text-teal-400 transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span className="text-[10px] mt-0.5">Contact</span>
          </a>

          <button
            onClick={onOpenGuide}
            className="flex flex-col items-center justify-center p-1.5 text-teal-400 hover:text-teal-300 transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            <span className="text-[10px] mt-0.5">Free Guide</span>
          </button>
        </div>
      </aside>
    </>
  );
};
