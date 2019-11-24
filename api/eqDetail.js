import request from '../util/request';

//设备成交记录
export function getLatestSucOrder(params){
    params['callback']='';
    return request({
        url: '/api/app/getLatestSucOrder',
        method: 'get',
        params: params
    });
}

//获取设备详情
export function eqBasicDetail(eqId, params){
  params['callback']='';
    return request({
        url: '/api/app/eqBasicDetail/'+eqId,
        method: 'get',
        params: params
    });
}

//获取看车报告
export function getInspectReport(params){
    params['callback']='';
      return request({
          url: '/api/app/getInspectReport',
          method: 'get',
          params: params
      });
  }

//获取管家信息
export function eqManager(eqId, params){
    params['callback']='';
      return request({
          url: '/api/app/eqmanager/'+eqId,
          method: 'get',
          params: params
      });
  }

//获取贷款信息
export function priceStatc(eqId, params){
    params['callback']='';
      return request({
          url: '/api/app/priceStatc/'+eqId,
          method: 'get',
          params: params
      });
  }

//获取图片集
export function eqImages(eqId, params){
    params['callback']='';
      return request({
          url: '/api/app/eq/image/'+eqId,
          method: 'get',
          params: params
      });
  }

//看看大家怎么说
export function zhengji(params){
    params['callback']='';
      return request({
          url: 'zhengji/api/bbs/listByModelId/',
          method: 'get',
          params: params
      });
  }

//获取相似推荐
export function eqRecommend(eqId, params){
    params['callback']='';
      return request({
          url: '/api/app/eq/recommend/'+eqId,
          method: 'get',
          params: params
      });
  }

//获取猜你喜欢
export function eqSameBrandRecommend(eqId, params){
    params['callback']='';
      return request({
          url: '/api/app/eq/sameBrandRecommend/'+eqId,
          method: 'get',
          params: params
      });
  }

//获取卖家自述
export function eqseller(eqId, params){
    params['callback']='';
      return request({
          url: '/api/app/eqseller/'+eqId,
          method: 'get',
          params: params
      });
  }
    //获取设备完整参数
export function attribute(modelId, params){
    params['callback']='';
      return request({
          url: '/api/app/eq/model/attribute/'+modelId,
          method: 'get',
          params: params
      });
  }
  //获取近7天多少人咨询过这台设备
export function consultCnt( params){
    params['callback']='';
      return request({
          url: '/api/app/eqdetail/consultCnt',
          method: 'get',
          params: params
      });
  }