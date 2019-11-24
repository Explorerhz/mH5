<template>
  <div class="up-btn" @click="up" v-show="backToTopShow">
    <span></span>
  </div>
</template>
<script>
let backTopInterval;
export default {
  name: "tj-up",
  methods: {
    up() {
      if (!this.backTopAllow) return;
      // this.backTopAllow = false;
      // const scrollTop =
      //   document.documentElement.scrollTop || document.body.scrollTop;
      // var step = scrollTop / this.backSeconds;
      // backTopInterval = setInterval(() => {
      //   const scrollTop_ =
      //     document.documentElement.scrollTop || document.body.scrollTop;
      //   if (scrollTop_ > 0) {
      //     if (document.body && document.body.scrollTop){
      //       document.body.scrollTop = scrollTop_ - step;
      //     }else{
      //       document.documentElement.scrollTop = scrollTop_ - step;
      //     }
      //   } else {
      //     this.backToTopShow = false;
      //     clearInterval(backTopInterval);
      //   }
      // }, 1);
      if (document.body && document.body.scrollTop) {
        document.body.scrollTop = 0;
      } else {
        document.documentElement.scrollTop = 0;
      }
      this.backToTopShow = false;
    }
  },
  data() {
    return {
      backToTopShow: false,
      // 返回顶部所需时间
      backSeconds: 100,
      // 往下滑动多少显示返回顶部（单位：px）
      showPx: 200,
      backTopAllow: true
    };
  },
  serverCacheKey() {
    return Math.floor(Date.now() / 10000);
  }
};
</script>
<style scoped>
.up-btn {
  width: 45px;
  height: 45px;
  position: fixed;
  bottom: 70px;
  right: 10px;
  background: url(../../assets/images/v19-10/up.png) no-repeat;
  background-size: 100%;
  border-radius: 100%;
}
</style>

