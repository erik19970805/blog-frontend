export const CREATE_CATEGORY = 'CREATE_CATEGORY';
export const GET_CATEGORIES = 'GET_CATEGORIES';

export interface IResCategory {
  _id?: string;
  name?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ICreateCategory {
  type: typeof CREATE_CATEGORY;
  payload: IResCategory;
}
export interface IGetCategories {
  type: typeof GET_CATEGORIES;
  payload: IResCategory[];
}

export type ICategoryType = ICreateCategory | IGetCategories;
