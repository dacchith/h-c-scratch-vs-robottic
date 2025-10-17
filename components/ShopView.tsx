import React from 'react';
import type { UserProfile, ShopItem } from '../types';
import { SHOP_ITEMS } from '../constants';
import { StarCoinIcon, CheckIcon } from './icons';

interface ShopItemCardProps {
    item: ShopItem;
    userProfile: UserProfile;
    onPurchase: (item: ShopItem) => void;
}

const ShopItemCard: React.FC<ShopItemCardProps> = ({ item, userProfile, onPurchase }) => {
    const isPurchased = userProfile.purchasedItems.includes(item.id);
    const canAfford = userProfile.starCoins >= item.price;
    const isEquipped = isPurchased; // Simplified: if purchased, it's equipped

    let buttonContent;
    let buttonClasses = "w-full font-bold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 text-lg ";

    if (isEquipped) {
        buttonContent = <div className="flex items-center justify-center gap-2"><CheckIcon /> Đã trang bị</div>;
        buttonClasses += "bg-green-600 text-white cursor-not-allowed";
    } else if (canAfford) {
        buttonContent = "Mua ngay";
        buttonClasses += "bg-lime-500 hover:bg-lime-600 text-white shadow-lg";
    } else {
        buttonContent = "Không đủ Sao";
        buttonClasses += "bg-gray-600 text-gray-400 cursor-not-allowed";
    }

    return (
        <div className="bg-gray-800/60 p-6 rounded-2xl flex flex-col items-center text-center border border-gray-700 shadow-lg">
            <div className="w-24 h-24 bg-gray-900/50 rounded-full flex items-center justify-center mb-4">
                <item.icon className="w-16 h-16" />
            </div>
            <h3 className="text-xl font-bold text-white mb-1">{item.name}</h3>
            <div className="flex items-center gap-2 mb-4">
                <StarCoinIcon className="w-6 h-6 text-yellow-400" />
                <span className="text-2xl font-bold text-yellow-400">{item.price}</span>
            </div>
            <div className="mt-auto w-full">
                <button onClick={() => onPurchase(item)} disabled={isEquipped || !canAfford} className={buttonClasses}>
                    {buttonContent}
                </button>
            </div>
        </div>
    );
};


interface ShopViewProps {
    userProfile: UserProfile;
    shopItems: ShopItem[];
    onPurchase: (item: ShopItem) => void;
}

const ShopView: React.FC<ShopViewProps> = ({ userProfile, shopItems, onPurchase }) => {
    return (
        <div className="p-8 max-w-7xl mx-auto animate-fade-in">
             <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-4xl font-black text-lime-400">Cửa hàng Vật phẩm</h1>
                    <p className="text-gray-400 mt-1 text-lg">Dùng Sao Vàng để trang trí cho bạn đồng hành Sparky!</p>
                </div>
                <div className="flex-shrink-0 bg-gray-800/80 px-4 py-2 rounded-full flex items-center gap-3">
                    <StarCoinIcon className="w-8 h-8 text-yellow-400" />
                    <span className="text-3xl font-bold text-white">{userProfile.starCoins}</span>
                </div>
            </div>

             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {shopItems.map(item => (
                    <ShopItemCard 
                        key={item.id}
                        item={item}
                        userProfile={userProfile}
                        onPurchase={onPurchase}
                    />
                ))}
            </div>

        </div>
    );
};

export default ShopView;
