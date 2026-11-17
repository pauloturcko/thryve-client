import { styled } from "styled-components";
import { staticPreview } from "../../styles";

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  width: 100%;
`;

export const Wallet = styled.div`
  ${staticPreview};
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  > div {
    max-width: none;
    min-height: 0;
    gap: 1.25rem;
  }
`;
