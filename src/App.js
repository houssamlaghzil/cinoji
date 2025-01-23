// src/App.js
import React, {useEffect, useState} from 'react';
import LanguageSelection from './components/LanguageSelection';
import Game from './components/Game';
import './App.css';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCA7o--QcKXjfSMsMWRiaakF08Jk28Lfaw",
  authDomain: "testnull-edcb5.firebaseapp.com",
  projectId: "testnull-edcb5",
  storageBucket: "testnull-edcb5.firebasestorage.app",
  messagingSenderId: "179772710945",
  appId: "1:179772710945:web:8ff27a380b6199d17f8360"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function App() {
  const [language, setLanguage] = useState('fr');
  const [theme, setTheme] = useState('auto'); // 'auto', 'light', 'dark'

  // Appliquer le thème
  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [theme]);

  // Fonction pour basculer le thème
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('auto');
    } else {
      setTheme('light');
    }
  };

  return (
      <div>
        <header className="header">
          <h1>Cinoji</h1>
          <button onClick={toggleTheme} className="theme-toggle-button">
            {theme === 'light' ? '🌙' : theme === 'dark' ? '☀️' : '🌓'}
          </button>
        </header>
        <Game language={language} onRestart={() => window.location.reload()} />
      </div>
  );
}

export default App;
