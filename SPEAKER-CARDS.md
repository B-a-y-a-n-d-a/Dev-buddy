# Error Oracle — Speaker Reading Cards
### Knowledge Sharing Session · Sun International · July 24, 2026
### Presenter: Bayanda Mlomo · Target time: 45–60 min

---

## BEFORE YOU START

- Open the live app: https://error-oracle-80153819730.africa-south1.run.app
- Have test stack traces ready (see DEMO section below)
- 18 slides total. Aim for ~2 min each.
- Q&A questions — all anticipated answers are at the bottom of this doc.

---

## CARD 1 — Title Slide *(30 sec)*

> "Thanks for coming. Today I want to share something I built after attending Google Cloud Summit Johannesburg — and talk about what it says about where our development workflow is heading."

> "The session is called 'From Summit to Ship' because that's exactly what happened. I went to a conference, heard about some new tools, and had a working production deployment a few days later."

*(Pause. Let the title breathe.)*

---

## CARD 2 — Google Cloud Summit JHB *(1.5 min)*

> "I was at Google Cloud Summit JHB this year. Three things hit differently."

Point to each card:

> "Gemini Flash going GA — the model powering everything you'll see today. Fast, capable, and on a paid API key for production reliability."

> "ADK for TypeScript dropped — Google's open-source Agent Development Kit for building multi-agent AI pipelines in Node.js. Our stack."

> "And Stitch — a Google Labs tool that generates UI designs and Figma wireframes from a plain-English prompt. I'll show you what it gave me in about five minutes."

**[JOKE]** *"I went to the conference as a junior developer. I came back as... still a junior developer, but with a deployed AI product. Baby steps."*

---

## CARD 3 — The Question *(1 min)*

> "Walking out of the ADK session I had this thought: what if instead of copy-pasting a stack trace into Google and opening ten tabs, you had a team of AI agents that diagnose the error, search for the actual fix, and hand you a numbered resolution guide?"

> "So I built it. About 4 to 5 days of work. 156 lines of TypeScript. One agent file."

**[JOKE]** *"My manager thought I was just taking a long lunch. Technically I was — just also shipping a multi-agent AI system at the same time."*

---

## CARD 4 — The Problem *(1.5 min)*

> "This is the problem I was solving. 40% of developer time goes to debugging. 23 minutes average to diagnose a single error. One in three juniors blocked for more than an hour on one issue."

> "We've all been there. Stack trace is 50 lines, real error is line 47. You Google it, top result is a Stack Overflow answer from 2019 with 'This fixed it for me!' and zero upvotes. Fifteen tabs later you're still not sure."

**[JOKE]** *"Raise your hand if you've ever Googled an error, clicked Stack Overflow, and the top answer was 'just reinstall Node.' ...Yeah. That's why we're here."*

---

## CARD 5 — The Modern AI SDLC *(2 min)*

> "This is the full stack I used. Four Google tools — each doing something no tool in our current workflow does."

Walk through:

> "Step 1 — Stitch: plain-English prompt → full design direction and Figma wireframes in seconds. That became the blueprint for the UI."

> "Step 2 — AI Studio: prototype your agent prompts live in the browser before writing a single line of code. Free API key in one click — I upgraded to a paid key for production."

> "Step 3 — ADK: wire those prompts into a multi-agent TypeScript pipeline. Three agents, one file, 156 lines."

> "Step 4 — Cloud Run: live public URL with one gcloud command. No Docker expertise needed."

---

## CARD 6 — Google Stitch *(2 min)*

> "Stitch is at stitch.withgoogle.com. Sign in with Google, type what you want."

> "I described the Error Oracle UI in one sentence — glassmorphic, dark theme, three side-by-side agent panels, textarea at the top. Hit generate. 28 seconds."

**[JOKE]** *"My design process used to be: open Figma, stare at a blank canvas for 45 minutes, close Figma. Now it's: type one sentence, export to Figma. Progress."*

