import type { User } from './user.types';

// For refresh endpoint
export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

// For login/register endpoint
export interface LoginResponse {
  user: User;
}

export interface RegisterInput {
  fullName: string;
  username: string;
  email: string;
  password: string;
  avatar: File;
  coverImage?: File;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface ChangePasswordInput {
  oldPassword: string;
  newPassword: string;
}
