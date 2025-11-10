// File: netlify/gemini-chat.js

import { GoogleGenAI } from '@google/genai';

// Inisialisasi GoogleGenAI. 
// Library akan secara otomatis mencari nilai dari process.env.GEMINI_API_KEY
// Jika kita menggunakan nama variabel GEMINI_API_KEY.
const ai = new GoogleGenAI({}); 

/**
 * Handler untuk Netlify Function.
 */
exports.handler = async (event) => {
    // Pastikan metode yang digunakan adalah POST
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method Not Allowed' }),
        };
    }

    try {
        // Ambil prompt dari body request
        const { prompt } = JSON.parse(event.body);

        if (!prompt) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Prompt is required' }),
            };
        }

        console.log('Received prompt:', prompt);

        // Panggil Gemini API
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash', 
            contents: prompt,
        });

        const generatedText = response.text;

        console.log('Gemini response:', generatedText);

        // Kirimkan respon kembali ke frontend
        return {
            statusCode: 200,
            body: JSON.stringify({ text: generatedText }),
            headers: {
                'Content-Type': 'application/json'
            }
        };

    } catch (error) {
        console.error('Gemini API Error:', error);
        
        // Cek apakah error terkait API Key
        let errorMessage = 'Internal Server Error';
        if (error.message && error.message.includes('API_KEY_INVALID')) {
             errorMessage = 'Error: API Key mungkin salah atau tidak diset.';
        } else if (error.message) {
            errorMessage = `Error: ${error.message}`;
        }


        return {
            statusCode: 500,
            body: JSON.stringify({ 
                error: errorMessage,
                detail: error.message // Untuk debugging
            }),
        };
    }
};

