<template>
  <div>
      <div style="margin-bottom:2.6rem;">卖车</div>
      <tj-tabbar :index="2" />
  </div>
</template>

<script>
import TabBar from '@/components/common/tab-bar';
export default {
  components: {[TabBar.name]:TabBar},
  data(){
    return {
      a:'abc'
    }
  }
}
</script>

<style>
</style>
