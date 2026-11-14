import { useToastContext } from "@/contexts/ToastContext";
import {
  createGoalService,
  deleteGoalService,
  loadGoalsService,
  updateGoalService,
} from "@/services/goal-service";
import { getErrorMessage } from "@/utils/get-error-message";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const GOALS_QUERY_KEY = ["Settings-LoadAllGoals"];

export function useGoal() {
  const { dispatchToast } = useToastContext();
  const queryClient = useQueryClient();

  const createGoal = useMutation({
    mutationFn: createGoalService.createGoal,
    onSuccess: () => {
      dispatchToast({
        type: "success",
        message: "Meta salva",
      });
      queryClient.invalidateQueries({ queryKey: GOALS_QUERY_KEY });
    },
    onError: (error) => {
      dispatchToast({
        type: "error",
        message: getErrorMessage(error, "Erro ao cadastrar meta"),
      });
    },
  });

  const deleteGoal = useMutation({
    mutationFn: deleteGoalService.deleteGoal,
    onSuccess: () => {
      dispatchToast({
        type: "success",
        message: "Meta excluída",
      });
      queryClient.invalidateQueries({ queryKey: GOALS_QUERY_KEY });
    },
    onError: (error) => {
      dispatchToast({
        type: "error",
        message: getErrorMessage(error, "Erro ao excluir meta"),
      });
    },
  });

  const updateGoal = useMutation({
    mutationFn: updateGoalService.updateGoal,
    onSuccess: () => {
      dispatchToast({
        type: "success",
        message: "Meta atualizada",
      });
      queryClient.invalidateQueries({ queryKey: GOALS_QUERY_KEY });
    },
    onError: (error) => {
      dispatchToast({
        type: "error",
        message: getErrorMessage(error, "Erro ao atualizar meta"),
      });
    },
  });

  const loadAllGoals = useQuery({
    queryKey: GOALS_QUERY_KEY,
    queryFn: loadGoalsService.loadAll,
  });

  return {
    createGoal,
    deleteGoal,
    updateGoal,
    loadAllGoals,
  };
}
