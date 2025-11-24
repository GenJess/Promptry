import React from 'react';
import { GlowCard } from '../components/ui/spotlight-card';
import type { Page } from '../App';
import Hyperspeed from '../components/ui/Hyperspeed';
import { hyperspeedPresets } from '../components/ui/hyperspeedPresets';
import { SparklesIcon } from '../components/icons/SparklesIcon';
import { TrophyIcon } from '../components/icons/TrophyIcon';

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

const PhilosophyItem = ({ title, desc, delay }: { title: string, desc: string, delay: string }) => (
  <div className={`flex flex-col space-y-3 p-8 rounded-2xl bg-gray-900/40 border border-gray-800 backdrop-blur-sm hover:bg-gray-900/60 transition-all hover:-translate-y-1 duration-300 animate-fadeIn ${delay}`}>
    <h3 className="text-xl font-bold text-gray-100">{title}</h3>
    <p className="text-gray-400 leading-relaxed text-base">{desc}</p>
  </div>
);

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="w-full flex flex-col">
      {/* Hero Section */}
      <div className="relative h-[85vh] w-full bg-black flex flex-col items-center justify-center overflow-hidden border-b border-gray-800">
        <div className="absolute inset-0 -z-10 opacity-60">
          <Hyperspeed effectOptions={hyperspeedPresets.four} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent pointer-events-none" />
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium mb-8 backdrop-blur-md animate-fadeIn">
                <SparklesIcon className="w-4 h-4" />
                <span>The Rosetta Stone for Generative AI</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-8 leading-[1.1] animate-fadeIn delay-100">
                Speak the <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 animate-pulse">Language of Light</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed animate-fadeIn delay-200">
                You have a vision. AI has a language. Promptry bridges the gap, training your brain to translate abstract ideas into the structured JSON blueprints that models crave.
            </p>
            
            <button 
                onClick={() => {
                  const el = document.getElementById('training-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="animate-fadeIn delay-300 animate-bounce"
            >
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gray-500 hover:text-white transition-colors">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
            </button>
        </div>
      </div>

      {/* Choose Your Training Section */}
      <section id="training-section" className="py-24 bg-gray-950 relative overflow-hidden">
         {/* Dashed border annotation simulation */}
         <div className="absolute inset-4 border-2 border-dashed border-gray-800/50 rounded-[3rem] pointer-events-none hidden md:block"></div>

         <div className="container mx-auto px-6 relative z-10 max-w-7xl">
            <div className="text-center max-w-3xl mx-auto mb-20">
                <h2 className="text-5xl font-black text-white mb-6">Choose Your Training</h2>
                <p className="text-gray-400 text-lg">Two distinct modes designed to elevate your prompting capabilities from novice to expert.</p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8 w-full">
                {/* Mirror Mode Card */}
                <div 
                  onClick={() => onNavigate('mirror')} 
                  className="flex-1 cursor-pointer group active:scale-[0.98] transition-transform duration-200"
                >
                    <GlowCard 
                      glowColor="blue" 
                      customSize 
                      className="h-full p-12 flex flex-col items-center text-center bg-gray-900/60 hover:bg-gray-900/80 transition-all border border-cyan-500/20 hover:border-cyan-400/50 shadow-2xl rounded-3xl group-hover:shadow-[0_0_40px_rgba(34,211,238,0.15)]"
                    >
                        <div className="w-24 h-24 bg-cyan-950/30 text-cyan-400 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_30px_rgba(34,211,238,0.2)] border border-cyan-500/30">
                            <SparklesIcon className="w-10 h-10" />
                        </div>
                        <h3 className="text-4xl font-bold text-white mb-6">Mirror Mode</h3>
                        <p className="text-gray-400 mb-12 text-lg leading-relaxed max-w-sm">
                            Upload any image and let our reverse-engineering engine generate the perfect, mathematically precise JSON prompt to recreate it.
                        </p>
                        <div className="mt-auto">
                           <span className="inline-flex items-center text-cyan-950 bg-cyan-400 px-8 py-3 rounded-xl font-bold text-lg group-hover:bg-cyan-300 transition-colors shadow-[0_0_20px_rgba(34,211,238,0.4)]">
                                Analyze Image &rarr;
                            </span>
                        </div>
                    </GlowCard>
                </div>
                
                {/* Gym Mode Card */}
                <div 
                  onClick={() => onNavigate('gym')} 
                  className="flex-1 cursor-pointer group active:scale-[0.98] transition-transform duration-200"
                >
                    <GlowCard 
                      glowColor="purple" 
                      customSize 
                      className="h-full p-12 flex flex-col items-center text-center bg-gray-900/60 hover:bg-gray-900/80 transition-all border border-purple-500/20 hover:border-purple-400/50 shadow-2xl rounded-3xl group-hover:shadow-[0_0_40px_rgba(168,85,247,0.15)]"
                    >
                        <div className="w-24 h-24 bg-purple-950/30 text-purple-400 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_30px_rgba(168,85,247,0.2)] border border-purple-500/30">
                            <TrophyIcon className="w-10 h-10" />
                        </div>
                        <h3 className="text-4xl font-bold text-white mb-6">The Gym</h3>
                        <p className="text-gray-400 mb-12 text-lg leading-relaxed max-w-sm">
                            Test your skills. We give you a difficulty level, you generate the image. Then we score your accuracy and provide semantic feedback.
                        </p>
                        <div className="mt-auto">
                             <span className="inline-flex items-center text-purple-100 bg-purple-900/50 border border-purple-500/50 px-8 py-3 rounded-xl font-bold text-lg group-hover:bg-purple-600 group-hover:text-white transition-all shadow-[0_0_20px_rgba(168,85,247,0.1)]">
                                Start Challenge &rarr;
                            </span>
                        </div>
                    </GlowCard>
                </div>
            </div>
         </div>
      </section>

      {/* The Philosophy Section */}
      <section className="py-32 bg-gray-950 relative">
        <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div className="space-y-8">
                     <div className="inline-block px-4 py-1 rounded-full bg-gray-900 border border-gray-800 text-gray-400 text-sm font-semibold tracking-wider uppercase mb-2">
                        Philosophy
                     </div>
                     <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
                        Don't just prompt.<br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-600">Train your vision.</span>
                     </h2>
                     <p className="text-lg text-gray-400 leading-relaxed">
                        The gap between your imagination and AI's output isn't a lack of ideas—it's a translation error. Natural language is ambiguous. "A scary dog" means something different to everyone.
                     </p>
                     <p className="text-lg text-gray-400 leading-relaxed">
                        Promptry teaches you to think in <span className="text-indigo-400 font-semibold">JSON</span>—the language of structure. By breaking images down into specific keys like lighting, texture, and composition, you gain total control over the generated result.
                     </p>
                     <p className="text-lg text-indigo-400 font-bold pt-4 border-l-4 border-indigo-500 pl-4">
                        Mastering this is like learning a second language for the creative age.
                     </p>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    <PhilosophyItem 
                        title="The Blueprint Method"
                        desc="Stop guessing words. Learn to build precise blueprints for your ideas using structured data that eliminates hallucination and ensures consistency."
                        delay="delay-0"
                    />
                    <PhilosophyItem 
                        title="Visual Deconstruction"
                        desc="The Gym trains your 'muscle memory' for details. You'll stop seeing 'a forest' and start seeing 'dappled light, 35mm focal length, mossy textures'."
                        delay="delay-100"
                    />
                    <PhilosophyItem 
                        title="Semantic Precision"
                        desc="Feedback loops expand your vocabulary. Learn the exact terms for specific lighting conditions, artistic styles, and camera angles that models recognize."
                        delay="delay-200"
                    />
                </div>
            </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
