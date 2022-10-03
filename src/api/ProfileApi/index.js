import AbstractBaseApi from '../AbstractBaseApi';
import { serializeNotifications, serializeUserList } from './serializers';

export default class ProfileApi extends AbstractBaseApi {
  deleteWishlist = async (id, params = {}) => {
    const res = await this.delete(`/profile/wishlist/${id}/`, params);
    return res;
  };
  
  getWishlist = async (params = {}) => {
    const res = await this.get('/profile/wishlist/', params);
    return res.data;
  };

  postWishlist = async (params = {}) => {
    const res = await this.post('/profile/wishlist/', params);
    return res;
  };

  getAlreadySaw = async (params = {}) => {
  // api -> ProfileApi
    const res = await this.get('/profile/already_saw/', params);
    return res.data;
  };

  // ********************************************************************************************************************
  getNotifications = async (params = {}) => {
     const res = await this.get(`/profile/notifications/`, params);
  // const res = await this.get(`/profile/notifications/get_notifications/`, params);
    res.data = serializeNotifications(res.data);
    return res.data; 
  };


  postNotificationsDel = async (params = {}) => {
    const res = await this.delete(`/profile/notifications/delete_notifications/`, params);
    return res.data; 
  };

  postNotificationsReed = async (params = {}) => {
    const res = await this.post(`/profile/notifications/readed_notifications/`, params);
    return res.data;
  };
 
  gettNotificationsServiceWorker = async (params = {}) => {
    // const res = await this.get(`/ajax/device/wp/`, params);
    // https://back.ftownpl.com/api/v1/web_push/register_back/
    const res = await this.get(`/web_push/register_back/`, params);

    return res.data;
  };
  postNotificationsServiceWorker = async (params = {}) => {
    // const res = await this.post(`/ajax/device/wpf/`, params);
    const res = await this.post(`/web_push_front/`, params);
    return res.data;
  };
  // ********************************************************************************************************************
  getShopUserList = async (params = {}) => {
    const res = await this.get(`/user/get_shop_users_list/`, params);
    res.data = serializeUserList(res.data);
    return res.data;
  };
  getShopUserDetails = async (id, params = {}) => {
    const res = await this.get(`/user/${id}/get_shop_user/`, params);
    return res.data;
  };


}
