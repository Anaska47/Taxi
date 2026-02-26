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
        const response = await fetch(GOOGLE_SHEETS_URL, {
            method: "POST",
            mode: "no-cors", // Required for Google Apps Script Web App bypass
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        // With no-cors, we can't check response.ok, but if it doesn't throw, it likely worked
        return { success: true };
    } catch (error) {
        console.error("Error sending to Google Sheets:", error);
        return { success: false, error };
    }
};
