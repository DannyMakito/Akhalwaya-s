import React, { useState } from 'react';
import { Gift, Star, Clock, Ticket, ShoppingBag, Plus, Sparkles, CheckCircle, AlertCircle } from 'lucide-react';
import { User } from '../types';

interface RewardsPageProps {
  onNavigate: (page: string) => void;
  currentUser: User | null;
  onOpenAuth: (mode: 'signin' | 'signup') => void;
  onUpdateUser: (user: User) => void;
  onClaimReward: (itemName: string, pointsCost: number) => void;
}

export const RewardsPage: React.FC<RewardsPageProps> = ({
  onNavigate,
  currentUser,
  onOpenAuth,
  onUpdateUser,
  onClaimReward,
}) => {
  // Promo code state
  const [promoCode, setPromoCode] = useState('');
  const [promoSuccess, setPromoSuccess] = useState<string | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoSuccess(null);
    setPromoError(null);

    if (!currentUser) {
      setPromoError('You must be signed in to claim promo codes.');
      return;
    }

    const code = promoCode.toUpperCase().trim();
    let pointsToAdd = 0;
    let message = '';

    if (code === 'GATSBYLOVE') {
      pointsToAdd = 150;
      message = 'MASALA STEAK LOVE! 150 points added to your account!';
    } else if (code === 'WELCOME100') {
      pointsToAdd = 100;
      message = 'Welcome to the family! 100 points added to your account!';
    } else if (code === 'FREECHIPS') {
      pointsToAdd = 50;
      message = 'Hot chips on the way! 50 points added to your account!';
    } else {
      setPromoError('Invalid promo code. Try "GATSBYLOVE", "WELCOME100", or "FREECHIPS"!');
      return;
    }

    const updatedUser: User = {
      ...currentUser,
      points: currentUser.points + pointsToAdd
    };

    onUpdateUser(updatedUser);
    setPromoSuccess(message);
    setPromoCode('');
  };

  const rewardsList = [
    {
      id: 'r-samosa',
      title: 'Free Samosa Box',
      description: '6 crispy golden samosas with your choice of beef, chicken, or cheese filling.',
      pointsCost: 150,
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=400&auto=format&fit=crop',
    },
    {
      id: 'r-curry',
      title: 'Free Durban Curry Bowl',
      description: 'Slow-cooked Durban-style mutton curry served over fluffy basmati rice.',
      pointsCost: 300,
      image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=400&auto=format&fit=crop',
    },
    {
      id: 'r-gatsby',
      title: 'Free Signature Gatsby',
      description: 'The legendary foot-long masala steak gatsby packed with hand-cut slap chips.',
      pointsCost: 500,
      image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?q=80&w=400&auto=format&fit=crop',
    }
  ];

  if (!currentUser) {
    // Signed-Out View (Aesthetic invitation to join the Rewards club)
    return (
      <div className="min-h-[85vh] bg-brand-cream relative overflow-hidden py-16">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-brand-gold/10 rounded-full blur-3xl -translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-red/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          
          {/* Main Hero Card */}
          <div className="bg-white border-t-4 border-brand-red shadow-xl p-8 md:p-12 text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-brand-brown rounded-full flex items-center justify-center text-brand-gold shadow-lg">
                <Gift className="w-10 h-10" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-display font-black text-brand-brown uppercase tracking-tight mb-4">
              Akhalwaya's Rewards Club
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
              Experience South African flavors and get rewarded for every bite. Join today to instantly claim <strong className="text-brand-red font-bold">100 bonus points</strong> and unlock free food, exclusive member pricing, and VIP treats.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <button 
                onClick={() => onOpenAuth('signup')}
                className="flex-1 bg-brand-red text-white font-display font-bold text-lg py-4 px-8 uppercase tracking-wider hover:bg-brand-red/90 transition-colors shadow-md"
              >
                Join Now (Free)
              </button>
              <button 
                onClick={() => onOpenAuth('signin')}
                className="flex-1 bg-brand-brown text-brand-gold border-2 border-brand-brown font-display font-bold text-lg py-4 px-8 uppercase tracking-wider hover:bg-brand-brown/90 hover:text-white transition-colors shadow-md"
              >
                Sign In
              </button>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 border border-gray-100 shadow-sm text-center flex flex-col items-center">
              <div className="w-12 h-12 bg-brand-cream text-brand-red rounded-full flex items-center justify-center mb-4">
                <Star className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-xl text-brand-brown uppercase mb-2">Earn 1x Points</h3>
              <p className="text-gray-500 text-sm">
                Get 1 points for every R 1 spent on our website. Watch your points balance grow instantly with every delicious bite.
              </p>
            </div>

            <div className="bg-white p-8 border border-gray-100 shadow-sm text-center flex flex-col items-center">
              <div className="w-12 h-12 bg-brand-cream text-brand-gold rounded-full flex items-center justify-center mb-4">
                <Gift className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-xl text-brand-brown uppercase mb-2">Claim Free Food</h3>
              <p className="text-gray-500 text-sm">
                Redeem your hard-earned points for legendary foot-long baguettes, Durban mutton curries, golden samosas, and more.
              </p>
            </div>

            <div className="bg-white p-8 border border-gray-100 shadow-sm text-center flex flex-col items-center">
              <div className="w-12 h-12 bg-brand-cream text-brand-brown rounded-full flex items-center justify-center mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-xl text-brand-brown uppercase mb-2">VIP Special Offers</h3>
              <p className="text-gray-500 text-sm">
                Unlock member-only discount codes, private catering packages, and priority online ordering slots at your local branch.
              </p>
            </div>
          </div>

        </div>
      </div>
    );
  }

  // Signed-In Dashboard View
  const pointsToNextReward = currentUser.points >= 500 
    ? 0 
    : currentUser.points >= 300 
    ? 500 - currentUser.points 
    : currentUser.points >= 150 
    ? 300 - currentUser.points 
    : 150 - currentUser.points;

  const nextRewardName = currentUser.points >= 500 
    ? 'Maximum Rewards Unlocked!' 
    : currentUser.points >= 300 
    ? 'Free Signature Gatsby (500 pts)' 
    : currentUser.points >= 150 
    ? 'Free Durban Curry Bowl (300 pts)' 
    : 'Free Samosa Box (150 pts)';

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* User Stats Card */}
        <div className="bg-brand-brown text-white p-8 md:p-10 mb-12 shadow-xl flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-red/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
          
          <div className="space-y-3 text-center md:text-left z-10">
            <span className="bg-brand-gold text-brand-brown text-[10px] font-black tracking-widest px-3 py-1 uppercase">
              REWARDS CLUB MEMBER
            </span>
            <h1 className="text-3xl md:text-5xl font-display font-black uppercase">
              HI, {currentUser.name}!
            </h1>
            <p className="text-gray-300 text-sm font-medium">
              Member Email: <span className="text-white font-mono">{currentUser.email}</span> {currentUser.phone && `• Phone: ${currentUser.phone}`}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-6 border border-white/10 text-center min-w-[240px] z-10 flex flex-col justify-center items-center">
            <Sparkles className="w-6 h-6 text-brand-gold mb-1 animate-pulse" />
            <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">Available Balance</span>
            <span className="text-5xl font-display font-black text-brand-gold my-1">{currentUser.points}</span>
            <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">LOYALTY POINTS</span>
          </div>
        </div>

        {/* Progress Card & Promo Code */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          
          {/* Progress Card */}
          <div className="lg:col-span-2 bg-white p-6 border border-gray-200 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="font-display font-bold text-xl text-brand-brown uppercase mb-2 flex items-center gap-2">
                <Star className="w-5 h-5 text-brand-gold" />
                Your Loyalty Progress
              </h3>
              <p className="text-gray-500 text-sm mb-4">
                Redeem points for signature delicacies. Earn points automatically on checkout when ordering.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-xs font-bold text-brand-brown uppercase">
                <span>0 Pts</span>
                <span className="text-brand-red font-black">Next Milestone: {nextRewardName}</span>
                <span>500 Pts</span>
              </div>
              
              {/* Progress Track */}
              <div className="bg-gray-100 h-4 rounded-full overflow-hidden border border-gray-200 p-0.5 shadow-inner">
                <div 
                  className="bg-brand-red h-full rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${Math.min(100, (currentUser.points / 500) * 100)}%` }}
                />
              </div>

              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500 font-medium">
                  {pointsToNextReward > 0 
                    ? `You are ${pointsToNextReward} points away from: ${nextRewardName.split('(')[0].trim()}`
                    : 'Maximum reward tier reached! Enjoy your luxury treats!'
                  }
                </span>
                <span className="text-sm font-bold text-brand-red">{Math.round((currentUser.points / 500) * 100)}% Complete</span>
              </div>
            </div>
          </div>

          {/* Claim Promo Code Box */}
          <div className="bg-white p-6 border border-gray-200 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="font-display font-bold text-xl text-brand-brown uppercase mb-1 flex items-center gap-2">
                <Ticket className="w-5 h-5 text-brand-red" />
                Claim Promo Points
              </h3>
              <p className="text-gray-500 text-xs mb-4">
                Got a secret code? Enter it below to claim instant loyalty points.
              </p>
            </div>

            <form onSubmit={handleApplyPromo} className="space-y-3">
              <div>
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="e.g. GATSBYLOVE"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 focus:outline-none focus:border-brand-red focus:bg-white text-gray-900 font-bold uppercase tracking-wider text-center"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-brand-brown text-brand-gold font-display font-bold py-2.5 uppercase text-sm tracking-wider hover:bg-brand-brown/90 transition-colors"
              >
                Claim Points
              </button>
            </form>

            {/* Success / Error Alerts */}
            {promoSuccess && (
              <div className="mt-3 p-2 bg-green-50 border-l-4 border-emerald-500 text-emerald-800 text-xs flex gap-2 items-center">
                <CheckCircle className="w-4 h-4 flex-shrink-0" />
                <span>{promoSuccess}</span>
              </div>
            )}
            {promoError && (
              <div className="mt-3 p-2 bg-red-50 border-l-4 border-brand-red text-brand-red text-xs flex gap-2 items-center">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{promoError}</span>
              </div>
            )}
          </div>

        </div>

        {/* Claim Rewards Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-display font-black text-brand-brown uppercase tracking-tight mb-6 text-center md:text-left">
            Redeem Points For Free Food
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {rewardsList.map((reward) => {
              const canRedeem = currentUser.points >= reward.pointsCost;
              return (
                <div 
                  key={reward.id}
                  className={`bg-white border shadow-sm overflow-hidden flex flex-col justify-between transition-all duration-300
                    ${canRedeem 
                      ? 'border-brand-gold/50 hover:border-brand-gold hover:shadow-lg' 
                      : 'border-gray-200 opacity-80'
                    }
                  `}
                >
                  <div className="relative h-48 bg-gray-100">
                    <img 
                      src={reward.image} 
                      alt={reward.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-brand-brown text-brand-gold font-display font-bold px-3 py-1 text-sm uppercase tracking-wider">
                      {reward.pointsCost} Points
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div className="space-y-2 mb-6">
                      <h3 className="font-display font-bold text-xl text-brand-brown uppercase leading-snug">
                        {reward.title}
                      </h3>
                      <p className="text-gray-500 text-xs leading-relaxed">
                        {reward.description}
                      </p>
                    </div>

                    <button
                      onClick={() => onClaimReward(reward.title, reward.pointsCost)}
                      disabled={!canRedeem}
                      className={`w-full py-3 font-display font-bold uppercase text-sm tracking-wider shadow-sm transition-all
                        ${canRedeem 
                          ? 'bg-brand-red hover:bg-red-700 text-white cursor-pointer hover:scale-[1.02]' 
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }
                      `}
                    >
                      {canRedeem ? 'Claim Reward' : `Locked (Need ${reward.pointsCost - currentUser.points} pts)`}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Order History Section */}
        <section className="bg-white border border-gray-200 shadow-sm p-6 md:p-8">
          <h3 className="font-display font-bold text-2xl text-brand-brown uppercase mb-6 flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-brand-red" />
            Your Order & Tally History
          </h3>

          {!currentUser.orderHistory || currentUser.orderHistory.length === 0 ? (
            <div className="py-12 text-center text-gray-400 font-medium">
              <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-base text-gray-500">You haven't placed any orders yet.</p>
              <p className="text-xs text-gray-400 mt-1">Order delicious meals from our menu to earn instant rewards points!</p>
              <button 
                onClick={() => onNavigate('menu')}
                className="mt-4 bg-brand-red text-white px-6 py-2 font-display font-bold uppercase tracking-wider text-xs hover:bg-brand-brown transition-colors"
              >
                Go To Menu
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {currentUser.orderHistory.map((order) => (
                <div key={order.id} className="border border-gray-100 bg-gray-50 p-4 sm:p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-display font-black text-brand-brown text-lg uppercase">
                        Order #{order.id}
                      </span>
                      <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 font-bold">
                        {order.date}
                      </span>
                      <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 font-black flex items-center gap-1">
                        <Plus className="w-3 h-3" />
                        {order.pointsEarned} Points
                      </span>
                    </div>
                    
                    {/* Item list */}
                    <div className="text-sm text-gray-500 space-y-0.5">
                      {order.items.map((it, idx) => (
                        <p key={idx} className="font-medium text-gray-600">
                          {it.quantity}x {it.title} <span className="text-xs text-gray-400">({it.price})</span>
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="text-right w-full md:w-auto border-t md:border-t-0 border-gray-200 pt-3 md:pt-0">
                    <span className="text-xs text-gray-400 font-bold block">Total Amount</span>
                    <span className="font-display font-black text-xl text-brand-brown block">{order.total}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  );
};
