# Deploying Reactech to Netlify

This guide will help you deploy your Reactech Virtual Chemistry Lab to Netlify with **secure API key management**.

## 🔐 Security Architecture

Your API keys are now **securely stored on the server** using Netlify Functions. This prevents them from being exposed in the client-side JavaScript bundle.

### How It Works:
- **Frontend** → Calls Netlify Functions (`/.netlify/functions/gemini`, `/.netlify/functions/tavus`)
- **Netlify Functions** → Securely call external APIs with server-side API keys
- **API Keys** → Stored as Netlify Environment Variables (never exposed to users)

## 📋 Prerequisites

1. A [Netlify account](https://app.netlify.com/signup) (free tier works great!)
2. Your project pushed to a Git repository (GitHub, GitLab, or Bitbucket)
3. API keys ready:
   - **Gemini API Key** from [Google AI Studio](https://aistudio.google.com/app/apikey)
   - **Tavus API Keys** from [Tavus Platform](https://platform.tavus.io)

## 🚀 Deployment Steps

### Step 1: Connect Your Repository

1. Log in to [Netlify](https://app.netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose your Git provider (GitHub, GitLab, or Bitbucket)
4. Select your **reactech** repository
5. Authorize Netlify to access your repository

### Step 2: Configure Build Settings

On the deployment configuration screen, enter:

| Setting | Value |
|---------|-------|
| **Base directory** | *(leave empty)* |
| **Build command** | `npm run build` |
| **Publish directory** | `dist` |
| **Functions directory** | `netlify/functions` |

### Step 3: Add Environment Variables

Click **"Add environment variables"** and add these **4 variables**:

#### 1. GEMINI_API_KEY
- **Key**: `GEMINI_API_KEY` (⚠️ NO `VITE_` prefix!)
- **Value**: Your Gemini API key (starts with `AIzaSy...`)
- ✅ Check **"Contains secret values"**
- Scopes: Select **"All deploy contexts"** or at minimum:
  - ✅ Production
  - ✅ Deploy Previews
  - ✅ Branch deploys

#### 2. TAVUS_API_KEY
- **Key**: `TAVUS_API_KEY` (⚠️ NO `VITE_` prefix!)
- **Value**: Your Tavus API key (32 character hex string)
- ✅ Check **"Contains secret values"**
- Scopes: Same as above

#### 3. TAVUS_REPLICA_ID
- **Key**: `TAVUS_REPLICA_ID` (⚠️ NO `VITE_` prefix!)
- **Value**: Your Tavus Replica ID (starts with `r` or `rf`)
- ✅ Check **"Contains secret values"**
- Scopes: Same as above

#### 4. TAVUS_PERSONA_ID
- **Key**: `TAVUS_PERSONA_ID` (⚠️ NO `VITE_` prefix!)
- **Value**: Your Tavus Persona ID (starts with `p`)
- ✅ Check **"Contains secret values"**
- Scopes: Same as above

> **⚠️ IMPORTANT**: 
> - Do NOT use `VITE_` prefix (that exposes keys to the browser!)
> - Make sure to check **"Contains secret values"** for all API keys
> - This keeps your keys secure on the server

### Step 4: Deploy!

1. Click **"Deploy reactech"** (or your site name)
2. Wait 1-2 minutes for the build to complete
3. Once deployed, click the site URL to view your live app! 🎉

## 🔍 Verifying Your Deployment

After deployment, test these features:

1. **Lab Assistant (Gemini AI)**:
   - Go to the Lab tab
   - Click the AI toggle in Lab Assistant
   - Ask a chemistry question
   - You should get an AI response

2. **Expert Session (Tavus Video)**:
   - Go to the Expert Session tab
   - Click "Start Video Session with Dr. Nova"
   - You should connect to a live video call

If either feature doesn't work, check the **Functions** tab in Netlify to see error logs.

## 🛠️ Troubleshooting

### Build Fails with "Exposed secrets detected"

This means API keys are still in your client-side code. Make sure you:
1. ✅ Pulled the latest code (with Netlify Functions)
2. ✅ Removed all `VITE_` prefixes from environment variables in Netlify
3. ✅ Used the correct variable names: `GEMINI_API_KEY`, `TAVUS_API_KEY`, etc.
4. ✅ Cleared old environment variables with `VITE_` prefix

**To fix:**
1. Go to **Site configuration** → **Environment variables**
2. Delete any variables starting with `VITE_`
3. Add the 4 variables WITHOUT `VITE_` prefix (see Step 3 above)
4. Trigger a new deploy

### AI Assistant Not Working

1. Go to Netlify Dashboard → **Functions** tab
2. Click on `gemini` function
3. Check the logs for errors
4. Verify `GEMINI_API_KEY` is set correctly in Environment Variables
5. Make sure there's NO `VITE_` prefix

### Video Session Not Working

1. Go to Netlify Dashboard → **Functions** tab
2. Click on `tavus` function
3. Check the logs for errors
4. Verify all three Tavus variables are set correctly
5. Make sure there's NO `VITE_` prefix

### Functions Not Found (404 Error)

1. Make sure `netlify/functions` folder exists in your repository
2. Verify **Functions directory** is set to `netlify/functions` in build settings
3. Check that `gemini.js` and `tavus.js` files exist in that folder
4. Redeploy the site

## 📝 Local Development

To test Netlify Functions locally:

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Create a .env file with your API keys (DO NOT COMMIT THIS!)
cat > .env << EOF
GEMINI_API_KEY=your_key_here
TAVUS_API_KEY=your_key_here
TAVUS_REPLICA_ID=your_id_here
TAVUS_PERSONA_ID=your_id_here
EOF

# Run local dev server with functions
netlify dev
```

This will start a local server at `http://localhost:8888` with working Netlify Functions.

## 🔄 Updating Environment Variables

To update API keys after deployment:

1. Go to Netlify Dashboard
2. Select your site
3. Go to **Site configuration** → **Environment variables**
4. Click on the variable you want to update
5. Edit the value
6. Click **Save**
7. Trigger a new deploy (or wait for next push)

## 🌐 Custom Domain (Optional)

To add a custom domain:

1. Go to **Site configuration** → **Domain management**
2. Click **Add a domain**
3. Follow the instructions to configure DNS
4. Netlify will automatically provision an SSL certificate

## 📊 Monitoring

Monitor your deployment:

- **Deploys**: See build history and logs
- **Functions**: View function invocations and errors
- **Analytics**: Track site visits (requires upgrade)
- **Logs**: Real-time function logs for debugging

## 🔒 Security Best Practices

1. ✅ Never use `VITE_` prefix for API keys (exposes them to browser)
2. ✅ Always check **"Contains secret values"** for API keys
3. ✅ Never commit `.env` file to Git (it's in `.gitignore`)
4. ✅ Use different API keys for development and production
5. ✅ Regularly rotate your API keys
6. ✅ Monitor API usage in Google AI Studio and Tavus Platform

## 🎓 Next Steps

- Set up [deploy previews](https://docs.netlify.com/site-deploys/deploy-previews/) for pull requests
- Configure [branch deploys](https://docs.netlify.com/site-deploys/overview/#branch-deploy-controls) for staging
- Add [custom headers](https://docs.netlify.com/routing/headers/) for security
- Set up [form handling](https://docs.netlify.com/forms/setup/) for user feedback

## 🆘 Need Help?

- [Netlify Documentation](https://docs.netlify.com/)
- [Netlify Functions Guide](https://docs.netlify.com/functions/overview/)
- [Netlify Community Forum](https://answers.netlify.com/)
- [Netlify Support](https://www.netlify.com/support/)

---

## 📌 Quick Reference

### Environment Variables (Server-Side)
```
GEMINI_API_KEY=your_gemini_key
TAVUS_API_KEY=your_tavus_key
TAVUS_REPLICA_ID=your_replica_id
TAVUS_PERSONA_ID=your_persona_id
```

### Netlify Functions Endpoints
```
/.netlify/functions/gemini  → Gemini AI proxy
/.netlify/functions/tavus   → Tavus video proxy
```

### Build Settings
```
Build command: npm run build
Publish directory: dist
Functions directory: netlify/functions
```

---

**Congratulations!** 🎉 Your Reactech Virtual Chemistry Lab is now live and secure!
