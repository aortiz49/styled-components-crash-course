import content from './content';
import GlobalStyle from './components/GlobalStyle.styled';
import React from 'react';
import { Card } from './components/Card/Card';
import { Container } from './components/StyledContainer/Container.styled';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { ThemeProvider } from 'styled-components';

const theme = {
    colors: {
        header: "#ebfbff",
        body: "#fff",
        footer: "#003333",
    },
    mobile: "768px",
};

export const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <>
                <GlobalStyle />
                <Header />
                <Container>
                    {content.map((item) => (
                        <Card key={item.id} item={item} />
                    ))}
                </Container>
                <Footer />
            </>
        </ThemeProvider>
    );
};
