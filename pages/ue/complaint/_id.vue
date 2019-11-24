<template>
  <div class="tj-complaint">
    <div>
      <div class="tj-complaint-title">
        <span class="tj-nav-back" @click.stop="back"></span>
        纠正设备信息
      </div>
      <div class="tj-complaint-from">
        <ul>
          <li class="tj-complaint-li">
            <label class="tj-complaint-label">设备信息</label>
            <div class="tj-complaint-right">
              <h1
                class="tj-complaint-h1"
              >{{detail.equipment.brand+detail.equipment.model+detail.equipment.category}}</h1>
              <p class="tj-complaint-p">编号：{{detail.equipment.id}}</p>
            </div>
          </li>
          <li class="tj-complaint-li">
            <label>联系方式</label>
            <div class="tj-complaint-input">
              <input ref="input" v-model="phone" type="number" pattern="\d*" />
              <span class="tj-complaint-clear" @click="clear"></span>
            </div>
          </li>
          <li class="tj-complaint-li-">
            <div class="tj-complaint-ta">
              <textarea
                class="tj-complaint-textarea"
                v-on:input="key($event)"
                v-model="message"
                placeholder="说说具体情况"
              ></textarea>
              <div class="tj-complaint-textarea-bottom">
                <div>
                  <span class="tj-complaint-red">{{num}}</span>
                  <span class="tj-complaint-num">/150</span>
                </div>
                <span class="tj-complaint-clear0" @click="clear0"></span>
              </div>
            </div>
            <div class="tj-complaint-tip">
              <span>*</span>我们将认真核对您提供的纠正信息，如情况属实，我们将对应做出调整。
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="tj-complaint-bottom">
      <a href="tel:400-009-9032" @click="E25_('投诉电话')">
        <div class="tj-complaint-mobile">投诉电话：400-009-9032</div>
      </a>
      <div class="tj-complaint-btn">
        <div class="tj-complaint-btn-tj" @click="submit">提交</div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { complaint } from "@/api/complaint";
import { getValue } from "@/util/cookie";
import Toast from "@/components/ui/toast";
import { allSettled } from "@/util/promise-all.js";
import { eqBasicDetail } from "@/api/eqDetail";
import { pageBack } from "@/util/page.js";
import { E4, E5, E124, E25, E26 } from "@/util/maidian";
Vue.use(Toast);
export default {
  name: "tj-complaint",
  components: {},
  head() {
    return {
      title: `纠正设备信息-转让报价信息-实拍图片-铁甲二手机`
    };
  },
  mounted() {
    console.log(this.detail);
    const mobile = getValue("jishou_mobile");
    if (mobile) {
      this.phone = mobile;
    }
    this.$nextTick(() => {
      this.$refs.input.focus();
    });
    // document.addEventListener("keyup", this.watchKey, true);
  },
  destroyed() {
    // document.removeEventListener("keyup", this.watchKey, true);
  },
  computed: {},
  methods: {
    clear() {
      this.phone = "";
    },
    clear0() {
      this.message = "";
    },
    watchKey() {
      this.key();
    },
    key(event) {
      const len = this.message.length;
      console.log("len=" + len);
      if (len <= 150) {
        this.num = len;
        return;
      } else {
        this.message = this.message.substr(0, 150);
      }
    },
    back() {
      pageBack();
    },
    E25_(button_name) {
      E25(this.eqId, "纠正设备信息", button_name, () => {
        // alert("call...");
        // let telA = document.createElement('a')
        // telA.setAttribute('href','tel:4000099032')
        // alert(telA.toString());
        // telA.click()
      });
    },
    async submit() {
      if (!/^1[23456789]\d{9}$/.test(this.phone)) {
        this.$toast.show({
          message: "手机号不正确",
          mark: false,
          duration: 2000
        });
        return;
      }
      if (this.requestState) {
        return;
      }
      this.requestState = true;
      const result = await complaint({
        mobile: this.phone,
        eqId: this.eqId,
        type: 1,
        content: this.message
      });
      E25(this.eqId, "纠正设备信息", "提交纠正信息", () => {
        this.requestState = false;
        if (result.ret == 0) {
          this.$toast.show({
            message: "提交成功",
            mark: false,
            duration: 2000
          });
          this.back();
        } else {
          this.$toast.show({
            message: result.msg,
            mark: false,
            duration: 2000
          });
        }
      });
    }
  },
  async asyncData({
    isDev,
    route,
    store,
    env,
    params,
    query,
    req,
    res,
    redirect,
    error
  }) {
    const reg = /.+\/(\d+)/;
    const eqId = reg.exec(route.path)[1].trim();
    let detail = { equipment: {} };
    const result = await eqBasicDetail(eqId, {});
    if (result.ret == 0) {
      detail = result.result;
    }
    return {
      detail,
      eqId
    };
  },
  data() {
    return {
      phone: "",
      message: "",
      num: 0,
      requestState: false
    };
  },
  serverCacheKey() {
    return Math.floor(Date.now() / 10000);
  }
};
</script>

