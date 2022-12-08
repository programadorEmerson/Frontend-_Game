import SigninModel from '@/models/signin';
import UserModel from '@/models/user';

export type ResponseSignin = {
  token: string;
  userInfo: UserModel | null;
};

export type SigninInterface = {
  signin: ({
    email,
    password,
  }: SigninModel) => Promise<ResponseSignin | undefined>;
};
