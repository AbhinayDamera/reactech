# ⚗️ Reactech — Virtual Chemistry Lab

> **An AI-powered, gesture-controlled virtual chemistry lab that uses real-time hand tracking to simulate chemical reactions with dramatic visual effects, intelligent mistake detection, and Gemini AI assistance.**

[![Built with React](https://img.shields.io/badge/React-19-61dafb?logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-7-646cff?logo=vite)](https://vitejs.dev)
[![MediaPipe](https://img.shields.io/badge/MediaPipe-Hands-4285f4?logo=google)](https://mediapipe.dev)
[![Three.js](https://img.shields.io/badge/Three.js-3D_FX-black?logo=three.js)](https://threejs.org)
[![Gemini AI](https://img.shields.io/badge/Gemini-2.5_Flash-4285f4?logo=google)](https://ai.google.dev/)
[![FastAPI](https://img.shields.io/badge/FastAPI-Python-009688?logo=fastapi)](https://fastapi.tiangolo.com)
[![Tavus](https://img.shields.io/badge/Tavus-AI_Video-8b5cf6)](https://tavus.io)

---

## 📖 Table of Contents

- [About the Project](#about-the-project)
- [Project Story](#project-story)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Architecture Overview](#architecture-overview)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Usage Guide](#usage-guide)
- [AI Integration](#ai-integration)
- [Chemistry Database](#chemistry-database)
- [Visual Effects System](#visual-effects-system)
- [Backend API](#backend-api)
- [FAQ](#frequently-asked-questions)

---

## About the Project

**Reactech** is a cutting-edge web-based virtual chemistry laboratory designed for students and teachers. It combines real-time hand tracking, AI-powered assistance, and immersive visual effects to create an engaging and safe learning environment.

### Four Interactive Modes

| Mode | Description |
|------|-------------|
| 🧪 **Manual Lab** | Select chemicals from searchable dropdowns, mix them with realistic beaker visualization, interactive pH testing with litmus paper, and get AI-powered explanations |
| 🔬 **Live Lab** | Uses webcam and MediaPipe hand tracking to detect real hand gestures. Assign chemicals to each hand, bring them together, and watch reactions with real-time 3D effects |
| 📖 **Reaction Guide** | Comprehensive encyclopedia of all available reactions with advanced filtering and search capabilities |
| 👩‍🔬 **Expert Session** | Live AI video tutor powered by Tavus for personalized chemistry guidance and real-time Q&A |

The application features an **AI Lab Assistant** powered by Google Gemini that provides real-time chemistry guidance, safety advice, and educational explanations.

---

## Project Story

### 💡 Inspiration

The inspiration for Reactech came from witnessing the limitations of traditional chemistry education during the pandemic. Students were stuck at home, unable to access physical labs, missing out on the hands-on experience that makes chemistry exciting. Many dangerous reactions like **sodium + water** ($2Na + 2H_2O \rightarrow 2NaOH + H_2 \uparrow$) can never be safely demonstrated in school labs, yet these are some of the most fascinating reactions in chemistry.

The "aha moment" came when we saw how natural hand gestures could bridge the gap between digital and physical experimentation — letting students **literally mix chemicals** with their hands through computer vision, experiencing the thrill of chemistry without any safety risks.

### 🔬 What It Does

Reactech transforms any device with a webcam into a fully-functional virtual chemistry laboratory. Students can:

- **Mix chemicals naturally** using hand gestures tracked by MediaPipe AI
- **See dramatic visual effects** that correspond to real reaction risks (explosions for dangerous reactions, gentle sparkles for safe ones)
- **Test pH levels** with interactive litmus paper that changes color in real-time
- **Learn from an AI tutor** powered by Google Gemini that explains reaction mechanisms and safety
- **Talk to an AI video expert** via Tavus for personalized, face-to-face chemistry guidance
- **Explore 35+ chemicals** and 44+ reactions across all major reaction types
- **Experience realistic physics** with layered liquids, settling solids, and bubble animations

### 🛠️ How We Built It

**Frontend Architecture:**
- **React 19** with concurrent features for smooth real-time updates
- **MediaPipe Hands** for 30fps hand landmark detection with 21 points per hand
- **Three.js** for hardware-accelerated 3D particle effects and animations
- **Custom gesture engine** using `useRef` for zero-delay reaction triggering

**AI Integration:**
- **Google Gemini 2.5 Flash** for natural language chemistry assistance
- **Tavus AI** for real-time video tutor sessions
- **Context-aware conversations** maintaining chat history for follow-up questions
- **Fallback system** with local Q&A for offline functionality

**Backend Services (Python FastAPI):**
- **Chemistry Engine** for advanced reaction calculations and thermodynamics
- **Safety Validator** with comprehensive hazard assessment algorithms
- **Reaction Analyzer** for mistake detection and educational guidance
- **LLM Service** supporting multiple AI providers (Gemini, OpenAI, Claude)

**Key Technical Innovations:**

1. **Gesture Recognition Pipeline:**
   ```javascript
   // Normalized distance calculation for gesture detection
   const distance = Math.sqrt(
     Math.pow(hand1.x - hand2.x, 2) + 
     Math.pow(hand1.y - hand2.y, 2)
   );
   const threshold = 0.20; // 20% of normalized frame width
   ```

2. **Real-time pH Calculation:**
   ```javascript
   const calculatePH = (chemical) => {
     if (strongAcids.includes(chemical)) return 1;
     if (strongBases.includes(chemical)) return 13;
     if (weakAcids.includes(chemical)) return 3;
     return 7; // neutral
   };
   ```

3. **Risk-based Visual Effects:**
   - **Safe reactions**: Green sparkles with gentle bubble animations
   - **Moderate risk**: Orange smoke, sparks, and screen shake
   - **Dangerous**: Red fireball, shockwave rings, and white flash

### 🚧 Challenges We Ran Into

**1. Hand Tracking Accuracy**
- **Problem**: MediaPipe occasionally lost hand detection in poor lighting
- **Solution**: Implemented 5-frame smoothing algorithm and confidence thresholds with graceful degradation and visual feedback for tracking quality

**2. Real-time Performance**
- **Problem**: React state updates caused lag in gesture detection
- **Solution**: Used `useRef` for performance-critical paths, avoiding re-renders
- **Result**: Achieved <50ms response time for gesture recognition

**3. Chemical Database Complexity**
- **Problem**: Managing 35 chemicals × 44 reactions with accurate pH, safety, and visual data
- **Solution**: Created structured data model with validation and fallback systems

**4. Cross-browser Compatibility**
- **Problem**: MediaPipe performance varied across browsers
- **Solution**: Implemented browser detection and optimized settings per platform with Manual Lab as a universal fallback

**5. AI Integration Reliability**
- **Problem**: API rate limits and network failures
- **Solution**: Built robust fallback system with local Q&A and error handling ensuring app functionality without AI

### 🏆 Accomplishments We're Proud Of

**Technical Achievements:**
- ✅ Zero-delay gesture recognition with <50ms response time
- ✅ 35 chemicals, 44+ reactions with scientifically accurate data
- ✅ Real-time pH testing with color-changing litmus paper
- ✅ Cross-platform compatibility (Windows, macOS, Linux)
- ✅ Offline functionality with local fallback systems
- ✅ AI video tutor integration via Tavus

**Educational Impact:**
- 🎓 Safe exploration of dangerous reactions (Na + H₂O, thermite, etc.)
- 🎓 Interactive learning through gesture-based experimentation
- 🎓 AI-powered tutoring with contextual chemistry explanations
- 🎓 Visual learning connecting abstract concepts to dramatic effects

### 📚 What We Learned

- **Computer Vision**: Mastered MediaPipe hand tracking and gesture recognition
- **Real-time Systems**: Learned to optimize for <50ms latency requirements
- **AI Integration**: Built robust systems with multiple LLM providers and fallbacks
- **3D Graphics**: Implemented particle systems and hardware-accelerated animations
- **State Management**: Discovered when to use `useRef` vs `useState` for performance
- **Chemistry Knowledge**: Deepened understanding of acid-base, redox, and precipitation reactions

### 🚀 What's Next for Reactech

**Short-term (Next 3 months):**
- 🎯 Voice Commands — "Mix sodium with water" using Web Speech API
- 🎯 Mobile Support — Touch-based alternatives to gesture controls
- 🎯 Expanded Database — 50+ chemicals including organic compounds
- 🎯 Assessment Mode — Graded quizzes and progress tracking for educators

**Medium-term (6–12 months):**
- 🔮 AR Integration — Project 3D molecules onto real surfaces using WebXR
- 🔮 Collaborative Labs — Multi-user experiments via WebRTC
- 🔮 LMS Integration — Export results to Google Classroom, Canvas, Moodle

**Long-term (1–2 years):**
- 🌟 VR Chemistry Lab — Full immersion with haptic feedback
- 🌟 ML Reaction Prediction — Neural networks for unknown reaction outcomes
- 🌟 Global Classroom — Connect students worldwide for collaborative experiments

---

## Key Features

| Feature | Description |
|---------|-------------|
| 🖐️ **Real-time Hand Tracking** | MediaPipe Hands detects and tracks both hands at 30fps with smoothed coordinates |
| 🧪 **35 Chemicals & 44+ Reactions** | Comprehensive database including acids, bases, metals, salts, and organic compounds |
| 💥 **Dramatic Visual Effects** | Risk-based 3D effects: sparkles (safe), smoke + sparks (moderate), fireball + shockwave (danger) |
| 🤖 **Gemini AI Assistant** | Google Gemini 2.5 Flash-powered chat for chemistry questions and safety guidance |
| 👩‍🔬 **AI Video Tutor** | Tavus-powered expert video sessions for personalized face-to-face chemistry tutoring |
| 🔍 **Searchable Chemical Selection** | Type-to-filter dropdowns with formula and name search |
| 🧪 **Realistic Beaker Visualization** | Layered chemicals with liquid animations, solid particles, and glass effects |
| 🧪 **Interactive Litmus Paper** | Real-time pH testing with color-changing litmus paper and educational pH scale |
| 📚 **Advanced Reaction Guide** | Searchable encyclopedia with risk-based filtering and detailed explanations |
| 🎯 **Gesture-Based Triggering** | Bring hands together to trigger reactions — zero-delay ref-based engine |
| 💬 **Intelligent Mistake Detection** | AI-powered system that validates reactions and provides safety guidance |
| 🖥️ **Debug Mode** | Real-time FPS, hand distance, tracking quality, and API status overlay |
| 👨‍🏫 **Teacher Mode** | Toggle to reveal teacher notes, mistake logs, and extended reaction details |

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend Framework** | React 19 | Component-based UI with concurrent features |
| **Build Tool** | Vite 7 | Fast HMR dev server and optimized builds |
| **Hand Tracking** | MediaPipe Tasks Vision | Real-time hand landmark detection at 30fps |
| **3D Effects** | Three.js, @react-three/fiber, @react-three/drei | Hardware-accelerated 3D rendering and particles |
| **AI Chat** | Google Gemini 2.5 Flash | Natural language chemistry assistance |
| **AI Video Tutor** | Tavus + Daily.co | Real-time AI video expert sessions |
| **State Management** | React Hooks + Jotai | Local state with useRef for performance-critical paths |
| **Styling** | Vanilla CSS | Dark glassmorphism theme with animations |
| **Backend** | Python FastAPI | Advanced chemistry engine and AI services |
| **Backend AI** | Gemini / OpenAI / Claude | Multi-provider LLM support with fallbacks |

---

## Architecture Overview

```
┌──────────────────────────────────────────────────────────────────┐
│                         REACTECH APP                             │
├──────────────┬──────────────┬──────────────┬─────────────────────┤
│  Manual Lab  │   Live Lab   │  Reaction    │  Expert Session     │
│  • Beaker    │  • Camera    │  Guide       │  • Tavus AI Video   │
│  • Dropdowns │  • Tracking  │  • Search    │  • Daily.co WebRTC  │
│  • pH Test   │  • Effects   │  • Filter    │  • Live Q&A         │
├──────────────┴──────────────┴──────────────┴─────────────────────┤
│                       CORE SERVICES                              │
│  ┌─────────────┐  ┌──────────────────┐  ┌───────────────────┐   │
│  │ HandTracker  │  │ GestureReaction  │  │ MistakeDetector   │   │
│  │ (MediaPipe)  │  │ Engine           │  │ System            │   │
│  └──────┬──────┘  └────────┬─────────┘  └────────┬──────────┘   │
│         │                  │                      │              │
│  ┌──────▼──────┐  ┌────────▼─────────┐  ┌────────▼──────────┐   │
│  │ CameraFeed  │  │ ReactionEffects  │  │ Gemini Service    │   │
│  │ ChemOverlay │  │ 3D + Particles   │  │ API Integration   │   │
│  │ TestTube    │  │ LitmusPaper      │  │ Context Building  │   │
│  └─────────────┘  └──────────────────┘  └───────────────────┘   │
├──────────────────────────────────────────────────────────────────┤
│              chemicals.js — Reaction Database (35 chems, 44+ rx) │
│              gemini.js    — AI Service Integration               │
│              FastAPI      — Chemistry Engine + Safety Validator  │
└──────────────────────────────────────────────────────────────────┘
```

---

## Project Structure

```
Reactech/
├── index.html                        # Entry HTML
├── package.json                      # Dependencies & scripts
├── vite.config.js                    # Vite configuration
├── .env.example                      # Environment variables template
├── README.md                         # This file
│
├── backend/                          # Python FastAPI backend
│   ├── app.py                        # FastAPI server + API routes
│   ├── chemistry_engine.py           # Advanced thermodynamics & kinetics
│   ├── chemistry_engine_simple.py    # Simplified fallback engine
│   ├── llm_service.py                # Multi-provider LLM integration
│   ├── llm_service_simple.py         # Simplified LLM fallback
│   ├── reaction_analyzer.py          # Mistake detection & guidance
│   ├── reaction_analyzer_simple.py   # Simplified analyzer
│   ├── safety_validator.py           # Hazard assessment system
│   ├── requirements.txt              # Python dependencies
│   └── README.md                     # Backend documentation
│
└── src/
    ├── main.jsx                      # React entry point
    ├── App.jsx                       # Root app with tab navigation
    ├── App.css                       # Global styles and theme
    ├── LiveLab.css                   # Live Lab styles + animations
    ├── chemicals.js                  # Chemical database (35 chems, 44+ reactions)
    ├── api.js                        # Backend API client
    │
    ├── services/
    │   ├── gemini.js                 # Google Gemini AI integration
    │   └── deepseek.js               # DeepSeek AI integration
    │
    ├── components/
    │   ├── LiveLabPage.jsx           # Live Lab — camera + hand tracking
    │   ├── HandTracker.jsx           # MediaPipe hand detection & smoothing
    │   ├── CameraFeed.jsx            # Webcam video capture
    │   ├── ChemicalOverlay.jsx       # Chemical labels on tracked hands
    │   ├── GestureReactionEngine.jsx # Gesture-based reaction trigger
    │   ├── ReactionEffects3D.jsx     # 3D visual effects system
    │   ├── ExplosionEffect.jsx       # Explosion particle effects
    │   ├── SmokeEffect.jsx           # Smoke and steam effects
    │   ├── MistakeOverlay.jsx        # Warning cards & danger modals
    │   ├── MistakeLog.jsx            # Session mistake history
    │   ├── ReactionPanel.jsx         # Manual Lab with beaker visualization
    │   ├── ReactionCard.jsx          # Individual reaction display card
    │   ├── GuidePage.jsx             # Reaction Guide encyclopedia
    │   ├── AssistantPanel.jsx        # Gemini AI chat assistant
    │   ├── TavusSession.jsx          # AI video tutor session
    │   ├── TutorCall.jsx             # Video call UI component
    │   ├── LitmusPaper.jsx           # Interactive pH testing component
    │   ├── TestTube.jsx              # Test tube visualization for Live Lab
    │   ├── SearchableSelect.jsx      # Type-to-filter dropdown component
    │   ├── FilterDropdown.jsx        # Advanced filtering component
    │   ├── SearchBar.jsx             # Search input component
    │   ├── RiskBadge.jsx             # Risk level indicator
    │   └── TeacherPanel.jsx          # Teacher mode panel
    │
    └── mistakes/
        ├── MistakeDetector.js        # Orchestrator for all mistake checks
        ├── ReactionValidator.js      # Chemical pair validation
        ├── GestureAnalyzer.js        # Hand speed/shake detection
        ├── SafetyAdvisor.js          # Safety tips & advice engine
        └── MistakeLogger.js          # Session mistake log
```

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9
- A **webcam** (for Live Lab)
- Modern browser (Chrome or Edge recommended for MediaPipe)
- **Google Gemini API Key** (optional, for AI assistant)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/reactech.git
cd reactech

# Install frontend dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env and add your API keys (see Environment Variables section)

# Start the development server
npm run dev
```

The frontend will be available at `http://localhost:5173`.

### Backend Setup (Optional but Recommended)

The Python backend provides advanced chemistry analysis and AI-powered features:

```bash
cd backend

# Create and activate virtual environment
python -m venv venv

# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start the backend server
python app.py
```

The backend will be available at `http://localhost:8000`.  
Interactive API docs: `http://localhost:8000/docs`

### Environment Variables

Create a `.env` file in the project root:

```env
# Google Gemini AI (for chat assistant)
VITE_GEMINI_API_KEY=your_gemini_api_key_here

# Tavus AI (for Expert Session video tutor)
VITE_TAVUS_API_KEY=your_tavus_api_key_here
VITE_TAVUS_PERSONA_ID=your_persona_id_here

# Backend LLM (optional)
LLM_PROVIDER=gemini
GEMINI_API_KEY=your_gemini_api_key_here
```

> **Note:** The app works at three levels of functionality:
> 1. **Frontend only** — Basic reactions with local data, no API keys needed
> 2. **Frontend + Gemini** — Enhanced AI chat assistant
> 3. **Full stack** — Advanced chemistry engine + AI analysis + video tutor

---

## Usage Guide

### 🧪 Manual Lab

1. Select **Chemical A** and **Chemical B** from the searchable dropdowns
2. Type to filter chemicals by name or formula
3. Watch chemicals appear as layers in the realistic beaker
4. **Observe the Litmus Paper** — it automatically shows the pH of selected chemicals:
   - 🔴 Red: Strong acids (pH < 5)
   - 🟠 Orange: Weak acids (pH 5–7)
   - 🟣 Purple: Neutral (pH = 7)
   - 🔵 Light Blue: Weak bases (pH 7–10)
   - 🔵 Blue: Strong bases (pH > 10)
5. Click **Mix** to trigger the reaction
6. View the balanced equation, products, and risk assessment
7. Click **Clear Beaker** to start fresh

### 🔬 Live Lab

1. Navigate to the **Live Lab** tab
2. Grant **camera permission** when prompted
3. Select chemicals for **Left Hand** and **Right Hand** using searchable dropdowns
4. Show both hands to the camera — colored landmarks will appear
5. **Bring your hands together** — the reaction triggers instantly with 3D effects
6. View results and explanations in the sidebar panel
7. Toggle **Debug Mode** to see real-time tracking metrics (FPS, distance, confidence)

### 📖 Reaction Guide

1. Browse all available reactions in an organized grid
2. Use the **search bar** to find specific chemicals or reactions
3. **Filter by risk level** (Safe, Moderate, Danger) or reaction type
4. Click any reaction card to see detailed information
5. View balanced equations, products, and safety notes

### 👩‍🔬 Expert Session

1. Navigate to the **Expert Session** tab
2. Start a session to connect with the AI video tutor
3. Ask chemistry questions in natural language via video
4. Get personalized, face-to-face explanations and guidance

### 🤖 AI Assistant

1. The AI chat panel is available in the **Lab** tab
2. Ask any chemistry question in natural language
3. Get detailed explanations about chemical properties, safety, reaction mechanisms, and real-world applications
4. The AI maintains conversation context for follow-up questions

### 👨‍🏫 Teacher Mode

Toggle **Teacher Mode** in the top bar to:
- Reveal detailed teacher notes on reaction cards
- View the session mistake log in Live Lab
- Access extended educational content

---

## AI Integration

### Gemini AI Chat Assistant

The Google Gemini integration provides:

- **Natural Language Processing** — Ask questions in plain English
- **Chemistry Expertise** — Specialized knowledge about reactions, safety, and applications
- **Contextual Responses** — Maintains conversation history for follow-up questions
- **Educational Focus** — Responses tailored for student learning with safety emphasis
- **Fallback Support** — Graceful degradation to local responses if API is unavailable

**Configuration:**
- **Model**: `gemini-2.5-flash`
- **Temperature**: 0.7 (balanced creativity/accuracy)
- **Max Tokens**: 500 (concise responses)
- **Context Window**: Last 6 messages

**Example Interaction:**
```
Student: "Where do we use NaOH in daily life?"

AI: "NaOH (Sodium Hydroxide) has many daily uses:
• Soap making — saponification of fats
• Drain cleaners — dissolves grease and hair
• Paper production — pulping wood
• Food processing — pretzels, olives
• Oven cleaners — breaks down baked-on grease

⚠️ Caustic — handle with care!"
```

### Tavus AI Video Tutor

The Expert Session uses **Tavus** to provide:

- **Real-time video conversations** with an AI chemistry expert
- **Personalized learning** with adaptive responses
- **Face-to-face interaction** for a more engaging experience
- **Powered by Daily.co** WebRTC infrastructure for low-latency video

---

## Chemistry Database

### 35 Chemicals Across Categories

| Category | Examples |
|----------|----------|
| **Strong Acids** | HCl, H₂SO₄, HNO₃ |
| **Strong Bases** | NaOH, KOH, Ca(OH)₂ |
| **Weak Acids** | CH₃COOH (vinegar), H₂CO₃ |
| **Weak Bases** | NH₃ (ammonia) |
| **Reactive Metals** | Na, K, Mg, Zn, Al, Fe |
| **Salts** | NaCl, CaCO₃, AgNO₃, CuSO₄ |
| **Organic** | C₂H₅OH (ethanol), CH₄ |
| **Others** | H₂O, O₂, H₂O₂ |

### 44+ Reactions by Type

| Type | Example |
|------|---------|
| **Acid-Base Neutralization** | HCl + NaOH → NaCl + H₂O |
| **Metal-Water** | 2Na + 2H₂O → 2NaOH + H₂↑ |
| **Metal-Acid** | Mg + 2HCl → MgCl₂ + H₂↑ |
| **Precipitation** | AgNO₃ + NaCl → AgCl↓ + NaNO₃ |
| **Redox** | Fe + CuSO₄ → FeSO₄ + Cu |
| **Decomposition** | 2H₂O₂ → 2H₂O + O₂↑ |
| **Acid-Carbonate** | HCl + NaHCO₃ → NaCl + H₂O + CO₂↑ |

---

## Visual Effects System

Effects are graduated by reaction risk level:

### ✅ Safe Reactions
- Green sparkle particles
- Floating bubbles
- Gentle glow rings
- Soft screen pulse

### ⚠️ Moderate Reactions
- Orange smoke clouds
- Spark particles
- Steam jets
- Light screen shake

### 🔴 Dangerous Reactions
- White flash
- Fireball with outer glow
- Shockwave rings (3 expanding rings)
- Debris particles
- Ember trails
- Heavy screen shake
- Red danger overlay pulse

All effects are implemented using **Three.js** and **CSS animations** for hardware-accelerated performance at 60fps.

---

## Backend API

The Python FastAPI backend runs at `http://localhost:8000`.

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Health check and service status |
| `POST` | `/api/analyze-reaction` | Advanced reaction analysis with thermodynamics |
| `POST` | `/api/validate-safety` | Comprehensive safety validation |
| `POST` | `/api/analyze-mistake` | AI-powered mistake analysis |
| `GET` | `/api/chemical-database` | Enhanced chemical database |
| `POST` | `/api/predict-reaction` | AI-powered reaction prediction |
| `GET` | `/api/health` | Detailed health check for all services |
| `GET` | `/reaction-guide` | Reaction guide data for the frontend |

### Backend Services

```
FastAPI Server (app.py)
├── ChemistryEngine       — Thermodynamics, kinetics, product prediction
├── SafetyValidator       — Hazard assessment, PPE requirements, precautions
├── ReactionAnalyzer      — Mistake detection, educational guidance
└── LLMService            — Multi-provider AI (Gemini / OpenAI / Claude)
```

### Example Request

```bash
curl -X POST "http://localhost:8000/api/analyze-reaction" \
     -H "Content-Type: application/json" \
     -d '{
       "chemicals": {
         "chemical_a": "HCl",
         "chemical_b": "NaOH"
       }
     }'
```

---

## Frequently Asked Questions

### General

**Q: Does the app work without a webcam?**  
A: Yes. The Manual Lab and Reaction Guide work fully without a webcam. Only the Live Lab requires camera access.

**Q: Does the app need an internet connection?**  
A: No for basic functionality. All reaction data is stored locally. Internet is only needed for the Gemini AI assistant and Tavus video tutor, both of which have local fallbacks.

**Q: Which browsers are supported?**  
A: Chrome and Edge are recommended for best MediaPipe support. Firefox works for Manual Lab but may have limited hand tracking capabilities.

### AI Assistant

**Q: How do I enable the AI assistant?**  
A: Get a free Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey), add it to your `.env` file as `VITE_GEMINI_API_KEY`, and restart the server.

**Q: Does the AI remember our conversation?**  
A: Yes, it maintains context from the last 6 messages for follow-up questions and natural conversation flow.

### Live Lab

**Q: Why isn't my hand being detected?**  
A: Ensure good lighting, show your full palms to the camera, and keep hands within frame. Avoid backlighting and wear contrasting colors.

**Q: How close do my hands need to be?**  
A: The trigger threshold is 20% of the normalized frame width. Your hands should be visibly close but don't need to physically touch.

**Q: What do the colored tracking dots mean?**  
A: 🟢 Green = stable tracking, 🟡 Yellow = moderate confidence, 🔴 Red = low confidence or lost tracking.

### Manual Lab

**Q: How do I search for chemicals?**  
A: Click on any dropdown and start typing. You can search by chemical name (e.g., "sodium") or formula (e.g., "NaOH").

**Q: How does the Litmus Paper work?**  
A: The litmus paper automatically appears when you select chemicals and shows real-time pH changes using realistic color coding: red for acids, purple for neutral, and blue for bases.

**Q: How accurate is the pH testing?**  
A: pH values are based on realistic chemical properties. Strong acids show red (pH 1–2), strong bases show blue (pH 12–14), with appropriate colors for weak acids/bases.

---

## 📄 License

This project is built as a capstone project for educational purposes.

---

<p align="center">
  Built with ❤️ and powered by Google Gemini AI &amp; Tavus
</p>
