import React, { useState, useCallback } from 'react';

interface AddProjectModalProps {
  onClose: () => void;
  onSubmit: (projectData: { title: string; description: string; imageUrl: string }) => void;
}

const AddProjectModal: React.FC<AddProjectModalProps> = ({ onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');

  const handleModalContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !imageUrl.trim()) {
      setError('Vui lòng điền đầy đủ tất cả các trường.');
      return;
    }
    // Basic URL validation
    try {
        new URL(imageUrl);
    } catch (_) {
        setError('Vui lòng nhập một URL hình ảnh hợp lệ.');
        return;
    }

    onSubmit({ title, description, imageUrl });
  }, [title, description, imageUrl, onSubmit]);

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <style>{`
          @keyframes modal-fade-in-form { 0% { opacity: 0; } 100% { opacity: 1; } }
          @keyframes modal-slide-up-form { 0% { transform: translateY(20px); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }
      `}</style>
      <div
        className="bg-gray-800 rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-gray-700"
        onClick={handleModalContentClick}
        style={{ animation: 'modal-fade-in-form 0.2s ease-out, modal-slide-up-form 0.3s ease-out' }}
      >
        <div className="p-8">
            <div className="flex justify-between items-start mb-6">
                <h2 className="text-3xl font-bold text-white">Chia sẻ Sáng tạo của bạn</h2>
                 <button 
                    onClick={onClose} 
                    className="bg-gray-900/50 w-8 h-8 rounded-full text-white hover:bg-gray-900 transition-colors flex items-center justify-center text-xl flex-shrink-0"
                    aria-label="Đóng"
                >
                    &times;
                </button>
            </div>
          
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">Tên dự án</label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Ví dụ: Game Mèo Phiêu Lưu Ký"
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 transition-shadow"
                    />
                </div>
                 <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">Mô tả ngắn</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Hãy mô tả ngắn về dự án của bạn..."
                        rows={3}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 transition-shadow"
                    />
                </div>
                 <div>
                    <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-300 mb-2">URL Hình ảnh hoặc GIF</label>
                    <input
                        id="imageUrl"
                        type="text"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="https://example.com/image.gif"
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 transition-shadow"
                    />
                </div>

                {error && <p className="text-red-400 text-sm">{error}</p>}

                <div className="pt-2 flex justify-end">
                     <button
                        type="submit"
                        className="bg-pink-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:bg-gray-600 disabled:cursor-not-allowed"
                     >
                        Đăng dự án
                    </button>
                </div>
            </form>
        </div>
      </div>
    </div>
  );
};

export default AddProjectModal;
