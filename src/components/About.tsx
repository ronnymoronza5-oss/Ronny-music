import React, { useState } from 'react';
import { ProfileData, ExperienceItem } from '../types';
import { WORKSPACE_IMAGE, EXPERIENCES } from '../data/portfolioData';
import { CheckCircle2, Laptop, Award, BookOpen, Layers, Zap, HeartHandshake, Code2 } from 'lucide-react';

interface AboutProps {
  profile: ProfileData;
}

export const About: React.FC<AboutProps> = ({ profile }) => {
  const [activeTab, setActiveTab] = useState<'narrative' | 'timeline'>('narrative');

  const principles = [
    {
      title: "Performance by Default",
      icon: Zap,
      description: "Fast loading times aren't a luxury; they represent respect for user time, battery life, and cellular data budgets worldwide."
    },
    {
      title: "Zero-Bloat Architecture",
      icon: Layers,
      description: "Preferring lean code, free & battle-tested open-source libraries over bloated frameworks and heavy paid dependencies."
    },
    {
      title: "Accessibility for Everyone",
      icon: HeartHandshake,
      description: "Designing touch targets of 44px or larger, high-contrast typography, and full keyboard navigation for universal inclusion."
    },
    {
      title: "Maintainable Codebases",
      icon: Code2,
      description: "Writing strictly-typed, self-documenting TypeScript and modular components that any teammate can build upon seamlessly."
    }
  ];

  return (
    <section id="about" className="py-20 bg-slate-900/40 border-y border-slate-800/60 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <p className="text-xs uppercase tracking-wider text-teal-400 font-semibold mb-2">
            About Me
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight [text-wrap:balance]">
            Crafting software with intentionality, craftsmanship, and speed.
          </h2>
        </div>

        {/* Interactive Segmented Switcher */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg w-fit mb-10">
          <button
            onClick={() => setActiveTab('narrative')}
            className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors ${
              activeTab === 'narrative'
                ? 'bg-slate-800 text-teal-300 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Philosophy & Workspace
          </button>
          <button
            onClick={() => setActiveTab('timeline')}
            className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors ${
              activeTab === 'timeline'
                ? 'bg-slate-800 text-teal-300 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Experience Timeline
          </button>
        </div>

        {activeTab === 'narrative' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Personal Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <h3 className="text-xl font-semibold text-white">
                Who I am & How I build
              </h3>
              
              <div className="space-y-4 text-slate-300 leading-relaxed text-sm sm:text-base">
                {profile.fullBio.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {/* Core Principles Grid */}
              <div className="pt-6">
                <h4 className="text-sm uppercase tracking-wider text-slate-400 font-semibold mb-4">
                  Guiding Principles
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {principles.map((p, idx) => {
                    const Icon = p.icon;
                    return (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-colors"
                      >
                        <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 mb-3">
                          <Icon className="w-4 h-4" />
                        </div>
                        <h5 className="text-sm font-semibold text-white mb-1">
                          {p.title}
                        </h5>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          {p.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Development Workspace */}
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-xl group">
                <div className="aspect-video relative overflow-hidden bg-slate-900">
                  <img
                    src={WORKSPACE_IMAGE}
                    alt="Developer workspace and minimalist coding setup"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.target as HTMLElement;
                      target.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                </div>
                <div className="p-4 sm:p-5">
                  <p className="text-xs uppercase tracking-wider text-teal-400 font-medium mb-1">
                    Environment & Gear
                  </p>
                  <p className="text-sm text-slate-300 font-medium">
                    Minimalist setup focused on flow, ergonomic comfort, and rapid feedback loops.
                  </p>
                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                    <span>Linux / macOS / Android</span>
                    <span aria-hidden="true">·</span>
                    <span>VS Code & Vim</span>
                    <span aria-hidden="true">·</span>
                    <span>Dual Ultrawide</span>
                  </div>
                </div>
              </div>

              {/* Education and Quick Facts */}
              <div className="p-5 rounded-2xl border border-slate-800 bg-slate-950/80">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="w-4 h-4 text-teal-400" />
                  <h4 className="text-sm font-semibold text-white">
                    Education & Credentials
                  </h4>
                </div>
                <div className="space-y-3 text-xs sm:text-sm">
                  <div>
                    <p className="text-slate-200 font-medium">B.S. in Computer Science</p>
                    <p className="text-slate-400 text-xs">University of Technology · Graduated Magna Cum Laude</p>
                  </div>
                  <div className="pt-2 border-t border-slate-800/80">
                    <p className="text-slate-200 font-medium">Specialization & Continuous Practice</p>
                    <p className="text-slate-400 text-xs">Full-Stack Web Architectures, Distributed Systems, Modern Frontend Engineering</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Experience Timeline */
          <div className="max-w-3xl space-y-8">
            {EXPERIENCES.map((exp, index) => (
              <div
                key={exp.id}
                className="relative pl-6 sm:pl-8 border-l border-slate-800 pb-8 last:pb-0"
              >
                {/* Timeline node */}
                <span className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-teal-400 ring-4 ring-slate-950" />

                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                  <h4 className="text-lg font-bold text-white">
                    {exp.role}
                  </h4>
                  <span className="text-xs font-mono text-teal-400">
                    {exp.period}
                  </span>
                </div>

                <div className="text-xs sm:text-sm text-slate-400 mb-3 flex items-center gap-2">
                  <span className="text-slate-200 font-medium">{exp.company}</span>
                  <span aria-hidden="true">·</span>
                  <span>{exp.location}</span>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed mb-4">
                  {exp.description}
                </p>

                {/* Key Achievements */}
                <ul className="space-y-2 mb-4">
                  {exp.achievements.map((ach, i) => (
                    <li key={i} className="text-xs sm:text-sm text-slate-400 flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 mt-0.5 shrink-0" />
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>

                {/* Clean unboxed tech list */}
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                  <span className="text-slate-500 font-medium">Tech:</span>
                  {exp.technologies.map((tech, i) => (
                    <React.Fragment key={tech}>
                      <span>{tech}</span>
                      {i < exp.technologies.length - 1 && <span className="text-slate-600" aria-hidden="true">/</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