> "And that Figma export — this is worth emphasising — is not just a static screenshot. It gives you editable wireframes: components, layout, spacing, all structured so your design team can actually work from it. Real design handoff, from a text prompt."

> "The deployed UI on Cloud Run was then custom-built from those wireframes. Stitch gives you the design system and blueprint — you build the production-grade version from it. That distinction matters."

> "Stitch also exports to AI Studio if you want to prototype the API wiring — useful for connecting UI interactions to your backend without writing the boilerplate yourself."

---

## CARD 7 — Google AI Studio *(1.5 min)*

> "AI Studio is where I tuned the three agent prompts before touching any TypeScript. You pick a model — gemini-2.0-flash in my case — write your system prompt, and test it live."

> "I'm on a paid Gemini API key for production. Free tier is generous for development — 1,500 requests per day — but for a deployed tool you want the paid tier for reliability, higher rate limits, and no daily cap."

> "The export to AI Studio from Stitch is a nice feature: it reads your UI structure and helps you wire up the API calls. I also used it to show what the UI could look like with prototype features like user accounts and history — not yet built, but it gives a good picture of the direction."

**[JOKE]** *"Prototyping agent prompts in AI Studio is honestly addictive. I told myself I'd spend 20 minutes. An hour later I was arguing with Gemini about what counts as a valid stack trace. We've all been there. Or is that just me?"*

---

## CARD 8 — ADK Multi-Agent Pipelines *(2.5 min)*

> "ADK gives you three orchestration patterns."

> "SequentialAgent — agents run one after the other, each seeing everything the previous one produced. That's Error Oracle."

> "ParallelAgent — all agents run simultaneously. Use this for things like a code review that needs security, performance, and style checks all at once."

> "LoopAgent — keeps running until a condition is met. Self-improving documents, data extraction with retry logic, quality gates."

> "All three are a single class declaration in TypeScript. The pattern IS the architecture — you don't implement the orchestration yourself."

---

### 📌 ADK: Local vs Cloud — be ready to explain this

> "One thing worth knowing: there are two ways to run ADK."

> "**Local ADK**: you run `npx adk web agent.js` on your machine. ADK spins up a REST server at port 8000 and also opens a built-in web UI so you can test your agents in the browser immediately. Perfect for development and iteration."

> "**Cloud ADK — two options**: first, what Error Oracle does — package the ADK server in a Docker container and deploy it to Cloud Run. You control the infrastructure, Cloud Run handles scaling. Second, Google's managed option — Vertex AI Agent Engine — where you just deploy your agent code and Google runs the server, handles uptime, and scales it automatically. No Docker, no Cloud Run config needed. Same ADK code runs in both places — that's the key design."

**[JOKE]** *"Local ADK is like cooking at home. Cloud Run is like opening a restaurant. Vertex AI Agent Engine is like letting Gordon Ramsay run the kitchen while you just provide the recipe. Each has its place."*

---

## CARD 9 — Why Multi-Agent is Different *(2 min)*

> "The question I expected from seniors: why not just one big prompt?"

> "Single prompt is a monolith. One huge system prompt trying to diagnose, search, and resolve at the same time. The model cuts corners. You can't tell what went wrong. Changing one thing breaks everything."

> "Multi-agent is a well-designed system. Each agent has one job. Tool isolation — Agent 2 is the only one with internet access. Full trace — you see each agent's work independently. Swap the researcher without touching the interpreter."

> "These are engineering principles we already know: separation of concerns, single responsibility, loose coupling. We're now applying them to AI."

---

## CARD 10 — AI is Making Us Better Architects *(2.5 min)* ⭐ Key slide

> "This is the thesis I want you to walk away thinking about."

> "Before agentic AI, we wrote HOW. Imperative code, step by step, every edge case handled manually."

> "With agentic flow, you design WHO and WHAT. Who is responsible for what? What does each agent know? What are the contracts between them?"

> "That IS software architecture. Look at the bottom of this slide — Error Oracle maps directly onto patterns architects use every day. Agent responsibilities are bounded contexts. The NOT_AN_ERROR signal is an API contract. SequentialAgent is a pipeline pattern. Swapping one agent without touching the others is loose coupling."

