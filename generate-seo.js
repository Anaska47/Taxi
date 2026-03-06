const fs = require('fs');

const cities = [
    // VAR (83)
    "Brignoles", "Toulon", "Hyères", "Fréjus", "Saint-Raphaël", "Draguignan", "Six-Fours-les-Plages", "La Seyne-sur-Mer", "Saint-Tropez", "Sainte-Maxime",
    "Cogolin", "Le Muy", "Vidauban", "Le Luc", "Lorgues", "Garéoult", "Saint-Maximin-la-Sainte-Baume", "Rocbaron", "Tourves", "Le Val", "Cotignac", "Barjols",

    // ALPES-MARITIMES (06)
    "Nice", "Cannes", "Antibes", "Grasse", "Cagnes-sur-Mer", "Le Cannet", "Saint-Laurent-du-Var", "Menton", "Vallauris", "Mandelieu-la-Napoule", "Mougins", "Vence",

    // BOUCHES-DU-RHÔNE (13)
    "Marseille", "Aix-en-Provence", "Arles", "Martigues", "Aubagne", "Salon-de-Provence", "Istres", "Vitrolles", "Marignane", "La Ciotat", "Gardanne", "Les Pennes-Mirabeau",

    // VAUCLUSE (84) - LUBERON/PROVENCE
    "Avignon", "Orange", "Carpentras", "Cavaillon", "Pertuis", "Sorgues", "L'Isle-sur-la-Sorgue", "Apt", "Gordes", "Bonnieux", "Lourmarin", "Valensole",

    // GARD (30)
    "Nîmes", "Alès", "Uzès", "Bagnols-sur-Cèze", "Beaucaire", "Villeneuve-lès-Avignon"
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
    { name: "Port de Marseille (Croisières)", slug: "croisiere-marseille" },
    { name: "Port de Toulon (Corsica Ferries)", slug: "port-toulon" },
    { name: "Station de Ski Isola 2000", slug: "isola-2000" },
    { name: "Station de Ski Valberg", slug: "valberg" }
];

const hubs = [
    { name: "Aéroport Marseille-Provence", slug: "aeroport-marseille" },
    { name: "Aéroport Nice Côte d'Azur", slug: "aeroport-nice" },
    { name: "Aéroport Toulon-Hyères", slug: "aeroport-toulon" },
    { name: "Gare Aix-en-Provence TGV", slug: "gare-aix-tgv" },
    { name: "Gare de Marseille Saint-Charles", slug: "gare-marseille" },
    { name: "Gare de Nice-Ville", slug: "gare-nice" },
    { name: "Gare d'Avignon TGV", slug: "gare-avignon-tgv" },
    { name: "Gare de Toulon", slug: "gare-toulon" },
    { name: "Héliport de Monaco", slug: "heliport-monaco" }
];

const services = [
    { name: "Transport Privé Premium", slug: "prive-luxe" },
    { name: "Taxi Conventionné CPAM", slug: "medical" },
    { name: "Transfert VTC Longue Distance", slug: "vtc-longue-distance" },
    { name: "Navette Aéroport VIP", slug: "navette-aeroport" }
];

const seoData = {};
const sitemap = [];
const baseUrl = "https://sam-taxi.fr/index.html";

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

// 2. High Ticket : Ville x Destinations Nationales/Internationales
cities.forEach(city => {
    highTicketDestinations.forEach(dest => {
        const slug = `taxi-${city.toLowerCase()}-vers-${dest.slug}`;
        seoData[slug] = {
            title: `Taxi ${city} vers ${dest.name} — Longue Distance Premium`,
            metaDesc: `Trajet haute qualité entre ${city} et ${dest.name}. Confort berline, bouteille d'eau, chargeurs et discrétion totale.`,
            h1: `De ${city}<br>vers <em>${dest.name}</em>`,
            heroSub: `Spécialiste des trajets longue distance. Voyagez en première classe sur toute la France et l'Europe.`,
            city: city,
            destination: dest.name
        };
        sitemap.push(`${baseUrl}?p=${slug}`);
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

// Sauvegarde du JSON
fs.writeFileSync('seo-data-master.json', JSON.stringify(seoData, null, 2));

// Génération du Sitemap XML
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemap.map(url => `  <url><loc>${url}</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>`).join('\n')}
</urlset>`;

fs.writeFileSync('sitemap.xml', xml);

console.log(`✅ Génération terminée : ${sitemap.length} pages créées.`);
