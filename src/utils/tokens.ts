import { RoutesEnum } from '@/enums/routes';

const ENVIRONMENT = process.env.NEXT_PUBLIC_ENVIRONMENT;
const APP_NAME = process.env.NEXT_PUBLIC_TOKEN_PREFIX;

const TOKEN_SUFIX = ENVIRONMENT ? '-dev' : '';
const TOKEN_PREFIX = `${APP_NAME}${TOKEN_SUFIX}`;
const COOKIE_CONSENT = `${TOKEN_PREFIX}-cookie-consent`;

const redirectLogin = {
  redirect: {
    destination: RoutesEnum.LOGIN,
    permanent: false,
  },
};

const redirectDashboard = {
  redirect: {
    destination: RoutesEnum.INITIAL,
    permanent: false,
  },
};

const defaultReturn = {
  props: {},
};

export {
  TOKEN_PREFIX,
  COOKIE_CONSENT,
  redirectLogin,
  defaultReturn,
  redirectDashboard,
};
