// Header.jsx

import React from 'react';
import './header.css';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header className="header">
            <h1 className="header-title">Gerenciador de Tarefas</h1>
            <div className="header-buttons">
                <Link to="/">Home</Link>
                <Link to="/concluidas">Concluídas</Link>
            </div>
        </header>
    );
}
