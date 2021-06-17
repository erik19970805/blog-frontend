/* eslint-disable no-useless-escape */
/* eslint-disable import/prefer-default-export */
import { IUserSignup } from '../interfaces/auth.interface';

export interface IErrorsValid {
  errMsg: string[];
  errLength: number;
}

const validateEmail = (email: string): boolean => {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const validPhone = (phone: string) => {
  const re = /^[+]/g;
  return re.test(phone);
};

export const validRegister = (data: IUserSignup): IErrorsValid => {
  const { name, account, password, cfPassword } = data;
  const errors: string[] = [];
  if (!name) {
    errors.push('Por favor, ponga su nombre');
  } else if (name.length > 50) {
    errors.push('El nombre completo debe ser manor a 50 caracteres');
  }
  if (!account) {
    errors.push('Por favor, ponga un correo electrónico o un número de teléfono');
  } else if (!validateEmail(account) && !validPhone(account)) {
    errors.push('El formato del correo electrónico o el numero de teléfono son incorrectos');
  }
  if (password.length < 6) {
    errors.push('La contraseña debe tener minimo 6 caracteres');
  } else if (password !== cfPassword) {
    errors.push('La confirmación de la contraseña no coincide con la contraseña');
  }
  return { errMsg: errors, errLength: errors.length };
};
