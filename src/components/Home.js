// Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home({ user }) {
    return (
        <div className="home-container">
            <h2 className="home-title">Bienvenue sur Cinoji !</h2>
            <p className="home-description">Choisissez un mode de jeu :</p>
            <div className="home-buttons">
                <Link to="/classic">
                    <button className="home-button">Mode Classique</button>
                </Link>

                {user ? (
                    <Link to="/restricted">
                        <button className="home-button">Mode Restreint (VIP)</button>
                    </Link>
                ) : (
                    <button className="home-button disabled" disabled>
                        Mode Restreint (connectez-vous)
                    </button>
                )}
            </div>
            <div className="home-auth">
                {!user && (
                    <Link to="/signin">
                        <button className="home-button">Se connecter / Créer un compte</button>
                    </Link>
                )}
            </div>
        </div>
    );
}

export default Home;
