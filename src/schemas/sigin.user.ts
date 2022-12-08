import * as yup from 'yup';

import { ErrorEnum } from '@/enums/erros';

export type InitialValuesLogin = {
  email: string;
  password: string;
};

export const schemaLogin = yup.object({
  email: yup
    .string()
    .email(ErrorEnum.INVALID_EMAIL)
    .required(ErrorEnum.EMPTY_EMAIL),
  password: yup.string().required(ErrorEnum.EMPTY_PASSWORD),
});

export const initialValuesLogin: InitialValuesLogin = {
  email: '',
  password: '',
};
