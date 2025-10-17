import React, { useState } from 'react';
import type { CodingChallenge as ChallengeType } from '../types';
import { getDebugHint } from '../services/geminiService';
import { LightbulbIcon } from './icons';

interface CodingChallengeProps {
    challenge: ChallengeType;
    onRunScript: (script: string[]) => void;
}

const CodingChallenge: React.FC<CodingChallengeProps> = ({ challenge, onRunScript }) => {
    const [userScript, setUserScript] = useState<string[]>([]);
    const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | 'none', message: string }>({ type: 'none', message: '' });
    const [aiHint, setAiHint] = useState<string | null>(null);
    const [isHintLoading, setIsHintLoading] = useState(false);

    const resetFeedback = () => {
        setFeedback({ type: 'none', message: '' });
        setAiHint(null);
    }

    const addBlockToScript = (block: string) => {
        setUserScript([...userScript, block]);
        resetFeedback();
    };

    const handleCheckSolution = () => {
        if (JSON.stringify(userScript) === JSON.stringify(challenge.solution)) {
            setFeedback({ type: 'success', message: challenge.successMessage });
            setAiHint(null);
        } else {
            setFeedback({ type: 'error', message: 'Chưa đúng lắm. Hãy thử lại nhé! Kiểm tra thứ tự các khối xem.' });
        }
    };

    const handleGetAiHint = async () => {
        setIsHintLoading(true);
        setAiHint(null);
        const hint = await getDebugHint(userScript, challenge.solution, challenge.description);
        setAiHint(hint);
        setIsHintLoading(false);
    }

    const handleRun = () => {
        onRunScript(userScript);
    }
    
    const handleClear = () => {
        setUserScript([]);
        resetFeedback();
    }

    return (
        <div className="mt-6 bg-gray-800/50 rounded-lg border border-gray-700 p-4 animate-fade-in">
            <h4 className="font-bold text-lg text-yellow-400 mb-2">Thử thách Lập trình!</h4>
            <p className="text-gray-300 text-sm mb-4">{challenge.description}</p>

            <div className="mb-4">
                <h5 className="text-sm font-semibold text-gray-400 mb-2">Hộp công cụ</h5>
                <div className="flex flex-wrap gap-2">
                    {challenge.toolbox.map(block => (
                        <button key={block} onClick={() => addBlockToScript(block)} className="font-mono bg-cyan-800/70 text-cyan-200 px-3 py-1 rounded-md text-sm hover:bg-cyan-700 transition-colors transform hover:scale-105">
                            {block}
                        </button>
                    ))}
                </div>
            </div>

            <div className="mb-4 p-3 bg-gray-900/50 rounded-md min-h-[120px] border border-gray-600">
                 <h5 className="text-sm font-semibold text-gray-400 mb-2">Kịch bản của bạn</h5>
                 {userScript.length === 0 ? (
                     <p className="text-gray-500 text-sm italic">Nhấp vào các khối từ Hộp công cụ để thêm vào đây.</p>
                 ) : (
                    <div className="space-y-2">
                        {userScript.map((block, index) => (
                            <div key={index} className="font-mono bg-gray-700 text-white px-3 py-2 rounded-md text-sm shadow-sm">{block}</div>
                        ))}
                    </div>
                 )}
            </div>
            
            {feedback.type !== 'none' && (
                <div className={`p-3 rounded-md text-sm mb-3 flex items-start gap-3 ${feedback.type === 'success' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                    <span>{feedback.message}</span>
                    {feedback.type === 'error' && !aiHint && (
                        <button 
                            onClick={handleGetAiHint} 
                            disabled={isHintLoading}
                            className="ml-auto flex-shrink-0 flex items-center gap-1 bg-yellow-500/20 text-yellow-300 text-xs font-bold px-2 py-1 rounded-md hover:bg-yellow-500/40 transition-colors disabled:opacity-50 disabled:cursor-wait"
                        >
                            <LightbulbIcon />
                            {isHintLoading ? 'Đang suy nghĩ...' : 'Nhờ AI Gợi ý'}
                        </button>
                    )}
                </div>
            )}

            {aiHint && (
                 <div className="p-3 rounded-md text-sm mb-3 bg-purple-500/10 text-purple-300 border-l-4 border-purple-400">
                    <p className="font-semibold mb-1 flex items-center gap-2"><LightbulbIcon /> Gợi ý từ Gia sư AI:</p>
                    <p className="whitespace-pre-wrap">{aiHint}</p>
                 </div>
            )}

            <div className="flex items-center justify-between">
                <div className="flex gap-2">
                    <button onClick={handleRun} className="bg-green-600 text-white font-semibold py-2 px-4 rounded-lg text-sm hover:bg-green-700 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed" disabled={userScript.length === 0}>
                        Chạy thử
                    </button>
                    <button onClick={handleCheckSolution} className="bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg text-sm hover:bg-yellow-700 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed" disabled={userScript.length === 0}>
                        Kiểm tra
                    </button>
                </div>
                <button onClick={handleClear} className="text-gray-400 hover:text-white text-sm transition-colors disabled:opacity-50" disabled={userScript.length === 0}>
                    Xóa kịch bản
                </button>
            </div>
        </div>
    );
};

export default CodingChallenge;