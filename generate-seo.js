import fs from 'fs';

const cities = [
    // VAR (83) - COUVERTURE TOTALE
    "Brignoles", "Le Val", "Carces", "Montfort", "Cotignac", "Entrecasteaux", "Salerne", "Barjols", "Châteauvert", "Varrages", "Tavernes", "Aups", "Seillons-Sources-d'argens", "Brue-auriac", "Pontevès", "Saint-maximin-la-sainte-baume", "Tourves", "Rougiers", "Nans-les-pins", "Bras", "Correns", "Lorgues", "Cabasse", "Flassans-sur-issole", "Camps-la-source", "Le Luc", "Le Cannet-des-maures", "Le Thoronet", "Vidauban", "Taradeau", "Les arcs", "Trans-en-Provence", "Draguignan", "Le muy", "La motte", "Fréjus", "Roquebrune-sur-Argens", "Puget-sur-argens", "Saint-Raphaël", "Besse-sur-issole", "Gonfaron", "Carnoules", "Pignans", "Puget-ville", "Saint-anastasie-sur-issole", "Forcalqueiret", "Rocbaron", "Garéoult", "Néoules", "La roquebrussanne", "Mazaugues", "Méounes-lès-montrieux", "Belgentier",
    "Saint-Tropez", "Sainte-Maxime", "Cogolin", "Le Muy", "Taradeau", "Bormes-les-Mimosas", "Le Lavandou", "Hyères", "Toulon", "La Seyne-sur-Mer",

    // ALPES-MARITIMES (06)
    "Nice", "Cannes", "Antibes", "Grasse", "Cagnes-sur-Mer", "Le Cannet", "Saint-Laurent-du-Var", "Menton", "Vallauris", "Mandelieu-la-Napoule", "Mougins", "Vence",

    // BOUCHES-DU-RHÔNE (13)
    "Marseille", "Aix-en-Provence", "Arles", "Martigues", "Aubagne", "Salon-de-Provence", "Istres", "Vitrolles", "Marignane", "La Ciotat", "Gardanne", "Les Pennes-Mirabeau",

    // VAUCLUSE (84) & GARD (30)
    "Avignon", "Orange", "Carpentras", "Cavaillon", "Pertuis", "Nîmes", "Alès", "Uzès"
];

const highTicketDestinations = [
    { name: "Paris (Aéroports/Centre)", slug: "paris" },
    { name: "Lyon City", slug: "lyon" },
    { name: "Aéroport Lyon-Saint Exupéry", slug: "lyon-airport" },
    { name: "Genève (Suisse)", slug: "geneve" },
    { name: "Aéroport Genève-Cointrin", slug: "geneve-airport" },
    { name: "Monaco / Monte-Carlo", slug: "monaco" },
    { name: "Courchevel / Stations de ski", slug: "courchevel" },
    { name: "Milan (Italie)", slug: "milan" },
    { name: "Turin (Italie)", slug: "turin" },
    { name: "Barcelone (Espagne)", slug: "barcelone" },
    { name: "Bordeaux", slug: "bordeaux" },
    { name: "Toulouse", slug: "toulouse" },
    { name: "Gap / Hautes-Alpes", slug: "gap" },
    { name: "Briançon / Serre-Chevalier", slug: "briancon" },
    { name: "Station de Ski Isola 2000", slug: "isola-2000" },
    { name: "Station de Ski Valberg", slug: "valberg" }
];

const hubs = [
    { name: "Aéroport Marseille-Provence", slug: "aeroport-marseille" },
    { name: "Aéroport Nice Côte d'Azur", slug: "aeroport-nice" },
    { name: "Gare Aix-en-Provence TGV", slug: "gare-aix-tgv" },
    { name: "Gare de Marseille Saint-Charles", slug: "gare-marseille" },
    { name: "Gare de Nice-Ville", slug: "gare-nice" },
    { name: "Gare d'Avignon TGV", slug: "gare-avignon-tgv" },
    { name: "Héliport de Monaco", slug: "heliport-monaco" }
];

