import React from 'react';
import { HERO_DATA } from '../constants';

interface HeroProps {
  onNavigate: (page: string, category?: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="relative h-[85vh] w-full overflow-hidden bg-brand-brown">
      {/* Background Image/Video Placeholder */}
      <div className="absolute inset-0">
        <img
          src={HERO_DATA.image}
          alt="Featured Dish"
          className="w-full h-full object-cover opacity-80"
        />
        {/* Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent sm:from-black/40" />
      </div>

      {/* Content Container */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-xl text-white pt-20">
            <span className="block text-brand-red font-bold tracking-[0.2em] text-sm md:text-base mb-2 uppercase animate-fade-in-up">
              {HERO_DATA.subtitle}
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-extrabold uppercase leading-none mb-6 shadow-black drop-shadow-lg">
              {HERO_DATA.title.split(' ').map((word, i) => (
                <span key={i} className="block">{word}</span>
              ))}
            </h1>
            <p className="text-lg md:text-xl font-medium mb-8 text-gray-100 max-w-md">
              {HERO_DATA.description}
            </p>
            
            <button 
              onClick={() => onNavigate('menu', 'burger')}
              className="inline-block bg-brand-red text-white font-display font-bold text-xl px-10 py-4 uppercase tracking-wider hover:bg-red-700 transition-colors duration-300 shadow-lg cursor-pointer"
            >
              {HERO_DATA.cta}
            </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;