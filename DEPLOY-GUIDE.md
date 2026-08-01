# Error Oracle — Cloud Run Deployment Guide

## Architecture

```
Browser → Cloud Run (proxy.js on $PORT)
                ↓
          ADK api_server (localhost:8000, internal)
                ↓
          Gemini API (GOOGLE_GENAI_API_KEY)
```

Both the frontend and ADK run in **one container** on Cloud Run.

---

## Prerequisites

### 1. Install Google Cloud CLI
Download from: https://cloud.google.com/sdk/docs/install  
Then run:
```bash
gcloud init
```
Sign in with your Google account when prompted.

### 2. Create a Google Cloud Project
```bash
gcloud projects create error-oracle-demo --name="Error Oracle"
gcloud config set project error-oracle-demo
```
> If the project ID is taken, use something like `error-oracle-bayanda-2026`

### 3. Enable billing
Go to: https://console.cloud.google.com/billing  
Link a billing account to your project.  
> Cloud Run has a **free tier** (2 million requests/month). This demo won't cost anything meaningful.

### 4. Enable required APIs
```bash
gcloud services enable run.googleapis.com
gcloud services enable artifactregistry.googleapis.com
gcloud services enable cloudbuild.googleapis.com
```

---

## Deploy

### Step 1 — Set your project
```bash
gcloud config set project YOUR_PROJECT_ID
```

### Step 2 — Deploy to Cloud Run
Run this from inside the `dev-buddy` folder:

```bash
gcloud run deploy error-oracle \
  --source . \
  --region africa-south1 \
  --platform managed \
  --allow-unauthenticated \
  --set-env-vars GOOGLE_GENAI_API_KEY=YOUR_API_KEY_HERE \
  --memory 512Mi \
  --cpu 1 \
  --port 8080
```

> **`--source .`** tells gcloud to build the Docker image from the current directory using Cloud Build — no local Docker needed.  
> **`africa-south1`** is the Johannesburg region. Use `us-central1` if unavailable.  
> **`--allow-unauthenticated`** makes the URL public (required for the demo).

### Step 3 — Get your live URL
After deploy completes, gcloud prints:
```
Service URL: https://error-oracle-xxxx-uc.a.run.app
```
Open that URL in your browser. Error Oracle is live.

**Current live URL:** https://error-oracle-80153819730.africa-south1.run.app

---

## Local development (unchanged)

Nothing changed for local dev. Two terminals as before:

```bash
# Terminal 1 — ADK backend
npm run dev

# Terminal 2 — Frontend proxy  
npm run ui
```
Open http://localhost:3000

---

## Redeploy after changes

```bash
gcloud run deploy error-oracle --source . --region africa-south1
```

---

## Environment variables

| Variable | Where to set |
|---|---|
| `GOOGLE_GENAI_API_KEY` | `--set-env-vars` in deploy command |

To update the API key without full redeploy:
```bash
gcloud run services update error-oracle \
  --region africa-south1 \
  --set-env-vars GOOGLE_GENAI_API_KEY=NEW_KEY
```

---

## Useful commands

```bash
# View live logs
gcloud run services logs read error-oracle --region africa-south1 --limit 50

# Check service status
gcloud run services describe error-oracle --region africa-south1

# Delete service (stops billing)
gcloud run services delete error-oracle --region africa-south1
```
