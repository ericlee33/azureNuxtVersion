<template>
  <div id="header-container" class="header-container">
    <!-- 欢迎的千纸鹤 -->
    <!-- <transition 
      enter-active-class="animated jello"> -->
      <div class="deco" v-show="helloFlag"></div>
    <!-- </transition> -->

    <!-- 实现导航栏吸顶 -->
    <transition enter-active-class="animated rubberBand">
      <div :class="navBarFixed == true ? 'navBarWrap' :'navBar'" v-show="helloFlag">

          <div class="nav-container w">
            <!-- 导航栏以及logo -->
            <h1 class="logo" @click="goHome">AzureSpace</h1>
            <ul>
              <!-- 默认在全部文章 -->
              <nuxt-link to="/bloglist">全部文章</nuxt-link>
              <nuxt-link to="/weblist">前端技术</nuxt-link>
              <nuxt-link to="/essaylist">个人随笔</nuxt-link>
              <nuxt-link to="/messageboard">留言板</nuxt-link>
              <nuxt-link to="/tools">工具</nuxt-link>
              <nuxt-link to="/aboutme">关于我</nuxt-link>
            </ul>

            <!-- 注册 -->
            <div class="buttons" v-if="!loginFlag">
              <register></register>
              <login></login>
            </div>
            <div v-if="loginFlag">
              <el-button type="danger" size="mini" @click="outLogin">登出</el-button>
              <el-button type="success" size="mini" @click="goAdmin">进入管理系统</el-button>
            </div>
          </div>

      </div>
    </transition>
    <!-- 欢迎的文字 -->
    <transition class="hello" enter-active-class="animated swing">
      <div class="helloWords" v-show="helloFlag">Youth,like the praise of the spring</div>
    </transition>
  </div>

</template>

<script>
import register from './subcomponents/register.vue'
import login from './subcomponents/login.vue'

export default {
  data() {
    return {
      // nav
      navName:'',
      navBarFixed: false,
      // 登录或者进入管理按钮是否显示
      helloFlag: false,
      // 登录或注册dialog是否显示
      dialogFormVisible: false,
      formLabelWidth: '120px'
    }
  },
  methods: {
    // 实现吸顶
    watchScroll () {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        //  当滚动超过 50 时，实现吸顶效果
        if (scrollTop > 49) {
          this.navBarFixed = true
        } else {
          this.navBarFixed = false
        }
    },
    show() {
      this.helloFlag = !this.helloFlag
    },
    goAdmin() {
      let user = JSON.parse(localStorage.getItem("user"))

      if(user.status === 1){
        window.location.href = '/admin.html'
      }else {
        this.$alert('对不起,您的权限不够', '管理权限', {
          confirmButtonText: '确定'
        })
      }

    },
    outLogin() {
      window.localStorage.removeItem('user')
      this.$message("登出成功")
      // this.judgeLogin()
      this.$store.commit('login')
    },
    goHome() {
      this.$router.push({name: "home"})
    }
  },
  computed: {
      // 获取登录状态
    loginFlag() {
      return this.$store.state.loginFlag
    }
  },
  created() {
    this.$store.commit('login')
  },
  mounted () {
    // 事件监听滚动条
    window.addEventListener('scroll', this.watchScroll)
    this.show()
  },
  components: {
    register,
    login
  }
}

</script>

<style lang="less" scoped>
@colorh: #00ffff;
@keyframes decos {
  0% {
    transform: rotate(20deg) scale(2.5);
  }
  100% {
    transform: rotate(0) scale(0.3);
  }
}
.header-container {
  background: #060116 url('~assets/images/nav/banner.png') no-repeat right bottom;
  width: 100%;
  height: 500px;
  // 实现视差效果
  background-attachment: fixed;
  position: relative;
  box-shadow: 0 10px 20px skyblue;
  .deco {
    position: absolute;
    background: url('~assets/images/nav/deco.png');
    height: 293px;
    width: 100%;
    animation: decos 4s linear infinite;
  }
  .navBar {
    position: fixed;
    width: 100%;
    z-index: 999;
    background-color: rgba(0,0,0,0.3);
  }
  // 吸顶效果
  .navBarWrap {
    position:fixed;
    top:0;
    width: 100%;
    z-index:999; 
    background-color: rgba(0,0,0,0.3);
  }

  
}

.helloWords {
    position: absolute;
    text-align: center;
    width: 600px;
    height: 200px;
    line-height: 200px;
    left: 50%;
    top: 50%;
    margin-left: -300px;
    margin-top: -100px;
    font-size: 25px;
    color: skyblue;
    text-shadow: 0 0 5px azure;
    // transform: translate(-50%,-50%);
}



@media screen and (max-width: 768px) {
  .nav-container {
    height: 30px;
    line-height: 30px;
    display: flex;
    justify-content: space-between;
    font-size: 10px;

    h1 {
      text-indent: -9999em;
      background: url('~assets/images/nav/logo.png') no-repeat;
      background-size: contain;
      width: 50px;
      height: 30px;
      cursor: pointer;
      display: none;
    }
    ul {
      .nav-active {
          color: @colorh;
          background-color: rgba(18, 212, 212, 0.301);
      }

      a {
        height: 30px;
        width: 45px;
        text-align: center;
        float: left;
        padding: 0px;
        color: white;
        font-weight: bold;

        &:hover {
          color: @colorh;
          background-color: rgba(18, 212, 212, 0.301);
        }
      }
    }
    .buttons {
          width: 15px;
          display: flex;
          justify-content: space-around;
        }
  }
}

@media screen and (min-width:769px){
  .nav-container {
    height: 60px;
    line-height: 60px;
    display: flex;
    justify-content: space-between;

    h1 {
      text-indent: -9999em;
      background: url('~assets/images/nav/logo.png') no-repeat;
      background-size: contain;
      width: 200px;
      height: 60px;
      cursor: pointer;
    }
    ul {
      .nav-active {
          color: @colorh;
          background-color: rgba(18, 212, 212, 0.301);
      }

      a {
        height: 60px;
        width: 100px;
        text-align: center;
        float: left;
        padding: 0 10px;
        color: white;
        font-weight: bold;

        &:hover {
          color: @colorh;
          background-color: rgba(18, 212, 212, 0.301);
        }
      }
    }
    .buttons {
          width: 120px;
          display: flex;
          justify-content: space-around;
        }
  }
}
</style>