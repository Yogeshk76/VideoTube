import type { User } from './user.types';
import type { Video } from './video.types';

// Playlist type
export interface Playlist {
  _id: string;
  name: string;
  description: string;
  videos: (Video | string)[];
  owner: User | string;
  createdAt: string;
  updatedAt: string;
}

export interface Playlists {
  playlists: Playlist[];
}

export interface UserIdInput {
  userId: string;
}

export interface PlaylistIdInput {
  playlistId: string;
}

export interface AddVideoToPlaylistInput {
  videoId: string;
  playlistId: string;
}

export interface UpdatePlaylistInput {
  playlistId: string;
  name?: string;
  description?: string;
}