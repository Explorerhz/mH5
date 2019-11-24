<template>
  <div class="container">
  </div>
</template>

<script>

export default {
  name:'tpl',
  components: {

  },
  head() {  
    return {
      title: this.title
    };
  },
  mounted() {
    
  },
  destroyed() {},
  computed: {
      
  },
  methods: {
      
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

    return {};
  },
  data() {
    return {
    };
  },
  serverCacheKey() {
    return Math.floor(Date.now() / 10000);
  }
};
</script>

<style scoped>
*{
  font-size: 12px;
}
</style>
