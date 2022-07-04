import GlobalStyles from './GlobalStyles';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { CoolHeader } from './components/coolHeader/CoolHeader';
import { HelloWorld } from './components/helloWorld/HelloWorld';
import { ThemeProvider } from 'styled-components';

const niceTheme = {
    colors: {
        header: "#507a89",
        body: "#fff",
        footer: "#003333",
    },
};
ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ThemeProvider theme={niceTheme}>
            <>
                <GlobalStyles />
                <CoolHeader />
                <HelloWorld />
            </>
        </ThemeProvider>
    </React.StrictMode>
);
