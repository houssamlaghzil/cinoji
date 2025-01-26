// src/components/Modal.js
import React from 'react';
import './Modal.css'; // Import du fichier CSS spécifique à la modal

function Modal({ isOpen, onClose, groups, onAssign }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>
                    &times;
                </button>
                <h3>Attribuer un point</h3>
                <p>Choisissez à quel groupe attribuer le point :</p>
                <div className="modal-buttons">
                    {groups.map((group, index) => (
                        <button
                            key={index}
                            onClick={() => onAssign(index)}
                            className="modal-button"
                        >
                            {group.name}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Modal;
