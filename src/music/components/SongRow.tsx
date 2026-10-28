import React, { useState } from 'react';
import { Play, Pause, Heart, MoreVertical, Plus, Coins, Flag, Check } from 'lucide-react';
import { Song } from '../types';

interface SongRowProps {
  song: Song;
  index: number;
  isCurrent: boolean;
  isPlaying: boolean;
  isLiked: boolean;
  onPlay: (song: Song) => void;
  onToggleLike: (songId: string) => void;
  onAddToPlaylist: (song: Song) => void;
  onOpenTip: (song: Song) => void;
  onReportCopyright: (song: Song) => void;
}

export const SongRow: React.FC<SongRowProps> = ({
  song,
  index,
  isCurrent,
  isPlaying,
  isLiked,
  onPlay,
  onToggleLike,
  onAddToPlaylist,
  onOpenTip,
  onReportCopyright
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const formatDuration = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div
      onClick={() => onPlay(song)}
      className={`group relative flex items-center justify-between p-2.5 sm:p-3 rounded-xl transition-all duration-200 cursor-pointer ${
        isCurrent
          ? 'bg-purple-950/60 border border-purple-800/60 text-white'
          : 'hover:bg-slate-900/80 text-slate-300 border border-transparent'
      }`}
    >
      {/* Left: Index / Play Icon & Track Details */}
      <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
        <span className="w-5 text-center text-xs font-mono text-slate-500 group-hover:hidden">
          {isCurrent && isPlaying ? (
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
          ) : (
            index + 1
          )}
        </span>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onPlay(song);
          }}
          className="hidden group-hover:flex w-5 items-center justify-center text-purple-400 hover:text-emerald-400"
        >
          {isCurrent && isPlaying ? (
            <Pause className="w-4 h-4 fill-current" />
          ) : (
            <Play className="w-4 h-4 fill-current" />
          )}
        </button>

        {/* Thumbnail */}
        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg overflow-hidden bg-slate-800 shrink-0 border border-slate-800">
          <img
            src={song.coverUrl}
            alt={song.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Title & Artist */}
        <div className="min-w-0 flex-1 pr-2">
          <p className={`text-xs sm:text-sm font-bold truncate ${isCurrent ? 'text-emerald-400' : 'text-white'}`}>
            {song.title}
          </p>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 truncate">
            <span>{song.artist}</span>
            <span className="text-slate-600">·</span>
            <span className="hidden sm:inline">{song.album}</span>
            {song.isUserUploaded && (
              <span className="ml-1 text-[10px] text-purple-300 bg-purple-950 px-1.5 py-0.2 rounded border border-purple-800">
                Uploaded Track
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Right: Plays, Duration, Like & Action Menu */}
      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        <span className="hidden md:inline text-xs font-mono text-slate-500 tabular-nums">
          {song.playCount.toLocaleString()} plays
        </span>

        <span className="text-xs font-mono text-slate-400 tabular-nums">
          {formatDuration(song.duration)}
        </span>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleLike(song.id);
          }}
          className={`p-1.5 rounded-full transition-colors ${
            isLiked ? 'text-emerald-400' : 'text-slate-500 hover:text-white'
          }`}
          title={isLiked ? "Unlike" : "Like"}
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-emerald-400' : ''}`} />
        </button>

        {/* Context Menu Trigger */}
        <div className="relative">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen(!menuOpen);
            }}
            className="p-1.5 text-slate-500 hover:text-white rounded-full transition-colors"
          >
            <MoreVertical className="w-4 h-4" />
          </button>

          {menuOpen && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 top-full mt-1 w-48 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl p-1 z-30 animate-in fade-in duration-150"
            >
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onAddToPlaylist(song);
                }}
                className="w-full px-3 py-2 text-left text-xs text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg flex items-center gap-2"
              >
                <Plus className="w-3.5 h-3.5 text-emerald-400" />
                <span>Add to Playlist</span>
              </button>

              <button
                onClick={() => {
                  setMenuOpen(false);
                  onOpenTip(song);
                }}
                className="w-full px-3 py-2 text-left text-xs text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg flex items-center gap-2"
              >
                <Coins className="w-3.5 h-3.5 text-purple-400" />
                <span>Send Tip to Artist</span>
              </button>

              <button
                onClick={() => {
                  setMenuOpen(false);
                  onReportCopyright(song);
                }}
                className="w-full px-3 py-2 text-left text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 rounded-lg flex items-center gap-2"
              >
                <Flag className="w-3.5 h-3.5" />
                <span>Report Copyright Issue</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
