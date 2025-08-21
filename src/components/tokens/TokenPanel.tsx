// src/components/tokens/TokenPanel.tsx
import React from 'react';
import { useTokens } from '../../hooks/useTokens';
import { SOCIAL_TOKENS } from '../../services/cellRegistry';
import { ChainId } from '@reactive-dot/core';

interface TokenPanelProps {
  chainId: ChainId;
}

const TokenPanel: React.FC<TokenPanelProps> = ({ chainId }) => {
  const { balances, getTotalBalance, isLoading } = useTokens();

  console.log('Current Chain ID in TokenPanel:', chainId);

  const tokenInfo = [
    { symbol: 'POST', name: 'Post Token', color: 'bg-blue-500', description: 'Por crear publicaciones' },
    { symbol: 'LIKE', name: 'Like Token', color: 'bg-red-500', description: 'Por dar me gusta' },
    { symbol: 'COMMENT', name: 'Comment Token', color: 'bg-green-500', description: 'Por comentar' },
    { symbol: 'SHARE', name: 'Share Token', color: 'bg-purple-500', description: 'Por compartir' },
    { symbol: 'FOLLOW', name: 'Follow Token', color: 'bg-yellow-500', description: 'Por seguir usuarios' },
  ];

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded mb-4"></div>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                <div className="h-4 bg-gray-200 rounded w-20"></div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-12"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="sticky top-20 space-y-6">
      {/* Total Balance Card */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-sm p-6 text-white">
        <h3 className="text-lg font-semibold mb-2">Balance Total</h3>
        <p className="text-3xl font-bold">{getTotalBalance()}</p>
        <p className="text-blue-100 text-sm">Tokens WCN</p>
      </div>

      {/* Token Breakdown */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Mis Tokens</h3>
        <div className="space-y-4">
          {tokenInfo.map(token => {
            const balance = balances[token.symbol] || 0;
            return (
              <div key={token.symbol} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 ${token.color} rounded-full flex items-center justify-center`}>
                    <span className="text-white text-xs font-bold">
                      {token.symbol.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{token.symbol}</p>
                    <p className="text-xs text-gray-500">{token.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{balance}</p>
                  <p className="text-xs text-gray-500">tokens</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Token Earning Tips */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">💡 Gana Más Tokens</h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-start space-x-2">
            <span className="text-blue-500">+{SOCIAL_TOKENS.POST.amount}</span>
            <span className="text-gray-600">Por cada publicación</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-red-500">+{SOCIAL_TOKENS.LIKE.amount}</span>
            <span className="text-gray-600">Por cada me gusta</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-green-500">+{SOCIAL_TOKENS.COMMENT.amount}</span>
            <span className="text-gray-600">Por cada comentario</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-purple-500">+{SOCIAL_TOKENS.SHARE.amount}</span>
            <span className="text-gray-600">Por cada compartido</span>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Los tokens se generan automáticamente por cada acción social que realizas.
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Acciones Rápidas</h3>
        <div className="space-y-2">
          <button className="w-full bg-blue-50 text-blue-600 py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors">
            Intercambiar Tokens
          </button>
          <button className="w-full bg-gray-50 text-gray-600 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
            Historial
          </button>
          <button className="w-full bg-gray-50 text-gray-600 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
            Stake Tokens
          </button>
        </div>
      </div>
    </div>
  );
};

export default TokenPanel;
