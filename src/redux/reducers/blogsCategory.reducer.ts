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
      if (state.every((item) => item.id !== action.payload.id)) {
        return [...state, action.payload];
      }
      return state.map((blog) => (blog.id === action.payload.id ? action.payload : blog));
    default:
      return state;
  }
};

export default blogsCategory;
