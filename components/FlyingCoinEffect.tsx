import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { StarCoinIcon } from './icons';

interface FlyingCoinEffectProps {
    startRect: DOMRect;
    targetRef: React.RefObject<HTMLElement>;
    onComplete: () => void;
}

const NUM_COINS = 5;
const ANIMATION_DURATION = 800; // ms

const FlyingCoinEffect: React.FC<FlyingCoinEffectProps> = ({ startRect, targetRef, onComplete }) => {
    const [coins, setCoins] = useState<Array<{ id: number, style: React.CSSProperties }>>([]);

    useEffect(() => {
        const targetRect = targetRef.current?.getBoundingClientRect();
        if (!targetRect) {
            onComplete();
            return;
        }

        const initialCoins = Array.from({ length: NUM_COINS }).map((_, i) => ({
            id: i,
            style: {
                position: 'fixed',
                left: `${startRect.left + startRect.width / 2}px`,
                top: `${startRect.top + startRect.height / 2}px`,
                transform: 'translate(-50%, -50%) scale(1.2)',
                transition: `all ${ANIMATION_DURATION}ms cubic-bezier(0.5, 0, 1, 0.5)`,
                transitionDelay: `${i * 50}ms`,
                opacity: 1,
                zIndex: 100,
            } as React.CSSProperties,
        }));
        
        setCoins(initialCoins);

        // After a short delay, trigger the animation to the target
        const animationTimeout = setTimeout(() => {
            setCoins(currentCoins => currentCoins.map(coin => ({
                ...coin,
                style: {
                    ...coin.style,
                    left: `${targetRect.left + targetRect.width / 2 + (Math.random() * 20 - 10)}px`,
                    top: `${targetRect.top + targetRect.height / 2 + (Math.random() * 20 - 10)}px`,
                    transform: 'translate(-50%, -50%) scale(0.2)',
                    opacity: 0,
                },
            })));
        }, 50);

        // Clean up after the animation is complete
        const cleanupTimeout = setTimeout(onComplete, ANIMATION_DURATION + NUM_COINS * 50);

        return () => {
            clearTimeout(animationTimeout);
            clearTimeout(cleanupTimeout);
        };
    }, [startRect, targetRef, onComplete]);

    if (coins.length === 0) {
        return null;
    }

    return ReactDOM.createPortal(
        <>
            {coins.map(coin => (
                <div key={coin.id} style={coin.style}>
                    <StarCoinIcon className="w-6 h-6 text-yellow-400 drop-shadow-lg" />
                </div>
            ))}
        </>,
        document.body
    );
};

export default FlyingCoinEffect;