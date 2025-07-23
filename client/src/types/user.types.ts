import type { Video } from './video.types';

// User type
export interface User {
  _id: string;
  username: string;
  email: string;
  fullName: string;
  avatar: string;
  coverImage?: string;
  watchHistory?: (Video | string)[];
  createdAt: string;
  updatedAt: string;
}

export interface UpdateAccountDetailsInput {
  fullName?: string;
  email?: string;
}