const hospitals = [
    // MARSEILLE
    { name: "La Timone", city: "Marseille", slug: "la-timone" },
    { name: "Chanteclerc Rééducation", city: "Marseille", slug: "chanteclerc" },
    { name: "Hôpital de la Conception Marseille", city: "Marseille", slug: "conception-marseille" },
    { name: "Institut Paoli-Calmettes", city: "Marseille", slug: "paoli-calmettes" },
    { name: "Hôpital Nord", city: "Marseille", slug: "hopital-nord" },
    { name: "Hôpital Clairval", city: "Marseille", slug: "clairval" },
    { name: "Hôpital Sainte Marguerite", city: "Marseille", slug: "st-marguerite" },
    { name: "Hôpital Européen", city: "Marseille", slug: "hopital-europeen" },

    // AIX
    { name: "Hôpital Privé de Provence (HPP)", city: "Aix-en-Provence", slug: "hpp-aix" },
    { name: "Clinique Axium", city: "Aix-en-Provence", slug: "axium" },
    { name: "Centre Hospitalier du Pays d'Aix", city: "Aix-en-Provence", slug: "ch-pays-aix" },
    { name: "Hôpital de Pertuis (CHI Aix-Pertuis)", city: "Pertuis", slug: "hopital-pertuis" },

    // AUBAGNE
    { name: "Hôpital La Casamance", city: "Aubagne", slug: "casamance" },
    { name: "Hôpital d'Aubagne", city: "Aubagne", slug: "hopital-aubagne" },
    { name: "Centre de Dialyse Aubagne", city: "Aubagne", slug: "dialyse-aubagne" },

    // TOULON / VAR
    { name: "Hôpital Sainte-Musse", city: "Toulon", slug: "sainte-musse" },
    { name: "Hôpital Sainte-Anne", city: "Toulon", slug: "sainte-anne" },
    { name: "Hôpital Croix Rouge", city: "Toulon", slug: "croix-rouge-toulon" },
    { name: "Clinique Saint Michel", city: "Toulon", slug: "st-michel-toulon" },
    { name: "Clinique Saint Jean", city: "Toulon", slug: "st-jean-toulon" },
    { name: "Clinique Saint Roch", city: "Toulon", slug: "st-roch-toulon" },
    { name: "Clinique Hélio-Marin", city: "Hyères", slug: "helio-marin" },
    { name: "Polyclinique Les Fleurs", city: "Ollioules", slug: "polyclinique-fleurs" },
    { name: "Centre de Dialyse", city: "Toulon", slug: "centre-dialyse-toulon" },
    { name: "Hôpital René Sabran", city: "Hyères", slug: "rene-sabran" },
    { name: "Hôpital Châteaubriand", city: "Hyères", slug: "chateaubriand" },
    { name: "Hôpital Léon Bérard", city: "Hyères", slug: "leon-berard" },
    { name: "Hôpital San Salvadour AP-HP", city: "Hyères", slug: "san-salvadour" },

    // FRÉJUS / NICE
    { name: "CHI Fréjus - Saint-Raphaël", city: "Fréjus", slug: "chi-frejus-st-raphael" },
    { name: "CERS Saint-Raphaël", city: "Saint-Raphaël", slug: "cers-st-raphael" },
    { name: "CHU de Nice - Hôpital Pasteur 2", city: "Nice", slug: "pasteur-2" },
    { name: "Hôpital l'Archet", city: "Nice", slug: "archet-nice" },
    { name: "Hôpital de Cimiez", city: "Nice", slug: "cimiez-nice" },
    { name: "Fondation Lenval", city: "Nice", slug: "lenval-nice" },
    { name: "Clinique du Parc Impérial", city: "Nice", slug: "parc-imperial" },
    { name: "Clinique Saint Georges", city: "Nice", slug: "st-georges-nice" },
    { name: "Hôpital Les Sources", city: "Nice", slug: "les-sources-nice" },
    { name: "Polyclinique Santa Maria", city: "Nice", slug: "santa-maria" },
    { name: "Clinique Kantys Centre", city: "Nice", slug: "kantys" },

    // MONTPELLIER
    { name: "CHU Lapeyronie", city: "Montpellier", slug: "lapeyronie-montpellier" },
    { name: "CHU de Montpellier", city: "Montpellier", slug: "chu-montpellier" },
    { name: "Clinique du Millénaire", city: "Montpellier", slug: "clinique-millenaire" },
    { name: "Hôpital Arnaud de Villeneuve", city: "Montpellier", slug: "arnaud-villeneuve" },
    { name: "Hôpital Gui de Chauliac", city: "Montpellier", slug: "gui-de-chauliac" }
];

