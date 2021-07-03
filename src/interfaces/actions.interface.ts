import { ALERT, AUTH } from '../redux/constants/constants';
import { IResAlert } from './alert.interface';
import { IResSignin } from './response.interface';

export interface ISignin {
  type: typeof AUTH;
  payload: IResSignin;
}

export interface IAlert {
  type: typeof ALERT;
  payload: IResAlert;
}

export type TypeActions = ISignin | IAlert;
