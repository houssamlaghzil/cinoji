// src/components/Scoreboard.js
import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import Group from './Group';
import './Scoreboard.css';

function Scoreboard({ score, setScore }) {
    useEffect(() => {
        // Chargement du score depuis les cookies
        const savedScore = Cookies.get('score');
        if (savedScore) {
            setScore(JSON.parse(savedScore));
        }
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        // Sauvegarde du score dans les cookies
        Cookies.set('score', JSON.stringify(score), { expires: 7 });
    }, [score]);

    const addGroup = () => {
        if (score.length < 8) {
            setScore([...score, { name: `Groupe ${score.length + 1}`, points: 0 }]);
        }
    };

    const deleteGroup = (index) => {
        if (score.length > 2) {
            const newScore = [...score];
            newScore.splice(index, 1);
            setScore(newScore);
        }
    };

    const resetScores = () => {
        const newScore = score.map((grp) => ({ ...grp, points: 0 }));
        setScore(newScore);
    };

    return (
        <div className="scoreboard">
            <h3>Scoreboard</h3>
            {score.map((group, index) => (
                <Group
                    key={index}
                    group={group}
                    onUpdate={(updatedGroup) => {
                        const newScore = [...score];
                        newScore[index] = updatedGroup;
                        setScore(newScore);
                    }}
                    onRemove={() => deleteGroup(index)}
                    disableRemove={score.length <= 2}
                />
            ))}
            <div className="scoreboard-buttons">
                <button onClick={addGroup}>Ajouter un groupe</button>
                <button onClick={resetScores}>Réinitialiser les scores</button>
            </div>
        </div>
    );
}

export default Scoreboard;
