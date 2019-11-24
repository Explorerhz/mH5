<template>
  <div id="pageContent">
    <section id="detailContent" class="centerContentPageStyle">
      <div class="swiper-container swiper-container-horizontal" id="swiperList">
        <img class :src="latest[0].imgPathDto.pathBig" style>
      </div>

      <div class="bid-info clearfix">
        <div class="bid-info-left">
          <span class="bid-info-startPrice">起拍价：75.0万</span>
          <br>
          <span class="bid-info-hammer">
            <img src="../../assets/images/cz-hammer.png" alt>
            <i>0</i>次出价
          </span>
        </div>
        <div class="bid-info-right">
          <div class="bid-info-clock">
            <img src="../../assets/images/jp-clock.png" alt>
          </div>
          <div class="bid-info-finish">
            距离结束仅剩
            <br>
            <span class="count-down">94小时12分48秒</span>
          </div>
        </div>
      </div>

      <section class="carMainInfo">
        <h1>
          {{saleEqDetail.result.auctionGood.auctionGoodName}}
          <em>（编号{{saleEqDetail.result.auctionGood.id}}）</em>
        </h1>
        <div class="offer-price">
          <div class="offer-hight">出价后可查看最高出价</div>
          <div class="offer-my">您尚未出价</div>
        </div>
      </section>

      <serviceRate></serviceRate>
      <inspection :listData="[]"></inspection>
      <jpFlow></jpFlow>
      <equipImage :listData="latest"></equipImage>
    </section>

    <jingPaiList :listData="otherList.items"></jingPaiList>
    <section class="offerInput" @click="jingPaiAct()">
      <span>我要竞拍</span>
    </section>
    <loginWin
      :eqId="eqId"
      :auctionGoodId="auctionGoodId"
      :host="host"
      :show="loginShow"
      @closeWin="closeWin"
    ></loginWin>
  </div>
</template>

<script>
import loginWin from "@/components/loginWin.vue";
import jingPaiList from "@/components/jingPaiList.vue";
import equipImage from "@/components/equipImage.vue";
import inspection from "@/components/inspection.vue";
import jpFlow from "@/components/jpFlow.vue";
import serviceRate from "@/components/serviceRate.vue";
import { sspRequest } from "@/api/jingPai";
import { mapGetters } from "vuex";
export default {
  components: {
    loginWin,
    jingPaiList,
    equipImage,
    inspection,
    jpFlow,
    serviceRate
  },
  mounted() {
  },
  computed: {
    ...mapGetters("user", ["user"])
  },
  methods: {
    jingPaiAct() {
      if (!this.user.jishou_uid) {
        this.loginShow = 1;
      } else {
        alert("竞拍成功!");
      }
    },
    closeWin() {
      this.loginShow = 0;
    }
  },
  data() {
    return {
      loginShow: 0,
      host: "web"
    };
  },
  async asyncData({ req, res }) {
    let latest_ = [];
    let otherList = [];
    let eqBasicDetail = {};
    let saleEqDetail = {};
    let getInspectReport = {};
    //console.log(req.query.eqId);
    //console.log(req.query.sessionId);
    try {
      latest_ = await sspRequest("/api/app/eqImages/" + req.query.eqId);
      otherList = await sspRequest(
        "/api/app/auction/saleEqList/" + req.query.sessionId
      );
      // eqBasicDetail = await sspRequest(
      //     "/api/app/eqBasicDetail/" + req.query.eqId
      // );
      saleEqDetail = await sspRequest(
        "/api/app/auction/saleEqDetail/" + req.query.auctionGoodId
      );
      // getInspectReport = await sspRequest(
      //     "/api/app/getInspectReport",
      //     {eqId:req.query.eqId}
      // );
    } catch (e) {
      console.log(e);
    }

    return {
      auctionGoodId: req.query.auctionGoodId,
      eqId: req.query.eqId,
      latest: latest_,
      otherList: otherList,
      eqBasicDetail: eqBasicDetail,
      saleEqDetail: saleEqDetail,
      getInspectReport: getInspectReport
    };
  }
};
</script>

<style>
@media screen and (min-width: 320px) {
  html {
    font-size: 16px;
  }
}

@media screen and (min-width: 360px) {
  html {
    font-size: 18px;
  }
}

@media only screen and (min-width: 375px) and (max-width: 383px) and (orientation: portrait) {
  html {
    font-size: 18.75px;
  }
}

@media only screen and (min-width: 384px) and (max-width: 413px) and (orientation: portrait) {
  html {
    font-size: 19.2px;
  }
}

