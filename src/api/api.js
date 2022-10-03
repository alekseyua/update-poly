import AbstractBaseApi from "./AbstractBaseApi";
import {
    searchContentSerializer,
} from './serializers';
import UserApi from "./UserApi";
import ContentApi from "./ContentApi";
import ProfileApi from "./ProfileApi";
import CartApi from "./CartApi";


class Api extends AbstractBaseApi  {
    constructor(MAIN_URL){
        super(MAIN_URL)
        this.userApi = new UserApi(MAIN_URL);
        this.contentApi = new ContentApi(MAIN_URL);
        this.profileApi = new ProfileApi(MAIN_URL);
        this.cartApi = new CartApi(MAIN_URL);

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
}

const MAIN_URL = process.env.RAZZLE_APP_API_URL;
console.log('MAIN_URL', MAIN_URL)

const api = new Api(MAIN_URL)

export default api;
