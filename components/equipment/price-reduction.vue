<template>
  <div class="tj-price-reduction" v-if="show">
    <div class="tj-price-reduction-dig">
        <div class="tj-pr-close" @click="close"></div>
      <div class="tj-pr-logo"></div>
      <div class="tj-pr-txt">铁甲二手机</div>
      <div class="tj-pr-down">下载铁甲二手机APP</div>
      <div class="tj-pr-price">一键设置降价通知</div>
      <div class="tj-pr-btn" @click="down">立即下载</div>
    </div>
  </div>
</template>

<script>
import { downApp } from "@/util/common";
export default {
  name: "tj-eq-price-reduction",
  components: {},
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
      down(){
          downApp();
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
        show:false
    };
  },
  serverCacheKey() {
    return Math.floor(Date.now() / 10000);
  }
};
</script>

<style scoped>
.tj-price-reduction {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.47);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999999;
}
.tj-price-reduction-dig {
  background: rgba(255, 255, 255, 1);
  border-radius: 8px;
  height: 275px;
  width: 297px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.tj-pr-close {
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
.tj-pr-logo {
  height: 56px;
  width: 56px;
  background: url(../../assets/images/v19-10/192.png) no-repeat;
  background-size: 100% 100%;
  background-position: center;
}
.tj-pr-txt {
  height: 25px;
  line-height: 25px;
  font-size: 12px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  text-align: center;
  margin-top: 5px;
}
.tj-pr-down{
    margin-top: 20px;
    font-size: 14px;
    color: #333332;
}
.tj-pr-price{
    margin-top: 20px;
    font-size: 13px;
    color: #333333;
    margin-top: 10px;
}
.tj-pr-btn {
  width: 217px;
  height: 38px;
  line-height: 38px;
  background: linear-gradient(
    90deg,
    rgba(255, 160, 0, 1) 0%,
    rgba(252, 115, 2, 1) 100%
  );
  border-radius: 5px;
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  margin-top: 22px;
  text-align: center;
}
</style>
