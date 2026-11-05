import { css, styled } from "styled-components";

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.5rem;
`;

export const Label = styled.span`
  font-size: 0.925rem;
`;

export const RequiredMark = styled.span`
  color: ${({ theme }) => theme.colors.danger};
  margin-left: 2px;
`;

export const SwatchGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const swatchBase = css`
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 0.4rem;
  color: #ffffff;
  cursor: pointer;
  outline-offset: 2px;
  transition: transform 0.15s;

  &:hover {
    transform: scale(1.08);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
  }
`;

export const Swatch = styled.button<{ $color: string; $selected: boolean }>`
  ${swatchBase}
  background-color: ${({ $color }) => $color};
  outline: ${({ $selected, $color }) =>
    $selected ? `2px solid ${$color}` : "none"};
`;

export const CustomSwatch = styled.button<{ $selected: boolean }>`
  ${swatchBase}
  background: conic-gradient(
    #ef4444,
    #eab308,
    #22c55e,
    #0ea5e9,
    #8b5cf6,
    #ec4899,
    #ef4444
  );
  outline: ${({ $selected, theme }) =>
    $selected ? `2px solid ${theme.colors.textPrimary}` : "none"};

  svg {
    filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.6));
  }
`;

export const CustomInput = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  height: 2.6rem;
  padding: 4px;
  border: 1px solid
    ${({ $hasError, theme }) =>
      $hasError ? theme.colors.danger : theme.colors.border};
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.colors.background};
  cursor: pointer;

  &::-webkit-color-swatch-wrapper {
    padding: 0;
  }

  &::-webkit-color-swatch {
    border: none;
    border-radius: 0.35rem;
  }

  &::-moz-color-swatch {
    border: none;
    border-radius: 0.35rem;
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;
