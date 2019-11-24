<template>
  <div class="tj-eq-info" id="tj-eq-info-01">
    <div class="tj-eq-info-title">
      <div class="app-p-title" :title="detail.equipment.brand+detail.equipment.model+detail.equipment.category+'参数介绍'">设备信息</div>
      <div class="eq-num">编号{{detail.equipment.id}}</div>
    </div>
    <div class="tj-eq-info-para">
      <div
        v-for="(value, name) in detail.equipment.orderAttrbute"
        :key="'para-'+value"
        class="eq-para"
      >
        <p>{{value}}</p>
        <span>{{name}}</span>
      </div>
    </div>
    <div class="eq-other-para" v-if="detail.mainAttributes">
        <div v-for="item in detail.mainAttributes" :key="'para-'+item.id" class="eq-para0">
          <span class="eq-other-para-sp" :class="['eq-other-para-p'+item.id]"></span>
          <p>{{item.value}}</p>
          <span class="eq-para03">{{item.name}}</span>
        </div>
      </div>
    <div class="tj-eq-info-paras">
      <a
        :href="'/ue/parameter/'+detail.equipment.id+'-'+detail.equipment.modelId" 
        :title="detail.equipment.cityName+'二手'+detail.equipment.brand+detail.equipment.model+detail.equipment.category+'完整参数信息'"
        @click.prevent="md($event, '查看完整参数')"
      >查看完整参数</a>
    </div>
  </div>
</template>
<script>
export default {
  name: "tj-eq-info",
  props: {
    detail: Object
  },
  methods: {
    close() {
      this.show = false;
    },
    md(event, val) {
      this.$emit("md", event, val
      // , ()=>{
      //   this.$router.push(`/ue/parameter/${this.detail.equipment.id}-${this.detail.equipment.modelId}`);
      // }
      );
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
.tj-eq-info {
  margin-top: 10px;
  background: #fff;
}
.tj-eq-info-title {
  padding: 12px 15px;
  display: flex;
  align-items: center;
}
.eq-num {
  font-size: 13px;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  white-space: nowrap;
}
.tj-eq-info-para {
  padding: 11px 0;
  margin: 0px 15px;
  border-bottom: 1px solid #f9f9f9;
  display: grid;
  grid-template-columns: 3fr 3fr 1fr;
}
.tj-eq-info-paras {
  height: 40px;
  text-align: center;
  font-size: 13px;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.tj-eq-info-paras a {
  color: rgba(102, 102, 102, 1);
  display: inline-block;
}
.tj-eq-info-paras::after {
  content: "";
  display: inline-block;
  width: 6px;
  height: 11px;
  margin-left: 3px;
  background: url(../../assets/images/v19-10/xiayiji.png) no-repeat;
  background-size: 100% 100%;
}
.eq-para {
  /* width: 33.3333%; */
  display: inline-block;
  padding: 11px 5px 6px;
}
.eq-para p,
.eq-para0 p {
  font-size: 13px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  width: 85px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.eq-para03,
.eq-para0 p {
  width: 80px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: center;
}
.eq-para0 p{
  font-size: 12px;
  zoom: 0.9;
  padding-top: 5px;
}
.eq-para span,
.eq-para0 span {
  margin-top: 6px;
  font-size: 12px;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  transform: scale(0.9);
}
.eq-other-para {
  border-bottom: 1px solid #f9f9f9;
  display: flex;
}
.eq-para0 {
  width: 25%;
  display: inline-block;
  padding: 5px 5px 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
}
.eq-para0 img {
  width: 24px;
  height: 23px;
}
.eq-other-para-p1 {
  background: url(../../assets/images/v19-10/p1.png) no-repeat;
}
.eq-other-para-p3 {
  background: url(../../assets/images/v19-10/p3.png) no-repeat;
}
.eq-other-para-p10 {
  background: url(../../assets/images/v19-10/p10.png) no-repeat;
}
.eq-other-para-p11 {
  background: url(../../assets/images/v19-10/p11.png) no-repeat;
}
.eq-other-para-p61 {
  background: url(../../assets/images/v19-10/p61.png) no-repeat;
}
.eq-other-para-p1038 {
  background: url(../../assets/images/v19-10/p1038.png) no-repeat;
}
.eq-other-para-p1039 {
  background: url(../../assets/images/v19-10/p1039.png) no-repeat;
}
.eq-other-para-p1040 {
  background: url(../../assets/images/v19-10/p1040.png) no-repeat;
}
.eq-other-para-sp {
  width: 24px;
  height: 23px;
  display: inline-block;
  background-size: 100% 100%;
}
</style>