const services = [
    { name: "Transport Privé Premium", slug: "prive-luxe" },
    { name: "Taxi Conventionné CPAM", slug: "medical" },
    { name: "Transfert VTC Longue Distance", slug: "vtc-longue-distance" },
    { name: "Navette Aéroport VIP", slug: "navette-aeroport" }
];

const seoData = {};
const sitemap = [];
const baseUrl = "https://sam-taxi.fr/";

// 1. Pages Villes x Services (Classique)
cities.forEach(city => {
    services.forEach(service => {
        const slug = `taxi-${service.slug}-${city.toLowerCase().replace(/ /g, '-')}`;
        seoData[slug] = {
            title: `${service.name} ${city} — Sam Taxi Service`,
            metaDesc: `Besoin d'un ${service.name.toLowerCase()} à ${city} ? Sam Taxi vous offre un service ponctuel et luxueux vers toutes destinations.`,
            h1: `${service.name}<br>à <em>${city}</em>`,
            heroSub: `Chauffeur professionnel disponible 24h/7j. Audi A4 Break premium.`,
            city: city,
            service: service.slug === "medical" ? "Médical" : "Privé"
        };
        sitemap.push(`${baseUrl}?p=${slug}`);
    });
});

// 2. High Ticket : Ville x Destinations Nationales/Internationales x Services
cities.forEach(city => {
    highTicketDestinations.forEach(dest => {
        services.forEach(service => {
            const slug = `taxi-${service.slug}-${city.toLowerCase().replace(/ /g, '-')}-vers-${dest.slug}`;
            seoData[slug] = {
                title: `${service.name} ${city} vers ${dest.name} — Longue Distance Premium`,
                metaDesc: `Trajet ${service.name.toLowerCase()} entre ${city} et ${dest.name}. Ponctualité, confort berline et discrétion totale garantis.`,
                h1: `${service.name} de ${city}<br>vers <em>${dest.name}</em>`,
                heroSub: `Spécialiste des trajets longue distance premium. Voyagez en première classe sur toute la France et l'Europe.`,
                city: city,
                destination: dest.name,
                service: service.slug === "medical" ? "Médical" : "Privé"
            };
            sitemap.push(`${baseUrl}?p=${slug}`);
        });
    });
});

// 3. Ultra High Ticket : Transferts Inter-Aéroports / Hubs
hubs.forEach(start => {
    hubs.forEach(end => {
        if (start.slug !== end.slug) {
            const slug = `transfert-${start.slug}-vers-${end.slug}`;
            seoData[slug] = {
                title: `Transfert VIP entre ${start.name} et ${end.name}`,
                metaDesc: `La liaison la plus rapide entre ${start.name} et ${end.name}. Chauffeur privé dédié, accueil prioritaire.`,
                h1: `Liaison Prestige<br><em>${start.name} ↔ ${end.name}</em>`,
                heroSub: `Transfert direct entre hubs de transport. La garantie d'une correspondance réussie.`,
                city: start.name.split(' ')[1] || "Provence"
            };
            sitemap.push(`${baseUrl}?p=${slug}`);
        }
    });
});

