import React, {useEffect, useState} from 'react';
import EmojiDisplay from './EmojiDisplay';
import Scoreboard from './Scoreboard';
import './Game.css'; // Import du CSS spécifique au composant Game

import cinojiFr from '../data/cinoji-fr.json';

// Vérifie bien que ce chemin est correct selon ta structure de dossier
import Verif from './logic/Verif';

function Game({language, onRestart}) {
    const [allFilms, setAllFilms] = useState([]);
    const [currentFilm, setCurrentFilm] = useState(null);
    const [emojisShown, setEmojisShown] = useState(0);
    const [showingAnswer, setShowingAnswer] = useState(false);
    const [currentAnswer, setCurrentAnswer] = useState('');

    const [score, setScore] = useState([
        {name: 'Groupe 1', points: 0},
        {name: 'Groupe 2', points: 0},
    ]);

    const [isLoading, setIsLoading] = useState(false);
    const [fullResponse, setFullResponse] = useState(null);

    useEffect(() => {
        if (language === 'fr') {
            const combinedFilms = [
                ...cinojiFr.facile,
                ...cinojiFr.moyen,
                ...cinojiFr.difficile,
            ];
            setAllFilms(combinedFilms);
            pickRandomFilm(combinedFilms);
        } else {
            setAllFilms([]);
            setCurrentFilm(null);
        }
    }, [language]);

    const pickRandomFilm = (films = allFilms) => {
        if (films.length === 0) return;
        const randomIndex = Math.floor(Math.random() * films.length);
        const selectedFilm = films[randomIndex];
        setCurrentFilm(selectedFilm);
        setEmojisShown(1);
        setShowingAnswer(false);
        setCurrentAnswer('');
    };

    const revealNextEmoji = () => {
        if (currentFilm && emojisShown < currentFilm.emojis.length) {
            setEmojisShown(emojisShown + 1);
        }
    };

    const showAnswer = () => {
        if (currentFilm) {
            setShowingAnswer(true);
            setCurrentAnswer(currentFilm.title);
        }
    };

    const continueGame = () => {
        pickRandomFilm();
    };

    if (allFilms.length === 0 || !currentFilm) {
        return <div className="game-container">Chargement...</div>;
    }

    async function testVerif() {
        const inputElement = document.getElementById("value");
        const resultElement = document.getElementById("resultat");
        if (!inputElement || !resultElement) {
            console.error("[Game] Impossible de trouver l'input ou l'élément résultat.");
            return;
        }

        const userInput = inputElement.value;
        const orth = currentFilm.title;
        console.log("[Game] testVerif() => userInput:", userInput, "| orth:", orth);

        setIsLoading(true);
        setFullResponse(null);

        const responseFromVerif = await Verif(userInput, orth);

        setIsLoading(false);

        if (!responseFromVerif) {
            console.warn("[Game] Verif a retourné undefined ou null !");
            resultElement.innerHTML = "Erreur : la vérification n'a pas abouti.";
            return;
        }

        const {result, data} = responseFromVerif;
        if (typeof result === 'undefined') {
            console.warn("[Game] Le champ 'result' est undefined dans la réponse Verif");
            resultElement.innerHTML = "Erreur : le serveur n'a pas fourni de résultat.";
            return;
        }

        resultElement.innerHTML = result;

        if (data && data.message) {
            setFullResponse(data.message);
        }
        console.log("[Game] Résultat de Verif :", result);
    }

    return (
        <div className="game-container">
            <button className="restart-button" onClick={onRestart}>
                Arrêter la partie
            </button>

            <EmojiDisplay
                emojis={currentFilm.emojis}
                emojisShown={emojisShown}
                filmTitle={currentFilm.title}
                filmCategory={currentFilm.categoryMedia}
                filmGenre={currentFilm.genre}
            />

            {isLoading && (
                <div style={{color: "red", marginBottom: "1em"}}>
                    Chargement en cours...
                </div>
            )}

            {fullResponse && (
                <p id="full-response" style={{color: "gray", fontSize: "0.8em"}}>
                    {fullResponse}
                </p>
            )}
            <div className="reponse">
                <input type="text" id="value" placeholder="Entrez votre réponse ici"/>
                <button onClick={testVerif}>Vérifier</button>
                <p id="resultat" style={{fontSize: "1em"}}></p>
            </div>

            <div className="buttons">
                {!showingAnswer && emojisShown < currentFilm.emojis.length && (
                    <button onClick={revealNextEmoji}>
                        Dévoiler le {emojisShown + 1}ᵉ emoji
                    </button>
                )}
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

            <Scoreboard score={score} setScore={setScore}/>
        </div>
    );
}

export default Game;
