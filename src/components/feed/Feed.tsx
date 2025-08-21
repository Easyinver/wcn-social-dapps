// src/components/feed/Feed.tsx
import React, { useEffect, useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { fetchPostsStart, fetchPostsSuccess } from '../../store/slices/postsSlice';
import PostCard from '../posts/PostCard';
import { Post } from '../../types/post';
import { ChainId } from '@reactive-dot/core';

interface FeedProps {
  chainId: ChainId;
}

const Feed: React.FC<FeedProps> = ({ chainId }) => {
  const { feed, isLoading } = useAppSelector(state => state.posts);
  const dispatch = useAppDispatch();

  console.log('Current Chain ID in Feed:', chainId);

  const loadFeed = useCallback(async () => {
    dispatch(fetchPostsStart());
    
    // Simulate API call - replace with real API
    setTimeout(() => {
      const mockPosts: Post[] = [
        {
          id: '1',
          authorId: '2',
          author: {
            id: '2',
            walletAddress: '0xabcdef1234567890abcdef1234567890abcdef12',
            username: 'jane_crypto',
            email: 'jane@example.com',
            displayName: 'Jane Crypto',
            avatar: 'https://via.placeholder.com/40',
            bio: 'Crypto enthusiast & DeFi lover 🚀',
            tokenBalances: {},
            reputation: 2500,
            followers: 1200,
            following: 890,
            postsCount: 156,
            joinDate: new Date('2023-12-01'),
            isVerified: true
          },
          content: '¡Acabo de ganar 50 POST tokens por esta publicación! 🚀 #WCNSocial #CryptoLife #TokenEconomy',
          mediaUrls: ['https://via.placeholder.com/500x400?text=Crypto+Gains'],
          mediaType: 'photo',
          likes: 24,
          comments: 8,
          shares: 3,
          saves: 12,
          hashtags: ['WCNSocial', 'CryptoLife', 'TokenEconomy'],
          createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
          updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
          isLiked: false,
          isSaved: false
        },
        {
          id: '2',
          authorId: '3',
          author: {
            id: '3',
            walletAddress: '0xfedcba0987654321fedcba0987654321fedcba09',
            username: 'tech_builder',
            email: 'builder@example.com',
            displayName: 'Tech Builder',
            avatar: 'https://via.placeholder.com/40',
            bio: 'Building the future of Web3 🔨',
            tokenBalances: {},
            reputation: 1800,
            followers: 890,
            following: 456,
            postsCount: 89,
            joinDate: new Date('2024-01-20'),
            isVerified: false
          },
          content: 'La arquitectura de celdas de WCN es increíble. Cada interacción genera tokens automáticamente. El futuro es ahora! 💎\n\n¿Qué opinan sobre la tokenización de las redes sociales?',
          mediaUrls: [],
          mediaType: 'photo',
          likes: 15,
          comments: 12,
          shares: 7,
          saves: 5,
          hashtags: [],
          createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
          updatedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
          isLiked: true,
          isSaved: false
        }
      ];
      
      dispatch(fetchPostsSuccess(mockPosts));
    }, 1000);
  }, [dispatch]);

  useEffect(() => {
    loadFeed();
  }, [loadFeed]);

  if (isLoading && feed.length === 0) {
    return (
      <div className="space-y-4">
        {/* Loading skeletons */}
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
            <div className="space-y-2 mb-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
            <div className="h-64 bg-gray-200 rounded-lg"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {feed.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
      
      {feed.length === 0 && !isLoading && (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <div className="text-4xl mb-4">📝</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            ¡Tu feed está vacío!
          </h3>
          <p className="text-gray-600 mb-4">
            Sigue a otros usuarios para ver sus publicaciones aquí.
          </p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition-colors">
            Explorar usuarios
          </button>
        </div>
      )}
    </div>
  );
};

export default Feed;
