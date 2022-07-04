import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@100;400&display=swap');
  * {
    box-sizing: border-box;
  }
  
  body {
    background:#fff;
    color:hsl(192,100%,9%);
    font-family: 'Raleway', sans-serif;  
    font-size: 1.15em;
    margin:0
  }

    `;

export default GlobalStyle;
