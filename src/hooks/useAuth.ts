import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService, loginService } from "@/services/auth-service";
import { useToastContext } from "@/contexts/ToastContext";
import { isAxiosError } from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { AUTH_COOKIE } from "@/constants/storage-keys";

export function useAuth() {
  const { dispatchToast } = useToastContext();
  const router = useRouter();
  const queryClient = useQueryClient();

  const login = useMutation({
    mutationFn: loginService.login,
    onError: (error) => {
      let errorMsg = "Erro ao fazer login";

      if (isAxiosError(error) && error.response?.data) {
        errorMsg =
          error.response.data.message ||
          error.response.data.error ||
          error.message;
      }

      dispatchToast({
        type: "error",
        message:
          errorMsg === "Unauthorized" ? "Email ou senha incorretos" : errorMsg,
      });
    },
  });

  const createAccount = useMutation({
    mutationFn: authService.createAccount,
    onSuccess: () => {
      dispatchToast({
        type: "success",
        message: "Conta criada com sucesso!",
      });
    },
    onError: (error) => {
      let errorMsg = "Erro ao criar sua conta";

      if (isAxiosError(error) && error.response?.data) {
        errorMsg =
          error.response.data.message ||
          error.response.data.error ||
          error.message;
      }

      dispatchToast({
        type: "error",
        message: errorMsg,
      });
    },
  });

  const logout = () => {
    Cookies.remove(AUTH_COOKIE);
    queryClient.clear();
    router.push("/login");
  };

  return { createAccount, login, logout };
}
