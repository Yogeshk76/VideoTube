import type { User } from './user.types';

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
