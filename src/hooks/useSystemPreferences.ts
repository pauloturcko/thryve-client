import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  SystemThemeByThemeMode,
  ThemeModeBySystemTheme,
} from "@/constants/enums/system-theme-enum";
import { useThemeMode } from "@/contexts/ThemeModeContext";
import { useToastContext } from "@/contexts/ToastContext";
import { USER_QUERY_KEY, useUser } from "@/hooks/useUser";
import { LoggedUserResponse } from "@/services/auth-service";
import {
  systemPreferencesService,
  UpdateSystemPreferencesParams,
} from "@/services/system-preferences-service";
import { ThemeMode } from "@/styles/theme";
import { getErrorMessage } from "@/utils/get-error-message";

export const useSystemPreferences = () => {
  const { dispatchToast } = useToastContext();
  const { setMode } = useThemeMode();
  const queryClient = useQueryClient();

  const updateSystemPreferences = useMutation({
    mutationFn: systemPreferencesService.update,
    onMutate: async (changes: UpdateSystemPreferencesParams) => {
      await queryClient.cancelQueries({ queryKey: USER_QUERY_KEY });

      const previousUserData =
        queryClient.getQueryData<LoggedUserResponse>(USER_QUERY_KEY);

      queryClient.setQueryData<LoggedUserResponse>(USER_QUERY_KEY, (data) =>
        data?.systemPreferences
          ? {
              ...data,
              systemPreferences: { ...data.systemPreferences, ...changes },
            }
          : data
      );

      return { previousUserData };
    },
    onSuccess: ({ systemPreferences }) => {
      queryClient.setQueryData<LoggedUserResponse>(USER_QUERY_KEY, (data) =>
        data ? { ...data, systemPreferences } : data
      );
    },
    onError: (error, _, context) => {
      queryClient.setQueryData(USER_QUERY_KEY, context?.previousUserData);
      dispatchToast({
        type: "error",
        message: getErrorMessage(error, "Erro ao salvar preferências"),
      });
    },
  });

  const changeThemeMode = (mode: ThemeMode) => {
    setMode(mode);
    updateSystemPreferences.mutate({ theme: SystemThemeByThemeMode[mode] });
  };

  return { updateSystemPreferences, changeThemeMode };
};

export const useSyncThemeWithPreferences = () => {
  const { systemPreferences } = useUser();
  const { setMode } = useThemeMode();
  const savedTheme = systemPreferences?.theme;

  useEffect(() => {
    if (savedTheme === undefined) return;
    setMode(ThemeModeBySystemTheme[savedTheme]);
  }, [savedTheme, setMode]);
};
