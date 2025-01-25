// Exemple index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Par défaut :
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// TEST : désactive le mode strict
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // plus de StrictMode
    <App />
);
