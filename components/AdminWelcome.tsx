
import React, { useState, useEffect } from 'react';
import { ShieldCheck, Loader2, Cpu } from 'lucide-react';

const AdminWelcome: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Initializing Foundry...');

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => Math.min(prev + (Math.random() * 15), 100));
    }, 200);

    const timeouts = [
      setTimeout(() => setStatus('Decrypting Neural Keys...'), 600),
      setTimeout(() => setStatus('Synchronizing Logic Nodes...'), 1400),
      setTimeout(() => setStatus('Access Granted. Welcome Architect.'), 2200),
    ];

    return () => {
      clearInterval(interval);
      timeouts.forEach(t => clearTimeout(t));
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center p-8 overflow-hidden">
      {/* Background Grid Effect */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-sm w-full animate-in fade-in zoom-in-95 duration-700">
        <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-[2rem] flex items-center justify-center mb-12 shadow-2xl shadow-white/5">
          <ShieldCheck size={48} className="text-white animate-pulse" />
        </div>

        <h2 className="text-white text-xs font-black tracking-[0.5em] uppercase mb-4 opacity-50">Axis Security Protocol</h2>
        <h1 className="text-white text-3xl font-black tracking-tighter uppercase mb-12 text-center">System Access</h1>

        <div className="w-full space-y-6">
          <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-white/40 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
              <Loader2 size={12} className="animate-spin" /> {status}
            </span>
            <span className="text-white font-mono text-[10px] font-bold">{Math.floor(progress)}%</span>
          </div>
        </div>

        <div className="absolute bottom-12 flex items-center gap-3">
          <Cpu size={16} className="text-white/20" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Authorized Node: 0x82A1</span>
        </div>
      </div>
    </div>
  );
};

export default AdminWelcome;
