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

export interface VideoIdInput {
  videoId: string;
}

export interface CommentIdInput {
  commentId: string;
}

export interface TweetIdInput {
  tweetId: string;
}