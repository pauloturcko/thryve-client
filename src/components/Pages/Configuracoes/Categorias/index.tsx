"use client";

import { SpecularButton } from "@/components/Atoms/SpecularButton";
import { SettingsWrapper } from "@/components/Molecules/SettingsWrapper";
import { CategoryInfo } from "@/components/Organisms/CategoryInfo";
import { CategoryType } from "@/constants/enums/category-type-enum";
import { useModalContext } from "@/contexts/ModalContext";
import { useCategory } from "@/hooks/useCategory";
import { Plus } from "lucide-react";
import { NewCategory } from "./FormModal";
import * as S from "./styles";

const CategoryFormContent = ({ onClose }: { onClose: () => void }) => (
  <NewCategory onClose={onClose} />
);

const categorySections = [
  { type: CategoryType.Despesa, title: "Despesas" },
  { type: CategoryType.Receita, title: "Receitas" },
];

export const CategoriasPage = () => {
  const { openModal } = useModalContext();
  const { loadAllCategories } = useCategory();

  const handleOpenModal = () => {
    openModal({
      component: CategoryFormContent,
      title: "Nova Categoria",
    });
  };

  return (
    <SettingsWrapper
      title="Categorias"
      description="Configure suas categorias"
      button={
        <SpecularButton
          size="sm"
          onClick={handleOpenModal}
        >
          <Plus size={18} /> Nova Categoria
        </SpecularButton>
      }
    >
      {loadAllCategories.isLoading && <p>Carregando...</p>}
      {loadAllCategories.data?.length === 0 && (
        <p>Nenhuma categoria cadastrada.</p>
      )}
      {categorySections.map(({ type, title }) => {
        const categories = loadAllCategories.data?.filter(
          (category) => category.type === type
        );

        if (!categories?.length) return null;

        return (
          <S.Section key={type}>
            <S.SectionTitle>
              {title} <span>{categories.length}</span>
            </S.SectionTitle>
            <S.CategoriesGrid>
              {categories.map((category) => (
                <CategoryInfo
                  key={category.id}
                  category={category}
                />
              ))}
            </S.CategoriesGrid>
          </S.Section>
        );
      })}
    </SettingsWrapper>
  );
};
