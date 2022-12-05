import React from 'react';

import Head from 'next/head';
import Image from 'next/image';

import { ErrorContentBox } from '@/components/AppError/ErrorPageTemplate/styles';

import { Box } from '@mui/material';

type ErrorBoundaryFallbackProps = {
  title: string;
  children: React.ReactNode;
};

export const ErrorPageTemplate: React.FC<ErrorBoundaryFallbackProps> = ({
  title,
  children,
}) => (
  <Box>
    <Head>
      <title>{title}</title>
    </Head>
    <Box style={{ padding: 12 }}>
      <Image
        className="logo"
        src="/logo.png"
        alt="Logo"
        objectFit="scale-down"
        width={221}
        height={53}
      />
    </Box>
    <ErrorContentBox role="alert">{children}</ErrorContentBox>
  </Box>
);
