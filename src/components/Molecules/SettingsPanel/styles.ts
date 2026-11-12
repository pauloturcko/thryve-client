import styled from "styled-components";
import { Panel } from "@/components/Atoms/Panel";

export const Stage = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 1rem 0;
`;

export const StagePanel = styled(Panel)<{ $wide?: boolean }>`
  max-width: ${({ $wide }) => ($wide ? "72rem" : "34rem")};
  background-color: ${({ theme }) => theme.colors.background};
  box-shadow: 0 24px 48px -32px
    rgba(${({ theme }) => theme.colors.shadowRgb}, 0.5);
`;
