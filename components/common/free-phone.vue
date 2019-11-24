<template>
    <div class="free-phone" v-if="show">
        <div class="free-phone-dialog" v-show="type == 0">
            <div class="free-phone-title">免费通话</div>
            <div class="free-phone-close" @click="close"></div>
            <div class="free-phone-txt">{{txt}}</div>
            <div class="free-phone-input">
                <input v-model="val" @keyup="key" ref="input" autofocus :style="inputStyle" type="number" pattern="\d*"/>
                <span class="input-num">请输入手机号</span>
                <span  class="input-clear" @click="clear"></span>
            </div>
            <div class="free-phone-tip" :style="{visibility:(txtType==1?'visible':'hidden')}">
                近7天已有<span>{{peopleNum}}个用户</span>咨询过这台设备
            </div>
            <div class="free-phone-button" @click="submit">
                
            </div>
        </div>

        <div class="free-phone-dialog0" v-show="type == 1">
            <div class="free-phone-txt0">您的手机<span>{{val}}</span>将接到铁甲的来电请注意接听</div>
            <div class="free-phone-close" @click="close"></div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import {
  getEncodeMobile,
  callCenter,
} from "@/api/index";
import { getRandomNum } from "@/util/common";
import { getValue } from "@/util/cookie";
import Toast from "@/components/ui/toast";

Vue.use(Toast);
export default {
    name:'tj-free-phone',
    computed: {
        txt(){
            let txt_ = "请输入您的手机号，稍后铁甲客服会尽快联系您";
            if(this.txtType == 1){
                txt_ = '设备还能更优惠，输入您自己的电话马上咨询吧!';
            }
            return txt_;
        },
        inputStyle(){
            const rgba_ = this.erro?'rgba(249, 77, 82, 1)':'rgba(230, 230, 230, 1)';
            return {
                border:`1px solid ${rgba_}`
            }
        }
    },
    methods: {
        close(){
            this.show = false;
        },
        clear(){
            this.val = '';
            this.erro = false;
        },
        isPhone(){
            if(!(/^1[23456789]\d{9}$/.test(this.val))){ 
                this.erro = true;

                this.$toast.show({
                    message:'手机号不正确',
                    mark: false,
                    duration: 2000
                })

                return false;
            }else{
               this.erro = false; 
            }
            return true;
        },
        key(){
            if(this.val.length>=11){
                this.isPhone();
            }
        },
        async submit(){
            if(this.isPhone() && !this.requestState){
                localStorage.setItem("callNum", this.val);
                this.requestState = true;
                let result = {};
                if(this.params){
                    this.params.customerNumber = this.val
                    result = await callCenter(this.params);
                }else{
                    const a = getRandomNum(1e4, 99999) + "$" + sa.store.getDistinctId();
                    let params0 = {
                        channel: 6,
                        distinctId: sa.store.getDistinctId(),
                        uniqueSymbol: a,
                        pageFromType: "L",
                        channelCodeFlag: "m.tiebaobei.com",
                        commitChannelCodeFlag: "m.tiebaobei.com",
                        customerNumber: this.val
                    };
                    result = await callCenter(params0);
                }
                if(result.ret == 0){
                    this.type = 1;
                }else{
                    alert('系统出错,请重试');
                }
                this.requestState = false;
            }
        },
        open(v, txtType, peopleNum){
            this.val = '';
            const callNum = localStorage.getItem("callNum");
            if(callNum){
                this.val = callNum;
            }else{
                const mobile = getValue("jishou_mobile");
                if(mobile){
                    this.val = mobile;
                }
            }
          this.txtType = txtType?txtType:0;
          this.peopleNum = peopleNum?peopleNum:10;
          this.type = 0;
          
          this.params = v;
          this.erro = false;
          this.show = true; 
          this.$nextTick(() => {
              this.$refs.input.focus();
          })
        //   console.log(this.$refs, this.$refs['input']);
        //   this.$refs.phone_input__.focus();
        }
    },
    data(){
        return {
            show : false,
            erro: false,
            val:'',
            type:0,
            txtType:0,
            peopleNum:10,
            params:{},
            requestState:false
        }
    },
  serverCacheKey() {
    return Math.floor(Date.now() / 10000);
  }
}
</script>
<style scoped>
.free-phone{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.8);
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
}
.free-phone-dialog0{
    width: 297px;
    height: 120px;
    background: #fff;
    border-radius: 6px;
    overflow: hidden;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}
.free-phone-dialog{
    width: 297px;
    height: 289px;
    background: #fff;
    border-radius: 6px;
    overflow: hidden;
    position: relative;
}
.free-phone-title{
    text-align: center;
    font-size:18px;
    font-weight:500;
    color:rgba(51,51,51,1);
    margin-top: 37px;
}
.free-phone-close{
    position: absolute;
    top: 15px;
    right: 15px;
    width: 16px;
    height: 16px;
    background: url(../../assets/images/v19-10/close@2x.png) no-repeat;
    background-size: 100% 100%;
    background-position: center;
}
.free-phone-txt{
    width:217px;
    height:32px;
    font-size:13px;
    font-weight:400;
    color:rgba(102,102,102,1);
    line-height:19px;
    margin: 22px 41px 0;
    position: relative;
}
.free-phone-txt0{
    width:217px;
    height:38px;
    font-size:13px;
    font-weight:400;
    color:rgba(102,102,102,1);
    line-height:25px;
    position: relative;
    text-align: center;
}
.free-phone-txt0 span{
    color: rgba(62, 106, 227, 1);
    padding: 0 5px;
}
.free-phone-input{
    position: relative;
    width:216px;
    height:38px;
    margin: 31px 41px 0;
}
.free-phone-input input{
    width:216px;
    height:38px;
    border-radius:5px;
    padding: 5px;
    font-size:15px;
}
.input-num{
    height:11px;
    font-size:11px;
    font-weight:400;
    color:rgba(153,153,153,1);
    position: absolute;
    top:-8px;
    left: 14px;
    background: #fff;
}
.input-clear{
    position: absolute;
    top: 11px;
    right: 11px;
    width: 16px;
    height: 16px;
    background: url(../../assets/images/v19-10/clear.png) no-repeat;
    background-size: 100% 100%;
    background-position: center; 
}
.free-phone-button{
    font-size:14px;
    font-weight:400;
    color:rgba(255,255,255,1);
    width:230px;
    height:51px;
    border-radius:5px;
    margin: 8px 34px 0;
    background: url(../../assets/images/v19-10/BTN.png) no-repeat;
    background-size: 100% 100%;
}
.free-phone-tip{
    margin: 8px 41px 10px;
}
.free-phone-tip span{
    font-size:12px;
    font-weight:400;
    color:rgba(245,0,0,1);
    transform: scale(0.9);
    padding-left: 2px;
    display: inline-block;
}
/* .free-phone-tip::before{
    content:'';
    display: inline-block;
    width: 11px;
    height: 11px;
    background: url(../../assets/images/v19-10/tip.png) no-repeat;
    background-size: 100% 100%;
    background-position: center; 
} */
</style>

