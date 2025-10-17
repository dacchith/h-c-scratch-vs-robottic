import React from 'react';
import { GiftIcon, StarCoinIcon } from './icons';

interface DailyRewardModalProps {
    onClaim: () => void;
    rewardAmount: number;
}

const DailyRewardModal: React.FC<DailyRewardModalProps> = ({ onClaim, rewardAmount }) => {

    const handleModalContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
        >
            <style>{`
                @keyframes modal-fade-in-reward { 0% { opacity: 0; } 100% { opacity: 1; } }
                @keyframes modal-slide-up-reward { 0% { transform: translateY(20px) scale(0.9); opacity: 0; } 100% { transform: translateY(0) scale(1); opacity: 1; } }
                @keyframes confetti-fall { 0% { transform: translateY(-100%); opacity: 1; } 100% { transform: translateY(100vh); opacity: 0; } }
            `}</style>
            <div
                className="bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full border-2 border-yellow-400 text-center p-8 relative overflow-hidden"
                onClick={handleModalContentClick}
                style={{ animation: 'modal-fade-in-reward 0.2s ease-out, modal-slide-up-reward 0.4s cubic-bezier(0.25, 1, 0.5, 1)' }}
            >
                <GiftIcon className="w-20 h-20 text-yellow-400 mx-auto mb-4" />
                <h2 className="text-3xl font-black text-white">Phần thưởng Hàng ngày!</h2>
                <p className="text-gray-300 text-lg mt-2 mb-6">
                    Chào mừng bạn trở lại! Hãy nhận phần thưởng đăng nhập hôm nay nhé.
                </p>

                <div className="bg-gray-900/50 inline-flex items-center gap-3 px-6 py-3 rounded-full mb-8">
                    <span className="text-4xl font-bold text-white">+{rewardAmount}</span>
                    <StarCoinIcon className="w-10 h-10 text-yellow-400" />
                </div>

                <button
                    onClick={onClaim}
                    className="w-full bg-yellow-500 text-gray-900 font-bold py-4 px-6 rounded-lg hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 shadow-lg text-xl"
                >
                    Nhận thưởng!
                </button>
            </div>
        </div>
    );
};

export default DailyRewardModal;
