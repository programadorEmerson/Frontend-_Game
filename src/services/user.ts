import { EndpointsEnum } from '@/enums/endpoints';

import { UserInterface } from '@/interfaces/user';

import UserModel from '@/models/user';

import { TOKEN_PREFIX } from '@/utils/tokens';

import { destroyCookie } from 'nookies';

import { ApiService } from './api';

class UserService implements UserInterface {
  public apiService = new ApiService();
  public token = this.apiService.getApiToken();

  private returnNull = (): null => {
    destroyCookie(undefined, TOKEN_PREFIX);
    return null;
  };

  private getMyData = async (): Promise<UserModel | null> => {
    const user = await this.apiService.get<UserModel>(
      `${EndpointsEnum.USERS}/${EndpointsEnum.ME}`,
    );
    return user;
  };

  public logout = (): null => {
    destroyCookie(undefined, TOKEN_PREFIX);
    return null;
  };

  public getUser = async (): Promise<UserModel | null> => {
    const { token } = this;
    if (token) {
      const { _id, redefinePassword } = await this.apiService.decodeToken();
      try {
        if (_id) {
          if (redefinePassword) {
            return this.returnNull();
          } else {
            const user = await this.getMyData();
            if (user) {
              return user;
            } else {
              return this.returnNull();
            }
          }
        }
      } catch (error) {
        return this.returnNull();
      }
    }
    return null;
  };
}

export default UserService;
