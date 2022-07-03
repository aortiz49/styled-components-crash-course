import React from 'react';
import ReactDOM from 'react-dom/client';
import { CoolHeader } from './components/coolHeader/CoolHeader';
import { HelloWorld } from './components/helloWorld/HelloWorld';

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <CoolHeader />
        <HelloWorld />
    </React.StrictMode>
);
