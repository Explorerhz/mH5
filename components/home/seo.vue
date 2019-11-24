<template>
  <div class="app-seo">
    <div class="comm-title m-t-b">
      <div class="app-p-title">其他人还在关注</div>
    </div>
    <div class="app-seo-area">
      <div class="app-seo-word" v-for="(item, index) in listData" :key="'seo_'+index">
        <a :href="item.href">
          <span>{{item.name}}</span>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "tj-seo",
  props: {
    listData: Array
  },
  methods: {
    call() {
      this.$emit("click", "服务电话");
    }
  },
  data() {
    return {};
  },
  serverCacheKey() {
    return Math.floor(Date.now() / 10000);
  }
};
</script>
<style scoped>
.app-seo {
  background: #fff;
  margin: 10px 0;
}
.app-seo-area {
  padding: 10px 16px 10px;
}
.app-seo-word {
  max-width: 107px;
  height: 25px;
  line-height: 25px;
  text-align: center;
  background: rgba(244, 244, 244, 1);
  border-radius: 2px;
  display: inline-block;
  margin: 7px 7px 7px 0;
  padding: 0 5px;
}
.app-seo-word span {
  display: block;
  font-size: 12px;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  transform: scale(0.8);
  max-width: 120px;
  height: 25px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>

