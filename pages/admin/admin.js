import Vue from 'vue'

// 引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 富文本引入
import Vue2Editor from "vue2-editor"
Vue.use(Vue2Editor)


// 导入格式化时间的插件
import moment from 'moment'
// 定义全局的过滤器
Vue.filter('dateFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
  return moment(dataStr).format(pattern)
})

// 过滤文字.当大于规定值时,后面的显示为省略号
Vue.filter('ellipsis',function(value){
  if (!value) return "";
  if (value.length > 100) {
    return value.slice(0, 100) + "...";
  }
  return value;
})

// 引入轮播图组件vue-awesome-swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)

// 引入axios
import axios from 'axios'
Vue.prototype.$axios = axios

// 引入normalize.css
import '../../assets/css/normalize.css'
// 我个人的设置
import '../../assets/css/mySettting.css'
// animate实现部分动画
import '../../assets/css/animate.css'

// 引入app,router,store
import Admin from './App.vue'
import router from './router'
import store from './store'
// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    // 判断登录的状态码,如果为1 就证明可以进入管理系统
    if (JSON.parse(localStorage.getItem("user")).status === 1) {
      next();
    } else {
      next({
        path: "/error"
      });
    }
  } else {
    next();
  }
});
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(Admin)
}).$mount('#admin')
