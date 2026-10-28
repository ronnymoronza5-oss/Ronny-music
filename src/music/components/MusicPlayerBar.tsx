import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Heart, Repeat, Shuffle, Maximize2, Minimize2, Coins, ChevronUp, ChevronDown } from 'lucide-react';
import { Song } from '../types';
import { audioEngine } from '../audioEngine';

interface MusicPlayerBarProps {
  currentSong: Song | null;
  isPlaying: boolean;
  isLiked: boolean;
  onTogglePlay: () => void;
  onPrev: () => void;
  onNext: () => void;
  onToggleLike: (songId: string) => void;
  onOpenTip: (song: Song) => void;
}

export const MusicPlayerBar: React.FC<MusicPlayerBarProps> = ({
  currentSong,
  isPlaying,
  isLiked,
  onTogglePlay,
  onPrev,
  onNext,
  onToggleLike,
  onOpenTip
}) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(180);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [isExpandedMobile, setIsExpandedMobile] = useState(false);

  useEffect(() => {
    audioEngine.setCallbacks(
      (curr, dur) => {
        setCurrentTime(curr);
        setDuration(dur || 180);
      },
      (playing) => {
        // handled in parent or synced
      },
      () => {
        onNext();
      }
    );
  }, [onNext]);

  if (!currentSong) return null;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setCurrentTime(val);
    audioEngine.seek(val);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    setIsMuted(val === 0);
    audioEngine.setVolume(val);
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      audioEngine.setVolume(volume || 0.8);
    } else {
      setIsMuted(true);
      audioEngine.setVolume(0);
    }
  };

  return (
    <>
      {/* Bottom Sticky Player Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-xl border-t border-purple-900/40 shadow-2xl px-3 sm:px-6 py-2.5 sm:py-3 text-slate-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-6">
          {/* Left: Track Information */}
          <div className="flex items-center gap-3 min-w-0 max-w-[200px] sm:max-w-xs">
            <div
              onClick={() => setIsExpandedMobile(!isExpandedMobile)}
              className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-lg overflow-hidden bg-slate-900 border border-purple-900/50 shrink-0 cursor-pointer group"
            >
              <img
                src={currentSong.coverUrl}
                alt={currentSong.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
            </div>

            <div className="min-w-0">
              <p
                onClick={() => setIsExpandedMobile(!isExpandedMobile)}
                className="text-xs sm:text-sm font-bold text-white truncate cursor-pointer hover:text-purple-300 transition-colors"
              >
                {currentSong.title}
              </p>
              <p className="text-[11px] text-slate-400 truncate">
                {currentSong.artist}
              </p>
            </div>

            {/* Like & Tip buttons */}
            <div className="hidden sm:flex items-center gap-1.5 ml-2">
              <button
                type="button"
                onClick={() => onToggleLike(currentSong.id)}
                className={`p-1.5 rounded-full transition-colors ${
                  isLiked ? 'text-emerald-400 hover:text-emerald-300' : 'text-slate-400 hover:text-white'
                }`}
                title={isLiked ? "Unlike" : "Add to Liked Songs"}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-emerald-400' : ''}`} />
              </button>

              <button
                type="button"
                onClick={() => onOpenTip(currentSong)}
                className="p-1.5 rounded-full text-slate-400 hover:text-purple-300 transition-colors"
                title="Send voluntary tip to artist"
              >
                <Coins className="w-4 h-4 text-purple-400" />
              </button>
            </div>
          </div>

          {/* Center: Playback Controls & Seek bar */}
          <div className="flex-1 max-w-xl flex flex-col items-center gap-1">
            <div className="flex items-center gap-3 sm:gap-5">
              <button
                type="button"
                onClick={() => setIsShuffling(!isShuffling)}
                className={`hidden sm:inline-flex p-1.5 rounded-full transition-colors ${
                  isShuffling ? 'text-emerald-400' : 'text-slate-500 hover:text-slate-300'
                }`}
                title="Shuffle"
              >
                <Shuffle className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={onPrev}
                className="p-1.5 rounded-full text-slate-300 hover:text-white transition-colors"
                title="Previous track"
              >
                <SkipBack className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <button
                type="button"
                onClick={onTogglePlay}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-purple-600 to-emerald-500 text-white flex items-center justify-center hover:scale-105 transition-all shadow-lg shadow-purple-600/30"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 fill-white" />
                ) : (
                  <Play className="w-4 h-4 fill-white ml-0.5" />
                )}
              </button>

              <button
                type="button"
                onClick={onNext}
                className="p-1.5 rounded-full text-slate-300 hover:text-white transition-colors"
                title="Next track"
              >
                <SkipForward className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <button
                type="button"
                onClick={() => setIsLooping(!isLooping)}
                className={`hidden sm:inline-flex p-1.5 rounded-full transition-colors ${
                  isLooping ? 'text-emerald-400' : 'text-slate-500 hover:text-slate-300'
                }`}
                title="Repeat"
              >
                <Repeat className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Seek Bar */}
            <div className="w-full flex items-center gap-2 text-[10px] sm:text-xs font-mono text-slate-400">
              <span className="w-9 text-right tabular-nums">{formatTime(currentTime)}</span>
              <input
                type="range"
                min={0}
                max={duration || 100}
                step={0.5}
                value={currentTime}
                onChange={handleSeek}
                className="flex-1 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500 hover:accent-emerald-400 transition-all"
              />
              <span className="w-9 tabular-nums">{formatTime(duration)}</span>
            </div>
          </div>

          {/* Right: Volume & Expand View */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="hidden md:flex items-center gap-2">
              <button
                type="button"
                onClick={toggleMute}
                className="text-slate-400 hover:text-white transition-colors"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-20 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>

            {/* Mobile Expand / Collapse Button */}
            <button
              type="button"
              onClick={() => setIsExpandedMobile(!isExpandedMobile)}
              className="sm:hidden p-2 text-slate-400 hover:text-white"
              title="Expand Player"
            >
              {isExpandedMobile ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Mobile Player Sheet */}
      {isExpandedMobile && (
        <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col p-6 animate-in slide-in-from-bottom duration-300 sm:hidden">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => setIsExpandedMobile(false)}
              className="p-2 text-slate-400 hover:text-white"
            >
              <ChevronDown className="w-6 h-6" />
            </button>
            <span className="text-xs font-semibold uppercase tracking-wider text-purple-400">
              Now Playing
            </span>
            <button
              onClick={() => onOpenTip(currentSong)}
              className="p-2 text-purple-400 hover:text-purple-300"
              title="Tip Artist"
            >
              <Coins className="w-5 h-5" />
            </button>
          </div>

          {/* Album Artwork */}
          <div className="flex-1 flex items-center justify-center mb-8">
            <div className="w-64 h-64 rounded-2xl overflow-hidden shadow-2xl shadow-purple-900/50 border border-purple-800/40">
              <img
                src={currentSong.coverUrl}
                alt={currentSong.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Track Info & Like */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-white">{currentSong.title}</h2>
              <p className="text-sm text-purple-300 mt-0.5">{currentSong.artist}</p>
              <p className="text-xs text-slate-500 mt-0.5">{currentSong.album} · {currentSong.genre}</p>
            </div>
            <button
              onClick={() => onToggleLike(currentSong.id)}
              className={`p-2.5 rounded-full transition-colors ${
                isLiked ? 'text-emerald-400 bg-emerald-950/60' : 'text-slate-400 bg-slate-900'
              }`}
            >
              <Heart className={`w-6 h-6 ${isLiked ? 'fill-emerald-400' : ''}`} />
            </button>
          </div>

          {/* Seek Bar */}
          <div className="mb-6">
            <input
              type="range"
              min={0}
              max={duration || 100}
              step={0.5}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
            <div className="flex justify-between text-xs font-mono text-slate-400 mt-2">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-around mb-8">
            <button
              onClick={() => setIsShuffling(!isShuffling)}
              className={`p-2 transition-colors ${isShuffling ? 'text-emerald-400' : 'text-slate-500'}`}
            >
              <Shuffle className="w-5 h-5" />
            </button>
            <button onClick={onPrev} className="p-3 text-white">
              <SkipBack className="w-7 h-7" />
            </button>
            <button
              onClick={onTogglePlay}
              className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-emerald-500 text-white flex items-center justify-center shadow-lg shadow-purple-600/40"
            >
              {isPlaying ? (
                <Pause className="w-7 h-7 fill-white" />
              ) : (
                <Play className="w-7 h-7 fill-white ml-1" />
              )}
            </button>
            <button onClick={onNext} className="p-3 text-white">
              <SkipForward className="w-7 h-7" />
            </button>
            <button
              onClick={() => setIsLooping(!isLooping)}
              className={`p-2 transition-colors ${isLooping ? 'text-emerald-400' : 'text-slate-500'}`}
            >
              <Repeat className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
