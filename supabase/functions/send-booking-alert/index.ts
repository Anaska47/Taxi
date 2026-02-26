import { serve } from "https://deno.land/std@0.131.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

serve(async (req) => {
    try {
        const { record } = await req.json()

        // Format the email content
        const tripTypeText = record.is_round_trip ? 'Aller-Retour 🔄' : 'Aller Simple ➡'
        const dateText = new Date(record.date).toLocaleDateString('fr-FR')
        const returnDateText = record.return_date ? new Date(record.return_date).toLocaleDateString('fr-FR') : ''

        const emailHtml = `
      <div style="font-family: sans-serif; color: #123A7A; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px;">
        <h1 style="font-size: 20px; border-bottom: 2px solid #123A7A; padding-bottom: 12px;">🚨 Nouvelle Réservation SAM TAXI</h1>
        
        <div style="margin: 20px 0;">
          <p><strong>Client :</strong> ${record.name}</p>
          <p><strong>Téléphone :</strong> <a href="tel:${record.phone}">${record.phone}</a></p>
          <p><strong>Type :</strong> ${record.type === 'medical' ? '🏥 Médical Conventionné' : '🚗 Privé / Premium'}</p>
          <p><strong>Trajet :</strong> ${tripTypeText}</p>
        </div>

        <div style="background: #f8fafc; padding: 16px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Départ :</strong> ${record.pickup_address}</p>
          <p><strong>Destination :</strong> ${record.destination_address}</p>
          <p><strong>Le :</strong> ${dateText} à ${record.time}</p>
          ${record.is_round_trip ? `<p><strong>Retour le :</strong> ${returnDateText} à ${record.return_time}</p>` : ''}
        </div>

        ${record.comment ? `<p style="font-style: italic; color: #64748b;">" ${record.comment} "</p>` : ''}
        
        <div style="margin-top: 24px; font-size: 12px; color: #94a3b8;">
          Ceci est une notification automatique du site SAM TAXI (Toulon).
        </div>
      </div>
    `

        const res = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${RESEND_API_KEY}`,
            },
            body: JSON.stringify({
                from: 'SAM TAXI <onboarding@resend.dev>', // You can customize this later with a domain
                to: ['sam.taxi83@gmail.com'], // Replace with your actual email
                subject: `Nouvelle Réservation - ${record.name}`,
                html: emailHtml,
            }),
        })

        const data = await res.json()
        return new Response(JSON.stringify(data), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 })
    }
})
