<template>
  <div class="tj-checkbox" @click.stop="onClick">
    <tj-icon :name="checked" :color="color"></tj-icon>
    <span class="tj-checkbox-label" v-if="isSlot">
      <slot></slot>
    </span>
  </div>
</template>
<script>
/**
 * 复选框组件
 * @author yuguang.guo
 * @date 2019-08-15
 */
import Icon from '@/components/ui/icon'
export default {
  name: 'tj-checkbox',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    checkedColor: {
      type: String,
      default: '#1989fa'
    }
  },
  components: {
    [Icon.name]: Icon
  },
  computed: {
    color() {
      return this.value ? this.checkedColor : '#9c9b9b'
    },
    checked() {
      return this.value ? 'checked' : 'no-checked'
    },
    isSlot() {
      return this.$slots.default
    }
  },
  methods: {
    onClick() {
      this.$emit('input', !this.value)
    }
  },
  data() {
    return {}
  }
}
</script>
<style>
.tj-checkbox {
  font-size: 0;
}
.tj-checkbox-label {
  font-size: 12px;
  margin-left: 8px;
  color: #323233;
  line-height: 20px;
}
.tj-checkbox .tj-icon {
  font-size: 24px;
}
</style>


