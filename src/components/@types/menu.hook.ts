import { FeatureCodeEnum } from '@/enums/feature';

export type MenuList = {
  name: string;
  icon: JSX.Element;
  path: string;
  active: boolean;
  disabled: boolean;
  code: FeatureCodeEnum;
};

export type MenuHook = {
  sharedMenu: () => MenuList[];
};
