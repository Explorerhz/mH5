import request from '../util/request';

//投诉举报
export function complaint(params){
    params['callback']='';
    return request({
        url: '/api/app/eq/accusation/add',
        method: 'post',
        params: params
    });
}