import React from 'react';
import type { UserProfile, LearningPath } from '../types';
import { LEARNING_PATHS } from '../constants';
import Sparky from './Sparky'; // Import the new Sparky component
import { StarCoinIcon } from './icons';
import DailyQuests from './DailyQuests'; // Import new component
import ForYouSuggestions from './ForYouSuggestions'; // Import new component

interface DashboardProps {
    completedLessons: Set<string>;
    userProfile: UserProfile;
    onSelectPath: (pathId: string) => void;
    onSelectLesson: (lessonId: string) => void;
    onClaimQuest: (questId: string, reward: number) => void;
}

const LearningPathCard: React.FC<{
    path: LearningPath;
    completedSteps: number;
    onSelectPath: (pathId: string) => void;
}> = ({ path, completedSteps, onSelectPath }) => {
    const totalSteps = path.steps.length;
    const progressPercentage = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0;
    const isCompleted = completedSteps === totalSteps;

    return (
        <div className="bg-gray-800/60 p-6 rounded-2xl flex flex-col border border-gray-700 shadow-lg transform hover:-translate-y-1 transition-transform duration-300">
            <div className="flex items-center mb-4">
                <div className="p-3 bg-gray-900/50 rounded-xl mr-4">
                    <path.icon className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">{path.title}</h3>
                  <p className="text-sm text-gray-400">Nhiệm vụ Phiêu lưu</p>
                </div>
            </div>
            <p className="text-gray-400 flex-grow mb-6 text-base">{path.description}</p>
            <div>
                <div className="flex justify-between text-sm text-gray-400 mb-2 font-bold">
                    <span>Tiến độ</span>
                    <span>{completedSteps} / {totalSteps} bài học</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                    <div 
                        className={`h-full rounded-full transition-all duration-500 ${isCompleted ? 'bg-green-500' : 'bg-purple-600'}`}
                        style={{ width: `${progressPercentage}%` }}
                    ></div>
                </div>
            </div>
            <button
                onClick={() => onSelectPath(path.id)}
                className="mt-6 w-full bg-purple-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:bg-gray-600 disabled:cursor-not-allowed text-lg"
            >
                {isCompleted ? "Xem lại" : (completedSteps > 0 ? "Tiếp tục" : "Bắt đầu")}
            </button>
        </div>
    );
};

const Dashboard: React.FC<DashboardProps> = ({ completedLessons, userProfile, onSelectPath, onSelectLesson, onClaimQuest }) => {
    return (
        <div className="p-6 md:p-10 animate-fade-in">
             <div className="max-w-7xl mx-auto">
                {/* Welcome Header */}
                <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
                    <div className="flex-shrink-0">
                         <Sparky purchasedItems={userProfile.purchasedItems} />
                    </div>
                    <div>
                         <h1 className="text-4xl md:text-5xl font-black text-white mb-2 leading-tight">
                            Chào mừng, Nhà Sáng Tạo!
                        </h1>
                        <p className="text-xl text-gray-400">
                            Sparky rất vui được gặp bạn! Hãy xem các nhiệm vụ và đề xuất hôm nay nhé!
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Learning Paths */}
                    <div className="lg:col-span-2 space-y-8">
                        {LEARNING_PATHS.map(path => {
                            const completedSteps = path.steps.filter(step => completedLessons.has(step.id)).length;
                            return (
                                <LearningPathCard 
                                    key={path.id}
                                    path={path}
                                    completedSteps={completedSteps}
                                    onSelectPath={onSelectPath}
                                />
                            );
                        })}
                    </div>

                    {/* Right Column: Quests and Suggestions */}
                    <div className="lg:col-span-1 space-y-8">
                        <DailyQuests userProfile={userProfile} onClaimQuest={onClaimQuest} />
                        <ForYouSuggestions completedLessons={completedLessons} onSelectLesson={onSelectLesson} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;