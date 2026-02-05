
<<<<<<< HEAD
import React from 'react';

const Hero: React.FC = () => {
  // Using a high-quality static image for better performance and reliability
  const imageUrl = "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=2069&auto=format&fit=crop";
=======
import React, { useState, useEffect } from 'react';
import { generateLuxuryImage } from '../services/imageService';

const Hero: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string>("https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=2069&auto=format&fit=crop");
  
  useEffect(() => {
    const fetchImage = async () => {
      const prompt = "Cinematic high-end photograph of a black Audi A4 Avant parked in a luxury hotel driveway at night, golden ambient lighting, elegant reflections on the polished Noir Mythic paint, no racing, serene atmosphere, 8k resolution.";
      const generated = await generateLuxuryImage(prompt);
      if (generated) setImageUrl(generated);
    };
    fetchImage();
  }, []);
>>>>>>> 595b434dc79218137e94e1c625611026e4d17c05

  return (
    <div className="relative h-screen min-h-[700px] overflow-hidden flex items-center">
      <div className="absolute inset-0">
        <img 
          src={imageUrl} 
          alt="Audi A4 Avant Break Noir - Prestige" 
          className="w-full h-full object-cover grayscale-[0.2] transition-opacity duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-4xl space-y-8">
          <div className="inline-flex items-center space-x-3 px-4 py-1.5 border border-gold/40 bg-black/40 backdrop-blur-md text-gold text-[10px] md:text-xs uppercase tracking-[0.4em]">
            <span className="w-2 h-2 bg-gold rounded-full"></span>
            <span>Audi A4 Avant • Excellence & Confort</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl leading-tight font-serif text-white">
            SAM <span className="block italic font-light text-gold/90">TAXI</span>
          </h1>
          
          <div className="h-px w-32 bg-gold mb-6 shadow-[0_0_15px_rgba(212,175,55,0.5)]"></div>
          
          <p className="text-xl md:text-3xl text-white/80 max-w-2xl font-light leading-tight">
            L'élégance d'un voyage en <span className="text-white font-semibold border-b border-gold/30">Audi A4 Break Noir</span>. 
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
