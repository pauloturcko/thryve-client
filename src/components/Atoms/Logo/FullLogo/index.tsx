import styled from "styled-components";
import { LogoMark } from "../LogoMark";

interface FullLogoProps {
  fontSize?: number | string;
  imgSize?: number;
}

export const FullLogo = ({ fontSize, imgSize }: FullLogoProps) => {
  return (
    <Wrapper $fontSize={fontSize}>
      <LogoMark size={imgSize ?? 100} />

      <Name>Whai</Name>
      <Accent as="span">Data</Accent>
    </Wrapper>
  );
};

const Wrapper = styled.div<{ $fontSize?: number | string }>`
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: ${({ $fontSize }) => {
    if (!$fontSize) return "1rem";

    if (typeof $fontSize === "number") {
      return `${$fontSize}px`;
    }

    return $fontSize;
  }};
`;


const Name = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 2em;
  font-weight: 700;
  letter-spacing: -0.02em;
`;

const Accent = styled(Name)`
  background: ${({ theme }) => theme.colors.gradientPrimary};
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;
