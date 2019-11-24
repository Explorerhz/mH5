<template>
  <div id="container">
    <div class="bid-type-tab">
      <div>
        <div
          class="special-bid"
          v-bind:class="{active:tabIndex==0}"
          @click="tabSel(0)"
          data-name="special-bid"
        >专场拍</div>
      </div>
      <div style="margin-left: 0.5rem">
        <div
          class="anytime-bid"
          v-bind:class="{active:tabIndex==1}"
          @click="tabSel(1)"
          data-name="anytime-bid"
        >随时拍</div>
      </div>
    </div>

    <section class="banner">
      <div class="dealList">
        <ul>
          <li class="ani1">
            <div>恭喜手机尾号2398的客户喜拍华力重工HL185-7</div>
          </li>
        </ul>
      </div>
      <img
        class="banner-url"
        v-show="tabIndex==1"
         v-if="sspConfig"
        :src="sspConfig.auctionLotBanner"
        :alt="sspConfig.auctionLotBrandName"
        data-linkurl="nolink"
      >
      <img
        class="banner-url"
        v-show="tabIndex==0"
        v-if="zcpBanner"
        :src="zcpBanner.imgPathDto.pathBig"
        :alt="zcpBanner.title"
        data-linkurl="nolink"
      >
      <div class="banner-rule"></div>
    </section>

    <section class="session-list" v-show="tabIndex==0">
      <div id="sessionList">
        <ul class="session-box">
          <li
            v-for="item in zcpList"
            :key="'tabindex0_'+item.id"
            class="session-item-li"
            data-sessionid="92"
            data-auctionlotname="重庆新能源竞拍专场"
          >
            <div class="session-pic">
              <!-- 竞拍中倒计时 -->

              <!-- 准备中倒计时 (距离开始时间24小时内)-->

              <img :src="item.auctionLotLogo" class="img-lazyload session-img">
            </div>
            <div class="session-info">
              <h3>{{item.auctionLotName}}</h3>
              <div class="session-detail">
                <div
                  class="session-time"
                >{{item.startTimeStr}}</div>

                <div v-if="item.statusStr == '已结束'" class="session-status session-status-end">{{item.statusStr}}</div>
                <div v-else class="session-status">{{item.statusStr}}</div>
              </div>
              <div class="session-brand">{{item.auctionLotBrandName}}</div>
            </div>
          </li>
        </ul>
      </div>
      <div class="special-rule">
        <div>竞价原则</div>
        <p>
          专场竞拍/随时拍，
          <span class="strong">出价最高即可获得设备，</span>我们会在竞拍结束后24小时内与您联系，
          您需要在5日内办理提车验车手续，否则视为您自动放弃该设备，我们将不再为您预留该
          设备，同时您缴纳的保证金不予退回。
        </p>
      </div>
    </section>

    <section class="bid-list" v-if="tabIndex==1">
      <!-- tab切换的内容 -->
      <!-- 竞拍中 -->
      <!-- 竞拍中 -->
      <div class="bid-bar">
        <p>
          <span>准备中</span>
          <span class="newUpload"></span>
        </p>
      </div>
      <div id="carList" class="car-bidding-list car-list-maidian">
        <ul>
          <li
            class="car-item-li"
            v-for="(item, index) in sspList"
            :key="'tabindex1_'+item.id+index"
            data-starttime="1561080600"
            data-endtime="1561685400"
            data-auctiongoodid="2651"
            data-eqid="1111991"
            data-startprice="75.0万"
            data-category="挖掘机"
            data-brand="徐工"
            data-mode="XE370D"
            offerpricetime="0"
            @click="carClick(item)"
          >
            <div class="car-pic">
              <div class="car-down-time bidding-car"></div>

              <img :src="item.firstImgPathDto.pathMid" class="img-lazyload pd-img">
            </div>
            <div class="pd-info newPd_info_31">
              <h3>{{item.auctionGoodName}}{{item.startTime}}</h3>
              <div class="car-detail">
                <span
                  class="pd-time"
                >{{item.outDate}}年 | {{item.hours}}小时 | {{item.provinceName}}-{{item.cityName}}</span>
              </div>

              <div class="tjb" v-if="item.tjInsurance==2">
                <img src="../../assets/images/tjb-icon.png" alt>
              </div>

              <div class="jp-price">
                <span class="gold-offer">
                  起拍价
                  <i>{{item.startPriceStr}}</i>
                </span>
                <span class="quoted-price-times">
                  <i class="price-times" data-auctiongoodid="2651">{{item.offerCnt}}</i>
次出价
                </span>
              </div>

              <div v-if="item.showDealLabel" class="deal">
                <img src="../../assets/images/deal.png" alt>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import { buyLogCnt, sspRequest, latest, sucDealGoods } from "@/api/jingPai";
