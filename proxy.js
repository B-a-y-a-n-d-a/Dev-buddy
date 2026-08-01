/**
 * Error Oracle — Dev Proxy
 * Serves index.html and proxies ADK API calls to port 8000.
 * Handles CORS preflight and SSE streaming properly.
 *
 * Usage: node proxy.js   (or: npm run ui)
 */
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ADK_PORT  = 8000;
const UI_PORT   = parseInt(process.env.PORT || '3000', 10);

const CORS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Accept',
};

const MIME = {
  '.html': 'text/html',
  '.js':   'application/javascript',
  '.css':  'text/css',
  '.json': 'application/json',
};

http.createServer((req, res) => {

  // ── CORS preflight ─────────────────────────────────────────────
  if (req.method === 'OPTIONS') {
    res.writeHead(204, CORS);
    res.end();
    return;
  }

  // ── Proxy ADK API + SSE ────────────────────────────────────────
  if (req.url.startsWith('/apps') || req.url.startsWith('/run_sse')) {
    // Collect the request body first, then forward
    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => {
      const body = Buffer.concat(chunks);

      const options = {
        hostname: 'localhost',
        port:     ADK_PORT,
        path:     req.url,
        method:   req.method,
        headers:  {
          'Content-Type':   'application/json',
          'Content-Length': body.length,
          'Accept':         req.headers['accept'] || '*/*',
        },
      };

      const proxy = http.request(options, proxyRes => {
        const headers = { ...proxyRes.headers, ...CORS };

        // For SSE: disable buffering so chunks reach the browser immediately
        if (proxyRes.headers['content-type']?.includes('text/event-stream')) {
          headers['cache-control']       = 'no-cache';
          headers['x-accel-buffering']   = 'no';
          headers['transfer-encoding']   = 'chunked';
          delete headers['content-length'];
        }

        res.writeHead(proxyRes.statusCode, headers);

        proxyRes.on('data', chunk => {
          if (!res.writableEnded) res.write(chunk);
        });

        proxyRes.on('end', () => {
          if (!res.writableEnded) res.end();
        });

        // ECONNRESET from ADK side = stream ended, that's fine
        proxyRes.on('error', () => {
          if (!res.writableEnded) res.end();
        });
      });

      proxy.on('error', err => {
        if (!res.headersSent) {
          res.writeHead(502, { 'Content-Type': 'text/plain', ...CORS });
          res.end('Cannot reach ADK api_server on port 8000.');
        }
      });

      proxy.write(body);
      proxy.end();
    });

    return;
  }

  // ── Static files ───────────────────────────────────────────────
  const filePath = req.url === '/'
    ? path.join(__dirname, 'index.html')
    : path.join(__dirname, decodeURIComponent(req.url));

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not found');
      return;
    }
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'text/plain' });
    res.end(data);
  });

}).listen(UI_PORT, () => {
  console.log('\n  ✅  Error Oracle proxy is running');
  console.log(`  🌐  Open → http://localhost:${UI_PORT}`);
  console.log(`  🔁  ADK  → http://localhost:${ADK_PORT}\n`);
});
