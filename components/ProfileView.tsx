import React from 'react';
import type { UserProfile, Badge } from '../types';
import { COINS_PER_LEVEL } from '../constants';
import { UserIcon, StarCoinIcon } from './icons';

interface ProfileViewProps {
  userProfile: UserProfile;
  allBadges: Badge[];
}

const BadgeCard: React.FC<{ badge: Badge, isUnlocked: boolean }> = ({ badge, isUnlocked }) => {
    const cardClasses = `bg-gray-800/60 border border-gray-700 rounded-lg p-6 flex flex-col items-center text-center transition-all duration-300 ${isUnlocked ? 'shadow-lg' : 'opacity-50'}`;
    const iconContainerClasses = `w-24 h-24 rounded-full flex items-center justify-center mb-4 transition-all duration-300 ${isUnlocked ? 'bg-yellow-500/10' : 'bg-gray-700'}`;

    return (
        <div className={cardClasses}>
            <div className={iconContainerClasses}>
                <badge.icon className={`w-12 h-12 transition-colors duration-300 ${isUnlocked ? 'text-yellow-400' : 'text-gray-500'}`} />
            </div>
            <h3 className={`font-bold text-lg ${isUnlocked ? 'text-white' : 'text-gray-400'}`}>{badge.name}</h3>
            <p className="text-sm text-gray-400 mt-1">{badge.description}</p>
        </div>
    );
};


const ProfileView: React.FC<ProfileViewProps> = ({ userProfile, allBadges }) => {
    const coinsForNextLevel = COINS_PER_LEVEL;
    const coinsInCurrentLevel = userProfile.starCoins % coinsForNextLevel;
    const progressPercentage = (coinsInCurrentLevel / coinsForNextLevel) * 100;
  
    const unlockedBadges = allBadges.filter(b => userProfile.badges.includes(b.id));
    const lockedBadges = allBadges.filter(b => !userProfile.badges.includes(b.id));

    return (
        <div className="p-8 max-w-7xl mx-auto animate-fade-in">
            <div className="flex flex-col sm:flex-row items-center gap-6 mb-10">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-full shadow-lg">
                    <UserIcon className="w-16 h-16 text-white" />
                </div>
                <div>
                    <h1 className="text-4xl font-bold text-white">Hồ sơ của bé</h1>
                    <p className="text-gray-400 text-lg">Đây là hành trình của bạn, hãy tiếp tục chinh phục!</p>
                </div>
            </div>

            {/* Stats Section */}
            <div className="bg-gray-800/50 p-8 rounded-2xl shadow-xl border border-gray-700 mb-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                    <div className="text-center md:text-left">
                        <p className="text-yellow-400 font-bold text-sm uppercase">Cấp độ</p>
                        <p className="text-6xl font-bold text-white">{userProfile.level}</p>
                    </div>
                     <div className="text-center">
                        <p className="text-yellow-400 font-bold text-sm uppercase">Tổng Sao Vàng</p>
                        <div className="flex items-center justify-center gap-2 mt-2">
                             <StarCoinIcon className="w-10 h-10 text-yellow-400" />
                            <p className="text-5xl font-bold text-white">{userProfile.starCoins}</p>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between font-semibold text-gray-300 mb-2">
                            <span>Tiến trình lên cấp</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden border-2 border-gray-600">
                            <div 
                                className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full transition-all duration-500 ease-out text-center text-xs font-bold text-white flex items-center justify-center" 
                                style={{ width: `${progressPercentage}%` }}
                            >
                               {coinsInCurrentLevel}/{coinsForNextLevel}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Badges Section */}
            <div>
                {unlockedBadges.length > 0 && (
                     <>
                        <h2 className="text-3xl font-bold text-white mb-6">Huy hiệu đã đạt được</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {unlockedBadges.map(badge => (
                                <BadgeCard key={badge.id} badge={badge} isUnlocked={true} />
                            ))}
                        </div>
                    </>
                )}

                {lockedBadges.length > 0 && (
                    <>
                        <h2 className="text-3xl font-bold text-white mt-12 mb-6">Thử thách tiếp theo</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {lockedBadges.map(badge => (
                                <BadgeCard key={badge.id} badge={badge} isUnlocked={false} />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ProfileView;