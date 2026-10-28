export type SynthTrackType = 'synthwave' | 'jazz' | 'afrobeat' | 'lofi' | 'ambient';

export interface Song {
  id: string;
  title: string;
  artist: string;
  artistId?: string;
  album: string;
  duration: number; // in seconds
  coverUrl: string;
  genre: string;
  playCount: number;
  likesCount: number;
  audioUrl?: string; // for user uploaded files via URL.createObjectURL or blob
  synthTrackType?: SynthTrackType; // for royalty-free Web Audio generation
  isUserUploaded?: boolean;
  status: 'approved' | 'pending' | 'rejected';
  uploadedAt: string;
  license: string;
}

export interface Artist {
  id: string;
  name: string;
  bio: string;
  avatarUrl: string;
  monthlyListeners: number;
  followers: number;
  verified: boolean;
  songsCount: number;
  isRonnyCreator?: boolean;
  genres: string[];
}

export interface Playlist {
  id: string;
  title: string;
  description: string;
  coverUrl: string;
  songIds: string[];
  isDefault?: boolean;
  createdBy: string;
}

export type UserRole = 'guest' | 'fan' | 'artist' | 'admin';

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  isArtist?: boolean;
  artistName?: string;
  likedSongIds: string[];
  customPlaylists: Playlist[];
}

export interface PromotionPlan {
  id: string;
  name: string;
  priceUSD: number;
  durationDays: number;
  badge: string;
  description: string;
  perks: string[];
  recommended?: boolean;
}

export interface PromotionSubmission {
  id: string;
  artistName: string;
  songTitle: string;
  planId: string;
  planName: string;
  amountUSD: number;
  status: 'submitted' | 'approved' | 'active' | 'completed';
  date: string;
  notes: string;
}

export interface CopyrightReport {
  id: string;
  songId: string;
  songTitle: string;
  artistName: string;
  reporterName: string;
  reporterEmail: string;
  reason: string;
  date: string;
  status: 'open' | 'investigating' | 'resolved';
}

export interface TipTransaction {
  id: string;
  artistId: string;
  artistName: string;
  amountUSD: number;
  message: string;
  senderName: string;
  date: string;
}
