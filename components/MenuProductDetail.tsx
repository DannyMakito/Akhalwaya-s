import React from 'react';
import { DetailedMenuItem } from '../types';
import { ArrowLeft } from 'lucide-react';

interface MenuProductDetailProps {
  product: DetailedMenuItem;
  onBack: () => void;
  onAddToCart: (product: DetailedMenuItem) => void;
}

const MenuProductDetail: React.FC<MenuProductDetailProps> = ({ product, onBack, onAddToCart }) => {
  return (
    <div className="bg-white min-h-[calc(100vh-80px)] animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <button 
          onClick={onBack}
          className="group flex items-center text-sm font-bold text-gray-500 hover:text-brand-brown uppercase tracking-wider mb-8"
        >
          <div className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center mr-2 group-hover:border-brand-brown transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </div>
          Back to Menu
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 mb-20">
          
          {/* Product Image */}
          <div className="flex items-center justify-center">
            <img 
              src={product.image} 
              alt={product.title} 
              className="w-full max-w-lg object-contain drop-shadow-2xl rounded-lg"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-brand-brown uppercase mb-2">
              {product.title}
            </h1>
            <div className="text-brand-red font-bold text-xl mb-6">
              {product.calories}
            </div>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              {product.longDescription}
            </p>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => onAddToCart(product)}
                className="bg-brand-gold text-brand-brown font-display font-bold text-lg px-12 py-3 uppercase tracking-wider hover:bg-brand-brown hover:text-white transition-colors"
              >
                Add to Order
              </button>
              <span className="text-2xl font-bold text-brand-brown">{product.price}</span>
            </div>
          </div>
        </div>

        {/* Ingredients Section */}
        <div className="border-t border-gray-200 pt-16 text-center">
          <h2 className="text-3xl font-display font-bold text-brand-brown uppercase mb-12">
            Ingredients in the {product.title}
          </h2>
          
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {product.ingredients.map((ingredient, idx) => (
              <div key={idx} className="flex flex-col items-center group w-32 md:w-40">
                <div className="w-24 h-24 md:w-32 md:h-32 mb-4 relative transition-transform duration-300 group-hover:scale-110">
                  <img 
                    src={ingredient.image} 
                    alt={ingredient.name} 
                    className="w-full h-full object-cover rounded-full shadow-md"
                  />
                </div>
                <span className="text-sm font-bold text-gray-700 text-center uppercase tracking-wide">
                  {ingredient.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Nutritional Toggle (Static for now) */}
        <div className="mt-20 text-center">
          <button className="text-brand-brown font-bold uppercase tracking-widest text-sm border-b border-brand-brown pb-1 hover:text-brand-red hover:border-brand-red transition-colors">
            View Full Nutritional Information
          </button>
        </div>

      </div>
    </div>
  );
};

export default MenuProductDetail;