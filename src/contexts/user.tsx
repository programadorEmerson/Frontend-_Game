import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { RoutesEnum } from '@/enums/routes';

import { ResponseSignin } from '@/interfaces/signin';

import UserModel from '@/models/user';

import UserService from '@/services/user';

import { TOKEN_PREFIX } from '@/utils/tokens';

import { setCookie } from 'nookies';

export interface UserProps {
  user: UserModel | null;
  updateUser: (dataSignin: ResponseSignin) => void;
}

const configCookie = {
  maxAge: 60 * 60 * 12,
  path: RoutesEnum.INITIAL,
};

const UserContext = createContext({} as UserProps);

function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserModel | null>(null);

  const updateUser = (dataSignin: ResponseSignin) => {
    const { userInfo } = dataSignin;
    setUser(userInfo);
    setCookie(undefined, TOKEN_PREFIX, dataSignin.token, { ...configCookie });
  };

  const getCurrentUser = useCallback(async () => {
    const userService = new UserService();
    const userData = await userService.getUser();
    if (userData) setUser(userData);
  }, []);

  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  const shared = { user, updateUser };

  return <UserContext.Provider value={shared}>{children}</UserContext.Provider>;
}

export { UserContext, UserProvider };
