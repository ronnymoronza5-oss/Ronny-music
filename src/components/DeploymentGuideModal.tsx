import React, { useState } from 'react';
import { X, Check, Copy, ExternalLink, Smartphone, Globe, Terminal, Shield, Sparkles, CheckCircle2 } from 'lucide-react';
import { FREE_PUBLISHING_GUIDES, MOBILE_TESTING_TIPS } from '../data/portfolioData';

interface DeploymentGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeploymentGuideModal: React.FC<DeploymentGuideModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'hosting' | 'android' | 'checklist'>('hosting');
  const [selectedProvider, setSelectedProvider] = useState<string>('vercel');
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentGuide = FREE_PUBLISHING_GUIDES.find(g => g.id === selectedProvider) || FREE_PUBLISHING_GUIDES[0];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(id);
    setTimeout(() => setCopiedSnippet(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl max-h-[92vh] overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl flex flex-col text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 flex items-start justify-between gap-4 bg-slate-950/70">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-teal-400" />
              <span className="text-xs uppercase tracking-wider text-teal-400 font-bold">
                100% Free Technologies Only
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Preview, Test & Publish Guide
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Complete step-by-step instructions to test on Android & desktop, and host for free without any subscriptions or paid APIs.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors shrink-0"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-950/40 px-5 pt-3 gap-2">
          <button
            onClick={() => setActiveTab('hosting')}
            className={`pb-3 px-3 text-xs sm:text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'hosting'
                ? 'border-teal-400 text-teal-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Free Hosting Options</span>
          </button>

          <button
            onClick={() => setActiveTab('android')}
            className={`pb-3 px-3 text-xs sm:text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'android'
                ? 'border-teal-400 text-teal-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>Android & Desktop Testing</span>
          </button>

          <button
            onClick={() => setActiveTab('checklist')}
            className={`pb-3 px-3 text-xs sm:text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'checklist'
                ? 'border-teal-400 text-teal-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Pre-Launch Checklist</span>
          </button>
        </div>

        {/* Modal Body with Scroll */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'hosting' && (
            <div>
              {/* Provider Selection Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
                {FREE_PUBLISHING_GUIDES.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setSelectedProvider(g.id)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      selectedProvider === g.id
                        ? 'bg-slate-800 border-teal-500/60 shadow-sm'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <p className="text-xs sm:text-sm font-bold text-white mb-0.5">{g.provider}</p>
                    <p className="text-[11px] text-teal-400 truncate">{g.badge}</p>
                  </button>
                ))}
              </div>

              {/* Provider Details Card */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
                  <div>
                    <h4 className="text-lg font-bold text-white">{currentGuide.title}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">{currentGuide.bestFor}</p>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20 w-fit">
                    No Credit Card Required
                  </span>
                </div>

                {/* Free tier summary */}
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs sm:text-sm text-slate-300">
                  <span className="text-teal-400 font-semibold">Free Tier Allowance: </span>
                  {currentGuide.freeTierSummary}
                </div>

                {/* Steps List */}
                <div>
                  <h5 className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-3">
                    Step-by-Step Instructions:
                  </h5>
                  <ol className="space-y-3">
                    {currentGuide.steps.map((step, idx) => (
                      <li key={idx} className="text-xs sm:text-sm text-slate-300 flex items-start gap-3">
                        <span className="w-5 h-5 rounded-full bg-slate-800 text-teal-400 font-mono text-xs flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="leading-relaxed">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Terminal Snippet if available */}
                {currentGuide.commandSample && (
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
                        <Terminal className="w-3.5 h-3.5 text-teal-400" />
                        <span>Terminal Command</span>
                      </span>
                      <button
                        onClick={() => handleCopy(currentGuide.commandSample!, currentGuide.id)}
                        className="text-xs text-teal-400 hover:text-teal-300 flex items-center gap-1"
                      >
                        {copiedSnippet === currentGuide.id ? (
                          <>
                            <Check className="w-3 h-3" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy Command</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="p-3 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-slate-200 overflow-x-auto">
                      <code>{currentGuide.commandSample}</code>
                    </pre>
                  </div>
                )}

                {/* Pros List */}
                <div className="pt-3 border-t border-slate-800/80">
                  <h5 className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
                    Key Free Features
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {currentGuide.pros.map((pro, i) => (
                      <div key={i} className="text-xs text-slate-400 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                        <span>{pro}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'android' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-500/30 text-teal-200 text-xs sm:text-sm">
                <p className="font-semibold text-white mb-1">Mobile-First Android Engineering</p>
                This website is built with a responsive viewport, high-contrast typography, and strict 44px or greater touch targets to guarantee smooth navigation on Google Pixel, Samsung Galaxy, and other Android devices.
              </div>

              <div className="grid grid-cols-1 gap-4">
                {MOBILE_TESTING_TIPS.map((tip, idx) => (
                  <div key={idx} className="p-5 rounded-xl bg-slate-950 border border-slate-800">
                    <h4 className="text-sm sm:text-base font-bold text-white mb-1.5 flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-teal-400" />
                      <span>{tip.title}</span>
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {tip.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Dev Server Host Command */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-slate-300 font-semibold">Test on your Android phone right now:</p>
                  <button
                    onClick={() => handleCopy('npm run dev -- --host', 'host-cmd')}
                    className="text-xs text-teal-400 hover:text-white flex items-center gap-1"
                  >
                    {copiedSnippet === 'host-cmd' ? 'Copied!' : 'Copy Command'}
                  </button>
                </div>
                <pre className="p-2.5 rounded bg-slate-900 font-mono text-xs text-teal-300">
                  npm run dev -- --host
                </pre>
                <p className="text-xs text-slate-400 mt-2">
                  Terminal will show: <code>Network: http://192.168.x.x:3000</code>. Simply type that into Chrome on your Android phone connected to the same Wi-Fi!
                </p>
              </div>
            </div>
          )}

          {activeTab === 'checklist' && (
            <div className="space-y-4">
              <p className="text-xs sm:text-sm text-slate-300">
                Ensure everything is pristine before showing your personal site to clients, employers, or friends:
              </p>

              <div className="space-y-3">
                {[
                  { title: "Run Production Build Test", desc: "Execute `npm run build` to verify there are zero TypeScript or bundling errors.", cmd: "npm run build" },
                  { title: "Personalize Your Name & Bio", desc: "Use the 'Customize Site' button in the top navigation to add your real name, bio, and social links.", cmd: null },
                  { title: "Verify Android Mobile Navigation", desc: "Ensure mobile hamburger drawer opens smoothly, links are thumb-friendly, and no text overflows.", cmd: null },
                  { title: "Check Contact Channels", desc: "Ensure your email address and LinkedIn/GitHub URLs in the contact section are updated.", cmd: null },
                  { title: "Test Lighthouse Performance", desc: "In Chrome DevTools, run Lighthouse audit; aim for 95+ performance, accessibility, and SEO.", cmd: null },
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-white">{item.title}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                      {item.cmd && (
                        <code className="inline-block mt-2 px-2 py-0.5 bg-slate-900 border border-slate-800 rounded text-teal-300 font-mono text-xs">
                          {item.cmd}
                        </code>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
          <p className="text-xs text-slate-400">
            Total cost to build & host: <strong className="text-white">$0.00 / month</strong>
          </p>
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs sm:text-sm font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-lg transition-colors"
          >
            Got it, Let's Build!
          </button>
        </div>
      </div>
    </div>
  );
};
