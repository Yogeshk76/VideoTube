import type { User } from './user.types';
import type { Video } from './video.types';
import type { Comment } from './comment.types';
import type { Tweet } from './tweet.types';

// Like type
export interface Like {
  _id: string;
  comment?: Comment | string;
  likedBy: User | string;
  video?: Video | string;
  tweet?: Tweet | string;
  createdAt: string;
  updatedAt: string;
}