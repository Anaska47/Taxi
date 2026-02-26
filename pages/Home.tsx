import React from 'react';
import { Link } from 'react-router-dom';
import PacaMap from '../components/PacaMap';
import heroCar from '../components/assets/hero-car.jpg';

const Home = () => {
    return (
        <div className="animate-fade-in-up">

            {/* ══════════════════════════════════════════
                HERO — Full cinematic car backdrop
            ══════════════════════════════════════════ */}
            <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>

                {/* Background car image */}
                <div style={{
                    position: 'absolute', inset: 0, zIndex: 0,
                    backgroundImage: `url(${heroCar})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center 60%',
                }} />

                {/* Strong navy overlay for readability */}
                <div style={{
                    position: 'absolute', inset: 0, zIndex: 1,
                    background: 'linear-gradient(105deg, rgba(15,34,64,0.95) 0%, rgba(26,54,93,0.82) 55%, rgba(26,54,93,0.35) 100%)',
                }} />

                {/* Bottom fade to white */}
                <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0, height: '180px', zIndex: 2,
                    background: 'linear-gradient(to top, #ffffff 0%, transparent 100%)',
                }} />

                {/* Content */}
                <div className="container" style={{ position: 'relative', zIndex: 3, paddingTop: '8rem', paddingBottom: '6rem' }}>
                    <div style={{ maxWidth: '680px' }}>

                        {/* Eyebrow */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                            <span className="badge-premium">Disponible 24h/24 • 7j/7</span>
                            <span style={{ width: '40px', height: '1px', background: 'rgba(255,255,255,0.3)' }}></span>
                            <span style={{ fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>ADS n°19 • Toulon</span>
                        </div>

                        {/* Main title */}
                        <h1 style={{ fontSize: 'clamp(3rem, 7vw, 5.2rem)', lineHeight: 1.02, marginBottom: '1.75rem', color: '#ffffff' }}>
                            Votre Partenaire<br />
                            <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'rgba(165,200,255,0.95)' }}>Santé &amp; Mobilité</span>
                        </h1>

                        {/* Subtitle */}
                        <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.75, marginBottom: '2.75rem', maxWidth: '520px' }}>
                            Transport médical conventionné CPAM toutes distances.<br />
                            Experts en accompagnement de patients dans toute la région PACA.
                        </p>

                        {/* CTA */}
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                            <Link to="/medical" className="btn btn-primary" style={{ background: '#ffffff', color: '#1a365d' }}>🏥 RDV Médical</Link>
                            <Link to="/prive" className="btn btn-secondary">✨ Réservation Privée</Link>
                        </div>

                        {/* Social proof */}
                        <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                            <div style={{ display: 'flex' }}>
                                {['👨‍⚕️', '🚗', '✨'].map((e, i) => (
                                    <div key={i} style={{ width: '36px', height: '36px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', marginLeft: i > 0 ? '-0.6rem' : '0' }}>
                                        {e}
                                    </div>
                                ))}
                            </div>
                            <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)' }}>
                                <span style={{ color: 'rgba(165,200,255,0.9)', fontWeight: 800 }}>+500 trajets</span> réalisés avec soin ce mois-ci
                            </p>
                        </div>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div style={{ position: 'absolute', bottom: '3rem', left: '50%', transform: 'translateX(-50%)', zIndex: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.58rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>Découvrir</span>
                    <div style={{ width: '1px', height: '36px', background: 'linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)' }}></div>
                </div>
            </section>

            {/* ══════════════════════════════════════════
                TRUST BAR
            ══════════════════════════════════════════ */}
            <section style={{ background: '#f7f9fc', borderBottom: '1px solid rgba(26,54,93,0.08)', padding: '2.5rem 0' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0', textAlign: 'center' }}>
                        {[
                            ['24/7', 'Disponibilité'],
                            ['CPAM', 'Agréé Séc. Soc.'],
                            ['ADS', 'Licence n°19'],
                            ['6', 'Dépt. Desservis'],
                        ].map(([value, label], i) => (
                            <div key={label} style={{ padding: '0.5rem 1rem', borderRight: i < 3 ? '1px solid rgba(26,54,93,0.08)' : 'none' }}>
                                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', fontWeight: 700, color: '#1a365d', marginBottom: '0.2rem' }}>{value}</p>
                                <p style={{ fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#a0aec0' }}>{label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════
                INTERACTIVE MAP + INFO
            ══════════════════════════════════════════ */}
            <section style={{ padding: '7rem 0', background: '#ffffff' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>

                        {/* Left: Text */}
                        <div>
                            <span className="section-label">Zone d'Intervention</span>
                            <span className="section-rule"></span>
                            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1.25rem', color: '#1a365d' }}>
                                Région PACA,<br />
                                <span style={{ fontStyle: 'italic', fontWeight: 400, color: '#2b6cb0' }}>6 départements</span>
                            </h2>
                            <p style={{ color: '#718096', lineHeight: 1.85, marginBottom: '2.5rem', maxWidth: '400px' }}>
                                Nous assurons vos déplacements médicaux et privés dans tout le sud‑est de la France — hôpitaux, cliniques, aéroports, gares.
                            </p>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                                {[
                                    { dept: '83', label: 'Var', note: 'Siège Social' },
                                    { dept: '83', label: 'Toulon', note: 'Rattachement' },
                                    { dept: '13', label: 'B.‑du‑Rhône', note: '' },
                                    { dept: '06', label: 'A.‑Maritimes', note: '' },
                                    { dept: '04', label: 'A.‑H.‑Prov.', note: '' },
                                    { dept: '05+84', label: 'HautesAlpes + Vaucluse', note: '' },
                                ].map((d) => (
                                    <div key={d.dept + d.label} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                                        <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#2b6cb0', minWidth: '32px', marginTop: '2px' }}>{d.dept}</span>
                                        <div>
                                            <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#2d3748' }}>{d.label}</p>
                                            {d.note && <p style={{ fontSize: '0.65rem', color: '#2b6cb0', fontWeight: 600 }}>{d.note}</p>}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div style={{ padding: '1rem 1.5rem', border: '1px solid rgba(26,54,93,0.15)', borderRadius: '10px', background: '#f0f5ff', display: 'inline-block' }}>
                                <p style={{ fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#2b6cb0', marginBottom: '0.25rem' }}>Autorisation Officielle</p>
                                <p style={{ fontFamily: "'Playfair Display', serif", color: '#1a365d', fontSize: '1rem' }}>Taxi Conventionné CPAM — ADS n°19</p>
                            </div>
                        </div>

                        {/* Right: Map Card */}
                        <div style={{ background: '#f7f9fc', borderRadius: '24px', padding: '2rem', border: '1px solid rgba(26,54,93,0.1)', boxShadow: '0 20px 60px rgba(26,54,93,0.1)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                                <div>
                                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem', color: '#1a365d' }}>Région PACA</h3>
                                    <p style={{ fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#a0aec0' }}>Carte Interactive</p>
                                </div>
                                <div className="conventionne-seal">Taxi <br /> Conventionné <br /> CPAM</div>
                            </div>
                            <PacaMap />
                            <div style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(26,54,93,0.08)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', textAlign: 'center' }}>
                                <div>
                                    <p style={{ fontSize: '0.55rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#2b6cb0', marginBottom: '0.3rem' }}>Siège Social</p>
                                    <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1a365d' }}>Brignoles (83170)</p>
                                </div>
                                <div style={{ borderLeft: '1px solid rgba(26,54,93,0.08)' }}>
                                    <p style={{ fontSize: '0.55rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#2b6cb0', marginBottom: '0.3rem' }}>Commune de Rattachement</p>
                                    <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1a365d' }}>Toulon (83000)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════
                ENGAGEMENTS — Light blue bg
            ══════════════════════════════════════════ */}
            <section style={{ padding: '7rem 0', background: '#ebf4ff', borderTop: '1px solid rgba(26,54,93,0.07)' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <span className="section-label">Pourquoi SAM TAXI</span>
                        <span className="section-rule" style={{ margin: '1rem auto' }}></span>
                        <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', color: '#1a365d' }}>
                            Nos <span style={{ fontStyle: 'italic', fontWeight: 400, color: '#2b6cb0' }}>Engagements</span>
                        </h2>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
                        {[
                            { icon: '🕐', title: 'Ponctualité', desc: 'Présent à l\'heure, à chaque rendez-vous, sans exception. Votre temps est précieux.' },
                            { icon: '🛡️', title: 'Confort & Sécurité', desc: 'Audi A4 Avant récente, climatisée, désinfectée. Un voyage dans les meilleures conditions.' },
                            { icon: '🤝', title: 'Bienveillance', desc: 'Chauffeur formé à l\'accompagnement médical, à l\'écoute de vos besoins.' },
                        ].map((item) => (
                            <div key={item.title} className="card" style={{ background: '#ffffff', textAlign: 'center' }}>
                                <div style={{ fontSize: '2.2rem', marginBottom: '1.25rem' }}>{item.icon}</div>
                                <h4 style={{ fontSize: '0.8rem', fontWeight: 900, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#1a365d', marginBottom: '0.75rem', fontFamily: 'Inter, sans-serif' }}>{item.title}</h4>
                                <p style={{ fontSize: '0.88rem', color: '#718096', lineHeight: 1.75 }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════
                SERVICES
            ══════════════════════════════════════════ */}
            <section style={{ padding: '7rem 0', background: '#ffffff', borderTop: '1px solid rgba(26,54,93,0.07)' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <span className="section-label">Nos Services</span>
                        <span className="section-rule" style={{ margin: '1rem auto' }}></span>
                        <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', color: '#1a365d' }}>
                            L'Excellence du <span style={{ fontStyle: 'italic', fontWeight: 400, color: '#2b6cb0' }}>Transport</span>
                        </h2>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>

                        {/* Medical */}
                        <div className="card" style={{ borderLeft: '4px solid #1a365d' }}>
                            <div style={{ fontSize: '2.2rem', marginBottom: '1.25rem' }}>🏥</div>
                            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.85rem', color: '#1a365d' }}>Transport Médical</h3>
                            <p style={{ color: '#718096', lineHeight: 1.8, marginBottom: '2rem', fontSize: '0.9rem' }}>
                                Spécialiste du transport conventionné CPAM. Dialyse, radiothérapie, hospitalisations, consultations — toutes distances assurées.
                            </p>
                            <Link to="/medical" style={{ fontSize: '0.7rem', fontWeight: 900, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#1a365d', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                Prendre RDV ➔
                            </Link>
                        </div>

                        {/* Private */}
                        <div className="card" style={{ borderLeft: '4px solid #4299e1' }}>
                            <div style={{ fontSize: '2.2rem', marginBottom: '1.25rem' }}>✈️</div>
                            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.85rem', color: '#1a365d' }}>Service Premium</h3>
                            <p style={{ color: '#718096', lineHeight: 1.8, marginBottom: '2rem', fontSize: '0.9rem' }}>
                                Gare, aéroport, événement privé — bénéficiez d'une Audi A4 Avant et d'une ponctualité exemplaire pour vos déplacements personnels.
                            </p>
                            <Link to="/prive" style={{ fontSize: '0.7rem', fontWeight: 900, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#2b6cb0', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                Réserver une Course ➔
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════
                CTA STRIP — Navy bg
            ══════════════════════════════════════════ */}
            <section style={{ padding: '5.5rem 0', background: '#1a365d' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '1rem' }}>Urgences &amp; Réservations</p>
                    <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', marginBottom: '0.6rem', color: '#ffffff' }}>
                        Besoin d'un transport <span style={{ fontStyle: 'italic', color: 'rgba(165,200,255,0.9)' }}>maintenant ?</span>
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.45)', marginBottom: '2.5rem', fontSize: '0.95rem' }}>
                        Disponible 24h/24, 7j/7 — Réponse immédiate
                    </p>
                    <a href="tel:0644031931" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', background: '#ffffff', color: '#1a365d', padding: '1.1rem 3rem', borderRadius: '10px', fontWeight: 900, fontSize: '1.1rem', textDecoration: 'none', letterSpacing: '-0.01em', boxShadow: '0 12px 35px rgba(0,0,0,0.2)', transition: 'transform 0.3s' }}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                    >
                        📞 06 44 03 19 31
                    </a>
                </div>
            </section>

        </div>
    );
};

export default Home;
