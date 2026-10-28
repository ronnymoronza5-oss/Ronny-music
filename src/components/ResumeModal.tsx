import React, { useState } from 'react';
import { X, Printer, Download, Check, ExternalLink, Mail, Phone, MapPin, Briefcase, GraduationCap } from 'lucide-react';
import { ProfileData } from '../types';
import { EXPERIENCES, SKILLS } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileData;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose, profile }) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadTxt = () => {
    const content = `
${profile.name.toUpperCase()}
${profile.title}
Email: ${profile.email} | Phone: ${profile.phone}
Location: ${profile.location}
Website: https://mypersonalwebsite.dev

SUMMARY
${profile.shortBio}

EXPERIENCE
${EXPERIENCES.map(e => `
* ${e.role} — ${e.company} (${e.period})
  Location: ${e.location}
  ${e.description}
  Key Achievements:
  ${e.achievements.map(a => `  - ${a}`).join('\n')}
  Technologies: ${e.technologies.join(', ')}
`).join('\n')}

CORE SKILLS
${SKILLS.map(s => `* ${s.name} (${s.experience}): ${s.description}`).join('\n')}

EDUCATION
* B.S. in Computer Science — University of Technology (Magna Cum Laude)
    `.trim();

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${profile.name.replace(/\s+/g, '_')}_Resume.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl max-h-[92vh] overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl flex flex-col text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-2">
            <h3 className="text-base sm:text-lg font-bold text-white">
              Curriculum Vitae / Resume Preview
            </h3>
            <span className="text-xs font-mono text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20 hidden sm:inline-block">
              Clean Text & Print Ready
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadTxt}
              className="px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center gap-1.5 transition-colors"
              title="Download clean plaintext resume"
            >
              {downloadSuccess ? <Check className="w-3.5 h-3.5 text-teal-400" /> : <Download className="w-3.5 h-3.5" />}
              <span>{downloadSuccess ? 'Downloaded!' : 'Download .txt'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3 py-1.5 text-xs font-medium text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-lg flex items-center gap-1.5 font-semibold transition-colors"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center ml-2"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Resume Sheet Content */}
        <div className="p-6 sm:p-10 overflow-y-auto flex-1 bg-slate-950 text-slate-200 space-y-8 font-sans">
          {/* Header */}
          <div className="border-b border-slate-800 pb-6">
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              {profile.name}
            </h1>
            <p className="text-base text-teal-400 font-medium mt-1">
              {profile.title}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mt-3">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-teal-400" />
                <span>{profile.email}</span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-teal-400" />
                <span>{profile.location}</span>
              </span>
              <span>·</span>
              <span>{profile.phone}</span>
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h2 className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-2">
              Professional Summary
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              {profile.shortBio}
            </p>
          </div>

          {/* Work Experience */}
          <div>
            <h2 className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-4 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-teal-400" />
              <span>Work Experience</span>
            </h2>
            <div className="space-y-6">
              {EXPERIENCES.map((exp) => (
                <div key={exp.id} className="text-sm">
                  <div className="flex flex-wrap items-baseline justify-between gap-1 mb-1">
                    <span className="font-bold text-white text-base">{exp.role}</span>
                    <span className="text-xs font-mono text-teal-400">{exp.period}</span>
                  </div>
                  <div className="text-xs text-slate-400 mb-2">
                    {exp.company} · {exp.location}
                  </div>
                  <p className="text-xs text-slate-300 mb-2 leading-relaxed">
                    {exp.description}
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-xs text-slate-400">
                    {exp.achievements.map((ach, i) => (
                      <li key={i}>{ach}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Core Technical Proficiencies */}
          <div>
            <h2 className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-3">
              Technical Proficiencies
            </h2>
            <div className="flex flex-wrap gap-2 text-xs text-slate-300">
              {SKILLS.map((skill) => (
                <span key={skill.name} className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded">
                  {skill.name} ({skill.experience})
                </span>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="border-t border-slate-800 pt-6">
            <h2 className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-2 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-teal-400" />
              <span>Education</span>
            </h2>
            <div className="text-xs text-slate-300">
              <p className="font-bold text-white text-sm">B.S. in Computer Science</p>
              <p className="text-slate-400">University of Technology · Magna Cum Laude</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
