import type { User } from './user.types';
import type { Video } from './video.types';

// Comment type
export interface Comment {
  _id: string;
  content: string;
  video: Video | string;
  owner: User | string;
  createdAt: string;
  updatedAt: string;
}