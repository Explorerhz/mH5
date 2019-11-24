<template>
  <section class="carCheckout" id="checkDataShow" name="checkDataShow">
        <header class="title">
          <i></i>质量检测报告
          <span>109个部位真实检测(含258项铁甲管家专业检测)</span>
        </header>

        <div class="checkInfo">
          <ul id="reportCheckout">
            <li class="ck_report jc_report" name="jc_type_0">
              <img src="../assets/images/carImg/jc_icon_1.png">
              <span class="txt">设备认证</span>
              <div class="textIcon">
                <span class="unnormal" id="unnormal0">2项</span>
                <span class="normal" id="normal0">13项</span>
              </div>
              <i class="icon-uniE6FD"></i>
            </li>

            <li class="ck_report jc_report" name="jc_type_1">
              <img src="../assets/images/carImg/jc_icon_2.png">
              <span class="txt">整机外观</span>
              <div class="textIcon">
                <span class="unnormal" id="unnormal1">1项</span>
                <span class="normal" id="normal1">13项</span>
              </div>
              <i class="icon-uniE6FD"></i>
            </li>

            <li class="ck_report jc_report" name="jc_type_2">
              <img src="../assets/images/carImg/jc_icon_3.png">
              <span class="txt">工作和回转装置</span>
              <div class="textIcon">
                <span class="unnormal" id="unnormal2">3项</span>
                <span class="normal" id="normal2">12项</span>
              </div>
              <i class="icon-uniE6FD"></i>
            </li>

            <li class="ck_report jc_report" name="jc_type_3">
              <img src="../assets/images/carImg/jc_icon_4.png">
              <span class="txt">行走机构</span>
              <div class="textIcon">
                <span class="unnormal" id="unnormal3" style="display: none;">0项</span>
                <span class="normal" id="normal3">20项</span>
              </div>
              <i class="icon-uniE6FD"></i>
            </li>

            <li class="ck_report jc_report" name="jc_type_4">
              <img src="../assets/images/carImg/jc_icon_5.png">
              <span class="txt">驾驶室部分</span>
              <div class="textIcon">
                <span class="unnormal" id="unnormal4" style="display: none;">0项</span>
                <span class="normal" id="normal4">12项</span>
              </div>
              <i class="icon-uniE6FD"></i>
            </li>

            <li class="ck_report jc_report" name="jc_type_5">
              <img src="../assets/images/carImg/jc_icon_6.png">
              <span class="txt">大件舱室</span>
              <div class="textIcon">
                <span class="unnormal" id="unnormal5" style="display: none;">0项</span>
                <span class="normal" id="normal5">11项</span>
              </div>
              <i class="icon-uniE6FD"></i>
            </li>

            <li class="ck_report jc_report" name="jc_type_6">
              <img src="../assets/images/carImg/jc_icon_7.png">
              <span class="txt">上车部分</span>
              <div class="textIcon">
                <span class="unnormal" id="unnormal6" style="display: none;">0项</span>
                <span class="normal" id="normal6">14项</span>
              </div>
              <i class="icon-uniE6FD"></i>
            </li>
          </ul>

          <div class="jc_tip">
            <p>
              查看详细检测报告
              <i class="icon-uniE612"></i>
            </p>
            <span>
              *本检测报告仅代表
              <em class="createDate">2019年05月29日</em>
              铁甲管家现场评估结果，仅供参考，最终车况以现场看车为准。
            </span>
          </div>
        </div>
      </section>
</template>

<script>
export default {
    name: 'inspection',
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
.checkInfo {
  padding: 0.8rem 0.53333rem 0.53333rem;
  position: relative;
}
.checkInfo .jc_report {
  color: #6a6a77;
  margin-left: 0.53333rem;
  position: relative;
  font-size: 0.74667rem;
  border-bottom: 1px solid #dce2ee;
  height: 2.66667rem;
  line-height: 2.66667rem;
  position: relative;
  top: 0.8rem;
  right: 0.53333rem;
  bottom: -0.26667rem;
}
.jc_report img {
  display: inline-block;
  width: 0.85333rem;
  height: 0.72rem;
  vertical-align: center;
}
.jc_report .txt {
  padding: 0 0.53333rem;
}
.textIcon span:after {
  content: "";
  width: 1.04rem;
  height: 1.04rem;
  display: inline-block;
  vertical-align: -6px;
  margin-left: 0.7rem;
}
.unnormal:after {
  background: url(../assets/images/carImg/warnSign.png) no-repeat;
  background-size: 0.8rem auto;
}
.textIcon {
  width: 60%;
  position: absolute;
  right: 0.53333rem;
  top: 0;
  height: 60px;
  text-align: right;
}
.textIcon span {
  display: inline-block;
  width: 4rem;
  padding: 0;
}
.normal:after {
  background: url(../assets/images/carImg/right.png) no-repeat;
  background-size: 0.8rem auto;
}
.jc_report .icon-uniE6FD {
  position: absolute;
  right: -0.64rem;
  -webkit-transform: rotate(-90deg);
  transform: rotate(-90deg);
}
.icon-uniE6FD:before {
  content: "\e696";
}
.checkInfo .jc_tip {
  margin-top: 1.06667rem;
  color: #9ea4af;
  text-align: left;
}
.jc_tip p {
  text-align: center;
  font-size: 0.74667rem;
  height: 2.13333rem;
  line-height: 2.13333rem;
}
.jc_tip i {
  font-size: 0.74667rem;
}
.icon-uniE612:before {
  content: "\e60d";
}
.jc_tip span {
  font-size: 0.64rem;
}
#pageContent .carBasic ul.jp-flow {
  padding-top: 0;
  height: 5.3333rem;
}
.carBasic .jp-flow li {
  width: 20%;
  float: left;
  text-align: center;
  padding-top: 0;
  font-size: 0.64rem;
  color: #6a6a77;
}
.carBasic .jp-flow li img {
  width: 1.7333rem;
  height: 1.7333rem;
}
</style>