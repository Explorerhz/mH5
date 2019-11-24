<template>
  <div class="container_">
    <client-only>
      <tj-down-app md="详情页"></tj-down-app>
      <div class="tj-nav" v-show="showNav">
        <span :class="{active:tabIndex===0}" @click="tab($event,0)">设备介绍</span>
        <span :class="{active:tabIndex===1}" @click="tab($event,1)" v-if="report_.reportId">看车报告</span>
        <span :class="{active:tabIndex===2}" @click="tab($event,2)">设备实拍</span>
        <div class="tj-nav-back" @click.stop="back"></div>
      </div>
    </client-only>
    <div class="tj-swiper--">
      <tj-swiper class="detail-banner-ad" :autoplay="true" @change="onChange" v-if="images">
        <tj-swiper-item v-for="(image, index) in images" :key="index">
          <img
            v-if="image.imgPathDto"
            v-lazy="image.imgPathDto.pathMid"
            @click="banner(image, index)"
            :alt="eqTitle+'-'+image.photoDotDesc+'实拍图-'+image.photoPosition"
          />
          <img
            v-else
            v-lazy="image.imgPath"
            @click="banner(image, index)"
            :alt="eqTitle+'-'+image.photoDotDesc+'实拍图-'+image.photoPosition"
          />
          <em v-if="image.videoUrl" class="video-icon"></em>
        </tj-swiper-item>
        <div class="indicator" slot="indicator">
          <span>{{ current + 1 }}/{{images.length}}</span>
        </div>
      </tj-swiper>
      <div class="tj-back" @click.stop="back"></div>
      <client-only>
        <tj-home-buyer :listData="sucOrder"></tj-home-buyer>
      </client-only>
    </div>
    <div class="detail-title">
      <div
        class="detail-state"
        v-if="detail.equipment.status == 4 || detail.equipment.status == 5"
        :class="{'detail-state-cj':detail.equipment.status == 4,'detail-state-xj':detail.equipment.status == 5}"
      ></div>
      <div class="d-title">
        <h1>{{detail.equipment.brand}}{{detail.equipment.model}}{{detail.equipment.category}}</h1>
      </div>
      <div class="d-tags">
        <span
          class="d-tag"
          v-for="(tag, index) in detail.equipment.labelList"
          :key="'p-tag'+tag+index"
        >{{tag}}</span>
        <a
          class="d-tag-tjb"
          @click.prevent="E25_EVENT_TJB($event, '铁甲保详情')"
          href="https://h5.tiebaobei.com/res/hweb/activity/yunyinghuodong/spe1030_hunan/index.html"
        ></a>
      </div>
      <div class="d-price">
        <span class="d-p-red">{{detail.equipment.formatPrice}}</span>
        <span class="d-p-red1">万</span>
        <span class="d-p-reduced">{{detail.equipment.originStr}}</span>
        <span class="d-p-zixun" @click="btnCall('咨询低价', '咨询低价')">咨询低价</span>
      </div>
      <div class="d-stages" v-if="detail.equipment.downPaymentStr" :title="eqTitle+'分期贷款'">
        <div class="d-stages-0">
          <span class="fq-img"></span>
          首付
          <span class="fq-sf">{{detail.equipment.downPaymentStr}}</span>万&nbsp;马上提回家
        </div>
        <span class="fq-fa" @click="fenqi">分期方案</span>
      </div>
    </div>
    <tj-eq-info :detail="detail" @md="E25_EVENT"></tj-eq-info>
    <tj-eq-manager
      @clickM="manager_"
      :seller="seller"
      :sellerDes="detail.equipment.des"
      :manager="manager"
      @md="btnCall"
      :eqTitle="eqTitle"
    ></tj-eq-manager>
    <client-only>
      <tj-eq-report :report="report_" :eqId="eqId" @md="E25_EVENT" :eqTitle="eqTitle"></tj-eq-report>
    </client-only>
    <tj-eq-photos :images="photos" @md="E25_EVENT" :eqTitle="eqTitle" :eqId="eqId"></tj-eq-photos>
    <div class="goumai-">
      <div class="comm-title m-t-b">
        <div class="app-p-title" :title="eqTitle+'-购买流程介绍'">购买流程</div>
      </div>
      <div class="gm-lc">
        <div class="gm-lc-bar"></div>
        <div class="gm-lc-num">
          <span class="gm-lc-num1"></span>
          <span class="gm-lc-num2"></span>
          <span class="gm-lc-num3"></span>
          <span class="gm-lc-num4"></span>
        </div>
        <div class="gm-lc-txt">
          <div class="gm-lc-txt1">
            电话咨询
            <br />专业答疑
          </div>
          <div class="gm-lc-txt1">
            管家带看
            <br />现场试车
          </div>
          <div class="gm-lc-txt1">
            签定协议
            <br />购机放心
          </div>
          <div class="gm-lc-txt1">
            交易完成
            <br />后续服务
          </div>
        </div>
      </div>
    </div>
    <tj-eq-list
      v-if="recommend.length>0 || sameBrandRecommend.length>0"
      :newList="recommend"
      :reduceList="sameBrandRecommend"
      @callType="callDj"
    ></tj-eq-list>
    <tj-eq-recommend
      v-if="detail.equipment.status == 4 || detail.equipment.status == 5"
      :listData="recommend"
      :detail="detail"
    ></tj-eq-recommend>
    <div class="find_eq">
      <p class="find_eq_1">没找到您想要的设备？</p>
      <p class="find_eq_2">提交您的需求，我们帮您找</p>
      <a href="/html/lookForEq.html?formDetail=true" @click.prevent="E25_EVENT($event, '智能找车')">
        <span class="find_eq_3">智能找车</span>
      </a>
    </div>
    <tj-eq-all-say :listData="zhengjiData" :eqTitle="eqTitle"></tj-eq-all-say>
    <tj-seo :listData="seo_"></tj-seo>
    <div class="jubao_eq">
      如设备信息有误，请
      <a :href="'/ue/complaint/'+eqId" @click.prevent="E25_EVENT($event, '举报设备')">举报该设备</a>
    </div>
    <tj-free-phone ref="free_phone" />
    <tj-up ref="tj_up"></tj-up>
    <tj-bottom-bar
      :eqTile="detail.equipment.brand+detail.equipment.model+detail.equipment.category+''"
      :eqUrl="'https://m.tiebaobei.com'"
      :eqLabel="detail.equipment.formatPrice+'万'"
      :eqPic="image0"
      :reduction="true"
      @md="btnCall"
      @mdJj="E25_"
    ></tj-bottom-bar>
    <tj-eq-price-reduction ref="price_reduction"></tj-eq-price-reduction>
  </div>
