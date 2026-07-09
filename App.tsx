import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import RewardsBanner from './components/RewardsBanner';
import DualPromo from './components/DualPromo';
import MenuGrid from './components/MenuGrid';
import Footer from './components/Footer';
import MenuPage from './components/MenuPage';
import CartSidebar from './components/CartSidebar';
import LocationModal from './components/LocationModal';
import { RewardsPage } from './components/RewardsPage';
import AboutPage from './components/AboutPage';
import { AuthModal } from './components/AuthModal';
import MobileBottomNav from './components/MobileBottomNav';
import { DetailedMenuItem, CartItem, User, UserOrder, StoreLocation } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [menuTargetCategory, setMenuTargetCategory] = useState<string | undefined>(undefined);
  
  // Auth State
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signin');

  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Location Modal State
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<StoreLocation | null>(() => {
    const saved = localStorage.getItem('akhalwayas_selected_location');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  const handleSelectLocation = (location: StoreLocation) => {
    setSelectedLocation(location);
    localStorage.setItem('akhalwayas_selected_location', JSON.stringify(location));
    setIsLocationModalOpen(false);
    handleNavigate('menu');
  };

  // Load user session on mount
  useEffect(() => {
    const session = localStorage.getItem('akhalwayas_logged_in_user');
    if (session) {
      try {
        setCurrentUser(JSON.parse(session));
      } catch (e) {
        console.error('Error loading session:', e);
      }
    }
  }, []);

  const handleNavigate = (page: string, category?: string) => {
    setCurrentPage(page);
    setMenuTargetCategory(category);
    setIsCartOpen(false);
    window.scrollTo(0, 0);
  };

  const handleOpenAuth = (mode: 'signin' | 'signup') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleAuthSuccess = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('akhalwayas_logged_in_user', JSON.stringify(user));
  };

  const handleSignOut = () => {
    setCurrentUser(null);
    localStorage.removeItem('akhalwayas_logged_in_user');
  };

  const handleUpdateUser = (updatedUser: User) => {
    setCurrentUser(updatedUser);
    localStorage.setItem('akhalwayas_logged_in_user', JSON.stringify(updatedUser));
    
    // Also update in all users array
    const users = JSON.parse(localStorage.getItem('akhalwayas_users') || '[]');
    const updatedUsers = users.map((u: any) => u.id === updatedUser.id ? { ...u, ...updatedUser } : u);
    localStorage.setItem('akhalwayas_users', JSON.stringify(updatedUsers));
  };

  const handleCheckoutSuccess = (pointsEarned: number, items: { title: string; quantity: number; price: string }[]) => {
    if (!currentUser) return;

    const newOrder: UserOrder = {
      id: `ord-${Date.now().toString().slice(-4)}`,
      date: new Date().toISOString().split('T')[0],
      items,
      total: `R ${pointsEarned.toFixed(2)}`,
      pointsEarned: Math.round(pointsEarned)
    };

    const updatedUser: User = {
      ...currentUser,
      points: currentUser.points + Math.round(pointsEarned),
      orderHistory: [newOrder, ...currentUser.orderHistory]
    };

    handleUpdateUser(updatedUser);
    setCartItems([]); // Clear cart
  };

  const handleClaimReward = (itemName: string, pointsCost: number) => {
    if (!currentUser) return;
    if (currentUser.points < pointsCost) {
      alert(`You need ${pointsCost - currentUser.points} more points to claim this reward.`);
      return;
    }

    // Deduct points
    const updatedUser: User = {
      ...currentUser,
      points: currentUser.points - pointsCost
    };
    handleUpdateUser(updatedUser);

    // Create a special detailed menu item for the reward
    const rewardItem: DetailedMenuItem = {
      id: `reward-${Date.now()}`,
      categoryId: 'sides',
      title: `[REWARD] ${itemName}`,
      description: 'Loyalty Reward Item',
      longDescription: 'Claimed using Akhalwaya\'s loyalty points.',
      price: 'R 0.00',
      calories: '0 kCal',
      image: itemName.includes('Samosa') 
        ? 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop'
        : itemName.includes('Curry')
        ? 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=800&auto=format&fit=crop'
        : 'https://images.unsplash.com/photo-1626074353765-517a681e40be?q=80&w=800&auto=format&fit=crop',
      ingredients: []
    };

    addToCart(rewardItem);
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
      return (
        <RewardsPage 
          onNavigate={handleNavigate} 
          currentUser={currentUser}
          onOpenAuth={handleOpenAuth}
          onUpdateUser={handleUpdateUser}
          onClaimReward={handleClaimReward}
        />
      );
    }

    if (currentPage === 'about') {
      return <AboutPage />;
    }

    // Home Page View
    return (
      <>
        <Hero onNavigate={handleNavigate} />
        <RewardsBanner 
          currentUser={currentUser}
          onOpenAuth={handleOpenAuth}
          onNavigate={handleNavigate}
        />
        <DualPromo onNavigate={handleNavigate} />
        <MenuGrid onNavigate={handleNavigate} />
        
        {/* Crowd Pleaser / Catering Section (Bottom Promo) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mb-12">
          <div className="bg-brand-brown rounded-none overflow-hidden text-white flex flex-col md:flex-row shadow-xl">
             <div className="md:w-1/2 relative h-64 md:h-auto">
               <img 
                src="https://i.postimg.cc/288HtH0B/Catered-Breakfasts-Pastries-Coffee-Tea-Stations.jpg" 
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
                   <button 
                     onClick={() => handleNavigate('menu', 'catering')}
                     className="bg-brand-gold text-brand-brown font-display font-bold text-lg px-8 py-3 uppercase tracking-wider hover:bg-white transition-colors cursor-pointer"
                   >
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
        currentUser={currentUser}
        onOpenAuth={handleOpenAuth}
        onSignOut={handleSignOut}
        selectedLocationName={selectedLocation ? selectedLocation.city : null}
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
        currentUser={currentUser}
        onOpenAuth={handleOpenAuth}
        onCheckoutSuccess={handleCheckoutSuccess}
      />
 
      <LocationModal 
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        onSelectLocation={handleSelectLocation}
        selectedLocationId={selectedLocation ? selectedLocation.id : null}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authModalMode}
        onAuthSuccess={handleAuthSuccess}
      />

      {!isAuthModalOpen && (
        <MobileBottomNav 
          currentPage={currentPage}
          cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
          onNavigate={handleNavigate}
          onOpenCart={() => setIsCartOpen(true)}
          onCloseCart={() => setIsCartOpen(false)}
          isCartOpen={isCartOpen}
        />
      )}
    </div>
  );
};

export default App;