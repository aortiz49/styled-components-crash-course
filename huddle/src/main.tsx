import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { Container } from './components/StyledContainer/Container.styled';
import { Header } from './components/Header/Header';
import { StyledHeader } from './components/Header/Header.styled';

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
