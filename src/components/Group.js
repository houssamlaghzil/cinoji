// src/components/Group.js
import React from 'react';
import './Group.css';

function Group({ group, onUpdate, onRemove, disableRemove }) {
    const handleNameChange = (e) => {
        onUpdate({ ...group, name: e.target.value });
    };

    const increment = () => {
        onUpdate({ ...group, points: group.points + 1 });
    };

    const decrement = () => {
        onUpdate({ ...group, points: group.points > 0 ? group.points - 1 : 0 });
    };

    return (
        <div className="group">
            <input
                type="text"
                value={group.name}
                onChange={handleNameChange}
                className="group-name"
            />
            <div className="points">
                <button onClick={decrement}>-</button>
                <span>{group.points}</span>
                <button onClick={increment}>+</button>
            </div>
            <button
                className="remove-group-button"
                onClick={onRemove}
                disabled={disableRemove}
                title={disableRemove ? "Au moins un groupe doit être présent" : "Retirer ce groupe"}
            >
                &times;
            </button>
        </div>
    );
}

export default Group;
