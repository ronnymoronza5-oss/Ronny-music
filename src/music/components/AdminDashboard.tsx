import React, { useState } from 'react';
import { Song, Artist, CopyrightReport, PromotionSubmission } from '../types';
import { Shield, Music, Users, Flag, Sparkles, Check, X, Trash2, CheckCircle2, AlertTriangle, Play, Pause, CreditCard, DollarSign } from 'lucide-react';

interface AdminDashboardProps {
  songs: Song[];
  artists: Artist[];
  reports: CopyrightReport[];
  promotions: PromotionSubmission[];
  currentSong: Song | null;
  isPlaying: boolean;
  onPlaySong: (song: Song) => void;
  onApproveSong: (id: string) => void;
  onRejectSong: (id: string) => void;
  onDeleteSong: (id: string) => void;
  onResolveReport: (id: string) => void;
  onApprovePromotion: (id: string) => void;
  onToggleArtistVerified: (id: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  songs,
  artists,
  reports,
  promotions,
  currentSong,
  isPlaying,
  onPlaySong,
  onApproveSong,
  onRejectSong,
  onDeleteSong,
  onResolveReport,
  onApprovePromotion,
  onToggleArtistVerified
}) => {
  const [activeTab, setActiveTab] = useState<'songs' | 'artists' | 'reports' | 'promotions' | 'monetization'>('songs');
  const [gatewaySettings, setGatewaySettings] = useState({
    provider: 'stripe_test',
    publicKey: 'pk_test_sample_ronny_music_demo',
    tippingEnabled: true,
    adsEnabled: true
  });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveGateway = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 text-slate-200">
      {/* Admin Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-purple-950/60 via-slate-900 to-emerald-950/40 border border-purple-800/50">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-xs uppercase tracking-wider text-emerald-400 font-bold font-mono">
              Ronny Music Control Console
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Admin Management Dashboard
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Moderate uploaded audio, oversee verified artists, process copyright inquiries, and manage promotions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-lg bg-purple-950 text-purple-300 border border-purple-800 text-xs font-mono font-semibold">
            Status: Fully Operational (Free Tier)
          </span>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-slate-900 border border-slate-800 rounded-xl">
        <button
          onClick={() => setActiveTab('songs')}
          className={`px-3.5 py-2 text-xs font-semibold rounded-lg flex items-center gap-2 transition-all ${
            activeTab === 'songs'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Music className="w-4 h-4" />
          <span>Manage Songs ({songs.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('artists')}
          className={`px-3.5 py-2 text-xs font-semibold rounded-lg flex items-center gap-2 transition-all ${
            activeTab === 'artists'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Artists ({artists.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('promotions')}
          className={`px-3.5 py-2 text-xs font-semibold rounded-lg flex items-center gap-2 transition-all ${
            activeTab === 'promotions'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>Promotions ({promotions.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('reports')}
          className={`px-3.5 py-2 text-xs font-semibold rounded-lg flex items-center gap-2 transition-all ${
            activeTab === 'reports'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Flag className="w-4 h-4 text-rose-400" />
          <span>Copyright Reports ({reports.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('monetization')}
          className={`px-3.5 py-2 text-xs font-semibold rounded-lg flex items-center gap-2 transition-all ${
            activeTab === 'monetization'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <DollarSign className="w-4 h-4 text-emerald-400" />
          <span>Monetization & Gateways</span>
        </button>
      </div>

      {/* Tab 1: Manage Songs */}
      {activeTab === 'songs' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-base font-bold text-white">Catalog Songs & Submissions</h3>
            <span className="text-xs text-slate-400">Total tracks: {songs.length}</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 font-semibold uppercase text-[10px]">
                <tr>
                  <th className="p-3">Track</th>
                  <th className="p-3">Artist</th>
                  <th className="p-3">Genre</th>
                  <th className="p-3">Plays</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Moderation Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {songs.map((song) => {
                  const isCurrent = currentSong?.id === song.id;
                  return (
                    <tr key={song.id} className="hover:bg-slate-950/50">
                      <td className="p-3 flex items-center gap-2.5">
                        <button
                          onClick={() => onPlaySong(song)}
                          className="w-7 h-7 rounded-full bg-slate-800 hover:bg-purple-600 text-white flex items-center justify-center transition-colors shrink-0"
                          title="Play preview"
                        >
                          {isCurrent && isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
                        </button>
                        <div className="min-w-0">
                          <p className="font-bold text-white truncate">{song.title}</p>
                          <p className="text-[10px] text-slate-500 truncate">{song.album}</p>
                        </div>
                      </td>
                      <td className="p-3 font-medium text-slate-200">{song.artist}</td>
                      <td className="p-3 text-slate-400">{song.genre}</td>
                      <td className="p-3 font-mono text-slate-400">{song.playCount.toLocaleString()}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          song.status === 'approved'
                            ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800'
                            : song.status === 'pending'
                            ? 'bg-amber-950/80 text-amber-400 border border-amber-800'
                            : 'bg-rose-950/80 text-rose-400 border border-rose-800'
                        }`}>
                          {song.status}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {song.status !== 'approved' && (
                            <button
                              onClick={() => onApproveSong(song.id)}
                              className="px-2 py-1 bg-emerald-950 hover:bg-emerald-900 text-emerald-400 border border-emerald-800 rounded text-[11px] font-semibold"
                            >
                              Approve
                            </button>
                          )}
                          {song.status !== 'rejected' && (
                            <button
                              onClick={() => onRejectSong(song.id)}
                              className="px-2 py-1 bg-amber-950 hover:bg-amber-900 text-amber-400 border border-amber-800 rounded text-[11px]"
                            >
                              Reject
                            </button>
                          )}
                          <button
                            onClick={() => onDeleteSong(song.id)}
                            className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                            title="Delete song"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Manage Artists */}
      {activeTab === 'artists' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-base font-bold text-white">Registered Independent Artists</h3>
            <span className="text-xs text-slate-400">Total: {artists.length} artists</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {artists.map((artist) => (
              <div key={artist.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-800 shrink-0 border border-purple-500/30">
                  <img src={artist.avatarUrl} alt={artist.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm font-bold text-white truncate">{artist.name}</h4>
                    {artist.verified && (
                      <span className="text-emerald-400 text-xs" title="Verified Artist">✓</span>
                    )}
                    {artist.isRonnyCreator && (
                      <span className="px-1.5 py-0.2 rounded text-[10px] bg-purple-950 text-purple-300 border border-purple-800">
                        Creator
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-0.5">{artist.bio}</p>
                  <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-2 font-mono">
                    <span>{artist.monthlyListeners.toLocaleString()} listeners</span>
                    <span>·</span>
                    <span>{artist.followers.toLocaleString()} followers</span>
                  </div>
                </div>
                <button
                  onClick={() => onToggleArtistVerified(artist.id)}
                  className={`px-2.5 py-1 text-xs rounded-lg border font-medium ${
                    artist.verified
                      ? 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white'
                      : 'bg-emerald-950 border-emerald-800 text-emerald-400'
                  }`}
                >
                  {artist.verified ? 'Remove Check' : 'Verify'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Promotional Submissions */}
      {activeTab === 'promotions' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white">Promotional Submissions & Orders</h3>
              <p className="text-xs text-slate-400 mt-0.5">Approve artist spot placement and verify test transactions.</p>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950 px-2 py-1 rounded border border-emerald-800">
              Active Campaigns: {promotions.filter(p => p.status === 'active').length}
            </span>
          </div>

          {promotions.length === 0 ? (
            <p className="text-xs text-slate-500 py-8 text-center">No promotional submissions received yet.</p>
          ) : (
            <div className="space-y-3">
              {promotions.map((p) => (
                <div key={p.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">{p.songTitle}</span>
                      <span className="text-xs text-purple-400">by {p.artistName}</span>
                      <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-slate-900 text-slate-300 border border-slate-700">
                        {p.planName} (${p.amountUSD})
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">Submitted on {p.date} · Notes: {p.notes}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 text-[11px] rounded font-bold uppercase ${
                      p.status === 'active' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-amber-950 text-amber-400 border border-amber-800'
                    }`}>
                      {p.status}
                    </span>
                    {p.status !== 'active' && (
                      <button
                        onClick={() => onApprovePromotion(p.id)}
                        className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white"
                      >
                        Approve & Boost
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Copyright & DMCA Reports */}
      {activeTab === 'reports' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white">Copyright Inquiries & Dispute Resolution</h3>
              <p className="text-xs text-slate-400 mt-0.5">Enforce copyright compliance and remove unauthorized uploads.</p>
            </div>
            <span className="text-xs text-slate-500">Zero Toleration Policy</span>
          </div>

          {reports.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-500">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
              <span>Zero copyright disputes pending. Clean catalog!</span>
            </div>
          ) : (
            <div className="space-y-3">
              {reports.map((rep) => (
                <div key={rep.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-white">Report for "{rep.songTitle}"</span>
                    <span className={`px-2 py-0.5 text-[10px] rounded font-bold uppercase ${
                      rep.status === 'resolved' ? 'bg-emerald-950 text-emerald-400' : 'bg-rose-950 text-rose-400'
                    }`}>
                      {rep.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">
                    <strong>Reported by: </strong>{rep.reporterName} ({rep.reporterEmail}) on {rep.date}
                  </p>
                  <p className="text-xs text-slate-400 bg-slate-900 p-2.5 rounded border border-slate-800">
                    "{rep.reason}"
                  </p>
                  {rep.status !== 'resolved' && (
                    <div className="flex items-center gap-2 pt-2">
                      <button
                        onClick={() => onResolveReport(rep.id)}
                        className="px-3 py-1 bg-emerald-950 hover:bg-emerald-900 text-emerald-400 border border-emerald-800 rounded text-xs font-semibold"
                      >
                        Mark Dispute Resolved
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 5: Monetization & Payment Gateways */}
      {activeTab === 'monetization' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="pb-3 border-b border-slate-800">
            <h3 className="text-base font-bold text-white">Monetization, Tips & Payment Provider Setup</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Ronny Music is 100% free to operate. To enable real credit card transactions for promotions and tips, configure your free merchant keys below.
            </p>
          </div>

          {savedSuccess && (
            <div className="p-3 rounded-lg bg-emerald-950 border border-emerald-500 text-emerald-200 text-xs flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Gateway preferences updated locally. Ready for test processing!</span>
            </div>
          )}

          <form onSubmit={handleSaveGateway} className="space-y-4 max-w-xl">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Payment Provider
              </label>
              <select
                value={gatewaySettings.provider}
                onChange={(e) => setGatewaySettings({ ...gatewaySettings, provider: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-purple-500"
              >
                <option value="stripe_test">Stripe Checkout (Free Sandbox / Test Mode)</option>
                <option value="paypal_sandbox">PayPal Smart Buttons (Free Sandbox)</option>
                <option value="kofi_free">Direct Ko-fi / Buy Me a Coffee (Zero Commission)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Public Merchant / Client Key
              </label>
              <input
                type="text"
                value={gatewaySettings.publicKey}
                onChange={(e) => setGatewaySettings({ ...gatewaySettings, publicKey: e.target.value })}
                className="w-full px-3 py-2 text-xs font-mono bg-slate-950 border border-slate-800 rounded-lg text-emerald-400 focus:outline-none focus:border-purple-500"
              />
              <p className="text-[10px] text-slate-500 mt-1">Never enter private secret keys in client-side code.</p>
            </div>

            <div className="space-y-2 pt-2">
              <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={gatewaySettings.tippingEnabled}
                  onChange={(e) => setGatewaySettings({ ...gatewaySettings, tippingEnabled: e.target.checked })}
                  className="accent-purple-500 rounded"
                />
                <span>Enable voluntary artist tip jar on player & track lists</span>
              </label>

              <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={gatewaySettings.adsEnabled}
                  onChange={(e) => setGatewaySettings({ ...gatewaySettings, adsEnabled: e.target.checked })}
                  className="accent-purple-500 rounded"
                />
                <span>Enable native independent artist promo ad slots (monetization-ready)</span>
              </label>
            </div>

            <div className="pt-3">
              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-lg transition-colors"
              >
                Save Gateway Configuration
              </button>
            </div>
          </form>

          {/* Educational Free Operating Advice */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 space-y-2">
            <p className="text-white font-semibold">How to operate payments for $0/month:</p>
            <p>1. <strong>Stripe Test Mode</strong> provides unlimited free testing without monthly maintenance fees.</p>
            <p>2. <strong>PayPal Buttons</strong> and <strong>Buy Me A Coffee</strong> require zero monthly subscriptions (standard per-transaction fee applies only when you earn money).</p>
          </div>
        </div>
      )}
    </div>
  );
};
