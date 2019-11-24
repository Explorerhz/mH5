<template>
  <div v-show="value" class="tj-loading">
    <span
      class="tj-loading-spinner"
      :class="{'tj-loading-spinner-circular':type=='circular','tj-loading-spinner-spinner':type=='spinner'}"
    >
      <template v-if="type=='circular'">
        <svg class="tj-loading-circular" viewBox="25 25 50 50">
          <circle cx="50" cy="50" r="20" fill="none" />
        </svg>
      </template>
      <template v-else>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
      </template>
    </span>
    <span class="tj-loading-text" v-if="isSlot">
      <slot></slot>
    </span>
  </div>
</template>
<script>
/**
 * 加载提示组件
 * @author yuguang.guo
 * @date 2019-08-15
 */
export default {
  name: "tj-loading",
  props: {
    type: {
      type: String,
      default: "circular" //可选值spinner
    },
    color: {
      type: String,
      default: "#333333"
    },
    vertical: {
      type: Boolean,
      default: false
    }
  },
  beforeCreate() {},
  destroyed() {},
  mounted() {},
  data() {
    return {
      value: true
    };
  },
  computed: {
    isSlot() {
      return this.$slots.default;
    }
  },
  watch: {},
  methods: {}
};
</script>
<style lang="less" scoped>
.tj-loading {
  position: relative;
  font-size: 0;
  vertical-align: middle;
}
.tj-loading-spinner {
  position: relative;
  display: inline-block;
  width: 30px;
  max-width: 100%;
  height: 30px;
  max-height: 100%;
  vertical-align: middle;
  animation: tj-rotate 0.8s linear infinite;
}
.tj-loading-text {
  display: inline-block;
  margin-left: 8px;
  color: #969799;
  font-size: 14px;
  vertical-align: middle;
}
.tj-loading-circular {
  display: block;
  width: 100%;
  height: 100%;
}
.tj-loading-circular circle {
  animation: tj-circular 1.5s ease-in-out infinite;
  stroke: currentColor;
  stroke-width: 3;
  stroke-linecap: round;
}
.tj-loading-spinner-circular {
  animation-duration: 2s;
}
.tj-loading-spinner-spinner {
  animation-timing-function: steps(12);
}
.tj-loading-spinner-spinner i {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.tj-loading-spinner-spinner i::before {
  display: block;
  width: 2px;
  height: 25%;
  margin: 0 auto;
  background-color: currentColor;
  border-radius: 40%;
  content: " ";
}
.generate-spinner(@n, @i: 1) when (@i =< @n) {
  .tj-loading-spinner-spinner i:nth-of-type(@{i}) {
    transform: rotate(@i * 30deg);
    opacity: 1 - (0.75 / 12) * (@i - 1);
  }
  .generate-spinner(@n, (@i + 1));
}
.generate-spinner(12);

@keyframes tj-circular {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -40;
  }

  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -120;
  }
}
@keyframes tj-rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>


