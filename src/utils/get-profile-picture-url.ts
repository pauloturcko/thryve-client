import { API_URL } from "@/http/http";

// A API devolve o caminho relativo a ela (ex.: /profile-picture/<uuid>)
export const getProfilePictureUrl = (profilePicture?: string | null) =>
  profilePicture ? new URL(profilePicture, API_URL).toString() : null;
