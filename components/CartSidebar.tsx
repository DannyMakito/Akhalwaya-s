import React from 'react';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveItem: (id: string) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ 
  isOpen, 
  onClose, 
  cartItems, 
  onRemoveItem,
  onUpdateQuantity
}) => {
  
  // Updated to handle 'R' currency and spaces
  const parsePrice = (priceStr: string) => parseFloat(priceStr.replace(/[^0-9.]/g, ''));

  const subtotal = cartItems.reduce((acc, item) => {
    return acc + (parsePrice(item.price) * item.quantity);
  }, 0);

  const tax = subtotal * 0.15; // Adjusted to standard VAT (15% in ZA often used, or keep 8%) - keeping 15% as it is SA context (Rands)
  const total = subtotal + tax;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="absolute inset-y-0 right-0 max-w-md w-full flex">
        <div className="h-full w-full bg-white shadow-2xl flex flex-col animate-slide-in-right">
          
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50 flex-shrink-0">
            <h2 className="text-2xl font-display font-bold text-brand-brown uppercase flex items-center gap-2">
              <ShoppingBag className="w-6 h-6" />
              Your Order
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                  <ShoppingBag className="w-10 h-10 text-gray-400" />
                </div>
                <p className="text-gray-500 font-medium text-lg">Your bag is empty.</p>
                <button 
                  onClick={onClose}
                  className="text-brand-red font-bold uppercase tracking-wide border-b-2 border-brand-red hover:text-brand-brown hover:border-brand-brown transition-colors"
                >
                  Start Ordering
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 py-2 border-b border-gray-100 last:border-0">
                  {/* Image */}
                  <div className="w-20 h-20 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  
                  {/* Details Container */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div className="flex justify-between items-start gap-2">
                       <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-brand-brown uppercase text-sm leading-tight truncate">{item.title}</h3>
                          <p className="text-gray-500 text-xs mt-1 line-clamp-1">{item.description}</p>
                       </div>
                       <button 
                          onClick={() => onRemoveItem(item.id)}
                          className="text-gray-400 hover:text-brand-red transition-colors p-1 -mr-2"
                        >
                          <Trash2 className="w-4 h-4" />
                       </button>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-gray-300 rounded-md bg-white">
                        <button 
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="px-2 py-1 hover:bg-gray-100 text-gray-600 font-bold text-sm"
                        >-</button>
                        <span className="w-8 text-center text-sm font-bold text-gray-900">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="px-2 py-1 hover:bg-gray-100 text-gray-600 font-bold text-sm"
                        >+</button>
                      </div>
                      
                      {/* Price */}
                      <span className="font-bold text-brand-brown text-sm">
                        R {(parsePrice(item.price) * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer / Checkout */}
          {cartItems.length > 0 && (
            <div className="border-t border-gray-100 p-6 bg-gray-50 space-y-3 flex-shrink-0">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-bold text-gray-900">R {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax (15%)</span>
                <span className="font-bold text-gray-900">R {tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-brand-brown border-t border-gray-200 pt-4">
                <span>Total</span>
                <span>R {total.toFixed(2)}</span>
              </div>
              
              <button 
                onClick={() => alert("Checkout processed!")}
                className="w-full bg-brand-red text-white font-display font-bold text-xl py-4 uppercase tracking-wider hover:bg-red-700 transition-colors shadow-lg mt-2"
              >
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;