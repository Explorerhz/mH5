<template>
    <div>
        Search
    </div>
</template>
<script>
export default {
    name:'tj-home-search',
    methods: {
        close(){
            this.show = false;
        }
    },
    data(){
        return {
            show : true
        }
    },
  serverCacheKey () {
    return Math.floor(Date.now() / 10000)
  }
}
</script>
<style scoped>

</style>