</template>

<script>
import DownApp from "@/components/common/down-app";
import Swiper from "@/components/ui/swiper";
import SwiperItem from "@/components/ui/swiper/swiper-item";
import Info from "@/components/equipment/info";
import Manager from "@/components/equipment/manager";
import Report from "@/components/equipment/report";
import Photos from "@/components/equipment/photos";
import List from "@/components/equipment/list";
import ProductList from "@/components/common/product-list";
import AllSay from "@/components/equipment/all-say";
import BottomBar from "@/components/equipment/bottom-bar";
import Recommend__ from "@/components/equipment/recommend";
import PriceReduction from "@/components/equipment/price-reduction";
import Seo from "@/components/home/seo";
import FreePhone from "@/components/common/free-phone";
import Up from "@/components/common/up";
import Buyer from "@/components/equipment/buyer";
import { getCallType, seo } from "@/api/index";
import { E4, E5, E124, E25, E26 } from "@/util/maidian";
import {
  eqBasicDetail,
  eqImages,
  eqseller,
  eqManager,
  getInspectReport,
  eqSameBrandRecommend,
  eqRecommend,
  zhengji,
  getLatestSucOrder,
  consultCnt
} from "@/api/eqDetail";
import { pubDate, pageBack, scrollRestoration } from "@/util/page.js";
import { allSettled } from "@/util/promise-all.js";
import { getRandomNum } from "@/util/common";
let SHOW_FLAG = false;
let SHOW_BAR_FLAG = false;
export default {
  components: {
    [Swiper.name]: Swiper,
    [SwiperItem.name]: SwiperItem,
    [Info.name]: Info,
    [Manager.name]: Manager,
    [Report.name]: Report,
    [Photos.name]: Photos,
    [List.name]: List,
    [ProductList.name]: ProductList,
    [AllSay.name]: AllSay,
    [Seo.name]: Seo,
    [FreePhone.name]: FreePhone,
    [BottomBar.name]: BottomBar,
    [Buyer.name]: Buyer,
    [DownApp.name]: DownApp,
    [Recommend__.name]: Recommend__,
    [PriceReduction.name]: PriceReduction,
    [Up.name]: Up
  },
  head() {
    const eqTitle =
      this.detail.equipment.brand +
      this.detail.equipment.model +
      this.detail.equipment.category;
    const tfd = this.detail.equipment.cityName;
    const tfdd = tfd + "二手" + eqTitle;
    let i0 = "";
    if (this.images.length > 0 && this.images[0].imgPathDto) {
      i0 = this.images[0].imgPathDto.pathMid;
    }
    return {
      title: `${tfdd}-转让报价信息-实拍图片-铁甲二手机`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: `铁甲二手机为您提供${tfd}二手${eqTitle}的转让价格信息，设备信息真实可靠！更可选择分期购买！通过本页面您可了解到关于${tfd}二手${eqTitle}的全部信息：表现小时数${this.detail.equipment.hours}小时，停放在${tfd}，以及设备实拍图片、报价等。铁甲二手机平台拥有更多关于${tfd}二手${eqTitle}及其相关的买卖交易信息供您选择，让您更快买到合适设备！`
        },
        {
          hid: "keywords",
          name: "keywords",
          content: `${eqTitle},${eqTitle}价格,二手${eqTitle},二手${eqTitle}报价,${eqTitle}转让,${tfd}${eqTitle}`
        }
      ],
      link: [
        { rel: "canonical", href: "https://www.tiebaobei.com/" + this.url_ },
        { rel: "miphtml", href: "https://mip.tiebaobei.com/" + this.url_ }
      ],
      script: [
        //{src:'https://res.wx.qq.com/open/js/jweixin-1.3.2.js'},
        {
          type: "application/ld+json",
          charset: "utf-8",
          json: {
            "@context": "https://ziyuan.baidu.com/contexts/cambrian.jsonld",
            "@id": "https://m.tiebaobei.com/" + this.url_,
            appid: "1590644726714965",
            title: `${tfdd}-转让报价信息-实拍图片-铁甲二手机`,
            images: [i0],
            pubDate: `${pubDate}`
          }
        }
      ]
    };
  },
  mounted() {
    // console.log(this.images);
    console.log(this.photos);
    // console.log(this.manager);
    // console.log(this.report_);
    this.initData();
    document.addEventListener("scroll", this.scrollEvent);
    this.$nextTick(() => {
      this.getPosition();
      scrollRestoration();
    });
  },
  destroyed() {
    window.removeEventListener("scroll", this.scrollEvent);
  },
  computed: {
    image0() {
      let i0 = "";
      if (this.images.length > 0 && this.images[0].imgPathDto) {
        i0 = this.images[0].imgPathDto.pathMid;
      }
      return i0;
    }
  },
  methods: {
    async initData() {
      const report_ = await getInspectReport({ eqId: this.eqId });
      if (report_.ret === "0") {
        this.report_ = report_.result;
        setTimeout(() => {
          this.getPosition();
        }, 1000);
      }
      // const recommend_ = await eqRecommend(this.eqId, {});
      // if (recommend_.ret == 0) {
      //   this.recommend = recommend_.items;
      // }
      // const sameBrandRecommend_ = await eqSameBrandRecommend(this.eqId, {});
      // if (recommend_.ret == 0) {
      //   this.sameBrandRecommend = sameBrandRecommend_.items;
      // }
      // console.log(recommend_, sameBrandRecommend_);
      // console.log(this.recommend);
      // console.log(this.sameBrandRecommend);
      const reslut = await zhengji({ modelId: this.detail.equipment.modelId });
      // console.log(reslut);
      if (reslut.ret == 0) {
        this.zhengjiData = reslut.result;
        console.log(this.zhengjiData);
      }

      const sucOrder = await getLatestSucOrder({});
      this.sucOrder = sucOrder.result;

      const a = getRandomNum(1e4, 99999) + "$" + sa.store.getDistinctId();
      let params = {
        channel: 6,
        eqId: this.eqId,
        distinctId: sa.store.getDistinctId(),
        uniqueSymbol: a,
        pageFromType: "L",
        channelCodeFlag: "m.tiebaobei.com",
        commitChannelCodeFlag: "m.tiebaobei.com"
      };
      const ct__ = await getCallType(params);
      if (ct__.ret == 0) {
        this.callType_ = ct__.result.callType;
      }
      const cut = await consultCnt({ eqId: this.eqId });
      if (cut.ret == 0) {
        this.peopleNum = cut.result;
      }
    },
    btnCall(str, mdStr) {
      this.btnStr = str;
      const a = getRandomNum(1e4, 99999) + "$" + sa.store.getDistinctId();
      let params = {
        channel: 6,
        eqId: this.eqId,
        distinctId: sa.store.getDistinctId(),
        uniqueSymbol: a,
        pageFromType: "L",
        channelCodeFlag: "m.tiebaobei.com",
        commitChannelCodeFlag: "m.tiebaobei.com"
      };
      this.callType(params, 1, this.peopleNum);
      if (mdStr) {
        this.E25_(mdStr);
      }
    },
    callDj(params) {
      this.btnStr = "询底价";
      this.callType(params);
    },
    async callType(params, txtType, peopleNum) {
      this.call(this.callType_, params, txtType, peopleNum);
    },
    call(v, params, txtType, peopleNum) {
      if (v == 1) {
        this.E4_(null, this.btnStr);
        this.$refs.free_phone.open(null, txtType, peopleNum);
      } else {
        this.E4_(null, this.btnStr);
        this.$refs.free_phone.open(params, txtType, peopleNum);
      }
    },
    getPosition() {
      const info = document.getElementById("tj-eq-info-01");
      const report = document.getElementById("tj-report-02");
      const photos = document.getElementById("tj-photos-03");
      if (info) {
        this.nav1 = info.offsetTop;
        this.nav1_1 = this.nav1 + info.offsetHeight;
      }
      if (report) {
        this.nav2 = report.offsetTop;
        this.nav2_1 = this.nav2 + report.offsetHeight;
      }
      // console.log("report===", this.nav2, );
      if (photos) {
        this.nav3 = photos.offsetTop;
        this.nav3_1 = this.nav3 + photos.offsetHeight;
      }

      console.log(this.nav1, this.nav1_1, this.nav2, this.nav2_1, this.nav3);
    },
    scrollEvent(e) {
      const { nav1, nav1_1, nav2, nav2_1, nav3, nav3_1 } = this;
      const clientHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      // console.log(scrollTop, nav1);
      if (scrollTop > clientHeight) {
        SHOW_FLAG = true;
      } else {
        SHOW_FLAG = false;
      }

      if (scrollTop > nav1) {
        SHOW_BAR_FLAG = true;
      } else {
        SHOW_BAR_FLAG = false;
      }

      if (SHOW_BAR_FLAG != this.showNav) {
        this.showNav = SHOW_BAR_FLAG;
      }

      if (this.$refs.tj_up && this.$refs.tj_up.backToTopShow != SHOW_FLAG) {
        this.$refs.tj_up & (this.$refs.tj_up.backToTopShow = SHOW_FLAG);
      }

      if (nav1 > 0 && scrollTop > nav1 && scrollTop < nav1_1) {
        this.tabIndex = 0;
      }

      if (nav2 > 0 && scrollTop > nav2 && scrollTop < nav2_1) {
        this.tabIndex = 1;
      }

      if (nav3 > 0 && scrollTop > nav3) {
        this.tabIndex = 2;
      }
    },
    back() {
      pageBack();
    },
    tab(event, index) {
      const { nav1, nav2, nav3 } = this;
      this.tabIndex = index;
      let top = -45;
      if (index == 1) {
        top += nav2;
      } else if (index == 2) {
        top += nav3;
      } else {
        top = nav1;
      }
      if (document.body && document.body.scrollTop){
        document.body.scrollTop = top;
      }else{
        document.documentElement.scrollTop = top;
      }
      
    },
    E124_(page) {
      E124(page);
    },
    E4_(event, button) {
      let href = null;
      if (event) {
        href = event.currentTarget.href;
      }
      E4("设备详情页", button, () => {
        if (href) {
          window.location.href = href;
        }
      });
    },
    E5_(action_id, action_url) {
      E5(action_id, action_url);
    },
    E25_(button_name, cb) {
      E25(this.eqId, "设备详情页", button_name, cb);
    },
    E25_EVENT_JBSB(event, button_name){
      this.E25_EVENT(null, button_name, ()=>{
        this.$router.push('/ue/complaint/'+this.eqId);
      })
    },
    E25_EVENT(event, button_name, cb) {
      let href = null;
      if (event) {
        href = event.currentTarget.href;
      }
      // console.log(href, button_name);
      this.E25_(button_name, () => {
        if (href) {
          window.location.href = href;
        }
        cb && cb();
      });
    },
    E25_EVENT_TJB(event, button_name, cb) {
      let href = null;
      if (event) {
        href = event.currentTarget.href;
      }
      // console.log(href, button_name);
     E25(this.eqId, "铁甲保详情", "", () => {
        if (href) {
          window.location.href = href;
        }
        cb && cb();
      });
    },
    E26_(img, cb) {
      E26(
        img.imgId,
        img.videoUrl ? "视频" : "设备图片",
        img.photoImgDesc ? img.photoImgDesc : "",
        cb
      );
    },
    onChange(index, autoplay) {
      this.current = index;
      if (!autoplay) {
        const img = this.images[index];
        this.E26_(img);
      }
    },
    manager_() {
      const { eqId, manager, detail } = this;
      let isSq = false;
      if (
        detail.equipment.status == 4 ||
        detail.equipment.status == 5 ||
        detail.equipment.expiredStatus == 3
      ) {
        isSq = true;
      }
      this.E25_("查看管家详细信息", () => {
        window.location.href = `/html/managerInfoList.html?isSq=${isSq}&phone400=${manager.workMobile}&eqId=${eqId}&equipmentCityId=${detail.equipment.ecityId}&employeeId=${manager.id}&province=${detail.equipment.province}&city=${detail.equipment.city}`;
      });
    },
    banner(img, index) {
      this.E25_("banner图片", () => {
        //this.$router.push(`/ue/preview/${this.eqId}?num=${index}`);
        window.location.href = `/ue/preview/${this.eqId}?num=${index}`;
      });
    },
    fenqi() {
      this.E25_("查看金融详情", () => {
        window.location.href = "/html/loanDetail.html?eqId=" + this.eqId;
      });
    }
  },
  async asyncData({
    isDev,
    route,
    store,
    env,
    params,
    query,
    req,
    res,
    redirect,
    error
  }) {
    const time_ = Date.now();
    const reg = /^\/ue\/.+_(\d+)\.html$/;
    const eqId = reg.exec(route.path)[1].trim();
    const url = route.path;
    // console.log("eqId=", eqId);
    let detail = { equipment: { orderAttrbute: {} } };
    let images = [];
    let photos = [];
    let seo_ = [];
    let seller = {};
    let manager = {};
    let report = {};
    let recommend = [];
    let sameBrandRecommend = [];

    const result = await allSettled([
      eqImages(eqId, { containsVideo: true }),
      eqBasicDetail(eqId, {}),
      seo({ equipmentId: eqId }),
      eqseller(eqId, {}),
      eqManager(eqId, {}),
      // getInspectReport({ eqId: eqId }),
      eqRecommend(eqId, {}),
      eqSameBrandRecommend(eqId, {})
    ]).catch(function(err) {
      console.log("detail 请求出错了" /*, err.messge*/);
    });

    if (result) {
      // console.log(result[0].result);
      if (result[0].status == 200 && result[0].result.ret === "0") {
        images = result[0].result.result;
        let num = 0;
        const leng = images.length;
        // console.log(leng);
        for(let i=0; i< leng; i++){
          const im = images[i];
          // console.log(im);
          if(!im.videoUrl){
            photos.push(im);
            num++;
          }
          if(num==3)break;
        }
        // console.log(photos);
      } else {
        error({ statusCode: 500, message: "Post not found" });
      }
      if (result[1].status == 200 && result[1].result.ret === "0") {
        detail = result[1].result.result;
      }

      if (result[2].status == 200 && result[2].result.ret === "0") {
        seo_ = result[2].result.result;
      }

      if (result[3].status == 200 && result[3].result.ret === "0") {
        seller = result[3].result.result;
      }

      if (result[4].status == 200 && result[4].result.ret === "0") {
        manager = result[4].result.result;
      }

      if (result[5].status == 200 && result[5].result.ret === "0") {
        recommend = result[5].result.items;
      }

      if (result[6].status == 200 && result[6].result.ret === "0") {
        sameBrandRecommend = result[6].result.items;
      }

      // if (result[5].ret === "0") {
      //   report = result[5].result;
      // }
      // //console.log(result[6]);
      // //if (result[6].ret === "0") {
      // recommend = result[6];
      // //}
      // //console.log(result[7]);
      // //if (result[7].ret === "0") {
      // sameBrandRecommend = result[7];
      // //}
    }

    let eqTitle = "";

    if (detail.equipment.cityName) {
      eqTitle =
        detail.equipment.cityName +
        "二手" +
        detail.equipment.brand +
        detail.equipment.model +
        detail.equipment.category;
    }

    // console.log("eqTitle=", eqTitle);
    const duration = Date.now() - time_;
    console.log('detail='+duration+"ms");
    return {
      eqId: eqId,
      detail: detail,
      images: images,
      photos:photos,
      seo_: seo_,
      seller: seller,
      manager: manager,
      report_: report,
      recommend: recommend,
      sameBrandRecommend: sameBrandRecommend,
      url_: url,
      eqTitle: eqTitle
    };
  },
  data() {
    return {
      title: "Hello World!",
      current: 0,
      images: [],
      photos: [],
      detail: { equipment: {} },
      zhengjiData: [],
      tabIndex: 0,
      showNav: false,
      nav1: 0,
      nav2: -1,
      nav3: 0,
      nav1_1: 0,
      nav2_: -1,
      nav3_: 0,
      sucOrder: [],
      recommend: [],
      btnStr: "",
      peopleNum: 10,
      callType_: 1,
      report_: {}
    };
  }
};
</script>

