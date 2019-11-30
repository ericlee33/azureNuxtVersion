import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload)
Vue.use(VueLazyload, {
  // error: 'dist/error.png', //图片加载失败时使用的图片源
  // loading: 'dist/loading.gif', //图片加载的路径
  attempt: 1 //尝试加载次数
})