
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BookingSection from './components/BookingSection';
import Features from './components/Features';
import Fleet from './components/Fleet';
import CPAMSection from './components/CPAMSection';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen selection:bg-amber-500 selection:text-black">
      <Navbar scrolled={scrolled} />

      <main>
        <section id="accueil">
          <Hero />
        </section>

        <section id="reservation" className="bg-charcoal py-24">
          <BookingSection />
        </section>

        <section id="services" className="bg-black py-24 border-y border-white/5">
          <Features />
        </section>

        <section id="vehicules" className="bg-charcoal py-24">
          <Fleet />
        </section>

        <section id="conventionne" className="bg-black py-24">
          <CPAMSection />
        </section>
      </main>

      <Footer />

    </div>
  );
};

export default App;
