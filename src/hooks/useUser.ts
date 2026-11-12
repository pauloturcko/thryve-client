import Cookies from "js-cookie";
import { useSyncExternalStore } from "react";
import { useQuery } from "@tanstack/react-query";
import { userService } from "@/services/auth-service";
import { AUTH_COOKIE } from "@/constants/storage-keys";
import { getProfilePictureUrl } from "@/utils/get-profile-picture-url";

export const USER_QUERY_KEY = ["user", "me"];

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
    queryKey: USER_QUERY_KEY,
    queryFn: userService.getLoggedUserData,
    enabled: !!token,
    retry: 1,
  });

  return {
    user: query.data?.user,
    profilePictureUrl: getProfilePictureUrl(query.data?.user.profilePicture),
    systemPreferences: query.data?.systemPreferences,
    isLoading: query.isLoading,
    isError: query.isError,
  };
};
