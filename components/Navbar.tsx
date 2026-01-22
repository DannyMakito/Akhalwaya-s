import React, { useState } from 'react';
import { Menu, X, ShoppingBag, User, MapPin } from 'lucide-react';
import { NAV_LINKS } from '../constants';

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  onOpenCart: () => void;
  onOpenLocation: () => void;
  cartCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ 
  onNavigate, 
  currentPage, 
  onOpenCart, 
  onOpenLocation,
  cartCount 
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
              <div className="w-12 h-12 rounded-full bg-brand-red flex items-center justify-center text-white font-bold text-2xl border-4 border-brand-brown group-hover:scale-105 transition-transform duration-200">
                A
              </div>
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
              <MapPin className="w-5 h-5 mr-1" />
              Find A Location
            </button>
            <a href="#signin" className="hidden sm:flex items-center text-xs font-bold text-gray-700 hover:text-brand-red uppercase">
              <User className="w-5 h-5 mr-1" />
              Sign In
            </a>
            
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
                 Find a Location
               </button>
               <a href="#signin" className="block px-3 py-3 text-lg font-medium text-gray-600 hover:text-brand-red">
                 Sign In / Join
               </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;