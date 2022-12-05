import { Rule } from '@/models/rules';
class UserModel {
  constructor(
    public email: string,
    public name: string,
    public rules: Rule[],
  ) {}
}

export default UserModel;
