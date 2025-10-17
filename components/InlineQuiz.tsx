import React, { useState } from 'react';
import { StarCoinIcon } from './icons';

interface InlineQuizProps {
    question: string;
    choices: string[];
    correctAnswerIndex: number;
    onCorrect: () => void;
}

const InlineQuiz: React.FC<InlineQuizProps> = ({ question, choices, correctAnswerIndex, onCorrect }) => {
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);

    const handleSelect = (index: number) => {
        if (isAnswered) return;
        setSelectedAnswer(index);
        setIsAnswered(true);
        if (index === correctAnswerIndex) {
            onCorrect();
        }
    };

    return (
        <div className="my-4 p-4 bg-gray-800/50 border-l-4 border-green-400 rounded-r-lg">
            <p className="font-bold text-gray-200 mb-3">{question}</p>
            <div className="space-y-2">
                {choices.map((choice, index) => {
                    let feedbackClass = '';
                    if (isAnswered) {
                        if (index === correctAnswerIndex) {
                            feedbackClass = 'bg-green-500/30 border-green-500';
                        } else if (index === selectedAnswer) {
                            feedbackClass = 'bg-red-500/30 border-red-500';
                        }
                    }
                    return (
                        <button
                            key={index}
                            onClick={() => handleSelect(index)}
                            disabled={isAnswered}
                            className={`w-full text-left p-3 rounded-md border-2 transition-colors ${feedbackClass || 'bg-gray-700/50 border-gray-600 hover:bg-gray-700'}`}
                        >
                            {choice}
                        </button>
                    );
                })}
            </div>
            {isAnswered && selectedAnswer === correctAnswerIndex && (
                 <p className="text-sm text-green-300 mt-3 flex items-center gap-1 font-semibold">
                    Chính xác! Bạn nhận được 5 <StarCoinIcon className="w-4 h-4 text-yellow-300" />
                </p>
            )}
        </div>
    );
};

export default InlineQuiz;