<template>
  <div class="tj-manager">
    <div class="tj-seller">
      <div class="tj-seller-user" :title="eqTitle+'卖家信息'">
        <span class="tj-seller-pic"></span>
        <span class="tj-seller-title">{{seller.realName}}</span>
      </div>
      <p class="tj-seller-content">{{sellerDes}}</p>
    </div>
    <div class="tj-manager-">
      <div class="tj-manager-user">
        <div class="tj-manager-u">
          <div class="tj-manager-pic" :style="pic"></div>
          <div class="tj-manager-title">
            <span class="tj-manager-title1" :title="eqTitle+'铁甲管家介绍'" @click="manager_">铁甲管家-{{manager.realname}}</span>
            <span class="tj-manager-title2">{{manager.extendsInfo}}</span>
          </div>
        </div>
        <div class="tj-manager-btn">
          <span @click="call">咨询车况</span>
        </div>
      </div>
      <p class="tj-manager-content">{{manager.remark}}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "tj-eq-manager",
  props: {
    sellerDes: String,
    seller: Object,
    manager: Object,
    eqTitle:String
  },
  computed: {
    pic() {
      let s = {};
      if(this.manager && this.manager.imgPathDto && this.manager.imgPathDto.pathOri){
        s.background = `url(${this.manager.imgPathDto.pathOri}) no-repeat`;
        s.backgroundSize = '100% 100%'
      }
      return s;
    }
  },
  methods: {
    close() {
      this.show = false;
    },
    call(){
     this.$emit('md', '咨询车况', '咨询车况')
    },
    manager_() {
      this.$emit('clickM');
      // const {eqId, manager} = this;
      // this.$router.push(
      //   `/html/managerInfoList.html?isSq=false&phone400=13717931785&eqId=${eqId}&equipmentCityId=${manager.ecityId}&employeeId=1286&province=湖南&city=岳阳市`
      // );
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
.tj-manager {
  margin-top: 10px;
  background: #fff;
  overflow: hidden;
}

.tj-manager- {
  border-top: solid 1px #f9f9f9;
  overflow: hidden;
}
.tj-manager-user {
  margin-top: 18px;
  margin: 17px 0 17px 15px;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  justify-content: space-between;
}
.tj-manager-u {
  display: flex;
}
.tj-manager-pic {
  display: inline-block;
  height: 44px;
  width: 44px;
  background: url(../../assets/images/v19-10/user-pic.png) no-repeat;
  background-size: 100% 100%;
}
.tj-seller {
  margin: 17px 0 17px 15px;
  overflow: hidden;
}
.tj-seller-user {
  height: 44px;
  line-height: 44px;
  display: flex;
}
.tj-seller-pic {
  display: inline-block;
  height: 44px;
  width: 44px;
  background: url(../../assets/images/v19-10/user-pic.png) no-repeat;
  background-size: 100% 100%;
}
.tj-seller-title {
  font-size: 14px;
  font-weight: 500;
  color: rgba(74, 74, 83, 1);
  margin-left: 12px;
}
.tj-seller-content {
  margin: 14px 0 18px;
  font-size: 12px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.tj-manager-content {
  font-size: 12px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  margin: 14px 0 13px 15px;
}
.tj-manager-title {
  padding-left: 15px;
}
.tj-manager-title1 {
  font-size: 14px;
  font-weight: 500;
  color: rgba(74, 74, 83, 1);
  display: block;
}
.tj-manager-title1::after {
  content: "";
  display: inline-block;
  width: 5px;
  height: 10px;
  margin-left: 4px;
  background: url(../../assets/images/v19-10/xiayiji.png) no-repeat;
  background-size: 100% 100%;
}
.tj-manager-title2 {
  font-size: 12px;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  transform: scale(0.9);
  display: block;
  margin-top: 5px;
  transform-origin: 0 0;
}
.tj-manager-btn {
  width: 73px;
  height: 28px;
  background: rgba(246, 106, 26, 1);
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
}
.tj-manager-btn span {
  font-size: 12px;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 15px;
  transform: scale(0.9);
  transform-origin: center;
  margin-left: 3px;
}
.tj-manager-btn::before {
  content: "";
  display: inline-block;
  height: 10px;
  width: 10px;
  background: url(../../assets/images/v19-10/callw.png) no-repeat;
  background-size: 100% 100%;
}
</style>

