import { ThemeProvider } from '@emotion/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './SiteWeb/App';
import { theme } from './theme';
import { HashRouter } from 'react-router-dom';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <HashRouter hashType="noslash" future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </HashRouter>
);
