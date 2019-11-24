<template>
  <div class="tj-progress" :style="bgStyle">
      <span class="tj-progress-portion" :style="portionStyle">
          <span class="tj-progress-text" :style="pivotStyle">{{text}}</span>
      </span>
  </div>
</template>
<script>
/**
 * 进度条组件
 * @author yuguang.guo
 * @date 2019-08-15
 */
export default {
  name: "tj-progress",
  props: {
    pivotText: String,
    pivotColor: String,
    percentage: {
      type: Number,
      required: true,
      validator: value => value >= 0 && value <= 100
    },
    showPivot: {
      type: Boolean,
      default: true
    },
    color: {
      type: String,
      default: '#1989fa'
    },
    bgColor: {
      type: String,
      default: '#e5e5e5'
    },
    textColor: {
      type: String,
      default: '#fff'
    },
    height:{
        type: Number,
      default: 4 
    }
  },
  beforeCreate() {},
  destroyed() {},
  mounted() {
      this.getWidth();
  },
  data() {
    return {
      progressWidth: 0
    };
  },
  computed: {
    bgStyle() {
      return {
        background: this.bgColor,
        height: this.height + 'px'
      };
    },
    portionStyle(){
      return {
        background: this.color,
        width: (this.progressWidth * (this.percentage/100))+'px'
      };
    },
    pivotStyle() {
      return {
        color: this.textColor,
        background: this.pivotColor?this.pivotColor:this.color,
        display: this.showPivot?'block':'none'
      };
    },
    text(){
        const {pivotText, percentage} = this;
        return pivotText?pivotText:percentage+'%';
    }
  },
  watch: {
  },
  methods: {
      getWidth() {
        this.$nextTick(() => {
            this.progressWidth = this.$el.offsetWidth;
        });
        }
  },
};
</script>
<style scoped>
.tj-progress {
  position: relative;
    height: 4px;
    background: #e5e5e5;
    border-radius: 4px;
}
.tj-progress-portion{
    position: absolute;
    left: 0;
    height: 100%;
    border-radius: inherit;
}
.tj-progress-text{
    position: absolute;
    top: 50%;
    right: 0;
    box-sizing: border-box;
    min-width: 2em;
    padding: 0 5px;
    font-size: 10px;
    line-height: 1.6;
    text-align: center;
    word-break: keep-all;
    background-color: #e5e5e5;
    border-radius: 1em;
    transform: translate(100%, -50%);
}
</style>


