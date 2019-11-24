<template>
  <div class="tj-dialog" v-show="value">
    <div class="tj-overlay"></div>
    <div class="tj-dialog-area">
      <div class="tj-dialog-header" v-if="title">
        {{title}}
      </div>
      <div class="tj-dialog-message" v-if="message">
        {{message}}
      </div>
      <div class="tj-dialog-footer" v-if="showCancel || showConfirm">
        <span class="tj-dialog-cancel" v-if="showCancel" 
        :style="{color:cancelColor}"
        @click="handleAction('cancel')">{{cancelText}}</span>
        <span class="tj-dialog-confirm" v-if="showConfirm" 
        :style="{color:confirmColor}"
        @click="handleAction('confirm')">{{confirmText}}</span>
      </div>
    </div>
  </div>
</template>
<script>
/**
 * 弹窗组件
 * @author yuguang.guo
 * @date 2019-08-15
 */
export default {
  name: "tj-dialog",
  props: {
    title: String,
    message: String,
    mark: {
      type: Boolean,
      default: true
    },
    cancelText: {
      type:String,
      default:'取消'
    },
    cancelColor: {
      type:String,
      default:'#323233'
    },
    confirmText: {
      type:String,
      default:'确定'
    },
    confirmColor: {
      type:String,
      default:'#1989fa'
    },
    showCancel: Boolean,
    showConfirm: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    size_() {
      const { size, color } = this;
      const sizeUnit = isNumber(size) ? size + "px" : size;
      return {
        color: color
      };
    }
  },
  methods: {
    handleAction(action){
      this.$emit(action);
      this.value = false;
      action === 'confirm' ? this.resolve(action) : this.reject(action);
    }
  },
  data() {
    return {
      value: true
    };
  }
};
</script>
<style scoped>
.tj-dialog{
  font-size: 16px;
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
.tj-dialog-area{
  z-index: 99999;
}
.tj-dialog-area{
  position: fixed;
    top: 45%;
    left: 50%;
    width: 85%;
    overflow: hidden;
    font-size: 16px;
    background-color: #fff;
    border-radius: 4px;
    transform: translate3d(-50%, -50%, 0);
    backface-visibility: hidden;
    transition: 0.3s;
}
.tj-dialog-header {
    padding-top: 24px;
    font-weight: 500;
    line-height: 24px;
    text-align: center;
}
.tj-dialog-message {
    max-height: 60vh;
    padding: 24px;
    overflow-y: auto;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    -webkit-overflow-scrolling: touch;
}
.tj-dialog-footer {
    overflow: hidden;
    user-select: none;
    display: flex;
    border-top: 1px solid #ebedf0;
    font-size: 16px;
}
.tj-dialog-cancel{
  color: #323233;
}
.tj-dialog-confirm{
  color: #1989fa;
}
.tj-dialog-cancel, .tj-dialog-confirm{
  flex: 1;
  background-color: #fff;
  height: 50px;
  line-height: 48px;
  text-align: center;
}
.tj-dialog-footer span:nth-of-type(2){
  border-left: 1px solid #ebedf0;
}
</style>


