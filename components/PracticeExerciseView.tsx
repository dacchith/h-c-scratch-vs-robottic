import React, { useState, useEffect } from 'react';
import type { PracticeExercise } from '../types';
import { CheckIcon, StarCoinIcon, ArrowUpIcon, ArrowDownIcon } from './icons';

interface PracticeExerciseViewProps {
    exercise: PracticeExercise;
    isCompleted: boolean;
    onComplete: (exerciseId: string, reward: number, sourceRect: DOMRect | null) => void;
}

const PracticeExerciseView: React.FC<PracticeExerciseViewProps> = ({ exercise, isCompleted, onComplete }) => {
    // Initialize state correctly based on the exercise type to prevent null errors.
    const [userAnswer, setUserAnswer] = useState<any>(() => {
        if (exercise.data.type === 'code_block_order') {
            return Array.from({ length: exercise.data.blocks.length }, (_, i) => i);
        }
        if (exercise.data.type === 'multiple_choice') {
            return null;
        }
        return '';
    });
    const [feedback, setFeedback] = useState<{ correct: boolean, message: string } | null>(null);
    const checkButtonRef = React.useRef<HTMLButtonElement>(null);
    
    // Effect to reset the answer when the exercise prop changes.
    // This prevents showing an answer from a previous exercise.
    useEffect(() => {
        setFeedback(null);
        if (exercise.data.type === 'code_block_order') {
            setUserAnswer(Array.from({ length: exercise.data.blocks.length }, (_, i) => i));
        } else if (exercise.data.type === 'multiple_choice') {
            setUserAnswer(null);
        } else {
            setUserAnswer('');
        }
    }, [exercise.id]);

    const checkAnswer = () => {
        if (isCompleted) return;

        let isCorrect = false;
        const { data } = exercise;

        switch (data.type) {
            case 'fill_in_the_blank':
                isCorrect = userAnswer.trim().toLowerCase() === data.correctAnswer.toLowerCase();
                break;
            case 'multiple_choice':
                isCorrect = userAnswer === data.correctAnswerIndex;
                break;
            case 'code_block_order':
                isCorrect = Array.isArray(userAnswer) && JSON.stringify(userAnswer) === JSON.stringify(data.correctOrder);
                break;
        }

        if (isCorrect) {
            setFeedback({ correct: true, message: `Chính xác! Bạn nhận được ${exercise.reward} Sao Vàng!` });
            onComplete(exercise.id, exercise.reward, checkButtonRef.current?.getBoundingClientRect() ?? null);
        } else {
            setFeedback({ correct: false, message: 'Chưa đúng rồi, hãy thử lại nhé!' });
        }
    };

    const handleMoveBlock = (index: number, direction: 'up' | 'down') => {
        if (!Array.isArray(userAnswer)) return;
        const newOrder = [...userAnswer];
        if (direction === 'up' && index > 0) {
            [newOrder[index], newOrder[index - 1]] = [newOrder[index - 1], newOrder[index]];
        }
        if (direction === 'down' && index < newOrder.length - 1) {
            [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
        }
        setUserAnswer(newOrder);
        setFeedback(null);
    };

    const renderExercise = () => {
        const { data } = exercise;
        switch (data.type) {
            case 'fill_in_the_blank':
                return (
                    <div>
                        <p className="text-gray-300 mb-3">{data.question.replace('_____', '______')}</p>
                        <input
                            type="text"
                            value={userAnswer}
                            onChange={(e) => {
                                setUserAnswer(e.target.value);
                                setFeedback(null);
                            }}
                            className="w-full md:w-1/2 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                            disabled={isCompleted}
                        />
                    </div>
                );
            
            case 'multiple_choice':
                return (
                     <div>
                        <p className="text-gray-300 mb-4 font-semibold">{data.question}</p>
                        <div className="space-y-2">
                            {data.choices.map((choice, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        setUserAnswer(index);
                                        setFeedback(null);
                                    }}
                                    className={`w-full text-left p-3 rounded-lg border-2 transition-colors ${
                                        userAnswer === index ? 'bg-green-800/50 border-green-500' : 'bg-gray-700/50 border-gray-600 hover:bg-gray-700'
                                    }`}
                                    disabled={isCompleted}
                                >
                                    {choice}
                                </button>
                            ))}
                        </div>
                    </div>
                );
            
             case 'code_block_order':
                if (!Array.isArray(userAnswer)) return null;
                return (
                    <div>
                        <p className="text-gray-300 mb-4">{exercise.description}</p>
                        <div className="space-y-2 p-3 bg-gray-900/50 rounded-md border border-gray-600">
                             {userAnswer.map((blockIndex: number, displayIndex: number) => (
                                <div key={displayIndex} className="flex items-center gap-2 bg-gray-700 p-2 rounded-md">
                                    <p className="font-mono text-cyan-300 flex-grow">{data.blocks[blockIndex]}</p>
                                    {!isCompleted && (
                                        <div className="flex gap-1">
                                            <button onClick={() => handleMoveBlock(displayIndex, 'up')} disabled={displayIndex === 0} className="p-1 rounded-md bg-gray-600 hover:bg-gray-500 disabled:opacity-30"><ArrowUpIcon className="w-4 h-4" /></button>
                                            <button onClick={() => handleMoveBlock(displayIndex, 'down')} disabled={displayIndex === data.blocks.length - 1} className="p-1 rounded-md bg-gray-600 hover:bg-gray-500 disabled:opacity-30"><ArrowDownIcon className="w-4 h-4" /></button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className={`bg-gray-800/70 p-6 rounded-xl border-2 ${isCompleted ? 'border-green-500/50' : 'border-gray-700'}`}>
            <h4 className="text-lg font-bold text-green-400">{exercise.title}</h4>
            <div className="my-4">{renderExercise()}</div>

            {feedback && (
                <div className={`p-3 rounded-md text-sm my-3 flex items-center gap-2 ${feedback.correct ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                    {feedback.message}
                    {feedback.correct && <StarCoinIcon className="w-5 h-5 text-yellow-400" />}
                </div>
            )}
            
            {!isCompleted && (
                 <button
                    ref={checkButtonRef}
                    onClick={checkAnswer}
                    className="bg-green-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
                 >
                    Kiểm tra
                </button>
            )}

            {isCompleted && (
                 <div className="flex items-center gap-2 text-green-400 font-semibold">
                    <CheckIcon />
                    <span>Đã hoàn thành!</span>
                 </div>
            )}

        </div>
    );
};

export default PracticeExerciseView;