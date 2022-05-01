import { createGlobalStyle } from "styled-components";

export const breakpoints = { tablet: "769px" };

export default createGlobalStyle`
    :root {
      --primary-color: #FF3C00;
      height: 100%;
    }

    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed,
    figure, figcaption, footer, header, hgroup,
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        vertical-align: baseline;
        box-sizing: border-box;
        font-family: 'Open Sans', sans-serif;
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure,
    footer, header, hgroup, menu, nav, section {
        display: block;
    }
    body {
      background-position: center;
      background-repeat: no-repeat;
      background-attachment: fixed;
      background-size: cover;
      background-image: 
       linear-gradient(
          180deg,
          hsl(14deg 100% 50%) 0%,
          hsl(13deg 100% 56%) 11%,
          hsl(13deg 100% 59%) 22%,
          hsl(14deg 100% 63%) 34%,
          hsl(14deg 100% 66%) 45%,
          hsl(14deg 100% 69%) 56%,
          hsl(14deg 100% 72%) 67%,
          hsl(14deg 100% 76%) 78%,
          hsl(14deg 100% 79%) 89%,
          hsl(14deg 100% 82%) 100%
  );
    }
    ol, ul {
        list-style: none;
    }
    blockquote, q {
        quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }
    h1, h2, h3 {
      color: #043132;
      font-family: var(--heading-font-family);
      font-size: 25px;
    }
    h2 {
      font-size: 28px;
    }
   
`;
