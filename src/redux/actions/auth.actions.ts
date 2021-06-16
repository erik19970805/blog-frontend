/* eslint-disable import/prefer-default-export */
import { Dispatch } from 'redux';
import { TypeActions } from '../../interfaces/actions.interfaces';
import { IUserSignin } from '../../interfaces/auth.interface';
import { IResSignin } from '../../interfaces/response.interface';
import api from '../api';

export const signup =
  (userSignin: IUserSignin) =>
  async (
    dispatch: Dispatch<TypeActions>
  ): Promise<{ type: 'VALID'; payload: IUserSignin } | undefined> => {
    // const { errorMessage, errorLength } = valid(userData);
    // if (errorLength > 0) return dispatch({ type: 'VALID', payload: errorMessage });

    dispatch({ type: 'ALERT', payload: { loading: true } });
    const { data } = await api(dispatch, 'POST', '/auth/signup', userSignin);
    if (data !== null) {
      const { token, user }: IResSignin = data;
      dispatch({ type: 'AUTH', payload: { token, user } });
      localStorage.setItem('firstLogin', 'true');
      dispatch({ type: 'ALERT', payload: { success: data.message } });
    }
    return undefined;
  };
