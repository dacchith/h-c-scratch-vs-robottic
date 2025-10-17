import React, { useState, useMemo, useEffect } from 'react';
import type { UserProfile, SimulationScenario, SimulationBlock } from '../types';
import { SIMULATION_SCENARIOS, SIMULATION_BLOCKS } from '../constants';
import { RobotIcon, ScratchIcon, CheckIcon, FlagIcon, TrashIcon } from './icons';

type ActiveAnimation = { command: string; key: number };

// --- Reusable Simulator Components (from LessonView) ---
const CatSprite: React.FC<{ animation: string | null }> = ({ animation }) => {
    const animationClass = animation === 'move (10) steps' ? 'animate-move-right' : 
                           animation === 'say Hello! for (2) seconds' ? 'animate-bounce' : 
                           animation === 'turn right (15) degrees' ? 'animate-spin-once' : 
                           animation === 'change color effect by (25)' ? 'animate-color-change' :
                           '';
    return (
        <div className="relative">
            <i className={`fa-solid fa-cat text-8xl text-orange-400 transition-all duration-500 ${animationClass}`}></i>
            {animation === 'say Hello! for (2) seconds' && <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-gray-800 px-3 py-1 rounded-full text-sm shadow-lg animate-fade-in-out">Yay!</div>}
        </div>
    );
};
const RoboticsSimulator: React.FC<{ animation: string | null }> = ({ animation }) => {
    const robotAnimation = animation === 'motor_run' ? 'animate-shake' : '';
    const armAnimation = animation === 'servo_turn' ? 'animate-arm-turn' : '';
    const obstacleVisible = animation === 'detect_obstacle';
    return (
        <div className="flex items-center justify-around w-full h-full relative">
            <div className="relative">
                <i className={`fa-solid fa-robot text-8xl text-cyan-400 transition-transform duration-500 ${robotAnimation}`}></i>
                <div className={`absolute top-1/2 left-0 w-8 h-2 bg-gray-400 rounded-full origin-right transition-transform duration-500 ${armAnimation}`}></div>
            </div>
            {obstacleVisible && <i className="fa-solid fa-cube text-5xl text-gray-500 transition-opacity duration-300 opacity-100"></i>}
        </div>
    );
};

const SimulationView: React.FC<{ userProfile: UserProfile, onCompleteScenario: (id: string, reward: number, sourceRect: DOMRect | null) => void }> = ({ userProfile, onCompleteScenario }) => {
    const [activeScenario, setActiveScenario] = useState<SimulationScenario>(SIMULATION_SCENARIOS[0]);
    const [userScript, setUserScript] = useState<SimulationBlock[]>([]);
    const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | 'none', message: string }>({ type: 'none', message: '' });
    const [currentAnimation, setCurrentAnimation] = useState<ActiveAnimation | null>(null);
    const checkButtonRef = React.useRef<HTMLButtonElement>(null);

    useEffect(() => {
        setUserScript([]);
        setFeedback({ type: 'none', message: '' });
    }, [activeScenario]);

    useEffect(() => {
        if (currentAnimation) {
            const timer = setTimeout(() => setCurrentAnimation(null), 1000);
            return () => clearTimeout(timer);
        }
    }, [currentAnimation]);

    const runScript = (scriptToRun: SimulationBlock[]) => {
        let delay = 0;
        scriptToRun.forEach((block, index) => {
            setTimeout(() => {
                setCurrentAnimation({ command: block.command, key: Date.now() });
            }, delay);
            delay += 1100; // Animation duration + small buffer
        });
    };

    const handleCheckSolution = () => {
        const userSolutionIds = userScript.map(b => b.id);
        if (JSON.stringify(userSolutionIds) === JSON.stringify(activeScenario.solution)) {
            const isCompleted = userProfile.completedScenarios.includes(activeScenario.id);
            setFeedback({ type: 'success', message: isCompleted ? 'Chính xác! Bạn đã hoàn thành nhiệm vụ này rồi.' : 'Tuyệt vời! Nhiệm vụ hoàn thành!' });
            if (!isCompleted) {
                 onCompleteScenario(activeScenario.id, activeScenario.reward, checkButtonRef.current?.getBoundingClientRect() ?? null);
            }
        } else {
            setFeedback({ type: 'error', message: 'Chưa đúng lắm. Hãy kiểm tra lại thứ tự và các khối lệnh nhé!' });
        }
    };

    const availableBlocks = useMemo(() => {
        return SIMULATION_BLOCKS.filter(b => activeScenario.availableBlockIds.includes(b.id));
    }, [activeScenario]);

    const Icon = activeScenario.category === 'scratch' ? ScratchIcon : RobotIcon;
    const color = activeScenario.category === 'scratch' ? 'orange' : 'cyan';

    const getBlockColor = (category: SimulationBlock['category']) => {
        const colors: Record<string, string> = {
            motion: 'bg-blue-600 hover:bg-blue-500',
            looks: 'bg-purple-600 hover:bg-purple-500',
            events: 'bg-yellow-600 hover:bg-yellow-500',
            control: 'bg-orange-600 hover:bg-orange-500',
            motors: 'bg-red-600 hover:bg-red-500',
            sensors: 'bg-teal-600 hover:bg-teal-500',
        };
        return colors[category] || 'bg-gray-600';
    };

    return (
        <div className="p-8 max-w-7xl mx-auto animate-fade-in h-full flex flex-col">
            <h1 className="text-4xl font-bold text-indigo-400 mb-6">Sân Chơi Sáng Tạo</h1>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 flex-1">
                {/* Left Column: Scenarios & Toolbox */}
                <div className="lg:col-span-1 bg-gray-800/50 rounded-xl p-4 border border-gray-700 flex flex-col gap-4">
                    <div>
                        <h2 className="text-lg font-bold text-gray-300 mb-2">Chọn Nhiệm vụ</h2>
                        <div className="flex flex-col gap-2">
                        {SIMULATION_SCENARIOS.map(sc => (
                             <button key={sc.id} onClick={() => setActiveScenario(sc)} className={`p-3 rounded-lg text-left transition-colors ${activeScenario.id === sc.id ? 'bg-indigo-600/50' : 'bg-gray-700/50 hover:bg-gray-700'}`}>
                                <p className="font-semibold">{sc.title}</p>
                                {userProfile.completedScenarios.includes(sc.id) && <span className="text-xs text-green-400">Đã hoàn thành</span>}
                            </button>
                        ))}
                        </div>
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-gray-300 mb-2">Hộp Công cụ</h2>
                         <div className="flex flex-col gap-2">
                            {availableBlocks.map(block => (
                               <button key={block.id} onClick={() => setUserScript([...userScript, block])} className={`p-2 rounded-md text-white font-mono text-sm shadow-md ${getBlockColor(block.category)}`}>
                                   {block.text}
                               </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Middle Column: Scripting Area */}
                <div className="lg:col-span-2 bg-gray-800/50 rounded-xl p-6 border border-gray-700 flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2">
                            <Icon />
                            <h2 className="text-2xl font-bold text-white">{activeScenario.title}</h2>
                        </div>
                        <button onClick={() => setUserScript([])} className="p-2 rounded-full bg-gray-700 hover:bg-red-500/50 text-gray-300 hover:text-white transition-colors" title="Xóa kịch bản">
                            <TrashIcon className="w-5 h-5"/>
                        </button>
                    </div>
                    <p className="text-gray-400 mb-4 flex-grow">{activeScenario.description}</p>
                    <div className="bg-gray-900/50 rounded-lg p-4 min-h-[250px] border-2 border-dashed border-gray-600 space-y-2">
                        {userScript.length === 0 ? (
                            <p className="text-gray-500 text-center pt-20">Nhấp vào khối lệnh để thêm vào đây.</p>
                        ) : (
                            userScript.map((block, index) => (
                                <div key={index} className={`p-2 rounded-md text-white font-mono text-sm shadow-md ${getBlockColor(block.category)}`}>
                                   {block.text}
                               </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Right Column: Stage & Controls */}
                <div className="lg:col-span-1 bg-gray-800/50 rounded-xl p-4 border border-gray-700 flex flex-col justify-between">
                    <div className="flex-1 w-full h-64 bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden">
                         {activeScenario.category === 'scratch' 
                            ? <CatSprite animation={currentAnimation?.command ?? null} /> 
                            : <RoboticsSimulator animation={currentAnimation?.command ?? null} />
                        }
                    </div>
                    <div className="mt-4 flex flex-col gap-3">
                         {feedback.type !== 'none' && (
                            <div className={`p-3 rounded-md text-sm text-center ${feedback.type === 'success' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                                {feedback.message}
                            </div>
                        )}
                        <button onClick={() => runScript(userScript)} disabled={userScript.length === 0} className="w-full flex items-center justify-center gap-2 bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-600">
                           <FlagIcon /> Chạy
                        </button>
                        <button ref={checkButtonRef} onClick={handleCheckSolution} disabled={userScript.length === 0} className="w-full flex items-center justify-center gap-2 bg-yellow-600 text-white font-bold py-3 rounded-lg hover:bg-yellow-700 transition-colors disabled:bg-gray-600">
                            <CheckIcon /> Kiểm tra
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SimulationView;
