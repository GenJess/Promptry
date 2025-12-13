
import React from 'react';
import { GlowCard } from '../components/ui/spotlight-card';

export const SettingsPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl animate-fadeIn">
      <h1 className="text-4xl font-bold text-gray-100 mb-8">Settings</h1>

      <div className="space-y-8">
        {/* Profile Section */}
        <section>
             <h2 className="text-xl font-semibold text-gray-300 mb-4 border-b border-gray-800 pb-2">Profile</h2>
             <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                    JS
                </div>
                <div>
                    <p className="text-lg font-bold text-white">John Smith</p>
                    <p className="text-gray-500">Free Plan</p>
                    <button className="text-indigo-400 text-sm hover:underline mt-1">Upgrade to Pro</button>
                </div>
             </div>
        </section>

        {/* API Keys Section */}
        <section>
            <h2 className="text-xl font-semibold text-gray-300 mb-4 border-b border-gray-800 pb-2">API Configuration</h2>
            <GlowCard glowColor="orange" customSize className="bg-gray-900/30 p-6 border border-gray-800">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Google Gemini API Key</label>
                        <div className="flex gap-2">
                            <input 
                                type="password" 
                                value="************************" 
                                disabled
                                className="flex-grow bg-gray-950 border border-gray-800 rounded-lg px-4 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-not-allowed opacity-60"
                            />
                            <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors">
                                Edit
                            </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                            Used for prompt analysis and generation. We encrypt this key at rest.
                        </p>
                    </div>
                </div>
            </GlowCard>
        </section>

        {/* Preferences */}
        <section>
             <h2 className="text-xl font-semibold text-gray-300 mb-4 border-b border-gray-800 pb-2">Preferences</h2>
             <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-900/30 rounded-lg border border-gray-800">
                    <div>
                        <p className="text-gray-200 font-medium">Reduced Motion</p>
                        <p className="text-sm text-gray-500">Disable hyperspeed background effects</p>
                    </div>
                    <div className="w-12 h-6 bg-gray-800 rounded-full relative cursor-pointer">
                        <div className="absolute left-1 top-1 w-4 h-4 bg-gray-500 rounded-full transition-all"></div>
                    </div>
                </div>
                 <div className="flex items-center justify-between p-4 bg-gray-900/30 rounded-lg border border-gray-800">
                    <div>
                        <p className="text-gray-200 font-medium">Developer Mode</p>
                        <p className="text-sm text-gray-500">Show raw JSON output by default</p>
                    </div>
                    <div className="w-12 h-6 bg-indigo-900 rounded-full relative cursor-pointer">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-indigo-400 rounded-full transition-all shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
                    </div>
                </div>
             </div>
        </section>
      </div>
    </div>
  );
};