@media only screen and (min-width: 414px) and (max-width: 736px) and (orientation: portrait) {
  html {
    font-size: 20.7px;
  }
}
#detailContent {
  background-color: #f6f6f6;
  padding-bottom: 2.61333rem;
}
#detailContent #swiperList {
  height: 14.93333rem;
  overflow: hidden;
}
.bid-info {
  width: 100%;
  height: 2.67rem;
  background: url(../../assets/images/tab-bg-init.png);
  background-size: 100%;
  font-size: 0.64rem;
  color: #fff;
}
.bid-info .bid-info-left {
  float: left;
  height: 2.67rem;
  width: 12.133rem;
  padding-left: 0.88rem;
  margin-top: 0.2133rem;
}
.bid-info .bid-info-left .bid-info-startPrice {
  font-size: 0.9rem;
  padding-top: 0.2133rem;
}
.bid-info-left .bid-info-hammer {
  display: inline-block;
  height: 0.5333rem;
  font-weight: 300;
}
.bid-info-left .bid-info-hammer img {
  height: 0.5333rem;
  width: 0.5333rem;
}
.bid-info .bid-info-right {
  margin-top: 0.34rem;
  float: left;
  height: 1.84rem;
  border-left: 1px solid #fff7f0;
  position: relative;
  font-weight: 300;
  font-size: 0.5867rem;
}
.bid-info-right .bid-info-clock {
  position: absolute;
  top: 0.34rem;
  left: 0.48rem;
  width: 1.2667rem;
  height: 1.256rem;
}
.bid-info-right .bid-info-finish {
  margin-left: 2rem;
}

.clearfix:after {
  visibility: hidden;
  display: block;
  font-size: 0;
  content: " ";
  clear: both;
  height: 0;
}
img {
  width: 100%;
  display: inline-block;
  -webkit-touch-callout: none;
}
#detailContent .carMainInfo {
  margin-bottom: 0.5rem;
  position: relative;
}
.bg_color_fff,
#headScroll,
.carMainInfo,
.self-assurance,
.carGuarantee,
.carReadme,
.carBasic,
.circumstances,
.carCheckout,
.carImages,
.tj_steward,
.day5Out,
#assessmentId,
.intelligentFindcar,
.carSource {
  background-color: #fff;
}
#detailContent .carMainInfo h1 {
  font-size: 0.90667rem;
  color: #1e1e1e;
  padding: 0.8rem 0.53333rem 0;
}
#detailContent .carMainInfo h1 em {
  margin-left: 0.53333rem;
  font-size: 0.74667rem;
  line-height: 0.90667rem;
  color: #486cdc;
  font-weight: normal;
}
em,
i {
  font-style: normal;
}
#pageContent .carMainInfo .offer-price {
  height: 1.5rem;
  line-height: 1.5rem;
  padding: 0 0.5rem;
}
#pageContent .carMainInfo .offer-price .offer-hight {
  float: left;
}
#pageContent .carMainInfo .offer-price div {
  font-size: 0.747rem;
  color: #ff4544;
}
#pageContent .carMainInfo .offer-price .offer-my {
  float: right;
}
#pageContent .carMainInfo .offer-price div {
  font-size: 0.747rem;
  color: #ff4544;
}
#pageContent .fidelityBox {
  width: 100%;
  margin: 0.53333rem 0;
  background: #ffffff;
  padding: 0.53333rem 0.53333rem 0.53333rem 0;
}
#pageContent .fidelityBox .serviceRate {
  position: relative;
}
header.title {
  width: 100%;
  height: 2.4rem;
  line-height: 2.4rem;
  font-size: 0.8rem;
  padding-left: 0.53333rem;
  position: relative;
}
header.title:before {
  content: "";
  height: 0.69333rem;
  border-left: 0.08rem solid #4e8bed;
  position: absolute;
  left: 0;
  top: 50%;
  -webkit-transform: translate(0, -50%);
  transform: translate(0, -50%);
}
.fidelityBox .serviceType {
  width: 100%;
  overflow: hidden;
}
.fidelityBox .serviceType .iconSingleNew {
  width: 33.333%;
  float: left;
  height: 2.50667rem;
}
.iconSingleNew .img {
  margin: auto 0 auto 0.53333rem;
  display: inline-block;
}
.iconSingleNew .img img {
  width: 1.17333rem;
  vertical-align: middle;
  display: inline-block;
}
.iconSingleNew .img span {
  font-size: 0.64rem;
  color: #6a6a77;
}

header.title span {
  color: #a0a6b1;
  font-size: 0.64rem;
  padding: 0;
}
</style>
