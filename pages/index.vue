<template>
  <div class="container_home">
    <div class="container-body">
      <client-only>
        <tj-down-app md="首页"></tj-down-app>
      </client-only>
      <tj-home-head ref="homeHead" @click="E4_"></tj-home-head>
      <tj-swiper
        class="index-banner-ad"
        :autoplay="true"
        v-if="focusImgs.focusImgHeaderList"
        :format="'style-01'"
      >
        <tj-swiper-item v-for="(image, index) in focusImgs.focusImgHeaderList" :key="index">
          <img v-lazy="image.imgPathDto.pathMid" @click="banner(image)" />
        </tj-swiper-item>
      </tj-swiper>
      <article id="addNav-newWarp">
        <div class="bar-nav">
          <div class="n-nav">
            <a href="/ue/" title="二手挖掘机等工程机械设备报价信息" @click.prevent="E4_($event, '买车')">
              <img src="../assets/images/v19-10/maiche@2x.png" />
              <p>我要买车</p>
            </a>
          </div>
          <div class="n-nav yearQuery">
            <a
              href="/html/fastSellerCar.html"
              title="转让个人二手挖掘机等工程机械设备"
              @click.prevent="E4_($event, '卖车')"
            >
              <img src="../assets/images/v19-10/maiche1.png" />
              <p>我要卖车</p>
            </a>
          </div>
          <div class="n-nav evalNav">
            <a
              href="https://h5.tiebaobei.com/res/hweb/activity/gjd/Index.html"
              title="铁甲二手机融租业务"
              @click.prevent="E4_($event, '金融')"
            >
              <img src="../assets/images/v19-10/jinrong.png" />
              <p>铁甲融租</p>
            </a>
          </div>
          <div class="n-nav">
            <a href="/html/eval.html" title="二手挖掘机等工程设备免费估价" @click.prevent="E4_($event, '估价')">
              <img src="../assets/images/v19-10/gujia.png" />
              <p>免费估价</p>
            </a>
          </div>
        </div>
      </article>
      <tj-home-words @click="E4_"></tj-home-words>
      <tj-home-preferential @click="E4_"></tj-home-preferential>

      <tj-home-list
        ref="homeList"
        :newList="newList"
        @click="E4_"
        @callType="callType"
        :loadMore="loadMore"
      ></tj-home-list>

      <!-- <div class="comm-title m-t-b">
        <div class="app-p-title">购机攻略</div>
      </div>-->

      <!-- <tj-home-strategy :listData="esjTypeLists"></tj-home-strategy> -->

      <tj-home-bbs :listData="newsAndForum" @click="E4_"></tj-home-bbs>

      <tj-seo :listData="seo_"></tj-seo>

      <tj-home-about @click="E4_"></tj-home-about>
    </div>

    <tj-tabbar :index="0" />

    <tj-call-phone @click="call" />
    <tj-free-phone ref="free_phone" />
  </div>
</template>

<script>
import TabBar from "@/components/common/tab-bar";
import DownApp from "@/components/common/down-app";
import Swiper from "@/components/ui/swiper";
import SwiperItem from "@/components/ui/swiper/swiper-item";
import Head from "@/components/home/head";
import Bbs from "@/components/home/bbs";
// import Strategy from "@/components/home/strategy";
import List from "@/components/home/list";
import CallPhone from "@/components/common/call-phone";
import FreePhone from "@/components/common/free-phone";
import HotWords from "@/components/home/hotwords";
import Preferential from "@/components/home/preferential";
import About from "@/components/home/about";
import Seo from "@/components/home/seo";
import Up from "@/components/common/up";
import { E4, E5, E124 } from "@/util/maidian";
import {
  latestEq,
  getReducePriceEqList,
  focusImg,
  getNewsAndForum,
  esjTypeList,
  getCallType,
  seo
} from "@/api/index";
import { pubDate, gps_, scrollRestoration } from "@/util/page.js";
import { allSettled } from "@/util/promise-all.js";

