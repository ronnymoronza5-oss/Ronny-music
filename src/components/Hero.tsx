import React from 'react';
import { ArrowDown, Github, Linkedin, Twitter, Mail, ExternalLink, ShieldCheck, Sparkles, Download } from 'lucide-react';
import { ProfileData } from '../types';

interface HeroProps {
  profile: ProfileData;
  onOpenGuide: () => void;
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ profile, onOpenGuide, onOpenResume }) => {
  const metrics = [
    { label: "Years Experience", value: "5+", context: "Continuous web & software delivery" },
    { label: "Completed Projects", value: "30+", context: "Web apps, mobile PWAs & tools" },
    { label: "Client Satisfaction", value: "100%", context: "On-time and within scope" },
    { label: "Hosting Cost", value: "$0.00", context: "100% Free modern tech stack" },
  ];

  const handleScrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const elem = document.querySelector('#projects');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative pt-28 sm:pt-36 pb-16 lg:pb-24 overflow-hidden">
      {/* Subtle ambient light gradient (strict 60-30-10 palette) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-teal-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Split Screen 2-Column Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Subtle Availability Status Text (No pills, no pulsing dots) */}
            <div className="text-xs sm:text-sm font-medium text-teal-400 mb-4 tracking-wide uppercase">
              <span>{profile.availability}</span>
              <span className="mx-2 text-slate-600" aria-hidden="true">·</span>
              <span className="text-slate-400 normal-case">{profile.location}</span>
            </div>

            {/* Headline with balanced text wrap */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight mb-6 [text-wrap:balance]">
              Building fast, accessible digital experiences with modern code.
            </h1>

            {/* Role & Bio */}
            <p className="text-lg sm:text-xl font-medium text-slate-300 mb-4">
              {profile.title}
            </p>
            <p className="text-base text-slate-400 leading-relaxed max-w-xl mb-8">
              {profile.shortBio}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10 w-full sm:w-auto">
              <a
                href="#projects"
                onClick={handleScrollToProjects}
                className="w-full sm:w-auto px-6 py-3 text-sm font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-lg transition-colors text-center whitespace-nowrap shadow-sm hover:shadow-teal-500/20"
              >
                Explore Selected Work
              </a>
              
              <button
                type="button"
                onClick={onOpenResume}
                className="w-full sm:w-auto px-5 py-3 text-sm font-medium text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <Download className="w-4 h-4 text-teal-400" />
                <span>View Resume / CV</span>
              </button>

              <button
                type="button"
                onClick={onOpenGuide}
                className="w-full sm:w-auto px-4 py-3 text-xs sm:text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap"
              >
                <Sparkles className="w-4 h-4 text-teal-400" />
                <span>Free Publishing Info</span>
              </button>
            </div>

            {/* Social Links Bar */}
            <div className="flex items-center gap-5 text-slate-400 pt-4 border-t border-slate-800/80 w-full">
              <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Connect</span>
              <div className="flex items-center gap-4">
                <a
                  href={profile.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 -m-2 text-slate-400 hover:text-white transition-colors"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href={profile.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 -m-2 text-slate-400 hover:text-white transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href={profile.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 -m-2 text-slate-400 hover:text-white transition-colors"
                  aria-label="Twitter / X Profile"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href={`mailto:${profile.email}`}
                  className="p-2 -m-2 text-slate-400 hover:text-white transition-colors"
                  aria-label="Send direct email"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Container */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm sm:max-w-md">
              {/* Outer card with subtle hairline border */}
              <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl p-3 sm:p-4">
                <div className="aspect-square relative rounded-xl overflow-hidden bg-slate-800">
                  <img
                    src={profile.avatarUrl}
                    alt={`${profile.name} - ${profile.title}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center"
                    onError={(e) => {
                      // Fallback in case of image failure
                      const target = e.target as HTMLElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.classList.add('flex', 'items-center', 'justify-center', 'bg-gradient-to-tr', 'from-teal-900/50', 'to-slate-800');
                        parent.innerHTML = `<span class="text-5xl font-bold text-teal-400">${profile.name.charAt(0)}</span>`;
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Subtle lower card kicker */}
                  <div className="absolute bottom-3 left-3 right-3 text-left">
                    <p className="text-white text-sm font-semibold">{profile.name}</p>
                    <p className="text-slate-300 text-xs">{profile.title}</p>
                  </div>
                </div>

                {/* Quiet credential badges below avatar */}
                <div className="mt-3 px-1 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                    Available for Q4 / 2026
                  </span>
                  <span className="text-slate-500">Android & Desktop Ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width Key Metrics Strip (Below the split, not inside left column) */}
        <div className="mt-16 pt-10 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {metrics.map((m, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight tabular-nums">
                {m.value}
              </span>
              <span className="text-sm font-semibold text-slate-200 mt-1">
                {m.label}
              </span>
              <span className="text-xs text-slate-500 mt-0.5">
                {m.context}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
