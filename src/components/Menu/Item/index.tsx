import { FC } from 'react';

import Link from 'next/link';

import { MenuList } from '@/components/@types/menu.hook';

import { ListItem, ListItemText } from '@mui/material';

import { CustomListItemIcon, SpanName } from './styles';

type SiderbarListItemProps = {
  menu: MenuList;
};

export const Item: FC<SiderbarListItemProps> = ({ menu }) => (
  <Link href={!menu.disabled ? menu.path : '#'} passHref>
    <ListItem button disabled={menu.disabled} selected={menu.active}>
      <CustomListItemIcon>{menu.icon}</CustomListItemIcon>
      <ListItemText disableTypography>
        <SpanName
          className={
            !menu.disabled
              ? `active-menu-item ${menu.active && 'selected-menu-item'}`
              : 'disabled-menu-item'
          }
        >
          {menu.name}
        </SpanName>
      </ListItemText>
    </ListItem>
  </Link>
);
