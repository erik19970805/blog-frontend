import {
  GET_BLOGS_BY_CATEGORY_ID,
  IBlogsCategory,
  IGetBlogsCategoryType,
} from '../types/blogType.types';

const blogsCategory = (
  state: IBlogsCategory[] = [],
  action: IGetBlogsCategoryType
): IBlogsCategory[] => {
  switch (action.type) {
    case GET_BLOGS_BY_CATEGORY_ID:
      return [...state, action.payload];
    default:
      return state;
  }
};

export default blogsCategory;
