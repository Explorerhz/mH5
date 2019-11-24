<template>
  <div class="fix-btn" @click="md('免费电话')">
    <a href="javascript:;" class="fix-free-tel"></a>
  </div>
</template>
<script>
export default {
  name: "tj-call-phone",
  methods: {
    close() {
      this.show = false;
    },
    md(val) {
      this.$emit("click", 1);
    }
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
.fix-btn {
  position: fixed;
  right: 5px;
  bottom: 80px;
  z-index: 999;
}
.fix-free-tel {
  background: url(../../assets/images/v19-10/mianfei.png) no-repeat;
  background-size: 100%;
  border-radius: 100%;
  width: 70px;
  height: 70px;
  display: block;
}
</style>

