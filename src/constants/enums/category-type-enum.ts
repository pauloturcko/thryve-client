export enum CategoryType {
  Receita = 0,
  Despesa = 1,
}

export const CategoryTypeLabels: Record<CategoryType, string> = {
  [CategoryType.Receita]: "Receita",
  [CategoryType.Despesa]: "Despesa",
};

export const CategoryTypeOptions = Object.entries(CategoryType)
  .filter(([key]) => isNaN(Number(key)))
  .map(([, value]) => ({
    value,
    label: CategoryTypeLabels[value as CategoryType],
  }));
