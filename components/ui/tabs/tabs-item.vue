<template>
  <div class="pane" v-show="show">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "tj-tabs-item",
  data() {
    return {
      show: false
    };
  },
  props: {
    name: {
      type: String
    },
    label: {
      type: String,
      default: ''
    }
  },
  beforeCreate() {},
  destroyed() {},
  computed: {
    active () {
      return false
    }
  },
  mounted () {
    this.updateNav()
  },
  methods: {
    updateNav () {
      this.$parent.updateNav()
    }
  },
  watch: {
    label () {
      this.updateNav()
    }
  }
};
</script>
<style scoped>

</style>


