<template>
  <div class="product-list">
    <div class="app-p-title">最新好车</div>
    <tj-product-list :listData="newList" @call="call"></tj-product-list>
    <div class="loading-tip" v-show="loadMore==0">
      <tj-loading color="rgba(88, 119, 222, 1)"></tj-loading>
      <span>加载中...</span>
    </div>
    <div class="look-car" v-show="loadMore==2">
      <a href="/ue/" @click.prevent="md($event, '查看更多车源')">查看更多车源</a>
    </div>
  </div>
</template>
<script>
import ProductList from "@/components/common/product-list";
import Loading from "@/components/ui/loading";
import { latestEq, getReducePriceEqList } from "@/api/index";

export default {
  name: "tj-home-list",
  props: {
    newList: Array,
    reduceList: Array,
    loadMore: Number
  },
  components: {
    [ProductList.name]: ProductList,
    [Loading.name]: Loading
  },
  computed: {
    bottomState() {
      return this.tabIndex === 0 ? this.newState : this.priceState;
    }
  },
  methods: {
    call(params) {
      this.$emit("callType", params);
    },
    md(event, val) {
      this.$emit("click", event, val);
    },
    tab(i) {
      this.tabIndex = i;
    },
    loadList() {
      if (!this.requestState) {
        if (this.tabIndex === 0 && this.newState !== 2) {
          this.newListPage();
        } else if (this.tabIndex === 1 && this.priceState !== 2) {
          this.priceListPage();
        }
      }
    },
    async newListPage() {
      this.requestState = true;
      this.newState = 0;
      let newList = [];
      try {
        let latestEqHttp = await latestEq({ pageIndex: this.newPageIndex++ });
        if (latestEqHttp.ret === 0) {
          newList = latestEqHttp.result.items;
        }
        let list = this.$parent.newList;
        this.$parent.newList = list.concat(newList);
      } catch (e) {
      } finally {
        if (newList.length < 10) {
          this.newState = 2;
        } else {
          this.newState = 1;
        }
        this.requestState = false;
      }
    },
    async priceListPage() {
      this.requestState = true;
      this.priceState = 0;
      let newList = [];
      try {
        let latestEqHttp = await getReducePriceEqList({
          pageIndex: this.pricePageIndex++
        });
        if (latestEqHttp.ret === 0) {
          newList = latestEqHttp.result.items;
        }
        let list = this.$parent.reduceList;
        this.$parent.reduceList = list.concat(newList);
      } catch (e) {
      } finally {
        if (newList.length < 10) {
          this.priceState = 2;
        } else {
          this.priceState = 1;
        }
        this.requestState = false;
      }
    }
  },
  data() {
    return {
      requestState: false,
      tabIndex: 0,
      newPageIndex: 2,
      pricePageIndex: 2,
      newState: 0,
      priceState: 0
    };
  },
  serverCacheKey() {
    return Math.floor(Date.now() / 10000);
  }
};
</script>
<style scoped>
.product-list {
  margin-top: 10px;
  background-color: #fff;
  overflow: hidden;
}
.tabs {
  display: flex;
  justify-content: center;
  align-items: center;
}
.tab {
  font-size: 16px;
  color: #6a6a77;
  position: relative;
  width: 50%;
  text-align: center;
  padding: 10px;
}
.active::after {
  position: absolute;
  bottom: 0;
  width: 40px;
  height: 2px;
  background: #486cdc;
  content: "";
  transition: all 0.3s;
  left: 50%;
  transform: translateX(-50%);
}
.active {
  color: #486cdc;
}
.app-p-title {
  margin: 15px 0 0 15px;
}
.look-car {
  width: 345px;
  height: 40px;
  line-height: 40px;
  background: rgba(88, 119, 222, 1);
  border-radius: 3px;
  margin: 24px auto 15px;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  font-size: 16px;
}
.look-car a {
  display: block;
  width: 345px;
  height: 40px;
  line-height: 40px;
  color: rgba(255, 255, 255, 1);
}
.loading-tip {
  display: flex;
  height: 45px;
  justify-content: center;
  align-items: center;
}
.loading-tip span {
  margin-left: 10px;
  color: #9ea4af;
}
</style>

