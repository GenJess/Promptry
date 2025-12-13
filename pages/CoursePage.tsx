import React from 'react';
import { GlowCard } from '../components/ui/spotlight-card';
import { CheckIcon } from '../components/icons/CheckIcon';

const modules = [
  {
    id: 1,
    title: "The Logic of Light",
    description: "Why structured data (JSON) beats natural language for visual tasks.",
    status: 'completed',
    lessons: [
        "The Ambiguity of Words",
        "JSON as a Blueprint",
        "Reducing Hallucinations"
    ]
  },
  {
    id: 2,
    title: "Visual Vocabulary",
    description: "Learning the specific tokens that trigger precise visual styles.",
    status: 'current',
    lessons: [
        "Lighting Engines (Octane vs. Natural)",
        "Camera Angles & Focal Lengths",
        "Texture & Materiality"
    ]
  },
  {
    id: 3,
    title: "The LLM Mindset",
    description: "Understanding how models process attention, beginning/end bias, and token weight.",
    status: 'locked',
    lessons: [
        "The Attention Mechanism",
        "Token Priority",
        "Negative Prompting Logic"
    ]
  },
  {
    id: 4,
    title: "Advanced Composition",
    description: "Controlling the frame with mathematical precision.",
    status: 'locked',
    lessons: [
        "The Rule of Thirds in Code",
        "Depth of Field Parameters",
        "Multi-Subject Coherence"
    ]
  }
];

export const CoursePage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl animate-fadeIn">
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-100">The Curriculum</h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Master the second language of the creative age. A structured path from vague ideas to executable blueprints.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 relative">
        {/* Connector Line */}
        <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-gradient-to-b from-indigo-500/50 via-purple-500/50 to-gray-800 hidden md:block"></div>

        {modules.map((module, index) => (
            <div key={module.id} className="relative pl-0 md:pl-24">
                {/* Timeline Dot */}
                <div className={`hidden md:flex absolute left-6 -translate-x-1/2 w-4 h-4 rounded-full border-2 items-center justify-center z-10 bg-gray-950 ${
                    module.status === 'completed' ? 'border-green-500 text-green-500' :
                    module.status === 'current' ? 'border-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)] animate-pulse' :
                    'border-gray-700'
                }`}>
                    {module.status === 'completed' && <div className="w-2 h-2 bg-green-500 rounded-full" />}
                </div>

                <GlowCard 
                    glowColor={module.status === 'current' ? 'blue' : 'purple'} 
                    customSize
                    className={`p-8 bg-gray-900/40 border ${
                        module.status === 'locked' ? 'border-gray-800 opacity-60' : 
                        module.status === 'current' ? 'border-indigo-500/50' : 
                        'border-green-500/30'
                    }`}
                >
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div className="flex-grow">
                            <div className="flex items-center gap-3 mb-2">
                                <span className={`text-xs font-bold px-2 py-1 rounded uppercase tracking-wider ${
                                    module.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                                    module.status === 'current' ? 'bg-indigo-500/20 text-indigo-400' :
                                    'bg-gray-800 text-gray-500'
                                }`}>
                                    Module 0{module.id}
                                </span>
                                {module.status === 'completed' && <CheckIcon className="w-5 h-5 text-green-500" />}
                            </div>
                            <h3 className="text-2xl font-bold text-gray-100 mb-2">{module.title}</h3>
                            <p className="text-gray-400 max-w-lg">{module.description}</p>
                        </div>
                        
                        <div className="w-full md:w-auto flex flex-col gap-2 min-w-[200px] border-l border-gray-800 md:pl-6">
                            {module.lessons.map((lesson, i) => (
                                <div key={i} className="flex items-center gap-3 text-sm text-gray-500">
                                    <div className={`w-1.5 h-1.5 rounded-full ${
                                        module.status === 'completed' ? 'bg-green-500' : 
                                        module.status === 'current' && i === 0 ? 'bg-indigo-400' : 'bg-gray-700'
                                    }`} />
                                    <span className={module.status === 'current' && i === 0 ? 'text-gray-200 font-medium' : ''}>
                                        {lesson}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    {module.status === 'current' && (
                        <div className="mt-8 pt-6 border-t border-gray-800/50 flex justify-center w-full">
                            <button className="px-10 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] hover:-translate-y-0.5 active:translate-y-0">
                                Continue Lesson &rarr;
                            </button>
                        </div>
                    )}
                </GlowCard>
            </div>
        ))}
      </div>
    </div>
  );
};