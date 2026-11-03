"use strict";

const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = Number(process.env.PORT) || 3000;
const ROOT = __dirname;

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

const server = http.createServer((req, res) => {
  let requestPath;
  try { requestPath = decodeURIComponent((req.url || "/").split("?")[0]); }
  catch (e) { res.writeHead(400); res.end("Bad request"); return; }

  const relativePath = requestPath.endsWith("/") ? requestPath.slice(1) + "index.html" : requestPath.slice(1);
  const filePath = path.join(ROOT, relativePath);

  // Keep everything inside the project folder, and never serve server files.
  if (!filePath.startsWith(ROOT + path.sep) || /^(server\.js|package\.json|scripts)/.test(relativePath)) {
    res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not found");
      return;
    }
    const type = MIME_TYPES[path.extname(filePath).toLowerCase()] || "application/octet-stream";
    res.writeHead(200, { "Content-Type": type, "Cache-Control": "no-store" });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`Golden Mind CBT is running at http://localhost:${PORT}`);
});
