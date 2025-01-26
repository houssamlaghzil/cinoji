import React, { useState } from 'react';


function RestrictedGame() {
    const [message, setMessage] = useState('Bienvenue dans le mode VIP !');

    return (
        <div style={{ marginTop: '2rem' }}>
            <h2>Mode de jeu restreint</h2>
            <p>{message}</p>

            {/* Place ici ton code de jeu spécifique */}
        </div>
    );
}

export default RestrictedGame;
