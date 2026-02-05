
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-white/5 py-20">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <span className="text-3xl font-serif font-bold tracking-tighter text-white mb-6 block">
              SAM <span className="text-gold">TAXI</span>
            </span>
            <p className="text-white/40 max-w-sm mb-8 font-light leading-relaxed">
              Votre partenaire de confiance pour tous vos déplacements premium à Toulon et dans toute la région Provence-Alpes-Côte d'Azur.
            </p>
            <div className="flex space-x-6">
              {['Facebook', 'Instagram', 'LinkedIn'].map((s) => (
                <a key={s} href="#" className="text-white/40 hover:text-gold transition-colors text-[10px] uppercase tracking-widest font-bold">
                  {s}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white text-xs font-black uppercase tracking-[0.3em] mb-8">Navigation</h4>
            <ul className="space-y-4">
              <li><a href="#accueil" className="text-white/40 hover:text-gold transition-colors text-sm">Accueil</a></li>
              <li><a href="#reservation" className="text-white/40 hover:text-gold transition-colors text-sm">Réservation</a></li>
              <li><a href="#vehicules" className="text-white/40 hover:text-gold transition-colors text-sm">La Flotte</a></li>
              <li><a href="#conventionne" className="text-white/40 hover:text-gold transition-colors text-sm">Taxi CPAM</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-xs font-black uppercase tracking-[0.3em] mb-8">Contact</h4>
            <ul className="space-y-4">
              <li className="text-white/40 text-sm">Toulon, 83000, France</li>
              <li className="text-gold font-bold text-lg">+33 6 00 00 00 00</li>
              <li className="text-white/40 text-sm">contact@sam-taxi-toulon.fr</li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:row justify-between items-center gap-6">
          <p className="text-white/20 text-[10px] uppercase tracking-widest">
            © {new Date().getFullYear()} SAM TAXI. TOUS DROITS RÉSERVÉS.
          </p>
          <div className="flex space-x-8">
            <a href="#" className="text-white/20 hover:text-white transition-colors text-[10px] uppercase tracking-widest">Mentions Légales</a>
            <a href="#" className="text-white/20 hover:text-white transition-colors text-[10px] uppercase tracking-widest">Confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
