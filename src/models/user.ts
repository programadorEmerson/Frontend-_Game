import { Rule } from '@/models/rules';
class UserModel {
  constructor(
    public _id: string,
    public email: string,
    public active: boolean,
    public balance: number,
    public rules: Rule[],
    public urlImage: string,
    public redefinePassword: boolean,
  ) {}
}

export default UserModel;
