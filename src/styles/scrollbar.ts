import { css } from "styled-components";

export const thinScrollbar = css`
  /* O GlobalStyles define scrollbar-width/color em todos os elementos, e no
     Chrome isso desliga os pseudo-elementos abaixo; voltamos ao "auto" aqui. */
  @supports selector(::-webkit-scrollbar) {
    scrollbar-width: auto;
    scrollbar-color: auto;
  }

  &::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.border};
    border-radius: 999px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: ${({ theme }) => theme.colors.textMuted};
  }

  &::-webkit-scrollbar-corner {
    background: transparent;
  }

  @supports not selector(::-webkit-scrollbar) {
    scrollbar-width: thin;
    scrollbar-color: ${({ theme }) => theme.colors.border} transparent;
  }
`;
