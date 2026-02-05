
import React, { useState } from 'react';

interface NavbarProps {
  scrolled: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ scrolled }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Accueil', href: '#accueil' },
    { name: 'Réservation', href: '#reservation' },
    { name: 'Services', href: '#services' },
    { name: 'Notre Flotte', href: '#vehicules' },
    { name: 'CPAM', href: '#conventionne' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-black/90 backdrop-blur-md py-4 shadow-2xl' : 'bg-transparent py-8'}`}>
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-3xl font-serif font-bold tracking-tighter text-white">
            SAM <span className="text-gold">TAXI</span>
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-10 items-center">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium uppercase tracking-widest text-white/80 hover:text-gold transition-colors duration-300"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#reservation"
            className="px-6 py-3 border border-gold text-gold hover:bg-gold hover:text-black transition-all duration-300 text-xs font-bold uppercase tracking-widest"
          >
            Réserver
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-black z-40 flex flex-col items-center justify-center space-y-8 transition-transform duration-500 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={() => setMobileMenuOpen(false)}
            className="text-2xl font-serif text-white hover:text-gold transition-colors"
          >
            {link.name}
          </a>
        ))}
        <button 
          onClick={() => setMobileMenuOpen(false)}
          className="absolute top-8 right-6 text-white"
        >
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
