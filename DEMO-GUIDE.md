# Error Oracle — Demo Setup & Presenter Guide

## What you're presenting
A multi-agent AI tool built with **Google ADK (TypeScript)** that diagnoses any error or stack trace using 3 specialist agents:

1. **Error Interpreter** — parses the trace, identifies root cause in plain English
2. **Fix Researcher** — uses live Google Search to find real solutions online
3. **Resolution Guide** — synthesises everything into a step-by-step fix with code

Two ways to run it:
- **index.html** — the custom glassmorphic frontend (recommended for the demo)
- **localhost:8000** — the built-in ADK dev UI (good for showing ADK internals)

---

## One-time setup (do this the night before)

### 1. Get a free API key
Go to **https://aistudio.google.com/apikey** → click "Create API key" → copy it.
Free tier is plenty (1,500 requests/day).

### 2. Install dependencies
```bash
cd dev-buddy
npm install
```

### 3. Set your API key (use this exact variable name)
```bash
# Mac/Linux
export GOOGLE_GENAI_API_KEY=your_key_here

# Windows (Command Prompt)
set GOOGLE_GENAI_API_KEY=your_key_here

# Windows (PowerShell)
$env:GOOGLE_GENAI_API_KEY="your_key_here"
```

> ⚠️ The variable MUST be `GOOGLE_GENAI_API_KEY` — not `GOOGLE_API_KEY`. ADK TypeScript will silently fail if you use the wrong name.

### 4. Start the ADK server
```bash
npx adk web
```

Opens the ADK dev UI at **http://localhost:8000**

### 5. Open the glassmorphic frontend
In a **second terminal** (keep `npx adk web` running in the first):
```bash
npm run ui
```
Then open **http://localhost:3000** in Chrome.

> ⚠️ Don't just double-click index.html — opening it as a file:// URL causes CORS errors when it tries to connect to the ADK server. Always use `npm run ui` to serve it properly.

---

## On the day: demo order

**Step 1 — Show Google Stitch** (STITCH-GUIDE.md has the exact prompt)
> "Before writing any code I described the UI I wanted in plain English at stitch.withgoogle.com. This is what it generated in 30 seconds."

**Step 2 — Show Google AI Studio**
> "I took the agent prompts here to test them, tuned them live, and got a free API key in one click."

**Step 3 — Show the ADK dev UI at localhost:8000**
> "This is the ADK dev UI — zero frontend code, comes with the framework. I'll show you what it looks like before I show you the custom frontend we built."

**Step 4 — Switch to index.html and run the demo live**
Paste the JWT error below, watch all 3 agents respond in real time.

---

## Errors to paste during the demo

### Primary — JWT error (tested and confirmed working)
```
JsonWebTokenError: invalid signature
    at /app/node_modules/jsonwebtoken/verify.js:89:21
    at /app/middleware/auth.js:34:5
    at Layer.handle [as handle_request] (/app/node_modules/express/lib/router/layer.js:95:5)
    at next (/app/node_modules/express/lib/router/route.js:137:13)
```

**What to say while it runs:**
> "Watch the three panels. The Interpreter reads the trace and identifies the root cause — without suggesting a fix yet. Then the Researcher goes out to Google Search live to find the real solution. Finally the Resolution Guide pulls it all together into a numbered fix with a code snippet."

### Backup — Database connection refused
```
Error: connect ECONNREFUSED 127.0.0.1:5432
    at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1157:16)
    at /app/services/db.js:23:10
```

### Backup — React TypeError
```
TypeError: Cannot read properties of undefined (reading 'map')
    at UserList (/app/components/UserList.jsx:12:23)
    at renderWithHooks (/app/node_modules/react-dom/cjs/react-dom.development.js:14985:18)
```

---

## Likely questions & how to answer them

**"Is this just ChatGPT with a fancy wrapper?"**
> No — the key difference is the multi-agent architecture. Three separate Gemini calls, each with its own system prompt and responsibility. The Fix Researcher actually searches Google live for current solutions. You can trace exactly what each agent did and swap any one out independently.

**"What makes SequentialAgent different from one big prompt?"**
> In one prompt, the model tries to diagnose AND research AND write the fix all at once — it rushes and mixes things up. With SequentialAgent, the Interpreter is forbidden from suggesting fixes. Only the Researcher searches. The Guide only synthesises. Each one does one job well. The output quality is measurably better, and the code is easier to maintain.

**"How much does it cost?"**
> Free tier: 1,500 requests/day. Paid tier for a team running queries throughout the day would be roughly R90–R180/month. Negligible.

**"Can we connect it to our own codebase?"**
> Yes — ADK supports MCP (Model Context Protocol). You could connect agents to your GitHub repo, Jira board, or internal Confluence docs so they have context about your specific code.

**"Could a junior dev build this?"**
> agent.ts is 80 lines of TypeScript. The hardest part is writing good system prompts, which is more about clear thinking than coding skill. That's the point.

**"Is it TypeScript only?"**
> ADK has Python, TypeScript/JS, and Go versions. Python is the most mature. We used TypeScript because it fits our stack.

**"The pencil icon in the ADK UI isn't working"**
> That's expected — ADK has two modes: the visual builder (for drag-and-drop agents), and code-first (what we're doing). The pencil edit is only for the visual builder. Code-first agents are defined in TypeScript, which gives you more control, type safety, and version control.

---

## Things NOT to say

- Don't say the results are always correct — say: *"It gets you 80% of the way there in seconds. You still review and apply the fix — it's a fast starting point, not a replacement for judgment."*
- Don't promise it works offline — it needs the Gemini API.
- If the demo lags on Agent 2 — that's the live Google Search running. Say: *"The Researcher is actually hitting Google right now. That's real-time web grounding, not training data."*

---

## Files in this project

| File | What it is |
|------|-----------|
| `agent.ts` | All 3 agents + SequentialAgent pipeline (~80 lines) |
| `index.html` | Custom glassmorphic frontend — connects to ADK REST API |
| `package.json` | Dependencies (`@google/adk`, `@google/adk-devtools`) |
| `.env.example` | Copy to `.env`, add your `GOOGLE_GENAI_API_KEY` |
| `STITCH-GUIDE.md` | Exact prompt to use in Google Stitch + demo script |
| `DEMO-GUIDE.md` | This file |
