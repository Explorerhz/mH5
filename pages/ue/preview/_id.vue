<template>
  <div class="tj-preview">
    <div class="tj-preview-title">
      <span class="tj-nav-back" @click.stop="back"></span>
      {{detail.equipment.brand}}{{detail.equipment.model}}{{detail.equipment.category}}
    </div>
    <div class="tj-preview-nav" ref="tab_bar_01">
      <div
        v-for="(value, name, index)  in nav"
        :key="'nav_'+name"
        :class="{active:navIndex===index}"
        :ref="'tab_num_'+index"
        @click="nav_(index, value, name)"
      >{{name}}</div>
    </div>
    <div
      class="tj-preview-body"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
      @touchcancel="onTouchEnd"
    >
      <div class="tj-preview-i">
        <div class="tj-preview-imgs" :style="style">
          <template v-for="(image, index) in images">
            <div class="tj-preview-img" :key="index" :style="{width:imgWidth+'px'}">
              <img v-if="image.imgPathDto && !image.videoUrl" v-lazy="image.imgPathDto.pathMid" />
              <video
                v-if="image.videoUrl"
                :id="'playIcon_'+index"
                class="video__"
                preload="none"
                :poster="image.imgPath"
                @timeupdate="timeupdate"
                webkit-playsinline="true"
                playsinline="playsinline"
                tabindex="-1"
                controls
              >
                <source :src="image.videoUrl" type="video/mp4" />
                <p class="vjs-no-js">
                  To view this video please enable JavaScript, and consider upgrading to a web browser that
                  <a
                    href="http://videojs.com/html5-video-support/"
                    target="_blank"
                    class="vjs-hidden"
                    hidden="hidden"
                  >supports HTML5 video</a>
                </p>
              </video>
              <div
                v-if="image.videoUrl"
                class="video_mask"
                @click="playVideo('playIcon_'+index)"
              ></div>
              <!-- <em v-if="image.videoUrl && playIcon" class="video-icon" @click="playVideo('playIcon_'+index)"></em> -->
            </div>
          </template>
        </div>
        <div class="tj-preview-num">{{imgIndex+1}}/{{images.length}}</div>
      </div>
    </div>
    <tj-free-phone ref="free_phone" />
    <tj-eq-price-reduction ref="price_reduction"></tj-eq-price-reduction>
    <tj-bottom-bar @md="btnCall" :reduction="false" @mdJj="E25_"></tj-bottom-bar>
  </div>
</template>

