import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import du fichier CSS spécifique à la navbar

function Navbar() {
    return (
        <nav className="navbar">
            <ul className="navbar-menu">
                <li className="navbar-item">
                    <Link to="/" className="navbar-link">Accueil</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/classic" className="navbar-link">Mode Classique</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/restricted" className="navbar-link">Mode Restreint</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
