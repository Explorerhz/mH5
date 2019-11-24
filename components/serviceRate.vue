<template>
<div>
  <section class="fidelityBox" id="fidelityBox">
        <header class="title serviceRate">
          服务保障
          <!--<i class='icon-uniE612'></i>-->
        </header>
        <div class="serviceType">
          <div class="iconSingleNew">
            <div class="img">
              <img src="../assets/images/carImg/tjb_1.png">
              <span>非事故</span>
            </div>
          </div>

          <div class="iconSingleNew">
            <div class="img">
              <img src="../assets/images/carImg/tjb_2.png">
              <span>非火烧</span>
            </div>
          </div>

          <div class="iconSingleNew">
            <div class="img">
              <img src="../assets/images/carImg/tjb_3.png">
              <span>非水淹</span>
            </div>
          </div>

          <div class="iconSingleNew">
            <div class="img">
              <img src="../assets/images/carImg/tjb_4.png">
              <span>品牌保真</span>
            </div>
          </div>

          <div class="iconSingleNew">
            <div class="img">
              <img src="../assets/images/carImg/tjb_5.png">
              <span>型号保真</span>
            </div>
          </div>

          <div class="iconSingleNew">
            <div class="img">
              <img src="../assets/images/carImg/tjb_6.png">
              <span>年份保真</span>
            </div>
          </div>
        </div>
      </section>

      <section class="carBasic" id="basicData_show" style="padding-bottom: 10px;">
        <header class="title" id="jump1">设备介绍</header>
        <ul>
          <li>
            <p class="cb_top">2017年</p>
            <p class="cb_btm">出厂时间</p>
          </li>

          <li>
            <p class="cb_top">3700小时</p>
            <p class="cb_btm">表显小时数</p>
          </li>

          <li>
            <p class="cb_top">湖北-鄂州市</p>
            <p class="cb_btm">停放地点</p>
          </li>

          <li>
            <p class="cb_top">2019-05-29</p>
            <p class="cb_btm">发布时间</p>
          </li>
        </ul>
      </section>
    </div>
</template>

<script>
export default {
    name: 'serviceRate',
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
</style>