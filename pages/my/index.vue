<template>
  <div>
    <div style="margin-bottom:2.6rem;">
      <section class="help-header">
        <div class="help-pic">
          <img src="https://m.tiebaobei.com/res/img/menber-pic.jpg" id="photoImg">
        </div>
        <div class="help-col">
          <div class="help-title1" v-if="user.jishou_uid">
            <span id="userName">{{user.jishou_uid.substring(0, 3) + "****" + user.jishou_uid.substring(7)}}</span>
            <span class="m-labele" id="grade">拖拉机</span>
          </div>
          <a v-else
            @click="goLogin()"
            class="help-btn"
            style="transform-origin: 0px 0px 0px; opacity: 1; transform: scale(1);"
          >马上登录</a>
        </div>
      </section>

      <div class="bar-nav">
        <div class="n-nav evalNav">
          <a href="https://m.tiebaobei.com/html/eval.html">
            <img src="https://m.tiebaobei.com/res/img/menber_icon3.png">
            <p>估价工具</p>
          </a>
        </div>
        <div class="n-nav DTCCode">
          <a href="https://m.tiebaobei.com/res/microtool/faultCode.html">
            <img src="https://m.tiebaobei.com/res/img/menber_icon1.png">
            <p>故障码查询</p>
          </a>
        </div>
        <div class="n-nav yearQuery">
          <a href="https://m.tiebaobei.com/res/microtool/year.html">
            <img src="https://m.tiebaobei.com/res/img/menber_icon2.png">
            <p>年份查询</p>
          </a>
        </div>
        <div class="n-nav repairKeep">
          <a href="https://m.tiebaobei.com/res/repair/maintain-list.html">
            <img src="https://m.tiebaobei.com/res/img/menber_icon4.png">
            <p>维修保养</p>
          </a>
        </div>
      </div>
    </div>
    <tj-tabbar :index="3"/>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import TabBar from '@/components/common/tab-bar';
export default {
  components: {  [TabBar.name]:TabBar },
  computed: {
    ...mapGetters("user", ["user"])
  },
  methods: {
    goLogin(){
      this.$router.push('/login')
    }
  },
  data() {
    return {
      a: "abc"
    };
  }
};
</script>

<style>
.help-header {
  background: #fff;
  display: flex;
  position: relative;
  padding: 0.33rem 0 0.31rem 0.18rem;
}
.help-header .help-col {
  flex: 1;
  position: relative;
  height: 1.07rem;
}
.help-header .help-pic img {
  margin-right: 0.25rem;
  float: left;
  display: block;
  width: 1.07rem;
  height: 1.07rem;
  border-radius: 9999px;
}
.help-header .help-btn {
  width: 1.4rem;
  line-height: 0.4rem;
  color: #028ce6;
  border: 1px solid #028ce6;
  font-size: 0.26rem;
  display: inline-block;
  text-align: center;
  position: absolute;
  left: 0;
  top: 50%;
  margin-top: -0.2rem;
  border-radius: 4px;
}
.help-header .help-title1 {
    color: #333;
    font-size: .28rem;
    line-height: 1.07rem;
}
.help-header .m-labele {
    background: #028ce6;
    color: #fff;
    font-size: .21rem;
    padding: .05rem .1rem;
    border-radius: 4px;
    margin: 0 .07rem;
}
.bar-nav {
  background: #fff;
  position: relative;
  overflow: hidden;
  margin-top: 0.25rem;
  height: 2.6rem;
}
.bar-nav .n-nav {
  width: 25%;
  float: left;
  display: block;
  line-height: 1;
}
.bar-nav .n-nav a {
  display: block;
}
.bar-nav img {
  width: 0.38rem;
  height: 0.38rem;
  margin-bottom: 0.3rem;
  margin-top: 0.5rem;
}
.bar-nav .n-nav p {
  width: 100%;
  overflow: hidden;
  color: #9ea4af;
  font-size: 0.26rem;
  line-height: 1.2;
}
</style>
