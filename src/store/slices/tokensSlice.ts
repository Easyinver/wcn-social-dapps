// src/store/slices/tokensSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TokenBalance } from '../../types/token';

interface TokensState {
  balances: Record<string, TokenBalance>;
  isLoading: boolean;
  error: string | null;
}

const initialState: TokensState = {
  balances: {},
  isLoading: false,
  error: null,
};

const tokensSlice = createSlice({
  name: 'tokens',
  initialState,
  reducers: {
    updateBalance(state, action: PayloadAction<Record<string, TokenBalance>>) {
      state.balances = action.payload;
    },
  },
});

export const { updateBalance } = tokensSlice.actions;
export default tokensSlice.reducer;
