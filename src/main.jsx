import { ThemeProvider } from '@emotion/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './SiteWeb/App';
import { theme } from './theme';
import { StaticRouter } from 'react-router-dom/server';

const location = window.location.pathname; // On récupère l'URL actuelle

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <StaticRouter location={location}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StaticRouter>
);
