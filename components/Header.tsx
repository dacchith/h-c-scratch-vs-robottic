
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 shadow-md p-4 flex items-center border-b border-gray-700">
        <div className="bg-gradient-to-r from-purple-500 to-cyan-500 p-2 rounded-lg mr-4">
            <i className="fa-solid fa-brain text-2xl text-white"></i>
        </div>
        <h1 className="text-2xl font-bold text-white tracking-wider">
            Trung tâm Học tập Scratch & Robotics
        </h1>
    </header>
  );
};

export default Header;
