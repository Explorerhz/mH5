<template>
  <div class="tj-slide-menu" ref="menu" :style="itemStyle" v-if="slideShow">
    <ul>
      <li class="tj-slide-item" 
        v-for="(item,index) in slideList" 
        :key="index"
        @click="itemClick(item.id)"
        >
        <tj-icon :name="item.icon || 'touxiang'" color="#FDFDFD"></tj-icon>
        <span>{{item.label}}</span>
      </li>
    </ul>
    <slot></slot>
  </div>
</template>
<script>
import Icon from "@/components/ui/icon";
export default {
  name: "tj-slide-menu",
  props: {
    slideList: {
      type: Array,
      default() {
        return [];
      }
    },
    slideShow:{
      type:Boolean,
      defualt:false
    }
  },
  data() {
    return {
      children: []
    };
  },
  components: {
    [Icon.name]: Icon
  },
  computed: {
    itemStyle() {
      const { computedWidth, computedHeight, computedPosition } = this.$parent;
      let top, left, bottom, right;
      switch (computedPosition) {
        case "left":
          top = 0;
          left = 0;
          break;
        case "right":
          top = 0;
          right = 0;
          break;
      }
      return {
        width: computedWidth ? computedWidth : "100%",
        height: computedHeight ? computedHeight : "100%",
        top: top,
        left: left,
        bottom: bottom,
        right: right
      };
    }
  },
  methods: {
    itemClick(id){
      this.$emit('selectSlideItem',id)
    }
  }
};
</script>
<style>
.tj-slide-menu {
  z-index: 9999;
  padding: 5px 0;
  background: #323233;
  position: fixed;
}
.tj-slide-item {
  font-size: 14px;
  height: 30px;
  line-height: 30px;
  color: #fff;
  padding-left: 10px;
}
</style>


