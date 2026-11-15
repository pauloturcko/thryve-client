import { css, keyframes, styled } from "styled-components";

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const Layout = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: minmax(20rem, 26rem) minmax(0, 1fr);
  gap: 1.25rem;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`;

// Altura fixa da prévia: o histórico ocupa o que sobrar até o fim do painel de configuração.
const PREVIEW_HEIGHT = "min(70vh, 48rem)";

// A coluna da direita não define a altura da linha: quem define é o painel de configuração. O conteúdo
// fica absoluto aqui dentro, então um histórico longo rola no próprio card em vez de esticar a página.
// O min-height garante prévia + um pedaço do histórico quando o painel for mais baixo que isso.
export const Side = styled.div`
  position: relative;
  min-width: 0;
  min-height: calc(${PREVIEW_HEIGHT} + 3.5rem + 18rem);

  @media (max-width: 1100px) {
    min-height: 0;
  }
`;

export const SideContent = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  @media (max-width: 1100px) {
    position: static;
  }
`;

export const Card = styled.section`
  width: 100%;
  min-width: 0;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
`;

export const Builder = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.5rem;
`;

export const Group = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const GroupTitle = styled.h2`
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const Hint = styled.p<{ $tone?: "danger" }>`
  font-size: 0.8rem;
  line-height: 1.5;
  color: ${({ $tone, theme }) =>
    $tone === "danger" ? theme.colors.danger : theme.colors.textSecondary};
`;

export const DateRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
`;

export const SectionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const SectionOption = styled.button<{ $checked: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.75rem 0.875rem;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid
    ${({ $checked, theme }) =>
      $checked ? theme.colors.textMuted : theme.colors.border};
  background-color: ${({ $checked, theme }) =>
    $checked ? theme.colors.surfaceElevated : "transparent"};
  text-align: left;
  cursor: pointer;
  transition:
    border-color 0.16s ease,
    background-color 0.16s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.textMuted};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primaryText};
    outline-offset: 2px;
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
    min-width: 0;
  }

  strong {
    font-size: 0.9rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  span {
    font-size: 0.78rem;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const Check = styled.span<{ $checked: boolean }>`
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 0.35rem;
  border: 1px solid
    ${({ $checked, theme }) =>
      $checked ? theme.colors.primary : theme.colors.border};
  background-color: ${({ $checked, theme }) =>
    $checked ? theme.colors.primary : "transparent"};
  color: ${({ theme }) => theme.colors.onPrimary};
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Preview = styled(Card)`
  flex: none;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const PreviewHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.875rem 1.25rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  h2 {
    font-size: 1rem;
    font-weight: 600;
  }
`;

export const PreviewStatus = styled.span<{ $tone?: "danger" }>`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8rem;
  color: ${({ $tone, theme }) =>
    $tone === "danger" ? theme.colors.danger : theme.colors.textMuted};
`;

export const Spinner = styled.span`
  width: 0.85rem;
  height: 0.85rem;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-top-color: ${({ theme }) => theme.colors.textPrimary};
  animation: ${spin} 0.8s linear infinite;
`;

export const PreviewBody = styled.div`
  position: relative;
  height: ${PREVIEW_HEIGHT};
  background-color: ${({ theme }) => theme.colors.surfaceElevated};

  @media (max-width: 1100px) {
    height: 70vh;
  }
`;

export const Frame = styled.iframe<{ $dimmed: boolean }>`
  width: 100%;
  height: 100%;
  border: none;
  transition: opacity 0.2s ease;

  ${({ $dimmed }) =>
    $dimmed &&
    css`
      opacity: 0.55;
    `}
`;

export const PreviewEmpty = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 2rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.textMuted};

  p {
    max-width: 22rem;
    font-size: 0.9rem;
  }
`;

export const History = styled(Card)`
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const HistoryHeader = styled.header`
  flex: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.25rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  h2 {
    font-size: 1rem;
    font-weight: 600;
  }

  span {
    font-size: 0.8rem;
    padding: 0.1rem 0.5rem;
    border-radius: 999px;
    background-color: ${({ theme }) => theme.colors.surfaceElevated};
  }
`;

export const HistoryBody = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 0.75rem;

  @media (max-width: 1100px) {
    max-height: 28rem;
  }
`;

export const HistoryList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  list-style: none;
`;

export const HistoryItem = styled.li`
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 0.875rem;
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.75rem;
`;

export const FileIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.625rem;
  background-color: ${({ theme }) => theme.colors.surfaceElevated};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const HistoryInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  min-width: 0;

  strong {
    font-size: 0.95rem;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  span {
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const HistoryActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

export const IconButton = styled.button<{ $danger?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: ${({ theme }) => theme.radii.sm};
  color: ${({ $danger, theme }) =>
    $danger ? theme.colors.danger : theme.colors.textSecondary};
  cursor: pointer;
  transition: background-color 0.16s ease;

  &:hover {
    background-color: ${({ $danger, theme }) =>
      $danger ? `${theme.colors.danger}1a` : theme.colors.surfaceElevated};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primaryText};
    outline-offset: 2px;
  }
`;

export const EmptyState = styled.div`
  width: 100%;
  height: 100%;
  min-height: 8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1.5rem 1rem;
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: center;

  p {
    max-width: 26rem;
    font-size: 0.9rem;
  }
`;
