<template>
  <div class="login-mask" v-if="show==1" @click="closeAct()">
        <div class="login-box" @click.stop="">
            <div class="mobile-number">
                <img src="../assets/images/mobile-number.png" alt="">
                <input type="tel" id="mobileNumber" v-model="phone" @input="onInput" placeholder="请输入手机号">
            </div>
            <div class="mobile-code">
                <img src="../assets/images/mobile-code.png" alt="">
                <input type="tel" id="mobileCode" placeholder="请输入验证码"  v-model="code">  
                <span class="get-code" :class="{'get-code-ok':codeState}" @click.stop="codeAct()">{{codeTxt}}</span>
            </div>
            <div class="error-tips">{{errorInfo}}</div>
            <span class="login-btn" @click.stop="loginAct()">登录</span>
        </div>
    </div>
</template>

<script>
import {sendCode, loginByMobile} from '@/api/user'
import {setCookies} from '@/util/cookie'
export default {
    name: 'loginWin',
    props:{
        host: {
            type:String,
            default:'web'
        },
        show:{
            trype:Number,
            default:0
        },
        eqId:{
            type:String
        },
        auctionGoodId:{
            type:String
        }
    },
  components: {},
  mounted() {
      console.log("神策",sa);
  },
  methods: {
      closeAct(){
        this.timeDown60s = false;
        this.codeState = false;
        this.codeNum = 60;
        this.codeTxt = '获取验证码';
        this.requestState = false;
        this.errorInfo = "";
        this.$emit("closeWin");
      },
      loginAct(){
          this.errorInfo = "";
          if(this.requestState){
              return;
          }
          if(this.phone.length==0){
              this.errorInfo = '手机号不能为空！';
              return;
          }
          if(!this.codeState){
              this.errorInfo = '请输入正确的手机号！';
              return;
          }
          if(this.code.length==0){
              this.errorInfo = '验证码不能为空！';
              return;
          }
          if (!this.code.match(/^\d{4}$/)) {
            this.errorInfo = '输入的验证码有误，请重新输入！';
            return;
          }
          this.requestState = true;
          loginByMobile({
              mobile:this.phone,
              code:this.code
          }).then(data=>{
              console.log(data);
              setCookies(data);
              this.errorInfo = "登录成功...";
              this.closeAct();
              this.czSaE75("已登录", "点击弹出");
              console.log("加载完成");
              window.location.reload();
          }).catch((e)=>{
              this.requestState = false;
              if(e.ret == -1){
                this.errorInfo = e.msg;
              }else{
                this.errorInfo = "系统错误，请重新访问";
              }
                
            })

      },
      codeAct(){
          this.errorInfo = "";
          if(this.codeState && !this.timeDown60s){
              this.time60s();
          }else{
              this.errorInfo = '请输入正确的手机号！';
              return;
          }

          sendCode({
              mobile:this.phone
          }).then(data=>{
              console.log(data);
          }).catch((e)=>{
              if(e.ret == -1){
                this.errorInfo = e.msg;
              }else{
                this.errorInfo = "系统错误，请重新访问";
              }
                
            })
      },
      onInput(){
          this.errorInfo = "";
          this.codeState = this.phone.match(/^1\d{10}$/);
      },
      time60s(){
        this.timeDown60s = true;
        setTimeout(()=>{
                  if(this.codeNum != 0){
                      this.codeState = false;
                      this.codeTxt = this.codeNum+"s";
                      this.codeNum--;
                      this.time60s();
                  }else{
                      this.timeDown60s = false;
                      this.codeState = true;
                      this.codeNum = 60;
                      this.codeTxt = '获取验证码';
                  }
              },1000);
      },
      czSaE75(btnName, boxSource) {
        sa.track('E75', {
            button_name: btnName,
            box_source: boxSource,
            eq_id: this.eqId,
            auction_id: this.auctionGoodId + '',
            eq_type: "标准设备"
        });
    }
      
  },
  data(){
    return {
      phone:'',
      code:'',
      errorInfo:'',
      codeNum:60,
      codeTxt:'获取验证码',
      codeState:false,
      timeDown60s:false,
      requestState:false
    }
  }
}
</script>

<style scoped>
.login-mask {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 99;
    cursor: pointer;
}
.login-box {
    width: 15.836rem;
    height: 14.66rem;
    background-color: #fff;
    position: absolute;
    left: 50%;
    top: 45%;
    transform: translate(-50%, -50%);
    z-index: 99;
    font-size: 0.78rem;
    border-radius: 10px;
    padding: 1.0664rem 1.3333rem 2.13328rem 1.333rem;
}
.login-box div {
    height: 3.12rem;
    border-bottom: 0.0266rem solid #9ea4af;
    position: relative;
}
.login-box img {
    width: 0.5332rem;
    height: 0.677rem;
    position: absolute;
    top: 1.6rem;
    left: 0.2666rem;
}
.login-box input {
    font-size: 0.7466rem;
    color: #9ea4af;
    height: 1.6rem;
    line-height: 1.6rem;
    margin-left: 1.067rem;
    margin-top: 1rem;
    border: none;
}
.mobile-code input {
    width: 7.14rem;
}
.get-code {
    display: inline-block;
    font-size: 0.48rem;
    background: #acacac;
    color: #FFF;
    position: absolute;
    top: 0.9rem;
    right: 0.1rem;
    cursor: pointer;
    height: 1.4rem;
    line-height: 1.4rem;
    padding: 0rem 0.4rem;
    border-radius: 0.1rem;
}
div.error-tips {
    font-size: 0.64rem;
    color: #ff4544;
    height: 1.3333rem;
    border-bottom: none;
}
.login-btn {
    margin-top: 2.13rem;
    display: block;
    background-image: linear-gradient(135deg, #ff6844 0%, #ff4544 100%);
    color: #fff;
    text-align: center;
    line-height: 2.13rem;
    height: 2.13rem;
    font-size: 0.853rem;
    border-radius: 0.05332rem;
    cursor: pointer;
}
.mobile-code span.get-code-ok {
    background-image: linear-gradient(135deg, #ff6844 0%, #ff4544 100%);
}
</style>