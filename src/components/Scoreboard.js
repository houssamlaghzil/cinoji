// src/components/Scoreboard.js
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import './Scoreboard.css';

function Scoreboard({ score, setScore }) {
    const MAX_GROUPS = 8;
    const MIN_GROUPS = 2;

    // Charger les scores depuis les cookies au montage du composant
    useEffect(() => {
        const savedScores = Cookies.get('scoreboard');
        if (savedScores) {
            setScore(JSON.parse(savedScores));
        }
    }, [setScore]);

    // Sauvegarder les scores dans les cookies à chaque mise à jour
    useEffect(() => {
        Cookies.set('scoreboard', JSON.stringify(score), { expires: 7 });
    }, [score]);

    // Ajouter un nouveau groupe
    const addGroup = () => {
        if (score.length < MAX_GROUPS) {
            const newGroup = { name: `Groupe ${score.length + 1}`, points: 0 };
            setScore([...score, newGroup]);
        }
    };

    // Supprimer un groupe par index
    const deleteGroup = (index) => {
        if (score.length > MIN_GROUPS) {
            const updatedScore = score.filter((_, i) => i !== index);
            // Renommer les groupes après suppression
            const renamedScore = updatedScore.map((group, i) => ({
                ...group,
                name: `Groupe ${i + 1}`,
            }));
            setScore(renamedScore);
        }
    };

    // Incrémenter les points d'un groupe par index
    const incrementPoints = (index) => {
        const updatedScore = score.map((group, i) =>
            i === index ? { ...group, points: group.points + 1 } : group
        );
        setScore(updatedScore);
    };

    // Décrémenter les points d'un groupe par index
    const decrementPoints = (index) => {
        const updatedScore = score.map((group, i) =>
            i === index
                ? { ...group, points: group.points > 0 ? group.points - 1 : 0 }
                : group
        );
        setScore(updatedScore);
    };

    // Réinitialiser tous les scores à zéro
    const resetScores = () => {
        const resetedScores = score.map(group => ({ ...group, points: 0 }));
        setScore(resetedScores);
    };

    return (
        <div className="scoreboard">
            <h3>Scoreboard</h3>
            <div className="scoreboard-controls">
                <button
                    onClick={addGroup}
                    disabled={score.length >= MAX_GROUPS}
                    className="add-group-button"
                >
                    Ajouter un groupe
                </button>
                <button onClick={resetScores} className="reset-scores-button">
                    Réinitialiser les scores
                </button>
            </div>
            <table>
                <thead>
                <tr>
                    <th>Groupe</th>
                    <th>Points</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {score.map((group, index) => (
                    <tr key={index}>
                        <td>{group.name}</td>
                        <td>{group.points}</td>
                        <td>
                            <button
                                onClick={() => incrementPoints(index)}
                                className="action-button increment"
                                aria-label={`Incrémenter les points de ${group.name}`}
                            >
                                +
                            </button>
                            <button
                                onClick={() => decrementPoints(index)}
                                className="action-button decrement"
                                aria-label={`Décrémenter les points de ${group.name}`}
                                disabled={group.points === 0}
                            >
                                -
                            </button>
                            <button
                                onClick={() => deleteGroup(index)}
                                className="action-button delete"
                                aria-label={`Supprimer ${group.name}`}
                                disabled={score.length <= MIN_GROUPS}
                            >
                                🗑️
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default Scoreboard;
