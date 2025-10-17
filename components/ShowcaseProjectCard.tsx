import React from 'react';
import type { ShowcaseProject } from '../types';
import { HeartIcon, UserIcon } from './icons';

interface ShowcaseProjectCardProps {
  project: ShowcaseProject;
  isLiked: boolean;
  onLike: () => void;
}

const ShowcaseProjectCard: React.FC<ShowcaseProjectCardProps> = ({ project, isLiked, onLike }) => {
  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg flex flex-col border border-gray-700/50 transform hover:-translate-y-1 transition-transform duration-300">
      <div className="relative">
        <img src={project.imageUrl} alt={project.title} className="w-full h-56 object-cover" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-4 left-4">
             <h3 className="text-2xl font-bold text-white">{project.title}</h3>
        </div>
      </div>
      
      <div className="p-5 flex-grow flex flex-col">
        <p className="text-gray-400 text-sm mb-4 flex-grow">{project.description}</p>
        
        <div className="border-t border-gray-700 pt-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-600/30 flex items-center justify-center">
                    <UserIcon className="w-4 h-4 text-blue-300" />
                </div>
                <div>
                     <p className="text-sm font-semibold text-gray-300">{project.authorName}</p>
                     <p className="text-xs text-gray-500">Cấp độ {project.authorLevel}</p>
                </div>
            </div>

            <button
                onClick={onLike}
                className="flex items-center gap-2 bg-gray-700/50 hover:bg-gray-700 px-3 py-2 rounded-lg transition-colors"
                aria-label={isLiked ? "Bỏ thích" : "Thích"}
            >
                <HeartIcon filled={isLiked} className="w-5 h-5 transition-transform duration-200 transform group-hover:scale-125" />
                <span className={`font-bold text-sm ${isLiked ? 'text-red-400' : 'text-gray-400'}`}>
                    {project.likes}
                </span>
            </button>
        </div>
      </div>
    </div>
  );
};

export default ShowcaseProjectCard;