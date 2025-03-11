// server.js (en mode ESM)
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

// Pour obtenir __dirname en mode ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function createServer() {
  const app = express();

  // Créez une instance de Vite en mode middleware pour le SSR
  const vite = await createViteServer({
    server: { middlewareMode: 'ssr' }
  });
  app.use(vite.middlewares);

  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl;

      // Lire le template HTML
      let template = fs.readFileSync(
        path.resolve(__dirname, 'index.html'),
        'utf-8'
      );

      // Transforme le template (injecte HMR, etc.)
      template = await vite.transformIndexHtml(url, template);

      // Charge le module serveur via Vite
      const { render } = await vite.ssrLoadModule('/src/entry-server.jsx');

      // Génère le HTML de l'app
      const appHtml = await render(url);

      // Injecte le HTML rendu dans le template
      const html = template.replace('<!--ssr-outlet-->', appHtml);

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      // Correction des traces d'erreur côté serveur
      vite.ssrFixStacktrace(e);
      console.error(e);
      res.status(500).end(e.message);
    }
  });

  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

createServer();
