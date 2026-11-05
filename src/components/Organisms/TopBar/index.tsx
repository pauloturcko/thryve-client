"use client";

import Link from "next/link";
import { styled } from "styled-components";
import { Logo } from "@/components/Atoms/Logo";
import { Avatar } from "@/components/Atoms/Avatar";
import { useUser } from "@/hooks/useUser";

const greeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Bom dia";
  if (hour < 18) return "Boa tarde";
  return "Boa noite";
};

export const TopBar = () => {
  const { user } = useUser();
  const firstName = user?.name?.split(" ")[0];

  return (
    <Bar>
      <Link
        href="/dashboard"
        aria-label="Ir para o dashboard"
      >
        <Logo height={34} />
      </Link>
      {user && (
        <UserChip href="/configuracoes/perfil">
          <Hello>
            <span>{greeting()},</span>
            <strong>{firstName}</strong>
          </Hello>
          <Avatar
            name={user.name}
            src={user.profilePicture}
            size="2.5rem"
          />
        </UserChip>
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
