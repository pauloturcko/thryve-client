import { http } from "@/http/http";
import {
  UpdateSystemPreferencesParams,
  UpdateSystemPreferencesResponse,
} from "./types";

export const systemPreferencesService = {
  update: async (params: UpdateSystemPreferencesParams) => {
    const response = await http.patch<UpdateSystemPreferencesResponse>(
      "/system-preferences/update",
      params
    );
    return response.data;
  },
};
