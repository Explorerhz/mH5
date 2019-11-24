<template>
  <div class="tj-buyer" :style="{opacity:opacity}">
      <div class="tj-buyer-txt">
          {{txt}}
      </div>
  </div>
</template>

<script>
let TIMEOUT_;
export default {
  name: "tj-home-buyer",
  props: {
    listData: Array
  },
  components: {},
  head() {
    return {
      title: this.title
    };
  },
  watch: {
    listData() {
        if(this.listData.length>0){
            this.timeout();
        }
    }
  },
  mounted() {},
  destroyed() {},
  computed: {},
  methods: {
    timeout() {
      TIMEOUT_ & clearTimeout(TIMEOUT_);
      TIMEOUT_ = setTimeout(() => {
          if(!this.opacity){
              this.txt = this.listData[this.num];
              this.num++;
              if(this.listData.length-1 < this.num){
                  this.num = 0;
              }
          }
          this.opacity = this.opacity?0:1;
          this.timeout();
      }, 4000);
    }
  },
  async asyncData({
    isDev,
    route,
    store,
    env,
    params,
    query,
    req,
    res,
    redirect,
    error
  }) {
    return {};
  },
  data() {
    return {
      opacity: 0,
      txt:'',
      num:0
    };
  },
  serverCacheKey() {
    return Math.floor(Date.now() / 10000);
  }
};
</script>

<style scoped>
.tj-buyer {
  position: absolute;
  top: 26px;
  right: 15px;
  width: 215px;
  height: 23px;
  background: rgba(0, 0, 0, 0.69);
  border-radius: 11px;
  transition-duration: 300ms;
  opacity: 1;
  padding: 0 10px;
}
.tj-buyer-txt {
  font-size: 12px;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  transform: scale(0.9);
  transform-origin: 0 0;
  width: 215px;
  height: 23px;
  line-height: 23px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
