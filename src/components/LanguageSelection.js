// src/components/LanguageSelection.js
import React from 'react';
import './LanguageSelection.css';

function LanguageSelection({ onSelect }) {
    return (
        <div className="language-selection">
            <h1>Choisissez une langue / Choose a language</h1>
            <div className="buttons">
                <button onClick={() => onSelect('fr')}>Français</button>
                <button onClick={() => onSelect('en')}>English</button>
            </div>
        </div>
    );
}

export default LanguageSelection;
