import Vue from 'vue';
import VueLazyload from 'vue-lazyload';

Vue.use(VueLazyload, {
    preLoad: 1.3,
    loading: require('../assets/images/v19-10/inspectPlaceHold.png'),
    attempt: 1
  });