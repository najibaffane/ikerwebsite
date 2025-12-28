
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  discount_percentage: number;
  images: string[];
  description: string;
  details: string;
  features: string[];
  stock: number;
}

export type DeliveryType = 'home' | 'office';

export interface Order {
  id: string;
  customer_name: string;
  phone: string;
  wilaya: string;
  delivery_type: DeliveryType;
  product_id: string;
  product_name: string;
  amount: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  created_at: string;
}

export interface Category {
  id: string;
  title: string;
  image: string;
  url: string;
}
