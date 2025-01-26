// src/components/Game.js
import React, { useState, useEffect } from 'react';
import EmojiDisplay from './EmojiDisplay';
import Scoreboard from './Scoreboard';
import Verif from './logic/Verif';
import Modal from './Modal'; // Import du composant Modal
import './Game.css'; // Import du fichier CSS spécifique à Game
import filmsData from '../data/cinoji-fr.json'; // Import des films depuis le JSON local

function Game() {
    // États pour la sélection de la difficulté
    const [difficulty, setDifficulty] = useState(null);

    // États pour gérer les films
    const [allFilms, setAllFilms] = useState([]);
    const [currentFilm, setCurrentFilm] = useState(null);
    const [emojisShown, setEmojisShown] = useState(1);
    const [showingAnswer, setShowingAnswer] = useState(false);
    const [currentAnswer, setCurrentAnswer] = useState('');
    const [score, setScore] = useState([
        { name: 'Groupe 1', points: 0 },
        { name: 'Groupe 2', points: 0 },
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const [displayMessage, setDisplayMessage] = useState('');
    const [hasSubmittedAnswer, setHasSubmittedAnswer] = useState(false); // Nouveau état

    // États pour la modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Listes de messages de félicitations et d'encouragements
    const successMessages = [
        'Excellent travail ! Vous avez trouvé la bonne réponse !',
        'Fantastique ! Vous avez deviné correctement !',
        'Super ! Bien joué pour avoir trouvé le bon titre !',
        'Bravo ! Votre perspicacité est impressionnante !',
        'Incroyable ! Vous avez identifié le film correctement !',
        'Magnifique ! Vous êtes sur la bonne voie !',
        'Félicitations ! Vous avez réussi avec brio !',
        'Parfait ! Vous avez déchiffré le titre avec succès !',
        'Formidable ! Votre réponse est exacte !',
        'Superbe ! Vous avez deviné juste !',
        'Épatant ! Vous avez trouvé la bonne orthographe !',
        'Brillant ! Votre réponse est impeccable !',
        'Génial ! Vous avez identifié le bon film !',
        'Splendide ! Vous avez réussi cette épreuve !',
        'Remarquable ! Votre réponse est correcte !',
        'Impressionnant ! Vous avez trouvé le bon titre !',
        'Stupéfiant ! Votre perspicacité est remarquable !',
        'Féerique ! Vous avez décelé la bonne réponse !',
        'Éclatant ! Vous avez brillamment identifié le film !',
        'Lumineux ! Votre réponse est parfaite !',
    ];

    const failureMessages = [
        'Dommage ! Ce n\'est pas le bon film. Essayez encore !',
        'Oups ! Ce titre ne correspond pas. Réessayez !',
        'Ce n\'est pas tout à fait ça. Tentez une autre réponse !',
        'Pas la bonne réponse, mais ne vous découragez pas !',
        'Mauvaise réponse ! Continuez à essayer !',
        'Ce n\'est pas correct. Réessayez avec une autre proposition !',
        'Incorrect ! Ne baissez pas les bras et essayez encore !',
        'Ce n\'est pas le bon titre. Essayez une autre réponse !',
        'Faux ! Continuez à chercher la bonne réponse !',
        'Pas tout à fait. Réfléchissez à une autre possibilité !',
        'Malheureusement non ! Essayez de nouveau !',
        'Ce n\'est pas la bonne réponse. Tentez une autre option !',
        'Incorrect ! Ne vous arrêtez pas maintenant !',
        'Ce n\'est pas correct. Continuez à chercher !',
        'Mauvaise réponse ! Vous pouvez y arriver !',
        'Oups, ce n\'est pas le bon titre. Essayez encore !',
        'Ce n\'est pas la bonne réponse. Ne lâchez pas !',
        'Faux ! Réessayez avec une autre suggestion !',
        'Ce n\'est pas correct. Tentez une autre réponse !',
        'Mauvaise réponse ! Continuez à essayer !',
    ];

    // Fonction pour sélectionner un message aléatoire
    const getRandomMessage = (messages) => {
        const randomIndex = Math.floor(Math.random() * messages.length);
        return messages[randomIndex];
    };

    // Charger les films en fonction de la difficulté sélectionnée
    useEffect(() => {
        if (difficulty) {
            setAllFilms(filmsData[difficulty]);
        }
    }, [difficulty]);

    // Sélectionner un film aléatoire lorsque les films sont chargés
    useEffect(() => {
        if (allFilms.length > 0) {
            pickRandomFilm(allFilms);
        }
    }, [allFilms]);

    // Fonction pour sélectionner un film aléatoire
    const pickRandomFilm = (films) => {
        if (!films || films.length === 0) return;
        const randomIndex = Math.floor(Math.random() * films.length);
        setCurrentFilm(films[randomIndex]);
        setEmojisShown(1);
        setShowingAnswer(false);
        setCurrentAnswer('');
        setDisplayMessage('');
        setHasSubmittedAnswer(false); // Réinitialiser l'état
    };

    // Fonction pour révéler le prochain émoji
    const revealNextEmoji = () => {
        if (!currentFilm) return;
        if (emojisShown < currentFilm.emojis.length) {
            setEmojisShown(emojisShown + 1);
        }
    };

    // Fonction pour afficher la réponse
    const showAnswer = () => {
        setShowingAnswer(true);
    };

    // Fonction pour vérifier la réponse utilisateur via l'API
    const testVerif = async () => {
        if (!currentAnswer || !currentFilm) return;
        setIsLoading(true);
        const result = await Verif(currentAnswer, currentFilm.title);
        setIsLoading(false);
        setHasSubmittedAnswer(true); // Marquer qu'une réponse a été soumise

        // Logique pour mettre à jour le score en fonction de la réponse
        if (result.includes('Bravo')) {
            // Sélectionner un message de succès aléatoire
            const successMsg = getRandomMessage(successMessages);
            setDisplayMessage(successMsg);

            // Ouvrir la modal pour attribuer le point
            setIsModalOpen(true);
        } else if (result.includes('proche')) {
            // Sélectionner un message de succès aléatoire (si proche est considéré comme correct)
            const successMsg = getRandomMessage(successMessages);
            setDisplayMessage(successMsg);

            // Ouvrir la modal pour attribuer le point
            setIsModalOpen(true);
        } else {
            // Sélectionner un message d'encouragement aléatoire
            const failureMsg = getRandomMessage(failureMessages);
            setDisplayMessage(failureMsg);
        }
    };

    // Fonction pour attribuer un point à un groupe
    const assignPoint = (groupIndex) => {
        setScore((prevScore) => {
            const newScore = [...prevScore];
            newScore[groupIndex].points += 1;
            return newScore;
        });
        setIsModalOpen(false); // Fermer la modal
    };

    // Fonction pour sélectionner la difficulté
    const handleDifficultySelection = (level) => {
        setDifficulty(level);
    };

    return (
        <div className="game-container">
            <h2>Mode Classique</h2>

            {/* Sélection de la difficulté */}
            {!difficulty && (
                <div className="difficulty-selection">
                    <h3>Choisissez la difficulté :</h3>
                    <div className="difficulty-buttons">
                        <button onClick={() => handleDifficultySelection('facile')}>Facile</button>
                        <button onClick={() => handleDifficultySelection('moyen')}>Moyen</button>
                        <button onClick={() => handleDifficultySelection('difficile')}>Difficile</button>
                    </div>
                </div>
            )}

            {/* Affichage du film uniquement si une difficulté est sélectionnée */}
            {difficulty && currentFilm && (
                <>
                    <EmojiDisplay
                        emojis={currentFilm.emojis}
                        emojisShown={emojisShown}
                        filmTitle={currentFilm.title}
                        filmCategory={currentFilm.categoryMedia}
                        filmGenre={currentFilm.genre}
                    />

                    <div className="game-actions">
                        <button onClick={revealNextEmoji} disabled={emojisShown >= currentFilm.emojis.length}>
                            Afficher un émoji de plus
                        </button>
                        <button onClick={showAnswer} disabled={showingAnswer}>
                            Afficher la réponse
                        </button>
                    </div>

                    {showingAnswer && currentFilm && <p className="answer-text">Réponse : {currentFilm.title}</p>}

                    <div className="game-input">
                        <input
                            type="text"
                            placeholder="Votre proposition"
                            value={currentAnswer}
                            onChange={(e) => setCurrentAnswer(e.target.value)}
                        />
                        <button onClick={testVerif} disabled={isLoading}>
                            {isLoading ? 'Vérification...' : 'Valider'}
                        </button>
                    </div>

                    {displayMessage && <p className="api-message">{displayMessage}</p>}

                    {/* Bouton pour changer de film */}
                    {emojisShown === currentFilm.emojis.length && hasSubmittedAnswer && (
                        <div className="change-film">
                            <button onClick={() => pickRandomFilm(allFilms)}>Changer de film</button>
                        </div>
                    )}

                    <Scoreboard score={score} setScore={setScore} />

                    {/* Modal pour attribuer le point */}
                    <Modal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        groups={score}
                        onAssign={assignPoint}
                    />
                </>
            )}
        </div>
    );
}

export default Game;
