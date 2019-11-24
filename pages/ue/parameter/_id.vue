<template>
  <div class="tj-parameter">
    <div class="tj-parameter-title">
      <span class="tj-nav-back" @click.stop="back"></span>
      设备参数
    </div>
    <div class="tj-parameters" v-for="item in attribute_" :key="item.name">
      <label class="tj-parameters-name">{{item.name}}</label>
      <ul class="tj-parameters-ul">
        <li class="tj-parameters-li" v-for="val in item.attributes" :key="'ps-'+val.id">
          <span>{{val.name}}</span>
          <span class="tj-parameters-li-2">{{val.value}}</span>
        </li>
      </ul>
    </div>
    <tj-up ref="tj_up"></tj-up>
  </div>
</template>

<script>
import { eqBasicDetail,attribute } from "@/api/eqDetail"
import Up from "@/components/common/up";
import { allSettled } from "@/util/promise-all.js";
import {  pageBack } from "@/util/page.js";
let SHOW_FLAG = false;
export default {
  name: "tj-parameter",
  components: {
    [Up.name]: Up
  },
  head() {
    return {
      title: `${this.detail.equipment.cityName}二手${this.detail.equipment.brand+this.detail.equipment.model+this.detail.equipment.category}完整参数信息-${this.detail.equipment.id}-铁甲二手机`
    };
  },
  mounted() {
    document.addEventListener("scroll", this.scrollEvent);
  },
  destroyed() {
    window.removeEventListener("scroll", this.scrollEvent);
  },
  computed: {},
  methods: {
    back() {
      pageBack();
    },
    scrollEvent(e) {
      const clientHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      // console.log(scrollTop);
      if (scrollTop > clientHeight) {
        SHOW_FLAG = true;
      } else {
        SHOW_FLAG = false;
      }
      if (this.$refs.tj_up && this.$refs.tj_up.backToTopShow != SHOW_FLAG) {
        this.$refs.tj_up & (this.$refs.tj_up.backToTopShow = SHOW_FLAG);
      }
    },
  },
  async asyncData({
    isDev,
    route,
    store,
    env,
    params,
    query,
    req,
    res,
    redirect,
    error
  }) {
    const reg = /.+\/(\d+-\d+)/;
    // console.log(reg.exec(req.path)[1].trim());
    const param_ = reg.exec(route.path)[1].trim();
    let ids = [0, 0];
    if(param_){
      const moreParam = param_.split('-');
      if(moreParam.length == 2){
        ids = moreParam;
      }
    }
    const modelId = ids[1];
    const eqId = ids[0];
    let attribute_ = [];
    let detail = { equipment: {} };
    const result = await allSettled([
      attribute(modelId, {}),
      eqBasicDetail(eqId, {})
    ]).catch(function(err) {
      console.log("index 请求出错了", err);
    });
    if(result[0].status == 200 && result[0].result.ret == 0){
      attribute_ = result[0].result.result;
    }
    if (result[1].status == 200 && result[1].result.ret == 0) {
        detail = result[1].result.result;
      }
    return {
      attribute_:attribute_,
      detail:detail
    };
  },
  data() {
    return {
      attribute_:[]
    };
  },
  serverCacheKey() {
    return Math.floor(Date.now() / 10000);
  }
};
</script>

<style>
.container {
  background: rgba(0, 0, 0, 1);
  height: 100vh;
}
.tj-parameter{
  background: #f9f9f9;
  overflow: hidden;
}
.tj-parameter-title {
  text-align: center;
  height: 45px;
  line-height: 45px;
  font-size: 18px;
  font-weight: 500;
  color: rgba(74, 74, 83, 1);
  position: relative;
  background: #fff;
}
.tj-nav-back {
  background: url(../../../assets/images/v19-10/system-back@2x.png) no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 15px;
  left: 15px;
  width: 9px;
  height: 16px;
}
.tj-parameters-name{
  height: 40px;
  line-height: 40px;
  font-size:14px;
  font-weight:400;
  color:rgba(51,51,51,1);
  padding: 0 15px;
  display: block;

}
.tj-parameters-ul{
  background: #fff;
  padding: 0 15px;
}
.tj-parameters-li{
  height: 50px;
  line-height: 50px;
  font-size:14px;
  font-weight:400;
  color:rgba(102,102,102,1);
  border-bottom: solid 1px #EEEEEE;
  display: flex;
  justify-content: space-between;
}
.tj-parameters-li:last-child{
  border-bottom: solid 1px #fff;
}
.tj-parameters-li-2{
  color:rgba(51,51,51,1);
}
</style>
