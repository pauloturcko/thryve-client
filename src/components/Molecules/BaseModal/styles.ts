import { styled } from "styled-components";
import { Panel } from "@/components/Atoms/Panel";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => `${theme.colors.background}99`};
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

export const ModalPanel = styled(Panel)`
  max-height: 90vh;
  overflow-y: auto;
`;
