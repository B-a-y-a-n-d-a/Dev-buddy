# Error Oracle — Demo Setup & Presenter Guide

## What you're presenting
A multi-agent AI tool built with **Google ADK (TypeScript)** that diagnoses any error or stack trace using 3 specialist agents:

1. **Error Interpreter** — parses the trace, identifies root cause in plain English
2. **Fix Researcher** — uses Google Search to find real solutions
3. **Resolution Guide** — synthesises everything into a step-by-step fix with code

---

## One-time setup (do this the night before)

### 1. Get a free API key
Go to **https://aistudio.google.com/apikey** → click "Create API key" → copy it.
Free tier is plenty for the demo.

### 2. Install dependencies
```bash
cd dev-buddy
npm install
```

### 3. Set your API key
```bash
# Mac/Linux
export GOOGLE_API_KEY=your_key_here

# Windows (Command Prompt)
set GOOGLE_API_KEY=your_key_here

# Windows (PowerShell)
$env:GOOGLE_API_KEY="your_key_here"
```

### 4. Start the dev UI
```bash
npx adk web
```

Opens at **http://localhost:3000** — you should see the Error Oracle agent in the sidebar.

---

## On the day: demo script

### Error to paste (Slide 10 already shows this — just run it live)
```
TypeError: Cannot read properties of undefined (reading 'map')
    at UserList (/app/components/UserList.jsx:12:23)
    at renderWithHooks (/app/node_modules/react-dom/cjs/react-dom.development.js:14985:18)
    at mountIndeterminateComponent (/app/node_modules/react-dom/cjs/react-dom.development.js:17811:13)
    at beginWork (/app/node_modules/react-dom/cjs/react-dom.development.js:19049:16)
```

**What to say while it runs:**
> "Watch the sidebar — you can see each agent hand off to the next. The Interpreter reads the trace, the Researcher goes out and searches Google in real-time, and the Resolution Guide pulls it all together."

### Backup errors (in case you want variety)
```
Error: connect ECONNREFUSED 127.0.0.1:5432
    at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1157:16)
```
```
java.lang.NullPointerException: Cannot invoke "String.length()" because "str" is null
    at com.sunbet.UserService.validateInput(UserService.java:47)
    at com.sunbet.UserService.processUser(UserService.java:23)
```

---

## Likely questions & how to answer them

**"Is this just ChatGPT with a fancy wrapper?"**
> No — the key difference is the *multi-agent architecture*. Three separate agents, each with its own system prompt and responsibility. The Fix Researcher actually calls Google Search live to find current solutions, not just its training data. The structure also means you can swap out any agent independently.

**"How much does it cost to run?"**
> The Gemini API has a generous free tier — around 1,500 requests/day free. For a team tool running a few queries an hour, you're looking at maybe $5–10/month on the paid tier.

**"Can we connect it to our own codebase?"**
> Yes — ADK supports MCP (Model Context Protocol) tool integrations. You could connect it to your GitHub repo, your Jira board, or your internal runbooks so the agents have context about *your* specific code.

**"What's the difference between this and Gemini in AI Studio?"**
> AI Studio is the playground — great for experimenting with a single prompt. ADK is the framework for building *production-ready* agents with multi-step logic, tool use, and orchestration. Think of AI Studio as the sketchbook, ADK as the actual code.

**"Could a junior dev actually build this?"**
> The `agent.ts` file is about 80 lines of TypeScript. The hardest part is writing good system prompts, which is more about clear thinking than coding skill. That's the point — the barrier to entry is genuinely low now.

**"Is it TypeScript only?"**
> ADK has Python, TypeScript/JS, and Go versions. Python is the most mature. We used TypeScript here because it fits our stack.

---

## Things NOT to say / trip-ups to avoid

- Don't say the results are always correct — the agents can hallucinate. Say: *"It's a starting point — it gets you 80% of the way there in seconds instead of starting from scratch."*
- Don't promise it works offline — it needs the Gemini API.
- If the demo lags, it's because the Fix Researcher is actually searching Google live — that's a feature, not a bug.

---

## Files in this folder

| File | What it is |
|------|-----------|
| `agent.ts` | The full Error Oracle agent — all 3 agents + the pipeline |
| `package.json` | Dependencies (`@google/adk`) |
| `.env.example` | Copy to `.env` and add your API key |
| `DEMO-GUIDE.md` | This file |