<script>
import BottomBar from "@/components/equipment/bottom-bar";
import { TouchMixin } from "@/components/ui/mixins/touch.js";
import FreePhone from "@/components/common/free-phone";
import Recommend__ from "@/components/equipment/recommend";
import PriceReduction from "@/components/equipment/price-reduction";
import { E4, E5, E124, E25, E26 } from "@/util/maidian";
import { getCallType, seo } from "@/api/index";
import { getRandomNum } from "@/util/common";
import {
  eqBasicDetail,
  eqImages,
  eqseller,
  eqManager,
  getInspectReport,
  eqSameBrandRecommend,
  eqRecommend,
  zhengji,
  consultCnt
} from "@/api/eqDetail";
import { allSettled } from "@/util/promise-all.js";
import { pageBack } from "@/util/page.js";
export default {
  name: "tj-preview",
  components: {
    [FreePhone.name]: FreePhone,
    [PriceReduction.name]: PriceReduction,
    [BottomBar.name]: BottomBar
  },
  mixins: [TouchMixin],
  mounted() {
    this.imgIndex = this.num;
    setTimeout(() => {
      this.move({ pace: 0, offset: 0 });

      const index = this.nav__index[this.imgIndex];
      console.log("nav_index=", index);
      if (index >= 0) {
        this.navIndex = index;
      }
    }, 100);
    let nav = new Set();
    this.images.forEach((ele, index) => {
      if (ele.videoUrl) {
        nav.add("视频");
      } else if (ele.photoImgDesc) {
        nav.add(ele.photoImgDesc);
      }
    });
    let nav__ = {};
    let nav__index = {};
    let nav__num = {};
    [...nav].forEach((ele, index) => {
      // console.log(ele,index);
      nav__[ele] = -1;
      nav__num[ele] = index;
    });
    let isNull = false;
    this.images.forEach((ele, index) => {
      if (ele.videoUrl) {
        if (nav__["视频"] == -1) {
          nav__["视频"] = index;
        }
        nav__index[index] = nav__num["视频"];
      } else if (ele.photoImgDesc) {
        nav__index[index] = nav__num[ele.photoImgDesc];
        if (nav__[ele.photoImgDesc] == -1) {
          let index_ = index;
          if (isNull) {
            index_ += -1;
            isNull = false;
          }
          nav__[ele.photoImgDesc] = index_;
        }
      } else {
        isNull = true;
        nav__index[index] = 1;
      }
    });
    this.nav = { ...nav__ };
    // console.log(nav__num);
    // console.log(nav__index);
    this.nav__index = { ...nav__index };
    this.$nextTick(() => {
      const rect = this.$el.getBoundingClientRect();
      this.imgWidth = rect.width;
      this.computedWidth = rect.width * this.images.length;
    });
    this.initData();
  },
  destroyed() {},
  computed: {
    style() {
      return {
        width: this.computedWidth + "px",
        transitionDuration: `${this.swiping ? 0 : 300}ms`,
        transform: `translateX(${this.offset}px)`
      };
    }
  },
  watch: {
    navIndex(val) {
      const rect = this.$el.getBoundingClientRect();
      const top = this.$refs.tab_bar_01.scrollLeft;
      const tab = this.$refs["tab_num_" + val];
      // console.log(tab, tab[0].offsetLeft , tab[0].offsetWidth);
      const x = tab[0].offsetLeft + tab[0].offsetWidth;
      // console.log(top, x);
      if (top + rect.width < x) {
        this.$refs.tab_bar_01.scrollLeft = tab[0].offsetLeft - 10;
      } else if (tab[0].offsetLeft < top) {
        this.$refs.tab_bar_01.scrollLeft = tab[0].offsetLeft - 10;
      }
    }
  },
  methods: {
    playVideo(id) {
      const video_ = document.getElementById(id);
      console.log(video_);
      if (video_) {
        video_.play();
      }
    },
    async initData() {
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
    E124_(page) {
      E124(page);
    },
    E4_(event, button) {
      let href = null;
      if (event) {
        href = event.currentTarget.href;
      }
      E4("图片预览页", button, () => {
        if (href) {
          window.location.href = href;
        }
      });
    },
    E5_(action_id, action_url) {
      E5(action_id, action_url);
    },
    E25_(button_name) {
      E25(this.eqId, "查看设备图片", button_name);
    },
    E26_(img) {
      E26(
        img.imgId,
        img.videoUrl ? "视频" : "设备图片",
        img.photoImgDesc ? img.photoImgDesc : ""
      );
    },
    back() {
      pageBack();
    },
    nav_(num, value, name) {
      this.navIndex = num;
      this.imgIndex = value;
      this.offset = -(this.imgIndex * this.imgWidth);

      this.E25_(name);
    },
    onTouchStart(e) {
      this.touchStart(e);
      this.swiping = true;
    },
    onTouchMove(e) {
      this.touchMove(e);
      if (this.direction == "horizontal" && this.images.length > 1) {
        e.preventDefault();
        e.stopPropagation();
        this.move({ offset: this.deltaX });
      }
    },
    onTouchEnd(e) {
      this.swiping = false;
      if (this.direction == "horizontal" && this.images.length > 1) {
        this.move({ pace: 1, offset: this.deltaX });
        if (this.imgIndex < 3) {
          let videos = document.getElementsByClassName("video__");
          for (let i = 0; i < videos.length; i++) {
            let element = videos[i];
            if (!element.paused) {
              element.pause();
            }
          }
          setTimeout(() => {
            this.playIcon = true;
          }, 0);
        }

        const index = this.nav__index[this.imgIndex];
        console.log("nav_index=", index);
        if (index >= 0) {
          this.navIndex = index;
        }

        const img = this.images[this.imgIndex];
        if (img) {
          this.E26_(img);
        }
      }
    },
    move({ pace = 0, offset = 0, emitChange }) {
      let offset_ = 0;
      let num = 0;
      if (pace == 1) {
        num = offset > 0 ? -1 : 1;
        offset_ = -((this.imgIndex + num) * this.imgWidth);
      } else {
        offset_ = -(this.imgIndex * this.imgWidth) + offset;
      }

      // console.log(this.imgIndex, pace, offset, offset_);

      if (offset_ <= 0 && offset_ > -this.computedWidth) {
        this.offset = offset_;

        if (pace == 1) {
          this.imgIndex += num;
        }
      }
    },
    timeupdate() {
      if (this.playIcon) {
        this.playIcon = false;
      }
      // console.log("ontimeupdate");
    }
  },
  head() {
    return {
      title: `${this.detail.equipment.brand +
        this.detail.equipment.model +
        this.detail.equipment
          .category}的图片预览-转让报价信息-实拍图片-铁甲二手机`
    };
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
    console.log(query);
    const reg = /.+\/(\d+)/;
    const eqId = reg.exec(route.path)[1].trim();
    let detail = { equipment: {} };
    let images = [];
    let seo_ = [];
    let seller = {};
    let manager = {};
    let report = {};
    let recommend = [];
    let sameBrandRecommend = [];
    const num = query.num ? parseInt(query.num) - 1 : 0;
    const result = await allSettled([
      eqImages(eqId, { containsVideo: true }),
      eqBasicDetail(eqId, {})
    ]).catch(function(err) {
      console.log("index 请求出错了", err);
    });

    if (result) {
      if (result[0].status == 200 && result[0].result.ret === "0") {
        images = result[0].result.result;
      } else {
        error({ statusCode: 500, message: "Post not found" });
      }
      if (result[1].status == 200 && result[1].result.ret === "0") {
        detail = result[1].result.result;
      }
    }

    return {
      eqId: eqId,
      detail: detail,
      images: images,
      num: num
    };
  },
  data() {
    return {
      nav: {},
      nav__index: {},
      navIndex: 0,
      imgIndex: 0,
      images: [],
      computedWidth: 0,
      imgWidth: 0,
      offset: 0,
      swiping: false,
      playIcon: true,
      peopleNum: 10,
      callType_: 1,
      num: 0
    };
  },
  serverCacheKey() {
    return Math.floor(Date.now() / 10000);
  }
};
</script>

<style>
.tj-preview {
  background: rgba(0, 0, 0, 1);
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}
.tj-preview-title {
  text-align: center;
  height: 45px;
  line-height: 45px;
  font-size: 18px;
  font-weight: 500;
  color: rgba(74, 74, 83, 1);
  position: relative;
  background: #fff;
}
.tj-nav-back {
  background: url(../../../assets/images/v19-10/system-back@2x.png) no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 15px;
  left: 15px;
  width: 9px;
  height: 16px;
}
.tj-preview-nav {
  height: 45px;
  line-height: 45px;
  overflow-x: auto;
  white-space: nowrap;
  background: #fff;
  overflow-y: hidden;
  position: relative;
}
.tj-preview-nav::-webkit-scrollbar {
  display: none;
}
.tj-preview-nav div {
  text-align: center;
  font-size: 14px;
  height: 45px;
  line-height: 45px;
  margin: 0 20px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  display: inline-block;
}
.tj-preview-nav div.active {
  border-bottom: 2px solid #486cdc;
}
.tj-preview-imgs {
  height: 250px;
  white-space: nowrap;
}
.tj-preview-i {
  height: 280px;
  width: 100%;
}
.tj-preview-body {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  justify-content: center;
  padding-bottom: 140px;
}
.tj-preview-img {
  height: 250px;
  width: 100%;
  position: relative;
  display: inline-block;
}
.tj-preview-img img {
  height: 250px;
  width: 100%;
}
.tj-preview-img video {
  height: 250px;
  width: 100%;
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
}
.tj-preview-num {
  font-size: 12px;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  text-align: right;
  padding: 15px;
  letter-spacing: 1px;
}
.vjs-no-js {
  padding: 20px;
  color: #fff;
  background-color: #000;
  font-size: 18px;
  font-family: Arial, Helvetica, sans-serif;
  text-align: center;
  width: 300px;
  height: 150px;
  margin: 0 auto;
}
.vjs-no-js a,
.vjs-no-js a:visited {
  color: #66a8cc;
}
.video_mask {
  background: rgba(0, 0, 0, 0);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
}
</style>
