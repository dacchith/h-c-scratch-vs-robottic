import React from 'react';
import type { DailyQuest, UserProfile } from '../types';
import { DAILY_QUESTS_POOL } from '../constants';
import { QuestIcon, StarCoinIcon, CheckIcon } from './icons';

interface DailyQuestsProps {
    userProfile: UserProfile;
    onClaimQuest: (questId: string, reward: number) => void;
}

const DailyQuests: React.FC<DailyQuestsProps> = ({ userProfile, onClaimQuest }) => {
    const questsData = userProfile.dailyQuests;

    if (!questsData) {
        return <div>Đang tải nhiệm vụ...</div>;
    }

    return (
        <div className="bg-gray-800/60 p-6 rounded-2xl border border-gray-700 shadow-lg">
            <h3 className="text-xl font-black text-white mb-4 flex items-center gap-2">
                <QuestIcon /> Nhiệm vụ Hàng ngày
            </h3>
            <div className="space-y-4">
                {questsData.quests.map(userQuest => {
                    const questInfo = DAILY_QUESTS_POOL.find(q => q.id === userQuest.questId);
                    if (!questInfo) return null;

                    const isCompleted = userQuest.progress >= questInfo.target;
                    const progressPercentage = Math.min((userQuest.progress / questInfo.target) * 100, 100);

                    return (
                        <div key={userQuest.questId} className="bg-gray-900/50 p-4 rounded-lg">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="font-semibold text-gray-200">{questInfo.description}</p>
                                    <div className="w-full bg-gray-700 rounded-full h-2 my-2 overflow-hidden">
                                        <div 
                                            className="bg-amber-500 h-full rounded-full transition-all duration-300"
                                            style={{ width: `${progressPercentage}%` }}
                                        ></div>
                                    </div>
                                    <p className="text-xs text-gray-400">{userQuest.progress} / {questInfo.target}</p>
                                </div>
                                <div className="flex-shrink-0 ml-4">
                                    {userQuest.claimed ? (
                                        <button disabled className="flex items-center gap-2 bg-green-600/50 text-white font-bold py-2 px-3 rounded-lg text-sm cursor-not-allowed">
                                            <CheckIcon /> Đã nhận
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => onClaimQuest(userQuest.questId, questInfo.reward)}
                                            disabled={!isCompleted}
                                            className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-3 rounded-lg text-sm transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
                                        >
                                            <StarCoinIcon className="w-4 h-4"/> {questInfo.reward}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default DailyQuests;