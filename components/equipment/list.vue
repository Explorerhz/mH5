<template>
  <div class="tj-list">
    <div class="tj-list-title">
      <span :class="{active:tabIndex===0}" @click="tab($event,0)">相似推荐</span>
      <span class="tj-list-title-t2" :class="{active:tabIndex===1}" @click="tab($event,1)">猜你喜欢</span>
    </div>
    <tj-product-list :style="{display:tabIndex===0?'block':'none'}" :listData="newList" @call="call" :idd="1"></tj-product-list>
    <tj-product-list-01 :style="{display:tabIndex===1?'block':'none'}" :listData="reduceList" @call="call" :idd="2"></tj-product-list-01>
  </div>
</template>
<script>
import ProductList from "@/components/common/product-list";
import ProductList01 from "@/components/common/product-list-01";
export default {
  name: "tj-eq-list",
  components: {
    [ProductList.name]: ProductList,
    [ProductList01.name]: ProductList01
  },
  props: {
    newList: Array,
    reduceList: Array
  },
  methods: {
    call(params) {
      this.$emit("callType", params);
    },
    tab(event, index) {
      this.tabIndex = index;
    },
    close() {
      this.show = false;
    }
  },
  data() {
    return {
      show: true,
      tabIndex: 0
    };
  }
};
</script>
<style scoped>
.tj-list {
  margin-top: 10px;
  background: #fff;
}
.tj-list-title {
  height: 55px;
  border-bottom: solid 1px #f9f9f9;
  font-size: 17px;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  display: flex;
  justify-content: space-evenly;
  align-items: flex-end;
}

.tj-list-title span {
  text-align: center;
  font-size: 16px;
  height: 35px;
}
.tj-list-title span.active {
  border-bottom: 2px solid #486cdc;
}
</style>

