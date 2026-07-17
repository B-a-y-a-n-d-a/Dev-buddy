# Error Oracle 🔍

> Paste any stack trace. Get a complete diagnosis in seconds.

A multi-agent AI tool built with **Google ADK (TypeScript)** and **Gemini**. Three specialist agents work in a pipeline to interpret your error, search for real fixes, and produce a step-by-step resolution guide — all from a single paste.

Built as a demo for a Knowledge Sharing session after attending **Google Cloud Summit Johannesburg 2026**, to explore the Google ADK multi-agent framework.

---

## How it works

```
Your error/stack trace
        │
        ▼
┌─────────────────────┐
│  Error Interpreter  │  Identifies error type, runtime, and root cause in plain English
└─────────────────────┘
        │
        ▼
┌─────────────────────┐
│   Fix Researcher    │  Uses Google Search live to find Stack Overflow answers & official docs
└─────────────────────┘
        │
        ▼
┌─────────────────────┐
│  Resolution Guide   │  Synthesises everything into step-by-step fix instructions + code snippet
└─────────────────────┘
```

Each agent runs as a separate Gemini API call with its own system prompt, tool access, and responsibility. The output of each agent feeds into the next via ADK's session state management.

---

## Tech stack

- **[Google ADK (TypeScript)](https://github.com/google/adk-js)** — multi-agent orchestration framework
- **Gemini 3.1 Flash Lite** — model powering all three agents
- **GOOGLE_SEARCH** — built-in ADK tool used by the Fix Researcher for live web search
- **`npx adk web`** — dev UI served by `@google/adk-devtools` (no frontend code written)

---

## Prerequisites

- Node.js 18+
- A free Gemini API key — get one at [aistudio.google.com/apikey](https://aistudio.google.com/apikey)

---

## Setup

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/error-oracle.git
cd error-oracle

# 2. Install dependencies
npm install

# 3. Set your API key
# Windows (PowerShell)
$env:GOOGLE_GENAI_API_KEY="your_api_key_here"

# Mac/Linux
export GOOGLE_GENAI_API_KEY=your_api_key_here

# 4. Start the dev UI
npx adk web
```

Open [http://localhost:8000](http://localhost:8000) and paste any error or stack trace into the chat.

---

## Example input

```
JsonWebTokenError: invalid signature
    at /app/node_modules/jsonwebtoken/verify.js:89:21
    at /app/middleware/auth.js:34:5
    at Layer.handle [as handle_request] (/app/node_modules/express/lib/router/layer.js:95:5)
```

## Example output

**Agent 1 — Error Interpreter:**
> Error Type: `JsonWebTokenError` | Origin: `/app/middleware/auth.js:34:5`
> Most likely root cause: The secret key used to verify the token does not match the one used to sign it — typically a `JWT_SECRET` environment variable mismatch between services.

**Agent 2 — Fix Researcher:**
> Searches Google live and returns the top Stack Overflow answers, relevant GitHub issues, and official `jsonwebtoken` docs with version-specific notes.

**Agent 3 — Resolution Guide:**
```javascript
// auth.js — verified fix
const decoded = jwt.verify(token, process.env.JWT_SECRET.trim(), {
  algorithms: ['HS256']
});
```
> Confidence Level: High

---

## Project structure

```
error-oracle/
├── agent.ts          # All three agents + the SequentialAgent pipeline
├── package.json      # Dependencies (@google/adk)
├── .env.example      # Copy to .env and add your API key
└── README.md
```

The entire agent logic lives in `agent.ts` — roughly 80 lines of TypeScript. There is no frontend code; the browser UI is provided by `@google/adk-devtools`.

---

## Key concepts demonstrated

- **SequentialAgent** — runs sub-agents in order, passing session history to each
- **LlmAgent** — a single agent with its own system prompt, model, and tools
- **GOOGLE_SEARCH** — ADK's built-in tool for live web grounding
- **`adk web`** — instant dev UI for testing and debugging agents without writing any frontend code

---

## What's next / ideas to extend this

- [ ] Wrap in a Slack bot — post an error, get a diagnosis in the channel
- [ ] Connect to your GitHub repo via MCP so the agents have codebase context
- [ ] Add a fourth agent that searches internal runbooks/Confluence docs
- [ ] Trigger automatically on CI/CD failures and post the diagnosis as a PR comment
- [ ] Add an eval set to benchmark diagnosis quality across common error types

---

## Acknowledgements

Inspired by what I saw at **Google Cloud Summit Johannesburg 2026** — specifically the ADK TypeScript launch and the multi-agent architecture session. Built to understand the framework hands-on rather than just reading the docs.

- [Google ADK docs](https://adk.dev)
- [ADK TypeScript GitHub](https://github.com/google/adk-js)
- [Google AI Studio](https://aistudio.google.com)
