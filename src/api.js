// Backend URL — set VITE_API_URL in your hosting platform's env vars.
// Falls back to localhost for local development.
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export async function mixChemicals(chem1, chem2) {
    const res = await fetch(`${API_BASE}/mix`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chem1, chem2 }),
    });
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    return res.json(); // { risk, effect, message, explanation, teacher_notes }
}
