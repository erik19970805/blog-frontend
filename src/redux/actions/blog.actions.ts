import { Dispatch } from 'redux';
import { TypeActions } from '../../interfaces/actions.interface';
import { IBlogs } from '../../interfaces/blog.interface';
import { RootStore } from '../../interfaces/react.interface';
import { imageUpload } from '../../utils/imageUpload';
import { apiActions } from '../api';
import { ALERT } from '../constants/constants';
import {
  GET_BLOGS_BY_CATEGORY_ID,
  GET_HOME_BLOGS,
  IGetBlogsCategoryType,
  IGetHomeBlogsType,
} from '../types/blogType.types';

export const createBlog =
  (blog: IBlogs) =>
  async (dispatch: Dispatch<TypeActions>, getState: Function): Promise<void> => {
    const { auth }: RootStore = getState();
    dispatch({ type: ALERT, payload: { loading: true } });
    let url;
    if (typeof blog.thumbnail !== 'string') {
      const photo = await imageUpload(blog.thumbnail);
      url = photo.url;
    } else {
      url = blog.thumbnail;
    }
    const newBlog: IBlogs = { ...blog, thumbnail: url };
    const { data } = await apiActions(dispatch, 'POST', '/blog', newBlog, {
      Authorization: auth.accessToken,
    });
    if (data !== null) {
      dispatch({ type: ALERT, payload: { success: data.message } });
    }
  };

export const getBlogsHome =
  () =>
  async (dispatch: Dispatch<TypeActions | IGetHomeBlogsType>): Promise<void> => {
    dispatch({ type: ALERT, payload: { loading: true } });
    const { data } = await apiActions(dispatch, 'GET', '/blog/home');
    if (data !== null) {
      dispatch({ type: ALERT, payload: { success: data.message } });
      dispatch({ type: GET_HOME_BLOGS, payload: data });
    }
  };

export const getBlogsByCategoryId =
  (id: string, search: string) =>
  async (dispatch: Dispatch<TypeActions | IGetBlogsCategoryType>): Promise<void> => {
    const limit = 8;
    const value = search || `?page=${1}`;
    dispatch({ type: ALERT, payload: { loading: true } });
    const { data } = await apiActions(
      dispatch,
      'GET',
      `/blog/category/${id}${value}&limit=${limit}`
    );
    if (data !== null) {
      dispatch({ type: GET_BLOGS_BY_CATEGORY_ID, payload: { ...data, id, search } });
      dispatch({ type: ALERT, payload: { loading: false } });
    }
  };
