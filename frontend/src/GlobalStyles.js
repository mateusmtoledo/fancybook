import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  :root {
    font-size: 16px;
  }

  *, *::after, *::before {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  body {
    background-color: #3E3939;
    color: #FFFFFF;
  }
`;

export default GlobalStyles;
