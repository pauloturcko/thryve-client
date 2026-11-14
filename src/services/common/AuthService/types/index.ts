import { Currency } from "@/constants/enums/currency-enum";
import { Language } from "@/constants/enums/language-enum";
import { SystemTheme } from "@/constants/enums/system-theme-enum";

export type CreateAccoutParams = {
  name: string;
  email: string;
  password: string;
};

export type LoginParams = {
  email: string;
  password: string;
};

export type UserData = {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  profilePicture?: string | null;
};

export type SystemPreferences = {
  theme: SystemTheme;
  language: Language;
  currency: Currency;
};

export type LoggedUserResponse = {
  user: UserData;
  systemPreferences: SystemPreferences | null;
};
