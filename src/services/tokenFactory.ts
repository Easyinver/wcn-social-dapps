// src/services/tokenFactory.ts
import { TokenReward, TokenTransaction } from '../types/token';
// import { CellRegistry } from './cellRegistry';

export class TokenFactoryService {
  private readonly API_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL || 'http://localhost:3001';

  /**
   * Genera tokens para un usuario basado en las recompensas de la celda
   */
  async generateTokens(
    rewards: TokenReward[],
    userId: string,
    cellId: string
  ): Promise<TokenReward[]> {
    try {
      const response = await fetch(`${this.API_BASE_URL}/tokens/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rewards,
          userId,
          cellId,
          timestamp: Date.now()
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate tokens');
      }

      const generatedTokens = await response.json();
      console.log(`🪙 Tokens generated for user ${userId}:`, generatedTokens);
      
      return generatedTokens;
    } catch (error) {
      console.error('Error generating tokens:', error);
      throw error;
    }
  }

  /**
   * Obtiene el balance de tokens de un usuario
   */
  async getTokenBalance(userId: string): Promise<Record<string, number>> {
    try {
      const response = await fetch(`${this.API_BASE_URL}/tokens/balance/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch token balance');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching token balance:', error);
      return {};
    }
  }

  /**
   * Obtiene el historial de transacciones de tokens
   */
  async getTokenTransactions(userId: string): Promise<TokenTransaction[]> {
    try {
      const response = await fetch(`${this.API_BASE_URL}/tokens/transactions/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch token transactions');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching token transactions:', error);
      return [];
    }
  }
}

// Export singleton instances
export const tokenFactory = new TokenFactoryService();

// Tipos de tokens predefinidos basados en tu documento
export const SOCIAL_TOKENS: Record<string, TokenReward> = {
  POST: {
    token: 'POST',
    amount: 10,
    type: 'UTILITY',
    description: 'Recompensa por crear una publicación'
  },
  LIKE: {
    token: 'LIKE',
    amount: 1,
    type: 'UTILITY',
    description: 'Recompensa por dar "me gusta"'
  },
  COMMENT: {
    token: 'COMMENT',
    amount: 5,
    type: 'UTILITY',
    description: 'Recompensa por comentar'
  },
  SHARE: {
    token: 'SHARE',
    amount: 8,
    type: 'UTILITY',
    description: 'Recompensa por compartir una publicación'
  },
  FOLLOW: {
    token: 'FOLLOW',
    amount: 15,
    type: 'UTILITY',
    description: 'Recompensa por seguir a un usuario'
  },
  STORY: {
    token: 'STORY',
    amount: 5,
    type: 'UTILITY',
    description: 'Recompensa por publicar una historia'
  }
};
