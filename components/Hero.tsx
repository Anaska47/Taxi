
import React, { useState, useEffect } from 'react';
const Hero: React.FC = () => {
  const imageUrl = "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=2069&auto=format&fit=crop";

  return (
    <div className="relative h-screen min-h-[700px] overflow-hidden flex items-center">
      <div className="absolute inset-0">
        <img
          src={imageUrl}
          alt="Audi A4 break Noir - Prestige"
          className="w-full h-full object-cover grayscale-[0.2] transition-opacity duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-4xl pt-20">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-12 h-px bg-gold"></div>
            <span className="text-gold text-xs font-black uppercase tracking-[0.4em]">Service de Prestige</span>
          </div>

          <p className="inline-flex items-center space-x-3 px-4 py-2 bg-white/5 border border-white/10 backdrop-blur-md rounded-full text-[10px] text-white/60 font-medium tracking-widest uppercase mb-12">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
            <span>Audi A4 break • Excellence & Confort</span>
          </p>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif text-white mb-10 leading-[0.9] tracking-tight">
            L'Élégance de vos <br />
            <span className="text-gold italic">Déplacements</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/50 mb-16 max-w-2xl leading-relaxed font-light">
            Découvrez un standard supérieur de transport privé.
            L'élégance d'un voyage en <span className="text-white font-semibold border-b border-gold/30">Audi A4 break Noir</span>.
            Le luxe du silence et le confort absolu.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 pt-10">
            <a href="#reservation" className="px-12 py-6 bg-gold text-black text-sm font-black uppercase tracking-widest hover:bg-white transition-all duration-500 shadow-xl text-center">
              Réserver votre transfert
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
