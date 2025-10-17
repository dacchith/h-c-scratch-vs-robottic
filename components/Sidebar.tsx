
import React from 'react';
import { LESSONS } from '../constants';
import type { Lesson } from '../types';
import { ScratchIcon, RobotIcon, AiTutorIcon, ProjectsIcon } from './icons';

interface SidebarProps {
  onSelectLesson: (lessonId: string) => void;
  onSelectView: (view: 'tutor' | 'projects' | 'lesson') => void;
  activeView: string;
  activeLessonId: string | null;
}

const Sidebar: React.FC<SidebarProps> = ({ onSelectLesson, onSelectView, activeView, activeLessonId }) => {
  const scratchLessons = LESSONS.filter(lesson => lesson.category === 'scratch');
  const roboticsLessons = LESSONS.filter(lesson => lesson.category === 'robotics');

  const navItemClasses = (viewName: string) => 
    `flex items-center w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 ${
        activeView === viewName && !activeLessonId ? 'bg-purple-600/50 text-white' : 'hover:bg-gray-700 text-gray-300'
    }`;
  
  const lessonItemClasses = (lessonId: string) =>
    `w-full text-left pl-12 pr-4 py-2 text-sm rounded-md transition-colors duration-200 ${
        activeLessonId === lessonId ? 'bg-gray-600 text-white font-semibold' : 'hover:bg-gray-700 text-gray-400'
    }`;


  return (
    <aside className="w-80 bg-gray-800/50 p-4 flex flex-col border-r border-gray-700">
      <nav className="flex flex-col space-y-2">
        <button onClick={() => onSelectView('tutor')} className={navItemClasses('tutor')}>
            <AiTutorIcon />
            <span className="font-semibold">Gia sư AI</span>
        </button>
        <button onClick={() => onSelectView('projects')} className={navItemClasses('projects')}>
            <ProjectsIcon />
            <span className="font-semibold">Dự án Mẫu</span>
        </button>

        <div className="pt-4">
            <h3 className="px-4 py-2 text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center">
                <ScratchIcon /> Lập trình Scratch
            </h3>
            <div className="flex flex-col space-y-1 mt-1">
                {scratchLessons.map(lesson => (
                    <button key={lesson.id} onClick={() => onSelectLesson(lesson.id)} className={lessonItemClasses(lesson.id)}>
                        {lesson.title}
                    </button>
                ))}
            </div>
        </div>

        <div className="pt-4">
            <h3 className="px-4 py-2 text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center">
                <RobotIcon /> Robotics
            </h3>
            <div className="flex flex-col space-y-1 mt-1">
                {roboticsLessons.map(lesson => (
                    <button key={lesson.id} onClick={() => onSelectLesson(lesson.id)} className={lessonItemClasses(lesson.id)}>
                        {lesson.title}
                    </button>
                ))}
            </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
