import request from '../util/request';
import axios from 'axios';

//获取热搜词
export function listHotWords(params){
    //params['callback']='';
    return request({
        url: '/api/home/listHotWords',
        method: 'get',
        params: params
      });
}

//轮播
export function focusImg(params){
    //params['callback']='';
    return request({
        url: '/api/home/focusImg',
        method: 'get',
        params: params
      });
}

//获取最新好车设备列表
export function latestEq(params){
    //params['callback']='';
    return request({
        url: '/api/home/latestEq',
        method: 'get',
        params: params
      });
}

//获取降价设备列表
export function getReducePriceEqList(params){
    //params['callback']='';
    return request({
        url: '/api/home/getReducePriceEqList',
        method: 'get',
        params: params
      });
}

//论坛资讯列表
export function getNewsAndForum(params){
  params['callback']='';
  return request({
      url: '/api/app/getNewsAndForum',
      method: 'get',
      params: params
    });
}

//购机攻略列表
export function esjTypeList(params){
  var instance = axios.create({
    baseURL: 'https://solarapi.cehome.com'
  });
  instance.defaults.headers.client = 'm';
  return instance.get('/app/appBaikePage/esjTypeList');
}

//打电话到客服
export function getEncodeMobile(num){
  // params['callback']='';
  return request({
      url: '/api/app/getEncodeMobile/'+num,
      method: 'get'
    });
}

//打电话到城市经理
export function callCenter(params){
  params['callback']='';
  return request({
      url: '/api/app/callCenter/',
      method: 'get',
      params: params
    });
}

//获取打电话方式  callType 1=直呼  2=双呼
export function getCallType(params){
  params['callback']='';
  return request({
      url: 'api/app/callCenter/getCallType',
      method: 'get',
      params: params
    });
}

//获取打电话方式  callType 1=直呼  2=双呼
export function seo(params){
  params['callback']='';
  return request({
      url: 'api/app/otherCustomerFocus.json',
      method: 'get',
      params: params
    });
}

export function gps(params){
  params['callback']='';
  return request({
      url: 'api/app/gps/push',
      method: 'post',
      params: params
    });
}
