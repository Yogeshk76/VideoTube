import type { User } from './user.types';

export interface ApiResponse<T> {
  data: T;
  message?: string;
  statusCode: number;
}

export interface LoginData {
  user: User;
}

export interface RegisterInput {
  fullName: string;
  username: string;
  email: string;
  password: string;
  avatar: File | string;
  coverImage?: File | string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface ChangePasswordInput {
  oldPassword: string;
  newPassword: string;
}
