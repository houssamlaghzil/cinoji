// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // Import correct pour React 18
import App from './App';
import './index.css'; // Styles globaux

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container); // Créer une racine React

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
