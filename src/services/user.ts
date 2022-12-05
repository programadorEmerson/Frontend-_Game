import jwtDecode from 'jwt-decode';

import { EndpointsEnum } from '@/enums/endpoints';

import { UserInterface } from '@/interfaces/user';

import UserModel from '@/models/user';

import { TOKEN_PREFIX } from '@/utils/tokens';

import { destroyCookie, parseCookies } from 'nookies';

import { ApiService } from './api';

class UserService implements UserInterface {
  public apiService = new ApiService();
  public token: string;

  constructor() {
    const cookies = parseCookies();
    this.token = cookies[`${TOKEN_PREFIX}`];
  }

  private returnNull = (): null => {
    destroyCookie(undefined, TOKEN_PREFIX);
    return null;
  };

  private getMyData = async (): Promise<UserModel | null> => {
    const { response: user } = await this.apiService.get<{
      response: UserModel;
    }>(`${EndpointsEnum.USER}/${EndpointsEnum.ME}`);
    return user;
  };

  public getUser = async (): Promise<UserModel | null> => {
    const { token } = this;
    if (token) {
      try {
        const { _id } = jwtDecode(token) as { _id: string };
        if (_id) {
          const user = await this.getMyData();
          if (user) {
            return user;
          } else {
            return this.returnNull();
          }
        } else {
          return this.returnNull();
        }
      } catch (error) {
        return this.returnNull();
      }
    }
    return null;
  };
}

export default UserService;
