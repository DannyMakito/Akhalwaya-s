import React, { useState, useEffect } from 'react';
import { X, Mail, Lock, User as UserIcon, Phone, AlertCircle, CheckCircle } from 'lucide-react';
import { User } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode: 'signin' | 'signup';
  onAuthSuccess: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode,
  onAuthSuccess,
}) => {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  
  // Form Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // State for alerts
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Sync mode with initialMode when modal opens
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setError(null);
      setSuccess(null);
      // Reset form
      setName('');
      setEmail('');
      setPhone('');
      setPassword('');
      setConfirmPassword('');
    }
  }, [isOpen, initialMode]);

  if (!isOpen) return null;

  // Pre-seed a demo user in localStorage if not already present
  const initializeUsers = () => {
    const existingUsers = localStorage.getItem('akhalwayas_users');
    if (!existingUsers) {
      const demoUser = {
        id: 'demo-1',
        name: 'Zayd Patel',
        email: 'demo@akhalwayas.co.za',
        phone: '+27 82 555 1234',
        password: 'password123', // stored simple for simulation
        points: 240,
        orderHistory: [
          {
            id: 'ord-101',
            date: '2026-06-25',
            items: [
              { title: 'The Great Gatsby', quantity: 1, price: 'R 145.00' },
              { title: 'Samosa Box', quantity: 1, price: 'R 60.00' }
            ],
            total: 'R 205.00',
            pointsEarned: 205
          }
        ]
      };
      localStorage.setItem('akhalwayas_users', JSON.stringify([demoUser]));
    }
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    initializeUsers();

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    const users = JSON.parse(localStorage.getItem('akhalwayas_users') || '[]');
    const matchedUser = users.find(
      (u: any) => u.email.toLowerCase().trim() === email.toLowerCase().trim()
    );

    if (!matchedUser) {
      setError('No account found with this email. Please try creating an account.');
      return;
    }

    if (matchedUser.password !== password) {
      setError('Incorrect password. Please try again.');
      return;
    }

    // Success!
    setSuccess(`Welcome back, ${matchedUser.name}!`);
    setTimeout(() => {
      onAuthSuccess({
        id: matchedUser.id,
        name: matchedUser.name,
        email: matchedUser.email,
        phone: matchedUser.phone,
        points: matchedUser.points,
        orderHistory: matchedUser.orderHistory || []
      });
      onClose();
    }, 1200);
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    initializeUsers();

    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all required fields.');
      return;
    }

    // Basic Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const users = JSON.parse(localStorage.getItem('akhalwayas_users') || '[]');
    const emailExists = users.some(
      (u: any) => u.email.toLowerCase().trim() === email.toLowerCase().trim()
    );

    if (emailExists) {
      setError('An account with this email already exists. Try signing in.');
      return;
    }

    // Create new user
    const newUser = {
      id: `usr-${Date.now()}`,
      name,
      email: email.toLowerCase().trim(),
      phone: phone || undefined,
      password,
      points: 100, // 100 bonus points for joining!
      orderHistory: []
    };

    users.push(newUser);
    localStorage.setItem('akhalwayas_users', JSON.stringify(users));

    setSuccess('Account created successfully! You earned 100 bonus points!');
    setTimeout(() => {
      onAuthSuccess({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        points: newUser.points,
        orderHistory: []
      });
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col sm:items-center sm:justify-center bg-white sm:bg-transparent overflow-y-auto sm:overflow-visible">
      {/* Overlay - Desktop Only */}
      <div 
        className="hidden sm:block absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />
      
      {/* Modal Container */}
      <div className="bg-white rounded-none w-full min-h-screen sm:min-h-0 sm:w-full sm:max-w-2xl sm:max-h-[620px] sm:shadow-2xl relative z-10 overflow-y-auto sm:overflow-hidden border-t-4 border-brand-red flex flex-col sm:flex-row animate-fade-in">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 hover:bg-gray-100 sm:hover:bg-gray-150 rounded-full text-gray-400 hover:text-brand-brown transition-colors z-30"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Brand Header (Left column on Desktop, top banner on Mobile) */}
        <div className="bg-brand-brown p-6 sm:p-10 text-center text-white relative flex flex-col justify-center items-center sm:w-5/12 sm:min-h-[500px]">
          <img 
            src="https://i.postimg.cc/R0fJGBfk/akhalwaya-logo-crest.png" 
            alt="Akhalwaya's Logo" 
            className="w-20 h-20 sm:w-24 sm:h-24 object-contain mx-auto mb-3 sm:mb-5"
            referrerPolicy="no-referrer"
          />
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-wider">AKHALWAYA'S</h2>
          <p className="text-brand-gold text-[10px] sm:text-xs font-bold tracking-widest uppercase mt-1">Authentic Fast Food</p>
        </div>

        {/* Form and Tabs Container (Right column on Desktop) */}
        <div className="flex-grow flex flex-col sm:w-7/12 bg-white sm:h-full sm:overflow-hidden">
          {/* Tab Toggle */}
          <div className="flex border-b border-gray-200 text-center">
            <button
              onClick={() => { setMode('signin'); setError(null); setSuccess(null); }}
              className={`flex-1 py-4 font-display font-bold uppercase tracking-wider text-sm transition-colors
                ${mode === 'signin' 
                  ? 'text-brand-red border-b-2 border-brand-red bg-gray-50' 
                  : 'text-gray-500 hover:text-brand-brown hover:bg-gray-50/50'
                }
              `}
            >
              Sign In
            </button>
            <button
              onClick={() => { setMode('signup'); setError(null); setSuccess(null); }}
              className={`flex-1 py-4 font-display font-bold uppercase tracking-wider text-sm transition-colors
                ${mode === 'signup' 
                  ? 'text-brand-red border-b-2 border-brand-red bg-gray-50' 
                  : 'text-gray-500 hover:text-brand-brown hover:bg-gray-50/50'
                }
              `}
            >
              Create Account
            </button>
          </div>

          {/* Content Area */}
          <div className="p-6 pb-20 sm:p-8 overflow-y-auto sm:max-h-[520px]">
            {/* Status Messages */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border-l-4 border-brand-red text-brand-red text-xs sm:text-sm flex gap-2.5 items-center rounded-r shadow-sm">
                <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span className="font-semibold">{error}</span>
              </div>
            )}
            {success && (
              <div className="mb-4 p-3 bg-green-50 border-l-4 border-emerald-500 text-emerald-800 text-xs sm:text-sm flex gap-2.5 items-center rounded-r shadow-sm">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span className="font-semibold">{success}</span>
              </div>
            )}

            {mode === 'signin' ? (
              <form onSubmit={handleSignIn} className="space-y-4">
                <p className="text-gray-500 text-xs text-center mb-4">
                  Sign in to earn points on your orders and claim hot rewards!
                </p>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-brand-brown mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. zayd@patel.co.za"
                      className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 focus:outline-none focus:border-brand-red focus:bg-white text-gray-900 text-sm transition-all font-sans"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-brand-brown mb-1">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 focus:outline-none focus:border-brand-red focus:bg-white text-gray-900 text-sm transition-all font-sans"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-red text-white font-display font-bold text-base py-3 uppercase tracking-wider hover:bg-brand-red/90 transition-colors shadow-md mt-4"
                >
                  Sign In
                </button>

               
              </form>
            ) : (
              <form onSubmit={handleSignUp} className="space-y-3.5">
                <p className="text-gray-500 text-xs text-center mb-3">
                  Join Akhalwaya's Rewards and get <strong className="text-brand-red">100 free bonus points</strong> instantly!
                </p>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-brand-brown mb-0.5">Full Name *</label>
                  <div className="relative">
                    <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Zayd Patel"
                      className="w-full pl-10 pr-4 py-1.5 bg-gray-50 border border-gray-300 focus:outline-none focus:border-brand-red focus:bg-white text-gray-900 text-sm transition-all font-sans"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-brand-brown mb-0.5">Email *</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. zayd@patel.co.za"
                      className="w-full pl-10 pr-4 py-1.5 bg-gray-50 border border-gray-300 focus:outline-none focus:border-brand-red focus:bg-white text-gray-900 text-sm transition-all font-sans"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-brand-brown mb-0.5">Mobile (Optional)</label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +27 82 555 1234"
                      className="w-full pl-10 pr-4 py-1.5 bg-gray-50 border border-gray-300 focus:outline-none focus:border-brand-red focus:bg-white text-gray-900 text-sm transition-all font-sans"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-brand-brown mb-0.5">Password *</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-1.5 bg-gray-50 border border-gray-300 focus:outline-none focus:border-brand-red focus:bg-white text-gray-900 text-sm transition-all font-sans"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-brand-brown mb-0.5">Confirm Password *</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-1.5 bg-gray-50 border border-gray-300 focus:outline-none focus:border-brand-red focus:bg-white text-gray-900 text-sm transition-all font-sans"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-red text-white font-display font-bold text-base py-2.5 uppercase tracking-wider hover:bg-brand-red/90 transition-colors shadow-md mt-3"
                >
                  Join Now
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
