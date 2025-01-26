import React from 'react';
import './LanguageSelection.css'

function LanguageSelection({ onSelect }) {
    return (
        <div className="language-selection">
            <p>Choisir la langue :</p>
            <button onClick={() => onSelect('fr')}>Français</button>
            <button onClick={() => onSelect('en')}>Anglais</button>
        </div>
    );
}

export default LanguageSelection;
