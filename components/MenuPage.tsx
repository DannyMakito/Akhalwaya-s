import React, { useState, useEffect } from 'react';
import { CATEGORIES, MENU_ITEMS } from '../constants';
import { DetailedMenuItem } from '../types';
import MenuProductDetail from './MenuProductDetail';
import { ChevronDown } from 'lucide-react';

interface MenuPageProps {
  initialCategory?: string;
  onAddToCart: (product: DetailedMenuItem) => void;
}

const MenuPage: React.FC<MenuPageProps> = ({ initialCategory, onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory || 'fav');
  const [selectedProduct, setSelectedProduct] = useState<DetailedMenuItem | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Update active category if initialCategory changes (e.g. navigation from outside)
  useEffect(() => {
    if (initialCategory) {
      setActiveCategory(initialCategory);
    }
  }, [initialCategory]);

  // Filter items based on active category
  const filteredItems = activeCategory === 'fav' 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(item => item.categoryId === activeCategory);

  const activeCategoryData = CATEGORIES.find(c => c.id === activeCategory);

  if (selectedProduct) {
    return (
      <MenuProductDetail 
        product={selectedProduct} 
        onBack={() => setSelectedProduct(null)} 
        onAddToCart={(product) => {
          onAddToCart(product);
          // Optional: Go back to menu after adding, or stay? keeping user on page is standard.
          // For now, we stay on the product page.
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="flex flex-col md:flex-row max-w-7xl mx-auto">
        
        {/* Left Sidebar (Desktop) / Dropdown (Mobile) */}
        <aside className="w-full md:w-64 flex-shrink-0 bg-white md:border-r border-gray-100 md:min-h-[calc(100vh-80px)] relative z-20">
          
          {/* Mobile Dropdown Trigger */}
          <div className="md:hidden sticky top-20 bg-white border-b border-gray-200 p-4 z-20">
             <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-full flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg p-3 shadow-sm active:bg-gray-100 transition-colors"
             >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-200 bg-white">
                    <img src={activeCategoryData?.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <span className="font-bold text-brand-brown uppercase text-sm tracking-wide">{activeCategoryData?.label}</span>
                </div>
                <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${isMobileMenuOpen ? 'rotate-180' : ''}`} />
             </button>
          </div>

          {/* Category List */}
          <div className={`
             bg-white w-full
             ${isMobileMenuOpen ? 'block border-b border-gray-100' : 'hidden'} 
             md:block md:sticky md:top-24 md:border-none
          `}>
            <ul className="flex flex-col p-4 md:py-8 space-y-1">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => {
                      setActiveCategory(cat.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center px-4 py-3 rounded-md transition-all duration-200 group
                      ${activeCategory === cat.id 
                        ? 'bg-gray-50 border-l-4 border-brand-red shadow-sm md:shadow-none' 
                        : 'border-l-4 border-transparent hover:bg-gray-50'}
                    `}
                  >
                    <div className="w-12 h-12 mr-4 rounded-full overflow-hidden border border-gray-200 bg-white flex-shrink-0">
                       <img src={cat.image} alt="" className="w-full h-full object-cover" />
                    </div>
                    <span className={`text-sm uppercase tracking-wide text-left
                      ${activeCategory === cat.id ? 'font-extrabold text-gray-900' : 'font-bold text-gray-500 group-hover:text-gray-800'}
                    `}>
                      {cat.label}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-4 md:p-8 lg:p-12">
          
          <div className="mb-8">
            <h1 className="text-2xl md:text-4xl font-display font-bold text-brand-brown uppercase">
              {activeCategoryData?.label}
            </h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {filteredItems.map((item) => (
              <div 
                key={item.id} 
                onClick={() => setSelectedProduct(item)}
                className="group cursor-pointer flex flex-col items-center text-center animate-fade-in"
              >
                <div className="relative w-full aspect-square mb-4 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gray-50 rounded-full scale-90 group-hover:scale-100 transition-transform duration-300 ease-out -z-10" />
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-4/5 h-4/5 object-contain drop-shadow-lg transition-transform duration-300 group-hover:-translate-y-2"
                  />
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 uppercase mb-1">
                  {item.title}
                </h3>
                {item.calories && (
                   <span className="text-xs font-bold text-gray-500">{item.calories}</span>
                )}
              </div>
            ))}

            {filteredItems.length === 0 && (
               <div className="col-span-full py-20 text-center text-gray-400">
                 <p>No items found in this category.</p>
               </div>
            )}
          </div>

        </main>
      </div>
    </div>
  );
};

export default MenuPage;