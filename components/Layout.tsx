import React from 'react';
import { Page } from '../App';
import SplashCursor from './splash-cursor';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentPage, onNavigate }) => {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 font-sans flex flex-col selection:bg-indigo-500/30 relative">
      <SplashCursor />
      <nav className="sticky top-0 z-50 w-full border-b border-gray-800 bg-gray-950/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-24 flex items-center justify-between">
          {/* Retro Miami Style Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer group select-none relative p-2"
            onClick={() => onNavigate('home')}
          >
            <div className="absolute inset-0 border-2 border-dashed border-indigo-500/30 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.6)] border border-indigo-400/50 transform group-hover:rotate-6 transition-all duration-300">
              <span className="font-cursive text-3xl text-white pt-1 drop-shadow-md">P</span>
            </div>
            
            <div className="flex flex-col">
              <span className="font-cursive text-4xl tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 drop-shadow-[0_0_10px_rgba(236,72,153,0.5)]">
                Promptry
              </span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="hidden md:flex items-center p-1.5 bg-gray-900/80 rounded-xl border border-gray-800 backdrop-blur-sm relative">
             {/* Dashed container hint based on screenshot */}
             <div className="absolute -inset-1 border border-dashed border-gray-700/50 rounded-2xl pointer-events-none hidden group-hover:block"></div>

            <button 
              onClick={() => onNavigate('home')}
              className={`px-6 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 relative ${
                currentPage === 'home' 
                  ? 'text-white bg-gray-800 shadow-[0_0_15px_rgba(255,255,255,0.1)] scale-105' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              Overview
            </button>
            <button 
              onClick={() => onNavigate('mirror')}
              className={`px-6 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 relative ${
                currentPage === 'mirror' 
                  ? 'text-cyan-300 bg-cyan-950/40 shadow-[0_0_15px_rgba(34,211,238,0.2)] scale-105 border border-cyan-500/20' 
                  : 'text-gray-400 hover:text-cyan-300 hover:bg-gray-800/50'
              }`}
            >
              Mirror
            </button>
            <button 
              onClick={() => onNavigate('gym')}
              className={`px-6 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 relative ${
                currentPage === 'gym' 
                  ? 'text-purple-300 bg-purple-950/40 shadow-[0_0_15px_rgba(168,85,247,0.2)] scale-105 border border-purple-500/20' 
                  : 'text-gray-400 hover:text-purple-300 hover:bg-gray-800/50'
              }`}
            >
              Gym
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-grow flex flex-col relative z-10">
        {children}
      </main>

      <footer className="border-t border-gray-900 bg-gray-950 py-12 relative z-10">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Promptry AI. All rights reserved.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-indigo-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
