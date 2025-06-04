import React from "react";
import './card.css';

export default function Card({ id, title, description, funcDelete }) {
    return (
        <div className="card">
            <div className="card-content">
                <div>
                    <h2>{title}</h2>
                    <p>{description}</p>
                </div>
                <button className="delete-button" onClick={funcDelete()}>🗑️</button>
            </div>
        </div>
    );
}
