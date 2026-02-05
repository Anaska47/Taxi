
import React from 'react';

const CPAMSection: React.FC = () => {
  return (
    <div className="container mx-auto px-6 md:px-12">
      <div className="bg-charcoal border border-white/5 relative overflow-hidden">
        {/* Decorative element */}
        <div className="absolute -right-20 -top-20 w-80 h-80 border border-gold/10 rounded-full"></div>
        
        <div className="grid lg:grid-cols-2">
          <div className="p-12 md:p-20 space-y-8 relative z-10">
            <span className="text-gold text-[10px] uppercase tracking-[0.5em] font-bold">Santé & Confiance</span>
            <h2 className="text-4xl md:text-5xl font-serif text-white leading-tight">
              Taxi Conventionné <span className="text-gold italic">CPAM</span>
            </h2>
            <div className="h-px w-20 bg-gold/50"></div>
            
            <p className="text-white/60 text-lg leading-relaxed">
              Nous assurons vos transports médicaux en toute sécurité et avec une attention particulière. 
              En tant que taxi agréé, vous pouvez bénéficier d'une prise en charge de vos frais de transport par la Caisse Primaire d'Assurance Maladie.
            </p>

            <div className="grid sm:grid-cols-2 gap-8">
              <div className="space-y-3">
                <h4 className="text-white font-bold uppercase text-[10px] tracking-widest">Documents Requis</h4>
                <ul className="text-white/40 text-xs space-y-2">
                  <li>• Prescription médicale de transport</li>
                  <li>• Carte Vitale à jour</li>
                  <li>• Attestation de droits</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="text-white font-bold uppercase text-[10px] tracking-widest">Services Inclus</h4>
                <ul className="text-white/40 text-xs space-y-2">
                  <li>• Aide à l'installation</li>
                  <li>• Accompagnement aux entrées</li>
                  <li>• Attente si nécessaire</li>
                </ul>
              </div>
            </div>

            <div className="pt-4">
              <button className="px-8 py-4 border border-gold text-gold hover:bg-gold hover:text-black transition-all duration-300 text-xs font-bold uppercase tracking-widest">
                En savoir plus sur le remboursement
              </button>
            </div>
          </div>

          <div className="relative h-80 lg:h-auto overflow-hidden">
             <img 
               src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop" 
               alt="Comfortable medical transport" 
               className="w-full h-full object-cover grayscale opacity-60"
             />
             <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-transparent to-transparent"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CPAMSection;
