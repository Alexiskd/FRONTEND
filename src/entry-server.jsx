// src/entry-server.jsx
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './SiteWeb/App'; // Vérifiez que App est exporté par défaut

export function render(url) {
  const appHtml = renderToString(<App />);
  return appHtml;
}
