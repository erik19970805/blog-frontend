import { IUser } from '../../interfaces/response.interface';

export const GET_OTHER_INFO = 'GET_OTHER_INFO';

export interface IGetOtherInfo {
  type: typeof GET_OTHER_INFO;
  payload: IUser;
}
