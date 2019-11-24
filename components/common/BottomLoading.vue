<template>
    <div class="bottom-loading">
        <template v-if="state===0">
            加载中...
        </template>
        <template v-else-if="state===1">
            加载完成
        </template>
        <template v-else-if="state===2">
            当前数据已经全部加载
        </template>
    </div>
</template>
<script>
export default {
    name:'tj-bottom-loading',
    props:{
        state:{
            type: Number,
            default: 0,
        }
    },
    data(){
        return {}
    },
  serverCacheKey() {
    return Math.floor(Date.now() / 10000);
  }
}
</script>
<style scoped>
.bottom-loading {
    height: 45px;
    line-height: 45px;
    text-align: center;
    color: #333;
    font-size: 12px;
    background: #eee;
}
</style>

