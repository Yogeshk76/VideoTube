import type { User } from './user.types';

export interface Videos {
  Video: Video[];
}

export interface Video {
  _id: string;
  title: string;
  description: string;
  videoFile: string;
  thumbnail: string;
  duration: number;
  isPublished: boolean;
  views: number;
  owner: User | string;
  videoPublicId: string;
  thumbnailPublicId: string;
  createdAt: string;
  updatedAt: string;
}

export interface VideoIdInput {
  videoId: string;
}

export interface PublishAVideoInput {
  title: string;
  description: string;
  videoFile: File | string;
  thumbnail: File | string;
}

export interface UpdateVideoInput {
  videoId: string;
  title?: string;
  description?: string;
  thumbnail?: File | string;
}

export interface DeleteVideoInput {
  videoId: string;
}