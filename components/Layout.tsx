import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const isActive = (path: string) => location.pathname === path;

    useEffect(() => { setIsMenuOpen(false); }, [location.pathname]);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMenuOpen]);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <div className="min-h-screen flex flex-col">

            {/* ── Navbar ─────────────────────────────── */}
            <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
                <div className="container navbar-inner">
                    <Link to="/" className="logo-container">
                        <span className="logo-main">SAM <span>TAXI</span></span>
                        <span className="logo-sub">Transport Médical Conventionné et privé</span>
                    </Link>

                    <nav className="nav-links hide-on-mobile">
                        <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>Accueil</Link>
                        <Link to="/medical" className={`nav-link ${isActive('/medical') ? 'active' : ''}`}>Médical</Link>
                        <Link to="/prive" className={`nav-link ${isActive('/prive') ? 'active' : ''}`}>Privé</Link>
                        <Link to="/contact" className={`nav-link ${isActive('/contact') ? 'active' : ''}`}>Contact</Link>
                        <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.1)', margin: '0 0.5rem' }}></div>
                        <a href="tel:0644031931" className="btn btn-call">
                            📞 06 44 03 19 31
                        </a>
                    </nav>

                    <button
                        className={`hamburger-btn ${isMenuOpen ? 'open' : ''}`}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Menu"
                    >
                        <div className="hamburger-icon"></div>
                    </button>
                </div>
            </header>

            {/* ── Mobile Menu ─────────────────────────── */}
            <div className={`mobile-menu-overlay ${isMenuOpen ? 'open' : ''}`}>
                <div className="mobile-nav-links">
                    <Link to="/" className={isActive('/') ? 'active' : ''}>Accueil</Link>
                    <Link to="/medical" className={isActive('/medical') ? 'active' : ''}>Médical</Link>
                    <Link to="/prive" className={isActive('/prive') ? 'active' : ''}>Privé</Link>
                    <Link to="/contact" className={isActive('/contact') ? 'active' : ''}>Contact</Link>
                </div>
                <div style={{ marginTop: '3rem', paddingTop: '3rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                    <p style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '1rem' }}>
                        Réservation & Urgences
                    </p>
                    <a href="tel:0644031931" style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', color: '#2b6cb0', textDecoration: 'none', display: 'block', marginBottom: '0.5rem' }}>
                        06 44 03 19 31
                    </a>
                    <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>Disponible 24h/24 • 7j/7</p>
                </div>
            </div>

            {/* ── Main ────────────────────────────────── */}
            <main className="flex-grow">
                {children}
            </main>

            {/* ── Footer ──────────────────────────────── */}
            <footer style={{ background: '#060b14', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '5rem', paddingBottom: '3rem' }}>
                <div className="container">
                    <hr className="divider-gold" style={{ marginBottom: '4rem' }} />

                    <div className="grid md:grid-cols-3 gap-16 mb-16">
                        <div>
                            <div className="logo-container" style={{ marginBottom: '1.5rem' }}>
                                <span className="logo-main">SAM <span>TAXI</span></span>
                                <span className="logo-sub">Transport Médical Conventionné et privé</span>
                            </div>
                            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.85rem', lineHeight: 1.8, maxWidth: '260px' }}>
                                Service d'élite en transport assis professionnalisé. Engagé pour votre confort dans toute la région PACA.
                            </p>
                            <div style={{ marginTop: '2rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                                <span style={{ fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#90cdf4', border: '1px solid rgba(144,205,244,0.3)', borderRadius: '4px', padding: '4px 10px' }}>Toulon ADS n°19</span>
                                <span style={{ fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#90cdf4', border: '1px solid rgba(144,205,244,0.3)', borderRadius: '4px', padding: '4px 10px' }}>CPAM</span>
                                <span style={{ fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#90cdf4', border: '1px solid rgba(144,205,244,0.3)', borderRadius: '4px', padding: '4px 10px' }}>24h/24</span>
                            </div>
                        </div>

                        <div>
                            <p className="section-label" style={{ marginBottom: '1.5rem', display: 'block' }}>Zone d'Intervention</p>
                            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                                {[
                                    ['83', 'Brignoles — Siège Social'],
                                    ['83', 'Toulon'],
                                    ['13', 'Bouches-du-Rhône'],
                                    ['06', 'Alpes-Maritimes'],
                                    ['04', 'Alpes-de-Haute-Provence'],
                                    ['05 | 84', 'Hautes-Alpes / Vaucluse'],
                                ].map(([dept, name]) => (
                                    <li key={name} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>
                                        <span style={{ color: '#90cdf4', fontWeight: 800, minWidth: '24px', fontSize: '0.65rem' }}>{dept}</span>
                                        {name}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <p className="section-label" style={{ marginBottom: '1.5rem', display: 'block' }}>Contact & Urgences</p>
                            <a href="tel:0644031931" style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', color: '#90cdf4', textDecoration: 'none', display: 'block', marginBottom: '0.5rem', transition: 'filter 0.3s' }}>
                                06 44 03 19 31
                            </a>
                            <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)', marginBottom: '2rem' }}>Disponible 24h/24 • 7j/7</p>
                            <div style={{ padding: '1rem 1.5rem', border: '1px solid rgba(144,205,244,0.25)', borderRadius: '12px', background: 'rgba(144,205,244,0.07)' }}>
                                <p style={{ fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(144,205,244,0.7)', marginBottom: '0.3rem' }}>Conventionné</p>
                                <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '1.1rem', color: 'white' }}>Taxi CPAM</p>
                                <p style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.35)', marginTop: '0.35rem' }}>Autorisation Toulon ADS n°19</p>
                            </div>
                        </div>
                    </div>

                    <hr className="divider-gold" style={{ marginBottom: '2rem', opacity: 0.2 }} />

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                        <div style={{ display: 'flex', gap: '2rem' }}>
                            {[['/', 'Accueil'], ['/medical', 'Médical'], ['/prive', 'Privé'], ['/contact', 'Contact']].map(([path, label]) => (
                                <Link key={path} to={path} style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', textDecoration: 'none', transition: 'color 0.3s' }}
                                    onMouseEnter={(e) => (e.currentTarget.style.color = '#90cdf4')}
                                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.25)')}
                                >{label}</Link>
                            ))}
                        </div>
                        <p style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.2)', fontWeight: 600 }}>
                            © 2026 SAM TAXI — Transport Médical & Privé · Toulon · Brignoles
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
