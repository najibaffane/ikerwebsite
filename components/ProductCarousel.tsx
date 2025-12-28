
import React, { useRef } from 'react';
import { Product } from '../types';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

interface ProductCarouselProps {
  products: Product[];
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ products }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 400;
      current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative">
      <div className="flex justify-end gap-2 absolute top-[-90px] right-4 md:right-12 z-10">
        <button 
          onClick={() => scroll('left')}
          className="p-3 border border-gray-200 rounded-full hover:bg-black hover:text-white transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        <button 
          onClick={() => scroll('right')}
          className="p-3 border border-gray-200 rounded-full hover:bg-black hover:text-white transition-colors"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div 
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto no-scrollbar px-4 md:px-12 pb-8 snap-x"
      >
        {products.map((product) => (
          <div 
            key={product.id}
            className="flex-shrink-0 w-[280px] md:w-[400px] snap-start group cursor-pointer"
          >
            <div className="aspect-[4/5] bg-gray-100 mb-6 overflow-hidden rounded-md relative">
              <img 
                src={product.images[0]} 
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 bg-black text-white text-[10px] font-bold px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">
                New Arrival
              </div>
            </div>
            <h3 className="text-xl font-bold tracking-tight mb-2 group-hover:underline underline-offset-4">{product.name}</h3>
            <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.description}</p>
            <div className="flex justify-between items-center">
              <span className="font-bold text-lg">{product.price.toLocaleString()} DZD</span>
              <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                View <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;
