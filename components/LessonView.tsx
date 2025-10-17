
import React from 'react';
import type { Lesson } from '../types';
import { RobotIcon, ScratchIcon } from './icons';

interface LessonViewProps {
  lesson: Lesson;
}

const LessonView: React.FC<LessonViewProps> = ({ lesson }) => {
  const Icon = lesson.category === 'scratch' ? ScratchIcon : RobotIcon;
  const colorClass = lesson.category === 'scratch' ? 'text-orange-400' : 'text-cyan-400';

  return (
    <div className="p-8 max-w-4xl mx-auto animate-fade-in">
        <div className="flex items-center mb-6">
            <div className="mr-4 p-3 bg-gray-800 rounded-lg">
                <Icon />
            </div>
            <div>
                <h1 className={`text-4xl font-bold ${colorClass}`}>{lesson.title}</h1>
                <p className="text-gray-400 capitalize">{lesson.category}</p>
            </div>
        </div>
      
      <div className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed">
        {lesson.content.split('\n\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
};

export default LessonView;
