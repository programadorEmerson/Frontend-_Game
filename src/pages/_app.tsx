import { CacheProvider, EmotionCache } from '@emotion/react';
import * as React from 'react';

import { AppProps } from 'next/app';

import createEmotionCache from '@/styles/createEmotionCache';

import { AbilityProvider } from '@/contexts/ability';
import ColorModeProvider from '@/contexts/ColorMode';
import { UserProvider } from '@/contexts/user';

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <ColorModeProvider>
        <UserProvider>
          <AbilityProvider>
            <Component {...pageProps} />
          </AbilityProvider>
        </UserProvider>
      </ColorModeProvider>
    </CacheProvider>
  );
}
