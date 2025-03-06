import { ThemeProvider } from '@emotion/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './SiteWeb/App';
import { theme } from './theme';
import { MemoryRouter } from 'react-router-dom';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <MemoryRouter>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </MemoryRouter>
);