export default {
  name: "tj-home",
  components: {
    [TabBar.name]: TabBar,
    [Swiper.name]: Swiper,
    [SwiperItem.name]: SwiperItem,
    [DownApp.name]: DownApp,
    [Head.name]: Head,
    [Bbs.name]: Bbs,
    // [Strategy.name]: Strategy,
    [List.name]: List,
    [HotWords.name]: HotWords,
    [CallPhone.name]: CallPhone,
    [FreePhone.name]: FreePhone,
    [Preferential.name]: Preferential,
    [About.name]: About,
    [Seo.name]: Seo
  },
  head() {
    return {
      title: "【铁甲二手机】-买卖二手挖掘机、二手工程车及二手工程机械交易平台",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "铁甲二手机包括二手挖掘机、二手装载机、二手泵车交易信息，并涵盖二手挖掘机价格、个人买卖、市场行情、出售、转让、求购等交易信息，更多二手工程车交易信息尽在铁甲二手机"
        },
        {
          hid: "keywords",
          name: "keywords",
          content: "铁甲二手机，铁宝贝，铁甲二手工程机械网"
        }
      ],
      link: [
        { rel: "canonical", href: "https://www.tiebaobei.com/" },
        { rel: "miphtml", href: "https://mip.tiebaobei.com/" }
      ],
      script: [
        //{src:'https://res.wx.qq.com/open/js/jweixin-1.3.2.js'},
        {
          type: "application/ld+json",
          charset: "utf-8",
          json: {
            "@context": "https://ziyuan.baidu.com/contexts/cambrian.jsonld",
            "@id": "https://m.tiebaobei.com/",
            appid: "1590644726714965",
            title:
              "【铁甲二手机】-买卖二手挖掘机、二手工程车及二手工程机械交易平台",
            images: ["https://m.tiebaobei.com/res/img/apple-touch-icon-57.png"],
            pubDate: `${pubDate}`
          }
        }
      ]
    };
  },
  mounted() {
    document.addEventListener("scroll", this.scrollEvent);
    // console.log(this.focusImgs);
    this.$nextTick(() => {
      this.loadHeight_();
      scrollRestoration();
    });
    if(!this.requestGps){
      gps_();
    }
  },
  destroyed() {
    window.removeEventListener("scroll", this.scrollEvent);
  },
  computed: {
    bottomState() {
      return 1;
    }
  },
  methods: {
    loadHeight_() {
      const info = document.getElementById("load-height");
      this.loadHeight = info.offsetTop-200;
      // console.log("loadHeight=", this.loadHeight);
    },
    banner(image) {
      this.E5_(image.titleDesc, image.link);
      let val = image.link.toLowerCase();
      if (val.indexOf("tosearch") != -1) {
        val = val.replace("：", ":");
        const key = val.split(":");
        if (key.length == 2) {
          const uk = key[1];
          if (uk.indexOf("铁甲保") != -1) {
            location.href = "/ue/bao";
          } else if (uk.indexOf("严选车") != -1) {
            location.href = "/ue/yanxuan";
          } else {
            localStorage.removeItem("searchResultVal");
            localStorage.removeItem("searchResultValList");
            window.location.href = "/uesearch/" + uk + "/";
          }
        }
      } else {
        window.location.href = image.link;
      }
    },
    scrollEvent(e) {
      this.$refs.homeHead.scrollEvent(e);

      let scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      let clientHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;

      // if (scrollHeight - scrollTop == clientHeight) {
      //   //this.$refs.homeList.loadList();
      // }
      // console.log(scrollTop + clientHeight, this.loadHeight);
      if (scrollTop + clientHeight >= this.loadHeight) {
        //console.log(this.loadHeight, scrollTop);
        this.loadList();
      }
    },
    async loadList(refresh) {
      if (this.requestState || this.loadMore == 2) {
        return;
      }
      // console.log(this.requestState, this.loadMore);
      this.requestState = true;
      this.loadMore = 0;
      let listData_ = [];
      if (refresh) {
        this.listData = [];
      }
      try {
        let data = await latestEq({
          pageSize: 10,
          pageIndex: this.pageIndex
        });
        if (data.ret == 0) {
          this.pageIndex++;
          this.refreshState = false;
          listData_ = data.result.items;
        }
        if (!this.newList) {
          this.newList = [];
        }
        if (refresh) {
          this.newList = listData_ ? listData_ : [];
        } else {
          this.newList = this.newList.concat(listData_ ? listData_ : []);
        }
      } catch (e) {
        console.log(e.message);
      } finally {
        this.loadMore = !listData_ || listData_.length < 10 ? 2 : 1;
        this.requestState = false;
        setTimeout(() => {
          this.loadHeight_();
        }, 0);
        // console.log("请求完成-----");
      }
    },
    call(v, params) {
      if (v == 1) {
        this.E4_(null, "免费电话");
        this.$refs.free_phone.open(null);
      } else {
        this.E4_(null, "询底价");
        this.$refs.free_phone.open(params);
      }
    },
    async callType(params) {
      const result = await getCallType(params);
      this.call(result.result.callType, params);
    },
    E124_(page) {
      E124(page);
    },
    E4_(event, button) {
      console.log("E4.....");
      let href = null;
      if (event) {
        href = event.currentTarget.href;
      }
      E4("首页", button, () => {
        if (href) {
          window.location.href = href;
        }
      });
    },
    E5_(action_id, action_url) {
      E5(action_id, action_url);
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
    let newList = [];
    let focusImgs = {};
    let newsAndForum = {};
    let esjTypeLists = [];
    let seo_ = [];

    const result = await allSettled([
      latestEq({ pageIndex: 1 }),
      focusImg({}),
      getNewsAndForum({}),
      esjTypeList({}),
      seo({})
    ]).catch(function(err) {
      console.log("index 请求出错了", err.message);
    });

    if (result) {
      // console.log(result[0]);
      if (result[0].status == 200 && result[0].result.ret === 0) {
        newList = result[0].result.result.items;
      }
      if (result[1].status == 200 && result[1].result.ret === 0) {
        focusImgs = result[1].result.result;
      }
      newsAndForum = result[2].result;
      if (result[3].status == 200 && result[3].result.data.ret === "0") {
        esjTypeLists = result[3].result.data.data;
      }
      if (result[4].status == 200 && result[4].result.ret === "0") {
        seo_ = result[4].result.result;
      }
    }
    const duration = Date.now() - time_;
    console.log('index='+duration+"ms");
    return {
      focusImgs: focusImgs,
      newList: newList,
      newsAndForum: newsAndForum,
      esjTypeLists: esjTypeLists,
      seo_: seo_
    };
  },
  data() {
    return {
      requestState: false,
      pageIndex: 2,
      loadHeight: 0,
      loadMore: 1,
      requestGps:false,
      aaa:'aaa',
      bbb:'bbb'
    };
  },
  serverCacheKey() {
    return Math.floor(Date.now() / 10000);
  }
};
</script>

