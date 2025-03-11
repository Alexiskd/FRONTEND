// src/entry-client.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './main.jsx'; // Assurez-vous que main.jsx exporte votre composant principal

ReactDOM.hydrate(<App />, document.getElementById('root'));
