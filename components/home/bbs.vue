<template>
  <div>
    <div class="luntan-zixun" id="load-height">
      <div class="title">
        <div class="title-middle">
          <span class="title-luntan" :class="{active:tabIndex===0}" @click="tab($event,0)">论坛</span>
          <span class="title-zixun" :class="{active:tabIndex===1}" @click="tab($event,1)">资讯</span>
        </div>
      </div>

      <div class="content" v-if="listData">
        <ul class="content-luntan" :class="{active:tabIndex===0}">
          <a
            v-for="item in listData.forumList"
            :key="'forum_'+item.id"
            :href="'https://m.tiebaobei.com/xzb/'+item.relId+'.html'"
          >
            <li>{{item.title}}</li>
          </a>
        </ul>
        <ul class="content-zixun" :class="{active:tabIndex===1}">
          <a
            v-for="item in listData.newsList"
            :key="'news_'+item.id"
            :href="'https://m.tiebaobei.com/xzn/'+item.relId+'.html'"
          >
            <li>{{item.title}}</li>
          </a>
        </ul>
      </div>
      <div class="luntan-more">
        <a
          href="https://m.tiebaobei.com/html/luntanZixun.html"
          @click.prevent="md($event,'论坛&资讯-更多')"
        >
          <span>更多</span>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "tj-home-bbs",
  props: {
    listData: Object
  },
  methods: {
    tab(event, index) {
      this.tabIndex = index;
      this.md(event, index == 0 ? "论坛" : "资讯");
    },
    md(event, val) {
      this.$emit("click", event, val);
    }
  },
  data() {
    return {
      tabIndex: 0
    };
  },
  serverCacheKey() {
    return Math.floor(Date.now() / 10000);
  }
};
</script>
<style scoped>
.luntan-zixun {
  width: 100%;
  padding: 16px 16px 0;
  background: #fff;
  margin-top: 10px;
}
.title {
  position: relative;
  border-bottom: solid 1px #f9f9f9;
}
.title-middle {
  font-weight: 700;
  font-size: 18px;
  color: rgba(51, 51, 51, 1);
  margin: 0 auto;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.title span {
  text-align: center;
  font-size: 16px;
  height: 35px;
}
.title span.active {
  border-bottom: 2px solid #486cdc;
}
.title-zixun {
  margin-left: 55px;
}
.content {
  margin-top: 16px;
}
.content ul.active {
  display: block;
}
.content ul {
  display: none;
}
.content li {
  font-size: 14px;
  color: #6e6e7b;
  height: 28px;
  width: 340px;
  line-height: 28px;
  overflow: hidden;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  white-space: nowrap;
}
</style>

