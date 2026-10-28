import React, { useState } from 'react';
import { SKILLS } from '../data/portfolioData';
import { Code, Server, Cloud, PenTool, CheckCircle } from 'lucide-react';

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'frontend' | 'backend' | 'cloud' | 'tools'>('all');

  const categories = [
    { id: 'all', label: 'All Disciplines', icon: Code },
    { id: 'frontend', label: 'Frontend & UI', icon: Code },
    { id: 'backend', label: 'Backend & APIs', icon: Server },
    { id: 'cloud', label: 'Cloud & Deploy', icon: Cloud },
    { id: 'tools', label: 'Tooling & Design', icon: PenTool },
  ];

  const filteredSkills = activeCategory === 'all'
    ? SKILLS
    : SKILLS.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="py-20 bg-slate-900/30 border-y border-slate-800/60 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <p className="text-xs uppercase tracking-wider text-teal-400 font-semibold mb-2">
            Technical Tooling
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight [text-wrap:balance]">
            Modern, free & open-source stack.
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-3">
            Chosen for extreme developer ergonomics, zero paid lock-in, high execution speed, and universal platform compatibility.
          </p>
        </div>

        {/* Category filter buttons */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-lg w-fit mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 ${
                activeCategory === cat.id
                  ? 'bg-slate-800 text-teal-300 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {filteredSkills.map((skill) => (
            <div
              key={skill.name}
              className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-2">
                  <h3 className="text-base font-bold text-white">
                    {skill.name}
                  </h3>
                  <span className="text-xs font-mono text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20">
                    {skill.experience}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4">
                  {skill.description}
                </p>
              </div>

              {/* Clean proficiency bar */}
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                  <span>Proficiency</span>
                  <span className="font-mono text-slate-400">{skill.level}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-teal-500 to-teal-300 rounded-full transition-all duration-500"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
