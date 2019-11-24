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