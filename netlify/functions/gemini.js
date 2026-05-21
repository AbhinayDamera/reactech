/**
 * Netlify Function: Gemini AI Proxy
 * Securely calls Gemini API without exposing API key to client
 */

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

export const handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  // Check if API key is configured
  if (!GEMINI_API_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Gemini API key not configured' })
    };
  }

  try {
    const { message, conversationHistory } = JSON.parse(event.body);

    if (!message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Message is required' })
      };
    }

    // Build conversation context
    const SYSTEM_PROMPT = `You are a helpful chemistry lab assistant for Reactech, a virtual chemistry lab application. Your role is to:

1. Help students understand chemical reactions and their properties
2. Explain safety precautions and risk levels (safe, moderate, danger)
3. Provide educational insights about acids, bases, metals, salts, and other chemical categories
4. Answer questions about chemical equations and reaction types
5. Be encouraging and supportive while maintaining scientific accuracy

Keep responses concise (2-3 paragraphs max), clear, and educational. Use emojis occasionally to make learning fun. When discussing reactions, always mention safety considerations.

Format your responses in plain text with simple HTML tags like <strong>, <em>, and <br> for formatting.`;

    let contextText = SYSTEM_PROMPT + '\n\n';
    
    // Add recent conversation history (last 6 messages for context)
    if (conversationHistory && conversationHistory.length > 0) {
      const recentHistory = conversationHistory.slice(-6);
      contextText += 'Previous conversation:\n';
      recentHistory.forEach(msg => {
        const role = msg.role === 'user' ? 'Student' : 'Assistant';
        const text = msg.text || msg.html?.replace(/<[^>]*>/g, '') || '';
        contextText += `${role}: ${text}\n`;
      });
      contextText += '\n';
    }
    
    contextText += `Student: ${message}\nAssistant:`;

    // Call Gemini API
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: contextText
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 500,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_ONLY_HIGH"
          }
        ]
      })
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Gemini API error:', error);
      return {
        statusCode: response.status,
        body: JSON.stringify({ 
          error: error.error?.message || 'Failed to get AI response' 
        })
      };
    }

    const data = await response.json();
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!aiResponse) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'No response generated' })
      };
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ response: aiResponse })
    };

  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: error.message || 'Internal server error' 
      })
    };
  }
};
