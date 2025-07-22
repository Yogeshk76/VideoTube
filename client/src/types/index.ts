// Video type
export interface Video {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnailUrl: string;
  channel: Channel;
  published: boolean;
  views: number;
  createdAt: string;
  updatedAt: string;
}

// Channel type
export interface Channel {
  id: string;
  name: string;
  avatarUrl: string;
  coverImageUrl: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

// Playlist type
export interface Playlist {
  id: string;
  name: string;
  description: string;
  channelId: string;
  videos: Video[];
  createdAt: string;
  updatedAt: string;
}

// Tweet type
export interface Tweet {
  id: string;
  content: string;
  channelId: string;
  createdAt: string;
  updatedAt: string;
}

// Comment type
export interface Comment {
  id: string;
  content: string;
  videoId: string;
  owner: User;
  createdAt: string;
  updatedAt: string;
}

// User type
export interface User {
  id: string;
  username: string;
  email: string;
  avatarUrl: string;
  channelId: string;
  createdAt: string;
  updatedAt: string;
}

// Auth type
export interface Auth {
  accessToken: string;
  refreshToken: string;
  user: User;
} 