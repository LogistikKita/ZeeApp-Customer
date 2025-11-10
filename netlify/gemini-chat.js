// File: netlify/gemini-chat.js
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({}); 

exports.handler = async (event) => {
    // Pastikan metode yang digunakan adalah POST
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
    }

    try {
        const { prompt } = JSON.parse(event.body);
        if (!prompt) {
            return { statusCode: 400, body: JSON.stringify({ error: 'Prompt is required' }) };
        }

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash', 
            contents: prompt,
        });

        const generatedText = response.text;

        return {
            statusCode: 200,
            body: JSON.stringify({ text: generatedText }),
            headers: { 'Content-Type': 'application/json' }
        };

    } catch (error) {
        // Ini akan menangkap dan mencatat error API Key atau error lainnya
        console.error('Gemini API Error:', error);
        
        let errorMessage = 'Internal Server Error';
        if (error.message) {
            errorMessage = `Error: ${error.message}`;
        }

        return {
            statusCode: 500,
            body: JSON.stringify({ error: errorMessage }),
        };
    }
};
