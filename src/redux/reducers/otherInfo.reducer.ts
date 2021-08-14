import { IUser } from '../../interfaces/response.interface';
import { GET_OTHER_INFO, IGetOtherInfo } from '../types/profile.types';

const otherInfoReducer = (state: IUser[] = [], action: IGetOtherInfo): IUser[] => {
  switch (action.type) {
    case GET_OTHER_INFO:
      return [...state, action.payload];

    default:
      return state;
  }
};

export default otherInfoReducer;
