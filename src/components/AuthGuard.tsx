// src/components/AuthGuard.tsx
import React from 'react';
import { useAppSelector } from '../store/hooks';
import LoginPasswordComponent from '../cells/auth/LoginPasswordCell';
import { useAppDispatch } from '../store/hooks';
import { loginSuccess } from '../store/slices/authSlice';
import { User } from '../types/user';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  const handleLoginSuccess = (user: User) => {
    dispatch(loginSuccess(user));
  };

  const handleLoginError = (error: string) => {
    console.error('Login error:', error);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <LoginPasswordComponent
          onSuccess={handleLoginSuccess}
          onError={handleLoginError}
        />
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthGuard;
