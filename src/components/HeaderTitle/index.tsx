import React, { FC } from 'react';

import Head from 'next/head';

import { ImagesEnum } from '@/enums/images';

const HeaderTitle: FC<{ title: string }> = ({ title }) => (
  <Head>
    <title>{`${process.env.NEXT_PUBLIC_APP_NAME} | ${title}`}</title>
    <meta name="description" content="App" />
    <link rel="icon" href={ImagesEnum.LOGO} />
  </Head>
);

export default HeaderTitle;
