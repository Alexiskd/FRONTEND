// src/entry-client.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './main.jsx'; // Import par défaut

ReactDOM.hydrate(<App />, document.getElementById('root'));
