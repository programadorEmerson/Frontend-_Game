import React from 'react';

import { NextPage } from 'next';

import Layout from '@/components/Layout';

import { FeatureCodeAction, FeatureCodeEnum } from '@/enums/feature';

import { Can } from '@/contexts/ability';

const Home: NextPage = () => {
  const { SHARED } = FeatureCodeEnum;
  const { READ } = FeatureCodeAction;

  return (
    <Can I={READ} this={SHARED}>
      <Layout title="Home Page">
        <span>Home Page</span>
      </Layout>
    </Can>
  );
};

export default Home;
