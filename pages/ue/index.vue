<template>
  <div>
      <div style="margin-bottom:2.6rem;">买车</div>
      <tj-tabbar :index="1" />
  </div>
</template>

<script>
import TabBar from '@/components/common/tab-bar';
export default {
  components: { [TabBar.name]:TabBar},
  data(){
    return {
      a:'abc'
    }
  }
}
</script>

<style>
</style>
