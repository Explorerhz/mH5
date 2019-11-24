<template>
  <div class="tj-report" v-if="report.reportId" id="tj-report-02">
    <div class="tj-report-bg">
      <div class="tj-report-title">看车报告</div>
      <div class="tj-report-num">
        <span>编号：{{report.reportId}}</span>
      </div>
      <div class="tj-report-result" v-if="report.remark">
        <p>
          <span>看车结果：</span>
          {{report.remark}}
        </p>
      </div>
      <div class="tj-report-img"></div>
      <ul class="tj-report-ul">
        <li class="tj-report-li" v-for="item in report.listModel" :key="'report-'+item.id" @click="more(item.name)">
          <div class="tj-report-li-title">
            <span :class="['tj-report-li-r'+item.id]"></span>
            {{item.name}}
          </div>
          <div class="tj-report-li-num">
            <span class="tj-report-li-abnormal">{{item.abnormal}}</span>
            <span class="tj-report-li-normal">{{item.normal}}</span>
            <span class="tj-report-li-go"></span>
          </div>
        </li>
      </ul>
      <div class="tj-report-bottom">
        <div class="tj-report-more" :title="eqTitle+'看车真实报告'" @click="more('查看详细看车内容')">查看详细看车内容</div>
        <div class="tj-report-notes"><span>*</span>仅代表{{report.createDate}} 铁甲管家现场看车结果，最终车况以现场看车为准。</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "tj-eq-report",
  props: {
    report: Object,
    eqId:String,
    eqTitle:String
  },
  computed: {
    li(id) {
      return function(id) {
        return {
          background: `url(../../assets/images/v19-10/r${id}.png) no-repeat`
        };
      };
    }
  },
  mounted() {
    // this.$nextTick(() => {
    //   this.getPosition();
    // });
  },
  methods: {
    getPosition(){
      const report = document.getElementById("tj-report-02");
      if (report) {
        this.$parent.nav2 = report.offsetTop;
        this.$parent.nav2_1 = report.offsetHeight;
      }
    },
    more(title){
      this.md(null, title);
    },
    md(event, val) {
      this.$emit("md", event, val, ()=>{
        window.location.href = `/baogao/${this.eqId}.html`;
      });
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
.tj-report {
  margin-top: 10px;
  background: rgba(255, 255, 255, 1);
  overflow: hidden;
}
.tj-report-bg {
  width: auto;
  margin: 10px 14px;
  padding: 15px 23px;
  background: url(../../assets/images/v19-10/report-bg.png) no-repeat;
  background-size: 100% 100%;
  position: relative;
}
.tj-report-title {
  font-size: 15px;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  text-align: center;
}
.tj-report-num {
  padding-top: 10px;
  text-align: right;
}
.tj-report-num span {
  font-size: 12px;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  zoom: 0.8;
  display: block;
}
.tj-report-result {
  padding-top: 10px;
  font-size: 12px;
  font-weight: 400;
  color: #333333;
}
.tj-report-result p {
  /* transform: scale(0.9);
    transform-origin: 0 0; */
  zoom: 0.9;
}
.tj-report-result span {
  color: #666666;
}
.tj-report-img {
  height: 73px;
  background: url(../../assets/images/v19-10/report-img.png) no-repeat;
  background-size: 100% 100%;
  margin-top: 15px;
}
.tj-report-ul {
  margin-top: 17px;
}
.tj-report-li {
  height: 33px;
  background: rgba(242, 246, 240, 1);
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
}
.tj-report-li-title {
  display: flex;
  align-items: center;
  padding-left: 10px;
}
.tj-report-li-title span {
  width: 17px;
  height: 14.5px;
  background-size: 100% 100%;
  display: inline-block;
  margin-right: 4px;
}
.tj-report-li-r1 {
  background: url(../../assets/images/v19-10/r1.png) no-repeat;
}
.tj-report-li-r53 {
  background: url(../../assets/images/v19-10/r53.png) no-repeat;
}
.tj-report-li-r179 {
  background: url(../../assets/images/v19-10/r179.png) no-repeat;
}
.tj-report-li-r275 {
  background: url(../../assets/images/v19-10/r275.png) no-repeat;
}
.tj-report-li-r377 {
  background: url(../../assets/images/v19-10/r377.png) no-repeat;
}
.tj-report-li-r445 {
  background: url(../../assets/images/v19-10/r445.png) no-repeat;
}
.tj-report-li-r505 {
  background: url(../../assets/images/v19-10/r505.png) no-repeat;
}
.tj-report-li-r590 {
  background: url(../../assets/images/v19-10/r590.png) no-repeat;
}
.tj-report-li-num{
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.tj-report-li-abnormal,.tj-report-li-normal{
  width: 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.tj-report-li-abnormal::after,.tj-report-li-normal::after{
  content: '';
  width: 11px;
  height: 11px;
  background-size: 100% 100%;
  display: inline-block;
  margin-left: 9px;
}
.tj-report-li-abnormal::after{
  background: url(../../assets/images/v19-10/th@2x.png) no-repeat;
      background-size: 100% 100%;
}
.tj-report-li-normal::after{
  background: url(../../assets/images/v19-10/yes@2x.png) no-repeat;
      background-size: 100% 100%;
}
.tj-report-li-go{
  width: 7px;
  height: 12px;
  background: url(../../assets/images/v19-10/xiayiji@2x.png) no-repeat;
  background-size: 100% 100%;
  display: inline-block;
  margin: 0 9px;
}
.tj-report-bottom{
  padding: 5px 0 10px;
}
.tj-report-more{
  font-size:13px;
  font-weight:400;
  color:rgba(102,102,102,1);
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.tj-report-more::after{
  content: '';
  width: 7px;
  height: 12px;
  background: url(../../assets/images/v19-10/xiayiji@2x.png) no-repeat;
  background-size: 100% 100%;
  display: inline-block;
  margin-left: 9px;
}
.tj-report-notes{
  margin-top: 8px;
  font-size:12px;
  font-weight:400;
  color:#999999;
  zoom: 0.9;
}
.tj-report-notes span{
  color: #E02020;
}
</style>

