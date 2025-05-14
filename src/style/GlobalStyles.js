import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

  :root {
    --font-main: 'Belgrano', serif;
    --font-display: 'TAN-Rosebud', serif;
    --font-alt: 'Lexend', sans-serif;
    --color-bg: #FAFBF4;
    --color-text:rgb(0, 0, 0);
    --color-accent: #FF7300;
    --link-color: #584793;
    --link-hover-color: #FFBF00;
  }

  /* Global Reset & Base Styles */
  *, *::before, *::after {
    box-sizing: border-box;
  }

  * {
    margin: 0;
  }

    html {
    scroll-behavior: smooth;
  }

  html, body {
    height: 100%; /*Vet ej om jag behöver denna men ev vid sticky footer etc*/
    font-family: var(--font-main);
    background-color: var(--color-bg);
    color: var(--color-text);
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    overflow-x: clip;
  }

  #root {
    isolation: isolate;
  }

  img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
  }

  input, button, textarea, select {
    font: inherit;
  }


  p, h1, h2, h3, h4, h5, h6 {
    overflow-wrap: break-word;
  }

  p {
    text-wrap: pretty;
  }

  h1, h2, h3, h4, h5, h6 {
    text-wrap: balance;
  }

  a, button {
    cursor: pointer;
  }

  a {
  color: var(--link-color);
}

  a:hover {
  font-weight: 600;
}

  a:visited {
  color: var(--link-color);
}

`;

export default GlobalStyle;
