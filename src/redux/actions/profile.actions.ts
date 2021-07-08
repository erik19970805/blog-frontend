import { Dispatch } from 'redux';
import { TypeActions } from '../../interfaces/actions.interface';
import { RootStore } from '../../interfaces/react.interface';
import { checkImage, imageUpload } from '../../utils/imageUpload';
import { apiActions } from '../api';
import { ALERT, AUTH } from '../constants/constants';

export const updateUser =
  (avatar: File | string, name: string) =>
  async (dispatch: Dispatch<TypeActions>, getState: Function): Promise<void | TypeActions> => {
    const { auth } = <RootStore>getState();
    if (!auth.accessToken || !auth.user) return undefined;
    let url = '';
    dispatch({ type: ALERT, payload: { loading: true } });
    if (avatar) {
      const check = checkImage(avatar as File);
      if (check) return dispatch({ type: ALERT, payload: { error: check } });
      const photo = await imageUpload(avatar as File);
      url = photo.url;
    }
    dispatch({
      type: AUTH,
      payload: {
        ...auth,
        user: { ...auth.user, name: name || auth.user.name, avatar: url || auth.user.avatar },
      },
    });
    const { data } = await apiActions(
      dispatch,
      'PATCH',
      '/user',
      {
        name: name || auth.user.name,
        avatar: url || auth.user.avatar,
      },
      { Authorization: auth.accessToken }
    );
    if (data !== null) {
      dispatch({ type: ALERT, payload: { success: data.message } });
    }
    return undefined;
  };
