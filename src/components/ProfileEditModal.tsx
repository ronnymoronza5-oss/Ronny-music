import React, { useState } from 'react';
import { X, Check, RotateCcw, User, Mail, Globe, MapPin, Briefcase } from 'lucide-react';
import { ProfileData } from '../types';
import { DEFAULT_PROFILE } from '../data/portfolioData';

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileData;
  onSave: (updated: ProfileData) => void;
}

export const ProfileEditModal: React.FC<ProfileEditModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSave
}) => {
  const [formData, setFormData] = useState<ProfileData>(profile);
  const [savedAlert, setSavedAlert] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setSavedAlert(true);
    setTimeout(() => {
      setSavedAlert(false);
      onClose();
    }, 900);
  };

  const handleReset = () => {
    setFormData(DEFAULT_PROFILE);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl flex flex-col text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <User className="w-5 h-5 text-teal-400" />
              <span>Customize Your Personal Website</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Personalize your name, role, bio, and social handles. Changes are saved automatically.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {savedAlert && (
            <div className="p-3 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Personal details updated successfully!</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Your Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-teal-400"
                placeholder="e.g. Alex Morgan or Ronny Moronza"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Professional Title / Headline
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-teal-400"
                placeholder="e.g. Full-Stack Software Engineer"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Short Bio Summary (Hero Section)
            </label>
            <textarea
              rows={2}
              value={formData.shortBio}
              onChange={(e) => setFormData({ ...formData, shortBio: e.target.value })}
              required
              className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-teal-400 resize-none"
              placeholder="A brief punchy intro about your experience and focus..."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Primary Contact Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-teal-400"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Location & Work Preference
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-teal-400"
                placeholder="e.g. San Francisco, CA & Remote"
              />
            </div>
          </div>

          {/* Social Links */}
          <div className="pt-2">
            <h4 className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-3">
              Social Media & Profile Links
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">GitHub URL</label>
                <input
                  type="url"
                  value={formData.socialLinks.github}
                  onChange={(e) => setFormData({
                    ...formData,
                    socialLinks: { ...formData.socialLinks, github: e.target.value }
                  })}
                  className="w-full px-3 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-teal-400"
                  placeholder="https://github.com/yourusername"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">LinkedIn URL</label>
                <input
                  type="url"
                  value={formData.socialLinks.linkedin}
                  onChange={(e) => setFormData({
                    ...formData,
                    socialLinks: { ...formData.socialLinks, linkedin: e.target.value }
                  })}
                  className="w-full px-3 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-teal-400"
                  placeholder="https://linkedin.com/in/yourusername"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Twitter / X URL</label>
                <input
                  type="url"
                  value={formData.socialLinks.twitter}
                  onChange={(e) => setFormData({
                    ...formData,
                    socialLinks: { ...formData.socialLinks, twitter: e.target.value }
                  })}
                  className="w-full px-3 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-teal-400"
                  placeholder="https://x.com/yourusername"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Dribbble / Portfolio URL</label>
                <input
                  type="url"
                  value={formData.socialLinks.dribbble}
                  onChange={(e) => setFormData({
                    ...formData,
                    socialLinks: { ...formData.socialLinks, dribbble: e.target.value }
                  })}
                  className="w-full px-3 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-teal-400"
                  placeholder="https://dribbble.com/yourusername"
                />
              </div>
            </div>
          </div>

          {/* Footer Controls */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <button
              type="button"
              onClick={handleReset}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 py-2 px-3 rounded hover:bg-slate-800 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Defaults</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs sm:text-sm font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <Check className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
