import { FC, Fragment, ReactNode } from 'react';

import { Close } from '@mui/icons-material';

import { Divider, IconButton, useTheme, Drawer } from '@mui/material';

import ItemsMenu from './ItemsMenu/itemsMenu';
import { DrawerHeader, Main } from './styles';

type MenuDrawerProps = {
  children: ReactNode;
  statusMenu: () => void;
  openDrawer: boolean;
};

const MenuDrawer: FC<MenuDrawerProps> = ({
  children,
  statusMenu,
  openDrawer,
}) => {
  return (
    <Fragment>
      <Drawer variant="persistent" anchor="left" open={openDrawer}>
        <DrawerHeader>
          <IconButton onClick={statusMenu}>
            {useTheme().direction === 'ltr' && <Close />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <ItemsMenu />
      </Drawer>
      <Main open={openDrawer}>
        <DrawerHeader />
        {children}
      </Main>
    </Fragment>
  );
};

export default MenuDrawer;
