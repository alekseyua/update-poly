import axios from 'axios';
import qs from 'query-string'

class BaseApi {
    constructor(MAIN_URL){
     this.MAIN_URL = MAIN_URL
    }


   async get(url, params, axiosParams){
        

        try{

            await this.axiosOverride(axios);
            let urlCorrect = ''
            if(Object.keys(params)[0] === 'url'){
                urlCorrect = `${this.MAIN_URL}${url}`;                
            }else{
                urlCorrect = `${this.MAIN_URL}${url}?${qs.stringify(params)}`;
            }
            
            console.log(`Cылка на ${urlCorrect}`);

            const request = await axios.get(urlCorrect)
            // console.log('response = ', request)
            return request;
        }catch(err){
            throw (err.response)
        }
    };

   async post(url, params){       
        try{
            const urlCorrect = `${this.MAIN_URL}${url}`;
            // console.log(`Cылка на ${urlCorrect} ${params}`);
            const request = await axios.post(urlCorrect,params);
            console.log('request', request)
            return request;

        }catch(err){
            throw err.response;
        }
    };
    
    async  delete(url, params){
            console.log('delete')
        };

    async put(url, params){
        try{
            const urlCorrect = `${this.MAIN_URL}${url}`;
            // console.log(`Cылка на ${urlCorrect} ${params}`);
            const request = await axios.put(urlCorrect,params);
            console.log('request', request)
            return request;

        }catch(err){
            throw err.response;
        }
        }

}

export default BaseApi;