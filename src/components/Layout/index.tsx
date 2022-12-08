import React, { FC, ReactNode, useState } from 'react';

import HeaderTitle from '@/components/HeaderTitle';

import TopBar from '../AppBar';
import MenuDrawer from '../Menu';
import { ContainerLayout } from './styles';

type LayoutProps = {
  title: string;
  children: ReactNode;
};

const Layout: FC<LayoutProps> = ({ title, children }) => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const statusMenu = () => setOpenDrawer((prev) => !prev);
  return (
    <ContainerLayout>
      <HeaderTitle title={title} />
      <TopBar open={openDrawer} statusMenu={statusMenu} />
      <MenuDrawer openDrawer={openDrawer} statusMenu={statusMenu}>
        {children}
      </MenuDrawer>
    </ContainerLayout>
  );
};

export default Layout;
