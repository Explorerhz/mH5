<template>
  <div @touchmove="onTouchMove">
    <!-- 遮罩层动画 -->
    <div class="mask" @click="popupVisible = false" v-show="popupVisible"></div>
    <!-- 显示信息层 -->
    <transition :name="dialogTransition">
      <div class="popupBox" :style="optionPop.style" v-show="popupVisible">
        <p class="close" @click="popupVisible = false"><tj-icon name="dagou" :size="16"></tj-icon></p>
        <slot></slot>
      </div>
    </transition>
  </div>
</template>
<script>
import Icon from "@/components/ui/icon";
export default {
  name: "tj-popup",
  components: {
    [Icon.name]: Icon
  },
  props: {
    // 组件值
    value: {
      type: Boolean,
      default: false
    },
    // 默认样式
    optionPop: {
      type: Object,
      default(){
        return {
          style:{
            "height":"250px"
          }
        }
      }
    },
    //弹窗动画
    dialogTransition: {
      type: String,
      default: "slide-fade"
    },
    //禁止页面滚动
    scroll: {
      type: Boolean,
      default: true
    }
  },
  created() {
    // 默认显示状态
    if (typeof this.value !== "undefined") {
      this.popupVisible = this.value;
    }
  },
  watch: {
    value(val) {
      this.popupVisible = val;
    },
    popupVisible(val) {
      // 触发事件并赋值
      this.$emit(val ? "on-show" : "on-hide");
      this.$emit("input", val);
    }
  },
  data() {
    return {
      popupVisible: false  // 控制是否显示
    };
  },
  methods: {
    onTouchMove(event) {
      this.scroll && event.preventDefault();
    }
  }
};
</script>
<style scoped>
/*遮罩层*/
.mask {
  position: fixed;
  z-index: 50;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
}
.popupBox {
  position: fixed;
  bottom: 0px;
  left: 0px;
  max-width: 100%;
  max-height: 100%;
  min-width: 100%;
  background: #fff;
  z-index: 51;
  transform: translateY(0%);
  font-size: 0.3rem;
}
.close{
  padding: 8px;
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter,
.slide-fade-leave-active {
  transform: translateY(100%);
  opacity: 0;
}
</style>