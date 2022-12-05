/* eslint-disable @typescript-eslint/no-unused-vars */
import { ConstantsEnum } from '@/enums/constants';

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      return config;
    },
    baseUrl: ConstantsEnum.BASE_URL,
  },
});
