import React, { useState, useMemo, forwardRef } from 'react';
import { LESSONS, LEARNING_PATHS } from '../constants';
import type { Lesson, UserProfile, LearningPath } from '../types';
import { AiTutorIcon, ProjectsIcon, DashboardIcon, CheckIcon, UserIcon, PathIcon, ShowcaseIcon, ShopIcon, StarCoinIcon, BeakerIcon } from './icons';

interface SidebarProps {
  onSelectLesson: (lessonId: string) => void;
  onSelectView: (view: 'dashboard' | 'tutor' | 'projects' | 'lesson' | 'profile' | 'showcase' | 'shop' | 'simulation') => void;
  activeView: string;
  activeLessonId: string | null;
  completedLessons: Set<string>;
  userProfile: UserProfile;
}

const ProfileCard = forwardRef<HTMLDivElement, { profile: UserProfile, onSelectView: () => void }>(({ profile, onSelectView }, ref) => {
    const coinsForNextLevel = 100;
    const coinsInCurrentLevel = profile.starCoins % coinsForNextLevel;
    const progressPercentage = (coinsInCurrentLevel / coinsForNextLevel) * 100;
  
    return (
      <div 
        className="bg-gray-900/50 rounded-xl p-4 mb-4 border border-gray-700 cursor-pointer hover:bg-gray-700/50 transition-colors"
        onClick={onSelectView}
        role="button"
      >
        <div className="flex items-center gap-4">
          <div className="bg-blue-600 p-2 rounded-full">
            <UserIcon className="w-8 h-8 text-white" />
          </div>
          <div>
            <span className="font-bold text-lg text-white">Cấp độ {profile.level}</span>
            <div className="flex items-center gap-2 mt-1" ref={ref}>
                <StarCoinIcon className="w-5 h-5 text-yellow-400" />
                <span className="font-bold text-yellow-400">{profile.starCoins}</span>
            </div>
          </div>
        </div>
        <div className="mt-3">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>Tiến độ</span>
                <span>{profile.starCoins % coinsForNextLevel} / {coinsForNextLevel}</span>
            </div>
            <div className="w-full bg-gray-600 rounded-full h-2.5 overflow-hidden">
                <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                ></div>
            </div>
        </div>
      </div>
    );
});

