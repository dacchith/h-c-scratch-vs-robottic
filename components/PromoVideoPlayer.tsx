import React, { useState, useEffect } from 'react';

type Scene = 'intro' | 'scratch' | 'robotics' | 'tutor' | 'outro';

const scenes: { name: Scene; duration: number }[] = [
    { name: 'intro', duration: 3000 },
    { name: 'scratch', duration: 5000 },
    { name: 'robotics', duration: 5000 },
    { name: 'tutor', duration: 5000 },
    { name: 'outro', duration: 4000 },
];

const totalDuration = scenes.reduce((acc, scene) => acc + scene.duration, 0);

const PromoVideoPlayer: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [currentScene, setCurrentScene] = useState<Scene>('intro');
    const [progress, setProgress] = useState(0);
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        let sceneIndex = 0;
        const nextScene = () => {
            sceneIndex++;
            if (sceneIndex < scenes.length) {
                setCurrentScene(scenes[sceneIndex].name);
                setTimeout(nextScene, scenes[sceneIndex].duration);
            } else {
                setIsFinished(true);
            }
        };
        const sceneTimeout = setTimeout(nextScene, scenes[0].duration);

        const startTime = Date.now();
        const progressInterval = setInterval(() => {
            const elapsedTime = Date.now() - startTime;
            const currentProgress = Math.min((elapsedTime / totalDuration) * 100, 100);
            setProgress(currentProgress);
            if (currentProgress >= 100) {
                clearInterval(progressInterval);
            }
        }, 100);

        return () => {
            clearTimeout(sceneTimeout);
            clearInterval(progressInterval);
        };
    }, []);

    const renderScene = () => {
        const sceneBaseClasses = "absolute inset-0 w-full h-full flex flex-col items-center justify-center text-center p-8 transition-opacity duration-700";
        
        return (
            <>
                {/* Intro Scene */}
                <div className={`${sceneBaseClasses} ${currentScene === 'intro' ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="animate-zoom-in">
                        <i className="fa-solid fa-brain text-6xl bg-gradient-to-r from-purple-500 to-cyan-500 text-transparent bg-clip-text mb-4"></i>
                        <h2 className="text-4xl font-bold text-white">Giải phóng nhà sáng tạo bên trong bạn!</h2>
                    </div>
                </div>

                {/* Scratch Scene */}
                <div className={`${sceneBaseClasses} ${currentScene === 'scratch' ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="relative w-64 h-32 bg-gray-700 rounded-lg p-4 flex items-center justify-center">
                        <i className="fa-solid fa-cat text-5xl text-orange-400 animate-move-right-promo"></i>
                        <div className="absolute top-4 left-4 font-mono text-sm bg-cyan-500 text-white px-2 py-1 rounded animate-block-appear">move (10) steps</div>
                    </div>
                    <h3 className="text-2xl font-semibold text-white mt-6 animate-text-fade-in">Tạo ra trò chơi và hoạt ảnh</h3>
                </div>

                {/* Robotics Scene */}
                <div className={`${sceneBaseClasses} ${currentScene === 'robotics' ? 'opacity-100' : 'opacity-0'}`}>
                     <div className="relative w-64 h-32 bg-gray-700 rounded-lg p-4 flex items-center justify-center">
                        <i className="fa-solid fa-robot text-5xl text-cyan-400 animate-shake-promo"></i>
                        <div className="absolute top-4 left-4 font-mono text-sm bg-yellow-500 text-white px-2 py-1 rounded animate-block-appear">motor_run</div>
                    </div>
                    <h3 className="text-2xl font-semibold text-white mt-6 animate-text-fade-in">Điều khiển robot của riêng bạn</h3>
                </div>
                
                {/* AI Tutor Scene */}
                <div className={`${sceneBaseClasses} ${currentScene === 'tutor' ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="w-80 bg-gray-700 rounded-lg p-4 space-y-2">
                        <p className="text-left text-sm bg-blue-600 text-white p-2 rounded-lg rounded-bl-none animate-chat-user">Làm sao để nhân vật nhảy lên ạ?</p>
                        <p className="text-left text-sm bg-gray-600 text-white p-2 rounded-lg rounded-br-none animate-chat-bot">Tuyệt vời! Con có thể dùng khối `thay đổi y một lượng`...</p>
                    </div>
                    <h3 className="text-2xl font-semibold text-white mt-6 animate-text-fade-in">Người hướng dẫn AI cá nhân của bạn</h3>
                </div>

                {/* Outro Scene */}
                <div className={`${sceneBaseClasses} ${currentScene === 'outro' ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="animate-zoom-in">
                        <h2 className="text-4xl font-bold text-white mb-4">Trung tâm Học tập Scratch & Robotics</h2>
                        <button onClick={onClose} className="bg-purple-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-purple-700 transition-all transform hover:scale-105">
                            Bắt đầu cuộc phiêu lưu
                        </button>
                    </div>
                </div>
            </>
        );
    };

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 animate-modal-fade-in" onClick={onClose}>
            <style>{`
                @keyframes modal-fade-in { 0% { opacity: 0; } 100% { opacity: 1; } }
                @keyframes modal-slide-up { 0% { transform: translateY(20px) scale(0.95); opacity: 0; } 100% { transform: translateY(0) scale(1); opacity: 1; } }
                @keyframes zoom-in { 0% { transform: scale(0.8); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
                @keyframes text-fade-in { 0% { opacity: 0; transform: translateY(10px); } 100% { opacity: 1; transform: translateY(0); } }
                @keyframes block-appear { 0% { opacity: 0; transform: scale(0.5); } 100% { opacity: 1; transform: scale(1); } }
                @keyframes move-right-promo { 0%, 100% { transform: translateX(-40px); } 50% { transform: translateX(40px); } }
                @keyframes shake-promo { 0%, 100% { transform: rotate(0deg); } 25% { transform: rotate(-5deg); } 75% { transform: rotate(5deg); } }
                @keyframes chat-user { 0% { opacity: 0; transform: translateX(20px); } 100% { opacity: 1; transform: translateX(0); } }
                @keyframes chat-bot { 0% { opacity: 0; transform: translateX(-20px); } 100% { opacity: 1; transform: translateX(0); } }
            `}</style>
            <div 
                className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-3xl aspect-video overflow-hidden border border-gray-700 relative flex flex-col animate-modal-slide-up"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex-1 relative">
                    {renderScene()}
                </div>
                
                {/* Progress Bar & Controls */}
                <div className="absolute bottom-0 left-0 w-full p-4 bg-black/20">
                    <div className="w-full bg-gray-600 rounded-full h-1.5">
                        <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: `${progress}%` }}></div>
                    </div>
                </div>
                
                {/* Close Button */}
                <button onClick={onClose} className="absolute top-4 right-4 bg-gray-900/50 w-8 h-8 rounded-full text-white hover:bg-gray-900 transition-colors flex items-center justify-center text-xl" aria-label="Đóng">
                    &times;
                </button>

                {isFinished && (
                     <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <button onClick={onClose} className="bg-purple-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-purple-700 transition-all transform hover:scale-105">
                           Bắt đầu lại cuộc phiêu lưu
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PromoVideoPlayer;