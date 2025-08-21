import { User } from "./user";

// src/types/post.ts
export interface Post {
  id: string;
  authorId: string;
  author: User;
  content: string;
  mediaUrls: string[];
  mediaType: 'photo' | 'video' | 'carousel';
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  hashtags: string[];
  location?: string;
  createdAt: Date;
  updatedAt: Date;
  isLiked: boolean;
  isSaved: boolean;
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  author: User;
  content: string;
  likes: number;
  replies: Comment[];
  createdAt: Date;
  isLiked: boolean;
}

export interface Story {
  id: string;
  authorId: string;
  author: User;
  mediaUrl: string;
  mediaType: 'photo' | 'video';
  caption?: string;
  views: number;
  createdAt: Date;
  expiresAt: Date;
  isViewed: boolean;
}
