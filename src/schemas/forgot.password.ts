import * as yup from 'yup';

import { ErrorEnum } from '@/enums/erros';

export type InitialValuesForgot = {
  email: string;
  password: string;
  passwordConfirm: string;
};

export const schemaForgot = yup.object({
  email: yup
    .string()
    .email(ErrorEnum.INVALID_EMAIL)
    .required(ErrorEnum.EMPTY_EMAIL),
  password: yup
    .string()
    .required(ErrorEnum.EMPTY_PASSWORD)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      'Precisa conter pelo menos 8 caracteres, uma letra maiúscula, uma minúscula, um número e um caracter especial',
    ),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], ErrorEnum.PASSWORD_NOT_MATCH)
    .required(ErrorEnum.EMPTY_PASSWORD_CONFIRMATION),
});

export const initialValuesForgot: InitialValuesForgot = {
  email: '',
  password: 'Emerson@2022',
  passwordConfirm: 'Emerson@2022',
};
