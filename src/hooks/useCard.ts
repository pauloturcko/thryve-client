import { useToastContext } from "@/contexts/ToastContext";
import {
  createCardService,
  deleteCardService,
  loadCardsService,
  updateCardService,
} from "@/services/card-service";
import { getErrorMessage } from "@/utils/get-error-message";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const CARDS_QUERY_KEY = ["Settings-LoadAllCards"];

export function useCard() {
  const { dispatchToast } = useToastContext();
  const queryClient = useQueryClient();

  const createCard = useMutation({
    mutationFn: createCardService.createCard,
    onSuccess: () => {
      dispatchToast({
        type: "success",
        message: "Cartão Salvo",
      });
      queryClient.invalidateQueries({ queryKey: CARDS_QUERY_KEY });
    },
    onError: (error) => {
      dispatchToast({
        type: "error",
        message: getErrorMessage(error, "Erro ao cadastrar cartão"),
      });
    },
  });

  const deleteCard = useMutation({
    mutationFn: deleteCardService.deleteCard,
    onSuccess: () => {
      dispatchToast({
        type: "success",
        message: "Cartão excluído",
      });
      queryClient.invalidateQueries({ queryKey: CARDS_QUERY_KEY });
    },
    onError: (error) => {
      dispatchToast({
        type: "error",
        message: getErrorMessage(error, "Erro ao excluir cartão"),
      });
    },
  });

  const updateCard = useMutation({
    mutationFn: updateCardService.updateCard,
    onSuccess: () => {
      dispatchToast({
        type: "success",
        message: "Cartão atualizado",
      });
      queryClient.invalidateQueries({ queryKey: CARDS_QUERY_KEY });
    },
    onError: (error) => {
      dispatchToast({
        type: "error",
        message: getErrorMessage(error, "Erro ao atualizar cartão"),
      });
    },
  });

  const loadAllCards = useQuery({
    queryKey: CARDS_QUERY_KEY,
    queryFn: loadCardsService.loadAll,
  });

  return { createCard, deleteCard, updateCard, loadAllCards };
}
