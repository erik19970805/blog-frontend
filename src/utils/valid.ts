/* eslint-disable no-useless-escape */
import { IUserSignup } from '../interfaces/auth.interface';
import { IBlogs } from '../interfaces/blog.interface';

export interface IErrorsValid {
  errMsg: string[];
  errLength: number;
}

const validateEmail = (email: string): boolean => {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export const validPhone = (phone: string): boolean => {
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
  const error = checkPassword(password, cfPassword);
  if (error) errors.push(error);
  return { errMsg: errors, errLength: errors.length };
};

export const checkPassword = (password: string, cfPassword: string): string | undefined => {
  if (password.length < 6) {
    return 'La contraseña debe tener minimo 6 caracteres';
  }
  if (password !== cfPassword) {
    return 'La confirmación de la contraseña no coincide con la contraseña';
  }
  return undefined;
};

export const validCreateBlog = ({
  title,
  content,
  description,
  thumbnail,
  category,
}: IBlogs): IErrorsValid => {
  const errors: string[] = [];

  if (title.trim().length < 10) {
    errors.push('title has at least 10 characters');
  } else if (title.trim().length > 50) {
    errors.push('Title is up to 50 characters long');
  }

  if (content.trim().length < 2000) {
    errors.push('Content has at least 2000 characters');
  }

  if (description.trim().length < 50) {
    errors.push('Description has at least 10 characters');
  } else if (description.trim().length > 200) {
    errors.push('Description is up to 200 characters long');
  }

  if (!thumbnail) {
    errors.push('Thumbnail cannot be left blank');
  }

  if (!category) {
    errors.push('Category cannot be left blank');
  }

  return { errMsg: errors, errLength: errors.length };
};
