
import React from 'react';
import type { PromptAnalysisItem } from '../types';
import { Tooltip } from './ui/Tooltip';
import { SparklesIcon } from './icons/SparklesIcon';
import { CheckIcon } from './icons/CheckIcon';
import { XIcon } from './icons/XIcon';

interface PromptAnalysisProps {
    targetPrompt: string;
    userPrompt: string;
    analysis: PromptAnalysisItem[];
}

const parameterColors: { [key: string]: string } = {
    subject: 'bg-blue-500/20 text-blue-300 border border-blue-500/30 cursor-help hover:bg-blue-500/30 transition-colors',
    style: 'bg-purple-500/20 text-purple-300 border border-purple-500/30 cursor-help hover:bg-purple-500/30 transition-colors',
    composition: 'bg-green-500/20 text-green-300 border border-green-500/30 cursor-help hover:bg-green-500/30 transition-colors',
    setting: 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 cursor-help hover:bg-yellow-500/30 transition-colors',
    color: 'bg-red-500/20 text-red-300 border border-red-500/30 cursor-help hover:bg-red-500/30 transition-colors',
    action: 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 cursor-help hover:bg-indigo-500/30 transition-colors',
    detail: 'bg-pink-500/20 text-pink-300 border border-pink-500/30 cursor-help hover:bg-pink-500/30 transition-colors',
    default: 'bg-gray-500/20 text-gray-300 border border-gray-500/30 cursor-help hover:bg-gray-500/30 transition-colors',
};

const getColorForParameter = (param: string) => {
    const lowerParam = param.toLowerCase();
    for (const key in parameterColors) {
        if (lowerParam.includes(key)) {
            return parameterColors[key];
        }
    }
    return parameterColors.default;
};

// Helper to escape regex special characters
function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); 
}

const highlightPrompt = (prompt: string, analysis: PromptAnalysisItem[], type: 'user' | 'target'): React.ReactNode[] => {
    if (!prompt) return [];

    // Filter items that have a phrase for this type
    const validItems = analysis.filter(item => {
        const phrase = type === 'user' ? item.user_phrase : item.target_phrase;
        return phrase && phrase.trim().length > 0;
    });

    // We need to find the positions of these phrases. 
    // Since a phrase might appear multiple times, we'll try to match greedily or just the first occurrence.
    // To handle overlapping phrases (which shouldn't happen often in this specific logic but is possible),
    // we will simple iterate through the string and match segments.
    
    // Simpler approach: Split the string by the phrases we want to highlight.
    // However, splitting by multiple delimiters is tricky. 
    
    // Let's use a "mask" approach or just replace the string parts with placeholders, then rebuild.
    // Actually, let's just do a simple pass: sort phrases by index in string.
    
    interface Match {
        start: number;
        end: number;
        item: PromptAnalysisItem;
        phrase: string;
    }

    const matches: Match[] = [];

    validItems.forEach(item => {
        const phrase = type === 'user' ? item.user_phrase : item.target_phrase;
        // Simple case-insensitive match
        const regex = new RegExp(escapeRegExp(phrase), 'i');
        const match = regex.exec(prompt);
        
        if (match) {
            matches.push({
                start: match.index,
                end: match.index + phrase.length,
                item,
                phrase: match[0] // Use the actual matched text from prompt to preserve case
            });
        }
    });

    // Sort matches by start index
    matches.sort((a, b) => a.start - b.start);

    // Filter out overlapping matches (keep the first one)
    const uniqueMatches: Match[] = [];
    let lastEnd = 0;
    matches.forEach(m => {
        if (m.start >= lastEnd) {
            uniqueMatches.push(m);
            lastEnd = m.end;
        }
    });

    const elements: React.ReactNode[] = [];
    let currentIndex = 0;

    uniqueMatches.forEach((m, i) => {
        // Text before the match
        if (m.start > currentIndex) {
            elements.push(<span key={`text-${i}`}>{prompt.substring(currentIndex, m.start)}</span>);
        }

        // The matched phrase wrapped in tooltip
        elements.push(
            <Tooltip key={`match-${i}`} content={m.item.feedback}>
                <span className={`px-1.5 py-0.5 rounded mx-0.5 text-xs md:text-sm font-medium border-b-2 ${getColorForParameter(m.item.parameter)}`}>
                    {m.phrase}
                </span>
            </Tooltip>
        );

        currentIndex = m.end;
    });

    // Remaining text
    if (currentIndex < prompt.length) {
        elements.push(<span key="text-end">{prompt.substring(currentIndex)}</span>);
    }

    return elements;
};

export const PromptAnalysis: React.FC<PromptAnalysisProps> = ({ targetPrompt, userPrompt, analysis }) => {
    return (
        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 h-full flex flex-col shadow-2xl">
            <h2 className="text-xl font-bold text-center text-gray-300 mb-6 flex items-center justify-center">
                <SparklesIcon className="w-5 h-5 mr-2 text-indigo-400" />
                Semantic Analysis
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
                {/* Target Column */}
                <div className="flex flex-col h-full">
                     <div className="flex items-center justify-between mb-3 px-1">
                        <p className="font-bold text-green-400 flex items-center text-sm uppercase tracking-wider">
                            <CheckIcon className="w-4 h-4 mr-2" /> 
                            Target Blueprint
                        </p>
                     </div>
                     <div className="flex-grow p-5 bg-gray-950/50 rounded-xl border border-gray-800/50 leading-loose text-gray-300 font-serif text-lg shadow-inner">
                        {highlightPrompt(targetPrompt, analysis, 'target')}
                     </div>
                </div>

                {/* User Column */}
                <div className="flex flex-col h-full">
                     <div className="flex items-center justify-between mb-3 px-1">
                        <p className="font-bold text-yellow-400 flex items-center text-sm uppercase tracking-wider">
                            <XIcon className="w-4 h-4 mr-2" /> 
                            Your Attempt
                        </p>
                     </div>
                     <div className="flex-grow p-5 bg-gray-950/50 rounded-xl border border-gray-800/50 leading-loose text-gray-300 font-serif text-lg shadow-inner">
                        {highlightPrompt(userPrompt, analysis, 'user')}
                     </div>
                </div>
            </div>
            
            <div className="mt-6 text-center text-xs text-gray-500 flex items-center justify-center gap-4">
                <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500"></span> Subject</div>
                <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-purple-500"></span> Style</div>
                <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span> Composition</div>
                <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500"></span> Color</div>
                <span className="ml-2 opacity-50">(Hover text for feedback)</span>
            </div>
        </div>
    );
};
