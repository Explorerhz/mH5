<template>
  <section class="carBasic" id="performance_show">
        <header class="title">竞拍流程</header>
        <ul class="jp-flow clearfix">
          <li>
            <img src="../assets/images/jp-flow-register-1.png" alt>
            <br>
            <br>注册平台用户
          </li>
          <li>
            <img src="../assets/images/jp-flow-cz-2.png" alt>
            <br>
            <br>充值押金
          </li>
          <li>
            <img src="../assets/images/jp-flow-bid-3.png" alt>
            <br>
            <br>竞价
          </li>
          <li>
            <img src="../assets/images/jp-flow-finish-4.png" alt>
            <br>
            <br>撮合
          </li>
          <li>
            <img src="../assets/images/jp-flow-last-4.png" alt>
            <br>
            <br>线下提车
          </li>
        </ul>
      </section>
</template>

<script>
export default {
    name: 'jpFlow',
    props:{
        listData: Array,
    },
  components: {},
  data(){
    return {
      a:'abc'
    }
  }
}
</script>

<style>
.carBasic ul,
.circumstances ul {
  overflow: auto;
  padding: 0 0.8rem;
}
.carBasic ul li,
.circumstances ul li {
  float: left;
  width: 33.333%;
  padding: 0.8rem 0 0;
}
.carBasic ul li .cb_top,
.circumstances ul li .cb_top {
  font-size: 0.74667rem;
  height: 1.33333rem;
  line-height: 1.33333rem;
  width: 6.13333rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: bottom;
  font-weight: normal;
}
.carBasic ul li .cb_btm,
.circumstances ul li .cb_btm {
  color: #9ea4af;
  font-size: 0.64rem;
  height: 1.33333rem;
  line-height: 1.33333rem;
  width: 6.13333rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: normal;
}
ul,
li,
dl,
dt,
dd,
ol {
  list-style: none;
}
.color_4A4A53,
.carMainInfo .pricLookUpdata,
.carBasic ul li .cb_lt,
.circumstances ul li .cb_lt,
.carBasic ul li .cb_top,
.circumstances ul li .cb_top,
.circumstances .cb_lt,
#basicConsignor .cb_lt,
.carCheckout .checkInfo .ck_name .ck_p_1,
header.title {
  color: #4a4a53;
}
</style>