/**
 * Utility to send form data to Google Sheets via Google Apps Script Web App
 */

export const sendToGoogleSheet = async (data: any) => {
    const GOOGLE_SHEETS_URL = import.meta.env.VITE_GOOGLE_SHEETS_URL;

    if (!GOOGLE_SHEETS_URL) {
        console.warn("VITE_GOOGLE_SHEETS_URL is not defined in .env");
        return { success: false, error: "Configuration manquante" };
    }

    try {
        console.log("Transmission vers Google Sheets...", data);
        const response = await fetch(GOOGLE_SHEETS_URL, {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "text/plain",
            },
            body: JSON.stringify(data),
        });

        return { success: true };
    } catch (error) {
        console.error("Erreur Google Sheets:", error);
        return { success: false, error };
    }
};
