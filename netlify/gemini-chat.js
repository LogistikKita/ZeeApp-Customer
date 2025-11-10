import { GoogleGenAI } from '@google/genai';

// Inisialisasi Gemini API client. 
// Kunci API (GEMINI_API_KEY) diambil secara otomatis dan aman dari Netlify Environment Variables.
const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);

// Model yang digunakan. Gemini 2.5 Flash direkomendasikan untuk respons cepat.
const MODEL_NAME = 'gemini-2.5-flash'; 

/**
 * Handler utama untuk Netlify Function.
 * @param {object} event - Objek event yang dikirimkan oleh Netlify/AWS Lambda.
 * @returns {object} - Objek respons HTTP.
 */
export const handler = async (event) => {
    // 1. Memastikan hanya menerima permintaan POST
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method Not Allowed. Use POST.' }),
        };
    }

    try {
        // 2. Mendapatkan prompt/pertanyaan dari body permintaan JSON (dari website frontend)
        const { prompt } = JSON.parse(event.body);

        if (!prompt) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Missing prompt in request body.' }),
            };
        }

        // Opsional: Log permintaan untuk debugging di Netlify
        console.log(`Received prompt for Gemini: ${prompt}`);

        // 3. Panggilan ke Gemini API
        const response = await ai.models.generateContent({
            model: MODEL_NAME,
            // Anda bisa menambahkan konteks sistem di sini jika perlu, 
            // misalnya: "Anda adalah asisten logistik yang ramah."
            contents: prompt, 
        });

        // 4. Mengembalikan hasil (teks) ke website frontend
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                // Opsional: Header CORS jika diperlukan, meskipun biasanya tidak
                // diperlukan saat memanggil function di domain Netlify yang sama
            },
            body: JSON.stringify({ 
                // Mengirim kembali teks hasil dari Gemini
                result: response.text 
            }),
        };

    } catch (error) {
        console.error('Gemini Function Error:', error);
        
        // Mengembalikan respons error yang informatif tetapi tidak mengungkapkan API Key
        return {
            statusCode: 500,
            body: JSON.stringify({ 
                error: 'Internal Server Error during AI call.', 
                details: 'Failed to generate content from Gemini.' 
            }),
        };
    }
};
