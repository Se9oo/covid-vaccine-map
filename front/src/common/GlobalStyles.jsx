import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
  ${reset}
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  @font-face {
    font-family: 'NanumGothic';
    src: url('/src/public/font/NanumGothicLight.woff') format('woff');
    font-weight: 300;
    font-style: normal;
  }

  @font-face {
    font-family: 'NanumGothic';
    src: url('/src/public/font/NanumGothic.woff') format('woff');
    font-weight: 500;
    font-style: normal;
  }

  @font-face {
    font-family: 'NanumGothic';
    src: url('/src/public/font/NanumGothicBold.woff') format('woff');
    font-weight: bold;
    font-style: normal;
  }

  html {
    font-size: 10px;
  }

  body, input, a, ol, ul, li, button {
    font-family: 'NanumGothic', 'Sans-serif' !important;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ol, ul, li {
    list-style: none;
  }

  img {
    display: block;
  }

  input, button {
    background-color: transparent;
  }
`;

const size = {
  mobile: '479px',
  tablet: '767px',
  laptop: '980px',
  desktop: '1024px',
};

export const theme = {
  mobile: `(min-width: ${size.mobile})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  desktop: `(min-width: ${size.desktop})`,
};

export default GlobalStyles;
