<template>
  <div>
      <header class="header main"><i class="icon-back"></i>
          <h2 class="title">登录</h2>
      </header>
      <div class="loginBody">
        <div class="loginBox">
            <p class="errLogin">{{errorInfo}}</p>
            <div class="loginItem">
                <i class="icon-user"></i>
                <input class="username" type="text" v-model="username" placeholder="用户名/手机号">
            </div>
            <div class="loginItem">
                <i class="icon-pwd"></i>
                <input class="password" type="password" v-model="password" placeholder="密码">
                <i class="icon-eye"></i>
            </div>
            <div class="forgetBox">
                <a href="#" class="forgetPassword">忘记密码？</a>
                <a href="#" class="reg">免费注册</a>
            </div>
            <div class="loginBtn" @click="loginAct()">立即登录</div>
        </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { login } from '@/api/user'
import {setCookies} from '@/util/cookie'
export default {
    middleware:'login',
    async asyncData (context) {

    },
    async fetch ({ store, params }) {

    },
    beforeCreate() {

    },
    created() {
      
    },
    mounted() {
       console.log(this.user); 
    },
    computed: {
        ...mapGetters('user',[
            'user'
        ]),
        doneTodosCount () {
            return "this.$store.state";
        }
    },
    methods: {
        loginAct(){
            if(this.username.length === 0){
                this.errorInfo = "请输入用户名";
                return;
            }
            if(this.password.length === 0){
                this.errorInfo = "请输入密码";
                return;
            }
            login({
                userName:this.username,
                passWord:this.password
            }).then(data => {
                setCookies(data);
                this.errorInfo = "登录成功...";
                this.$router.go("/my");
            }).catch((e)=>{
                this.errorInfo = "系统错误，请重新访问";
            })
        }
    },
    data(){
        return {
            errorInfo:'',
            username:'',
            password:''
        };
    }
};
</script>

<style>
.header {
    height: .88rem;
    width: 100%;
    background: #fff;
    color: #4A4A53;
    padding: .14rem 0;
    display: flex;
    text-align: center;
    line-height: .6rem;
    box-shadow: 0 2px 10px 0 rgba(232,232,232,.59);
    margin-bottom: .1rem;
}
#header .icon-back, .header .icon-back {
    font-size: .4rem;
    position: absolute;
    display: inline-block;
    color: #939ea0;
    top: 0;
    left: .05rem;
    line-height: .9rem;
}
#header .title, .header .title {
    width: 60%;
    color: #4A4A53;
    margin: 0 auto;
    text-align: center;
    font-size: .32rem;
    line-height: .6rem;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    font-weight: normal;
    letter-spacing: 2px;
}
.loginBox {
    width: 96%;
    margin: 0 auto;
    padding-top: 45px;
    position: relative;
}
.errLogin {
    width: 100%;
    height: .4rem;
    line-height: .4rem;
    color: red;
    text-align: center;
    position: absolute;
    font-size: .28rem;
    left: 0;
    top: 25px;
}
.loginItem {
    height: 30px;
    padding: 6px;
    line-height: 0;
    border: 1px solid #e4e4e4;
    border-radius: 5px;
}
.loginBox .code, .loginBox .loginItem {
    margin-bottom: 20px;
    box-sizing: content-box;
}
.loginBox .loginItem .icon-user {
    background-position: -2px -42px;
}
.loginBox .loginItem .icon-pwd {
    background-position: -32px -42px;
}
.loginBox .loginItem .icon-eye {
    float: right;
    background-position: -62px -42px;
}
.loginBox .forgetBox {
    height: 30px;
}
.loginBox .loginItem i {
    width: 28px;
    height: 28px;
    display: inline-block;
    vertical-align: middle;
    background: url(../../assets/images/icons.png) no-repeat;
        background-position-x: 0%;
        background-position-y: 0%;
        background-size: auto;
    background-size: 200px 200px;
}
.loginItem input {
    width: 70%;
    height: 28px;
    border: 0;
    font-size: 14px;
    color: #aaa;
    outline: 0;
    vertical-align: top;
}
.forgetBox a {
    float: left;
    font-size: 13px;
    color: #787878;
}
.loginBox .forgetBox .reg {
    float: right;
    color: #028be6;
}
.loginBtn {
    height: 40px;
    border-radius: 5px;
    background: #028ce5;
    color: #fff;
    font-size: 16px;
    text-align: center;
    line-height: 40px;
}
@font-face {
 font-family:iconfont;
 src:url(../../static/fonts/iconfont.eot?t=1512988472404);
 src:url(../../static/fonts/iconfont.eot?t=1512988472404#iefix) format("embedded-opentype"),
 url(data:application/x-font-woff;charset=utf-8;base64,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) format("woff"),
 url(../../static/fonts/iconfont.ttf?t=1512988472404) format("truetype"),
 url(../../static/fonts/iconfont.svg?t=1512988472404#iconfont) format("svg")
}
.iconfont,
[class*=" icon-"],
[class^=icon-] {
 font-family:iconfont!important;
 font-size:.24rem;
 font-style:normal;
 font-weight:400;
 -webkit-font-smoothing:antialiased;
 -webkit-text-stroke-width:.2px;
 -moz-osx-font-smoothing:grayscale
}
.icon-uniE600:before {
 content:"\e600"
}
.icon-uniE602:before {
 content:"\e602"
}
.icon-uniE603:before {
 content:"\e603"
}
.icon-uniE604:before {
 content:"\e604"
}
.icon-check:before,
.icon-duigou:before {
 content:"\e605"
}
.icon-more:before {
 content:"\e69f"
}
.icon-close:before {
 content:"\e72d"
}
.icon-loada:before {
 content:"\e610"
}
.icon-uniE606:before {
 content:"\e606"
}
.icon-search:before {
 content:"\e607"
}
.icon-back:before {
 content:"\e608"
}
.icon-uniE609:before {
 content:"\e609"
}
.icon-uniE60a:before {
 content:"\e60a"
}
.icon-uniE60c:before {
 content:"\e60c"
}
.icon-uniE60b:before {
 content:"\e60b"
}
.icon-uniE60d:before {
 content:"\e60d"
}
.icon-uniE60e:before {
 content:"\e60e"
}
.icon-guanbi1:before {
 content:"\e611"
}
.icon-xiajiang:before {
 content:"\e615"
}
.icon-fenxi:before {
 content:"\e65f"
}
</style>
