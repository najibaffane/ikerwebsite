
import React, { useState, useMemo } from 'react';
import { Product, Order, Category } from '../types';
import { 
  BarChart3, Package, ShoppingCart, Trash2, Plus, Clock, 
  Wallet, Tag, PlusCircle, X, ArrowUpRight,
  Layers, Image as ImageIcon, LayoutGrid, Loader2,
  ChevronDown, Activity, TrendingUp
} from 'lucide-react';

interface AdminDashboardProps {
  products: Product[];
  orders: Order[];
  categories: Category[];
  onDeleteProduct: (id: string) => Promise<void>;
  onAddProduct: (p: Product) => Promise<void>;
  onUpdateProduct: (p: Product) => Promise<void>;
  onUpdateOrder: (id: string, status: Order['status']) => Promise<void>;
  onAddCategory: (c: Category) => Promise<void>;
  onDeleteCategory: (id: string) => Promise<void>;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  products, orders, categories, onDeleteProduct, onAddProduct, onUpdateProduct, onUpdateOrder,
  onAddCategory, onDeleteCategory
}) => {
  const [activeTab, setActiveTab] = useState<'stats' | 'orders' | 'stock' | 'deals' | 'taxonomy'>('stats');
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '', 
    category: categories[0]?.id || '', 
    price: 0, 
    stock: 0, 
    discount_percentage: 0,
    description: '', 
    details: '', 
    features: ['', '', ''], 
    images: ['', '', '']
  });

  const [newCategory, setNewCategory] = useState({
    title: '',
    image: ''
  });

  // --- DATA CALCULATIONS ---
  const totalEarnings = useMemo(() => orders
    .filter(o => o.status === 'delivered')
    .reduce((sum, o) => sum + o.amount, 0), [orders]);

  const activeCommandsCount = useMemo(() => orders.filter(o => o.status !== 'delivered').length, [orders]);

  // Chart Data: Earnings over last 7 days (or entries)
  const earningsTrend = useMemo(() => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return d.toISOString().split('T')[0];
    }).reverse();

    return last7Days.map(date => {
      const dayTotal = orders
        .filter(o => o.status === 'delivered' && o.created_at.startsWith(date))
        .reduce((sum, o) => sum + o.amount, 0);
      return { date, amount: dayTotal };
    });
  }, [orders]);

  // Chart Data: Stock levels per category
  const categoryStock = useMemo(() => {
    return categories.map(cat => {
      const stock = products
        .filter(p => p.category === cat.id)
        .reduce((sum, p) => sum + p.stock, 0);
      return { label: cat.title, value: stock };
    });
  }, [products, categories]);

  const maxEarnings = Math.max(...earningsTrend.map(e => e.amount), 1);
  const maxStock = Math.max(...categoryStock.map(c => c.value), 1);

  // --- HANDLERS ---
  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    const id = Math.random().toString(36).substr(2, 9);
    const finalImages = (newProduct.images || []).filter(img => img.trim() !== '');
    
    await onAddProduct({ 
      ...newProduct, 
      id, 
      images: finalImages.length > 0 ? finalImages : ['https://images.unsplash.com/photo-1550751827-4bd374c3f58b']
    } as Product);
    
    setIsAddingProduct(false);
    setIsProcessing(false);
    setNewProduct({
      name: '', category: categories[0]?.id || '', price: 0, stock: 0, discount_percentage: 0,
      description: '', details: '', features: ['', '', ''], images: ['', '', '']
    });
  };

  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    const id = newCategory.title.toLowerCase().replace(/\s+/g, '-');
    await onAddCategory({
      id,
      title: newCategory.title,
      image: newCategory.image,
      url: `#${id}`
    });
    setIsAddingCategory(false);
    setIsProcessing(false);
    setNewCategory({ title: '', image: '' });
  };

  const handleImageChange = (index: number, value: string) => {
    const updatedImages = [...(newProduct.images || ['', '', ''])];
    updatedImages[index] = value;
    setNewProduct({ ...newProduct, images: updatedImages });
  };

  const statusOptions: { value: Order['status']; label: string }[] = [
    { value: 'pending', label: 'Pending Verification' },
    { value: 'confirmed', label: 'Order Confirmed' },
    { value: 'shipped', label: 'In Transit / Shipped' },
    { value: 'delivered', label: 'Finalized / Delivered' }
  ];

  const navigationItems = [
    { id: 'stats', label: 'Analytics', icon: BarChart3 },
    { id: 'orders', label: 'Commands', icon: ShoppingCart },
    { id: 'stock', label: 'Inventory', icon: Layers },
    { id: 'deals', label: 'Offer Mgmt', icon: Tag },
    { id: 'taxonomy', label: 'Taxonomy', icon: LayoutGrid }
  ];

  return (
    <div className="pt-32 min-h-screen bg-zinc-50 pb-32 animate-in fade-in duration-1000">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-12">
        {/* REFINED HEADER - Removed Large Title */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-20 border-b border-zinc-200 pb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="bg-black p-3 rounded-2xl text-white shadow-xl">
                <Activity size={24} />
              </div>
              <div>
                <h1 className="text-xl font-black uppercase tracking-[0.2em] leading-none">System Oversight</h1>
                <p className="text-zinc-400 font-bold text-[10px] uppercase tracking-[0.3em] mt-1.5 flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" /> Live Node Active
                </p>
              </div>
            </div>
          </div>
          
          <nav className="flex bg-white p-2 rounded-[1.8rem] shadow-2xl shadow-black/[0.03] border border-zinc-100 overflow-x-auto no-scrollbar max-w-full">
            {navigationItems.map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-3.5 px-8 py-4 rounded-[1.4rem] text-[11px] font-black uppercase tracking-[0.25em] whitespace-nowrap transition-all duration-500 ${activeTab === tab.id ? 'bg-black text-white shadow-2xl shadow-black/20 -translate-y-1' : 'text-zinc-400 hover:text-black hover:bg-zinc-50'}`}
              >
                <tab.icon size={16} className={activeTab === tab.id ? 'text-white' : 'text-zinc-300'} /> 
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {activeTab === 'stats' && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
            {/* Top Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <StatCard label="Realized Revenue" value={`${totalEarnings.toLocaleString()} DZD`} icon={Wallet} color="text-green-600" />
              <StatCard label="Pipeline Latency" value={activeCommandsCount} icon={Clock} color="text-orange-500" />
              <StatCard label="Physical Units" value={products.reduce((s, p) => s + p.stock, 0)} icon={Package} color="text-blue-600" />
              <StatCard label="System Protocols" value={products.length} icon={TrendingUp} color="text-zinc-500" />
            </div>

            {/* Graphs Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Earnings Graph */}
              <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-zinc-100 relative overflow-hidden group">
                <div className="flex justify-between items-center mb-10">
                  <div>
                    <h3 className="text-zinc-900 font-black text-sm uppercase tracking-[0.2em]">Earnings Velocity</h3>
                    <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest mt-1">Last 7 Operational Cycles</p>
                  </div>
                  <TrendingUp className="text-zinc-200" size={24} />
                </div>
                
                <div className="h-48 flex items-end justify-between gap-4 relative">
                  {earningsTrend.map((data, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-3 h-full justify-end group/bar">
                      <div 
                        className="w-full bg-zinc-900 rounded-xl transition-all duration-1000 origin-bottom group-hover/bar:bg-blue-600 shadow-lg"
                        style={{ height: `${(data.amount / maxEarnings) * 100}%`, minHeight: '4px' }}
                      />
                      <span className="text-[9px] font-bold text-zinc-300 uppercase tracking-tighter truncate w-full text-center">
                        {data.date.split('-').slice(1).join('/')}
                      </span>
                      {/* Tooltip on hover */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-black text-white px-3 py-1.5 rounded-lg text-[9px] font-black opacity-0 group-hover/bar:opacity-100 transition-opacity z-10 pointer-events-none uppercase tracking-widest shadow-2xl">
                        {data.amount.toLocaleString()} DZD
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inventory Graph */}
              <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-zinc-100">
                <div className="flex justify-between items-center mb-10">
                  <div>
                    <h3 className="text-zinc-900 font-black text-sm uppercase tracking-[0.2em]">Resource Allocation</h3>
                    <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest mt-1">Distribution across foundry cells</p>
                  </div>
                  <Layers className="text-zinc-200" size={24} />
                </div>

                <div className="space-y-6">
                  {categoryStock.map((cat, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                        <span className="text-zinc-500">{cat.label}</span>
                        <span className="text-black">{cat.value} Units</span>
                      </div>
                      <div className="h-2.5 w-full bg-zinc-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-zinc-900 transition-all duration-1000 ease-out rounded-full"
                          style={{ width: `${(cat.value / maxStock) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- ORDERS TAB --- */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-[3rem] shadow-xl border border-zinc-100 overflow-hidden animate-in slide-in-from-bottom-12 duration-700">
            <div className="p-10 border-b border-zinc-50 flex items-center justify-between bg-zinc-50/20">
              <h3 className="text-xs font-black uppercase tracking-[0.4em] text-zinc-400">Command Ledger</h3>
              <div className="px-5 py-2 bg-black text-white rounded-full text-[10px] font-black uppercase tracking-widest">
                {orders.length} Protocols
              </div>
            </div>
            <table className="w-full text-left">
              <thead className="bg-zinc-50/30">
                <tr>
                  <th className="p-10 text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400">Order ID</th>
                  <th className="p-10 text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400">Node</th>
                  <th className="p-10 text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400">System</th>
                  <th className="p-10 text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400">Protocol</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50">
                {orders.map(order => (
                  <tr key={order.id} className="hover:bg-zinc-50/20 transition-all duration-300 group">
                    <td className="p-10 font-mono text-[13px] font-bold text-zinc-400">{order.id}</td>
                    <td className="p-10">
                      <p className="font-black text-[15px] tracking-tight text-zinc-900">{order.customer_name}</p>
                      <p className="text-[11px] font-black text-blue-600 uppercase tracking-[0.2em] mt-2 bg-blue-50 w-fit px-3 py-1 rounded-lg">{order.phone} • {order.wilaya}</p>
                    </td>
                    <td className="p-10">
                      <p className="font-black text-[11px] uppercase tracking-tighter text-black truncate max-w-[200px]">{order.product_name}</p>
                      <p className="text-[11px] font-bold text-zinc-400 mt-2">{order.amount.toLocaleString()} DZD</p>
                    </td>
                    <td className="p-10">
                      <div className="relative inline-block w-full max-w-[240px]">
                        <select
                          value={order.status}
                          onChange={(e) => onUpdateOrder(order.id, e.target.value as Order['status'])}
                          className={`w-full appearance-none px-8 py-5 rounded-2xl border-none font-black text-[10px] uppercase tracking-[0.2em] cursor-pointer transition-all shadow-sm focus:ring-4 focus:ring-black/5 outline-none pr-12 ${
                            order.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                            order.status === 'confirmed' ? 'bg-blue-100 text-blue-700' :
                            order.status === 'shipped' ? 'bg-purple-100 text-purple-700' :
                            'bg-emerald-100 text-emerald-700'
                          }`}
                        >
                          {statusOptions.map(opt => (
                            <option key={opt.value} value={opt.value} className="bg-white text-black py-4">
                              {opt.label}
                            </option>
                          ))}
                        </select>
                        <ChevronDown size={16} className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none opacity-40" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {orders.length === 0 && (
              <div className="p-32 text-center">
                <ShoppingCart className="mx-auto text-zinc-100 mb-10" size={80} />
                <p className="text-[11px] font-black uppercase tracking-[0.5em] text-zinc-400">Zero active commands in grid</p>
              </div>
            )}
          </div>
        )}

        {/* --- OTHER TABS (STOCK, DEALS, TAXONOMY) --- */}
        {activeTab === 'stock' && (
          <div className="space-y-12 animate-in fade-in duration-700">
            <div className="flex justify-between items-center">
              <h2 className="text-4xl font-black tracking-tighter uppercase italic">Inventory Log</h2>
              <button onClick={() => setIsAddingProduct(true)} className="bg-black text-white px-12 py-6 rounded-full text-[11px] font-black uppercase tracking-[0.25em] flex items-center gap-4 shadow-2xl hover:scale-[1.03] transition-all active:scale-95">
                <Plus size={18} /> Create SKU
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {products.map(p => (
                <div key={p.id} className={`bg-white p-12 rounded-[3.5rem] shadow-xl border transition-all duration-700 ${p.stock < 5 ? 'border-orange-500 bg-orange-50/20' : 'border-zinc-100 hover:border-black hover:shadow-2xl hover:shadow-black/[0.08]'}`}>
                  <div className="flex gap-8 mb-10">
                    <img src={p.images[0]} className="w-20 h-20 rounded-[2rem] object-cover border border-zinc-100 shadow-xl shadow-black/[0.03]" />
                    <div>
                      <h4 className="font-black text-2xl tracking-tighter uppercase leading-[0.9] mb-3">{p.name}</h4>
                      <span className="px-3 py-1 bg-zinc-100 rounded-lg text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                        {categories.find(c => c.id === p.category)?.title || p.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-8 bg-zinc-50 rounded-[2rem] border border-zinc-100 mb-10">
                    <span className="text-[11px] font-black uppercase tracking-[0.25em] text-zinc-400">Units in Bin</span>
                    <span className={`text-4xl font-black tracking-tighter ${p.stock < 5 ? 'text-orange-600' : 'text-black'}`}>{p.stock}</span>
                  </div>
                  <button onClick={() => onDeleteProduct(p.id)} className="w-full py-6 rounded-[1.8rem] text-[11px] font-black uppercase tracking-[0.3em] text-red-500 border border-red-100 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all">
                    Decommission
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'taxonomy' && (
          <div className="space-y-12 animate-in fade-in duration-700">
            <div className="flex justify-between items-center">
              <h2 className="text-4xl font-black tracking-tighter uppercase italic">Category Architecture</h2>
              <button onClick={() => setIsAddingCategory(true)} className="bg-black text-white px-12 py-6 rounded-full text-[11px] font-black uppercase tracking-[0.25em] flex items-center gap-4 shadow-xl shadow-black/10">
                <PlusCircle size={18} /> Add Category
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {categories.map(cat => (
                <div key={cat.id} className="bg-white rounded-[3.5rem] overflow-hidden border border-zinc-100 shadow-sm group hover:border-black transition-all duration-500">
                  <div className="h-48 relative">
                    <img src={cat.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-100 group-hover:scale-110" />
                    <button 
                      onClick={() => onDeleteCategory(cat.id)}
                      className="absolute top-6 right-6 p-4 bg-red-600 text-white rounded-2xl opacity-0 group-hover:opacity-100 transition-all transform scale-75 group-hover:scale-100 shadow-xl"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <div className="p-10 text-center">
                    <h4 className="font-black uppercase tracking-[0.3em] text-sm mb-3">{cat.title}</h4>
                    <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-[0.4em]">ADDR: {cat.id}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'deals' && (
          <div className="space-y-12 animate-in fade-in duration-700">
             <h2 className="text-4xl font-black tracking-tighter uppercase italic">Discount Architect</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
               {products.map(p => (
                 <div key={p.id} className="bg-white p-10 rounded-[3rem] border border-zinc-100 flex items-center justify-between group hover:border-blue-600 transition-all shadow-xl shadow-black/[0.01]">
                    <div className="flex items-center gap-8">
                       <img src={p.images[0]} className="w-16 h-16 rounded-[1.8rem] object-cover shadow-2xl shadow-black/5" />
                       <span className="font-black text-lg uppercase tracking-tight text-zinc-900">{p.name}</span>
                    </div>
                    <div className="flex items-center gap-6">
                       <span className="text-[11px] font-black text-zinc-400 uppercase tracking-[0.3em]">OFFER</span>
                       <div className="flex items-center gap-3 bg-zinc-50 px-8 py-5 rounded-[1.8rem] border border-zinc-100 group-hover:border-blue-100 transition-colors">
                          <input 
                             type="number" 
                             className="w-16 bg-transparent text-center font-black outline-none text-xl tracking-tighter"
                             value={p.discount_percentage}
                             onChange={(e) => onUpdateProduct({...p, discount_percentage: parseInt(e.target.value) || 0})}
                          />
                          <span className="font-black text-zinc-300 text-sm">%</span>
                       </div>
                    </div>
                 </div>
               ))}
             </div>
          </div>
        )}
      </div>

      {/* MODALS */}
      {isAddingCategory && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-3xl" onClick={() => setIsAddingCategory(false)} />
          <form onSubmit={handleCategorySubmit} className="relative bg-white w-full max-w-md rounded-[4rem] p-16 shadow-[0_40px_100px_rgba(0,0,0,0.4)] animate-in zoom-in-95 duration-500">
            <h2 className="text-4xl font-black tracking-tighter uppercase mb-12 italic">Register Logic Group</h2>
            <div className="space-y-10">
              <div className="space-y-4">
                <label className="text-[11px] font-black uppercase tracking-[0.4em] text-zinc-400 ml-4">Classification Label</label>
                <input 
                  required 
                  className="w-full p-8 bg-zinc-50 rounded-[2rem] outline-none font-black text-sm border-2 border-transparent focus:border-black transition-all" 
                  placeholder="e.g. CORE-SYSTEMS" 
                  value={newCategory.title} 
                  onChange={e => setNewCategory({...newCategory, title: e.target.value})} 
                />
              </div>
              <div className="space-y-4">
                <label className="text-[11px] font-black uppercase tracking-[0.4em] text-zinc-400 ml-4">Architecture Viz (URL)</label>
                <input 
                  required 
                  className="w-full p-8 bg-zinc-50 rounded-[2rem] outline-none font-black text-sm border-2 border-transparent focus:border-black transition-all" 
                  placeholder="https://..." 
                  value={newCategory.image} 
                  onChange={e => setNewCategory({...newCategory, image: e.target.value})} 
                />
              </div>
              <button disabled={isProcessing} type="submit" className="w-full bg-black text-white py-10 rounded-full font-black uppercase tracking-[0.3em] hover:bg-blue-600 transition-all shadow-2xl mt-6 flex items-center justify-center gap-4">
                {isProcessing ? <Loader2 className="animate-spin" size={24} /> : <PlusCircle size={20} />} Engage Creation
              </button>
            </div>
          </form>
        </div>
      )}

      {isAddingProduct && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-3xl" onClick={() => setIsAddingProduct(false)} />
          <form onSubmit={handleAddSubmit} className="relative bg-white w-full max-w-3xl rounded-[4rem] p-16 overflow-y-auto max-h-[95vh] no-scrollbar shadow-[0_50px_120px_rgba(0,0,0,0.5)] animate-in zoom-in-95 duration-500">
            <div className="flex items-center justify-between mb-16">
              <h2 className="text-5xl font-black tracking-tighter uppercase italic">Foundry SKU Deployment</h2>
              <button onClick={() => setIsAddingProduct(false)} className="p-5 bg-zinc-50 rounded-[1.5rem] hover:bg-zinc-100 transition-all hover:rotate-90">
                <X size={24} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
                <div className="space-y-4">
                  <label className="text-[11px] font-black uppercase tracking-[0.4em] text-zinc-400 ml-4">System Identity</label>
                  <input required className="w-full p-8 bg-zinc-50 rounded-[2rem] outline-none font-black text-sm border-2 border-transparent focus:border-black transition-all" placeholder="Label" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} />
                </div>
                <div className="space-y-4">
                  <label className="text-[11px] font-black uppercase tracking-[0.4em] text-zinc-400 ml-4">Logic Group</label>
                  <select className="w-full p-8 bg-zinc-50 rounded-[2rem] outline-none font-black text-sm border-2 border-transparent focus:border-black transition-all appearance-none" value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})}>
                    <option value="">Select Category</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                  </select>
                </div>
                <div className="space-y-4">
                  <label className="text-[11px] font-black uppercase tracking-[0.4em] text-zinc-400 ml-4">Unit Cost (DZD)</label>
                  <input type="number" required className="w-full p-8 bg-zinc-50 rounded-[2rem] outline-none font-black text-sm border-2 border-transparent focus:border-black transition-all" placeholder="0.00" value={newProduct.price || ''} onChange={e => setNewProduct({...newProduct, price: parseInt(e.target.value) || 0})} />
                </div>
                <div className="space-y-4">
                  <label className="text-[11px] font-black uppercase tracking-[0.4em] text-zinc-400 ml-4">Stock Reserve</label>
                  <input type="number" required className="w-full p-8 bg-zinc-50 rounded-[2rem] outline-none font-black text-sm border-2 border-transparent focus:border-black transition-all" placeholder="QTY" value={newProduct.stock || ''} onChange={e => setNewProduct({...newProduct, stock: parseInt(e.target.value) || 0})} />
                </div>
            </div>

            <div className="space-y-6 mb-16">
              <h4 className="text-[11px] font-black uppercase tracking-[0.5em] text-zinc-400 flex items-center gap-3 ml-4">
                <ImageIcon size={18} /> Architecture Visualization
              </h4>
              <div className="grid grid-cols-1 gap-6">
                {[0, 1, 2].map(idx => (
                  <div key={idx} className="flex gap-6 group">
                    <div className="w-20 h-20 bg-zinc-50 rounded-[1.8rem] flex items-center justify-center text-zinc-200 font-black border-2 border-zinc-100 group-hover:border-black transition-all">
                      {idx + 1}
                    </div>
                    <input 
                      className="flex-1 p-8 bg-zinc-50 rounded-[2.2rem] outline-none text-xs font-mono border-2 border-transparent focus:border-black transition-all" 
                      placeholder={`Source URL ${idx + 1} ${idx === 0 ? '(Required)' : '(Optional)'}`}
                      required={idx === 0}
                      value={newProduct.images?.[idx] || ''} 
                      onChange={e => handleImageChange(idx, e.target.value)} 
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4 mb-10">
              <label className="text-[11px] font-black uppercase tracking-[0.4em] text-zinc-400 ml-4">Marketing Narrative</label>
              <textarea required className="w-full p-8 bg-zinc-50 rounded-[2.5rem] outline-none h-40 font-bold text-sm border-2 border-transparent focus:border-black transition-all" placeholder="Explain the system's core advantages..." value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} />
            </div>

            <div className="space-y-4 mb-16">
              <label className="text-[11px] font-black uppercase tracking-[0.4em] text-zinc-400 ml-4">Engineering Parameters (Spec Sheet)</label>
              <textarea required className="w-full p-10 bg-zinc-900 text-emerald-400 font-mono rounded-[3rem] outline-none h-64 text-xs shadow-[inset_0_2px_20px_rgba(0,0,0,0.5)] leading-relaxed" placeholder="Detailed technical specs..." value={newProduct.details} onChange={e => setNewProduct({...newProduct, details: e.target.value})} />
            </div>
            
            <button disabled={isProcessing} type="submit" className="w-full bg-black text-white py-12 rounded-full font-black uppercase tracking-[0.4em] hover:bg-emerald-600 transition-all shadow-[0_30px_60px_rgba(0,0,0,0.3)] flex items-center justify-center gap-4">
              {isProcessing ? <Loader2 className="animate-spin" size={24} /> : <Plus size={22} />} Deploy To Foundry
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

const StatCard = ({ label, value, icon: Icon, color }: any) => (
  <div className="bg-white p-10 rounded-[4rem] shadow-2xl shadow-black/[0.04] border border-zinc-100 group hover:border-black transition-all duration-700 hover:-translate-y-2">
    <div className={`p-5 bg-zinc-50 rounded-[1.8rem] w-fit mb-8 transition-all duration-500 group-hover:bg-black group-hover:text-white ${color}`}>
      <Icon size={24} />
    </div>
    <h3 className="text-zinc-400 text-[10px] font-black uppercase tracking-[0.5em] mb-3">{label}</h3>
    <p className="text-4xl font-black tracking-tighter">{value}</p>
  </div>
);

export default AdminDashboard;