export default {
  components: {},
  mounted() {
    console.log(this.latest);
  },
  methods: {
    tabSel(index) {
      this.tabIndex = index;
      window.scroll(0, 0);
    },
    carClick(item){
        if (true) {
           window.location.href = '/jingpai/bzCarDetail?auctionGoodId='+item.auctionGoodId+"&eqId="+item.id+"&sessionId="+this.latest.items[0].id;
        }else{
            window.location.href = '/jingpai/bzCarDetail?auctionGoodId='+item.auctionGoodId+"&sessionId="+this.latest.items[0].id;
        }
    }
  },
  data() {
    return {
      tabIndex: 1
    };
  },
  async asyncData({ params }) {
    let latest_ = await latest({});
    let sspConfig = {};
    let sspList = [];
    let zcpList = [];
    let zcpBanner = [];
    if (latest_.items.length > 0) {
      let latestSessionId = latest_.items[0].id;
      sspConfig = await sspRequest("/api/app/auction/get/" + latestSessionId);
      sspList = await sspRequest(
        "/api/app/auction/saleEqList/" + latestSessionId
      );
    //   zcpList = await sspRequest(
    //     "/api/app/auction/latest?type=zc"
    //   );

    //   zcpBanner = await sspRequest(
    //     "/api/app/auction/advertisement"
    //   );
    }
    return {
      latest: latest_,
      sspConfig: sspConfig.result,
      sspList: sspList.items,
      sspBanner: {},
      zcpList: zcpList.items,
      zcpBanner: zcpBanner.result,
      gjUsers: []
    };
  }
};
</script>

