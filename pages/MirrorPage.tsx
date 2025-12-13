
import React, { useState, useCallback } from 'react';
import { ImageUploader } from '../components/ImageUploader';
import { MirrorAnalysisDisplay } from '../components/MirrorAnalysisDisplay';
import { generatePromptFromImage } from '../services/geminiService';
import { fileToBase64 } from '../utils/fileUtils';
import type { SelectedFile } from '../types';
import { GlowCard } from '../components/ui/spotlight-card';
import { UploadIcon } from '../components/icons/UploadIcon';

const ScanningOverlay: React.FC = () => (
    <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-indigo-500/10 mix-blend-overlay"></div>
        {/* Scanning Line */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.8)] animate-[scan_2s_linear_infinite]" />
        
        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.1)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>

        {/* Text */}
        <div className="absolute bottom-8 right-8 flex flex-col items-end">
             <div className="flex items-center gap-2 mb-1">
                 <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
                 <span className="text-cyan-400 font-mono text-sm uppercase tracking-widest font-bold">Analysing Cortex</span>
             </div>
             <div className="font-mono text-xs text-cyan-500/70">
                 Extracting Semantic Feature Vectors...
             </div>
        </div>
        <style>{`
            @keyframes scan {
                0% { top: 0%; opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { top: 100%; opacity: 0; }
            }
        `}</style>
    </div>
);

const MirrorPage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<SelectedFile | null>(null);
  const [generatedPromptRaw, setGeneratedPromptRaw] = useState<string>('');
  const [parsedPrompt, setParsedPrompt] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleImageUpload = useCallback(async (file: File) => {
    setIsLoading(true);
    setError('');
    setGeneratedPromptRaw('');
    setParsedPrompt(null);

    const dataUrl = URL.createObjectURL(file);
    const img = new Image();
    
    img.onload = async () => {
      setSelectedFile({
        name: file.name,
        type: file.type,
        size: file.size,
        dataUrl: dataUrl,
        width: img.naturalWidth,
        height: img.naturalHeight
      });

      try {
        const { base64, mimeType } = await fileToBase64(file);
        const promptJson = await generatePromptFromImage(base64, mimeType, img.naturalWidth, img.naturalHeight);
        
        // Ensure valid JSON
        try {
            const parsed = JSON.parse(promptJson);
            setParsedPrompt(parsed);
            setGeneratedPromptRaw(JSON.stringify(parsed, null, 2));
        } catch (jsonErr) {
            console.error("JSON Parse error", jsonErr);
            // Fallback if model returns raw text for some reason
            setGeneratedPromptRaw(promptJson);
            setParsedPrompt({ description: promptJson }); 
        }

      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      } finally {
        setIsLoading(false);
      }
    };
    img.onerror = () => {
        setError("Failed to load image.");
        setIsLoading(false);
    };
    img.src = dataUrl;
  }, []);

  const handleReset = () => {
      if (selectedFile?.dataUrl.startsWith('blob:')) {
          URL.revokeObjectURL(selectedFile.dataUrl);
      }
      setSelectedFile(null);
      setParsedPrompt(null);
      setGeneratedPromptRaw('');
      setError('');
  };

  return (
    <div className="w-full flex-grow flex flex-col min-h-[calc(100vh-80px)]">
      
      {/* State 1: Empty - Upload Portal */}
      {!selectedFile && (
        <div className="flex-1 flex flex-col items-center justify-center p-4 animate-fadeIn">
            <div className="text-center mb-12 space-y-4 max-w-2xl">
                <h1 className="text-6xl font-black text-white tracking-tighter mb-2">Mirror Mode</h1>
                <p className="text-xl text-gray-400">
                    The ultimate reverse-engineering tool. Upload any image to decompose it into its constituent stylistic and semantic elements.
                </p>
            </div>
            
            <GlowCard glowColor="cyan" customSize className="w-full max-w-xl p-1 bg-gray-900/50 border border-gray-800 rounded-3xl">
                 <div className="bg-gray-950 rounded-[1.4rem] overflow-hidden">
                    <ImageUploader onImageUpload={handleImageUpload} isLoading={isLoading} />
                 </div>
            </GlowCard>
            
            <div className="mt-12 flex gap-8 text-gray-600 text-sm font-mono uppercase tracking-widest">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Gemini 2.5 Flash Vision
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    JSON Schema Validation
                </div>
            </div>
        </div>
      )}

      {/* State 2 & 3: Analysis & Result */}
      {selectedFile && (
         <div className="flex-1 container mx-auto px-4 py-8 flex flex-col">
            {/* Top Toolbar */}
            <div className="flex justify-between items-center mb-6 bg-gray-900/40 p-4 rounded-xl border border-gray-800 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400">
                        <UploadIcon className="w-5 h-5"/>
                    </div>
                    <div>
                        <p className="text-sm font-bold text-gray-200">{selectedFile.name}</p>
                        <p className="text-xs text-gray-500">{selectedFile.width}x{selectedFile.height} • {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                </div>
                <button 
                    onClick={handleReset}
                    className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white text-sm font-bold rounded-lg transition-colors border border-gray-700"
                >
                    Analyze Another
                </button>
            </div>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-0">
                {/* Left: The Image */}
                <div className="relative h-full min-h-[500px] flex flex-col">
                    <GlowCard glowColor="purple" customSize className="flex-1 bg-black border border-gray-800 rounded-2xl overflow-hidden relative shadow-2xl">
                         {/* Image */}
                         <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50">
                             <img 
                                src={selectedFile.dataUrl} 
                                alt="Analysis Subject" 
                                className="max-w-full max-h-full object-contain"
                             />
                         </div>

                         {/* Loaders & Overlays */}
                         {isLoading && <ScanningOverlay />}
                    </GlowCard>
                </div>

                {/* Right: The Blueprint */}
                <div className="h-full min-h-[500px] flex flex-col">
                    {isLoading ? (
                         <GlowCard glowColor="blue" customSize className="flex-1 bg-gray-900/20 border border-gray-800 rounded-2xl p-8 flex flex-col items-center justify-center space-y-6">
                             <div className="relative w-24 h-24">
                                <div className="absolute inset-0 border-4 border-indigo-500/30 rounded-full"></div>
                                <div className="absolute inset-0 border-t-4 border-indigo-500 rounded-full animate-spin"></div>
                                <div className="absolute inset-4 bg-indigo-500/20 rounded-full animate-pulse"></div>
                             </div>
                             <div className="text-center space-y-2">
                                <h3 className="text-xl font-bold text-white">Deconstructing Reality</h3>
                                <p className="text-gray-400 max-w-xs mx-auto">Gemini is analyzing lighting, composition, and stylistic tokens...</p>
                             </div>
                         </GlowCard>
                    ) : error ? (
                        <div className="flex-1 bg-red-900/10 border border-red-500/30 rounded-2xl p-8 flex flex-col items-center justify-center text-center">
                            <h3 className="text-xl font-bold text-red-400 mb-2">Analysis Failed</h3>
                            <p className="text-gray-400 mb-6">{error}</p>
                            <button onClick={handleReset} className="px-6 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-colors">Try Again</button>
                        </div>
                    ) : (
                        <MirrorAnalysisDisplay parsedData={parsedPrompt} rawJson={generatedPromptRaw} />
                    )}
                </div>
            </div>
         </div>
      )}
    </div>
  );
};

export default MirrorPage;
