import { styled } from "styled-components";

export const AvatarWrapper = styled.div<{
  $src?: string | null;
  $size: string;
}>`
  flex-shrink: 0;
  width: ${({ $size }) => $size};
  height: ${({ $size }) => $size};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ $src, theme }) =>
    $src ? `url(${$src}) center / cover no-repeat` : theme.colors.primarySoft};
  color: ${({ theme }) => theme.colors.primaryText};
  font-size: calc(${({ $size }) => $size} * 0.36);
  font-weight: 700;
  user-select: none;
`;