> "The tools didn't automatically make me a better architect. But they forced me to think architecturally — even as a junior dev. That's the real shift."

**Anticipated pushback:** *"You're just wrapping prompt calls — that's not real architecture."*

> "The wrapping IS the architecture. A microservice is just wrapping a database call with a clear interface. The value is in the contract, the isolation, and the ability to reason about the system independently. Same principle."

**[JOKE]** *"I explained bounded contexts and loose coupling to my dad. He said, 'So it's like having different people do different jobs instead of one person doing everything?' I said yes. He said, 'That's just management.' Turns out software architecture and management are the same thing. Who knew."*

---

## CARD 11 — Meet Error Oracle *(30 sec)*

> "Here it is. Three agents. Each with a single responsibility. Custom-built glassmorphic UI. Live on Cloud Run. Let me walk through the architecture before we go live."

---

## CARD 12 — Architecture *(2 min)*

> "Agent 1 — Error Interpreter. Reads the trace. Diagnoses error type, runtime, root cause. Forbidden in its system prompt from suggesting fixes — one job only. Also outputs a NOT_AN_ERROR or SUSPICIOUS_TRACE signal if the input isn't a valid error."

> "Agent 2 — Fix Researcher. Checks for those signals first. If clear, uses GOOGLE_SEARCH — routed through Vertex AI Grounding — and returns real-time results with source URLs. Not training data. Live web results."

> "Agent 3 — Resolution Guide. Reads both previous outputs. Produces a numbered fix, corrected code snippet, prevention advice, confidence level. Sets Low confidence if anomalies were flagged."

> "Three lines of TypeScript at the bottom of this slide wire it all together."

---

## CARD 13 — LIVE DEMO *(5–8 min)* 🔴

**Switch to browser. App: https://error-oracle-80153819730.africa-south1.run.app**

**Test trace 1 — JWT Error (on slide):**
```
JsonWebTokenError: invalid signature
    at /app/middleware/auth.js:34:5
    at /app/node_modules/jsonwebtoken/verify.js:89:21
    at new Promise (<anonymous>)
    at Object.verify (/app/middleware/auth.js:28:12)
```

Narrate as it runs:
- Agent 1: *"Error Interpreter is reading the trace..."*
- Agent 2: *"Fix Researcher is hitting Google now. Watch for the Vertex AI Grounding URLs — those are proof it searched the live web, not training data."*
- Agent 3: *"Resolution Guide has both inputs — here's the numbered fix."*

**[JOKE while waiting for agents]** *"This is the part where I tell you the agents are 'thinking deeply about your problem.' In reality they're making a few HTTP calls to Google's data centres. But 'thinking deeply' sounds better in the demo."*

**Guardrail demo — paste a non-error (optional, ~1 min):**
```
What is the capital of South Africa?
```
> "Watch Agent 1 — it sees immediately this isn't a stack trace. NOT_AN_ERROR. Agents 2 and 3 skip entirely. No wasted API calls, no hallucinated software advice."

**[JOKE]** *"Without the guardrails, Agent 3 was genuinely giving career advice about moving to Pretoria. We had to draw some boundaries."*

---

## CARD 14 — Guardrails & Lessons *(2 min)*

> "Two engineering lessons from building this."

> "First: SequentialAgent does not stop automatically. When I first tested with a non-error input, Agent 1 correctly refused — but Agents 2 and 3 ran anyway. Agent 2 answered the geography question. Agent 3 wrapped it in software engineering advice. Completely straight-faced. It told me the 'error' could be resolved by 'consulting local government resources.'"

**[JOKE]** *"In fairness, 'consult local government resources' is valid advice for many problems. Just not debugging."*

> "The fix: explicit API contracts between agents. Each agent reads the previous output for a structured signal before doing any work. Design your agent interfaces like you'd design a service interface."

