import React, { useState, useMemo, useEffect } from 'react';
import type { Lesson, Project, PracticeExercise } from '../types';
import { PROJECTS, PRACTICE_EXERCISES } from '../constants';
import { RobotIcon, ScratchIcon, CheckIcon, ProjectsIcon, LightbulbIcon, BookOpenIcon, LinkIcon, PencilIcon } from './icons';
import CodingChallenge from './CodingChallenge';
import PracticeExerciseView from './PracticeExerciseView';
import InlineQuiz from './InlineQuiz';

// --- Scratch Sprite Component ---
type ActiveScratchBlock = 'move' | 'say' | 'turn' | 'change_color' | 'random_position' | 'broadcast' | 'draw_square' | 'loop' | null;

const CatSprite: React.FC<{ animation: ActiveScratchBlock }> = ({ animation }) => {
    const animationClasses = {
        move: 'animate-move-right',
        say: 'animate-bounce',
        turn: 'animate-spin-once',
        change_color: 'animate-color-change',
        random_position: 'animate-random-pos',
        broadcast: 'animate-broadcast',
        draw_square: 'animate-draw-square',
        loop: 'animate-loop-pulse',
        null: ''
    };
    
    return (
        <div className="relative">
            <i className={`fa-solid fa-cat text-6xl text-orange-400 transition-all duration-500 ${animation ? animationClasses[animation] : ''}`}></i>
            {animation === 'say' && (
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-gray-800 px-3 py-1 rounded-full text-sm shadow-lg animate-fade-in-out">
                    Hello!
                    <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-white"></div>
                </div>
            )}
        </div>
    );
};

// --- Robotics Simulator Component ---
type ActiveRoboticsBlock = 'motor_run' | 'servo_turn' | 'detect_obstacle' | 'detect_color' | 'follow_line' | 'gripper_action' | null;

