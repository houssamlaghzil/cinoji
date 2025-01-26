import React from 'react';
import './Group.css'

function Group({group, onUpdate, onRemove, disableRemove}) {
    const handleNameChange = (e) => {
        onUpdate({...group, name: e.target.value});
    };

    const incrementPoints = () => {
        onUpdate({...group, points: group.points + 1});
    };

    const decrementPoints = () => {
        onUpdate({...group, points: group.points - 1});
    };

    return (
        <div className="group-container">
            <input
                type="text"
                value={group.name}
                onChange={handleNameChange}
                style={{marginRight: '1rem'}}
            />
            <span>Points: {group.points}</span>
            <button onClick={incrementPoints} style={{marginLeft: '1rem'}}>+1</button>
            <button onClick={decrementPoints}>-1</button>
            <button onClick={onRemove} disabled={disableRemove} style={{marginLeft: '1rem'}}>
                Supprimer
            </button>
        </div>
    );
}

export default Group;
