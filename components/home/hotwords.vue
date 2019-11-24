<template>
  <div class="app-wrap-nav">
    <ul>
      <li class="word">
        <a
          class="a0"
          href="/ue/price10/"
          title="10万元以下二手挖掘机转让价格信息"
          @click.prevent="md($event, '10万以下')"
        >10万以下</a>
      </li>
      <li class="word">
        <a
          class="a0"
          href="/ue/price10_20/"
          title="10-20万元二手挖掘机转让价格信息"
          @click.prevent="md($event, '10万-20万')"
        >10万-20万</a>
      </li>
      <li class="word">
        <a
          class="a0"
          href="/ue/price20_30/"
          title="20-30万元二手挖掘机转让价格信息"
          @click.prevent="md($event, '20-30万')"
        >20-30万</a>
      </li>
      <li class="word">
        <a
          class="a0"
          href="/ue/price30_50/"
          title="30-50万元二手挖掘机转让价格信息"
          @click.prevent="md($event, '30-50万')"
        >30-50万</a>
      </li>
      <li class="word">
        <a
          class="a0"
          href="/ue/wajueji/t6_10/"
          title="6-9吨二手小型挖掘机报价大全"
          @click.prevent="md($event, '6-9吨')"
        >6-9吨</a>
      </li>
      <li class="word">
        <a
          class="a0"
          href="/ue/wajueji/t10_20/"
          title="10-20吨二手小型挖掘机报价大全"
          @click.prevent="md($event, '10-19吨')"
        >10-19吨</a>
      </li>
      <li class="word">
        <a
          class="a0"
          href="/ue/wajueji/t20_30/"
          title="20-30吨二手小型挖掘机报价大全"
          @click.prevent="md($event, '20-30吨')"
        >20-30吨</a>
      </li>
      <li class="word">
        <a
          class="a0"
          href="/ue/wajueji/t30/"
          title="30吨以上二手小型挖掘机报价大全"
          @click.prevent="md($event, '30吨以上')"
        >30吨以上</a>
      </li>
      <li class="word">
        <a href="/ue/komatsu/" @click.prevent="md($event, '小松')" title="二手小松转让信息">
          <div class="word-div">
            <img src="../../assets/images/v19-10/xs.png"  />
            <p>小松</p>
          </div>
        </a>
      </li>
      <li class="word">
        <a href="/ue/sany/" @click.prevent="md($event, '三一')" title="二手三一转让信息">
          <div class="word-div">
            <img src="../../assets/images/v19-10/sy.png" />
            <p>三一</p>
          </div>
        </a>
      </li>
      <li class="word">
        <a href="/ue/caterpillar/" @click.prevent="md($event, '卡特')" title="二手卡特转让信息">
          <div class="word-div">
            <img src="../../assets/images/v19-10/kate.png" />
            <p>卡特</p>
          </div>
        </a>
      </li>
      <li class="word">
        <a href="/ue/doosan/" @click.prevent="md($event, '斗山')" title="二手斗山转让信息">
          <div class="word-div">
            <img src="../../assets/images/v19-10/doushan.png" />
            <p>斗山</p>
          </div>
        </a>
      </li>
      <li class="word-after"></li>
    </ul>
    <div class="look-car">
      <a href="/ue/" @click.prevent="md($event, '查看全部车源')" title="二手工程机械转让信息全部查看">查看全部车源</a>
    </div>
  </div>
</template>
<script>
export default {
  name: "tj-home-words",
  props: {
    listData: Array
  },
  created() {},
  computed: {
    parseWord() {
      return function(v) {
        let words = v.split(/\n/g);
        let word = v;
        if (words.length == 2) {
          word = `${words[0]}<span>${words[1]}</span>`;
        }
        return word;
      };
    }
  },
  methods: {
    md(event, val) {
      this.$emit("click", event, val);
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
.app-wrap-nav {
  background: #fff;
  margin-top: 10px;
  overflow: hidden;
}
.word a.a0 {
  display: block;
  font-size: 13px;
  color: rgba(102, 102, 102, 1);
  height: 25px;
  line-height: 25px;
  width: 71px;
  text-align: center;
  background: rgba(244, 244, 244, 1);
}
.word >>> span {
  font-size: 0.22rem;
  color: #999;
  display: block;
}
.word {
  width: 25%;
  height: 25px;
  font-size: 13px;
  display: flex;
  float: left;
  white-space: pre-wrap;
  margin: 15px 0 6px;
  justify-content: center;
}
.word-after {
  clear: both;
  content: "";
  width: 0;
  height: 0;
}
.word-div {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 12px;
  color: rgba(102, 102, 102, 1);
}
.word-div img {
  width: 58.5px;
  height: 18.5px;
}
.word-div p {
  padding-top: 5px;
}
.look-car {
  width: 345px;
  height: 35px;
  line-height: 35px;
  background: rgba(88, 119, 222, 1);
  border-radius: 3px;
  margin: 24px auto 15px;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  font-size: 14px;
}
.look-car a {
  color: rgba(255, 255, 255, 1);
  width: 345px;
  height: 35px;
  line-height: 35px;
  display: block;
}
</style>

