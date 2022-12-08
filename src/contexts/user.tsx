import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { AlertNotification } from '@/components/AlertNotification';

import { RoutesEnum } from '@/enums/routes';

import { ResponseSignin } from '@/interfaces/signin';

import UserModel from '@/models/user';

import UserService from '@/services/user';

import { TOKEN_PREFIX } from '@/utils/tokens';

import { setCookie } from 'nookies';

export interface UserProps {
  user: UserModel | null;
  updateUser: (dataSignin: ResponseSignin) => void;
  handleLogout: () => void;
}

const configCookie = {
  maxAge: 60 * 60 * 12,
  path: RoutesEnum.INITIAL,
};

const UserContext = createContext({} as UserProps);

function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserModel | null>(null);

  const updateUser = (dataSignin: ResponseSignin) => {
    const { userInfo = null, token } = dataSignin;
    setUser(userInfo);
    setCookie(undefined, TOKEN_PREFIX, token, { ...configCookie });
  };

  const handleLogout = () => {
    const userService = new UserService();
    setUser(userService.logout());
    AlertNotification({
      type: 'success',
      message: 'Logout realizado com sucesso',
    });
  };

  const getCurrentUser = useCallback(async () => {
    const userService = new UserService();
    const userData = await userService.getUser();
    setUser(userData);
  }, []);

  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  const shared = { user, updateUser, handleLogout };

  return <UserContext.Provider value={shared}>{children}</UserContext.Provider>;
}

export { UserContext, UserProvider };
