import { TypeActions } from '../../interfaces/actions.interface';
import { ALERT } from '../constants/constants';
import { IResAlert } from '../../interfaces/alert.interface';

const authReducer = (state: IResAlert = {}, action: TypeActions): IResAlert => {
  switch (action.type) {
    case ALERT:
      return action.payload;
    default:
      return state;
  }
};

export default authReducer;
