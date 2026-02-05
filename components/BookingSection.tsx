
import React, { useState } from 'react';

const BookingSection: React.FC = () => {
  const [step, setStep] = useState(1);

  return (
    <div className="container mx-auto px-6 md:px-12">
      <div className="grid lg:grid-cols-2 gap-20 items-center">
        <div>
          <h2 className="text-4xl md:text-6xl font-serif text-white mb-8">
            Réservez Votre <span className="text-gold italic">Expérience</span>
          </h2>
          <p className="text-white/60 text-lg mb-12 leading-relaxed">
            Une interface simple et élégante pour planifier vos trajets en quelques clics. 
            Confirmation immédiate et suivi de chauffeur disponible.
          </p>
          
          <ul className="space-y-6">
            {[
              'Disponibilité instantanée',
              'Tarification transparente',
              'Paiement sécurisé à bord',
              'Berlines de luxe uniquement'
            ].map((item, idx) => (
              <li key={idx} className="flex items-center space-x-4">
                <div className="w-1.5 h-1.5 bg-gold rounded-full"></div>
                <span className="text-white/80 font-medium tracking-wide uppercase text-xs">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-black/40 border border-white/5 p-8 md:p-12 backdrop-blur-xl relative">
          {/* Subtle Glow */}
          <div className="absolute -top-px -left-px w-20 h-px bg-gradient-to-r from-gold to-transparent"></div>
          <div className="absolute -top-px -left-px w-px h-20 bg-gradient-to-b from-gold to-transparent"></div>

          <form className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Lieu de départ</label>
                <input 
                  type="text" 
                  placeholder="Ex: Gare de Toulon"
                  className="w-full bg-white/5 border-b border-white/10 py-3 px-4 text-white focus:outline-none focus:border-gold transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Destination</label>
                <input 
                  type="text" 
                  placeholder="Ex: Aéroport Marseille"
                  className="w-full bg-white/5 border-b border-white/10 py-3 px-4 text-white focus:outline-none focus:border-gold transition-colors"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Date & Heure</label>
                <input 
                  type="datetime-local" 
                  className="w-full bg-white/5 border-b border-white/10 py-3 px-4 text-white focus:outline-none focus:border-gold transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Type de service</label>
                <select className="w-full bg-white/5 border-b border-white/10 py-3 px-4 text-white focus:outline-none focus:border-gold transition-colors appearance-none cursor-pointer">
                  <option className="bg-charcoal text-white">Privé (Berline)</option>
                  <option className="bg-charcoal text-white">Conventionné CPAM</option>
                  <option className="bg-charcoal text-white">Aéroport / Longue distance</option>
                </select>
              </div>
            </div>

            <button 
              type="button"
              className="w-full py-5 bg-gold text-black text-xs font-black uppercase tracking-[0.3em] hover:bg-white transition-all duration-500 shadow-xl"
            >
              Vérifier la disponibilité
            </button>
            
            <p className="text-center text-[10px] text-white/30 uppercase tracking-widest">
              Pas d'acompte requis pour les réservations locales
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingSection;
