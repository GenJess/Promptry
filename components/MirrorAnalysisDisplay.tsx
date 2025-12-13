
import React, { useState } from 'react';
import { JsonSyntaxHighlighter } from './JsonSyntaxHighlighter';
import { SparklesIcon } from './icons/SparklesIcon';
import { ClipboardIcon } from './icons/ClipboardIcon';

interface MirrorAnalysisDisplayProps {
  parsedData: any;
  rawJson: string;
}

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 border-b border-gray-800 pb-1">
    {children}
  </h3>
);

const DetailRow = ({ label, value }: { label: string, value: string }) => (
  <div className="mb-3">
    <span className="text-gray-500 text-sm block mb-0.5">{label}</span>
    <span className="text-gray-200 text-sm font-medium leading-relaxed">{value}</span>
  </div>
);

const Tag = ({ text, color = 'blue' }: { text: string, color?: string }) => {
   const colorMap: Record<string, string> = {
       blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
       purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
       green: 'bg-green-500/10 text-green-400 border-green-500/20',
       orange: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
   };
   const colorClass = colorMap[color] || colorMap.blue;

   return (
      <span className={`inline-block px-2 py-1 rounded text-xs font-medium border ${colorClass} mr-2 mb-2`}>
          {text}
      </span>
   );
};

export const MirrorAnalysisDisplay: React.FC<MirrorAnalysisDisplayProps> = ({ parsedData, rawJson }) => {
  const [activeTab, setActiveTab] = useState<'blueprint' | 'json'>('blueprint');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(rawJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-gray-900/40 rounded-2xl border border-gray-800 backdrop-blur-sm overflow-hidden">
      {/* Header / Tabs */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800 bg-gray-900/60">
        <div className="flex bg-gray-950 rounded-lg p-1 border border-gray-800">
          <button
            onClick={() => setActiveTab('blueprint')}
            className={`flex items-center space-x-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
              activeTab === 'blueprint' 
                ? 'bg-gray-800 text-white shadow-sm' 
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <SparklesIcon className="w-4 h-4" />
            <span>Blueprint</span>
          </button>
          <button
            onClick={() => setActiveTab('json')}
            className={`flex items-center space-x-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
              activeTab === 'json' 
                ? 'bg-gray-800 text-white shadow-sm' 
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 18" />
            </svg>
            <span>JSON</span>
          </button>
        </div>

        <button 
            onClick={handleCopy}
            className="flex items-center space-x-2 text-xs font-medium text-gray-400 hover:text-white transition-colors bg-gray-800/50 hover:bg-gray-800 px-3 py-1.5 rounded-lg border border-gray-700"
        >
            <ClipboardIcon className="w-3.5 h-3.5" />
            <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>

      {/* Content */}
      <div className="flex-grow overflow-y-auto custom-scrollbar">
        {activeTab === 'blueprint' ? (
          <div className="p-6 space-y-8 animate-fadeIn">
            {/* Description */}
            <div>
               <SectionTitle>Essence</SectionTitle>
               <p className="text-xl md:text-2xl font-serif text-gray-200 leading-relaxed italic">
                 "{parsedData.description}"
               </p>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Subject */}
                <div className="space-y-4">
                    <SectionTitle>Subject</SectionTitle>
                    <DetailRow label="Description" value={parsedData.subject?.description} />
                    <DetailRow label="Expression" value={parsedData.subject?.expression} />
                    <DetailRow label="Pose" value={parsedData.subject?.pose} />
                </div>

                {/* Style */}
                <div className="space-y-4">
                    <SectionTitle>Artistic Style</SectionTitle>
                    <div className="flex flex-wrap">
                        <Tag text={parsedData.style?.artistic_style} color="purple" />
                        <Tag text={parsedData.style?.medium} color="purple" />
                        <Tag text={parsedData.style?.mood} color="blue" />
                    </div>
                </div>

                {/* Composition */}
                <div className="space-y-4">
                    <SectionTitle>Composition</SectionTitle>
                    <DetailRow label="Framing" value={parsedData.composition?.framing} />
                    <DetailRow label="Camera Angle" value={parsedData.composition?.camera_angle} />
                    <DetailRow label="Lighting" value={parsedData.composition?.lighting} />
                    <DetailRow label="Focus" value={parsedData.composition?.focus} />
                </div>

                 {/* Setting */}
                 <div className="space-y-4">
                    <SectionTitle>Setting</SectionTitle>
                    <DetailRow label="Location" value={parsedData.setting?.location} />
                    <DetailRow label="Time of Day" value={parsedData.setting?.time_of_day} />
                </div>
            </div>

            {/* Colors */}
            <div>
                 <SectionTitle>Palette & Tone</SectionTitle>
                 <div className="flex items-center gap-4 mb-4">
                    <span className="text-gray-400 text-sm">Overall Tone:</span>
                    <span className="text-gray-200 text-sm">{parsedData.color_palette?.overall_tone}</span>
                 </div>
                 <div className="flex flex-wrap gap-2">
                    {parsedData.color_palette?.dominant_colors?.map((color: string, i: number) => {
                        // Check if color is hex-ish
                        const isHex = color.startsWith('#') || color.match(/^#[0-9A-F]{6}$/i);
                        return (
                            <div key={i} className="flex items-center gap-2 bg-gray-950 border border-gray-800 rounded-full px-3 py-1.5">
                                {isHex && <div className="w-3 h-3 rounded-full border border-gray-700" style={{ backgroundColor: color }}></div>}
                                <span className="text-xs text-gray-300">{color}</span>
                            </div>
                        )
                    })}
                 </div>
            </div>
            
             {/* Additional Details */}
             {parsedData.additional_details && parsedData.additional_details.length > 0 && (
                <div>
                    <SectionTitle>Additional Details</SectionTitle>
                    <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
                        {parsedData.additional_details.map((detail: string, i: number) => (
                            <li key={i}>{detail}</li>
                        ))}
                    </ul>
                </div>
             )}

          </div>
        ) : (
          <div className="h-full bg-gray-950">
             <JsonSyntaxHighlighter jsonString={rawJson} />
          </div>
        )}
      </div>
    </div>
  );
};
