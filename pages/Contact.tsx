import React from 'react';

const Contact = () => {
    return (
        <div className="container py-20 animate-fade-in-up">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-16">
                    <span className="badge">Service Institutionnel</span>
                    <h1 className="text-4xl font-black mt-4">Contactez SAM TAXI</h1>
                    <p className="text-muted mt-4 text-lg">Nous sommes à votre écoute 24h/24 pour organiser vos transports à Toulon et dans le Var.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <div className="card text-center group">
                        <div className="text-5xl mb-6 transition-transform group-hover:scale-110 duration-300">📞</div>
                        <h2 className="text-xs font-black mb-2 uppercase tracking-widest text-gray-400">Par Téléphone</h2>
                        <a href="tel:0644031931" className="text-2xl font-black text-[#123A7A] hover:underline transition-all">06 44 03 19 31</a>
                        <p className="mt-4 text-sm text-muted">Ligne directe disponible jour et nuit pour toute réservation urgente.</p>
                    </div>

                    <div className="card text-center group">
                        <div className="text-5xl mb-6 transition-transform group-hover:scale-110 duration-300">✉️</div>
                        <h2 className="text-xs font-black mb-2 uppercase tracking-widest text-gray-400">Par Email</h2>
                        <a href="mailto:sam.taxi.83100@gmail.com" className="text-xl font-bold text-[#123A7A] hover:underline truncate block">sam.taxi.83100@gmail.com</a>
                        <p className="mt-4 text-sm text-muted">Réponse sous 24h pour vos demandes de devis ou de partenariats.</p>
                    </div>
                </div>

                <div className="card">
                    <h2 className="text-xl font-black text-[#123A7A] mb-8 text-center border-b border-gray-100 pb-4">Informations Professionnelles</h2>
                    <div className="grid sm:grid-cols-2 gap-12">
                        <div>
                            <h3 className="text-xs font-black text-gray-400 uppercase mb-3 tracking-widest">Siège Social</h3>
                            <p className="font-extrabold text-gray-900 text-lg">Brignoles 83170</p>
                            <p className="text-sm text-muted mt-1 font-medium">Dépendance territoriale du Var</p>
                        </div>
                        <div>
                            <h3 className="text-xs font-black text-gray-400 uppercase mb-3 tracking-widest">Autorisation</h3>
                            <p className="font-extrabold text-gray-900 text-lg">Toulon ADS n°19</p>
                            <p className="text-sm text-muted mt-1 font-medium">Commune de rattachement officielle</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
