import { enumToOptions } from "@/utils/enum-options";

export enum CategoryType {
  Receita = 0,
  Despesa = 1,
}

export const CategoryTypeLabels: Record<CategoryType, string> = {
  [CategoryType.Receita]: "Receita",
  [CategoryType.Despesa]: "Despesa",
};

export const CategoryTypeOptions = enumToOptions(
  CategoryType,
  CategoryTypeLabels
);
