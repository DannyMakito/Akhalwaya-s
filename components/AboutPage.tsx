import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-white animate-fade-in">
      
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-brand-brown flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1542345812-d98b5cd6cf98?q=80&w=2500&auto=format&fit=crop" 
            alt="Spices" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-brown via-transparent to-transparent"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <span className="block text-brand-gold font-bold tracking-[0.3em] text-sm uppercase mb-4 animate-fade-in-up">
            Our Heritage
          </span>
          <h1 className="text-5xl md:text-7xl font-display font-extrabold uppercase mb-6 leading-none">
            Tradition in <br/> Every Bite
          </h1>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2">
             <h2 className="text-4xl font-display font-bold text-brand-brown uppercase mb-6">Since 1985</h2>
             <div className="w-24 h-1 bg-brand-red mb-8"></div>
             <p className="text-lg text-gray-700 leading-relaxed mb-6">
               It all started with a small corner shop and a secret family spice blend. Akhalwaya's wasn't just built on food; it was built on a promise to serve the community with authentic, heart-warming meals that tasted like home.
             </p>
             <p className="text-lg text-gray-700 leading-relaxed">
               Decades later, while we've grown, our philosophy remains unchanged. We still hand-cut our chips, grind our spices daily, and build every Gatsby with the same generosity and care as we did on day one.
             </p>
          </div>
          <div className="md:w-1/2 relative">
             <div className="absolute top-4 left-4 w-full h-full border-4 border-brand-gold rounded-lg -z-10"></div>
             <img 
               src="https://images.unsplash.com/photo-1512485800893-b08ec1ea59b1?q=80&w=1200&auto=format&fit=crop" 
               alt="Cooking Process" 
               className="rounded-lg shadow-xl w-full"
             />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-brand-cream py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
             <h2 className="text-4xl font-display font-bold text-brand-brown uppercase">Our Core Values</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
             
             <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto bg-brand-brown text-white rounded-full flex items-center justify-center font-display font-bold text-2xl mb-6">01</div>
                <h3 className="text-xl font-bold text-brand-brown uppercase mb-4">Authenticity</h3>
                <p className="text-gray-600">We don't cut corners. Our recipes are passed down through generations, ensuring the true taste of tradition.</p>
             </div>

             <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto bg-brand-red text-white rounded-full flex items-center justify-center font-display font-bold text-2xl mb-6">02</div>
                <h3 className="text-xl font-bold text-brand-brown uppercase mb-4">Quality</h3>
                <p className="text-gray-600">From the freshest produce to premium cuts of meat, we believe that great food starts with great ingredients.</p>
             </div>

             <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto bg-brand-gold text-brand-brown rounded-full flex items-center justify-center font-display font-bold text-2xl mb-6">03</div>
                <h3 className="text-xl font-bold text-brand-brown uppercase mb-4">Community</h3>
                <p className="text-gray-600">We are more than a restaurant; we are a gathering place. We are proud to serve and support our local neighborhoods.</p>
             </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;