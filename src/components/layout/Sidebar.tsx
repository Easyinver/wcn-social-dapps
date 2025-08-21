// src/components/layout/Sidebar.tsx
import React from 'react';
import { useAppSelector } from '../../store/hooks';

const Sidebar: React.FC = () => {
  const { user } = useAppSelector(state => state.auth);

  const menuItems = [
    { icon: '🏠', label: 'Inicio', active: true },
    { icon: '🔍', label: 'Explorar', active: false },
    { icon: '🔔', label: 'Notificaciones', active: false },
    { icon: '💬', label: 'Mensajes', active: false },
    { icon: '📊', label: 'Analytics', active: false },
    { icon: '👥', label: 'Comunidades', active: false },
  ];

  return (
    <div className="sticky top-20">
      {/* User Profile Card */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex items-center space-x-3">
          <img
            src={user?.avatar || 'https://via.placeholder.com/48'}
            alt={user?.displayName}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-gray-900">{user?.displayName}</h3>
            <p className="text-sm text-gray-500">@{user?.username}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mt-4 text-center">
          <div>
            <p className="font-semibold text-gray-900">{user?.postsCount}</p>
            <p className="text-xs text-gray-500">Posts</p>
          </div>
          <div>
            <p className="font-semibold text-gray-900">{user?.followers}</p>
            <p className="text-xs text-gray-500">Seguidores</p>
          </div>
          <div>
            <p className="font-semibold text-gray-900">{user?.following}</p>
            <p className="text-xs text-gray-500">Siguiendo</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="bg-white rounded-lg shadow-sm">
        <nav className="p-2">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                item.active
                  ? 'bg-blue-50 text-blue-600 font-medium'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
