"use client";

import { Plus } from "lucide-react";
import { SpecularButton } from "@/components/Atoms/SpecularButton";
import { SplitSettingsView } from "@/components/Molecules/SplitSettingsView";
import { CategoryInfo } from "@/components/Organisms/CategoryInfo";
import { CategoryType } from "@/constants/enums/category-type-enum";
import { useModalContext } from "@/contexts/ModalContext";
import { useCategory } from "@/hooks/useCategory";
import { useConfirm } from "@/hooks/useConfirm";
import { Category } from "@/services/category-service";
import { NewCategory } from "./FormModal";
import * as S from "./styles";

export const CategoriasPage = () => {
  const { openModal } = useModalContext();
  const { confirm } = useConfirm();
  const { loadAllCategories, deleteCategory } = useCategory();

  const handleCreate = () => {
    openModal({
      title: "Nova Categoria",
      render: (close) => <NewCategory onClose={close} />,
    });
  };

  const handleEdit = (category: Category) => {
    openModal({
      title: "Editar Categoria",
      render: (close) => (
        <NewCategory
          onClose={close}
          category={category}
        />
      ),
    });
  };

  const handleDelete = (category: Category) => {
    confirm({
      title: "Excluir categoria",
      message: `Tem certeza que deseja excluir a categoria "${category.name}"? Essa ação não pode ser desfeita.`,
      confirmLabel: "Excluir",
      danger: true,
      onConfirm: () => deleteCategory.mutate({ id: category.id }),
    });
  };

  const renderSection = (type: CategoryType, title: string) => {
    const categories = (loadAllCategories.data ?? []).filter(
      (category) => category.type === type
    );

    return (
      <>
        <S.SectionTitle>
          {title} <span>{categories.length}</span>
        </S.SectionTitle>
        {categories.length === 0 ? (
          <S.Message>Nenhuma categoria cadastrada.</S.Message>
        ) : (
          categories.map((category) => (
            <CategoryInfo
              key={category.id}
              category={category}
              onEdit={() => handleEdit(category)}
              onDelete={() => handleDelete(category)}
            />
          ))
        )}
      </>
    );
  };

  return (
    <SplitSettingsView
      title="Categorias"
      description="Configure suas categorias"
      message={loadAllCategories.isLoading ? "Carregando..." : undefined}
      action={
        <SpecularButton
          size="sm"
          onClick={handleCreate}
        >
          <Plus size={18} /> Nova Categoria
        </SpecularButton>
      }
      equalColumns
      listGap="0.75rem"
      list={renderSection(CategoryType.Despesa, "Despesas")}
      details={renderSection(CategoryType.Receita, "Receitas")}
    />
  );
};
