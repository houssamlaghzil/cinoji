// App.js
import React, {useState, useEffect} from 'react';
import {Routes, Route, Navigate, useNavigate} from 'react-router-dom';
import {onAuthStateChanged} from 'firebase/auth';

import {auth, logOut} from './firebase';
import Home from './components/Home';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp'; // Nouveau composant
import Game from './components/Game'; // Mode de jeu classique
import RestrictedGame from './components/RestrictedGame'; // Mode de jeu restreint
import Navbar from './components/Navbar'; // Import de la Navbar
import './App.css';
import StripeProvider from "./StripeProvider"; // Ton style global (optionnel)

function App() {
    const [user, setUser] = useState(null);
    const [theme, setTheme] = useState('light');
    const navigate = useNavigate();

    // Écoute l'état de l'utilisateur connecté/déconnecté
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    // Exemples de fonctions pour basculer le thème
    function toggleTheme() {
        if (theme === 'light') setTheme('dark');
        else if (theme === 'dark') setTheme('auto');
        else setTheme('light');
    }

    // Déconnexion et retour à la Home
    const handleLogout = async () => {
        await logOut();
        navigate('/');
    };

    return (
        <StripeProvider>
            <div className={`app ${theme}`}>
                <header>
                    <h1>Cinoji</h1>
                    <button onClick={toggleTheme}>Changer thème ({theme})</button>
                    {user && <button onClick={handleLogout}>Se déconnecter</button>}
                </header>

                {/* Intégration de la Navbar */}
                <Navbar/>

                <Routes>
                    {/* Page d’accueil : choisir son mode de jeu */}
                    <Route path="/" element={<Home user={user}/>}/>

                    {/* Page de connexion / inscription */}
                    <Route path="/signin" element={<SignIn/>}/>

                    <Route path="/signup" element={<SignUp/>}/> {/* Nouvelle Route */}

                    {/* Mode de jeu classique */}
                    <Route path="/classic" element={<Game/>}/>

                    {/* Mode de jeu restreint - protégé par user ? */}
                    <Route
                        path="/restricted"
                        element={
                            user ? <RestrictedGame/> : <Navigate to="/signin" replace/>
                        }
                    />

                    {/* Redirection par défaut */}
                    <Route path="*" element={<Navigate to="/"/>}/>
                </Routes>
            </div>
        </StripeProvider>
    );
}

export default App;
