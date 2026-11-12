import styled from "styled-components";

export const Loading = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const Identity = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0 0.25rem;
  text-align: center;
  min-width: 0;
`;

export const Name = styled.p`
  max-width: 100%;
  margin-top: 0.25rem;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  text-transform: capitalize;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Meta = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;

  span {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    overflow-wrap: anywhere;
  }

  svg {
    flex-shrink: 0;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  max-width: 20rem;
  margin: 0 auto;
`;

export const SectionTitle = styled.h4`
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const AvatarWrapper = styled.div<{ $busy: boolean }>`
  opacity: ${({ $busy }) => ($busy ? 0.5 : 1)};
  transition: opacity 0.2s ease;
`;

export const PictureActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

export const Hint = styled.p`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const PreferencesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
