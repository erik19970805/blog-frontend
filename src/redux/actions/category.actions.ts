import { Dispatch } from 'redux';
import { TypeActions } from '../../interfaces/actions.interface';
import { RootStore } from '../../interfaces/react.interface';
import { apiActions } from '../api';
import { ALERT } from '../constants/constants';
import {
  CREATE_CATEGORY,
  DELETE_CATEGORY,
  GET_CATEGORIES,
  ICategoryType,
  IResCategory,
  UPDATE_CATEGORY,
} from '../types/category.types';

export const createCategory =
  (name: string) =>
  async (
    dispatch: Dispatch<TypeActions | ICategoryType>,
    getState: Function
  ): Promise<void | ICategoryType> => {
    const { auth } = <RootStore>getState();
    dispatch({ type: ALERT, payload: { loading: true } });
    const { data } = await apiActions(
      dispatch,
      'POST',
      '/category',
      { name },
      { Authorization: auth.accessToken }
    );
    if (data !== null) {
      dispatch({ type: ALERT, payload: { success: data.message } });
      dispatch({ type: CREATE_CATEGORY, payload: { ...data.category } });
    }
  };

export const getCategories =
  () =>
  async (dispatch: Dispatch<TypeActions | ICategoryType>): Promise<void | ICategoryType> => {
    dispatch({ type: ALERT, payload: { loading: true } });
    const { data } = await apiActions(dispatch, 'GET', '/category');
    if (data !== null) {
      dispatch({ type: ALERT, payload: { success: data.message } });
      dispatch({ type: GET_CATEGORIES, payload: data.categories });
    }
  };

export const updateCategory =
  (category: IResCategory) =>
  async (
    dispatch: Dispatch<TypeActions | ICategoryType>,
    getState: Function
  ): Promise<void | ICategoryType> => {
    const { auth } = <RootStore>getState();
    dispatch({ type: ALERT, payload: { loading: true } });
    const { data } = await apiActions(
      dispatch,
      'PUT',
      `/category/${category._id}`,
      {
        name: category.name,
      },
      { Authorization: auth.accessToken }
    );
    if (data !== null) {
      dispatch({ type: ALERT, payload: { success: data.message } });
      dispatch({ type: UPDATE_CATEGORY, payload: category });
    }
  };

export const deleteCategory =
  (id?: string) =>
  async (
    dispatch: Dispatch<TypeActions | ICategoryType>,
    getState: Function
  ): Promise<void | ICategoryType> => {
    const { auth } = <RootStore>getState();
    dispatch({ type: ALERT, payload: { loading: true } });
    const { data } = await apiActions(dispatch, 'DELETE', `/category/${id}`, undefined, {
      Authorization: auth.accessToken,
    });
    if (data !== null) {
      dispatch({ type: ALERT, payload: { success: data.message } });
      dispatch({ type: DELETE_CATEGORY, payload: id });
    }
  };
