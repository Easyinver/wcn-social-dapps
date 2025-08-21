// src/cells/auth/LoginPasswordCell.tsx
import React, { useState } from 'react';
import { Cell, CellAction, CellResult } from '../../types/cell';
import { User } from '../../types/user';


interface LoginFormData {
  email: string;
  password: string;
}

interface LoginCellProps {
  onSuccess?: (user: User) => void;
  onError?: (error: string) => void;
}

const LoginPasswordComponent: React.FC<LoginCellProps> = ({ onSuccess, onError }) => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error al escribir
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      

      // Aquí se ejecutaría la celda a través del registry
      // Por ahora simulamos la autenticación
      const result = await simulateLogin(formData);
      
      if (result.success && result.data) {
        onSuccess?.(result.data);
      } else {
        const errorMsg = result.error || 'Error de autenticación';
        setError(errorMsg);
        onError?.(errorMsg);
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMsg);
      onError?.(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <div className="text-center mb-6">
        <img src="/assets/wcn-new-logo.png" alt="WCN Social Logo" className="mx-auto h-32 w-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900">WCN Social</h1>
        <p className="text-gray-600 mt-2">Inicia sesión para ganar tokens</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="tu@email.com"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="••••••••"
          />
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center">
              <div className="animate-spin -ml-1 mr-3 h-4 w-4 text-white">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
              Iniciando sesión...
            </div>
          ) : (
            'Iniciar Sesión'
          )}
        </button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          ¿No tienes cuenta?{' '}
          <a href="#register" className="font-medium text-blue-600 hover:text-blue-500">
            Regístrate
          </a>
        </p>
      </div>

      {/* Token Reward Info */}
      <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-md">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg className="h-4 w-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              <span className="font-medium">¡Gana tokens por usar la plataforma!</span>
              <br />
              Cada acción social te recompensa con tokens.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Simulación de login - reemplazar con llamada real a la API
async function simulateLogin(formData: LoginFormData): Promise<CellResult<User>> {
  // Simular delay de red
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Validación básica
  if (formData.email === 'test@wcn.com' && formData.password === 'password123') {
    const user: User = {
      id: '1',
      walletAddress: '0x1234567890abcdef1234567890abcdef12345678',
      username: 'testuser',
      email: formData.email,
      displayName: 'Test User',
      avatar: 'https://via.placeholder.com/100',
      bio: 'Usuario de prueba en WCN Social',
      tokenBalances: {
        POST: 150,
        LIKE: 89,
        COMMENT: 45,
        SHARE: 23,
        FOLLOW: 67
      },
      reputation: 1250,
      followers: 156,
      following: 234,
      postsCount: 45,
      joinDate: new Date('2024-01-15'),
      isVerified: false
    };

    return {
      success: true,
      data: user,
      tokens: [
        {
          token: 'LOGIN',
          amount: 5,
          type: 'UTILITY',
          description: 'Recompensa por iniciar sesión diaria'
        }
      ]
    };
  } else {
    return {
      success: false,
      error: 'Email o contraseña incorrectos'
    };
  }
}

// Definición de la celda
export const LoginPasswordCell: Cell<LoginCellProps, LoginFormData, User> = {
  config: {
    id: 'SOC.AUTH.LOGIN.PASSWORD.v1',
    version: 'v1',
    platform: 'SOC',
    module: 'AUTH',
    action: 'LOGIN',
    type: 'PASSWORD',
    tokenRewards: [
      {
        token: 'LOGIN',
        amount: 5,
        type: 'UTILITY',
        description: 'Recompensa por iniciar sesión diaria'
      }
    ]
  },
  component: LoginPasswordComponent,
  execute: async (action: CellAction<LoginFormData>): Promise<CellResult<User>> => {
    return await simulateLogin(action.payload);
  },
  validate: (action: CellAction<LoginFormData>): boolean => {
    const { email, password } = action.payload;
    return !!(email && password && email.includes('@'));
  },
  onSuccess: (result: CellResult<User>) => {
    console.log('✅ Login successful:', result);
  },
  onError: (error: string) => {
    console.error('❌ Login failed:', error);
  }
};

export default LoginPasswordComponent;
