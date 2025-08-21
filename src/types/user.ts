// src/types/user.ts
export interface User {
  id: string;
  walletAddress: string;
  username: string;
  email?: string;
  displayName: string;
  avatar?: string;
  bio?: string;
  tokenBalances: Record<string, number>;
  reputation: number;
  followers: number;
  following: number;
  postsCount: number;
  joinDate: Date;
  isVerified: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  walletConnected: boolean;
}