import React, { useState, useCallback, useEffect } from 'react';
import { DifficultySelector } from '../components/DifficultySelector';
import { ImageUploader } from '../components/ImageUploader';
import { PromptInput } from '../components/PromptInput';
import { ResultsDisplay } from '../components/ResultsDisplay';
import { PixelLoader } from '../components/ui/PixelLoader';
import { GlowCard } from '../components/ui/spotlight-card';
import {
  generateChallenge,
  generateImageFromUserPrompt,
  getScoreAndFeedback,
  generatePromptFromImage,
} from '../services/geminiService';
import { fileToBase64 } from '../utils/fileUtils';
import type { PromptAnalysisItem } from '../types';

type GameState = 'selection' | 'prompting' | 'loading' | 'results';

interface ImageState {
  dataUrl: string;
  base64: string;
  mimeType: string;
}

const GymPage: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('selection');
  const [loadingMessage, setLoadingMessage] = useState('');
  const [error, setError] = useState('');

  const [referenceImage, setReferenceImage] = useState<ImageState | null>(null);
  const [targetPrompt, setTargetPrompt] = useState<string | null>(null);
  const [userPrompt, setUserPrompt] = useState<string>('');
  const [userGeneratedImage, setUserGeneratedImage] = useState<ImageState | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [analysis, setAnalysis] = useState<PromptAnalysisItem[] | null>(null);
  
  // New state for hover preview in selection mode
  const [hoveredLevel, setHoveredLevel] = useState<number | null>(1);

  const handleError = (err: any, message: string) => {
    console.error(err);
    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
    setError(`${message}: ${errorMessage}`);
    setGameState('selection'); // Reset to start on error
  };
  
  const handleDifficultySelect = useCallback(async (difficulty: string) => {
    setGameState('loading');
    setLoadingMessage('Constructing Challenge Scenario...');
    setError('');
    try {
      const { prompt, base64, mimeType } = await generateChallenge(difficulty);
      setTargetPrompt(prompt);
      setReferenceImage({
        base64: base64,
        mimeType,
        dataUrl: `data:${mimeType};base64,${base64}`,
      });
      setGameState('prompting');
    } catch (err) {
      handleError(err, 'Failed to generate challenge');
    }
  }, []);

  const handleImageUpload = useCallback(async (file: File) => {
    setGameState('loading');
    setLoadingMessage('Deconstructing Image Data...');
    setError('');
    try {
      const { base64, mimeType } = await fileToBase64(file);
      const dataUrl = `data:${mimeType};base64,${base64}`;
      const img = new Image();
      img.onload = async () => {
          const promptJson = await generatePromptFromImage(base64, mimeType, img.naturalWidth, img.naturalHeight);
          const parsedPrompt = JSON.parse(promptJson);

          // For uploaded images, the "target prompt" is a descriptive sentence.
          setTargetPrompt(parsedPrompt.description || 'A detailed image.');
          setReferenceImage({ base64, mimeType, dataUrl });
          setGameState('prompting');
      }
      img.onerror = () => { throw new Error("Could not load image to get dimensions.") }
      img.src = dataUrl;
    } catch (err) {
      handleError(err, 'Failed to process uploaded image');
    }
  }, []);

  const handlePromptSubmit = useCallback(async (prompt: string) => {
    if (!referenceImage || !targetPrompt) return;
    setUserPrompt(prompt);
    setGameState('loading');
    setError('');

    try {
      setLoadingMessage('Rendering Your Vision...');
      const userImg = await generateImageFromUserPrompt(prompt);
      const userImgState = { ...userImg, dataUrl: `data:${userImg.mimeType};base64,${userImg.base64}`};
      setUserGeneratedImage(userImgState);

      setLoadingMessage('Analyzing Semantic Accuracy...');
      const results = await getScoreAndFeedback(referenceImage, userImg, targetPrompt, prompt);
      setScore(results.score);
      setAnalysis(results.analysis);
      setGameState('results');
    } catch (err) {
      handleError(err, 'Failed to complete evaluation');
    }
  }, [referenceImage, targetPrompt]);

  const handleReset = () => {
    setGameState('selection');
    setLoadingMessage('');
    setError('');
    setReferenceImage(null);
    setTargetPrompt(null);
    setUserPrompt('');
    setUserGeneratedImage(null);
    setScore(null);
    setAnalysis(null);
  };

  // Preview content based on hovered level
  const getPreviewContent = (level: number) => {
      switch(level) {
          case 1: return { 
              title: "Object Isolation", 
              desc: "Focus on a single subject. The model needs clear bounds. Learn to define 'what' before 'where'.",
              img: "https://images.unsplash.com/photo-1598514930379-674311142562?q=80&w=600&auto=format&fit=crop" 
          };
          case 2: return { 
              title: "Contextual Framing", 
              desc: "The subject exists in space. Balance foreground and background. Define the relationship between the object and the world.",
              img: "https://images.unsplash.com/photo-1478147427282-58a87a120781?q=80&w=600&auto=format&fit=crop" 
          };
          case 3: return { 
              title: "Light & Material", 
              desc: "Light is the brush. Learn to describe caustic reflections, subsurface scattering, and volumetric rays.",
              img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=600&auto=format&fit=crop" 
          };
          case 4: return { 
              title: "Atmosphere & Mood", 
              desc: "Transcending the literal. Use abstract tokens to guide the emotional temperature of the generation.",
              img: "https://images.unsplash.com/photo-1518534079140-6b607629b165?q=80&w=600&auto=format&fit=crop" 
          };
          case 5: return { 
              title: "Complex Synthesis", 
              desc: "The final exam. Multiple subjects, specific style transfer, and intricate composition rules.",
              img: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=600&auto=format&fit=crop" 
          };
          default: return { title: "Select a Module", desc: "Hover over a training level to preview details.", img: "" };
      }
  };

  const preview = hoveredLevel ? getPreviewContent(hoveredLevel) : getPreviewContent(1);

  const renderContent = () => {
    switch (gameState) {
      case 'prompting':
        return (
          <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center animate-fadeIn max-w-7xl mx-auto">
            <div className="flex flex-col space-y-6 order-2 lg:order-1">
                 <div className="space-y-2">
                    <button onClick={handleReset} className="text-sm text-gray-500 hover:text-indigo-400 transition-colors mb-2">&larr; Abort Mission</button>
                    <h2 className="text-3xl font-bold text-white">Reverse Engineer This</h2>
                    <p className="text-gray-400">Analyze the reference image and write a prompt to recreate it as precisely as possible.</p>
                 </div>
                 <PromptInput onSubmit={handlePromptSubmit} isLoading={false} />
            </div>
            
            <div className="flex flex-col items-center space-y-4 order-1 lg:order-2 h-full">
               {referenceImage && (
                 <div className="relative w-full aspect-square rounded-2xl overflow-hidden border-2 border-gray-800 shadow-2xl group">
                    <img src={referenceImage.dataUrl} alt="Reference challenge" className="w-full h-full object-contain bg-black/50"/>
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-xs text-center text-gray-400 font-mono">REFERENCE_TARGET_V1.0</p>
                    </div>
                 </div>
               )}
            </div>
          </div>
        );
      case 'results':
        return (referenceImage && userGeneratedImage && score !== null && analysis && targetPrompt) ? (
          <ResultsDisplay
            referenceImage={referenceImage}
            userGeneratedImage={userGeneratedImage}
            score={score}
            analysis={analysis}
            targetPrompt={targetPrompt}
            userPrompt={userPrompt}
            onReset={handleReset}
          />
        ) : <p>Error displaying results.</p>;
      case 'selection':
      default:
        return (
          <div className="w-full flex flex-col items-center animate-fadeIn max-w-7xl mx-auto">
            {/* Header Narrative */}
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
                <h1 className="text-6xl md:text-7xl font-black text-white tracking-tighter uppercase">The Gym</h1>
                <div className="w-24 h-1 bg-indigo-500 mx-auto rounded-full"></div>
                <p className="text-xl text-gray-400 leading-relaxed">
                    Prompting is not just writing; it's <span className="text-indigo-400 font-semibold">architecting</span>. 
                    In the Gym, we strip away the safety net. You will be given a target—a specific visual outcome defined by precise JSON parameters. 
                    Your goal is to reverse-engineer the logic.
                </p>
            </div>
            
            {error && (
                <div className="w-full max-w-md bg-red-900/20 border border-red-500/50 text-red-200 p-4 rounded-lg flex items-center justify-center gap-2 mb-8">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008h-.008v-.008z" /></svg>
                    {error}
                </div>
            )}
            
            {/* Split View Layout */}
            <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12">
                
                {/* Left Side: The Ladder */}
                <div className="lg:col-span-7 flex flex-col space-y-8">
                     <div className="flex items-center gap-4 text-gray-500 text-sm font-mono uppercase tracking-widest border-b border-gray-800 pb-2 mb-4">
                        <span>Index</span>
                        <span>Module Name</span>
                        <span className="ml-auto">Status</span>
                     </div>
                     <DifficultySelector 
                        onSelect={handleDifficultySelect} 
                        isLoading={false} 
                        onHover={(level) => setHoveredLevel(level)}
                     />

                     <div className="pt-12 border-t border-gray-800 mt-8">
                        <p className="text-sm font-mono text-gray-500 mb-4 uppercase tracking-widest">Or upload your own training data</p>
                        <ImageUploader onImageUpload={handleImageUpload} isLoading={false} />
                     </div>
                </div>

                {/* Right Side: Mission Briefing (Sticky) */}
                <div className="lg:col-span-5 relative hidden lg:block">
                    <div className="sticky top-32">
                        <GlowCard glowColor="blue" customSize className="w-full bg-gray-900/80 border border-gray-700/50 rounded-3xl overflow-hidden shadow-2xl">
                             <div className="relative h-64 w-full overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10" />
                                <img 
                                    src={preview.img} 
                                    alt="Module Preview" 
                                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105 opacity-80"
                                />
                                <div className="absolute bottom-4 left-6 z-20">
                                    <span className="inline-block px-2 py-1 bg-indigo-500 text-white text-[10px] font-bold uppercase tracking-widest rounded mb-2">
                                        Module Preview
                                    </span>
                                    <h3 className="text-3xl font-black text-white leading-none">{preview.title}</h3>
                                </div>
                             </div>
                             <div className="p-8">
                                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                                    {preview.desc}
                                </p>
                                <div className="flex flex-col gap-3">
                                    <div className="flex justify-between text-sm text-gray-500 border-b border-gray-800 pb-2">
                                        <span>Est. Duration</span>
                                        <span className="text-gray-300">15 - 20 mins</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-500 border-b border-gray-800 pb-2">
                                        <span>Prerequisites</span>
                                        <span className="text-gray-300">None</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-500 pb-2">
                                        <span>XP Reward</span>
                                        <span className="text-indigo-400 font-bold">500 XP</span>
                                    </div>
                                </div>
                             </div>
                        </GlowCard>
                        
                        {/* Decorative elements behind */}
                        <div className="absolute -top-4 -right-4 w-full h-full border border-gray-800 rounded-3xl -z-10 bg-gray-950/50"></div>
                        <div className="absolute -top-8 -right-8 w-full h-full border border-gray-800/50 rounded-3xl -z-20 bg-gray-950/30"></div>
                    </div>
                </div>

            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-full h-full relative">
      {gameState === 'loading' && <PixelLoader message={loadingMessage} />}
      <div className="container mx-auto px-4 py-12 min-h-[calc(100vh-8rem)] flex items-center justify-center">
        {renderContent()}
      </div>
       <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default GymPage;