<style>
.tj-complaint {
  background: #f9f9f9;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
      display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.tj-complaint-title {
  text-align: center;
  height: 45px;
  line-height: 45px;
  font-size: 18px;
  font-weight: 500;
  color: rgba(74, 74, 83, 1);
  position: relative;
  background: #fff;
  box-shadow: 0px 2px 2px 0px rgba(228, 228, 228, 0.5);
}
.tj-nav-back {
  background: url(../../../assets/images/v19-10/system-back@2x.png) no-repeat;
  background-size: 9px 16px;
  position: absolute;
  top: 15px;
  left: 15px;
  width: 19px;
  height: 26px;
  padding: 5px;
}
.tj-complaint-textarea:focus {
  border-radius: 3px;
  border: 1px solid rgba(234, 234, 234, 1);
}
.tj-complaint-bottom {
  height: 96px;
  width: 100%;
}
.tj-complaint-bottom a {
  display: block;
}
.tj-complaint-mobile {
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}
.tj-complaint-mobile::before {
  content: "";
  width: 12px;
  height: 12px;
  background: url(../../../assets/images/v19-10/mobile@2x.png) no-repeat;
  background-size: 100% 100%;
  margin-right: 3px;
}
.tj-complaint-btn {
  height: 52px;
  background: #fff;
  overflow: hidden;
  width: 100%;
  display: flex;
  align-items: center;
}
.tj-complaint-btn-tj {
  margin: 5px 15px;
  height: 36px;
  line-height: 36px;
  background: rgba(72, 108, 220, 1);
  border-radius: 3px;
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  width: 100%;
}
.tj-complaint-from {
  padding: 5px 15px 13px;
  background: #fff;
}
.tj-complaint-li {
  font-size: 14px;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  border-bottom: solid 1px #eeeeee;
  display: flex;
  justify-content: space-between;
  padding: 15px 0;
}
.tj-parameters-li:last-child {
  border-bottom: solid 1px #fff;
}
.tj-complaint-h1 {
  font-size: 14px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.tj-complaint-p {
  font-size: 12px;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  zoom: 0.9;
  margin-top: 2px;
}
.tj-complaint-input {
  width: 200;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
}
.tj-complaint-input input {
  font-size: 14px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  border-width: 0;
  text-align: right;
}
.tj-complaint-clear {
  display: block;
  width: 16px;
  height: 16px;
  background: url(../../../assets/images/v19-10/clear@2x.png) no-repeat;
  background-size: 100% 100%;
  margin-left: 10px;
}
.tj-complaint-clear0 {
  display: block;
  width: 14px;
  height: 14px;
  background: url(../../../assets/images/v19-10/clear@2x.png) no-repeat;
  background-size: 100% 100%;
  margin-left: 10px;
}
.tj-complaint-ta {
  position: relative;
}
.tj-complaint-textarea {
  background: rgba(248, 248, 248, 1);
  border-radius: 3px;
  border: 1px solid rgba(234, 234, 234, 1);
  padding: 5px;
  height: 188px;
  width: 100%;
  margin-top: 19px;
}
.tj-complaint-tip {
  font-size: 11px;
  font-weight: 400;
  color: #999999;
  zoom: 0.9;
  margin-top: 5px;
}
.tj-complaint-tip span,
.tj-complaint-red {
  color: rgba(224, 32, 32, 1);
}
.tj-complaint-textarea-bottom {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 8px;
}
.tj-complaint-num {
  font-size: 12px;
  font-weight: 400;
  color: #999999;
}
.tj-complaint-red,
.tj-complaint-num {
  zoom: 0.9;
}
</style>
