import React, { useState } from 'react';
import { Page } from '../App';
import SplashCursor from './splash-cursor';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentPage, onNavigate }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 font-sans flex flex-col selection:bg-indigo-500/30 relative">
      <SplashCursor />
      <nav className="sticky top-0 z-50 w-full border-b border-gray-800 bg-gray-950/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          {/* Retro Miami Style Logo - Acts as Home Button */}
          <div 
            className="flex items-center gap-3 cursor-pointer group select-none relative"
            onClick={() => onNavigate('home')}
          >
            {/* Logo Mark */}
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.5)] transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-[0_0_25px_rgba(99,102,241,0.8)] z-10 animate-pulse-slow">
              <span className="font-cursive text-2xl text-white pt-1 drop-shadow-md group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-b group-hover:from-white group-hover:to-indigo-200">P</span>
            </div>
            
            {/* Logo Text */}
            <div className="flex flex-col">
              <span className="font-cursive text-3xl tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 drop-shadow-[0_0_10px_rgba(236,72,153,0.5)] group-hover:drop-shadow-[0_0_15px_rgba(236,72,153,0.8)] transition-all">
                Promptry
              </span>
            </div>
          </div>

          {/* Navigation Tabs - Centralized */}
          <div className="hidden md:flex items-center p-1 bg-gray-900/80 rounded-xl border border-gray-800 backdrop-blur-sm relative shadow-inner">
            {['Course', 'Mirror', 'Gym'].map((item) => {
                const pageKey = item.toLowerCase() as Page;
                const isActive = currentPage === pageKey;
                
                let activeClass = '';
                if (isActive) {
                    if (item === 'Mirror') activeClass = 'text-cyan-300 bg-cyan-950/40 shadow-[0_0_15px_rgba(34,211,238,0.2)] border-cyan-500/20';
                    else if (item === 'Gym') activeClass = 'text-purple-300 bg-purple-950/40 shadow-[0_0_15px_rgba(168,85,247,0.2)] border-purple-500/20';
                    else if (item === 'Course') activeClass = 'text-green-300 bg-green-950/40 shadow-[0_0_15px_rgba(74,222,128,0.2)] border-green-500/20';
                }

                return (
                    <button 
                        key={item}
                        onClick={() => onNavigate(pageKey)}
                        className={`px-6 py-2 text-sm font-semibold rounded-lg transition-all duration-300 border border-transparent ${
                            isActive ? activeClass : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                        }`}
                    >
                        {item}
                    </button>
                );
            })}
          </div>

          {/* User Profile */}
          <div className="relative">
             <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 pl-1 pr-1 py-1 rounded-full hover:bg-gray-900 border border-transparent hover:border-gray-800 transition-all"
             >
                <div className="hidden sm:block text-right">
                    <p className="text-xs font-bold text-gray-300 leading-none">John Smith</p>
                    <p className="text-[10px] text-indigo-400 leading-none mt-1">PRO Member</p>
                </div>
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white shadow-lg ring-2 ring-gray-950">
                    JS
                </div>
             </button>

             {/* Dropdown Menu */}
             {isProfileOpen && (
                 <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)} />
                    <div className="absolute right-0 top-full mt-2 w-56 bg-gray-900 border border-gray-800 rounded-xl shadow-2xl z-50 overflow-hidden animate-fadeIn">
                        <div className="p-4 border-b border-gray-800">
                            <p className="text-white font-medium">John Smith</p>
                            <p className="text-xs text-gray-500">Free Plan</p>
                        </div>
                        <div className="p-2">
                            <button onClick={() => { onNavigate('history'); setIsProfileOpen(false); }} className="w-full text-left px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                History
                            </button>
                            <button onClick={() => { onNavigate('settings'); setIsProfileOpen(false); }} className="w-full text-left px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46" /></svg>
                                Settings
                            </button>
                        </div>
                        <div className="border-t border-gray-800 p-2">
                            <button className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-gray-800 rounded-lg transition-colors flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" /></svg>
                                Sign Out
                            </button>
                        </div>
                    </div>
                 </>
             )}
          </div>
        </div>
        <style>{`
          @keyframes pulse-slow {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.9; transform: scale(1.05); }
          }
          .animate-pulse-slow {
            animation: pulse-slow 3s ease-in-out infinite;
          }
        `}</style>
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