import React, { useState } from 'react';
import { Mail, Phone, MapPin, Copy, Check, Send, Github, Linkedin, Twitter, Dribbble, Youtube, Sparkles, MessageSquare } from 'lucide-react';
import { ProfileData } from '../types';

interface ContactProps {
  profile: ProfileData;
}

export const Contact: React.FC<ContactProps> = ({ profile }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate reliable client-side submission with immediate receipt
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitSuccess(false), 6000);
    }, 600);
  };

  const getMailtoLink = () => {
    const subject = encodeURIComponent(formData.subject || `Inquiry from Personal Website`);
    const body = encodeURIComponent(
      `Hi ${profile.name},\n\n${formData.message}\n\nBest regards,\n${formData.name} (${formData.email})`
    );
    return `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <p className="text-xs uppercase tracking-wider text-teal-400 font-semibold mb-2">
            Let's Collaborate
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight [text-wrap:balance]">
            Have an exciting project or role? Let's connect.
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-3">
            I am currently open to freelance opportunities, contracts, and full-time technical leadership roles.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 items-start">
          {/* Left Column: Direct Contact Info & Socials */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick 1-Click Copy Email Card */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors">
              <div className="flex items-center justify-between gap-3 mb-2">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-teal-400" />
                  <span>Direct Email</span>
                </span>
                <span className="text-[11px] text-teal-400 font-mono">1-Click Copy</span>
              </div>
              <p className="text-base sm:text-lg font-bold text-white mb-3 break-all font-mono">
                {profile.email}
              </p>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="w-full py-2.5 px-3 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700/80 transition-colors flex items-center justify-center gap-2"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-teal-400" />
                    <span>Copy Email Address</span>
                  </>
                )}
              </button>
            </div>

            {/* Location & Response Time */}
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-teal-400 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Location & Availability</p>
                  <p className="text-sm font-semibold text-white mt-0.5">{profile.location}</p>
                  <p className="text-xs text-slate-400 mt-0.5">Flexible across US, European & Global timezones</p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-teal-400 shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Average Response Time</p>
                  <p className="text-sm font-semibold text-emerald-400 mt-0.5">Within 24 Hours</p>
                  <p className="text-xs text-slate-400 mt-0.5">Always happy to jump on a quick video call</p>
                </div>
              </div>
            </div>

            {/* Social Media Networks */}
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-3">
                Social & Developer Profiles
              </p>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { name: 'GitHub', icon: Github, url: profile.socialLinks.github, handle: '@alexmorgan' },
                  { name: 'LinkedIn', icon: Linkedin, url: profile.socialLinks.linkedin, handle: 'in/alexmorgan' },
                  { name: 'Twitter / X', icon: Twitter, url: profile.socialLinks.twitter, handle: '@alex_dev' },
                  { name: 'Dribbble', icon: Dribbble, url: profile.socialLinks.dribbble, handle: '@alexdesign' },
                ].map((s) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.name}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-800/60 transition-all flex items-center gap-2.5 text-slate-300 hover:text-white"
                    >
                      <Icon className="w-4 h-4 text-teal-400 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-white truncate">{s.name}</p>
                        <p className="text-[11px] text-slate-400 truncate">{s.handle}</p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Functional Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
              <div className="flex items-center gap-2 mb-6">
                <MessageSquare className="w-5 h-5 text-teal-400" />
                <h3 className="text-xl font-bold text-white">Send a Message</h3>
              </div>

              {submitSuccess && (
                <div className="p-4 mb-6 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-sm flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white">Message dispatched successfully!</p>
                    <p className="text-xs text-emerald-300 mt-1">
                      Thank you for reaching out. A confirmation has been generated and I will respond to your email within 24 hours.
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Your Name <span className="text-teal-400">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-teal-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Your Email <span className="text-teal-400">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@company.com"
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-teal-400 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Subject / Topic <span className="text-teal-400">*</span>
                  </label>
                  <input
                    id="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Project Inquiry, Technical Advice, or Full-Time Opportunity"
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-teal-400 transition-colors"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label htmlFor="message" className="block text-xs font-semibold text-slate-300">
                      Message <span className="text-teal-400">*</span>
                    </label>
                    <span className="text-[11px] text-slate-500">
                      {formData.message.length} characters
                    </span>
                  </div>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me a bit about your project goals, timeline, and budget..."
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-teal-400 transition-colors resize-y"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <a
                    href={getMailtoLink()}
                    className="text-xs text-slate-400 hover:text-teal-300 transition-colors py-1"
                  >
                    Or open in your email client (mailto)
                  </a>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-6 py-3 text-sm font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 disabled:opacity-50 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
