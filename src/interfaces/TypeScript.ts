import { ChangeEvent, FormEvent } from 'react';

export type InputChange = ChangeEvent<HTMLInputElement>;
export type FormSutmit = FormEvent<HTMLFormElement>;

export interface IParams {
  page: string;
  slug: string;
}
