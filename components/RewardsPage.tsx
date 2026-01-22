import React from 'react';
import { Gift, Star, Clock } from 'lucide-react';

interface RewardsPageProps {
  onNavigate: (page: string) => void;
}

const RewardsPage: React.FC<RewardsPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-brand-cream relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-brand-gold/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-red/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

      <div className="max-w-3xl mx-auto px-6 py-20 text-center relative z-10">
        
        <div className="flex justify-center mb-8">
           <div className="w-24 h-24 bg-brand-brown rounded-full flex items-center justify-center shadow-xl animate-bounce-slow">
              <Gift className="w-12 h-12 text-brand-gold" />
           </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-display font-bold text-brand-brown uppercase mb-6 tracking-tight">
          Rewards Are Coming Soon
        </h1>
        
        <p className="text-xl text-gray-600 mb-10 max-w-lg mx-auto leading-relaxed">
          We are cooking up something special. Soon, every bite will bring you closer to free food, exclusive deals, and VIP experiences.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center">
                <Star className="w-8 h-8 text-brand-gold mb-3" />
                <h3 className="font-bold text-brand-brown uppercase mb-1">Earn Points</h3>
                <p className="text-sm text-gray-500">Collect points on every order.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center">
                <Gift className="w-8 h-8 text-brand-red mb-3" />
                <h3 className="font-bold text-brand-brown uppercase mb-1">Get Free Food</h3>
                <p className="text-sm text-gray-500">Redeem for your favorites.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center">
                <Clock className="w-8 h-8 text-brand-brown mb-3" />
                <h3 className="font-bold text-brand-brown uppercase mb-1">Coming Soon</h3>
                <p className="text-sm text-gray-500">Launching later this year.</p>
            </div>
        </div>

        <button 
          onClick={() => onNavigate('menu')}
          className="bg-brand-red text-white font-display font-bold text-xl px-10 py-4 uppercase tracking-wider hover:bg-red-700 transition-colors shadow-lg"
        >
          Order Now While You Wait
        </button>
      </div>
    </div>
  );
};

export default RewardsPage;