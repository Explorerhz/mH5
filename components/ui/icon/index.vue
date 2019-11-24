<template>
  <i class="tj-icon"
     :class="['tj-icon-'+name]"
     :style="size_"></i>
</template>
<script>
/**
 * 图标组件
 * @author yuguang.guo
 * @date 2019-08-15
 */
import { isNumber } from '../utils'
export default {
  name: "tj-icon",
  props: {
    name: String,
    size: {
      type: String | Number,
      default: 14
    },
    color: {
      type: String,
      default: '#333333'
    }
  },
  computed: {
    size_ () {
      const { size, color } = this;
      const sizeUnit = isNumber(size) ? size + "px" : size;
      return {
        color: color
      }
    }
  },
};
</script>
<style scoped>
</style>


