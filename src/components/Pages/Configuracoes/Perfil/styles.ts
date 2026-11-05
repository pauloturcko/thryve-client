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
`;

export const SectionTitle = styled.h4`
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const InfoList = styled.dl`
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  overflow: hidden;
`;

export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 0.85rem 1rem;
  font-size: 0.95rem;

  & + & {
    border-top: 1px solid ${({ theme }) => theme.colors.border};
  }

  dt {
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  dd {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;
