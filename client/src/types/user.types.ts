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
  fullName: string;
  email: string;
}

// For refresh endpoint
export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface UpdateUserAvatarInput {
  avatar: File | string; 
}

export interface UpdateUserCoverImageInput {
  coverImage: File | string; 
}

export interface GetUserChannelProfileInput {
  username: string;
}

export interface WatchHistoryData {
  watchHistory: (Video | string)[];
}



// refreshAccessToken,
//   updateUserAvatar,
//   updateUserCoverImage,
//   getUserChannelProfile,
//   getWatchHistory,