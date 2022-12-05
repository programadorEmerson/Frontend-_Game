import React, { FC, ReactNode } from 'react';

import HeaderTitle from '@/components/HeaderTitle';

import { ContainerLayout } from '@/styles/pages/layout';

type LayoutProps = {
  title: string;
  children: ReactNode;
};

const Layout: FC<LayoutProps> = ({ title, children }) => {
  return (
    <ContainerLayout>
      <HeaderTitle title={title} />
      {children}
    </ContainerLayout>
  );
};

export default Layout;
