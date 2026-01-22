import React from 'react';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-cream border-t border-gray-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 lg:col-span-2">
             <div className="flex items-center gap-2 mb-6">
               <div className="w-10 h-10 rounded-full bg-brand-red flex items-center justify-center text-white font-bold text-xl border-2 border-brand-brown">
                A
              </div>
              <span className="font-display text-xl font-bold text-brand-brown tracking-wide">
                AKHALWAYA'S
              </span>
            </div>
            <p className="text-gray-600 max-w-sm mb-6">
              Serving the authentic taste of tradition since 1985. Fresh ingredients, bold spices, and family recipes.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-brand-brown hover:text-brand-red"><Instagram className="w-6 h-6" /></a>
              <a href="#" className="text-brand-brown hover:text-brand-red"><Twitter className="w-6 h-6" /></a>
              <a href="#" className="text-brand-brown hover:text-brand-red"><Facebook className="w-6 h-6" /></a>
              <a href="#" className="text-brand-brown hover:text-brand-red"><Youtube className="w-6 h-6" /></a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-brand-brown uppercase mb-4 tracking-wider text-sm">Our Menu</h4>
            <ul className="space-y-3 text-gray-600 text-sm font-medium">
              <li><a href="#" className="hover:underline">Gatsbys</a></li>
              <li><a href="#" className="hover:underline">Curries</a></li>
              <li><a href="#" className="hover:underline">Burgers</a></li>
              <li><a href="#" className="hover:underline">Vegetarian</a></li>
              <li><a href="#" className="hover:underline">Sides</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-brand-brown uppercase mb-4 tracking-wider text-sm">Join Us</h4>
            <ul className="space-y-3 text-gray-600 text-sm font-medium">
              <li><a href="#" className="hover:underline">Careers</a></li>
              <li><a href="#" className="hover:underline">Franchising</a></li>
              <li><a href="#" className="hover:underline">Fundraising</a></li>
              <li><a href="#" className="hover:underline">Investors</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-brand-brown uppercase mb-4 tracking-wider text-sm">Support</h4>
            <ul className="space-y-3 text-gray-600 text-sm font-medium">
              <li><a href="#" className="hover:underline">Contact Us</a></li>
              <li><a href="#" className="hover:underline">FAQs</a></li>
              <li><a href="#" className="hover:underline">Gift Cards</a></li>
              <li><a href="#" className="hover:underline">Feedback</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-300 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500 font-medium">
            © 2026 Akhalwaya's Fast Food. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-xs text-gray-500 hover:text-brand-brown font-bold">Privacy Policy</a>
            <a href="#" className="text-xs text-gray-500 hover:text-brand-brown font-bold">Terms of Use</a>
            <a href="#" className="text-xs text-gray-500 hover:text-brand-brown font-bold">Accessibility</a>
            <a href="#" className="text-xs text-gray-500 hover:text-brand-brown font-bold">California Supply Chains Act</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;