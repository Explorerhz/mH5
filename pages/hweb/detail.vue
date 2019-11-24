<template>
  <div>
      <div style="margin-bottom:2.6rem;" @click="ok()">设备详情页</div>
  </div>
</template>

<script>
import TabBar from '@/components/common/tab-bar';

// import {
//   oks
// } from "@/api/eqDetail";

export default {
  components: { [TabBar.name]:TabBar},
  head() {
    return {
      title: this.title,
      meta: [
        { hid: "description", name: "description", content: this.content }
      ]
    };
  },
  mounted() {
    document.addEventListener("scroll", this.scrollEvent);
  },
  destroyed() {
    window.removeEventListener("scroll", this.scrollEvent);
  },
  computed: {
  },
  methods: {
    scrollEvent(e) {
      // this.$refs.homeHead.scrollEvent(e);
      // let scrollHeight =
      //   document.documentElement.scrollHeight || document.body.scrollHeight;
      // let clientHeight =
      //   document.documentElement.clientHeight || document.body.clientHeight;
      // let scrollTop =
      //   document.documentElement.scrollTop || document.body.scrollTop;

      // if (scrollHeight - scrollTop == clientHeight) {
      //   this.$refs.homeList.loadList();
      // }
    },
    ok(){
      // oks({ pageIndex: 1 });
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
    console.log("eqId=",query.eqId);
  },
  data(){
    return {
      title: "",
      content:"",
      
    }
  }
}
</script>

<style>
</style>
