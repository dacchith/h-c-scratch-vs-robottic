import React from 'react';
import { LESSONS, LEARNING_PATHS } from '../constants';
import { LightbulbIcon } from './icons';

interface ForYouSuggestionsProps {
    completedLessons: Set<string>;
    onSelectLesson: (lessonId: string) => void;
}

const ForYouSuggestions: React.FC<ForYouSuggestionsProps> = ({ completedLessons, onSelectLesson }) => {

    const suggestions = React.useMemo(() => {
        const recommended: typeof LESSONS = [];

        // 1. Suggest next lesson in paths
        for (const path of LEARNING_PATHS) {
            const firstUncompleted = path.steps.find(step => !completedLessons.has(step.id));
            if (firstUncompleted) {
                const lesson = LESSONS.find(l => l.id === firstUncompleted.id);
                if (lesson && !recommended.find(r => r.id === lesson.id)) {
                    recommended.push(lesson);
                }
            }
        }
        
        // 2. If not enough suggestions, add random uncompleted lessons
        if (recommended.length < 3) {
            const uncompletedLessons = LESSONS.filter(l => !completedLessons.has(l.id) && !recommended.find(r => r.id === l.id));
            // Shuffle for randomness
            uncompletedLessons.sort(() => 0.5 - Math.random());
            recommended.push(...uncompletedLessons.slice(0, 3 - recommended.length));
        }

        return recommended.slice(0, 3);
    }, [completedLessons]);
    
    if (suggestions.length === 0) {
        return null;
    }

    return (
        <div className="bg-gray-800/60 p-6 rounded-2xl border border-gray-700 shadow-lg mt-8">
            <h3 className="text-xl font-black text-white mb-4 flex items-center gap-2">
                <LightbulbIcon className="text-yellow-300"/> Dành cho bạn
            </h3>
            <div className="space-y-3">
                {suggestions.map(lesson => (
                    <button 
                        key={lesson.id} 
                        onClick={() => onSelectLesson(lesson.id)}
                        className="w-full text-left bg-gray-900/50 p-4 rounded-lg hover:bg-indigo-600/30 transition-colors border-l-4 border-transparent hover:border-indigo-400"
                    >
                        <p className="font-bold text-gray-200">{lesson.title}</p>
                        <p className="text-sm text-gray-400">{lesson.category === 'scratch' ? 'Lập trình Scratch' : 'Robotics'} - {lesson.difficulty}</p>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ForYouSuggestions;