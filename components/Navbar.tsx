
import React, { useState, useEffect } from 'react';
import { ShoppingBag, Store, Cpu } from 'lucide-react';

interface NavbarProps {
  onOpenToolFinder: () => void;
  onNavigate: (view: 'home' | 'shop' | 'admin-login') => void;
  onOpenCart: () => void;
  cartCount: number;
  forceDark?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenToolFinder, onNavigate, onOpenCart, cartCount, forceDark = false }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // isLightModeUI = Black text on white background (used on white pages or when scrolled)
  // isDarkModeUI = White text on transparent background (used on hero/dark pages)
  const isLightModeUI = isScrolled || forceDark;

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[150] transition-all duration-500 border-b ${
        isLightModeUI 
          ? 'bg-white/90 backdrop-blur-2xl py-4 border-zinc-100 shadow-sm' 
          : 'bg-transparent py-8 border-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo Section */}
        <div 
          className={`flex items-center gap-3 group cursor-pointer transition-colors duration-300 ${
            isLightModeUI ? 'text-black' : 'text-white'
          }`} 
          onClick={() => onNavigate('home')}
        >
          <div className={`w-10 h-10 flex items-center justify-center rounded-2xl transition-all duration-500 group-hover:rotate-[15deg] shadow-lg ${
            isLightModeUI ? 'bg-black text-white' : 'bg-white text-black'
          }`}>
            <span className="font-black text-xl">A</span>
          </div>
          <span className="font-black text-2xl tracking-tighter uppercase">Axis</span>
        </div>

        {/* Center Links */}
        <div className={`hidden md:flex items-center gap-10 text-[11px] font-black tracking-[0.3em] uppercase transition-all duration-300 ${
          isLightModeUI ? 'text-zinc-900' : 'text-white'
        }`}>
          <button 
            onClick={() => onNavigate('shop')} 
            className="flex items-center gap-3 hover:opacity-50 transition-all active:scale-95 group"
          >
            <Store size={15} className={`transition-transform group-hover:-translate-y-0.5 ${isLightModeUI ? 'text-zinc-400' : 'text-white/50'}`} /> 
            Shop Catalog
          </button>
          
          <button 
            onClick={onOpenToolFinder}
            className={`flex items-center gap-3 px-8 py-3.5 rounded-full transition-all duration-300 border font-black shadow-xl active:scale-95 ${
              isLightModeUI 
                ? 'bg-black text-white border-black hover:bg-zinc-800 shadow-black/10' 
                : 'bg-white text-black border-white hover:bg-zinc-100 shadow-white/10'
            }`}
          >
            <Cpu size={16} /> 
            Systems Architect
          </button>
        </div>

        {/* Action Icons */}
        <div className={`flex items-center gap-8 ${isLightModeUI ? 'text-black' : 'text-white'}`}>
          <button 
            onClick={onOpenCart} 
            className="group relative p-2.5 transition-all active:scale-90 hover:bg-zinc-100/10 rounded-full"
          >
            <ShoppingBag size={28} className="group-hover:scale-110 transition-transform" />
            {cartCount > 0 && (
              <span className={`absolute -top-0.5 -right-0.5 text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 transform scale-110 animate-in zoom-in shadow-md ${
                isLightModeUI 
                  ? 'bg-blue-600 text-white border-white' 
                  : 'bg-white text-black border-zinc-900'
              }`}>
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
