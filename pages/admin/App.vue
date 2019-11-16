<template>
  <div class="admin-container">
    <div class="nav">
      <admin-nav></admin-nav>
    </div>
    <!-- 内容区域 -->
    <div class="right">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import AdminNav from '../../components/admin/AdminNav.vue'

export default {
  data() {
    return {
      
    }
  },
  methods: {
  },
  components: {
    'admin-nav': AdminNav
  }
}
</script>

<style lang="less">
html,
body{
  width:100%;
  height:100%;
}
.admin-container {
  height: 100%;
  display: flex;
  .nav {
    flex: 1;
    height: 100%;
  }
  .right {
    flex: 4;
    height: 100%;
  }
}

</style>