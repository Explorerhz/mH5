<template>
  <div class="tj-bottom-bar">
    <span class="jiangjia" @click.stop="jiangjia" v-if="reduction">降价通知</span>
    <!--<span class="kefu" @click.stop="kefu">客服</span>
    <span class="yuyue" @click.stop="yuyue">预约看车</span>-->
    <span class="kanche" @click.stop="kanche">联系管家</span>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "tj-bottom-bar",
  props: {
    report: Object,
    eqTile:String,
    eqUrl:String,
    eqLabel:String,
    eqPic:String,
    reduction:Boolean
  },
  computed: {
    ...mapGetters("user", ["user"])
  },
  methods: {
    jiangjia() {
      this.$emit('mdJj', '降价通知');
      this.$parent.$refs.price_reduction.show = true;
    },
    kefu() {
      const uid = this.user.userId?this.user.userId:sa.store.getDistinctId();
      const title_info = encodeURIComponent(this.eqTile);
      const url_info = encodeURIComponent(this.eqUrl);
      const label_info = encodeURIComponent(this.eqLabel);
      const thumbnail_info = encodeURIComponent(this.eqPic);
      const url = `https://www.sobot.com/chat/h5/index.html?sysNum=655e76d962df4580897fbaf55a4dbf92&moduleType=4&partnerId=${uid}&title_info=${title_info}&url_info=${url_info}&label_info=${label_info}&thumbnail_info=${thumbnail_info}`;
      window.location.href = url;
    },
    yuyue() {},
    kanche() {
      this.$emit('md', '联系管家', '联系管家');
    }
  },
  data() {
    return {
      show: true
    };
  },
  serverCacheKey() {
    return Math.floor(Date.now() / 10000);
  }
};
</script>
<style scoped>
.tj-bottom-bar {
  height: 49px;
  width: 100%;
  background: rgba(255, 255, 255, 1);
  overflow: hidden;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  z-index: 999;
}
.jiangjia,
.kefu,
.yuyue,
.kanche {
  display: flex;
  justify-content: center;
  align-items: center;
}
.jiangjia,
.kefu {
  width: 70px;
  flex-direction: column;
  font-size: 11px;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
}
.yuyue,
.kanche {
  flex: 2;
  border-radius: 3px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  margin: 7px;
}
.jiangjia::before,
.kefu::before,
.yuyue::before,
.kanche::before {
  content: "";
  display: block;
  width: 17px;
  height: 17px;
}
.jiangjia::before,
.kefu::before {
  margin-bottom: 4px;
}
.yuyue::before,
.kanche::before {
  margin-right: 4px;
}
.jiangjia::before {
  background: url(../../assets/images/v19-10/jiangjia@2x.png) no-repeat;
  background-size: 100% 100%;
}
.kefu::before {
  background: url(../../assets/images/v19-10/kefu@2x.png) no-repeat;
  background-size: 100% 100%;
}
.yuyue::before {
  background: url(../../assets/images/v19-10/yuyue@2x.png) no-repeat;
  background-size: 100% 100%;
}
.kanche::before {
  background: url(../../assets/images/v19-10/callw.png) no-repeat;
  background-size: 100% 100%;
}
.yuyue {
  background: rgba(72, 108, 220, 1);
}
.kanche {
  background: rgba(246, 106, 26, 1);
}
</style>

