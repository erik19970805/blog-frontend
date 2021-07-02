export interface IUserSignin {
  account: string;
  password: string;
}

export interface IUserSignup extends IUserSignin {
  name: string;
  cfPassword: string;
}

export interface IUserProfile extends IUserSignup {
  avatar: string | File;
}
