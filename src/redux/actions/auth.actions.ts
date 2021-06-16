/* eslint-disable import/prefer-default-export */
import { Dispatch } from 'redux';
import { TypeActions } from '../../interfaces/actions.interfaces';
import { IUserSignin } from '../../interfaces/auth.interface';
import { IResSignin } from '../../interfaces/response.interface';
import api from '../api';

export const signin =
  (userSignin: IUserSignin) =>
  async (
    dispatch: Dispatch<TypeActions>
  ): Promise<{ type: 'VALID'; payload: IUserSignin } | undefined> => {
    // const { errorMessage, errorLength } = valid(userData);
    // if (errorLength > 0) return dispatch({ type: 'VALID', payload: errorMessage });

    dispatch({ type: 'ALERT', payload: { loading: true } });
    const { data } = await api(dispatch, 'POST', '/auth/signin', userSignin);

    if (data !== null) {
      const { accessToken: token, user, message }: IResSignin = data;
      dispatch({ type: 'AUTH', payload: { token, user } });
      // localStorage.setItem('firstLogin', 'true');
      dispatch({ type: 'ALERT', payload: { success: message } });
    }
    return undefined;
  };
