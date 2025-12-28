
import React from 'react';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onShopNow: () => void;
}

const Hero: React.FC<HeroProps> = ({ onShopNow }) => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#0a0a0f]">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1635333526646-89ec44309642?auto=format&fit=crop&q=80&w=2000" 
          alt="Silicon Wafer" 
          className="w-full h-full object-cover opacity-40 grayscale scale-105 animate-[pulse_15s_infinite]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent opacity-90" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <h2 className="text-white text-xs md:text-sm font-bold tracking-[0.4em] uppercase mb-6 opacity-80 animate-in fade-in slide-in-from-top-4 duration-700">
          The Silicon Standard
        </h2>
        <h1 className="text-white text-5xl md:text-8xl font-bold tracking-tighter mb-8 leading-[1.1] animate-in fade-in slide-in-from-bottom-6 duration-1000">
          AXIS SYSTEMS
        </h1>
        <p className="text-white/70 text-lg md:text-2xl font-light mb-12 max-w-2xl mx-auto leading-relaxed animate-in fade-in duration-1000 delay-300">
          High-frequency components. Zero-latency architecture. Engineered for the next generation of neural computing.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in zoom-in duration-700 delay-500">
          <button 
            onClick={onShopNow}
            className="bg-white text-black px-10 py-5 rounded-full font-semibold flex items-center justify-center gap-3 hover:bg-gray-200 transition-all transform active:scale-95 group"
          >
            Explore the Catalog
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="border border-white/30 text-white px-10 py-5 rounded-full font-semibold hover:bg-white/10 transition-all">
            Silicon Roadmap
          </button>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 animate-bounce">
        <div className="w-px h-16 bg-gradient-to-b from-white/0 to-white" />
      </div>
    </section>
  );
};

export default Hero;
