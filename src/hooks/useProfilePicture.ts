import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToastContext } from "@/contexts/ToastContext";
import { USER_QUERY_KEY } from "@/hooks/useUser";
import { LoggedUserResponse } from "@/services/auth-service";
import { profilePictureService } from "@/services/profile-picture-service";
import { getErrorMessage } from "@/utils/get-error-message";

export const PROFILE_PICTURE_ACCEPTED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

const PROFILE_PICTURE_MAX_SIZE = 5 * 1024 * 1024;

export const useProfilePicture = () => {
  const { dispatchToast } = useToastContext();
  const queryClient = useQueryClient();

  const setProfilePicture = (profilePicture: string | null) =>
    queryClient.setQueryData<LoggedUserResponse>(USER_QUERY_KEY, (data) =>
      data ? { ...data, user: { ...data.user, profilePicture } } : data
    );

  const uploadProfilePicture = useMutation({
    mutationFn: profilePictureService.upload,
    onSuccess: ({ profilePicture }) => {
      setProfilePicture(profilePicture);
      dispatchToast({ type: "success", message: "Foto de perfil atualizada" });
    },
    onError: (error) => {
      dispatchToast({
        type: "error",
        message: getErrorMessage(error, "Erro ao enviar foto de perfil"),
      });
    },
  });

  const removeProfilePicture = useMutation({
    mutationFn: profilePictureService.remove,
    onSuccess: () => {
      setProfilePicture(null);
      dispatchToast({ type: "success", message: "Foto de perfil removida" });
    },
    onError: (error) => {
      dispatchToast({
        type: "error",
        message: getErrorMessage(error, "Erro ao remover foto de perfil"),
      });
    },
  });

  // Valida antes de enviar para não gastar upload com algo que a API recusa
  const sendProfilePicture = (file: File) => {
    if (!PROFILE_PICTURE_ACCEPTED_TYPES.includes(file.type)) {
      dispatchToast({
        type: "warning",
        message: "Envie uma imagem JPG, PNG ou WebP",
      });
      return;
    }

    if (file.size > PROFILE_PICTURE_MAX_SIZE) {
      dispatchToast({
        type: "warning",
        message: "A imagem precisa ter no máximo 5MB",
      });
      return;
    }

    uploadProfilePicture.mutate(file);
  };

  return { uploadProfilePicture, removeProfilePicture, sendProfilePicture };
};
