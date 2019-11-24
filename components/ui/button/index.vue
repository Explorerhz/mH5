<template>
  <div class="tj-button" :class="class_" :style="style_" @click.stop="onClick">
    <tj-icon :name="iconname" :color="color"></tj-icon>
    <span><slot></slot></span>
  </div>
</template>
<script>
import Icon from "@/components/ui/icon";
export default {
  name: "tj-button",
  data() {
    return {
    };
  },
  props: {
    iconname: {
      value: [String, Number],
      required: false
    },
    color: {
      type: String,
      default: '#000'
    },
    position:{
      type: String,
      default: 'left'
    },
    bgColor:{
      type: String,
      default: '#5A8EF8'
    }
  },
  components: {
    [Icon.name]: Icon
  },
  beforeCreate() {},
  destroyed() {},
  computed: {
    // 图标名称
    btnname(){
      return this.iconname ? this.iconname : '';
    },
    // 图标位置
    class_ () {
      const { position } = this;
      let className = '';
      if(position == 'left'){
        className = 'position-left';
      }else if(position == 'top'){
        className = 'position-top';
      }
      return className;
    },
    // 内部文本样式，背景样式
    style_ () {
      const { color,bgColor} = this;
      return {
        color: color,
        background:bgColor
      }
    }
  },
  watch: {},
  methods: {
    // 点击事件
    onClick(){
      this.$emit('on-click');
    }
  },
  watch: {
  },
  mounted(){
  }
};
</script>
<style scoped>
  .tj-button{
    box-sizing: border-box;
    min-width: 100px;
    text-align: center;
    display: inline-block;
    font-size: 14px;
    flex: 1;
  }
  .tj-button.position-left{
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
  }
  .tj-button.position-top{
    height: 40px;
    padding: 3px 10px;
  }
  .tj-button.position-top span{
    display: block;
  }
</style>