> "Second: Vertex AI Grounding. The GOOGLE_SEARCH tool doesn't call regular search. It routes through Vertex AI Grounding — Google's service for attaching live web results to model responses. Source URLs in the output are a paper trail. This agent searched the web at inference time, not recalled from training."

---

## CARD 15 — What This Unlocks for Sun International *(2 min)*

> "Four directions this opens up for the team."

> "CI/CD agents: build fails → agent diagnoses → posts resolution on the PR. Before a human looks at it."

---

### 📌 Living Knowledge Base — how it would work in Error Oracle specifically

> "The living knowledge base one is interesting because Error Oracle's architecture is actually set up for it."

Here's the implementation path to explain if asked:

**Step 1 — Persist every analysis:** After Agent 3 produces a resolution, save the session to a database — input trace, Agent 1 diagnosis, Agent 3 resolution, timestamp, language/framework tags.

**Step 2 — Build a KB lookup agent (Agent 0):** Add a new agent that runs *before* the existing three. It takes the stack trace, extracts key identifiers (error type, library name, version), and queries your internal DB for matching past resolutions. If a high-confidence match exists, it returns it immediately — no Google search needed.

**Step 3 — Priority routing:** KB hit → Agent 0 passes the past resolution to Agent 3, which validates and formats it (fast path). KB miss → the existing three-agent pipeline runs as normal.

**Why this matters for Sun International specifically:** every time a developer resolves an error using Error Oracle, that resolution stays in the system. Next developer who hits the same Sequelize connection timeout gets the answer your team already figured out — not a generic Stack Overflow post.

> "Over time you're building a knowledge base of exactly your stack's failure patterns. Specific to your Node version, your ORM version, your infrastructure. That's much more valuable than generic internet search."

---

### 📌 Code agents and MCP — how it would work

> "The code agents point — ADK agents can already read files, write patches, run tests. That's built in."

> "The MCP piece is worth a sentence: MCP — Model Context Protocol — is an open standard for AI-to-AI tool use. If you wrap Error Oracle as an MCP server, any MCP-compatible AI — Claude Desktop, GitHub Copilot, other ADK agents — can call `analyze_error()` as a tool without a human pasting a stack trace. Implementation is relatively straightforward: you'd add an `@modelcontextprotocol/sdk` server wrapper around the existing ADK endpoint, expose one tool with a `stackTrace: string` parameter, and run it as a stdio server. The agents themselves don't change at all."

---

## CARD 16 — Get Started *(1 min)*

> "Three steps to try this yourself — all free to start."

> "Step 1: aistudio.google.com — get your API key. Free tier handles development. Upgrade to paid for production."

> "Step 2: npm install @google/adk. Node 18 or higher."

> "Step 3: point ADK at your specific agent file — `npx adk web agent.js` — not just the directory. If you point at the directory, ADK tries to load every JS file it finds. If you have a proxy server file in there too, it crashes on startup. Ask me how I know."

**[JOKE]** *"I spent two hours debugging what I thought was a complex async issue. It was loading the wrong file. The error was 'EADDRINUSE' — port already in use. Because ADK was trying to run my proxy server as an agent. We've all been there. No? Just me? OK."*

---

## CARD 17 — Key Takeaways *(1.5 min)*

> "Three things to walk away with."

> "First: agentic flow is architectural thinking. Designing agent systems forces bounded contexts, contracts, and loose coupling — same skills as microservices. The tools lower the barrier. The thinking is yours to apply."

> "Second: REST today, MCP tomorrow. Start thinking about your APIs not just as endpoints for humans, but as tools AI agents will call. The two are converging."

> "Third: ADK is production-ready right now. Stitch, AI Studio, ADK, Cloud Run — every tool is live, free to start, and production-grade. The barrier between idea and shipped tool just collapsed."

---

## CARD 18 — Q&A *(remainder of time)*

> "Thanks for your time. Open floor."

**[JOKE — closing]** *"I'll take any questions. Technical questions, career questions, questions about why I spent 4 days building something that could've just been a Google search. I have an answer for all of them. The answer for the last one is 'it was worth it.'"*

