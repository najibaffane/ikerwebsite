
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Shop from './components/Shop';
import ProductDetail from './components/ProductDetail';
import Checkout from './components/Checkout';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import AdminWelcome from './components/AdminWelcome';
import CartDrawer from './components/CartDrawer';
import ToolFinder from './components/ToolFinder';
import Footer from './components/Footer';
import { Product, Order, Category } from './types';
import { db } from './services/supabase';

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'shop' | 'product' | 'checkout' | 'admin-login' | 'admin-welcome' | 'admin'>('home');
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Real-time data states
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isToolFinderOpen, setIsToolFinderOpen] = useState(false);

  // Initial Seed and Sync
  useEffect(() => {
    const initApp = async () => {
      await db.seedDatabase(); 
      await refreshData();
    };
    initApp();
  }, []);

  // Sync on View Change
  useEffect(() => {
    if (view === 'admin' || view === 'shop' || view === 'home') {
      refreshData();
    }
  }, [view]);

  // Handle Welcome Sequence
  useEffect(() => {
    if (view === 'admin-welcome') {
      const timer = setTimeout(() => {
        setView('admin');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [view]);

  // Sync with DB (Async)
  const refreshData = async () => {
    try {
      const [p, o, c] = await Promise.all([
        db.getProducts(),
        db.getOrders(),
        db.getCategories()
      ]);
      setProducts(p);
      setOrders(o);
      setCategories(c);
    } catch (err) {
      console.error("Database Connection Failed.", err);
    }
  };

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
    setIsCartOpen(true);
  };

  const handlePlaceOrders = async (orderItems: Omit<Order, 'id' | 'status' | 'created_at'>[]) => {
    const newOrders: Order[] = orderItems.map(item => ({
      ...item,
      id: `ORD-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      status: 'pending',
      created_at: new Date().toISOString()
    }));
    await db.saveOrders(newOrders);
    await refreshData();
  };

  const handleCheckoutDone = () => {
    setCart([]);
    setView('home');
  };

  const handleDeleteProduct = async (id: string) => {
    await db.deleteProduct(id);
    await refreshData();
  };

  const handleAddProduct = async (p: Product) => {
    await db.saveProducts([p]);
    await refreshData();
  };

  const handleUpdateProduct = async (p: Product) => {
    await db.saveProducts([p]);
    await refreshData();
  };

  const handleUpdateOrder = async (id: string, status: Order['status']) => {
    await db.updateOrderStatus(id, status);
    await refreshData();
  };

  const handleAddCategory = async (c: Category) => {
    await db.addCategory(c);
    await refreshData();
  };

  const handleDeleteCategory = async (id: string) => {
    await db.deleteCategory(id);
    await refreshData();
  };

  const isLightPage = view === 'admin' || view === 'admin-login' || view === 'checkout' || view === 'shop' || view === 'product';

  return (
    <div className="flex flex-col min-h-screen selection:bg-black selection:text-white">
      {view !== 'admin-welcome' && (
        <Navbar 
          onOpenToolFinder={() => setIsToolFinderOpen(true)} 
          onNavigate={(v) => { setView(v as any); setIsCartOpen(false); }} 
          cartCount={cart.length}
          onOpenCart={() => setIsCartOpen(true)}
          forceDark={isLightPage}
        />
      )}
      
      <main className="flex-1">
        {view === 'home' && (
          <>
            <Hero onShopNow={() => setView('shop')} />
            <section className="py-24 px-6 bg-white text-center">
              <h2 className="text-4xl font-black tracking-tighter mb-8 uppercase">Industrial Core</h2>
              <button onClick={() => setView('shop')} className="bg-black text-white px-12 py-5 rounded-full font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all shadow-xl shadow-black/10">
                Browse Components
              </button>
            </section>
          </>
        )}

        {view === 'shop' && (
          <Shop 
            products={products} 
            categories={categories}
            onSelect={(p) => { setSelectedProduct(p); setView('product'); }} 
          />
        )}

        {view === 'product' && selectedProduct && (
          <ProductDetail 
            product={selectedProduct} 
            categories={categories}
            onBack={() => setView('shop')} 
            onAddToCart={() => addToCart(selectedProduct)}
          />
        )}

        {view === 'checkout' && (
          <Checkout 
            products={cart} 
            onSubmitBatch={handlePlaceOrders} 
            onCancel={() => setView('shop')}
            onDone={handleCheckoutDone}
          />
        )}

        {view === 'admin-login' && (
          <AdminLogin 
            onSuccess={() => { setIsAdmin(true); setView('admin-welcome'); }} 
            onCancel={() => setView('home')} 
          />
        )}

        {view === 'admin-welcome' && <AdminWelcome />}

        {view === 'admin' && isAdmin && (
          <AdminDashboard 
            products={products} 
            orders={orders} 
            categories={categories}
            onDeleteProduct={handleDeleteProduct}
            onAddProduct={handleAddProduct}
            onUpdateProduct={handleUpdateProduct}
            onUpdateOrder={handleUpdateOrder}
            onAddCategory={handleAddCategory}
            onDeleteCategory={handleDeleteCategory}
          />
        )}
      </main>

      {isCartOpen && view !== 'admin-welcome' && (
        <CartDrawer 
          items={cart} 
          onClose={() => setIsCartOpen(false)} 
          onRemove={(id) => setCart(cart.filter(i => i.id !== id))}
          onCheckout={() => { setIsCartOpen(false); setView('checkout'); }}
        />
      )}

      {isToolFinderOpen && <ToolFinder onClose={() => setIsToolFinderOpen(false)} />}
      
      {view !== 'admin-welcome' && <Footer onAdminClick={() => setView('admin-login')} />}
    </div>
  );
};

export default App;
