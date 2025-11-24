import React, { useState, useCallback } from 'react';
import { ImageUploader } from '../components/ImageUploader';
import { ImageDisplay } from '../components/ImageDisplay';
import { PromptDisplay } from '../components/PromptDisplay';
import { generatePromptFromImage } from '../services/geminiService';
import { fileToBase64 } from '../utils/fileUtils';
import type { SelectedFile } from '../types';
import { PromptModal } from '../components/PromptModal';
import { GlowCard } from '../components/ui/spotlight-card';

const MirrorPage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<SelectedFile | null>(null);
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [isPromptModalOpen, setIsPromptModalOpen] = useState<boolean>(false);

  const handleImageUpload = useCallback(async (file: File) => {
    setIsLoading(true);
    setError('');
    setGeneratedPrompt('');

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
        const prompt = await generatePromptFromImage(base64, mimeType, img.naturalWidth, img.naturalHeight);
        const parsedPrompt = JSON.parse(prompt);
        setGeneratedPrompt(JSON.stringify(parsedPrompt, null, 2));
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred. Check the console for details.');
      } finally {
        setIsLoading(false);
      }
    };
    img.onerror = () => {
        setError("Failed to load image details. Please try another file.");
        setIsLoading(false);
        URL.revokeObjectURL(dataUrl);
    };
    img.src = dataUrl;
  }, []);
  
  const resetState = () => {
    if (selectedFile?.dataUrl.startsWith('blob:')) {
      URL.revokeObjectURL(selectedFile.dataUrl);
    }
    setSelectedFile(null);
    setGeneratedPrompt('');
    setError('');
    setIsLoading(false);
    setIsPromptModalOpen(false);
  };

  return (
    <div className="w-full h-full flex flex-col flex-grow">
      <div className="container mx-auto px-4 flex flex-col flex-1 py-8">
        <header className="text-center mb-12 flex-shrink-0 relative">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-100">
            Mirror Mode
          </h1>
          <p className="mt-3 text-lg text-gray-400 max-w-2xl mx-auto">
            Upload an image and let AI craft the perfect, structured prompt to recreate it.
          </p>
        </header>

        <main className="w-full flex-1 flex flex-col min-h-[500px]">
          {!selectedFile ? (
            <div className="flex-1 flex items-center justify-center">
              <ImageUploader onImageUpload={handleImageUpload} isLoading={isLoading} />
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full flex-1">
              <GlowCard glowColor="purple" customSize className="w-full h-full p-0 overflow-hidden bg-gray-900/50">
                  <ImageDisplay file={selectedFile} isLoading={isLoading} onReset={resetState} />
              </GlowCard>
              <GlowCard glowColor="blue" customSize className="w-full h-full p-0 overflow-hidden bg-gray-900/50">
                <PromptDisplay
                  prompt={generatedPrompt}
                  isLoading={isLoading}
                  error={error}
                  onViewFull={() => setIsPromptModalOpen(true)}
                />
              </GlowCard>
            </div>
          )}
        </main>
        {isPromptModalOpen && (
          <PromptModal
            prompt={generatedPrompt}
            onClose={() => setIsPromptModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default MirrorPage;
