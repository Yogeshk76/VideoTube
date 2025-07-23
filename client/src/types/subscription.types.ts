import type { User } from './user.types';

// Subscription type
export interface Subscription {
  _id: string;
  subscriber: User | string;
  channel: User | string;
  createdAt: string;
  updatedAt: string;
}
