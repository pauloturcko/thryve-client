import { useToastContext } from "@/contexts/ToastContext";
import {
  createCategoryService,
  deleteCategoryService,
  loadCategoriesService,
  updateCategoryService,
} from "@/services/category-service";
import { getErrorMessage } from "@/utils/get-error-message";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const CATEGORIES_QUERY_KEY = ["Settings-LoadAllCategories"];

export function useCategory() {
  const { dispatchToast } = useToastContext();
  const queryClient = useQueryClient();

  const createCategory = useMutation({
    mutationFn: createCategoryService.createCategory,
    onSuccess: () => {
      dispatchToast({
        type: "success",
        message: "Categoria salva",
      });
      queryClient.invalidateQueries({ queryKey: CATEGORIES_QUERY_KEY });
    },
    onError: (error) => {
      dispatchToast({
        type: "error",
        message: getErrorMessage(error, "Erro ao cadastrar categoria"),
      });
    },
  });

  const deleteCategory = useMutation({
    mutationFn: deleteCategoryService.deleteCategory,
    onSuccess: () => {
      dispatchToast({
        type: "success",
        message: "Categoria excluída",
      });
      queryClient.invalidateQueries({ queryKey: CATEGORIES_QUERY_KEY });
    },
    onError: (error) => {
      dispatchToast({
        type: "error",
        message: getErrorMessage(error, "Erro ao excluir categoria"),
      });
    },
  });

  const updateCategory = useMutation({
    mutationFn: updateCategoryService.updateCategory,
    onSuccess: () => {
      dispatchToast({
        type: "success",
        message: "Categoria atualizada",
      });
      queryClient.invalidateQueries({ queryKey: CATEGORIES_QUERY_KEY });
    },
    onError: (error) => {
      dispatchToast({
        type: "error",
        message: getErrorMessage(error, "Erro ao atualizar categoria"),
      });
    },
  });

  const loadAllCategories = useQuery({
    queryKey: CATEGORIES_QUERY_KEY,
    queryFn: loadCategoriesService.loadAll,
  });

  return { createCategory, deleteCategory, updateCategory, loadAllCategories };
}
