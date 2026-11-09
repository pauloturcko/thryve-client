import { styled, keyframes } from "styled-components";

type ToastType = "success" | "error" | "info" | "warning";

const slideIn = keyframes`
  from { opacity: 0; transform: translateX(-50%) translateY(-1rem); }
  to   { opacity: 1; transform: translateX(-50%) translateY(0); }
`;

const slideOut = keyframes`
  from { opacity: 1; transform: translateX(-50%) translateY(0); }
  to   { opacity: 0; transform: translateX(-50%) translateY(-1rem); }
`;

export const Wrapper = styled.div<{ $type: ToastType; $leaving: boolean }>`
  position: fixed;
  top: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  animation: ${({ $leaving }) => ($leaving ? slideOut : slideIn)} 0.3s ease
    forwards;

  display: flex;
  align-items: center;
  gap: 0.75rem;

  padding: 0.875rem 1.25rem;
  border-radius: 0.5rem;
  background: ${({ theme, $type }) =>
    $type === "success"
      ? theme.colors.success
      : $type === "error"
        ? theme.colors.danger
        : $type === "warning"
          ? theme.colors.warning
          : theme.colors.info};
  color: ${({ theme, $type }) =>
    $type === "error" ? theme.colors.onDanger : theme.colors.textPrimary};
  font-size: 0.95rem;
  font-weight: 600;
`;
