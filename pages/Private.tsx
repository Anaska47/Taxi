import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import ProgressSteps from '../components/ProgressSteps';
import { sendToGoogleSheet } from '../lib/googleSheets';
import AddressAutocomplete from '../components/AddressAutocomplete';

const Private = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        tripType: 'aller-simple',
        passengers: '1',
        date: '',
        time: '',
        returnDate: '',
        returnTime: '',
        pickup: '',
        destination: '',
        name: '',
        phone: '',
        comment: ''
    });

    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const nextStep = () => setStep(s => Math.min(s + 1, 3));
    const prevStep = () => setStep(s => Math.max(s - 1, 1));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            // Priority 1: Google Sheets
            await sendToGoogleSheet({
                ...formData,
                type: 'private',
                pickup_address: formData.pickup,
                destination_address: formData.destination,
                return_date: formData.tripType === 'aller-retour' ? formData.returnDate : null,
                return_time: formData.tripType === 'aller-retour' ? formData.returnTime : null,
            });

            // Priority 2: Supabase (Optional)
            if (supabase && !import.meta.env.VITE_SUPABASE_URL?.includes('PLACEHOLDER')) {
                try {
                    await supabase
                        .from('bookings')
                        .insert([
                            {
                                ...formData,
                                type: 'private',
                                pickup_address: formData.pickup,
                                destination_address: formData.destination,
                                passengers: parseInt(formData.passengers),
                                is_round_trip: formData.tripType === 'aller-retour',
                                return_date: formData.tripType === 'aller-retour' ? formData.returnDate : null,
                                return_time: formData.tripType === 'aller-retour' ? formData.returnTime : null,
                            }
                        ]);
                } catch (e) {
                    console.warn("Supabase backup failed", e);
                }
            }

            setStatus('success');
        } catch (err) {
            console.error("Submission error:", err);
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className="container py-32 text-center animate-fade-in-up">
                <div className="max-w-md mx-auto card">
                    <div className="text-6xl mb-8">🚗</div>
                    <h1 className="text-3xl mb-4 heading-serif">Demande Envoyée</h1>
                    <p className="text-gray-500 font-medium leading-relaxed">
                        Votre demande de transport privé a été enregistrée. <br />
                        Nous reviendrons vers vous rapidement avec une offre tarifaire et confirmation.
                    </p>
                    <button onClick={() => window.location.href = '#/'} className="btn btn-primary mt-12 w-full">Retour à l'accueil</button>
                    <p className="text-[0.6rem] uppercase tracking-[0.2em] font-black text-gray-300 mt-8">SAM TAXI • Service Premium</p>
                </div>
            </div>
        );
    }

    const steps = ["Voyage", "Détails", "Client"];

    return (
        <div className="bg-gray-50 min-h-screen pt-12 pb-32">
            <div className="container">
                <div className="max-w-2xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="badge-premium mb-6">Service Premium & Élite</span>
                        <h1 className="text-4xl lg:text-5xl mt-2 mb-4 italic heading-serif">Réservation de course</h1>
                        <p className="text-gray-400 font-bold text-[0.7rem] uppercase tracking-[0.25em]">Transports Gares, Aéroports & Privés</p>
                    </div>

                    <ProgressSteps currentStep={step} steps={steps} />

                    <div className="card shadow-2xl animate-fade-in-up">
                        <form onSubmit={handleSubmit}>
                            {step === 1 && (
                                <div className="animate-fade-in-up">
                                    <h2 className="text-2xl mb-8 heading-serif italic">Type de trajet</h2>

                                    <div className="trip-type-selector">
                                        <button
                                            type="button"
                                            className={`trip-type-btn ${formData.tripType === 'aller-simple' ? 'active' : 'text-gray-400'}`}
                                            onClick={() => setFormData(p => ({ ...p, tripType: 'aller-simple' }))}
                                        >
                                            Aller Simple
                                        </button>
                                        <button
                                            type="button"
                                            className={`trip-type-btn ${formData.tripType === 'aller-retour' ? 'active' : 'text-gray-400'}`}
                                            onClick={() => setFormData(p => ({ ...p, tripType: 'aller-retour' }))}
                                        >
                                            Aller-Retour
                                        </button>
                                    </div>

                                    <div className="grid gap-6">
                                        <AddressAutocomplete
                                            label="Point de départ"
                                            name="pickup"
                                            value={formData.pickup}
                                            onChange={handleChange}
                                            placeholder="Gare, Aéroport, Domicile..."
                                            variant="light"
                                        />
                                        <AddressAutocomplete
                                            label="Destination"
                                            name="destination"
                                            value={formData.destination}
                                            onChange={handleChange}
                                            placeholder="Ville, hôtel ou adresse précise"
                                            variant="light"
                                        />
                                    </div>

                                    <button
                                        type="button"
                                        onClick={nextStep}
                                        className="btn btn-primary w-full mt-10"
                                        disabled={!formData.pickup || !formData.destination}
                                    >
                                        Suivant ➔
                                    </button>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="animate-fade-in-up">
                                    <h2 className="text-2xl mb-8 heading-serif italic">Planification du trajet</h2>

                                    <div className="p-6 bg-[#f8fafc] rounded-2xl mb-8 border border-gray-100">
                                        <p className="text-[0.65rem] font-black text-[#1a365d] uppercase tracking-widest mb-4">Départ Prévu</p>
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="form-group mb-0">
                                                <label className="!text-[0.65rem]" htmlFor="date">Date</label>
                                                <input id="date" type="date" name="date" value={formData.date} onChange={handleChange} required title="Date du départ" />
                                            </div>
                                            <div className="form-group mb-0">
                                                <label className="!text-[0.65rem]" htmlFor="time">Heure</label>
                                                <input id="time" type="time" name="time" value={formData.time} onChange={handleChange} required title="Heure du départ" />
                                            </div>
                                        </div>
                                    </div>

                                    {formData.tripType === 'aller-retour' && (
                                        <div className="p-6 bg-[#1a365d]/5 rounded-2xl mb-8 border border-[#1a365d]/10 animate-slide-right">
                                            <p className="text-[0.65rem] font-black text-[#1a365d] uppercase tracking-widest mb-4">Retour Souhaité</p>
                                            <div className="grid grid-cols-2 gap-6">
                                                <div className="form-group mb-0">
                                                    <label className="!text-[0.65rem]" htmlFor="returnDate">Date Retour</label>
                                                    <input id="returnDate" type="date" name="returnDate" value={formData.returnDate} onChange={handleChange} required title="Date du retour" />
                                                </div>
                                                <div className="form-group mb-0">
                                                    <label className="!text-[0.65rem]" htmlFor="returnTime">Heure Retour</label>
                                                    <input id="returnTime" type="time" name="returnTime" value={formData.returnTime} onChange={handleChange} required title="Heure du retour" />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div className="form-group">
                                        <label htmlFor="passengers">Voyageurs</label>
                                        <select id="passengers" name="passengers" value={formData.passengers} onChange={handleChange} title="Choisissez le nombre de voyageurs">
                                            {[1, 2, 3, 4, 5, 6, 7].map(n => (
                                                <option key={n} value={n}>{n} {n > 1 ? 'passagers' : 'passager'}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="flex gap-4 mt-10">
                                        <button type="button" onClick={prevStep} className="btn btn-secondary flex-1">Retour</button>
                                        <button
                                            type="button"
                                            onClick={nextStep}
                                            className="btn btn-primary flex-1"
                                            disabled={!formData.date || !formData.time || (formData.tripType === 'aller-retour' && (!formData.returnDate || !formData.returnTime))}
                                        >
                                            Suivant ➔
                                        </button>
                                    </div>
                                </div>
                            )}

                            {step === 3 && (
                                <div className="animate-fade-in-up">
                                    <h2 className="text-2xl mb-8 heading-serif italic">Coordonnées de Facturation</h2>
                                    <div className="grid gap-6">
                                        <div className="form-group mb-0">
                                            <label htmlFor="name">Nom complet ou Entreprise</label>
                                            <input id="name" type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Pour la pancarte chauffeur" title="Saisissez votre nom" />
                                        </div>
                                        <div className="form-group mb-0">
                                            <label htmlFor="phone">Mobile de contact</label>
                                            <input id="phone" type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="Numéro pour le chauffeur" title="Saisissez votre numéro de mobile" />
                                        </div>
                                    </div>
                                    <div className="form-group mt-6">
                                        <label htmlFor="comment">Précisions (Bagages, etc.)</label>
                                        <textarea id="comment" name="comment" value={formData.comment} onChange={handleChange} rows={2} placeholder="Ex: 2 valises soutes, besoin d'un rehausseur..." title="Ajoutez des précisions"></textarea>
                                    </div>

                                    <div className="flex gap-4 mt-10">
                                        <button type="button" onClick={prevStep} className="btn btn-secondary flex-1">Retour</button>
                                        <button type="submit" className="btn btn-primary flex-1" disabled={status === 'loading'}>
                                            {status === 'loading' ? 'Réservation...' : 'Confirmer la Course'}
                                        </button>
                                    </div>
                                </div>
                            )}

                            {status === 'error' && (
                                <p className="mt-8 text-center text-red-600 font-bold text-sm bg-red-50 p-4 rounded-xl">Une erreur est survenue lors de l'envoi. Veuillez nous appeler.</p>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Private;
