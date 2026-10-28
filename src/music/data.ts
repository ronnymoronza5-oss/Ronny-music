import { Song, Artist, Playlist, PromotionPlan, UserAccount } from './types';

export const INITIAL_SONGS: Song[] = [
  {
    id: "song-ronny-1",
    title: "Synthwave Odyssey",
    artist: "Ronny",
    artistId: "artist-ronny",
    album: "Neon Dreams & Geometric Skies",
    duration: 198,
    coverUrl: "/src/assets/images/album_neon_echoes_1793189389347.jpg",
    genre: "Electronic",
    playCount: 14200,
    likesCount: 1840,
    synthTrackType: "synthwave",
    status: "approved",
    uploadedAt: "2026-10-20",
    license: "Creative Commons Attribution (CC-BY 4.0)"
  },
  {
    id: "song-elias-1",
    title: "Violet Nights",
    artist: "The Elias Reed Trio",
    artistId: "artist-elias",
    album: "The Blue Hour Jazz Live",
    duration: 215,
    coverUrl: "/src/assets/images/album_midnight_jazz_1793189390028.jpg",
    genre: "Jazz",
    playCount: 8900,
    likesCount: 960,
    synthTrackType: "jazz",
    status: "approved",
    uploadedAt: "2026-10-18",
    license: "Public Domain Music License"
  },
  {
    id: "song-kosi-1",
    title: "Afro-Pop Pulse",
    artist: "Kosi",
    artistId: "artist-kosi",
    album: "Beats & Melodies",
    duration: 184,
    coverUrl: "/src/assets/images/album_afro_vibes_1793189390930.jpg",
    genre: "Afrobeat",
    playCount: 22400,
    likesCount: 3120,
    synthTrackType: "afrobeat",
    status: "approved",
    uploadedAt: "2026-10-22",
    license: "Independent Artist Direct Grant"
  },
  {
    id: "song-lofi-1",
    title: "Rainy City Chill",
    artist: "Raindrop Beats",
    artistId: "artist-raindrop",
    album: "Vintage Waves Side One",
    duration: 165,
    coverUrl: "/src/assets/images/album_lofi_rain_1793189391340.jpg",
    genre: "Lo-Fi",
    playCount: 18600,
    likesCount: 2450,
    synthTrackType: "lofi",
    status: "approved",
    uploadedAt: "2026-10-24",
    license: "Free Royalty-Free Distribution"
  },
  {
    id: "song-ronny-2",
    title: "Emerald Horizon",
    artist: "Ronny",
    artistId: "artist-ronny",
    album: "Studio Sessions 2026",
    duration: 178,
    coverUrl: "/src/assets/images/artist_ronny_1793189391168.jpg",
    genre: "Ambient",
    playCount: 9500,
    likesCount: 1280,
    synthTrackType: "ambient",
    status: "approved",
    uploadedAt: "2026-10-26",
    license: "Creative Commons Attribution (CC-BY 4.0)"
  }
];

export const INITIAL_ARTISTS: Artist[] = [
  {
    id: "artist-ronny",
    name: "Ronny",
    bio: "Music producer, multi-instrumentalist, and creator of Ronny Music. Passionate about empowering independent artists with fair, free distribution.",
    avatarUrl: "/src/assets/images/artist_ronny_1793189391168.jpg",
    monthlyListeners: 34200,
    followers: 8900,
    verified: true,
    songsCount: 12,
    isRonnyCreator: true,
    genres: ["Electronic", "Synthwave", "Ambient"]
  },
  {
    id: "artist-kosi",
    name: "Kosi",
    bio: "Vocalist and songwriter blending traditional rhythms with contemporary Afro-fusion melodies and vibrant storytelling.",
    avatarUrl: "/src/assets/images/album_afro_vibes_1793189390930.jpg",
    monthlyListeners: 41000,
    followers: 12400,
    verified: true,
    songsCount: 8,
    genres: ["Afrobeat", "Pop"]
  },
  {
    id: "artist-elias",
    name: "The Elias Reed Trio",
    bio: "Late-night modern jazz ensemble based in Chicago. Known for intimate improvisations and rich harmonic textures.",
    avatarUrl: "/src/assets/images/album_midnight_jazz_1793189390028.jpg",
    monthlyListeners: 19800,
    followers: 5200,
    verified: true,
    songsCount: 6,
    genres: ["Jazz", "Lounge"]
  },
  {
    id: "artist-raindrop",
    name: "Raindrop Beats",
    bio: "Cozy tape-saturated beats, warm Rhodes chords, and ambient textures for late-night focus and coding sessions.",
    avatarUrl: "/src/assets/images/album_lofi_rain_1793189391340.jpg",
    monthlyListeners: 28400,
    followers: 7300,
    verified: true,
    songsCount: 15,
    genres: ["Lo-Fi", "Chillout"]
  }
];

