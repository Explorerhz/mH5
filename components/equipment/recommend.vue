<template>
  <div class="tj-eq-recommend" v-if="show">
    <div class="tj-eq-recommend-dig">
      <span class="tj-eq-recommend-close" @click="close"></span>
      <div class="tj-eq-recommend-tip">当前设备已{{detail?detail.equipment.status == 4?'出售':'下架':''}}，为你推荐以下相似设备</div>
      <div class="tj-eq-recommend-body">
          <div>
            <tj-product-list-dlg :listData="listData" :nocall="0"></tj-product-list-dlg>
          </div>
       </div>
      <div class="tj-eq-recommend-more" @click="more">查看更多在售设备</div>
    </div>
  </div>
</template>

<script>
import ProductList from "@/components/common/product-list-dlg";
export default {
  name: "tj-eq-recommend",
  props: {
    listData: Array,
    detail:Object,
    state0: Number
  },
  components: {
    [ProductList.name]: ProductList
  },
  head() {
    return {
      title: this.title
    };
  },
  mounted() {},
  destroyed() {},
  computed: {},
  methods: {
      close(){
          this.show = false;
      },
      more(){
          //this.$router.push('/ue/');
          window.location.href = '/ue/';
      }
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
    return {};
  },
  data() {
    return {
        show:true
    };
  },
  serverCacheKey() {
    return Math.floor(Date.now() / 10000);
  }
};
</script>

<style scoped>
.tj-eq-recommend {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.47);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999999;
}
.tj-eq-recommend-dig {
  background: rgba(255, 255, 255, 1);
  border-radius: 8px;
  position: relative;
  height: 521px;
  width: 297px;
  position: absolute;
  top:50%;
  left:50%;
  transform:translate(-50%, -50%);
  overflow: hidden;
}
.tj-eq-recommend-tip {
  font-size: 13px;
  font-weight: 500;
  color: rgba(51, 51, 50, 1);
  padding: 38px 0 0;
  text-align: center;
}
.tj-eq-recommend-close {
  display: block;
  position: absolute;
  top: 15px;
  right: 15px;
  width: 15px;
  height: 15px;
  background: url(../../assets/images/v19-10/close@2x.png) no-repeat;
  background-size: 100% 100%;
  background-position: center;
}
.tj-eq-recommend-more {
  font-size: 14px;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  height: 36px;
  line-height: 36px;
  text-align: center;
  background: rgba(246, 106, 26, 1);
  border-radius: 3px;
  margin: 16px 15px 17px;
}
.tj-eq-recommend-body{
    overflow-y: auto;
    overflow: hidden;
}
</style>
