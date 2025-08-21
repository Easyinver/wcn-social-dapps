// src/types/token.ts
export interface Token {
  symbol: string;
  name: string;
  description: string;
  type: 'UTILITY' | 'REPUTATION' | 'GOVERNANCE';
  platform: string[];
  standard: 'ERC20' | 'ERC721' | 'ERC1155';
  totalSupply?: number;
  decimals?: number;
}

export interface TokenReward {
  token: string;
  amount: number;
  type: 'UTILITY' | 'REPUTATION' | 'GOVERNANCE';
  description: string;
}

export interface TokenTransaction {
  id: string;
  userId: string;
  token: string;
  amount: number;
  type: 'EARN' | 'SPEND' | 'TRANSFER' | 'STAKE';
  description: string;
  cellId?: string;
  transactionHash: string;
  timestamp: Date;
  status: 'PENDING' | 'CONFIRMED' | 'FAILED';
}

export interface TokenBalance {
  token: string;
  balance: number;
  staked: number;
  earned24h: number;
  earnedTotal: number;
}