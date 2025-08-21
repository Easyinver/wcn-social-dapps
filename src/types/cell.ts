// src/types/cell.ts
export interface CellAction<T = unknown> {
  type: string;
  payload: T;
  metadata?: {
    timestamp: number;
    userId?: string;
    cellVersion: string;
  };
}

export interface CellResult<R = unknown> {
  success: boolean;
  data?: R;
  tokens?: TokenReward[];
  error?: string;
  transactionHash?: string;
}

export interface TokenReward {
  token: string;
  amount: number;
  type: 'UTILITY' | 'REPUTATION' | 'GOVERNANCE';
  description: string;
}

export interface CellConfig {
  id: string;
  version: string;
  platform: string;
  module: string;
  action: string;
  type: string;
  tokenRewards: TokenReward[];
  dependencies?: string[];
  permissions?: string[];
}

export interface Cell<P = any, T = any, R = any> {
  config: CellConfig;
  component: React.ComponentType<P>;
  execute: (action: CellAction<T>) => Promise<CellResult<R>>;
  validate?: (action: CellAction<T>) => boolean;
  onSuccess?: (result: CellResult<R>) => void;
  onError?: (error: string) => void;
}