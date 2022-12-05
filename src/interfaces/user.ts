import UserModel from '@/models/user';

export type UserInterface = {
  getUser: (token: string) => Promise<UserModel | null>;
};
