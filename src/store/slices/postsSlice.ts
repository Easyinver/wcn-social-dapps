// src/store/slices/postsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/post';

interface PostsState {
  feed: Post[];
  isLoading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  feed: [],
  isLoading: false,
  error: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    fetchPostsStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchPostsSuccess(state, action: PayloadAction<Post[]>) {
      state.feed = action.payload;
      state.isLoading = false;
    },
    addPost(state, action: PayloadAction<Post>) {
      state.feed.unshift(action.payload);
    },
    likePost(state, action: PayloadAction<string>) {
      const post = state.feed.find(p => p.id === action.payload);
      if (post) {
        post.isLiked = !post.isLiked;
        post.likes += post.isLiked ? 1 : -1;
      }
    },
    savePost(state, action: PayloadAction<string>) {
      const post = state.feed.find(p => p.id === action.payload);
      if (post) {
        post.isSaved = !post.isSaved;
      }
    },
  },
});

export const { fetchPostsStart, fetchPostsSuccess, addPost, likePost, savePost } = postsSlice.actions;
export default postsSlice.reducer;
