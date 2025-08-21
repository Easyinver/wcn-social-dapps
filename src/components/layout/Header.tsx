// src/components/layout/Header.tsx
import React, { Dispatch, SetStateAction } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { logout } from '../../store/slices/authSlice';
import { useTokens } from '../../hooks/useTokens';
import { ChainId } from '@reactive-dot/core';

interface HeaderProps {
  onCreatePost: () => void;
  chainId: ChainId;
  setChainId: Dispatch<SetStateAction<ChainId>>;
}

const Header: React.FC<HeaderProps> = ({ onCreatePost, chainId, setChainId }) => {
  const { user } = useAppSelector(state => state.auth);
  const { getTotalBalance } = useTokens();
  const dispatch = useAppDispatch();

  console.log('Current Chain ID in Header:', chainId);
  console.log('Set Chain ID function in Header:', setChainId);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm border-b border-gray-200 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img src="/assets/wcn-new-logo.png" alt="WCN Social Logo" className="h-8 w-auto" />
            <h1 className="text-xl font-bold text-gray-900">WCN Social</h1>
          </div>

          {/* Search (placeholder) */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar..."
                className="w-full px-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
              />
              <svg className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Token Balance */}
            <div className="hidden md:flex items-center space-x-2 bg-blue-50 px-3 py-1 rounded-full">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">T</span>
              </div>
              <span className="text-sm font-medium text-blue-700">{getTotalBalance()}</span>
            </div>

            {/* Create Post Button */}
            <button
              onClick={onCreatePost}
              className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Publicar
            </button>

            {/* Profile Dropdown */}
            <div className="relative group">
              <button className="flex items-center space-x-2 hover:bg-gray-100 rounded-full p-2">
                <img
                  src={user?.avatar || 'https://via.placeholder.com/32'}
                  alt={user?.displayName}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="hidden md:block text-sm font-medium text-gray-700">
                  {user?.displayName}
                </span>
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                  Mi Perfil
                </button>
                <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                  Mis Tokens
                </button>
                <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                  Configuración
                </button>
                <hr className="my-1" />
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                >
                  Cerrar Sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
