<template>
  <div class="app-about">
    <div class="app-a1"><a href="https://www.tiejia.com.cn/">关于铁甲</a></div>
    <div class="app-a2">
      <span class="app-a2-1">服务电话</span>
      <span class="app-a2-2">
        <a href="tel:400-009-9032" @click="call($event)">400-009-9032</a>
      </span>
    </div>
    <div class="app-a3">北京市朝阳区麦子店39号部落方舟2层</div>
    <div class="app-a4">北京信达众联科技有限公司，版权所有。</div>
  </div>
</template>
<script>
export default {
  name: "tj-home-about",
  methods: {
    call(event) {
      this.$emit('click', event, '服务电话');
    }
  },
  data() {
    return {
    };
  },
  serverCacheKey() {
    return Math.floor(Date.now() / 10000);
  }
};
</script>
<style scoped>
.app-about {
  height: 140px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 11px;
  font-weight: 400;
  flex-direction: column;
}
.app-a1 a {
  color: rgba(62, 106, 227, 1);
  padding: 1px 10px;
}
.app-a2-2 a{
  color:#5877DE;
}
.app-a2 {
  padding: 5px;
}
.app-a2-1 {
  color: rgba(102, 102, 102, 1);
}
.app-a2-2 {
  color: rgba(88, 119, 222, 1);
  padding-left: 10px;
}
.app-a2-2::before {
  content: "";
  width: 10px;
  height: 10px;
  background: url(../../assets/images/v19-10/dianhua.png) no-repeat;
  background-size: 100%;
  display: inline-block;
  margin-right: 5px;
}
.app-a3,
.app-a4 {
  color: rgba(194, 194, 194, 1);
  padding-top: 6px;
}
.app-a4 {
  transform: scale(0.85);
}
</style>

