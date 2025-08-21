// src/cells/posts/CreatePostCell.tsx
import React, { useState, useRef } from 'react';
import { Cell, CellAction, CellResult } from '../../types/cell';
import { Post } from '../../types/post';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { addPost } from '../../store/slices/postsSlice';
// import { updateBalance } from '../../store/slices/tokensSlice';
import { SOCIAL_TOKENS } from '../../services/cellRegistry';

interface CreatePostFormData {
  content: string;
  mediaFiles: File[];
  hashtags: string[];
  location?: string;
}

interface CreatePostCellProps {
  onSuccess?: (post: Post) => void;
  onError?: (error: string) => void;
  onClose?: () => void;
}

const CreatePostComponent: React.FC<CreatePostCellProps> = ({ onSuccess, onError, onClose }) => {
  const user = useAppSelector(state => state.auth.user);
  const dispatch = useAppDispatch();
  
  const [formData, setFormData] = useState<CreatePostFormData>({
    content: '',
    mediaFiles: [],
    hashtags: [],
    location: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content = e.target.value;
    setFormData(prev => ({ ...prev, content }));
    
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
    
    // Extract hashtags
    const hashtags = content.match(/#\w+/g)?.map(tag => tag.slice(1)) || [];
    setFormData(prev => ({ ...prev, hashtags }));
    
    // Clear error
    if (error) setError('');
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => 
      file.type.startsWith('image/') || file.type.startsWith('video/')
    );

    if (validFiles.length !== files.length) {
      setError('Solo se permiten archivos de imagen y video');
      return;
    }

    if (validFiles.length > 10) {
      setError('Máximo 10 archivos permitidos');
      return;
    }

    setFormData(prev => ({ ...prev, mediaFiles: validFiles }));
    
    // Generate preview URLs
    const urls = validFiles.map(file => URL.createObjectURL(file));
    setPreviewUrls(urls);
    setError('');
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      mediaFiles: prev.mediaFiles.filter((_, i) => i !== index)
    }));
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      setError('Debes estar autenticado para crear un post');
      return;
    }

    if (!formData.content.trim() && formData.mediaFiles.length === 0) {
      setError('Agrega contenido o imágenes a tu publicación');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      

      // Simular creación de post (reemplazar con llamada real)
      const result = await simulateCreatePost(formData, user.id);
      
      if (result.success && result.data) {
        // Actualizar store local
        dispatch(addPost(result.data));
        
        // Actualizar balance de tokens
        // if (result.tokens) {
        //   result.tokens.forEach(tokenReward => {
        //     dispatch(updateBalance({
        //       token: tokenReward.token,
        //       amount: tokenReward.amount
        //     }));
        //   });
        // }

        onSuccess?.(result.data);
        
        // Reset form
        setFormData({
          content: '',
          mediaFiles: [],
          hashtags: [],
          location: ''
        });
        setPreviewUrls([]);
        
        onClose?.();
      } else {
        const errorMsg = result.error || 'Error al crear el post';
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
    <div className="bg-white rounded-lg shadow-lg max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-900">Crear publicación</h2>
        <div className="flex items-center space-x-2">
          <div className="text-sm text-blue-600 font-medium">
            +{SOCIAL_TOKENS.POST.amount} POST tokens
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* User Info */}
        <div className="flex items-center p-4 space-x-3">
          <img
            src={user?.avatar || 'https://via.placeholder.com/40'}
            alt={user?.displayName}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="font-medium text-gray-900">{user?.displayName}</p>
            <p className="text-sm text-gray-500">@{user?.username}</p>
          </div>
        </div>

        {/* Content Input */}
        <div className="px-4 pb-4">
          <textarea
            ref={textareaRef}
            value={formData.content}
            onChange={handleContentChange}
            placeholder="¿Qué está pasando?"
            className="w-full p-3 text-lg placeholder-gray-500 border-0 resize-none focus:ring-0 focus:outline-none"
            rows={3}
            maxLength={2200}
          />
          
          {/* Character Counter */}
          <div className="flex justify-between items-center mt-2">
            <div className="text-sm text-gray-500">
              {formData.hashtags.length > 0 && (
                <span className="text-blue-600">
                  {formData.hashtags.map(tag => `#${tag}`).join(' ')}
                </span>
              )}
            </div>
            <div className="text-sm text-gray-500">
              {formData.content.length}/2200
            </div>
          </div>
        </div>

        {/* Media Preview */}
        {previewUrls.length > 0 && (
          <div className="px-4 pb-4">
            <div className="grid grid-cols-2 gap-2">
              {previewUrls.map((url, index) => (
                <div key={index} className="relative">
                  <img
                    src={url}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-70 transition-opacity"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="px-4 pb-4">
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          </div>
        )}

        {/* Actions Bar */}
        <div className="flex items-center justify-between p-4 border-t">
          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm">Fotos</span>
            </button>
            
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || (!formData.content.trim() && formData.mediaFiles.length === 0)}
            className="px-6 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin -ml-1 mr-2 h-4 w-4 text-white">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
                Publicando...
              </div>
            ) : (
              'Publicar'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

// Simulación de creación de post - reemplazar con API real
async function simulateCreatePost(formData: CreatePostFormData, userId: string): Promise<CellResult<Post>> {
  // Simular delay de red
  await new Promise(resolve => setTimeout(resolve, 1500));

  const post: Post = {
    id: `post_${Date.now()}`,
    authorId: userId,
    author: {
      id: userId,
      walletAddress: '0x1234567890abcdef1234567890abcdef12345678',
      username: 'testuser',
      email: 'test@wcn.com',
      displayName: 'Test User',
      avatar: 'https://via.placeholder.com/40',
      bio: 'Usuario de prueba en WCN Social',
      tokenBalances: {},
      reputation: 1250,
      followers: 156,
      following: 234,
      postsCount: 46,
      joinDate: new Date('2024-01-15'),
      isVerified: false
    },
    content: formData.content,
    mediaUrls: formData.mediaFiles.map((_, index) => `https://via.placeholder.com/500x500?text=Image+${index + 1}`),
    mediaType: formData.mediaFiles.length > 1 ? 'carousel' : 'photo',
    likes: 0,
    comments: 0,
    shares: 0,
    saves: 0,
    hashtags: formData.hashtags,
    location: formData.location,
    createdAt: new Date(),
    updatedAt: new Date(),
    isLiked: false,
    isSaved: false
  };

  return {
    success: true,
    data: post,
    tokens: [SOCIAL_TOKENS.POST]
  };
}

// Definición de la celda
export const CreatePostCell: Cell<CreatePostCellProps, CreatePostFormData, Post> = {
  config: {
    id: 'SOC.POST.CREATE.PHOTO.v1',
    version: 'v1',
    platform: 'SOC',
    module: 'POST',
    action: 'CREATE',
    type: 'PHOTO',
    tokenRewards: [SOCIAL_TOKENS.POST]
  },
  component: CreatePostComponent,
  execute: async (action: CellAction<CreatePostFormData>): Promise<CellResult<Post>> => {
    return await simulateCreatePost(action.payload, action.metadata?.userId || '');
  },
  validate: (action: CellAction<CreatePostFormData>): boolean => {
    const { content, mediaFiles } = action.payload;
    return !!(content?.trim() || mediaFiles?.length > 0);
  },
  onSuccess: (result: CellResult<Post>) => {
    console.log('✅ Post created successfully:', result);
  },
  onError: (error: string) => {
    console.error('❌ Post creation failed:', error);
  }
};

export default CreatePostComponent;
