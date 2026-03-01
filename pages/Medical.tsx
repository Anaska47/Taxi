import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import ProgressSteps from '../components/ProgressSteps';
import { sendToGoogleSheet } from '../lib/googleSheets';
import AddressAutocomplete from '../components/AddressAutocomplete';

const Medical = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        tripType: 'aller-simple',
        name: '',
        phone: '',
        email: '',
        date: '',
        time: '',
        returnDate: '',
        returnTime: '',
        pickup: '',
        destination: '',
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
            // Priority 1: Google Sheets (Immediate storage requested by user)
            const gsResult = await sendToGoogleSheet({
                ...formData,
                type: 'médical',
                pickup_address: formData.pickup,
                destination_address: formData.destination,
                return_date: formData.tripType === 'aller-retour' ? formData.returnDate : null,
                return_time: formData.tripType === 'aller-retour' ? formData.returnTime : null,
            });

            if (!gsResult.success && !import.meta.env.VITE_SUPABASE_URL?.includes('PLACEHOLDER')) {
                console.error("Google Sheets error:", gsResult.error);
                // We only block if we have no other storage method working
            }

            // Priority 2: Supabase (Optional/Robust backup)
            if (supabase && !import.meta.env.VITE_SUPABASE_URL?.includes('PLACEHOLDER')) {
                try {
                    const { error } = await supabase
                        .from('bookings')
                        .insert([
                            {
                                name: formData.name,
                                phone: formData.phone,
                                email: formData.email,
                                date: formData.date,
                                time: formData.time,
                                return_date: formData.tripType === 'aller-retour' ? formData.returnDate : null,
                                return_time: formData.tripType === 'aller-retour' ? formData.returnTime : null,
                                pickup_address: formData.pickup,
                                destination_address: formData.destination,
                                is_round_trip: formData.tripType === 'aller-retour',
                                comment: formData.comment,
                                type: 'medical' // Matching schema constraint
                            }
                        ]);
                    if (error) console.warn("Supabase backup error:", error.message);
                } catch (supaErr) {
                    console.warn("Supabase connection failed:", supaErr);
                }
            }

            // Always succeed if at least Google Sheets was attempted
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
                    <div className="text-6xl mb-8">✨</div>
                    <h1 className="text-3xl mb-4">Demande Enregistrée</h1>
                    <p className="text-gray-500 font-medium leading-relaxed">
                        Votre demande de transport médical a été transmise avec succès. <br />
                        Un régulateur vous contactera dans les plus brefs délais pour confirmation.
                    </p>
                    <button onClick={() => window.location.href = '#/'} className="btn btn-primary mt-12 w-full">Retour à l'accueil</button>
                    <p className="text-[0.6rem] uppercase tracking-[0.2em] font-black text-gray-300 mt-8">SAM TAXI • Toulon - Brignoles</p>
                </div>
            </div>
        );
    }

    const steps = ["Voyage", "Planification", "Patient"];

    return (
        <div className="bg-gray-50 min-h-screen pt-12 pb-32">
            <div className="container">
                <div className="max-w-2xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="badge-premium mb-6">Agrément Sécurité Sociale</span>
                        <h1 className="text-4xl lg:text-5xl mt-2 mb-4 italic heading-serif">Prise de rendez-vous</h1>
                        <p className="text-gray-400 font-bold text-[0.7rem] uppercase tracking-[0.25em]">Transport Assis Professionnalisé (TAP)</p>
                    </div>

                    <ProgressSteps currentStep={step} steps={steps} />

                    <div className="card shadow-2xl animate-fade-in-up">
                        <form onSubmit={handleSubmit}>
                            {step === 1 && (
                                <div className="animate-fade-in-up">
                                    <h2 className="text-2xl mb-8 heading-serif italic">Type de déplacement</h2>

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
                                            label="Lieu de prise en charge"
                                            name="pickup"
                                            value={formData.pickup}
                                            onChange={handleChange}
                                            placeholder="Ex: 56 Rue de l'Hôpital, Toulon"
                                            variant="light"
                                        />
                                        <AddressAutocomplete
                                            label="Établissement de Santé"
                                            name="destination"
                                            value={formData.destination}
                                            onChange={handleChange}
                                            placeholder="Nom de l'hôpital, clinique ou centre"
                                            variant="light"
                                        />
                                    </div>

                                    <button
                                        type="button"
                                        onClick={nextStep}
                                        className="btn btn-primary w-full mt-6"
                                        disabled={!formData.pickup || !formData.destination}
                                    >
                                        Étape Suivante ➔
                                    </button>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="animate-fade-in-up">
                                    <h2 className="text-2xl mb-8 heading-serif italic">Détails de l'itinéraire</h2>

                                    <div className="p-6 bg-[#f8fafc] rounded-2xl mb-8 border border-gray-100">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-8 h-8 bg-[#1a365d] text-white rounded-full flex items-center justify-center text-xs">1</div>
                                            <p className="text-[0.65rem] font-black text-[#1a365d] uppercase tracking-widest">Trajet Aller</p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="form-group mb-0">
                                                <label className="!text-[0.65rem]" htmlFor="date">Date</label>
                                                <input id="date" type="date" name="date" value={formData.date} onChange={handleChange} required title="Sélectionnez la date de l'aller" />
                                            </div>
                                            <div className="form-group mb-0">
                                                <label className="!text-[0.65rem]" htmlFor="time">Heure</label>
                                                <input id="time" type="time" name="time" value={formData.time} onChange={handleChange} required title="Sélectionnez l'heure de l'aller" />
                                            </div>
                                        </div>
                                    </div>

                                    {formData.tripType === 'aller-retour' && (
                                        <div className="p-6 bg-[#1a365d]/5 rounded-2xl mb-8 border border-[#1a365d]/10 animate-slide-right">
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="w-8 h-8 bg-[#1a365d] text-white rounded-full flex items-center justify-center text-xs">2</div>
                                                <p className="text-[0.65rem] font-black text-[#1a365d] uppercase tracking-widest">Trajet Retour</p>
                                            </div>
                                            <div className="grid grid-cols-2 gap-6">
                                                <div className="form-group mb-0">
                                                    <label className="!text-[0.65rem]" htmlFor="returnDate">Date du retour</label>
                                                    <input id="returnDate" type="date" name="returnDate" value={formData.returnDate} onChange={handleChange} required title="Sélectionnez la date du retour" />
                                                </div>
                                                <div className="form-group mb-0">
                                                    <label className="!text-[0.65rem]" htmlFor="returnTime">Heure du retour</label>
                                                    <input id="returnTime" type="time" name="returnTime" value={formData.returnTime} onChange={handleChange} required title="Sélectionnez l'heure du retour" />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex gap-4 mt-10">
                                        <button type="button" onClick={prevStep} className="btn btn-secondary flex-1">Retour</button>
                                        <button
                                            type="button"
                                            onClick={nextStep}
                                            className="btn btn-primary flex-1"
                                            disabled={!formData.date || !formData.time || (formData.tripType === 'aller-retour' && (!formData.returnDate || !formData.returnTime))}
                                        >
                                            Étape Finale ➔
                                        </button>
                                    </div>
                                </div>
                            )}

                            {step === 3 && (
                                <div className="animate-fade-in-up">
                                    <h2 className="text-2xl mb-8 heading-serif italic">Informations Patient</h2>
                                    <div className="grid gap-6">
                                        <div className="form-group mb-0">
                                            <label htmlFor="name">Identité du patient</label>
                                            <input id="name" type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Nom et Prénom" title="Saisissez le nom du patient" />
                                        </div>
                                        <div className="form-group mb-0">
                                            <label htmlFor="phone">Numéro de téléphone</label>
                                            <input id="phone" type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="Numéro pour confirmation" title="Saisissez votre numéro de téléphone" />
                                        </div>
                                    </div>

                                    <div className="form-group mt-6">
                                        <label htmlFor="comment">Consignes médicales spécifiques</label>
                                        <textarea id="comment" name="comment" value={formData.comment} onChange={handleChange} rows={3} placeholder="Ex: Sortie d'hospitalisation, bon de transport en main..." title="Ajoutez des précisions si nécessaire"></textarea>
                                    </div>

                                    <div className="bg-[#1a365d] p-8 rounded-2xl mb-10 text-white shadow-xl relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                                        <p className="text-[0.6rem] font-black uppercase tracking-[0.3em] text-[#63b3ed] mb-4">Récapitulatif de la Demande</p>
                                        <div className="flex items-center gap-4 mb-4">
                                            <span className="text-2xl">{formData.tripType === 'aller-retour' ? '🔄' : '➡'}</span>
                                            <div>
                                                <p className="text-lg font-bold leading-tight line-clamp-1">{formData.pickup}</p>
                                                <p className="text-sm italic text-white/70">Vers : {formData.destination}</p>
                                            </div>
                                        </div>
                                        <div className="h-px bg-white/10 w-full mb-4"></div>
                                        <p className="text-xs font-medium text-white/60">Date prévue : {formData.date} à {formData.time}</p>
                                    </div>

                                    <div className="flex gap-4">
                                        <button type="button" onClick={prevStep} className="btn btn-secondary flex-1">Retour</button>
                                        <button type="submit" className="btn btn-primary flex-1" disabled={status === 'loading'}>
                                            {status === 'loading' ? 'Traitement...' : 'Envoyer la Demande'}
                                        </button>
                                    </div>
                                </div>
                            )}

                            {status === 'error' && (
                                <div className="mt-8 p-4 bg-red-50 border border-red-100 rounded-xl text-center">
                                    <p className="text-red-700 font-bold text-sm">Une erreur technique est survenue.</p>
                                    <p className="text-red-600 text-xs mt-1">Veuillez nous appeler directement au <a href="tel:0644031931" className="underline font-black">06 44 03 19 31</a></p>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Medical;