<style>
.bid-type-tab {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  display: -webkit-flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  background: #fff;
  height: 1rem;
}
.bid-type-tab > div {
  font-family: PingFangSC-Medium;
  font-size: 0.28rem;
  color: #464646;
  height: 0.56rem;
  line-height: 0.56rem;
  width: 1.65rem;
  text-align: center;
}
.bid-type-tab > div .special-bid,
.bid-type-tab > div .anytime-bid {
  display: inline-block;
  width: 1.65rem;
  height: 0.56rem;
  border-radius: 0.28rem;
  text-align: center;
  color: #464646;
  line-height: 0.56rem;
  padding-left: 0.24rem;
}
.bid-type-tab > div .anytime-bid.active {
  background: url(../../assets/images/tab-anytime.png) no-repeat;
  background-size: 100%;
  color: #fff;
  z-index: 2;
}
.bid-type-tab > div .special-bid.active {
  background: url(../../assets/images/tab-special.png) no-repeat;
  background-size: 100%;
  color: #fff;
  z-index: 2;
}
.banner {
  width: 100%;
  height: auto;
  position: relative;
  margin-top: 1rem;
  /* z-index: 999; */
}
.dealList {
  position: absolute;
  z-index: 999;
  left: 0.1rem;
  top: 0.2rem;
  color: #fff;
  font-size: 0.24rem;
}
.dealList ul,
.dealList ul li {
  position: absolute;
  top: 0;
  left: 0;
}
dd,
dl,
dt,
li,
ol,
ul {
  list-style: none;
}
.dealList ul li {
  height: 0.6rem;
  overflow: hidden;
  width: 4.84rem;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 0.25rem;
  opacity: 0;
  z-index: 100001;
}
.dealList li.ani1 {
  animation: twinkling1 0.8s both;
  -webkit-animation: twinkling1 0.8s both;
}
.dealList ul li div {
  width: 4.54rem;
  height: 0.6rem;
  line-height: 0.6rem;
  margin-left: 0.15rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.banner img {
  width: 100%;
  height: auto;
  display: block;
}
.banner .banner-rule {
  width: 0.8rem;
  height: 0.4rem;
  position: absolute;
  right: 0rem;
  top: 0.5rem;
  cursor: pointer;
  background: url(../../assets/images/rule.png);
  background-size: 100%;
}
.session-list {
  background: #0f4179;
  padding-top: 0.2rem;
  /* background: #FE4938; */
  /* margin-top: -1.2rem; */
}
.session-box {
  padding: 0 0.2rem;
}
.session-item-li {
  padding-bottom: 0.2rem;
  position: relative;
  padding-top: 0.2rem;
  overflow: hidden;
  border-width: 0 0 1px;
  display: -webkit-flex;
  display: -webkit-box;
  display: flex;
  background: #fff;
  margin-bottom: 0.23rem;
  border-radius: 0.12rem;
}
.session-pic {
  width: 33%;
  max-width: 2.5rem;
  margin-right: 0.2rem;
  height: 1.88rem;
  overflow: hidden;
  position: relative;
}
.session-pic img {
  padding-left: 0.24rem;
  width: 100%;
  min-height: 100%;
  overflow: hidden;
  position: relative;
  top: 50%;
  -webkit-transform: translate3d(0, -50%, 0);
  transform: translate3d(0, -50%, 0);
}
.session-item-li .session-info {
  height: auto;
  -webkit-box-flex: 1;
  text-align: left;
  position: relative;
  padding-right: 0.2rem;
  width: 66%;
}
.session-info h3 {
  padding-top: 0.1rem;
  color: #4a4a53;
  font-size: 0.3rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-weight: 400;
  width: 4.2rem;
  font-family: PingFangSC-Medium;
}
.session-detail {
  position: relative;
}
.session-info .session-time {
  color: #843900;
  font-size: 0.22rem;
  text-overflow: ellipsis;
  margin: 0.1rem auto 0.2rem;
}
div.session-status-end {
  color: #9e9b9b;
}
.session-status {
  font-family: PingFangSC-Medium;
  color: #fe4938;
  font-size: 0.24rem;
  position: absolute;
  top: 0rem;
  right: 0.2rem;
}
.session-brand {
  color: #843900;
  font-size: 0.24rem;
  font-family: PingFangSC-Regular;
  overflow: hidden;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  /* height: 0.72rem; */
}

.special-rule {
  /* display: none; */
  background: #0f4179;
}

.special-rule div {
  font-family: PingFangSC-Medium;
  font-size: 0.3rem;
  color: #ffffff;
  text-align: center;
  margin: 0.6rem 0 0.3rem 0;
}

.special-rule p {
  font-family: PingFangSC-Regular;
  font-size: 0.26rem;
  color: #ffefef;
  text-align: justify;
  padding: 0 0.3rem;
  padding-bottom: 0.6rem;
}

.bid-list {
  background-color: #0f4179;
  height: 100%;
}

.bid-list .bid-bar {
  height: 1.1rem;
  background: url(../../assets/images/tab-banner.png) no-repeat;
  background-size: 100%;
  margin-bottom: 0.2rem;
}
.bid-list .bid-bar p {
  cursor: pointer;
  color: #fff;
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.bid-list .bid-bar p span {
  font-family: PingFangSC-Regular;
  font-size: 0.34rem;
  display: block;
}
.bid-list .bid-bar p span.newUpload {
  font-size: 0.24rem;
  height: 0.4rem;
  line-height: 0.4rem;
}
.bid-list > div {
  overflow: auto;
  text-align: center;
  font-size: 0.3rem;
  line-height: 0.6rem;
  color: #9ea4af;
  background-size: 100%;
  padding: 0 0.2rem;
  background: #0f4179;
}
.car-bidding-list li {
  margin-bottom: 0.2rem;
  position: relative;
  padding: 0.2rem 0rem;
  overflow: hidden;
  border-width: 0 0 1px;
  display: -webkit-flex;
  display: -webkit-box;
  display: flex;
  background: #fff;
  border-bottom: 1px solid rgba(220, 226, 238, 0.8);
}
.car-pic {
  width: 33%;
  max-width: 2.5rem;
  margin-right: 0.2rem;
  height: 1.88rem;
  overflow: hidden;
  position: relative;
}
.car-pic .bidding-car {
  background-image: linear-gradient(114deg, #ff6844 0%, #ff4544 96%);
}
.car-pic .car-down-time {
  position: absolute;
  top: 0;
  left: 0.24rem;
  height: 0.32rem;
  line-height: 0.32rem;
  padding: 0 0.1rem;
  text-align: center;
  color: #fff;
  font-size: 0.2rem;
  border-radius: 0 0 0.1rem 0;
  z-index: 2;
  font-weight: 300;
}
.car-pic img {
  padding-left: 0.24rem;
  width: 100%;
  min-height: 100%;
  overflow: hidden;
  position: relative;
  top: 50%;
  -webkit-transform: translate3d(0, -50%, 0);
  transform: translate3d(0, -50%, 0);
}
.car-bidding-list li .pd-info {
  width: 66%;
  height: auto;
  -webkit-box-flex: 1;
  text-align: left;
  position: relative;
  padding-right: 0.2rem;
}
.pd-info h3 {
  /* padding-top: .1rem; */
  color: #4a4a53;
  font-size: 0.3rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-weight: 400;
  width: 4.2rem;
}
.newPd_info_31 .car-detail {
  display: -webkit-box;
  /* margin-top: .12rem; */
  font-size: 0;
  height: 0.35rem;
  line-height: 0.35rem;
}
.pd-info .pd-time {
  color: #9ea4af;
  font-size: 0.24rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: block;
}
.tjb {
  height: 0.35rem;
}
.tjb img {
  height: 0.28rem;
  width: 0.76rem;
}
.jp-price {
  /* position: absolute; */
  /* top: .05rem; */
  /* bottom: .5rem; */
  /* left: 0; */
  line-height: 0.5rem;
  margin-top: 0.1rem;
}
.jp-price span {
  position: absolute;
  display: inline-block;
  height: 0.52rem;
  line-height: 0.52rem;
  color: #ff4757;
  /* bottom: -.8rem; */
  font-size: 0.26rem;
}
.gold-offer {
  width: 3.2rem;
  text-align: left;
  left: 0rem;
}
.gold-offer i {
  font-size: 0.32rem;
}
.bid-list .jp-price .quoted-price-times {
  /* width: 3.2rem; */
  /* text-align: right; */
  position: absolute;
  width: 3.2rem;
  text-align: right;
  right: 0.2rem;
}
.quoted-price-times i,
.quoted-price-times em {
  font-size: 0.26rem;
}
.deal {
  position: absolute;
  top: 0.8rem;
  left: 3rem;
}
.deal img {
  width: 1.5rem;
}
</style>
