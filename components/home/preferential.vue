<template>
  <div class="app-preferential">
    <div class="app-p-title">超值特惠</div>
    <div class="app-p-content">
      <div class="app-p-line1">
        <div class="app-p-jpy">
          <a href="https://h5.tiebaobei.com/res/hweb/getCheap.html" title="个人急售二手挖掘机等转让信息" @click.prevent="md($event,'捡便宜')">
            <div class="app-p-txt">
              <span class="app-p-txt-01">捡便宜</span>
              <p class="app-p-txt-02">急售降价设备</p>
            </div>
            <div class="app-p-img app-jpy-img"></div>
          </a>
        </div>
        <div class="app-p-line1-1">
          <div class="app-p-rxjx">
            <a href="/html/burstingCar.html" title="热门二手挖掘机等转让信息" @click.prevent="md($event,'热销机型')">
              <div class="app-p-txt">
                <span class="app-p-txt-01">热销机型</span>
                <p class="app-p-txt-02">老司机最爱的30款设备</p>
              </div>
              <div class="app-p-img app-rxjx-img"></div>
            </a>
          </div>
          <div class="app-p-zqsq">
            <a href="http://h5.tiebaobei.com/res/hweb/moneySpinners.html" title="省钱耐造机型推荐" @click.prevent="md($event,'赚钱神器')">
              <div class="app-p-txt">
                <span class="app-p-txt-01">赚钱神器</span>
                <p class="app-p-txt-02">省钱还耐造</p>
              </div>
              <div class="app-p-img app-zqsq-img"></div>
            </a>
          </div>
        </div>
      </div>
      <div class="app-p-line2">
        <div class="app-p-zxc">
          <a href="/uesearch/准新车/" title="准新车价格二手挖掘机信息" @click.prevent="md($event,'准新车')">
            <div class="app-p-txt1">
              <span class="app-p-txt-01">准新车</span>
              <p class="app-p-txt-02">二手价格买新车</p>
            </div>
            <div class="app-p-img app-zxc-img"></div>
          </a>
        </div>
        <div class="app-p-djjx">
          <a href="/ue/price10/" title="15万以内低价二手挖掘机出售信息" @click.prevent="md($event,'低价精选')">
            <div class="app-p-txt1">
              <span class="app-p-txt-01">低价精选</span>
              <p class="app-p-txt-02">15万内好设备</p>
            </div>
            <div class="app-p-img app-djjx-img"></div>
          </a>
        </div>
        <div class="app-p-jxhw">
          <a href="http://h5.tiebaobei.com/res/hweb/pickedMachine.html" title="铁甲二手机精选二手挖掘机信息大全" @click.prevent="md($event,'精选好挖')">
            <div class="app-p-txt1">
              <span class="app-p-txt-01">精选好挖</span>
              <p class="app-p-txt-02">买它错不了</p>
            </div>
            <div class="app-p-img app-jxhw-img"></div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "tj-home-preferential",
  props: {
    listData: Array
  },
  created() {},
  computed: {
    parseWord() {
      return function(v) {
        let words = v.split(/\n/g);
        let word = v;
        if (words.length == 2) {
          word = `${words[0]}<span>${words[1]}</span>`;
        }
        return word;
      };
    }
  },
  methods: {
     md(event, val){
            this.$emit('click', event, val);
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
.app-preferential {
  background: #fff;
  margin-top: 10px;
  overflow: hidden;
  padding: 15px;
  height: 276px;
}
.app-p-content {
  position: relative;
}
.app-p-jpy,
.app-p-rxjx,
.app-p-zqsq,
.app-p-zxc,
.app-p-djjx,
.app-p-jxhw {
  background: rgba(246, 248, 255, 1);
  position: relative;
}
.app-p-line2 {
  display: flex;
  margin-top: 10px;
}
.app-p-zxc,
.app-p-djjx,
.app-p-jxhw {
  width: 33.33%;
  height: 80px;
}
.app-p-djjx,
.app-p-jxhw {
  margin-left: 10px;
}
.app-p-jpy {
  height: 123px;
  width: 40%;
  float: left;
}
.app-preferential a{
    display: block;
    width: 100%;
    height: 100%;
}
.app-p-line1 {
  padding: 15px 0 0;
  overflow: hidden;
}
.app-p-line1-1 {
  height: 123px;
  width: 60%;
  float: left;
  padding-left: 10px;
}
.app-p-rxjx {
  width: 100%;
  height: 57px;
}
.app-p-zqsq {
  width: 100%;
  height: 57px;
  margin-top: 10px;
}
.app-p-txt {
  position: absolute;
  top: 0;
  left: 0;
  padding: 15px 0 0 8px;
}
.app-p-txt-01 {
  height: 13px;
  font-size: 13px;
  font-weight: 500;
  color: rgba(68, 68, 68, 1);
  line-height: 13px;
}
.app-p-txt-02 {
  margin-top: 4px;
  height: 10px;
  font-size: 10px;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  line-height: 10px;
}
.app-p-img {
  position: absolute;
  right: 0;
  bottom: 0;
}
.app-jpy-img {
  width: 93px;
  height: 74px;
  background: url(../../assets/images/v19-10/jianpianyi.png) no-repeat;
  background-size: 100%;
}
.app-rxjx-img {
  right: 13px;
  bottom: 6px;
  width: 44px;
  height: 46px;
  background: url(../../assets/images/v19-10/rexiao.png) no-repeat;
  background-size: 100%;
}
.app-zqsq-img {
  right: 13px;
  bottom: 6px;
  width: 44px;
  height: 46px;
  background: url(../../assets/images/v19-10/shenqi.png) no-repeat;
  background-size: 100%;
}
.app-p-txt1 {
  position: absolute;
  top: 0;
  left: 0;
  padding: 8px 0 0 8px;
}
.app-zxc-img {
  width: 52px;
  height: 36px;
  background: url(../../assets/images/v19-10/zhunxinche.png) no-repeat;
  background-size: 100%;
}
.app-djjx-img {
  width: 52px;
  height: 36px;
  background: url(../../assets/images/v19-10/dijia.png) no-repeat;
  background-size: 100%;
}
.app-jxhw-img {
  width: 52px;
  height: 36px;
  background: url(../../assets/images/v19-10/jingxuanhaowa.png) no-repeat;
  background-size: 100%;
}
</style>