const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(({ onSelectLesson, onSelectView, activeView, activeLessonId, completedLessons, userProfile }, ref) => {
  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(new Set([LEARNING_PATHS[0].id]));

  const togglePath = (pathId: string) => {
    setExpandedPaths(prev => {
      const newSet = new Set(prev);
      if (newSet.has(pathId)) {
        newSet.delete(pathId);
      } else {
        newSet.add(pathId);
      }
      return newSet;
    });
  };
  
  const navItemClasses = (viewName: string) => 
    `flex items-center w-full text-left px-4 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 ${
        activeView === viewName ? 'bg-purple-600/50 text-white shadow-lg' : 'hover:bg-gray-700 text-gray-300'
    }`;
  
  const lessonItemClasses = (lessonId: string) =>
    `w-full text-left pl-12 pr-4 py-2 text-sm rounded-md transition-colors duration-200 flex items-center justify-between ${
        activeLessonId === lessonId ? 'bg-gray-600' : 'hover:bg-gray-700'
    }`;
  
  const lessonsById = useMemo(() => {
    const map = new Map<string, Lesson>();
    LESSONS.forEach(lesson => map.set(lesson.id, lesson));
    return map;
  }, []);

  return (
    <aside className="w-80 bg-gray-800/50 p-4 flex flex-col border-r border-gray-700 overflow-y-auto">
      <style>{`
        @keyframes check-pop-in { 0% { transform: scale(0.5); opacity: 0; } 60% { transform: scale(1.2); opacity: 1; } 100% { transform: scale(1); opacity: 1; } }
        .animate-check-pop-in { animation: check-pop-in 0.3s ease-out forwards; }
        .collapsible-content { transition: max-height 0.3s ease-out, opacity 0.3s ease-in-out; overflow: hidden; }
        .collapsible-content[aria-hidden="true"] { max-height: 0; opacity: 0; }
        .collapsible-content[aria-hidden="false"] { max-height: 500px; opacity: 1; /* Adjust max-height as needed */ }
        .chevron { transition: transform 0.3s ease-out; }
        .chevron-expanded { transform: rotate(90deg); }
      `}</style>

      <ProfileCard profile={userProfile} onSelectView={() => onSelectView('profile')} ref={ref} />
      <nav className="flex flex-col space-y-2 text-lg">
        <button onClick={() => onSelectView('dashboard')} className={navItemClasses('dashboard')}>
            <DashboardIcon />
            <span className="font-bold">Trang tổng quan</span>
        </button>
         <button onClick={() => onSelectView('profile')} className={navItemClasses('profile')}>
            <UserIcon />
            <span className="font-bold">Hồ sơ của bé</span>
        </button>
        <button onClick={() => onSelectView('shop')} className={navItemClasses('shop')}>
            <ShopIcon />
            <span className="font-bold">Cửa hàng</span>
        </button>
        <button onClick={() => onSelectView('simulation')} className={navItemClasses('simulation')}>
            <BeakerIcon />
            <span className="font-bold">Sân Chơi Sáng Tạo</span>
        </button>
        <button onClick={() => onSelectView('tutor')} className={navItemClasses('tutor')}>
            <AiTutorIcon />
            <span className="font-bold">Gia sư AI</span>
        </button>
        <button onClick={() => onSelectView('showcase')} className={navItemClasses('showcase')}>
            <ShowcaseIcon />
            <span className="font-bold">Triển lãm Sáng tạo</span>
        </button>
        <button onClick={() => onSelectView('projects')} className={navItemClasses('projects')}>
            <ProjectsIcon />
            <span className="font-bold">Dự án Mẫu</span>
        </button>

        <div className="pt-4">
            <h3 className="px-4 py-2 text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center">
                <PathIcon /> Lộ trình học tập
            </h3>
            <div className="flex flex-col space-y-2 mt-2">
              {LEARNING_PATHS.map(path => {
                const isExpanded = expandedPaths.has(path.id);
                const completedSteps = path.steps.filter(step => completedLessons.has(step.id)).length;
                const totalSteps = path.steps.length;

                return (
                  <div key={path.id}>
                    <button 
                      onClick={() => togglePath(path.id)} 
                      className="w-full text-left px-4 py-2 rounded-lg bg-gray-700/50 hover:bg-gray-700 flex items-center justify-between transition-colors"
                      aria-expanded={isExpanded}
                    >
                      <div className="flex items-center">
                        <path.icon className="w-6 h-6 mr-3" />
                        <span className="font-semibold text-gray-200">{path.title}</span>
                      </div>
                      <div className="flex items-center gap-2">
                         <span className="text-xs text-gray-400">{completedSteps}/{totalSteps}</span>
                         <svg className={`w-4 h-4 text-gray-400 chevron ${isExpanded ? 'chevron-expanded' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </button>
                    <div className="collapsible-content" aria-hidden={!isExpanded}>
                      <div className="flex flex-col space-y-1 mt-1 pt-1 border-l-2 border-gray-700 ml-6">
                        {path.steps.map(step => {
                          const lesson = lessonsById.get(step.id);
                          if (!lesson) return null;

                          const isCompleted = completedLessons.has(lesson.id);
                          const isActive = activeLessonId === lesson.id;
                          
                          let textStyle = 'text-gray-400'; // Default
                          if (isCompleted) textStyle = 'text-gray-500 line-through'; // Completed
                          if (isActive) textStyle = 'text-white font-semibold'; // Active overrides all

                          return (
                             <button key={lesson.id} onClick={() => onSelectLesson(lesson.id)} className={lessonItemClasses(lesson.id)}>
                              <span className={`transition-colors duration-300 ${textStyle}`}>
                                {lesson.title}
                              </span>
                              {isCompleted && (
                                <span className="animate-check-pop-in">
                                  <CheckIcon />
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
        </div>
      </nav>
    </aside>
  );
});

export default Sidebar;