import React, { useState } from 'react';
import { X, Search, MapPin, Navigation } from 'lucide-react';
import { STORE_LOCATIONS } from '../constants';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LocationModal: React.FC<LocationModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filteredLocations = STORE_LOCATIONS.filter(loc => 
    loc.city.toLowerCase().includes(searchTerm.toLowerCase()) || 
    loc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      {/* Reduced height to h-[500px] as requested */}
      <div className="relative bg-white w-full max-w-5xl h-[500px] rounded-lg shadow-2xl flex flex-col md:flex-row overflow-hidden animate-fade-in-up">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/80 p-2 rounded-full hover:bg-white shadow-sm"
        >
          <X className="w-5 h-5 text-gray-900" />
        </button>

        {/* Sidebar / List */}
        <div className="w-full md:w-1/3 bg-white flex flex-col border-r border-gray-200">
          <div className="p-6 border-b border-gray-100 bg-brand-brown text-white">
            <h2 className="text-xl font-display font-bold uppercase mb-4">Find a Location</h2>
            <div className="relative">
              <input
                type="text"
                placeholder="City, State, or ZIP"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded text-gray-900 font-bold placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-gold"
              />
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredLocations.length === 0 ? (
               <div className="p-8 text-center text-gray-500">
                 <p>No locations found matching "{searchTerm}"</p>
               </div>
            ) : (
              filteredLocations.map((location) => (
                <div key={location.id} className="p-5 border-b border-gray-100 hover:bg-gray-50 transition-colors group">
                  <h3 className="font-bold text-md text-brand-brown uppercase mb-1">{location.name}</h3>
                  <p className="text-sm text-gray-600 mb-1">{location.address}</p>
                  <p className="text-sm text-gray-600 mb-2">{location.city}</p>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    <span className="text-xs font-bold text-green-600 uppercase">{location.status}</span>
                    <span className="text-gray-300">|</span>
                    <span className="text-xs text-gray-500">{location.phone}</span>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 bg-brand-brown text-white py-2 text-xs font-bold uppercase tracking-wide hover:bg-brand-brown/90 transition-colors">
                      Order Here
                    </button>
                    <button className="flex items-center justify-center px-3 border border-gray-300 hover:bg-gray-100 transition-colors">
                      <Navigation className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="hidden md:block w-2/3 bg-gray-100 relative">
          <img 
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2400&auto=format&fit=crop" 
            alt="Map View"
            className="w-full h-full object-cover grayscale opacity-50" 
          />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
             <div className="bg-white/90 p-6 rounded-lg shadow-lg text-center backdrop-blur-sm">
                <MapPin className="w-10 h-10 text-brand-red mx-auto mb-2" />
                <h3 className="font-bold text-gray-900 uppercase">Map View</h3>
                <p className="text-sm text-gray-600">Showing {filteredLocations.length} locations nearby</p>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LocationModal;