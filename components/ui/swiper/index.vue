<template>
  <div class="tj-swiper" :style="swiperStyle">
    <div
      class="tj-swiper-track"
      :style="trackStyle"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
      @touchcancel="onTouchEnd"
    >
      <slot></slot>
    </div>
    <template v-if="!isIndicator">
      <div class="tj-swiper-indicators" v:bind:class="vertical:vertical" v-if="showIndicators">
        <i
          v-for="(item,index) in countArray"
          v-bind:key="'indicators_'+index"
          class="tj-swiper-indicator"
          :class="{'tj-swiper-indicator-active':(index === activeIndicator)}"
        ></i>
      </div>
    </template>
    <template v-else>
      <slot name="indicator"></slot>
    </template>
  </div>
</template>
<script>
/**
 * 轮播组件
 * @author yuguang.guo
 * @date 2019-08-15
 */
import { TouchMixin } from "@/components/ui/mixins/touch.js";
export default {
  name: "tj-swiper",
  mixins: [TouchMixin],
  props: {
    width: Number,
    height: Number,
    autoplay: Boolean,
    vertical: Boolean,
    initialSwipe: Number,
    indicatorColor: String,
    loop: {
      type: Boolean,
      default: true
    },
    showIndicators: {
      type: Boolean,
      default: true
    },
    duration: {
      type: Number,
      default: 500
    },
    interval: {
      type: Number,
      default: 3000
    },
    format: String
  },
  data() {
    return {
      computedWidth: 0,
      computedHeight: 0,
      offset: 0,
      active: 0,
      deltaX: 0,
      deltaY: 0,
      swipes: [],
      swiping: true,
      autoPlay_: false,
      show:false
    };
  },
  watch: {
    swipes() {
      this.$nextTick(() => {
        this.initialize();
      });
    }
  },
  computed: {
    isIndicator() {
      return this.$slots.indicator;
    },
    countArray() {
      return Array(this.count);
    },
    delta() {
      return this.vertical ? this.deltaY : this.deltaX;
    },
    count() {
      return this.swipes.length;
    },
    size() {
      return this[this.vertical ? "computedHeight" : "computedWidth"];
    },
    trackSize() {
      //console.log("count===",this.count, this.size, this.count * this.size);
      return this.count * this.size;
    },
    activeIndicator() {
      return (this.active + this.count) % this.count;
    },
    isCorrectDirection() {
      const expect = this.vertical ? "vertical" : "horizontal";
      return this.direction === expect;
    },
    trackStyle() {
      const mainAxis = this.vertical ? "height" : "width";
      const crossAxis = this.vertical ? "width" : "height";
      return {
        [mainAxis]: `${this.trackSize}px`,
        [crossAxis]: this[crossAxis] ? `${this[crossAxis]}px` : "",
        transitionDuration: `${this.swiping ? 0 : this.duration}ms`,
        transform: `translate${this.vertical ? "Y" : "X"}(${this.offset}px)`
      };
    },
    swiperStyle() {
      let s = {};
      if (this.format == "style-01") {
        s.padding = "0 20px 5px";
      }
      return s;
    }
  },
  methods: {
    initialize(active = this.initialSwipe) {
      clearTimeout(this.timer);
      if (this.$el) {
        let padding = 0;
        if (this.format == "style-01") {
          padding = 40;
        }
        const rect = this.$el.getBoundingClientRect();
        this.computedWidth = this.width || rect.width - padding;
        this.computedHeight = this.height || rect.height;
      }
      
      if (this.format == "style-01") {
        setTimeout(()=>{
          const { count, swipes, active, size, trackSize } = this;
          if(count > 2){
            this.swiping = true;
            swipes[count - 1].offset = -trackSize;
            this.swiping = false;
          }
        }, 0);
      }
      this.autoPlay();
      this.autoPlay_ = this.autoplay;
    },
    stopPlay() {
      clearTimeout(this.timer);
    },
    autoPlay() {
      if (this.autoplay && this.count > 1) {
        this.timer = setTimeout(() => {
          this.swiping = true;
          setTimeout(() => {
            this.swiping = false;
            this.move({
              pace: 1,
              emitChange: true
            });
            this.autoPlay();

            setTimeout(() => {
              this.swiping = true;
              this.move({
                pace: 0,
                emitChange: false
              });
            }, 400);
          }, 10);
          // this.move({
          //   pace: 0,
          //   emitChange: false
          // });
        }, this.interval);
      }
    },
    getTargetOffset(targetActive, offset) {
      let position = targetActive * this.size;
      let targetOffset = Math.round(offset - position);
      return targetOffset;
    },
    move({ pace = 0, offset = 0, emitChange }) {
      // console.log("====move====");
      const { count, swipes, active, size, trackSize } = this;
      if (count <= 1) {
        return;
      }
      const targetActive =
        active == count ? 0 : active > -1 ? active + pace : count - 1;
      let targetOffset = this.getTargetOffset(targetActive, offset);
      // console.log("targetOffset==", targetOffset);
      if (this.loop) {
        if (swipes[0]) {
          swipes[0].offset =
            targetActive == count - 1 || targetActive == count
              ? count * size
              : 0;
        }
        if (swipes[count - 1]) {
          const outLeftBound = targetOffset > 0;
          swipes[count - 1].offset = outLeftBound ? -trackSize : 0;
        }
        // console.log("active==", active);
        if (this.format == "style-01" && count > 2 && active==count) {
          setTimeout(()=>{
            swipes[count - 1].offset = -trackSize;
          },0);
        }
      }
      this.active = targetActive;
      this.offset = targetOffset;

      if (emitChange && targetActive !== active) {
        this.$emit("change", this.activeIndicator, this.autoPlay_);
      }
    },
    onTouchStart(e) {
      // console.log("touch start");
      if (this.count <= 1) {
        // console.log("touch start stop!!!");
        return;
      }
      this.swiping = true;
      this.stopPlay();
      this.touchStart(e);
      if (this.autoplay) {
        this.autoPlay_ = false;
      }
    },
    onTouchMove(e) {
      this.touchMove(e);
      console.log("touch move", this.direction);
      if (this.isCorrectDirection && this.count > 1) {
        e.preventDefault();
        e.stopPropagation();
        //preventDefault(event, true);
        this.move({ offset: this.delta });
        //this.offset = -(this.active * this.size) + this.delta;
        // console.log("this.offset=", this.offset);
      }
    },
    onTouchEnd(e) {
      console.log("touch end");
      if (this.count <= 1) {
        return;
      }
      this.swiping = false;
      const offset = this.vertical ? this.offsetY : this.offsetX;
      this.move({
        pace: offset > 0 ? (this.delta > 0 ? -1 : 1) : 0,
        emitChange: true
      });
      setTimeout(() => {
          this.swiping = true;
          this.move({
            pace: 0,
            emitChange: false
          });
        }, 300);
      this.autoPlay();
      if (this.autoplay) {
        this.autoPlay_ = true;
      }
    },
    onTouchCancel(e) {
      console.log("touch cancel");
    }
  }
};
</script>
<style scoped>
.tj-swiper {
  position: relative;
  overflow: hidden;
  user-select: none;
}
.tj-swiper-track {
  height: 100%;
  width: 100%;
  align-items: center;
  display: flex;
}
.tj-swiper-indicators {
  position: absolute;
  bottom: 10px;
  left: 50%;
  display: flex;
  transform: translateX(-50%);
}
.tj-swiper-indicator {
  width: 6px;
  height: 6px;
  background-color: #ebedf0;
  border-radius: 100%;
  opacity: 0.3;
  transform: opacity 0.2s;
  margin: 0 3px;
}
.tj-swiper-indicator-active {
  background-color: #fff;
  opacity: 1;
}
</style>


