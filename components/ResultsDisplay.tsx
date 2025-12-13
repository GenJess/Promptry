
import React from 'react';
import { PromptAnalysis } from './PromptAnalysis';
import type { PromptAnalysisItem } from '../types';

interface ImageState {
  dataUrl: string;
}

interface ResultsDisplayProps {
  referenceImage: ImageState;
  userGeneratedImage: ImageState;
  score: number;
  analysis: PromptAnalysisItem[];
  targetPrompt: string;
  userPrompt: string;
  onReset: () => void;
}

const getScoreColor = (score: number) => {
  if (score >= 80) return 'text-green-400';
  if (score >= 50) return 'text-yellow-400';
  return 'text-red-400';
};

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  referenceImage,
  userGeneratedImage,
  score,
  analysis,
  targetPrompt,
  userPrompt,
  onReset,
}) => {
  return (
    <div className="w-full max-w-[90rem] mx-auto animate-fadeIn space-y-8 pb-12">
      {/* Top Bar: Score & Actions */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-gray-900/40 p-6 rounded-2xl border border-gray-800 backdrop-blur-sm sticky top-24 z-30 shadow-2xl">
        <div className="flex items-center gap-6">
            <div className="text-center md:text-left">
                <p className="text-sm font-medium text-gray-400 uppercase tracking-widest">Match Score</p>
                <p className={`text-6xl font-black ${getScoreColor(score)} drop-shadow-lg`}>{score}%</p>
            </div>
            <div className="h-12 w-px bg-gray-700 hidden md:block"></div>
            <div className="hidden md:block">
                <p className="text-gray-400 text-sm max-w-xs">
                    {score > 80 ? "Outstanding! You're seeing the matrix." : 
                     score > 50 ? "Good effort. Focus on specific lighting and texture keywords." : 
                     "Keep practicing. Try to break the image down into smaller components."}
                </p>
            </div>
        </div>
        <button
          onClick={onReset}
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-8 rounded-xl transition-all duration-200 text-lg shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_30px_rgba(99,102,241,0.6)] hover:-translate-y-0.5 active:translate-y-0"
        >
          Next Challenge &rarr;
        </button>
      </div>

      {/* Main Content Area */}
      <div className="space-y-8">
        {/* Visual Comparison Section - Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-[400px] md:h-[500px]">
             {/* Reference Image */}
             <div className="relative group rounded-2xl overflow-hidden border-2 border-gray-800 bg-black">
                <div className="absolute top-4 left-4 z-10 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-gray-700">
                    <span className="text-xs font-bold text-gray-200 uppercase tracking-wider">Reference</span>
                </div>
                <img 
                    src={referenceImage.dataUrl} 
                    alt="Reference" 
                    className="w-full h-full object-contain" 
                />
             </div>

             {/* User Image */}
             <div className="relative group rounded-2xl overflow-hidden border-2 border-indigo-500/30 bg-black shadow-[0_0_30px_rgba(99,102,241,0.1)]">
                <div className="absolute top-4 left-4 z-10 bg-indigo-900/70 backdrop-blur-md px-3 py-1 rounded-full border border-indigo-500/30">
                    <span className="text-xs font-bold text-indigo-100 uppercase tracking-wider">Your Creation</span>
                </div>
                <img 
                    src={userGeneratedImage.dataUrl} 
                    alt="User generated" 
                    className="w-full h-full object-contain" 
                />
             </div>
        </div>

        {/* Text Analysis Section */}
        <div className="w-full">
           <PromptAnalysis 
             targetPrompt={targetPrompt}
             userPrompt={userPrompt}
             analysis={analysis}
           />
        </div>
      </div>
      
       <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
      `}</style>
    </div>
  );
};
