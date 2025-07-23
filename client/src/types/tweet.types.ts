import type { User } from './user.types';

// Tweet type
export interface Tweet {
  _id: string;
  owner: User | string;
  content: string;
  createdAt: string;
  updatedAt: string;
}
