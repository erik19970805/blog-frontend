import { Dispatch } from 'redux';
import { TypeActions } from '../../interfaces/actions.interface';
import { IBlogs } from '../../interfaces/blog.interface';
import { imageUpload } from '../../utils/imageUpload';
import { ALERT } from '../constants/constants';

export const createBlog =
  (blog: IBlogs) => async (dispatch: Dispatch<TypeActions>, getState: Function) => {
    dispatch({ type: ALERT, payload: { loading: true } });
    let url;
    if (typeof blog.thumbnail !== 'string') {
      const photo = await imageUpload(blog.thumbnail);
      url = photo.url;
    } else {
      url = blog.thumbnail;
    }
    const newBlog: IBlogs = { ...blog, thumbnail: url };
  };
