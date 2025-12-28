
import { createClient } from '@supabase/supabase-js';
import { Product, Order, Category } from '../types';
import { INITIAL_PRODUCTS, CATEGORIES } from '../constants';

/* 
  =============================================================================
  REQUIRED SQL FOR SUPABASE (Run this in your Supabase SQL Editor):
  =============================================================================
  -- IMPORTANT: Since your 'orders' table already exists with wrong columns, 
  -- you MUST drop it first before creating the correct version.

  DROP TABLE IF EXISTS orders;

  CREATE TABLE orders (
    id TEXT PRIMARY KEY,
    customer_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    wilaya TEXT NOT NULL,
    delivery_type TEXT NOT NULL,
    product_id TEXT NOT NULL REFERENCES products(id),
    product_name TEXT NOT NULL,
    amount NUMERIC NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW()
  );

  -- Force Supabase to see the new columns immediately:
  NOTIFY pgrst, 'reload schema';
  =============================================================================
*/

const supabaseUrl = 'https://kuldmxpvxxxhxwalytrb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt1bGRteHB2eHh4aHh3YWx5dHJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY5MDc5OTAsImV4cCI6MjA4MjQ4Mzk5MH0.fRSA2RVDelVvad0Rr2n271XsZAxV_P_Wi6mGQq7LU5w';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const db = {
  getProducts: async (): Promise<Product[]> => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('id', { ascending: true });
      
      if (error) throw error;
      return data && data.length > 0 ? data : INITIAL_PRODUCTS;
    } catch (err: any) {
      console.error('Supabase fetch products error:', err.message);
      return INITIAL_PRODUCTS;
    }
  },

  saveProducts: async (products: Product[]) => {
    const { error } = await supabase.from('products').upsert(products);
    if (error) console.error('Error saving products:', error.message);
  },

  deleteProduct: async (id: string) => {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) console.error('Error deleting product:', error.message);
  },

  getCategories: async (): Promise<Category[]> => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('title', { ascending: true });
      
      if (error) throw error;
      return data && data.length > 0 ? data : CATEGORIES;
    } catch (err: any) {
      console.error('Supabase fetch categories error:', err.message);
      return CATEGORIES;
    }
  },

  addCategory: async (category: Category) => {
    const { error } = await supabase.from('categories').insert(category);
    if (error) console.error('Error adding category:', error.message);
  },

  deleteCategory: async (id: string) => {
    const { error } = await supabase.from('categories').delete().eq('id', id);
    if (error) console.error('Error deleting category:', error.message);
  },

  getOrders: async (): Promise<Order[]> => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    } catch (err: any) {
      console.error('Error fetching orders:', err.message);
      return [];
    }
  },

  saveOrders: async (newOrders: Order[]) => {
    // Explicitly mapping to ensure the payload perfectly matches the DB column names
    const cleanOrders = newOrders.map(order => ({
      id: order.id,
      customer_name: order.customer_name,
      phone: order.phone,
      wilaya: order.wilaya,
      delivery_type: order.delivery_type,
      product_id: order.product_id,
      product_name: order.product_name,
      amount: order.amount,
      status: order.status,
      created_at: order.created_at
    }));

    const { error: orderError } = await supabase.from('orders').insert(cleanOrders);
    
    if (orderError) {
      console.error('Error saving orders:', orderError.message);
      // Helpful alert if the user forgot to run the SQL DROP command
      if (orderError.message.includes('customer_name')) {
        alert("Database Schema Mismatch: Please run the SQL DROP and CREATE script provided in services/supabase.ts to fix your 'orders' table.");
      }
      return;
    }
    
    // Update inventory levels
    for (const order of newOrders) {
      const { data: p } = await supabase.from('products').select('stock').eq('id', order.product_id).single();
      if (p) {
        await supabase.from('products').update({ stock: Math.max(0, p.stock - 1) }).eq('id', order.product_id);
      }
    }
  },

  updateOrderStatus: async (orderId: string, status: Order['status']) => {
    const { error } = await supabase.from('orders').update({ status }).eq('id', orderId);
    if (error) console.error('Error updating order status:', error.message);
  },

  seedDatabase: async () => {
    try {
      const { data: catCheck } = await supabase.from('categories').select('id').limit(1);
      if (!catCheck || catCheck.length === 0) {
        const { error: catError } = await supabase.from('categories').upsert(CATEGORIES, { onConflict: 'id' });
        if (catError) {
          console.error('Error seeding categories:', catError.message);
          return;
        }
      }

      const { data: prodCheck } = await supabase.from('products').select('id').limit(1);
      if (!prodCheck || prodCheck.length === 0) {
        const { error: prodError } = await supabase.from('products').upsert(INITIAL_PRODUCTS, { onConflict: 'id' });
        if (prodError) console.error('Error seeding products:', prodError.message);
      }
    } catch (err: any) {
      console.error('Seed process error:', err.message);
    }
  }
};
