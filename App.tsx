
import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import LessonView from './components/LessonView';
import AiTutorView from './components/AiTutorView';
import ProjectCard from './components/ProjectCard';
import { LESSONS, PROJECTS } from './constants';
import type { Lesson } from './types';

type ViewType = 'lesson' | 'tutor' | 'projects';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>('tutor');
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);

  const activeLesson = useMemo(() => {
    if (activeView !== 'lesson' || !activeLessonId) return null;
    return LESSONS.find(lesson => lesson.id === activeLessonId) || null;
  }, [activeView, activeLessonId]);
  
  const handleSelectLesson = (lessonId: string) => {
    setActiveView('lesson');
    setActiveLessonId(lessonId);
  };

  const handleSelectView = (view: ViewType) => {
    setActiveView(view);
    setActiveLessonId(null);
  };

  const renderContent = () => {
    switch (activeView) {
      case 'tutor':
        return <AiTutorView />;
      case 'projects':
        return (
          <div className="p-8">
            <h2 className="text-3xl font-bold text-teal-400 mb-6">Dự án Mẫu</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {PROJECTS.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        );
      case 'lesson':
        return activeLesson ? <LessonView lesson={activeLesson} /> : <div className="p-8 text-center text-gray-400">Vui lòng chọn một bài học từ thanh bên.</div>;
      default:
        return <div className="p-8 text-center text-gray-400">Chào mừng đến với Trung tâm Học tập!</div>;
    }
  };

  return (
    <div className="flex flex-col h-screen font-sans">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          onSelectLesson={handleSelectLesson} 
          onSelectView={handleSelectView}
          activeView={activeView}
          activeLessonId={activeLessonId}
        />
        <main className="flex-1 overflow-y-auto bg-gray-900">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;
