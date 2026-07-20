# Reactech — Virtual Chemistry Lab

**Gesture-controlled virtual chemistry lab with AI tutoring for safe, interactive learning.**

---

## Inspiration

During the pandemic, students lost access to chemistry labs. But the problem goes deeper — many of the most exciting reactions like **sodium + water** ($2Na + 2H_2O \rightarrow 2NaOH + H_2 \uparrow$) are too dangerous to ever demonstrate in schools. We wanted to make these experiments safe and accessible through webcam-based gesture control, letting students literally mix chemicals with their hands.

---

## What it does

Reactech transforms any webcam into a chemistry lab with four modes:

- **🧪 Manual Lab** — Select chemicals from dropdowns, test pH with interactive litmus paper, see realistic beaker mixing
- **🔬 Live Lab** — MediaPipe tracks your hands (30fps, 21 landmarks), bring them together to trigger reactions with risk-graduated 3D effects
- **📖 Reaction Guide** — Browse 44+ reactions with advanced filtering and search
- **👩‍🔬 Expert Session** — Live AI video tutor powered by Tavus for face-to-face chemistry guidance
- **🤖 AI Assistant** — Google Gemini 2.5 Flash provides contextual chemistry help via Netlify Functions

---

## How we built it

**Frontend:**
- **React 19 + Vite** for fast development and optimized builds
- **MediaPipe Hands** for real-time gesture recognition
- **Three.js** for 3D particle effects (explosions, smoke, sparks) at 60fps
- Optimized gesture detection using `useRef` instead of `useState` for <50ms latency

**Key Code:**
```javascript
// Zero-delay gesture recognition
const distance = Math.sqrt(
  Math.pow(hand1.x - hand2.x, 2) + 
  Math.pow(hand1.y - hand2.y, 2)
);

if (distance < 0.20 && !lockedRef.current) {
  lockedRef.current = true;
  triggerReaction(); // <50ms response time
}
```

**AI Integration:**
- **Google Gemini** via Netlify serverless functions for secure API calls
- **Tavus AI** for video tutoring with Daily.co WebRTC
- Context-aware conversations with fallback to local Q&A

**Backend:**
- **Python FastAPI** with four microservices:
  - Chemistry engine for thermodynamics ($\Delta G = \Delta H - T\Delta S$)
  - Safety validator with hazard assessment
  - Reaction analyzer for mistake detection
  - Multi-provider LLM service (Gemini/OpenAI/Claude)

**Database:**
- 35 chemicals (acids, bases, metals, salts, organics)
- 44+ reactions with balanced equations and safety data

---

## Challenges we ran into

### 1. **React Performance**
**Problem:** `useState` for hand tracking caused 200ms lag  
**Solution:** Switched to `useRef` → achieved <50ms latency

### 2. **Hand Tracking Accuracy**
**Problem:** MediaPipe lost tracking in poor lighting  
**Solution:** 5-frame smoothing + confidence thresholds + visual feedback (green/yellow/red dots)

### 3. **Bundle Size**
**Problem:** 1.35MB initial bundle, slow loading  
**Solution:** Code splitting with Vite → reduced to 147KB (89% reduction)

### 4. **AI Reliability**
**Problem:** API rate limits and network failures  
**Solution:** Netlify Functions for security + exponential backoff + local Q&A fallback

---

## Accomplishments that we're proud of

✅ **<50ms gesture recognition** through React optimization  
✅ **35 chemicals, 44+ reactions** with scientific accuracy  
✅ **89% bundle size reduction** (1.35MB → 147KB)  
✅ **Cross-platform** — works on Windows, macOS, Linux  
✅ **Offline functionality** with local fallbacks  
✅ **Safe exploration** of dangerous reactions students can't do in school  

---

## What we learned

- **State management matters** — `useRef` vs `useState` for performance-critical code
- **Fallbacks are essential** — Every API should have a backup (AI → local Q&A)
- **Security from day one** — Use serverless functions, never expose API keys in frontend
- **Real-world testing** — MediaPipe needs testing in poor lighting, varied conditions
- **Bundle size impacts UX** — Code splitting is not optional for production

---

## What's next for Reactech

**Short-term:**
- 🎯 Voice commands using Web Speech API
- 🎯 Mobile support with touch controls
- 🎯 Assessment mode with graded quizzes

**Long-term:**
- 🔮 AR integration with WebXR
- 🔮 Multi-user collaborative labs via WebRTC
- 🌟 VR chemistry lab with haptic feedback
- 🌟 ML-powered reaction prediction

---

**Built with React 19, Vite, MediaPipe, Three.js, Google Gemini, Tavus, and Python FastAPI**
