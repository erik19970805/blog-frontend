import { IBlogs } from '../../interfaces/blog.interface';

export const GET_HOME_BLOGS = 'GET_HOME_BLOGS';
export const GET_BLOGS_BY_CATEGORY_ID = 'GET_BLOGS_BY_CATEGORY_ID';

export interface IHomeBlogs {
  _id: string;
  name: string;
  count: number;
  blogs: IBlogs[];
}

export interface IGetHomeBlogsType {
  type: typeof GET_HOME_BLOGS;
  payload: IHomeBlogs[];
}

export interface IBlogsCategory {
  id: string;
  blogs: IBlogs[];
  total: number;
  search: string;
}

export interface IGetBlogsCategoryType {
  type: typeof GET_BLOGS_BY_CATEGORY_ID;
  payload: IBlogsCategory;
}
