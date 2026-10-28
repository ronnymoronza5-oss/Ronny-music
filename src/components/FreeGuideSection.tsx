import React, { useState } from 'react';
import { Smartphone, Globe, Shield, Terminal, Copy, Check, ArrowRight, ExternalLink } from 'lucide-react';
import { FREE_PUBLISHING_GUIDES, MOBILE_TESTING_TIPS } from '../data/portfolioData';

interface FreeGuideSectionProps {
  onOpenModal: () => void;
}

export const FreeGuideSection: React.FC<FreeGuideSectionProps> = ({ onOpenModal }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="hosting-guide" className="py-20 bg-slate-900/50 border-t border-slate-800/80 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs uppercase tracking-wider text-teal-400 font-bold">
              Deployment & Android Guide
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-xs text-slate-400">Zero Cost, Free Tech Stack</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight [text-wrap:balance]">
            How to preview on Android & publish for free.
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
            You do not need to buy any paid subscriptions or proprietary services. Here is how you can test this website on Android phones, preview it locally, and deploy it to global free hosting with your own custom domain.
          </p>
        </div>

        {/* 3 Core Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Card 1: Android Testing */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 mb-4">
                <Smartphone className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                1. Test on Android Phones
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Preview this website live on any Android device. Use the AI Studio shared link or run:
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-teal-300 flex items-center justify-between mb-4">
                <span>npm run dev -- --host</span>
                <button
                  onClick={() => handleCopy('npm run dev -- --host', 'host-cmd-sec')}
                  className="text-slate-400 hover:text-white ml-2"
                  title="Copy command"
                >
                  {copiedId === 'host-cmd-sec' ? <Check className="w-3.5 h-3.5 text-teal-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300">
                <li className="flex items-start gap-1.5">
                  <span className="text-teal-400 font-bold">✓</span>
                  <span>Open printed local IP on your phone's Chrome</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-teal-400 font-bold">✓</span>
                  <span>Desktop Chrome F12 &rarr; Device Mode</span>
                </li>
              </ul>
            </div>

            <button
              onClick={onOpenModal}
              className="mt-6 text-xs text-teal-400 hover:text-teal-300 font-semibold flex items-center gap-1"
            >
              <span>View Android Testing Checklist</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 2: 1-Click Free Hosting */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 mb-4">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                2. Publish on Free Hosting
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Deploy directly from your GitHub repository with automatic free SSL and global CDN:
              </p>
              <div className="space-y-2 text-xs text-slate-300">
                <div className="p-2 rounded bg-slate-900 flex items-center justify-between">
                  <span className="font-semibold text-white">Vercel Hobby</span>
                  <span className="text-emerald-400 font-mono text-[11px]">$0 Free Forever</span>
                </div>
                <div className="p-2 rounded bg-slate-900 flex items-center justify-between">
                  <span className="font-semibold text-white">GitHub Pages</span>
                  <span className="text-emerald-400 font-mono text-[11px]">100% Free / Git</span>
                </div>
                <div className="p-2 rounded bg-slate-900 flex items-center justify-between">
                  <span className="font-semibold text-white">Cloudflare Pages</span>
                  <span className="text-emerald-400 font-mono text-[11px]">Unlimited Traffic</span>
                </div>
              </div>
            </div>

            <button
              onClick={onOpenModal}
              className="mt-6 text-xs text-teal-400 hover:text-teal-300 font-semibold flex items-center gap-1"
            >
              <span>Compare Providers & Steps</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 3: Free Custom Domain & Build */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 mb-4">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                3. Build & Custom Domains
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Generate the standalone static distribution with a single free command:
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-teal-300 flex items-center justify-between mb-4">
                <span>npm run build</span>
                <button
                  onClick={() => handleCopy('npm run build', 'build-cmd-sec')}
                  className="text-slate-400 hover:text-white ml-2"
                  title="Copy command"
                >
                  {copiedId === 'build-cmd-sec' ? <Check className="w-3.5 h-3.5 text-teal-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <p className="text-xs text-slate-400">
                You receive a clean <code>dist/</code> folder that can be uploaded to any static web server for free with zero lock-in.
              </p>
            </div>

            <button
              onClick={onOpenModal}
              className="mt-6 text-xs text-teal-400 hover:text-teal-300 font-semibold flex items-center gap-1"
            >
              <span>Open Full Interactive Guide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
