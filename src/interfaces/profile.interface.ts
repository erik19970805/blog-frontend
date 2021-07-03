import { IUserSignup } from './auth.interface';

export interface IUserProfile extends IUserSignup {
  avatar: File | string;
}

export interface IResImageUpload {
  public_id: string;
  url: string;
}
