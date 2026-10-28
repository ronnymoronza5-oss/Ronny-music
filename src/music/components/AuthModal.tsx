import React, { useState } from 'react';
import { X, User, Shield, Music, Check, ArrowRight } from 'lucide-react';
import { UserAccount, UserRole } from '../types';
import { DEFAULT_USERS } from '../data';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserAccount;
  onSelectUser: (user: UserAccount) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onSelectUser
}) => {
  const [mode, setMode] = useState<'switch' | 'register'>('switch');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>('artist');
  const [isArtist, setIsArtist] = useState(false);

  if (!isOpen) return null;

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    const newUser: UserAccount = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      role: role,
      avatar: '/src/assets/images/artist_ronny_1793189391168.jpg',
      isArtist: role === 'artist' || isArtist,
      artistName: role === 'artist' ? name.trim() : undefined,
      likedSongIds: [],
      customPlaylists: []
    };

    onSelectUser(newUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md rounded-2xl bg-slate-900 border border-purple-900/50 p-6 shadow-2xl text-left text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-white">Ronny Music Accounts</h3>
            <p className="text-xs text-purple-400">Switch role or create your artist profile</p>
          </div>
          <button onClick={onClose} className="w-7 h-7 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mode Selector */}
        <div className="flex p-1 bg-slate-950 rounded-lg mb-4 border border-slate-800">
          <button
            onClick={() => setMode('switch')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              mode === 'switch' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Quick Profile Switch
          </button>
          <button
            onClick={() => setMode('register')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              mode === 'register' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Create Account
          </button>
        </div>

        {mode === 'switch' ? (
          <div className="space-y-3">
            <p className="text-xs text-slate-400 mb-2">
              Select an account to test different permission roles instantly:
            </p>

            {DEFAULT_USERS.map((user) => {
              const isSelected = currentUser.id === user.id;
              return (
                <div
                  key={user.id}
                  onClick={() => {
                    onSelectUser(user);
                    onClose();
                  }}
                  className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-purple-950/60 border-purple-500 shadow-md ring-1 ring-purple-500'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-800 shrink-0 border border-slate-700">
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs font-bold text-white truncate">{user.name}</p>
                      <span className={`px-1.5 py-0.2 rounded text-[10px] font-mono uppercase ${
                        user.role === 'admin'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          : user.role === 'artist'
                          ? 'bg-purple-950 text-purple-300 border border-purple-800'
                          : 'bg-slate-900 text-slate-400 border border-slate-700'
                      }`}>
                        {user.role}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-emerald-400 shrink-0" />}
                </div>
              );
            })}
          </div>
        ) : (
          <form onSubmit={handleRegister} className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Your Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ronny or DJ Groove"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ronnymoronza5@gmail.com"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Account Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-purple-500"
              >
                <option value="fan">Fan / Music Listener</option>
                <option value="artist">Independent Artist / Producer</option>
                <option value="admin">Platform Administrator</option>
              </select>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-2.5 font-bold text-white bg-gradient-to-r from-purple-600 to-emerald-600 hover:from-purple-500 hover:to-emerald-500 rounded-lg transition-all"
              >
                Create Account & Sign In
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
