/**
 * Netlify Function: Tavus API Proxy
 * Securely calls Tavus API without exposing API key to client
 */

const TAVUS_API_KEY = process.env.TAVUS_API_KEY;
const TAVUS_REPLICA_ID = process.env.TAVUS_REPLICA_ID;
const TAVUS_PERSONA_ID = process.env.TAVUS_PERSONA_ID;
const TAVUS_API = 'https://tavusapi.com/v2/conversations';

export const handler = async (event, context) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, DELETE'
      },
      body: ''
    };
  }

  // Check if API key is configured
  if (!TAVUS_API_KEY || !TAVUS_REPLICA_ID) {
    console.error('Tavus credentials not found in environment variables');
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Tavus API credentials not configured' })
    };
  }

  try {
    // CREATE conversation
    if (event.httpMethod === 'POST' && !event.path.includes('/end')) {
      const { topic } = JSON.parse(event.body || '{}');

      const TUTOR_CONTEXT = `You are Dr. Nova, an enthusiastic and friendly AI chemistry tutor 
for high-school and university students. You are currently inside Reactech — a virtual 
chemistry lab application. Help students understand chemical reactions, safety rules, 
the periodic table, and lab techniques. Be encouraging, clear, and use simple analogies. 
Always remind students about safety when discussing dangerous reactions. 
Keep your answers concise and engaging for a video call format.`;

      const requestBody = {
        replica_id: TAVUS_REPLICA_ID,
        conversation_name: `Reactech Session — ${new Date().toLocaleTimeString()}`,
        conversational_context: TUTOR_CONTEXT + (topic ? `\n\nThe student wants to discuss: ${topic}` : ''),
        properties: {
          max_call_duration: 1800,     // 30 min max
          participant_left_timeout: 60, // end 60s after student leaves
          enable_recording: false,
        },
      };

      if (TAVUS_PERSONA_ID) {
        requestBody.persona_id = TAVUS_PERSONA_ID;
      }

      const response = await fetch(TAVUS_API, {
        method: 'POST',
        headers: {
          'x-api-key': TAVUS_API_KEY,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        return {
          statusCode: response.status,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            error: error.message || `Tavus API error: ${response.status}` 
          })
        };
      }

      const data = await response.json();
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      };
    }

    // END conversation
    if (event.httpMethod === 'POST' && event.path.includes('/end/')) {
      const conversationId = event.path.split('/end/')[1];
      
      if (!conversationId) {
        return {
          statusCode: 400,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ error: 'Conversation ID required' })
        };
      }

      const response = await fetch(`${TAVUS_API}/${conversationId}/end`, {
        method: 'POST',
        headers: {
          'x-api-key': TAVUS_API_KEY,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        return {
          statusCode: response.status,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            error: error.message || `Failed to end conversation: ${response.status}` 
          })
        };
      }

      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ success: true })
      };
    }

    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Method not allowed' })
    };

  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        error: error.message || 'Internal server error' 
      })
    };
  }
};