<style>
#addNav-newWarp {
  position: relative;
  overflow: hidden;
  background-color: #fff;
}
.container_home {
  background: #f9f9f9;
}
#addNav-newWarp .bar-nav {
  background-color: #fff;
}
.tt {
  display: flex;
  justify-content: flex-start;
  transform: rotate(30deg);
}
.n-nav {
  width: 25%;
  float: left;
  display: inline-block;
  text-align: center;
  font-size: 12px;
  padding: 18px 0 15px;
}
.n-nav a {
  color: #6a6a77;
  display: block;
}
.bar-nav img {
  width: 27px;
  height: 28px;
  margin-bottom: 5px;
}
.n-nav p {
  width: 100%;
  overflow: hidden;
  font-weight: 400;
  font-size: 13px;
}
.index-banner-ad,
.index-banner-ad img {
  height: 108px;
}
.comm-title {
  height: 52px;
  background: #fff;
  padding: 15px 0 0 10px;
  border-bottom: solid 1px #f9f9f9;
}
.comm-title em {
  font-weight: 700;
  font-size: 0.32rem;
  color: #6a6a77;
  position: relative;
}
.comm-title em:before {
  background: url(../assets/images/tit_l.png) no-repeat;
  background-size: 22px auto;
  left: -44px;
}
.comm-title em:after,
.comm-title em:before {
  position: absolute;
  content: "";
  width: 22px;
  height: 20px;
  top: 0;
}
.comm-title em:after {
  background: url(../assets/images/tit_l.png) no-repeat;
  background-size: 22px auto;
  right: -44px;
}
.type-entrance {
  margin-bottom: 14px;
  height: 260px;
  overflow: hidden;
  width: 100%;
  background-color: #fff;
  padding: 0 7px;
}
.type-entrance a {
  float: left;
  width: 33.3%;
  height: 120px;
  padding: 10px 5px;
  margin-top: 10px;
  background: #fff;
  text-align: center;
  position: relative;
}
.type-entrance a em {
  font-size: 16px;
  color: #6a6a77;
  position: relative;
  z-index: 1;
  vertical-align: text-top;
}
.type-entrance a img {
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 0;
  width: 120px;
  height: 120px;
  transform: translate(-50%, -50%);
}
img {
  width: 100%;
  display: inline-block;
  -webkit-touch-callout: none;
}
.m-t-b {
  margin: 10px 0 0;
}
.container-body {
  margin-bottom: 55px;
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
  height: 17px;
  width: 4px;
  background: url(../assets/images/v19-10/yuanjiao.png) no-repeat;
  background-size: 100%;
}
.luntan-more {
  margin-top: 15px;
  height: 40px;
  font-size: 12px;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  border-top: solid 1px #f9f9f9;
  display: flex;
  justify-content: center;
  align-items: center;
}
.luntan-more span {
  height: 40px;
  line-height: 40px;
  padding: 0 10px;
  display: inline-block;
}
.luntan-more span:after {
  content: "";
  display: inline-block;
  height: 10px;
  width: 6px;
  background: url(../assets/images/v19-10/xiayiji.png) no-repeat;
  background-size: 100%;
  margin-left: 5px;
}
.luntan-more a {
  color: rgba(102, 102, 102, 1);
}
.tj-swiper-item {
  box-shadow: 0px 2px 3px #b7b1b1;
  height: 80%;
}
.tj-swiper-item-select {
  height: 100%;
}
.tj-swiper-indicators i.tj-swiper-indicator {
  opacity: 1;
  border-radius: 0;
  background-color: transparent;
  background: url(../assets/images/v19-10/jixning2.png) no-repeat;
  background-size: 100%;
}
.tj-swiper-indicators i.tj-swiper-indicator-active {
  width: 10px;
  background-color: transparent;
  background: url(../assets/images/v19-10/jixing.png) no-repeat;
  background-size: 100%;
}
</style>
