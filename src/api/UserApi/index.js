import AbstractBaseApi from '../AbstractBaseApi';

export default class UserApi extends AbstractBaseApi {
  
  login = async (params, remember) => {
    const res = await this.post('/user/login_by_phone/', params);
    const data = res.data;
    if (remember) remember = 2592e3; 
    this.setAuthToken(data.token, remember);
    return data;
  };
  loginByUsername = async (params, remember) => {
    const res = await this.post('/user/login/', params);
    const data = res.data;
    if (remember) remember = 2592e3;
    this.setAuthToken(data.token, remember);
    return data;
  };
  registration = async (params) => {
    
    const res = await this.post('/user/', params);
    const data = res.data;
    return data;
  };

  logout = async () => {
    this.removeAuthToken();
  };

  putUser = async (id, params) => {
    const res = await this.put(`/user/${id}/`, params);
   
    return res;
  };

  updatePhone = async (id, params) => {
    const res = await this.post(`/user/set_new_phone/`, params);
    return res;
  };

  updatePassword = async (params) => {
    const res = await this.post(`/user/set_password/`, params);
    return res;
  };

  deleteUser = async (id, params = {}) => {
    const res = await this.delete(`/user/${id}/`, params);
    return res;
  };
// ***********************************************************************************************
//user/check_key/
  checkKey = async (params) => {
    const res = await this.post(`/user/check_key/`, params);
    return res;
  };
  
  // /user/resend_user_key/
  resendUserKey = async (params) => {
    const res = await this.post(`/user/resend_user_key/`, params);
    return res;
  };

  // reset_user_password
  resetUserPassword = async (params) => {
    const res = await this.post(`/user/reset_user_password/`, params);
    return res;
  };

  // ***********************************************************************************************
}

// import { getCookie, setCookie } from '../../utils'
// const {role} = profile;
// setCookie("profileRole", role, 2592000);
// setCookie = (, remember = false) => {
//   setCookie(this.AUTH_TOKEN_KEY, token, remember);
//   return true;
// };