export const INITIAL_PLAYLISTS: Playlist[] = [
  {
    id: "playlist-picks",
    title: "Ronny's Studio Picks",
    description: "Curated collection of the week's best independent releases and hidden gems.",
    coverUrl: "/src/assets/images/album_neon_echoes_1793189389347.jpg",
    songIds: ["song-ronny-1", "song-kosi-1", "song-lofi-1"],
    isDefault: true,
    createdBy: "Ronny"
  },
  {
    id: "playlist-late-night",
    title: "Late Night Coding & Focus",
    description: "Atmospheric beats and soothing jazz melodies designed for uninterrupted flow state.",
    coverUrl: "/src/assets/images/album_lofi_rain_1793189391340.jpg",
    songIds: ["song-lofi-1", "song-elias-1", "song-ronny-2"],
    isDefault: true,
    createdBy: "Ronny"
  },
  {
    id: "playlist-energy",
    title: "Global Afrobeat & Indie Heat",
    description: "High vibration rhythms, upbeat percussion, and soulful acoustic melodies.",
    coverUrl: "/src/assets/images/album_afro_vibes_1793189390930.jpg",
    songIds: ["song-kosi-1", "song-ronny-1"],
    isDefault: true,
    createdBy: "Ronny"
  }
];

export const PROMOTION_PLANS: PromotionPlan[] = [
  {
    id: "plan-starter",
    name: "Independent Boost",
    priceUSD: 15,
    durationDays: 7,
    badge: "For Emerging Artists",
    description: "Get your single introduced to new listeners on the genre discovery carousel.",
    perks: [
      "Featured placement in 'New Releases' carousel",
      "Direct artist profile link on home page",
      "Weekly analytics breakdown on plays and saves",
      "Community discovery push notification simulation"
    ]
  },
  {
    id: "plan-featured",
    name: "Featured Spotlight",
    priceUSD: 35,
    durationDays: 14,
    badge: "Most Popular",
    recommended: true,
    description: "Guaranteed placement in 'Trending Now' and curated editorial playlist inclusion.",
    perks: [
      "Top 3 slot in 'Trending Tracks' for 14 days",
      "Included in official 'Ronny's Studio Picks' playlist",
      "Artist verification badge during campaign",
      "Detailed engagement metrics (listener locations & repeats)",
      "Priority consideration for artist interviews"
    ]
  },
  {
    id: "plan-takeover",
    name: "Homepage Takeover",
    priceUSD: 75,
    durationDays: 30,
    badge: "Maximum Visibility",
    description: "Prominent hero banner spotlight reaching 100% of homepage visitors upon arrival.",
    perks: [
      "Full-width hero header showcase for 30 days",
      "Direct 'Play Album' one-click action in header",
      "Permanent artist verification checkmark",
      "Permanent inclusion in Ronny Music Hall of Fame",
      "Direct listener tip jar integration highlight"
    ]
  }
];

export const DEFAULT_USERS: UserAccount[] = [
  {
    id: "user-fan",
    name: "Alex Listener",
    email: "listener@example.com",
    role: "fan",
    avatar: "/src/assets/images/hero_avatar_1793169959977.jpg",
    likedSongIds: ["song-ronny-1", "song-kosi-1"],
    customPlaylists: []
  },
  {
    id: "user-artist-ronny",
    name: "Ronny (Artist)",
    email: "ronnymoronza5@gmail.com",
    role: "artist",
    artistName: "Ronny",
    avatar: "/src/assets/images/artist_ronny_1793189391168.jpg",
    likedSongIds: ["song-ronny-1", "song-ronny-2", "song-kosi-1"],
    customPlaylists: []
  },
  {
    id: "user-admin",
    name: "Ronny (Admin)",
    email: "admin@ronnymusic.dev",
    role: "admin",
    avatar: "/src/assets/images/artist_ronny_1793189391168.jpg",
    likedSongIds: ["song-ronny-1", "song-elias-1", "song-kosi-1", "song-lofi-1", "song-ronny-2"],
    customPlaylists: []
  }
];
