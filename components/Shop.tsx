
import React, { useState } from 'react';
import { Product, Category } from '../types';
import { SlidersHorizontal, ArrowRight, X, Check, Box } from 'lucide-react';

interface ShopProps {
  products: Product[];
  categories: Category[];
  onSelect: (p: Product) => void;
}

const Shop: React.FC<ShopProps> = ({ products, categories, onSelect }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [priceRange, setPriceRange] = useState<number>(200000);
  const [onlyInStock, setOnlyInStock] = useState(false);

  const filtered = products.filter(p => {
    const finalPrice = p.price * (1 - (p.discount_percentage / 100));
    return (categoryFilter === 'All' || p.category === categoryFilter) &&
           finalPrice <= priceRange &&
           (!onlyInStock || p.stock > 0);
  });

  const getCategoryTitle = (catId: string) => {
    if (catId === 'All') return 'All Systems';
    return categories.find(c => c.id === catId)?.title || catId;
  };

  return (
    <div className="pt-24 min-h-screen bg-zinc-50">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-12 py-12">
        {/* Toggle Button for Mobile */}
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="md:hidden flex items-center gap-2 text-sm font-bold uppercase tracking-widest p-4 bg-white rounded-xl border border-zinc-200"
        >
          <SlidersHorizontal size={18} /> {isSidebarOpen ? 'Hide Filters' : 'Show Filters'}
        </button>

        {/* Sidebar Filters */}
        {isSidebarOpen && (
          <aside className="w-full md:w-72 flex flex-col gap-10 animate-in fade-in slide-in-from-left-4 duration-300">
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-6">Foundry Categories</h4>
              <div className="flex flex-col gap-2">
                <button 
                  onClick={() => setCategoryFilter('All')}
                  className={`group text-left text-sm py-4 px-6 rounded-2xl transition-all border flex items-center justify-between ${categoryFilter === 'All' ? 'bg-black text-white border-black shadow-lg shadow-black/10' : 'bg-white border-zinc-100 hover:border-zinc-300'}`}
                >
                  <span className="font-bold uppercase tracking-tight">All</span>
                  {categoryFilter === 'All' && <Check size={14} />}
                </button>
                {categories.map(cat => (
                  <button 
                    key={cat.id}
                    onClick={() => setCategoryFilter(cat.id)}
                    className={`group text-left text-sm py-4 px-6 rounded-2xl transition-all border flex items-center justify-between ${categoryFilter === cat.id ? 'bg-black text-white border-black shadow-lg shadow-black/10' : 'bg-white border-zinc-100 hover:border-zinc-300'}`}
                  >
                    <span className="font-bold uppercase tracking-tight">{cat.title}</span>
                    {categoryFilter === cat.id && <Check size={14} />}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-6">Budget Cap (DZD)</h4>
              <div className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm">
                <input 
                  type="range" min="0" max="200000" step="1000"
                  value={priceRange}
                  onChange={(e) => setPriceRange(parseInt(e.target.value))}
                  className="w-full accent-black h-1 bg-zinc-100 rounded-full appearance-none cursor-pointer mb-4"
                />
                <div className="flex justify-between items-center font-mono text-sm">
                  <span className="text-zinc-400">0</span>
                  <span className="font-bold text-black bg-zinc-100 px-3 py-1 rounded-lg">{priceRange.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-6">Availability</h4>
              <button 
                onClick={() => setOnlyInStock(!onlyInStock)}
                className={`w-full p-4 rounded-2xl border transition-all flex items-center gap-3 ${onlyInStock ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-zinc-100 text-zinc-600'}`}
              >
                <div className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${onlyInStock ? 'bg-blue-600' : 'bg-zinc-200'}`}>
                  {onlyInStock && <Check size={12} className="text-white" />}
                </div>
                <span className="text-xs font-bold uppercase tracking-widest">In Stock Only</span>
              </button>
            </div>
          </aside>
        )}

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold tracking-tighter uppercase">{getCategoryTitle(categoryFilter)}</h2>
              <p className="text-xs text-zinc-400 font-bold uppercase tracking-widest mt-1">{filtered.length} Systems Found</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {filtered.map(p => {
              const hasDiscount = p.discount_percentage > 0;
              const finalPrice = p.price * (1 - (p.discount_percentage / 100));
              const displayCategory = categories.find(c => c.id === p.category)?.title || p.category;
              
              return (
                <div 
                  key={p.id} 
                  className="bg-white p-6 rounded-[2rem] group cursor-pointer border border-zinc-100 hover:border-black transition-all duration-500 shadow-sm" 
                  onClick={() => onSelect(p)}
                >
                  <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-zinc-50 mb-8 relative">
                    <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                    
                    {hasDiscount && (
                      <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-[0.15em]">
                        -{p.discount_percentage}% OFF
                      </div>
                    )}
                    
                    {p.stock <= 0 && (
                      <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
                        <span className="text-black font-black text-sm uppercase tracking-[0.4em] border-2 border-black px-6 py-2 rounded-lg">Out of stock</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="px-2">
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">{displayCategory}</span>
                      <div className="flex flex-col items-end leading-none">
                        {hasDiscount && (
                          <span className="text-xs text-zinc-400 line-through mb-1">{p.price.toLocaleString()}</span>
                        )}
                        <span className="font-bold text-xl tracking-tight">{finalPrice.toLocaleString()} DZD</span>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold tracking-tighter mb-6 group-hover:text-blue-600 transition-colors line-clamp-1">{p.name}</h3>
                    
                    <div className="flex items-center gap-2 text-zinc-400 mb-6">
                      <Box size={14} />
                      <span className="text-[10px] font-bold uppercase tracking-widest">{p.stock} Available in Foundry</span>
                    </div>

                    <button className="w-full py-5 bg-zinc-50 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3 group-hover:bg-black group-hover:text-white transition-all">
                      View Blueprint <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
