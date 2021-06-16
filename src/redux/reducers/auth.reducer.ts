import { TypeActions } from '../../interfaces/actions.interfaces';
import { IResSignin } from '../../interfaces/response.interface';
import { AUTH } from '../constants/constants';

const authReducer = (state: IResSignin = {}, action: TypeActions): IResSignin => {
  switch (action.type) {
    case AUTH:
      return action.payload;
    default:
      return state;
  }
};

export default authReducer;
