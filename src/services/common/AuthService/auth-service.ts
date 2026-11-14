import { http } from "@/http/http";
import { CreateAccoutParams, LoginParams, LoggedUserResponse } from "./types";

export const authService = {
  createAccount: ({ name, email, password }: CreateAccoutParams) =>
    http.post("/users/register", { name, email, password }),
};

export const loginService = {
  login: ({ email, password }: LoginParams) =>
    http.post("/users/login", { email, password }),
};

export const userService = {
  getLoggedUserData: async () => {
    const response = await http.get<LoggedUserResponse>("/users/me");
    return response.data;
  },
};
