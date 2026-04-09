// src/App.tsx
import React, { Dispatch, SetStateAction } from 'react';
import { ChainId } from '@reactive-dot/core';
import AuthGuard from './components/AuthGuard';
import MainLayout from './components/layout/MainLayout';
import './App.css';

interface AppProps {
  chainId: ChainId;
  setChainId: Dispatch<SetStateAction<ChainId>>;
}

const App: React.FC<AppProps> = ({ chainId, setChainId }) => {
  return (
    <AuthGuard>
      <MainLayout chainId={chainId} setChainId={setChainId} />
    </AuthGuard>
  );
};

export default App;