import { SystemPreferences } from "@/services/common/AuthService/types";

export type UpdateSystemPreferencesParams = Partial<SystemPreferences>;

export type UpdateSystemPreferencesResponse = {
  systemPreferences: SystemPreferences;
};
