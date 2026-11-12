"use client";

import Link from "next/link";
import { styled } from "styled-components";
import { HugeiconsIcon } from "@hugeicons/react";
import { Moon02Icon, Sun03Icon } from "@hugeicons/core-free-icons";
import { Logo } from "@/components/Atoms/Logo";
import { Avatar } from "@/components/Atoms/Avatar";
import { useThemeMode } from "@/contexts/ThemeModeContext";
import { useSystemPreferences } from "@/hooks/useSystemPreferences";
import { useUser } from "@/hooks/useUser";

const greeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Bom dia";
  if (hour < 18) return "Boa tarde";
  return "Boa noite";
};

export const TopBar = () => {
  const { user, profilePictureUrl } = useUser();
  const { mode } = useThemeMode();
  const { changeThemeMode } = useSystemPreferences();
  const firstName = user?.name?.split(" ")[0];
  const nextMode = mode === "dark" ? "light" : "dark";
  const themeLabel =
    nextMode === "light" ? "Ativar tema claro" : "Ativar tema escuro";

  return (
    <Bar>
      <Link
        href="/dashboard"
        aria-label="Ir para o dashboard"
      >
        <Logo height={34} />
      </Link>
      {user && (
        <Actions>
          <ThemeButton
            type="button"
            onClick={() => changeThemeMode(nextMode)}
            aria-label={themeLabel}
            title={themeLabel}
          >
            <HugeiconsIcon
              icon={mode === "dark" ? Sun03Icon : Moon02Icon}
              size={18}
              strokeWidth={1.7}
            />
          </ThemeButton>
          <UserChip href="/configuracoes/perfil">
            <Hello>
              <span>{greeting()},</span>
              <strong>{firstName}</strong>
            </Hello>
            <Avatar
              name={user.name}
              src={profilePictureUrl}
              size="2.5rem"
            />
          </UserChip>
        </Actions>
      )}
    </Bar>
  );
};

const Bar = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
  margin-bottom: 1.75rem;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ThemeButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.125rem;
  height: 2.125rem;
  border-radius: 0.65rem;
  border: 1px solid transparent;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.textSecondary};
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.surface};
    border-color: ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primaryText};
    outline-offset: 2px;
  }
`;

const UserChip = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.25rem 0.25rem 0.25rem 1rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.surface};
  }
`;

const Hello = styled.span`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  line-height: 1.15;

  span {
    font-size: 0.75rem;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  strong {
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: 0.95rem;
    font-weight: 600;
  }

  @media (max-width: 480px) {
    display: none;
  }
`;
