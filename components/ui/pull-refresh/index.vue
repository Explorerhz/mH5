<template>
  <div
    class="tj-pull-refresh"
    :style="style"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
    @touchcancel="onTouchEnd"
  >
    <div class="refresh-tip">{{statusText}}</div>
    <slot></slot>
  </div>
</template>
<script>
/**
 * 下拉刷新组件
 * @author yuguang.guo
 * @date 2019-08-15
 */
import { TouchMixin } from '@/components/ui/mixins/touch.js'
export default {
  name: 'tj-pull-refresh',
  mixins: [TouchMixin],
  props: {
    successText: {
      type: String,
      default: ''
    },
    pullingText: {
      type: String,
      default: '下拉即可刷新...'
    },
    loosingText: {
      type: String,
      default: '释放即可刷新...'
    },
    loadingText: {
      type: String,
      default: '加载中...'
    },
    value: {
      type: Boolean,
      required: true
    },
    successDuration: {
      type: Number,
      default: 500
    },
    animationDuration: {
      type: Number,
      default: 300
    },
    headHeight: {
      type: Number,
      default: 50
    },
    height: {
      type: String,
      default: '100vh'
    }
  },
  beforeCreate() {},
  destroyed() {},
  computed: {
    style() {
      return {
        'min-height': this.height,
        transition: `${this.duration}ms`,
        transform: `translate3d(0,${this.distance}px, 0)`
      }
    },
    statusText() {
      const {
        status,
        successText,
        pullingText,
        loosingText,
        loadingText
      } = this
      return status == 'pulling'
        ? pullingText
        : status == 'loosing'
          ? loosingText
          : loadingText
    },
    untouchable() {
      return this.status === 'loading' || this.status === 'success'
    }
  },
  watch: {
    value(loading) {
      this.duration = this.animationDuration
      if (!loading && this.successText) {
        this.status = 'success'
        setTimeout(() => {
          this.setStatus(0)
        }, this.successDuration)
      } else {
        this.setStatus(loading ? this.headHeight : 0, loading)
      }
    }
  },
  methods: {
    ease(distance) {
      const { headHeight } = this
      return Math.round(
        distance < headHeight
          ? distance
          : distance < headHeight * 2
            ? headHeight + (distance - headHeight) / 2
            : headHeight * 1.5 + (distance - headHeight * 2) / 4
      )
    },
    setStatus(distance, isLoading) {
      this.distance = distance
      const status = isLoading
        ? 'loading'
        : distance === 0
          ? 'normal'
          : distance < this.headHeight
            ? 'pulling'
            : 'loosing'

      if (status !== this.status) {
        this.status = status
      }
    },
    getTop() {
      return document.documentElement.scrollTop || document.body.scrollTop
    },
    onTouchStart(e) {
      if (!this.untouchable && this.getTop() == 0) {
        this.duration = 0
        this.down = true
        this.touchStart(event)
      }
    },
    onTouchMove(e) {
      if (this.untouchable || !this.down) {
        return
      }
      this.touchMove(event)
      const { headHeight } = this
      if (this.direction === 'vertical' && this.deltaY >= 0) {
        this.setStatus(this.ease(this.deltaY))
      }
    },
    onTouchEnd(e) {
      if (this.untouchable || !this.down) {
        return
      }
      this.down = false
      this.duration = this.animationDuration
      if (this.status === 'loosing') {
        this.$emit('input', true)
        this.setStatus(this.headHeight, true)
        this.$nextTick(() => {
          this.$emit('refresh')
        })
      } else {
        this.setStatus(0)
      }
    }
  },
  data() {
    return {
      status: '',
      distance: 0,
      duration: 0
    }
  }
}
</script>
<style>
.tj-pull-refresh {
  height: auto;
}
.refresh-tip {
  position: absolute;
  top: -50px;
  left: 0;
  width: 100%;
  height: 50px;
  overflow: hidden;
  color: #969799;
  font-size: 14px;
  line-height: 50px;
  text-align: center;
}
</style>


