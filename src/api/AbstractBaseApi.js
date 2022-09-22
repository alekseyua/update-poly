import BaseApi from './BaseApi';
import { setCookie, getCookie, removeCookie } from '../helpers/helpers';

class AbstractBaseApi extends BaseApi {
  constructor(MAIN_URL, params) {
    super(MAIN_URL);
  }

  language = null;
  AUTH_TOKEN_KEY = 'ft_token';
  CURRENCY_KEY = 'currency';

  getLanguage = () => {
    if (this.language === null) {
      return 'ru';
    }
    return this.language;
  };

  setLanguage = (lang = 'ru') => {
    this.language = lang; 
    return this.language;
  };

  
  getCurrency = () => {
    return getCookie(this.CURRENCY_KEY);
  };

  getAuthToken = () => {
    return getCookie(this.AUTH_TOKEN_KEY);
  };

  setAuthToken = (token, remember = false) => {
    setCookie(this.AUTH_TOKEN_KEY, token, remember);
    return true;
  };

  removeAuthToken = () => {
    try {
      removeCookie(this.AUTH_TOKEN_KEY);
      return true;
    } catch {
      return false; // no key
    }
  };




  axiosOverride = (axios) => {
    const token = this.getAuthToken();
    const language = this.getLanguage();
    const currency = this.getCurrency();
    axios.defaults.headers.common['Authorization'] = token ? `Token ${token}` : '';
    axios.defaults.headers.common['Accept-Language'] = language;
    if (currency) {
       axios.defaults.headers.post['currency'] = currency; // for POST requests
       axios.defaults.headers.common['currency'] = currency; // for all requests
    }
    return axios;
  };

}

export default AbstractBaseApi;
