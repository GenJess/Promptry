
import React, { useEffect, useState } from 'react';

export const PixelLoader: React.FC<{ message?: string }> = ({ message = "Constructing..." }) => {
  const [pixels, setPixels] = useState<number[]>([]);

  useEffect(() => {
    // create a grid of 64 pixels (8x8)
    setPixels(Array.from({ length: 64 }, (_, i) => i));
  }, []);

  return (
    <div className="absolute inset-0 bg-gray-950/90 flex flex-col items-center justify-center z-50 rounded-xl overflow-hidden backdrop-blur-sm border border-gray-800">
      <div className="relative w-32 h-32 grid grid-cols-8 gap-1 mb-8">
        {pixels.map((i) => (
          <div
            key={i}
            className="bg-indigo-500 rounded-sm animate-pulse"
            style={{
              opacity: Math.random() * 0.5 + 0.1,
              animationDelay: `${Math.random() * 1.5}s`,
              animationDuration: `${Math.random() * 1 + 0.5}s`
            }}
          />
        ))}
        {/* Glowing center core */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
             <div className="w-16 h-16 bg-indigo-500/20 blur-xl rounded-full animate-pulse"></div>
        </div>
      </div>
      
      <div className="space-y-2 text-center">
        <h3 className="text-2xl font-bold text-white tracking-widest uppercase animate-pulse">
            {message}
        </h3>
        <p className="text-xs text-indigo-400 font-mono">
            Rendering Neural Pathways...
        </p>
      </div>
    </div>
  );
};
