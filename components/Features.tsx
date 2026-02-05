
import React from 'react';

const Features: React.FC = () => {
  const features = [
    {
      title: "Chauffeur Professionnel",
      desc: "Des conducteurs expérimentés, discrets et courtois pour un trajet en toute sérénité.",
      icon: (
        <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      title: "Véhicule Confortable",
      desc: "Notre flotte se compose exclusivement de berlines haut de gamme entretenues méticuleusement.",
      icon: (
        <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: "Discrétion Absolue",
      desc: "Nous respectons votre vie privée et vos besoins de tranquillité durant vos trajets.",
      icon: (
        <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      )
    },
    {
      title: "Service Conventionné",
      desc: "Agréé CPAM pour vos transports médicaux vers les cliniques et hôpitaux de la région.",
      icon: (
        <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    }
  ];

  return (
    <div className="container mx-auto px-6 md:px-12">
      <div className="text-center max-w-2xl mx-auto mb-20">
        <span className="text-gold text-[10px] uppercase tracking-[0.5em] font-bold">L'Excellence du Transport</span>
        <h2 className="text-4xl md:text-5xl font-serif text-white mt-4">Pourquoi Choisir <span className="italic">SAM TAXI</span></h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
        {features.map((f, i) => (
          <div key={i} className="group p-8 bg-charcoal/50 hover:bg-gold/5 transition-all duration-500 border border-white/5 hover:border-gold/20 flex flex-col items-center text-center">
            <div className="mb-8 p-4 bg-black rounded-full group-hover:scale-110 transition-transform duration-500">
              {f.icon}
            </div>
            <h3 className="text-xl font-serif text-white mb-4">{f.title}</h3>
            <p className="text-white/40 text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
