
import React, { useState, useEffect } from 'react';
import { generateLuxuryImage } from '../services/imageService';

const FleetCard: React.FC<{ item: any, prompt: string }> = ({ item, prompt }) => {
  const [img, setImg] = useState(item.fallbackImg);

  useEffect(() => {
    generateLuxuryImage(prompt).then(res => { if (res) setImg(res); });
  }, [prompt]);

  return (
    <div className="group flex flex-col h-full bg-[#0d0d0d] border border-white/5 hover:border-gold/30 transition-all duration-700 shadow-2xl">
      <div className="aspect-[16/10] overflow-hidden relative">
        <img src={img} alt={item.model} className="w-full h-full object-cover grayscale opacity-80 transition-all duration-1000 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
      </div>
      <div className="p-10 flex flex-col flex-1 relative">
        <span className="text-gold text-[10px] uppercase tracking-[0.3em] font-bold mb-3">{item.name}</span>
        <h3 className="text-3xl font-serif text-white mb-4 group-hover:text-gold transition-colors">{item.model}</h3>
        <p className="text-white/40 text-sm font-light leading-relaxed mb-8 flex-1">{item.desc}</p>
        <div className="mt-auto pt-6 border-t border-white/10 flex items-center justify-between">
          <span className="text-white/60 text-[10px] uppercase tracking-widest font-semibold">{item.specs}</span>
        </div>
      </div>
    </div>
  );
};

const Fleet: React.FC = () => {
  const fleetData = [
    {
      name: "Habitacle de Luxe",
      model: "Intérieur Audi Premium",
      specs: "Cuir Nappa • Ambiance Gold",
      desc: "Plongez dans un environnement de haute facture. Finitions en cuir et silence de roulement exceptionnel.",
      fallbackImg: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070&auto=format&fit=crop",
      prompt: "Ultra-luxurious interior of an Audi A4, black nappa leather, soft golden ambient light, high-tech dashboard, focus on craftsmanship and comfort, high-end photography, no people."
    },
    {
      name: "Sérénité Totale",
      model: "Confort de Roulement",
      specs: "Acoustique Renforcée",
      desc: "Une isolation phonique exceptionnelle pour vous permettre de travailler ou de vous reposer en toute tranquillité.",
      fallbackImg: "https://images.unsplash.com/photo-1541443131876-44b03de101c5?q=80&w=2070&auto=format&fit=crop",
      prompt: "Close-up of a luxury black Audi A4 door handle and side profile, soft evening light reflections, elegant and minimal, professional automotive photography."
    },
    {
      name: "Volume & Prestige",
      model: "Audi A4 break",
      specs: "Coffre Spacieux • 4 Valises",
      desc: "Le choix parfait pour vos transferts. L'espace généreux de notre break accueille tous vos bagages avec élégance.",
      fallbackImg: "https://images.unsplash.com/photo-1606155609460-234679413204?q=80&w=2070&auto=format&fit=crop",
      prompt: "Professional shot of the spacious trunk of a black Audi A4 Avant, high-end leather suitcases inside, luxury travel lifestyle, soft studio lighting, premium feel."
    }
  ];

  return (
    <div className="container mx-auto px-6 md:px-12">
      <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8 border-l-2 border-gold pl-8">
        <div className="max-w-2xl">
          <span className="text-gold text-[10px] uppercase tracking-[0.5em] font-black">Expérience Unique</span>
          <h2 className="text-5xl md:text-7xl font-serif text-white mt-4">Luxe & <span className="italic text-gold/80">Confort</span></h2>
        </div>
      </div>
      <div className="grid lg:grid-cols-3 gap-12">
        {fleetData.map((item, idx) => <FleetCard key={idx} item={item} prompt={item.prompt} />)}
      </div>
    </div>
  );
};

export default Fleet;
