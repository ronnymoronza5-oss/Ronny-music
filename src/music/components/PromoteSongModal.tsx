import React, { useState } from 'react';
import { X, Sparkles, Check, Lock, AlertCircle, ShieldAlert } from 'lucide-react';
import { Song, PromotionPlan, PromotionSubmission } from '../types';
import { PROMOTION_PLANS } from '../data';

interface PromoteSongModalProps {
  isOpen: boolean;
  onClose: () => void;
  songs: Song[];
  onCampaignSubmitted: (submission: PromotionSubmission) => void;
}

export const PromoteSongModal: React.FC<PromoteSongModalProps> = ({
  isOpen,
  onClose,
  songs,
  onCampaignSubmitted
}) => {
  const [selectedPlanId, setSelectedPlanId] = useState<string>('plan-featured');
  const [selectedSongId, setSelectedSongId] = useState<string>(songs[0]?.id || '');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedAlert, setSubmittedAlert] = useState(false);

  if (!isOpen) return null;

  const currentPlan = PROMOTION_PLANS.find(p => p.id === selectedPlanId) || PROMOTION_PLANS[0];
  const chosenSong = songs.find(s => s.id === selectedSongId) || songs[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const sub: PromotionSubmission = {
        id: `promo-${Date.now()}`,
        artistName: chosenSong ? chosenSong.artist : 'Ronny',
        songTitle: chosenSong ? chosenSong.title : 'Featured Single',
        planId: currentPlan.id,
        planName: currentPlan.name,
        amountUSD: currentPlan.priceUSD,
        status: 'submitted',
        date: new Date().toISOString().split('T')[0],
        notes: notes || 'Standard promotional launch'
      };

      onCampaignSubmitted(sub);
      setIsSubmitting(false);
      setSubmittedAlert(true);
      setTimeout(() => {
        setSubmittedAlert(false);
        onClose();
      }, 2200);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-2xl bg-slate-900 border border-purple-900/50 p-6 sm:p-8 shadow-2xl text-left text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-xs uppercase tracking-wider text-emerald-400 font-bold">
                Artist Spotlight & Promotion
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Amplify Your Reach on Ronny Music
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Get guaranteed playlist placement, homepage banners, and algorithmic discovery boosts.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mandatory Security & Transparency Notice */}
        <div className="p-4 mb-6 rounded-xl bg-amber-950/40 border border-amber-500/40 text-amber-200 text-xs flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-white mb-0.5">Payment Gateway In Preparation / Sandbox Mode</p>
            <p className="text-amber-300 leading-relaxed">
              Real credit card billing is currently <strong>disabled</strong> until production payment keys (Stripe, PayPal, or LemonSqueezy) are connected in the Admin Portal. You can freely submit a test campaign to inspect the moderation and spotlight workflow without making any real purchase.
            </p>
          </div>
        </div>

        {submittedAlert ? (
          <div className="py-12 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
              <Check className="w-7 h-7" />
            </div>
            <h4 className="text-xl font-bold text-white">Promotional Order Submitted!</h4>
            <p className="text-sm text-slate-300 max-w-md mx-auto">
              Your promotion for <strong>"{chosenSong?.title}"</strong> under the <strong>{currentPlan.name} (${currentPlan.priceUSD})</strong> plan has been queued in the Admin Dashboard for approval.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Select Track */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                1. Select Song to Promote
              </label>
              <select
                value={selectedSongId}
                onChange={(e) => setSelectedSongId(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-purple-500"
              >
                {songs.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.title} — by {s.artist} ({s.genre})
                  </option>
                ))}
              </select>
            </div>

            {/* Step 2: Compare & Pick Plan */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                2. Choose Promotion Package (Prices Clearly Displayed)
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {PROMOTION_PLANS.map((plan) => (
                  <div
                    key={plan.id}
                    onClick={() => setSelectedPlanId(plan.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                      selectedPlanId === plan.id
                        ? 'bg-purple-950/60 border-purple-500 shadow-xl shadow-purple-900/30 ring-1 ring-purple-500'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-mono text-emerald-400 font-bold">{plan.badge}</span>
                        {plan.recommended && (
                          <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded border border-purple-500/30">
                            Best Value
                          </span>
                        )}
                      </div>

                      <h5 className="text-base font-bold text-white mb-1">{plan.name}</h5>
                      <div className="text-2xl font-black text-white font-mono my-2 tabular-nums">
                        ${plan.priceUSD}
                        <span className="text-xs text-slate-400 font-normal"> / {plan.durationDays} days</span>
                      </div>
                      <p className="text-xs text-slate-400 mb-3">{plan.description}</p>

                      <ul className="space-y-1.5 text-[11px] text-slate-300 pt-2 border-t border-slate-800/80">
                        {plan.perks.map((perk, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{perk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-4 pt-2">
                      <div className={`w-full py-1.5 text-center text-xs font-bold rounded-lg ${
                        selectedPlanId === plan.id
                          ? 'bg-purple-600 text-white'
                          : 'bg-slate-900 text-slate-400'
                      }`}>
                        {selectedPlanId === plan.id ? 'Selected Plan' : 'Select Plan'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Campaign Notes */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Target Audience or Special Request Notes (Optional)
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Focus on Synthwave and Lo-Fi listeners in North America & Europe..."
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-purple-500 resize-none"
              />
            </div>

            {/* Submission Actions */}
            <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-slate-400 flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>Zero charges incurred (Payment gateway sandbox mode)</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-4 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-6 py-2.5 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-emerald-600 hover:from-purple-500 hover:to-emerald-500 rounded-lg transition-all shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Submit Promotional Campaign (${currentPlan.priceUSD})</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
