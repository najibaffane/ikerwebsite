
import React from 'react';
import { Category } from '../types';
import { ArrowRight } from 'lucide-react';

interface CategoryGridProps {
  categories: Category[];
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ categories }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      <div className="md:col-span-8 group relative h-[500px] overflow-hidden rounded-md cursor-pointer">
        <img 
          src={categories[0].image} 
          alt={categories[0].title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
        <div className="absolute bottom-12 left-12">
          <h3 className="text-white text-4xl md:text-5xl font-bold tracking-tighter mb-4">{categories[0].title}</h3>
          <button className="flex items-center gap-2 text-white font-medium uppercase tracking-widest text-xs group-hover:gap-4 transition-all">
            Explore Range <ArrowRight size={16} />
          </button>
        </div>
      </div>
      
      <div className="md:col-span-4 flex flex-col gap-6">
        {categories.slice(1).map((cat) => (
          <div key={cat.id} className="group relative h-[238px] overflow-hidden rounded-md cursor-pointer">
            <img 
              src={cat.image} 
              alt={cat.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
            <div className="absolute bottom-8 left-8">
              <h3 className="text-white text-2xl font-bold tracking-tighter mb-2">{cat.title}</h3>
              <button className="flex items-center gap-2 text-white font-medium uppercase tracking-widest text-[10px]">
                Shop Now <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;
