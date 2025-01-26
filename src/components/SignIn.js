import React, { useState } from 'react';
import { signIn, signUp } from '../firebase';
import { useNavigate } from 'react-router-dom';
import './SignIn.css'

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false); // bascule login/inscription
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (isSignUp) {
                await signUp(email, password);
            } else {
                await signIn(email, password);
            }
            // Redirection par défaut vers la page restreinte
            navigate('/restricted');
        } catch (error) {
            console.error('Erreur auth:', error);
            alert(error.message);
        }
    };

    return (
        <div className="signin-container" style={{ marginTop: '2rem' }}>
            <h2>{isSignUp ? 'Créer un compte' : 'Se connecter'}</h2>
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

                <button type="submit">
                    {isSignUp ? 'S’inscrire' : 'Se connecter'}
                </button>
            </form>

            <button onClick={() => setIsSignUp(!isSignUp)} style={{ marginTop: '1rem' }}>
                {isSignUp ? 'Déjà un compte ? Connectez-vous' : 'Pas de compte ? Inscrivez-vous'}
            </button>
        </div>
    );
}

export default SignIn;
