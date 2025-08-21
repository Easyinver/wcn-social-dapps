// src/components/posts/CreatePostModal.tsx
import React from 'react';
import CreatePostComponent from '../../cells/posts/CreatePostCell';
import { Post } from '../../types/post';

interface CreatePostModalProps {
  onClose: () => void;
  onSuccess?: (post: Post) => void;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({ onClose, onSuccess }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CreatePostComponent
          onSuccess={onSuccess}
          onClose={onClose}
        />
      </div>
    </div>
  );
};

export default CreatePostModal;