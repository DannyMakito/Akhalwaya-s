import React from 'react';
import { FEATURED_ITEMS } from '../constants';
import { ArrowRight } from 'lucide-react';

interface MenuGridProps {
  onNavigate: (page: string) => void;
}

const MenuGrid: React.FC<MenuGridProps> = ({ onNavigate }) => {
  return (
    <section className="bg-white py-16" id="menu">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-brand-brown uppercase">
            Crowd Pleasers
          </h2>
          <p className="mt-4 text-xl text-gray-600">Our most loved dishes, ready for pickup or delivery.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURED_ITEMS.map((item) => (
            <div key={item.id} className="group flex flex-col items-center text-center">
              
              <div className="relative w-full aspect-square overflow-hidden mb-6 rounded-lg bg-gray-50">
                 <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {item.tag && (
                  <span className="absolute top-4 left-4 bg-brand-gold text-brand-brown text-xs font-bold px-3 py-1 uppercase tracking-wider">
                    {item.tag}
                  </span>
                )}
                {item.isNew && (
                  <span className="absolute top-4 left-4 bg-brand-red text-white text-xs font-bold px-3 py-1 uppercase tracking-wider">
                    New
                  </span>
                )}
              </div>

              <h3 className="text-2xl font-display font-bold text-brand-brown uppercase mb-2">
                {item.title}
              </h3>
              
              <p className="text-gray-600 mb-4 px-2 text-sm leading-relaxed min-h-[40px]">
                {item.description}
              </p>

              <span className="text-lg font-bold text-brand-brown mb-4 block">
                {item.price}
              </span>

              <button className="text-brand-brown font-bold uppercase tracking-wide border-b-2 border-transparent group-hover:border-brand-brown transition-all flex items-center gap-1">
                Order Now <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button 
            onClick={() => onNavigate('menu')}
            className="inline-block border-2 border-brand-brown text-brand-brown font-display font-bold text-xl px-12 py-3 uppercase tracking-wider hover:bg-brand-brown hover:text-white transition-colors cursor-pointer"
          >
            View Full Menu
          </button>
        </div>

      </div>
    </section>
  );
};

export default MenuGrid;