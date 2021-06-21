import { Dispatch } from 'redux';
import { IAlert, TypeActions } from '../../interfaces/actions.interfaces';
import { IUserSignin, IUserSignup } from '../../interfaces/auth.interface';
import { IResSignin } from '../../interfaces/response.interface';
import { IErrorsValid, validRegister } from '../../utils/valid';
import api from '../api';
import { ALERT } from '../constants/constants';

export const signin =
  (userSignin: IUserSignin) =>
  async (dispatch: Dispatch<TypeActions>): Promise<void> => {
    // const { errorMessage, errorLength } = valid(userData);
    // if (errorLength > 0) return dispatch({ type: 'VALID', payload: errorMessage });

    dispatch({ type: 'ALERT', payload: { loading: true } });
    const { data } = await api(dispatch, 'POST', '/auth/signin', userSignin);

    if (data !== null) {
      const { accessToken, user, message }: IResSignin = data;
      dispatch({ type: 'AUTH', payload: { accessToken, user } });
      // localStorage.setItem('firstLogin', 'true');
      dispatch({ type: 'ALERT', payload: { success: message } });
    }
  };

export const signup =
  (userSignup: IUserSignup) =>
  async (dispatch: Dispatch<TypeActions>): Promise<IAlert | undefined> => {
    const { errMsg, errLength }: IErrorsValid = validRegister(userSignup);
    if (errLength > 0) return dispatch({ type: ALERT, payload: { error: errMsg } });

    dispatch({ type: 'ALERT', payload: { loading: true } });
    const { data } = await api(dispatch, 'POST', '/auth/signup', userSignup);

    if (data !== null) {
      dispatch({ type: 'ALERT', payload: { success: data.message } });
    }
    return undefined;
  };

export const active =
  ({ activeToken }: { activeToken: string }) =>
  async (dispatch: Dispatch<TypeActions>): Promise<void> => {
    const { data } = await api(dispatch, 'POST', '/auth/active', { activeToken });
    if (data !== null) {
      dispatch({ type: 'ALERT', payload: { success: data.message } });
    }
  };
