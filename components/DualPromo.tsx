import React from 'react';
import { PROMO_CARDS } from '../constants';

const DualPromo: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid md:grid-cols-2 gap-8">
        {PROMO_CARDS.map((card, index) => (
          <div 
            key={index} 
            className="group relative h-[500px] w-full overflow-hidden border border-gray-200 flex flex-col justify-end shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img 
                src={card.image} 
                alt={card.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Overlay based on theme */}
              <div className={`absolute inset-0 ${card.theme === 'dark' ? 'bg-black/40' : 'bg-gradient-to-t from-white via-white/40 to-transparent'}`} />
            </div>

            {/* Content */}
            <div className={`relative z-10 p-8 ${card.theme === 'dark' ? 'text-white' : 'text-brand-brown'}`}>
              <h3 className="font-display font-bold text-4xl mb-2 uppercase leading-none">
                {card.title}
              </h3>
              <p className="text-sm font-bold tracking-widest uppercase mb-4 opacity-90">
                {card.subtitle}
              </p>
              <p className="text-lg font-medium mb-8 max-w-sm">
                {card.description}
              </p>
              
              <button className={`
                font-display font-bold text-lg px-8 py-3 uppercase tracking-wider transition-colors
                ${card.theme === 'dark' 
                  ? 'bg-white text-brand-brown hover:bg-brand-gray' 
                  : 'bg-brand-brown text-white hover:bg-brand-brown/90'}
              `}>
                {card.ctaText}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DualPromo;