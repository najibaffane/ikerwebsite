
import React from 'react';
import { X, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface CartDrawerProps {
  items: Product[];
  onClose: () => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ items, onClose, onRemove, onCheckout }) => {
  const total = items.reduce((sum, item) => sum + (item.price * (1 - (item.discount_percentage / 100))), 0);

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="p-8 border-b border-zinc-100 flex items-center justify-between bg-zinc-50">
          <div className="flex items-center gap-3">
            <ShoppingBag size={20} />
            <h2 className="text-xl font-black tracking-tighter uppercase">Your Selection</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:rotate-90 transition-transform">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-zinc-400 gap-4">
              <ShoppingBag size={48} className="opacity-20" />
              <p className="text-xs font-black uppercase tracking-widest">No components selected</p>
            </div>
          ) : (
            items.map((item, idx) => (
              <div key={`${item.id}-${idx}`} className="flex gap-4 p-4 rounded-2xl bg-zinc-50 border border-zinc-100 group animate-in fade-in slide-in-from-bottom-2">
                <img src={item.images[0]} className="w-16 h-16 rounded-xl object-cover" alt="" />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm truncate">{item.name}</p>
                  <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mt-1">
                    {(item.price * (1 - (item.discount_percentage / 100))).toLocaleString()} DZD
                  </p>
                </div>
                <button 
                  onClick={() => onRemove(item.id)}
                  className="p-2 text-zinc-300 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-8 border-t border-zinc-100 space-y-6 bg-zinc-50">
            <div className="flex justify-between items-end">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 leading-none">Total Est.</span>
              <span className="text-3xl font-black tracking-tighter leading-none">{total.toLocaleString()} DZD</span>
            </div>
            <button 
              onClick={onCheckout}
              className="w-full bg-black text-white py-6 rounded-full font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-zinc-800 transition-all shadow-xl shadow-black/10"
            >
              Initialize Checkout <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
