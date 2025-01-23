// src/components/EmojiDisplay.js
import React from 'react';
import './EmojiDisplay.css'; // Import du CSS spécifique au composant EmojiDisplay

function EmojiDisplay({ emojis, emojisShown, filmTitle, filmCategory, filmGenre }) {
    return (
        <div className="emoji-display">
            <h2>Devinez de quoi il s'agit :</h2>

            {/* Catégorie toujours affichée */}
            <p className="category-info">Catégorie : {filmCategory}</p>

            {/* Genre affiché à partir du 2ᵉ emoji */}
            {emojisShown >= 2 && (
                <p className="genre-info">Genre : {filmGenre}</p>
            )}

            <div className="emojis">
                {emojis.slice(0, emojisShown).map((emoji, index) => (
                    <span key={index} className={`emoji ${emojisShown > index ? 'emoji-show' : ''}`}>
            {emoji}
          </span>
                ))}
            </div>
        </div>
    );
}

export default EmojiDisplay;
