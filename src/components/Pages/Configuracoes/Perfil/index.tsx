"use client";

import { Avatar } from "@/components/Atoms/Avatar";
import { SettingsPanel } from "@/components/Molecules/SettingsPanel";
import { Currency, CurrencyLabels } from "@/constants/enums/currency-enum";
import { Language, LanguageLabels } from "@/constants/enums/language-enum";
import {
  SystemTheme,
  SystemThemeLabels,
} from "@/constants/enums/system-theme-enum";
import { useUser } from "@/hooks/useUser";
import { formatMonthYear } from "@/utils/format";
import { CalendarDays, Mail } from "lucide-react";
import * as S from "./styles";

const notDefined = "Não definido";

export const PerfilPage = () => {
  const { user, systemPreferences, isLoading } = useUser();

  const preferences = [
    {
      label: "Tema",
      value: systemPreferences
        ? SystemThemeLabels[systemPreferences.theme as SystemTheme]
        : notDefined,
    },
    {
      label: "Idioma",
      value: systemPreferences
        ? LanguageLabels[systemPreferences.language as Language]
        : notDefined,
    },
    {
      label: "Moeda",
      value: systemPreferences
        ? CurrencyLabels[systemPreferences.currency as Currency]
        : notDefined,
    },
  ];

  return (
    <SettingsPanel
      title="Perfil"
      description="Suas informações de perfil"
    >
      {isLoading && <S.Loading>Carregando...</S.Loading>}
      {user && (
        <>
          <S.Identity>
            <Avatar
              name={user.name}
              src={user.profilePicture}
              size="5.5rem"
            />
            <S.Name>{user.name}</S.Name>
            <S.Meta>
              <span>
                <Mail size={16} />
                {user.email}
              </span>
              <span>
                <CalendarDays size={16} />
                Membro desde {formatMonthYear(user.createdAt)}
              </span>
            </S.Meta>
          </S.Identity>

          <S.Section>
            <S.SectionTitle>Preferências do sistema</S.SectionTitle>
            <S.InfoList>
              {preferences.map((preference) => (
                <S.InfoRow key={preference.label}>
                  <dt>{preference.label}</dt>
                  <dd>{preference.value}</dd>
                </S.InfoRow>
              ))}
            </S.InfoList>
          </S.Section>
        </>
      )}
    </SettingsPanel>
  );
};
