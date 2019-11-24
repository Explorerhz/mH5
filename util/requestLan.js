import axios from 'axios';
import config from './config';

const instance = axios.create();

instance.defaults.timeout = config.TIMEOUT;
instance.defaults.baseURL = config.BASEIP;

instance.interceptors.request.use( request => {
    return request;
  }, error => {
    return Promise.reject(error);
});

instance.interceptors.response.use( response => {
    return response.data;
  }, error => {
    return Promise.reject(error);
});

export default instance;