const RoboticsSimulator: React.FC<{ simulation: ActiveRoboticsBlock }> = ({ simulation }) => {
    const robotAnimation = simulation === 'motor_run' ? 'animate-shake' : simulation === 'follow_line' ? 'animate-follow-line' : '';
    const armAnimation = simulation === 'servo_turn' ? 'animate-arm-turn' : '';
    const gripperAnimation = simulation === 'gripper_action' ? 'animate-gripper' : '';
    const obstacleVisible = simulation === 'detect_obstacle';
    const colorDetected = simulation === 'detect_color';

    return (
        <div className="flex items-center justify-around w-full h-full relative">
            {simulation === 'follow_line' && 
                <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-1.5 bg-gray-900 rounded-full"></div>
            }
            <div className="relative">
                <i className={`fa-solid fa-robot text-6xl text-cyan-400 transition-transform duration-500 ${robotAnimation}`}></i>
                <div className={`absolute top-1/2 left-0 w-8 h-2 bg-gray-400 rounded-full origin-right transition-transform duration-500 ${armAnimation}`}>
                    <div className="absolute top-1/2 right-0 w-4 h-4">
                        <div className={`absolute top-0 right-0 w-1 h-3 bg-gray-500 rounded-full origin-bottom-right ${gripperAnimation}`}></div>
                        <div className={`absolute bottom-0 right-0 w-1 h-3 bg-gray-500 rounded-full origin-top-right ${gripperAnimation}`}></div>
                    </div>
                </div>
                { (obstacleVisible || colorDetected) && <div className="absolute top-2 left-1/2 w-2 h-2 bg-red-500 rounded-full animate-ping"></div> }
                 { simulation === 'motor_run' && 
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-8">
                        <div className="w-4 h-2 bg-cyan-300/50 rounded-full animate-trail-left"></div>
                        <div className="w-4 h-2 bg-cyan-300/50 rounded-full animate-trail-right"></div>
                    </div>
                 }
                 { simulation === 'detect_obstacle' &&
                    <div className="absolute -left-16 top-1/2 -translate-y-1/2 h-0.5 w-16 bg-gradient-to-l from-red-400 to-transparent animate-sonar-ping"></div>
                 }
            </div>
            <div className={`transition-all duration-500 ${obstacleVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                 <i className="fa-solid fa-cube text-5xl text-gray-500"></i>
            </div>
             <div className={`transition-all duration-500 ${colorDetected ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                 <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-red-500 to-blue-500"></div>
            </div>
        </div>
    );
};

// --- Custom Content Block Components ---
const TipBlock: React.FC<{ content: string }> = ({ content }) => (
    <div className="my-4 p-4 bg-blue-900/40 border-l-4 border-blue-400 rounded-r-lg flex items-start gap-4">
        <LightbulbIcon className="w-6 h-6 text-blue-300 flex-shrink-0 mt-1" />
        <div>
            <h5 className="font-bold text-blue-300">Mẹo hay</h5>
            <p className="text-gray-300">{content}</p>
        </div>
    </div>
);

const ConceptBlock: React.FC<{ term: string; definition: string }> = ({ term, definition }) => (
    <div className="my-4 p-4 bg-purple-900/40 border-l-4 border-purple-400 rounded-r-lg flex items-start gap-4">
        <BookOpenIcon className="w-6 h-6 text-purple-300 flex-shrink-0 mt-1" />
        <div>
            <h5 className="font-bold text-purple-300">Khái niệm chính</h5>
            <p className="text-gray-300"><strong>{term}:</strong> {definition}</p>
        </div>
    </div>
);

const VideoBlock: React.FC<{ videoId: string }> = ({ videoId }) => (
    <div className="my-6 rounded-lg overflow-hidden border-2 border-gray-700 shadow-lg aspect-video">
        <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        ></iframe>
    </div>
);


// --- Main Lesson View Component ---
interface LessonViewProps {
  lesson: Lesson;
  isCompleted: boolean;
  onToggleComplete: (lessonId: string, sourceRect: DOMRect | null) => void;
  completedExercises: string[];
  onCompleteExercise: (exerciseId: string, reward: number, sourceRect: DOMRect | null) => void;
  onEarnCoins: (amount: number, sourceRect: DOMRect | null) => void;
}

const commandMap: { [key: string]: ActiveScratchBlock | ActiveRoboticsBlock } = {
    'move (10) steps': 'move',
    'say Hello! for (2) seconds': 'say',
    'turn right (15) degrees': 'turn',
    'change color effect by (25)': 'change_color',
    'go to random position': 'random_position',
    'broadcast message1': 'broadcast',
    'vẽ hình vuông': 'draw_square',
    'liên tục': 'loop',
    'motor_run': 'motor_run',
    'servo_turn': 'servo_turn',
    'detect_obstacle': 'detect_obstacle',
    'detect_color': 'detect_color',
    'follow_line': 'follow_line',
    'gripper_action': 'gripper_action',
};

const LessonView: React.FC<LessonViewProps> = ({ lesson, isCompleted, onToggleComplete, completedExercises, onCompleteExercise, onEarnCoins }) => {
  const [animationQueue, setAnimationQueue] = useState<(ActiveScratchBlock | ActiveRoboticsBlock)[]>([]);
  const [currentAnimation, setCurrentAnimation] = useState<ActiveScratchBlock | ActiveRoboticsBlock | null>(null);

  const Icon = lesson.category === 'scratch' ? ScratchIcon : RobotIcon;
  const colorClass = lesson.category === 'scratch' ? 'text-orange-400' : 'text-cyan-400';
  const commandColorClass = lesson.category === 'scratch' 
    ? 'text-cyan-300 border-cyan-800 hover:bg-cyan-900/60 hover:border-cyan-600 focus:ring-cyan-500' 
    : 'text-yellow-300 border-yellow-800 hover:bg-yellow-900/60 hover:border-yellow-600 focus:ring-yellow-500';

  useEffect(() => {
    // Reset animations when lesson changes
    setAnimationQueue([]);
    setCurrentAnimation(null);
  }, [lesson.id]);

  // Effect to process the animation queue
  useEffect(() => {
    if (currentAnimation || animationQueue.length === 0) {
      return;
    }
    const [nextAnimation, ...rest] = animationQueue;
    setCurrentAnimation(nextAnimation);
    setAnimationQueue(rest);
  }, [animationQueue, currentAnimation]);

  // Effect to handle the duration of the current animation
  useEffect(() => {
    if (currentAnimation) {
      const timer = setTimeout(() => {
        setCurrentAnimation(null);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [currentAnimation]);

  const handleRunScript = (script: string[]) => {
    const animations = script
        .map(command => commandMap[command])
        .filter((c): c is ActiveScratchBlock | ActiveRoboticsBlock => !!c);
    
    // Simulate a loop by repeating inner blocks
    const loopIndex = script.indexOf('liên tục');
    if (loopIndex !== -1) {
        const loopContent = animations.slice(loopIndex);
        const repeatedContent = Array(4).fill(loopContent).flat();
        setAnimationQueue(repeatedContent);
    } else {
        setAnimationQueue(animations);
    }
  };

  const handleCommandClick = (command: string) => {
     handleRunScript([command]);
  };

  const renderContent = useMemo(() => {
    const regex = /(\[\[.*?\]\]|\{\{.*?\}\}|\(\(.*?\)\)|<<quiz:.*?>>)/g;
    const parts = lesson.content.split(regex);

    return parts.map((part, index) => {
        if (!part) return null;

        if (part.startsWith('[[') && part.endsWith(']]')) {
            const command = part.slice(2, -2);
            return (
                <span key={index}
                    className={`font-mono bg-gray-800/50 border px-3 py-1 rounded-lg shadow-md cursor-pointer transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 ${commandColorClass}`}
                    onClick={() => handleCommandClick(command)}
                    role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && handleCommandClick(command)}
                >{command}</span>
            );
        }
        if (part.startsWith('{{video:') && part.endsWith('}}')) {
            const videoId = part.slice(8, -2);
            return <VideoBlock key={index} videoId={videoId} />;
        }
        if (part.startsWith('{{concept:') && part.endsWith('}}')) {
            const content = part.slice(10, -2);
            const [term, ...definitionParts] = content.split(':');
            const definition = definitionParts.join(':');
            return <ConceptBlock key={index} term={term} definition={definition} />;
        }
        if (part.startsWith('((tip:') && part.endsWith('))')) {
            const tip = part.slice(6, -2);
            return <TipBlock key={index} content={tip} />;
        }
        if (part.startsWith('<<quiz:') && part.endsWith('>>')) {
            const content = part.slice(7, -2);
            const [question, choicesString, correctIndexStr] = content.split('|');
            const choices = choicesString.split(';');
            const correctAnswerIndex = parseInt(correctIndexStr, 10);
            return (
                <InlineQuiz
                    key={index}
                    question={question}
                    choices={choices}
                    correctAnswerIndex={correctAnswerIndex}
                    onCorrect={() => onEarnCoins(5, null)} // Give 5 coins for correct answer
                />
            );
        }

        // Render paragraphs
        return part.split('\n').map((paragraph, pIndex) => (
           paragraph.trim() && <p key={`${index}-${pIndex}`}>{paragraph}</p>
        ));
    });
  }, [lesson.content, commandColorClass, onEarnCoins]);
  
  const relatedProjectDetails = useMemo((): Project[] => {
    if (!lesson.relatedProjects) return [];
    return PROJECTS.filter(p => lesson.relatedProjects?.includes(p.id));
  }, [lesson]);

  const exercisesForLesson = useMemo(() => {
    return PRACTICE_EXERCISES.filter(ex => ex.lessonId === lesson.id);
  }, [lesson.id]);

  return (
    <div className="p-8 max-w-7xl mx-auto animate-fade-in">
        <style>{`
            @keyframes move-right { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(20px) scale(1.1, 0.9) rotate(5deg); } }
            .animate-move-right { animation: move-right 1.2s ease-in-out; }
            @keyframes shake { 10%, 90% { transform: translate(-1px, -2px) rotate(-1deg); } 20%, 80% { transform: translate(2px, 1px) rotate(2deg); } 30%, 50%, 70% { transform: translate(-3px, 2px) rotate(-2deg); } 40%, 60% { transform: translate(3px, -1px) rotate(1deg); } }
            .animate-shake { animation: shake 0.7s cubic-bezier(.36,.07,.19,.97) both; }
            @keyframes spin-once { 0%, 100% { transform: rotate(0deg); } 50% { transform: rotate(15deg); } }
            .animate-spin-once { animation: spin-once 0.8s ease-in-out; }
            @keyframes arm-turn { 0%, 100% { transform: translateY(-50%) rotate(0deg); } 50% { transform: translateY(-50%) rotate(-45deg); } }
            .animate-arm-turn { animation: arm-turn 1.2s ease-in-out; }
            @keyframes gripper { 0%, 100% { transform: rotate(25deg); } 50% { transform: rotate(-20deg); } }
            .animate-gripper { animation: gripper 1s ease-in-out; }
            @keyframes fade-in-out { 0%, 100% { opacity: 0; transform: translateY(10px); } 20%, 80% { opacity: 1; transform: translateY(0); } }
            .animate-fade-in-out { animation: fade-in-out 1.5s ease-in-out; }
            @keyframes color-change { 0% { filter: hue-rotate(0deg); } 100% { filter: hue-rotate(360deg); } }
            .animate-color-change { animation: color-change 1s linear; }
            @keyframes random-pos { 0%, 100% { transform: translate(0, 0) rotate(0deg); } 25% { transform: translate(-25px, 15px) rotate(-15deg); } 50% { transform: translate(20px, -10px) rotate(15deg); } 75% { transform: translate(-15px, -15px) rotate(-15deg); } }
            .animate-random-pos { animation: random-pos 1.2s ease-in-out; }
            @keyframes broadcast-pulse { 0%, 100% { filter: drop-shadow(0 0 3px #f97316); transform: scale(1); } 50% { filter: drop-shadow(0 0 15px #fde047) drop-shadow(0 0 25px #fde047); transform: scale(1.15); } }
            .animate-broadcast { animation: broadcast-pulse 1.2s ease-in-out; }
            @keyframes draw-square-pulse { 0%, 100% { filter: drop-shadow(0 0 3px #a855f7); transform: scale(1); } 50% { filter: drop-shadow(0 0 15px #c084fc) drop-shadow(0 0 25px #c084fc); transform: scale(1.1); } }
            .animate-draw-square { animation: draw-square-pulse 1.2s ease-in-out; }
            @keyframes loop-pulse { 0%, 100% { filter: drop-shadow(0 0 3px #f59e0b); } 50% { filter: drop-shadow(0 0 15px #fcd34d); } }
            .animate-loop-pulse { animation: loop-pulse 1s ease-in-out; }
            @keyframes follow-line { 0% { transform: translateX(-40px) rotate(0deg); } 25% { transform: translateX(-20px) rotate(8deg); } 50% { transform: translateX(0px) rotate(-8deg); } 75% { transform: translateX(20px) rotate(8deg); } 100% { transform: translateX(40px) rotate(0deg); } }
            .animate-follow-line { animation: follow-line 1.2s ease-in-out forwards; }
            @keyframes trail-left { 0% { transform: translateX(0) scaleX(0); opacity: 0.7; } 50% { transform: translateX(-20px) scaleX(1); opacity: 0.7; } 100% { transform: translateX(-40px) scaleX(0); opacity: 0; } }
            .animate-trail-left { animation: trail-left 0.7s ease-out; }
            @keyframes trail-right { 0% { transform: translateX(0) scaleX(0); opacity: 0.7; } 50% { transform: translateX(20px) scaleX(1); opacity: 0.7; } 100% { transform: translateX(40px) scaleX(0); opacity: 0; } }
            .animate-trail-right { animation: trail-right 0.7s ease-out; }
            @keyframes sonar-ping { 0% { transform: scaleX(0); opacity: 0; } 50% { transform: scaleX(1); opacity: 0.8; } 100% { transform: scaleX(1); opacity: 0; } }
            .animate-sonar-ping { animation: sonar-ping 1.2s ease-in-out; }
        `}</style>

        <div className="flex items-center justify-between mb-6">
            <div className='flex items-center'>
                <div className="mr-4 p-3 bg-gray-800 rounded-lg"><Icon /></div>
                <div>
                    <h1 className={`text-4xl font-bold ${colorClass}`}>{lesson.title}</h1>
                    <p className="text-gray-400 capitalize">{lesson.category} - {lesson.difficulty}</p>
                </div>
            </div>
        </div>
      
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">
            {/* Left Column: Lesson Content */}
            <div className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed space-y-2">
                {renderContent}
            </div>

            {/* Right Column: Interactive Area */}
            <div className="sticky top-8 self-start">
                <div className="mt-2">
                    <h3 className="text-xl font-bold text-gray-400 mb-4">{lesson.category === 'scratch' ? 'Sân chơi Scratch' : 'Mô phỏng Robotics'}</h3>
                    <div className="relative w-full h-40 bg-gray-800/50 rounded-lg border-2 border-dashed border-gray-700 flex items-center justify-center overflow-hidden">
                        {lesson.category === 'scratch' 
                            ? <CatSprite animation={currentAnimation as ActiveScratchBlock} /> 
                            : <RoboticsSimulator simulation={currentAnimation as ActiveRoboticsBlock} />
                        }
                    </div>
                </div>
                {lesson.challenge && (
                    <CodingChallenge 
                        challenge={lesson.challenge}
                        onRunScript={handleRunScript}
                    />
                )}
            </div>
        </div>

      {exercisesForLesson.length > 0 && (
        <div className="mt-12 pt-8 border-t border-gray-700">
           <h3 className="text-2xl font-bold text-gray-300 mb-6 flex items-center gap-3">
                <PencilIcon className="w-6 h-6 text-green-400" /> Bài tập Thực hành
            </h3>
            <div className="space-y-6">
                {exercisesForLesson.map(exercise => (
                    <PracticeExerciseView
                        key={exercise.id}
                        exercise={exercise}
                        isCompleted={completedExercises.includes(exercise.id)}
                        onComplete={onCompleteExercise}
                    />
                ))}
            </div>
        </div>
      )}
      
      {relatedProjectDetails.length > 0 && (
        <div className="mt-12 pt-6 border-t border-gray-700">
            <h3 className="text-xl font-bold text-gray-400 mb-4 flex items-center gap-3">
                <ProjectsIcon /> Dự án Mẫu Tham Khảo
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {relatedProjectDetails.map(project => (
                    <div key={project.id} className="bg-gray-800/60 p-4 rounded-lg flex items-center gap-4 border border-gray-700 hover:bg-gray-800 transition-colors">
                        <img src={project.imageUrl} alt={project.title} className="w-20 h-20 object-cover rounded-md flex-shrink-0" />
                        <div>
                            <h4 className="font-bold text-teal-400">{project.title}</h4>
                            <p className="text-sm text-gray-400 mt-1">{project.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      )}

      {lesson.references && lesson.references.length > 0 && (
        <div className="mt-12 pt-6 border-t border-gray-700">
            <h3 className="text-xl font-bold text-gray-400 mb-4 flex items-center gap-3">
                <LinkIcon /> Tài liệu tham khảo
            </h3>
            <ul className="space-y-3">
                {lesson.references.map((ref, index) => (
                    <li key={index}>
                        <a 
                            href={ref.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 hover:underline transition-colors"
                        >
                            {ref.title}
                             <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.25 5.5a.75.75 0 000 1.5h5.5a.75.75 0 000-1.5h-5.5zm0 3a.75.75 0 000 1.5h3.5a.75.75 0 000-1.5h-3.5zm0 3a.75.75 0 000 1.5h5.5a.75.75 0 000-1.5h-5.5z" clipRule="evenodd" /><path d="M2 1a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V6.414A1 1 0 0014.414 5H14a1 1 0 01-1-1V2a1 1 0 00-1-1H2zm11 1.293V4a1 1 0 011 1h1.293L13 2.293z" /></svg>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
      )}

      <div className="mt-12 pt-6 border-t border-gray-700 flex justify-center">
        <button 
            onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                onToggleComplete(lesson.id, isCompleted ? null : rect);
            }}
            className={`flex items-center gap-2 px-6 py-3 font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 ${
                isCompleted 
                ? 'bg-green-600/80 hover:bg-green-600 text-white' 
                : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
            }`}
        >
            {isCompleted ? <><CheckIcon />Đã hoàn thành</> : 'Đánh dấu là hoàn thành'}
        </button>
      </div>

    </div>
  );
};

export default LessonView;