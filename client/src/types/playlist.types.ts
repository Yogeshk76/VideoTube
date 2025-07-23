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