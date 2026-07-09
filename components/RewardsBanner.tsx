import React from 'react';
import { Gift, ArrowRight } from 'lucide-react';
import { User } from '../types';

interface RewardsBannerProps {
  currentUser: User | null;
  onOpenAuth: (mode: 'signin' | 'signup') => void;
  onNavigate: (page: string) => void;
}

const RewardsBanner: React.FC<RewardsBannerProps> = ({ 
  currentUser, 
  onOpenAuth,
  onNavigate
}) => {
  return (
    <section className="bg-brand-cream py-16 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-center text-center md:text-left gap-8">
          
          {/* Icon/Graphic */}
          <div className="w-24 h-24 md:w-32 md:h-32 bg-brand-brown rounded-full flex items-center justify-center flex-shrink-0">
            <Gift className="w-12 h-12 md:w-16 md:h-16 text-brand-gold" />
          </div>

          {currentUser ? (
            <>
              {/* Text Content - Signed In */}
              <div className="flex-1">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-brown uppercase mb-2">
                  Welcome back, {currentUser.name.split(' ')[0]}!
                </h2>
                <p className="text-lg text-brand-brown/80 font-medium">
                  You currently have <strong className="text-brand-red text-2xl font-black">{currentUser.points}</strong> points.
                </p>
                {/* Progress bar to next reward (e.g. 300 pts) */}
                <div className="mt-4 max-w-md mx-auto md:mx-0 bg-white h-3 rounded-full overflow-hidden border border-brand-brown/10 flex">
                  <div 
                    className="bg-brand-red h-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (currentUser.points / 300) * 100)}%` }}
                  />
                </div>
                <p className="text-xs font-bold uppercase tracking-wider text-brand-brown/60 mt-1.5">
                  {currentUser.points >= 300 
                    ? "🎉 You have earned a FREE Mutton Curry or Smash Burger! Claim it below." 
                    : `${300 - currentUser.points} points until your next free Curry Bowl!`
                  }
                </p>
              </div>

              {/* Actions - Signed In */}
              <div className="w-full md:w-auto">
                <button 
                  onClick={() => onNavigate('rewards')}
                  className="bg-brand-brown text-brand-gold border-2 border-brand-brown px-8 py-3.5 font-display font-bold text-lg uppercase tracking-wider hover:bg-brand-brown/90 transition-colors w-full sm:w-auto flex items-center justify-center gap-2"
                >
                  My Rewards Dashboard
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Text Content - Signed Out */}
              <div className="flex-1">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-brown uppercase mb-2">
                  Join Akhalwaya's Rewards
                </h2>
                <p className="text-lg text-brand-brown/80 font-medium">
                  Earn points on every order. Unlock free food. Experience the VIP treatment.
                </p>
              </div>

              {/* Actions - Signed Out */}
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <button 
                  onClick={() => onOpenAuth('signup')}
                  className="bg-brand-brown text-brand-gold border-2 border-brand-brown px-8 py-3 font-display font-bold text-lg uppercase tracking-wider hover:bg-brand-brown/90 transition-colors w-full sm:w-auto"
                >
                  Create Account
                </button>
                <button 
                  onClick={() => onOpenAuth('signin')}
                  className="bg-transparent text-brand-brown border-2 border-brand-brown px-8 py-3 font-display font-bold text-lg uppercase tracking-wider hover:bg-brand-brown hover:text-brand-gold transition-colors w-full sm:w-auto"
                >
                  Sign In
                </button>
              </div>
            </>
          )}

        </div>
      </div>
    </section>
  );
};

export default RewardsBanner;