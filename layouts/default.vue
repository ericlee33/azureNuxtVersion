<template>
  <div id="app">
    <!-- 引入头部组件 --> 
    <transition enter-active-class="animated fadeIn">
      <Header v-show="show"></Header>
    </transition>

      <!-- 内容 -->
      <div class="w app-content" >

        <transition enter-active-class="animated fadeInLeft">
          <div class="container" v-show="show">

            <transition enter-active-class="animated fadeIn">
              <nuxt v-show="show"></nuxt>
            </transition>
            <!-- <nuxt/> -->

          </div>
        </transition>

        <!-- 引入右侧边栏组件 -->
        <transition enter-active-class="animated fadeInRight">
          <Aside id="aside" v-show="show"></Aside>
        </transition>

        <!-- 清除浮动影响,为了让container左右阴影不被overflow:hidden替代,使用clear:both -->
        <div class="clear"></div>
      </div>
    <!-- 引入底部组件 -->
    <Footer></Footer>
    <div class="button">
    <el-button type="primary" id="gotop" style="display:none;position:fixed;right:2%;bottom:10%;width:50px;height:50px;text-align:center;padding:13px;border-radius:50%;" @click="gotop()"><i class="el-icon-caret-top" style="font-weight:bold;font-size:20px;width:100%;height:100%;"></i></el-button>
    </div>
    <!-- fix的gif小人 -->
    <img id="fixImg" src="~/assets/images/egg.gif">
  </div>
</template>
<script>
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
import Aside from '~/components/Aside.vue'

export default {
  data(){
    return {
      show: false
    }
  },
  methods: {
    open() {
      this.$notify({
        message: '欢迎来到我的空间,在这里可以畅所欲言哦!',
        duration: 3500,
        offset: 200
      })
      this.$notify({
        message: '新用户可以注册哦，如果有权限可以进入后台!',
        duration: 6500,
        offset: 300
      })
    },
    // 回到顶部
    gotop() {
      document.documentElement.scrollTop = document.body.scrollTop = 0;
    },
    scrollToTop(el) {
      let topBtn = document.getElementById('gotop');
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollTop > 300) {
        topBtn.style.display = 'block';
      } else {
        topBtn.style.display = 'none';
      }
    },
    // 利用vuex拿到bloglength
    getLength() {
      this.$store.dispatch('getBlogLength')
    }
  },
  created() {
    this.getLength()
  },
  mounted() {
    this.open()
    this.show = true
    // 监听滚动
    window.addEventListener('scroll', this.scrollToTop)
  },
  destroyed () {
    window.removeEventListener('scroll', this.scrollToTop); 
  },
  components: {
    Header,
    Footer,
    Aside
  }
}
</script>
<style lang="less">
html {
  height: 100%;
  width: 100%;
  // background: url('~assets/images/bg1.png');
}
.rich-img {
  width: 100%;
  height: auto;
}
/* 避免动画使页面在加载时出现左右滚动条 */
#app {
  overflow: hidden;
  background: url('~assets/images/bg1.png');
}
.app-content {
  padding: 4% 0;
  min-height:1000px;

  .clear {
    clear: both;
  }
  .button {
    width: 50px;
    height: 50px;
  }
}
#fixImg {
  position: fixed;
  left: 0;
  bottom: 20%;
  &:hover {
    transform: scale(0.5) skew(20deg);
    transition: all 3s linear;
  }
}
@media screen and (max-width: 768px) {
  #aside {
    display: none;
  }
  #fixImg {
    width: 60px;
    height: 60px;
  }
  .container {
    width: 100%;
    margin: 0;
  }
}
@media screen and (min-width:769px){
  .container {
    width: 63%;
    float: left;
    margin-right: 2%;
  }
  #aside {
    float: left;
    width: 35%;
    // padding: 10px;
  }
}
</style>
