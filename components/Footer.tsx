
import React from 'react';
import { Facebook, Instagram, Linkedin, Twitter, Youtube, Send, ShieldCheck, Terminal, AlertCircle } from 'lucide-react';
import { supabase } from '../services/supabase';

interface FooterProps {
  onAdminClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onAdminClick }) => {
  const isSupabaseConfigured = !!supabase;

  return (
    <footer className="bg-zinc-50 pt-32 pb-12 px-6 md:px-12 border-t border-zinc-200">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-32">
          <div className="lg:col-span-1">
            <h4 className="text-2xl font-black tracking-tighter mb-8 uppercase">Stay Sync'd</h4>
            <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest mb-10 leading-relaxed max-w-xs">
              Subscribe for architecture updates and system restocks.
            </p>
            <div className="relative group max-w-sm">
              <input 
                type="email" 
                placeholder="Systems Email"
                className="w-full bg-white border border-zinc-200 py-6 px-8 rounded-3xl text-sm outline-none focus:ring-2 focus:ring-black transition-all"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-black text-white p-4 rounded-2xl hover:scale-110 transition-transform">
                <Send size={20} />
              </button>
            </div>
          </div>

          <div className="space-y-8">
            <h4 className="text-[10px] font-black tracking-[0.4em] uppercase text-zinc-400">Systems</h4>
            <ul className="flex flex-col gap-6 text-xs font-black uppercase tracking-widest text-zinc-800">
              <li><a href="#" className="hover:text-blue-600 transition-colors">7nm Processors</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Quantum Sensors</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">FPGA Logic</a></li>
            </ul>
          </div>

          <div className="space-y-8">
            <h4 className="text-[10px] font-black tracking-[0.4em] uppercase text-zinc-400">Foundry</h4>
            <ul className="flex flex-col gap-6 text-xs font-black uppercase tracking-widest text-zinc-800">
              <li><a href="#" className="hover:text-blue-600 transition-colors">Algerian Logistics</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Tech Documentation</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Service Status</a></li>
            </ul>
          </div>

          <div className="flex flex-col lg:items-end space-y-12">
            <div className="flex gap-4">
              {[Instagram, Facebook, Twitter, Linkedin].map((Icon, idx) => (
                <a key={idx} href="#" className="p-5 bg-white rounded-3xl hover:bg-black hover:text-white transition-all border border-zinc-200 shadow-sm">
                  <Icon size={20} />
                </a>
              ))}
            </div>
            {!isSupabaseConfigured && (
              <div className="flex items-center gap-2 bg-orange-50 text-orange-600 px-4 py-2 rounded-xl border border-orange-100 animate-pulse">
                <AlertCircle size={14} />
                <span className="text-[9px] font-black uppercase tracking-widest">Mock Mode: Supabase Offline</span>
              </div>
            )}
            <div className="text-right">
               <div className={`w-12 h-12 bg-black text-white flex items-center justify-center rounded-xl ml-auto mb-6`}>
                 <span className="font-bold text-2xl uppercase">A</span>
               </div>
               <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">AXIS SILICON SYSTEMS</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-zinc-200 gap-8">
          <div className="flex items-center gap-10">
            <p className="text-[10px] text-zinc-400 font-black uppercase tracking-widest">
              © 2025 AXIS FOUNDRY. ALL SYSTEMS GO.
            </p>
            <div className="flex items-center gap-4">
               <button 
                onClick={onAdminClick}
                className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-400 hover:text-black transition-colors flex items-center gap-2"
              >
                <Terminal size={12} />
                System Access
              </button>
            </div>
          </div>
          <div className="flex gap-10 text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400">
            <a href="#" className="hover:text-black transition-colors">DZ Logistics</a>
            <a href="#" className="hover:text-black transition-colors">System Privacy</a>
            <a href="#" className="hover:text-black transition-colors">Imprint</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
