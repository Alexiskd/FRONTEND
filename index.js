import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Hydratation de l'application sur le div "root" généré côté serveur
ReactDOM.hydrate(<App />, document.getElementById('root'));
