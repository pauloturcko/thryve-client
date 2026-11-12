import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    *, *::before, *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    html, body {
        width: 100%;
        max-width: 100%;
        overflow-x: hidden;
    }

    body {
        background: ${({ theme }) => theme.colors.background};
        color: ${({ theme }) => theme.colors.textPrimary};
        font-family: ${({ theme }) => theme.fonts.body};
        font-feature-settings: "ss01";
        line-height: 1.5;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        -webkit-tap-highlight-color: transparent;
    }

    h1, h2, h3, h4 {
        font-family: ${({ theme }) => theme.fonts.display};
        letter-spacing: -0.02em;
        text-wrap: balance;
    }

    ::selection {
        background: ${({ theme }) => theme.colors.primary};
        color: ${({ theme }) => theme.colors.onPrimary};
    }

    :focus-visible {
        outline: 2px solid ${({ theme }) => theme.colors.primaryText};
        outline-offset: 2px;
    }

    @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    }

    button {
        all: unset;
        cursor: pointer;
        box-sizing: border-box;
    }

    input, textarea, select {
        all: unset;
        box-sizing: border-box;
        -webkit-appearance: none;
        appearance: none;
    }

    /* O "all: unset" acima anula o display: none que o navegador dá ao hidden */
    [hidden] {
        display: none !important;
    }

    a {
        color: inherit;
        text-decoration: none;
    }

    ul, ol {
        list-style: none;
    }

    img, svg {
        display: block;
        max-width: 100%;
    }

    * {
        scrollbar-width: thin;
        scrollbar-color: ${({ theme }) => theme.colors.border} transparent;
    }

    *::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }

    *::-webkit-scrollbar-track {
        background: transparent;
    }

    *::-webkit-scrollbar-thumb {
        background-color: ${({ theme }) => theme.colors.border};
        border-radius: 999px;
    }

    *::-webkit-scrollbar-thumb:hover {
        background-color: ${({ theme }) => theme.colors.textMuted};
    }
`;
