# 🚀 Quick Netlify Setup Guide

## What Changed?

Your API keys are now **secure**! They're stored on the server (Netlify Functions) instead of being exposed in the browser.

## ⚡ Quick Deploy Steps

### 1. Delete Old Environment Variables in Netlify

Go to your Netlify site → **Site configuration** → **Environment variables**

**DELETE these old variables** (they have `VITE_` prefix):
- ❌ `VITE_GEMINI_API_KEY`
- ❌ `VITE_TAVUS_API_KEY`
- ❌ `VITE_TAVUS_REPLICA_ID`
- ❌ `VITE_TAVUS_PERSONA_ID`

### 2. Add New Environment Variables

**ADD these new variables** (NO `VITE_` prefix):

| Variable Name | Value | Secret? |
|--------------|-------|---------|
| `GEMINI_API_KEY` | `AIzaSyDY0U7OS6oKDa-09QcVOIgrpiYwYVlBEn8` | ✅ Yes |
| `TAVUS_API_KEY` | `818bf49c65074965b06dc0231cfaba1f` | ✅ Yes |
| `TAVUS_REPLICA_ID` | `rf4e9d9790f0` | ✅ Yes |
| `TAVUS_PERSONA_ID` | `p430f07f85fb` | ✅ Yes |

**For each variable:**
1. Click **Add a variable**
2. Enter the **Key** (e.g., `GEMINI_API_KEY`)
3. Enter the **Value** (your API key)
4. ✅ Check **"Contains secret values"**
5. Select **"All deploy contexts"** or at minimum:
   - ✅ Production
   - ✅ Deploy Previews
   - ✅ Branch deploys
6. Click **Create variable**

### 3. Update Build Settings

Go to **Site configuration** → **Build & deploy** → **Build settings**

Make sure these are set:
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Functions directory**: `netlify/functions` ← **Important!**

### 4. Trigger New Deploy

1. Go to **Deploys** tab
2. Click **Trigger deploy** → **Deploy site**
3. Wait 1-2 minutes
4. ✅ Build should succeed!

## ✅ Testing

After deployment:

1. **Test AI Assistant**:
   - Go to Lab tab
   - Toggle AI mode
   - Ask: "What happens when you mix HCl and NaOH?"
   - Should get AI response

2. **Test Video Session**:
   - Go to Expert Session tab
   - Click "Start Video Session"
   - Should connect to Dr. Nova

## 🔍 Debugging

If something doesn't work:

1. Go to **Functions** tab in Netlify
2. Click on `gemini` or `tavus` function
3. Check the logs for errors
4. Common issues:
   - Missing environment variable
   - Wrong variable name (check spelling!)
   - Forgot to check "Contains secret values"

## 📁 What's New in Your Code?

### New Files:
- `netlify/functions/gemini.js` - Secure Gemini API proxy
- `netlify/functions/tavus.js` - Secure Tavus API proxy

### Updated Files:
- `src/services/gemini.js` - Now calls Netlify Function
- `src/components/TavusSession.jsx` - Now calls Netlify Function
- `.env.example` - Updated with new variable names
- `DEPLOYMENT.md` - Complete deployment guide

## 🔒 Why This Is Better

**Before (Insecure):**
```
Browser → Direct API call with exposed key
```

**After (Secure):**
```
Browser → Netlify Function → API call with server-side key
```

Your API keys are now:
- ✅ Hidden from users
- ✅ Not in JavaScript bundle
- ✅ Secure on Netlify servers
- ✅ Can't be stolen from browser

## 🆘 Still Having Issues?

1. Make sure you pulled the latest code:
   ```bash
   git pull origin main
   ```

2. Check that `netlify/functions` folder exists with:
   - `gemini.js`
   - `tavus.js`

3. Verify environment variables have NO `VITE_` prefix

4. Check Netlify function logs for specific errors

---

**Need more help?** Check `DEPLOYMENT.md` for detailed troubleshooting!
