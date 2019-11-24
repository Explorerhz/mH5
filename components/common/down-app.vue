<template>
  <div class="d-tj-a" v-if="show">
    <span class="d-tj-a-c" @click="close"></span>
    <span class="d-tj-a-log"></span>
    <span class="d-tj-a-txt">卖车更快，看车更爽</span>
    <span class="d-tj-a-xz">立即下载</span>
    <div class="d-tj-a-btn" @click="down"></div>
  </div>
</template>
<script>
import { E124 } from "@/util/maidian";
import { downApp } from "@/util/common";
export default {
  name: "tj-down-app",
  props: {
    md:String
  },
  methods: {
    close() {
      this.show = false;
    },
    down(){
      E124(this.md, this.d_);
    },
    d_() {
      downApp();
    },
  },
  data() {
    return {
      show: true
    };
  },
  serverCacheKey() {
    return Math.floor(Date.now() / 10000);
  }
};
</script>
<style scoped>
.d-tj-a {
  width: 100%;
  height: 42px;
  position: relative;
  background: rgba(51, 51, 51, 1);
}
.d-tj-a-c {
  width: 11px;
  height: 11px;
  display: block;
  position: absolute;
  top: 15.5px;
  left: 19.5px;
  z-index: 2;
  background: url(../../assets/images/v19-10/close@2x.png) right top no-repeat;
  background-size: 11px 11px;
}
.d-tj-a-log {
  width: 27.5px;
  height: 27.5px;
  display: block;
  position: absolute;
  top: 7.5px;
  left: 57.5px;
  z-index: 2;
  background: url(../../assets/images/v19-10/512.png) right top no-repeat;
  background-size: 27.5px 27.5px;
}
.d-tj-a-txt {
  display: block;
  position: absolute;
  top: 13px;
  left: 97.5px;
  z-index: 2;
  font-size: 13px;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  letter-spacing: 1px;
}
.d-tj-a-xz {
  display: block;
  position: absolute;
  top: 9.5px;
  left: 294.5px;
  z-index: 2;
  font-size: 11px;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  width: 61.5px;
  height: 23.5px;
  line-height: 23.5px;
  text-align: center;
  background: linear-gradient(
    90deg,
    rgba(246, 124, 26, 1) 0%,
    rgba(246, 88, 25, 1) 100%
  );
  border-radius: 4.5px;
}
.d-tj-a-btn {
  position: absolute;
  right: 0;
  left: 50px;
  top: 0;
  height: 100%;
  z-index: 6;
}
.d-tj-a-d {
  display: block;
  width: 100%;
  height: 100%;
  font-size: 0;
  outline: 0;
}
</style>

