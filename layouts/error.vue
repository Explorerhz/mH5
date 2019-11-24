<template>
  <div class="error-page">
    <img v-if="error.statusCode==404" src="../assets/images/v19-10/404@2x.png" />
    <img v-else src="../assets/images/v19-10/500@2x.png" />
    <p>{{error.statusCode==404?'抱歉，您访问的页面不存在':'抱歉，服务器出错了'}}</p>
    <span @click="back">返回</span>
  </div>
</template>

<script>
export default {
  name: "NuxtError",
  props: ["error"],
  head() {
    return {
      title: this.error.statusCode
        ? "抱歉，您访问的页面不存在"
        : "抱歉，服务器出错了"
    };
  },
  methods: {
    back() {
      window.location.href = "/";
    }
  }
};
</script>

<style>
.error-page {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  position: absolute;
  left: 0;
  top: 50%;
  width: 100%;
  transform: translateY(-50%);
}
.error-page img {
  width: 217x;
  height: 210px;
}
.error-page p {
  margin-top: 18px;
  font-size: 12px;
  font-weight: 400;
  color: rgba(104, 104, 104, 1);
  opacity: 0.5;
}
.error-page span {
  margin-top: 22px;
  display: block;
  width: 116px;
  height: 35px;
  line-height: 35px;
  background: rgba(88, 119, 222, 1);
  border-radius: 3px;
  font-size: 15px;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  text-align: center;
}
</style>
