// src/components/layout/MainLayout.tsx
import React, { useState, Dispatch, SetStateAction } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Feed from '../feed/Feed';
import TokenPanel from '../tokens/TokenPanel';
import CreatePostModal from '../posts/CreatePostModal';
import { ChainId } from '@reactive-dot/core';

interface MainLayoutProps {
  chainId: ChainId;
  setChainId: Dispatch<SetStateAction<ChainId>>;
}

const MainLayout: React.FC<MainLayoutProps> = ({ chainId, setChainId }) => {
  const [showCreatePost, setShowCreatePost] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onCreatePost={() => setShowCreatePost(true)} chainId={chainId} setChainId={setChainId} />
      
      <div className="max-w-6xl mx-auto px-4 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <div className="hidden lg:block">
            <Sidebar />
          </div>
          
          {/* Main Feed */}
          <div className="lg:col-span-2">
            <Feed chainId={chainId} />
          </div>
          
          {/* Right Panel */}
          <div className="hidden lg:block">
            <TokenPanel chainId={chainId} />
          </div>
        </div>
      </div>

      {/* Create Post Modal */}
      {showCreatePost && (
        <CreatePostModal
          onClose={() => setShowCreatePost(false)}
          onSuccess={() => setShowCreatePost(false)}
        />
      )}
    </div>
  );
};

export default MainLayout;
