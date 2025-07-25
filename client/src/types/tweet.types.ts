import type { User } from './user.types';

// Tweet type
export interface Tweet {
  _id: string;
  owner: User | string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface TweetIdInput {
  tweetId: string;
}

export interface UserIdInput {
  userId: string;
}

export interface CreateTweetInput {
  content: string;
}

export interface UpdateTweetInput {
  _id: string;
  content: string;
}