import { IUserSignin } from './auth.interface';

export interface IUser extends IUserSignin {
  avatar: string;
  createAt: string;
  name: string;
  role: string;
  type: string;
  updateAt: string;
  _id: string;
}

export interface IResSignin {
  message?: string;
  accessToken?: string;
  user?: IUser;
}
