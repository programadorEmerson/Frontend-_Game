/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, ReactNode, useMemo, useState } from 'react';

import Head from 'next/head';

import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

export const ColorModeContext = createContext({ changeTheme: () => {} });

export default function ColorModeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const colorMode = React.useMemo(
    () => ({
      changeTheme: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = useMemo(() => {
    const createdTheme = createTheme({
      palette: {
        mode,
      },
    });
    return createdTheme;
  }, [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <CssBaseline />
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
}
