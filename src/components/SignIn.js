// src/components/SignIn.js
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate, Link } from 'react-router-dom';
import './SignIn.css'; // Assurez-vous que ce fichier existe et est stylisé

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            // Tenter de se connecter avec Firebase Authentication
            await signInWithEmailAndPassword(auth, email, password);

            // Après une connexion réussie, rediriger vers une page restreinte
            navigate('/restricted');
        } catch (err) {
            console.error('Erreur lors de la connexion:', err);
            // Gérer les erreurs courantes
            switch (err.code) {
                case 'auth/user-not-found':
                    setError('Aucun utilisateur trouvé avec cet email.');
                    break;
                case 'auth/wrong-password':
                    setError('Mot de passe incorrect.');
                    break;
                case 'auth/invalid-email':
                    setError('Email invalide.');
                    break;
                default:
                    setError('Erreur lors de la connexion. Veuillez réessayer.');
            }
        }
    };

    return (
        <div className="signin-container" style={{ marginTop: '2rem' }}>
            <h2>Se connecter</h2>
            <form onSubmit={handleSubmit} className="signin-form">
                <input
                    type="email"
                    placeholder="Adresse email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}

                <button type="submit">
                    Se connecter
                </button>
            </form>

            <div style={{ marginTop: '1rem' }}>
                <p>Pas de compte ? <Link to="/signup">Créez un compte</Link></p>
            </div>
        </div>
    );
}

export default SignIn;
