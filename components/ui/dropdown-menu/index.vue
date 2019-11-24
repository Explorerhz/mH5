<template>
  <div class="tj-dropdown-menu" ref="menu" :style="itemStyle">
    <div class="tj-dropdown-bar">
        <div class="tj-dropdown-title" v-for="(item, index) in children" 
        :key="'title_'+item.title" @click="toggleItem(index)"
        :style="widthStyle">
            <span class="tj-dropdown-title-item" :class="{'tj-dropdown-title-item-down':item.selClass}" :style="item.selColor">
                <div class="tj-dropdown-title-item-text">{{item.displayTitle}}</div>
            </span>
        </div>
    </div>
    <slot></slot>
  </div>
</template>
<script>
/**
 * 下拉菜单组件
 * @author yuguang.guo
 * @date 2019-08-15
 */
export default {
  name: "tj-dropdown-menu",
  props: {
    overlay: {
      type: Boolean,
      default: true
    },
    zIndex: {
      type: Number,
      default: 10
    },
    duration: {
      type: Number,
      default: 0.2
    },
    direction: {
      type: String,
      default: "down"
    },
    activeColor: {
      type: String,
      default: '#1989fa'
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      children:[]
    };
  },
  computed: {
    itemStyle() {
      const { vertical, computedWidth, computedHeight } = this.$parent;
      return {
        width: computedWidth + "px",
        height: vertical ? computedHeight + "px" : "100%",
        transform: `translate${vertical ? "Y" : "X"}(${this.offset}px)`
      };
    },
    widthStyle(){
      return {
        width: (100/this.children.length)+'%'
      }
    }
  },
  methods: {
      toggleItem(active){
           this.children.forEach((item, index) => {
                if (index === active) {
                    item.toggle();
                } else if (item.show) {
                    item.toggle(false);
                }
            });
      },
      updateOffset(){
        const { menu } = this.$refs;
        const rect = menu.getBoundingClientRect();

        if (this.direction === 'down') {
            this.offset = rect.bottom;
        } else {
            this.offset = window.innerHeight - rect.top;
        }
      }
  },
};
</script>
<style>
.tj-dropdown-menu{
  z-index: 9999;
}
.tj-dropdown-bar{
    display: flex;
    height: 50px;
    background-color: #fff;
    user-select: none;
}
.tj-dropdown-title {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #323233;
}
.tj-dropdown-title-item{
    position: relative;
    box-sizing: border-box;
    max-width: 100%;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 2px;
}
.tj-dropdown-title-item::after {
    border: 3px solid;
    border-color: transparent transparent currentColor currentColor;
    transform: rotate(-45deg);
    opacity: 0.8;
    content: '';
    margin-top: -1px;
}
.tj-dropdown-title-item-down::after {
    transform: rotate(135deg);
    margin-top: 5px;
}
.tj-dropdown-title-item-text{
    margin-right: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>


