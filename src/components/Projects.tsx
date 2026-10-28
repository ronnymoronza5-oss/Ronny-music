import React, { useState } from 'react';
import { Project } from '../types';
import { PROJECTS } from '../data/portfolioData';
import { ExternalLink, Github, ArrowUpRight, Plus, Eye, Check, X, Sparkles } from 'lucide-react';

interface ProjectsProps {
  customProjects?: Project[];
  onAddNewProject?: () => void;
}

export const Projects: React.FC<ProjectsProps> = ({ customProjects = [], onAddNewProject }) => {
  const [filter, setFilter] = useState<'all' | 'fullstack' | 'mobile' | 'design' | 'web'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [previewNotification, setPreviewNotification] = useState<string | null>(null);

  const allProjects = [...customProjects, ...PROJECTS];

  const filteredProjects = filter === 'all'
    ? allProjects
    : allProjects.filter((p) => p.category === filter);

  const filterTabs = [
    { id: 'all', label: 'All Works' },
    { id: 'fullstack', label: 'Full-Stack' },
    { id: 'mobile', label: 'Mobile & PWA' },
    { id: 'design', label: 'Design Systems' },
    { id: 'web', label: 'Web Applications' },
  ];

  const handleLaunchDemo = (e: React.MouseEvent, project: Project) => {
    e.stopPropagation();
    setPreviewNotification(`Launching demo for "${project.title}"... Note: In a production deployment, this connects to your live domain.`);
    setTimeout(() => setPreviewNotification(null), 4000);
  };

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs uppercase tracking-wider text-teal-400 font-semibold mb-2">
              Selected Works
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight [text-wrap:balance]">
              Projects built with speed, care, and precision.
            </h2>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-lg">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  filter === tab.id
                    ? 'bg-slate-800 text-teal-300 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Demo feedback banner */}
        {previewNotification && (
          <div className="mb-6 p-3 rounded-lg bg-teal-950/80 border border-teal-500/40 text-teal-200 text-xs flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-400" />
              <span>{previewNotification}</span>
            </span>
            <button
              onClick={() => setPreviewNotification(null)}
              className="text-teal-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Projects Bento & Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => {
            const isPriority = index === 0 && filter === 'all';
            return (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className={`group cursor-pointer rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700/80 transition-all duration-300 flex flex-col overflow-hidden hover:shadow-xl hover:shadow-black/40 ${
                  isPriority ? 'md:col-span-2' : ''
                }`}
              >
                {/* Visual Media Container */}
                <div className={`relative overflow-hidden bg-slate-950 ${isPriority ? 'aspect-video md:aspect-[21/9]' : 'aspect-video'}`}>
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top group-hover:scale-103 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.target as HTMLElement;
                      target.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  
                  {/* Clean unboxed metadata on card visual */}
                  <div className="absolute top-3 left-3 text-xs text-slate-300 bg-slate-950/80 backdrop-blur-sm px-2.5 py-1 rounded-md border border-slate-800">
                    <span>{project.year}</span>
                    <span className="mx-1.5 text-slate-500" aria-hidden="true">·</span>
                    <span className="capitalize">{project.category}</span>
                  </div>

                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="w-8 h-8 rounded-full bg-slate-900/90 border border-slate-700 text-teal-400 flex items-center justify-center">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>

                {/* Card Content Area */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-teal-300 transition-colors mb-1.5">
                      {project.title}
                    </h3>
                    
                    <p className="text-xs text-teal-400 font-medium mb-3">
                      {project.subtitle}
                    </p>

                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-2 mb-4">
                      {project.description}
                    </p>
                  </div>

                  <div>
                    {/* Unboxed tags */}
                    <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-400 mb-4 pt-3 border-t border-slate-800/80">
                      {project.tags.slice(0, 4).map((tag, i) => (
                        <span key={tag} className="text-slate-400">
                          {tag}{i < Math.min(project.tags.length - 1, 3) && <span className="text-slate-600 ml-1.5">·</span>}
                        </span>
                      ))}
                    </div>

                    {/* Interactive Actions */}
                    <div className="flex items-center justify-between text-xs pt-1">
                      <span className="text-slate-400 font-medium flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5 text-teal-400" />
                        <span>View Case Study</span>
                      </span>

                      <div className="flex items-center gap-2">
                        {project.liveUrl && (
                          <button
                            type="button"
                            onClick={(e) => handleLaunchDemo(e, project)}
                            className="p-1.5 text-slate-400 hover:text-white transition-colors"
                            title="Interactive demo preview"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </button>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="p-1.5 text-slate-400 hover:text-white transition-colors"
                            title="View source repository"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Case Study Lightbox / Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="mb-6 pr-10">
              <div className="text-xs font-mono text-teal-400 mb-1">
                {selectedProject.year} · {selectedProject.category.toUpperCase()}
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                {selectedProject.title}
              </h3>
              <p className="text-sm text-slate-300 mt-1">
                {selectedProject.subtitle}
              </p>
            </div>

            {/* Modal Image */}
            <div className="rounded-xl overflow-hidden aspect-video bg-slate-950 mb-6 border border-slate-800">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Key Metric Callout */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Key Outcome & Metric</p>
                <p className="text-sm sm:text-base font-bold text-teal-300 font-mono mt-0.5">{selectedProject.metrics}</p>
              </div>
              <span className="text-xs text-emerald-400 font-medium">Verified Result</span>
            </div>

            {/* In-depth Narrative */}
            <div className="space-y-4 text-slate-300 text-sm leading-relaxed mb-6">
              <h4 className="text-base font-bold text-white">Project Overview & Architecture</h4>
              <p>{selectedProject.longDescription}</p>
            </div>

            {/* Key Features List */}
            <div className="mb-6">
              <h4 className="text-base font-bold text-white mb-3">Key Capabilities</h4>
              <ul className="space-y-2">
                {selectedProject.keyFeatures.map((feat, i) => (
                  <li key={i} className="text-xs sm:text-sm text-slate-300 flex items-start gap-2">
                    <Check className="w-4 h-4 text-teal-400 mt-0.5 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack */}
            <div className="mb-8">
              <h4 className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">Technologies Used</h4>
              <div className="flex flex-wrap gap-2 text-xs text-slate-300">
                {selectedProject.tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-1 bg-slate-950 border border-slate-800 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 text-xs sm:text-sm font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center gap-1.5 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>Source Code</span>
                  </a>
                )}
                {selectedProject.liveUrl && (
                  <button
                    onClick={(e) => handleLaunchDemo(e, selectedProject)}
                    className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-lg flex items-center gap-1.5 transition-colors"
                  >
                    <span>Launch Live Demo</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>
                )}
              </div>

              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
