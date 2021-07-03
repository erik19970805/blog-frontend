import { Dispatch } from 'redux';
import { TypeActions } from '../../interfaces/actions.interface';
import { RootStore } from '../../interfaces/react.interface';
import { checkImage, imageUpload } from '../../utils/imageUpload';
import { ALERT } from '../constants/constants';

export const updateUser =
  (avatar: File | string, name: string) =>
  async (dispatch: Dispatch<TypeActions>, getState: Function): Promise<void | TypeActions> => {
    const { auth } = <RootStore>getState();
    if (!auth.accessToken || !auth.user) return undefined;
    const url = '';
    dispatch({ type: ALERT, payload: { loading: true } });
    if (avatar) {
      const check = checkImage(avatar as File);
      if (check) return dispatch({ type: ALERT, payload: { error: check } });
      const photo = await imageUpload(avatar as File);
      console.log(photo);
    }
    return undefined;
  };
