/**
 * Google Gemini AI Integration for Lab Assistant
 * Uses Netlify Functions to securely proxy API calls
 */

// Use Netlify Function endpoint (works in both dev and production)
const GEMINI_FUNCTION_URL = '/.netlify/functions/gemini';

/**
 * Send a message to Gemini AI via Netlify Function
 * @param {string} userMessage - The user's question
 * @param {Array} conversationHistory - Previous messages for context
 * @returns {Promise<string>} - AI response
 */
export async function askGemini(userMessage, conversationHistory = []) {
    try {
        const response = await fetch(GEMINI_FUNCTION_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: userMessage,
                conversationHistory: conversationHistory
            })
        });

        if (!response.ok) {
            const error = await response.json();
            console.error('Gemini function error:', error);
            throw new Error(error.error || 'Failed to get AI response');
        }

        const data = await response.json();
        return data.response;
    } catch (error) {
        console.error('Error calling Gemini function:', error);
        return `Sorry, I encountered an error: ${error.message}. Please try again.`;
    }
}

/**
 * Check if Gemini API is configured
 * Always returns true since configuration is handled server-side
 * @returns {boolean}
 */
export function isGeminiConfigured() {
    return true;
}
