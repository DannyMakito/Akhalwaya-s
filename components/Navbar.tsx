import React, { useState } from 'react';
import { Menu, X, ShoppingBag, User as UserIcon, MapPin } from 'lucide-react';
import { NAV_LINKS } from '../constants';
import { User } from '../types';

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  onOpenCart: () => void;
  onOpenLocation: () => void;
  cartCount: number;
  currentUser: User | null;
  onOpenAuth: (mode: 'signin' | 'signup') => void;
  onSignOut: () => void;
  selectedLocationName?: string | null;
}

const Navbar: React.FC<NavbarProps> = ({ 
  onNavigate, 
  currentPage, 
  onOpenCart, 
  onOpenLocation,
  cartCount,
  currentUser,
  onOpenAuth,
  onSignOut,
  selectedLocationName
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (href: string) => {
    // Treat all main navigation links as pages
    onNavigate(href);
    setIsOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Section */}
          <div className="flex items-center">
            <button onClick={() => handleNavClick('home')} className="flex-shrink-0 flex items-center gap-2 group focus:outline-none">
              <img 
                src="https://i.postimg.cc/R0fJGBfk/akhalwaya-logo-crest.png" 
                alt="Akhalwaya's Logo" 
                className="w-14 h-14 object-contain group-hover:scale-105 transition-transform duration-200"
                referrerPolicy="no-referrer"
              />
              <span className="hidden md:block font-display text-2xl font-bold text-brand-brown tracking-wide">
                AKHALWAYA'S
              </span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className={`text-base font-bold transition-colors uppercase tracking-wide
                  ${currentPage === link.href ? 'text-brand-red border-b-2 border-brand-red' : 'text-gray-900 hover:text-brand-red'}
                `}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center space-x-6">
             <button 
               onClick={onOpenLocation}
               className="hidden lg:flex items-center text-xs font-bold text-gray-700 hover:text-brand-red uppercase focus:outline-none"
             >
              <MapPin className={`w-5 h-5 mr-1.5 ${selectedLocationName ? 'text-brand-red fill-brand-red/10 animate-pulse' : ''}`} />
              {selectedLocationName ? (
                <span className="flex flex-col items-start leading-none text-left">
                  <span className="text-[9px] text-gray-400 font-bold tracking-wider lowercase">ordering from</span>
                  <span className="text-brand-brown font-extrabold tracking-wide uppercase text-xs">{selectedLocationName}</span>
                </span>
              ) : (
                "Find A Location"
              )}
            </button>
            
            {currentUser ? (
              <div className="relative group hidden sm:block">
                <button className="flex items-center text-xs font-bold text-gray-700 hover:text-brand-red uppercase focus:outline-none py-2">
                  <UserIcon className="w-5 h-5 mr-1 text-brand-red" />
                  Hi, {currentUser.name.split(' ')[0]}
                </button>
                <div className="absolute right-0 top-full mt-1 w-48 bg-white shadow-xl border border-gray-100 py-2 hidden group-hover:block z-50 rounded-none">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Your Balance</p>
                    <p className="text-sm font-bold text-brand-brown">{currentUser.points} Points</p>
                  </div>
                  <button 
                    onClick={() => onNavigate('rewards')}
                    className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 font-medium"
                  >
                    My Rewards
                  </button>
                  <button 
                    onClick={onSignOut}
                    className="w-full text-left px-4 py-2.5 text-sm text-brand-red hover:bg-gray-50 font-bold border-t border-gray-50"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <button 
                onClick={() => onOpenAuth('signin')}
                className="hidden sm:flex items-center text-xs font-bold text-gray-700 hover:text-brand-red uppercase focus:outline-none"
              >
                <UserIcon className="w-5 h-5 mr-1" />
                Sign In
              </button>
            )}
            
            {/* Cart Button */}
            <button 
              onClick={onOpenCart}
              className="relative text-gray-900 hover:text-brand-red transition-colors focus:outline-none"
            >
              <ShoppingBag className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-red text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-brand-red focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full left-0 shadow-lg h-screen z-40">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="block w-full text-left px-3 py-4 text-xl font-bold text-gray-900 hover:text-brand-red hover:bg-gray-50 uppercase border-b border-gray-100"
              >
                {link.label}
              </button>
            ))}
            <div className="mt-4 pt-4">
               <button 
                 onClick={() => { onOpenLocation(); setIsOpen(false); }}
                 className="block w-full text-left px-3 py-3 text-lg font-medium text-gray-600 hover:text-brand-red"
               >
                 {selectedLocationName ? (
                   <span className="flex items-center gap-2">
                     <MapPin className="w-5 h-5 text-brand-red fill-brand-red/10" />
                     <span>Ordering from: <strong className="text-brand-brown uppercase">{selectedLocationName}</strong></span>
                   </span>
                 ) : (
                   "Find a Location"
                 )}
               </button>
               
               {currentUser ? (
                 <div className="px-3 py-3 border-t border-gray-100 mt-2">
                   <p className="text-sm text-gray-500">Logged in as <strong className="text-brand-brown">{currentUser.name}</strong></p>
                   <p className="text-sm text-brand-red font-bold mt-1 mb-3">{currentUser.points} Points Available</p>
                   <div className="flex gap-4">
                     <button 
                       onClick={() => { onNavigate('rewards'); setIsOpen(false); }}
                       className="flex-1 text-center bg-gray-100 py-2.5 font-bold text-xs uppercase text-brand-brown"
                     >
                       My Rewards
                     </button>
                     <button 
                       onClick={() => { onSignOut(); setIsOpen(false); }}
                       className="flex-1 text-center bg-brand-red text-white py-2.5 font-bold text-xs uppercase"
                     >
                       Sign Out
                     </button>
                   </div>
                 </div>
               ) : (
                 <button 
                   onClick={() => { onOpenAuth('signin'); setIsOpen(false); }}
                   className="block w-full text-left px-3 py-3 text-lg font-medium text-gray-600 hover:text-brand-red focus:outline-none"
                 >
                   Sign In / Join
                 </button>
               )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;