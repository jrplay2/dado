
import React from 'react';

interface DieProps {
  isRolling: boolean;
  result: number | null;
}

const Die: React.FC<DieProps> = ({ isRolling, result }) => {
  const dieContent = isRolling ? '...' : (result !== null ? result : '🎲');

  return (
    <div className="w-40 h-40 sm:w-48 sm:h-48 perspective-1000 mb-4 z-10">
      <div
        className={`w-full h-full relative transform-style-preserve-3d ${
          isRolling ? 'animate-roll' : ''
        }`}
      >
        <div className="absolute w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 rounded-3xl shadow-2xl shadow-indigo-500/30 border-2 border-indigo-400/50">
          <span 
            className="text-6xl sm:text-7xl font-bold text-white tracking-tighter transition-opacity duration-300" 
            style={{ textShadow: '0 0 15px rgba(255,255,255,0.5)' }}
          >
            {dieContent}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Die;
