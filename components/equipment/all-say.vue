<template>
  <div class="tj-all-say" v-if="listData.length>0">
    <div class="comm-title m-t-b">
      <div class="app-p-title" :title="eqTitle+'相关文章推荐'">看看大家说什么</div>
    </div>
    <div class="tj-asy-item" v-for="item in listData" :key="'all-say'+item.id" @click="goPage(item)">
      <div class="tj-asy-item-img">
        <img :src="item.image"/>
      </div>
      <div class="tj-asy-item-title">
        <h1 :title="item.title">{{item.title}}</h1>
        <div class="tj-asy-item-user">
          <span>{{item.sendUser}}</span>
          <span>{{item.sendTimeStr}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "tj-eq-all-say",
  props:{
      listData:Array,
    eqTitle:String
  },
  methods: {
    close() {
      this.show = false;
    },
    goPage(item){
        window.location.href = item.url;
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
.tj-all-say {
  margin-top: 10px;
  background: #fff;
}
.tj-asy-item {
  padding: 10px 15px;
  display: flex;
}
.tj-asy-item-img {
  width: 133px;
  margin-right: 8px;
  height: 104px;
  border-radius: 3px;
  overflow: hidden;
  position: relative;
}
.tj-asy-item-img img {
  width: 133px;
  position: absolute;
  top: 50%;
  transform: translate3d(0, -50%, 0);
  z-index: 0;
}
.tj-asy-item-title h1 {
  font-size: 14px;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}
.tj-asy-item-title {
  display: flex;
  flex-direction: column;
  font-size: 12px;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  min-height: 104px;
  justify-content: space-between;
  flex: 1;
}
.tj-asy-item-user{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
}
</style>

