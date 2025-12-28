
import React, { useState } from 'react';
import { Product, Order, DeliveryType } from '../types';
import { WILAYAS } from '../constants';
import { ArrowLeft, CheckCircle, Truck, Building2, User, Phone, MapPin, Loader2, Sparkles, ShoppingCart } from 'lucide-react';

interface CheckoutProps {
  products: Product[];
  onSubmitBatch: (orders: Omit<Order, 'id' | 'status' | 'created_at'>[]) => void;
  onCancel: () => void;
  onDone: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ products, onSubmitBatch, onCancel, onDone }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    wilaya: WILAYAS[15],
    deliveryType: 'home' as DeliveryType
  });

  const total = products.reduce((sum, p) => {
    const price = p.price * (1 - (p.discount_percentage / 100));
    return sum + price;
  }, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (products.length === 0 || isSubmitting) return;
    
    setIsSubmitting(true);
    
    // Create the batch of orders using snake_case properties for database compatibility
    const batchOrders: Omit<Order, 'id' | 'status' | 'created_at'>[] = products.map(p => ({
      customer_name: formData.customerName,
      phone: formData.phone,
      wilaya: formData.wilaya,
      delivery_type: formData.deliveryType,
      product_id: p.id,
      product_name: p.name,
      amount: p.price * (1 - (p.discount_percentage / 100))
    }));

    // Simulate network delay
    setTimeout(() => {
      onSubmitBatch(batchOrders);
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  if (products.length === 0 && !isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 p-6 pt-32">
        <div className="text-center space-y-6 max-w-sm">
          <div className="w-20 h-20 bg-zinc-200 text-zinc-400 flex items-center justify-center rounded-3xl mx-auto">
            <ShoppingCart size={32} />
          </div>
          <h2 className="text-2xl font-black uppercase tracking-tighter">Your Pipeline is Empty</h2>
          <p className="text-zinc-500 text-sm font-medium">Add components to your foundry before initializing checkout.</p>
          <button 
            onClick={onCancel}
            className="w-full bg-black text-white py-4 rounded-full font-black uppercase tracking-widest hover:bg-zinc-800 transition-all"
          >
            Return to Foundry
          </button>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white p-6 pt-32 animate-in fade-in zoom-in-95 duration-500">
        <div className="text-center space-y-8 max-w-md">
          <div className="relative">
            <div className="absolute inset-0 bg-green-400/20 blur-3xl rounded-full" />
            <div className="relative w-24 h-24 bg-green-500 text-white flex items-center justify-center rounded-[2.5rem] mx-auto shadow-2xl shadow-green-200 animate-[bounce_2s_infinite]">
              <CheckCircle size={48} />
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-5xl font-black tracking-tighter uppercase">Commande Réussie</h2>
            <p className="text-zinc-500 font-medium leading-relaxed">
              Votre architecture AXIS est en cours de déploiement. Un agent logistique vous contactera au <span className="text-black font-black">{formData.phone}</span> pour validation finale.
            </p>
          </div>
          <div className="pt-8">
            <button 
              onClick={onDone}
              className="w-full bg-black text-white py-6 rounded-[1.5rem] font-black uppercase tracking-[0.2em] hover:bg-zinc-800 transition-all flex items-center justify-center gap-3 shadow-xl active:scale-95"
            >
              Terminer la session <Sparkles size={18} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 bg-zinc-50 min-h-screen animate-in fade-in duration-500">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20">
        <div className="lg:col-span-7">
           <button onClick={onCancel} className="flex items-center gap-2 text-zinc-400 hover:text-black mb-12 transition-colors uppercase text-[10px] font-black tracking-[0.3em]">
            <ArrowLeft size={16} /> Update Components
          </button>
          
          <div className="bg-white p-12 rounded-[3.5rem] shadow-sm border border-zinc-100">
            <h2 className="text-4xl font-black tracking-tighter mb-12 uppercase italic">Logistics Protocol</h2>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2 ml-2">
                  <User size={12} /> Nom Complet
                </label>
                <input 
                  required 
                  type="text" 
                  value={formData.customerName} 
                  onChange={(e) => setFormData({...formData, customerName: e.target.value})} 
                  placeholder="Ex: Ahmed Benali" 
                  className="w-full p-6 bg-zinc-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-black outline-none transition-all" 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2 ml-2">
                    <Phone size={12} /> Phone Node
                  </label>
                  <input 
                    required 
                    type="tel" 
                    value={formData.phone} 
                    onChange={(e) => setFormData({...formData, phone: e.target.value})} 
                    placeholder="05 / 06 / 07 ..." 
                    className="w-full p-6 bg-zinc-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-black outline-none transition-all" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2 ml-2">
                    <MapPin size={12} /> Wilaya Selector
                  </label>
                  <select 
                    className="w-full p-6 bg-zinc-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-black outline-none appearance-none cursor-pointer" 
                    value={formData.wilaya} 
                    onChange={(e) => setFormData({...formData, wilaya: e.target.value})}
                  >
                    {WILAYAS.map(w => <option key={w} value={w}>{w}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                 <button 
                  type="button" 
                  onClick={() => setFormData({...formData, deliveryType: 'home'})} 
                  className={`p-8 rounded-[2rem] border-2 flex flex-col items-center gap-4 transition-all ${formData.deliveryType === 'home' ? 'border-black bg-zinc-50' : 'border-zinc-100 opacity-30 hover:opacity-100'}`}
                 >
                    <Truck size={32} />
                    <span className="text-[10px] font-black uppercase tracking-widest italic text-center">Home Base <br/>(Domicile)</span>
                 </button>
                 <button 
                  type="button" 
                  onClick={() => setFormData({...formData, deliveryType: 'office'})} 
                  className={`p-8 rounded-[2rem] border-2 flex flex-col items-center gap-4 transition-all ${formData.deliveryType === 'office' ? 'border-black bg-zinc-50' : 'border-zinc-100 opacity-30 hover:opacity-100'}`}
                 >
                    <Building2 size={32} />
                    <span className="text-[10px] font-black uppercase tracking-widest italic text-center">Office Hub <br/>(Bureau)</span>
                 </button>
              </div>

              <button 
                disabled={isSubmitting} 
                type="submit" 
                className="w-full bg-black text-white py-8 rounded-[2rem] font-black uppercase tracking-[0.2em] hover:bg-blue-700 transition-all flex items-center justify-center gap-4 mt-8 shadow-2xl shadow-blue-900/10 active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? <Loader2 className="animate-spin" /> : 'Confirm Selection / Paiement Cash'}
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-8">
           <div className="bg-white p-10 rounded-[3rem] border border-zinc-100 shadow-sm sticky top-32">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-10">Foundry Manifest</h3>
              <div className="space-y-6 max-h-[40vh] overflow-y-auto no-scrollbar pr-2">
                {products.map((p, i) => (
                  <div key={`${p.id}-${i}`} className="flex items-center gap-4 group animate-in slide-in-from-right duration-300" style={{ animationDelay: `${i * 100}ms` }}>
                     <img src={p.images[0]} className="w-16 h-16 rounded-2xl object-cover border border-zinc-100" />
                     <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm truncate uppercase tracking-tighter text-black">{p.name}</p>
                        <p className="text-[10px] font-black text-zinc-300 uppercase tracking-widest mt-1">AXIS ID: {p.id}</p>
                     </div>
                     <p className="font-black text-sm text-black">{(p.price * (1 - (p.discount_percentage / 100))).toLocaleString()} <span className="text-[10px]">DZD</span></p>
                  </div>
                ))}
              </div>
              <div className="mt-10 pt-10 border-t border-zinc-100 space-y-6">
                 <div className="flex justify-between items-center text-zinc-400 text-[10px] font-black uppercase tracking-widest">
                    <span>Base Value</span>
                    <span>{total.toLocaleString()} DZD</span>
                 </div>
                 <div className="flex justify-between items-center text-zinc-400 text-[10px] font-black uppercase tracking-widest">
                    <span>Logistics Duty</span>
                    <span className="text-green-600 font-black italic">Free Allocation</span>
                 </div>
                 <div className="flex justify-between items-end pt-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-black">Total Commitment</span>
                    <div className="text-right">
                      <span className="text-5xl font-black tracking-tighter block leading-none">{total.toLocaleString()}</span>
                      <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">Algerian Dinar (DZD)</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
