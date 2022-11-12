import api from './api/api';

export const PATHS = {
  ALL: {
    path: '/',
    fetchInitialData: api.getPage,
  },
};

export const language = null;
export const AUTH_TOKEN_KEY = 'ft_token';
export const CURRENCY_KEY = 'currency';


export const RE_CAPTHA_KEY = '6LcXhGwUAAAAAGiWdDTN_VYRMx2SWDVxmAaWGLYP';
export const DEFAULT_CURRENCIES = 'RUB';
export const ONE_YEARS = 2592e3;
export const COOKIE_KEYS = {
  CURRENCIES: 'currency',
  AUTH: 'ft_token',
  POLICY: 'policy',
};
export const ACTIONS_KEY = {
  LOG_OUT: 'log_out',
};
//все доступные валюты на сайте
export const CURRENCIES_DATA = [
  {
    name: 'PLN',
    value: 'PLN',
  },
  {
    name: 'Eur',
    value: 'eur',
  },
  {
    name: 'Usd',
    value: 'usd',
  },
  {
    name: 'RUB',
    value: 'Rub',
  },
];

export const LANG_DATA = [
  {
    name: 'Ru',
    value: 'ru',
  },
  {
    name: 'Eng',
    value: 'en',
  },
  {
    name: 'Pl',
    value: 'pl',
  },
];

export const ROLE = {
  UNREGISTRED: 0,
  RETAIL: 1,
  DROPSHIPPER: 2,
  WHOLESALE: 3, 
};

export const STATUS_FETCHER = {
  LOADING: 'loading',
  FAILED: 'failed',
  LOADED: 'loaded',
};

export const DEFAULT_PAGE_SIZE = 30;
export const DEFAULT_PAGE_COUNT_PAGINATION = 5;

export const LOCAL_STORAGE_KEYS = {
  WISHLIST: 'wishlist',
  ANNOUNCE: 'announce',
};

export const ERROR_STATUS = {
  FORBIDDEN: 403,
  BAD_REQUEST: 400,
  NO_ACCESS: 401,
};

export const SHOP_PAGE = {
  ALL_PRODUCTS: 'ALL_PRODUCTS',
  MY_PRODUCTS: 'MY_PRODUCTS',
};

export const STATUS_EQUARING = {
  SUCCESS: 'SUCCESS',
};

export const REG_PUSH = 'reg-push';
export const REG_PUSH_BTN = 'reg-push-btn';
export const UNREG_PUSH_v1 = 'unreg-push-v1';

