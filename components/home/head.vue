<template>
    <header ref="header_" class="header main" :class="{'header-w-m-fixed':show}">
                <a class="search-logo"></a>
                <a :href="searchUrl" @click.prevent="search($event)">
                    <div class="search-input">
                        搜索好车
                    </div>
                </a>
        </header>
</template>
<script>
export default {
    name:'tj-home-head',
    mounted() {
        this.homeUrl = this.$Origin;
        this.searchUrl = this.$Origin + '/html/ueSearch.html';
        this.spece = this.$refs.header_.offsetHeight
    },
    destroyed() {
        //window.removeEventListener("scroll",this.scrollEvent);
    },
    methods: {
        search(event){
            this.$emit('click',event, '搜索框');
        },
        scrollEvent(e){
            let top = document.body.scrollTop || document.documentElement.scrollTop;
            if(top <= this.spece){
                this.show = false;
            }else if(!this.show){
                this.show = true;
            }
        }
    },
    data(){
        return {
            show : false,
            homeUrl:'',
            searchUrl: '',
            spece:30,
        }
    },
  serverCacheKey () {
    return Math.floor(Date.now() / 10000)
  }
}
</script>
<style scoped>
.header{
    padding:5px 0;
    height: 46px;
    z-index: 9999;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 10px 0;
}
.header a{
    color:rgba(175,175,175,1);
}
.header-w-m-fixed{
    position: fixed;
    top: 0;
    left: 0;
    background-color: #fff;
    margin: 0;
}
.search-logo {
    padding-left: 10px;
    color: #486cdc;
    z-index: 10;
    width: 69px;
    height: 12px;
    background: url(../../assets/images/v19-10/logo.png) no-repeat;
    background-size: 100% 100%;
}
 .search-input {
   width:262px;
    height:32px;
    background:rgba(240,240,240,1);
    border:1px solid rgba(225, 225, 225, 1);
    border-radius:4px;
    margin-left: 15px;
    font-size:14px;
    font-weight:400;
    color:rgba(175,175,175,1);
    display: flex;
    align-items: center;
}
 .search-input::before{
    content: '';
    display: inline-block;
    background: url(../../assets/images/v19-10/sousuo.png) no-repeat;
    background-size: 100% 100%;
    width: 15px;
    height: 15px;
    margin: 0 6px 0 9px;
}
</style>

