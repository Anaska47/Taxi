import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Gemini AI (server-side only - secure)
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'SAM TAXI Backend is running' });
});

// AI Concierge endpoint
app.post('/api/concierge', async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: message,
            config: {
                systemInstruction: `Tu es "Sam's Concierge", l'assistant de prestige de SAM TAXI à Toulon. 
        Ton ton est celui d'un majordome : élégant, poli, calme et haut de gamme.
        
        VÉHICULE UNIQUE : Audi A4 Avant (Break) Noir Mythic.
        - INTERDICTION : Ne mentionne jamais le terme "sport", "vitesse" ou "performance".
        - FOCUS : Concentre-toi sur le LUXE, le CONFORT, le SILENCE et le PRESTIGE.
        - AVANTAGE : L'Audi A4 Break est choisie pour son confort souverain et son grand coffre idéal pour les valises, tout en restant une voiture de maître.
        - SERVICES : Privé VIP, Aéroports (Marseille, Nice, Toulon), Gares, et Taxi Conventionné CPAM (même en transport médical, nous offrons le prestige de l'Audi).
        
        OBJECTIFS :
        - Informer sur les services de transport avec un vocabulaire riche (sérénité, raffinement, excellence).
        - Rappeler que l'intérieur est en cuir avec une ambiance feutrée.
        - Inciter à la réservation sereine via le site ou par appel.
        
        Réponds exclusivement en français.`,
                temperature: 0.7,
            },
        });

        res.json({ response: response.text });
    } catch (error) {
        console.error('Gemini API Error:', error);
        res.status(500).json({
            error: 'Service temporairement indisponible',
            message: "Je vous prie d'accepter mes excuses. Un imprévu technique m'empêche de vous assister. Je vous invite à nous contacter par téléphone pour un service immédiat."
        });
    }
});

// Booking endpoint
app.post('/api/booking', async (req, res) => {
    try {
        const { pickup, destination, date, time, passengers, serviceType, name, phone, email } = req.body;

        // Validation
        if (!pickup || !destination || !date || !time || !name || !phone) {
            return res.status(400).json({
                error: 'Tous les champs obligatoires doivent être remplis'
            });
        }

        // Here you would typically:
        // 1. Save to database
        // 2. Send confirmation email
        // 3. Send SMS notification
        // 4. Notify admin

        console.log('📅 Nouvelle réservation:', {
            pickup,
            destination,
            date,
            time,
            passengers,
            serviceType,
            name,
            phone,
            email,
            timestamp: new Date().toISOString()
        });

        // For now, just return success
        res.json({
            success: true,
            message: 'Votre réservation a été enregistrée avec succès. Nous vous contacterons sous peu pour confirmation.',
            bookingId: `SAM-${Date.now()}`
        });
    } catch (error) {
        console.error('Booking Error:', error);
        res.status(500).json({
            error: 'Erreur lors de la réservation',
            message: 'Une erreur est survenue. Veuillez réessayer ou nous contacter directement.'
        });
    }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({
                error: 'Nom, email et message sont requis'
            });
        }

        console.log('📧 Nouveau message de contact:', {
            name,
            email,
            phone,
            message,
            timestamp: new Date().toISOString()
        });

        res.json({
            success: true,
            message: 'Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.'
        });
    } catch (error) {
        console.error('Contact Error:', error);
        res.status(500).json({
            error: 'Erreur lors de l\'envoi du message'
        });
    }
});

app.listen(PORT, () => {
    console.log(`🚖 SAM TAXI Backend running on http://localhost:${PORT}`);
    console.log(`📡 API endpoints:`);
    console.log(`   - GET  /api/health`);
    console.log(`   - POST /api/concierge`);
    console.log(`   - POST /api/booking`);
    console.log(`   - POST /api/contact`);
});
