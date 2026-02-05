import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'SAM TAXI Backend is running' });
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
    console.log(`   - POST /api/booking`);
    console.log(`   - POST /api/contact`);
});
