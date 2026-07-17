# How to Generate the Error Oracle UI in Google Stitch

## What is Google Stitch?
Google Stitch (stitch.withgoogle.com) is a free Google Labs tool that generates
UI designs and frontend code from a text prompt using Gemini. You use it to show
the audience how the UI concept was designed — this is part of the SDLC story.

---

## Step 1 — Open Stitch
Go to: https://stitch.withgoogle.com
Sign in with your Google account.

---

## Step 2 — Paste this prompt exactly

> A dark glassmorphic developer tool called "Error Oracle". The UI has a deep
> navy background with subtle blue, green and red mesh gradients. There is a
> frosted glass card at the top with a monospace textarea where a developer
> pastes a stack trace. Below it are three frosted glass panels side by side,
> each representing an AI agent: "Error Interpreter" (blue accent), "Fix
> Researcher" (green accent), and "Resolution Guide" (yellow accent). Each panel
> has a status badge that shows "Idle", "Running..." or "Done". At the top of
> the page are four Google colour dots (blue, red, yellow, green) and a title
> "Error Oracle" in a gradient white-to-light-blue. The overall feel is premium,
> dark, and technical — like a dev tool built by Google.

---

## Step 3 — Refine in Stitch
- Use the chat on the right to ask it to adjust colours, spacing, or layout
- Click "Paste to Figma" if you want to show a Figma handoff in the demo
- Click "Export code" to get the HTML/CSS

---

## Step 4 — What to say during the demo
> "Before writing a single line of code, I went to Google Stitch — a free
> Google Labs tool — and described the UI I wanted in plain English. In about
> 30 seconds it generated a design and the frontend code. This is what the
> modern design-to-code workflow looks like. Then I took that into AI Studio
> to prototype the agent prompts, and finally into ADK to wire it all together
> as a multi-agent system."

---

## The full SDLC story (what to show in order)
1. Google Stitch       — design the UI from a prompt
2. Google AI Studio    — experiment with agent prompts, get the API key
3. Google ADK          — build the multi-agent backend in TypeScript
4. Open index.html     — show the custom frontend connected to ADK
5. Paste an error live — show all three agents responding in real time
