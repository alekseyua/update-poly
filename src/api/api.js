import AbstractBaseApi from "./AbstractBaseApi";
import {
    searchContentSerializer,
} from './serializers';
import UserApi from "./UserApi";
import ContentApi from "./ContentApi";
import ProfileApi from "./ProfileApi";
import CartApi from "./CartApi";
import OrderApi from "./OrderApi";


class Api extends AbstractBaseApi  {
    constructor(MAIN_URL){
        super(MAIN_URL)
        this.userApi = new UserApi(MAIN_URL);
        this.contentApi = new ContentApi(MAIN_URL);
        this.profileApi = new ProfileApi(MAIN_URL);
        this.cartApi = new CartApi(MAIN_URL);
        this.orderApi = new OrderApi(MAIN_URL);


    }

    getPage = async (params, axiosParams) => {      
        try{
            // console.log('params[0]', params)
            // console.log('axiosParams = ', axiosParams)
            const slug = !!params.url ? `${params.url}` : '/';
            const res = await this.get(`/content/page${slug}`, params, axiosParams);
            return res.data
        }catch(err){
            console.log(`ERROR `, err)
            return err;
        }  
    }

    getSearch = async (params = {}) => {
        try{
            const res = await this.get('/content/search/', params);
            return searchContentSerializer(res.data.results);
        }catch(err){
            new Error('Error has was request getSearch');
            return console.log('error message: ', err.message)
        }
    };


  getUserBalance = async (params) => {
    const res = await this.post('/user/get_user_balance/', params);
    return res.data;
  };

  setPassword = async (params) => {
    const res = await this.post('/user/set_password/', params);
    return res.data;
  };

  restorePassword = async (params) => {
    const res = await this.post('/user/restore_password/', params);
    return res.data;
  };

  restorePasswordSetPassword = async (params) => {
    const res = await this.post('/user/restore_password_set_password/', params);
    return res.data;
  };
  getUser = async (params) => {
    const res = await this.get('/user/', params);
    return res.data;
  };
  createUser = async (params) => {
    const res = await this.post('/user/', params);
    return res.data;
  };

  getShop = async (params = {}) => {
    const res = await this.get('/shop/shop/', params);
    return res.data;
  };

  updateUser = async (id, params) => {
    const res = await this.patch(`/user/${id}/`, params);
    return res.data;
  };

  getCurrentUser = async () => {
    const res = await this.get('/user/current/');
    return res.data;
  };

  getSearch = async (params = {}) => {
    const res = await this.get('/content/search/', params);
    return searchContentSerializer(res.data.results);
  };

  getMoreThanFiveProductsOfSearch = async (params = {}) => {
    const res = await this.get('/content/search/', params);
    return res.data;
  };

  getTotalPrice = async (cart) => {
    let promise = new Promise((resolve, reject) => {
      const total = Object.values(cart).reduce(
        (sum, item) => sum + Number(item.product.price) * Number(item.params.count),
        0,
      );
      setTimeout(() => resolve(total), 300);
    });
    return promise;
  };

}

const MAIN_URL = process.env.RAZZLE_APP_API_URL;
console.log('MAIN_URL', MAIN_URL)

const api = new Api(MAIN_URL)

export default api;
