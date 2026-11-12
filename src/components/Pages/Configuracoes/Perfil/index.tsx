"use client";

import { ChangeEvent, useRef } from "react";
import { CalendarDays, Mail } from "lucide-react";
import { Avatar } from "@/components/Atoms/Avatar";
import { Button } from "@/components/Atoms/Button";
import { FormInput } from "@/components/Atoms/FormInput";
import { SettingsPanel } from "@/components/Molecules/SettingsPanel";
import { CurrencyLabels } from "@/constants/enums/currency-enum";
import { LanguageLabels } from "@/constants/enums/language-enum";
import { SystemThemeLabels } from "@/constants/enums/system-theme-enum";
import { useConfirm } from "@/hooks/useConfirm";
import {
  PROFILE_PICTURE_ACCEPTED_TYPES,
  useProfilePicture,
} from "@/hooks/useProfilePicture";
import { useSystemPreferences } from "@/hooks/useSystemPreferences";
import { useUser } from "@/hooks/useUser";
import { SystemPreferences } from "@/services/auth-service";
import { formatMonthYear } from "@/utils/format";
import * as S from "./styles";

const toOptions = (labels: Record<number, string>) =>
  Object.entries(labels).map(([value, label]) => ({ value, label }));

const preferenceFields: {
  field: keyof SystemPreferences;
  label: string;
  options: { value: string; label: string }[];
}[] = [
  { field: "theme", label: "Tema", options: toOptions(SystemThemeLabels) },
  { field: "language", label: "Idioma", options: toOptions(LanguageLabels) },
  { field: "currency", label: "Moeda", options: toOptions(CurrencyLabels) },
];

export const PerfilPage = () => {
  const { user, profilePictureUrl, systemPreferences, isLoading } = useUser();
  const { updateSystemPreferences } = useSystemPreferences();
  const { uploadProfilePicture, removeProfilePicture, sendProfilePicture } =
    useProfilePicture();
  const { confirm } = useConfirm();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isSavingPicture =
    uploadProfilePicture.isPending || removeProfilePicture.isPending;

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (file) sendProfilePicture(file);
  };

  const handleRemovePicture = () =>
    confirm({
      title: "Remover foto",
      message: "Deseja remover sua foto de perfil?",
      confirmLabel: "Remover",
      danger: true,
      onConfirm: () => removeProfilePicture.mutate(),
    });

  return (
    <SettingsPanel
      title="Perfil"
      description="Suas informações de perfil"
    >
      {isLoading && <S.Loading>Carregando...</S.Loading>}
      {user && (
        <>
          <S.Identity>
            <S.AvatarWrapper $busy={isSavingPicture}>
              <Avatar
                name={user.name}
                src={profilePictureUrl}
                size="5.5rem"
              />
            </S.AvatarWrapper>
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
            <S.PictureActions>
              <input
                ref={fileInputRef}
                type="file"
                accept={PROFILE_PICTURE_ACCEPTED_TYPES.join(",")}
                onChange={handleFileChange}
                hidden
              />
              <Button
                variant="cancel"
                disabled={isSavingPicture}
                onClick={() => fileInputRef.current?.click()}
              >
                {uploadProfilePicture.isPending
                  ? "Enviando..."
                  : profilePictureUrl
                    ? "Trocar foto"
                    : "Adicionar foto"}
              </Button>
              {profilePictureUrl && (
                <Button
                  variant="danger"
                  disabled={isSavingPicture}
                  onClick={handleRemovePicture}
                >
                  Remover foto
                </Button>
              )}
            </S.PictureActions>
            <S.Hint>JPG, PNG ou WebP de até 5MB</S.Hint>
          </S.Identity>

          {systemPreferences && (
            <S.Section>
              <S.SectionTitle>Preferências do sistema</S.SectionTitle>
              <S.PreferencesList>
                {preferenceFields.map(({ field, label, options }) => (
                  <FormInput.Select
                    key={field}
                    label={label}
                    options={options}
                    value={String(systemPreferences[field])}
                    onChange={(value) =>
                      updateSystemPreferences.mutate({ [field]: Number(value) })
                    }
                    compact
                  />
                ))}
              </S.PreferencesList>
            </S.Section>
          )}
        </>
      )}
    </SettingsPanel>
  );
};
