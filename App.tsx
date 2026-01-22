import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import RewardsBanner from './components/RewardsBanner';
import DualPromo from './components/DualPromo';
import MenuGrid from './components/MenuGrid';
import Footer from './components/Footer';
import MenuPage from './components/MenuPage';
import CartSidebar from './components/CartSidebar';
import LocationModal from './components/LocationModal';
import RewardsPage from './components/RewardsPage';
import AboutPage from './components/AboutPage';
import { DetailedMenuItem, CartItem } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [menuTargetCategory, setMenuTargetCategory] = useState<string | undefined>(undefined);
  
  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Location Modal State
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  const handleNavigate = (page: string, category?: string) => {
    setCurrentPage(page);
    setMenuTargetCategory(category);
    window.scrollTo(0, 0);
  };

  const addToCart = (product: DetailedMenuItem) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const renderContent = () => {
    if (currentPage === 'menu') {
      return (
        <MenuPage 
          initialCategory={menuTargetCategory} 
          onAddToCart={addToCart}
        />
      );
    }

    if (currentPage === 'rewards') {
      return <RewardsPage onNavigate={handleNavigate} />;
    }

    if (currentPage === 'about') {
      return <AboutPage />;
    }

    // Home Page View
    return (
      <>
        <Hero onNavigate={handleNavigate} />
        <RewardsBanner />
        <DualPromo />
        <MenuGrid onNavigate={handleNavigate} />
        
        {/* Crowd Pleaser / Catering Section (Bottom Promo) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mb-12">
          <div className="bg-brand-brown rounded-none overflow-hidden text-white flex flex-col md:flex-row shadow-xl">
             <div className="md:w-1/2 relative h-64 md:h-auto">
               <img 
                src="https://images.unsplash.com/photo-1541544744-378ca6e80422?q=80&w=1200&auto=format&fit=crop" 
                alt="Catering"
                className="w-full h-full object-cover"
               />
               <div className="absolute inset-0 bg-brand-brown/20"></div>
             </div>
             <div className="md:w-1/2 p-12 flex flex-col justify-center text-center md:text-left">
                <h3 className="font-display font-bold text-4xl mb-4 uppercase">Catering for any Occasion</h3>
                <p className="text-lg mb-8 text-gray-200">
                  From office lunches to wedding receptions, bring the flavor of Akhalwaya's to your next event. Buffet style or individual boxes available.
                </p>
                <div>
                   <button className="bg-brand-gold text-brand-brown font-display font-bold text-lg px-8 py-3 uppercase tracking-wider hover:bg-white transition-colors">
                    View Catering Menu
                  </button>
                </div>
             </div>
          </div>
        </section>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar 
        onNavigate={(page) => handleNavigate(page)} 
        currentPage={currentPage}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenLocation={() => setIsLocationModalOpen(true)}
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
      />
      
      <main className="flex-grow">
        {renderContent()}
      </main>
      
      <Footer />

      {/* Modals */}
      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cartItems}
        onRemoveItem={removeFromCart}
        onUpdateQuantity={updateQuantity}
      />

      <LocationModal 
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
      />
    </div>
  );
};

export default App;