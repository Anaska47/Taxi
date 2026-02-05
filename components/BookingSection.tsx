
import React, { useState } from 'react';

interface BookingFormData {
  pickup: string;
  destination: string;
  date: string;
  time: string;
  passengers: number;
  serviceType: 'privé' | 'conventionné' | 'aéroport';
  name: string;
  phone: string;
  email: string;
}

interface FormErrors {
  [key: string]: string;
}

const BookingSection: React.FC = () => {
  const [formData, setFormData] = useState<BookingFormData>({
    pickup: '',
    destination: '',
    date: '',
    time: '',
    passengers: 1,
    serviceType: 'privé',
    name: '',
    phone: '',
    email: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.pickup.trim()) {
      newErrors.pickup = 'Le lieu de départ est requis';
    }

    if (!formData.destination.trim()) {
      newErrors.destination = 'La destination est requise';
    }

    if (!formData.date) {
      newErrors.date = 'La date est requise';
    }

    if (!formData.time) {
      newErrors.time = 'L\'heure est requise';
    }

    if (!formData.name.trim()) {
      newErrors.name = 'Votre nom est requis';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Votre téléphone est requis';
    } else if (!/^[\d\s+()-]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Numéro de téléphone invalide';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitSuccess(false);
    setSubmitError('');

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const response = await fetch(`${API_URL}/api/booking`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitSuccess(true);
        // Reset form
        setFormData({
          pickup: '',
          destination: '',
          date: '',
          time: '',
          passengers: 1,
          serviceType: 'privé',
          name: '',
          phone: '',
          email: '',
        });
      } else {
        setSubmitError(data.error || 'Une erreur est survenue');
      }
    } catch (error) {
      console.error('Booking error:', error);
      setSubmitError('Impossible de contacter le serveur. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

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

          {submitSuccess && (
            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 text-green-400 text-sm">
              ✓ Votre réservation a été enregistrée avec succès ! Nous vous contacterons sous peu.
            </div>
          )}

          {submitError && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              ✗ {submitError}
            </div>
          )}

          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">
                  Lieu de départ *
                </label>
                <input
                  type="text"
                  name="pickup"
                  value={formData.pickup}
                  onChange={handleChange}
                  placeholder="Ex: Gare de Toulon"
                  className={`w-full bg-white/5 border-b ${errors.pickup ? 'border-red-500' : 'border-white/10'} py-3 px-4 text-white focus:outline-none focus:border-gold transition-colors`}
                />
                {errors.pickup && <p className="text-red-400 text-xs">{errors.pickup}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">
                  Destination *
                </label>
                <input
                  type="text"
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  placeholder="Ex: Aéroport Marseille"
                  className={`w-full bg-white/5 border-b ${errors.destination ? 'border-red-500' : 'border-white/10'} py-3 px-4 text-white focus:outline-none focus:border-gold transition-colors`}
                />
                {errors.destination && <p className="text-red-400 text-xs">{errors.destination}</p>}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">
                  Date *
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className={`w-full bg-white/5 border-b ${errors.date ? 'border-red-500' : 'border-white/10'} py-3 px-4 text-white focus:outline-none focus:border-gold transition-colors`}
                />
                {errors.date && <p className="text-red-400 text-xs">{errors.date}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">
                  Heure *
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className={`w-full bg-white/5 border-b ${errors.time ? 'border-red-500' : 'border-white/10'} py-3 px-4 text-white focus:outline-none focus:border-gold transition-colors`}
                />
                {errors.time && <p className="text-red-400 text-xs">{errors.time}</p>}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">
                  Type de service *
                </label>
                <select
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  className="w-full bg-white/5 border-b border-white/10 py-3 px-4 text-white focus:outline-none focus:border-gold transition-colors appearance-none cursor-pointer"
                >
                  <option className="bg-charcoal text-white" value="privé">Privé (Berline)</option>
                  <option className="bg-charcoal text-white" value="conventionné">Conventionné CPAM</option>
                  <option className="bg-charcoal text-white" value="aéroport">Aéroport / Longue distance</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">
                  Passagers
                </label>
                <input
                  type="number"
                  name="passengers"
                  value={formData.passengers}
                  onChange={handleChange}
                  min="1"
                  max="4"
                  className="w-full bg-white/5 border-b border-white/10 py-3 px-4 text-white focus:outline-none focus:border-gold transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">
                Votre nom *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nom complet"
                className={`w-full bg-white/5 border-b ${errors.name ? 'border-red-500' : 'border-white/10'} py-3 px-4 text-white focus:outline-none focus:border-gold transition-colors`}
              />
              {errors.name && <p className="text-red-400 text-xs">{errors.name}</p>}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">
                  Téléphone *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+33 6 12 34 56 78"
                  className={`w-full bg-white/5 border-b ${errors.phone ? 'border-red-500' : 'border-white/10'} py-3 px-4 text-white focus:outline-none focus:border-gold transition-colors`}
                />
                {errors.phone && <p className="text-red-400 text-xs">{errors.phone}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">
                  Email (optionnel)
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="votre@email.com"
                  className={`w-full bg-white/5 border-b ${errors.email ? 'border-red-500' : 'border-white/10'} py-3 px-4 text-white focus:outline-none focus:border-gold transition-colors`}
                />
                {errors.email && <p className="text-red-400 text-xs">{errors.email}</p>}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-5 bg-gold text-black text-xs font-black uppercase tracking-[0.3em] hover:bg-white transition-all duration-500 shadow-xl ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Envoi en cours...' : 'Confirmer la réservation'}
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
