import React, { useState, useMemo } from 'react';
import type { ShowcaseProject } from '../types';
import ShowcaseProjectCard from './ShowcaseProjectCard';

interface ShowcaseViewProps {
  projects: ShowcaseProject[];
  likedProjects: Set<string>;
  onLikeProject: (projectId: string) => void;
  onAddProject: () => void;
}

type SortOption = 'latest' | 'most_liked';

const ShowcaseView: React.FC<ShowcaseViewProps> = ({ projects, likedProjects, onLikeProject, onAddProject }) => {
  const [sortOption, setSortOption] = useState<SortOption>('latest');

  const sortedProjects = useMemo(() => {
    const sorted = [...projects];
    if (sortOption === 'most_liked') {
      sorted.sort((a, b) => b.likes - a.likes);
    } 
    // 'latest' is the default as new projects are added to the start of the array
    return sorted;
  }, [projects, sortOption]);
  
  const sortButtonClasses = (option: SortOption) => 
    `px-4 py-2 rounded-lg font-semibold transition-colors text-sm ${
        sortOption === option 
        ? 'bg-pink-600 text-white' 
        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
    }`;


  return (
    <div className="p-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
            <h2 className="text-4xl font-bold text-pink-400">Triển lãm Sáng tạo</h2>
            <p className="text-gray-400 mt-1">Khám phá các dự án tuyệt vời từ cộng đồng!</p>
        </div>
        <div className="flex-shrink-0">
             <button 
                onClick={onAddProject}
                className="w-full md:w-auto bg-pink-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
             >
                Đăng dự án
            </button>
        </div>
      </div>

      <div className="mb-6 flex items-center justify-end gap-2">
        <span className="text-gray-400 text-sm">Sắp xếp theo:</span>
        <div className="flex gap-2">
            <button onClick={() => setSortOption('latest')} className={sortButtonClasses('latest')}>Mới nhất</button>
            <button onClick={() => setSortOption('most_liked')} className={sortButtonClasses('most_liked')}>Nhiều lượt thích nhất</button>
        </div>
      </div>

      {sortedProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedProjects.map(project => (
            <ShowcaseProjectCard
              key={project.id}
              project={project}
              isLiked={likedProjects.has(project.id)}
              onLike={() => onLikeProject(project.id)}
            />
          ))}
        </div>
      ) : (
         <div className="text-center py-20 bg-gray-800/50 rounded-lg">
            <h3 className="text-2xl font-semibold text-white">Chưa có dự án nào!</h3>
            <p className="text-gray-400 mt-2">Hãy là người đầu tiên chia sẻ sáng tạo của bạn với cộng đồng.</p>
        </div>
      )}
    </div>
  );
};

export default ShowcaseView;