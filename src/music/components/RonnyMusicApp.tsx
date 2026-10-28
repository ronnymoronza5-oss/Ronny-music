import React, { useState, useEffect } from 'react';
import { Song, Artist, Playlist, UserAccount, PromotionSubmission, CopyrightReport } from '../types';
import { INITIAL_SONGS, INITIAL_ARTISTS, INITIAL_PLAYLISTS, DEFAULT_USERS } from '../data';
import { audioEngine } from '../audioEngine';
import { MusicPlayerBar } from './MusicPlayerBar';
import { SongRow } from './SongRow';
import { UploadSongModal } from './UploadSongModal';
import { TipArtistModal } from './TipArtistModal';
import { PromoteSongModal } from './PromoteSongModal';
import { AuthModal } from './AuthModal';
import { ReportCopyrightModal } from './ReportCopyrightModal';
import { AdminDashboard } from './AdminDashboard';
import {
  Play,
  Pause,
  Search,
  Home,
  Compass,
  Library,
  Upload,
  Sparkles,
  Shield,
  Heart,
  Plus,
  Coins,
  User,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Radio,
  SlidersHorizontal,
  Flame,
  Check
} from 'lucide-react';

interface RonnyMusicAppProps {
  onSwitchToPortfolio: () => void;
}

export const RonnyMusicApp: React.FC<RonnyMusicAppProps> = ({ onSwitchToPortfolio }) => {
  // Persistence state
  const [songs, setSongs] = useState<Song[]>(() => {
    try {
      const saved = localStorage.getItem('ronny_music_songs');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_SONGS;
  });

  const [artists, setArtists] = useState<Artist[]>(() => {
    try {
      const saved = localStorage.getItem('ronny_music_artists');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_ARTISTS;
  });

  const [playlists, setPlaylists] = useState<Playlist[]>(() => {
    try {
      const saved = localStorage.getItem('ronny_music_playlists');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_PLAYLISTS;
  });

  const [currentUser, setCurrentUser] = useState<UserAccount>(() => {
    try {
      const saved = localStorage.getItem('ronny_music_user');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return DEFAULT_USERS[1]; // Ronny (Artist) by default
  });

  const [promotions, setPromotions] = useState<PromotionSubmission[]>(() => {
    try {
      const saved = localStorage.getItem('ronny_music_promotions');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [
      {
        id: "promo-sample-1",
        artistName: "Ronny",
        songTitle: "Synthwave Odyssey",
        planId: "plan-featured",
        planName: "Featured Spotlight",
        amountUSD: 35,
        status: "active",
        date: "2026-10-25",
        notes: "Official album launch spotlight"
      }
    ];
  });

  const [reports, setReports] = useState<CopyrightReport[]>([]);

  // Navigation
  const [activeTab, setActiveTab] = useState<'home' | 'search' | 'library' | 'upload' | 'promotion' | 'admin'>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>('all');

  // Player state
  const [currentSong, setCurrentSong] = useState<Song | null>(INITIAL_SONGS[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Modals
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isPromoteOpen, setIsPromoteOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [tipTarget, setTipTarget] = useState<Song | Artist | null>(null);
  const [reportTargetSong, setReportTargetSong] = useState<Song | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ronny_music_songs', JSON.stringify(songs));
    } catch (e) {}
  }, [songs]);

  useEffect(() => {
    try {
      localStorage.setItem('ronny_music_artists', JSON.stringify(artists));
    } catch (e) {}
  }, [artists]);

  useEffect(() => {
    try {
      localStorage.setItem('ronny_music_user', JSON.stringify(currentUser));
    } catch (e) {}
  }, [currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem('ronny_music_promotions', JSON.stringify(promotions));
    } catch (e) {}
  }, [promotions]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Playback handlers
  const handlePlaySong = (song: Song) => {
    if (currentSong?.id === song.id && isPlaying) {
      audioEngine.pause();
      setIsPlaying(false);
    } else {
      setCurrentSong(song);
      setIsPlaying(true);
      audioEngine.playSong(song);
    }
  };

  const handleTogglePlay = () => {
    if (!currentSong) {
      if (songs.length > 0) handlePlaySong(songs[0]);
      return;
    }
    if (isPlaying) {
      audioEngine.pause();
      setIsPlaying(false);
    } else {
      audioEngine.resume();
      setIsPlaying(true);
    }
  };

  const handleNext = () => {
    if (!currentSong) return;
    const currentIndex = songs.findIndex((s) => s.id === currentSong.id);
    const nextSong = songs[(currentIndex + 1) % songs.length];
    handlePlaySong(nextSong);
  };

  const handlePrev = () => {
    if (!currentSong) return;
    const currentIndex = songs.findIndex((s) => s.id === currentSong.id);
    const prevSong = songs[(currentIndex - 1 + songs.length) % songs.length];
    handlePlaySong(prevSong);
  };

  const handleToggleLike = (songId: string) => {
    const isLiked = currentUser.likedSongIds.includes(songId);
    let updatedLikes: string[];
    if (isLiked) {
      updatedLikes = currentUser.likedSongIds.filter((id) => id !== songId);
      showToast("Removed from Liked Songs");
    } else {
      updatedLikes = [...currentUser.likedSongIds, songId];
      showToast("Added to Liked Songs ❤️");
    }

    setCurrentUser({
      ...currentUser,
      likedSongIds: updatedLikes
    });

    // Update song count
    setSongs(songs.map((s) => s.id === songId ? { ...s, likesCount: s.likesCount + (isLiked ? -1 : 1) } : s));
  };

  const handleSongUploaded = (newSong: Song) => {
    setSongs([newSong, ...songs]);
    showToast(`"${newSong.title}" is now uploaded and ready to stream!`);
    handlePlaySong(newSong);
  };

  const handleCampaignSubmitted = (sub: PromotionSubmission) => {
    setPromotions([sub, ...promotions]);
    showToast(`Promotion for "${sub.songTitle}" submitted to Admin Dashboard!`);
  };

  const handleTipSent = (amount: number, msg: string) => {
    showToast(`Tip of $${amount.toFixed(2)} sent! Thank you for supporting the artist.`);
  };

  // Admin moderation handlers
  const handleApproveSong = (id: string) => {
    setSongs(songs.map(s => s.id === id ? { ...s, status: 'approved' } : s));
    showToast('Song approved for general streaming.');
  };

  const handleRejectSong = (id: string) => {
    setSongs(songs.map(s => s.id === id ? { ...s, status: 'rejected' } : s));
    showToast('Song rejected from catalog.');
  };

  const handleDeleteSong = (id: string) => {
    setSongs(songs.filter(s => s.id !== id));
    showToast('Song permanently deleted.');
  };

  const handleResolveReport = (id: string) => {
    setReports(reports.map(r => r.id === id ? { ...r, status: 'resolved' } : r));
    showToast('Copyright inquiry marked resolved.');
  };

  const handleApprovePromotion = (id: string) => {
    setPromotions(promotions.map(p => p.id === id ? { ...p, status: 'active' } : p));
    showToast('Promotion campaign activated and boosted!');
  };

  const handleToggleArtistVerified = (id: string) => {
    setArtists(artists.map(a => a.id === id ? { ...a, verified: !a.verified } : a));
  };

  // Filtering songs for Search & Explore
  const genres = ['all', 'Electronic', 'Afrobeat', 'Lo-Fi', 'Jazz', 'Ambient', 'Pop'];
  const filteredSongs = songs.filter((s) => {
    const matchesSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.album.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === 'all' || s.genre.toLowerCase() === selectedGenre.toLowerCase();
    return matchesSearch && matchesGenre;
  });

  const likedSongs = songs.filter((s) => currentUser.likedSongIds.includes(s.id));
  const trendingSongs = [...songs].sort((a, b) => b.playCount - a.playCount);

  return (
    <div className="min-h-screen bg-[#07090f] text-slate-100 flex flex-col font-sans selection:bg-purple-600 selection:text-white pb-28">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-16 right-4 z-50 p-3 rounded-xl bg-purple-900/90 text-white border border-purple-500/50 shadow-2xl text-xs flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 bg-[#07090f]/95 backdrop-blur-md border-b border-purple-900/30 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-emerald-500 flex items-center justify-center text-white shadow-lg shadow-purple-600/30 shrink-0">
            <Radio className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-black text-white tracking-tight flex items-center gap-1.5">
              <span>Ronny Music</span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 hidden sm:inline-block">
                Creator: Ronny
              </span>
            </h1>
            <p className="text-[11px] text-purple-400 hidden sm:block">
              Free streaming & independent artist distribution
            </p>
          </div>
        </div>

        {/* Central Search Shortcut (Desktop) */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search songs, artists, or genres..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (activeTab !== 'search') setActiveTab('search');
              }}
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-900/90 border border-slate-800 rounded-full text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>

        {/* Right Actions & Account */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Back to Personal Website / Portfolio Button */}
          <button
            onClick={onSwitchToPortfolio}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-colors flex items-center gap-1.5 shrink-0"
            title="Switch back to your Personal Portfolio"
          >
            <span>My Personal Website</span>
            <ExternalLink className="w-3 h-3 text-teal-400" />
          </button>

          {/* User Account Button */}
          <button
            onClick={() => setIsAuthOpen(true)}
            className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-lg bg-purple-950/60 border border-purple-800/60 hover:bg-purple-900/40 text-purple-200 transition-colors shrink-0"
            title="Switch User Role / Account"
          >
            <div className="w-6 h-6 rounded-full overflow-hidden bg-slate-800 shrink-0">
              <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
            </div>
            <span className="text-xs font-bold text-white hidden sm:inline">{currentUser.name}</span>
            <span className="text-[10px] text-emerald-400 font-mono uppercase hidden md:inline">({currentUser.role})</span>
          </button>
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row gap-8">
        {/* Left Desktop Sidebar Navigation */}
        <aside className="hidden md:flex flex-col w-56 space-y-6 shrink-0">
          <nav className="space-y-1">
            {[
              { id: 'home', label: 'Home', icon: Home },
              { id: 'search', label: 'Search & Explore', icon: Compass },
              { id: 'library', label: 'Your Library', icon: Library },
              { id: 'promotion', label: 'Artist Promotion', icon: Sparkles },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Artist Upload Trigger */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-950/60 to-slate-900 border border-purple-900/40 space-y-3">
            <div className="flex items-center gap-2">
              <Upload className="w-4 h-4 text-emerald-400" />
              <h4 className="text-xs font-bold text-white">For Musicians</h4>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Upload your own original audio tracks. Free distribution with zero cuts.
            </p>
            <button
              onClick={() => setIsUploadOpen(true)}
              className="w-full py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-emerald-900/30"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Submit Song</span>
            </button>
          </div>

          {/* Admin Control Link */}
          <div className="pt-4 border-t border-slate-900">
            <button
              onClick={() => setActiveTab('admin')}
              className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'admin'
                  ? 'bg-slate-800 text-emerald-400 border border-emerald-800/60'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-purple-400" />
                <span>Admin Console</span>
              </span>
              <span className="text-[10px] text-slate-500 font-mono">Mod</span>
            </button>
          </div>

          {/* Monetization Ready Info Box */}
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-[11px] text-slate-400">
            <p className="font-semibold text-white mb-1">Monetization Ready</p>
            <p>Built for voluntary tipping, artist spotlighting, and zero-fee hosting.</p>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0">
          {/* TAB 1: HOME */}
          {activeTab === 'home' && (
            <div className="space-y-10">
              {/* Hero Spotlight: Synthwave Odyssey by Ronny */}
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-purple-950 via-slate-900 to-emerald-950 p-6 sm:p-10 border border-purple-800/50 shadow-2xl">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-8 space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        Featured Creator Release
                      </span>
                      <span className="text-xs text-emerald-400 font-mono">Top Trending #1</span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                      Synthwave Odyssey
                    </h2>
                    <p className="text-sm font-semibold text-purple-300">
                      By Ronny · Album: Neon Dreams & Geometric Skies
                    </p>
                    <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
                      Immerse yourself in lush retro-futuristic synthesizer leads, driving basslines, and hypnotic arpeggios produced by Ronny. 100% royalty-free under Creative Commons.
                    </p>

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <button
                        onClick={() => handlePlaySong(songs[0])}
                        className="px-6 py-3 text-xs sm:text-sm font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2"
                      >
                        {currentSong?.id === songs[0].id && isPlaying ? (
                          <>
                            <Pause className="w-4 h-4 fill-current" />
                            <span>Pause Track</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4 fill-current ml-0.5" />
                            <span>Play Track Now</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => setIsPromoteOpen(true)}
                        className="px-5 py-3 text-xs sm:text-sm font-semibold text-white bg-purple-900/60 hover:bg-purple-800 border border-purple-700/60 rounded-xl transition-colors flex items-center gap-2"
                      >
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        <span>Promote Your Song</span>
                      </button>

                      <button
                        onClick={() => setTipTarget(songs[0])}
                        className="px-4 py-3 text-xs font-semibold text-purple-300 hover:text-white transition-colors flex items-center gap-1.5"
                      >
                        <Coins className="w-4 h-4 text-purple-400" />
                        <span>Tip Ronny</span>
                      </button>
                    </div>
                  </div>

                  <div className="md:col-span-4 flex justify-center md:justify-end">
                    <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden shadow-2xl shadow-purple-900/60 border border-purple-700/40 group">
                      <img
                        src="/src/assets/images/album_neon_echoes_1793189389347.jpg"
                        alt="Synthwave Odyssey Cover"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Native Artist Advertisement / Monetization Banner */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                    <Coins className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-500">Sponsored Creator Spotlight</span>
                    <p className="text-xs font-bold text-white">Direct Artist Support: 100% of Listener Tips Go to Creators</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsPromoteOpen(true)}
                  className="px-4 py-2 text-xs font-bold text-purple-300 hover:text-white bg-slate-900 hover:bg-slate-800 rounded-lg border border-purple-900/60 whitespace-nowrap"
                >
                  Explore Promotion Plans
                </button>
              </div>

              {/* Trending Tracks Section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Flame className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-lg font-bold text-white">Trending Tracks on Ronny Music</h3>
                  </div>
                  <button
                    onClick={() => setActiveTab('search')}
                    className="text-xs text-purple-400 hover:text-purple-300 font-semibold"
                  >
                    View All Tracks &rarr;
                  </button>
                </div>

                <div className="space-y-1.5 bg-slate-950/70 p-2 sm:p-3 rounded-2xl border border-slate-800/80">
                  {trendingSongs.slice(0, 5).map((song, idx) => (
                    <SongRow
                      key={song.id}
                      song={song}
                      index={idx}
                      isCurrent={currentSong?.id === song.id}
                      isPlaying={isPlaying}
                      isLiked={currentUser.likedSongIds.includes(song.id)}
                      onPlay={handlePlaySong}
                      onToggleLike={handleToggleLike}
                      onAddToPlaylist={() => showToast(`Added "${song.title}" to queue`)}
                      onOpenTip={(s) => setTipTarget(s)}
                      onReportCopyright={(s) => setReportTargetSong(s)}
                    />
                  ))}
                </div>
              </div>

              {/* Featured Artists Grid */}
              <div>
                <h3 className="text-lg font-bold text-white mb-4">
                  Independent Musicians & Producers
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {artists.map((artist) => (
                    <div
                      key={artist.id}
                      className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-purple-800/60 transition-all flex flex-col items-center text-center group"
                    >
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden mb-3 border-2 border-purple-500/30 group-hover:scale-105 transition-transform">
                        <img src={artist.avatarUrl} alt={artist.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex items-center gap-1">
                        <h4 className="text-sm font-bold text-white truncate max-w-[120px]">{artist.name}</h4>
                        {artist.verified && <span className="text-emerald-400 text-xs">✓</span>}
                      </div>
                      <p className="text-[11px] text-purple-400 mt-0.5">{artist.genres.join(' · ')}</p>
                      <p className="text-[10px] text-slate-500 mt-1 font-mono">
                        {artist.monthlyListeners.toLocaleString()} monthly listeners
                      </p>

                      <button
                        onClick={() => setTipTarget(artist)}
                        className="mt-3 px-3 py-1 text-[11px] font-semibold rounded-lg bg-slate-900 hover:bg-purple-950 text-purple-300 border border-purple-900/60 transition-colors flex items-center gap-1"
                      >
                        <Coins className="w-3 h-3 text-purple-400" />
                        <span>Support Artist</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SEARCH & EXPLORE */}
          {activeTab === 'search' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Search Catalog</h2>
                <p className="text-xs text-slate-400">Browse free, independent music by genre, title, or artist.</p>
              </div>

              {/* Mobile Search input */}
              <div className="relative md:hidden">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search tracks, artists..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 text-xs bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              {/* Genre Filter Pills */}
              <div className="flex flex-wrap gap-2">
                {genres.map((g) => (
                  <button
                    key={g}
                    onClick={() => setSelectedGenre(g)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors capitalize ${
                      selectedGenre === g
                        ? 'bg-purple-600 text-white'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {g === 'all' ? 'All Genres' : g}
                  </button>
                ))}
              </div>

              {/* Filtered Tracklist */}
              <div className="space-y-1.5 bg-slate-950/70 p-3 rounded-2xl border border-slate-800/80">
                {filteredSongs.length === 0 ? (
                  <div className="py-12 text-center text-xs text-slate-500">
                    No songs found matching "{searchQuery}". Try another keyword or genre!
                  </div>
                ) : (
                  filteredSongs.map((song, idx) => (
                    <SongRow
                      key={song.id}
                      song={song}
                      index={idx}
                      isCurrent={currentSong?.id === song.id}
                      isPlaying={isPlaying}
                      isLiked={currentUser.likedSongIds.includes(song.id)}
                      onPlay={handlePlaySong}
                      onToggleLike={handleToggleLike}
                      onAddToPlaylist={() => showToast(`Added "${song.title}" to queue`)}
                      onOpenTip={(s) => setTipTarget(s)}
                      onReportCopyright={(s) => setReportTargetSong(s)}
                    />
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 3: LIBRARY & PLAYLISTS */}
          {activeTab === 'library' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">Your Music Library</h2>
                  <p className="text-xs text-slate-400">Playlists, favorites, and tracks you have uploaded.</p>
                </div>
                <button
                  onClick={() => setIsUploadOpen(true)}
                  className="px-4 py-2 text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 rounded-lg flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Upload Audio</span>
                </button>
              </div>

              {/* Liked Songs Strip */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/70 to-slate-900 border border-purple-800/40">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                    <Heart className="w-6 h-6 fill-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Liked Songs</h3>
                    <p className="text-xs text-slate-400">{likedSongs.length} favorites saved</p>
                  </div>
                </div>

                {likedSongs.length === 0 ? (
                  <p className="text-xs text-slate-500 py-4">No liked songs yet. Click the heart icon on any song to save it here!</p>
                ) : (
                  <div className="space-y-1">
                    {likedSongs.map((song, idx) => (
                      <SongRow
                        key={song.id}
                        song={song}
                        index={idx}
                        isCurrent={currentSong?.id === song.id}
                        isPlaying={isPlaying}
                        isLiked={true}
                        onPlay={handlePlaySong}
                        onToggleLike={handleToggleLike}
                        onAddToPlaylist={() => {}}
                        onOpenTip={(s) => setTipTarget(s)}
                        onReportCopyright={(s) => setReportTargetSong(s)}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Playlists Grid */}
              <div>
                <h3 className="text-base font-bold text-white mb-4">Curated Playlists</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {playlists.map((pl) => (
                    <div
                      key={pl.id}
                      className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-800 transition-colors cursor-pointer group"
                      onClick={() => {
                        const firstSong = songs.find(s => pl.songIds.includes(s.id));
                        if (firstSong) handlePlaySong(firstSong);
                      }}
                    >
                      <div className="aspect-square rounded-lg overflow-hidden bg-slate-900 mb-3 border border-slate-800 relative">
                        <img src={pl.coverUrl} alt={pl.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="w-10 h-10 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center font-bold">
                            <Play className="w-5 h-5 fill-slate-950 ml-0.5" />
                          </span>
                        </div>
                      </div>
                      <h4 className="text-sm font-bold text-white truncate">{pl.title}</h4>
                      <p className="text-xs text-slate-400 line-clamp-2 mt-0.5">{pl.description}</p>
                      <p className="text-[10px] text-purple-400 mt-2 font-mono">{pl.songIds.length} tracks · By {pl.createdBy}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: ARTIST PROMOTION HUB */}
          {activeTab === 'promotion' && (
            <div className="space-y-8">
              <div className="p-8 rounded-3xl bg-gradient-to-br from-purple-950 via-slate-900 to-emerald-950 border border-purple-800/50 space-y-4">
                <span className="text-xs font-mono uppercase text-emerald-400 font-bold">
                  Independent Artist Promotion Program
                </span>
                <h2 className="text-3xl font-extrabold text-white">
                  Grow Your Audience on Ronny Music
                </h2>
                <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
                  We believe independent creators shouldn't have to navigate exploitative record labels. Our promotion plans provide transparent, guaranteed discovery across the homepage, search feeds, and curated studio playlists.
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => setIsPromoteOpen(true)}
                    className="px-6 py-3 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-emerald-600 hover:from-purple-500 hover:to-emerald-500 rounded-xl transition-all shadow-lg shadow-purple-600/30 flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Launch Campaign (Review Prices & Plans)</span>
                  </button>
                </div>
              </div>

              {/* Promotion Plans Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { name: "Starter Boost", price: 15, duration: "7 Days", badge: "Emerging Artists", perks: ["New Releases carousel", "Artist profile link", "Weekly play stats"] },
                  { name: "Featured Spotlight", price: 35, duration: "14 Days", badge: "Most Popular", perks: ["Top 3 slot in Trending Tracks", "Curated playlist addition", "Verified artist checkmark", "Audience retention insights"], best: true },
                  { name: "Homepage Takeover", price: 75, duration: "30 Days", badge: "Full Reach", perks: ["Full-width hero header showcase", "Direct 1-click play button", "Permanent verification mark", "Direct listener tip highlight"] },
                ].map((plan, i) => (
                  <div key={i} className={`p-6 rounded-2xl bg-slate-950 border flex flex-col justify-between ${plan.best ? 'border-purple-500 ring-1 ring-purple-500/50' : 'border-slate-800'}`}>
                    <div>
                      <span className="text-xs font-mono text-emerald-400 font-bold">{plan.badge}</span>
                      <h3 className="text-xl font-bold text-white mt-1">{plan.name}</h3>
                      <div className="text-3xl font-black text-white font-mono my-3 tabular-nums">
                        ${plan.price}
                        <span className="text-xs text-slate-400 font-normal"> / {plan.duration}</span>
                      </div>
                      <ul className="space-y-2 text-xs text-slate-300 pt-3 border-t border-slate-800">
                        {plan.perks.map((p, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      onClick={() => setIsPromoteOpen(true)}
                      className={`mt-6 w-full py-2.5 text-xs font-bold rounded-xl transition-all ${
                        plan.best
                          ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-600/30'
                          : 'bg-slate-900 hover:bg-slate-800 text-purple-300 border border-slate-800'
                      }`}
                    >
                      Configure Campaign
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: ADMIN DASHBOARD */}
          {activeTab === 'admin' && (
            <AdminDashboard
              songs={songs}
              artists={artists}
              reports={reports}
              promotions={promotions}
              currentSong={currentSong}
              isPlaying={isPlaying}
              onPlaySong={handlePlaySong}
              onApproveSong={handleApproveSong}
              onRejectSong={handleRejectSong}
              onDeleteSong={handleDeleteSong}
              onResolveReport={handleResolveReport}
              onApprovePromotion={handleApprovePromotion}
              onToggleArtistVerified={handleToggleArtistVerified}
            />
          )}
        </main>
      </div>

      {/* Persistent Bottom Music Player */}
      <MusicPlayerBar
        currentSong={currentSong}
        isPlaying={isPlaying}
        isLiked={currentSong ? currentUser.likedSongIds.includes(currentSong.id) : false}
        onTogglePlay={handleTogglePlay}
        onPrev={handlePrev}
        onNext={handleNext}
        onToggleLike={handleToggleLike}
        onOpenTip={(s) => setTipTarget(s)}
      />

      {/* Mobile Bottom Dock (under 15% height, thumb accessible) */}
      <nav aria-label="Mobile music navigation" className="md:hidden fixed bottom-16 left-0 right-0 z-30 bg-slate-950/95 backdrop-blur-md border-t border-purple-900/40 px-3 py-1.5 flex items-center justify-around text-slate-400">
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center py-1 px-2 ${activeTab === 'home' ? 'text-emerald-400 font-bold' : ''}`}
        >
          <Home className="w-4 h-4" />
          <span className="text-[10px] mt-0.5">Home</span>
        </button>

        <button
          onClick={() => setActiveTab('search')}
          className={`flex flex-col items-center py-1 px-2 ${activeTab === 'search' ? 'text-emerald-400 font-bold' : ''}`}
        >
          <Search className="w-4 h-4" />
          <span className="text-[10px] mt-0.5">Search</span>
        </button>

        <button
          onClick={() => setActiveTab('library')}
          className={`flex flex-col items-center py-1 px-2 ${activeTab === 'library' ? 'text-emerald-400 font-bold' : ''}`}
        >
          <Library className="w-4 h-4" />
          <span className="text-[10px] mt-0.5">Library</span>
        </button>

        <button
          onClick={() => setIsUploadOpen(true)}
          className="flex flex-col items-center py-1 px-2 text-purple-400"
        >
          <Upload className="w-4 h-4" />
          <span className="text-[10px] mt-0.5">Upload</span>
        </button>

        <button
          onClick={() => setActiveTab('admin')}
          className={`flex flex-col items-center py-1 px-2 ${activeTab === 'admin' ? 'text-emerald-400 font-bold' : ''}`}
        >
          <Shield className="w-4 h-4" />
          <span className="text-[10px] mt-0.5">Admin</span>
        </button>
      </nav>

      {/* Interactive Modals */}
      <UploadSongModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        currentUser={currentUser}
        onSongUploaded={handleSongUploaded}
      />

      <TipArtistModal
        isOpen={!!tipTarget}
        onClose={() => setTipTarget(null)}
        target={tipTarget}
        onTipSent={handleTipSent}
      />

      <PromoteSongModal
        isOpen={isPromoteOpen}
        onClose={() => setIsPromoteOpen(false)}
        songs={songs}
        onCampaignSubmitted={handleCampaignSubmitted}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        currentUser={currentUser}
        onSelectUser={(u) => {
          setCurrentUser(u);
          showToast(`Logged in as ${u.name} (${u.role})`);
        }}
      />

      <ReportCopyrightModal
        isOpen={!!reportTargetSong}
        onClose={() => setReportTargetSong(null)}
        song={reportTargetSong}
        onReportSubmitted={(rep) => {
          setReports([rep, ...reports]);
          showToast('Copyright report sent to Admin Console.');
        }}
      />
    </div>
  );
};
