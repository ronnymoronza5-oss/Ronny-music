import React, { useState } from 'react';
import { X, Flag, Check, AlertCircle } from 'lucide-react';
import { Song, CopyrightReport } from '../types';

interface ReportCopyrightModalProps {
  isOpen: boolean;
  onClose: () => void;
  song: Song | null;
  onReportSubmitted: (report: CopyrightReport) => void;
}

export const ReportCopyrightModal: React.FC<ReportCopyrightModalProps> = ({
  isOpen,
  onClose,
  song,
  onReportSubmitted
}) => {
  const [reporterName, setReporterName] = useState('');
  const [reporterEmail, setReporterEmail] = useState('');
  const [reason, setReason] = useState('Unauthorized commercial distribution without valid license');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);

  if (!isOpen || !song) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reporterName.trim() || !reporterEmail.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const rep: CopyrightReport = {
        id: `rep-${Date.now()}`,
        songId: song.id,
        songTitle: song.title,
        artistName: song.artist,
        reporterName: reporterName.trim(),
        reporterEmail: reporterEmail.trim(),
        reason: reason.trim(),
        date: new Date().toISOString().split('T')[0],
        status: 'open'
      };

      onReportSubmitted(rep);
      setIsSubmitting(false);
      setSuccessAlert(true);
      setTimeout(() => {
        setSuccessAlert(false);
        onClose();
      }, 2000);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg rounded-2xl bg-slate-900 border border-rose-900/40 p-6 shadow-2xl text-left text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Flag className="w-5 h-5 text-rose-400" />
            <h3 className="text-lg font-bold text-white">Report Copyright / DMCA Issue</h3>
          </div>
          <button onClick={onClose} className="w-7 h-7 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center">
            <X className="w-4 h-4" />
          </button>
        </div>

        {successAlert ? (
          <div className="py-8 text-center space-y-2">
            <Check className="w-10 h-10 text-emerald-400 mx-auto" />
            <p className="text-base font-bold text-white">Dispute Filed with Admin</p>
            <p className="text-xs text-slate-400">Our team and Ronny will review the master rights for "{song.title}".</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <p className="font-semibold text-white">{song.title}</p>
              <p className="text-slate-400">By {song.artist} ({song.album})</p>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Your Legal Name</label>
              <input
                type="text"
                required
                value={reporterName}
                onChange={(e) => setReporterName(e.target.value)}
                placeholder="Full name or copyright representative"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Contact Email</label>
              <input
                type="email"
                required
                value={reporterEmail}
                onChange={(e) => setReporterEmail(e.target.value)}
                placeholder="rights-holder@example.com"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Reason / Infringement Details</label>
              <textarea
                rows={3}
                required
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-rose-500 resize-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button type="button" onClick={onClose} className="px-4 py-2 text-slate-400 hover:text-white">
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2 font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-lg transition-colors flex items-center gap-1.5"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Infringement Report'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
