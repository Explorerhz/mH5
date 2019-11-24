<template>
  <div class="tj-tabs">
    <!-- tab-item -->
    <div class="tj-tabs-box">
      <div class="tj-tabs-bar" :style="option.style">
        <div class="tabs-tab" :style="tabStyle(item)" v-for="(item,index) in navList" @click="handleChange(index)" :key="item.name">
          {{item.label}}
        </div>
      </div>
    </div>
    <!-- pane content -->
    <div class="tabs-content" ref="content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "tj-tabs",
  data() {
    return {
      currentValue: this.value,
      navList: [],
      style:{ // 默认样式
        "color":"#000"
      },
      active:{ // 默认样式
        "color": "#6290FD",
        "border-bottom": "2px solid #6290FD"
      }
    };
  },
  props: {
    value: {
      value: [String, Number],
      required: false,
    },
    option: {
      type: Object,
      default(){
        return {
          style:{ // 默认样式
            "color":"#000"
          },
          active:{ // 默认样式
            "color": "#6290FD",
            "border-bottom": "2px solid #6290FD"
          }
        }
      }
    },
  },
  beforeCreate() {},
  destroyed() {},
  computed: {},
  watch: {},
  methods: {
    // 设置默认样式
    tabStyle (item) {
      if(!this.option.style)this.option.style = this.style;
      if(item.name === this.currentValue){
        if(!this.option.active)this.option.active = this.active;
        return this.option.active;
      }
    },
    // 获取子组件（vue实例）
    getTabs () {
      return this.$children.filter(function (item) {
        return item.$options.name === 'tj-tabs-item'
      })
    },
    //获取标题，name,并放置到navList数组中
    updateNav () {
      this.navList = []
      let _this = this
      this.getTabs().forEach(function (pane, index) {
        _this.navList.push({
          label: pane.label,
          name: pane.name || index
        })
        if (!pane.name) pane.name = index
        if (index === 0) {
          if (!_this.currentValue) {
            _this.currentValue = pane.name || index
          }
        }
      })
      this.updateStatus()
    },
    // 设置子组件属性值
    updateStatus () {
      let tabs = this.getTabs()
      let _this = this
      tabs.forEach(function (tab) {
        let b = tab.name === _this.currentValue
        tab.show = b
        return tab.show
      })
    },
    // 点击事件
    handleChange (index) {
      let nav = this.navList[index]
      let name = nav.name
      this.currentValue = name
      this.$emit('input', name)
      this.$emit('on-click', name)
    }
  },
  watch: {
    value: function (val) {
      this.currentValue = val
    },
    currentValue () {
      this.updateStatus()
    }
  },
  mounted(){
  }
};
</script>
<style scoped>
  .tj-tabs-box{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: #fff;
    z-index: 100;
  }
  .tj-tabs-bar{
    display: flex;
    text-align: center;
    font-size: 14px;
    line-height: 35px;
    height: 35px;
  }
  .tabs-tab{
    flex: 1;
    line-height: 35px;
    height: 35px;
  }
  .tabs-content{
    overflow: hidden;
  }
</style>


