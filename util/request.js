import axios from 'axios';
import config from './config';
import {timestamp, uuid, token, sign} from './common';

const instance = axios.create();

config.HEADERS.timestamp = timestamp();
config.HEADERS.distinctId = uuid();
config.HEADERS.token = token(config.HEADERS.distinctId, config.HEADERS.timestamp);
config.HEADERS.sign = sign(config.HEADERS.timestamp);

instance.defaults.timeout = config.TIMEOUT;
instance.defaults.baseURL = config.BASEURL;
instance.defaults.headers = config.HEADERS;
//console.log("config.BASEURL===", config.BASEURL);
// instance.spread((e,e1,e2)=>{
//   console.log(e);
//   console.log(e1);
//   console.log(e2);
// });

instance.interceptors.request.use( request => {
    //console.log(request.url);
    return request;
  }, error => {
    return Promise.reject(error);
});

instance.interceptors.response.use( response => {
    let data = response.data;
    // console.log(data);
    if(typeof data === 'string'){
      // eslint-disable-next-line no-useless-escape
      data = response.data.replace(/^[\(]|[\)]$/g, "");
      data = JSON.parse(data);
    }
    return data;
  }, error => {
    console.log("出错了", error);
    return Promise.reject(error);
});

export default instance;