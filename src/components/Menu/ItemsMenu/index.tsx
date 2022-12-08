import { FC } from 'react';

import { useMenuItems } from '@/hooks/useMenuItems';

import List from '@mui/material/List';

import { Item } from '../Item';
import { drawerWidth } from '../styles';

const ItemsMenu: FC = () => {
  const { sharedMenu } = useMenuItems();

  return (
    <List sx={{ width: `${drawerWidth}px` }}>
      {sharedMenu().map((menu) => (
        <Item key={`${menu.name}`} menu={menu} />
      ))}
    </List>
  );
};

export default ItemsMenu;
