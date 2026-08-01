# ── Error Oracle — Cloud Run Container ──────────────────────────────
# Runs ADK api_server (port 8000, internal) + proxy/frontend ($PORT, public)

FROM node:20-slim

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy app files
COPY agent.js proxy.js index.html start.sh ./

# Make startup script executable
RUN chmod +x start.sh

# Cloud Run injects $PORT (default 8080) — proxy listens on it
EXPOSE 8080

CMD ["./start.sh"]
