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

export interface Comments {
  comments: Comment[];
}

export interface CommentIdInput {
  _id: string;
}

export interface AddCommentInput {
  videoId: string;
  content: string;
}

export interface UpdateCommentInput {
  _id: string;
  content: string;
}