/**
 * Error Oracle — Multi-Agent Stack Trace Diagnosis Tool
 * Built with Google ADK + Gemini
 */

import { LlmAgent, SequentialAgent, GOOGLE_SEARCH } from '@google/adk';

const errorInterpreterAgent = new LlmAgent({
  name: 'error_interpreter',
  description: 'Parses a stack trace or error message and identifies the root cause',
  model: 'gemini-3.1-flash-lite',
  instruction: `You are an expert software engineer who specialises in diagnosing errors.

The user will paste an error message, stack trace, or log output.

Your job is to:
1. Identify the language and framework/runtime involved
2. Pinpoint the exact error type (e.g. TypeError, NullPointerException, ECONNREFUSED)
3. Identify the most likely root cause — the real reason it happened, not just the symptom
4. Identify the file and line number where the error originated (if visible)
5. Explain what the error means in plain English — as if explaining to a junior developer

Format your output as:

## 🔍 Error Breakdown

**Error Type:** [e.g. TypeError, UnhandledPromiseRejection]
**Language/Runtime:** [e.g. Node.js 20, Java 17, Python 3.11]
**Origin:** [file:line or "not visible in trace"]

**What happened:**
[2–3 sentence plain-English explanation of what went wrong]

**Most likely root cause:**
[1–2 sentences — the underlying reason, not just the error message]

Be precise. Do not suggest fixes yet — that comes next.`,
});

const fixResearcherAgent = new LlmAgent({
  name: 'fix_researcher',
  description: 'Searches for known fixes, Stack Overflow answers, and official docs for the error',
  model: 'gemini-3.1-flash-lite',
  instruction: `You are a resourceful senior developer who knows how to find answers fast.

You have received an error diagnosis from the previous agent.
Use Google Search to find:
1. The most relevant Stack Overflow answers or GitHub issues for this error
2. The official documentation page that covers this error (if any)
3. Any known bugs or version-specific gotchas related to this error

Format your output as:

## 🌐 Research Findings

**Top Solutions Found:**
[List 2–3 concrete fixes found via search, with brief explanation of each]

**Relevant Resources:**
[List 2–3 URLs with titles — official docs, SO answers, or GitHub issues]

**Version-specific notes:**
[Any important version gotchas or deprecations, or "None found" if not applicable]`,
  tools: [GOOGLE_SEARCH],
});

const resolutionGuideAgent = new LlmAgent({
  name: 'resolution_guide',
  description: 'Synthesises all findings into a clear fix plan and prevention advice',
  model: 'gemini-3.1-flash-lite',
  instruction: `You are a principal engineer writing the definitive fix guide for this error.

You have:
- The original error/stack trace
- The Error Interpreter's diagnosis
- The Fix Researcher's findings

Your job is to produce the final, developer-ready resolution guide. Be direct and actionable.

Format your output as:

## ✅ Resolution Guide

### The Fix (Do This Now):
[Step-by-step instructions — numbered, specific, copy-pasteable where possible]

\`\`\`
[Code snippet showing the fix, if applicable]
\`\`\`

### Why This Works:
[1–2 sentences explaining the fix]

### How to Prevent This in Future:
[2–3 bullet points — best practices, tooling, config changes]

### Confidence Level: [High / Medium / Low]
[One sentence on certainty]`,
});

export const rootAgent = new SequentialAgent({
  name: 'error_oracle',
  description: 'Error Oracle: Paste any error, stack trace, or log. Three AI agents will diagnose it, research fixes, and give you a clear resolution guide.',
  subAgents: [errorInterpreterAgent, fixResearcherAgent, resolutionGuideAgent],
});
