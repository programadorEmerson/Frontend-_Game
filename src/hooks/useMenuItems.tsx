import React from 'react';

import { useRouter } from 'next/router';

import { MenuHook, MenuList } from '@/components/@types/menu.hook';

import { FeatureCodeEnum } from '@/enums/feature';
import { MenuNames } from '@/enums/menu';
import { RoutesEnum } from '@/enums/routes';

import { useAbilities } from '@/hooks/useAbilities';

import { Assessment, MapRounded } from '@mui/icons-material';

export const useMenuItems = (): MenuHook => {
  const { asPath } = useRouter();
  const { featuresArray } = useAbilities();

  const isActive = (menuPath: string): boolean => asPath.includes(menuPath);

  const filterMenuList = (menuList: MenuList[]) => {
    return menuList.reduce((acc: MenuList[], menu) => {
      if (featuresArray.includes(menu.code)) {
        acc.push(menu);
      }
      return acc;
    }, []);
  };

  const sharedMenu = () => {
    const items = [
      {
        icon: <Assessment />,
        name: MenuNames.DASHBOARD,
        path: RoutesEnum.LOGIN,
        active: isActive(RoutesEnum.LOGIN),
        disabled: false,
        code: FeatureCodeEnum.SHARED,
      },
      {
        icon: <MapRounded />,
        name: MenuNames.MY_DATA,
        path: RoutesEnum.LOGIN,
        active: isActive(RoutesEnum.LOGIN),
        disabled: false,
        code: FeatureCodeEnum.SHARED,
      },
    ];

    return filterMenuList(items);
  };

  return { sharedMenu };
};
