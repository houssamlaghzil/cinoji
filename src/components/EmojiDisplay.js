// src/components/EmojiDisplay.js
import React from 'react';
import './EmojiDisplay.css';

function EmojiDisplay({ emojis, emojisShown, filmTitle, filmCategory, filmGenre }) {
    return (
        <div className="emoji-display">
            <div className="emoji-line">
                {emojis.slice(0, emojisShown).map((emoji, index) => (
                    <span key={index} className="emoji">
            {emoji}
          </span>
                ))}
            </div>
            <p className="film-info">Catégorie : {filmCategory}</p>
            {emojisShown >= 2 && <p className="film-info">Genre : {filmGenre}</p>}
        </div>
    );
}

export default EmojiDisplay;
