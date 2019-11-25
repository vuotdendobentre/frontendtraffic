import axios from 'axios';
import * as Config from './Config';

export default function callApi(endpoint,method,body){
    return axios({
        method: method,
        dataType : 'jsonp',
        url : `${Config.API_URL}/${endpoint}`,
        data : method!=='GET' ? body : null,
        headers : method ==='GET' ? body : null,
        body : body

    },body).catch(err=>{
        console.log(err);
    });
}
