import { Dispatch } from 'redux';
import { IAlert, TypeActions } from '../../interfaces/actions.interfaces';
import { IUserSignin, IUserSignup } from '../../interfaces/auth.interface';
import { RootStore } from '../../interfaces/react.interfaces';
import { IErrorsValid, validRegister } from '../../utils/valid';
import api from '../api';
import { ALERT, AUTH } from '../constants/constants';

export const signin =
  (userSignin: IUserSignin) =>
  async (dispatch: Dispatch<TypeActions>): Promise<void> => {
    // const { errorMessage, errorLength } = valid(userData);
    // if (errorLength > 0) return dispatch({ type: 'VALID', payload: errorMessage });

    dispatch({ type: ALERT, payload: { loading: true } });
    const { data } = await api(dispatch, 'POST', '/auth/signin', userSignin);

    if (data !== null) {
      dispatch({ type: AUTH, payload: data });
      localStorage.setItem('logged', 'true');
      dispatch({ type: ALERT, payload: { success: data.message } });
    }
  };

export const signup =
  (userSignup: IUserSignup) =>
  async (dispatch: Dispatch<TypeActions>): Promise<IAlert | undefined> => {
    const { errMsg, errLength }: IErrorsValid = validRegister(userSignup);
    if (errLength > 0) return dispatch({ type: ALERT, payload: { error: errMsg } });

    dispatch({ type: ALERT, payload: { loading: true } });
    const { data } = await api(dispatch, 'POST', '/auth/signup', userSignup);

    if (data !== null) {
      dispatch({ type: ALERT, payload: { success: data.message } });
    }
    return undefined;
  };

export const active =
  (activeToken: { activeToken: string }) =>
  async (dispatch: Dispatch<TypeActions>): Promise<void> => {
    const { data } = await api(dispatch, 'POST', '/auth/active', activeToken);
    if (data !== null) {
      dispatch({ type: ALERT, payload: { success: data.message } });
    }
  };

export const refreshToken =
  () =>
  async (dispatch: Dispatch<TypeActions>, getState: Function): Promise<void> => {
    const logged = localStorage.getItem('logged');
    if (logged !== 'true') return;
    const { auth } = <RootStore>getState();
    const { data } = await api(dispatch, 'GET', '/auth/refresh_token', {
      Authorization: auth.accessToken,
    });
    if (data !== null) {
      dispatch({ type: AUTH, payload: data });
    }
  };

export const signout =
  () =>
  async (dispatch: Dispatch<TypeActions>): Promise<void> => {
    localStorage.removeItem('logged');
    await api(dispatch, 'GET', '/auth/signout');
    window.location.href = '/';
  };
