// src/components/Game.js
import React, { useState, useEffect } from 'react';
import EmojiDisplay from './EmojiDisplay';
import Scoreboard from './Scoreboard';
import './Game.css'; // Import du CSS spécifique au composant Game
import cinojiFr from '../data/cinoji-fr.json'; // Import des données JSON

function Game({ language, onRestart }) {
    // États pour gérer les données et le jeu
    const [allFilms, setAllFilms] = useState([]);
    const [currentFilm, setCurrentFilm] = useState(null);
    const [emojisShown, setEmojisShown] = useState(0);
    const [showingAnswer, setShowingAnswer] = useState(false);
    const [currentAnswer, setCurrentAnswer] = useState('');
    const [score, setScore] = useState([
        { name: 'Groupe 1', points: 0 },
        { name: 'Groupe 2', points: 0 },
    ]);

    // Charger les données au démarrage
    useEffect(() => {
        // Vous pouvez ajuster la logique en fonction de la langue
        if (language === 'fr') {
            const combinedFilms = [
                ...cinojiFr.facile,
                ...cinojiFr.moyen,
                ...cinojiFr.difficile,
            ];
            setAllFilms(combinedFilms);
            pickRandomFilm(combinedFilms);
        } else {
            // Si vous avez des données pour d'autres langues, ajoutez-les ici
            setAllFilms([]);
            setCurrentFilm(null);
        }
    }, [language]);

    // Fonction pour choisir un film aléatoire
    const pickRandomFilm = (films = allFilms) => {
        if (films.length === 0) return;
        const randomIndex = Math.floor(Math.random() * films.length);
        const selectedFilm = films[randomIndex];
        setCurrentFilm(selectedFilm);
        setEmojisShown(1); // Afficher le premier emoji par défaut
        setShowingAnswer(false);
        setCurrentAnswer('');
    };

    // Fonction pour dévoiler le prochain emoji
    const revealNextEmoji = () => {
        if (currentFilm && emojisShown < currentFilm.emojis.length) {
            setEmojisShown(emojisShown + 1);
        }
    };

    // Fonction pour montrer la réponse
    const showAnswer = () => {
        setShowingAnswer(true);
        setCurrentAnswer(currentFilm.title);
        // Vous pouvez également mettre à jour le score ici si nécessaire
    };

    // Fonction pour continuer le jeu avec un nouveau film
    const continueGame = () => {
        pickRandomFilm();
    };

    // Vérifier si les données sont chargées
    if (allFilms.length === 0 || !currentFilm) {
        return <div className="game-container">Chargement...</div>;
    }

    return (
        <div className="game-container">
            <button className="restart-button" onClick={onRestart}>
                Arrêter la partie
            </button>

            {/* Composant d'affichage des emojis */}
            <EmojiDisplay
                emojis={currentFilm.emojis}
                emojisShown={emojisShown}
                filmTitle={currentFilm.title}
                filmCategory={currentFilm.categoryMedia}
                filmGenre={currentFilm.genre}
            />

            <div className="buttons">
                {/* Bouton pour dévoiler l'emoji suivant */}
                {!showingAnswer && emojisShown < currentFilm.emojis.length && (
                    <button onClick={revealNextEmoji}>
                        Dévoiler le {emojisShown + 1}ᵉ emoji
                    </button>
                )}

                {/* Bouton pour donner la réponse */}
                {!showingAnswer && emojisShown === currentFilm.emojis.length && (
                    <button onClick={showAnswer}>Donner la réponse</button>
                )}
            </div>

            {showingAnswer && (
                <div className="answer-section">
                    <h2 className="answer-title">Réponse :</h2>
                    <p className="answer-text">{currentAnswer}</p>
                    <button className="continue-button" onClick={continueGame}>
                        Continuer
                    </button>
                </div>
            )}

            {/* Tableau des scores */}
            <Scoreboard score={score} setScore={setScore} />
        </div>
    );
}

export default Game;
