import { http } from "@/http/http";
import { SystemPreferences } from "@/services/auth-service";

export type UpdateSystemPreferencesParams = Partial<SystemPreferences>;

type UpdateSystemPreferencesResponse = {
  systemPreferences: SystemPreferences;
};

export const systemPreferencesService = {
  update: async (params: UpdateSystemPreferencesParams) => {
    const response = await http.patch<UpdateSystemPreferencesResponse>(
      "/system-preferences/update",
      params
    );
    return response.data;
  },
};
