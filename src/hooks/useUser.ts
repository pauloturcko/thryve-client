import Cookies from "js-cookie";
import { useSyncExternalStore } from "react";
import { useQuery } from "@tanstack/react-query";
import { userService } from "@/services/auth-service";
import { AUTH_COOKIE } from "@/constants/storage-keys";

const subscribeToNothing = () => () => undefined;
const readToken = () => Cookies.get(AUTH_COOKIE);
const readNoToken = () => undefined;

export const useUser = () => {
  const token = useSyncExternalStore(
    subscribeToNothing,
    readToken,
    readNoToken
  );

  const query = useQuery({
    queryKey: ["user", "me"],
    queryFn: userService.getLoggedUserData,
    enabled: !!token,
    retry: 1,
  });

  return {
    user: query.data?.user,
    systemPreferences: query.data?.systemPreferences,
    isLoading: query.isLoading,
    isError: query.isError,
  };
};
