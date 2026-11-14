export type CreateCategoryParams = {
  name: string;
  icon: string;
  color: string;
  type: number;
};

export type Category = {
  id: number;
  userId: number;
  name: string;
  icon: string;
  color: string;
  type: number;
};

export type LoadAllCategoriesResponse = {
  categories: Category[];
};

export type UpdateCategoryParams = Partial<CreateCategoryParams> & {
  id: number;
};
