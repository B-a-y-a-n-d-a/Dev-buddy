#!/bin/sh
# Start ADK api_server in background, then proxy as main process

echo "==> Starting ADK api_server on port 8000..."
node ./node_modules/@google/adk-devtools/dist/esm/cli_entrypoint.js \
  api_server agent.js \
  --port=8000 \
  --compile=false \
  --bundle=false &

ADK_PID=$!

# Wait for ADK to be ready (poll port 8000)
echo "==> Waiting for ADK to be ready..."
for i in $(seq 1 30); do
  if node -e "
    const http = require('http');
    const req = http.get('http://localhost:8000', () => process.exit(0));
    req.on('error', () => process.exit(1));
    req.end();
  " 2>/dev/null; then
    echo "==> ADK is ready."
    break
  fi
  echo "    waiting... ($i/30)"
  sleep 1
done

echo "==> Starting proxy/frontend on port ${PORT:-8080}..."
node proxy.js

# If proxy exits, kill ADK
kill $ADK_PID 2>/dev/null
