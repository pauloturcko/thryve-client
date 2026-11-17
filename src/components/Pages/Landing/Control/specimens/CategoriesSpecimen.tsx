import { createElement } from "react";
import * as C from "@/components/Organisms/CategoryInfo/styles";
import * as P from "@/components/Pages/Configuracoes/Categorias/styles";
import { getCategoryIcon } from "@/constants/categoryIcons";
import { demoCategoryList } from "../../data";
import { PreviewActions } from "./PreviewActions";
import * as S from "./styles";

export const CategoriesSpecimen = () => (
  <S.List>
    <P.SectionTitle>
      Despesas <span>{demoCategoryList.total}</span>
    </P.SectionTitle>
    {demoCategoryList.expenses.slice(0, 3).map((category) => (
      <C.CategoryWrapper key={category.id}>
        <C.IconWrapper $color={category.color}>
          {createElement(getCategoryIcon(category.icon), { size: 22 })}
        </C.IconWrapper>
        <C.Name>{category.name}</C.Name>
        <PreviewActions />
      </C.CategoryWrapper>
    ))}
  </S.List>
);