<style>
.container_ {
  background: #f9f9f9;
  overflow: hidden;
}
.detail-banner-ad,
.detail-banner-ad img {
  height: 210px;
  width: 100%;
}
.indicator {
  color: rgba(255, 255, 255, 1);
  text-align: center;
  position: absolute;
  bottom: 10px;
  left: 16px;
  width: 41px;
  height: 17px;
  line-height: 17px;
  background: rgba(0, 0, 0, 0.54);
  border-radius: 9px;
}
.indicator span {
  font-size: 12px;
  transform: scale(0.9);
  display: block;
  height: 17px;
  line-height: 17px;
}
.detail-title {
  background: #fff;
  padding: 9px 15px 15px;
  position: relative;
}
.detail-state {
  position: absolute;
  top: 10px;
  right: 30px;
  width: 80px;
  height: 80px;
  z-index: 999;
}
.detail-state-cj {
  background: url(../../../assets/images/v19-10/ycj@2x.png) no-repeat;
  background-size: 100% 100%;
}
.detail-state-xj {
  background: url(../../../assets/images/v19-10/yxj@2x.png) no-repeat;
  background-size: 100% 100%;
}
.d-title h1 {
  font-size: 16px;
  font-weight: 500;
  color: rgba(74, 74, 83, 1);
}
.d-tags {
  margin-top: 7px;
  position: relative;
  padding-right: 20px;
}
.d-tag {
  font-size: 13px;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  margin-right: 10px;
  white-space: nowrap;
  display: inline-block;
}
.d-tag-tjb {
  position: absolute;
  right: 0;
  top: -5px;
  width: 26px;
  height: 26px;
  background: url(../../../assets/images/v19-10/gengduo.png) no-repeat;
  background-size: 16px 4px;
  background-position: center;
}
.d-tag::before {
  content: "";
  display: inline-block;
  width: 11px;
  height: 11px;
  background: url(../../../assets/images/v19-10/duigou.png) no-repeat;
  background-size: 100% 100%;
  margin-right: 4px;
}
.d-price {
  margin-top: 11px;
  position: relative;
  font-size: 14px;
  color: rgba(255, 71, 87, 1);
}
.d-p-red {
  font-size: 25px;
  font-weight: 500;
}
.d-p-red1 {
  margin: 0 5px 0 4px;
}
.d-p-reduced {
  color: rgba(204, 203, 203, 1);
  text-decoration: line-through;
}
.d-p-zixun {
  position: absolute;
  right: 0;
  top: 50%;
  width: 73px;
  height: 28px;
  background: rgba(246, 106, 26, 1);
  border-radius: 3px;
  transform: translateY(-50%);
  font-size: 11px;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  display: flex;
  justify-content: center;
  align-items: center;
}
.d-p-zixun::before {
  content: "";
  display: inline-block;
  width: 11px;
  height: 11px;
  background: url(../../../assets/images/v19-10/callw.png) no-repeat;
  background-size: 100% 100%;
  margin-right: 3px;
}
.d-stages {
  margin-top: 15px;
  height: 48px;
  background: rgba(246, 246, 246, 1);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.d-stages-0 {
  display: flex;
  align-items: center;
}
.fq-img {
  display: inline-block;
  width: 30px;
  height: 31px;
  background: url(../../../assets/images/v19-10/fq.png) no-repeat;
  background-size: 100% 100%;
  margin: 0 5px 0 13px;
}
.fq-sf {
  color: #ff4757;
  font-size: 16px;
}
.fq-fa {
  display: flex;
  align-items: center;
  height: 15px;
  line-height: 15px;
  font-size: 11px;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  margin-right: 11px;
}
.fq-fa::after {
  content: "";
  display: inline-block;
  width: 6px;
  height: 11px;
  margin-left: 3px;
  background: url(../../../assets/images/v19-10/xiayiji.png) no-repeat;
  background-size: 100% 100%;
}
.app-p-title {
  height: 17px;
  font-size: 17px;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  width: 100%;
  position: relative;
  text-indent: 10px;
  line-height: 17px;
}
.app-p-title:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 15px;
  width: 4px;
  background: url(../../../assets/images/v19-10/yuanjiao.png) no-repeat;
  background-size: 100%;
}
.m-t-b {
  padding: 15px 0 0 15px;
}
.goumai- {
  margin-top: 10px;
  background: #fff;
}
.gm-lc {
  height: 80px;
  position: relative;
  margin: 0 24px;
}
.gm-lc-bar {
  position: absolute;
  height: 3px;
  width: 100%;
  top: 9px;
  left: 0;
  background: url(../../../assets/images/v19-10/line.png) no-repeat;
  background-size: 100%;
  z-index: 0;
}
.gm-lc-num {
  display: flex;
  justify-content: space-around;
  margin-top: 30px;
  z-index: 99;
  position: relative;
}
.gm-lc-txt {
  display: flex;
  justify-content: space-around;
  margin-top: 11px;
}
.gm-lc-num1,
.gm-lc-num2,
.gm-lc-num3,
.gm-lc-num4 {
  display: inline-block;
  width: 22px;
  height: 22px;
}
.gm-lc-num1 {
  background: url(../../../assets/images/v19-10/1.png) no-repeat;
  background-size: 22px 22px;
}
.gm-lc-num2 {
  background: url(../../../assets/images/v19-10/2.png) no-repeat;
  background-size: 100% 100%;
}
.gm-lc-num3 {
  background: url(../../../assets/images/v19-10/3.png) no-repeat;
  background-size: 100% 100%;
}
.gm-lc-num4 {
  background: url(../../../assets/images/v19-10/4.png) no-repeat;
  background-size: 100% 100%;
}
.find_eq {
  width: 100%;
  height: 130px;
  background: rgba(255, 255, 255, 1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
}
.find_eq_1 {
  font-size: 17px;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  margin-top: 16px;
}
.find_eq_2 {
  font-size: 12px;
  font-weight: 500;
  color: rgba(153, 153, 153, 1);
  margin-top: 5px;
}
.find_eq_3 {
  display: block;
  margin-top: 17px;
  width: 85px;
  height: 36px;
  line-height: 36px;
  background: rgba(72, 108, 220, 1);
  border-radius: 3px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  text-align: center;
}
.jubao_eq {
  margin: 31px 0 67px;
  text-align: center;
  font-size: 15px;
  font-weight: 400;
  color: rgba(106, 106, 119, 1);
}
.jubao_eq a{
  color:#486CDC;
}
.video-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 35px;
  height: 35px;
  display: block;
  background: url(../../../assets/images/v19-10/video-icon.png) no-repeat;
  background-size: contain;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(-50%, -50%, 0);
  pointer-events: none;
}
.tj-back {
  background: url(../../../assets/images/v19-10/back-wihte@2x.png) no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 10px;
  left: 16px;
  width: 25px;
  height: 25px;
}
.tj-nav {
  /* display: none; */
  width: 100%;
  height: 40px;
  position: fixed;
  top: 0;
  left: 0;
  border-bottom: solid 1px #f9f9f9;
  font-size: 14px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  display: flex;
  justify-content: space-evenly;
  align-items: flex-end;
  z-index: 99999;
  background: #fff;
}
.tj-nav span {
  text-align: center;
  font-size: 14px;
  height: 40px;
  line-height: 40px;
}
.tj-nav span.active {
  border-bottom: 2px solid #486cdc;
}
.tj-nav-back {
  background: url(../../../assets/images/v19-10/system-back@2x.png) no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 13px;
  left: 15px;
  width: 9px;
  height: 16px;
}
.tj-swiper-- {
  position: relative;
  width: 100%;
}
</style>
