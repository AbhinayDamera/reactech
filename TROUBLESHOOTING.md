# Troubleshooting Guide - Reactech

## Lab Assistant JSON Error

### Problem
Error message: `"Failed to execute 'json' on 'Response': Unexpected end of JSON input"`

### Root Cause
The Netlify Function requires the `GEMINI_API_KEY` environment variable, but it's not configured.

### Solution

#### For Local Development:

1. **Ensure `.env` file has both variables:**
   ```env
   VITE_GEMINI_API_KEY=your_key_here
   GEMINI_API_KEY=your_key_here
   ```
   - `VITE_GEMINI_API_KEY` = Frontend (browser)
   - `GEMINI_API_KEY` = Backend (Netlify Functions)

2. **Use Netlify Dev instead of Vite directly:**
   ```bash
   npm run dev
   ```
   This starts Netlify Dev which runs both Vite AND the serverless functions.

3. **Access the app at:**
   - `http://localhost:8888` (Netlify Dev proxy)
   - NOT `http://localhost:5173` (Vite only - functions won't work)

#### For Production (Netlify):

1. Go to **Netlify Dashboard** → Your Site → **Site settings** → **Environment variables**

2. Add these variables:
   - `GEMINI_API_KEY` = Your Gemini API key
   - `TAVUS_API_KEY` = Your Tavus API key (for Expert Session)
   - `TAVUS_REPLICA_ID` = Your Tavus replica ID
   - `TAVUS_PERSONA_ID` = Your Tavus persona ID

3. **Redeploy** your site (or trigger a new deploy)

4. Test the Lab Assistant

---

## Common Issues

### 1. "Method not allowed" error
**Cause:** Trying to GET the function endpoint instead of POST  
**Solution:** The Lab Assistant should automatically POST. Check browser console for errors.

### 2. "Gemini API key not configured"
**Cause:** Environment variable not set  
**Solution:** Follow steps above to add `GEMINI_API_KEY`

### 3. Functions work in production but not locally
**Cause:** Using `vite` instead of `netlify dev`  
**Solution:** Run `npm run dev` (which now uses `netlify dev`)

### 4. CORS errors
**Cause:** Accessing from wrong port  
**Solution:** Use `http://localhost:8888` not `http://localhost:5173`

---

## Verification Steps

### Test Netlify Function Locally:

1. Start the dev server:
   ```bash
   npm run dev
   ```

2. Open browser console and run:
   ```javascript
   fetch('http://localhost:8888/.netlify/functions/gemini', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ message: 'What is an acid?' })
   })
   .then(r => r.json())
   .then(console.log)
   ```

3. You should see:
   ```json
   { "response": "An acid is a substance that..." }
   ```

### Test in Production:

1. Open your deployed site
2. Go to Lab tab
3. Type a question in the Lab Assistant
4. Check browser console for errors

---

## Environment Variable Checklist

### Local Development (`.env` file):
- ✅ `VITE_GEMINI_API_KEY`
- ✅ `GEMINI_API_KEY` ← **Required for functions**
- ✅ `VITE_TAVUS_API_KEY`
- ✅ `VITE_TAVUS_REPLICA_ID`
- ✅ `VITE_TAVUS_PERSONA_ID`

### Production (Netlify Dashboard):
- ✅ `GEMINI_API_KEY` ← **Required for functions**
- ✅ `TAVUS_API_KEY`
- ✅ `TAVUS_REPLICA_ID`
- ✅ `TAVUS_PERSONA_ID`

---

## Still Having Issues?

1. **Check Netlify Function logs:**
   - Netlify Dashboard → Functions → gemini → View logs

2. **Check browser console:**
   - F12 → Console tab → Look for red errors

3. **Verify API key is valid:**
   - Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Generate a new key if needed

4. **Test the Gemini API directly:**
   ```bash
   curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=YOUR_KEY" \
     -H 'Content-Type: application/json' \
     -d '{"contents":[{"parts":[{"text":"Hello"}]}]}'
   ```

---

## Quick Fix Summary

**If you see the JSON error:**

1. Add `GEMINI_API_KEY=your_key` to `.env`
2. Run `npm run dev` (not `npm run dev:vite`)
3. Access `http://localhost:8888` (not `:5173`)
4. For production: Add `GEMINI_API_KEY` to Netlify environment variables

**That's it!** 🎉
