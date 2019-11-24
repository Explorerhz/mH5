import request from '../util/request';

//竞拍列表
export function buyLogCnt(params){
  params['callback']='';
    return request({
        url: '/api/app/auction/buyLogCnt/90',
        method: 'get',
        params: params
      });
}

//随时怕banner
export function sspRequest(url, params){
  if(!params) params = {};
  params['callback']='';
  return request({
      url: url,
      method: 'get',
      params: params
    });
}

//专场列表
export function latest(params){
  params['callback']='';
  return request({
      url: '/api/app/auction/latest?type=ss',
      method: 'get',
      params: params
    });
}

//购买成功用户列表
export function sucDealGoods(params){
  params['callback']='';
  return request({
      url: '/api/app/auction/sucDealGoods/list',
      method: 'get',
      params: params
    });
}