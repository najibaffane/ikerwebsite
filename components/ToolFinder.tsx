
import React, { useState } from 'react';
import { X, Send, Loader2, Cpu, Zap } from 'lucide-react';
import { getProjectAdvice } from '../services/geminiService';

interface ToolFinderProps {
  onClose: () => void;
}

const ToolFinder: React.FC<ToolFinderProps> = ({ onClose }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    summary: string;
    recommendedTools: string[];
    proTips: string[];
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    setLoading(true);
    try {
      const data = await getProjectAdvice(input);
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-black p-6 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <Cpu size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight">Axis Systems Architect</h2>
              <p className="text-white/60 text-xs uppercase tracking-[0.2em]">Engineering Advisory</p>
            </div>
          </div>
          <button onClick={onClose} className="hover:rotate-90 transition-transform">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 max-h-[70vh] overflow-y-auto no-scrollbar">
          {!result && !loading && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
                <Zap size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Design your next breakthrough</h3>
              <p className="text-gray-500 font-light mb-8 max-w-md mx-auto">
                Describe your electronics project or industrial challenge. Our AI architect will specify the components and methods needed for success.
              </p>
            </div>
          )}

          {loading && (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 size={48} className="animate-spin text-black mb-4" />
              <p className="text-sm font-medium tracking-widest uppercase animate-pulse">Calculating Architecture...</p>
            </div>
          )}

          {result && !loading && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div>
                <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 mb-2">Systems Overview</h4>
                <p className="text-lg font-light leading-relaxed">{result.summary}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 mb-4">Core Components</h4>
                  <ul className="space-y-3">
                    {result.recommendedTools.map((tool, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm font-medium">
                        <div className="w-1.5 h-1.5 bg-black rounded-full" />
                        {tool}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 mb-4">Engineering Notes</h4>
                  <ul className="space-y-3">
                    {result.proTips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm italic text-gray-600">
                        <span className="text-black font-bold">#</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <button 
                onClick={() => setResult(null)}
                className="w-full py-4 text-xs font-bold uppercase tracking-widest border border-gray-200 hover:bg-gray-50 transition-colors rounded-xl"
              >
                New Architecture Session
              </button>
            </div>
          )}
        </div>

        {/* Input */}
        {!result && !loading && (
          <form onSubmit={handleSubmit} className="p-6 border-t border-gray-100 flex gap-4">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g. Low-power weather monitoring station with LoRaWAN..."
              className="flex-1 bg-gray-50 py-4 px-6 rounded-xl text-sm outline-none focus:ring-2 focus:ring-black transition-all"
            />
            <button 
              type="submit"
              className="bg-black text-white p-4 rounded-xl hover:scale-105 transition-transform active:scale-95"
            >
              <Send size={20} />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ToolFinder;
