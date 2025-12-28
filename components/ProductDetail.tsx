
import React, { useState } from 'react';
import { Product, Category } from '../types';
import { ArrowLeft, ShoppingCart, ShieldCheck, Zap, Cpu, Terminal, Info, ChevronRight } from 'lucide-react';

interface ProductDetailProps {
  product: Product;
  categories: Category[];
  onBack: () => void;
  onAddToCart: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, categories, onBack, onAddToCart }) => {
  const [activeImage, setActiveImage] = useState(0);
  const hasDiscount = product.discount_percentage > 0;
  const finalPrice = product.price * (1 - (product.discount_percentage / 100));
  const displayCategory = categories.find(c => c.id === product.category)?.title || product.category;

  // Helper to parse "Key: Value" strings from the details field
  const parseSpecs = (detailsString: string) => {
    if (!detailsString) return [];
    return detailsString.split('\n').filter(line => line.includes(':')).map(line => {
      const [key, ...valueParts] = line.split(':');
      return { key: key.trim(), value: valueParts.join(':').trim() };
    });
  };

  const specs = parseSpecs(product.details);
  const remainingDetails = product.details?.split('\n').filter(line => !line.includes(':')).join('\n');

  return (
    <div className="pt-32 pb-32 px-6 md:px-12 bg-white min-h-screen selection:bg-black selection:text-white">
      <div className="max-w-[1400px] mx-auto">
        <button onClick={onBack} className="group flex items-center gap-3 text-zinc-400 hover:text-black mb-16 transition-all uppercase text-[10px] font-black tracking-[0.4em]">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
          Back to Foundry
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24">
          {/* LEFT COLUMN: Visuals */}
          <div className="lg:col-span-6 xl:col-span-7 space-y-8">
            <div className="rounded-[4rem] overflow-hidden bg-zinc-50 border border-zinc-100 p-12 flex items-center justify-center shadow-[inset_0_4px_30px_rgba(0,0,0,0.03)] aspect-square lg:aspect-auto lg:h-[600px] relative group">
              <img 
                key={activeImage}
                src={product.images[activeImage]} 
                alt={product.name} 
                className="w-full h-full object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.1)] animate-in zoom-in-95 fade-in duration-1000 group-hover:scale-105 transition-transform duration-700" 
              />
              
              {hasDiscount && (
                <div className="absolute top-12 left-12 bg-red-600 text-white text-xs font-black px-6 py-3 rounded-full uppercase tracking-[0.2em] shadow-xl">
                  Protocol Adjustment: -{product.discount_percentage}%
                </div>
              )}
            </div>
            
            {product.images.length > 1 && (
              <div className="flex gap-6 overflow-x-auto no-scrollbar pb-2">
                {product.images.filter(img => img).map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`relative flex-shrink-0 w-24 h-24 rounded-3xl overflow-hidden border-2 transition-all duration-500 ${activeImage === idx ? 'border-black shadow-2xl scale-105' : 'border-zinc-100 opacity-40 hover:opacity-100'}`}
                  >
                    <img src={img} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Info & Specs */}
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col">
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-8">
                <span className="bg-blue-600/10 text-blue-600 font-black text-[11px] uppercase tracking-[0.4em] px-4 py-1.5 rounded-lg border border-blue-600/20">{displayCategory}</span>
                <span className="text-zinc-300 font-mono text-[11px] uppercase tracking-[0.2em]">SKU: {product.id}</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl xl:text-6xl font-black tracking-tight mb-8 uppercase leading-tight text-black italic break-words">
                {product.name}
              </h1>
              
              <div className="flex items-end gap-6 mb-12 border-y border-zinc-100 py-10">
                <div className="flex flex-col">
                  {hasDiscount && (
                    <span className="text-xl text-zinc-300 line-through font-light mb-1">{product.price.toLocaleString()} DZD</span>
                  )}
                  <span className="text-5xl font-black text-blue-600 tracking-tighter leading-none">{finalPrice.toLocaleString()} <span className="text-xl ml-1">DZD</span></span>
                </div>
                <div className="h-12 w-px bg-zinc-100 mx-2 hidden sm:block" />
                <div className="hidden sm:flex flex-col text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
                  <span>Available Units</span>
                  <span className={`text-sm mt-1 ${product.stock > 0 ? 'text-black' : 'text-red-500'}`}>
                    {product.stock > 0 ? `${product.stock} In Foundry` : 'Depleted'}
                  </span>
                </div>
              </div>
              
              <p className="text-zinc-500 text-lg font-light leading-relaxed mb-12">{product.description}</p>
            </div>

            {/* Structured Technical Specs */}
            <div className="space-y-12 mb-16">
              <div>
                <h3 className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.5em] text-zinc-900 mb-6 italic">
                  <Terminal size={18} className="text-blue-600" /> Technical Matrix
                </h3>
                
                <div className="grid grid-cols-1 gap-px bg-zinc-100 border border-zinc-100 rounded-[2rem] overflow-hidden shadow-sm">
                  {specs.length > 0 ? (
                    specs.map((spec, i) => (
                      <div key={i} className="bg-white px-8 py-5 flex flex-col sm:flex-row justify-between sm:items-center gap-2 hover:bg-zinc-50/50 transition-colors">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">{spec.key}</span>
                        <span className="text-xs font-black text-black font-mono tracking-tight">{spec.value}</span>
                      </div>
                    ))
                  ) : (
                    <div className="bg-white p-12 text-center">
                      <p className="text-xs font-black uppercase tracking-widest text-zinc-300">Detailed specs pending deployment</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Extra info/Description that wasn't Key:Value */}
              {remainingDetails && remainingDetails.trim().length > 0 && (
                <div className="bg-zinc-900 rounded-[2.5rem] p-8 text-zinc-400">
                  <h4 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] mb-4 text-white">
                    <Info size={14} /> Architecture Notes
                  </h4>
                  <p className="font-mono text-[10px] leading-relaxed whitespace-pre-wrap opacity-80">
                    {remainingDetails.trim()}
                  </p>
                </div>
              )}
            </div>

            {/* Core Features Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
              {(product.features || []).filter(f => f).map((f, i) => (
                <div key={i} className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-zinc-100 shadow-sm group hover:border-black transition-all">
                  <div className="w-10 h-10 bg-zinc-50 rounded-xl flex items-center justify-center text-zinc-900 group-hover:bg-black group-hover:text-white transition-all shadow-sm">
                    {i % 3 === 0 ? <Zap size={18} /> : i % 3 === 1 ? <ShieldCheck size={18} /> : <Cpu size={18} />}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-700">{f}</span>
                </div>
              ))}
            </div>

            {/* Buy Interface */}
            <div className="sticky bottom-6 lg:relative lg:bottom-0 space-y-6">
              <div className="flex flex-col sm:flex-row gap-3 p-2 bg-white/80 backdrop-blur-xl border border-zinc-100 rounded-[2.5rem] shadow-2xl shadow-black/5">
                <button 
                  onClick={onAddToCart}
                  disabled={product.stock <= 0}
                  className={`flex-1 py-5 rounded-[1.8rem] font-black uppercase tracking-[0.3em] text-[11px] flex items-center justify-center gap-3 transition-all transform active:scale-95 shadow-xl ${
                    product.stock > 0 
                      ? 'bg-black text-white hover:bg-blue-700 shadow-blue-900/10' 
                      : 'bg-zinc-200 text-zinc-400 cursor-not-allowed shadow-none'
                  }`}
                >
                  <ShoppingCart size={18} /> 
                  {product.stock > 0 ? 'Reserve System' : 'Protocol Halted'}
                </button>
                
                <div className="flex items-center justify-between px-8 py-4 sm:py-0 text-[9px] font-black uppercase tracking-[0.3em] bg-zinc-50 rounded-[1.8rem] border border-zinc-100 text-zinc-400 min-w-[160px]">
                  <span>Logistics Ready</span>
                  <ChevronRight size={12} />
                </div>
              </div>
              
              <p className="text-[9px] font-black uppercase tracking-[0.5em] text-zinc-300 text-center">
                Secure Foundry Deployment Protocol v4.2
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
