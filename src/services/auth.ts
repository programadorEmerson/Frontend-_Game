import { EndpointsEnum } from '@/enums/endpoints';
import { ErrorEnum } from '@/enums/erros';
import { MessagesEnum } from '@/enums/messages';

import { APIError } from '@/interfaces/axios';
import { ResponseSignin } from '@/interfaces/signin';

import UserModel from '@/models/user';

import { InitialValuesRegister } from 'src/schemas/register.user';
import { InitialValuesLogin } from 'src/schemas/sigin.user';

import { ApiService } from './api';

class AuthService {
  constructor(private api = new ApiService()) {}

  handleRegister = async (
    dataRegister: InitialValuesRegister,
  ): Promise<ResponseSignin | string> => {
    try {
      const response = await this.api.post<ResponseSignin>(
        `/${EndpointsEnum.USERS}/${EndpointsEnum.SIGNUP}`,
        dataRegister,
      );
      return response;
    } catch (error) {
      const info = error as APIError;
      const { message } = info.response.data;
      return message;
    }
  };

  handleUpdatePass = async (
    password: string,
    userId: string,
  ): Promise<ResponseSignin | string> => {
    try {
      const response = await this.api.patch<ResponseSignin>(
        `/${EndpointsEnum.USERS}/${EndpointsEnum.UPDATE_USER}/${userId}`,
        { password },
      );
      return response;
    } catch (error) {
      const info = error as APIError;
      const { message } = info.response.data;
      return message;
    }
  };

  handleConfirmCode = async (
    code: string,
    email: string,
  ): Promise<{
    type: 'error' | 'success';
    message: MessagesEnum | ErrorEnum | string;
  }> => {
    try {
      const haveUser = await this.api.patch<boolean>(
        `/${EndpointsEnum.USERS}/${EndpointsEnum.CONFIRM_CODE}?email=${email}&code=${code}`,
      );

      if (haveUser) {
        return {
          type: 'success',
          message: MessagesEnum.INSERT_NEW_PASSWORD,
        };
      } else {
        return {
          type: 'error',
          message: ErrorEnum.INVALID_CODE,
        };
      }
    } catch (error) {
      const info = error as APIError;
      const { message } = info.response.data;
      return { type: 'error', message };
    }
  };

  handleVerifyCode = async (
    code: string,
    email: string,
  ): Promise<{
    type: 'error' | 'success';
    message: MessagesEnum | ErrorEnum | string;
  }> => {
    try {
      const haveUser = await this.api.patch<UserModel | null>(
        `/${EndpointsEnum.USERS}/${EndpointsEnum.VERIFY_CODE}?email=${email}&code=${code}`,
      );

      if (haveUser) {
        return {
          type: 'success',
          message: MessagesEnum.INSERT_NEW_PASSWORD,
        };
      } else {
        return {
          type: 'error',
          message: ErrorEnum.INVALID_CODE,
        };
      }
    } catch (error) {
      const info = error as APIError;
      const { message } = info.response.data;
      return { type: 'error', message };
    }
  };

  handleResetPassword = async (
    email: string,
  ): Promise<ResponseSignin | string> => {
    try {
      const { token } = await this.api.patch<{ token: string }>(
        `/${EndpointsEnum.USERS}/${EndpointsEnum.REDEFINE_PASSWORD}?email=${email}`,
      );
      return { token, userInfo: null };
    } catch (error) {
      const info = error as APIError;
      const { message } = info.response.data;
      return message;
    }
  };

  handleSignin = async (
    dataLogin: InitialValuesLogin,
  ): Promise<ResponseSignin | string> => {
    try {
      const responseSignin = await this.api.post<ResponseSignin>(
        `/${EndpointsEnum.USERS}/${EndpointsEnum.SIGNIN}`,
        dataLogin,
      );
      return responseSignin;
    } catch (error) {
      const info = error as APIError;
      const { message } = info.response.data;
      return message;
    }
  };

  handleResendCode = async (email: string): Promise<MessagesEnum | string> => {
    try {
      await this.api.patch<UserModel>(
        `/${EndpointsEnum.USERS}/${EndpointsEnum.RESEND_CODE}?email=${email}`,
      );
      return MessagesEnum.CODE_RESEND;
    } catch (error) {
      const info = error as APIError;
      const { message } = info.response.data;
      return message;
    }
  };
}

export default AuthService;
