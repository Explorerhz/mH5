<template>
  <div class="tab-con">
    <ul class="tab-head" id="typeList">
      <li
        :class="{act:tabIndex===index}"
        v-for="(item,index) in listData"
        :key="'s_'+item.id"
        @click="tab(index)"
      ><span>{{item.name}}</span></li>
    </ul>
    <div class="tab-items" id="subTypeList">
      <template v-for="(item,index) in listData">
        <div class="item" v-if="tabIndex===index" :key="'s_i'+item.id">
          <a
            v-for="item_ in item.items"
            :key="'s_i_s'+item_.id"
            :href="'https://m.tiebaobei.com/html/baikeDetail.html?newsId='+item_.items.id+'&amp;newsType=N&amp;newsTxtType='+item_.name+'&amp;newsParTxtType='+item.name"
          >
            <em>【{{item_.name}}】</em>
            {{item_.items.name}}
          </a>
        </div>
      </template>
    </div>
    <div class="luntan-more"><a href="https://m.tiebaobei.com/html/baike.html"><span>更多</span></a></div>
  </div>
</template>
<script>
export default {
  name: "tj-home-strategy",
  props: {
    listData: Array
  },
  methods: {
    tab(index) {
      this.tabIndex = index;
    }
  },
  data() {
    return {
      tabIndex: 0
    };
  },
  serverCacheKey () {
    return Math.floor(Date.now() / 10000)
  }
};
</script>
<style scoped>
.tab-con {
  background-color: #fff;
  padding-top: 5px;
}
.tab-head {
  height: 32px;
  padding: 0 16px;
  display: flex;
  border-bottom: solid 1Px rgba(238,238,238,1);
}
.tab-head li {
  flex: 1;
  color:rgba(153,153,153,1);
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.tab-head li span{
  height: 25px;
}
.tab-head li.act span {
  color: rgba(51,51,51,1);
  border-bottom: 2px solid #486cdc;
}
.tab-items {
  padding: 16px 0 0;
  width: 100%;
}
.item a {
  margin: 0 16px 14px;
  width: 340px;
  line-height: 1.2;
  display: block;
  font-size: 14px;
  color: rgba(51,51,51,1);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.item a em {
  color: rgba(51,51,51,1);
  margin-right: 2px;
}
</style>

