import React from 'react';
import { GlowCard } from './ui/spotlight-card';

const difficulties = [
  { 
    level: 1, 
    title: 'Object Clarity', 
    subtitle: 'Novice Simulation',
    description: 'Establish the baseline.',
    color: 'green',
    moduleRef: 'Module 01'
  },
  { 
    level: 2, 
    title: 'Scene Composition', 
    subtitle: 'Apprentice Simulation',
    description: 'Balance the subject within its environment.',
    color: 'cyan',
    moduleRef: 'Module 01'
  },
  { 
    level: 3, 
    title: 'Lighting & Texture', 
    subtitle: 'Adept Simulation',
    description: 'Master the Visual Vocabulary.',
    color: 'blue',
    moduleRef: 'Module 02'
  },
  { 
    level: 4, 
    title: 'Mood & Narrative', 
    subtitle: 'Expert Simulation',
    description: 'Convey emotion through abstract tokens.',
    color: 'purple',
    moduleRef: 'Module 03'
  },
  { 
    level: 5, 
    title: 'Total Synthesis', 
    subtitle: 'Master Simulation',
    description: 'Complex scenes and intricate details.',
    color: 'red',
    moduleRef: 'Module 04'
  },
];

interface DifficultySelectorProps {
  onSelect: (difficulty: string) => void;
  isLoading: boolean;
  onHover?: (level: number | null) => void;
}

export const DifficultySelector: React.FC<DifficultySelectorProps> = ({ onSelect, isLoading, onHover }) => {
  return (
    <div className="relative flex flex-col space-y-6 w-full pl-6">
      
      {/* Linearity Connector - Adjusted for new layout */}
      <div className="absolute left-0 top-6 bottom-6 w-0.5 bg-gradient-to-b from-green-500/30 via-purple-500/30 to-red-900/30"></div>

      {difficulties.map((item, index) => (
        <div 
            key={item.level} 
            className="relative group"
            onMouseEnter={() => onHover && onHover(item.level)}
        >
           {/* Timeline Dot with pulsing effect */}
           <div className={`absolute left-[-1.5rem] top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-gray-950 z-10 transition-all duration-300 group-hover:scale-125
                ${item.color === 'green' ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)]' : ''}
                ${item.color === 'cyan' ? 'bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.6)]' : ''}
                ${item.color === 'blue' ? 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)]' : ''}
                ${item.color === 'purple' ? 'bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.6)]' : ''}
                ${item.color === 'red' ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.6)]' : ''}
           `}></div>

            <button
              onClick={() => onSelect(item.title)}
              disabled={isLoading}
              className="w-full text-left focus:outline-none rounded-2xl group-hover:translate-x-2 transition-transform duration-300"
            >
              <GlowCard 
                glowColor={item.color as any} 
                customSize 
                className="w-full bg-gray-900/40 border border-gray-800 group-hover:bg-gray-800/60 group-hover:border-gray-700 transition-all duration-300"
              >
                <div className="p-5 flex items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                        {/* Level Number */}
                        <div className={`
                          text-4xl font-black opacity-30 group-hover:opacity-100 transition-opacity duration-300 font-mono
                          ${item.color === 'green' ? 'text-green-500' : ''}
                          ${item.color === 'cyan' ? 'text-cyan-500' : ''}
                          ${item.color === 'blue' ? 'text-blue-500' : ''}
                          ${item.color === 'purple' ? 'text-purple-500' : ''}
                          ${item.color === 'red' ? 'text-red-500' : ''}
                        `}>
                            0{item.level}
                        </div>

                        {/* Text Content */}
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <h3 className="text-xl font-bold text-gray-200 group-hover:text-white transition-colors">{item.title}</h3>
                                <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-gray-800 text-gray-500 border border-gray-700 group-hover:border-gray-600 transition-colors">
                                    {item.subtitle}
                                </span>
                            </div>
                            <p className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors">
                                {item.description}
                            </p>
                        </div>
                    </div>

                    {/* Action Arrow */}
                    <div className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-4 group-hover:translate-x-0">
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-300">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                    </div>
                </div>
                
                {isLoading && (
                     <div className="absolute inset-0 bg-gray-950/60 z-10 cursor-not-allowed"></div>
                )}
              </GlowCard>
            </button>
        </div>
      ))}
    </div>
  );
};