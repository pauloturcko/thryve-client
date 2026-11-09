import { styled } from "styled-components";

export const CategoryWrapper = styled.div`
  width: 100%;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.875rem 1rem;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.75rem;
`;

export const IconWrapper = styled.div<{ $color: string }>`
  flex-shrink: 0;
  width: 2.75rem;
  height: 2.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.6rem;
  color: ${({ $color }) => $color};
  background-color: ${({ $color }) => `${$color}26`};
`;

export const Name = styled.p`
  flex: 1;
  min-width: 0;
  font-size: 1rem;
  font-weight: 600;
  text-transform: capitalize;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
