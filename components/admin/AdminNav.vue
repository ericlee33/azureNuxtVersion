<template>
  <div class="admin-nav-container" id="admin-nav-container">

    <!-- 侧边导航栏 -->
    <div class="nav">
      <el-menu
        default-active=""
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose">
        <el-menu-item index="1" @click="goAdminWebArticle">
          <i class="el-icon-menu"></i>
          <span slot="title">文章操作</span>
        </el-menu-item>
        <el-menu-item index="2" @click="goAccountPermission">
          <i class="el-icon-menu"></i>
          <span slot="title">帐号权限</span>
        </el-menu-item>
        <el-menu-item index="3" @click="goMessageBoard">
          <i class="el-icon-document"></i>
          <span slot="title">留言板</span>
        </el-menu-item>
        <!-- <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
        </el-menu-item> -->
      </el-menu>
    </div>

    <!-- 返回按钮 -->
    <div class="nav-bottom">
      <a href="/"><el-button type="primary">返回博客</el-button></a>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      goAdminWebArticle() {
        this.$router.push({ name: "adminwebarticle", params: {} })
      },
      goAccountPermission(){
        this.$router.push({ name: 'accountpermission', params: {} })
      },
      goMessageBoard() {
        this.$router.push({ name: "messageboard", params: {} })
      },
      navHeight() {
        // document.getElementById('admin-nav-container').style.height=document. +'px'
      }
    },
    mounted() {
      this.navHeight()
    },
  }
</script>

<style lang="less" scoped>
.admin-nav-container {
  height: 100%;
  position: relative;
  // 让按钮绝对定位
  .nav-bottom {
    position: absolute;
    bottom: 10%;
    left:5%;
  }
}
</style>