// 4. Hubs ↔ Villes (Aller-Retour)
hubs.forEach(hub => {
    cities.forEach(city => {
        // Sens : Hub vers Ville
        const slugHubToCity = `transfert-${hub.slug}-vers-${city.toLowerCase().replace(/ /g, '-')}`;
        seoData[slugHubToCity] = {
            title: `Transfert ${hub.name} vers ${city} — Chauffeur Privé`,
            metaDesc: `Réservez votre transfert depuis ${hub.name} vers ${city}. Chauffeur privé à votre arrivée avec pancarte nominative. Prix fixe.`,
            h1: `Transfert de ${hub.name}<br>vers <em>${city}</em>`,
            heroSub: `Liaison directe avec accueil personnalisé à l'arrivée. Ne perdez plus de temps dans les files d'attente.`,
            city: city
        };
        sitemap.push(`${baseUrl}?p=${slugHubToCity}`);

        // Sens : Ville vers Hub
        const slugCityToHub = `transfert-${city.toLowerCase().replace(/ /g, '-')}-vers-${hub.slug}`;
        seoData[slugCityToHub] = {
            title: `Transfert Taxi ${city} vers ${hub.name} — Ponctualité Garantie`,
            metaDesc: `Trajet serein en taxi premium depuis ${city} vers ${hub.name}. Arrivez à l'heure pour votre vol ou votre train. Bouteille d'eau à bord.`,
            h1: `Transfert de ${city}<br>vers <em>${hub.name}</em>`,
            heroSub: `Votre départ en toute sérénité. Ponctualité garantie pour ne jamais manquer votre correspondance.`,
            city: city
        };
        sitemap.push(`${baseUrl}?p=${slugCityToHub}`);
    });
});

// 5. Inter-Villes PACA / Régional
cities.forEach(cityStart => {
    cities.forEach(cityEnd => {
        if (cityStart !== cityEnd) {
            const slug = `taxi-${cityStart.toLowerCase().replace(/ /g, '-')}-vers-${cityEnd.toLowerCase().replace(/ /g, '-')}`;
            seoData[slug] = {
                title: `Taxi Privé de ${cityStart} vers ${cityEnd} — Réservez`,
                metaDesc: `Liaison rapide et confortable en taxi entre ${cityStart} et ${cityEnd}. Voyagez dans une berline premium avec chauffeur courtois.`,
                h1: `Trajet de ${cityStart}<br>vers <em>${cityEnd}</em>`,
                heroSub: `Votre connexion directe régionale. Un confort inégalé pour vos déplacements d'affaires ou personnels.`,
                city: cityStart,
                destination: cityEnd
            };
            sitemap.push(`${baseUrl}?p=${slug}`);
        }
    });
});

// 6. Transport Médical Spécialisé : Villes de départ -> Hôpitaux
cities.forEach(city => {
    hospitals.forEach(hosp => {
        const slug = `taxi-medical-${city.toLowerCase().replace(/ /g, '-')}-vers-${hosp.slug}`;
        seoData[slug] = {
            title: `Taxi Médical ${city} vers ${hosp.name} — Transport Conventionné CPAM`,
            metaDesc: `Besoin d'un taxi conventionné de ${city} vers ${hosp.name} ? Sam Taxi assure votre transport médical vers ${hosp.city} avec prise en charge CPAM à 100%.`,
            h1: `Taxi Médical de ${city}<br>vers <em>${hosp.name}</em>`,
            heroSub: `Chauffeur certifié et véhicule discret. Ponctualité garantie pour vos rendez-vous médicaux et consultations.`,
            city: city,
            destination: hosp.name,
            service: "Médical"
        };
        sitemap.push(`${baseUrl}?p=${slug}`);
    });
});

// Modifie les chemins de sortie pour s'assurer qu'ils aillent directement dans le dossier public
fs.writeFileSync('public/seo-data-master.json', JSON.stringify(seoData, null, 2));

// 7. Génération des fichiers Sitemap (Découpage par lots de 5000 pour Google)
const CHUNK_SIZE = 5000;
const sitemapChunks = [];

for (let i = 0; i < sitemap.length; i += CHUNK_SIZE) {
    sitemapChunks.push(sitemap.slice(i, i + CHUNK_SIZE));
}

sitemapChunks.forEach((chunk, index) => {
    const chunkXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${chunk.map(url => `  <url><loc>${url}</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>`).join('\n')}
</urlset>`;
    fs.writeFileSync(`public/sitemap-${index + 1}.xml`, chunkXml);
});

// Génération du Sitemap Index
const indexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapChunks.map((_, index) => `  <sitemap><loc>https://sam-taxi.fr/sitemap-${index + 1}.xml</loc></sitemap>`).join('\n')}
</sitemapindex>`;

fs.writeFileSync('public/sitemap.xml', indexXml);

console.log(`✅ Génération terminée : ${sitemap.length} pages réparties en ${sitemapChunks.length} fichiers sitemaps.`);
