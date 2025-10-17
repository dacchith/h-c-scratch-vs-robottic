import React, { useMemo } from 'react';
import { SHOP_ITEMS } from '../constants';
import type { ShopItem } from '../types';

interface SparkyProps {
    purchasedItems: string[];
}

const Sparky: React.FC<SparkyProps> = ({ purchasedItems }) => {

    const accessories = useMemo(() => {
        const items = purchasedItems.map(id => SHOP_ITEMS.find(item => item.id === id)).filter(Boolean) as ShopItem[];
        return {
            hat: items.find(item => item.type === 'hat'),
            accessory: items.find(item => item.type === 'accessory'),
            color: items.find(item => item.type === 'color')
        }
    }, [purchasedItems]);

    const robotColor = accessories.color ? accessories.color.value : '#a5b4fc'; // default indigo-300

    const renderHat = () => {
        if (!accessories.hat) return null;
        switch(accessories.hat.value) {
            case 'propeller-hat':
                return (
                    <div className="absolute top-[-25px] left-1/2 -translate-x-1/2 w-16 h-16 animate-spin-slow">
                        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-500 rounded-full"></div>
                        <div className="absolute top-0 left-1/2 w-1 h-full bg-gray-500 rounded-full"></div>
                        <div className="absolute top-1/2 left-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2 bg-yellow-400 rounded-full"></div>
                    </div>
                );
            case 'party-hat':
                 return (
                    <div 
                        className="absolute top-[-50px] left-1/2 -translate-x-1/2 w-0 h-0"
                        style={{
                            borderLeft: '30px solid transparent',
                            borderRight: '30px solid transparent',
                            borderBottom: '60px solid #f87171' // red-400
                        }}
                    ></div>
                );
            default:
                return null;
        }
    }

    const renderAccessory = () => {
         if (!accessories.accessory) return null;
         switch(accessories.accessory.value) {
            case 'sunglasses':
                return (
                    <div className="absolute top-[35%] left-1/2 -translate-x-1/2 flex items-center gap-1">
                        <div className="w-8 h-6 bg-gray-900 rounded-md border-2 border-gray-700"></div>
                        <div className="w-8 h-6 bg-gray-900 rounded-md border-2 border-gray-700"></div>
                    </div>
                );
            default:
                return null;
         }
    }

    return (
        <div className="relative w-48 h-48 flex items-center justify-center">
            <style>{`
                @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                .animate-spin-slow { animation: spin-slow 5s linear infinite; }
                @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
                .animate-float { animation: float 3s ease-in-out infinite; }
            `}</style>
            
            <div className="relative animate-float">
                {/* Body */}
                <div className="w-28 h-32 rounded-t-full rounded-b-2xl shadow-lg border-4 border-gray-700" style={{backgroundColor: robotColor}}></div>
                {/* Eyes */}
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-16 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                     <div className="w-4 h-4 bg-cyan-300 rounded-full animate-ping-slow"></div>
                </div>
                 {/* Feet */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-6">
                    <div className="w-8 h-4 rounded-full" style={{backgroundColor: robotColor, filter: 'brightness(0.7)'}}></div>
                    <div className="w-8 h-4 rounded-full" style={{backgroundColor: robotColor, filter: 'brightness(0.7)'}}></div>
                </div>

                {renderHat()}
                {renderAccessory()}
            </div>
        </div>
    )
}

export default Sparky;