import React from 'react';
import { Gift } from 'lucide-react';

const RewardsBanner: React.FC = () => {
  return (
    <section className="bg-brand-cream py-16 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-center text-center md:text-left gap-8">
          
          {/* Icon/Graphic */}
          <div className="w-24 h-24 md:w-32 md:h-32 bg-brand-brown rounded-full flex items-center justify-center flex-shrink-0">
            <Gift className="w-12 h-12 md:w-16 md:h-16 text-brand-gold" />
          </div>

          {/* Text Content */}
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-brown uppercase mb-2">
              Join Akhalwaya's Rewards
            </h2>
            <p className="text-lg text-brand-brown/80 font-medium">
              Earn points on every order. Unlock free food. Experience the VIP treatment.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <button className="bg-brand-brown text-brand-gold border-2 border-brand-brown px-8 py-3 font-display font-bold text-lg uppercase tracking-wider hover:bg-brand-brown/90 transition-colors w-full sm:w-auto">
              Create Account
            </button>
            <button className="bg-transparent text-brand-brown border-2 border-brand-brown px-8 py-3 font-display font-bold text-lg uppercase tracking-wider hover:bg-brand-brown hover:text-brand-gold transition-colors w-full sm:w-auto">
              Sign In
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default RewardsBanner;