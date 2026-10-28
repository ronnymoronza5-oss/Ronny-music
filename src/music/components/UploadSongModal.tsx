import React, { useState } from 'react';
import { X, Upload, Music, Image as ImageIcon, Check, AlertCircle, ShieldCheck } from 'lucide-react';
import { Song, UserAccount } from '../types';

interface UploadSongModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserAccount;
  onSongUploaded: (newSong: Song) => void;
}

export const UploadSongModal: React.FC<UploadSongModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onSongUploaded
}) => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState(currentUser.artistName || currentUser.name || 'Ronny');
  const [album, setAlbum] = useState('Independent Single 2026');
  const [genre, setGenre] = useState('Electronic');
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState<string>('');
  const [coverUrl, setCoverUrl] = useState<string>('/src/assets/images/album_neon_echoes_1793189389347.jpg');
  const [coverFileName, setCoverFileName] = useState<string>('');
  const [hasRights, setHasRights] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  if (!isOpen) return null;

  const handleAudioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.includes('audio') && !file.name.match(/\.(mp3|wav|ogg|m4a|aac)$/i)) {
        setErrorMsg('Please select a valid audio file (.mp3, .wav, .ogg, .m4a).');
        return;
      }
      setAudioFile(file);
      const url = URL.createObjectURL(file);
      setAudioUrl(url);
      setErrorMsg(null);
      if (!title) {
        setTitle(file.name.replace(/\.[^/.]+$/, ''));
      }
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCoverUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMsg('Please enter a song title.');
      return;
    }
    if (!hasRights) {
      setErrorMsg('You must certify that you own or have permission to distribute this audio.');
      return;
    }

    setIsUploading(true);

    setTimeout(() => {
      const newSong: Song = {
        id: `song-upload-${Date.now()}`,
        title: title.trim(),
        artist: artist.trim() || 'Independent Artist',
        artistId: currentUser.id,
        album: album.trim() || 'Single',
        duration: 180, // estimated if metadata not yet probed
        coverUrl: coverUrl,
        genre: genre,
        playCount: 1,
        likesCount: 1,
        audioUrl: audioUrl || undefined,
        synthTrackType: genre.toLowerCase().includes('jazz') ? 'jazz' : genre.toLowerCase().includes('afro') ? 'afrobeat' : 'synthwave',
        isUserUploaded: true,
        status: 'approved',
        uploadedAt: new Date().toISOString().split('T')[0],
        license: 'Uploaded with Certified Distribution Rights'
      };

      onSongUploaded(newSong);
      setIsUploading(false);
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto rounded-2xl bg-slate-900 border border-purple-900/40 p-6 sm:p-8 shadow-2xl text-left text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-xs uppercase tracking-wider text-emerald-400 font-bold">
                Artist Submission Portal
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Upload Your Music
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Distribute your music to thousands of listeners for free on Ronny Music.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {errorMsg && (
          <div className="p-3 mb-4 rounded-xl bg-rose-950/80 border border-rose-500/50 text-rose-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Audio File Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Audio File (.mp3, .wav, .ogg, .m4a) <span className="text-purple-400">*</span>
            </label>
            <div className="relative border-2 border-dashed border-slate-700 hover:border-purple-500 rounded-xl p-4 text-center cursor-pointer transition-colors bg-slate-950/60">
              <input
                type="file"
                accept="audio/*"
                onChange={handleAudioChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center">
                <Music className="w-6 h-6 text-purple-400 mb-1.5" />
                <p className="text-xs font-bold text-white">
                  {audioFile ? audioFile.name : 'Click to browse audio file'}
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {audioFile ? `${(audioFile.size / (1024 * 1024)).toFixed(2)} MB` : 'Plays directly in browser HTML5 audio'}
                </p>
              </div>
            </div>
          </div>

          {/* Grid: Song Title & Artist */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Song Title <span className="text-purple-400">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Midnight Mirage"
                className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Artist Name <span className="text-purple-400">*</span>
              </label>
              <input
                type="text"
                required
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                placeholder="e.g. Ronny or Your Artist Alias"
                className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          {/* Grid: Album & Genre */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Album or Single Name
              </label>
              <input
                type="text"
                value={album}
                onChange={(e) => setAlbum(e.target.value)}
                placeholder="Single release"
                className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Genre
              </label>
              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-purple-500"
              >
                <option value="Electronic">Electronic / Synthwave</option>
                <option value="Afrobeat">Afrobeat / Afro-Pop</option>
                <option value="Lo-Fi">Lo-Fi / Chillout</option>
                <option value="Jazz">Jazz / Lounge</option>
                <option value="Hip-Hop">Hip-Hop / Rap</option>
                <option value="Ambient">Ambient / Instrumental</option>
                <option value="Pop">Indie Pop / Rock</option>
              </select>
            </div>
          </div>

          {/* Cover Artwork File Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Cover Artwork (Optional)
            </label>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-950 border border-slate-800 shrink-0">
                <img src={coverUrl} alt="Cover preview" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="text-xs text-slate-400 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-slate-800 file:text-purple-300 hover:file:bg-slate-700"
                />
                <p className="text-[10px] text-slate-500 mt-1">Recommended square 1:1 image</p>
              </div>
            </div>
          </div>

          {/* Copyright Declaration (Strict requirement #5 & #12) */}
          <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-800/40">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={hasRights}
                onChange={(e) => setHasRights(e.target.checked)}
                className="mt-0.5 accent-emerald-500 rounded"
              />
              <span className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-white">Copyright & Licensing Warranty: </strong>
                I legally verify that I own 100% of the distribution rights for this audio or hold express permission from the copyright owner. I understand that unauthorized commercial tracks will be immediately taken down.
              </span>
            </label>
          </div>

          {/* Submit Actions */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUploading}
              className="px-6 py-2.5 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-emerald-600 hover:from-purple-500 hover:to-emerald-500 disabled:opacity-50 rounded-lg transition-all flex items-center gap-2 shadow-lg shadow-purple-600/20"
            >
              {isUploading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Processing Upload...</span>
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  <span>Publish to Ronny Music</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
