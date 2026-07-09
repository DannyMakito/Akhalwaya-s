import React from 'react';
import { Home, Utensils, ShoppingBag } from 'lucide-react';

interface MobileBottomNavProps {
  currentPage: string;
  cartCount: number;
  onNavigate: (page: string) => void;
  onOpenCart: () => void;
  isCartOpen: boolean;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentPage,
  cartCount,
  onNavigate,
  onOpenCart,
  isCartOpen,
}) => {
  // Determine which tab is visually active
  const isHomeActive = currentPage === 'home' && !isCartOpen;
  const isMenuActive = currentPage === 'menu' && !isCartOpen;
  const isCartActive = isCartOpen;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-3.5 py-2.5 bg-brand-cream/90 backdrop-blur-md border border-brand-brown/10 rounded-full shadow-[0_12px_36px_rgba(69,20,0,0.2)] md:hidden">
      {/* Home Tab */}
      {isHomeActive ? (
        <div className="bg-brand-red text-white flex items-center gap-2 px-5 py-2.5 rounded-full shadow-md animate-none">
          <Home className="w-5 h-5" />
          <span className="font-display font-extrabold text-xs uppercase tracking-wider">Home</span>
        </div>
      ) : (
        <button
          onClick={() => onNavigate('home')}
          className="bg-white text-brand-brown hover:bg-brand-cream w-11 h-11 rounded-full flex items-center justify-center shadow-sm border border-brand-brown/5 focus:outline-none transition-all duration-200 cursor-pointer"
          aria-label="Go to Home"
        >
          <Home className="w-5 h-5" />
        </button>
      )}

      {/* Menu Tab */}
      {isMenuActive ? (
        <div className="bg-brand-red text-white flex items-center gap-2 px-5 py-2.5 rounded-full shadow-md animate-none">
          <Utensils className="w-5 h-5" />
          <span className="font-display font-extrabold text-xs uppercase tracking-wider">Menu</span>
        </div>
      ) : (
        <button
          onClick={() => onNavigate('menu')}
          className="bg-white text-brand-brown hover:bg-brand-cream w-11 h-11 rounded-full flex items-center justify-center shadow-sm border border-brand-brown/5 focus:outline-none transition-all duration-200 cursor-pointer"
          aria-label="Go to Menu"
        >
          <Utensils className="w-5 h-5" />
        </button>
      )}

      {/* Cart Tab */}
      {isCartActive ? (
        <div className="bg-brand-red text-white flex items-center gap-2 px-5 py-2.5 rounded-full shadow-md animate-none relative">
          <ShoppingBag className="w-5 h-5" />
          <span className="font-display font-extrabold text-xs uppercase tracking-wider">Cart</span>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-brand-gold text-white font-extrabold text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-brand-red shadow-sm">
              {cartCount}
            </span>
          )}
        </div>
      ) : (
        <button
          onClick={onOpenCart}
          className="bg-white text-brand-brown hover:bg-brand-cream w-11 h-11 rounded-full flex items-center justify-center shadow-sm border border-brand-brown/5 focus:outline-none transition-all duration-200 cursor-pointer relative"
          aria-label="Open Cart"
        >
          <ShoppingBag className="w-5 h-5" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-brand-red text-white font-extrabold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
              {cartCount}
            </span>
          )}
        </button>
      )}
    </div>
  );
};

export default MobileBottomNav;
