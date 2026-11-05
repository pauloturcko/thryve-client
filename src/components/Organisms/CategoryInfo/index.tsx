import { createElement } from "react";
import { ItemActions } from "@/components/Atoms/ItemActions";
import { getCategoryIcon } from "@/constants/categoryIcons";
import { Category } from "@/services/category-service";
import * as S from "./styles";

type CategoryInfoProps = {
  category: Category;
  onEdit: () => void;
  onDelete: () => void;
};

export const CategoryInfo = ({
  category,
  onEdit,
  onDelete,
}: CategoryInfoProps) => (
  <S.CategoryWrapper>
    <S.IconWrapper $color={category.color}>
      {createElement(getCategoryIcon(category.icon), { size: 22 })}
    </S.IconWrapper>
    <S.Name>{category.name}</S.Name>
    <ItemActions
      itemName={category.name}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  </S.CategoryWrapper>
);
