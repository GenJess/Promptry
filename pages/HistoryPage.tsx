
import React from 'react';
import { GlowCard } from '../components/ui/spotlight-card';

// Mock data to simulate Supabase history
const mockHistory = [
    { type: 'gym', date: '2 mins ago', score: 85, title: 'Level 3 Challenge', image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' },
    { type: 'mirror', date: '1 hour ago', score: null, title: 'Neon Cyberpunk City', image: 'https://images.unsplash.com/photo-1555685812-4b943f3db9f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' },
    { type: 'gym', date: 'Yesterday', score: 42, title: 'Level 5 Challenge', image: 'https://images.unsplash.com/photo-1535905557558-afc4877a26fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' },
    { type: 'gym', date: '2 days ago', score: 92, title: 'Level 1 Challenge', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' },
];

export const HistoryPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl animate-fadeIn">
       <div className="flex justify-between items-end mb-12">
            <div>
                <h1 className="text-4xl font-bold text-gray-100 mb-2">Training History</h1>
                <p className="text-gray-400">Review your past sessions and track your improvement.</p>
            </div>
            <div className="hidden md:block">
                <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-900 px-4 py-2 rounded-lg border border-gray-800">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    <span>Database Connected</span>
                </div>
            </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockHistory.map((item, idx) => (
                <GlowCard key={idx} glowColor={item.type === 'gym' ? 'purple' : 'blue'} customSize className="bg-gray-900/40 p-0 overflow-hidden group cursor-pointer border border-gray-800 hover:border-gray-600 transition-colors">
                    <div className="flex p-4 gap-4 items-center">
                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-800">
                            <img src={item.image} alt="History thumbnail" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="flex-grow min-w-0">
                            <div className="flex justify-between items-start mb-1">
                                <h4 className="text-gray-200 font-bold truncate">{item.title}</h4>
                                {item.score !== null && (
                                    <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${
                                        item.score > 80 ? 'bg-green-500/20 text-green-400' : 
                                        item.score > 50 ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'
                                    }`}>
                                        {item.score}%
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center justify-between text-xs text-gray-500">
                                <span className="uppercase tracking-wider font-semibold">{item.type}</span>
                                <span>{item.date}</span>
                            </div>
                        </div>
                    </div>
                </GlowCard>
            ))}
            
            {/* Empty State / Placeholder for more */}
            <div className="border-2 border-dashed border-gray-800 rounded-2xl flex flex-col items-center justify-center p-8 text-gray-600 hover:border-gray-700 hover:text-gray-500 transition-all cursor-pointer">
                <span className="text-2xl mb-2">+</span>
                <span className="font-medium">Load More History</span>
            </div>
       </div>
    </div>
  );
};
