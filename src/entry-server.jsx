// src/entry-server.jsx
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './SiteWeb/App'; // Assurez-vous que ce fichier exporte "default"

export function render(url) {
  const appHtml = renderToString(<App />);
  return appHtml;
}
