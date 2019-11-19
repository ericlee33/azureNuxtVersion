import Vue from 'vue'
import axios from 'axios'
Vue.prototype.$axios = axios
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  state: {
    // 监听登录状态
    loginFlag: false,
    // 监听是否有新的comment出现
    commentFlag: false,
    // 博客文章总长度
    articleLength: 0,
    auth: false
  },
  mutations: {
    // 监听登录状态
    login(state) {
      state.loginFlag = false
      state.auth = false
      // 从localstorage取出user字符串
      if (process.browser) {
        let user = JSON.parse(localStorage.getItem('user'))
        let status = user.status
        // 判断是否登录过
        if(user) {
          state.loginFlag = true
        }
        if(status == 1) {
          state.auth = true
        }
      }
      
    },
    changeBlogLength(state, obj){
      state.articleLength = obj.blogslength
    },
    changeCommentFlag(state) {
      state.commentFlag = !state.commentFlag 
    }
  },
  actions: {
    getBlogLength(context){
      axios.post('/api/bloglength')
        .then(res => {
          if(res.data.err_code === 0){
              context.commit('changeBlogLength', res.data)
            }
        })
    }
  }
})
export default store