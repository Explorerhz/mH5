<template>
  <transition
        name="fade"
        onAfterEnter="onAfterEnter"
        onAfterLeave="onAfterLeave"
      >
      <div>
        <div class="tj-overlay" v-if="mark"></div>
        <div
          v-show="value"
          class="tj-toast" :class="class_" :style="style"
        >
        <tj-loading v-if="icon=='loading'"></tj-loading>
        <tj-icon v-else-if="icon" :name="icon" color="'#fff'"></tj-icon>
        <span class="tj-toast-text" :style="textStyle">{{message}}</span>
        </div>
      </div>
      </transition>
</template>
<script>
/**
 * 提示组件
 * @author yuguang.guo
 * @date 2019-08-15
 */
import Icon from "@/components/ui/icon";
import Loading from "@/components/ui/loading";
export default {
  name: "tj-toast",
  props: {
    icon: {
      type: String,
      default: 'none'
    },
    message: String,
    type: {
      type: String,
      default: 'text'
    },
    position: {
      type: String,
      default: 'middle'
    },
    mark: {
      type: Boolean,
      default: false
    }
  },
  components:{
    [Icon.name]: Icon,
    [Loading.name]: Loading
  },
  beforeCreate() {},
  destroyed() {
      this.noScroll(true);
  },
  mounted() {
      this.noScroll(false);
  },
  data() {
    return {
      value: true
    };
  },
  computed: {
    style(){
      const {icon, position} = this;
      let s_ = {};
      if(!icon || icon == 'none'){
        s_.minHeight = 'auto';
        s_.minWidth = 'auto';
        s_.maxWidth = '80%';
        s_.padding = '10px'
      }
      return s_;
    },
    textStyle(){
      let s_ = {};
      if(this.icon != 'none'){
        s_.marginTop = '10px';
      }
      return s_;
    },
    class_(){
      return `tj-toast-${this.position}`;
    }
  },
  watch: {
  },
  methods: {
      noScroll(isScroll){
        const action = isScroll ? 'remove' : 'add';
        this.mark && document.body.classList[action]('tj-overflow-hidden');
      },
      onAfterEnter(){

      },
      onAfterLeave(){

      }
  },
};
</script>
<style scoped>
.tj-toast {
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 120px;
    max-width: 80%;
    min-height: 120px;
    padding: 16px;
    color: #fff;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    word-break: break-all;
    background-color: rgba(50, 50, 51, 0.88);
    border-radius: 4px;
    z-index: 99999;
}
.tj-toast-top{
  top: 0;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
}
.tj-toast-middle{
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
}
.tj-toast-bottom{
  bottom: 0;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
}
.tj-overlay{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 99998;
}
.tj-icon{
  font-size: 20px;
  color: #fff;
}
</style>


