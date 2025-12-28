
import React from 'react';
import { ArrowRight } from 'lucide-react';

const StorySection: React.FC = () => {
  return (
    <section className="bg-[#0a0a0f] py-32 px-4 md:px-12 text-white">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="relative">
          <div className="aspect-[4/5] overflow-hidden rounded-md">
            <img 
              src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200" 
              alt="PCB Design" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            />
          </div>
          <div className="absolute -bottom-10 -right-10 bg-white p-8 rounded-md hidden xl:block shadow-2xl">
            <span className="text-black text-6xl font-bold tracking-tighter">7nm</span>
            <p className="text-gray-500 text-sm mt-2 font-medium uppercase tracking-widest text-center">Process Node</p>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <h2 className="text-xs font-bold tracking-[0.4em] uppercase mb-8 text-blue-400">Our Foundry</h2>
          <h3 className="text-5xl md:text-7xl font-bold tracking-tighter mb-10 leading-[1.1]">
            Intelligence <br />In Silicon.
          </h3>
          <div className="space-y-6 text-lg text-white/70 font-light leading-relaxed max-w-xl">
            <p>
              Axis Silicon was born from the need for hardware that keeps pace with software. In an era of AI and edge computing, standard components are no longer enough.
            </p>
            <p>
              We engineer every trace, every via, and every semiconductor with Swiss-inspired precision. From aerospace-grade sensors to neural processors, we build the foundations for your greatest innovations.
            </p>
          </div>
          
          <button className="mt-12 flex items-center gap-4 text-sm font-bold uppercase tracking-[0.2em] group border-b border-white/20 pb-4 w-fit hover:border-white transition-all">
            The Silicon Manifesto
            <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
