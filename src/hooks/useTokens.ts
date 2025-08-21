// src/hooks/useTokens.ts
import { useState, useEffect, useCallback } from 'react';
import { useAppSelector } from '../store/hooks';
import { tokenFactory } from '../services/cellRegistry';
import { TokenTransaction } from '../types/token';

export const useTokens = () => {
  const user = useAppSelector(state => state.auth.user);
  const [balances, setBalances] = useState<Record<string, number>>({});
  const [transactions, setTransactions] = useState<TokenTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadTokenData = useCallback(async () => {
    if (!user?.id) return;
    
    setIsLoading(true);
    try {
      const [tokenBalances, tokenTransactions] = await Promise.all([
        tokenFactory.getTokenBalance(user.id),
        tokenFactory.getTokenTransactions(user.id)
      ]);
      
      setBalances(tokenBalances);
      setTransactions(tokenTransactions);
    } catch (error) {
      console.error('Error loading token data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    if (user?.id) {
      loadTokenData();
    }
  }, [user?.id, loadTokenData]);

  const getTotalBalance = () => {
    return Object.values(balances).reduce((sum, balance) => sum + balance, 0);
  };

  const getTokenBalance = (token: string) => {
    return balances[token] || 0;
  };

  const refresh = () => {
    loadTokenData();
  };

  return {
    balances,
    transactions,
    isLoading,
    getTotalBalance,
    getTokenBalance,
    refresh
  };
};