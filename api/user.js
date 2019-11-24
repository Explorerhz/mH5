import request from '../util/request';

//用户名密码登录
export function login(params){
    params['callback']='';
    return request({
        url: '/api/app/login',
        method: 'post',
        params: params
      });
}

//获取校验码
export function sendCode(params){
  params['callback']='';
  return request({
      url: '/api/app/wap/sendCode',
      method: 'get',
      params: params
    });
}

//手机号校验码登录
export function loginByMobile(params){
  params['callback']='';
  return request({
      url: '/api/app/loginByMobile',
      method: 'post',
      params: params
    });
}