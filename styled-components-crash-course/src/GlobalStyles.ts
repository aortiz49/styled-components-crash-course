import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;700');

    * {
    box-sizing: border-box;
    };

    body{
        background:#0b0b0b;
        color:hsl(192,100%,9%);
        font-family:'Crimson+Pro',sans-serif;
        font-size:1.15em;
        margin:0;
    };

    p{
        opacity:0.6;
        line-height:1.5;
    };
    img{
        max-width:100%
        };
`;

export default GlobalStyles;