---

## Q&A PREP — Expected Senior Questions

**Q: How do you handle hallucinations in the output?**
> "Two layers. Vertex AI Grounding means Agent 2's answers are backed by live web search — not training data. Agent 3 always outputs a confidence level. If Agent 1 flagged anomalies, Agent 3 defaults to Low confidence — it won't confidently hallucinate a fix for a suspicious trace."

**Q: What does this cost at scale?**
> "I'm on a paid Gemini API key. Gemini Flash is roughly $0.075 per million input tokens. A full three-agent analysis runs around 2,000 to 5,000 tokens — fractions of a cent per analysis. Cloud Run scales to zero when idle, so there's no fixed cost. At our team's usage level the monthly cost would be negligible."

**Q: How is this different from just asking ChatGPT?**
> "Three things. Specialisation: each agent has a focused prompt — the Interpreter doesn't try to fix, the Researcher doesn't try to diagnose. Live search: Vertex AI Grounding means current Stack Overflow and GitHub results, not data from 18 months ago. Trace and isolation: you see each agent's work independently — you can debug the pipeline itself, not just the output."

**Q: Could this break if Gemini returns unexpected output?**
> "Yes — and we experienced that with the guardrails. If Agent 1 doesn't include the NOT_AN_ERROR signal in exactly the right format, Agent 2 proceeds anyway. Next iteration would use structured output mode so agents return strict JSON instead of free text — then the signal parsing is reliable. It's the same contract enforcement problem you have with any API."

**Q: How does the living knowledge base work? Can Error Oracle learn from past fixes?**
> See Card 15 above — walk through the four steps. Short version: add Agent 0 that queries an internal DB before the pipeline runs, persist every Agent 3 resolution to that DB, and route KB hits on a fast path that bypasses Google search.

**Q: What's Local ADK vs Cloud ADK?**
> "Local: `npx adk web agent.js` — ADK runs on your machine, gives you a built-in UI at localhost:8000, great for development. Cloud: two options — package it in Docker and deploy to Cloud Run, which is what Error Oracle does, or use Vertex AI Agent Engine, Google's fully managed ADK hosting where you just push your agent code and Google handles everything. Same agent code runs in both."

**Q: What is MCP and how would you add it to Error Oracle?**
> "MCP is Model Context Protocol — an open standard for AI-to-AI tool use. To add it to Error Oracle: install `@modelcontextprotocol/sdk`, create a server that exposes one tool — `analyze_error(stackTrace)` — that internally calls the ADK run_sse endpoint, and run it as a stdio server. Claude Desktop, GitHub Copilot, or other ADK agents could then use Error Oracle as a tool without any UI. The agents themselves don't change."

**Q: Could a junior dev build this without architecture knowledge?**
> "Partly. ADK handles the orchestration — you don't implement the pipeline. But the quality depends on how well you design agent responsibilities and contracts. A junior who just chains prompts gets inconsistent results. That's the nuance: agentic flow makes architectural thinking accessible, but it still rewards people who actually apply it."

**Q: Is the code published?**
> "It's in a private repo currently. Happy to share the agent.js file — 156 lines — with anyone who wants to look at the implementation after the session."

---

## TIME BUDGET

| Section | Slides | Target |
|---|---|---|
| Context — Summit to Problem | 1–4 | 6 min |
| SDLC + Tools | 5–7 | 5 min |
| ADK + Why Multi-Agent | 8–9 | 5 min |
| AI & Architecture thesis | 10 | 2.5 min |
| Error Oracle product + Architecture | 11–12 | 3 min |
| LIVE DEMO | 13 | 6–8 min |
| Guardrails + Potential | 14–15 | 4 min |
| Takeaways + Q&A | 16–18 | 12+ min |
| **Total** | | **44–55 min + Q&A** |

---

*If running short on time: skip Card 7 (AI Studio detail) and Card 15 (Potential). The demo and the architectural thinking slide (Card 10) are non-negotiable.*
