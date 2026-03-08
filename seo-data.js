// SEO ENGINE v2.0 - Gestion de masse (1000+ pages)
let SEO_DATA_MASTER = {};

// On garde quelques pages clés en dur pour le chargement instantané
const SEO_STATIC = {
    "default": {
        "title": "Sam Taxi — Réservez en 30 secondes",
        "metaDesc": "Réservez votre taxi dans le Var en 30 secondes. Transport privé ou médical certifié 24h/24 et 7j/7.",
        "h1": "Votre taxi,<br><em>là où vous en avez besoin.</em>",
        "heroSub": "Réservez en 30 secondes. Transport privé ou médical — simple, rapide, fiable.",
        "city": ""
    }
};

async function initDynamicSEO() {
    const params = new URLSearchParams(window.location.search);
    const pageKey = params.get('p') || 'default';

    let data = SEO_STATIC[pageKey];

    // Si la page n'est pas dans le static, on cherche dans le master JSON
    if (!data && pageKey !== 'default') {
        try {
            // On charge le gros fichier JSON seulement si nécessaire
            if (Object.keys(SEO_DATA_MASTER).length === 0) {
                const response = await fetch('seo-data-master.json');
                SEO_DATA_MASTER = await response.json();
            }
            data = SEO_DATA_MASTER[pageKey];
        } catch (e) {
            console.error("Erreur chargement SEO Master:", e);
        }
    }

    // Fallback par défaut
    if (!data) data = SEO_STATIC['default'];

    // --- MISE À JOUR DU DOM ---
    document.title = data.title;

    // Suivi GA4 de la page virtuelle générée
    try {
        if (typeof gtag === 'function') {
            gtag('event', 'page_view', {
                page_title: data.title,
                page_location: window.location.href,
                page_path: window.location.pathname + window.location.search
            });
        }
    } catch (e) { }

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.name = "description";
        document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', data.metaDesc);

    const h1 = document.querySelector('h1');
    if (h1) h1.innerHTML = data.h1;

    const heroSub = document.querySelector('.hero-sub');
    if (heroSub) heroSub.textContent = data.heroSub;

    if (data.city) {
        const eliteTitle = document.querySelector('.car-header .section-title em');
        if (eliteTitle) eliteTitle.textContent = `Confort & Prestige à ${data.city}`;

        const footerTown = document.querySelector('.footer-legal strong');
        if (footerTown) footerTown.textContent = data.city;

        // Pré-remplissage intelligent du formulaire
        const fromInput = document.getElementById('fromInput');
        if (fromInput && !fromInput.value) {
            fromInput.value = data.city;
        }
    }

    if (data.destination) {
        const toInput = document.getElementById('toInput');
        if (toInput && !toInput.value) {
            toInput.value = data.destination;
        }
    }

    // Gestion du mode Médical
    if (data.service === 'Médical' || pageKey.includes('medical') || pageKey.includes('conventionne')) {
        const checkType = setInterval(() => {
            if (typeof setType === 'function') {
                setType('medical');
                clearInterval(checkType);
            }
        }, 50);
        setTimeout(() => clearInterval(checkType), 2000);
    }

    // Injection JSON-LD
    const ldJson = {
        "@context": "https://schema.org",
        "@type": "TaxiService",
        "name": "Sam Taxi",
        "description": data.metaDesc,
        "provider": {
            "@type": "LocalBusiness",
            "name": "Sam Taxi " + (data.city || "Var"),
            "address": {
                "@type": "PostalAddress",
                "addressLocality": data.city || "Var",
                "addressRegion": "Var",
                "addressCountry": "FR"
            },
            "telephone": "+33644031931"
        },
        "areaServed": data.city || "Var"
    };
    const scriptLd = document.getElementById('seo-ld');
    if (scriptLd) scriptLd.textContent = JSON.stringify(ldJson);
}

document.addEventListener('DOMContentLoaded', initDynamicSEO);
