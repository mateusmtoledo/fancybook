import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  :root {
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    --color-brown-light: #3E3939;
    --color-brown: #353030;
    --color-brown-dark: #2C2727;
    --color-orange: #FF7517;
    --color-white: #FFFFFF;
    --color-gray-dark: #555555;
    --color-gray: #7B7B7B;
    --color-gray-light: #BBBBBB;
    --color-gray-lighter: #D3D3D3;
    --shadow-card: 0px 3px 7px -3px rgba(0, 0, 0, 0.3),
      0px 6px 12px -2px rgba(50, 50, 50, 0.25);
  }

  *, *::after, *::before {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  body {
    background-color: var(--color-brown-light);
    color: var(--color-white);
    overflow: visible;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  .mobile {
    display: none;
  }

  ul {
    list-style-type: none;
  }

  button {
    border: none;
    background: none;
    color: inherit;
    cursor: pointer;
    font-family: 'Roboto', sans-serif;
  }

  img {
    display: block;
  }

  .react-loading-skeleton {
    z-index: 0;
  }

  @media (max-width: 650px) {
    .desktop {
        display: none;
    }
    .mobile {
      display: block;
    }
  }
`;

export default GlobalStyles;
