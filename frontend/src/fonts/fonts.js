import { createGlobalStyle } from "styled-components";
import Roboto from './Roboto.ttf';
import Outfit from './Outfit.ttf';
import Cabin from './Cabin.ttf';

const GlobalFonts = createGlobalStyle`
  @font-face {
    font-family: 'Roboto';
    src: url(${Roboto});
  }
  @font-face {
    font-family: 'Outfit';
    src: url(${Outfit});
  }
  @font-face {
    font-family: 'Cabin';
    src: url(${Cabin});
  }
`;

export default GlobalFonts;
