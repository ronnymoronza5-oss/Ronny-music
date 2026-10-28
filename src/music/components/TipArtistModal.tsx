import React, { useState } from 'react';
import { X, Heart, Coins, Check, AlertCircle, Sparkles } from 'lucide-react';
import { Song, Artist } from '../types';

interface TipArtistModalProps {
  isOpen: boolean;
  onClose: () => void;
  target: Song | Artist | null;
  onTipSent: (amount: number, message: string) => void;
}

export const TipArtistModal: React.FC<TipArtistModalProps> = ({
  isOpen,
  onClose,
  target,
  onTipSent
}) => {
  const [selectedAmount, setSelectedAmount] = useState<number>(5);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [message, setMessage] = useState<string>('Keep creating incredible music! 🎵');
  const [donorName, setDonorName] = useState<string>('Music Supporter');
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen || !target) return null;

  const artistName = 'artist' in target ? target.artist : target.name;
  const avatarUrl = 'coverUrl' in target ? target.coverUrl : target.avatarUrl;

  const amounts = [2, 5, 10, 25];

  const handleSendTip = (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmount = customAmount ? parseFloat(customAmount) : selectedAmount;
    if (!finalAmount || finalAmount <= 0) return;

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setSuccess(true);
      onTipSent(finalAmount, message);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 2000);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md rounded-2xl bg-slate-900 border border-purple-900/50 p-6 shadow-2xl text-left text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-800 border border-purple-500/40">
              <img src={avatarUrl} alt={artistName} className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Support {artistName}
              </h3>
              <p className="text-xs text-purple-400">100% of tips go directly to the artist</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Sandbox Notice (Honest technical clarity) */}
        <div className="p-3 mb-4 rounded-xl bg-purple-950/40 border border-purple-800/40 text-[11px] text-purple-200 flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <span>
            <strong>Voluntary Tip Jar (Sandbox Mode): </strong>
            Direct artist tip simulator. No real credit card charge occurs until payment gateway merchant keys are linked by the platform administrator.
          </span>
        </div>

        {success ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <p className="text-lg font-bold text-white">Thank You for Supporting {artistName}!</p>
            <p className="text-xs text-slate-400">Your simulated tip of ${(customAmount ? parseFloat(customAmount) : selectedAmount).toFixed(2)} was registered.</p>
          </div>
        ) : (
          <form onSubmit={handleSendTip} className="space-y-4">
            {/* Amount Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Choose Tip Amount
              </label>
              <div className="grid grid-cols-4 gap-2 mb-2">
                {amounts.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => {
                      setSelectedAmount(amt);
                      setCustomAmount('');
                    }}
                    className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                      selectedAmount === amt && !customAmount
                        ? 'bg-purple-600 text-white border-purple-400 shadow-lg shadow-purple-600/30'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    ${amt}
                  </button>
                ))}
              </div>

              <input
                type="number"
                min="1"
                step="0.5"
                placeholder="Or enter custom amount ($)"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* Note & Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Your Name
              </label>
              <input
                type="text"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Message to Artist
              </label>
              <textarea
                rows={2}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-purple-500 resize-none"
              />
            </div>

            {/* Action */}
            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Total: <strong className="text-white">${(customAmount ? parseFloat(customAmount) || 0 : selectedAmount).toFixed(2)}</strong>
              </span>

              <button
                type="submit"
                disabled={isProcessing}
                className="px-5 py-2 text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-emerald-600 hover:from-purple-500 hover:to-emerald-500 rounded-lg flex items-center gap-1.5 shadow-md shadow-purple-600/20"
              >
                {isProcessing ? 'Simulating Send...' : 'Send Support Tip'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
